import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbar__logo}>
          Start<span>PIM</span>
        </div>
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
