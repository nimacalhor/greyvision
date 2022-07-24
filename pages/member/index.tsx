import { log } from "@main/modules/general/libraries/helper";
import { fetchCurrentUser } from "@main/modules/member/store/api/member-api";
import { Photo } from "@main/modules/photo/libraries/photo-types";
import { fetchPhotoList } from "@main/modules/photo/store/api/photo-api";
import UserInfo from "@main/modules/user/components/user-info";
import userSmSlide from "@main/modules/user/components/user-sm-slide";
import {
  User,
  UserPhotoListCriteria,
  UserPhotoListEntity,
} from "@main/modules/user/libraries/user-types";
import { fetchUserPhotoList } from "@main/modules/user/store/api/user-api";
import useLoadMore from "@main/modules/general/libraries/load-more";
import UserTemplate from "@main/templates/user-template";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { PHOTOS_PER_PAGE } from "@main/modules/general/libraries/constants";
import useDeviceType from "@main/modules/general/libraries/device-type";
import Gallery from "@main/modules/photo/components/gallery";

function MemberPhotos({
  access_token,
  user,
  photoList,
}: {
  access_token: string;
  user: User;
  photoList: Photo[] | null;
}) {
  const deviceType = useDeviceType();
  const { list, ...loadMoreProps } = useLoadMore<Photo, UserPhotoListCriteria>(
    photoList,
    {
      username: user?.username || "",
      per_page: PHOTOS_PER_PAGE,
    },
    fetchUserPhotoList
  );
  return (
    <>
      {user && <UserInfo user={user} token={access_token} />}
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

MemberPhotos.getLayout = (page: ReactElement) => (
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
      ? await fetchUserPhotoList({
          username: user.username,
          per_page: PHOTOS_PER_PAGE,
        })
      : null;
    if (photoListEntity && photoListEntity.results)
      photoList = photoListEntity.results;
    //
  } catch (error: any) {
    if (error && error.message)
      log("error in MemberPhotos ~ getServerSideProps", error.message);
    else log("error in MemberPhotos ~ getServerSideProps");
  }
  return {
    props: {
      access_token: context.req.cookies["access_token"],
      user,
      photoList,
    },
  };
};

export default MemberPhotos;
