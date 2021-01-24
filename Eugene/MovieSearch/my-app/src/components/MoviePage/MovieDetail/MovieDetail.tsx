import React from "react";
import "./MovieDetail.css";
import IMovie from "../../../interface/IMovie/IMovie";

interface IMovieDetailState {
  movie: IMovie;
}

class MovieDetail extends React.Component<{}, IMovieDetailState> {
  state: IMovieDetailState = {
    movie: {
      id: 399055,
      title: "The Shape of Water",
      tagline: "A Fairy Tale for Troubled Times",
      vote_average: 7.3,
      vote_count: 3200,
      release_date: "2017-12-01",
      poster_path:
        "https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg",
      overview:
        "An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.",
      budget: 19500000,
      revenue: 185545281,
      genres: ["Drama", "Fantasy", "Romance"],
      runtime: 123,
    },
  };

  render() {
    return (
      <div className="movie-detail">
        <div className="movie-img-block">
          <img
            className="movie_img"
            src={this.state.movie.poster_path}
            alt={this.state.movie.title}
          />
        </div>
        <div className="movie-description">
          <div className="movie-info">
            <h3 className="movie-title">{this.state.movie.title}</h3>
            <span className="movie-rate">{this.state.movie.vote_average}</span>
          </div>
          <span className="movie-tagline">{this.state.movie.tagline}</span>

          <div className="movie-year-time">
            <span className="movie-year">
              {this.state.movie.release_date.substring(0, 4)}
            </span>
            <span className="movie-time">{this.state.movie.runtime} min</span>
          </div>
          <p className="movie_overview">{this.state.movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
