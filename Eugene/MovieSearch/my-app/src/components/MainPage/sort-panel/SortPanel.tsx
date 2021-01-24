import React from "react";
import "./SortPanel.css";
// import IMovie from "../../interface/IMovie/IMovie";

interface ISortPanelProps {
  movieCount: number;
}

interface ISortPanelState {
  sortBy: string;
}

class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {
  state: ISortPanelState = {
    sortBy: "rating",
  };

  handleSearchByBtn = (btnType: string) => {
    this.setState({
      sortBy: btnType,
    });
  };

  render() {
    return (
      <div className="sort-panel-wrapper">
        <div className="movie-count">
          <span>{this.props.movieCount} movies found</span>
        </div>
        <div className="sort-by">
          <span>Sort by</span>
          <button
            onClick={() => this.handleSearchByBtn("releaseDate")}
            className={
              this.state.sortBy === "releaseDate"
                ? "sort-by-btn-active"
                : "sort-by-btn"
            }
          >
            release date
          </button>
          <button
            onClick={() => this.handleSearchByBtn("rating")}
            className={
              this.state.sortBy === "rating"
                ? "sort-by-btn-active"
                : "sort-by-btn"
            }
          >
            rating
          </button>
        </div>
      </div>
    );
  }
}

export default SortPanel;
