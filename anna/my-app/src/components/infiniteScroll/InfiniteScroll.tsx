import React from 'react';

interface IInfScrollState {
  isLoadingMoreData: boolean
}

interface InfScrollProps {
  currentCount: number,
  onLoadMore: () => void,
  search: string,
  total: number
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
    const { onLoadMore } = this.props;
   
    if (this.state.isLoadingMoreData) {
      onLoadMore();
      window.removeEventListener('scroll', this.isScrolling)
      this.setState({ isLoadingMoreData: false })
    }

    if (prevProps.currentCount < this.props.currentCount && this.props.currentCount !== this.props.total) {
      window.addEventListener('scroll', this.isScrolling);
    }
  }

  render() {
    const {isLoadingMoreData} = this.state
    return (
      isLoadingMoreData ? <p>Loading...</p> : this.props.children    
    )
  }
}

export default InfiniteScroll;
