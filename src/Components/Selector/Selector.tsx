/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import React, { ReactElement, useCallback } from 'react';
import styles from './Selector.module.scss';

interface Props {
  namePropName: string;
  togglePropName: string;
  iconPropName: string;
  listState: any[];
  listInfo: { [key: string]: any };
  onToggle: (instName: string) => void;
  nameConvertor?: (s: string) => string;
}

export default function Selector({
  namePropName,
  togglePropName,
  iconPropName,
  listState,
  listInfo,
  onToggle,
  nameConvertor
}: Props): ReactElement {
  const toggleHandler = useCallback(toggleItemName => onToggle(toggleItemName), []);

  return (
    <div className={styles.container}>
      <ul className={cn(styles.list, 'selector')}>
        {listState.map(item => {
          const itemName = nameConvertor?.(item[namePropName]) ?? item[namePropName];
          const ItemIcon = listInfo[item[namePropName]][iconPropName];
          const checked = item[togglePropName];
          return (
            <li
              className={cn(styles.item, checked ? styles.checked : '')}
              key={item[namePropName]}
              role='checkbox'
              aria-checked={checked}
              onClick={() => toggleHandler(item[namePropName])}
            >
              <ItemIcon className={styles.icon} viewBox='0 0 45 45' />
              <span>{itemName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
