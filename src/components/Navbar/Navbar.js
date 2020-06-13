import React from "react";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Search Tweets By Hashtag</li>
        <li className="nav-item">Filter Tweets By Location</li>
        <li className="nav-item">View Reports</li>
      </ul>
      <span className="signOut">Sign out!</span>
    </nav>
  );
};

export default Navbar;
