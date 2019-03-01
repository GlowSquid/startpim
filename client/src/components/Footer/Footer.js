import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>
        &copy; Start<span>PIM</span> {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
