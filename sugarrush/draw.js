import { smoothstep, clamp } from '/src/modules/num.js';


// function stroke(x, size, w) {
//   const d = aastep(size, x + w * 0.5) - aastep(size, x - w * 0.5);
//   return saturate(d);
// }

export function stroke(x, size, w, edge) {
  const d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
  return clamp(d);
}

export function fill(x, size, edge) {
  return 1.0 - smoothstep(size - edge, size + edge, x);
}

// function fill(x, size) {
//   return 1.0 - aastep(size, x);
// }