import { fetchUserPhotoList } from "../../store/api/user-api";
import UserSmCard from "../user-sm-card/UserSmCard";
import URLs from "@general/libraries/urls";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// mui ______________________________
import Skeleton from "@mui/material/Skeleton";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// type ______________________________
import type { DeviceType } from "@general/libraries/device-type";
import type { Photo } from "@photo/libraries/photo-types";
import type { User } from "../../libraries/user-types";

function UserMdCard({
  user,
  deviceType,
}: {
  user: User;
  deviceType: DeviceType;
}) {
  const [photoList, setPhotoList] = useState<Photo[] | null>(null);
  useEffect(() => {
    if (photoList) return;
    const { username } = user;
    fetchUserPhotoList({ username, per_page: 3 }).then((res) => {
      if (res.results) setPhotoList(res.results);
    });
  }, [photoList, user]);
  return (
    <Box
      sx={{
        width: "90%",
        mx: "auto",
        my: 1,
        p: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: grey[900],
      }}
    >
      <UserSmCard user={user} responsive={false} deviceType={deviceType} />
      <Grid sx={{ my: 2 }} container spacing={1}>
        {photoList &&
          photoList.map((photo) => (
            <Grid
              sx={{ height: 100, position: "relative" }}
              key={photo.id}
              xs={4}
              item
            >
              <Image
                // blurDataURL={photo.bl  ur_hash}
                alt={photo.alt_description}
                src={photo.urls.thumb}
                // placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
            </Grid>
          ))}
        {!photoList &&
          new Array(3).map((photo) => (
            <Grid
              sx={{ height: 100, position: "relative" }}
              key={photo.id}
              xs={4}
              item
            >
              <Skeleton height={100} width={"100%"} />
            </Grid>
          ))}
      </Grid>
      <Link href={URLs.user(user.username).main} passHref>
        <Button fullWidth variant="outlined">
          view profile
        </Button>
      </Link>
    </Box>
  );
}

export default UserMdCard;
