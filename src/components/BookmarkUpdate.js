import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { updateBookmark } from "../actions/bookmark";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import "../styles/Form.css";
import "../styles/Modal.css";

function UpdateBookmark({ updateBookmark, updateBmShowing, hide, props }) {
  if (updateBmShowing === true) {
    const [formData, setFormData] = useState({
      url: props.url,
      title: props.title,
      id: props.id
    });

    const { title, url } = formData;

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
      e.preventDefault();
      updateBookmark(formData).then(() => {
        hide();
      });
    };

    return ReactDOM.createPortal(
      <Fragment>
        <Backdrop />
        <div className="modal auth">
          <header className="modal_header">
            <h1>Edit Bookmark</h1>
          </header>
          <section className="modal_content">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <input
                type="url"
                placeholder="URL"
                name="url"
                value={url}
                onChange={e => onChange(e)}
                className="input"
                required
              />
              <br />
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                className="input"
                required
              />
              <br />
              <input type="submit" className="btn" value="Submit" />
            </form>
          </section>
          <section className="modal_actions">
            <input
              type="button"
              className="btn btn-cancel"
              value="Cancel"
              onClick={hide}
            />
          </section>
        </div>
      </Fragment>,
      document.body
    );
  } else {
    return null;
  }
}

export default connect(
  ({ accountBookmarks }) => ({ accountBookmarks }),
  { updateBookmark }
)(UpdateBookmark);
