import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { trimText } from "@general/libraries/helper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ModeIcon from "@mui/icons-material/Mode";
import IconButton from "@mui/material/IconButton";
import UpdateDialog from "../update-dialog";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import type { User } from "../../libraries/user-types";

function UserInfo({ user, token }: { user: User; token?: string }) {
  const { profile_image, username, first_name, last_name, bio, social } = user;
  const [open, setOpen] = useState(false);
  const closeHandler = () => setOpen(false);
  return (
    <div className="userInfo">
      <Container sx={{ minHeight: "250px", mt: 5 }}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ position: "relative" }}
            container
            justifyContent={
              {
                md:"flex-end",
                xs:"center",
                sm:"center",
              }
            }
          >
            <Grid>
              <Avatar
                sx={{
                  height: 150,
                  width: 150,
                  position: "relative",
                  // inset: "0 -20% auto auto",
                }}
                src={profile_image.large}
                alt={username + "image"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h3">
                {first_name} {trimText(last_name, 6)}
              </Typography>
              {token && (
                <IconButton onClick={() => setOpen(true)}>
                  <ModeIcon />
                </IconButton>
              )}
            </Stack>

            <Typography>{bio}</Typography>
            {social.instagram_username && social.twitter_username && (
              <>
                <Typography>
                  <InstagramIcon /> {social.instagram_username}
                </Typography>
                <Typography>
                  <TwitterIcon /> {social.twitter_username}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      {token && (
        <UpdateDialog
          onClose={closeHandler}
          open={open}
          token={token}
          user={user}
        />
      )}
    </div>
  );
}

export default UserInfo;
