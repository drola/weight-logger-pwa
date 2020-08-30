import { parseWeightLog } from "./parser";

describe("parseWeightLog", () => {
  it("should return empty array on empty or whitespace-only input", () => {
    expect(parseWeightLog("")).toEqual([]);
    expect(parseWeightLog("   ")).toEqual([]);
    expect(parseWeightLog("  \n   \n")).toEqual([]);
  });
  it("should correctly parse valid records", () => {
    expect(parseWeightLog("2011-10-05T14:48:00.000Z,70.0")).toEqual([
      { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
    ]);
    expect(
      parseWeightLog(
        [
          "2011-10-05T14:48:00.000Z,70.0",
          "  2011-10-05T14:48:00.000Z  ,  70.0",
          "  2011-10-05T14:48:00.000Z,70.0  ",
        ].join("\n")
      )
    ).toEqual([
      { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
      { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
      { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
    ]);
  });
});
