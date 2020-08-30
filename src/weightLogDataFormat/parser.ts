import { WeightLogRecord } from "../WeightLogRecord";

export function parseWeightLog(weightLog: string): Array<WeightLogRecord> {
  let result = [];
  let i = 0;
  while (i < weightLog.length) {
    //skip whitespace
    while (i < weightLog.length) {
      let char = weightLog.charAt(i);
      if (char === "\n" || char === "\r" || char === "\t" || char === " ") {
        i++;
      } else {
        break;
      }
    }

    let endOfLine = weightLog.indexOf("\n", i);
    if (endOfLine < 0) {
      endOfLine = weightLog.length;
    }

    // line = [i, endOfLine)
    let emptyLine = endOfLine - i <= 1;
    if (!emptyLine) {
      // Column: date
      let endOfColumn = weightLog.indexOf(",", i);
      if (endOfColumn < 0) {
        // Error
        throw new Error(`Invalid line: ${weightLog.substr(i, endOfLine - i)}`);
      }

      let dateText = weightLog.substr(i, endOfColumn - i).trimEnd();
      let dateValue = Date.parse(dateText);
      if (Number.isNaN(dateValue)) {
        throw new Error(`Invalid date: '${dateText}'`);
      }
      let datetime = new Date(dateValue);

      i = endOfColumn + 1;
      //skip whitespace
      while (i < weightLog.length) {
        let char = weightLog.charAt(i);
        if (char === "\n" || char === "\r" || char === "\t" || char === " ") {
          i++;
        } else {
          break;
        }
      }

      // Column: weight
      let weightText = weightLog.substr(i, endOfLine - i);
      let weight = Number(weightText);
      if (Number.isNaN(weight) || !Number.isFinite(weight)) {
        throw new Error(`Invalid weight: '${weightText}'`);
      }

      result.push({ datetime, weight });
    }

    i = endOfLine + 1;
  }

  return result;
}
