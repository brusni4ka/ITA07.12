import React from "react";
import MovieInterface from "../../interfaces/movieInterface";

interface MoviesResultProps {
  movies: MovieInterface[] | null;
}

const MoviesResult = ({ movies }: MoviesResultProps) => {
  return movies && <span className="">{movies.length} movies was found</span>;
};

export default MoviesResult;
