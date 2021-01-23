import React from 'react';
import Layout from '../../components/layout';
import './homePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SearchForm from '../../components/searchForm';
import { ISearchFormState } from '../../components/searchForm/SearchForm';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';

interface IHomeState {
  movies: Array<IMovie>
}

class HomePage extends React.Component<{}, IHomeState> {

  state: IHomeState = {
    movies: []
  }

  componentDidMount() {
    fetch('https://reactjs-cdp.herokuapp.com/movies')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ movies: responseData.data })
      });
  }

  searchFilms = ({ value, searchBy }: ISearchFormState) => console.log(value, searchBy);
  sortFilms = (sortBy: string) => console.log(sortBy);


  render() {
    return (
      <Layout className="home-page" pageName={'home'}>
        <section className="section-dark">
          <Container>
            <h1 className="section-dark-title">find your movie</h1>
            <SearchForm onSubmit={this.searchFilms} />
          </Container>            
          </section>
          <section className="section">
            <SortBox movieCount={this.state.movies.length} sortFilms={this.sortFilms} />
            <MovieList className="container" movies={this.state.movies} />
          </section>
      </Layout>
          
        
    )
  }
}

export default HomePage;
