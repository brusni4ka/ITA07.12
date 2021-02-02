import React from 'react';
import IMovie from './IMovie';
import './movie.css';

interface IMovieCardProps {
  movie: IMovie 
}

const MovieCard: React.FC<IMovieCardProps> = (props) => {
  const { movie } = props;

  return (
    <div className="movie-card-full">
      <img src={movie.poster_path} className="movie-card-full-img" alt="movie poster" />
      <div className="movie-card-body">
        <h2 className="movie-title">{movie.title}</h2> 
        <span className="movie-rating">{movie.vote_average}</span>
        <p className="ganre">{movie.genres.slice(0, 3).join(' & ')}</p>
        <span className="movie-release-date">{movie.release_date.split('-')[0]}</span>
        <span className="movie-runtime">{movie.runtime} min</span>
        <p className="movie-card-description">{movie.overview}</p>
      </div>
    </div>
  )
}

export default MovieCard;
