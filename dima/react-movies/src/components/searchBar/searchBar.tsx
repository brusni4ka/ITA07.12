import * as React from "react";
import SearchFilter from "./searchFilter";
import "./searchBar.css";
import ErrorBoundary from "../errorBoundary";

interface SearchBarProps {
  searchBarValue: string;
  searchedBy: string;
  onSearchBarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleSearchCategory: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
const SearchBar = ({
  searchBarValue,
  searchedBy,
  onFormSubmit,
  onSearchBarChange,
  toggleSearchCategory,
}: SearchBarProps) => {
  return (
    <form onSubmit={onFormSubmit} className="search-bar">
      <h2 className="search-bar_heading">Find your movie</h2>
      <input
        className="search-bar_input"
        type="text"
        value={searchBarValue}
        onChange={(e) => onSearchBarChange(e)}
        placeholder="Type your movie"
      />
      <div className="search-bar_wrapper">
        <ErrorBoundary>
          <SearchFilter
            searchedBy={searchedBy}
            toggleSearchCategory={toggleSearchCategory}
          />
        </ErrorBoundary>

        <button type="submit" className="btn search-bar_search-btn">
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
