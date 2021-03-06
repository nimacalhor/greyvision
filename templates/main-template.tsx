import Header from "@main/modules/template/components/header";
import Nav from "@main/modules/template/components/nav";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";

function MainTemplate({ children }: { children: any }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Header theme={theme} />
      <Nav router={router}/>
      <main>{children}</main>
    </>
  );
}

export default MainTemplate;
