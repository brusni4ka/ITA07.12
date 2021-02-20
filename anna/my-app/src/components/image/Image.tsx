import React from 'react';
import './image.css';

interface IImageState {
  isError: boolean,
}

interface IImageProps {
  src: string,
}


class Image extends React.Component<IImageProps, IImageState> {

  state = {
    isError: false
  }

  handleError = () => {
    this.setState({
      isError: true
    })
    console.log('can`t load image')
  }

  render() {
    const { src } = this.props;
    const { isError } = this.state;


    return (
      <>
        { isError && <div className="movie-card-img"></div>}
        <img src={src} className="movie-card-img" alt="movie poster" onError={this.handleError}
          style={{
            display: isError ? "none" : "initial"
          }}
        />
      </>
    )
  }
}
export default Image;