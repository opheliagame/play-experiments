/**
@author opheliagame
@title  monument 12
@desc  	hourglass figure
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
import { density1, density2, density3, density4, density6, rdensity } from './density.js';
import { sort } from '/src/modules/sort.js'
import { mul, mulN, sub, subN } from '../src/modules/vec2.js';
import { gnoise, random, vrandom } from '../lygia/generative.js';
import { colors_wha } from './colors.js';
import { circleSDF, polySDF, starSDF } from '../lygia/sdf.js';
import { fill, stroke } from '../lygia/draw.js'
import { pattern1, pattern2 } from './pattern.js';
import { block1 } from './blocks/block1.js';

const { sin, cos, floor, pow, max, atan2, PI } = Math

const colors = colors_wha;

let d1 = rdensity
let d2 = rdensity
let d3 = rdensity
let d4 = rdensity

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

  let mod1 = Math.floor((b) + (b%2*t) + (b%3*t)) % d1.length

	return {
		// char: s1 > 0.0 ? d1[mod1] 
		// 			: s2 > 0.0 ? d2[mod1] 
		// 			: s3 > 0.0 ? d3[mod1] 	
		// 			: s4 > 0.0 ? d4[mod1] : '',	
		char: b ? d1[mod1] : '',
		// char: st.y,
    // char: clamp(coord.y, 20, context.rows/4),
		color: b ? colors[0] : 'white',
		backgroundColor: '#222',

	}
}

