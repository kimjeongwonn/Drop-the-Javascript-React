import React, { ReactElement } from 'react';
import { ReactComponent as LogoSvg } from '../../Assets/Image/logo.svg';
import styles from './Logo.module.scss';

export default function Logo(): ReactElement {
  return (
    <h1>
      <LogoSvg className={styles.logo} />
    </h1>
  );
}
