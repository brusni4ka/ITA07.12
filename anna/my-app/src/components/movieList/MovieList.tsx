import React from 'react';
import './movieList.css';
import MovieCardPrew from './movie-card';
import IMovie  from './movie-card/IMovie';
import classNames from 'classnames';

interface IMovieListProps {
  movies: Array<IMovie>,
  className?: string
}

const MovieList: React.FC<IMovieListProps> = (props) => {

  const { movies, className } = props;

  const classes = classNames(
    'movie-search-result',
    className
  )

  return (
    <div className={classes}>
      {movies.map((movie: IMovie) => {
        return <MovieCardPrew key={movie.id} movie={movie} />
      })
      }
    </div>
  );
}

export default MovieList;
