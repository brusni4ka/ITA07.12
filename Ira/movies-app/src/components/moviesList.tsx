import React from 'react';
import MovieCard from './movieCard'; 
import {IMovieCard} from './homePage';
import NotFound from './notFound';



interface IMoviesListProps {
   movies: IMovieCard[];   
}

const MoviesList = (props: IMoviesListProps) => {
    const {movies} = props;
    if(movies.length > 0) {
        return (
            <section className="moviesBlock">
                     
                {movies.map((item) => {       
                    return (
                       <div className = "movieCardWrapper" key = {item.id}>
                           <MovieCard movie = {item}                                            
                           />           
                       </div>         
                    );       
                }                   
                )}    

            </section>    
     
            );
    } else {
          return (
             <NotFound/>
        );
    }

};




export default MoviesList;