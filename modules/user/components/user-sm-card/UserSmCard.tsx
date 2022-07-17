import { trimText } from "@general/libraries/helper";
import URLs from "@general/libraries/urls";
import Link from "next/link";

// mui ______________________________
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// types ______________________________
import type { DeviceType } from "@general/libraries/device-type";
import type { User } from "@user/libraries/user-types";
import type { StackProps } from "@mui/material/Stack";

function UserSmCard({
  user,
  deviceType,
  responsive,
  textTrimAmount,
}: {
  user: User;
  deviceType: DeviceType;
  responsive?: boolean;
  textTrimAmount?: number;
}) {
  const breakCondition = responsive ? true : false;
  const size = breakCondition
    ? {
        xs: 50,
        sm: 70,
        md: 60,
      }
    : 60;
  const width = breakCondition ? size : 80;
  const direction: StackProps["direction"] = breakCondition
    ? {
        md: "row",
        xs: "column",
        sm: "column",
      }
    : "row";
  const alignItems = breakCondition
    ? {
        md: "start",
        xs: "center",
        sm: "center",
      }
    : "start";
  const spacing = breakCondition ? { md: 2.5 } : 2.5;
  const boxSx = { pt: breakCondition ? { md: 1 } : 1 };
  return (
    <Link href={`${URLs.user(user.username)}`} passHref>
      <Stack
        sx={{
          height: size,
          width: size ,
          mb: breakCondition ? 6 : 0,
          cursor: "pointer",
        }}
        direction={direction}
        alignItems={alignItems}
        spacing={spacing}
      >
        <Avatar
          src={user.profile_image.medium}
          sx={{ width: size, height: size, mb: 2 }}
        />
        <Box sx={boxSx}>
          <Typography
          sx={{width:200}}
            variant={
              breakCondition
                ? deviceType.isScreen
                  ? "subtitle1"
                  : "subtitle2"
                : "subtitle1"
            }
          >
            {trimText(
              `${user.first_name} ${user.last_name}`,
              textTrimAmount ? textTrimAmount : deviceType.isScreen ? 10 : 8
            )}
          </Typography>
          {!breakCondition && (
            <Typography color="primary" variant="caption">
              @{user.username}
            </Typography>
          )}
          {breakCondition && deviceType.isScreen && (
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
