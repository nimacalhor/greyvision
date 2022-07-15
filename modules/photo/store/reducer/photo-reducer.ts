import PhotoActionsTypes from "../action-types";
import { HYDRATE } from "next-redux-wrapper";
import {
  setPendingPhotos,
  setErrorPhotos,
  setPhotoQuery,
  setLoadMore,
  initState,
  putPhotos,
} from "./photo-reducer-helper";

// types ______________________________
import type { AppAction } from "@general/libraries/general-types";
import type { PhotoState } from "./../../libraries/photo-types";
import type { Reducer } from "redux";

const reducer: Reducer<PhotoState, AppAction> = function (
  state: PhotoState = initState,
  action: AppAction
) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.photo };

    case PhotoActionsTypes.PUT_PHOTOS:
      return putPhotos(state, action.payload);

    case PhotoActionsTypes.PUT_PENDING_PHOTOS:
      return setPendingPhotos(state, action.payload);

    case PhotoActionsTypes.PUT_ERROR_PHOTOS:
      return setErrorPhotos(state, action.payload);

    case PhotoActionsTypes.PUT_LOAD_MORE:
      return setLoadMore(state, action.payload);

    case PhotoActionsTypes.PUT_PHOTO_QUERY:
      return setPhotoQuery(state, action.payload);

    default:
      return { ...state };
  }
};
export default reducer;
