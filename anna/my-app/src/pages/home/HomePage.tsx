import React from 'react';
import Layout from '../../components/layout';
import './homePage.css';
import MovieList from '../../components/movieList';
import SearchForm from '../../components/searchForm';
import { ISearchFormState } from '../../components/searchForm/SearchForm';
import { SortType } from '../../components/sortBox/SortBox';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import InfiniteScroll from '../../components/infiniteScroll';

import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { ISearchParams } from '../../Api';
import { MoviesConnectedProps } from '.';

class HomePage extends React.Component<RouteComponentProps & MoviesConnectedProps> {

  componentDidMount() {
    console.log('mount')
    const searchParam = QueryString.parse(this.props.location.search);

    if (searchParam.sortBy) {
      this.props.changeSortBy(searchParam.sortBy as SortType);
    }
    this.changeMoviesByPath();
  }


  componentDidUpdate(prevProps: RouteComponentProps & MoviesConnectedProps) {
    const { location } = this.props;

    if (prevProps.location.search !== location.search) {
      this.changeMoviesByPath();
    }
  }

  changeMoviesByPath = async (): Promise<void> => {
    const { location } = this.props;
    const searchParams: ISearchParams = QueryString.parse(`?sortBy=${this.props.sortBy}`)

    if (location.pathname === "/") {
      this.props.fetchMoviesRequested(searchParams)

    } else if (location.pathname === "/search") {
      this.props.fetchMoviesRequested(QueryString.parse(location.search))
    }
  }

  handleFormSubmit = (searchParams: ISearchFormState) => {
    const { history } = this.props;
    const searchQuery = QueryString.stringify(searchParams);
    history.push({
      pathname: '/search',
      search: `${searchQuery}`,
    });
  }

  handleSearchChange = (search: ISearchFormState) => {
    const { history } = this.props;
    const searchQuery = QueryString.stringify(search);

    history.push({
      search: searchQuery,
    });
  }

  sortFilms = (sortBy: SortType) => {
    const { history, location } = this.props;

    this.props.changeSortBy(sortBy);
    const searchParams = QueryString.parse(location.search);
    searchParams.sortBy = sortBy;

    history.push({
      pathname: '/search',
      search: `${QueryString.stringify(searchParams)}`,
    });
  };

  render() {
    const { movies, location, loading } = this.props;
    return (
      <Layout className="home-page" pageName={'home'}>
        <section className="section-dark">
          <Container>
            <h1 className="section-dark-title">find your movie</h1>
            <SearchForm onSubmit={this.handleFormSubmit} onSearchByChange={this.handleSearchChange} location={location} />
          </Container>
        </section>
        <section className="section">
          <SortBox movieCount={movies.length} onSortByChange={this.sortFilms} sortBy={this.props.sortBy} />
          <InfiniteScroll loadMoreMovies={this.props.loadMoreMovies} movies={movies} search={location.search}>
            {loading ? <p className="loading-list">Loading...</p> : <MovieList className="container" movies={movies} />}
          </InfiniteScroll>

        </section>
      </Layout>
    )
  }
}

export default HomePage;
