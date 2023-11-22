/**
@author opheliagame
@title  ね
@desc   #6 series khana kha liya?
*/

export const settings = {
  fontSize: '16px',
	fontFamily: 'IBM Plex Mono',
  fontWeight: 'bold'
}

function random(x) {
  return fract(Math.sin(x) * 43758.5453);
}

function vrandom(st) {
	return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}


function gnoise(x) {
  let i = Math.floor(x);  // integer
  let f = fract(x);  // fraction
  return mix(random(i), random(i + 1.0), smoothstep(0., 1., f));
}
function cubic(v) {
	return mul(mul(v, v), (addN(mulN(v, -2.0), 3.0)));
}

function vgnoise(st) {
    let i = vec2(floor(st.x), floor(st.y));
    let f = vec2(fract(st.x), fract(st.y));
    let a = vrandom(i);
    let b = vrandom(add(i, vec2(1.0, 0.0)));
    let c = vrandom(add(i, vec2(0.0, 1.0)));
    let d = vrandom(add(i, vec2(1.0, 1.0)));
    let u = cubic(i);
	// console.log(f)
    return mix( a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
}

const colors = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']
let yellow = '#fffd74'

let density = 'ね';
// let density = 'ne';


import { sdCircle, sdSegment, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mul, dot, mulN, addN, floor } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, clamp, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { CGA } from '/src/modules/color.js'
import { lineSDF, circleSDF } from '../sugarrush/sdf.js'

const { sin, cos, tan, PI, abs } = Math


function frame1(coord, context) {
	let cond = (coord.x == Math.floor(context.cols/2))
			&& (coord.y == Math.floor(context.rows/2))

	let mod1 = coord.x-1
	
	mod1 = mod1 % density.length
	
	
	return cond ? density[0] : ''
		

}

function frame2(coord, context) {
	const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	const st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	// let cond = circleSDF(st, vec2(0.5, 0.5)) < 0.5;
	let cond = sdCircle(st, 0.5) < 0.0;
  // console.log(circleSDF(st, vec2(0.5, 0.5)))
	
	let mod1 = coord.x-1
	
	mod1 = mod1 % density.length
	
	
	return cond ? density[mod1] : ''
		

}

function frame3(coord, context) {
  const t = context.time * 0.001
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

  const st = {
    x : 2.0 * (coord.x - context.cols / 2) / m * a,
    y : 2.0 * (coord.y - context.rows / 2) / m
  }

  
  let x = Math.floor(st.x*3.0);
  let y = (st.y*80.0) % 1.0;
  
  st.y += Math.sin(st.x*120.0+t)

  let cond = sdSegment(st, vec2(-1.0, y), vec2(1.0, y), 0.15) < 0.0;
  // console.log(circleSDF(st, vec2(0.5, 0.5)))

  let mod1 = coord.x-1

  mod1 = mod1 % density.length


	
	return cond ? density[mod1] : ''
		

}


export function main(coord, context, cursor, buffer) {
  const t = context.time * 0.0005
  const f = context.frame
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

  let st = {
    x: 2.0 * (coord.x - context.cols / 2) / m * a,
    y: (coord.y/context.rows) 
  }
  
  let f1 = frame1(coord, context)
  let f2 = frame2(coord, context)
  let f3 = frame3(coord, context)
	// let f4 = frame4(coord, context)
	// let f5 = frame5(coord, context)
	// let f6 = frame6(coord, context)
	// let f7 = frame7(coord, context)
	// let f8 = frame8(coord, context)
	
  let arr = [f1, f2, f3]
  let timer = Math.floor(f/20)
	let mod1 = (coord.x + coord.y) % colors.length

  let char = arr[timer % arr.length]

  return {
    char: char,
    backgroundColor: char == '' ? colors[mod1] : 'white',
    color: char == '' ? 'white' : 'black'
		// char: density[0],
		// char: f2,
		
  }
 
 
  

}

