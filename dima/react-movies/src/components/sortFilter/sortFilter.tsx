import React from "react";
import SortProperty from "../../enums/SortProperty";
import "./sortFilter.css";

interface SortFilterProps {
  currentSortType: SortProperty;
  switchCurrentSortType(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
}
const SortFilter = (props: SortFilterProps) => {
  const { currentSortType, switchCurrentSortType } = props;
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
};

export default SortFilter;
