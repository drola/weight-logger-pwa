import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddRecordScreen from "./screens/AddRecordScreen";
import EditRecordScreen from "./screens/EditRecordScreen";
import RecordsScreen from "./screens/RecordsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { exampleWeightLogRecords, loadAction } from "./state/weightLogRecords";

function App() {
  /* Load example records on first render */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAction(exampleWeightLogRecords));
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/add">
          <AddRecordScreen />
        </Route>
        <Route path="/edit/:uid">
          <EditRecordScreen />
        </Route>
        <Route path="/settings">
          <SettingsScreen />
        </Route>
        <Route path="/">
          <RecordsScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
