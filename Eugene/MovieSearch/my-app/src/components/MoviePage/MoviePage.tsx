import React, { useEffect } from "react";
import "./MoviePage.css";
import MovieDetailHeader from "./MovieDetailHeader/MovieDetailHeader";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieSortPanel from "./MovieSortPanel/MovieSortPanel";
import MovieList from "../MainPage/movie-list/MovieList";
import Footer from "../MainPage/footer/Footer";
import { RouteComponentProps, useHistory } from "react-router-dom";

import { connect, ConnectedProps } from "react-redux";
import {
  requestMovie,
  requestMovies,
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
};

interface MatchParams {
  id: string;
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector> &
  RouteComponentProps &
  RouteComponentProps<MatchParams>;

  function MoviePage(props: PropsFromRedux) {
    let history = useHistory();

    useEffect(() => {
      uploadMovieAndMovieByGenre();
    }, [history.location]);
    const uploadMovieAndMovieByGenre = () => {
      props.requestMovie({id: props.match.params.id});
    }
  
    const uploadMoreMovies = () => {
      let search = props.movie.genres[0];
        props.requestMovies({search:search, searchBy:"genres", sortBy:"vote_average", offset:props.movies.length + 10});
    };

    return (
      <div className="wrapper">
        <div className="container">
          <MovieDetailHeader />
          <MovieDetail movie={props.movie} />
          <MovieSortPanel genre={props.movie.genres[0]} />
          <InfiniteScroll
            dataLength={props.movies.length} //This is important field to render the next data
            next={uploadMoreMovies}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <MovieList movies={props.movies} />
          </InfiniteScroll>
          <Footer />
        </div>
      </div>
    );
  }

export default connector(MoviePage);
