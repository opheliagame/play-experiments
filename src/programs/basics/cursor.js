/**
@author ertdfgcvb
@title  Cursor
@desc   Example with mouse cursor
[header]
*/

export function main(coord, context, cursor, buffer) {
	// The cursor coordinates contain the cell
	const x = Math.floor(cursor.x) // column of the cell hovered
	const y = Math.floor(cursor.y) // row of the cell hovered
	if (coord.x == x && coord.y == y) return '┼'
	if (coord.x == x) return '│'
	if (coord.y == y) return '─'
	return ' '
}

import { drawInfo } from '/src/modules/drawbox.js'
export function post(context, cursor, buffer) {
	drawInfo(context, cursor, buffer, {
		color : 'white', background : 'royalblue', shadowStyle : 'gray'
	})
}
