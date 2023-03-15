import Easing from './Easings'

interface TweenSettings<Type> {
	/**Initial value */
	from: Type
	/**Final value */
	to: Type
	/**Duration in `miliseconds` */
	duration: number
	/**Callback called each frame of tween with new value */
	callback: (value: Type) => any
	/**Easing function
	 *
	 * Default: `Easing.linear`
	 */
	easingFunction?: any
}

type TweenType = number | number[]

export default function Tween<T extends TweenType>(settings: TweenSettings<T>) {
	const isArray = Array.isArray(settings.from)
	const from = (isArray ? settings.from : [settings.from]) as number[]
	const to = (isArray ? settings.to : [settings.to]) as number[]
	const arrayLength = from.length
	const easingFn = settings.easingFunction ?? Easing.linear
	const callback = settings.callback
	const startTime = performance.now()
	const endTime = performance.now() + settings.duration

	const frameLoop = (currentTime: DOMHighResTimeStamp) => {
		const rawT = (currentTime - startTime) / (endTime - startTime)
		const t = easingFn(rawT > 1 ? 1 : rawT < 0 ? 0 : rawT)
		const value = new Array<number>(arrayLength)
		for (let i = 0; i < arrayLength; i++) value[i] = from[i] + (to[i] - from[i]) * t
		callback((isArray ? value : value[0]) as T)
		if (rawT < 1) requestAnimationFrame(frameLoop)
	}

	requestAnimationFrame(frameLoop)
}
