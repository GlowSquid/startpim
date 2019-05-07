import Layout from "../components/Layout";
import Link from "next/link";
import { connect } from "react-redux";
import { logout } from "../actions/account";

function Start({ logout }) {
  // if (account.loggedIn === false) {
  //   Router.push("/login");
  // }

  return (
    <Layout>
      <h1 className="bumper">Account Dashboard</h1>
      <p>
        <Link href="/">
          <a>Landing</a>
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
      <button className="btn" onClick={logout}>
        Log Out
      </button>
    </Layout>
  );
}

export default connect(
  null,
  { logout }
)(Start);
