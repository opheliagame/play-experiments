import { fract, mix, smoothstep } from '/src/modules/num.js';


export function random(x) {
  return fract(Math.sin(x) * 43758.5453);
}

export function gnoise(x) {
  let i = Math.floor(x);  // integer
  let f = fract(x);  // fraction
  return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f)); 
}