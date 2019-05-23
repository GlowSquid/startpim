import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
import { useEffect } from "react";
import { dropBookmark } from "../actions/bookmark";
import "../styles/Bookmarks.css";

const AccountBookmarks = ({
  fetchAccountBookmarks,
  accountBookmarks,
  dropBookmark
}) => {
  useEffect(() => {
    fetchAccountBookmarks(accountBookmarks);
  }, [fetchAccountBookmarks]);

  const delBm = id => {
    dropBookmark(id);
    fetchAccountBookmarks(accountBookmarks);
  };

  const bms = accountBookmarks.bookmarks.map(bookmark => (
    <div className="bm" key={bookmark.bookmarkId}>
      <Link href={bookmark.url}>
        <a>{bookmark.title}</a>
      </Link>
      <div> ID: {bookmark.id} </div>
      <button onClick={() => delBm(bookmark.id)}>X</button>
    </div>
  ));

  return (
    <div>
      <div>{bms}</div>
    </div>
  );
};

export default connect(
  ({ accountBookmarks }) => ({ accountBookmarks }),
  { fetchAccountBookmarks, dropBookmark }
)(AccountBookmarks);
