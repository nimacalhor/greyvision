import photoSaga from "./photo/store/saga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([photoSaga()]);
}

export default rootSaga;
