import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        &copy; Start<span>PIM</span> {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
