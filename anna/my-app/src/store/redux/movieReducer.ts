import IMovie from '../../components/movieList/movie-card/IMovie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IMovieState {
  item: IMovie,
  loading: boolean
}

const movieDefaultState: IMovieState = {
  item: {} as IMovie,
  loading: false
}
const movieSlice = createSlice({
  name: 'movie',
  initialState: movieDefaultState,
  reducers: {
    fetchMovieRequested(state, payload: PayloadAction<string>) {
      state.loading = true;
    },

    fetchMovieSuccess(state, {payload}: PayloadAction< IMovie>) {
      state.item = payload;
      state.loading = false;
    },

    fetchMovieError(state) {
      state.loading = false;
    },
  }
});

export const { 
  fetchMovieRequested,  
  fetchMovieSuccess, 
  fetchMovieError, 
 
} = movieSlice.actions

export const { reducer } = movieSlice;

// export const movieReducer = (state = movieDefaultState, action: MovieAction) => {
 
//   switch (action.type) {
        
//     case MovieActionTypes.FETCH_MOVIE_REQUESTED:
//       return {
//         ...state,
//         loading: true
//       };

//     case MovieActionTypes.FETCH_MOVIE_SUCCESS:
//       return {
//         ...state,
//         item: action.movie,
//         loading: false
//       };

//     case MovieActionTypes.FETCH_MOVIE_ERROR:
//       return {
//         ...state,
//         loading: false
//       };

//     default:
//       return state;
//   }
 
// }
