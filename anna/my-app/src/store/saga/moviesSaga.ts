import { FetchMoviesRequestedAction, LoadMoreMoviesRequestedAction, MoviesActionTypes } from '../redux/moviesActions';
import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import Api from '../../Api';

function* fetchMoviesSaga(action: FetchMoviesRequestedAction) {
  try {
    const movies = yield call(Api.fetchMovies, action.payload);
    console.log(movies);
    yield put({ type: MoviesActionTypes.FETCH_MOVIES_SUCCESS, movies });
  } catch (e) {
    yield put({ type: MoviesActionTypes.FETCH_MOVIES_ERROR, e })
  }
}

export function* loadMoreMoviesSaga(action: LoadMoreMoviesRequestedAction) {
  try {
    console.log(action.payload.limit, 'load more mov saga')
    const movies = yield call(Api.loadMoreMovies, action.payload.searchParams, action.payload.limit);
    yield put({ type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS, movies });
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