import { getParamId, log } from "@main/modules/general/libraries/helper";
import UserInfo from "@main/modules/user/components/user-info";
import useDeviceType from "@general/libraries/device-type";
import Gallery from "@photo/components/gallery/Gallery";
import useLoadMore from "@general/libraries/load-more";
import UserTemplate from "@templates/user-template";
import {
  fetchUserLikedPhotoList,
  fetchUserProfile,
} from "@main/modules/user/store/api/user-api";

//
import type { Photo } from "@main/modules/photo/libraries/photo-types";
import type {
  User,
  UserLikedPhotoListCriteria,
} from "@main/modules/user/libraries/user-types";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

function UserLikedPhotos({
  user,
  photoList,
}: {
  user: User;
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  const { list, ...loadMoreProps } = useLoadMore<
    Photo,
    UserLikedPhotoListCriteria
  >(photoList, { username: user.username }, fetchUserLikedPhotoList);
  return (
    <>
      {user && <UserInfo user={user} />}
      {photoList && photoList.length && (
        <div className="userMain">
          <Gallery
            deviceType={deviceType}
            loadMoreProps={loadMoreProps}
            photoList={list}
          />
        </div>
      )}
    </>
  );
}

UserLikedPhotos.getLayout = (page: ReactElement) => (
  <UserTemplate>{page}</UserTemplate>
);

export const getServerSideProps: GetServerSideProps = async function (context) {
  const username = getParamId(context, "username");
  let user: User | null = null;
  let photoList: Photo[] | null = null;
  try {
    const entity = await fetchUserProfile({ username });
    if (entity.user) user = entity.user;
    else
      return {
        notFound: true,
      };

    const photoEntity = await fetchUserLikedPhotoList({
      username,
      order_by: PHOTOS_ORDER_BY,
      per_page: PHOTOS_PER_PAGE,
    });
    if (photoEntity.results) photoList = photoEntity.results;
  } catch (error: any) {
    log("error in UserLikedPhotos ~ getServerSideProps", error.message || "");
  }
  return { props: { user, photoList } };
};

export default UserLikedPhotos;
