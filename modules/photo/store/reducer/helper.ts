import {
  PhotoState,
  PutPhotosAction,
  PutPendingPhotosAction,
  PutErrorPhotosAction,
  PutPhotoQueryAction,
  PushPhotosAction,
} from "../../libraries/photo-types";

const initState: PhotoState = {
  error: null,
  pending: false,
  query: "",
  list: [],
};

const putPhotosList = (
  state: PhotoState,
  payload: PutPhotosAction["payload"]
): PhotoState => {
  const { list } = payload;
  const newList = list && list.length ? list : [...state.list];
  return {
    ...state,
    list: newList,
  };
};

const pushPhotosList = (
  state: PhotoState,
  payload: PushPhotosAction["payload"]
): PhotoState => {
  const { list } = payload;
  const newList = [...state.list];
  if (list && list.length) newList.push(...list);
  return {
    ...state,
    list: newList,
  };
};

const putPendingPhotos = (
  state: PhotoState,
  payload: PutPendingPhotosAction["payload"]
): PhotoState => {
  const { pending } = payload;
  return {
    ...state,
    pending: pending || false,
  };
};

const putErrorPhotos = (
  state: PhotoState,
  payload: PutErrorPhotosAction["payload"]
): PhotoState => {
  const { error } = payload;
  return {
    ...state,
    error: error || null,
  };
};

const putQueryPhotos = (
  state: PhotoState,
  payload: PutPhotoQueryAction["payload"]
): PhotoState => {
  const { query } = payload;
  return {
    ...state,
    query: query || "",
  };
};

export {
  initState,
  putPhotosList,
  pushPhotosList,
  putPendingPhotos,
  putErrorPhotos,
  putQueryPhotos,
};
