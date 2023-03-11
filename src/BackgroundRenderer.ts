import Easing from './Easings'
import fragCosmicShader from './shaders/CosmicBackground.glslf?raw'
import vertexCosmicShader from './shaders/CosmicBackground.glslv?raw'

interface BackgroundRendererSettings {
	textureSize: '512' | '1024' | '2048' | '4096' | '8192'
}

interface ShaderUniforms {
	uAspect: number
	uScrollSpeedFactor: number
	uTime: number
	uZoom: number
	uBrightness: number
	uFrontColor: [number, number, number]
	uBackColor: [number, number, number]
}

export default class BackgroundRenderer {
	public static canvas: HTMLCanvasElement
	public static gl: WebGL2RenderingContext

	private static textureBuffersCache: Map<string, Float32Array>

	//Shader
	private static shaderProgram: WebGLProgram
	private static vao: WebGLVertexArrayObject
	private static vbo: WebGLBuffer

	public static async loadTextureBuffer(name: string, url: string): Promise<void> {
		const request = await fetch(url)
		const data = await request.arrayBuffer()
		const f32Buffer = new Float32Array(data)
		this.textureBuffersCache.set(name, f32Buffer)
	}

	public static flushTextureFromCache(name: string) {
		this.textureBuffersCache.delete(name)
	}

	private static resizeHandler(): boolean {
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight
		if (this.canvas.width === width && this.canvas.height === height) return false

		this.canvas.width = width
		this.canvas.height = height
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
		return true
	}

	private static loadTextureToGPU(name: string) {
		if (!this.textureBuffersCache.has(name))
			throw Error(`There is no texture called ${name} in cache!`)

		const textureBuffer = this.textureBuffersCache.get(name)!
		const size = Math.sqrt(textureBuffer.length)
		const gl = this.gl

		const texture = gl.createTexture()
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, size, size, 0, gl.RED, gl.FLOAT, textureBuffer)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

