/**
@author ertdfgcvb
@title  Wireframe cube
@desc   The cursor controls box thickness and exp
*/

import { sdSegment } from '/src/modules/sdf.js'
import * as v2 from '/src/modules/vec2.js'
import * as v3 from '/src/modules/vec3.js'
import { map } from '/src/modules/num.js'

export const settings = { fps: 30 }

const density = ' -=+abcdX'

// Shorthands
const { vec3 } = v3
const { vec2 } = v2
const { sin, cos, floor, abs, exp, min } = Math

// Lookup table for the background
const bgMatrix = [
	'┼──────',
	'│      ',
	'│      ',
	'│      ',
	'│      ',
	'│      ',
]

// Box primitive
const l = 0.6
const box = {
	vertices: [
		vec3(l, l, l),
		vec3(-l, l, l),
		vec3(-l, -l, l),
		vec3(l, -l, l),
		vec3(l, l, -l),
		vec3(-l, l, -l),
		vec3(-l, -l, -l),
		vec3(l, -l, -l)
	],
	edges: [
		[0, 1],
		[1, 2],
		[2, 3],
		[3, 0],
		[4, 5],
		[5, 6],
		[6, 7],
		[7, 4],
		[0, 4],
		[1, 5],
		[2, 6],
		[3, 7]
	]
}

const boxesProj = []
const nBoxes = 1

const bgMatrixDim = vec2(bgMatrix[0].length, bgMatrix.length)

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function pre(context, cursor) {
	for (let i = 0; i < nBoxes; i++) {
		const boxProj = []
		let t = context.time * 0.01
		t = 0
		let rot = vec3(t * 0.11, t * 0.13, -t * 0.15)
		rot = vec3(45, 45, 0)
		const d = 2
		const zOffs = map(sin(t * 0.12), -1, 1, -2.5, -6)
		// let pos = vec3(randomIntFromInterval(-2.0, 2.0), 0.0, 0.0) 
		for (let i = 0; i < box.vertices.length; i++) {
			// NOTE: this makes weird shapes
			let pos = vec3(randomIntFromInterval(-2.0, 2.0), 0.0, 0.0) 
			let v = v3.copy(box.vertices[i])
			let vt = v3.rotX(v, rot.x)
			vt = v3.rotY(vt, rot.y)
			vt = v3.rotZ(vt, rot.z)
			vt = v3.add(vt, pos)
			boxProj[i] = v2.mulN(vec2(vt.x, vt.y), d / (vt.z - zOffs))
		}

		boxesProj.push(boxProj)
	}



}

export function main(coord, context, cursor) {
	const t = context.time * 0.01
	const m = min(context.cols, context.rows)
	const a = context.metrics.aspect

	const st = {
		x: 2.0 * (coord.x - context.cols / 2 + 0.5) / m * a,
		y: 2.0 * (coord.y - context.rows / 2 + 0.5) / m,
	}

	let d = 1e10
	const n = box.edges.length
	let thickness = map(cursor.x, 0, context.cols, 0.001, 0.1)
	thickness = 0.001
	let expMul = map(cursor.y, 0, context.rows, -100, -5)
	expMul = -100

	// for (let k = 0; k < nBoxes; k++) {
		const boxProj = boxesProj[0]
		for (let i = 0; i < n; i++) {
			let a = boxProj[box.edges[i][0]]
			// a = v2.sub(a, vec2(0.25, 0.0))
			let b = boxProj[box.edges[i][1]]
			// b = v2.sub(a, vec2(0.25, 0.0))
			d = min(d, sdSegment(st, a, b, thickness))
		}
	// }

	const idx = floor(exp(expMul * abs(d)) * density.length)

	if (idx == 0) {
		const x = coord.x % bgMatrixDim.x
		const y = coord.y % bgMatrixDim.y
		return {
			char: d < 0 ? ' ' : bgMatrix[y][x],
			color: 'black'
		}
	} else {
		return {
			char: density[idx],
			color: 'royalblue'
		}
	}
}

import { drawInfo } from '/src/modules/drawbox.js'
export function post(context, cursor, buffer) {
	drawInfo(context, cursor, buffer)
}

