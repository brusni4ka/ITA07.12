import IMovie from "../../interface/IMovie/IMovie";

export enum MoviesActionTypes {
  REQUEST_MOVIES = "REQUEST_MOVIES",
  REQUEST_MOVIES_SUCCESS = "UPLOAD_MOVIES_SUCCESS",
  REQUEST_MOVIES_ERROR = "REQUEST_MOVIES_ERROR",
  REQUEST_MOVIE = "REQUEST_MOVIE",
  REQUEST_MOVIE_SUCCESS = "REQUEST_MOVIE_SUCCESS",
  REQUEST_MOVIE_ERROR = "REQUEST_MOVIE_ERROR",
  RESET = "RESET",
  REQUEST_MORE_MOVIES_SUCCESS = "REQUEST_MORE_MOVIES_SUCCESS",
}

export interface MoviesState {
  movies: IMovie[];
  movie: IMovie;
  loading: boolean;
  error: string;
}

const MoviesDefaultState: MoviesState = {
  movies: [],
  movie: {
    id: 0,
    title: "",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    poster_path: "",
    overview: "",
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
  },
  loading: false,
  error: "",
};

//   Actions
export interface requestMoviesAction {
  type: MoviesActionTypes.REQUEST_MOVIES;
  search: string;
  searchBy: string;
  sortBy: string;
  offset: number;
}

export const requestMovies = (
  search: string,
  searchBy: string,
  sortBy: string,
  offset: number
): requestMoviesAction => ({
  type: MoviesActionTypes.REQUEST_MOVIES,
  search,
  searchBy,
  sortBy,
  offset,
});

interface requestMoviesSuccessAction {
  type: MoviesActionTypes.REQUEST_MOVIES_SUCCESS;
  movies: IMovie[];
}

export const requestMoviesSuccess = (
  movies: IMovie[]
): requestMoviesSuccessAction => ({
  type: MoviesActionTypes.REQUEST_MOVIES_SUCCESS,
  movies,
});

interface requestMoviesErrorAction {
  type: MoviesActionTypes.REQUEST_MOVIES_ERROR;
}

export const requestMoviesError = (): requestMoviesErrorAction => ({
  type: MoviesActionTypes.REQUEST_MOVIES_ERROR,
});

interface requestMoreMoviesSuccessAction {
  type: MoviesActionTypes.REQUEST_MORE_MOVIES_SUCCESS;
  movies: IMovie[];
}

export const requestMoreMoviesSuccess = (
  movies: IMovie[]
): requestMoreMoviesSuccessAction => ({
  type: MoviesActionTypes.REQUEST_MORE_MOVIES_SUCCESS,
  movies,
});

export interface requestMovieAction {
  type: MoviesActionTypes.REQUEST_MOVIE;
  id: string;
}

export const requestMovie = (id: string): requestMovieAction => ({
  type: MoviesActionTypes.REQUEST_MOVIE,
  id,
});

interface requestMovieSuccessAction {
  type: MoviesActionTypes.REQUEST_MOVIE_SUCCESS;
  movie: IMovie;
}

export const requestMovieSuccess = (
  movie: IMovie
): requestMovieSuccessAction => ({
  type: MoviesActionTypes.REQUEST_MOVIE_SUCCESS,
  movie,
});

interface requestMovieErrorAction {
  type: MoviesActionTypes.REQUEST_MOVIE_ERROR;
}

export const requestMovieError = (): requestMovieErrorAction => ({
  type: MoviesActionTypes.REQUEST_MOVIE_ERROR,
});

interface resetAction {
  type: MoviesActionTypes.RESET;
}

export const reset = (): resetAction => ({
  type: MoviesActionTypes.RESET,
});
type moviesAction =
  | requestMoviesAction
  | requestMoviesSuccessAction
  | requestMoviesErrorAction
  | requestMoreMoviesSuccessAction
  | requestMovieAction
  | requestMovieSuccessAction
  | requestMovieErrorAction
  | resetAction;

export const moviesReducer = (
  state = MoviesDefaultState,
  action: moviesAction
) => {
  switch (action.type) {
    case MoviesActionTypes.REQUEST_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case MoviesActionTypes.REQUEST_MOVIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    }
    case MoviesActionTypes.REQUEST_MOVIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: "Something goes wrong...",
      };
    }
    case MoviesActionTypes.REQUEST_MORE_MOVIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        movies: [...state.movies, ...action.movies],
      };
    }
    case MoviesActionTypes.REQUEST_MOVIE: {
      return {
        ...state,
        loading: true,
        id: action.id,
      };
    }
    case MoviesActionTypes.REQUEST_MOVIE_SUCCESS: {
      return {
        ...state,
        loading: false,
        movie: action.movie,
      };
    }
    case MoviesActionTypes.REQUEST_MOVIE_ERROR: {
      return {
        ...state,
        loading: false,
        error: "Something goes wrong...",
      };
    }
    case MoviesActionTypes.RESET: {
      return {
        movies: [],
      };
    }
    default:
      return state;
  }
};
