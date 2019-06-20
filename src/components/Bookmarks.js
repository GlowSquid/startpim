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

  // const [showMenu, setShowMenu] = useState(false);

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

  // const menu = bookmark(id => {
  // });

  const menu = (id, title, url) => (
    <div className="menu">
      <i className="material-icons edit" onClick={() => editBm(id, title, url)}>
        notes
      </i>
      <i className="material-icons del" onClick={() => delBm(id)}>
        close
      </i>
    </div>
  );

  const bms = accountBookmarks.bookmarks.map(bookmark => (
    <div className={listMode ? "" : "grid-rules"} key={bookmark.id}>
      <div className={listMode ? "bm__list" : "bm"}>
        {listMode ? null : menu(bookmark.id, bookmark.title, bookmark.url)}
        <div> {bookmark.id} </div>
        <img src={bookmark.icon} height={listMode ? "16px" : "32px"} alt="" />
        <div className={listMode ? "title__list" : "title"}>
          <Link href={bookmark.url}>
            <a>{bookmark.title}</a>
          </Link>
        </div>
        {listMode ? menu(bookmark.id, bookmark.title, bookmark.url) : null}
        {/* <div className="menu">
          <i
            className="material-icons edit"
            onClick={() => editBm(bookmark.id, bookmark.title, bookmark.url)}
          >
            notes
          </i>
          <i className="material-icons del" onClick={() => delBm(bookmark.id)}>
            close
          </i>
        </div> */}
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
          <i
            className={listMode ? "material-icons" : "material-icons selected"}
            onClick={() => setListMode(false)}
          >
            view_comfy
          </i>
          <i
            className={listMode ? "material-icons selected" : "material-icons"}
            onClick={() => setListMode(true)}
          >
            reorder
          </i>
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
