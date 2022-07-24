import loadMoreFlow from "./load-more-photo-saga";
import photoListFlow from "./photo-saga";
import { all } from "redux-saga/effects";

function* productSaga() {
  yield all([photoListFlow(), loadMoreFlow()]);
}

export default productSaga;
