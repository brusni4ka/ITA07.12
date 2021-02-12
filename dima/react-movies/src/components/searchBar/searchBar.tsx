import React from "react";
import SearchFilter from "./searchFilter";
import "./searchBar.css";
import ErrorBoundary from "../errorBoundary";
import * as QueryString from "query-string";
import FilterProperty from "../../enums/FilterPropery";
import { RouteComponentProps } from "react-router";
import ParamsToPush from "../../interfaces/paramsToPush";
interface SearchBarProps {
  location: RouteComponentProps["location"];
  pushParamsOnSubmit: (urlParams: ParamsToPush) => void;
}

interface SearchBarState {
  searchBarValue: string | undefined;
  searchBy: FilterProperty;
}

export default class SearchBar extends React.Component<
  SearchBarProps,
  SearchBarState
> {
  state: SearchBarState = {
    searchBarValue: "",
    searchBy: FilterProperty.title,
  };

  componentDidMount() {
    this.setFiltersFromURL();
  }
  componentDidUpdate(prevProps: SearchBarProps) {
    if (
      QueryString.parse(prevProps.location.search).search !==
      QueryString.parse(this.props.location.search).search
    ) {
      this.setFiltersFromURL();
    }
  }
  onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: searchBarValue } = e.target;
    this.setState({ searchBarValue });
  };

  toggleSearchCategoryByClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (e) {
      const { value } = e.currentTarget;
      this.setState({
        searchBy:
          value.toLowerCase() === FilterProperty.genre
            ? FilterProperty.genre
            : FilterProperty.title,
      });
    }
  };

  setFiltersFromURL = () => {
    const { search, searchBy } = QueryString.parse(this.props.location.search);
    this.setState({
      searchBarValue: search ? search.toString() : "",
      searchBy:
        searchBy === FilterProperty.title
          ? FilterProperty.title
          : FilterProperty.genre,
    });
  };

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { pushParamsOnSubmit } = this.props;
    const { searchBarValue: search, searchBy } = this.state;
    const urlParams: ParamsToPush = {
      search,
      searchBy,
    };
    pushParamsOnSubmit(urlParams);
  };

  render() {
    const { searchBarValue, searchBy } = this.state;
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
              searchedBy={searchBy}
              toggleSearchCategory={this.toggleSearchCategoryByClick}
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
