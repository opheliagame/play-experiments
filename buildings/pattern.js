
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