import { PHOTOS_ORDER_BY, PHOTOS_PER_PAGE } from "@general/libraries/constants";
import { fetchPhotoList } from "@main/modules/photo/store/api/photo-api";
import { fetchUserList } from "@main/modules/user/store/api/user-api";
import { log } from "@main/modules/general/libraries/helper";
import useDeviceType from "@general/libraries/device-type";
import useLoadMore from "@general/libraries/load-more";
// import { wrapper } from "@main/modules/store";
import { getQuery } from "./api/query";
import dynamic from "next/dynamic";

// types ______________________________
import type { User } from "@user/libraries/user-types";
import type {
  Photo,
  PhotoListCriteria,
  PhotoListEntity,
} from "@photo/libraries/photo-types";

// dynamic ______________________________
const UserSmSlide = dynamic(() => import("@user/components/user-sm-slide"));
const Gallery = dynamic(() => import("@photo/components/gallery"));

export default function Home({
  userList,
  photoList,
  query,
}: {
  userList: User[] | null;
  photoList: Photo[] | null;
  query: string;
}) {
  const deviceType = useDeviceType();
  const {list,...loadMoreProps} = useLoadMore<Photo, PhotoListCriteria>(
    photoList,
    { query, per_page: PHOTOS_PER_PAGE, color: "black_and_white" },
    fetchPhotoList
  );
  return (
    <>
      {userList && userList.length > 5 && (
        <UserSmSlide deviceType={deviceType} userList={userList} />
      )}
      {photoList && photoList.length > 5 && (
        <Gallery deviceType={deviceType} photoList={list} loadMoreProps={loadMoreProps}/>
      )}
    </>
  );
}

export const getStaticProps = async function () {
  let photoList: Photo[] | null = null;
  let userList: User[] | null = null;
  const query = getQuery();
  const criteria: PhotoListCriteria = {
    query,
    color: "black_and_white",
    page: 1,
    order_by: PHOTOS_ORDER_BY,
    per_page: PHOTOS_PER_PAGE,
  };

  try {
    // photo list ______________________________
    const photoListEntity = await fetchPhotoList(criteria);
    if (photoListEntity.results.length) {
      photoList = photoListEntity.results;
    } else {
      log("error in main page > getStaticProps");
    }

    // user list ______________________________
    const userListEntity = await fetchUserList({
      query,
    });
    if (userListEntity.results.length) userList = userListEntity.results;
    //
  } catch (error: any) {
    log("error in main page > getStaticProps", error);
  }
  return {
    props: {
      photoList,
      userList,
      query,
    },
  };
};
