import React from "react";
import "./MoviePage.css";
import MovieDetailHeader from "./MovieDetailHeader/MovieDetailHeader";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieSortPanel from "./MovieSortPanel/MovieSortPanel";
import MovieList from "../MainPage/movie-list/MovieList";
import Footer from "../MainPage/footer/Footer";
import { RouteComponentProps } from "react-router-dom";

import { connect, ConnectedProps } from "react-redux";
import {
  requestMovie,
  requestMovies,
  reset,
} from "../../redux/reducers/moviesReducer";
import { RootState } from "../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";

const mapStateToProps = (state: RootState) => {
  return {
    movie: state.movies.movie,
    movies: state.movies.movies,
    loading: state.movies.loading,
  };
};

const mapDispatchToProps = {
  requestMovie,
  requestMovies,
  reset,
};

interface MatchParams {
  id: string;
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector> &
  RouteComponentProps &
  RouteComponentProps<MatchParams>;

class MoviePage extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.uploadMovieAndMovieByGenre();
  }

  componentDidUpdate(prevprops: RouteComponentProps) {
    if (this.props.location.pathname !== prevprops.location.pathname) {
      this.uploadMovieAndMovieByGenre();
    }
  }

  // componentWillUnmount() {
  //   this.props.reset();
  // }

  uploadMovieAndMovieByGenre() {
    this.props.requestMovie(this.props.match.params.id);
  }

  uploadMoreMovieAndMovieByGenre = () => {
    let search = this.props.movie.genres[0];
    this.props.requestMovies(
      search,
      "genres",
      "rating",
      this.props.movies.length + 10
    );
  };

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <MovieDetailHeader />
          <MovieDetail movie={this.props.movie} />
          <MovieSortPanel genre={this.props.movie.genres[0]} />
          <InfiniteScroll
            dataLength={this.props.movies.length} //This is important field to render the next data
            next={this.uploadMoreMovieAndMovieByGenre}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <MovieList movies={this.props.movies} />
          </InfiniteScroll>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connector(MoviePage);
