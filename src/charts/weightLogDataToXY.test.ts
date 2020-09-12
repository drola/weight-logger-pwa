import { weightLogDataToXY } from "./weightLogDataToXY";

describe("weightLogDataToXY", () => {
  it("should return empty array on empty input", () => {
    expect(weightLogDataToXY([], 100, 100)).toEqual([]);
  });

  it("should not error out when width or height is 0", () => {
    expect(weightLogDataToXY([], 0, 0)).toEqual([]);
    expect(
      weightLogDataToXY([{ datetime: new Date(), weight: 100 }], 0, 0)
    ).toStrictEqual([[0, 0]]);
  });

  it("should pad values when all same weight or datetime", () => {
    expect(
      weightLogDataToXY(
        [
          { datetime: new Date(), weight: 100 },
          { datetime: new Date(), weight: 100 },
        ],
        100,
        100
      )
    ).toStrictEqual([
      [50, 50],
      [50, 50],
    ]);
  });

  it("xy points should cover the chart", () => {
    expect(
      weightLogDataToXY(
        [
          { datetime: new Date(2020, 10, 5), weight: 100 },
          { datetime: new Date(2020, 10, 8), weight: 110 },
          { datetime: new Date(2020, 10, 11), weight: 120 },
        ],
        100,
        100
      )
    ).toStrictEqual([
      [0, 100], //bottom left
      [50, 50], //center
      [100, 0], //top right
    ]);
  });
});
