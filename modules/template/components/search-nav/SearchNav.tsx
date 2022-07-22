import URLs from "@general/libraries/urls";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

import type { NextRouter } from "next/router";

function Nav({ router }: { router: NextRouter }) {
  const path = router.pathname;
  const [value, setValue] = useState<number>(() => {
    if (path === URLs.search.main) return 0;
    if (path === URLs.search.collections) return 1;
    if (path === URLs.search.users) return 2;
    return 0
  });
  const handleChange = ({ target }: any, newValue: number) => {
    setValue(newValue);
    router.push(target.dataset.href || "/search");
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="nav tab"
    >
      <Tab label="photos" data-href="/search" />
      <Tab label="collections" data-href="/search/collections" />
      <Tab label="users" data-href="/search/users" />
    </Tabs>
  );
}

export default Nav;
