import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
// import { useEffect } from "react";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { dropBookmark } from "../actions/bookmark";
import UseModal from "./UseModal";
import AddBookmark from "./BookmarkAdd";
import UpdateBookmark from "./BookmarkUpdate";
import "../styles/Bookmarks.css";

let antiSpam = false;

const AccountBookmarks = ({
  fetchAccountBookmarks,
  accountBookmarks,
  dropBookmark,
  bookmark
}) => {
  const [listMode, setListMode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listMode));
  }, [listMode]);

  // const [showMenu, setShowMenu] = useState();

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("list"));
    return savedMode || false;
  }

  const { addBmShowing, toggle } = UseModal();

  const { updateBmShowing, taggle } = UseModal();

  const delBm = id => {
    dropBookmark(id).then(() => {
      // fetchAccountBookmarks(accountBookmarks);
    });
  };

  const editBm = (id, title, url) => {
    bookmark.title = title;
    bookmark.url = url;
    bookmark.id = id;

    taggle();
  };

  if (antiSpam === true && bookmark.status === "fetching") {
    antiSpam = false;
  } else if (antiSpam === false && bookmark.status === "success") {
    antiSpam = true;
    console.log("updating");
    fetchAccountBookmarks(accountBookmarks);
  }

  const bms = accountBookmarks.bookmarks.map(bookmark => (
    <div className={listMode ? "bm__list" : "bm"} key={bookmark.id}>
      <div> {bookmark.id} </div>
      <div className={listMode ? "title__list" : "title"}>
        <Link href={bookmark.url}>
          <a>{bookmark.title}</a>
        </Link>
      </div>

      <div>
        <img src={bookmark.icon} height="32px" alt="" />
      </div>
      <div className="menu">
        <button
          className="edit-bm"
          onClick={() => editBm(bookmark.id, bookmark.title, bookmark.url)}
        >
          E
        </button>
        <button className="del-bm" onClick={() => delBm(bookmark.id)}>
          X
        </button>
      </div>
    </div>
  ));

  let session;

  if (
    accountBookmarks.bookmarks.length === 0 &&
    accountBookmarks.status === "success"
  ) {
    // setListMode("grid");
    session = (
      <div className="page">
        <h1 className="new-bm">Add your first bookmark</h1>
        <div className="add-bm first-bm" onClick={toggle}>
          +
        </div>
        <AddBookmark addBmShowing={addBmShowing} hide={toggle} />
      </div>
    );
  } else if (
    accountBookmarks.bookmarks !== 0 &&
    accountBookmarks.status === "success"
  ) {
    session = (
      <div>
        <div className="controls">
          <h3>{listMode ? "List-View " : "Grid-View "}</h3>
          <button onClick={() => setListMode(prevMode => !prevMode)}>
            Toggle
          </button>
        </div>
        <div className="sizing">
          <div className={listMode ? "list" : "grid"}>
            {bms}
            <div
              className={listMode ? "add-bm__list" : "add-bm"}
              onClick={toggle}
            >
              {listMode ? "+  Add Bookmark" : "+"}
            </div>
            <AddBookmark addBmShowing={addBmShowing} hide={toggle} />
            <UpdateBookmark
              {...bookmark}
              // key={bookmark}
              props={bookmark}
              updateBmShowing={updateBmShowing}
              hide={taggle}
            />
          </div>
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
