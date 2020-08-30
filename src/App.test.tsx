import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders list of records", () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Weight history/i);
  expect(headingElement).toBeInTheDocument();
});
