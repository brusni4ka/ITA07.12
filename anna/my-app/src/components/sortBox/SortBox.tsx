import React from 'react';
import Container from '../container';
import Button from '../button';
import './sortBox.css';


interface ISortBoxProps {
  movieCount?: number
  sortFilms?: (sortBy: string) => void
  movieGanre?: string
}

export interface ISortBoxState {
  sortBy: string,
  active: string
}

enum SortType {
  ReleaseDate = "release_date",
  Rating = "vote_count"
}

class SortBox extends React.Component<ISortBoxProps, ISortBoxState> {

  state: ISortBoxState = {
    sortBy: SortType.ReleaseDate,
    active: SortType.ReleaseDate
  };

  handleSortTypeChange = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({
      sortBy: (e.target as HTMLLinkElement).id,
    }, () => {
      this.props.sortFilms && this.props.sortFilms(this.state.sortBy);
    });
  }

  render() {
    const { movieCount, movieGanre } = this.props;
    const { sortBy } = this.state;
    return (
      <div className="sort-box">
        <Container className="sortbox-wrapper">
          {
            this.props.movieCount
            && <><p className="film-search-number">{movieCount} films found</p>
              <div className="">
                <span>Sort by </span>
                <Button onClick={this.handleSortTypeChange} href="/" id={SortType.ReleaseDate}
                  className={sortBy === SortType.ReleaseDate
                    ? "btn-light btn-active"
                    : "btn-light"
                  }>Release date</Button>
                <Button onClick={this.handleSortTypeChange} href="/" id={SortType.Rating}
                  className={sortBy === SortType.Rating
                    ? "btn-light btn-active"
                    : "btn-light"
                  }
                >Rating</Button>
              </div></>
          }
          {
            this.props.movieGanre && <><p className="film-search-ganre">Films by {movieGanre} ganre</p></>
          }
        </Container>
      </div>

    )
  }
}

export default SortBox;
