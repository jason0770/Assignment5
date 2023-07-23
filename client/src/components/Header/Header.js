import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import "./Header.css";

export default function Header() {

  // const location = useLocation()

  // const isLinkActive = (path) => {
  //   return location.pathname === path;
  // }

  return (
    <header className="page-header">
      <h3 className="page-header__title">
        CPSC455: Applied Industry Practices
      </h3>
      <nav className="page-nav">
        <ol className="page-nav__ol">
          {/* Source: https://stackoverflow.com/questions/71987483/react-router-v6-navlink-doesnt-show-active */}
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "page-nav__li page-nav__a page-nav__a_current"
                : "page-nav__li page-nav__a"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink 
            className={({ isActive }) =>
              isActive
                ? "page-nav__li page-nav__a page-nav__a_current"
                : "page-nav__li page-nav__a"
            }
            to="/about"
          >
            About
          </NavLink>
        </ol>
      </nav>
    </header>
  );
}
