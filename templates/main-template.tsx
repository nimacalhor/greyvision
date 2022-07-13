import Header from "@main/modules/template/components/header";
import { useTheme } from "@mui/material";

function MainTemplate({ children }: { children: any }) {
  const theme = useTheme();
  return (
    <>
      <Header theme={theme} />
      <main>{children}</main>
    </>
  );
}

export default MainTemplate;
