import React from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';
import { RouteComponentProps } from "react-router-dom";
import Api, {ISearchParams} from '../../Api';

import * as QueryString from "query-string";

interface IMoviePageState {
  movies: Array<IMovie>,
  movie?: IMovie
}

interface RouteParams { id: string }

class MoviePage extends React.Component<RouteComponentProps<RouteParams>, IMoviePageState> {

  state: IMoviePageState = {
    movies: [],
  }

  componentDidUpdate(prewProps: RouteComponentProps<RouteParams>) {
    const { match } = this.props;
    console.log("updated");    
    window.scrollTo(0,0);
    if (prewProps.match.params.id !== match.params.id) {
      this.getMovies();
    }
  }

  componentDidMount() {
    console.log("mount");
    this.getMovies();
 }

  async getMovies() {
    const { match } = this.props;    

    const movieId = match.params.id;
    const movie = await Api.fetchMovie(movieId);
    const searchParams: ISearchParams = QueryString.parse(`?search=${movie && movie.genres[0]}&searchBy=genres`)

    this.setState({movie});

    const movies = await Api.fetchMovies(searchParams);
    this.setState({ movies})
    
  }

  render() {
    const { movies, movie } = this.state;
    return (
      <Layout className="movie-page" pageName={'moviePage'}>
        <section className="section-dark">
          <Container>{movie && <MovieCard movie={movie} />}</Container>
        </section>
        <section className="section">
          {movie && <SortBox movieGanre={movie.genres[0]}/>}
          <MovieList className="container" movies={movies} />
        </section>
      </Layout>
    )
  }
}

export default MoviePage;
