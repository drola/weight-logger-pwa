import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import AddRecordScreen from "./screens/AddRecordScreen";
import RecordsScreen from "./screens/RecordsScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <AddRecordScreen />
        </Route>
        <Route path="/">
          <RecordsScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
