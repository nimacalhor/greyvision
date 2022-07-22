import CssBaseline from "@mui/material/CssBaseline";
import { MainTemplate } from "@templates/index";
import { ThemeProvider } from "@mui/material";
// import { wrapper } from "@main/modules/store";
import theme from "../modules/theme";

// types ______________________________
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

// styles ______________________________
import "@modules/styles/user-template.css"
import "swiper/css/pagination";
import "swiper/css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page: any) => <MainTemplate>{page}</MainTemplate>);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
