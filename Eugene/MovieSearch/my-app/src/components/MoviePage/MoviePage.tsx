import React, { useEffect } from "react";
import "./MoviePage.css";
import MovieDetailHeader from "./MovieDetailHeader/MovieDetailHeader";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieSortPanel from "./MovieSortPanel/MovieSortPanel";
import MovieList from "../MainPage/movie-list/MovieList";
import Footer from "../MainPage/footer/Footer";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MoviesState,
  requestMovie,
  requestMovies,
} from "../../redux/reducers/moviesReducer";
import { RootState } from "../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";

interface MatchParams {
  id: string;
}

enum SortBy {
  Rating = "vote_average",
  ReleaseDate = "release_date",
}

enum SearchBy {
  Title = "title",
  Genre = "genres",
}

type PropsFromRedux = RouteComponentProps & RouteComponentProps<MatchParams>;

function MoviePage(props: PropsFromRedux) {
  const movies = useSelector<RootState, MoviesState>((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    uploadMovieAndMovieByGenre();
  }, [props.match.params.id]);

  const uploadMovieAndMovieByGenre = () => {
    dispatch(requestMovie({ id: props.match.params.id }));
  };

  const uploadMoreMovies = () => {
    let search = movies.movie.genres[0];
    dispatch(
      requestMovies({
        search: search,
        searchBy: SearchBy.Genre,
        sortBy: SortBy.ReleaseDate,
        offset: movies.movies.length + 10,
      })
    );
  };

  const checkMoviesEnd = (): boolean => {
    if (movies.movies.length < movies.totalMovies - 10) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <MovieDetailHeader />
        <MovieDetail movie={movies.movie} />
        <MovieSortPanel genre={movies.movie.genres[0]} />
        <InfiniteScroll
          dataLength={movies.movies.length} //This is important field to render the next data
          next={uploadMoreMovies}
          hasMore = {checkMoviesEnd()}
          loader={<h4></h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <MovieList movies={movies.movies} />
        </InfiniteScroll>
        <Footer />
      </div>
    </div>
  );
}

export default MoviePage;
