import React from 'react';
import Layout from '../../components/layout';
import './moviePage.css';
import MovieList from '../../components/movieList';
import IMovie from '../../components/movieList/movie-card/IMovie';
import SortBox from '../../components/sortBox';
import Container from '../../components/container';
import MovieCard from '../../components/movieList/movie-card/MovieCard';

interface IMoviePageState {
  movies: Array<IMovie>
  movie: IMovie
}

class MoviePage extends React.Component<{}, IMoviePageState> {

  state: IMoviePageState = {
    movies: [],
    movie: {
      "id": 284054,
      "title": "Black Panther",
      "tagline": "Long live the king",
      "vote_average": 7.3,
      "vote_count": 3788,
      "release_date": "2018-02-13",
      "poster_path": "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
      "overview": "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \"special forces\"), and an American secret agent, to prevent Wakanda from being dragged into a world war.",
      "budget": 200000000,
      "revenue": 1245257672,
      "genres": [
        "Action",
        "Adventure",
        "Fantasy",
        "Science Fiction"
      ],
      "runtime": 134
    }
  }

  componentDidMount() {
    fetch(`https://reactjs-cdp.herokuapp.com/movies?search=${this.state.movie.genres[0]}&searchBy=genres`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ movies: responseData.data })
      });
  }

  render() {
    const { movies, movie } = this.state;
    return (
      <Layout className="movie-page" pageName={'moviePage'}>
        <section className="section-dark">
          <Container>
            <MovieCard movie={movie} />
          </Container>
        </section>
        <section className="section">
          <SortBox movieGanre={movie.genres[0]} />
          <MovieList className="container" movies={movies} />
        </section>
      </Layout>


    )
  }
}

export default MoviePage;
