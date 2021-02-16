import React from "react";
import "./MovieDetailHeader.css";
import { Link } from "react-router-dom";
function MovieDetailHeader() {
  return (
    <header>
      <Link to="/">
        <h2 className="header-title">netflixroulette</h2>
      </Link>
      <Link to="/">
        <button className="header-button">SEARCH</button>
      </Link>
    </header>
  );
}

export default MovieDetailHeader;
