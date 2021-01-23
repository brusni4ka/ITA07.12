import React from 'react';
import './header.css';
import Button from '../../components/button';

interface IHeaderProps {
  pageName: string;
}

const Header: React.FC<IHeaderProps> = (props) => {

  const { pageName } = props;
  return (
    <header className="header container">
      <a href="/" className="logo">nexflixroullet</a>
      {pageName === 'ganre' ? '' : <Button onClick={() => console.log('clicked')} href="/" className="btn-light" active={false}>Search</Button>}
    </header>
  );

}

export default Header;
