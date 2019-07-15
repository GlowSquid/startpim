import React from "react";
import { connect } from "react-redux";

import Loader from "../components/Loader";
import Start from "../components/Start";
import Index from "../components/Landing";

function Root({ account }) {
  if (account.loggedIn === true) {
    return <Start />;
    // } else if (account.status === "fetching" && account.loggedIn === false) {
    //   return <Index />;
    // } else if (account.status === "fetching" && account.loggedIn === true) {
    //   return <Start />;
  } else if (account.status === "fetching") {
    return <Loader />;
  } else {
    return <Index />;
  }
  // return account.loggedIn ? <Start /> : <Index />;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
