import * as React from "react";

interface CurrentMovieGenreFilterProps {
  genres: string[];
}
const CurrentMovieGenreFilter = ({ genres }: CurrentMovieGenreFilterProps) => {
  return (
    <span className="filter-genre">
      {" "}
      Films by{" "}
      {genres.map((genre) =>
        genres.indexOf(genre) !== genres.length - 1 ? genre + "&" : genre
      )}{" "}
      genre
    </span>
  );
};

export default CurrentMovieGenreFilter;
