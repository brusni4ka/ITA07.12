import React from "react";
import SearchFilter from "./searchFilter";
import "./searchBar.css";
import ErrorBoundary from "../errorBoundary";
import * as QueryString from "query-string";
import FilterProperty from "../../enums/FilterPropery";
import { RouteComponentProps } from "react-router";

interface SearchBarProps {
  searchMovies: (searchBarValue: string, searchedBy: string) => void;
  route: RouteComponentProps;
  fetchMovies: () => void;
  currentSortType: string;
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
    searchedBy: FilterProperty.title,
  };
  onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: searchBarValue } = e.target;
    // console.log(searchBarValue);
    this.setState({ searchBarValue });
  };
  toggleSearchCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const { value } = e.currentTarget;
    this.setState({ searchedBy: value.toLowerCase() });
  };

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { history } = this.props.route;
    const { searchBarValue, searchedBy } = this.state;
    const urlParams = {
      searchBy: searchedBy,
      search: searchBarValue,
    };
    history.push({
      pathname: "/search",
      search: QueryString.stringify(urlParams),
    });
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
