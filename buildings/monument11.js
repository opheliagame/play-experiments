/**
@author opheliagame
@title  monument 11
@desc  	bezier
*/

export const settings = {
	backgroundColor: '#222',
}

import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '/src/modules/sdf.js'
import { clamp, map, fract } from '/src/modules/num.js'
import { vec2, length, add, mul } from '/src/modules/vec2.js'
import { density1, density2, rdensity } from './utils/density.js';
import { colors, colors_wha } from './utils/colors.js';
import { circleSDF, lineSDF, polySDF, starSDF } from '../sugarrush/sdf.js';
import { fill, stroke } from '../sugarrush/draw.js'
import { pattern1 } from './utils/pattern.js';
import { abs, dist, mulN, sub } from '../src/modules/vec2.js';

const { sin, cos, floor, pow, max, atan2, PI } = Math


let density = density1

function toBezier(delta, i, P0, P1, P2, P3)
{
    let t = delta * (i);
    let t2 = t * t;
    let one_minus_t = 1.0 - t;
    let one_minus_t2 = one_minus_t * one_minus_t;
    let result = add(mulN(P0, one_minus_t2 * one_minus_t), mulN(P1, 3.0 * t * one_minus_t2))
    result = add(result, mulN(P2, 3.0 * t2 * one_minus_t))
    result = add(result, mulN(P3, t2 * t))
    return result;
}
let points = []
// let anchorPoint1 = vec2(-0.4, -0.4)
// let anchorPoint2 = vec2(0.4, 0.4)
// let controlPoint1 = vec2(-0.4, 0.4)
// let controlPoint2 = vec2(0.4, -0.4)
for(let j = 0; j < 1; j++) {
  let anchorPoint1 = vec2(-0.4, -0.4)
let anchorPoint2 = vec2(0.4, 0.4)
let controlPoint1 = vec2(-0.4, 0.4)
let controlPoint2 = vec2(0.4, -0.4)
  // let anchorPoint1 = vec2(-Math.random(), -Math.random())
  // let anchorPoint2 = vec2(Math.random(), Math.random())
  // let controlPoint1 = vec2(-Math.random(), Math.random())
  // let controlPoint2 = vec2(Math.random(), -Math.random())
  for(let i = 0; i < 10; i++) {
    let s = toBezier(0.2, i, anchorPoint1, controlPoint1, controlPoint2, anchorPoint2)
    points.push(s)
  }
}

console.log(points)

export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
	const a = context.metrics.aspect
	const t = context.time*0.0001

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 2.0) - 0.5
	}

  // let s = sdSegment(st, vec2(-0.2, 0), vec2(-0.4, 0.0), 0.01)
  let s = 1
  let d = dist(st, points[0])
  for(let i = 0; i < points.length-1; i++) {
    s = s * sdSegment(st, points[i], points[i+1], 0.01)
    d = Math.max(d, dist(st, points[i]))
  }
  let str1 = stroke(s, 1.0, 0.3, 0.1)
  str1 = d*0.1

  let s1 = circleSDF(st, vec2(0.0, 0.0)) - 0.5;

	return {
		char: d > 5.0 ? '/' : '',
    // char: s1 < 0.0 ? density[0] : '',
    // char: Math.floor(d),
    color: 'white' 
		
	}
}

