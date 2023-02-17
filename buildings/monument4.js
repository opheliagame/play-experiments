/**
@author opheliagame
@title  monument 4
@desc   watermelon sugar 
*/

export const settings = {
	fontSize: '18px',
  // once: true,
  backgroundColor : 'white'
}

// const density = '9876543210?!abc;:+=-,._ '
// const density = '/\;:+=-,._ '
// const density = 'have you eaten'
// const density = [' ', 'कु', 'छ']
// const density = ['प', 'ने', ' ', 'न', 'म', ' ', 'कु', 'छ']
const density = '█▓▒░ ';

import { sdCircle, sdSegment, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';
import { CGA } from '/src/modules/color.js' 
import { random, gnoise } from '../lygia/generative.js'
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

  let dim = 4.0
  let fy = Math.floor((st.y*dim))
  // let rn = gnoise(fy+dim+1)
  let rn = gnoise(st.y*2.0+random(seed)*100)
  
  // let sdf1 = sdSegment(st, vec2(-rn, fract(st.y*4.0)*fy), vec2(rn, fract(st.y*4.0)*fy), 0.6)
  let sdf1 = sdSegment(st, vec3(-rn, st.y, 0.0), vec3(rn, st.y, 0.0), 0.01)

  let sign = Math.floor(st.y * 20.0) % 2 == 0 ? 1 : -1
  // let mod1 = Math.floor(Math.abs((coord.x/context.rows)*50.0 + sin(st.y*2.0)*2.0*sign + t*2.0*sign)) % density.length
  let mod1 = Math.floor(Math.abs((coord.x/context.rows)*20.0 + sin(st.x)*2.0*sign )) % density.length
  let mod2 = Math.floor(Math.abs((coord.x/context.rows)*50.0 + sin(st.y*2.0)*2.0*sign + t*2.0*sign)) % density.length

  // mod1 = mod2

  return {
    char: sdf1 < 0.0 ? density[mod1] : '',
    color: colors[mod2 % colors.length]
  }
  // return fract(st.y*4.0)*fy < 1.0 ? ':' : ''
  return rn
}
