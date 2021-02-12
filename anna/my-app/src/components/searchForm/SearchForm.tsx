import React from 'react';
import './searchForm.css';
import Button from '../../components/button';

import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

interface ISearchFormProps {
  location: RouteComponentProps["location"];
  onSubmit(arg0: ISearchFormState): void;
  onSearchByChange(arg0: ISearchFormState): void;
}

export interface ISearchFormState {
  search: string;
  searchBy: SearchType;
}

export enum SearchType {
  Title = "title",
  Ganre = "genres"
}

class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
  state: ISearchFormState = {
    search: '',
    searchBy: SearchType.Title
  };

  changeValue = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ search: e.target.value });

  handleSearchByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: '',
      searchBy: e.target.value as SearchType,
    }, () => {
      this.props.onSearchByChange(this.state);
    });
  }

  componentDidMount() {
    const { location } = this.props;
    console.log(location.search, 'search mount')
    const searchParams = QueryString.parse(location.search);

    if (searchParams.searchBy) {
      this.setState({
        searchBy: searchParams.searchBy as SearchType
      });
    } 

    if (searchParams.search) {
      this.setState({
        search: searchParams.search as SearchType
      })
    }
  }

  handleSubmit = () => {
    this.props.onSubmit({
      search: this.state.search,
      searchBy: this.state.searchBy
    });
  }

  render() {
    const { search, searchBy } = this.state;

    return (
      <form className="search-form container">
        <input
          className="search-form-input"
          type="text"
          value={search}
          onChange={this.changeValue}
        />

        <div className="searchby-wrapper">
          <span>Search by</span>
          <input
            id="input-title"
            type="radio"
            name="react-tips"
            value={SearchType.Title}
            checked={searchBy === SearchType.Title}
            onChange={this.handleSearchByChange}
            className="form-check-input"
          />
          <label htmlFor="input-title"></label>

          <input
            id="input-ganre"
            type="radio"
            name="react-tips"
            value={SearchType.Ganre}
            checked={searchBy === SearchType.Ganre}
            onChange={this.handleSearchByChange}
            className="form-check-input"
          />
          <label htmlFor="input-ganre"></label>
          <Button onClick={this.handleSubmit} className="btn-primary search-form-btn">Search</Button>
        </div>
      </form>
    );
  };
}

export default SearchForm;

