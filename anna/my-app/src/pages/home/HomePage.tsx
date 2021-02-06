import React from 'react';
import Layout from '../../components/layout';
import './homePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SearchForm from '../../components/searchForm';
import { ISearchFormState } from '../../components/searchForm/SearchForm';
import { SearchType } from '../../components/searchForm/SearchForm';
import { SortType } from '../../components/sortBox/SortBox';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';

import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import Api, { ISearchParams } from '../../Api';

interface IHomeProps {
  movies: IMovie[];
  changeMovies: (movies: IMovie[]) => void;
}

interface IHomeState {
  sortBy: SortType;
}

class HomePage extends React.Component<IHomeProps & RouteComponentProps, IHomeState> {

  state: IHomeState = {
    sortBy: SortType.ReleaseDate,
  }

  componentDidMount() {
    this.changeMoviesByPath();
    const searchParam = QueryString.parse(this.props.location.search);

    if (searchParam.sortBy) {
      this.setState({
        sortBy: searchParam.sortBy as SortType
      });
    } 
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;

    if (prevProps.location.search !== location.search) {
      this.changeMoviesByPath();
    }
  }

  changeMoviesByPath = async (): Promise<void> => {
    const { changeMovies, location } = this.props;
    const searchParams: ISearchParams = QueryString.parse(`?sortBy=${this.state.sortBy}`)

    if (location.pathname === "/") {
      const movies = await Api.fetchMovies(searchParams);
      changeMovies(movies);

    } else if (location.pathname === "/search") {
      const movies = await Api.fetchMovies(QueryString.parse(location.search))
      changeMovies(movies);
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

  handleSortByChange = (sortBy: SortType) => {
    this.setState({ sortBy });
  }

  sortFilms = (sortBy: SortType) => {
    const { history, location } = this.props;

    this.setState({ sortBy });
    const searchParams = QueryString.parse(location.search);
    searchParams.sortBy = sortBy;

    history.push({
      pathname: '/search',
      search: `${QueryString.stringify(searchParams)}`,
    });
  };

  render() {
    const { movies, location } = this.props;
    return (
      <Layout className="home-page" pageName={'home'}>
        <section className="section-dark">
          <Container>
            <h1 className="section-dark-title">find your movie</h1>
            <SearchForm onSubmit={this.handleFormSubmit} onSearchByChange={this.handleSearchChange}  location={location}/>
          </Container>
        </section>
        <section className="section">
          <SortBox movieCount={movies.length} onSortByChange={this.sortFilms} sortBy={this.state.sortBy} />
          <MovieList className="container" movies={movies} />
        </section>
      </Layout>
    )
  }
}

export default HomePage;
