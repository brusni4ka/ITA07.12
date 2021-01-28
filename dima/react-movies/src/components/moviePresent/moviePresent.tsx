import React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import "./moviePresent.css";
interface MoviePresentProps {
  movie: MovieInterface;
}

const MoviePresent = ({ movie }: MoviePresentProps) => {
  if (movie) {
    return (
      <div className="movie-container">
        <div className="movie-img">
          <img
            className="movie-img"
            src={movie.poster_path}
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <div className="movie-header">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-rating">{movie.vote_average}</div>
          </div>

          <span className="movie-tagline">{movie.tagline}</span>
          <span className="movie-date">
            {movie.release_date && movie.release_date.split("-")[0]}
          </span>
          <span className="movie-runtime">
            {movie.runtime && movie.runtime + "min"}
          </span>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default MoviePresent;
