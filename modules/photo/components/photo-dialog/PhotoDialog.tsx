import PhotoDialogHeader from "../photo-dialog-header";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";

// type ______________________________
import type { DeviceType } from "@general/libraries/device-type";
import type { Photo } from "../../libraries/photo-types";
import type { DialogProps } from "@mui/material/Dialog";

function PhotoDialog({
  photo,
  deviceType,
  ...dialogProps
}: { photo: Photo; deviceType: DeviceType } & DialogProps) {
  const { urls, alt_description, blur_hash } = photo;
  return (
    <Dialog
      scroll="body"
      sx={{ p: 2 }}
      fullWidth
      maxWidth="xl"
      {...dialogProps}
    >
      <PhotoDialogHeader deviceType={deviceType} photo={photo} />
      <Box
        sx={{
          position: "relative",
          mt: 2,
          mx: "auto",
          // width: "60%",
          // height: "auto",
          display: "fex",
          justifyContent: "center",
        }}
      >
        <Image
          blurDataURL={`data:image/,${photo.blur_hash}`}
          alt={alt_description}
          src={urls.regular}
          placeholder="blur"
          height={photo.height / 7}
          width={photo.width / 7}
        />
      </Box>
    </Dialog>
  );
}

export default PhotoDialog;
