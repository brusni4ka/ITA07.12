import React from "react";
import MovieInterface from "../../interfaces/movieInterface";

interface MoviesResultProps {
  movies: MovieInterface[] | null;
  loading?: boolean;
}

const MoviesResult = ({ movies, loading }: MoviesResultProps) => {
  if (movies && !loading) {
    return <span className="">{movies.length} movies was found</span>;
  }
  return null;
};

export default MoviesResult;
