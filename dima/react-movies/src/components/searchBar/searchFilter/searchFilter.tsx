import React from "react";
import FilterProperty from "../../../enums/FilterPropery";

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
          searchedBy === FilterProperty.title
            ? "btn search-bar_title-btn btn-active"
            : "btn search-bar_title-btn"
        }
        onClick={toggleSearchCategory}
        value="title"
      >
        Title
      </button>
      <button
        type="button"
        className={
          searchedBy === FilterProperty.genre
            ? "btn search-bar_genre-btn btn-active"
            : "btn search-bar_genre-btn"
        }
        onClick={toggleSearchCategory}
        value="genres"
      >
        Genre
      </button>
    </div>
  );
};

export default SearchFilter;
