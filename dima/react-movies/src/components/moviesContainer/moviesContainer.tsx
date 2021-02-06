import React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import Movie from "./movie";
import ErrorBoundary from "../errorBoundary";
import Loader from "../loader";

import "./moviesContainer.css";

interface MoviesContainerProps {
  movies: MovieInterface[];
  loading: boolean;
}

const MoviesContainer = ({ movies, loading }: MoviesContainerProps) => {
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
  if (loading) {
    return (
      <div className="movies-loader">
        <Loader />
      </div>
    );
  }
  if (movies.length) {
    return renderMovies();
  }

  return (
    <div className="movies-wrapper">
      <p className="nothing-msg">No films found</p>
    </div>
  );
};

export default MoviesContainer;
