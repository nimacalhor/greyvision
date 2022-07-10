import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material";
import theme from "../modules/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
