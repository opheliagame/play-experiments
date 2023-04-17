import { gnoise, random } from "../../sugarrush/generative.js"

export function pattern1(y, res) { return Math.abs((y*res) % Math.abs(res/2) - Math.abs(res/4)) }

export function pattern2(coord, context, time) {
	let st = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}

  let t = time ? time : 0
  let x = coord.x
  let y = coord.y

  let cx = Math.floor(Math.abs(Math.sin(x*400+t)) * 30.0)
  let cy = Math.floor(Math.abs(Math.sin(y*1200 +t)) * 30.0)

	return cx + cy
}

export const pattern3 = (coord, context, time) => {
  let n = Math.floor(Math.abs(Math.sin(coord.y)) * coord.x) + Math.floor(Math.abs(Math.cos(time)) * coord.y)
  let res = 30
  return n % res 
}

export const pattern4 = (coord, context, time) => {
  let st = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}

  let res = Math.floor(gnoise(time)*5) + 1
  // res = 3

  let resy = Math.floor(gnoise(st.y ) * 10) + 1
  let resx = Math.floor(gnoise(st.x ) * 10) + 1
  let offy = Math.floor(coord.y/resy) % 2 == 0 ? 1 : 0
  let offx = Math.floor(coord.x/resx) % res == 0 ? res-1 : res-2
  return (offx + offy) % res
}

export const pattern5 = (coord, context, time) => {
  return 0
}


export const patterns = [pattern2, pattern3, pattern4]