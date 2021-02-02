import React from 'react';
import Layout from '../../components/layout';
import './homePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SearchForm from '../../components/searchForm';
import { ISearchFormState } from '../../components/searchForm/SearchForm';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';

import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import Api from '../../Api';

interface IHomeProps {
  movies: IMovie[];
  changeMovies: (movies: IMovie[]) => void;
}

interface IHomeState {
  sortBy: string;
}

class HomePage extends React.Component<IHomeProps & RouteComponentProps, IHomeState> {

  state: IHomeState = {
    sortBy: "release_date"
  }

  componentDidMount() {
    this.changeMoviesByPath();
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;
    if (prevProps.location.search !== location.search) {
      this.changeMoviesByPath();
    }
  }

  changeMoviesByPath = async(): Promise<void> => {
    const { changeMovies, location } = this.props;
    
    if (location.pathname === "/") {
      const movies = await Api.fetchMovies('?sortBy=release_date');
      changeMovies(movies);         
        
    } else if (location.pathname === "/search") {
      const movies = await Api.fetchMovies(location.search)
      changeMovies(movies);      
    }
  }
  
  // getMovies = () => {
  //   const { changeMovies, location } = this.props;

  //   if (location.pathname === "/") {
  //     fetch(`${this.baseUrl}?${this.baseSortingSettings}&sortBy=release_date`)
  //       .then(response => response.json())
  //       .then(responseData => {
  //         const movies: IMovie[] = responseData.data;
  //         changeMovies(movies);
  //       });
  //   } else if (location.pathname === "/search") {
  //     fetch(`${this.baseUrl}${location.search}&${this.baseSortingSettings}`)
  //       .then(response => response.json())
  //       .then(responseData => {
  //         const movies: IMovie[] = responseData.data;
  //         changeMovies(movies);
  //       });
  //   }
  // }

  handleFormSubmit = ({ search, searchBy }: ISearchFormState) => {
    const { history } = this.props;
    const searchQuery = QueryString.stringify({ searchBy, search });
    history.push({
      pathname: '/search',
      search: `${searchQuery}&sortBy=${this.state.sortBy}`,
    });
  }

  sortFilms = (sortBy: string) => {
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
    const { movies } = this.props;
    return (
      <Layout className="home-page" pageName={'home'}>
        <section className="section-dark">
          <Container>
            <h1 className="section-dark-title">find your movie</h1>
            <SearchForm onSubmit={this.handleFormSubmit} />
          </Container>
        </section>
        <section className="section">
          <SortBox movieCount={movies.length} sortFilms={this.sortFilms} />
          <MovieList className="container" movies={movies} />
        </section>
      </Layout>
    )
  }
}

export default HomePage;
