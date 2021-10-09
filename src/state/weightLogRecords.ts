import { createSelector, createSlice } from "@reduxjs/toolkit";

import { WeightLogRecord } from "../WeightLogRecord";
import { RootState } from "./rootReducer";

export interface WeightLogRecordSlot {
  uid: string;
  record: WeightLogRecord;
}

function wrapWeightLogRecord(
  record: WeightLogRecord,
  existingRecords: WeightLogRecordSlot[]
): WeightLogRecordSlot {
  const lastId = Math.max(0, ...existingRecords.map((r) => Number(r.uid)));
  return { uid: (lastId + 1).toString(), record };
}

export function createData(datetime: string, weight: number) {
  return { datetime: new Date(datetime), weight };
}

export const exampleWeightLogRecords = [
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

const initialState: Array<WeightLogRecordSlot> = [];

function sortWeightLogRecords(list: WeightLogRecordSlot[]) {
  list.sort(
    (a, b) => b.record.datetime.getTime() - a.record.datetime.getTime()
  );
}

const weightLogRecords = createSlice({
  name: "weightLogRecords",
  initialState,
  reducers: {
    append: (
      state: WeightLogRecordSlot[],
      action: { payload: WeightLogRecord }
    ) => {
      state.push(wrapWeightLogRecord(action.payload, state));
      sortWeightLogRecords(state);
    },
    delete: (
      state: WeightLogRecordSlot[],
      action: { payload: WeightLogRecordSlot }
    ) => {
      let idx = state.findIndex((v) => v.uid === action.payload.uid);
      if (idx >= 0) {
        state.splice(idx, 1);
      }
    },
    update: (
      state: WeightLogRecordSlot[],
      action: {
        payload: { slot: WeightLogRecordSlot; updated: WeightLogRecord };
      }
    ) => {
      let idx = state.findIndex((v) => v.uid === action.payload.slot.uid);
      if (idx < 0) {
        return;
      }
      state[idx].record = action.payload.updated;
      sortWeightLogRecords(state);
    },
    clearData: (state: WeightLogRecordSlot[], action: { payload: {} }) => {
      return [];
    },
    importData: (
      state: WeightLogRecordSlot[],
      action: { payload: { records: WeightLogRecord[] } }
    ) => {
      return action.payload.records.reduce(
        (state, wr) => [...state, wrapWeightLogRecord(wr, state)],
        [] as WeightLogRecordSlot[]
      );
    },
  },
});

export const selectWeightLogRecords = (state: RootState) =>
  state.weightLogRecords;

export const makeGetWeightLogRecordSlot = (uid: string) => {
  // createSelector provides memoization
  return createSelector([selectWeightLogRecords], (slots) =>
    slots.find((slot) => slot.uid === uid)
  );
};

export const appendAction = weightLogRecords.actions.append;
export const deleteAction = weightLogRecords.actions.delete;
export const updateAction = weightLogRecords.actions.update;
export const clearDataAction = weightLogRecords.actions.clearData;
export const importDataAction = weightLogRecords.actions.importData;

export default weightLogRecords.reducer;
