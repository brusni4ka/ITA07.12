import { combineReducers, createStore, applyMiddleware } from "redux";
import { reducer, MoviesState } from "./reducers/moviesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  movies: reducer,
});

export interface RootState {
  movies: MoviesState;
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware :[sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

export default store;
