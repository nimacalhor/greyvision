import { fetchPhotoList } from "../../store/api/photo-api";
import Container from "@mui/material/Container";
import PhotoDialog from "../photo-dialog";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import LoadMore from "../load-more";
import { useState } from "react";
import Image from "next/image";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

import type { DeviceType } from "@main/modules/general/libraries/device-type";
import type { Photo } from "../../libraries/photo-types";

function Gallery({
  photoList,
  query,
  deviceType,
}: {
  photoList: Photo[];
  query: string;
  deviceType: DeviceType;
}) {
  const [list, setList] = useState<Photo[]>([...photoList]);
  const [page, setPage] = useState(2);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo>(photoList[0])
  const clickHandler = function (photo: Photo) {
    setPhoto(photo)
    setOpen(true);
  };

  const loadMoreHandler = async function () {
    setPending(true);
    try {
      const { results, total_pages } = await fetchPhotoList({
        query,
        page,
        color: "black_and_white",
        order_by: PHOTOS_ORDER_BY,
        per_page: PHOTOS_PER_PAGE,
      });
      if (results) {
        if (results.length) {
          setList((prevList) => [...prevList, ...results]);
          setPage((prevPage) => prevPage + 1);
        } else setError("no more images");
      }
      if (page >= total_pages) setError("no more images");
    } catch (error: any) {
      setError("no more images");
    }
    setPending(false);
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
          {list.map((photo) => (
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
                placeholder="blur"
                blurDataURL={photo.blur_hash}
                alt={photo.alt_description}
                src={photo.urls.small}
                layout="fill"
                objectFit="cover"
              />
            </Box>
          ))}
        </Masonry>
      </Container>
      <LoadMore
        error={error}
        pending={pending}
        onLoadMoreHandler={loadMoreHandler}
      />
      <PhotoDialog
        photo={photo}
        onClose={() => setOpen(false)}
        deviceType={deviceType}
        open={open}
      />
    </>
  );
}

export default Gallery;
