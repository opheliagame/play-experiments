import { sort } from '/src/modules/sort.js'

export const settings = {
	// rows:28,
	// color : 'white',
	// backgroundColor : 'rgb(100, 0, 300)'
}

const {sin, cos, floor} = Math
const density = sort(' ○•◘██', 'Simple Console', false)

export function main(coord, context) {
	const t = context.time * 0.008
	const colors = ['orange', 'magenta', 'lightgrey', 'lightgreen'];

	const x = coord.x
	const y = coord.y
	// console.log(coord.x)
	const c = context.cols
	
	const posCenter = floor((c - density.length) * 0.4)
	const c2 = context.rows
	const posX = floor((c2 - density.length) * 0.5)
    

	//SMOKE 1 https://play.ertdfgcvb.xyz/#/src/contributed/emoji_wave
	const wave1 = sin(x * y * 0.0017 + y * 0.0033 + t ) * 20 
	const wave2 =  cos(y*x * 0.0002 * t) * 5
	const i = floor(x+ wave1) - posCenter
	let j = floor(x + wave2) - posCenter
	
	const k = x +j

	// Note: “undefined” is rendered as a space…
	return {
		char : y/context.rows < 0.5 ? density[j] : '',
		color: colors[j%colors.length]
}
}
