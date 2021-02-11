import React from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';
import { RouteComponentProps } from "react-router-dom";
import { MovieConnectedProps } from '.';

interface RouteParams { id: string }

class MoviePage extends React.Component<RouteComponentProps<RouteParams> & MovieConnectedProps> {

  componentDidUpdate(prewProps: RouteComponentProps<RouteParams>) {
    const { match } = this.props;
    window.scrollTo(0, 0);
    if (prewProps.match.params.id !== match.params.id) {
      this.getMovies();
    }
  }

  componentWillUnmount() {
    this.props.resetMovies();
  }

  componentDidMount() {
    console.log("mount");
    this.getMovies();
  }

  getMovies() {
    const { match } = this.props;
    const movieId = match.params.id;
    this.props.fetchMovieRequested(movieId);
  }

  render() {
    console.log(this.props)
    const { movies, movie, loadingMovie, loadingMovies } = this.props;
    return (
      <Layout className="movie-page" pageName={'moviePage'}>
        <section className="section-dark">
          <Container>
            {loadingMovie ? <p className="loading-movie">Loading...</p> : <MovieCard movie={movie} />}
          </Container>
        </section>
        <section className="section">
          <SortBox movieGanre={movie.genres ? movie.genres[0] : ''} />
          {loadingMovies ? <p className="loading-list">Loading...</p> : <MovieList className="container" movies={movies} />}
        </section>
      </Layout>
    )
  }
}

export default MoviePage;
