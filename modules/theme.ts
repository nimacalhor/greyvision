import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#646464",
      contrastText: "#f2ecff",
    },
    secondary: {
      main: "#518071",
      contrastText: "#c8fcea",
    },
    error: {
      main: "#f99f8c",
    },
    warning: {
      main: "#f9f871",
    },
    info: {
      main: "#518071",
    },
    success: {
      main: "#00a97f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#f2ecff",
      disabled: "#dcccff",
    },
  },
  typography: {
    h1: {
      fontSize: "4.5rem",
    },
    button: {
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#c8fcea",
          },
        },
      },
    },
  },
};

export default createTheme(themeOptions);
