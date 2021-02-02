import React from "react";
import "./MovieList.css";
import IMovie from "../../../interface/IMovie/IMovie";
import Movie from "../movie/Movie";
import { Link } from "react-router-dom";

interface IMainProps {
  movies: IMovie[];
}

class MovieList extends React.Component<IMainProps, {}> {
  render() {
    if (this.props.movies.length == 0) {
      return (
        <div className="movie-list-error">
          <p>No films found</p>
        </div>
      );
    } else {
      return (
        <div className="movie-list">
          {this.props.movies.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <Movie key={movie.id} movie={movie} />
            </Link>
          ))}
        </div>
      );
    }
  }
}

export default MovieList;
