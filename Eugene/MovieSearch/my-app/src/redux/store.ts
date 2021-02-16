import { combineReducers, createStore, applyMiddleware } from "redux";
import { moviesReducer, MoviesState } from "./reducers/moviesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export interface RootState {
  movies: MoviesState;
}

const composeEnhancers = composeWithDevTools({ trace: true });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
