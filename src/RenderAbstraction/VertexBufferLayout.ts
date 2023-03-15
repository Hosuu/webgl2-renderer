import { GL_FLOAT } from './constants'
import { GLdataType } from './enumTypes'
import GLUtils from './GLUtils'

interface VertexBufferLayoutElement {
	type: GLdataType
	count: 1 | 2 | 3 | 4
	normalized: boolean
}

export default class VertexBufferLayout {
	public readonly elements: VertexBufferLayoutElement[]
	private stride: number

	constructor() {
		this.elements = new Array<VertexBufferLayoutElement>()
		this.stride = 0
	}

	private push(count: 1 | 2 | 3 | 4, type: GLdataType, normalized: boolean): void {
		this.elements.push({ type, count, normalized })
		this.stride += GLUtils.sizeOf(type) * count
	}

	public addFloat(count: 1 | 2 | 3 | 4): VertexBufferLayout {
		this.push(count, GL_FLOAT, false)
		return this
	}

	public getStride(): number {
		return this.stride
	}
}
