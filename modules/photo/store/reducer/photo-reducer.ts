import { AppAction } from "@main/modules/general/libraries/general-types";
import { Reducer } from "redux";
import { PhotoState } from "../../libraries/photo-types";
import PhotoActionTypes from "../action-types";
import {
  initState,
  putErrorPhotos,
  putPendingPhotos,
  putPhotosList,
  putQueryPhotos,
  pushPhotosList
} from "./helper";

const reducer: Reducer<PhotoState, AppAction> = function (
  state: PhotoState = initState,
  action: AppAction
) {
  switch (action.type) {
    case PhotoActionTypes.PUT_PHOTOS:
      return putPhotosList(state, action.payload);
    case PhotoActionTypes.PUSH_PHOTOS:
      return pushPhotosList(state, action.payload);
    case PhotoActionTypes.PUT_PENDING_PHOTOS:
      return putPendingPhotos(state, action.payload);
    case PhotoActionTypes.PUT_ERROR_PHOTOS:
      return putErrorPhotos(state, action.payload);
    case PhotoActionTypes.PUT_PHOTO_QUERY:
      return putQueryPhotos(state, action.payload);
    default:
      return { ...state };
  }
};

export default reducer;
