import React from 'react';
import moviesData from './moviesData';
import {Link} from "react-router-dom";


interface IMovieCardProps {
    movie: IMovieCard;
}

interface IMovieCard {
    id: number, title: string, tagline: string, vote_average: number,
    vote_count: number, release_date: string, poster_path: string, 
    overview: string, budget: number, revenue: number,
    genres: Array<string>, runtime: number
}

const MovieCard = (props: IMovieCardProps) => {
    const {movie} = props;
    return (
        <div className = "movieCard">
            <Link className ="movieCardImageLink" to = "/moviePage">
                <img className ="movieCardImage" src = {movie.poster_path}
                     alt = {movie.title}                                          
                />
            </Link>
           <div className = "movieCardInfo">
                <div className ="movieCardTitleBlock">    
                    <h6 className ="movieCardTitle">{movie.title}</h6>
                    <p className ="movieCardGenre">{movie.genres[0]}</p>
                </div>    
            <div className = "movieCardYear">    
                <p>{movie.release_date}</p>                        
            </div>    
            </div>                               
        </div>
    );
};






export default MovieCard;























