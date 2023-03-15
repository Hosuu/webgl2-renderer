import * as CONST from './constants'

export type FLOAT1 = number
export type FLOAT2 = [number, number]
export type FLOAT3 = [number, number, number]
export type FLOAT4 = [number, number, number, number]

/** Possible constant values:
 * - `GL_BYTE`
 * - `GL_UNSIGNED_BYTE`
 * - `GL_SHORT`
 * - `GL_UNSIGNED_SHORT`
 * - `GL_INT`
 * - `GL_UNSIGNED_INT`
 * - `GL_FLOAT`
 */
export declare type GLdataType =
	| typeof CONST.GL_BYTE
	| typeof CONST.GL_UNSIGNED_BYTE
	| typeof CONST.GL_SHORT
	| typeof CONST.GL_UNSIGNED_SHORT
	| typeof CONST.GL_INT
	| typeof CONST.GL_UNSIGNED_INT
	| typeof CONST.GL_FLOAT

/** Possible constant values:
 * - `GL_VERTEX_SHADER`
 * - `GL_FRAGMENT_SHADER`
 */
export declare type GLshaderType = typeof CONST.GL_VERTEX_SHADER | typeof CONST.GL_FRAGMENT_SHADER

export declare type BufferDataArray =
	| Float32Array
	| Int32Array
	| Int16Array
	| Int8Array
	| Uint32Array
	| Uint16Array
	| Uint8Array

export interface TextureParameterMap {
	[CONST.GL_TEXTURE_MAG_FILTER]: typeof CONST.GL_LINEAR | typeof CONST.GL_NEAREST

	[CONST.GL_TEXTURE_MIN_FILTER]:
		| typeof CONST.GL_LINEAR
		| typeof CONST.GL_NEAREST
		| typeof CONST.GL_NEAREST_MIPMAP_NEAREST
		| typeof CONST.GL_LINEAR_MIPMAP_NEAREST
		| typeof CONST.GL_NEAREST_MIPMAP_LINEAR
		| typeof CONST.GL_LINEAR_MIPMAP_LINEAR

	[CONST.GL_TEXTURE_WRAP_S]:
		| typeof CONST.GL_REPEAT
		| typeof CONST.GL_CLAMP_TO_EDGE
		| typeof CONST.GL_MIRRORED_REPEAT

	[CONST.GL_TEXTURE_WRAP_T]:
		| typeof CONST.GL_REPEAT
		| typeof CONST.GL_CLAMP_TO_EDGE
		| typeof CONST.GL_MIRRORED_REPEAT
}
