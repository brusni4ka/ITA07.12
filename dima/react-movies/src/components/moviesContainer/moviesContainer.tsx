import * as React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import Movie from "./movie";
import "./moviesContainer.css";
import ErrorBoundary from "../errorBoundary";

interface MoviesContainerProps {
  movies: MovieInterface[];
}

const MoviesContainer = ({ movies }: MoviesContainerProps) => {
  const renderMovies = (): JSX.Element | string => {
    if (movies.length > 0) {
      return (
        <ErrorBoundary>
          {movies.map((movie, i) => {
            if ((i + 1) % 3 === 0)
              return <Movie key={movie.id} movie={movie} hasMargin={false} />;
            return <Movie key={movie.id} movie={movie} hasMargin={true} />;
          })}
        </ErrorBoundary>
      );
    }
    return <p className="nothing-msg">No films found</p>;
  };
  return (
    <>
      <div className="movies-wrapper">{renderMovies()}</div>
    </>
  );
};

export default MoviesContainer;
