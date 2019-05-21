import { Fragment, useState } from "react";
// import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import AccountBookmarks from "../components/AccountBookmarks";
import { addBookmark } from "../actions/bookmark";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";

import Layout from "../components/Layout";
import "../styles/Form.css";

let clicked = false;

const Bookmarks = ({
  addBookmark,
  bookmark,
  fetchAccountBookmarks,
  accountBookmarks
}) => {
  const [formData, setFormData] = useState({
    title: "",
    url: ""
  });

  const [showData, setShowData] = useState();

  const { title, url } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowData("");
  };

  const onSubmit = async e => {
    e.preventDefault();
    addBookmark(formData);
    clicked = true;
    // console.log(bookmark);
    // console.log(bookmark.message);
    // console.log(bookmark.status);
    // console.log(bookmark.type);
  };

  // if (
  //   clicked === true &&
  //   bookmark.message === "This bookmark is already stored" &&
  //   bookmark.status === "error"
  // ) {
  //   setShowData(bookmark.message);
  //   clicked = false;
  // } else if (clicked === true && bookmark.message === "Bookmark Added") {
  //   setShowData(bookmark.message); // æ Should not be red color
  //   fetchAccountBookmarks(accountBookmarks);
  //   clicked = false;
  // }

  if (clicked === true && bookmark.status !== "fetching") {
    clicked = false;
    setShowData(bookmark.message);
    fetchAccountBookmarks(accountBookmarks);
  }

  return (
    <Layout>
      <Fragment>
        <div className="auth">
          <h1 className="bumper">Bookmarks</h1>
          <i>- Display saved bms here</i>
          <AccountBookmarks />
          <h3>Add Bookmark</h3>
          <i>- Turn add-bookmark into modal</i>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => onChange(e)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={e => onChange(e)}
              className="input"
              required
            />
            <p className="error">{showData}</p>
            <br />
            <input type="submit" className="btn" value="Submit" />
          </form>
          <p>
            Go{" "}
            <Link href="/">
              <a>back</a>
            </Link>
            .
          </p>
        </div>
      </Fragment>
    </Layout>
  );
};

export default connect(
  ({ bookmark }) => ({ bookmark }),
  { addBookmark, fetchAccountBookmarks }
)(Bookmarks);
