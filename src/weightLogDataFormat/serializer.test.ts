import { serializeWeightLog } from "./serializer";

describe("serializeWeightLog", () => {
  it("should return empty string for empty input", () => {
    expect(serializeWeightLog([])).toBe("");
  });

  it("should return lines as CSV", () => {
    expect(
      serializeWeightLog([
        { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
        { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
        { datetime: new Date("2011-10-05T14:48:00.000Z"), weight: 70.0 },
      ])
    ).toEqual(
      [
        "2011-10-05T14:48:00.000Z,70.0",
        "2011-10-05T14:48:00.000Z,70.0",
        "2011-10-05T14:48:00.000Z,70.0",
      ].join("\n")
    );
  });
});
