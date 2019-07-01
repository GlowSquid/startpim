import Layout from "./Layout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Bookmarks from "./Bookmarks";
import "../styles/Bookmarks.css";

const Start = ({ fetchAccountBookmarks, accountBookmarks }) => {
  useEffect(() => {
    fetchAccountBookmarks();
  }, [fetchAccountBookmarks]);

  return (
    <Layout>
      <Bookmarks />
    </Layout>
  );
};

export default connect(
  ({ accountBookmarks }) => ({ accountBookmarks }),
  { fetchAccountBookmarks }
)(Start);
