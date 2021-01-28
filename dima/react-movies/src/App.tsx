import React, { Component } from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";
import MovieInterface from "./interfaces/movieInterface";
import SortProperty from "./enums/SortProperty";
import FilterProperty from "./enums/FilterPropery";
import PageNotFound from "./pages/pageNotFound";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

interface AppState {
  movie: MovieInterface | null;
  movies: MovieInterface[];
  isMovieExisted: boolean;
  currentSortType: string;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    movie: null,
    movies: [],
    isMovieExisted: true,
    currentSortType: SortProperty.date,
  };

  setCurrentSortType = (currentSortType: string): void => {
    this.setState({ currentSortType });
  };
  searchMovies = (value: string, category: string): void => {
    const { movies } = this.state;
    if (!value) {
      return;
    }
    if (category === FilterProperty.title) {
      this.setState({
        movies: movies.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        ),
      });
    } else {
      this.setState({
        movies: movies.filter((movie) =>
          movie.genres
            .map((genre) => genre.toLocaleLowerCase())
            .includes(value.toLowerCase())
        ),
      });
    }
  };
  setIsMovieExisted = (isMovieExisted: boolean) => {
    this.setState({ isMovieExisted });
  };
  setMovies = (movies: MovieInterface[]) => {
    this.setState({ movies });
  };
  setMovie = (movie: MovieInterface) => {
    this.setState({ movie });
  };
  sortMovies(type: string) {
    const { movies } = this.state;
    if (type === SortProperty.date) {
      this.setState({
        movies: [...movies].sort((a, b) => {
          return (
            Number.parseInt(b.release_date) - Number.parseInt(a.release_date)
          );
        }),
      });
    } else {
      this.setState({
        movies: [
          ...movies.sort((a, b) => {
            return b.vote_average - a.vote_average;
          }),
        ],
      });
    }
  }

  render() {
    const { movies, movie, currentSortType, isMovieExisted } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <Route
              exact
              path={["/", "/search"]}
              render={(props) => (
                <MainPage
                  route={{ ...props }}
                  movies={movies}
                  currentSortType={currentSortType}
                  setCurrentSortType={this.setCurrentSortType}
                  searchMovies={this.searchMovies}
                  setMovies={this.setMovies}
                />
              )}
            />
            <Route
              path={`/film/:id`}
              render={(props) => (
                <MoviePage
                  route={{ ...props }}
                  movies={movies}
                  movie={movie}
                  isMovieExisted={isMovieExisted}
                  setMovies={this.setMovies}
                  setMovie={this.setMovie}
                  setIsMovieExisted={this.setIsMovieExisted}
                />
              )}
            />

            <Route path="/page-not-found" component={PageNotFound} />
            <Route>
              <Redirect to="/page-not-found" />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
