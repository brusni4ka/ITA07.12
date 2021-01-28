import React, { Component } from "react";
import SortProperty from "../../enums/SortProperty";
import "./sortFilter.css";

interface SortFilterProps {
  currentSortType: string;
  switchCurrentSortType(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
}
export default class SortFilter extends Component<SortFilterProps> {
  render() {
    const { currentSortType, switchCurrentSortType } = this.props;
    return (
      <div className="movie-panel_sort-filter">
        Sort by
        <button
          value={SortProperty.date}
          className={
            currentSortType === SortProperty.date
              ? "movie-panel_sort-filter-btn sort-filter-active"
              : "movie-panel_sort-filter-btn"
          }
          onClick={switchCurrentSortType}
        >
          release date
        </button>
        <button
          value={SortProperty.rating}
          className={
            currentSortType === SortProperty.rating
              ? "movie-panel_sort-filter-btn sort-filter-active"
              : "movie-panel_sort-filter-btn"
          }
          onClick={switchCurrentSortType}
        >
          rating
        </button>
      </div>
    );
  }
}
