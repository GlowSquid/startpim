import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header className={styles.navbar}>
        <nav>
          <NavLink className={styles.navbar__logo} to="/">
            Start<span>PIM</span>
          </NavLink>
        </nav>
        <nav className={styles.navbar__items}>
          <ul>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
