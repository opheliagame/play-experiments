/**
@author opheliagame
@title  flower
@desc  	parts of sum
*/

export const settings = {
	backgroundColor: '#222',
}


import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '../../src/modules/sdf.js'
import { clamp, map, fract } from '../../src/modules/num.js'
import { vec2, length, add } from '../../src/modules/vec2.js'
import { densities, rdensity } from '../utils/density.js';
import { sort } from '../../src/modules/sort.js'
import { mulN, sub, subN } from '../../src/modules/vec2.js';
import { gnoise, random, vrandom } from '../../sugarrush/generative.js';
import { colors, colors_wha, green, lavender, rcolor, stone } from '../utils/colors.js';
import { circleSDF, polySDF, starSDF } from '../../sugarrush/sdf.js';
import { fill, stroke } from '../../sugarrush/draw.js'
import { pattern1, pattern2, pattern4, patterns } from '../utils/pattern.js';
import { movement1, movement2 } from '../utils/movement.js';


let iColor = Math.floor(Math.random() * colors.length)
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)

// let sColors = colors_wha
let sColors = [colors[iColor]]
let sDensity = densities[iDensity]
let sPattern1 = patterns[iPattern1]
let sPattern2 = pattern4

console.log("colors: ", sColors)
console.log("sDensity: ", sDensity)

let d1 = rdensity
let d2 = rdensity
let d3 = rdensity
let d4 = rdensity

export function main(coord, context, cursor, buffer) {
	const m = Math.max(context.cols, context.rows)
	const a = context.metrics.aspect
	const t = context.time*0.0001

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	let mod_st1 = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}
	
	let s1 = fill(circleSDF(st, vec2(0.0, -0.10)), 0.08, 0.01)
	let s2 = fill(polySDF(add(st, vec2(0.0, -0.1)), 5), 0.08, 0.01)
	// let s3 = fill(polySDF(add(st, vec2(0.0, 0.0)), 6), 0.05, 0.01)
 	let s3 = fill(starSDF(add(mod_st1, vec2(0.0, -0.15)), 3, (0.28)), 0.18, 0.01)
	let s4 = fill(starSDF(add(mod_st1, vec2(0.0, -0.25)), 3, Math.sin(0.28)), 0.18, 0.01)

	let s = s1 + s2 + s3 + s4
	// s = s2

	// let st1 = {
	// 	x: coord.x/context.cols ,
	// 	y: coord.y/context.rows
	// }
	// st = st1
	let y = fract(st.x*4.0) < 0.5 ? st.y+st.x : st.y-st.x
	// let mod1 = Math.floor(pattern1(y, 20)) % density1.length
	let mod1 = pattern2(coord, context) % d1.length

	let mod_st2 = vec2(st.x, st.y)
	mod_st2.y += Math.abs(Math.sin(st.x*10.0)) * 10.0
	// let mod2 = Math.abs((mod_st2.y*2.0 ))
	// mod2 = Math.floor(mod2) % sColors.length

	let move = sPattern1(coord, context, t)

	return {
		char: s1 > 0.0 ? d1[mod1] 
					: s2 > 0.0 ? d2[mod1] 
					// : s3 > 0.0 ? d3[mod1] 	
					// : s4 > 0.0 ? d4[mod1]
					 : '',	
		char: s > 0.0 ? d1[mod1] : '',
		color: s > 0.0 ? sColors[move % sColors.length] : 'white',

	}
}

