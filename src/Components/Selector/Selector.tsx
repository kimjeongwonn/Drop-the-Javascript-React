import cn from 'classnames';
import React, { ReactElement, useCallback } from 'react';
import { SetStateType } from '../../Contexts/MusicContext';
import styles from './Selector.module.scss';

interface Props {
  namePropName: string;
  togglePropName: string;
  listState: any[];
  setListState: SetStateType<any[]>;
  iconSet: {
    [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
  };
  nameConvertor?: (s: string) => string;
}

export default function Selector({
  namePropName,
  togglePropName: togglePropName,
  listState,
  setListState,
  iconSet,
  nameConvertor
}: Props): ReactElement {
  const toggleHandler = useCallback(
    (toggleName: string) => {
      const newState = listState.map(listItem => {
        if (listItem[namePropName] === toggleName) {
          return { ...listItem, [togglePropName]: !listItem[togglePropName] };
        }
        return { ...listItem };
      });
      if (!newState.some(listItem => listItem[togglePropName])) return;
      setListState(newState);
    },
    [namePropName, togglePropName, listState]
  );

  return (
    <div className={styles.container}>
      <ul className={cn(styles.list, 'selector')}>
        {listState.map(item => {
          const itemName = nameConvertor?.(item[namePropName]) ?? item[namePropName];
          const ItemIcon = iconSet[item[namePropName]];
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
