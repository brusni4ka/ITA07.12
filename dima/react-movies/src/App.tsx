import React, { Component } from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";

import PageNotFound from "./pages/pageNotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={["/", "/search"]} component={MainPage} />

          <Route path={`/film/:id`} component={MoviePage} />

          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
