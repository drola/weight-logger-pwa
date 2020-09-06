import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import {
  tryToParseCodeFromUrl,
  tryReceiveDropboxToken,
  generateAuthorizationLink,
} from "./oauth";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <App />
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
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
