import React from "react";
import "./MainPage.css";
import Header from "./header/Header";
import SearchPanel from "./search-panel/SearchPanel";
import SortPanel from "./sort-panel/SortPanel";
import IMovie from "../../interface/IMovie/IMovie";
import Main from "./main/Main";
import Footer from "./footer/Footer";

interface IMainPageState {
  movies: IMovie[];
}

class MainPage extends React.Component<{}, IMainPageState> {
  state: IMainPageState = {
    movies: [],
  };

  updateData = (value: IMovie[]) => {
    this.setState({ movies: value });
  };

  componentDidMount() {
    fetch(`https://reactjs-cdp.herokuapp.com/movies?limit=9`)
      .then((response) => response.json())
      .then((receivedData) => {
        this.setState({ movies: receivedData.data });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Header />
          <SearchPanel updateData={this.updateData} />
          <SortPanel movieCount={this.state.movies.length} />
          <Main movies={this.state.movies} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default MainPage;
