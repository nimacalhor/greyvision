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
import type { LoadMoreProps } from "@general/components/load-more/LoadMore";

function CollectionGrid({
  collectionList,
  loadMoreProps,
}: {
  collectionList: Collection[];
  loadMoreProps?: LoadMoreProps;
}) {
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {collectionList.length &&
          collectionList.map((clt) => (
            <Grid item xs={12} sm={6} md={4} key={clt.id}>
              <CollectionSectionCard collection={clt} />
              <br />
            </Grid>
          ))}
      </Grid>
      {loadMoreProps && (
        <LoadMore
          error={loadMoreProps.error}
          pending={loadMoreProps.pending}
          loadMoreHandler={loadMoreProps.loadMoreHandler}
        />
      )}
    </Container>
  );
}

export default CollectionGrid;
