import { createSlice } from "@reduxjs/toolkit";

const storageConnections = createSlice({
  name: "storageConnections",
  initialState: [] as Array<any>,
  reducers: {
    /*setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }*/

    clearData: (state, action) => {
      return []
    }
  }
});

export const clearDataAction = storageConnections.actions.clearData;

export default storageConnections.reducer;
