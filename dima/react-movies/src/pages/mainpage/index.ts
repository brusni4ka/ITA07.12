import { StateInterface } from "../../interfaces/stateInterface";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import {} from "../../";
import MainPage from "./mainpage";
import {
  fetchMovie,
  setMovie,
  fetchMovies,
  setMovies,
  MoviesAction,
} from "../../redux/moviesActions";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: StateInterface) => {
  return {
    movies: state.movies,
    loading: state.loadingMovies,
    // movie: state.movie,
  };
};

const mapDispatchToProps = {
  fetchMovies,
  setMovies,
  // setMovie,
  // fetchMovie,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export type MainConnectProps = ConnectedProps<typeof connector>;
export default connector(MainPage);
