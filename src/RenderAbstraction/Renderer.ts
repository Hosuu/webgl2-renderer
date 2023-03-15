import { GL_UNSIGNED_INT } from './constants'
import IndexBuffer from './IndexBuffer'
import ShaderProgram from './ShaderProgram'
import VertexArray from './VertexArray'

export default class Renderer {
	public readonly canvas: HTMLCanvasElement
	public readonly context: WebGL2RenderingContext

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		const gl = canvas.getContext('webgl2')
		if (!gl) throw Error()
		this.context = gl

		console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE))
	}

	private updateViewport(): boolean {
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight
		if (this.canvas.width === width && this.canvas.height === height) return false

		this.canvas.width = width
		this.canvas.height = height
		this.context.viewport(
			0,
			0,
			this.context.drawingBufferWidth,
			this.context.drawingBufferHeight
		)
		return true
	}

	public draw(va: VertexArray, ib: IndexBuffer, shader: ShaderProgram): void {
		this.updateViewport()
		shader.bind()
		va.bind()
		ib.bind()
		this.context.drawElements(this.context.TRIANGLES, ib.getCount(), GL_UNSIGNED_INT, 0)
	}

	public takeScreenShot(
		va: VertexArray,
		ib: IndexBuffer,
		shader: ShaderProgram,
		width: number,
		height: number
	) {
		this.canvas.width = width
		this.canvas.height = height
		this.context.viewport(
			0,
			0,
			this.context.drawingBufferWidth,
			this.context.drawingBufferHeight
		)
		shader.bind()
		va.bind()
		ib.bind()
		this.context.drawElements(this.context.TRIANGLES, ib.getCount(), GL_UNSIGNED_INT, 0)
		//Download
		const a = document.createElement('a')
		a.href = this.canvas.toDataURL('img/png')
		a.download = `CosmicBg${width}x${height}.png`
		a.click()
	}
}
