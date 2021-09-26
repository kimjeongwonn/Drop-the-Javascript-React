import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  icon?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

function Button({ onClick, children, icon, size = 'lg', disabled }: Props): ReactElement {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, styles[size])}
      style={{ backgroundImage: icon ? `url(${icon})` : null }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default React.memo(Button);
