/**
@author opheliagame
@title  monument 7
@desc   fluffy suds 
*/

export const settings = {
	fontSize: '18px',
  // once: true,
  backgroundColor : 'white'
}

// TODO: layering circles with block structure 

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';
import { CGA } from '/src/modules/color.js' 
import { random, gnoise } from '../lygia/generative.js'
import { lineSDF, circleSDF } from '../lygia/sdf.js'
import { density } from './density.js'
import { addN } from '../src/modules/vec2.js'
import { colors_wha } from './colors.js'
const { floor, sin, cos, tan, PI, abs } = Math

const seed = Math.random()*10000.0
const colors = colors_wha

let points = []

let N = 2
let prev = 0
for(let i = -1; i < 1; i+=1/(N-1)) {
	let off, p
	if(prev == 0) {
		off = 0.5 + (Math.random()*2-1)*0.2
		p = vec2(off, i)
	}
	else {
		off = prev + (Math.random()*2-1)*0.3
		p = vec2(off, i)
	}
	prev = off
	points.push(p)
}

export function main(coord, context, cursor, buffer) {
	const t  = context.time * 0.001
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let res = 4

	let st = {
		x : res * (coord.x - context.cols / 2) / m * a,
		y : res * (coord.y - context.rows / 2) / m
	}
	
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}

	// st.x += random(st.y)*0.2
	// st.y += random(st.x)*0.2

	let dim = 3
	let fx = Math.floor((st.x*dim))/dim
	let fy = Math.floor((st.y*dim))/dim

	// let rx = map(st.x, 0, 1, )

	let n = gnoise(st.y*1.0)
	let c1 = sdCircle(st, 0.5)

	let circles = []
	let cf = 1
	for(let i = 0; i < points.length; i++) {
		let p = points[i]
		let x = p.x + gnoise(st.x+t)*0.2
		let y = p.y + gnoise(st.y+t)*0.2
		// let c1 = circleSDF(st, vec2(x, y))-0.7
		let c1 = circleSDF(st, vec2(x, y))-map(st.y, -1, 1, 0, 1.5)*1.2 //make longer fluidity
		let c2 = circleSDF(st, vec2(x, y))-0.7
		let c3 = circleSDF(st, vec2(x, y))-0.9
		
		// let f1 = opSmoothSubtraction(c2, c1, 0.5)
		// f1 = c1*c2

		cf = opSmoothUnion(cf, (c1), 0.0)
	}

	if(st.y < -res+0.2 || st.y > res-0.2) {
		cf = 0
	}

	let c2 = circleSDF(st, vec2(fx, fy))-0.3
	let c3 = circleSDF(st, vec2(-0.5, 0.0))-0.5
	// let c = opSmoothUnion(c2, c3, 0.5)
	// c = c1

	let mod1 = Math.floor(Math.abs((fract(cf)) * sin(cf)  )) % density.length
	let mod2 = Math.floor(Math.abs(sin(cf*2.0)*2.0* sin(st.y*10.0 + st.x *10.0 + t) * colors.length)) 


	mod2 = Math.floor(Math.abs(sin(st.y*10.0 + st.x *10.0 + t)) + length(addN((vec2(cf, cf)), -t*0.1)) * colors.length * 4.0 )
	// console.log(mod2)

  return {
    
    char: cf < 0.0 ? density[mod1] : '',
    // char: density[mod1],
		// char: length(sub(st, vec2(0.0, 0.5))) < 0.5 ? density[mod1] : '', 
    color: colors[mod2 % colors.length]
  }
}
