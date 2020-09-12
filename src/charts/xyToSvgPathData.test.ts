import { xyToSvgPathData } from "./xyToSvgPathData";

describe("xyToSvgPathData", () => {
  it("should return empty string on empty input", () => {
    expect(xyToSvgPathData([])).toEqual("");
  });

  it("should return correct path", () => {
    expect(
      xyToSvgPathData([
        [1, 2],
        [3, 4],
        [5, 6],
      ])
    ).toEqual("M 1 2 L 3 4 L 5 6");
  });
});
