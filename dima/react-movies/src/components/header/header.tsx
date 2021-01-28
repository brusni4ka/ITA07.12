import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
interface HeaderProps {
  showSearchBtn: boolean;
}
function Header(props: HeaderProps) {
  return (
    <header className="header">
      <Link to="/">
        <h3 className="logo">netflixroulette</h3>
      </Link>

      {props.showSearchBtn && (
        <Link to="/search">
          <button className="btn header_search-btn">Search</button>
        </Link>
      )}
    </header>
  );
}

export default Header;
