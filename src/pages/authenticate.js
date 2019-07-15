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
          <div className="a-card">
            <Auth />
          </div>
        </div>
      </Layout>
    </Fragment>
  );

  return content;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Authenticate);
