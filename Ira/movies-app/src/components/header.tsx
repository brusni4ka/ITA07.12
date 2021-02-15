import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import SearchForm from './searchForm';
import SortBlock from './sortBlock';
import headerBg from './images/headerBg.jpg';
import {IMovieCard} from './homePage';




 interface IHeaderProps extends RouteComponentProps {      
   sortBy: string;     
   setSortByDate(): void;
   setSortByRating(): void;
   movies: IMovieCard[];    
  }

 const Header = (props: IHeaderProps) => {      
        const {sortBy, setSortByDate, setSortByRating, location, history, match, movies} = props;               
               
        return (
          <>
            <header className = {movies.length > 0 ? "header" :  "headerMarginBottom"}>                                 
                <Link className = "logoLink" to = "/">netflixroulette</Link>
                <SearchForm  location={location} history={history}
                  match={match} />            
            </header>
            {
             movies.length > 0 ? 
            <div className="headerBottomBlock">
                <div className="moviesQuantityBlock">
                   <p className="moviesQuantity">{movies.length} movies found</p>
                </div>
               
                <SortBlock sortBy = {sortBy} setSortByDate = {setSortByDate} 
                           setSortByRating = {setSortByRating}/>                
                            
            </div>
            : null
            }
          </>
        );   
 }




export default Header;