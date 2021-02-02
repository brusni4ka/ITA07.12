import React from "react";
import "./MainPage.css";
import Header from "./header/Header";
import SearchPanel from "./search-panel/SearchPanel";
import SortPanel from "./sort-panel/SortPanel";
import IMovie from "../../interface/IMovie/IMovie";
import MovieList from "./movie-list/MovieList";
import Footer from "./footer/Footer";
import { parse, stringify } from "query-string";

import { RouteComponentProps } from "react-router-dom";

interface IMainPageProps extends RouteComponentProps {
  movies: IMovie[];
  updateMovies(value: IMovie[]): void;
}

class MainPage extends React.Component<IMainPageProps> {
  handleSearch = (search: string, searchBy: string) => {
    const urlParams = stringify({ search, searchBy });
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
    if (this.props.location.search != prevprops.location.search) {
      this.uploadMovies();
    }
  }

  uploadMovies() {
    if (this.props.history.location.pathname == "/search") {
      fetch(
        `https://reactjs-cdp.herokuapp.com/movies${this.props.history.location.search}`
      )
        .then((response) => response.json())
        .then((receivedData) => {
          this.props.updateMovies(receivedData.data);
        });
    } else {
      fetch(
        `https://reactjs-cdp.herokuapp.com/movies?sortBy=vote_average&limit=9`
      )
        .then((response) => response.json())
        .then((receivedData) => {
          this.props.updateMovies(receivedData.data);
        });
    }
  }

  render() {
    console.log();
    return (
      <div className="wrapper">
        <div className="container">
          <Header />
          <SearchPanel
            handleSearch={this.handleSearch}
          />
          <SortPanel
            handleSort={this.handleSort}
            movieCount={this.props.movies.length}
          />
          <MovieList movies={this.props.movies} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default MainPage;
