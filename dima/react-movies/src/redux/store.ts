import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as actionCreators from "./moviesActions";
import { composeWithDevTools } from "redux-devtools-extension";
import moviesReducer from "./moviesReducer";
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
const Store = createStore(moviesReducer, composeEnhancers());

export default Store;
