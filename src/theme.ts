import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0277bd",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb8c00",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
