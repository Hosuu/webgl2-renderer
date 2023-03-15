export default null

self.addEventListener('message', handleMessage.bind(this))

function handleMessage(event: MessageEvent) {
	const { size, julia, iterations } = event.data

	console.time('Render time')
	const textureBuffer = new Float32Array(size * size)
	const p = new Vector2(0, 0)

	for (let x = 0; x < size; x++)
		for (let y = 0; y < size; y++) {
			let prevDist = 0
			let totalChange = 0

			p.set(x / size - 0.5, y / size - 0.5)

			for (let k = 0; k < iterations; k++) {
				p.abs().div(Vector2.dot(p, p))
				p.x -= julia
				p.y -= julia

				const dist = p.length()
				totalChange += Math.abs(dist - prevDist)
				prevDist = dist
			}

			if (isNaN(totalChange) || !isFinite(totalChange) || totalChange >= 1000)
				totalChange = 1000

			textureBuffer[y * size + x] = totalChange
		}
	console.timeEnd('Render time')

	postMessage(textureBuffer, [textureBuffer.buffer])
}

class Vector2 {
	public x: number
	public y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	set(x: number, y: number): Vector2 {
		this.x = x
		this.y = y
		return this
	}

	length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	div(scalar: number): Vector2 {
		this.x /= scalar
		this.y /= scalar
		return this
	}

	abs(): Vector2 {
		this.x = Math.abs(this.x)
		this.y = Math.abs(this.y)
		return this
	}

	static dot(vec1: Vector2, vec2: Vector2): number {
		return vec1.x * vec2.x + vec1.y * vec2.y
	}
}
