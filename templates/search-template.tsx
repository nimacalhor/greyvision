import SearchForm from "@main/modules/template/components/search-form";
import SearchNav from "@main/modules/template/components/search-nav";
import Header from "@main/modules/template/components/header";
import Nav from "@main/modules/template/components/nav";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";

function SearchTemplate({ children }: { children: any }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Header theme={theme} />
      <Nav router={router} />
      <SearchForm />
      <SearchNav router={router} />
      <main>{children}</main>
    </>
  );
}

export default SearchTemplate;
