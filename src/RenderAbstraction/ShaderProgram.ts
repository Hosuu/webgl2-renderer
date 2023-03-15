import {
	GL_COMPILE_STATUS,
	GL_FRAGMENT_SHADER,
	GL_LINK_STATUS,
	GL_VALIDATE_STATUS,
	GL_VERTEX_SHADER,
} from './constants'
import { GLshaderType } from './enumTypes'
import Renderer from './Renderer'

export default class ShaderProgram {
	public readonly context: WebGL2RenderingContext
	public readonly program: WebGLProgram

	private uniformLocationsCache: Map<string, WebGLUniformLocation>

	constructor(renderer: Renderer, vertexShaderSrc: string, fragShaderSrc: string) {
		this.context = renderer.context

		const vertexShader = this.createShader(vertexShaderSrc, GL_VERTEX_SHADER)
		const fragmentShader = this.createShader(fragShaderSrc, GL_FRAGMENT_SHADER)
		this.program = this.createProgram(vertexShader, fragmentShader)
		this.context.deleteShader(vertexShader)
		this.context.deleteShader(fragmentShader)

		this.uniformLocationsCache = new Map<string, number>()
	}

	private createShader(shaderSrc: string, shaderType: GLshaderType): WebGLShader {
		const shader = this.context.createShader(shaderType)
		if (!shader) throw Error()

		this.context.shaderSource(shader, shaderSrc)
		this.context.compileShader(shader)
		if (!this.context.getShaderParameter(shader, GL_COMPILE_STATUS))
			throw Error(this.context.getShaderInfoLog(shader)!)

		return shader
	}

	private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
		const program = this.context.createProgram()
		if (!program) throw Error()

		this.context.attachShader(program, vertexShader)
		this.context.attachShader(program, fragmentShader)

		this.context.linkProgram(program)
		if (!this.context.getProgramParameter(program, GL_LINK_STATUS))
			throw Error(this.context.getProgramInfoLog(program)!)

		this.context.validateProgram(program)
		if (!this.context.getProgramParameter(program, GL_VALIDATE_STATUS))
			throw Error(this.context.getProgramInfoLog(program)!)

		return program
	}

	public bind(): void {
		this.context.useProgram(this.program)
	}

	public destroy(): void {
		this.context.deleteProgram(this.program)
	}

	private getUniformLocation(name: string): WebGLUniformLocation {
		this.bind()
		if (this.uniformLocationsCache.has(name)) return this.uniformLocationsCache.get(name)!

		const location = this.context.getUniformLocation(this.program, name)
		if (!location) throw Error('[WebGL2] Trying to get not existing uniform location')

		this.uniformLocationsCache.set(name, location)
		return location
	}

	public getUniform(name: string): any {
		const location = this.getUniformLocation(name)
		const value = this.context.getUniform(this.program, location)
		if (typeof value === 'number') return value
		else return [...value]
	}

	//Floats
	public setUniform1f(name: string, data: number) {
		const location = this.getUniformLocation(name)
		this.context.uniform1f(location, data)
	}
	public setUniform2f(name: string, data: [number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform2fv(location, data)
	}
	public setUniform3f(name: string, data: [number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform3fv(location, data)
	}
	public setUniform4f(name: string, data: [number, number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform4fv(location, data)
	}

	//Intigers
	public setUniform1i(name: string, data: number) {
		const location = this.getUniformLocation(name)
		this.context.uniform1i(location, data)
	}
	public setUniform2i(name: string, data: [number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform2iv(location, data)
	}
	public setUniform3i(name: string, data: [number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform3iv(location, data)
	}
	public setUniform4i(name: string, data: [number, number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform4iv(location, data)
	}

	//Unsigned Intigers
	public setUniform1ui(name: string, data: number) {
		const location = this.getUniformLocation(name)
		this.context.uniform1ui(location, data)
	}
	public setUniform2ui(name: string, data: [number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform2uiv(location, data)
	}
	public setUniform3ui(name: string, data: [number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform3uiv(location, data)
	}
	public setUniform4ui(name: string, data: [number, number, number, number]) {
		const location = this.getUniformLocation(name)
		this.context.uniform4uiv(location, data)
	}
}
