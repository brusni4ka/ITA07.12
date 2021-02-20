import React from 'react';
import './movieList.css';
import MovieCardPrew from './movie-card';
import IMovie from './movie-card/IMovie';
import classNames from 'classnames';
import { MoviesConnectedProps } from '../../pages/home';

interface IMovieListOwnProps {
  movies: Array<IMovie>,
  className?: string,
}

type IMovieListProps = IMovieListOwnProps | MoviesConnectedProps;

const MovieList: React.FC<IMovieListProps> = (props) => {


  const { movies } = props;

  const classes = classNames(
    'movie-search-result',
    'container'
  );

  return (
    movies.length > 0 ?
      <div className={classes}>
        {
          movies.map((movie: IMovie) => {
            return <MovieCardPrew key={movie.id} movie={movie} />
          })
        }
      </div>
      : <p className="movie-list-message">No films found</p>
  )
}


export default MovieList;
