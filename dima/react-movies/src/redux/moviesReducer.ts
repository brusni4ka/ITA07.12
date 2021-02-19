import MovieInterface from "../interfaces/movieInterface";
import { MoviesStateInterface } from "../interfaces/stateInterface";
// import { MoviesAction, setMovies } from "./moviesActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URLMovieParams } from "./moviesActions";
import MoviesDataInterface from "../interfaces/moviesDataInterface";

let defaultState: MoviesStateInterface = {
  movies: {
    data: new Array<MovieInterface>(),
    total: 0,
    offset: 0,
    limit: 0,
  },
  loadingMovie: true,
  loadingMovies: true,
  movie: null,
};
// const moviesReducer = (
//   state: MoviesStateInterface = {
//     movies: {
//       data: new Array<MovieInterface>(),
//       total: 0,
//       offset: 0,
//       limit: 0,
//     },
//     loadingMovie: true,
//     loadingMovies: true,
//     movie: null,
//   },
//   action: PayloadAction<MoviesAction>
// ) => {
//   switch (action.type) {
//     case ActionTypes.SET_MOVIES:
//       return { ...state, ...action.payload };
//     case ActionTypes.FETCH_MOVIES:
//       return { ...state, loadingMovies: true };
//     case ActionTypes.FETCH_MOVIE:
//       return { ...state, loadingMovie: true };
//     case ActionTypes.SET_MOVIE:
//       return { ...state, ...action.payload };
//     case ActionTypes.RESET_MOVIES:
//       return {
//         ...state,
//         movies: {
//           data: [],
//           total: 0,
//           offset: 0,
//           limit: 9,
//         },
//         loadingMovies: true,
//       };
//     case ActionTypes.RESET_MOVIE:
//       return {
//         ...state,
//         movie: null,
//         loadingMovie: true,
//       };

//     case ActionTypes.FETCH_MOVIE_ERROR:
//       return {
//         ...state,
//         movie: null,
//         loadingMovie: false,
//       };
//     case ActionTypes.FETCH_MOVIES_ERROR:
//       return {
//         ...state,
//         movies: { data: [], total: 0, offset: 0, limit: 0 },
//         loadingMovies: false,
//       };
//     default:
//       return state;
//   }
// };
const moviesSlice = createSlice({
  name: "movies",
  initialState: defaultState,
  reducers: {
    fetchMovies(state, { payload }: PayloadAction<URLMovieParams>) {
      state.loadingMovies = true;
    },
    setMovies(state, { payload }: PayloadAction<MoviesDataInterface>) {
      state.loadingMovies = false;
      state.movies = payload;
    },
    fetchMovie(
      state,
      { payload }: PayloadAction<{ id: string; offset: number }>
    ) {
      state.loadingMovie = true;
    },
    setMovie(state, { payload }: PayloadAction<MovieInterface>) {
      state.movie = payload;
      state.loadingMovie = false;
    },
    resetMovies(state) {
      state.movies = {
        data: [],
        total: 0,
        offset: 0,
        limit: 9,
      };
      state.loadingMovies = true;
    },
    resetMovie(state) {
      state.movie = null;
      state.loadingMovie = true;
    },
    fetchMovieError(state) {
      state.movie = null;
      state.loadingMovie = false;
    },
    fetchMoviesError(state) {
      state.movies = {
        data: [],
        total: 0,
        offset: 0,
        limit: 9,
      };
      state.loadingMovies = false;
    },
  },
});

export const { reducer } = moviesSlice;
export const {
  fetchMovies,
  setMovies,
  fetchMovie,
  setMovie,
  resetMovies,
  resetMovie,
  fetchMovieError,
  fetchMoviesError,
} = moviesSlice.actions;
