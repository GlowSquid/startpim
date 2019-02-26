import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentStart } from "../../actions/startActions";
// import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";

import styles from "./Dashboard.module.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentStart();
  }

  render() {
    const { user } = this.props.auth;
    const { start, loading } = this.props.start;

    let dashboardContent; // or just content
    if (start === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(start).length > 0) {
        dashboardContent = <h4 className="head">Have Profile</h4>;
      } else {
        // dashboardContent = <h1 className="head">No profile</h1>;
        dashboardContent = (
          <div>
            <p>Welcome {user.username}!</p>
            <p>Create your first bookmark</p>
            <div className={styles.bm__add}>+</div>
            <Link to="/create-bookmark">
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
  auth: PropTypes.object.isRequired,
  start: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentStart }
)(Dashboard);
