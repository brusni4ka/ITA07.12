import { configureStore } from '@reduxjs/toolkit'
import {reducer as moviesReducer}  from "./redux/moviesReducer";
import {reducer as movieReducer}  from "./redux/movieReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';

import  { IMoviesState} from './redux/moviesReducer';
import  { IMovieState} from './redux/movieReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,  
  },
  middleware: [sagaMiddleware],
})
// const rootReducer = combineReducers({
//   movies: moviesReducer,
//   movie: movieReducer
// })

export interface IRootState {
  movies: IMoviesState,
  movie: IMovieState
}



sagaMiddleware.run(rootSaga);
export default store;

// const composeEnhancers = composeWithDevTools({trace: true});

// const store =  createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
// sagaMiddleware.run(rootSaga);

// export default store;
