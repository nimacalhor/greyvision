import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { trimText } from "@general/libraries/helper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Image from "next/image";

import type { User } from "../../libraries/user-types";

function UserInfo({ user }: { user: User }) {
  const { profile_image, username, first_name, last_name, bio, social } = user;
  return (
    <div className="userInfo">
      <Container sx={{minHeight:"250px",mt:5}}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4} sx={{ position: "relative" }}>
            <Avatar
              sx={{
                height: 150,
                width: 150,
                position: "absolute",
                inset: "0 20% auto auto",
              }}
              src={profile_image.large}
              alt={username + "image"}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Typography variant="h3">
              {first_name} {trimText(last_name, 6)}
            </Typography>
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
    </div>
  );
}

export default UserInfo;
