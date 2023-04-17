/**
@author opheliagame
@title  block chain
*/

export const settings = {
  backgroundColor: '#222',
}

import { sdSegment, opSmoothUnion } from '../src/modules/sdf.js'
import { length, max, vec2, add, sub, mulN } from '../src/modules/vec2.js'
import { vec3 } from '../src/modules/vec3.js'
import {fract } from '../src/modules/num.js';
import { densities } from './utils/density.js'
import { colors } from './utils/colors.js'
import { circleSDF } from '../sugarrush/sdf.js'
import { clamp } from '../src/modules/num.js'
import { movement2 } from './utils/movement.js';
import { gnoise } from '../sugarrush/generative.js';
import { pattern3, pattern4, patterns } from './utils/pattern.js';



let iColor = 0
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)

let sColors = [...colors]
let sDensity = densities[iDensity]
let sPattern1 = pattern4
let sPattern2 = pattern4

console.log("colors: ", sColors)
console.log("sDensity: ", sDensity)

const seed = Math.random()*10000.0

let points = []

let N = 4
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

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}

  let dim = 4.0
  let fy = Math.floor((st.y*dim))
  let rn = gnoise(fy+dim+1+seed+t*0.5)
  let y = clamp(st.y, -0.8, 0.8)
  
  // let sdf1 = sdSegment(st, vec2(-rn, fract(st.y*4.0)*fy), vec2(rn, fract(st.y*4.0)*fy), 0.6)
  let sdf1 = sdSegment(st, vec3(-rn, y, 0.0), vec3(rn, y, 0.0), 0.01)

  // circle pattern
  let cf = 1
	for(let i = 0; i < points.length; i++) {
		let p = points[i]
		let x = p.x + gnoise(st.x+t)*0.2
		let y = p.y + gnoise(st.y+t)*0.2
		let c1 = circleSDF(st, vec2(x, y))-0.7
		// let c1 = circleSDF(st, vec2(x, y))-st.y make longer fluidity
		let c2 = circleSDF(st, vec2(x, y))-0.7
		let c3 = circleSDF(st, vec2(x, y))-0.9
		
		// let f1 = opSmoothSubtraction(c2, c1, 0.5)
		// f1 = c1*c2

		cf = opSmoothUnion(cf, (c1), 0.0)
	}

  let sign = Math.floor(st.y * 20.0) % 2 == 0 ? 1 : -1
  let mod1 = Math.floor(Math.abs((coord.x/context.rows)*10.0 + Math.sin(st.y*2.0)*2.0*sign + t*2.0*sign)) % sDensity.length

	let move = sPattern1(coord, context, t)


  return {
    char: sdf1  < 0.0 ? sDensity[move % sDensity.length] : '',
    // char: sDensity[mod2],
    
    color: sColors[move % sColors.length],
   
    // backgroundColor: sdf1  < 0.0 ? colors[mod2 % colors.length] : '#222',
  }
}
