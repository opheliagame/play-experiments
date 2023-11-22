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

const seed = Math.random()*10000.0
const seed2 = Math.random()*10000.0

export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
	const a = context.metrics.aspect
	let t = context.time*0.001
	t = 0

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 2.0) - 0.5
	}

  let ry = Math.round(st.y*8.0)/8.0

	let fx = Math.round(st.x * 10.0)/10.0
	let fx1 = Math.sin(st.y*20+seed)*0.05 
	let l1 = sdSegment(st, vec2(-fx1, st.y), vec2(-fx1+0.05, st.y), 0.01)

  let rx = gnoise(ry*1000.0+seed)+0.05
	rx = rx * 0.05
	let rw = random(ry*100+seed2)*0.5+0.05 
	rw = rw * (ry+0.05)
  let l = sdSegment(st, vec2(-rx, ry), vec2(-rx+rw, ry), 0.08)

	// let l2 = 

	let lfinal = l

  let mod1 = sPattern1(coord, context, t)

	return {
		char: lfinal < 0.0 ? sDensity[mod1 % sDensity.length] : '',
		// char: l1 < 0.0 ? '/' : '',
    // char: ry,
    color: sColors[mod1 % sColors.length] 
		
	}
}
