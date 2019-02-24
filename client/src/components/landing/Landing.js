import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import Login from "../auth/Login";
// import Register from "../auth/Register";

import styles from "./Landing.module.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className={styles.landing}>
        <h1 className={styles.h1}>
          Start<u className={styles.u}>PIM</u>
        </h1>
        <p className={styles.p}>Coming Soon...</p>
        {/* <Login />
        <Register /> */}
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
