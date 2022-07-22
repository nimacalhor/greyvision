import useDeviceType from "@general/libraries/device-type";
import NAV_ITEMS from "../../libraries/nav-items";
import URLs from "@general/libraries/urls";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

import type { NextRouter } from "next/router";

function Nav({ router }: { router: NextRouter }) {
  const deviceType = useDeviceType();
  const path = router.pathname;
  const [value, setValue] = useState<number>(() => {
    if (path === URLs.home) return 0;
    if (path.includes(URLs.collections)) return 1;
    if (path.includes(URLs.search.main)) return 2;
    if (path.includes("/user/")) return 2;
    if (path.includes(URLs.member.main)) return 3;
    return 0
  });
  const handleChange = ({ target }: any, newValue: number) => {
    setValue(newValue);
    router.push(target.dataset.href || "/");
  };
  return (
    <AppBar
      color="secondary"
      component={"nav"}
      position={deviceType.isScreen ? "static" : "fixed"}
      sx={{
        top: "auto",
        bottom: {
          xs: 0,
          md: "auto",
        },
      }}
    >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tab"
      >
        {NAV_ITEMS.map(({ id, title, icon, href }) => (
          <Tab
            data-href={href}
            key={id}
            label={deviceType.isScreen ? title : null}
            sx={{
              minWidth: {
                xs: 0,
                sm: 90,
              },
            }}
            icon={
              !deviceType.isScreen ? (
                value === id ? (
                  <icon.Active data-href={href} />
                ) : (
                  <icon.Inactive data-href={href} />
                )
              ) : undefined
            }
          />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default Nav;
