import React from "react";
import "./MovieDetail.css";
import IMovie from "../../../interface/IMovie/IMovie";

interface IMovieDetailProps {
  movie: IMovie;
}

class MovieDetail extends React.Component<IMovieDetailProps> {
  render() {
    return (
      <div className="movie-detail">
        <div className="movie-img-block">
          <img
            className="movie_img"
            src={this.props.movie.poster_path}
            alt={this.props.movie.title}
          />
        </div>
        <div className="movie-description">
          <div className="movie-info">
            <h3 className="movie-title">{this.props.movie.title}</h3>
            <span className="movie-rate">{this.props.movie.vote_average}</span>
          </div>
          <span className="movie-tagline">{this.props.movie.tagline}</span>

          <div className="movie-year-time">
            <span className="movie-year">
              {this.props.movie.release_date.substring(0, 4)}
            </span>
            <span className="movie-time">{this.props.movie.runtime} min</span>
          </div>
          <p className="movie_overview">{this.props.movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
