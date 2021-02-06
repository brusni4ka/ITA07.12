import ActionTypes from "../enums/ActionTypes";
import MovieInterface from "../interfaces/movieInterface";
// import { fetchMovieAction } from "./movieActions";

interface FetchMoviesAction {
  type: ActionTypes.FETCH_MOVIES;
  payload: { loadingMovies: boolean };
}

interface SetMoviesAction {
  type: ActionTypes.SET_MOVIES;
  payload: { movies: MovieInterface[]; loadingMovies: boolean };
}

interface FetchMovieAction {
  type: ActionTypes.FETCH_MOVIE;
  payload: { loadingMovie: boolean };
}

interface SetMovieAction {
  type: ActionTypes.SET_MOVIE;
  payload: { movie: MovieInterface | null; loadingMovie: boolean };
}
export type MoviesAction =
  | FetchMoviesAction
  | SetMoviesAction
  | FetchMovieAction
  | SetMovieAction;
export const fetchMovies = (loadingMovies: boolean): MoviesAction => ({
  type: ActionTypes.FETCH_MOVIES,
  payload: { loadingMovies },
});

export const setMovie = (
  movie: MovieInterface | null,
  loadingMovie: boolean
): MoviesAction => ({
  type: ActionTypes.SET_MOVIE,
  payload: { movie, loadingMovie },
});

export const fetchMovie = (loadingMovie: boolean): MoviesAction => ({
  type: ActionTypes.FETCH_MOVIE,
  payload: { loadingMovie },
});

export const setMovies = (
  movies: MovieInterface[],
  loadingMovies: boolean
): MoviesAction => ({
  type: ActionTypes.SET_MOVIES,
  payload: { movies, loadingMovies },
});
