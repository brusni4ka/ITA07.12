import React, { Component } from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";
import SortProperty from "./enums/SortProperty";

import PageNotFound from "./pages/pageNotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

interface AppState {
  currentSortType: SortProperty;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    currentSortType: SortProperty.date,
  };

  setCurrentSortType = (currentSortType: SortProperty): void => {
    this.setState({ currentSortType });
  };

  render() {
    const { currentSortType } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path={["/", "/search"]}
            render={(props) => (
              <MainPage
                {...props}
                currentSortType={currentSortType}
                setCurrentSortType={this.setCurrentSortType}
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
