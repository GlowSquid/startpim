import Layout from "../components/Layout";
import { connect } from "react-redux";
import AccountDelete from "../components/AccountDelete";
import AccountInfo from "../components/AccountInfo";
import Loader from "../components/Loader";
import Authenticate from "./authenticate";

function Account({ account }) {
  const content = (
    <Layout>
      <div className="page border">
        <div className="account bumper">
          <AccountInfo />
          <AccountDelete />
        </div>
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
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Account);
