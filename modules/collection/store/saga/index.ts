import loadMoreFlow from "./load-more-photo-saga";
import collectionListFlow from "./photo-saga";
import { all } from "redux-saga/effects";

function* productSaga() {
  yield all([collectionListFlow(), loadMoreFlow()]);
}

export default productSaga;
