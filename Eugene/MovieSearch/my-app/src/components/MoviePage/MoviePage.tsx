import React from "react";
import "./MoviePage.css";
import IMovie from "../../interface/IMovie/IMovie";
import MovieDetailHeader from "./MovieDetailHeader/MovieDetailHeader";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieSortPanel from "./MovieSortPanel/MovieSortPanel";
import Main from "../MainPage/main/Main";
import Footer from "../MainPage/footer/Footer";

interface IMoviePageState {
  movies: IMovie[];
}

class MoviePage extends React.Component<{}, IMoviePageState> {
  state: IMoviePageState = {
    movies: [],
  };

  componentDidMount() {
    fetch(`https://reactjs-cdp.herokuapp.com/movies?limit=9`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ movies: responseData.data });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <MovieDetailHeader />
          <MovieDetail />
          <MovieSortPanel/>
          <Main movies={this.state.movies}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default MoviePage;
