import { fetchCollectionPhotoList } from "../../store/api/collection-api";
import URLs from "@main/modules/general/libraries/urls";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// mui ______________________________
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

// type ______________________________
import type { Photo } from "@photo/libraries/photo-types";
import type { Collection } from "../../libraries/collection-types";

function CollectionSectionCard({ collection }: { collection: Collection }) {
  const {
    title,
    description,
    user,
    cover_photo: {
      urls: { small },
      alt_description,
      blur_hash,
    },
    preview_photos,
    total_photos,
    tags,
    id,
  } = collection;
  return (
    <Link href={URLs.collection(id)} passHref>
      <Grid
        sx={{ height: 400, cursor: "pointer" }}
        direction="column"
        component="div"
        spacing={1}
        container
      >
        <Grid item xs={9} container>
          <Grid item xs={8} sx={{ position: "relative" }} component={"div"}>
            <Image
              src={small}
              alt={alt_description}
              layout="fill"
              placeholder="blur"
              blurDataURL={blur_hash}
              objectFit="cover"
            />
          </Grid>
          <Grid item xs={4} container direction="column">
            {preview_photos.slice(1, 3).map((photo) => (
              <Grid key={photo.id} item xs={6} sx={{ position: "relative" }}>
                <Image
                  src={photo.urls.thumb}
                  alt={alt_description}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={photo.blur_hash}
                  objectFit="cover"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">{title}</Typography>
          <Typography gutterBottom variant="body2">
            {total_photos} photos . by {user.username}
          </Typography>
          {tags.slice(0, 3).map((tag, i) => (
            <Chip size="small" key={i} label={tag.title} sx={{mr:1,mt:1}} />
          ))}
        </Grid>
      </Grid>
    </Link>
  );
}

export default CollectionSectionCard;
