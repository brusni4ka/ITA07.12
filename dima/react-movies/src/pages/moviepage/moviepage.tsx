import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import ContentContainer from "../../components/contentContainer";
import CurrentMovieGenreFilter from "../../components/currentMovieGenreFilter";
import ErrorBoundary from "../../components/errorBoundary";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MoviePresent from "../../components/moviePresent/moviePresent";
import MoviesContainer from "../../components/moviesContainer";
import QueryString from "query-string";
import { MovieConnectProps } from ".";
import "./moviepage.css";

class MoviePage extends Component<
  MovieConnectProps & RouteComponentProps<{ id: string }>
> {
  componentDidMount() {
    this.checkPageNumbersAndFechMovie();
  }
  componentDidUpdate(
    prevProps: MovieConnectProps & RouteComponentProps<{ id: string }>
  ) {
    if (this.props.location !== prevProps.location) {
      this.checkPageNumbersAndFechMovie();
    }
  }

  checkPageNumbersAndFechMovie() {
    const params = QueryString.parse(this.props.history.location.search);
    let pageNum = params.page ? Number(params.page.toString()) - 1 : 0;
    this.fetchAllMovies(pageNum);
  }
  componentWillUnmount() {
    this.props.resetMovie();
  }
  fetchAllMovies(pageNum: number): void {
    const { id } = this.props.match.params;
    this.props.fetchMovie(id, pageNum * 9);
  }

  getPage = (): number => {
    const { history } = this.props;
    const params = QueryString.parse(history.location.search);
    const numPage =
      params.page && Number(params.page.toString()) - 1 >= 0
        ? Number(params.page.toString()) - 1
        : 0;
    return numPage;
  };
  onPageChanged = (selected: number): void => {
    const { history } = this.props;
    const params = QueryString.parse(history.location.search);
    history.push({
      pathname: history.location.pathname,
      search: QueryString.stringify({ ...params, page: selected + 1 }),
    });
  };

  render() {
    const { movie, movies, loadingMovie, loadingMovies } = this.props;

    return (
      <div className="app">
        <div className="first-screen-wrapper">
          <ContentContainer>
            <Header showSearchBtn />
            <ErrorBoundary>
              <MoviePresent movie={movie} loading={loadingMovie} />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        {movie?.genres && (
          <div className="second-screen-wrapper">
            <ContentContainer>
              <CurrentMovieGenreFilter genre={movie.genres[0]} />
            </ContentContainer>
          </div>
        )}
        {movie && (
          <div className="third-screen-wrapper">
            <ContentContainer>
              <MoviesContainer
                movies={movies.data}
                total={movies.total}
                page={this.getPage()}
                loading={loadingMovies}
                onPageChanged={this.onPageChanged}
              />
            </ContentContainer>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default MoviePage;
