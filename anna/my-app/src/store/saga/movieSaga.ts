import { FetchMovieRequestedAction, MovieActionTypes } from '../redux/movieActions';
import { takeLatest,  call, put, all } from 'redux-saga/effects';
import Api from '../../Api';
import { MoviesActionTypes } from '../redux/moviesActions';
import { SearchType } from '../../components/searchForm/SearchForm';
import { SortType } from '../../components/sortBox/SortBox';
import IMovie from '../../components/movieList/movie-card/IMovie';

function* fetchMovieSaga(action: FetchMovieRequestedAction) {
  try {
    const movie: IMovie = yield call(Api.fetchMovie, action.payload);
    yield put({type: MovieActionTypes.FETCH_MOVIE_SUCCESS, movie});
    const movies = yield call(Api.fetchMovies, {searchBy: SearchType.Ganre, sotrBy: SortType.ReleaseDate, search: movie.genres[0]});
    yield put({type: MoviesActionTypes.FETCH_MOVIES_SUCCESS, movies});
    
  } catch (e) {
    yield put({type: MovieActionTypes.FETCH_MOVIE_ERROR, e})
  }
}

const fetchMovieSub = () => {
  return takeLatest(MovieActionTypes.FETCH_MOVIE_REQUESTED, fetchMovieSaga);
}

export function* movieSagas() {
  return yield all([
    fetchMovieSub(),
  ])
}