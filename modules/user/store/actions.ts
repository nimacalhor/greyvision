import { User, UserListCriteria } from "./../libraries/user-types";
import type {
  GetUsersAction,
  PutUsersAction,
  PutPendingUsersAction,
  PutErrorUsersAction,
  PushUsersAction,
  AddUsersAction,
  PutUserQueryAction
} from "../libraries/user-types";
import UserActionTypes from "./action-types";

const getUsers = (criteria: UserListCriteria): GetUsersAction => ({
  type: UserActionTypes.GET_USERS,
  payload: {
    criteria,
  },
});
const addUsers = (criteria: UserListCriteria): AddUsersAction => ({
  type: UserActionTypes.ADD_USERS,
  payload: {
    criteria,
  },
});

const putUsers = (list: User[]): PutUsersAction => ({
  type: UserActionTypes.PUT_USERS,
  payload: {
    list,
  },
});
const pushUsers = (list: User[]): PushUsersAction => ({
  type: UserActionTypes.PUSH_USERS,
  payload: {
    list,
  },
});

const putPendingUsers = (pending: boolean): PutPendingUsersAction => ({
  type: UserActionTypes.PUT_PENDING_USERS,
  payload: { pending },
});

const putErrorUsers = (error: string | null): PutErrorUsersAction => ({
  type: UserActionTypes.PUT_ERROR_USERS,
  payload: { error },
});

const putUsersQuery = (query: string): PutUserQueryAction => ({
  type: UserActionTypes.PUT_USER_QUERY,
  payload: { query },
});

export {
  getUsers,
  putUsers,
  pushUsers,
  addUsers,
  putPendingUsers,
  putErrorUsers,
  putUsersQuery,
};
