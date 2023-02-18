import { length, add, sub, dot, mul,subN } from '/src/modules/vec2.js'
import { saturate } from './math.js';
import { mulN } from '../src/modules/vec2.js';

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