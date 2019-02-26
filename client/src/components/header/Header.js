import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentStart } from "../../actions/startActions";

import styles from "./Header.module.css";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentStart();
    this.props.logoutUser();
  }

  render() {
    // const { isAuthenticated, user } = this.props.auth;
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul>
        <Link to="#" onClick={this.onLogoutClick.bind(this)}>
          Log Out
        </Link>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <NavLink to="/login" activeClassName="selected">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="selected">
            Sign Up
          </NavLink>
        </li>
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
  { logoutUser, clearCurrentStart }
)(Header);
