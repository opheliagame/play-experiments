/**
@author opheliagame
@title  sdf 1
@desc   
*/

import { sdCircle, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';
import { CGA } from '/src/modules/color.js'
import { density } from './density.js'

console.log(CGA)

const { sin, cos, tan, atan2 } = Math


export const settings = { 
	fontSize: '16px'	
}


// density = sort('▚▀abc|/:÷×+-=?*· ', 'Simple Console', false)
// density = '.▇'
// const density = sort('/\\!?=-. ', 'Simple Console', false)

function sdPointedArch(st, r1, r2) { 
	let left = vec2(-r1, r2)
	let right = vec2(r1, r2)
	// let st1 = mulN(st, 0.3)
	let st1 = mulN(st, 1.0)
	
	// let a = st.y < 1.0 ? length(sub(st1, left))-1.0  : -1.0
	let a = length(sub(st1, left))-1.0
	// let b = st.y < 1.0 ? length(sub(st1, right))-1.0  : -1.0
	let b = length(sub(st1, right))-1.0

	// return 
	return Math.max(a, b) < 1.0 ? (Math.max(a, b)-0.0) : 1.0

}

function cart2polar(st) {
    return vec2(atan2(st.y, st.x), length(st));
}


export function main(coord, context, cursor, buffer) {

  // console.log(CGA)
	
	const t  = context.time * 0.001
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	// st.x = st.x + fract(sin(st.y*4.)) 
	// st = cart2polar(st)
	
	let pt = {
		x : st.x,
		y : fract(st.y * 1.0) - 0.5
	}
  // pt = st
	

	const radius = 0.5
	const d = sdCircle(pt, radius)

  const sdf1 = sdPointedArch(pt, 1.0, 1.0)
  const sdf2 = sdPointedArch(pt, 1.0, -1.0)
  const sdf3 = 1.0-opSmoothUnion(sdf1, sdf2, 0.0)

	const s1 = smootherstep(0.5, 0.6, sdf1)
	const s2 = smootherstep(0.5, 0.6, sdf2)
	const s3 = smootherstep(0.5, 0.6, sdf3)
  
  // const s1 = sdCircle(pt0.5)
  const sh1 = stroke(sdf1, 0.6, 0.1, 0.001)
  const sh2 = stroke(sdf2, 0.6, 0.1, 0.001)
  // const sh3 = stroke(sdf3, 0.2, 0.1, 0.001)
  const sh4 = stroke(sdf3, 0.6+t, 0.05, 0.001)
  
  
	const c = 1.0 - Math.exp(-5 * Math.abs(d))
	const index = Math.floor(c * density.length)

	// return s1 < 1.0 ? '/' : ''
	// return st.x > 0.0 ? 
  
  
  let n = 0
  for(let i = 0; i < 5; i++) {
    const sh3 = stroke(sdf3, i/5, 0.1 , 0.001)
    n += sh3
  }
  
  let char 

  if(st.x > -1.0) {
    char = density[Math.floor((n*(st.y+st.x)))%density.length]
  }
  else {
    char = 0
  }

  let color = Math.floor(Math.abs(st.x*16)) % CGA.length
  color = n ? Math.floor(n) % CGA.length : 0
  // console.log(n)

	return {
		char : (s2) < 1.0 ? density[Math.floor(s1*t)%density.length] : '',
		char : s2*s1 < 1.0 ? '/' : '',
		char : density[Math.floor((n*(st.y+st.x))*t*2.0)%density.length],
		// char: density[Math.floor(s1*t)%density.length]
		color : CGA[color].hex
	}
	
}
