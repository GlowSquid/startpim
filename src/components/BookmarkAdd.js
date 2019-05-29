import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addBookmark } from "../actions/bookmark";
import ReactDOM from "react-dom";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";

import "../styles/Form.css";
import "../styles/Modal.css";

const AddBookmark = ({ addBookmark, isShowing, hide }) => {
  if (isShowing === true) {
    const [formData, setFormData] = useState({
      title: "",
      url: ""
    });

    const { title, url } = formData;

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
      e.preventDefault();
      addBookmark(formData).then(() => {
        hide();
      });
    };

    return ReactDOM.createPortal(
      <Fragment>
        <div className="modal auth">
          <header className="modal_header">
            <h1>Add Bookmark</h1>
          </header>
          <section className="modal_content">
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
              <br />
              <input type="submit" className="btn" value="Submit" />
            </form>
          </section>
          <section className="modal_actions">
            <button className="btn btn-cancel" onClick={hide}>
              Cancel
            </button>
          </section>
        </div>
      </Fragment>,
      document.body
    );
  } else {
    return null;
  }
};

export default connect(
  ({ bookmark }) => ({ bookmark }),
  { addBookmark, fetchAccountBookmarks }
)(AddBookmark);
