import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div>
      <Link to="/add-bookmark">
        <button className="btn__mini">Add Bookmark</button>
      </Link>
      <div />
    </div>
  );
};

export default DashboardActions;
