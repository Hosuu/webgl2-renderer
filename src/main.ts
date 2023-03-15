import {
	GL_FLOAT,
	GL_NEAREST,
	GL_R32F,
	GL_RED,
	GL_REPEAT,
	GL_TEXTURE_MAG_FILTER,
	GL_TEXTURE_MIN_FILTER,
	GL_TEXTURE_WRAP_S,
	GL_TEXTURE_WRAP_T,
} from './RenderAbstraction/constants'
import { FLOAT1, FLOAT3 } from './RenderAbstraction/enumTypes'
import IndexBuffer from './RenderAbstraction/IndexBuffer'
import Renderer from './RenderAbstraction/Renderer'
import ShaderProgram from './RenderAbstraction/ShaderProgram'
import Texture from './RenderAbstraction/Texture'
import VertexArray from './RenderAbstraction/VertexArray'
import VertexBuffer from './RenderAbstraction/VertexBuffer'
import VertexBufferLayout from './RenderAbstraction/VertexBufferLayout'
import fragCosmicShader from './shaders/CosmicBackground.glslf?raw'
import vertexCosmicShader from './shaders/CosmicBackground.glslv?raw'
import Easing from './static/Easings'
import TextureGen from './static/TextureGen'
import Tween from './static/Tween'
import './style.css'

async function main() {
	const bgCanvas = document.querySelector<HTMLCanvasElement>('#bgCanvas')!
	const bgRenderer = new Renderer(bgCanvas)

	const shader = new ShaderProgram(bgRenderer, vertexCosmicShader, fragCosmicShader)

	const texSize = 512
	const textureBuffer = await TextureGen.generate(texSize)
	const texture = new Texture(bgRenderer)
	texture.setTextureData(0, 0, GL_R32F, texSize, texSize, 0, GL_RED, GL_FLOAT, textureBuffer)
	texture.setTextureParameter(GL_TEXTURE_WRAP_S, GL_REPEAT)
	texture.setTextureParameter(GL_TEXTURE_WRAP_T, GL_REPEAT)
	texture.setTextureParameter(GL_TEXTURE_MAG_FILTER, GL_NEAREST)
	texture.setTextureParameter(GL_TEXTURE_MIN_FILTER, GL_NEAREST)

	shader.bind()
	shader.setUniform1f('uAspect', bgCanvas.clientWidth / bgCanvas.clientHeight)
	shader.setUniform1i('uIterations', 14)
	shader.setUniform1f('uZoom', 0)
	shader.setUniform1f('uBrightness', 0)
	shader.setUniform2f('uDirection', [1, 1])
	shader.setUniform1f('uScrollSpeedFactor', 0.0024)
	shader.setUniform3f('uFrontColor', [0.031, 0.42, 0.31])
	shader.setUniform3f('uBackColor', [0.5, 0.0, 0.5])

	//prettier-ignore
	const vb = new VertexBuffer(bgRenderer,	new Float32Array([
		+1, +1, 		1, 1, 	0.2, 1.0, 0.8,
		+1, -1, 		1, 0, 	1.0, 0.4, 0.9,
		-1, +1, 		0, 1, 	0.8, 1.0, 0.2,
		-1, -1, 		0, 0,		1.0, 0.8, 1.0,
	]))

	const layout = new VertexBufferLayout()
	layout.addFloat(2).addFloat(2).addFloat(3)

	const va = new VertexArray(bgRenderer)
	va.addBuffer(vb, layout)

	//prettier-ignore
	const ib = new IndexBuffer(bgRenderer, new Uint32Array([
		0, 1, 2,
		1, 2, 3
	]))

	function drawLoop() {
		shader.setUniform1f('uTime', (Date.now() / 100) % (3600 * 24))
		shader.setUniform1f('uAspect', bgCanvas.clientWidth / bgCanvas.clientHeight)

		bgRenderer.draw(va, ib, shader)
		requestAnimationFrame(drawLoop)
	}

	requestAnimationFrame(drawLoop)

	//Start Tweens
	const initFront = shader.getUniform('uFrontColor') as FLOAT3
	const targetFront = [0.3147, 0.1192, 0.1182] as FLOAT3
	Tween({
		from: initFront,
		to: targetFront,
		duration: 2500,
		callback: (v) => shader.setUniform3f('uFrontColor', v),
		easingFunction: Easing.easeInOutSine,
	})

	const initBack = shader.getUniform('uBackColor') as FLOAT3
	const targetBack = [0.0386, 0.0808, 0.5377] as FLOAT3
	Tween({
		from: initBack,
		to: targetBack,
		duration: 2500,
		callback: (v) => shader.setUniform3f('uBackColor', v),
		easingFunction: Easing.easeInOutSine,
	})

	const initZoom = shader.getUniform('uZoom') as FLOAT1
	const targetZoom = 1 as FLOAT1
	Tween({
		from: initZoom,
		to: targetZoom,
		duration: 2500,
		callback: (v) => shader.setUniform1f('uZoom', v),
		easingFunction: Easing.easeOutBack,
	})

	const initBrightness = shader.getUniform('uBrightness') as FLOAT1
	const targetBrightness = 1 as FLOAT1
	Tween({
		from: initBrightness,
		to: targetBrightness,
		duration: 2500,
		callback: (v) => shader.setUniform1f('uBrightness', v),
		easingFunction: Easing.easeInOutSine,
	})

	//Zooming
	addEventListener('wheel', (e: WheelEvent) => {
		const initZoom = shader.getUniform('uZoom') as FLOAT1
		const targetZoom = (initZoom + e.deltaY / 5000) as FLOAT1
		shader.setUniform1f('uZoom', targetZoom)
	})
}

main()
