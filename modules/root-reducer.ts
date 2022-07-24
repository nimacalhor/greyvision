import collectionReducer from "./collection/store/reducer/collections-reducer";
import photoReducer from "./photo/store/reducer/photo-reducer";
import userReducer from "./user/store/reducer/user-reducer";

import type { CollectionState } from "./collection/libraries/collection-types";
import type { PhotoState } from "./photo/libraries/photo-types";
import type { UserState } from "./user/libraries/user-types";

import { combineReducers } from "redux";

export interface RootState {
  photo: PhotoState;
  collection: CollectionState;
  user: UserState;
}
const rootReducer = combineReducers({
  photo: photoReducer,
  collection: collectionReducer,
  user: userReducer,
});

export default rootReducer;
