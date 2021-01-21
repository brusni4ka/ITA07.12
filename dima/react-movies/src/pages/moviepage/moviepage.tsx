import * as React from "react";
import { Component } from "react";
import Movies from "../../api/movies";
import ContentContainer from "../../components/contentContainer";
import CurrentMovieGenreFilter from "../../components/currentMovieGenreFilter";
import ErrorBoundary from "../../components/errorBoundary";
import FirstScreen from "../../components/firstScreen";
import Header from "../../components/header";
import MoviePresent from "../../components/moviePresent/moviePresent";
import MoviesContainer from "../../components/moviesContainer";
import SecondScreen from "../../components/secondScreen";
import ThirdScreen from "../../components/thirdScreen";
import MovieInterface from "../../interfaces/movieInterface";

interface MoviePageProps {
  movie: MovieInterface;
  movies: MovieInterface[];
}

const MoviePage = (props: MoviePageProps) => {
  const hasGenre = (item: MovieInterface): boolean => {
    const { movie } = props;
    if (item.id !== props.movie.id) {
      for (let genre of movie.genres) {
        if (item.genres.indexOf(genre) >= 0) return true;
      }
    }
    return false;
  };
  const { movie, movies } = props;
  return (
    <div className="app">
      <FirstScreen>
        <ContentContainer>
          <Header moviePage={true} />
          <ErrorBoundary>
            <MoviePresent movie={movie} />
          </ErrorBoundary>
        </ContentContainer>
      </FirstScreen>
      <SecondScreen>
        <ContentContainer>
          <CurrentMovieGenreFilter genres={movie.genres} />
        </ContentContainer>
      </SecondScreen>
      <ThirdScreen>
        <ContentContainer>
          <MoviesContainer movies={movies.filter((movie) => hasGenre(movie))} />
        </ContentContainer>
      </ThirdScreen>
    </div>
  );
};

export default MoviePage;
