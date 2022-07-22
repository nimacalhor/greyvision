import { fetchCollectionList } from "@collection/store/api/collection-api";
import useLoadMore from "@main/modules/general/libraries/load-more";
import CollectionGrid from "@collection/components/collection-grid";
import { COLLECTION_PER_PAGE } from "@general/libraries/constants";
import { getQuery } from "@main/pages/api/query";

// types ______________________________
import {
  Collection,
  CollectionListCriteria,
} from "@collection/libraries/collection-types";
import type { GetStaticProps } from "next";
import { log } from "@main/modules/general/libraries/helper";

function CollectionsPage({
  collectionList,
  query,
}: {
  collectionList: Collection[] | null;
  query: string;
}) {
  const { list, ...loadMoreProps } = useLoadMore<
    Collection,
    CollectionListCriteria
  >(collectionList, { query }, fetchCollectionList);
  return (
    <>
      {collectionList && (
        <CollectionGrid collectionList={list} loadMoreProps={loadMoreProps} />
      )}
    </>
  );
}

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

export default CollectionsPage;
