import React from "react";
import "./MainPage.css";
import Header from "./header/Header";
import SearchPanel from "./search-panel/SearchPanel";
import SortPanel from "./sort-panel/SortPanel";
import MovieList from "./movie-list/MovieList";
import Footer from "./footer/Footer";
import { parse, stringify } from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { requestMovies, reset } from "../../redux/reducers/moviesReducer";
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
  reset,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

class MainPage extends React.Component<PropsFromRedux, {}> {
  handleSearch = (search: string, searchBy: string) => {
    const parsed = parse(this.props.history.location.search) as {
      sortBy: string;
    };
    const urlParams = stringify({ ...parsed, search, searchBy });
    this.props.history.push({
      pathname: "/search",
      search: urlParams,
    });
  };

  handleSort = (sortBy: string) => {
    const parsed = parse(this.props.history.location.search) as {
      search: string;
      searchBy: string;
    };
    const urlParams = stringify({ ...parsed, sortBy });
    this.props.history.push({
      pathname: "/search",
      search: urlParams,
    });
  };

  componentDidMount() {
    this.uploadMovies();
  }

  componentDidUpdate(prevprops: RouteComponentProps) {
    if (this.props.location.search !== prevprops.location.search) {
      this.uploadMovies();
    }
  }

  // componentWillUnmount() {
  //   this.props.reset();
  // }

  uploadMovies() {
    const parsed = parse(this.props.history.location.search) as {
      search: string;
      searchBy: string;
      sortBy: string;
    };
    let { search, searchBy, sortBy } = parsed;
    this.props.requestMovies(search, searchBy, sortBy, 0);
  }

  uploadMoreMovies = () => {
    const parsed = parse(this.props.history.location.search) as {
      search: string;
      searchBy: string;
      sortBy: string;
    };
    let { search, searchBy, sortBy } = parsed;
    this.props.requestMovies(
      search,
      searchBy,
      sortBy,
      this.props.movies.length + 10
    );
  };

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Header />
          <SearchPanel handleSearch={this.handleSearch} />
          <SortPanel
            handleSort={this.handleSort}
            movieCount={this.props.movies.length}
          />

          <InfiniteScroll
            dataLength={this.props.movies.length} //This is important field to render the next data
            next={this.uploadMoreMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
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

export default connector(MainPage);
