import { log } from "@main/modules/general/libraries/helper";
import { fetchCurrentUser } from "@main/modules/member/store/api/member-api";
import { Photo } from "@main/modules/photo/libraries/photo-types";
import UserInfo from "@main/modules/user/components/user-info";
import { fetchUserLikedPhotoList } from "@main/modules/user/store/api/user-api";
import {
  User,
  UserLikedPhotoListCriteria,
} from "@main/modules/user/libraries/user-types";
import useLoadMore from "@main/modules/general/libraries/load-more";
import UserTemplate from "@main/templates/user-template";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { PHOTOS_PER_PAGE } from "@main/modules/general/libraries/constants";
import useDeviceType from "@main/modules/general/libraries/device-type";
import Gallery from "@main/modules/photo/components/gallery";

function MemberLikedPhotos({
  access_token,
  user,
  photoList,
}: {
  access_token: string;
  user: User;
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  const { list, ...loadMoreProps } = useLoadMore<
    Photo,
    UserLikedPhotoListCriteria
  >(
    photoList,
    {
      username: user?.username || "",
      per_page: PHOTOS_PER_PAGE,
    },
    fetchUserLikedPhotoList
  );
  return (
    <>
      {user && <UserInfo user={user} />}
      {photoList && (
        <div className="userMain">
          <Gallery
            deviceType={deviceType}
            loadMoreProps={photoList.length ? loadMoreProps : undefined}
            photoList={list}
          />
        </div>
      )}
    </>
  );
}

MemberLikedPhotos.getLayout = (page: ReactElement) => (
  <UserTemplate>{page}</UserTemplate>
);

export const getServerSideProps: GetServerSideProps = async function (context) {
  if (!context.req.cookies["access_token"])
    return {
      redirect: {
        destination: "/member/auth",
        permanent: false,
      },
      props: {},
    };
  let user: User | null = null;
  let photoList: Photo[] | null = null;
  try {
    const res = await fetchCurrentUser(context.req.cookies["access_token"]);
    log("fetchCurrentUser res", res);
    if (res && res.username) user = res;
    else
      return {
        redirect: {
          destination: "/member/auth",
        },
        props: {},
      };

    const photoListEntity = user
      ? await fetchUserLikedPhotoList({
          username: user.username,
          per_page: PHOTOS_PER_PAGE,
        })
      : null;
    if (photoListEntity && photoListEntity.results)
      photoList = photoListEntity.results;
    //
  } catch (error: any) {
    if (error && error.message)
      log("error in MemberLikedPhotos ~ getServerSideProps", error.message);
    else log("error in MemberLikedPhotos ~ getServerSideProps");
  }
  return {
    props: {
      access_token: context.req.cookies["access_token"],
      user,
      photoList,
    },
  };
};

export default MemberLikedPhotos;
