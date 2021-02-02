import React, { Component } from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";
import MovieInterface from "./interfaces/movieInterface";
import SortProperty from "./enums/SortProperty";
import FilterProperty from "./enums/FilterPropery";
import PageNotFound from "./pages/pageNotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

interface AppState {
  movie: MovieInterface | null;
  movies: MovieInterface[];
  loading: boolean;
  currentSortType: SortProperty;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    movie: null,
    movies: [],
    loading: true,
    currentSortType: SortProperty.date,
  };

  setCurrentSortType = (currentSortType: SortProperty): void => {
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
  setLoading = (loading: boolean): void => {
    this.setState({ loading });
  };
  setMovies = (movies: MovieInterface[]): void => {
    this.setState({ movies });
  };
  setMovie = (movie: MovieInterface | null): void => {
    this.setState({ movie });
  };

  render() {
    const { movies, movie, currentSortType, loading } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <Route
              exact
              path={["/", "/search"]}
              render={(props) => (
                <MainPage
                  {...props}
                  movies={movies}
                  currentSortType={currentSortType}
                  loading={loading}
                  setLoading={this.setLoading}
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
                  {...props}
                  movies={movies}
                  movie={movie}
                  setMovies={this.setMovies}
                  setMovie={this.setMovie}
                  loading={loading}
                  setLoading={this.setLoading}
                />
              )}
            />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
