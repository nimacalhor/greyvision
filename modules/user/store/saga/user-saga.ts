import {
  GetUsersAction,
  UserListEntity,
} from "./../../libraries/user-types";
import UserActionTypes from "../action-types";
import { put, call, take, fork } from "redux-saga/effects";
import { fetchUserList } from "../api/user-api";
import {
  putErrorUsers,
  putPendingUsers,
  putUsers,
  putUsersQuery,
} from "../actions";

function* userListFlow({ criteria }: GetUsersAction["payload"]) {
  try {
    yield put(putPendingUsers(true));
    yield put(putUsersQuery(criteria.query));
    const entity: UserListEntity = yield call(fetchUserList, criteria);
    if (entity.results.length > 0) {
      yield put(putUsers(entity.results));
      yield put(putPendingUsers(false));
    } else {
      if (entity.criteria.page && entity.total_pages <= entity.criteria.page)
        yield put(putErrorUsers("error ~ no more pages"));
      else yield put(putErrorUsers("error ~ no users"));
      yield put(putPendingUsers(false));
    }
  } catch (error) {
    yield put(putErrorUsers("error something went wrong"));
  }
}

function* productListWatcher() {
  while (true) {
    const { payload } = yield take(UserActionTypes.GET_USERS);
    yield fork(userListFlow, payload);
  }
}

export default productListWatcher;
