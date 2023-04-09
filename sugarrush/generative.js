import { dot, vec2 } from '../src/modules/vec2.js';
import { fract, mix, smoothstep } from '/src/modules/num.js';
const { sin } = Math

export function random(x) {
  return fract(Math.sin(x) * 43758.5453);
}

export function gnoise(x) {
  let i = Math.floor(x);  // integer
  let f = fract(x);  // fraction
  return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f)); 
}

export function vrandom(st) {
	return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}