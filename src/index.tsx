import "./index.css";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import rootReducer from "./state/rootReducer";
import theme from "./theme";
import { LocalizationProvider } from "@mui/lab";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function persistStateToLocalStorage({ getState }: { getState: Function }) {
  return (next: Function) => (action: any) => {
    const newState = next(action);

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
        },
      })),
    };
  }
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  loadStateFromLocalStorage(),
  composeEnhancers(applyMiddleware(persistStateToLocalStorage))
);

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={2000}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
