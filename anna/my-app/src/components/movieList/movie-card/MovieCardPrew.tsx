import React from 'react';
import { Link } from 'react-router-dom';
import IMovie from '../movie-card/IMovie';
import './movie.css';



interface IMovieCardPrewProps {
  movie: IMovie
}

const MovieCardPrew: React.FC<IMovieCardPrewProps> = (props) => {
  const { movie } = props;

  return (
    <Link to={`/film/${movie.id}`} className="movie-link">    
      <div className="movie-card">
        <img src={movie.poster_path} className="movie-card-img" alt="movie poster" />
        <div className="movie-card-body">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-release-date">{movie.release_date.split('-')[0]}</p>
          <p className="ganre">{movie.genres.slice(0, 3).join(' & ')}</p>
        </div>
      </div>    
    </Link>
  )
}

export default MovieCardPrew;
