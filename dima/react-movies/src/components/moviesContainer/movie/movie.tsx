import * as React from "react";
import MovieInterface from "../../../interfaces/movieInterface";
import "./movie.css";
interface MovieProps {
  movie: MovieInterface;
  hasMargin: boolean;
}
const Movie = ({ movie, hasMargin }: MovieProps) => {
  const { poster_path: url, title, genres, release_date: year } = movie;
  return (
    <div className={hasMargin ? "movie-card has-margin" : "movie-card"}>
      <img className="movie-card_img" src={url} alt={title}></img>
      <div className="movie-card_description">
        <div className="movie-card_title-genre">
          <h4 className="movie-card_title">{title}</h4>
          <p className="movie-card_genre">
            {genres.map((genre) =>
              genres.indexOf(genre) !== genres.length - 1
                ? genre + " & "
                : genre
            )}
          </p>
        </div>
        <span className="movie-card_year">{year}</span>
      </div>
    </div>
  );
};

export default Movie;
