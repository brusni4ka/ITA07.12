import ActionTypes from "../enums/ActionTypes";
import { MoviesStateInterface } from "../interfaces/stateInterface";
import MovieInterface from "../interfaces/movieInterface";
import { MoviesAction } from "./moviesActions";
const moviesReducer = (
  state: MoviesStateInterface = {
    movies: [],
    loadingMovie: true,
    loadingMovies: true,
    movie: null,
  },
  action: MoviesAction
) => {
  switch (action.type) {
    case ActionTypes.SET_MOVIES:
      return { ...state, ...action.payload };
    case ActionTypes.FETCH_MOVIES:
      return { ...state, ...action.payload };
    case ActionTypes.FETCH_MOVIE:
      return { ...state, ...action.payload };
    case ActionTypes.SET_MOVIE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
