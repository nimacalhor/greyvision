import { getParamId, log } from "@main/modules/general/libraries/helper";
import UserInfo from "@main/modules/user/components/user-info";
import useDeviceType from "@general/libraries/device-type";
import Gallery from "@photo/components/gallery/Gallery";
import useLoadMore from "@general/libraries/load-more";
import UserTemplate from "@templates/user-template";
import {
  fetchUserPhotoList,
  fetchUserProfile,
} from "@main/modules/user/store/api/user-api";

//
import type { Photo } from "@main/modules/photo/libraries/photo-types";
import type {
  User,
  UserPhotoListCriteria,
} from "@main/modules/user/libraries/user-types";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import {
  PHOTOS_ORDER_BY,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";

function UserPhotos({
  user,
  photoList,
}: {
  user: User;
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  const { list, ...loadMoreProps } = useLoadMore<Photo, UserPhotoListCriteria>(
    photoList,
    { username: user.username },
    fetchUserPhotoList
  );
  return (
    <>
      {user && <UserInfo user={user} />}
      {photoList && (
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

UserPhotos.getLayout = (page: ReactElement) => (
  <UserTemplate>{page}</UserTemplate>
);

export const getServerSideProps: GetServerSideProps = async function (context) {
  const username = getParamId(context, "username");
  let user: User | null = null;
  let photoList: Photo[] | null = null;
  try {
    const entity = await fetchUserProfile({ username });
    if (entity.user) user = entity.user;
    if (!user)
      return {
        notFound: true,
      };

    const photoEntity = await fetchUserPhotoList({
      username,
      order_by: PHOTOS_ORDER_BY,
      per_page: PHOTOS_PER_PAGE,
    });
    if (photoEntity.results) photoList = photoEntity.results;
  } catch (error: any) {
    log("error in UserPhotos ~ getServerSideProps", error.message || "");
  }
  return { props: { user, photoList } };
};

export default UserPhotos;
