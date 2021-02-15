import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import Header from './header';
import moviesData from './moviesData';
import NotFound from './notFound';
import Layout from './layout';
import MoviesList from './moviesList';
const queryString = require('query-string');
//import {parse, stringify} from 'query-string';





interface IHomePageState {
   movies: IMovieCard[];   
   sortBy: string;
}

export interface IMovieCard {
   id: number;
   title: string;
   tagline: string;
   vote_average: number;
   vote_count: number;
   release_date: string;
   poster_path: string;
   overview: string;
   budget: number;
   revenue: number;
   genres: Array<string>;
   runtime: number;
}


class HomePage extends React.Component<RouteComponentProps, IHomePageState> {

   state = {
      movies: moviesData,     
      sortBy: "rating"
   }


   setSortByDate = () => {
      this.setState({ sortBy: "release_date" });
      const locationSearch = queryString.parse(this.props.location.search);
      locationSearch.sortBy = "release_date";
      const locationSearchString = queryString.stringify(locationSearch);    
      this.props.history.push(`/search?${locationSearchString}`);        
   }
   

   setSortByRating = () => {
      this.setState({ sortBy: "rating" });
       const locationSearch = queryString.parse(this.props.location.search);
       locationSearch.sortBy = "rating";
       const locationSearchString = queryString.stringify(locationSearch);
       this.props.history.push(`/search?${locationSearchString}`);      
   }
   
   filterAndSort = () => {
      const { searchValue, searchBy, sortBy } = queryString.parse(this.props.location.search);       
      let filteredMovies, sortedMovies;

      if (searchBy === "title") {
         filteredMovies = moviesData.filter(item => item.title === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.vote_average < movie2.vote_average ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }
      
      if (searchBy === "genre") {
         filteredMovies = moviesData.filter(item => item.genres[0] === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.vote_average < movie2.vote_average ? 1 : -1);
         this.setState({ movies: sortedMovies });
      } 

      if (searchBy === "title" && sortBy === "rating") {
         filteredMovies = moviesData.filter(item => item.title === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.vote_average < movie2.vote_average ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }

      if (searchBy === "title" && sortBy === "release_date") {
         filteredMovies = moviesData.filter(item => item.title === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.release_date < movie2.release_date ? 1 : -1);
         this.setState({ movies: sortedMovies });
      } 

      if (searchBy === "genre" && sortBy === "rating") {
         filteredMovies = moviesData.filter(item => item.genres[0] === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.vote_average < movie2.vote_average ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }

      if (searchBy === "genre" && sortBy === "release_date") {
         filteredMovies = moviesData.filter(item => item.genres[0] === searchValue);
         sortedMovies = filteredMovies.sort((movie1, movie2) => movie1.release_date < movie2.release_date ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }

      if (sortBy === "rating") {
         sortedMovies = this.state.movies.sort((movie1, movie2) => movie1.vote_average < movie2.vote_average ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }

      if (sortBy === "release_date") {
         sortedMovies = this.state.movies.sort((movie1, movie2) => movie1.release_date < movie2.release_date ? 1 : -1);
         this.setState({ movies: sortedMovies });
      }  
   }

   componentDidMount() {
      const { sortBy } = queryString.parse(this.props.location.search);
      this.setState({sortBy: sortBy || "rating"});
      this.filterAndSort();
   } 
   

   componentDidUpdate(prevProps: RouteComponentProps) {

      if (this.props.location.search !== prevProps.location.search) {
         const {searchBy, searchValue, sortBy} = queryString.parse(this.props.location.search);
         this.setState({ sortBy: sortBy || "rating"});
         this.filterAndSort();
      }
   }


   render() {
      const { movies, sortBy } = this.state;
      return (
         <div>
            <Layout>
               <Header sortBy={sortBy}
                  setSortByDate={this.setSortByDate} setSortByRating={this.setSortByRating}                                 
                  movies={movies} location={this.props.location} history={this.props.history}
                  match={this.props.match} />
               <main>
                  <MoviesList movies={movies} />
               </main>
            </Layout>
         </div>

      );
   }

}



export default HomePage;