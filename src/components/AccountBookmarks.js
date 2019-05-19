import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAccountBookmarks } from "../actions/accountBookmarks";
import Link from "next/link";
import "../styles/Bookmarks.css";

class AccountBookmarks extends Component {
  componentDidMount() {
    console.log("fetch account bookmarks in actions");
    this.props.fetchAccountBookmarks();
  }

  render() {
    const bms = this.props.accountBookmarks.bookmarks.map(bookmark => (
      <tr key={bookmark.bookmarkId}>
        <td className="td__left">
          <Link href={bookmark.url}>
            <a>{bookmark.title}</a>
          </Link>
        </td>
      </tr>
    ));

    return (
      <div>
        <table className="table">
          <thead>{bms}</thead>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ accountBookmarks }) => ({ accountBookmarks }),
  { fetchAccountBookmarks }
)(AccountBookmarks);
