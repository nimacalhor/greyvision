import { PHOTOS_ORDER_BY, PHOTOS_PER_PAGE } from "@general/libraries/constants";
import { fetchPhotoList } from "@main/modules/photo/store/api/photo-api";
import { putPhotos } from "@main/modules/photo/store/photo-actions";
import { log } from "@main/modules/general/libraries/helper";
import { wrapper } from "@main/modules/store";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
// types ______________________________
import type { RootState } from "@main/modules/root-reducer";

export default function Home() {
  const photoState = useSelector((state: RootState) => state.photo);
  log("state", photoState);
  return (
    <div>
      <Button color="secondary" variant="contained">
        load more
      </Button>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const response = await fetchPhotoList({
    query: ".",
    color: "black_and_white",
    page: 1,
    order_by: PHOTOS_ORDER_BY,
    per_page: PHOTOS_PER_PAGE,
  });
  store.dispatch(
    putPhotos({
      page: response.criteria.page || 1,
      photos: response.results,
    })
  );
  return {
    props: {
      response,
    },
  };
});
