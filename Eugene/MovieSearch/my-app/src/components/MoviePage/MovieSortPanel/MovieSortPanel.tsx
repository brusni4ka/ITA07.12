import React from "react";
import "./MovieSortPanel.css";

// interface IMovieSortPanelProps {
//   genre: string;
// }

class MovieSortPanel extends React.Component {
  render() {
    return (
      <div className="sort-panel-wrapper">
        <div className="movie-count">
          <span> Films by ... genre </span>
        </div>
      </div>
    );
  }
}

export default MovieSortPanel;
