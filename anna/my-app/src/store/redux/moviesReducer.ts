import { MoviesAction, MoviesActionTypes } from './moviesActions';
import { SortType } from '../../components/sortBox/SortBox';
import IMovie from '../../components/movieList/movie-card/IMovie';

export interface IMoviesState {
  items: IMovie[],
  sortBy: SortType,
  currentCount: number,
  loading: boolean
}

const moviesDefaultState: IMoviesState = {
  items: [],
  sortBy: SortType.ReleaseDate,
  currentCount: 0,
  loading: false
}

// const tmpArray: number[] = [];
// const checkMovie = (movie: IMovie) => {
//   if (tmpArray.indexOf(movie.id) === -1) {
//     tmpArray.push(movie.id);
//     return true;
//   }
//   return false;
// }

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
        loading: true,
      };

    case MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS:
      const newMovies = action.movies;
      const { items } = state;
           
      return {
        ...state,
        items: [...items, ...newMovies],
        loading: false,
      };

    case MoviesActionTypes.LOAD_MORE_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
      };

    case MoviesActionTypes.INCREASE_CURRENT_COUNT:
      const newOffset = state.currentCount + action.payload;
    console.log(state.currentCount + action.payload)
      return {
        ...state,
        currentCount: newOffset,
      };

    default:
      return state;
  }
}
