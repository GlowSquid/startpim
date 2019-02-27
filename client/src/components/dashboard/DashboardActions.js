import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div>
      <Link to="/edit-handle">
        <button className="mini__btn">Edit Handle</button>
      </Link>

      <Link to="/add-bookmark">
        <button className="mini__btn">Add Bookmark</button>
      </Link>
      <div />
    </div>
  );
};

export default DashboardActions;
