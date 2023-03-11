import BackgroundRenderer from './BackgroundRenderer'
import Easing from './Easings'
import './style.css'

const bgCanvas = document.querySelector<HTMLCanvasElement>('#bgCanvas')!
BackgroundRenderer.init(bgCanvas, { textureSize: '512' }).then(() =>
	BackgroundRenderer.setShaderUniform('uZoom', 0.1)
)
//@ts-ignore
window.a = BackgroundRenderer
//@ts-ignore
window.e = Easing

addEventListener('keydown', (e) => {
	if (e.code === 'ArrowLeft')
		BackgroundRenderer.smoothSetUniformf3(
			'uBackColor',
			[Math.random(), Math.random(), Math.random()],
			500,
			Easing.easeOutExpo
		)
	else if (e.code === 'ArrowRight')
		BackgroundRenderer.smoothSetUniformf3(
			'uFrontColor',
			[Math.random(), Math.random(), Math.random()],
			500,
			Easing.easeOutExpo
		)
	else if (e.code === 'Space') {
		BackgroundRenderer.smoothSetUniformf3(
			'uFrontColor',
			[0.31476452946662903, 0.11928534507751465, 0.1182316467165947],
			1500,
			Easing.easeOutExpo
		)
		BackgroundRenderer.smoothSetUniformf3(
			'uBackColor',
			[0.038699228316545486, 0.08080769330263138, 0.6877708435058594],
			1500,
			Easing.easeOutExpo
		)
		BackgroundRenderer.smoothSetUniformf1('uZoom', 1, 1500, Easing.easeOutExpo)
	}
})

//0.31476452946662903, 0.11928534507751465, 0.1182316467165947
//0.038699228316545486, 0.08080769330263138, 0.6877708435058594
