import { log } from "@general/libraries/helper";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import type { NextRouter } from "next/router";

const checkUrl = (string: string, substr1: string, substr2?: string) => {
  if (!substr2) return string.includes(substr1);
  return string.includes(substr1) && string.includes(substr2);
};

function UserNav({ router }: { router: NextRouter }) {
  const path = router.pathname;
  const [value, setValue] = useState<number>(() => {
    if (path.includes("/collections")) return 2;
    if (path.includes("/liked")) return 1;
    return 0;
  });
  const handleChange = ({ target }: any, newValue: number) => {
    setValue(newValue);
    router.push(target.dataset.href || "/user");
  };
  return (
    <Tabs
      className="userNav"
      sx={{ height: "fit-content" }}
      value={value}
      onChange={handleChange}
      aria-label="nav tab"
    >
      <Tab label="photos" data-href={`/user/${router.query.username}`} />
      <Tab label="liked" data-href={`/user/${router.query.username}/liked`} />
      <Tab
        label="collections"
        data-href={`/user/${router.query.username}/collections`}
      />
    </Tabs>
  );
}

export default UserNav;
