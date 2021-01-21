import * as React from "react";
import "./header.css";
interface HeaderProps {
  moviePage: boolean;
}
function Header(props: HeaderProps) {
  return (
    <header className="header">
      <h3 className="logo">netflixroulette</h3>
      {props.moviePage ? (
        <button className="btn header_search-btn">Search</button>
      ) : null}
    </header>
  );
}

export default Header;
