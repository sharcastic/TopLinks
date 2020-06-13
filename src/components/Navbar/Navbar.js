import React from "react";
import { useNavigate } from "react-router-dom";

import { navbarItems } from "../../utils/constants";

import "./Navbar.scss";

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
            key={item.title}
            className="nav-item"
            data-sendto={item.link}
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
