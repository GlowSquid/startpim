import React from "react";
import Layout from "./Layout";
import Spinner from "./Spinner";

function Loader() {
  return (
    <Layout>
      <div className="bumper">
        <Spinner />
      </div>
    </Layout>
  );
}

export default Loader;
