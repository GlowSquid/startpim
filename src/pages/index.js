import React from "react";
import { connect } from "react-redux";
import Start from "../components/Start";
import Index from "../components/Landing";

function Root({ account }) {
  return account.loggedIn ? <Start /> : <Index />;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
