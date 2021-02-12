import { MoviesAction, MoviesActionTypes } from './moviesActions';
import { SortType } from '../../components/sortBox/SortBox';
import IMovie from '../../components/movieList/movie-card/IMovie';

export interface IMoviesState {
  items: IMovie[],
  sortBy: SortType,
  offset: number,
  loading: boolean
}

const moviesDefaultState: IMoviesState = {
  items: [],
  sortBy: SortType.ReleaseDate,
  offset: 0,
  loading: false
}

export const moviesReducer = (state = moviesDefaultState, action: MoviesAction) => {
  switch (action.type) {
    case MoviesActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };

    case MoviesActionTypes.RESET_MOVIES:
      return {
        ...state,
        items: [],
        sortBy: SortType.ReleaseDate,
        loading: false
      };

    case MoviesActionTypes.FETCH_MOVIES_REQUESTED:
      return {
        ...state,
        loading: true
      };

    case MoviesActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        items: action.movies,
        loading: false
      };

    case MoviesActionTypes.FETCH_MOVIES_ERROR:
      return {
        ...state,
        loading: false
      };

    case MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED:
      return {
        ...state,
        // loading: true,
      };

    case MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS:
      const newMovies = action.movies;
      const { items } = state;
           
      return {
        ...state,
        items: [...items, ...newMovies]
      };

    case MoviesActionTypes.LOAD_MORE_MOVIES_ERROR:
      return {
        ...state
      };

    case MoviesActionTypes.SET_OFFSET:
      const newOffset = state.offset + action.payload;
      return {
        ...state,
        offset: newOffset,
      };

    default:
      return state;
  }
}
