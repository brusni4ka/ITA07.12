import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  pageName: string;
}

const Header: React.FC<IHeaderProps> = (props) => {

  const { pageName } = props;
  return (
    <header className="header container">
      <a href="/" className="logo">nexflixroullet</a>
      {pageName !== 'home' && <Link to="/" onClick={() => console.log('clicked')} href="/" className="btn-header-light">Search</Link>}
    </header>
  );
}

export default Header;
