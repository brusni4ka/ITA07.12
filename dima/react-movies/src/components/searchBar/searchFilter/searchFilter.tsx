import * as React from "react";

interface SearchFilterProps {
  searchedBy: string;
  toggleSearchCategory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
}
const SearchFilter = ({
  searchedBy,
  toggleSearchCategory,
}: SearchFilterProps) => {
  return (
    <div className="search-bar_categories">
      Search by
      <button
        type="button"
        className={
          searchedBy === "title"
            ? "btn search-bar_title-btn btn-active"
            : "btn search-bar_title-btn"
        }
        onClick={(e) => toggleSearchCategory(e)}
        value="title"
      >
        Title
      </button>
      <button
        type="button"
        className={
          searchedBy === "genre"
            ? "btn search-bar_genre-btn btn-active"
            : "btn search-bar_genre-btn"
        }
        onClick={(e) => {
          toggleSearchCategory(e);
        }}
        value="genre"
      >
        Genre
      </button>
    </div>
  );
};

export default SearchFilter;
