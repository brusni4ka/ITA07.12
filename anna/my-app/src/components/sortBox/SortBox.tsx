import React, { FC, useEffect, useState } from 'react';
import Container from '../container';
import Button from '../button';
import './sortBox.css';
import { useLocation } from 'react-router-dom';
import * as QueryString from "query-string";

interface ISortBoxProps {
  movieCount?: number
  movieGanre?: string
  onSortByChange?: (arg0: SortType)=> void;
  sortBy?: SortType
}

export enum SortType {
  ReleaseDate = "release_date",
  Rating = "vote_average"
}

const SortBox: FC<ISortBoxProps> = (props) => {
  const location = useLocation();
  const searchParams = QueryString.parse(location.search);  

  const [sort, setSort] = useState(searchParams.sortBy as string);

  const { movieCount, movieGanre} = props;

  useEffect(() => {
    const searchParams = QueryString.parse(location.search);
    setSort(searchParams.sortBy as SortType || SortType.ReleaseDate); 
  }, [])

  useEffect(() => {
    if(sort && props.onSortByChange) {
      props.onSortByChange(sort as SortType);
    }    
  }, [sort]);

  const handleSortTypeChange = (e: React.MouseEvent<HTMLElement>) => {
    setSort((e.target as HTMLLinkElement).id as SortType)
  }

  return (
    <div className="sort-box">
      <Container className="sortbox-wrapper">
        {
          (movieCount && movieCount > 0) ?
            <><p className="film-search-number">{movieCount} films found</p>
              <div className="">
                <span>Sort by </span>
                <Button onClick={handleSortTypeChange} href="/" id={SortType.ReleaseDate}
                  className={sort === SortType.ReleaseDate
                    ? "btn-light btn-active"
                    : "btn-light"
                  }>Release date</Button>
                <Button onClick={handleSortTypeChange} href="/" id={SortType.Rating}
                  className={sort === SortType.Rating
                    ? "btn-light btn-active"
                    : "btn-light"
                  }
                >Rating</Button>
              </div></> : <></>
        }
        {
          movieGanre && <><p className="film-search-ganre">Films by {movieGanre} ganre</p></>
        }
      </Container>
    </div>
  )
}

export default SortBox;
