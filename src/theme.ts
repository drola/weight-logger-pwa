import { createTheme, adaptV4Theme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme(adaptV4Theme({
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
}));

export default theme;
