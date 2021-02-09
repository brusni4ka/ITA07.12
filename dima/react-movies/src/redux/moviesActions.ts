import ActionTypes from "../enums/ActionTypes";
import MovieInterface from "../interfaces/movieInterface";
import MoviesDataInterface from "../interfaces/moviesDataInterface";
export interface URLMovieParams {
  searcBy?: string;
  search?: string;
  sortBy?: string | string[];
  limit?: number;
  sortOrder?: string;
  filter?: string;
  offset?: number;
}
export interface FetchMoviesAction {
  type: ActionTypes.FETCH_MOVIES;
  payload: URLMovieParams & { loadingMovies: boolean };
}

export interface ResetMoviesAction {
  type: ActionTypes.RESET_MOVIES;
}

export interface SetMoviesAction {
  type: ActionTypes.SET_MOVIES;
  payload: { movies: MoviesDataInterface; loadingMovies: boolean };
}

export interface FetchMovieAction {
  type: ActionTypes.FETCH_MOVIE;
  payload: { loadingMovie: boolean; id: string; offset: number };
}

export interface SetPageAction {
  type: ActionTypes.SET_PAGE;
  payload: { currentPage: number };
}

export interface SetMovieAction {
  type: ActionTypes.SET_MOVIE;
  payload: { movie: MovieInterface | null; loadingMovie: boolean };
}

export interface ResetMovieAction {
  type: ActionTypes.RESET_MOVIE;
}
export type MoviesAction =
  | FetchMoviesAction
  | SetMoviesAction
  | FetchMovieAction
  | SetMovieAction
  | ResetMoviesAction
  | SetPageAction
  | ResetMovieAction;

export const fetchMovies = (urlParams: URLMovieParams): MoviesAction => ({
  type: ActionTypes.FETCH_MOVIES,
  payload: { loadingMovies: true, ...urlParams },
});

export const setMovie = (
  movie: MovieInterface | null,
  loadingMovie: boolean
): MoviesAction => ({
  type: ActionTypes.SET_MOVIE,
  payload: { movie, loadingMovie },
});

export const fetchMovie = (id: string, offset: number): MoviesAction => ({
  type: ActionTypes.FETCH_MOVIE,
  payload: { loadingMovie: true, id, offset },
});

export const setPage = (currentPage: number): MoviesAction => ({
  type: ActionTypes.SET_PAGE,
  payload: { currentPage },
});

export const setMovies = (
  movies: MoviesDataInterface,
  loadingMovies: boolean
): MoviesAction => ({
  type: ActionTypes.SET_MOVIES,
  payload: { movies, loadingMovies },
});

export const resetMovies = (): MoviesAction => ({
  type: ActionTypes.RESET_MOVIES,
});

export const resetMovie = (): MoviesAction => ({
  type: ActionTypes.RESET_MOVIE,
});
