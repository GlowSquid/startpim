import React, { Component } from 'react';

import styles from './Landing.module.css';

class Landing extends Component {
  render() {
    return (
      <div className={styles.landing}>
        <h1 className={styles.h1}>
          Start<u className={styles.u}>PIM</u>
        </h1>
        <p className={styles.p}>Coming Soon...</p>
      </div>
    );
  }
}

export default Landing;
