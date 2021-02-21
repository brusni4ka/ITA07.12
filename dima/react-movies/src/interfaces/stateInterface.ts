import MovieInterface from "./movieInterface";
import MoviesDataInterface from "../interfaces/moviesDataInterface";
export interface MoviesStateInterface {
  movie: MovieInterface | null;
  movies: MoviesDataInterface;
  loadingMovie: boolean;
  loadingMovies: boolean;
}

export type StateInterface = MoviesStateInterface;
