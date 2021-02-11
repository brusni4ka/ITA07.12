import IMovie from '../../components/movieList/movie-card/IMovie';

export enum MovieActionTypes {
  FETCH_MOVIE_REQUESTED = 'FETCH_MOVIE_REQUESTED',
  FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS',
  FETCH_MOVIE_ERROR = 'FETCH_MOVIE_ERROR',
}

export interface FetchMovieRequestedAction {
  type: MovieActionTypes.FETCH_MOVIE_REQUESTED,
  payload: string
}

export interface FetchMovieSuccessAction {
  type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
  movie: IMovie;
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
  movie: movie
})

export const fetchMovieError = (): FetchMovieErrorAction => ({
  type: MovieActionTypes.FETCH_MOVIE_ERROR
})

export type MovieAction =
  FetchMovieRequestedAction |
  FetchMovieSuccessAction |
  FetchMovieErrorAction;