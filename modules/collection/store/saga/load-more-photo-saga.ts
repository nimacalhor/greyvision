import {
  CollectionListEntity,
  GetCollectionsAction,
} from "./../../libraries/collection-types";
import { put, call, take, fork } from "redux-saga/effects";
import { fetchCollectionList } from "../api/collection-api";
import {
  pushCollections,
  putErrorCollections,
  putPendingCollections,
} from "../actions";
import CollectionActionTypes from "../action-types";

function* collectionListFlow({ criteria }: GetCollectionsAction["payload"]) {
  try {
    yield put(putPendingCollections(true));
    const entity: CollectionListEntity = yield call(
      fetchCollectionList,
      criteria
    );
    if (entity.results.length > 0) {
      yield put(pushCollections(entity.results));
      yield put(putPendingCollections(false));
    } else {
      if (entity.criteria.page && entity.total_pages <= entity.criteria.page)
        yield put(putErrorCollections("error ~ no more pages"));
      else yield put(putErrorCollections("error ~ no collections"));
      yield put(putPendingCollections(false));
    }
  } catch (error) {
    yield put(putErrorCollections("error something went wrong"));
  }
}

function* collectionListWatcher() {
  while (true) {
    const { payload } = yield take(CollectionActionTypes.GET_COLLECTIONS);
    yield fork(collectionListFlow, payload);
  }
}

export default collectionListWatcher;
