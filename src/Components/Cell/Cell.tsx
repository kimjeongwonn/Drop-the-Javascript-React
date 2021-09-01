import React from 'react';
import style from './Cell.module.scss';
import cn from 'classnames';

export type cellColors =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'lightgreen'
  | 'green'
  | 'jade'
  | 'skyblue'
  | 'blue'
  | 'plum';

interface Props {
  color: cellColors;
  play?: boolean;
  on?: boolean;
}

export default function Cell({ color, play, on }: Props): React.ReactElement {
  return (
    <div
      className={cn(style.cell, style[color], play ? style.play : null, on ? style.on : null)}
      tabIndex={0}
    ></div>
  );
}
