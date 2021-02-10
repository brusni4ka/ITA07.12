import {
  MoviesActionTypes,
  requestMovieAction,
  requestMovieError,
  requestMoviesAction,
  requestMoreMoviesSuccess,
  requestMoviesError,
  requestMoviesSuccess,
  requestMovieSuccess,
} from "../reducers/moviesReducer";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { stringify } from "query-string";
import IMovie from "../../interface/IMovie/IMovie";

const fetchMovies = (
  search: string,
  searchBy: string,
  sortBy: string,
  offset: number
): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    const urlParams = stringify({ offset, search, searchBy, sortBy });
    fetch(`https://reactjs-cdp.herokuapp.com/movies?${urlParams}&limit=9`)
      .then((response) => response.json())
      .then((receivedData) => {
        resolve(receivedData.data);
      });
  });
};

function* requestMoviesSaga(action: requestMoviesAction) {
  try {
    const movies = yield call(
      fetchMovies,
      action.search,
      action.searchBy,
      action.sortBy,
      action.offset
    );

    if (action.offset === 0) {
      yield put(requestMoviesSuccess(movies));
    } else {
      yield put(requestMoreMoviesSuccess(movies));
    }
  } catch (e) {
    yield put(requestMoviesError());
  }
}

const fetchMoviesSub = () => {
  return takeLatest(MoviesActionTypes.REQUEST_MOVIES, requestMoviesSaga);
};

const fetchMovie = async (id: string) => {
  const url = `https://reactjs-cdp.herokuapp.com/movies/${id}`;
  let response = await fetch(url);
  let movie = await response.json();
  return movie;
};

function* requestMovieSaga(action: requestMovieAction) {
  try {
    const movie = yield call(fetchMovie, action.id);
    let search = movie.genres[0];
    const movies = yield fetchMovies(search, "genres", "rating", 0);
    yield put(requestMovieSuccess(movie));
    yield put(requestMoviesSuccess(movies));
  } catch (e) {
    yield put(requestMovieError());
  }
}

const fetchMovieSub = () => {
  return takeLatest(MoviesActionTypes.REQUEST_MOVIE, requestMovieSaga);
};

export function* moviesSaga() {
  return yield all([fetchMoviesSub(), fetchMovieSub()]);
}
