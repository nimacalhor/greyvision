import { log } from "@main/modules/general/libraries/helper";
import type { PhotoStateItem } from "../../libraries/photo-types";
import type {
  PutPendingPhotosAction,
  PutErrorPhotosAction,
  PutPhotoQueryAction,
  PutLoadMoreAction,
  PutPhotosAction,
  PhotoState,
} from "../../libraries/photo-types";

const initState: PhotoState = {
  error: null,
  pending: false,
  canLoadMore: true,
  query: "",
  list: [],
};

const sortList = (list: PhotoState["list"]) =>
  list.sort(({ page: a }, { page: b }) => b - a);

const putPhotos = function (
  state: PhotoState,
  { item }: PutPhotosAction["payload"]
): PhotoState {
  let results: PhotoState["list"];
  if (
    item.photos &&
    !state.list.find((stateItem) => stateItem.page === item.page)
  )
    results = [...state.list, item];
  else results = [...state.list];
  sortList(results);
  return {
    ...state,
    list: results,
  };
};

const setPendingPhotos = function (
  state: PhotoState,
  payload: PutPendingPhotosAction["payload"]
): PhotoState {
  return {
    ...state,
    pending: payload.pending,
  };
};

const setErrorPhotos = function (
  state: PhotoState,
  payload: PutErrorPhotosAction["payload"]
): PhotoState {
  return {
    ...state,
    error: payload.error,
  };
};

const setLoadMore = function (
  state: PhotoState,
  payload: PutLoadMoreAction["payload"]
): PhotoState {
  return {
    ...state,
    canLoadMore: payload.limit >= state.list[state.list.length - 1].page,
  };
};
const setPhotoQuery = function (
  state: PhotoState,
  payload: PutPhotoQueryAction["payload"]
): PhotoState {
  return {
    ...state,
    query: payload.query,
  };
};

export {
  setPendingPhotos,
  setErrorPhotos,
  setPhotoQuery,
  setLoadMore,
  initState,
  putPhotos,
};
