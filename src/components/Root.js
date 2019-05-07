import React, { Component } from "react";
import { connect } from "react-redux";
import Start from "../pages/dashboard";
import Index from "../pages/index";

class Root extends Component {
  render() {
    return this.props.account.loggedIn ? <Start /> : <Index />;
  }
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
