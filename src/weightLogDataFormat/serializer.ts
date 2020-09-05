import { WeightLogRecord } from "../WeightLogRecord";

export function serializeWeightLog(weightLog: Array<WeightLogRecord>): string {
  return weightLog
    .map(
      (weightLogRecord) =>
        `${weightLogRecord.datetime.toISOString()},${weightLogRecord.weight.toFixed(
          1
        )}`
    )
    .join("\n");
}
