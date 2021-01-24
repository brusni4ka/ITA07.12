import React from "react";
import "./Movie.css";

interface IMovieProps {
  movie: {
    id: number;
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: string[];
    runtime: number;
  };
}

class Movie extends React.Component<IMovieProps, {}> {
  render() {
    return (
      <div>
        <div className="movie">
          <img
            src={this.props.movie.poster_path}
            alt={this.props.movie.title}
          />
          <div className="description">
            <div className="title-date">
              <div className="title">{this.props.movie.title}</div>
              <div className="release-date">{this.props.movie.release_date.substr(0, 4)}</div>
            </div>
          <div className="ganres">
            {this.props.movie.genres.map((ganre, index) => {
              return <span key={index}>{ganre}</span>
            })}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
