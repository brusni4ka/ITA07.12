import IMovie from '../../components/movieList/movie-card/IMovie';

export enum MovieActionTypes {
  FETCH_MOVIE_REQUESTED = 'movie/fetchMovieRequested',
  FETCH_MOVIE_SUCCESS = 'movie/fetchMovieSuccess',
  FETCH_MOVIE_ERROR = 'movie/fetchMovieError',
}

export interface FetchMovieRequestedAction {
  type: MovieActionTypes.FETCH_MOVIE_REQUESTED,
  payload: string
}

export interface FetchMovieSuccessAction {
  type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
  payload: {
    movie: IMovie;}
}

export interface FetchMovieErrorAction {
  type: MovieActionTypes.FETCH_MOVIE_ERROR
}

export const fetchMovieRequested = (id: string): FetchMovieRequestedAction => ({
  type: MovieActionTypes.FETCH_MOVIE_REQUESTED,
  payload: id
})

export const fetchMovieSuccess = (movie: IMovie): FetchMovieSuccessAction => ({
  type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
  payload: {
    movie
  }
})

export const fetchMovieError = (): FetchMovieErrorAction => ({
  type: MovieActionTypes.FETCH_MOVIE_ERROR
})

export type MovieAction =
  FetchMovieRequestedAction |
  FetchMovieSuccessAction |
  FetchMovieErrorAction;