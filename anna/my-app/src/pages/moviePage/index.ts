import { connect, ConnectedProps } from 'react-redux';
import { IRootState } from '../../store/store';
import { fetchMoviesRequested, resetMovies } from '../../store/redux/moviesActions';
import { fetchMovieRequested } from '../../store/redux/movieActions'

import MoviePage from './MoviePage';

const mapStateToProps = (state: IRootState) => {
  console.log(state);
  return {
    movies: state.movies.items,
    movie: state.movie.item,
    loadingMovies: state.movies.loading,
    loadingMovie: state.movie.loading
  }
}

const mapDispatchToProps = {
  fetchMovieRequested,
  fetchMoviesRequested,
  resetMovies

}
const connector = connect(mapStateToProps, mapDispatchToProps);
export type MovieConnectedProps = ConnectedProps<typeof connector>
export default connector(MoviePage);