import Link from "next/link";
import { connect } from "react-redux";
import { logout } from "../actions/account";
import Router from "next/router";

import "../styles/Header.css";

const Header = ({ logout, account }) => {
  let showLinks;

  const pushOut = e => {
    logout();
    Router.push("/"); // æ Did this crash?
  };

  if (account.loggedIn === true) {
    showLinks = (
      <>
        <li>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </li>
        <li>
          <a onClick={e => pushOut(e)}>Log Out</a>
        </li>
      </>
    );
  } else {
    showLinks = (
      <>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </li>
      </>
    );
  }

  return (
    <header className="navbar">
      <div className="navbox">
        <div className="nav-center">
          <h1>
            <Link href="/">
              <a className="navbar-brand">
                Start<span>PIM</span>
              </a>
            </Link>
          </h1>

          <nav className="navbar-items">
            <ul>{showLinks}</ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

// export default Header;

export default connect(
  ({ account }) => ({ account }),
  { logout }
)(Header);
