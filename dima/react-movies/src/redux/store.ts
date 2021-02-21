import { createStore, compose, applyMiddleware } from "redux";
import * as actionCreators from "./moviesActions";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import moviesReducer from "./moviesReducer";
import rootSaga from "./rootSaga";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
  moviesReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
export default Store;
