import React from 'react';

import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; StartPIM {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
