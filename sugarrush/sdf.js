import { length, add, sub, dot, mul,subN } from '/src/modules/vec2.js'
import { saturate } from './math.js';
import { abs, mulN, vec2 } from '../src/modules/vec2.js';
import { clamp, fract, mix, sign } from '../src/modules/num.js';
const { atan, atan2, cos, sin, floor, PI } = Math

export function lineSDF(st, a, b) {
  let b_to_a = sub(b, a)
  let to_a = sub(st, a)
  let h = saturate(dot(to_a, b_to_a)/dot(b_to_a, b_to_a));
  // console.log(length(mul(subN(to_a, h), b_to_a) ))
  return length(sub(to_a, mulN(b_to_a, h)) );
  
}

export function circleSDF(st, center) {
  return length(sub(st, center));
}

export function polySDF(st, V) {
  // st = subN(mulN(st, 2.), 1.);
  // console.log(st)
  let a = atan2(st.x, st.y) + PI;
  let r = length(st);
  let v = (2 * PI) / (V);
  return cos(floor(.5 + a / v) * v - a ) * r;
}
function ndot(a, b) { return a.x*b.x - a.y*b.y; }
export function sdRhombus(st, p) {
  // st = subN(mulN(st, 2.), 1.);
  p = abs(p);
  let h = clamp( ndot(mul(subN(p, 2.0), st), p)/dot(p, p), -1.0, 1.0 );
  // let d = length( mul(mul(subN(st, 0.5), p), vec2(1.0-h,1.0+h)) );
  let d = length( sub(st, mulN(mul(p, vec2(1.0-h,1.0+h)), 0.5)));
  // console.log(d)
  return d * sign( st.x*p.y + st.y*p.x - p.x*p.y );
}

function step(t, v) {
  return v <= t ? 0.0 : 1.0
}

export function starSDF(st, V, s) {
  st = subN(mulN(st, 4), 2)
  // console.log(st)
  let a = atan2(st.y, st.x) / PI*2
  let seg = a * V
  a = ((floor(seg) + .5) / V + mix(s, -s, step(.5, fract(seg)))) * PI*2
  let result = Math.abs(dot(vec2(cos(a), sin(a)), st))
  return result
}