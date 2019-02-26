import React from "react";

import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.lds_ellipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
