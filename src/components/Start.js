import Layout from "../components/Layout";
import Link from "next/link";
import { connect } from "react-redux";
import Router from "next/router";
import { logout } from "../actions/account";
// import { fetchAccountInfo } from "../actions/accountInfo"; // fetch email to page

function Start({ logout, account }) {
  const pushOut = e => {
    logout();
    Router.push("/"); // æ Did this crash?
  };

  return (
    <Layout>
      <h1 className="bumper">Private Start</h1>
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
      <button className="btn" onClick={e => pushOut(e)}>
        Log Out
      </button>
      {/* <span onClick={() => Router.push('/about')}>here</span> */}
    </Layout>
  );
}

// export default connect(
//   null,
//   { logout }
// )(Start);

export default connect(
  ({ account }) => ({ account }),
  { logout }
)(Start);
