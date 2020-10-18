import { combineReducers } from "redux";

import storageConnections from "./storageConnections";
import weightLogRecords from "./weightLogRecords";

const rootReducer = combineReducers({
  weightLogRecords: weightLogRecords,
  storageConnections: storageConnections
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
