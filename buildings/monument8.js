/**
@author opheliagame
@title  monument 8
@desc   kaju katli  
*/

export const settings = {
	fontSize: '18px',
  once: true,
  backgroundColor : 'white'
}

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';
import { CGA } from '/src/modules/color.js' 
import { random, gnoise } from '../lygia/generative.js'
import { lineSDF, circleSDF, polySDF, sdRhombus } from '../lygia/sdf.js'
import { density } from './density.js'
import { addN, subN } from '../src/modules/vec2.js'
const { floor, sin, cos, tan, PI, abs } = Math

const seed = Math.random()*10000.0
const colors = ['mediumvioletred', 'gold', 'orange', 'chartreuse', 'blueviolet', 'deeppink'];

let points = []

let N = 3
let prev = 0
for(let i = -1; i < 1; i+=1/(N-1)) {
	let off, p
	if(prev == 0) {
		off = 0.5 + (Math.random()*2-1)*0.2
		p = vec2(off, i)
	}
	else {
		off = prev + (Math.random()*2-1)*0.5
		p = vec2(off, i)
	}
	prev = off
	points.push(p)
}

export function main(coord, context, cursor, buffer) {
	const t  = context.time * 0.001
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
  // st = subN(mulN(st, 2.0), 1.0)
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 2.0) - 0.5
	}


  let sdf1 = sdRhombus(st, vec2(0.25, 0.5))
  sdf1 = polySDF(st, 8);
  // console.log(sdf1)
  let c = circleSDF(st, vec2(0.0, 0.0))
  let sh = fill(sdf1, 0.5, 0.1)


  return {
    
    char: sh > 0.0 ? density[0] : '',
    // char: st.y,
		// char: length(sub(st, vec2(0.0, 0.5))) < 0.5 ? density[mod1] : '', 
    // color: colors[mod2 % colors.length]
  }
}
