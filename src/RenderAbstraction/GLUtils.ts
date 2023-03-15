import {
	GL_BYTE,
	GL_FLOAT,
	GL_INT,
	GL_SHORT,
	GL_UNSIGNED_BYTE,
	GL_UNSIGNED_INT,
	GL_UNSIGNED_SHORT,
} from './constants'
import { GLdataType } from './enumTypes'

export default class GLUtils {
	public static sizeOf(datatype: GLdataType): number {
		switch (datatype) {
			case GL_FLOAT:
				return 4

			case GL_INT:
				return 4

			case GL_UNSIGNED_INT:
				return 4

			case GL_SHORT:
				return 2

			case GL_UNSIGNED_SHORT:
				return 2

			case GL_BYTE:
				return 1

			case GL_UNSIGNED_BYTE:
				return 1

			default:
				throw Error('Unknown datatype!')
		}
	}

	public static async loadTextureBuffer(url: string): Promise<Float32Array> {
		const request = await fetch(url)
		const data = await request.arrayBuffer()
		const f32Buffer = new Float32Array(data)
		return f32Buffer
	}
}
