import Layout from "../components/Layout";
import Link from "next/link";
import { connect } from "react-redux";
import AccountDelete from "./AccountDelete";
import AccountInfo from "../components/AccountInfo";

function Start() {
  return (
    <Layout>
      <div className="page">
        <h1 className="bumper">Private Start</h1>
        <AccountInfo />
        <p>
          <Link href="/">
            <a>Landing</a>
          </Link>
        </p>
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
        <AccountDelete />
      </div>
    </Layout>
  );
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Start);
