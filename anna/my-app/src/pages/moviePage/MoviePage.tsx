import React from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';
import { RouteComponentProps } from "react-router-dom";
import { MovieConnectedProps } from '.';
import InfiniteScroll from '../../components/infiniteScroll';
import * as QueryString from "query-string";
import { SearchType } from '../../components/searchForm/SearchForm';

interface RouteParams { id: string }

class MoviePage extends React.Component<RouteComponentProps<RouteParams> & MovieConnectedProps> {

  componentDidMount() {
    console.log("mount");
    this.getMovies();
  }

  componentDidUpdate(prewProps: RouteComponentProps<RouteParams> & MovieConnectedProps) {
    const { match, movies } = this.props;

    if(prewProps.movies.length === movies.length) {
       window.scrollTo(0, 0);
    }
   
    if (prewProps.match.params.id !== match.params.id) {
      this.getMovies();
    }
  }

  componentWillUnmount() {
    this.props.resetMovies();
  }  

  getMovies() {
    const { match } = this.props;
    const movieId = match.params.id;
    this.props.fetchMovieRequested(movieId);
  }

  handleLoad =() => {
    this.props.loadMoreMovies({...QueryString.parse(this.props.location.search), search: this.props.movie.genres[0], searchBy: SearchType.Ganre})
  }

  render() {
    const { movies, movie, loadingMovie, loadingMovies, location, total } = this.props;
  
    return (
      <Layout className="movie-page" pageName={'moviePage'}>
        <section className="section-dark">
          <Container>
            {loadingMovie ? <p className="loading-movie">Loading...</p> : <MovieCard movie={movie} />}
          </Container>
        </section>
        <section className="section">
          <SortBox movieGanre={movie.genres ? movie.genres[0] : ''} />
          <InfiniteScroll onLoadMore={this.handleLoad} currentCount={movies.length} search={location.search} total={total}>
            {loadingMovies ? <p className="loading-list">Loading...</p> : <MovieList className="container" movies={this.props.movies} />}
          </InfiniteScroll>
        </section>
      </Layout>
    )
  }
}

export default MoviePage;
