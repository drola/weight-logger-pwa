import { createSelector, createSlice } from '@reduxjs/toolkit';

import { WeightLogRecord } from '../WeightLogRecord';
import { RootState } from './rootReducer';

let lastId = 0;
function nextId(): string {
  lastId = lastId + 1;
  return lastId.toString();
}


export interface WeightLogRecordSlot {
  uid: string;
  record: WeightLogRecord;
}

function wrapWeightLogRecord(record: WeightLogRecord): WeightLogRecordSlot {
  return {uid: nextId(), record}
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
  createData("2020/08/01", 73.0)
];

const initialState: Array<WeightLogRecordSlot> = [
];

function sortWeightLogRecords(list: WeightLogRecordSlot[]) {
  list.sort((a, b) => b.record.datetime.getTime() - a.record.datetime.getTime());
}

const weightLogRecords = createSlice({
  name: "weightLogRecords",
  initialState,
  reducers: {
    load: (
      _state: WeightLogRecordSlot[],
      action: { payload: WeightLogRecord[] }
    ) => {
      let newState = [...action.payload.map(wrapWeightLogRecord)];
      sortWeightLogRecords(newState);
      return newState;
    },
    append: (
      state: WeightLogRecordSlot[],
      action: { payload: WeightLogRecord }
    ) => {
      state.push( wrapWeightLogRecord(action.payload));
      sortWeightLogRecords(state);
    },
    delete: (
      state: WeightLogRecordSlot[],
      action: { payload: WeightLogRecordSlot }
    ) => {
      let idx = state.findIndex(v => v.uid === action.payload.uid);
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
      let idx = state.findIndex(v => v.uid === action.payload.slot.uid);
      if (idx < 0) {
        return;
      }
      state[idx].record = action.payload.updated;
      sortWeightLogRecords(state);
    }
  }
});

export const selectWeightLogRecords = (state: RootState) =>
  state.weightLogRecords;

export const makeGetWeightLogRecordSlot = (uid: string) => {
  // createSelector provides memoization
  return createSelector([selectWeightLogRecords], (slots) => slots.find(slot => slot.uid === uid))
}

export const loadAction = weightLogRecords.actions.load;
export const appendAction = weightLogRecords.actions.append;
export const deleteAction = weightLogRecords.actions.delete;
export const updateAction = weightLogRecords.actions.update;

export default weightLogRecords.reducer;
