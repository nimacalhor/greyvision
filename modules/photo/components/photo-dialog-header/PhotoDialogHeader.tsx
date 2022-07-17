import { fetchPhotoDownloadLink } from "../../store/api/photo-api";
import { log, download } from "@general/libraries/helper";
import UserSmCard from "@user/components/user-sm-card";
import { useState } from "react";

// mui ______________________________
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// types ______________________________
import type { DeviceType } from "@general/libraries/device-type";
import type { Photo } from "../../libraries/photo-types";

function PhotoDialogHeader({
  photo,
  deviceType,
}: {
  photo: Photo;
  deviceType: DeviceType;
}) {
  const { user, links } = photo;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downLoadHandler = async function () {
    setPending(true);
    try {
      const { url } = await fetchPhotoDownloadLink({
        download_location: links.download_location,
      });
      if (url) download(url, photo.alt_description);
      else  setError("something went wrong");
    } catch (error: any) {
      setError("something went wrong");
    }
    setPending(false);
  };
  return (
    <AppBar position="static" sx={{ top: 1, bottom: "auto" }}>
      <Toolbar>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ px: 1, py: 1, width: "100%" }}
        >
          <UserSmCard
            textTrimAmount={12}
            responsive={false}
            deviceType={deviceType}
            user={user}
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined">
              <FavoriteBorderIcon />
            </Button>
            <Button variant="outlined">
              <AddIcon />
            </Button>
            <Button
              variant="outlined"
              disabled={!!(pending || error)}
              onClick={downLoadHandler}
            >
              {pending && "..."}
              {error && error}
              {!error && !pending && "download"}
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default PhotoDialogHeader;
