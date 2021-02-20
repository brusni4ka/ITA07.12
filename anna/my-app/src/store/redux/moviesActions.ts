import { ISearchParams } from '../../Api';
import IMovie from '../../components/movieList/movie-card/IMovie';
import { SortType } from '../../components/sortBox/SortBox';

export enum MoviesActionTypes {
  FETCH_MOVIES_REQUESTED = 'FETCH_MOVIES_REQUESTED',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR',
  LOAD_MORE_MOVIES_REQUESTED = 'LOAD_MORE_MOVIES_REQUESTED',
  LOAD_MORE_MOVIES_SUCCESS = 'LOAD_MORE_MOVIES_SUCCESS',
  LOAD_MORE_MOVIES_ERROR = 'LOAD_MORE_MOVIES_ERROR',
  SET_SORT_BY = 'SET_SORT_BY',
  SET_OFFSET = 'SET_OFFSET',
  RESET_MOVIES = 'RESET_MOVIES'
}

export interface FetchMoviesRequestedAction {
  type: MoviesActionTypes.FETCH_MOVIES_REQUESTED,
  payload: ISearchParams
}

export interface FetchMoviesSuccessAction {
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  movies: IMovie[],
  total: number
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
  
    movies: IMovie[],
    total: number
  
}

export interface LoadMoreMoviesErrorAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_ERROR
}

export interface SetSortByAction {
  type: MoviesActionTypes.SET_SORT_BY,
  payload: SortType
}

export interface SetOffsetAction {
  type: MoviesActionTypes.SET_OFFSET,
  payload: number
}

export interface ResetMoviesAction {
  type: MoviesActionTypes.RESET_MOVIES,
}

export const changeSortBy = (value: SortType): SetSortByAction => ({
  type: MoviesActionTypes.SET_SORT_BY,
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

export const fetchMoviesSuccess = (movies: IMovie[], total: number): FetchMoviesSuccessAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  movies: movies,
  total: total
})

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
  
    movies: movies,
    total: total

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
  SetOffsetAction;