import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import ContentContainer from "../../components/contentContainer";
import CurrentMovieGenreFilter from "../../components/currentMovieGenreFilter";
import ErrorBoundary from "../../components/errorBoundary";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MoviePresent from "../../components/moviePresent/moviePresent";
import MoviesContainer from "../../components/moviesContainer";
import MovieInterface from "../../interfaces/movieInterface";
import Loader from "../../components/loader";
import { MovieConnectProps } from ".";
import * as QueryString from "query-string";
import "./moviepage.css";

interface MoviePageProps {
  // movies: MovieInterface[];
  // movie: MovieInterface | null;
  // loading: boolean;
  // setMovies: (movies: MovieInterface[], loading: boolean) => void;
  // setMovie: (movie: MovieInterface | null, loading: boolean) => void;
  // setLoading: (loading: boolean) => void;
  // fetchMovie: (loading: boolean) => void;
}

class MoviePage extends Component<
  MovieConnectProps & RouteComponentProps<{ id: string }>
> {
  componentDidMount() {
    this.fetchAllMovies();
    this.props.fetchMovie(true);
  }
  componentDidUpdate(
    prevProps: MoviePageProps & RouteComponentProps<{ id: string }>
  ) {
    if (this.props.location !== prevProps.location) {
      this.fetchAllMovies();
    }
  }
  componentWillUnmount() {
    // this.props.setMovie(null, true);
  }
  fetchAllMovies(): void {
    const { id } = this.props.match.params;
    fetch(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
      .then((res) => res.json())
      .then((movie) => {
        if (Object.keys(movie).length) {
          this.props.setMovie(movie, false);
          this.fetchMoviesByGenre(movie);
        } else {
          this.props.setMovie(null, false);
          // this.props.setLoading(false);
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
        this.props.setMovies(movies, false);
      });
  }

  render() {
    const { movie, movies, loadingMovie, loadingMovies } = this.props;
    // console.log("loading " + loading);

    return (
      <div className="app">
        <div className="first-screen-wrapper">
          <ContentContainer>
            <Header showSearchBtn />
            <ErrorBoundary>
              <MoviePresent movie={movie} loading={loadingMovie} />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        {movie ? (
          <div className="second-screen-wrapper">
            <ContentContainer>
              <CurrentMovieGenreFilter genre={movie.genres[0]} />
            </ContentContainer>
          </div>
        ) : null}

        <div className="third-screen-wrapper">
          <ContentContainer>
            <MoviesContainer movies={movies} loading={loadingMovies} />
          </ContentContainer>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MoviePage;
