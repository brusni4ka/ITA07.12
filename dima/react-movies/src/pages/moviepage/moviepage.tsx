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

import * as QueryString from "query-string";

interface MoviePageProps {
  route: RouteComponentProps<{ id: string }>;
  movies: MovieInterface[];
  movie: MovieInterface | null;
  isMovieExisted: boolean;
  setMovies: (movies: MovieInterface[]) => void;
  setMovie: (movie: MovieInterface) => void;
  setIsMovieExisted: (isMovieExisted: boolean) => void;
}

class MoviePage extends Component<MoviePageProps> {
  componentDidMount() {
    this.fetchAllMovies();
  }
  componentDidUpdate(prevProps: MoviePageProps) {
    if (this.props.route.location !== prevProps.route.location) {
      this.fetchAllMovies();
    }
  }
  fetchAllMovies(): void {
    const { id } = this.props.route.match.params;
    console.log(id);
    fetch(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
      .then((res) => res.json())
      .then((movie) => {
        console.log(movie);
        if (Object.keys(movie).length !== 0) {
          this.props.setMovie(movie);
          this.fetchMoviesByGenre(movie);
        } else {
          this.props.setIsMovieExisted(false);
        }
      })
      .catch(() => {
        this.props.setIsMovieExisted(false);
      });
  }

  fetchMoviesByGenre(movie: MovieInterface): void {
    const genreParamString = QueryString.stringify({ filter: movie.genres[0] });
    const url = `https://reactjs-cdp.herokuapp.com/movies?${genreParamString}`;
    fetch(url)
      .then((res) => res.json())
      .then(({ data: movies }) => {
        this.props.setMovies(movies);
      });
  }

  render() {
    const { movie, movies, isMovieExisted } = this.props;

    if (!isMovieExisted) {
      return <Redirect to="../page-not-found" />;
    } else if (!movie && isMovieExisted) {
      return <p>Loading...</p>;
    } else if (movie && isMovieExisted) {
      return (
        <div className="app">
          <div className="first-screen-wrapper">
            <ContentContainer>
              <Header showSearchBtn={true} />
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
              <MoviesContainer movies={movies} />
            </ContentContainer>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default MoviePage;
