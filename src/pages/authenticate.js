import { Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
// import Loader from "../components/Loader";
import Auth from "../components/Auth";
import "../styles/Style.css";

function Authenticate({ account }) {
  const content = (
    <Fragment>
      <Layout>
        <div className="bumper">
          <div className="auth-card">
            <Auth />
          </div>
        </div>
      </Layout>
    </Fragment>
  );

  // if (account.status === "fetching") {
  // return <Loader />;
  // return content;
  // } else if (account.loggedIn === false) {
  // return content;
  // } else {
  // return <Login />;
  // }

  // return account.loggedIn ? content : <Login />;

  return content;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Authenticate);
