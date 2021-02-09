import React from "react";
import MovieInterface from "../../interfaces/movieInterface";
import Movie from "./movie";
import ErrorBoundary from "../errorBoundary";
import Loader from "../loader";

import "./moviesContainer.css";
import ReactPaginate from "react-paginate";

interface MoviesContainerProps {
  movies: MovieInterface[];
  loading: boolean;
  total: number;
  getPage: () => number;
  onPageChanged: (selected: number) => void;
}

const MoviesContainer = ({
  movies,
  loading,
  total,
  getPage,
  onPageChanged,
}: MoviesContainerProps) => {
  const renderMovies = (): JSX.Element => {
    return (
      <div className="movies-wrapper">
        <ErrorBoundary>
          {movies.map((movie, i) => {
            if ((i + 1) % 3 === 0)
              return <Movie key={movie.id} movie={movie} hasMargin={false} />;
            return <Movie key={movie.id} movie={movie} hasMargin={true} />;
          })}
          <ReactPaginate
            pageCount={Math.ceil(total / 9)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            containerClassName="paginate-wrapper"
            initialPage={getPage()}
            forcePage={getPage()}
            pageLinkClassName="page-number"
            activeLinkClassName="page-number-active"
            onPageChange={({ selected }) => onPageChanged(selected)}
            disableInitialCallback
          />
        </ErrorBoundary>
      </div>
    );
  };
  if (loading) {
    return (
      <div className="movies-loader">
        <Loader />
      </div>
    );
  }
  if (movies.length) {
    return renderMovies();
  }

  return (
    <div className="movies-wrapper">
      <p className="nothing-msg">No films found</p>
    </div>
  );
};

export default MoviesContainer;
