import { fetchCollectionList } from "@collection/store/api/collection-api";
import CollectionGrid from "@collection/components/collection-grid";
import { COLLECTION_PER_PAGE } from "@general/libraries/constants";
import { getQuery } from "@main/pages/api/query";

// types ______________________________
import { Collection } from "@collection/libraries/collection-types";
import type { GetStaticProps } from "next";
import { log } from "@main/modules/general/libraries/helper";

function CollectionsPage({
  collectionList,
  query,
}: {
  collectionList: Collection[] | null;
  query: string;
}) {
  return (
    <>
      {collectionList && (
        <CollectionGrid collectionList={collectionList} criteria={{ query }} />
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
    log("error in collection ~ getStaticProps", error.message);
  }
  return { props: { collectionList, query } };
};

export default CollectionsPage;
