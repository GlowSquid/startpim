import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentStart } from "../../actions/startActions";

import "./Header.css";

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
        <li>
          <Link to="#" onClick={this.onLogoutClick.bind(this)}>
            Log Out
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Sign Up</NavLink>
        </li>
      </ul>
    );

    return (
      <header className="navbar">
        <nav>
          <Link className="navbar__logo" to="/">
            Start<span>PIM</span>
          </Link>
        </nav>
        <nav className="navbar__items">
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
