/*
ALL WEBGL Constants
Source: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
*/

//Clearing buffers
/**Passed to clear to clear the current depth buffer. */
export const DEPTH_BUFFER_BIT = 0x00000100 as const
/**Passed to clear to clear the current stencil buffer. */
export const STENCIL_BUFFER_BIT = 0x00000400
/**Passed to clear to clear the current color buffer. */
export const COLOR_BUFFER_BIT = 0x00004000

//Rendering primitives
/**Passed to `drawElements` or `drawArrays` to draw single points.*/
export const POINTS = 0x0000
/**Passed to `drawElements` or `drawArrays` to draw lines. Each vertex connects to the one after it.*/
export const LINES = 0x0001
/**Passed to `drawElements` or `drawArrays` to draw lines. Each set of two vertices is treated as a separate line segment.*/
export const LINE_LOOP = 0x0002
/**Passed to `drawElements` or `drawArrays` to draw a connected group of line segments from the first vertex to the last.*/
export const LINE_STRIP = 0x0003
/**Passed to `drawElements` or `drawArrays` to draw triangles. Each set of three vertices creates a separate triangle.*/
export const TRIANGLES = 0x0004
/**Passed to `drawElements` or `drawArrays` to draw a connected group of triangles.*/
export const TRIANGLE_STRIP = 0x0005
/**Passed to `drawElements` or `drawArrays` to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan.*/
export const TRIANGLE_FAN = 0x0006

//Buffers
/**Passed to `bufferData` as a hint about whether the contents of the buffer are likely to be used often and not change often.*/
export const GL_STATIC_DRAW = 0x88e4
/**Passed to `bufferData` as a hint about whether the contents of the buffer are likely to not be used often. */
export const GL_STREAM_DRAW = 0x88e0
/**Passed to `bufferData` as a hint about whether the contents of the buffer are likely to be used often and change often. */
export const GL_DYNAMIC_DRAW = 0x88e8
/**Passed to `bindBuffer` or `bufferData` to specify the type of buffer being used. */
export const GL_ARRAY_BUFFER = 0x8892
/**Passed to `bindBuffer` or `bufferData` to specify the type of buffer being used. */
export const GL_ELEMENT_ARRAY_BUFFER = 0x8893
/**Passed to `getBufferParameter` to get a buffer's size. */
export const GL_BUFFER_SIZE = 0x8764
/**Passed to `getBufferParameter` to get the hint for the buffer passed in when it was created. */
export const GL_BUFFER_USAGE = 0x8765

//Data types
export const GL_BYTE = 0x1400
export const GL_UNSIGNED_BYTE = 0x1401
export const GL_SHORT = 0x1402
export const GL_UNSIGNED_SHORT = 0x1403
export const GL_INT = 0x1404
export const GL_UNSIGNED_INT = 0x1405
export const GL_FLOAT = 0x1406

//Shaders
/**Passed to `createShader` to define a fragment shader. */
export const GL_FRAGMENT_SHADER = 0x8b30
/**Passed to `createShader` to define a vertex shader. */
export const GL_VERTEX_SHADER = 0x8b31
/**Passed to `getShaderParameter` to get the status of the compilation. Returns false if the shader was not compiled. You can then query `getShaderInfoLog` to find the exact error */
export const GL_COMPILE_STATUS = 0x8b81
/**Passed to `getShaderParameter` to determine if a shader was deleted via `deleteShader`. Returns true if it was, false otherwise. */
export const GL_DELETE_STATUS = 0x8b80
/**Passed to `getProgramParameter` after calling `linkProgram` to determine if a program was linked correctly. Returns false if there were errors. Use `getProgramInfoLog` to find the exact error. */
export const GL_LINK_STATUS = 0x8b82
/**Passed to `getProgramParameter` after calling `validateProgram` to determine if it is valid. Returns false if errors were found. */
export const GL_VALIDATE_STATUS = 0x8b83
/**Passed to `getProgramParameter` after calling `attachShader` to determine if the shader was attached correctly. Returns false if errors occurred. */
export const GL_ATTACHED_SHADERS = 0x8b85
/**Passed to `getProgramParameter` to get the number of attributes active in a program. */
export const GL_ACTIVE_ATTRIBUTES = 0x8b89
/**Passed to `getProgramParameter` to get the number of uniforms active in a program. */
export const GL_ACTIVE_UNIFORMS = 0x8b86
/**The maximum number of entries possible in the vertex attribute list. */
export const GL_MAX_VERTEX_ATTRIBS = 0x8869
export const GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8dfb
export const GL_MAX_VARYING_VECTORS = 0x8dfc
export const GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8b4d
export const GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8b4c
/**Implementation dependent number of maximum texture units. At least 8. */
export const GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872
export const GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd
export const GL_SHADER_TYPE = 0x8b4f
export const GL_SHADING_LANGUAGE_VERSION = 0x8b8c
export const GL_CURRENT_PROGRAM = 0x8b8d