		gl.generateMipmap(gl.TEXTURE_2D)
	}

	private static initShaderProgram(): void {
		const gl = this.gl

		const vertexShader = gl.createShader(gl.VERTEX_SHADER)
		const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
		if (!vertexShader || !fragShader) throw Error('[WebGL2] Shader object create error')

		gl.shaderSource(vertexShader, vertexCosmicShader)
		gl.shaderSource(fragShader, fragCosmicShader)

		gl.compileShader(vertexShader)
		gl.compileShader(fragShader)

		for (const shader of [vertexShader, fragShader])
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				throw Error('[WebGL2] Shader Compile error\n' + gl.getShaderInfoLog(shader))

		const program = gl.createProgram()
		if (!program) throw Error('[WebGL2] Program object create error')

		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragShader)
		gl.linkProgram(program)

		if (!gl.getProgramParameter(program, gl.LINK_STATUS))
			throw Error('[WebGL2] Program linking error\n' + gl.getProgramInfoLog(program))

		this.shaderProgram = program
	}

	private static initVAO(): WebGLVertexArrayObject {
		const gl = this.gl
		const program = this.shaderProgram

		const vao = gl.createVertexArray()
		if (!vao) throw Error('[WebGL2] VAO create error')

		gl.bindVertexArray(vao)

		const aPositionLoc = gl.getAttribLocation(program, 'aPosition')
		const aTexCoordLoc = gl.getAttribLocation(program, 'aTexCoord')
		const aVertexColorLoc = gl.getAttribLocation(program, 'aVertexColor')

		gl.enableVertexAttribArray(aPositionLoc)
		gl.enableVertexAttribArray(aTexCoordLoc)
		gl.enableVertexAttribArray(aVertexColorLoc)

		gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 7 * 4, 0)
		gl.vertexAttribPointer(aTexCoordLoc, 2, gl.FLOAT, false, 7 * 4, 2 * 4)
		gl.vertexAttribPointer(aVertexColorLoc, 3, gl.FLOAT, false, 7 * 4, 4 * 4)

		gl.bindVertexArray(null)
		this.vao = vao
		return vao
	}

	private static initVBO(): WebGLBuffer {
		const gl = this.gl

		const vbo = gl.createBuffer()
		if (!vbo) throw Error('[WebGL2] VBO create error')

		gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

		//prettier-ignore
		const bufferData = new Float32Array([
     1,  1,     1, 1,		1,1,1,
     1, -1,     1, 0,		1,1,1,
    -1,  1,     0, 1,		1,1,1,
    -1, -1,     0, 0,		1,1,1,
    ])

		gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)

		gl.bindBuffer(gl.ARRAY_BUFFER, null)
		this.vbo = vbo
		return vbo
	}

	public static setVBOdata(bufferData: Float32Array) {
		const gl = this.gl
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
		gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)
		gl.bindBuffer(gl.ARRAY_BUFFER, null)
	}

	//prettier-ignore
	public static setShaderUniform<U extends keyof ShaderUniforms>(name: U, value: ShaderUniforms[U]) {
		const gl = this.gl
		const program = this.shaderProgram

		gl.useProgram(program)

		if (value instanceof Array) {
			gl.uniform3f(gl.getUniformLocation(program, name), value[0], value[1], value[2]) //Why does ...value not work???
		} else gl.uniform1f(gl.getUniformLocation(program, name), value)
	}

	public static getShaderUniform<U extends keyof ShaderUniforms>(name: U): ShaderUniforms[U] {
		const gl = this.gl
		const program = this.shaderProgram

		const value = gl.getUniform(program, gl.getUniformLocation(program, name)!)
		return value
	}

	static async init(canvasElement: HTMLCanvasElement, settings: BackgroundRendererSettings) {
		this.canvas = canvasElement
		this.canvas.width = innerWidth
		this.canvas.height = innerHeight

		const gl = this.canvas.getContext('webgl2')
		if (!gl) throw Error('Cannot initalize webgl2 context!')
		this.gl = gl

		this.textureBuffersCache = new Map()

		try {
			this.initShaderProgram()
			gl.useProgram(this.shaderProgram)

			const textureSize = settings.textureSize ?? 2048
			const textureName = 'Cosmic' + textureSize
			await this.loadTextureBuffer(textureName, '/cosmicTextureBuffers/' + textureName)
			this.loadTextureToGPU(textureName)

			const vbo = this.initVBO()
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

			const vao = this.initVAO()
			gl.bindVertexArray(vao)

			this.setShaderUniform('uAspect', this.canvas.clientWidth / this.canvas.clientHeight)
			this.setShaderUniform('uScrollSpeedFactor', 0.0024)
			this.setShaderUniform('uZoom', 1)
			this.setShaderUniform('uBrightness', 0.7)
			this.setShaderUniform('uFrontColor', [0.031, 0.42, 0.31])
			this.setShaderUniform('uBackColor', [0.5, 0, 0.5])

			this.drawLoop()
		} catch (e) {
			console.error(e)
		}
	}

	private static drawLoop() {
		const gl = this.gl
		this.setShaderUniform('uTime', (Date.now() / 100) % (3600 * 24))

		const didResize = this.resizeHandler()
		if (didResize) {
			const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight
			this.setShaderUniform('uAspect', aspectRatio)
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
		gl.bindVertexArray(this.vao)
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

		requestAnimationFrame(this.drawLoop.bind(this))
	}

	public static smoothSetUniformf1<U extends keyof ShaderUniforms>(
		name: U,
		finalValue: ShaderUniforms[U],
		time: number,
		easingFn: (x: number) => number
	) {
		const startTime = performance.now()
		const endTime = performance.now() + time

		if (!easingFn) easingFn = Easing.linear

		if (finalValue instanceof Array)
			return console.error('Vectors not supported by this method')
		const startValue = this.getShaderUniform(name) as number

		const loop = () => {
			const currentTime = performance.now()
			const rawT = (currentTime - startTime) / (endTime - startTime)
			const t = easingFn(rawT)
			const value = startValue + ((finalValue as number) - startValue) * t
			this.setShaderUniform(name, value as ShaderUniforms[U])
			if (rawT < 1) requestAnimationFrame(loop.bind(this))
		}

		requestAnimationFrame(loop.bind(this))
	}

	public static smoothSetUniformf3<U extends keyof ShaderUniforms>(
		name: U,
		finalValue: ShaderUniforms[U],
		time: number,
		easingFn: (x: number) => number
	) {
		const startTime = performance.now()
		const endTime = performance.now() + time

		if (!easingFn) easingFn = Easing.linear

		if (!(finalValue instanceof Array))
			return console.error('not length 3 Vectors are not supported by this method')
		const startValue = this.getShaderUniform(name) as [number, number, number]

		const loop = () => {
			const currentTime = performance.now()
			const rawT = (currentTime - startTime) / (endTime - startTime)
			const t = easingFn(rawT)
			const value = new Array(3)
			for (let i = 0; i < 3; i++) {
				value[i] = startValue[i] + ((finalValue[i] as number) - startValue[i]) * t
			}
			this.setShaderUniform(name, value as ShaderUniforms[U])
			if (rawT < 1) requestAnimationFrame(loop.bind(this))
		}

		requestAnimationFrame(loop.bind(this))
	}
}
