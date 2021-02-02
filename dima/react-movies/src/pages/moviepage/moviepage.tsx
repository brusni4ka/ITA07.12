import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import ContentContainer from "../../components/contentContainer";
import CurrentMovieGenreFilter from "../../components/currentMovieGenreFilter";
import ErrorBoundary from "../../components/errorBoundary";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MoviePresent from "../../components/moviePresent/moviePresent";
import MoviesContainer from "../../components/moviesContainer";
import MovieInterface from "../../interfaces/movieInterface";
import Loader from "../../components/loader";

import * as QueryString from "query-string";
import "./moviepage.css";

interface MoviePageProps {
  movies: MovieInterface[];
  movie: MovieInterface | null;
  loading: boolean;
  setMovies: (movies: MovieInterface[]) => void;
  setMovie: (movie: MovieInterface | null) => void;
  setLoading: (loading: boolean) => void;
}

class MoviePage extends Component<
  MoviePageProps & RouteComponentProps<{ id: string }>
> {
  componentWillUnmount() {
    this.props.setMovie(null);
  }
  componentDidMount() {
    this.fetchAllMovies();
  }
  componentDidUpdate(
    prevProps: MoviePageProps & RouteComponentProps<{ id: string }>
  ) {
    if (this.props.location !== prevProps.location) {
      this.fetchAllMovies();
    }
  }

  fetchAllMovies(): void {
    this.props.setLoading(true);
    const { id } = this.props.match.params;
    fetch(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
      .then((res) => res.json())
      .then((movie) => {
        if (Object.keys(movie).length) {
          this.props.setMovie(movie);
          this.fetchMoviesByGenre(movie);
        } else {
          this.props.setMovie(null);
          this.props.setLoading(false);
        }
      })
      .catch(() => {});
  }

  fetchMoviesByGenre(movie: MovieInterface): void {
    const genreParamString = QueryString.stringify({ filter: movie.genres[0] });
    const url = `https://reactjs-cdp.herokuapp.com/movies?${genreParamString}`;
    fetch(url)
      .then((res) => res.json())
      .then(({ data: movies }) => {
        this.props.setMovies(movies);
        this.props.setLoading(false);
      });
  }

  render() {
    const { movie, movies, loading } = this.props;
    if (movie) {
      return (
        <div className="app">
          <div className="first-screen-wrapper">
            <ContentContainer>
              <Header showSearchBtn />
              <ErrorBoundary>
                <MoviePresent movie={movie} />
              </ErrorBoundary>
            </ContentContainer>
          </div>
          <div className="second-screen-wrapper">
            <ContentContainer>
              <CurrentMovieGenreFilter genre={movie.genres[0]} />
            </ContentContainer>
          </div>
          <div className="third-screen-wrapper">
            <ContentContainer>
              <MoviesContainer movies={movies} loading={loading} />
            </ContentContainer>
          </div>
          <Footer />
        </div>
      );
    } else if (!movie) {
      return (
        <div className="first-screen-wrapper loader-cont">
          <div className="loader">
            <Loader />
          </div>
        </div>
      );
    }
  }
}

export default MoviePage;
