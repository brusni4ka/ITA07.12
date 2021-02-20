import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <Link to="/">
        <h2 className="footer-title">netflixroulette</h2>
      </Link>
    </footer>
  );
}

export default Footer;
