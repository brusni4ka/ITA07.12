import { connect, ConnectedProps } from "react-redux";
import { StateInterface } from "../../interfaces/stateInterface";
import {
  fetchMovie,
  setMovie,
  fetchMovies,
  setMovies,
  resetMovie,
} from "../../redux/moviesActions";
import MoviePage from "./moviepage";

const mapStateToProps = (state: StateInterface) => {
  return {
    movies: state.movies,
    loadingMovie: state.loadingMovie,
    loadingMovies: state.loadingMovies,
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  fetchMovie,
  setMovies,
  setMovie,
  fetchMovies,
  resetMovie,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type MovieConnectProps = ConnectedProps<typeof connector>;
export default connector(MoviePage);
