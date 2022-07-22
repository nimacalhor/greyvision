import { getParamId, log } from "@main/modules/general/libraries/helper";
import CollectionGrid from "@collection/components/collection-grid";
import UserInfo from "@main/modules/user/components/user-info";
import useDeviceType from "@general/libraries/device-type";
import Gallery from "@photo/components/gallery/Gallery";
import useLoadMore from "@general/libraries/load-more";
import UserTemplate from "@templates/user-template";
import {
  fetchUserCollectionList,
  fetchUserProfile,
} from "@main/modules/user/store/api/user-api";

//
import type {
  User,
  UserCollectionListCriteria,
} from "@main/modules/user/libraries/user-types";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { COLLECTION_PER_PAGE } from "@main/modules/general/libraries/constants";
import { Collection } from "@main/modules/collection/libraries/collection-types";

function UserCollection({
  user,
  collectionList,
}: {
  user: User;
  collectionList: Collection[] | null;
}) {
  return (
    <>
      {user && <UserInfo user={user} />}
      {collectionList && (
        <div className="userMain">
          <CollectionGrid collectionList={collectionList} />
        </div>
      )}
    </>
  );
}

UserCollection.getLayout = (page: ReactElement) => (
  <UserTemplate>{page}</UserTemplate>
);

export const getServerSideProps: GetServerSideProps = async function (context) {
  const username = getParamId(context, "username");
  let user: User | null = null;
  let collectionList: Collection[] | null = null;
  try {
    const entity = await fetchUserProfile({ username });
    if (entity.user) user = entity.user;
    if (!user)
      return {
        notFound: true,
      };

    const photoEntity = await fetchUserCollectionList({
      username,
      per_page: COLLECTION_PER_PAGE,
    });
    if (photoEntity.results) collectionList = photoEntity.results;
  } catch (error: any) {
    log("error in UserCollection ~ getServerSideProps", error.message || "");
  }
  return { props: { user, collectionList } };
};

export default UserCollection;
