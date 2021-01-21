import * as React from "react";
import { Component } from "react";
import "./sortFilter.css";
interface SortFilterProps {
  currentSortType: string;
  setCurrentSortType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
export default class SortFilter extends Component<SortFilterProps> {
  render() {
    const { currentSortType, setCurrentSortType } = this.props;
    return (
      <div className="movie-panel_sort-filter">
        Sort by
        <button
          value="release date"
          className={
            currentSortType === "release date"
              ? "movie-panel_sort-filter-btn sort-filter-active"
              : "movie-panel_sort-filter-btn"
          }
          onClick={(e) => setCurrentSortType(e)}
        >
          release date
        </button>
        <button
          value="rating"
          className={
            currentSortType === "rating"
              ? "movie-panel_sort-filter-btn sort-filter-active"
              : "movie-panel_sort-filter-btn"
          }
          onClick={(e) => setCurrentSortType(e)}
        >
          rating
        </button>
      </div>
    );
  }
}
