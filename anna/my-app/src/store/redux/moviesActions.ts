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
  INCREASE_CURRENT_COUNT = 'INCREASE_CURRENT_COUNT',
  RESET_MOVIES = 'RESET_MOVIES'
}

export interface FetchMoviesRequestedAction {
  type: MoviesActionTypes.FETCH_MOVIES_REQUESTED,
  payload: ISearchParams
}

export interface FetchMoviesSuccessAction {
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  movies: IMovie[];
}

export interface FetchMoviesErrorAction {
  type: MoviesActionTypes.FETCH_MOVIES_ERROR
}

export interface LoadMoreMoviesRequestedAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED,
  payload: {
    searchParams: ISearchParams,
    limit: number
  }
}

export interface LoadMoreMoviesSuccessAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS,
  movies: IMovie[]
}

export interface LoadMoreMoviesErrorAction {
  type: MoviesActionTypes.LOAD_MORE_MOVIES_ERROR
}

export interface SetSortByAction {
  type: MoviesActionTypes.SET_SORT_BY,
  payload: SortType
}

export interface IncreaseCurrentCountAction {
  type: MoviesActionTypes.INCREASE_CURRENT_COUNT,
  payload: number
}

export interface ResetMoviesAction {
  type: MoviesActionTypes.RESET_MOVIES,
}

export const changeSortBy = (value: SortType): SetSortByAction => ({
  type: MoviesActionTypes.SET_SORT_BY,
  payload: value
})

export const increaseCurrentCount = (value: number): IncreaseCurrentCountAction => ({
  type: MoviesActionTypes.INCREASE_CURRENT_COUNT,
  payload: value
})

export const fetchMoviesRequested = (searchParams: ISearchParams): FetchMoviesRequestedAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_REQUESTED,
  payload: searchParams
})

export const fetchMoviesSuccess = (movies: IMovie[]): FetchMoviesSuccessAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  movies: movies
})

export const fetchMoviesError = (): FetchMoviesErrorAction => ({
  type: MoviesActionTypes.FETCH_MOVIES_ERROR
})

export const loadMoreMovies = (searchParams: ISearchParams, limit: number): LoadMoreMoviesRequestedAction => ({
  type: MoviesActionTypes.LOAD_MORE_MOVIES_REQUESTED, 
  payload: {searchParams: searchParams, limit: limit
  }
})

export const loadMoreMoviesSuccess = (movies: IMovie[]): LoadMoreMoviesSuccessAction => ({
  type: MoviesActionTypes.LOAD_MORE_MOVIES_SUCCESS, movies
});

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
  IncreaseCurrentCountAction;