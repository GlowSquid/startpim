import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentStart, deleteAccount } from "../../actions/startActions";
// import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import DashboardActions from "./DashboardActions";
import Bookmarks from "./Bookmarks";

import styles from "./Dashboard.module.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentStart();
  }

  // move deletion to settings
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { start, loading } = this.props.start;

    let dashboardContent; // or just content
    if (start === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(start).length > 0) {
        dashboardContent = (
          <div>
            <h4 className="head">
              Welcome {user.username} {start.handle}!
            </h4>
            <DashboardActions />
            {/* bookmark display here */}
            <Bookmarks bms={start.bookmarks} />
            <div style={{ marginBottom: "60px" }}>
              <button
                className="mini__btn_danger"
                onClick={this.onDeleteClick.bind(this)}
              >
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        // dashboardContent = <h1 className="head">No profile</h1>;
        dashboardContent = (
          <div>
            <p>Welcome {user.username}!</p>
            <p>Create your handle, not that it matters</p>
            <div className={styles.bm__add}>+</div>
            <Link to="/create-handle">
              <button className="btn">Get Started</button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="row">
          <h1 className="head">Dashboard</h1>
          {dashboardContent}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentStart: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  start: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentStart, deleteAccount }
)(Dashboard);
