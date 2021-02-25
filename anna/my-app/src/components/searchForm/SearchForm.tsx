import React, { FC, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './searchForm.css';
import Button from '../../components/button';

import * as QueryString from "query-string";
import { useState } from 'react';

interface ISearchFormProps {
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

const SearchForm: FC<ISearchFormProps> = (props) => {
  const location = useLocation();
  const searchParams = QueryString.parse(location.search);  

  const [search, setSearch] = useState(searchParams.search as string);
  const [searchBy, setSearchBy] = useState(SearchType.Title);


  useEffect(() => {
    const searchParams = QueryString.parse(location.search);
    setSearch(searchParams.search as SearchType || '');
    setSearchBy(searchParams.searchBy as SearchType || SearchType.Title);  
  }, [])

  useEffect(() => {
    props.onSearchByChange({ search: search, searchBy: searchBy });
  }, [searchBy]);
  
  // componentDidMount() {

  //   const { location } = props;
  //   console.log(location.search, 'search mount')
  //   const searchParams = QueryString.parse(location.search);

  //   this.setState({
  //     search: searchParams.search as SearchType || '',
  //     searchBy: searchParams.searchBy as SearchType || SearchType.Title
  //   })
  // }

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSearchByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handle sb change')
    setSearch('');
    setSearchBy(e.target.value as SearchType);
  }

  const handleSubmit = () => {
    props.onSubmit({
      search: search,
      searchBy: searchBy
    });
  }

  return (
    <form className="search-form container">
      <input
        className="search-form-input"
        type="text"
        value={search}
        onChange={changeValue}
      />

      <div className="searchby-wrapper">
        <span>Search by</span>
        <input
          id="input-title"
          type="radio"
          name="react-tips"
          value={SearchType.Title}
          checked={searchBy === SearchType.Title}
          onChange={handleSearchByChange}
          className="form-check-input"
        />
        <label htmlFor="input-title"></label>

        <input
          id="input-ganre"
          type="radio"
          name="react-tips"
          value={SearchType.Ganre}
          checked={searchBy === SearchType.Ganre}
          onChange={handleSearchByChange}
          className="form-check-input"
        />
        <label htmlFor="input-ganre"></label>
        <Button onClick={handleSubmit} className="btn-primary search-form-btn">Search</Button>
      </div>
    </form>
  );

}

export default SearchForm;

