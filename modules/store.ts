import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

import type { Task } from "@redux-saga/core";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const saga = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(saga))
  );
  (store as any).sagaTask = saga.run(rootSaga);
  return store;
}
export default configureStore;
export const wrapper = createWrapper(configureStore as any, { debug: false });
