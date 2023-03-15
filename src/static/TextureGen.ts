import TextureGenWorkerPath from '../workers/TextureGenWorker?worker&url'

export default class TextureGenWorker {
	private static worker: Worker
	static {
		this.worker = new Worker(TextureGenWorkerPath, { type: 'module' })
		this.worker.addEventListener('error', (ev) => console.error(ev.error))
	}

	public static generate(
		size: number,
		julia: number = 0.584,
		iterations: number = 14
	): Promise<Float32Array> {
		return new Promise((res, _) => {
			//Request render
			this.worker.postMessage({ size, julia, iterations })
			console.log('[Client] Render(' + size + 'x' + size + ') request sent!')

			//Listen for answer
			this.worker.addEventListener('message', ({ data }) => res(data), { once: true })
		})
	}
}
