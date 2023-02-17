/**
@author opheliagame
@title  monument 5
@desc   pursy syrup 
*/

export const settings = {
	fontSize: '18px',
  // once: true,
  backgroundColor : 'white'
}

const density = '█▓▒░ ';
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

  let orig_st = vec2(st.x, st.y)

  let dim = 3
  let n1 = map(gnoise(st.x*4), 0, 1, 0, 1)
  let n2 = gnoise(st.y*2.0)

  let offset = (Math.floor((st.y)*dim))/dim
  // offset = 0
  // let wave1 = sdSegment(st, vec3(st.x, -n1+offset, 0.0), vec3(st.x, n1+offset, 0.0), 0.1)
  // let wave1 = lineSDF(st, vec2(-0.3, 0.0), vec2(0.3, 0.0)) 
  let wave1 = lineSDF(st, vec2(st.x, -n1+offset), vec2(st.x, n1+offset)) - 0.1
  let wave2 = lineSDF(st, vec2(st.x, -n1+offset), vec2(st.x, n1+offset)) - 0.01
  let wave = wave1 * wave2
  
  // st.y += sin(st.x*5.0)*0.2
  st.y += gnoise(st.x*6.0 + random(seed)*20.)+0.2
  // st.x += gnoise(st.y*10.0 + random(seed))
  st.x += sin(st.y*10.0)*0.2
  
  
  
  let n = gnoise(orig_st.y*5.0 + random(seed)*100)
  // n = map(orig_st.y, -1, 1, 0, n)

  let line1 = sdSegment(st, vec2(-0.5, st.y), vec2(0.5, st.y), 0.01)
  // let swave1 = stroke(wave1, 0.2, 0.1, 0.01)
  
  let mod1 = Math.floor(Math.abs(st.y*20.0)) % density.length

  return {
    char: line1 < 0.0 ? density[mod1] : '',
    // char: swave1 > 0.0 ? density[0] : '',
    // char: orig_st.y, 
    color: colors[mod1 % colors.length]
  }
}
