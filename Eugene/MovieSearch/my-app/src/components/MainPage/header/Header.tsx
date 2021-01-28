import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <Link to="/">
      <h2 className="header-title">netflixroulette</h2>
      </Link>
    </header>
  );
}

export default Header;
