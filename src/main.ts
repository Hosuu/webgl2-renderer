import BackgroundRenderer from './BackgroundRenderer'
import Easing from './Easings'
import './style.css'

const bgCanvas = document.querySelector<HTMLCanvasElement>('#bgCanvas')!
BackgroundRenderer.init(bgCanvas, { textureSize: '2048' }).then(async () => {
	BackgroundRenderer.setShaderUniform('uZoom', 0)
	BackgroundRenderer.setShaderUniform('uBrightness', 0)

	//Custom VBO for corner shading
	/* PATTERN
	[
		x, y,			s, t,			r, g, b
		x, y,   	s, t,			r, g, b
		x, y,   	s, t,			r, g, b
	 	x, y,   	s, t,			r, g, b
	]
	*/
	//prettier-ignore
	const customVBO = new Float32Array([
		+1, +1, 		1, 1, 	0.2, 1.0, 0.8,
		+1, -1, 		1, 0, 	1.0, 0.4, 0.9,
		-1, +1, 		0, 1, 	0.8, 1.0, 0.2,
		-1, -1, 		0, 0,		1.0, 0.8, 1.0,
	])
	BackgroundRenderer.setVBOdata(customVBO)

	//RandomDirection
	const angle = Math.random() * Math.PI * 2
	const x = Math.cos(angle)
	const y = Math.sin(angle)
	BackgroundRenderer.setShaderUniform('uDirection', [x, y])

	//Target color
	const targetFront = [0.3147, 0.1192, 0.1182] as [number, number, number]
	const targetBack = [0.0386, 0.0808, 0.5377] as [number, number, number]

	await sleep(700)

	BackgroundRenderer.smoothSetUniformf3('uFrontColor', targetFront, 2500, Easing.easeInOutSine)
	BackgroundRenderer.smoothSetUniformf3('uBackColor', targetBack, 2500, Easing.easeInOutSine)
	BackgroundRenderer.smoothSetUniformf1('uZoom', 1, 2500, Easing.easeOutBack)
	BackgroundRenderer.smoothSetUniformf1('uBrightness', 1, 2500, Easing.easeInOutSine)
})

addEventListener('keydown', (e) => {
	switch (e.code) {
		case 'ArrowLeft': {
			const newColor = [Math.random() ** 2, Math.random() ** 2, Math.random() ** 2] as any
			console.log('new front color')
			console.log(newColor)
			BackgroundRenderer.smoothSetUniformf3('uBackColor', newColor, 500, Easing.easeOutExpo)
			break
		}

		case 'ArrowRight': {
			const newColor = [Math.random() ** 2, Math.random() ** 2, Math.random() ** 2] as any
			console.log('new front color')
			console.log(newColor)
			BackgroundRenderer.smoothSetUniformf3('uFrontColor', newColor, 500, Easing.easeOutExpo)
			break
		}

		case 'Space': {
			const angle = Math.random() * Math.PI * 2
			const x = Math.cos(angle)
			const y = Math.sin(angle)
			BackgroundRenderer.setShaderUniform('uDirection', [x, y])
			break
		}

		case 'ArrowUp': {
			const iterations = BackgroundRenderer.getShaderUniform('uIterations')
			BackgroundRenderer.setShaderUniform('uIterations', iterations + 1)
			break
		}

		case 'ArrowDown': {
			const iterations = BackgroundRenderer.getShaderUniform('uIterations')
			BackgroundRenderer.setShaderUniform('uIterations', iterations - 1)
			break
		}
	}
})

addEventListener('wheel', (e: WheelEvent) => {
	const currentZoom = BackgroundRenderer.getShaderUniform('uZoom')
	const value = currentZoom + e.deltaY / 5000
	BackgroundRenderer.setShaderUniform('uZoom', value)
})

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

//DEBUG STATIC CLASS ACCESS
//@ts-ignore
window.BackgroundRenderer = BackgroundRenderer
//@ts-ignore
window.Easing = Easing
