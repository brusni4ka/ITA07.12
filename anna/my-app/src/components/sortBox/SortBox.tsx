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
  sortBy: string
}

class SortBox extends React.Component<ISortBoxProps, ISortBoxState> {

  state: ISortBoxState = {
    sortBy: 'releaseDate'
  };

  render() {
    return (

      <div className="sort-box">
        <Container className="sortbox-wrapper">
          {
            this.props.movieCount === 0
              ? <><p className="film-search-number">{this.props.movieCount} films found</p>
                <div className="">
                  <span>Sort by </span>
                  <Button onClick={() => console.log('clicked')} href="/" className="btn-light" active={false}>Release date</Button>
                  <Button onClick={() => console.log('clicked')} href="/" className="btn-light" active={false}>Rating</Button>
                </div></>
              : ''
          }
          {
            this.props.movieGanre
              ? <><p className="film-search-ganre">Films by {this.props.movieGanre} ganre</p></>
              : ''
          }
        </Container>
      </div>

    )
  }
}

export default SortBox;
