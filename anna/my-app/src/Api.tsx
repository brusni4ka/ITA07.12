import IMovie from "./components/movieList/movie-card/IMovie";
import { SearchType } from "./components/searchForm/SearchForm";
import { SortType } from "./components/sortBox/SortBox";
import * as QueryString from "query-string";

export interface ISearchParams {
  search?: string,
  searchBy?: SearchType,
  sotrBy?: SortType,
  offset?: number
}

class Api {

  static baseUrl = 'https://reactjs-cdp.herokuapp.com/movies';

  static baseSortingSettings = {
    limit: 9,
    sortOrder: 'desc'
  }

  static fetchMovies = async(searchParams: ISearchParams, limit: number) => {
    const search = {
      ...Api.baseSortingSettings,
      ...searchParams,
      offset: limit
    }
   
    const response = await fetch(`${Api.baseUrl}?${QueryString.stringify(search)}`);
    const responseData = await response.json();
    const movies: IMovie[] = responseData.data;
    
    return {movies: movies, total: responseData.total};
  };

  static fetchMovie = async (id: string): Promise<IMovie> => {
    const response = await fetch(`${Api.baseUrl}/${id}`);
    const movie = await response.json();
   
    return movie;
  }
}

export default Api;