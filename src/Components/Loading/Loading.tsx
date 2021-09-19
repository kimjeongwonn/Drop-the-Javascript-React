import React, { ReactElement } from 'react';
import styles from './Loading.module.scss';

export default function Loading(): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
}
