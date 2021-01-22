import * as React from "react";
import SearchFilter from "./searchFilter";
import "./searchBar.css";
import ErrorBoundary from "../errorBoundary";
import MovieInterface from "../../interfaces/movieInterface";

interface SearchBarProps {
  searchMovies: (
    searchBarValue: string,
    searchedBy: string
  ) => MovieInterface[];
  setSearchedMovies: (searchedMovies: MovieInterface[]) => void;
}

interface SearchBarState {
  searchBarValue: string;
  searchedBy: string;
}

export default class SearchBar extends React.Component<
  SearchBarProps,
  SearchBarState
> {
  state: SearchBarState = {
    searchBarValue: "",
    searchedBy: "title",
  };
  onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: searchBarValue } = e.target;
    console.log(searchBarValue);
    this.setState({ searchBarValue });
  };
  toggleSearchCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const { value } = e.currentTarget;
    console.log(value);
    this.setState({ searchedBy: value.toLowerCase() });
  };

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchBarValue, searchedBy } = this.state;
    const searchedMovies = this.props.searchMovies(searchBarValue, searchedBy);
    this.props.setSearchedMovies(searchedMovies);
    this.setState({ searchBarValue: "" });
  };
  render() {
    const { searchBarValue, searchedBy } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className="search-bar">
        <h2 className="search-bar_heading">Find your movie</h2>
        <input
          className="search-bar_input"
          type="text"
          value={searchBarValue}
          onChange={this.onSearchBarChange}
          placeholder="Type your movie"
        />
        <div className="search-bar_wrapper">
          <ErrorBoundary>
            <SearchFilter
              searchedBy={searchedBy}
              toggleSearchCategory={this.toggleSearchCategory}
            />
          </ErrorBoundary>

          <button type="submit" className="btn search-bar_search-btn">
            Search
          </button>
        </div>
      </form>
    );
  }
}
