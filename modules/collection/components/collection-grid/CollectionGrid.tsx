import CollectionSectionCard from "@collection/components/collection-section-card";
import { fetchCollectionList } from "@collection/store/api/collection-api";
import { COLLECTION_PER_PAGE } from "@general/libraries/constants";
import LoadMore from "@general/components/load-more";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState } from "react";

// types ______________________________
import { Collection } from "@collection/libraries/collection-types";

function CollectionGrid({
  collectionList,
  query,
}: {
  collectionList: Collection[] | null;
  query: string;
}) {
  const [list, setList] = useState<Collection[]>(
    collectionList ? [...collectionList] : []
  );
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(2);
  const loadMoreHandler = async function () {
    setPending(true);
    try {
      const collectionListEntity = await fetchCollectionList({
        query,
        page,
        per_page: COLLECTION_PER_PAGE,
      });
      if (collectionListEntity.results) {
        setPage((prevPage) => prevPage + 1);
        setList((prevList) => [...prevList, ...collectionListEntity.results]);
      } else setError("something went wrong");
    } catch (error: any) {
      setError(error.message);
    }
    setPending(false);
  };
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {list.length &&
          list.map((clt) => (
            <Grid item xs={12} sm={6} md={4} key={clt.id}>
              <CollectionSectionCard collection={clt} />
              <br />
            </Grid>
          ))}
      </Grid>
      <LoadMore
        error={error}
        pending={pending}
        onLoadMoreHandler={loadMoreHandler}
      />
    </Container>
  );
}

export default CollectionGrid;
