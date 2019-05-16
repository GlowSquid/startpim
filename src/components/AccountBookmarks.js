import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";

class AccountBookmarks extends Component {
  componentDidMount() {
    console.log("fetch account bookmarks in actions");
    this.props.fetchAccountBookmarks();
  }

  render() {
    return (
      <div>
        <h3>Account Bookmarks</h3>
        {this.props.accountBookmarks.bookmarks.map(bookmark => {
          return (
            <div key={bookmark.bookmarkId}>
              Test: {bookmark.url}
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(
  ({ AccountBookmarks }) => ({ AccountBookmarks }),
  { fetchAccountBookmarks }
)(AccountBookmarks);
