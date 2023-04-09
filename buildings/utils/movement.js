import { addN, length, vec2 } from "../../src/modules/vec2.js";
import { gnoise } from "../../sugarrush/generative.js";

export const movement1 = (coord, context, sColors) => {
  const m = Math.max(context.cols, context.rows)
  const a = context.metrics.aspect
  const t = context.time

  let st = {
    x: 18.0 * (coord.x - context.cols / 2) / m * a,
    y: 18.0 * (coord.y - context.rows / 2) / m
  }

  let mod2 = Math.floor(Math.abs((coord.x / context.rows) * 50.0 + Math.sin(st.y * 2.0) * 2.0 + t * 2.0)) % sColors.length
  // mod2 = Math.floor(gnoise(mo * 1.0 + t * 0.0001) * 10.0)
  mod2 = Math.floor(Math.abs(Math.sin(st.x + st.y * 10.0 + t * 0.001) * 20.0))
  return mod2 % sColors.length;
}

export const movement2 = (coord, context, sColors, cf) => {
  const m = Math.max(context.cols, context.rows)
  const a = context.metrics.aspect
  const t = context.time

  let st = {
    x: 18.0 * (coord.x - context.cols / 2) / m * a,
    y: 18.0 * (coord.y - context.rows / 2) / m
  }

  // let mod2 = Math.floor(Math.abs((fract(cf)) )) % sDensity.length
  let mod2 = Math.floor(Math.abs(Math.sin(cf * 2.0) * 2.0 * Math.sin(st.y * 10.0 + st.x * 10.0 + t) * sColors.length))
  mod2 = Math.floor(Math.abs(Math.sin(st.y * 10.0 + st.x * 10.0 + t)) + length(addN((vec2(cf, cf)), -t * 0.1)) * sColors.length * 4.0)

  return mod2
}