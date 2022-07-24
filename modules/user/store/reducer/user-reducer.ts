import { AppAction } from "@main/modules/general/libraries/general-types";
import { Reducer } from "redux";
import { UserState } from "../../libraries/user-types";
import UserActionTypes from "../action-types";
import {
  initState,
  putErrorUsers,
  putPendingUsers,
  putUsersList,
  putQueryUsers,
  pushUsersList,
} from "./helper";

const reducer: Reducer<UserState, AppAction> = function (
  state: UserState = initState,
  action: AppAction
) {
  switch (action.type) {
    case UserActionTypes.PUT_USERS:
      return putUsersList(state, action.payload);
    case UserActionTypes.PUSH_USERS:
      return pushUsersList(state, action.payload);
    case UserActionTypes.PUT_PENDING_USERS:
      return putPendingUsers(state, action.payload);
    case UserActionTypes.PUT_ERROR_USERS:
      return putErrorUsers(state, action.payload);
    case UserActionTypes.PUT_USER_QUERY:
      return putQueryUsers(state, action.payload);
    default:
      return { ...state };
  }
};

export default reducer;
