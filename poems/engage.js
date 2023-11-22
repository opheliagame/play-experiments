/**
@author opheliagame
@title  engage
@desc   are we engaging or mining
*/

import { sdCircle, sdSegment, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mul, dot, mulN, addN, floor } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, clamp, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { CGA } from '/src/modules/color.js'

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

const density1 = 'material'
const density2 = 'engage'
// test
// let points = [32, 31, 30]
// let seed = [32, 31, 30]
// let threshs = [10, 10, 10]
let points = []
let seed = []
let threshs = []

export function boot(context) {
	for(let i = 0; i < 5; i++) {
		let rx = Math.floor(Math.random() * context.cols) 
		points.push(rx, rx-1, rx+1)
		seed.push(rx, rx-1, rx+1)
		
		let rt = Math.floor(Math.random() * context.rows/3)+5
		threshs.push(rt)
	}
}
let f = 0
let width = 1

export function pre(context, cursor, buffer, data) {
	// let rx = Math.floor(Math.random() * context.cols) 
	// let ry = Math.floor(Math.random() * context.rows)
	// let index = rx + ry * context.cols
	
	if(context.frame % 5 == 0 && f <= context.rows) {
		for(let i = 0; i < seed.length; i++) {
			let index = seed[i]
			let yoff = context.cols*f
			
      for(let j = -width; j < width; j++) {
        points.push(index + j + yoff)
      }

      // TODO: later tree structure
			// threshold
			// let t = threshs[i]
			// if(f > t) {
			// 	let xoff = Math.floor(Math.random()*(f-t))	
			// 	for(let k = 4; k < context.rows/2; k+=4) {
			// 		let speed = Math.random()*4.0
			// 		xoff = Math.floor((f-t)*2)
					
			// 		points.push(index-(xoff%k)+yoff)
			// 		points.push(index+(xoff%k)+yoff)
			// 	}
			// }
			
		}
		f += 1
    if(f % 3 == 0) {
      width += 1

    }
	}

	
	// points.push(index)
}

let pointsLength = seed.length

export function main(coord, context, cursor, buffer) {
  const t = context.time * 0.0005
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect
  const f = context.frame
  const {x, y, index} = coord
  
  let st = {
    x: 2.0 * (coord.x - context.cols / 2) / m * a,
    y: (coord.y/context.rows) 
  }
  
  if(f % Math.floor(Math.random()*f*0.2) == 0) {
	  pointsLength += 1
  }
  let xoff = Math.floor(gnoise(x+t)*2 + gnoise(y))
  
  let isEmpty = gnoise(index) < 0.3
  let isFilled = points.slice(0, pointsLength).includes(index)
  
  let mod1 = Math.floor(x+y)
  let mod2 = Math.floor(x+y+t*2)
  
  return {
	  char: isFilled
	  		? density2[mod1 % density2.length] 
	  		// : isEmpty ? '' : density1[mod1 % density1.length],
	  		: density1[mod1 % density1.length],
	  color: isFilled ? 'white' : 'black',
	  backgroundColor: isFilled ? 'blue' : 'white'
  }
  
}

