import React from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';
import { RouteComponentProps } from "react-router-dom";
import Api from '../../Api';

interface IMoviePageState {
  movies: Array<IMovie>,
  movie?: IMovie
}

interface RouteParams { id: string }

class MoviePage extends React.Component<RouteComponentProps<RouteParams>, IMoviePageState> {

  state: IMoviePageState = {
    movies: [],
  }

  componentDidUpdate(prewProps: RouteComponentProps<RouteParams>) {
    const { match } = this.props;
    console.log("updated");    
    window.scrollTo(0,0);
    if (prewProps.match.params.id !== match.params.id) {
      this.getMovies();
    }
  }

  componentDidMount() {
    console.log("mount");
    this.getMovies();
 }

  async getMovies() {
    const { match } = this.props;    

    const movieId = match.params.id;
    // this.props.history.push({
    //   pathname: `/film/${movieId}`
    // });

    const movie = await Api.fetchMovie(movieId);
    this.setState({movie});

    const movies = await Api.fetchMovies(`?search=${movie && movie.genres[0]}&searchBy=genres`);
    this.setState({ movies})
    // fetch(`https://reactjs-cdp.herokuapp.com/movies/${movieId}`)
    // .then(response => response.json())
    // .then(responseData => {
    //   this.setState({ movie: responseData }, () => {
    //     const { movie } = this.state;
    //     fetch(`https://reactjs-cdp.herokuapp.com/movies?search=${movie && movie.genres[0]}&searchBy=genres`)
    //       .then(response => response.json())
    //       .then(responseData => {
    //         this.setState({ movies: responseData.data })
    //       });
    //   })
    // });
  }

  render() {
    const { movies, movie } = this.state;
    return (
      <Layout className="movie-page" pageName={'moviePage'}>
        <section className="section-dark">
          <Container>{movie && <MovieCard movie={movie} />}</Container>
        </section>
        <section className="section">
          {movie && <SortBox movieGanre={movie.genres[0]}/>}
          <MovieList className="container" movies={movies} />
        </section>
      </Layout>
    )
  }
}

export default MoviePage;
