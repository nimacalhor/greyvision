import { put, call, take, fork } from "redux-saga/effects";
import { fetchPhotoList } from "../api/photo-api";
import PhotoActionsTypes from "../action-types";
import {
    putPendingPhotos,
    putErrorPhotos,
    putLoadMore,
    putPhotos,
} from "../photo-actions";
// types ______________________________
import type { PhotoListEntity, GetPhotosAction } from "../../libraries/photo-types";

function* photoListFlow({ criteria }: GetPhotosAction["payload"]) {
  try {
    yield put(putPendingPhotos(true));

    const {
      results,
      total_pages,
      criteria: { page },
    }: PhotoListEntity = yield call(fetchPhotoList, criteria);

    if (total_pages && results.length) {
      yield put(putLoadMore(total_pages));
      yield put(putPhotos({ page: page || 1, photos: results }));
      yield put(putPendingPhotos(false));
    } else {
      yield put(putErrorPhotos("failed to fetch photos"));
      yield put(putPendingPhotos(false));
    }
  } catch (error: any) {
    yield put(putErrorPhotos("failed to fetch photos"));
  }
}

function* photoListWatcher() {
  while (true) {
    const { payload } = yield take(PhotoActionsTypes.GET_PHOTOS);
    yield fork(photoListFlow, payload);
  }
}

export default photoListWatcher;
