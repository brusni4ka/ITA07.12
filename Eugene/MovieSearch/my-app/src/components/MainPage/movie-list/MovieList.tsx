import React from "react";
import "./MovieList.css";
import IMovie from "../../../interface/IMovie/IMovie";
import Movie from "../movie/Movie";
import { Link } from "react-router-dom";

interface IMovieListProps {
  movies: IMovie[];
}

function MovieList(props: IMovieListProps) {
  if (props.movies.length === 0) {
    return (
      <div className="movie-list-error">
        <p>No films found</p>
      </div>
    );
  } else {
    return (
      <div className="movie-list">
        {props.movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <Movie key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>
    );
  }
}

export default MovieList;
