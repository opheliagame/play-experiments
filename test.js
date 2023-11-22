/**
@author opheliagame
@title  sab theek?
@desc   #4 series khana kha liya?
*/

export const settings = {
  fontSize: '32px',
  // once: true,
	// fontFamily: 'mon'
	// fontWeight: 600,

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

const colors = ['#000', '#222', '#666', '#ccc', '#fff']
let yellow = '#fffd74'

let density1 = ['大', '丈', '夫', '？'];
density1 = 'no'
// density1 = ['स', 'ब', 'ठ', 'ी', 'क', '?']
// density1 = 'allgood?'

import { sdCircle, sdSegment, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mul, dot, mulN, addN, floor } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { CGA } from '/src/modules/color.js'

const { sin, cos, tan, PI, abs } = Math

const seed = Math.random() * 10

export function main(coord, context, cursor, buffer) {
  const t = context.time * 0.05
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

  let st = {
    x: 2.0 * (coord.x - context.cols / 2) / m * a,
    y: (coord.y/context.rows) 
  }

  let x = coord.x/context.rows
    let rx = gnoise(st.x*6.) < 0.5 ? gnoise(st.x+t)*st.x : (-gnoise(st.x+t))*st.x
st.y += rx
	

  let pt = {
    x: fract(st.x * 2.0) - 0.5,
    y: fract(st.y * 4.0) - 0.5
  }
  
  let st1 = floor(mulN(st, gnoise(st.x+t)*14))
  
  let mod1 = vrandom(st1) * density1.length;
  
	mod1 = Math.floor(mod1) % density1.length
  mod1 = (coord.x) % density1.length
  
  return {
    char: density1[mod1],
	  // color: mod1 < 3 ? 'white' : 'black',
	  // color: coord.x % mod1 == 0 ? 'white' : 'black',
	  // backgroundColor: mod1 < 3 ? 'black' : 'white'
    rotation: Math.round(t*0.1),
  }

}

