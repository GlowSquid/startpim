import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [toggler, setToggler] = useState("navbar-toggler");

  const toggle = e => {
    toggler === "navbar-toggler"
      ? setToggler("open-navbar-toggler")
      : setToggler("navbar-toggler");
  };

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
            <ul>
              <li className="btn">
                <Link href="/bookmarks">
                  <a>Bookmarks</a>
                </Link>
              </li>
              <li className="btn">
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li className="btn">
                <a>Log Out</a>
              </li>
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
            </ul>
            <button className={toggler} onClick={e => toggle(e)}>
              <span />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
