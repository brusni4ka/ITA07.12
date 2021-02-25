import { ISearchParams } from '../../Api';
import IMovie from '../../components/movieList/movie-card/IMovie';
import { SortType } from '../../components/sortBox/SortBox';

export enum MoviesActionTypes {
  FETCH_MOVIES_REQUESTED = 'movies/fetchMoviesRequested',
  FETCH_MOVIES_SUCCESS = 'movies/fetchMoviesSuccess',
  FETCH_MOVIES_ERROR = 'movies/fetchMoviesError',
  LOAD_MORE_MOVIES_REQUESTED = 'movies/loadMoreMoviesRequested',
  LOAD_MORE_MOVIES_SUCCESS = 'movies/loadMoreMoviesSuccess',
  LOAD_MORE_MOVIES_ERROR = 'movies/loadMoreMoviesError',
  SET_SORT_BY = 'movies/setSortBy',
  SET_IS_FETCHING_MORE_DATA = 'movies/setIsFetchingMoreData',
  SET_OFFSET = 'movies/setOffset',
  RESET_MOVIES = 'movies/resetMovies'
}

export interface FetchMoviesRequestedAction {
  type: MoviesActionTypes.FETCH_MOVIES_REQUESTED,
  payload: ISearchParams
}

export interface FetchMoviesSuccessAction {
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  payload: {
    movies: IMovie[],
    total: number
  }
}

export interface FetchMoviesErrorAction {
  type: MoviesActionTypes.FETCH_MOVIES_ERROR
}

export interface LoadMoreMoviesRequestedAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED,
  payload: ISearchParams

}

export interface LoadMoreMoviesSuccessAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS,
  payload: {
    movies: IMovie[],
    total: number
  }
}

export interface LoadMoreMoviesErrorAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_ERROR
}

export interface SetSortByAction {
  type: MoviesActionTypes.SET_SORT_BY,
  payload: SortType
}

export interface SetIsFetchingMoreData {
  type: MoviesActionTypes.SET_IS_FETCHING_MORE_DATA,
  payload: boolean
}

export interface SetOffsetAction {
  type: MoviesActionTypes.SET_OFFSET,
  payload: number
}

export interface ResetMoviesAction {
  type: MoviesActionTypes.RESET_MOVIES,
}

export const setSortBy = (value: SortType): SetSortByAction => ({
  type: MoviesActionTypes.SET_SORT_BY,
  payload: value
})

export const  setIsFetchingMoreData= (value: boolean): SetIsFetchingMoreData => ({
  type: MoviesActionTypes.SET_IS_FETCHING_MORE_DATA,
  payload: value
})

export const setOffset = (value: number): SetOffsetAction => ({
  type: MoviesActionTypes.SET_OFFSET,
  payload: value
})

export const fetchMoviesRequested = (searchParams: ISearchParams): FetchMoviesRequestedAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_REQUESTED,
  payload: searchParams
})

export const fetchMoviesSuccess = (movies: IMovie[], total: number): FetchMoviesSuccessAction => {
  console.log(movies, total)
  return ({
    type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
    payload: {
      movies,
      total,
    }
  })
}

export const fetchMoviesError = (): FetchMoviesErrorAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_ERROR
})

export const loadMoreMovies = (searchParams: ISearchParams): LoadMoreMoviesRequestedAction => ({
  type: MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED,
  payload: searchParams

})

export const loadMoreMoviesSuccess = (movies: IMovie[], total: number): LoadMoreMoviesSuccessAction => {
  console.log('load more action', movies);
  return ({
    type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS,
    payload: {
      movies: movies,
      total: total
    }
  })

}

export const loadMoreMoviesError = (): LoadMoreMoviesErrorAction => ({
  type: MoviesActionTypes.LOAD_MORE_MOVIES_ERROR
});

export const resetMovies = (): ResetMoviesAction => ({
  type: MoviesActionTypes.RESET_MOVIES
})


export type MoviesAction =
  FetchMoviesRequestedAction |
  SetSortByAction |
  FetchMoviesSuccessAction |
  FetchMoviesErrorAction |
  ResetMoviesAction |
  LoadMoreMoviesRequestedAction |
  LoadMoreMoviesSuccessAction |
  LoadMoreMoviesErrorAction |
  SetOffsetAction |
  SetIsFetchingMoreData;