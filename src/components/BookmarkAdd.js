import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addBookmark } from "../actions/bookmark";
import ReactDOM from "react-dom";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Backdrop from "./Backdrop";

import "../styles/Form.css";
import "../styles/Modal.css";

const AddBookmark = ({ addBookmark, addBmShowing, hide }) => {
  if (addBmShowing === true) {
    const [formData, setFormData] = useState({
      url: ""
    });

    const { url } = formData;

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
        <Backdrop />
        <div className="modal auth">
          <header className="modal_header">
            <h1>Add Bookmark</h1>
          </header>
          <section className="modal_content">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <input
                type="url"
                placeholder="https://example.com"
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
};

export default connect(
  ({ bookmark }) => ({ bookmark }),
  { addBookmark, fetchAccountBookmarks }
)(AddBookmark);
