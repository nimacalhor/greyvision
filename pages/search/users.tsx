import { USER_PER_PAGE } from "@general/libraries/constants";
import useDeviceType from "@general/libraries/device-type";
import { fetchUserList } from "@user/store/api/user-api";
import UserGrid from "@user/components/user-grid";
import { SearchTemplate } from "@main/templates";
import { log } from "@general/libraries/helper";
import { getQuery } from "../api/query";

import type { User } from "@user/libraries/user-types";
import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

function SearchUsersPage({ userList }: { userList: User[] | null }) {
  const deviceType = useDeviceType();
  return (
    <>{userList && <UserGrid userList={userList} deviceType={deviceType} />}</>
  );
}

SearchUsersPage.getLayout = (page: ReactElement) => (
  <SearchTemplate>{page}</SearchTemplate>
);

export const getStaticProps: GetStaticProps = async function () {
  const query = getQuery();
  let userList: User[] | null = null;
  try {
    const entity = await fetchUserList({
      query,
      per_page: USER_PER_PAGE,
    });
    if (entity.results) userList = entity.results;
    else log("error in user ~ getStaticProps", "no user found");
  } catch (error: any) {
    if (error && error.message)
      log("error in user ~ getStaticProps", error.message);
      else
      log("error in user ~ getStaticProps");
  }
  return { props: { userList, query } };
};

export default SearchUsersPage;
