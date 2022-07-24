import { CollectionState } from "../../libraries/collection-types";
import { AppAction } from "@main/modules/general/libraries/general-types";
import { Reducer } from "redux";
import {
  initState,
  pushCollections,
  putCollections,
  putErrorCollections,
  putPendingCollections,
  putQueryCollections,
} from "./helper";
import CollectionActionTypes from "../action-types";

const reducer: Reducer<CollectionState, AppAction> = function (
  state: CollectionState = initState,
  action: AppAction
) {
  switch (action.type) {
    case CollectionActionTypes.PUT_COLLECTIONS:
      return putCollections(state, action.payload);
    case CollectionActionTypes.PUSH_COLLECTIONS:
      return pushCollections(state, action.payload);
    case CollectionActionTypes.PUT_PENDING_COLLECTIONS:
      return putPendingCollections(state, action.payload);
    case CollectionActionTypes.PUT_ERROR_COLLECTIONS:
      return putErrorCollections(state, action.payload);
    case CollectionActionTypes.PUT_COLLECTION_QUERY:
      return putQueryCollections(state, action.payload);
    default:
      return { ...state };
  }
};

export default reducer;
