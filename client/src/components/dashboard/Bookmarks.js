import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteBookmark } from "../../actions/startActions";

class Bookmarks extends Component {
  onDeleteClick(id) {
    this.props.deleteBookmark(id, this.props.history);
  }

  render() {
    const bms = this.props.bms.map(bm => (
      <tr key={bm._id}>
        <td>
          <img src="{bm.url}/favicon.ico" alt="" />
        </td>
        <td>
          <Link to={bm.url}>{bm.title}</Link>
        </td>
        {/* <td>{bm.added}</td> */}
        <td>
          <button onClick={this.onDeleteClick.bind(this, bm._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4>Bookmarks</h4>
        <table>
          <thead>{bms}</thead>
        </table>
      </div>
    );
  }
}

Bookmarks.propTypes = {
  deleteBookmark: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBookmark }
)(withRouter(Bookmarks));
