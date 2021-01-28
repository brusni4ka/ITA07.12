import React from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import MoviePage from "./components/MoviePage/MoviePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import IMovie from "./interface/IMovie/IMovie";

interface IAppState {
  movies: IMovie[];
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    movies: [],
  };

  updateMovies = (value: IMovie[]) => {
    this.setState({ movies: value });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <MainPage
                  movies={this.state.movies}
                  updateMovies={this.updateMovies}
                  {...(props as RouteComponentProps)}
                />
              )}
            />
            <Route
              path="/search"
              render={(props) => (
                <MainPage
                  movies={this.state.movies}
                  updateMovies={this.updateMovies}
                  {...(props as RouteComponentProps)}
                />
              )}
            />
            <Route
              path="/movies/:id"
              render={(props) => (
                <MoviePage
                  updateMovies={this.updateMovies}
                  movies={this.state.movies}
                  {...(props as RouteComponentProps)}
                />
              )}
            />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
