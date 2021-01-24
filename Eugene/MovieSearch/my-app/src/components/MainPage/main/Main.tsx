import React from "react";
import "./Main.css";
import IMovie from "../../../interface/IMovie/IMovie";
import Movie from "../movie/Movie";

interface IMainProps {
  movies: IMovie[];
}

class Main extends React.Component<IMainProps,{}> {
  render() {
    return (
      <main>
        {this.props.movies.map((movie)=> <Movie key={movie.id} movie={movie}></Movie>)}
      </main>
    );
  }
}

export default Main;
