import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { updateBookmark } from "../actions/bookmark";
import ReactDOM from "react-dom";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";

import "../styles/Form.css";
import "../styles/Modal.css";

const UpdateBookmark = ({
  updateBookmark,
  updateBmShowing,
  hide,
  bookmark,
  id
}) => {
  if (updateBmShowing === true) {
    const [formData, setFormData] = useState({
      // url: "https://vg.no",
      // url: bookmark.url,
      url: "",
      // url: props.url,
      title: "",
      // title: props.title,
      // id: 408
      id: id
    });
    // console.log(props);
    console.log("id is ", id);
    console.log("bookmark is ", bookmark);
    // console.log(bookmark.id);
    // console.log(bookmark);

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
        <div className="modal auth">
          <header className="modal_header">
            <h1>Update Bookmark</h1>
          </header>
          <section className="modal_content">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <input
                type="text"
                placeholder="URL"
                name="url"
                value={url}
                onChange={e => onChange(e)}
                className="input"
                // props={props.url}
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
                // props={props.title}
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
            {/* {bookmark.id} */}
            {/* {props.id} */}
            {id}
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
  ({ accountBookmarks, bookmark }) => ({ accountBookmarks, bookmark }),
  // ({ accountBookmarks }) => ({ accountBookmarks }),
  { updateBookmark, fetchAccountBookmarks }
)(UpdateBookmark);
