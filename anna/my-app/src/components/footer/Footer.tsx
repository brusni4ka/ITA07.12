import React from 'react';
import Container from '../container';
import './footer.css';

class Footer extends React.Component{

  render() {
    return (
      <footer className="footer">
        <Container>
          <a href="/" className="logo">nexflixroullet</a>
        </Container>       
      </footer>
    )    
  }  
}

export default Footer;