import React from 'react';
import {Link} from "react-router-dom";
import SearchForm from './searchForm';
import SortBlock from './sortBlock';
import headerBg from './images/headerBg.jpg';




 interface IHeaderProps {
   moviesCount: number;
   searchInputValue: string;
   changeSearchInputValue(e: React.ChangeEvent<HTMLInputElement>): void; 
   searchBy: string;
   setSearchByTitle(): void;
   setSearchByGenre(): void;
 }

 const Header = (props: IHeaderProps) => {      
        const {moviesCount, searchInputValue, changeSearchInputValue, searchBy,
               setSearchByTitle, setSearchByGenre} = props;
        return (
          <>
            <header className="header">                                 
                <Link className = "logoLink" to = "/">netflixroulette</Link>
                <SearchForm searchInputValue = {searchInputValue} 
                            changeSearchInputValue = {changeSearchInputValue}
                            searchBy = {searchBy}  setSearchByTitle = {setSearchByTitle} 
                            setSearchByGenre ={setSearchByGenre}/>            
            </header>
            <div className="headerBottomBlock">
                <div className="moviesQuantityBlock">
                   <p className="moviesQuantity">{moviesCount} movies found</p>
                </div>
                <SortBlock />                
            </div>

          </>
        );   

}




export default Header;