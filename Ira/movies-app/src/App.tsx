import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, RouteComponentProps} from "react-router-dom";
import HomePage from './components/homePage';
import MoviePage from './components/moviePage';
import ErrorPage from './components/404';


function App() {
  return (    
    <Router>
        <Switch>
            <Route exact path = "/" component = {HomePage}/>
            <Route path = "/search" component = {HomePage} />
            
            <Route path = "/movie/:id" component = {MoviePage}/> 
            <Route path = "/" render = {() => <ErrorPage/> }  />                  
       </Switch>
   </Router>
 );
}

export default App;
