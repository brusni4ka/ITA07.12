import React from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import MoviePage from "./components/MoviePage/MoviePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/search" component={MainPage} />
              <Route path="/movies/:id" component={MoviePage} />
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
