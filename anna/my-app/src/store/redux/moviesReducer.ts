import { SortType } from '../../components/sortBox/SortBox';
import IMovie from '../../components/movieList/movie-card/IMovie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearchParams } from '../../Api';

export interface IMoviesState {
  items: IMovie[],
  sortBy: SortType,
  offset: number,
  loading: boolean,
  total: number,
  isFetchingMoreData: boolean,
}

const moviesDefaultState: IMoviesState = {
  items: [],
  sortBy: SortType.ReleaseDate,
  offset: 0,
  loading: false,
  total: 0,
  isFetchingMoreData: false,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesDefaultState,
  reducers: {
    fetchMoviesRequested(state, payload: PayloadAction<ISearchParams>) {
      state.loading = true;
    },

    fetchMoviesSuccess(state, {payload}: PayloadAction<{movies: IMovie[], total: number}>) {
      state.items = payload.movies;
      state.total = payload.total;
      state.loading = false;
    },

    fetchMoviesError(state) {
      state.loading = false;
    },

    loadMoreMoviesRequested(state, payload: PayloadAction<ISearchParams>) {
      state.loading = true;
      state.isFetchingMoreData = true;
    },

    loadMoreMoviesSuccess(state, { payload }: PayloadAction<{movies: IMovie[], total: number}>) {
      state.items =  [...state.items, ...payload.movies];
      state.total = payload.total;
      state.loading = false;
      state.isFetchingMoreData = false
    },

    loadMoreMoviesError(state) {
      state.loading = true;
    },

    resetMovies(state) {
      state.items = [];
      state.sortBy = SortType.ReleaseDate;
      state.loading = false;
      state.offset = 0;
    },

    setSortBy(state, { payload }: PayloadAction<SortType>) {
      state.sortBy = payload;
    },

    setIsFetchingMoreData(state, { payload }: PayloadAction<boolean>) {
      state.isFetchingMoreData = payload;
    },

    setOffset(state, { payload }: PayloadAction<number>) {
      const newOffset = state.offset + payload;
      state.offset = newOffset;
    }
  }
})

export const { 
  fetchMoviesRequested,  
  fetchMoviesSuccess, 
  fetchMoviesError, 
  loadMoreMoviesRequested,
  loadMoreMoviesSuccess,
  loadMoreMoviesError,
  resetMovies,
  setSortBy,
  setOffset,
  setIsFetchingMoreData
} = moviesSlice.actions

export const { reducer } = moviesSlice;
// export default moviesSlice.reducer;

// export const moviesReducer = (state = moviesDefaultState, action: MoviesAction) => {
//   // console.log(action)
//   switch (action.type) {
//     case MoviesActionTypes.SET_SORT_BY:
//       return {
//         ...state,
//         sortBy: action.payload
//       };

//     case MoviesActionTypes.RESET_MOVIES:
//       return {
//         ...state,
//         items: [],
//         sortBy: SortType.ReleaseDate,
//         loading: false,
//         offset: 0
//       };

//     case MoviesActionTypes.FETCH_MOVIES_REQUESTED:
//       return {
//         ...state,
//         loading: true
//       };

//     case MoviesActionTypes.FETCH_MOVIES_SUCCESS:
//       return {
//         ...state,
//         items: action.movies,
//         loading: false,
//         total: action.total
//       };

//     case MoviesActionTypes.FETCH_MOVIES_ERROR:
//       return {
//         ...state,
//         loading: false
//       };

//     case MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED:
//       return {
//         ...state,
//         // loading: true,
//       };

//     case MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS:
//       const newMovies = action.movies
//       const total = action.total
//       const { items } = state;

//       return {
//         ...state,
//         items: [...items, ...newMovies],
//         total: total
//       };

//     case MoviesActionTypes.LOAD_MORE_MOVIES_ERROR:
//       return {
//         ...state
//       };

//     case MoviesActionTypes.SET_OFFSET:
//       const newOffset = state.offset + action.payload;

//       return {
//         ...state,
//         offset: newOffset,
//       };

//     default:
//       return state;
//   }
// }
