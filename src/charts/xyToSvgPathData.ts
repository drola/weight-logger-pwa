export function xyToSvgPathData(xy: Array<[number, number]>) {
  return xy.length
    ? "M " + xy.map((xy) => `${xy[0]} ${xy[1]}`).join(" L ")
    : "";
}
