import * as React from "react";

import ContentContainer from "../../components/contentContainer";
import FirstScreen from "../../components/firstScreen";
import SecondScreen from "../../components/secondScreen";
import ThirdScreen from "../../components/thirdScreen";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import MoviesContainer from "../../components/moviesContainer";
import ErrorBoundary from "../../components/errorBoundary";
import MovieInterface from "../../interfaces/movieInterface";
import MoviesResult from "../../components/moviesResult";
import SortFilter from "../../components/sortFilter";

import "./mainpage.css";
interface MainPageProps {
  movies: MovieInterface[];
  searchedMovies: null | MovieInterface[];
  currentSortType: string;
  setCurrentSortType: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  searchMovies: (value: string, category: string) => MovieInterface[];
  setSearchedMovies: (searchedMovies: MovieInterface[]) => void;
}
const MainPage = (props: MainPageProps) => {
  const {
    searchedMovies,
    movies,
    currentSortType,
    setCurrentSortType,
    searchMovies,
    setSearchedMovies,
  } = props;
  const moviesToDisplay = searchedMovies ? searchedMovies : movies;
  const renderPanel = () => {
    return (
      <>
        <ErrorBoundary>
          <MoviesResult searchedMovies={searchedMovies} />
        </ErrorBoundary>
        <ErrorBoundary>
          <SortFilter
            currentSortType={currentSortType}
            setCurrentSortType={setCurrentSortType}
          />
        </ErrorBoundary>
      </>
    );
  };

  return (
    <div className="app">
      <FirstScreen>
        <ContentContainer>
          <Header moviePage={false} />
          <ErrorBoundary>
            <SearchBar
              searchMovies={searchMovies}
              setSearchedMovies={setSearchedMovies}
            />
          </ErrorBoundary>
        </ContentContainer>
      </FirstScreen>
      <SecondScreen>
        <ContentContainer>
          <div className="flex-wrapper">
            {searchedMovies?.length !== 0 ? renderPanel() : null}
          </div>
        </ContentContainer>
      </SecondScreen>
      <ThirdScreen>
        <ContentContainer>
          <ErrorBoundary>
            <MoviesContainer movies={moviesToDisplay} />
          </ErrorBoundary>
        </ContentContainer>
      </ThirdScreen>
    </div>
  );
};

export default MainPage;
