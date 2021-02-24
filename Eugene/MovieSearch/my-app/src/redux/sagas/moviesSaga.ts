import {
  requestMovies,
  requestMoviesSuccess,
  requestMoviesError,
  requestMoreMoviesSuccess,
  requestMovie,
  requestMovieSuccess,
  requestMovieError,
  setTotalMovies,
} from "../reducers/moviesReducer";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { stringify } from "query-string";
import IMovie from "../../interface/IMovie/IMovie";

const fetchMovies = (
  search: string,
  searchBy: string,
  sortBy: string = "vote_average",
  offset: number
): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    const urlParams = stringify({ offset, search, searchBy, sortBy });

    fetch(
      `https://reactjs-cdp.herokuapp.com/movies?${urlParams}&limit=9&sortOrder=desc`
    )
      .then((response) => response.json())
      .then((receivedData) => {
        resolve(receivedData);
      });
  });
};

function* requestMoviesSaga(action: any) {
  try {
    const movies = yield call(
      fetchMovies,
      action.payload.search,
      action.payload.searchBy,
      action.payload.sortBy,
      action.payload.offset
    );
    yield put(setTotalMovies({ totalMovies: movies.total }));
    if (action.payload.offset === 0) {
      yield put(requestMoviesSuccess({ movies: movies.data }));
    } else {
      yield put(requestMoreMoviesSuccess({ movies: movies.data }));
    }
  } catch (e) {
    yield put(requestMoviesError());
  }
}

const fetchMoviesSub = () => {
  return takeLatest(requestMovies, requestMoviesSaga);
};

const fetchMovie = async (id: string) => {
  const url = `https://reactjs-cdp.herokuapp.com/movies/${id}`;
  let response = await fetch(url);
  let movie = await response.json();
  return movie;
};

function* requestMovieSaga(action: any) {
  try {
    const movie = yield call(fetchMovie, action.payload.id);
    let search = movie.genres[0];
    const movies = yield fetchMovies(search, "genres", "rating", 0);
    yield put(requestMovieSuccess({ movie: movie }));
    yield put(setTotalMovies({ totalMovies: movies.total }));
    yield put(requestMoviesSuccess({ movies: movies.data }));
  } catch (e) {
    yield put(requestMovieError());
  }
}

const fetchMovieSub = () => {
  return takeLatest(requestMovie, requestMovieSaga);
};

export function* moviesSaga() {
  return yield all([fetchMoviesSub(), fetchMovieSub()]);
}
