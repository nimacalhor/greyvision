import { fetchCollectionList } from "@main/modules/collection/store/api/collection-api";
import CollectionGrid from "@main/modules/collection/components/collection-grid";
import { Collection } from "@main/modules/collection/libraries/collection-types";
import { COLLECTION_PER_PAGE } from "@main/modules/general/libraries/constants";
import { log } from "@main/modules/general/libraries/helper";
import { SearchTemplate } from "@main/templates";
import { getQuery } from "../api/query";
import { GetStaticProps } from "next";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@main/modules/root-reducer";
import { LoadMoreProps } from "@main/modules/general/components/load-more/LoadMore";
import { addCollections } from "@main/modules/collection/store/actions";

function SearchCollectionsPage({
  collectionList,
}: {
  collectionList: Collection[] | null;
}) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const { error, list, pending, query } = useSelector(
    (state: RootState) => state.collection
  );
  const loadMoreProps: LoadMoreProps = {
    error,
    pending,
    loadMoreHandler: async function () {
      setPage((prevPage) => prevPage + 1);
      dispatch(addCollections({ page, query, per_page: COLLECTION_PER_PAGE }));
    },
  };
  return (
    <>
      {collectionList && (
        <CollectionGrid
          loadMoreProps={list.length ? loadMoreProps : undefined}
          collectionList={list.length ? list : collectionList}
        />
      )}
    </>
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
