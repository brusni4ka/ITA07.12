import React from "react";
import "./MovieSortPanel.css";

interface IMovieSortPanelProps {
  genre: string;
}

class MovieSortPanel extends React.Component<IMovieSortPanelProps> {
  render() {
    return (
      <div className="sort-panel-wrapper">
        <div className="movie-count">
          <span> Films by {this.props.genre} genre </span>
        </div>
      </div>
    );
  }
}

export default MovieSortPanel;
