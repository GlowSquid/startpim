import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
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
  const [listMode, setListMode] = useState(getMode());
  const [descending, setDescending] = useState(getDirection());

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listMode));
    localStorage.setItem("desc", JSON.stringify(descending));
  }, [listMode, descending]);

  function getMode() {
    const savedMode = JSON.parse(localStorage.getItem("list"));
    return savedMode || false;
  }

  function getDirection() {
    const savedDirection = JSON.parse(localStorage.getItem("desc"));
    return savedDirection || false;
  }

  const { addBmShowing, addToggler } = UseModal();

  const { updateBmShowing, updateToggler } = UseModal();

  const delBm = id => {
    dropBookmark(id).then(() => {
      // fetchAccountBookmarks(accountBookmarks);
    });
  };

  const editBm = (id, title, url) => {
    bookmark.title = title;
    bookmark.url = url;
    bookmark.id = id;

    updateToggler();
  };

  if (antiSpam === true && bookmark.status === "fetching") {
    antiSpam = false;
    // console.log("hmm", bookmark.message);
  } else if (antiSpam === false && bookmark.status === "success") {
    antiSpam = true;
    console.log("updating", bookmark.message);
    fetchAccountBookmarks(accountBookmarks);
  } else if (antiSpam === false && bookmark.status === "error") {
    antiSpam = true;
    console.log(bookmark.message);
    // fetchAccountBookmarks(accountBookmarks);
  }

  const menu = (id, title, url) => (
    <div className="bm-options">
      <i className="material-icons edit" onClick={() => editBm(id, title, url)}>
        notes
      </i>
      <i className="material-icons del" onClick={() => delBm(id)}>
        close
      </i>
    </div>
  );

  const title = (url, title) => (
    <div className={listMode ? "title__list" : "title"}>
      <Link href={url}>
        <a target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </Link>
    </div>
  );

  function direction() {
    if (descending === false) {
      return (a, b) => a.id > b.id;
    }
    return (b, a) => a.id > b.id;
  }

  function checkImage(image) {
    // let img = image.toString();
    if (image && image.length === 1) {
      // console.log(image.length);
      return <p className="text-image">{image}</p>;
    } else {
      return <img className="image" src={image} alt="" />;
      // console.log(image);
    }
  }

  const bms = accountBookmarks.bookmarks
    .sort(direction())
    .map((bookmark, i) => (
      <div className={listMode ? "" : "grid-rules"} key={i}>
        <div className={listMode ? "bm__list" : "bm"}>
          {/* <div> {bookmark.id} </div> */}
          {listMode ? (
            <img
              className="favicon__list"
              src={bookmark.icon}
              height="24px"
              width="24px"
              alt=""
            />
          ) : (
            <div className="image-div">{checkImage(bookmark.image)}</div>
          )}
          {listMode ? null : menu(bookmark.id, bookmark.title, bookmark.url)}
          {listMode ? title(bookmark.url, bookmark.title) : null}
          {listMode ? menu(bookmark.id, bookmark.title, bookmark.url) : null}
        </div>
        {listMode ? null : title(bookmark.url, bookmark.title)}
      </div>
    ));

  let session;

  if (
    accountBookmarks.bookmarks.length === 0 &&
    accountBookmarks.status === "success"
  ) {
    session = (
      <div className="page bumper">
        <h1 className="new-bm">Add your first bookmark</h1>
        <div className="add-bm first-bm" onClick={addToggler}>
          +
        </div>
        <AddBookmark addBmShowing={addBmShowing} hide={addToggler} />
      </div>
    );
  } else if (
    accountBookmarks.bookmarks !== 0 &&
    accountBookmarks.status === "success"
  ) {
    session = (
      <div className="bumper__mini">
        <div className="controls">
          <div>
            <p>Errors go here</p>
          </div>
          <div>
            <i
              className={
                descending
                  ? "material-icons highlighted icons"
                  : "material-icons icons"
              }
              onClick={() => setDescending(true)}
            >
              keyboard_arrow_up
            </i>
            <i
              className={
                descending
                  ? "material-icons icons"
                  : "material-icons highlighted icons"
              }
              onClick={() => setDescending(false)}
            >
              keyboard_arrow_down
            </i>
            <i
              className={
                listMode
                  ? "material-icons icons"
                  : "material-icons highlighted icons"
              }
              onClick={() => setListMode(false)}
            >
              view_comfy
            </i>
            <i
              className={
                listMode
                  ? "material-icons highlighted icons"
                  : "material-icons icons"
              }
              onClick={() => setListMode(true)}
            >
              reorder
            </i>
          </div>
        </div>

        <div className="page sizing">
          <div className={listMode ? "list" : "grid"}>
            {bms}
            <div
              className={listMode ? "add-bm__list" : "add-bm"}
              onClick={addToggler}
            >
              {listMode ? "Add Bookmark" : "+"}
            </div>
            <AddBookmark addBmShowing={addBmShowing} hide={addToggler} />
            <UpdateBookmark
              {...bookmark}
              props={bookmark}
              updateBmShowing={updateBmShowing}
              hide={updateToggler}
            />
          </div>
        </div>
      </div>
    );
  } else {
    session = <Spinner />;
  }

  return <div>{session}</div>;
};

export default connect(
  ({ accountBookmarks, bookmark }) => ({ accountBookmarks, bookmark }),
  { fetchAccountBookmarks, dropBookmark }
)(AccountBookmarks);
