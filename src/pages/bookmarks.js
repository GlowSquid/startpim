import { Fragment, useState } from "react";
// import fetch from "isomorphic-unfetch";
// import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { addBm } from "../actions/bm";

import Layout from "../components/Layout";
import "../styles/Auth.css";

let clicked = false;

const Bookmarks = ({ addBm, bm }) => {
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
    addBm(formData);
    clicked = true;
    // console.log(bm);
    // console.log(bm.message);
    // console.log(bm.status);
    // console.log(bm.type);
  };

  if (
    clicked === true &&
    bm.message === "This bookmark is already stored" &&
    bm.status === "error"
  ) {
    setShowData(bm.message);
    clicked = false;
  } else if (clicked === true && bm.message === "Bookmark Added") {
    setShowData(bm.message); // æ Should not be red color
    console.log("mess", bm.message);
    clicked = false;
  }

  return (
    <Layout>
      <Fragment>
        <h1 className="bumper">Bookmarks</h1>
        <i>- Display saved bms here</i>
        <h3>Add Bookmark</h3>
        <i>- Turn add-bm into modal</i>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="text"
            placeholder="URL"
            name="url"
            value={url}
            onChange={e => onChange(e)}
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
      </Fragment>
    </Layout>
  );
};

export default connect(
  ({ bm }) => ({ bm }),
  { addBm }
)(Bookmarks);
