import React from 'react';
import IMovie from '../../components/movieList/movie-card/IMovie';
import * as QueryString from "query-string";
import { ISearchParams } from '../../Api';
import { LoadMoreMoviesRequestedAction } from '../../store/redux/moviesActions';

interface IInfScrollState {
  isLoadingMoreData: boolean
}

interface InfScrollProps {
  movies: IMovie[],
  loadMoreMovies: (searchParams: ISearchParams) => LoadMoreMoviesRequestedAction,
  search: string
}

class InfiniteScroll extends React.Component<InfScrollProps, IInfScrollState> {

  state: IInfScrollState = {
    isLoadingMoreData: false
  }

  isScrolling = () => {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight) {
      this.setState({ isLoadingMoreData: true });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.isScrolling);
  }

  componentDidUpdate(prevProps: InfScrollProps) {
    const { loadMoreMovies } = this.props;

    if (this.state.isLoadingMoreData) {
      loadMoreMovies(QueryString.parse(prevProps.search));
      window.removeEventListener('scroll', this.isScrolling)
      this.setState({ isLoadingMoreData: false })
    }

    if (prevProps.movies.length < this.props.movies.length) {
      window.addEventListener('scroll', this.isScrolling);
    }
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default InfiniteScroll;
