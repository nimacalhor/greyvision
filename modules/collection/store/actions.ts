import {
  Collection,
  CollectionListCriteria,
} from "@main/modules/collection/libraries/collection-types";
import {
  AddCollectionsAction,
  PushCollectionsAction,
  PutCollectionQueryAction,
} from "./../libraries/collection-types";
import PhotoActionTypes from "./action-types";

import type {
  GetCollectionsAction,
  PutCollectionsAction,
  PutPendingCollectionsAction,
  PutErrorCollectionsAction,
} from "../libraries/collection-types";

const getCollections = (
  criteria: CollectionListCriteria
): GetCollectionsAction => ({
  type: PhotoActionTypes.GET_COLLECTIONS,
  payload: {
    criteria,
  },
});
const addCollections = (
  criteria: CollectionListCriteria
): AddCollectionsAction => ({
  type: PhotoActionTypes.ADD_COLLECTIONS,
  payload: {
    criteria,
  },
});

const putCollections = (list: Collection[]): PutCollectionsAction => ({
  type: PhotoActionTypes.PUT_COLLECTIONS,
  payload: {
    list,
  },
});
const pushCollections = (list: Collection[]): PushCollectionsAction => ({
  type: PhotoActionTypes.PUSH_COLLECTIONS,
  payload: {
    list,
  },
});

const putPendingCollections = (
  pending: boolean
): PutPendingCollectionsAction => ({
  type: PhotoActionTypes.PUT_PENDING_COLLECTIONS,
  payload: { pending },
});

const putErrorCollections = (
  error: string | null
): PutErrorCollectionsAction => ({
  type: PhotoActionTypes.PUT_ERROR_COLLECTIONS,
  payload: { error },
});

const putCollectionsQuery = (query: string): PutCollectionQueryAction => ({
  type: PhotoActionTypes.PUT_COLLECTION_QUERY,
  payload: { query },
});

export {
  getCollections,
  putCollections,
  pushCollections,
  addCollections,
  putPendingCollections,
  putErrorCollections,
  putCollectionsQuery,
};
