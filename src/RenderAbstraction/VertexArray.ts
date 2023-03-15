import GLUtils from './GlUtils'
import Renderer from './Renderer'
import VertexBuffer from './VertexBuffer'
import VertexBufferLayout from './VertexBufferLayout'

export default class VertexArray {
	public readonly context: WebGL2RenderingContext
	public readonly vao: WebGLVertexArrayObject

	constructor(renderer: Renderer) {
		this.context = renderer.context
		const vao = this.context.createVertexArray()
		if (!vao) throw Error()
		this.vao = vao
	}

	public bind(): void {
		this.context.bindVertexArray(this.vao)
	}

	public destory(): void {
		this.context.deleteVertexArray(this.vao)
	}

	public addBuffer(vbo: VertexBuffer, layout: VertexBufferLayout): void {
		this.bind()
		vbo.bind()

		let offset = 0

		for (let i = 0; i < layout.elements.length; i++) {
			const { count, normalized, type } = layout.elements[i]
			this.context.enableVertexAttribArray(i)
			this.context.vertexAttribPointer(i, count, type, normalized, layout.getStride(), offset)
			offset += count * GLUtils.sizeOf(type)
		}
	}
}
