import React from 'react';
// import './App.css';
import HomePage from './pages/home';
import MoviePage from './pages/moviePage';
import NotFoundPage from './pages/notFoundPage';
import IMovie from './components/movieList/movie-card/IMovie';
import ErrorBoundary from './components/errorBoundary';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

interface IAppState {
  movies: IMovie[];
}

class App extends React.Component<{}, IAppState> {

  state: IAppState = {
    movies: []
  }

  changeMovies = (movies: IMovie[]) => {
    this.setState({ movies });
  }

  render() {
    return (
      <Router>
        <Switch>
          <ErrorBoundary>
            <Route exact path={["/", "/search"]} render={props => (

              <HomePage movies={this.state.movies} changeMovies={this.changeMovies} {...props} />

            )}
            />
            <Route exact path="/film/:id" component={MoviePage} />
            <Route path="*" exact component={NotFoundPage} />           
          </ErrorBoundary>
        </Switch>
      </Router>
    );
  }
}

export default App;
