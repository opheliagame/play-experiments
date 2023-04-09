/**
@author opheliagame
@title  lissajous
@desc   simple math 
*/

export const settings = {
	fontSize: '18px',
	backgroundColor: '#222'
}


const { sin, cos, tan, PI } = Math
import { density1, density2, rdensity } from "./utils/density.js"
import { floor, mulN, vec2 } from '../src/modules/vec2.js'
import { fract } from "../src/modules/num.js"
import { random } from "../sugarrush/generative.js"
import { rcolor } from "./utils/colors.js"
import { sdSegment } from '../src/modules/sdf.js'

const density = rdensity
const seed = Math.random()
const seedx = Math.floor(Math.random()*1200)
const seedy = Math.floor(Math.random()*1200)
// const colors = rcolor

export function main(coord, context, cursor, buffer) {

	const t = context.time * 0.001
	const m = Math.min(context.cols, context.rows)
	const a = context.metrics.aspect

	let st = {
		x: 2.0 * (coord.x - context.cols / 2) / m * a,
		y: 2.0 * (coord.y - context.rows / 2) / m
	}


	let pt = {
		x: fract(st.x * 2.0) - 0.5,
		y: fract(st.y * 4.0) - 0.5
	}

	let { cols, rows, frame } = context
	const { x, y } = coord

	// frame = frame / 10


	// -1 for even lines, 1 for odd lines
	const sign = y % 2 * 2 - 1
	let index = (cols + y + x * sign) % density.length

	let mody = 6 - floor((y / rows) * 6) + 1
	let cx = (sin(x * seedx) * density.length)
	let cy = (sin(y * seedy) * density.length)

	index = Math.floor(sin(x*y) * density.length)
	// index = (cx + cy) % density.length

	let st1 = floor(mulN(st, 6))
	let rx = (random(st1.y+seed))
	// rx = rx < 0.1 ? 0.1 : rx

	let s1 = sdSegment(st, vec2(-rx, st.y), vec2(rx, st.y), 0.01)

	let move = Math.sin(rx+t)

	index = Math.floor(index + move) % density.length

	// return mody
	return {
		char: density[index],
		char: s1 < 0.0 ? density[index] : '',
		color: s1 < 0.0 ? rcolor : 'white',
	}
}
