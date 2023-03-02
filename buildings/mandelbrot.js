/**
@author opheliagame
@title  mandelbrot
*/

export const settings = {
	backgroundColor: '#222',
	rows: 200,
}

import { clamp, map, fract } from '/src/modules/num.js'
import { vec2, length, add } from '/src/modules/vec2.js'
import { density1, density2, density3, density4, densities, rdensity } from './density.js';
import { sort } from '/src/modules/sort.js'
import { mulN, sub, subN } from '../src/modules/vec2.js';
import { gnoise, random } from '../lygia/generative.js';
import { colors1, colors_wha } from './colors.js';

const {sin, cos, floor, pow, max} = Math

const colors = colors1;

let density = rdensity


function squareImaginary(number){
	return vec2(
		pow(number.x,2)-pow(number.y,2),
		2*number.x*number.y
	);
}

// let maxIterations = Math.floor(Math.random()*10)
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
	const m = max(context.cols, context.rows)
    const a = context.metrics.aspect
	const t = context.time

	let st = {
		x : 18.0 * (coord.x - context.cols / 2) / m * a,
		y : 18.0 * (coord.y - context.rows / 2) / m
	}

	let pt = {
		x : (st.x * 1.0),
		y : fract(st.y * 2.0) 
	}

	// st = sub(st, vec2(0.0, 0.0))
	
	let mo = 0
	let s1 = iterateMandelbrot(vec2(-st.y*2+1, st.x), it1)
	let s2 = iterateMandelbrot(vec2( st.y*2+1, st.x), it2)
	let s3 = iterateMandelbrot(vec2( st.y*2-0.1, st.x), it3)

	mo += (s1+s2+s3)
	// mo += st.y > 0.0 ? s : 0
	
	let mod1 = (coord.x / context.rows) * context.rows/20
  mod1 += (coord.y / context.cols) * context.cols/1
  mod1 += random(st.y*20.0)*2
  mod1 += random(st.x*20.0)*1
  // mod1 += gnoise(t)
  // mod1 += (t*2)
	mod1 = Math.floor(mod1 % density.length)

  let mod2 = Math.floor(Math.abs((coord.x/context.rows)*50.0 + sin(st.y*2.0)*2.0 + t*2.0)) % colors.length
	mod2 = Math.floor(gnoise(mo*1.0 + t*0.0001) * 10.0)
	mod2 = Math.floor(Math.abs(sin(st.x+st.y*10.0+t*0.001) * 20.0))

	
	return {
		char: mo > 1.0 ? density[mod1] : '',
		// char: ((st.y * 2.0)%10),
		color: colors[mod2%colors.length],
		backgroundColor: '#222',
	}
	// return context.cols
}

