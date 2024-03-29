/**
@author opheliagame
@title  watermelon 
*/

export const settings = {
	backgroundColor: '#222',
	// once: true,
	fontSize: '12px',
	// rows: 25,
	// cols: 500,
}


import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { clamp, map, fract } from '/src/modules/num.js'
import { vec2, length, add } from '/src/modules/vec2.js'
import { densities, rdensity } from '../utils/density.js';
import { sort } from '/src/modules/sort.js'
import { mul, mulN, sub, subN } from '../../src/modules/vec2.js';
import { colors, colors_wha } from '../utils/colors.js';
import { block1 } from '../blocks/block1.js';
import { pattern6, patterns } from '../utils/pattern.js';

const { sin, cos, floor, pow, max, atan2, PI } = Math

let iColor = Math.floor(Math.random() * colors.length)
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)


let sColors = colors[iColor]
// let sColors = [colors[iColor]]
let sDensity = densities[iDensity]
let sPattern1 = pattern6
let sPattern2 = patterns[iPattern2]




export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
	const a = context.metrics.aspect
	const t = context.time*0.001

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}


  let c1 = vec2(coord.x, clamp(coord.y, 0, context.rows/4))
  let c2 = vec2(coord.x, clamp(coord.y, context.rows/4, context.rows*2/4))
  let c3 = vec2(coord.x, clamp(coord.y, context.rows*2/4, context.rows*3/4))
  let c4 = vec2(coord.x, clamp(coord.y, context.rows*3/4, context.rows))
  let b1 = block1(c1, context, -0.8, 0.8)
  let b2 = block1(c2, context, -0.8, 0.8)
  let b3 = block1(c3, context, -0.8, 0.8)
  let b4 = block1(c4, context, -0.8, 0.8)
  let b = b1 + b2 + b3 + b4
	
	if(coord.y < 5 || coord.y > (context.rows-5)) {
		b = 0
	}
	let mod1 = Math.floor((b) + (b%2*t) + (b%3*t))

  // let mod1 = sPattern1(coord, context, t)
  let mod2 = sPattern1(coord, context, 0)

	return {
		// char: b1 > 0.0 ? sDensity[mod1] 
		// 			: b2 > 0.0 ? sDensity[mod1] 
		// 			: b3 > 0.0 ? sDensity[mod1] 	
		// 			: b4 > 0.0 ? sDensity[mod1] : '',	
		char: b ? sDensity[mod1 % sDensity.length] : '',
		// char: st.y,
    // char: clamp(coord.y, 20, context.rows/4),
		color: b ? sColors[mod2 % sColors.length] : 'white',
		backgroundColor: '#222',

	}
}

