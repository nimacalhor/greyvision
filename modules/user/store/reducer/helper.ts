import {
  UserState,
  PutUsersAction,
  PutPendingUsersAction,
  PutErrorUsersAction,
  PutUserQueryAction,
  PushUsersAction,
} from "../../libraries/user-types";

const initState: UserState = {
  error: null,
  pending: false,
  query: "",
  list: [],
};

const putUsersList = (
  state: UserState,
  payload: PutUsersAction["payload"]
): UserState => {
  const { list } = payload;
  const newList = list && list.length ? list : [...state.list];
  return {
    ...state,
    list: newList,
  };
};

const pushUsersList = (
  state: UserState,
  payload: PushUsersAction["payload"]
): UserState => {
  const { list } = payload;
  const newList = [...state.list];
  if (list && list.length) newList.push(...list);
  return {
    ...state,
    list: newList,
  };
};

const putPendingUsers = (
  state: UserState,
  payload: PutPendingUsersAction["payload"]
): UserState => {
  const { pending } = payload;
  return {
    ...state,
    pending: pending || false,
  };
};

const putErrorUsers = (
  state: UserState,
  payload: PutErrorUsersAction["payload"]
): UserState => {
  const { error } = payload;
  return {
    ...state,
    error: error || null,
  };
};

const putQueryUsers = (
  state: UserState,
  payload: PutUserQueryAction["payload"]
): UserState => {
  const { query } = payload;
  return {
    ...state,
    query: query || "",
  };
};

export {
  initState,
  putUsersList,
  pushUsersList,
  putPendingUsers,
  putErrorUsers,
  putQueryUsers,
};
