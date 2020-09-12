import { WeightLogRecord } from "../WeightLogRecord";

export function weightLogDataToXY(
  data: Array<WeightLogRecord>,
  chartWidth: number,
  chartHeight: number
): Array<[number, number]> {
  let records = data.map((record) => ({
    timestamp: record.datetime.getTime(),
    weight: record.weight,
  }));

  let timeMin = 0;
  let timeMax = 1;
  let weightMin = 0;
  let weightMax = 1;
  let x1 = 0;
  let x2 = chartWidth;
  let y1 = chartHeight;
  let y2 = 0;

  records.sort((a, b) => a.timestamp - b.timestamp);
  if (records.length > 0) {
    timeMin = records[0].timestamp;
    timeMax = records[records.length - 1].timestamp;
    let weights = records.map((record) => record.weight);
    weightMin = Math.min(...weights);
    weightMax = Math.max(...weights);
  }

  let kTime = (x2 - x1) / (timeMax - timeMin);
  let kWeight = (y2 - y1) / (weightMax - weightMin);

  return records.map((record) => [
    (record.timestamp - timeMin) * kTime + x1,
    (record.weight - weightMin) * kWeight + y1,
  ]);
}
