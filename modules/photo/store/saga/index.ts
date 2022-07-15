import photoListWatcher from "./photo-saga";
import { all } from "redux-saga/effects";

function* photoSaga() {
  yield all([photoListWatcher()]);
}

export default photoSaga;
