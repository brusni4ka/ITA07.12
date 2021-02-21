import React from "react";

interface CurrentMovieGenreFilterProps {
  genre: string;
}
const CurrentMovieGenreFilter = ({ genre }: CurrentMovieGenreFilterProps) => {
  return <span className="filter-genre">Films by {genre} genre</span>;
};

export default CurrentMovieGenreFilter;
