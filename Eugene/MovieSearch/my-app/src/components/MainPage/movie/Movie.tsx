import React from "react";
import "./Movie.css";
import IMovie from "../../../interface/IMovie/IMovie";

interface IMovieProps {
  movie: IMovie;
}

function Movie(props: IMovieProps) {
  return (
    <div>
      <div className="movie">
        <img src={props.movie.poster_path} alt={props.movie.title} />
        <div className="description">
          <div className="title-date">
            <div className="title">{props.movie.title}</div>
            <div className="release-date">
              {props.movie.release_date.substr(0, 4)}
            </div>
          </div>
          <div className="ganres">
            {props.movie.genres.map((ganre, index) => {
              return <span key={index}>{ganre}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
