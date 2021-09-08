import cn from 'classnames';
import React from 'react';
import styles from './Cell.module.scss';

export type cellColors =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'lightgreen'
  | 'green'
  | 'jade'
  | 'skyblue'
  | 'blue'
  | 'plum'
  | 'purple';

interface Props {
  color: cellColors;
  play?: boolean;
  on?: boolean;
  pos: [number, number];
}

export default function Cell({ color, play, on, pos }: Props): React.ReactElement {
  return (
    <button
      className={cn(styles.cell, styles[color], play ? styles.play : null, on ? styles.on : null)}
      tabIndex={0}
      data-pos-row={pos[0]}
      data-pos-col={pos[1]}
    ></button>
  );
}
