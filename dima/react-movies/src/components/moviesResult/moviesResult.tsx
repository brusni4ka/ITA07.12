import * as React from "react";
import MovieInterface from "../../interfaces/movieInterface";

interface MoviesResultProps {
  searchedMovies: MovieInterface[] | null;
}

const MoviesResult = ({ searchedMovies }: MoviesResultProps) => {
  return searchedMovies ? (
    <span className="">{searchedMovies.length} movies was found</span>
  ) : null;
};

export default MoviesResult;
