import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Header from "./header/Header";
import SearchPanel from "./search-panel/SearchPanel";
import SortPanel from "./sort-panel/SortPanel";
import MovieList from "./movie-list/MovieList";
import Footer from "./footer/Footer";
import { parse, stringify } from "query-string";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { MoviesState } from "../../redux/reducers/moviesReducer";
import { requestMovies } from "../../redux/reducers/moviesReducer";

type PropsFromRedux = RouteComponentProps;

function MainPage(props: PropsFromRedux) {
  const history = useHistory();
  const location = useLocation();

  const movies = useSelector<RootState, MoviesState>((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    uploadMovies();
  }, [location.search]);

  const handleSearch = (search: string, searchBy: string) => {
    const parsed = parse(location.search) as {
      sortBy: string;
    };
    const urlParams = stringify({ ...parsed, search, searchBy });
    history.push({
      pathname: "/search",
      search: urlParams,
    });
  };

  const handleSort = (sortBy: string) => {
    const parsed = parse(location.search) as {
      search: string;
      searchBy: string;
    };
    const urlParams = stringify({ ...parsed, sortBy });
    history.push({
      pathname: "/search",
      search: urlParams,
    });
  };

  const uploadMovies = (offset = 0) => {
    const parsed = parse(location.search) as {
      search: string;
      searchBy: string;
      sortBy: string;
    };
    let { search, searchBy, sortBy } = parsed;
    dispatch(
      requestMovies({
        search: search,
        searchBy: searchBy,
        sortBy: sortBy,
        offset: offset,
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
        <Header />
        <SearchPanel handleSearch={handleSearch} />
        <SortPanel handleSort={handleSort} movieCount={movies.movies.length} />

        <InfiniteScroll
          dataLength={movies.movies.length} //This is important field to render the next data
          next={() => {
            uploadMovies(movies.movies.length + 10);
          }}
          hasMore={checkMoviesEnd()}
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

export default MainPage;
