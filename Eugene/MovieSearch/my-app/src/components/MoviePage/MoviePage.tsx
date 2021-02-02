import React from "react";
import "./MoviePage.css";
import IMovie from "../../interface/IMovie/IMovie";
import MovieDetailHeader from "./MovieDetailHeader/MovieDetailHeader";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieSortPanel from "./MovieSortPanel/MovieSortPanel";
import MovieList from "../MainPage/movie-list/MovieList";
import Footer from "../MainPage/footer/Footer";

import { RouteComponentProps } from "react-router-dom";

interface IMoviePageProps extends RouteComponentProps {
  movies: IMovie[];
  updateMovies(value: IMovie[]): void;
}

interface IMoviePageState {
  movie: IMovie;
}

class MoviePage extends React.Component<IMoviePageProps, IMoviePageState> {
  state: IMoviePageState = {
    movie: {
      id: 0,
      title: "",
      tagline: "",
      vote_average: 0,
      vote_count: 0,
      release_date: "",
      poster_path: "",
      overview: "",
      budget: 0,
      revenue: 0,
      genres: [],
      runtime: 0,
    },
  };

  componentDidMount() {
    this.uploadMovieAndMovieByGenre();
  }

  componentDidUpdate(prevprops: RouteComponentProps) {
    if (this.props.location.pathname != prevprops.location.pathname) {
      this.uploadMovieAndMovieByGenre();
    }
  }

  uploadMovieAndMovieByGenre() {
    fetch(
      `https://reactjs-cdp.herokuapp.com${this.props.history.location.pathname}`
    )
      .then((response) => response.json())
      .then((receivedData) => {
        this.setState({ movie: receivedData });
        return fetch(
          `https://reactjs-cdp.herokuapp.com/movies?search=${this.state.movie.genres[0]}&searchBy=genres`
        );
      })
      .then((response) => response.json())
      .then((receivedData) => {
        console.log(this.state.movie.genres[0]);
        this.props.updateMovies(receivedData.data);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <MovieDetailHeader />
          <MovieDetail movie={this.state.movie} />
          <MovieSortPanel genre={this.state.movie.genres[0]} />
          <MovieList movies={this.props.movies} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default MoviePage;
