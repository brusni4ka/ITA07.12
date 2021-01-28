import React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import Movie from "./movie";
import "./moviesContainer.css";
import ErrorBoundary from "../errorBoundary";

interface MoviesContainerProps {
  movies: MovieInterface[];
}

const MoviesContainer = ({ movies }: MoviesContainerProps) => {
  return (
    <>
      <div className="movies-wrapper">
        {movies.length ? (
          <ErrorBoundary>
            {movies.map((movie, i) => {
              if ((i + 1) % 3 === 0)
                return <Movie key={movie.id} movie={movie} hasMargin={false} />;
              return <Movie key={movie.id} movie={movie} hasMargin={true} />;
            })}
          </ErrorBoundary>
        ) : (
          <p className="nothing-msg">No films found</p>
        )}
      </div>
    </>
  );
};

export default MoviesContainer;
