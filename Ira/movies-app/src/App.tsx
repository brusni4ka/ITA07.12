import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import HomePage from './components/homePage';
import MoviePage from './components/moviePage';



function App() {
  return (    
    <Router>
        <Switch>
            <Route exact path = "/" component = {HomePage}/>
            <Route path = "/moviePage" component = {MoviePage}/>                           
       </Switch>
   </Router>
 );
}

export default App;
