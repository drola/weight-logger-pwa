import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./state/rootReducer";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

test("renders list of records", () => {
  const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
  const { getByText } = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
  const headingElement = getByText(/Weight history/i);
  expect(headingElement).toBeInTheDocument();
});
