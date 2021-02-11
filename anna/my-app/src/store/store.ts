import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';

import  {moviesReducer, IMoviesState} from './redux/moviesReducer';
import  {movieReducer, IMovieState} from './redux/movieReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer
})

export interface IRootState {
  movies: IMoviesState,
  movie: IMovieState
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({trace: true});

const store =  createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
