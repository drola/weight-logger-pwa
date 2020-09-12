/**
 * Convert list of coordinates of points to a string suitable for
 * using as the value for "d" attribute of a SVG path
 *
 * @param xy Coordinates of points
 */
export function xyToSvgPathData(xy: Array<[number, number]>): string {
  return xy.length
    ? "M " + xy.map((xy) => `${xy[0]} ${xy[1]}`).join(" L ")
    : "";
}
