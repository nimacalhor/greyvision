import SearchTemplate from "@templates/search-template";
import { getQuery } from "../api/query";
import { fetchPhotoList } from "@main/modules/photo/store/api/photo-api";
import { log } from "@main/modules/general/libraries/helper";
import useDeviceType from "@general/libraries/device-type";
import { useSelector, useDispatch } from "react-redux";
import Gallery from "@photo/components/gallery";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

import { ReactElement, useState } from "react";
import type { Photo } from "@photo/libraries/photo-types";
import type { GetStaticProps } from "next";
import { RootState } from "@main/modules/root-reducer";
import { LoadMoreProps } from "@main/modules/general/components/load-more/LoadMore";
import { addPhotos } from "@main/modules/photo/store/actions";

const SearchPhotosPage = function ({
  photoList,
}: {
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const { error, list, pending, query } = useSelector(
    (state: RootState) => state.photo
  );
  const loadMoreProps: LoadMoreProps = {
    error,
    pending,
    loadMoreHandler: async function () {
      setPage((prevPage) => prevPage + 1);
      dispatch(addPhotos({ page, query, per_page: PHOTOS_PER_PAGE }));
    },
  };
  return (
    <div>
      {photoList && photoList.length && (
        <Gallery
          deviceType={deviceType}
          photoList={list && list.length ? list : photoList}
          loadMoreProps={query ? loadMoreProps : undefined}
        />
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
