import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import Login from "../auth/Login";
// import Register from "../auth/Register";

import "./Landing.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <h1>
          Start<span>PIM</span>
        </h1>
        <p>Coming Soon...</p>
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
