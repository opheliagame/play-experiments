/**
@author opheliagame
@title  lissajous
@desc   simple math 
*/

export const settings = {
	backgroundColor: '#222'
}


import { densities, density1, density2, rdensity } from "./utils/density.js"
import { floor, length, mulN, vec2 } from '../src/modules/vec2.js'
import { fract, mod } from "../src/modules/num.js"
import { random } from "../sugarrush/generative.js"
import { colors, colors1, colors_wha } from "./utils/colors.js"
import { sdCircle, sdSegment } from '../src/modules/sdf.js'
import { pattern1, pattern2, pattern3, pattern4, pattern5, patterns } from "./utils/pattern.js"
import { circleSDF } from "../sugarrush/sdf.js"
import { fill } from "../sugarrush/draw.js"

let iColor = 0
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)

let sColors = colors_wha
let sDensity = densities[4]
let sPattern1 = patterns[iPattern1]
let sPattern2 = patterns[iPattern2]

console.log("colors: ", sColors)
console.log("sDensity: ", sDensity)

const x1 = Math.random() * 10
const y1 = Math.random() * 10

export function main(coord, context, cursor, buffer) {

	const t = context.time * 0.001
	const m = Math.min(context.cols, context.rows)
	const a = context.metrics.aspect

	let st = {
		x: 2.0 * (coord.x - context.cols / 2) / m * a,
		y: 2.0 * (coord.y - context.rows / 2) / m
	}

  let angle = Math.atan2(st.x, st.y) 

  let x = Math.sin(angle*x1)
  let y = Math.cos(angle*y1)
  let l1 = sdSegment(st, vec2(x*0.2, y*0.2), vec2(x*0.5, y*0.5), 0.2)
  // let l1 = sdSegment(st, vec2(-0.4, y*0.4), vec2(0.4, y*0.4), 0.2)

  let c1 = fill(circleSDF(vec2(st.x, st.y+0.3), vec2(x*0.2, y*0.2)), 0.1, 0.2);
  let c2 = fill(circleSDF(vec2(st.x, st.y-0.3), vec2(x*0.2, y*0.2)), 0.1, 0.2);
  let c = c1+c2

  let p1 = sPattern1(coord, context, t)
	let p2 = sPattern2(coord, context, t)

	return {
		// char: l1 < 0.0 ? sDensity[0] : '',
    char: c > 0.0 ? sDensity[0] : '',
    // char: angle > -90 && angle < 90 ? '1' : '',
    // char: length(st) < 0.5 ? '1' : '',

		color: c > 0.0 ? sColors[p1 % sColors.length] : 'white',
	}
}
