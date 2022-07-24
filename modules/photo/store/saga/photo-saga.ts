import {
  GetPhotosAction,
  PhotoListEntity,
} from "./../../libraries/photo-types";
import PhotoActionTypes from "../action-types";
import { put, call, take, fork } from "redux-saga/effects";
import { fetchPhotoList } from "../api/photo-api";
import {
  putErrorPhotos,
  putPendingPhotos,
  putPhotos,
  putPhotosQuery,
} from "../actions";

function* photoListFlow({ criteria }: GetPhotosAction["payload"]) {
  try {
    yield put(putPendingPhotos(true));
    yield put(putPhotosQuery(criteria.query));
    const entity: PhotoListEntity = yield call(fetchPhotoList, criteria);
    if (entity.results.length > 0) {
      yield put(putPhotos(entity.results));
      yield put(putPendingPhotos(false));
    } else {
      if (entity.criteria.page && entity.total_pages <= entity.criteria.page)
        yield put(putErrorPhotos("error ~ no more pages"));
      else yield put(putErrorPhotos("error ~ no photos"));
      yield put(putPendingPhotos(false));
    }
  } catch (error) {
    yield put(putErrorPhotos("error something went wrong"));
  }
}

function* productListWatcher() {
  while (true) {
    const { payload } = yield take(PhotoActionTypes.GET_PHOTOS);
    yield fork(photoListFlow, payload);
  }
}

export default productListWatcher;
