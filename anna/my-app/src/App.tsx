import React from 'react';
// import './App.css';
import HomePage from './pages/home';
import MoviePage from './pages/moviePage';
import NotFoundPage from './pages/notFoundPage';
import ErrorBoundary from './components/errorBoundary';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {

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

export default App;
