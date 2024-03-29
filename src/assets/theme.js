import { createTheme } from "@mui/material/styles";

// This will be the theme of the whole system in the web to make the color scheme consistent.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#008037",
    },
    button: {
      main: "#008037",
      contrastText: "#000",
    },
    secondary: {
      main: "#ef9a9a",
    },
    background: {
      default: "#cfd8dc",
    },
    divider: "#008037",
  },

  spacing: 10,
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    button: {
      lineHeight: 2.23,
      letterSpacing: "0.32em",
      fontSize: "0.9rem",
    },
  },
});
