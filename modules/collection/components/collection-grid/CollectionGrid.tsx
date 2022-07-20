import CollectionSectionCard from "@collection/components/collection-section-card";
import { fetchCollectionList } from "../../store/api/collection-api";
import useLoadMore from "@general/libraries/load-more";
import LoadMore from "@general/components/load-more";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// types ______________________________
import {
  Collection,
  CollectionListCriteria,
} from "@collection/libraries/collection-types";

function CollectionGrid({
  collectionList,
  criteria,
}: {
  collectionList: Collection[] | null;
  criteria: CollectionListCriteria;
}) {

  const { list, error, loadMoreHandler, pending } = useLoadMore<Collection, CollectionListCriteria>(
    collectionList,
    criteria,
    fetchCollectionList
  );
  
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
