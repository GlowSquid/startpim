import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
// import { useEffect } from "react";
import { dropBookmark } from "../actions/bookmark";
import UseModal from "./UseModal";
import AddBookmark from "./BookmarkAdd";
import Spinner from "./Spinner";
import "../styles/Bookmarks.css";

let antiSpam = false;

const AccountBookmarks = ({
  fetchAccountBookmarks,
  accountBookmarks,
  dropBookmark,
  bookmark
}) => {
  const delBm = id => {
    dropBookmark(id).then(() => {
      // fetchAccountBookmarks(accountBookmarks);
    });
  };

  const { isShowing, toggle } = UseModal();

  if (antiSpam === true && bookmark.status === "fetching") {
    antiSpam = false;
  } else if (antiSpam === false && bookmark.status === "success") {
    antiSpam = true;
    console.log("updating");
    fetchAccountBookmarks(accountBookmarks);
  }

  const bms = accountBookmarks.bookmarks.map(bookmark => (
    <div className="bm" key={bookmark.id}>
      <Link href={bookmark.url}>
        <a>{bookmark.title}</a>
      </Link>
      <div> ID: {bookmark.id} </div>
      <button onClick={() => delBm(bookmark.id)}>X</button>
    </div>
  ));

  let session;

  if (
    accountBookmarks.bookmarks.length === 0 &&
    accountBookmarks.status === "success"
  ) {
    session = (
      <div className="page">
        <h1 className="new-bm">Add your first bookmark</h1>
        <div className="add-bm" onClick={toggle}>
          +
        </div>
        <AddBookmark isShowing={isShowing} hide={toggle} />
      </div>
    );
  } else if (
    accountBookmarks.bookmarks !== 0 &&
    accountBookmarks.status === "success"
  ) {
    session = (
      <div className="page">
        <h1>Welcome back!</h1>
        <div className="grid">
          {bms}
          <div className="add-bm" onClick={toggle}>
            +
          </div>
          <AddBookmark isShowing={isShowing} hide={toggle} />
        </div>
      </div>
    );
  } else {
    session = <Spinner />;
  }

  return <div className="page">{session}</div>;
};

export default connect(
  ({ accountBookmarks, bookmark }) => ({ accountBookmarks, bookmark }),
  { fetchAccountBookmarks, dropBookmark }
)(AccountBookmarks);
