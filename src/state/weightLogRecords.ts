import { createSlice } from "@reduxjs/toolkit";
import { original, current } from "immer";
import { WeightLogRecord } from "../WeightLogRecord";
import { RootState } from "./rootReducer";

export function createData(datetime: string, weight: number) {
  return { datetime: new Date(datetime), weight };
}

const initialState: Array<WeightLogRecord> = [
  /*createData("2020/08/13", 70.5),
  createData("2020/08/12", 71.0),
  createData("2020/08/11", 70.0),
  createData("2020/08/10", 70.5),
  createData("2020/08/09", 71.0),
  createData("2020/08/08", 70.0),
  createData("2020/08/07", 70.5),
  createData("2020/08/06", 70.2),
  createData("2020/08/05", 70.1),
  createData("2020/08/04", 71.0),
  createData("2020/08/03", 72.5),
  createData("2020/08/02", 72.5),
  createData("2020/08/01", 73.0)*/
];

const weightLogRecords = createSlice({
  name: "weightLogRecords",
  initialState,
  reducers: {
    append: (
      state: WeightLogRecord[],
      action: { payload: WeightLogRecord }
    ) => {
      state.push(action.payload);
      state.sort((a, b) => b.datetime.getTime() - a.datetime.getTime()); // By date descending
    },
    delete: (
      state: WeightLogRecord[],
      action: { payload: WeightLogRecord }
    ) => {
      let idx = state.findIndex(v => original(v) === action.payload);
      if (idx >= 0) {
        state.splice(idx, 1);
      }
    }
  }
});

export const selectWeightLogRecords = (state: RootState) =>
  state.weightLogRecords;

export const appendAction = weightLogRecords.actions.append;
export const deleteAction = weightLogRecords.actions.delete;

export default weightLogRecords.reducer;
