import {
  PutPendingCollectionsAction,
  PutErrorCollectionsAction,
  PutCollectionQueryAction,
} from "./../../libraries/collection-types";
import {
  CollectionState,
  PushCollectionsAction,
  PutCollectionsAction,
} from "../../libraries/collection-types";

const initState: CollectionState = {
  error: null,
  pending: false,
  query: "",
  list: [],
};

const putCollections = (
  state: CollectionState,
  payload: PutCollectionsAction["payload"]
): CollectionState => {
  const { list } = payload;
  const newList = list && list.length ? list : [...state.list];
  return {
    ...state,
    list: newList,
  };
};

const pushCollections = (
  state: CollectionState,
  payload: PushCollectionsAction["payload"]
): CollectionState => {
  const { list } = payload;
  const newList = [...state.list];
  if (list && list.length) newList.push(...list);
  return {
    ...state,
    list: newList,
  };
};

const putPendingCollections = (
  state: CollectionState,
  payload: PutPendingCollectionsAction["payload"]
): CollectionState => {
  const { pending } = payload;
  return {
    ...state,
    pending: pending || false,
  };
};

const putErrorCollections = (
  state: CollectionState,
  payload: PutErrorCollectionsAction["payload"]
): CollectionState => {
  const { error } = payload;
  return {
    ...state,
    error: error || null,
  };
};

const putQueryCollections = (
  state: CollectionState,
  payload: PutCollectionQueryAction["payload"]
): CollectionState => {
  const { query } = payload;
  return {
    ...state,
    query: query || "",
  };
};

export {
  initState,
  putCollections,
  pushCollections,
  putPendingCollections,
  putErrorCollections,
  putQueryCollections,
};
