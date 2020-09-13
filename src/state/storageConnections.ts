import { createSlice } from "@reduxjs/toolkit";

export const storageConnections = createSlice({
  name: "storageConnections",
  initialState: [] as Array<any>,
  reducers: {
    /*setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }*/
  },
});
