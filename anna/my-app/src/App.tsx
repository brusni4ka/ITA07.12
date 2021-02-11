import React from 'react';
// import './App.css';
import HomePage from './pages/home';
import MoviePage from './pages/moviePage';
import NotFoundPage from './pages/notFoundPage';
import ErrorBoundary from './components/errorBoundary';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// interface IAppState {
//   movies: IMovie[];
// }

class App extends React.Component {

  // state: IAppState = {
  //   movies: []
  // }

  // changeMovies = (movies: IMovie[]) => {
  //   this.setState({ movies });
  // }

  render() {

    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route exact path={["/", "/search"]} component={HomePage} />
            <Route path="/film/:id" component={MoviePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ErrorBoundary>
    );
  }
}


// import {setMovies} from './pages/home/searchMovieActions'
// import HomePage from './HomePage'

// const mapStateToProps = (state: IRootState) => {
//   return {
//     movies: state.movies,
// sortBy: state.movies.sortBy
//   }
// }
// const mapDispatchToProps = {
//   setMovies
// }
// const connector = connect(mapStateToProps, mapDispatchToProps);
// export type MoviesConnectedProps = ConnectedProps<typeof connector>
// export default connector(App);


export default App;
