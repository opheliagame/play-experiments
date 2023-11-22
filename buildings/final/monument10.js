/**
@author opheliagame
@title  monument 10
@desc  	starry night
*/

export const settings = {
	backgroundColor: '#222',

}

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '../../src/modules/sdf.js'
import { clamp, map, fract } from '../../src/modules/num.js'
import { vec2, length, add } from '../../src/modules/vec2.js'
import { densities } from '../utils/density.js';
import { sort } from '../../src/modules/sort.js'
import { mulN, sub, subN } from '../../src/modules/vec2.js';
import { gnoise, random, vrandom } from '../../sugarrush/generative.js';
import { colors } from '../utils/colors.js';
import { circleSDF, polySDF, starSDF } from '../../sugarrush/sdf.js';
import { fill, stroke } from '../../sugarrush/draw.js'
import { pattern1, patterns } from '../utils/pattern.js';

const { sin, cos, floor, pow, max, atan2, PI } = Math

let density = densities[1]

export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
	const a = context.metrics.aspect
	const t = context.time*0.0001

	let st1 = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}
	let st2 = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}

	let sdf1 = polySDF(st2, 6)
	let sdf2 = starSDF(st1, 3, 0.03)
	// let sdf2 = starSDF(st1, 6, 0.11)
	let s1 = opSmoothUnion(sdf1, sdf2, Math.abs(sin(t*0.001)))
	// sdf1 = starSDF(st, 6, 0.11)
	// sdf1 = starSDF(st, 9, 0.06)
	let f1 = fill(sdf2, 0.25, 0.01)

	let st = st1
  let mod1 = Math.floor(Math.abs((coord.x/context.rows)*10.0 + sin(st.y*2.0))) % density.length
	mod1 = Math.floor(Math.abs(atan2(st.y*2-1, st.x*2-1)) * density.length) % density.length

	let mod2 = atan2(st2.y, st2.x)/PI*2*7
	mod2 = Math.floor(mod2)+0.5/7
	mod2 = Math.floor(mod2 * density.length) % density.length 

	let y = fract(st.x*4.0) < 0.5 ? st.y+st.x : st.y-st.x

	let mod3 = pattern1(y, 20)

	let nx = pow(sin(Math.abs(st.y)), 3)*0.8
	let s2 = sdCircle(st2, nx)
	let s3 = 1.0-fill(polySDF(st2, 6), 0.2, 0.01)

	let s = opSmoothUnion(s2, s3, 0.5)

	mod3 = Math.floor(mod3 * density.length) % density.length 

	return {
		char: f1 > 0.0 ? density[mod3] : '',
		// char: s < 0.0 ? density[mod3] : '',
		// char: fract(st.x*4.0) < 0.5 ? '/' : '',

		// char: (st.x+y) < 0.5 ? '/' : '',
		// color: colors[0]
	}
}

