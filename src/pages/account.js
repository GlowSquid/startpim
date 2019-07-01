import Layout from "../components/Layout";
import { connect } from "react-redux";
import AccountDelete from "../components/AccountDelete";
import AccountInfo from "../components/AccountInfo";
import Loader from "../components/Loader";
import Authenticate from "./authenticate";

function Account({ account }) {
  const content = (
    <Layout>
      <div className="page">
        <h1 className="bumper">Account Page</h1>
        <AccountInfo />
        <AccountDelete />
      </div>
    </Layout>
  );

  if (account.status === "fetching") {
    return <Loader />;
  } else if (account.loggedIn === true) {
    return content;
  } else {
    return <Authenticate />;
  }

  // return account.loggedIn ? content : <Authenticate />;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Account);
