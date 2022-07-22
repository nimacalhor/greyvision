import SearchTemplate from "@templates/search-template";
import { getQuery } from "../api/query";
import { GetStaticProps } from "next";

import type { Photo, PhotoLikeCriteria } from "@photo/libraries/photo-types";
import { fetchPhotoList } from "@main/modules/photo/store/api/photo-api";
import { log } from "@main/modules/general/libraries/helper";
import useDeviceType from "@general/libraries/device-type";
import useLoadMore from "@general/libraries/load-more";
import Gallery from "@photo/components/gallery";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

const SearchPhotosPage = function ({
  photoList,
}: {
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  return (
    <div>
      {photoList && photoList.length && (
        <Gallery deviceType={deviceType} photoList={photoList} />
      )}
    </div>
  );
};

SearchPhotosPage.getLayout = (page: ReactElement) => (
  <SearchTemplate>{page}</SearchTemplate>
);

export const getStaticProps: GetStaticProps = async function () {
  let photoList: Photo[] | null = null;
  const query = getQuery();
  try {
    const entity = await fetchPhotoList({
      query,
      order_by: PHOTOS_ORDER_BY,
      per_page: PHOTOS_PER_PAGE,
      color: "black_and_white",
    });
    if (entity.results) photoList = entity.results;
    else log("error in search photos ~ getStaticProps", "no images");
  } catch (error: any) {
    if (error && error.message)
      log("error in search photos ~ getStaticProps", error.message);
    else log("error in search photos ~ getStaticProps");
  }
  return {
    props: {
      photoList,
    },
  };
};

export default SearchPhotosPage;
