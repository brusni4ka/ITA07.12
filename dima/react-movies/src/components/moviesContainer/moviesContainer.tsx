import React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import Movie from "./movie";
import ErrorBoundary from "../errorBoundary";
import Loader from "../loader";

import "./moviesContainer.css";

interface MoviesContainerProps {
  movies: MovieInterface[];
  isMoviesExisted?: boolean;
}

const MoviesContainer = ({ movies, isMoviesExisted }: MoviesContainerProps) => {
  const renderMovies = (): JSX.Element => {
    return (
      <div className="movies-wrapper">
        <ErrorBoundary>
          {movies.map((movie, i) => {
            if ((i + 1) % 3 === 0)
              return <Movie key={movie.id} movie={movie} hasMargin={false} />;
            return <Movie key={movie.id} movie={movie} hasMargin={true} />;
          })}
        </ErrorBoundary>
      </div>
    );
  };
  if (isMoviesExisted !== undefined) {
    if (movies.length) {
      return renderMovies();
    } else if (!movies.length && isMoviesExisted) {
      return (
        <div className="movies-loader">
          <Loader />
        </div>
      );
    }
    return (
      <div className="movies-wrapper">
        <p className="nothing-msg">No films found</p>
      </div>
    );
  }
  return renderMovies();
};

export default MoviesContainer;
