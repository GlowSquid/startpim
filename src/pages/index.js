import React from "react";
import { connect } from "react-redux";

import Loader from "../components/Loader";
import Start from "../components/Start";
import Landing from "../components/Landing";

function Root({ account }) {
  if (account.loggedIn === true) {
    return <Start />;
    // } else if (account.status === "fetching" && account.loggedIn === false) {
    //   return <Landing />;
    // } else if (account.status === "fetching" && account.loggedIn === true) {
    //   return <Start />;
  } else if (account.status === "fetching") {
    return <Loader />;
  } else {
    return <Landing />;
  }
  // return account.loggedIn ? <Start /> : <Landing />;
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
