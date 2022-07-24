import { AddPhotosAction, PushPhotosAction, PutPhotoQueryAction } from "./../libraries/photo-types";
import PhotoActionTypes from "./action-types";

import type { PhotoListCriteria, Photo } from "@photo/libraries/photo-types";
import type {
  GetPhotosAction,
  PutPhotosAction,
  PutPendingPhotosAction,
  PutErrorPhotosAction,
} from "../libraries/photo-types";

const getPhotos = (criteria: PhotoListCriteria): GetPhotosAction => ({
  type: PhotoActionTypes.GET_PHOTOS,
  payload: {
    criteria,
  },
});
const addPhotos = (criteria: PhotoListCriteria): AddPhotosAction => ({
  type: PhotoActionTypes.ADD_PHOTOS,
  payload: {
    criteria,
  },
});

const putPhotos = (list: Photo[]): PutPhotosAction => ({
  type: PhotoActionTypes.PUT_PHOTOS,
  payload: {
    list,
  },
});
const pushPhotos = (list: Photo[]): PushPhotosAction => ({
  type: PhotoActionTypes.PUSH_PHOTOS,
  payload: {
    list,
  },
});

const putPendingPhotos = (pending: boolean): PutPendingPhotosAction => ({
  type: PhotoActionTypes.PUT_PENDING_PHOTOS,
  payload: { pending },
});

const putErrorPhotos = (error: string | null): PutErrorPhotosAction => ({
  type: PhotoActionTypes.PUT_ERROR_PHOTOS,
  payload: { error },
});

const putPhotosQuery = (query: string): PutPhotoQueryAction => ({
  type: PhotoActionTypes.PUT_PHOTO_QUERY,
  payload: { query },
});

export {
  getPhotos,
  putPhotos,
  pushPhotos,
  addPhotos,
  putPendingPhotos,
  putErrorPhotos,
  putPhotosQuery,
};
