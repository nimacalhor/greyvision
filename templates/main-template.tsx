import Header from "@main/modules/template/components/header";
import Nav from "@main/modules/template/components/nav";
import { useTheme } from "@mui/material";

function MainTemplate({ children }: { children: any }) {
  const theme = useTheme();
  return (
    <>
      <Header theme={theme} />
      <Nav />
      <main>{children}</main>
    </>
  );
}

export default MainTemplate;
