import "./MovieSortPanel.css";

interface IMovieSortPanelProps {
  genre: string;
}

function MovieSortPanel(props: IMovieSortPanelProps) {
  return (
    <div className="sort-panel-wrapper">
      <div className="movie-count">
        <span> Films by {props.genre} genre </span>
      </div>
    </div>
  );
}

export default MovieSortPanel;
