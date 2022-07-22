import { fetchCollectionList } from "@main/modules/collection/store/api/collection-api";
import CollectionGrid from "@main/modules/collection/components/collection-grid";
import { Collection } from "@main/modules/collection/libraries/collection-types";
import { COLLECTION_PER_PAGE } from "@main/modules/general/libraries/constants";
import { log } from "@main/modules/general/libraries/helper";
import { SearchTemplate } from "@main/templates";
import { getQuery } from "../api/query";
import { GetStaticProps } from "next";
import { ReactElement } from "react";

function SearchCollectionsPage({
  collectionList,
  query,
}: {
  collectionList: Collection[] | null;
  query: string;
}) {
  return (
    <>{collectionList && <CollectionGrid collectionList={collectionList} />}</>
  );
}

SearchCollectionsPage.getLayout = (page: ReactElement) => (
  <SearchTemplate>{page}</SearchTemplate>
);

export const getStaticProps: GetStaticProps = async function () {
  const query = getQuery();
  let collectionList: Collection[] | null = null;
  try {
    const collectionListEntity = await fetchCollectionList({
      query,
      per_page: COLLECTION_PER_PAGE,
    });
    if (collectionListEntity.results)
      collectionList = collectionListEntity.results;
    else log("error in collection ~ getStaticProps", "no collection found");
  } catch (error: any) {
    if (error && error.message)
      log("error in collection ~ getStaticProps", error.message);
    else log("error in collection ~ getStaticProps");
  }
  return { props: { collectionList, query } };
};
export default SearchCollectionsPage;
