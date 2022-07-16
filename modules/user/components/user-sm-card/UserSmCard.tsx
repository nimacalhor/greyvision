import { trimText } from "@general/libraries/helper";
import URLs from "@general/libraries/urls";
import Link from "next/link";

// mui ______________________________
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// types ______________________________
import type { User } from "@user/libraries/user-types";
import type { DeviceType } from "@general/libraries/device-type";

function UserSmCard({
  user,
  deviceType,
}: {
  user: User;
  deviceType: DeviceType;
}) {
  return (
    <Link href={`${URLs.user(user.username)}`} passHref>
      <Stack
        sx={{
          height: {
            xs: 50,
            sm: 70,
            md: 60,
          },
          width: {
            xs: 50,
            sm: 70,
            md: 60,
          },
          mb: 6,
          cursor: "pointer",
        }}
        direction={{
          md: "row",
          xs: "column",
          sm: "column",
        }}
        alignItems={{
          md: "start",
          xs: "center",
          sm: "center",
        }}
        spacing={{
          md: 2.5,
        }}
      >
        <Avatar
          src={user.profile_image.medium}
          sx={{ width: "100%", height: "100%", mb: 2 }}
        />
        <Box sx={{ pt: { md: 1 } }}>
          <Typography variant={deviceType.isScreen ? "subtitle1" : "subtitle2"}>
            {trimText(
              `${user.first_name} ${user.last_name}`,
              deviceType.isScreen ? 10 : 8
            )}
          </Typography>
          {deviceType.isScreen && (
            <Typography color="primary" variant="caption">
              @{user.username}
            </Typography>
          )}
        </Box>
      </Stack>
    </Link>
  );
}

export default UserSmCard;
