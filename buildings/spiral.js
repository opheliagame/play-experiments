/**
@author opheliagame
@title  spiral
@desc   
*/

export const settings = {
	fontSize: '18px',
	backgroundColor: '#222'
}


const { sin, cos, tan, PI } = Math
import { density1, density2, rdensity } from "./utils/density.js"
import { floor, mulN, vec2 } from '../src/modules/vec2.js'
import { fract } from "../src/modules/num.js"
import { gnoise, random } from "../sugarrush/generative.js"
import { lineSDF } from "../sugarrush/sdf.js"
import { rcolor } from "./utils/colors.js"
import { sdSegment } from '../src/modules/sdf.js'

const density = rdensity
const seed = Math.random()*1000
const seedx = Math.floor(Math.random()*2400)
const seedy = Math.floor(Math.random()*2400)
// const colors = rcolor

const swidth = Math.random() * 10

export function main(coord, context, cursor, buffer) {

	let t = context.time * 0.001
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

	let index = Math.pow(x, Math.sin(y)*2) 
	// index = x

  // previous
	let st1 = floor(mulN(st, 6))
	// let rx = (gnoise(st.y+seed)) - Math.abs(Math.sin(st.y+seed))
  // let rx1 = gnoise(st.y * 2 + seed)

	let rxh = gnoise(st.y+swidth+t)
	let rxl = Math.abs(Math.sin(st.y*5 - t)) * rxh 
	let rxr = Math.abs(Math.sin(st.y*5 + t)) * rxh 
	let s1 = sdSegment(st, vec2(-rxl, st.y), vec2(rxr, st.y), 0.01)
	// let s1 = sdSegment(st, vec2(-rx, st.y), vec2(rx1, st.y), 0.01)

	let move = Math.abs(Math.sin(x+t) * density.length)

	index = Math.floor(index + move) % density.length
	// index = Math.floor(index+move) % density.length;

	// return mody
	return {
		char: density[index],
		char: s1 < 0.0 ? density[index] : '',
		color: s1 < 0.0 ? rcolor : 'white',
	}
}
