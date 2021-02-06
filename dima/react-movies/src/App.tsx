import React, { Component } from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";
import MovieInterface from "./interfaces/movieInterface";
import SortProperty from "./enums/SortProperty";
import { Provider } from "react-redux";
import PageNotFound from "./pages/pageNotFound";
import Store from "./redux/store";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import "./App.css";

interface AppState {
  // movie: MovieInterface | null;
  // movies: MovieInterface[];
  // loading: boolean;
  currentSortType: SortProperty;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    currentSortType: SortProperty.date,
  };

  setCurrentSortType = (currentSortType: SortProperty): void => {
    this.setState({ currentSortType });
  };
  // setLoading = (loading: boolean): void => {
  //   this.setState({ loading });
  // };
  // setMovies = (movies: MovieInterface[]): void => {
  //   this.props.setMovies(movies);
  // };
  // setMovie = (movie: MovieInterface | null): void => {
  //   this.props.setMovie(movie);
  // };

  render() {
    const { currentSortType } = this.state;
    // const { movies, movie, loading } = this.props;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={["/", "/search"]}
            render={(props) => (
              <MainPage
                {...props}
                // movies={movies}
                // movie={movie}
                // fetchMovies={this.props.fetchMovies}
                currentSortType={currentSortType}
                // loading={loading}
                setCurrentSortType={this.setCurrentSortType}
                // setMovies={this.setMovies}
              />
            )}
          />
          <Route
            path={`/film/:id`}
            render={(props) => <MoviePage {...props} />}
          />

          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