//Textures
export const GL_NEAREST = 0x2600
export const GL_LINEAR = 0x2601
export const GL_NEAREST_MIPMAP_NEAREST = 0x2700
export const GL_LINEAR_MIPMAP_NEAREST = 0x2701
export const GL_NEAREST_MIPMAP_LINEAR = 0x2702
export const GL_LINEAR_MIPMAP_LINEAR = 0x2703
export const GL_TEXTURE_MAG_FILTER = 0x2800
export const GL_TEXTURE_MIN_FILTER = 0x2801
export const GL_TEXTURE_WRAP_S = 0x2802
export const GL_TEXTURE_WRAP_T = 0x2803
export const GL_TEXTURE_2D = 0x0de1
export const GL_TEXTURE = 0x1702
export const GL_TEXTURE_CUBE_MAP = 0x8513
export const GL_TEXTURE_BINDING_CUBE_MAP = 0x8514
export const GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516
export const GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518
export const GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a
export const GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c
/**A texture unit.
 *
 * Ranges from [0...31]
 *
 * `TEXTURE0` + \<desired_unit\>
 */
export const GL_TEXTURE0 = 0x84c0
/**The current active texture unit. */
export const GL_ACTIVE_TEXTURE = 0x84e0
export const GL_REPEAT = 0x2901
export const GL_CLAMP_TO_EDGE = 0x812f
export const GL_MIRRORED_REPEAT = 0x8370
export const GL_RED = 0x1903
export const GL_RGB8 = 0x8051
export const GL_RGBA8 = 0x8058
export const GL_RGB10_A2 = 0x8059
export const GL_TEXTURE_3D = 0x806f
export const GL_TEXTURE_WRAP_R = 0x8072
export const GL_TEXTURE_MIN_LOD = 0x813a
export const GL_TEXTURE_MAX_LOD = 0x813b
export const GL_TEXTURE_BASE_LEVEL = 0x813c
export const GL_TEXTURE_MAX_LEVEL = 0x813d
export const GL_TEXTURE_COMPARE_MODE = 0x884c
export const GL_TEXTURE_COMPARE_FUNC = 0x884d
export const GL_SRGB = 0x8c40
export const GL_SRGB8 = 0x8c41
export const GL_SRGB8_ALPHA8 = 0x8c43
export const GL_COMPARE_REF_TO_TEXTURE = 0x884e
export const GL_RGBA32F = 0x8814
export const GL_RGB32F = 0x8815
export const GL_RGBA16F = 0x881a
export const GL_RGB16F = 0x881b
export const GL_TEXTURE_2D_ARRAY = 0x8c1a
export const GL_TEXTURE_BINDING_2D_ARRAY = 0x8c1d
export const GL_R11F_G11F_B10F = 0x8c3a
export const GL_RGB9_E5 = 0x8c3d
export const GL_RGBA32UI = 0x8d70
export const GL_RGB32UI = 0x8d71
export const GL_RGBA16UI = 0x8d76
export const GL_RGB16UI = 0x8d77
export const GL_RGBA8UI = 0x8d7c
export const GL_RGB8UI = 0x8d7d
export const GL_RGBA32I = 0x8d82
export const GL_RGB32I = 0x8d83
export const GL_RGBA16I = 0x8d88
export const GL_RGB16I = 0x8d89
export const GL_RGBA8I = 0x8d8e
export const GL_RGB8I = 0x8d8f
export const GL_RED_INTEGER = 0x8d94
export const GL_RGB_INTEGER = 0x8d98
export const GL_RGBA_INTEGER = 0x8d99
export const GL_R8 = 0x8229
export const GL_RG8 = 0x822b
export const GL_R16F = 0x822d
export const GL_R32F = 0x822e
export const GL_RG16F = 0x822f
export const GL_RG32F = 0x8230
export const GL_R8I = 0x8231
export const GL_R8UI = 0x8232
export const GL_R16I = 0x8233
export const GL_R16UI = 0x8234
export const GL_R32I = 0x8235
export const GL_R32UI = 0x8236
export const GL_RG8I = 0x8237
export const GL_RG8UI = 0x8238
export const GL_RG16I = 0x8239
export const GL_RG16UI = 0x823a
export const GL_RG32I = 0x823b
export const GL_RG32UI = 0x823c
export const GL_R8_SNORM = 0x8f94
export const GL_RG8_SNORM = 0x8f95
export const GL_RGB8_SNORM = 0x8f96
export const GL_RGBA8_SNORM = 0x8f97
export const GL_RGB10_A2UI = 0x906f
export const GL_TEXTURE_IMMUTABLE_FORMAT = 0x912f
export const GL_TEXTURE_IMMUTABLE_LEVELS = 0x82df
