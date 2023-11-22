/**
@author opheliagame
@title  monument 11
@desc  	bezier
*/

export const settings = {
	backgroundColor: '#222',
}

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { clamp, map, fract } from '/src/modules/num.js'
import { vec2, length, add, mul } from '/src/modules/vec2.js'
import { densities, density1, density2, rdensity } from './utils/density.js';
import { colors, colors_wha } from './utils/colors.js';
import { circleSDF, lineSDF, polySDF, starSDF } from '../sugarrush/sdf.js';
import { fill, stroke } from '../sugarrush/draw.js'
import { pattern1, patterns } from './utils/pattern.js';
import { abs, dist, mulN, sub } from '../src/modules/vec2.js';
import { gnoise, random } from '../sugarrush/generative.js';
import { vrandom } from '../sugarrush/generative.js';

const { sin, cos, floor, pow, max, atan2, PI } = Math

let iColor = Math.floor(Math.random() * colors.length)
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)


let sColors = colors[iColor]
// let sColors = [colors[iColor]]
let sDensity = densities[iDensity]
let sPattern1 = patterns[iPattern1]
let sPattern2 = patterns[iPattern2]

const seed1 = Math.random()*10000.0

export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
	const a = context.metrics.aspect
	let t = context.time*0.001
  t = 0.0

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 2.0) - 0.5
	}

  let mod1 = sPattern1(coord, context, t)

  let angle = Math.sin(atan2(st.y, st.x)*10.0 + st.x*20.0)*10.0
  let mod2 = Math.tan(st.y*10.0+2.0)*10.

  let st1 = mulN(st, angle)
  st1 = vec2(Math.floor(Math.abs(st1.x)+seed1), Math.floor(st1.y))

  let l = sdSegment(st, vec2(-0.01, st.y), vec2(0.01, st.y), 0.1)
  // let rb = (vrandom(st1) < 0.5 && l < 0.0) ? 1 : 0
  let rb = (vrandom(st1) < 0.5) ? 1 : 0

	return {
    char: rb == 1 ? sDensity[mod1 % sDensity.length] : '',
    // char: l < 0.0 ? '/' : '',
    // char: angle,
    color: sColors[mod1 % sColors.length] 
		
	}
}

