/**
@author opheliagame
@title  mandelbrot
*/

export const settings = {
  backgroundColor: '#222'
}

import { fract } from '../../src/modules/num.js'
import { vec2, length, add } from '../../src/modules/vec2.js'
import { densities, rdensity } from '../utils/density.js';
import { gnoise, random } from '../../sugarrush/generative.js';
import { colors, colors_wha } from '../utils/colors.js';
import { movement1 } from '../utils/movement.js';
import { patterns } from '../utils/pattern.js';

let iColor = Math.floor(Math.random() * colors.length)
let iDensity = Math.floor(Math.random() * densities.length)
let iPattern1 = Math.floor(Math.random() * patterns.length)
let iPattern2 = Math.floor(Math.random() * patterns.length)


let sColors = colors[iColor]
// let sColors = [colors[iColor]]
let sDensity = densities[iDensity]
let sPattern1 = patterns[iPattern1]
let sPattern2 = patterns[iPattern2]

console.log("colors: ", sColors)
console.log("density: ", sDensity)

function squareImaginary(number){
	return vec2(
		Math.pow(number.x,2)-Math.pow(number.y,2),
		2*number.x*number.y
	);
}

function iterateMandelbrot(coord, maxIterations){
	let z = vec2(0,0);
	for(let i=0;i<maxIterations;i++){
		z = add(squareImaginary(z), coord);
		
		if(length(z)>2) {
			return i/maxIterations;
		}
		
	}
	return maxIterations;
}
let min1 = 2
let max1 = 10
let it1 = Math.floor(Math.random()*(max1 - min1) + min1)
let it2 = Math.floor(Math.random()*(max1 - min1) + min1)
let it3 = Math.floor(Math.random()*(max1 - min1) + min1)

export function main(coord, context, cursor, buffer) {
	const m = Math.max(context.cols, context.rows)
  const a = context.metrics.aspect
	const t = context.time

	let st = {
		x : 18.0 * (coord.x - context.cols / 2) / m * a,
		y : 18.0 * (coord.y - context.rows / 2) / m
	}
	
	let mo = 0
	let s1 = iterateMandelbrot(vec2(-st.y*2+1, st.x), it1)
	let s2 = iterateMandelbrot(vec2( st.y*2+1, st.x), it2)
	let s3 = iterateMandelbrot(vec2( st.y*2-0.1, st.x), it3)

	mo += (s1+s2+s3)
	// mo += st.y > 0.0 ? s : 0
	
	// let mod1 = (coord.x / context.rows) * context.rows/20
  // mod1 += (coord.y / context.cols) * context.cols/1
  // mod1 += random(st.y*20.0)*2
  // mod1 += random(st.x*20.0)*1
  // // mod1 += gnoise(t)
  // // mod1 += (t*2)
	// mod1 = Math.floor(mod1 % sDensity.length)
	let mod1 = sPattern1(coord, context, t)
	let mod2 = sPattern2(coord, context, 0)
	
	return {
		char: mo > 1.0 ? sDensity[mod1 % sDensity.length] : '',
		color: sColors[mod2 % sColors.length],
	}
}

