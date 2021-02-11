import {connect, ConnectedProps} from 'react-redux';
import { IRootState } from '../../store/store';

import {changeSortBy, fetchMoviesRequested, increaseCurrentCount, loadMoreMovies} from '../../store/redux/moviesActions'
import HomePage from './HomePage'

const mapStateToProps = (state: IRootState) => {
  console.log(state);
  return {
    movies: state.movies.items,
    sortBy: state.movies.sortBy,
    currentCount: state.movies.currentCount,
    loading: state.movies.loading
  }
}

const mapDispatchToProps = {
  changeSortBy,
  fetchMoviesRequested,
  increaseCurrentCount,
  loadMoreMovies
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export type MoviesConnectedProps = ConnectedProps<typeof connector>
export default connector(HomePage);

