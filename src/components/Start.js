import Layout from "./Layout";
import AlertBar from "./AlertBar";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import AccountBookmarks from "./AccountBookmarks";
import "../styles/Bookmarks.css";

const Start = ({ fetchAccountBookmarks, accountBookmarks }) => {
  useEffect(() => {
    fetchAccountBookmarks();
  }, [fetchAccountBookmarks]);

  return (
    <Layout>
      <AlertBar />
      <div className="page">
        <AccountBookmarks />
      </div>
    </Layout>
  );
};

export default connect(
  ({ accountBookmarks }) => ({ accountBookmarks }),
  { fetchAccountBookmarks }
)(Start);
