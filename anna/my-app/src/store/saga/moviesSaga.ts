import { FetchMoviesRequestedAction, LoadMoreMoviesRequestedAction, MoviesActionTypes } from '../redux/moviesActions';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import Api from '../../Api';
import * as selector from '../selectors';

function* fetchMoviesSaga(action: FetchMoviesRequestedAction) {
  try {  
    const movies= yield call(Api.fetchMovies, action.payload, 0);
    console.log(movies);
    yield put({ type: MoviesActionTypes.FETCH_MOVIES_SUCCESS, payload: {movies: movies.movies, total: movies.total }});
  } catch (e) {
    yield put({ type: MoviesActionTypes.FETCH_MOVIES_ERROR, e })
  }
}

export function* loadMoreMoviesSaga(action: LoadMoreMoviesRequestedAction) {
  try {
    yield put({ type: MoviesActionTypes.SET_OFFSET, payload: Api.baseSortingSettings.limit });   
    const offset: number = yield select(selector.offset); 
    const movies = yield call(Api.fetchMovies, action.payload, offset);
    yield put({ type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS, payload: {movies: movies.movies, total: movies.total}});
  } catch (e) {
    yield put({ type: MoviesActionTypes.LOAD_MORE_MOVIES_ERROR, e });
  }
}

const fetchMoviesSub = () => {
  return (takeLatest(MoviesActionTypes.FETCH_MOVIES_REQUESTED, fetchMoviesSaga));
}

const loadMoreMoviesSub = () => {
  return (takeEvery(MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED, loadMoreMoviesSaga));
}

export function* moviesSagas() {
  yield fetchMoviesSub();
  yield loadMoreMoviesSub();
}