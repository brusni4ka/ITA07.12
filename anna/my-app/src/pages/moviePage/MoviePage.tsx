import React, {  useEffect } from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from '../../components/infiniteScroll';
import * as QueryString from "query-string";
import { SearchType } from '../../components/searchForm/SearchForm';
import { fetchMovieRequested } from '../../store/redux/movieActions';
import { loadMoreMovies, resetMovies } from '../../store/redux/moviesActions';
import { IRootState } from '../../store/store';

interface RouteParams { id: string }

const MoviePage = () => {

  const location = useLocation();
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();


  const movie = useSelector((state: IRootState) => state.movie.item);
  const movies = useSelector((state: IRootState) => state.movies.items);
  const loadingMovies = useSelector((state: IRootState) => state.movies.loading);
  const loadingMovie = useSelector((state: IRootState) => state.movie.loading);
  const total = useSelector((state: IRootState) => state.movies.total);

  useEffect(() => {
      return () => {
      dispatch(resetMovies());
    }
  }, []);

  useEffect(() => {
    getMovies();
    window.scrollTo(0, 0);

  }, [params.id]);

  // componentDidMount() {
  //   console.log("mount");
  //   this.getMovies();
  // }

  // componentDidUpdate(prewProps: RouteComponentProps<RouteParams> & MovieConnectedProps) {
  //   const { match, movies } = this.props;

  //   if(prewProps.movies.length === movies.length) {
  //      window.scrollTo(0, 0);
  //   }

  //   if (prewProps.match.params.id !== match.params.id) {
  //     this.getMovies();
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.resetMovies();
  // }  

  const getMovies = () => {
    const movieId = params.id;
    dispatch(fetchMovieRequested(movieId));
  }

  const handleLoad = () => {
    dispatch(loadMoreMovies({ ...QueryString.parse(location.search), search: movie.genres[0], searchBy: SearchType.Ganre }))
  }

  return (
    <Layout className="movie-page" pageName={'moviePage'}>
      <section className="section-dark">
        <Container>
          {loadingMovie ? <p className="loading-movie">Loading...</p> : <MovieCard movie={movie} />}
        </Container>
      </section>
      <section className="section">
        <SortBox movieGanre={movie.genres ? movie.genres[0] : ''} />
        <InfiniteScroll onLoadMore={handleLoad} currentCount={movies.length} total={total}>
          {loadingMovies ? <p className="loading-list">Loading...</p> : <MovieList className="container" movies={movies} />}
        </InfiniteScroll>
        
      </section>
    </Layout>
  )
}

export default MoviePage;
