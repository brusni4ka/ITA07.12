import MovieInterface from "./movieInterface";
export default interface MoviesDataInterface {
  data: MovieInterface[];
  total: number;
  offset: number;
  limit: number;
}
