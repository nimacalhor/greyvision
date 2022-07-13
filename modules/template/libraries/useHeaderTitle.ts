import { fetchCollection } from "@collection/store/api/collection-api";
import { getSingleQuery } from "@general/libraries/helper";
import { SITE_NAME } from "@general/libraries/constants";
import URLs from "@general/libraries/urls";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useHeaderTitle(title?: string) {
  const router = useRouter();
  const path = router.pathname;
  const goBackCallback = () => router.back();

  let result: {
    title: string;
    goBackCallback: (() => void) | null;
  } = {
    title: SITE_NAME,
    goBackCallback,
  };

  // Home ______________________________
  if (path === URLs.home)
    result = {
      title: SITE_NAME,
      goBackCallback: null,
    };

  // collections ______________________________
  if (path === URLs.collections)
    result = {
      title: "collections",
      goBackCallback,
    };

  // collection ______________________________
  if (router.query.collectionId)
    result = { title: title || "collection", goBackCallback };

  // member ______________________________
  if (router.query.username)
    result = { title: getSingleQuery(router.query.username), goBackCallback };

  // search ______________________________
  if (path.includes(URLs.search.main))
    result = { title: title || "search results", goBackCallback };

  // user ______________________________
  //   TODO add user name
  if (path.includes(URLs.search.main))
    result = { title: "username", goBackCallback };

  return result;
}
