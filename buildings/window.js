/**
@author opheliagame
@title  window
@desc   required for a monument?
*/

// export const settings = {
// 	once : true
// }

import { sdCircle, opSmoothUnion } from '/src/modules/sdf.js'
import { add, sub, mul, vec2, length, rot } from '/src/modules/vec2.js'
import { mix, map, smoothstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/lygia/draw.js';

const { PI, atan2, floor, sin, cos, max, min } = Math;

function degrees(radians) { return radians*180/PI }
function radians(degrees) { return degrees*PI/180 }



function polygon(center, edges, time) {
	// center = center * 2. - 1.;
    const a = atan2(center.x, center.y) + PI
    const r = length(center)
    const v = (2*PI) / (edges)
    return cos(floor(.5 + a / v) * v - a ) * r;
	
	// time = time || 0
	// from https://observablehq.com/@riccardoscalco/draw-regular-polygons-by-means-of-functions
	// const p = center;
	// const N = edges;
	// const a = (atan2(p.x, p.y) + 2 + time * PI) / (2. * PI);
	// const b = (floor(a * N) + 0.5) / N;
	// const c = length(p) * cos((a - b) * 2. * PI);
	// return smoothstep(0.3, 0.35, c);
}

function diamond(center, offset) {
	
	const t1 = polygon(add(center, {x:offset.x, y:-offset.y}), 3, 0.35)
	const t2 = polygon(rot(add(center, offset), radians(180)), 3, 0.045)
	return t1
}

export function main(coord, context) {
	
	const m = max(context.cols, context.rows)
    const a = context.metrics.aspect
	const t = context.time

	const st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	const pt = {
		x : fract(st.x * 4.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}
	
	const p1 = stroke(polygon(add(pt, {x: -0.3, y: pt.x*0.5}), 4), 0.3, 0.1, 0.01)
	const p2 = stroke(polygon(add(pt, {x: 0.5, y: 0.25}), 4), 0.3, 0.1, 0.05)
	
  // return Math.random() < 0.5 ? '▓ ' : '░'
	return max(p2, p1) > 0.5 ? '|' : ''
}

function building(n) {
	if(n < 0.55 && n >= 0.5) {
		return '|'
	}
	else if(n < 0.5) {
		return Math.random() < 0.5 ? '▓ ' : '░'
	}
	else {
		return ' '
	}
}

