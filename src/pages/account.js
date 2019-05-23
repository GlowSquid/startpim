import Layout from "../components/Layout";
import { connect } from "react-redux";
import AccountDelete from "../components/AccountDelete";
import AccountInfo from "../components/AccountInfo";
import Login from "./login";

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
  return account.loggedIn ? content : <Login />;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Account);
