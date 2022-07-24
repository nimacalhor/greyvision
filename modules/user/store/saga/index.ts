import loadMoreFlow from "./load-more-photo-saga";
import userListFlow from "./user-saga";
import { all } from "redux-saga/effects";

function* productSaga() {
  yield all([userListFlow(), loadMoreFlow()]);
}

export default productSaga;
