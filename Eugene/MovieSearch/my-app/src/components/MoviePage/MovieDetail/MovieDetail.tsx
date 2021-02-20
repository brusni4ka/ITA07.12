import "./MovieDetail.css";
import IMovie from "../../../interface/IMovie/IMovie";

interface IMovieDetailProps {
  movie: IMovie;
}

function MovieDetail(props: IMovieDetailProps) {
  return (
    <div className="movie-detail">
      <div className="movie-img-block">
        <img
          className="movie_img"
          src={props.movie.poster_path}
          alt={props.movie.title}
        />
      </div>
      <div className="movie-description">
        <div className="movie-info">
          <h3 className="movie-title">{props.movie.title}</h3>
          <span className="movie-rate">{props.movie.vote_average}</span>
        </div>
        <span className="movie-tagline">{props.movie.tagline}</span>

        <div className="movie-year-time">
          <span className="movie-year">
            {props.movie.release_date.substring(0, 4)}
          </span>
          <span className="movie-time">{props.movie.runtime} min</span>
        </div>
        <p className="movie_overview">{props.movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
