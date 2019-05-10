import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Link from "next/link";
import "../styles/Start.css";

function Index() {
  // if (account.loggedIn === true) {
  //   Router.push("/start");
  // }

  return (
    <Layout>
      <div className="bumper">
        <div className="section">
          <h1>Landing Page</h1>
          <div className="menu">
            <p>
              <Link href="/bookmarks">
                <a>Bookmarks</a>
              </Link>
            </p>
            <p>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
            <p>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default connect()(Index);
