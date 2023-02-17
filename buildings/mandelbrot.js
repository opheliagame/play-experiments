/**
@author opheliagame
@title  mandelbrot
@desc  
*/

// export const settings = {
// 	cols: 500,
// 	rows: 500,
// }

import { clamp, map } from '/src/modules/num.js'
import { vec2, length, add } from '/src/modules/vec2.js'

const {sin, cos, floor, pow, max} = Math

function squareImaginary(number){
	return vec2(
		pow(number.x,2)-pow(number.y,2),
		2*number.x*number.y
	);
}

function iterateMandelbrot(coord){
	let maxIterations = 10
	let z = vec2(0,0);
	for(let i=0;i<maxIterations;i++){
		z = add(squareImaginary(z), coord);
		
		if(length(z)>2) {
			// return 10
			return i/maxIterations;
			// return 1
		}
		// return 2
		
	}
	// return length(z)
	return maxIterations;
}

export function main(coord, context, cursor, buffer) {
	const m = max(context.cols, context.rows)
    const a = context.metrics.aspect
	const t = context.time

	const st = {
		x : 10.0 * (coord.x - context.cols / 2) / m * a,
		y : 10.0 * (coord.y - context.rows / 2) / m
	}
	
	const s = iterateMandelbrot(st)
	
	// Basic background pattern
	// return (coord.x + coord.y) % 2 ? '·' : ' '
	return s < 1.0 ? '/' : ''
	// return context.cols
}

