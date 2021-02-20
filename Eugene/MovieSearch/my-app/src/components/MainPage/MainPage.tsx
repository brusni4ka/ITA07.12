import React, { useEffect } from "react";
import "./MainPage.css";
import Header from "./header/Header";
import SearchPanel from "./search-panel/SearchPanel";
import SortPanel from "./sort-panel/SortPanel";
import MovieList from "./movie-list/MovieList";
import Footer from "./footer/Footer";
import { parse, stringify } from "query-string";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { requestMovies } from "../../redux/reducers/moviesReducer";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";

const mapStateToProps = (state: RootState) => {
  return {
    movies: state.movies.movies,
  };
};

const mapDispatchToProps = {
  requestMovies,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

function MainPage(props: PropsFromRedux) {
  let history = useHistory();

  useEffect(() => {
    uploadMovies();
  }, [history.location]);

  const handleSearch = (search: string, searchBy: string) => {
    const parsed = parse(history.location.search) as {
      sortBy: string;
    };
    const urlParams = stringify({ ...parsed, search, searchBy });
    history.push({
      pathname: "/search",
      search: urlParams,
    });
  };

  const handleSort = (sortBy: string) => {
    const parsed = parse(history.location.search) as {
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
    const parsed = parse(history.location.search) as {
      search: string;
      searchBy: string;
      sortBy: string;
    };
    let { search, searchBy, sortBy } = parsed;
    props.requestMovies({search:search, searchBy:searchBy, sortBy:sortBy, offset:offset});
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <SearchPanel handleSearch={handleSearch} />
        <SortPanel handleSort={handleSort} movieCount={props.movies.length} />

        <InfiniteScroll
          dataLength={props.movies.length} //This is important field to render the next data
          next={() => {
            uploadMovies(props.movies.length + 10);
          }}
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

export default connector(MainPage);
