import React from 'react';
import './movieList.css';
import MovieCardPrew from './movie-card';
import IMovie from './movie-card/IMovie';
import classNames from 'classnames';
import { MoviesConnectedProps } from '../../pages/home';

interface IMovieListProps {
  movies: Array<IMovie>,
  currentCount?: number,
  className?: string,
}

class MovieList extends React.Component<IMovieListProps, MoviesConnectedProps> {

  render() {
    const { movies, className } = this.props;

    const classes = classNames(
      'movie-search-result',
      className
    );

    return (
      movies.length > 0 ?
        <div className={classes}>
          {
            movies.map((movie: IMovie, index: number) => {
              if (movies.length - 1 === index) {
                return <MovieCardPrew key={movie.id} movie={movie} />
              }
              return <MovieCardPrew key={movie.id} movie={movie} />
            })
          }
        </div>
        : <p className="movie-list-message">No films found</p>
    )
  }
}

export default MovieList;
