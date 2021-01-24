import React from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import MoviePage from "./components/MoviePage/MoviePage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MainPage />
        {/* <MoviePage /> */}
      </div>
    );
  }
}

export default App;
