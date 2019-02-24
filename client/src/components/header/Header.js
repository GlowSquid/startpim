import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import styles from "./Header.module.css";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <Link to="#" onClick={this.onLogoutClick.bind(this)}>
          <p>Log Out {user.username}</p>
        </Link>
      </ul>
    );

    const guestLinks = (
      <ul>
        <NavLink to="/login" activeClassName="selected">
          Login
        </NavLink>
        <NavLink to="/register" activeClassName="selected">
          Sign Up
        </NavLink>
      </ul>
    );

    return (
      <header className={styles.navbar}>
        <nav>
          <Link className={styles.navbar__logo} to="/">
            Start<span>PIM</span>
          </Link>
        </nav>
        <nav className={styles.navbar__items}>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
