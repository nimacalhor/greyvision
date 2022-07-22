import UserNav from "@main/modules/template/components/user-nav";
import Header from "@main/modules/template/components/header";
import Nav from "@main/modules/template/components/nav";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";

function UserTemplate({ children }: { children: any }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Header theme={theme} />
      <Nav router={router} />
      <div className="userTemplate">
        <UserNav router={router} />
        {children}
      </div>
    </>
  );
}

export default UserTemplate;
