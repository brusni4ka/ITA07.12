import React from 'react';
import Link from "react-router-dom";
import Header from './header';
import moviesData from './moviesData';
import MovieCard from './movieCard'; 
import NotFound from './notFound'; 
import Layout from './layout';



interface IHomePageState {
   filteredMovies: Array<{}>;
   searchInputValue: string;
   searchBy: string;   
   moviesCount: number;
}

class HomePage extends React.Component<IHomePageState> {   
   
   state = {
      filteredMovies: [{}],   
      searchInputValue: "",
      searchBy: "title",
      moviesCount: 0
   }

   changeSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({searchInputValue: e.target.value});
   }
   
   setMoviesCount = () => {
      this.setState({moviesCount: this.state.filteredMovies.length});
   }
  
   setSearchByTitle = () => {
      this.setState({searchBy: "title"});
   }
   
   setSearchByGenre = () => {
      this.setState({searchBy: "genre"});
   }
   
  
   render() {
      const {moviesCount, searchInputValue,  searchBy} = this.state;

      return (
         <div>
            <Layout>          
               <Header moviesCount = {moviesCount} searchInputValue = {searchInputValue}
                       changeSearchInputValue = {this.changeSearchInputValue} searchBy = {searchBy}
                       setSearchByTitle = {this.setSearchByTitle}  setSearchByGenre = {this.setSearchByGenre}/>
               <main>
                  <section className="moviesBlock">
                     
                     {moviesData.map((item) => {
                        return (
                           <div className = "movieCardWrapper" key = {item.id}>
                              <MovieCard movie = {item}                                            
                               />           
                           </div>         
                        );       
                     }                   
                  )}      
              
                  </section>                  
               </main>          
          </Layout>
       </div>
       
      );
   } 

}



export default HomePage;