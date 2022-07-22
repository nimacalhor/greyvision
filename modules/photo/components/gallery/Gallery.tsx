import LoadMore from "../../../general/components/load-more";
import { fetchPhotoList } from "../../store/api/photo-api";
import useLoadMore from "@general/libraries/load-more";
import Container from "@mui/material/Container";
import PhotoDialog from "../photo-dialog";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

import type { CollectionPhotoListCriteria } from "@collection/libraries/collection-types";
import type { DeviceType } from "@main/modules/general/libraries/device-type";
import type { Photo, PhotoListCriteria } from "../../libraries/photo-types";
import type { LoadMoreProps } from "@main/modules/general/components/load-more/LoadMore";

function Gallery({
  photoList,
  deviceType,
  loadMoreProps,
}: {
  photoList: Photo[];
  deviceType: DeviceType;
  loadMoreProps?: LoadMoreProps;
}) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo>(photoList[0]);

  const clickHandler = function (photo: Photo) {
    setPhoto(photo);
    setOpen(true);
  };

  return (
    <>
      <Container
        sx={{ mt: 3, mx: "auto", display: "flex", justifyContent: "center" }}
      >
        <Masonry
          spacing={2}
          columns={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
        >
          {photoList.map((photo) => (
            <Box
              onClick={() => clickHandler(photo)}
              key={photo.id}
              sx={{
                position: "relative",
                height: photo.height / 12.5,
                cursor: "pointer",
              }}
            >
              <Image
                alt={photo.alt_description}
                src={photo.urls.small}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={`data:image/jpeg;/base64,${photo.blur_hash}`}
              />
            </Box>
          ))}
        </Masonry>
      </Container>
      {loadMoreProps && (
        <LoadMore
          error={loadMoreProps.error}
          loadMoreHandler={loadMoreProps.loadMoreHandler}
          pending={loadMoreProps.pending}
        />
      )}
      {photo && photo.urls && (
        <PhotoDialog
          photo={photo}
          onClose={() => setOpen(false)}
          deviceType={deviceType}
          open={open}
        />
      )}
    </>
  );
}

export default Gallery;
