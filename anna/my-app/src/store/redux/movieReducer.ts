import { MovieAction, MovieActionTypes } from './movieActions';
import IMovie from '../../components/movieList/movie-card/IMovie';

export interface IMovieState {
  item: IMovie,
  loading: boolean
}

const movieDefaultState: IMovieState = {
  item: {} as IMovie,
  loading: false
}

export const movieReducer = (state = movieDefaultState, action: MovieAction) => {
  console.log(action, 'from movie reducer');
  switch (action.type) {
        
    case MovieActionTypes.FETCH_MOVIE_REQUESTED:
      return {
        ...state,
        loading: true
      };

    case MovieActionTypes.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        item: action.movie,
        loading: false
      };

    case MovieActionTypes.FETCH_MOVIE_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
 
}
