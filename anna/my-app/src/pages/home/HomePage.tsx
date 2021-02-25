import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
import { useHistory, useLocation } from "react-router-dom";
import { ISearchParams } from '../../Api';

import { IRootState } from '../../store/store';
import { setSortBy, fetchMoviesRequested, loadMoreMovies, resetMovies } from '../../store/redux/moviesActions';

const HomePage = () => {
  const location = useLocation();
  const history = useHistory();

  const sortBy = useSelector((state: IRootState) => state.movies.sortBy);
  const movies = useSelector((state: IRootState) => state.movies.items);
  const loading = useSelector((state: IRootState) => state.movies.loading);
  const total = useSelector((state: IRootState) => state.movies.total);

  const dispatch = useDispatch();

  useEffect(() => {

    const searchParam = QueryString.parse(location.search);

    if (searchParam.sortBy) {
      dispatch(setSortBy(searchParam.sortBy as SortType));
    }
    changeMoviesByPath();

    return () => {
      dispatch(resetMovies());
    }
  }, []);

  useEffect(() => {
    changeMoviesByPath();
  }, [location.search])


  // componentDidMount() {
  //   const searchParam = QueryString.parse(this.props.location.search);

  //   if (searchParam.sortBy) {
  //     this.props.changeSortBy(searchParam.sortBy as SortType);
  //   }
  //   this.changeMoviesByPath();
  // }

  // componentDidUpdate(prevProps: RouteComponentProps & MoviesConnectedProps) {
  //   const { location } = this.props;

  //   if (prevProps.location.search !== location.search) {
  //     this.changeMoviesByPath();
  //   }
  // }

  const changeMoviesByPath = async (): Promise<void> => {
    const searchParams: ISearchParams = { sotrBy: sortBy }

    if (location.pathname === "/") {
      dispatch(fetchMoviesRequested(searchParams));

    } else if (location.pathname === "/search") {
      dispatch(fetchMoviesRequested(QueryString.parse(location.search)));
    }
  }

  const handleFormSubmit = (searchParams: ISearchFormState) => {
    const searchQuery = QueryString.stringify({ ...searchParams, sortBy });
    history.push({
      pathname: '/search',
      search: `${searchQuery}`,
    });
  }

  const sortFilms = (sort: SortType) => {
    const searchParams = QueryString.parse(location.search);    
    searchParams.sortBy = sort;
   
    history.push({
      pathname: '/search',
      search: `${QueryString.stringify(searchParams)}`,
    });
  };

  const handleLoad = () => {
    dispatch(loadMoreMovies(QueryString.parse(location.search)));
  }

  return (
    <Layout className="home-page" pageName={'home'}>
      <section className="section-dark">
        <Container>
          <h1 className="section-dark-title">find your movie</h1>
          <SearchForm onSubmit={handleFormSubmit} onSearchByChange={handleFormSubmit} />
        </Container>
      </section>
      <section className="section">
        <SortBox movieCount={total} onSortByChange={sortFilms} sortBy={sortBy} />
        <InfiniteScroll onLoadMore={handleLoad} currentCount={movies.length} total={total}>
          {loading ? <p className="loading-list">Loading...</p> : <MovieList movies={movies} />}
        </InfiniteScroll>

      </section>
    </Layout>
  )

}

export default HomePage;
