import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsFetchingMoreData } from '../../store/redux/moviesActions';
import { IRootState } from '../../store/store';


interface InfScrollProps {
  currentCount: number,
  onLoadMore: () => void,
  total: number,
  children: React.ReactNode,
}

const InfiniteScroll: FC<InfScrollProps> = (props) => {

  const isFetchingMoreData = useSelector((state: IRootState) => state.movies.isFetchingMoreData);
  const dispatch = useDispatch();

  const isScrolling = () => {

    if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight && !isFetchingMoreData) {
      dispatch(setIsFetchingMoreData(true));
    }
  }

  const { onLoadMore, currentCount, children, total } = props;

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => {
      window.removeEventListener('scroll', isScrolling);
    }
  }, []);

  useEffect(() => {
    if (currentCount === total) {
      dispatch(setIsFetchingMoreData(false));
      return;
    }
    if (isFetchingMoreData) {
      dispatch(setIsFetchingMoreData(false));
      onLoadMore();
    }
  }, [isFetchingMoreData]);





  // componentDidMount() {
  //   window.addEventListener('scroll', isScrolling);
  // }

  // componentDidUpdate(prevProps: InfScrollProps) {
  //   const { onLoadMore } = props;

  //   if (isLoadingMoreData) {
  //     onLoadMore();
  //     window.removeEventListener('scroll', this.isScrolling)
  //     this.setState({ isLoadingMoreData: false })
  //   }

  //   if (prevProps.currentCount < props.currentCount && props.currentCount !== props.total) {
  //     window.addEventListener('scroll', isScrolling);
  //   }
  // }

  return (
    <>
      {currentCount === total ? children : isFetchingMoreData ? <p>Loading...</p> : children}
    </>
  )
}

export default InfiniteScroll;
