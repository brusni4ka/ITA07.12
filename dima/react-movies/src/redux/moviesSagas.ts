import ActionTypes from "../enums/ActionTypes";
import {
  FetchMoviesAction,
  setMovies,
  fetchMoviesError,
} from "./moviesActions";
import { takeLatest, call, put, all } from "redux-saga/effects";
import QueryString from "query-string";
import MovieInterface from "../interfaces/movieInterface";
import { URLMovieParams } from "./moviesActions";

export const fetchMovies = async (
  params: URLMovieParams
): Promise<MovieInterface[]> => {
  const stringParams = QueryString.stringify(params);
  const response = await fetch(
    `https://reactjs-cdp.herokuapp.com/movies?${stringParams}`
  );
  const movies = await response.json();
  return movies;
};
function* fetchMoviesSaga(action: FetchMoviesAction) {
  try {
    const { loadingMovies, ...params } = action.payload;
    const movies = yield call(fetchMovies, params);
    yield put(setMovies(movies, false));
  } catch (e) {
    yield put(fetchMoviesError());
  }
}

const fetchMoviesSub = () => {
  return takeLatest(ActionTypes.FETCH_MOVIES, fetchMoviesSaga);
};

export default (function* () {
  return yield all([fetchMoviesSub()]);
})();
