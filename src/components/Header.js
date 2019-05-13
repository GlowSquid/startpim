import Link from "next/link";
import { connect } from "react-redux";

import "../styles/Header.css";

const Header = ({ account }) => {
  let showLinks;

  if (account.loggedIn === true) {
    showLinks = (
      <>
        <li className="btn">
          <Link href="/bookmarks">
            <a>Bookmarks</a>
          </Link>
        </li>
        <li className="btn">
          <a>Log Out</a>
        </li>
      </>
    );
  } else {
    showLinks = (
      <>
        <li className="btn">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li className="btn__sign-up">
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
  null
)(Header);
