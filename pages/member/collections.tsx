import { log } from "@main/modules/general/libraries/helper";
import { fetchCurrentUser } from "@main/modules/member/store/api/member-api";
import UserInfo from "@main/modules/user/components/user-info";
import { fetchUserCollectionList } from "@main/modules/user/store/api/user-api";
import {
  User,
  UserCollectionListCriteria,
} from "@main/modules/user/libraries/user-types";
import useLoadMore from "@main/modules/general/libraries/load-more";
import UserTemplate from "@main/templates/user-template";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import {
  COLLECTION_PER_PAGE,
  PHOTOS_PER_PAGE,
} from "@main/modules/general/libraries/constants";
import useDeviceType from "@main/modules/general/libraries/device-type";
import { Collection } from "@main/modules/collection/libraries/collection-types";
import CollectionGrid from "@main/modules/collection/components/collection-grid";

function MemberPhotos({
  access_token,
  user,
  collectionList,
}: {
  access_token: string;
  user: User;
  collectionList: Collection[] | null;
}) {
  const deviceType = useDeviceType();
  const { list, ...loadMoreProps } = useLoadMore<
    Collection,
    UserCollectionListCriteria
  >(
    collectionList,
    {
      username: user?.username || "",
      per_page: COLLECTION_PER_PAGE,
    },
    fetchUserCollectionList
  );
  return (
    <>
      {user && <UserInfo user={user} />}
      {collectionList && (
        <div className="userMain">
          <CollectionGrid
            collectionList={list}
            loadMoreProps={collectionList.length ? loadMoreProps : undefined}
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
  let collectionList: Collection[] | null = null;
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

    const collectionListEntity = user
      ? await fetchUserCollectionList({
          username: user.username,
          per_page: PHOTOS_PER_PAGE,
        })
      : null;
    if (collectionListEntity && collectionListEntity.results)
      collectionList = collectionListEntity.results;
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
      collectionList,
    },
  };
};

export default MemberPhotos;
