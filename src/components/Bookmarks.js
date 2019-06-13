import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
// import { useEffect } from "react";
import Spinner from "./Spinner";
import { dropBookmark, updateBookmark } from "../actions/bookmark";
import UseModal from "./UseModal";
import AddBookmark from "./BookmarkAdd";
import UpdateBookmark from "./BookmarkUpdate";
import "../styles/Bookmarks.css";

let antiSpam = false;

const AccountBookmarks = ({
  fetchAccountBookmarks,
  accountBookmarks,
  dropBookmark,
  updateBookmark,
  bookmark
}) => {
  const { addBmShowing, toggle } = UseModal();

  const { updateBmShowing, taggle } = UseModal();

  const delBm = id => {
    dropBookmark(id).then(() => {
      // fetchAccountBookmarks(accountBookmarks);
    });
  };

  // const single = (id, title, url) => {
  //   // console.log(id);
  //   // console.log(title);
  //   <UpdateBookmark
  //     // key={bookmark.id}
  //     updateBmShowing={updateBmShowing}
  //     hide={taggle}
  //     // props={(bookmark.title, bookmark.id)}
  //     props={(id, title, url)}
  //   />;
  // };

  // const single = id => {
  //   console.log("Single ID", id);
  // <UpdateBookmark
  // {...bms}
  // {...id}
  // key={index}
  // key={bookmark.id}
  // {...bookmark.id}
  // id={bookmark["id"]}

  // key={(bookmark.id, bookmark.title, bookmark.url)}
  // props={bookmark}
  // updateBmShowing={updateBmShowing}
  // hide={taggle}
  // props={(bookmark.id, bookmark.title, bookmark.url)}
  // props={[{ id: bookmark.id }]}
  // />;
  // };

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
      <div>
        <img src={bookmark.icon} height="32px" alt="" />
      </div>
      <div className="edit-bm" onClick={taggle} id={bookmark.id}>
        E
      </div>
      {/* <div className="edit-bm" onClick={taggle => bookmark.id}>
        ?
      </div> */}
      {/* <button onClick={() => single(bookmark.id)}>?</button> */}
      <button onClick={() => delBm(bookmark.id)}>X</button>
      <UpdateBookmark
        // {...bms}
        // {...bookmark}
        // key
        // key={index}
        key={bookmark.id}
        // id={bookmark["id"]}
        id={bookmark.id}
        title={bookmark.title}
        // key={(bookmark.id, bookmark.title, bookmark.url)}
        // props={bookmark}
        updateBmShowing={updateBmShowing}
        hide={taggle}
        // props={(bookmark.id, bookmark.title, bookmark.url)}
        // props={[{ id: bookmark.id }]}
      />
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
      <div className="page">
        <div className="grid">
          {bms}
          <div className="add-bm" onClick={toggle}>
            +
          </div>
          <AddBookmark addBmShowing={addBmShowing} hide={toggle} />
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
  { fetchAccountBookmarks, dropBookmark, updateBookmark }
)(AccountBookmarks);
