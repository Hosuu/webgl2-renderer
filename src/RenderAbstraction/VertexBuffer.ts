import { GL_ARRAY_BUFFER, GL_STATIC_DRAW } from './constants'
import Renderer from './Renderer'

export default class VertexBuffer {
	public readonly context: WebGL2RenderingContext
	public readonly vbo: WebGLBuffer

	constructor(renderer: Renderer, data: ArrayBufferView) {
		this.context = renderer.context
		const vbo = this.context.createBuffer()

		if (!vbo) throw Error()
		this.vbo = vbo
		this.setData(data)
	}

	public bind(): void {
		this.context.bindBuffer(GL_ARRAY_BUFFER, this.vbo)
	}

	public destroy(): void {
		this.context.deleteBuffer(this.vbo)
	}

	public setData(data: ArrayBufferView): void {
		this.bind()
		this.context.bufferData(GL_ARRAY_BUFFER, data, GL_STATIC_DRAW)
	}
}
