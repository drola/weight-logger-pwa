import { WeightLogRecord } from "../WeightLogRecord";

/**
 * Converts list of WeightLogRecords into pairs of x-y coordinates
 * for rendering a chart.
 *
 * [0, 0] is top-left corner and [chartWidth, chartHeight] is bottom-right.
 *
 * @param data
 * @param chartWidth
 * @param chartHeight
 */
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
  let timeMax = 0;
  let weightMin = 0;
  let weightMax = 0;
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

  const minTimeSpan = 3600 * 1000;
  const timeSpanPadding = Math.max(0, minTimeSpan - (timeMax - timeMin));
  timeMin -= timeSpanPadding / 2;
  timeMax += timeSpanPadding / 2;

  const minWeightSpan = 2;
  const weightSpanPadding = Math.max(
    0,
    minWeightSpan - (weightMax - weightMin)
  );
  weightMin -= weightSpanPadding / 2;
  weightMax += weightSpanPadding / 2;

  let kTime = (x2 - x1) / (timeMax - timeMin);
  let kWeight = (y2 - y1) / (weightMax - weightMin);

  return records.map((record) => [
    (record.timestamp - timeMin) * kTime + x1,
    (record.weight - weightMin) * kWeight + y1,
  ]);
}
