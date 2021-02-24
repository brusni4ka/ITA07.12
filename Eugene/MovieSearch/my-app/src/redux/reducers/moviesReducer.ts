import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMovie from "../../interface/IMovie/IMovie";

export interface MoviesState {
  movies: IMovie[];
  movie: IMovie;
  totalMovies: number;
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
  totalMovies: 0,
  loading: false,
  error: "",
};

//   Actions
export interface requestMoviesAction {
  search: string;
  searchBy: string;
  sortBy: string;
  offset: number;
}

export const requestMoviesF = (
  search: string,
  searchBy: string,
  sortBy: string,
  offset: number
): requestMoviesAction => ({
  search,
  searchBy,
  sortBy,
  offset,
});

interface requestMoviesSuccessAction {
  movies: IMovie[];
}

interface requestMoreMoviesSuccessAction {
  movies: IMovie[];
}

export interface requestMovieAction {
  id: string;
}

interface requestMovieSuccessAction {
  movie: IMovie;
}

interface setTotalMoviesAction {
  totalMovies: number;
}

const moviesSlice = createSlice({
  name: "movies",
  initialState: MoviesDefaultState,
  reducers: {
    requestMovies(state, action: PayloadAction<requestMoviesAction>) {
      state.loading = true;
    },
    requestMoviesSuccess(
      state,
      action: PayloadAction<requestMoviesSuccessAction>
    ) {
      console.log(action);
      
      state.loading = false;
      state.movies = action.payload.movies;
    },
    requestMoviesError(state) {
      state.loading = false;
      state.error = "Something goes wrong...";
    },
    requestMoreMoviesSuccess(
      state,
      action: PayloadAction<requestMoreMoviesSuccessAction>
    ) {
      state.loading = false;
      state.movies = [...state.movies, ...action.payload.movies];
    },
    requestMovie(state, action: PayloadAction<requestMovieAction>) {
      state.loading = true;
    },
    requestMovieSuccess(
      state,
      action: PayloadAction<requestMovieSuccessAction>
    ) {
      state.loading = false;
      state.movie = action.payload.movie;
    },
    requestMovieError(state) {
      state.loading = false;
      state.error = "Something goes wrong...";
    },
    setTotalMovies(state, action: PayloadAction<setTotalMoviesAction>) {
      state.totalMovies = action.payload.totalMovies;
    },
  },
});

export const {
  requestMovies,
  requestMoviesSuccess,
  requestMoviesError,
  requestMoreMoviesSuccess,
  requestMovie,
  requestMovieSuccess,
  requestMovieError,
  setTotalMovies
} = moviesSlice.actions;


export const { reducer } = moviesSlice;