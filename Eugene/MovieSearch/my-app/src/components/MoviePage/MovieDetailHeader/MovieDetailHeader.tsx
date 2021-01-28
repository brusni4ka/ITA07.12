import React from "react";
import "./MovieDetailHeader.css";
import { Link } from "react-router-dom";
function MovieDetailHeader() {
  return (
    <header>
      <h2 className="header-title">netflixroulette</h2>
      <Link to="/">
        <button className="header-button">SEARCH</button>
      </Link>
    </header>
  );
}

export default MovieDetailHeader;
