import "./index.css";

import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";

import App from "./App";
import { generateAuthorizationLink, tryReceiveDropboxToken } from "./oauth";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./state/rootReducer";
import theme from "./theme";

function persistStateToLocalStorage({ getState }: { getState: Function }) {
  return (next: Function) => (action: any) => {
    const newState = next(action);
    console.log(getState());

    window.localStorage.setItem(
      "weight-logger-state",
      JSON.stringify(getState())
    );

    return newState;
  };
}

function loadStateFromLocalStorage() {
  const v = window.localStorage.getItem("weight-logger-state");
  if (v !== null) {
    const parsed = JSON.parse(v);
    return {
      ...parsed,
      weightLogRecords: parsed.weightLogRecords.map((r: any) => ({
        ...r,
        record: {
          ...r.record,
          datetime: new Date(r.record.datetime),
        }
      })),
    };
  }
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
console.log(loadStateFromLocalStorage())
const store = createStore(
  rootReducer,
  loadStateFromLocalStorage(),
  composeEnhancers(applyMiddleware(persistStateToLocalStorage))
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={2000}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <App />
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

Object.assign(window, {
  generateAuthorizationLink,
  tryReceiveDropboxToken,
});
