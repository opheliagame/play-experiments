/**
@author opheliagame
@title  whish
@desc   whish and whoosh
*/

// Run the program only once
export const settings = {
	// once : true
}

let d1 = 'time'
let d2 = 'whoosh'
let d3 = 'whish'

let points = []
let lineIndex1 = -10
let lineIndex2 = -10
let speed = 5
let prevLineIndex1 = -3
let prevLineIndex2 = -3
let dl = d2

export function pre(context) {
  let maxIndex = context.cols * context.rows

  if((context.frame*speed) % context.cols == 0) {
    let rLineIndex1
    rLineIndex1 = Math.floor(Math.random()*context.rows)
    let rLineIndex2 = Math.floor(Math.random()*context.cols)
    
    for(let i = 0; i < 10; i++) {
      let rx = Math.floor(Math.random()*context.cols)
      let ry = Math.floor(Math.random()*context.rows)
      points.push(rx+prevLineIndex1*context.rows);
      points.push(prevLineIndex2+ry*context.rows);
      // points.push(ry+prevLineIndex*context.rows);

    }
    // if(Math.random() < 0.5) {
    // }
    // else {
    //   rLineIndex = Math.floor(Math.random()*context.cols)
    // }

    lineIndex1 = rLineIndex1
    lineIndex2 = rLineIndex2
    prevLineIndex1 = lineIndex1
    prevLineIndex2 = lineIndex2

    dl = Math.random() < 0.5 ? d2 : d3


  }
}

export function main(coord, context, cursor, buffer) {
  const t = context.time * 0.005
  const f = context.frame*speed
  const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

  let st = {
    x: 2.0 * (coord.x - context.cols / 2) / m * a,
    y: (coord.y / context.rows)
  }
  const {x, y} = coord;

  let currIndex = y*context.rows + x;
  let isUpside = points.includes(currIndex)
  let isLine = coord.y == lineIndex1

  let isWhoosh = coord.y == lineIndex1 && (coord.x*0.5) < (f%context.cols) || 
                 coord.x == lineIndex2 && (coord.y*0.5) < (f%context.rows)

  let mod1 = Math.floor(x+y)



  return {
    char: (isWhoosh && !isUpside) ? dl[mod1%dl.length] : d1[mod1%d1.length],
    rotation: isUpside ? (Math.PI/2*f*0.01) : 0,
    backgroundColor: ( isUpside) ? 'yellow' : 'white'

  }
}
