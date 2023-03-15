import { GL_TEXTURE0, GL_TEXTURE_2D } from './constants'
import { TextureParameterMap } from './enumTypes'
import Renderer from './Renderer'

export default class Texture {
	public readonly context: WebGL2RenderingContext
	public readonly texture: WebGLTexture

	constructor(renderer: Renderer) {
		this.context = renderer.context
		const texture = this.context.createTexture()
		if (!texture) throw Error('[WebGL2] Texture create error')

		this.texture = texture
	}

	public bind(slot: number = 0): void {
		this.context.activeTexture(GL_TEXTURE0 + slot)
		this.context.bindTexture(GL_TEXTURE_2D, this.texture)
	}

	public destroy(): void {
		this.context.deleteTexture(this.texture)
	}

	public setTextureData(
		slot: number,
		level: number,
		internalFormat: number,
		width: number,
		height: number,
		border: number,
		format: number,
		type: number,
		pixels: ArrayBufferView
	): void {
		this.bind(slot)
		this.context.texImage2D(
			GL_TEXTURE_2D,
			level,
			internalFormat,
			width,
			height,
			border,
			format,
			type,
			pixels
		)
	}

	/**
	 * Possible parameters:
	 *  - `GL_TEXTURE_MAG_FILTER` - Texture magnification filter
	 *    - `GL_LINEAR`
	 *    - `GL_NEAREST`
	 *
	 *  - `GL_TEXTURE_MIN_FILTER` - Texture minification filter
	 *    - `GL_LINEAR`
	 *    - `GL_NEAREST`
	 *    - `GL_NEAREST_MIPMAP_NEAREST`
	 *    - `GL_LINEAR_MIPMAP_NEAREST`
	 *    - `GL_NEAREST_MIPMAP_LINEAR`
	 *    - `GL_LINEAR_MIPMAP_LINEAR`
	 *
	 *  - `GL_TEXTURE_WRAP_S/T` - Wrapping function for texture coordinate `S/T`
	 *    - `GL_REPEAT`
	 *    - `GL_CLAMP_TO_EDGE`
	 *    - `GL_MIRRORED_REPEAT`
	 */
	public setTextureParameter<K extends keyof TextureParameterMap>(
		parameter: K,
		value: TextureParameterMap[K]
	): void {
		this.bind()
		this.context.texParameteri(this.context.TEXTURE_2D, parameter, value)
	}
}
