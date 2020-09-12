export function xyToSvgPathData(xy: Array<[number, number]>) {
  return "M " + xy.map((xy) => `${xy[0]} ${xy[1]}`).join(" L ");
}
