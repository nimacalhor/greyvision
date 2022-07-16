// import photoReducer from "./photo/store/reducer/photo-reducer";

import type { PhotoState } from "./photo/libraries/photo-types";

import { combineReducers } from "redux";

export interface RootState {
  photo: PhotoState;
}
const rootReducer = combineReducers({
  // photo: photoReducer,
});

export default rootReducer;
