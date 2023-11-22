/**
@author opheliagame
@title  rotate
@desc   rotation
*/

export const settings = {
	// fontSize: '12px'
}

const density = '|'

const { floor, sin, cos, tan, PI } = Math
import { length } from '/src/modules/vec2.js'


export function main(coord, context, cursor, buffer) {
	// To generate an output return a single character
	// or an object with a “char” field, for example {char: 'x'}

	// Shortcuts for frame, cols and coord (x, y)
	let {cols, rows, frame } = context
	const {x, y} = coord
  const t = context.time 
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

  let st = {
    x: 2.0 * (coord.x - context.cols / 2) / m * a,
    y: 2.0 * (coord.y - context.rows / 2) / m
  }


	// -1 for even lines, 1 for odd lines
	const sign = y % 2 * 2 - 1
	let index = (cols + y + x * sign) % density.length
	
	// let mody = 6-floor((y/rows)*6)+1
	// let cx = floor(sin(x*100)*density.length)
	// let cy = floor(sin((y)*mody*(1200)+frame/10)*density.length)
	
	// index = floor(sin(x*y) * density.length)
	// index = (cx+cy)%density.length

  index = coord.x % density.length

  let angle = Math.atan2(st.y, st.x)

	// return mody
	return {
    char: length(st) < 0.5 ? density[index] : '',
    color: coord.x % 2 == 0 ? 'black' : 'white',
    rotation: Math.round(angle+t*0.0001),
  }
}
