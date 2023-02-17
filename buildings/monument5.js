/**
@author opheliagame
@title  monument 5
@desc   syrup pursy 
*/

export const settings = {
	fontSize: '18px',
  once: true,
  backgroundColor : 'white'
}

const density = '█▓▒░ ';

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
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


  let dim = 3
  let fy = Math.floor(st.y * dim)
  // let n1 = gnoise((st.x) *5.0 + st.y + random(seed))
  let n1 = gnoise((st.x) *10.0 )*0.5
  let n2 = gnoise(st.y*2.0 + random(seed)*100.0)
  // n1 /= 2
  
  // let sdf1 = sdSegment(st, vec3(st.x, (-n1+fy)/dim+1/(dim*2), 0.0), vec3(st.x, (n1+fy)/dim+1/(dim*2), 0.0), 0.01)
  let sdf1 = sdSegment(st, vec3(st.x, (-n1+fy), 0.0), vec3(st.x, (n1+fy), 0.0), 0.01)
  let sdf1Stroke = stroke(sdf1, 0.5, 0.1, 0.05)
  let mid = sdSegment(st, vec3(-n2, st.y, 0.0), vec3(n2, st.y, 0.0), 0.01)
  let sdf3 = (sdf1Stroke) + mid

  let temp = sdSegment(st, vec3(-0.5, 0.0, 0.0), vec3(0.5, 0.0  , 0.0), 0.1)
  let temp1 = stroke(temp, 0.6, 0.1, 0.01)

  let mod1 = Math.floor(Math.abs((coord.x/context.rows)*20.0 + sin(st.x)*2.0 )) % density.length
  let mod2 = Math.floor(Math.abs(gnoise((st.x+st.y) * 30.0 + t)*10.0))

  return {
    char: sdf3 < 0.0 ? density[mod1] : '',
    // char: sdf1Stroke > 0.0 ? density[mod1] : '',
    color: colors[mod2 % colors.length]
  }
}
