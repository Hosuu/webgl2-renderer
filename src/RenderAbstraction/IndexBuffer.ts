import { GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW } from './constants'
import { BufferDataArray } from './enumTypes'
import Renderer from './Renderer'

export default class IndexBuffer {
	public readonly context: WebGL2RenderingContext
	public readonly ibo: WebGLBuffer

	private size!: number

	constructor(renderer: Renderer, data: BufferDataArray) {
		this.context = renderer.context
		const ibo = this.context.createBuffer()
		if (!ibo) throw Error('[WebGL2] Cannot create buffer object!')
		this.ibo = ibo
		this.setData(data)
	}

	public bind(): void {
		this.context.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, this.ibo)
	}

	public destory() {
		this.context.deleteBuffer(this.ibo)
	}

	public setData(data: BufferDataArray): void {
		this.bind()
		this.context.bufferData(GL_ELEMENT_ARRAY_BUFFER, data, GL_STATIC_DRAW)
		this.size = data.length
	}

	public getCount(): number {
		return this.size
	}
}
