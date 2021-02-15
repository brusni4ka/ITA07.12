import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {IMovieCard} from './homePage';
import MovieDescription from './movieDescription';


interface IMovieDescriptionProps {
    movie: IMovieCard;
}


const MoviePageHeader = (props: IMovieDescriptionProps)=> {
    const {genres} = props.movie;
    return (  
        <>      
            <header className="moviePageHeader">
                <div className = "moviePageHeaderTop">                
                    <Link className = "logoLink" to = "/">netflixroulette</Link>
                    <Link className = "moviePageHeaderButtonLink" to = "/" ><button type = "button" className = "moviePageHeaderButton">search</button></Link>
                </div>
                { props.movie !== undefined ?
                <MovieDescription movie = {props.movie}/>
                : <p className = "descriptionNotFound">film not found</p>
                }
            </header>  
            <div className="headerBottomBlock">
                <div className="moviesGenreBlock">
                  <p className="moviesGenre">Films by {genres[0]} genre</p>                            
                </div> 
            </div>    
        </>
    );  
 

};







export default MoviePageHeader;