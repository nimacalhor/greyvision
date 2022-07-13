import useDeviceType from "@general/libraries/device-type";
import NAV_ITEMS from "../../libraries/nav-items";
import URLs from "@general/libraries/urls";
import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

function Nav() {
  const router = useRouter();
  const deviceType = useDeviceType();
  const [value, setValue] = useState(0);
  const handleChange = ({ target }: any, newValue: number) => {
    setValue(newValue);
    router.push(target.dataset.href || "/");
  };
  const path = router.pathname;
  if (path === URLs.home && value !== 0) setValue(0);
  if (path.includes(URLs.collections) && value !== 1) setValue(1);
  if (path.includes(URLs.search.main) && value !== 2) setValue(2);
  if (path.includes(URLs.user.main) && value !== 3) setValue(3);
  return (
    <AppBar
      color="secondary"
      component={"nav"}
      position={deviceType.isScreen ? "static" : "absolute"}
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
