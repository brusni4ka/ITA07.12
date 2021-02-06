import MovieInterface from "./movieInterface";

export interface MoviesStateInterface {
  movie: MovieInterface | null;
  movies: MovieInterface[];
  loadingMovie: boolean;
  loadingMovies: boolean;
}

export type StateInterface = MoviesStateInterface;
