import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moviesData from './moviesData';
import MovieCard from './movieCard';



const MoviePageHeader = () => {
    return (  
        <>      
            <header className="moviePageHeader">
                <div className = "moviePageHeaderTop">                
                    <Link className = "logoLink" to = "/">netflixroulette</Link>
                    <button type = "button" className = "moviePageHeaderButton">search</button>
                </div>
                <div className = "movieDetailsBlock">
                    <div className = "movieCardWrapper" key = {moviesData[2].id}>
                        <img src = {moviesData[2].poster_path} width = "300"                                     
                        />           
                    </div>  
                                                            
                    <div className = "movieInfo">
                        <div className = "movieInfoTitleAndRating">
                            <h5 className = "movieInfoTitle">{moviesData[2].title}</h5>
                            <span className = "movieInfoRating">{moviesData[2].vote_average}</span>
                        </div>    
                        <p className = "movieInfoGenre">{moviesData[2].genres[0]}</p>
                        <div className = "movieInfoDateAndTime">
                            <p className = "movieInfoDate">{moviesData[2].release_date}</p>
                            <p className = "movieInfoTime">{moviesData[2].runtime} min</p>   
                        </div>
                    <p className = "movieInfoOverview">{moviesData[2].overview}</p>  
                    </div>            
                    
                </div>           
            </header>  
            <div className="headerBottomBlock">
                <div className="moviesGenreBlock">
                   <p className="moviesGenre">Films by {moviesData[2].genres[0]} genre</p>                               
                </div> 
            </div>    
        </>
    );  
    
};











export default MoviePageHeader;