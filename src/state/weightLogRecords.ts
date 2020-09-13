import { createSlice } from "@reduxjs/toolkit";

import { WeightLogRecord } from "../WeightLogRecord";
import { RootState } from "./rootReducer";

function createData(datetime: string, weight: number) {
  return { datetime: new Date(datetime), weight };
}

const initialState: Array<WeightLogRecord> = [
  createData("2020/08/13", 70.5),
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
  createData("2020/08/01", 73.0),
];

export const weightLogRecords = createSlice({
  name: "weightLogRecords",
  initialState,
  reducers: {
    /*setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }*/
    append: (state, action: { payload: WeightLogRecord }) => {
      state.push(action.payload);
    },
  },
});

export const selectWeightLogRecords = (state: RootState) =>
  state.weightLogRecords;

export const appendAction = weightLogRecords.actions.append;
