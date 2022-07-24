import collectionSaga from "./collection/store/saga";
import photoSaga from "./photo/store/saga";
import userSaga from "./user/store/saga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([photoSaga(), collectionSaga(), userSaga()]);
}

export default rootSaga;
