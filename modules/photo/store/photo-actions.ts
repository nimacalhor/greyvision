import PhotoActionsTypes from "./action-types";
import type {
  PutPendingPhotosAction,
  PutErrorPhotosAction,
  PutPhotoQueryAction,
  PhotoListCriteria,
  PutLoadMoreAction,
  GetPhotosAction,
  PutPhotosAction,
  PhotoStateItem,
} from "../libraries/photo-types";

const getPhotos = (criteria: PhotoListCriteria): GetPhotosAction => ({
  type: PhotoActionsTypes.GET_PHOTOS,
  payload: {
    criteria,
  },
});
const putPhotos = (item: PhotoStateItem): PutPhotosAction => ({
  type: PhotoActionsTypes.PUT_PHOTOS,
  payload: { item },
});
const putPendingPhotos = (pending: boolean): PutPendingPhotosAction => ({
  type: PhotoActionsTypes.PUT_PENDING_PHOTOS,
  payload: { pending },
});
const putErrorPhotos = (error: string | null): PutErrorPhotosAction => ({
  type: PhotoActionsTypes.PUT_ERROR_PHOTOS,
  payload: { error },
});
const putLoadMore = (limit: number): PutLoadMoreAction => ({
  type: PhotoActionsTypes.PUT_LOAD_MORE,
  payload: {
    limit,
  },
});
const putPhotoQuery = (query: string): PutPhotoQueryAction => ({
  type: PhotoActionsTypes.PUT_PHOTO_QUERY,
  payload: {
    query,
  },
});

export {
  putPendingPhotos,
  putErrorPhotos,
  putPhotoQuery,
  putLoadMore,
  putPhotos,
  getPhotos,
};
