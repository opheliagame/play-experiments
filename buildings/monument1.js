/**
@author opheliagame
@title  monument 1
@desc   simple math? lissagous
*/

export const settings = {
	fontSize: '18px'
}

// const density = '9876543210?!abc;:+=-,._ '
// const density = '/\;:+=-,._ '

const { floor, sin, cos, tan, PI } = Math
import { density } from "./density.js"


export function main(coord, context, cursor, buffer) {
	// To generate an output return a single character
	// or an object with a “char” field, for example {char: 'x'}

	// Shortcuts for frame, cols and coord (x, y)
	let {cols, rows, frame } = context
	const {x, y} = coord
	
	frame = frame / 10
	

	// -1 for even lines, 1 for odd lines
	const sign = y % 2 * 2 - 1
	let index = (cols + y + x * sign) % density.length
	
	let mody = 6-floor((y/rows)*6)+1
	let cx = floor(sin(x*400)*density.length)
	// let cy = floor(sin((y)*mody*(1200)+frame/10)*density.length)
	let cy = floor(sin(y*1200-frame/10)*density.length)
	
	// index = floor(sin(x*y) * density.length)
	index = (cx+cy)%density.length

	// return mody
	return density[index]
}
