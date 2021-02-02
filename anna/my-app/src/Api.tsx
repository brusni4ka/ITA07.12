import IMovie from "./components/movieList/movie-card/IMovie";



class Api {

  static baseUrl = 'https://reactjs-cdp.herokuapp.com/movies';
  static baseSortingSettings = 'limit=9&sortOrder=desc';
  
  static fetchMovies= async (searchParams: string): Promise<IMovie[]> => {
    const response = await fetch(`${Api.baseUrl}${searchParams}&${Api.baseSortingSettings}`);
    const responseData = await response.json();
    const movies: IMovie[] = responseData.data;
    return movies;
  }  

  // fetch(`https://reactjs-cdp.herokuapp.com/movies/${movieId}`)
    // .then(response => response.json())
    // .then(responseData => {

  static fetchMovie= async (id:string): Promise<IMovie> => {
    const response = await fetch(`https://reactjs-cdp.herokuapp.com/movies/${id}`);
    const movie = await response.json();
    return movie;
  }  
}

export default Api;