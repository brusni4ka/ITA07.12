import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import MoviePageHeader from './moviePageHeader';
import Layout from './layout'; 
import MoviesList from './moviesList';
import {IMovieCard} from './homePage';
import moviesData from './moviesData';
import ErrorPage from './404';


interface IMoviePageProps {
   movies: IMovieCard[];
   movie: IMovieCard;     
}



const MoviePage = (props: RouteComponentProps<{id: string}>) => {      
   const id = Number(props.match.params.id);    
   console.log(props);

   let foundMovie = moviesData.find(item => item.id === id );   
   if(foundMovie === undefined) {
      return <ErrorPage/>       
   } else {  
      let moviesByGenre = moviesData.filter(item => item.genres[0] === foundMovie?.genres[0]);     
         return (
           <div>
              <Layout>          
                 <MoviePageHeader  movie = {foundMovie} />
                 <main>
                     <MoviesList movies = {moviesByGenre}/>         
                 </main>          
              </Layout>
           </div>
         
         );   
   }   
}; 




export default MoviePage;