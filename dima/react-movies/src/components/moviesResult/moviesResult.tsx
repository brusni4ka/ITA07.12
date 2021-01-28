import React from "react";
import MovieInterface from "../../interfaces/movieInterface";

interface MoviesResultProps {
  movies: MovieInterface[] | null;
  isMoviesExisted: boolean;
}

const MoviesResult = ({ movies, isMoviesExisted }: MoviesResultProps) => {
  if (movies && isMoviesExisted) {
    return <span className="">{movies.length} movies was found</span>;
  }
  return null;
};

export default MoviesResult;
