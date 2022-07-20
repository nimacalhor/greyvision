import useHeaderTitle from "@main/modules/template/libraries/header-title";
import useDeviceType from "@general/libraries/device-type";
import useLoadMore from "@general/libraries/load-more";
import { log } from "@general/libraries/helper";
import Gallery from "@photo/components/gallery";
import { useRouter } from "next/router";
import { getQuery } from "../api/query";
import {
  fetchCollectionList,
  fetchCollectionPhotoList,
} from "@collection/store/api/collection-api";
import {
  COLLECTION_PER_PAGE,
  PHOTOS_PER_PAGE,
} from "@general/libraries/constants";

// types ______________________________
import type {
  Collection,
  CollectionPhotoListCriteria,
} from "@collection/libraries/collection-types";
import type { Photo } from "@photo/libraries/photo-types";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

function CollectionPhotosPage({
  photoList,
  collectionId,
}: {
  photoList: Photo[];
  collectionId: string;
}) {
  const router = useRouter();
  const deviceType = useDeviceType();
  const { list, ...loadMreProps } = useLoadMore<
    Photo,
    CollectionPhotoListCriteria
  >(
    photoList,
    {
      id: collectionId,
      per_page: PHOTOS_PER_PAGE,
    },
    fetchCollectionPhotoList
  );
  return (
    <>
      {router.isFallback && <h1>loading</h1>}
      {photoList && photoList.length && (
        <Gallery
          photoList={list}
          deviceType={deviceType}
          loadMoreProps={loadMreProps}
        />
      )}
    </>
  );
}

// static props ______________________________
const getCollectionId = ({ params }: GetStaticPropsContext) => {
  let collectionId = "";
  if (params && params.collectionId) {
    if (Array.isArray(params.collectionId))
      collectionId = params.collectionId[0];
    else collectionId = params.collectionId;
  }
  return collectionId;
};

export const getStaticProps: GetStaticProps = async function (context) {
  let photoList: Photo[] | null = null;
  const collectionId = getCollectionId(context);
  try {
    const entity = await fetchCollectionPhotoList({
      id: collectionId,
      per_page: PHOTOS_PER_PAGE,
    });
    if (entity.results) photoList = entity.results;
    else log("error in CollectionPhotosPage ~ getStaticProps", "no photos");
  } catch (error: any) {
    log("error in CollectionPhotosPage ~ getStaticProps", error.message);
  }
  if (!photoList || !photoList.length)
    return {
      notFound: true,
    };
  return {
    props: {
      photoList,
      collectionId,
    },
  };
};

// static path ______________________________
const getPath = (collectionList: Collection[]) =>
  collectionList.map((clt) => ({
    params: { collectionId: clt.id },
  }));

export const getStaticPaths: GetStaticPaths = async function () {
  const query = getQuery();
  let collectionList: Collection[] | null = null;
  try {
    const collectionListEntity = await fetchCollectionList({
      query,
      per_page: COLLECTION_PER_PAGE * 2,
    });
    if (collectionListEntity.results)
      collectionList = collectionListEntity.results;
    else log("error in CollectionPhotosPage ~ getStaticPaths", "no data");
  } catch (error: any) {
    log("error in CollectionPhotosPage ~ getStaticPaths", error.message || "error");
  }
  return {
    paths: collectionList ? getPath(collectionList) : [],
    fallback: true,
  };
};

export default CollectionPhotosPage;
