import Layout from "../components/Layout";
import AlertBar from "../components/AlertBar";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import UseModal from "./UseModal";
import AddBookmark from "./BookmarkAdd";
import AccountBookmarks from "./AccountBookmarks";

import "../styles/Bookmarks.css";

const Start = ({ fetchAccountBookmarks, accountBookmarks }) => {
  useEffect(() => {
    fetchAccountBookmarks();
  }, [fetchAccountBookmarks]);

  const { isShowing, toggle } = UseModal();

  let session;
  if (accountBookmarks.bookmarks.length === 0) {
    session = (
      <Layout>
        <AlertBar />
        <div className="page">
          <h1 className="new-bm">Add your first bookmark</h1>
          <div className="add-bm" onClick={toggle}>
            +
          </div>
          <AddBookmark isShowing={isShowing} hide={toggle} />
          {/* <AddBookmark /> */}
        </div>
      </Layout>
    );
  } else {
    session = (
      <Layout>
        <AlertBar />
        <div className="page">
          <h1>Welcome back!</h1>
          <AccountBookmarks />
          <AddBookmark isShowing={isShowing} hide={toggle} />
        </div>
      </Layout>
    );
  }

  return session;
};

export default connect(
  ({ account, accountBookmarks }) => ({ account, accountBookmarks }),
  { fetchAccountBookmarks }
)(Start);
