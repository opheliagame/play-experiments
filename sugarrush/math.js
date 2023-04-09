import { clamp } from "../src/modules/num.js";

export function saturate(x) { 
  return clamp(x, 0.0, 1.0); 
}