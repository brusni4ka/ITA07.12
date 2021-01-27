import React from 'react';
import {Link} from "react-router-dom";
import MoviePageHeader from './moviePageHeader';
import Footer from './footer';
import moviesData from './moviesData';
import MovieCard from './movieCard';
import Layout from './layout'; 
import IMovieCard from './movieCard';



const MoviePage = () => {     
    
        return (
           <div>
              <Layout>          
                 <MoviePageHeader/>
                 <main>
                    <section className="moviesBlock">                       
                    {moviesData.map((item, index) => {
                        if(index < 6) {
                        return (
                           <div className = "movieCardWrapper" key = {item.id}>
                              <MovieCard movie = {item}                                             
                               />           
                           </div>         
                        ); 
                        }      
                     }                   
                  )}      
              
                                               
                    </section>                  
                 </main>          
            </Layout>
         </div>
         
        );
      
}; 







export default MoviePage;