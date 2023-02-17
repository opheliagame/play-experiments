/**
@author opheliagame
@title  monument 7
@desc    
*/

export const settings = {
	fontSize: '18px',
  // once: true,
  backgroundColor : 'white'
}

// const density = 'have you eaten'


import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';
import { CGA } from '/src/modules/color.js' 
import { random, gnoise } from '../lygia/generative.js'
import { lineSDF } from '../lygia/sdf.js'
import { density } from './density.js'
const { floor, sin, cos, tan, PI, abs } = Math

const seed = Math.random()*10000.0
const colors = ['mediumvioletred', 'gold', 'orange', 'chartreuse', 'blueviolet', 'deeppink'];

export function main(coord, context, cursor, buffer) {
	const t  = context.time * 0.001
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}

	st.x += random(st.y)*0.2
	st.y += random(st.x)*0.2

	let n = gnoise(st.y*1.0)
	let c1 = sdCircle(st, 0.5)
	let c2 = sdCircle(add(st, vec2(0.5, 0.0)), 0.5)
	let c3 = sdCircle(add(st, vec2(0.0, 0.5)), 0.5)
	let c = c1

	let mod1 = Math.floor(Math.abs(sin(c1)*10)) % density.length

  return {
    
    char: c < 0.0 ? density[mod1] : '', 
    // color: colors[mod1 % colors.length]
  }
}
