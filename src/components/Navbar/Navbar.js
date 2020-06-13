import React from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.scss";

const navbarItems = [
  { title: "Home", link: "/Home" },
  { title: "Search Tweets By Hashtag", link: "/searchByHashtag" },
  { title: "Filter Tweets By Location", link: "/Home" },
  { title: "View Reports", link: "/Home" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const onNavItemClick = (event) => {
    const { sendto } = event.currentTarget.dataset;
    navigate(sendto);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navbarItems.map((item) => (
          <li
            className="nav-item"
            data-sendTo={item.link}
            onClick={onNavItemClick}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <span className="signOut">Sign out!</span>
    </nav>
  );
};

export default Navbar;
