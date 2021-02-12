
import React from 'react';
import { Link } from 'react-router-dom';
import IMovie from '../movie-card/IMovie';
import './movie.css';

interface IMovieCardPrewProps {
  movie: IMovie,
}

interface IMovieCardPrewState {
 isError: boolean,
}

class MovieCardPrew extends React.Component<IMovieCardPrewProps, IMovieCardPrewState> {

  state = {
    isError: false
  }

  handleError = () => {
    this.setState({
      isError: true
    })
    console.log('can`t load image')
  }

  render() {
    const { movie } = this.props;
    const { isError} = this.state;

    return (
      <Link to={`/film/${movie.id}`} className="movie-link">
        <div className="movie-card" >
          {isError && <div className="movie-card-img"></div>}
          <img src={movie.poster_path} className="movie-card-img" alt="movie poster" onError={this.handleError}
           style={{
            display: isError ? "none" : "initial"
          }}/>
          <div className="movie-card-body">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release-date">{movie.release_date.split('-')[0]}</p>
            <p className="ganre">{movie.genres.slice(0, 3).join(' & ')}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default MovieCardPrew;
