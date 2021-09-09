import cn from 'classnames';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as AdjustSvg } from '../../Assets/Image/adjust_icon.svg';
import Cell, { cellColors } from '../../Components/Cell/Cell';
import Selector from '../../Components/Selector/Selector';
import { useMusic } from '../../Contexts/MusicContext';
import usePlay from '../../Hook/usePlay';
import styles from './Panel.module.scss';

const INST_COLORS: cellColors[] = [
  'red',
  'orange',
  'yellow',
  'lightgreen',
  'green',
  'jade',
  'skyblue',
  'blue',
  'plum',
  'purple'
];

interface Props {}
interface ElementWithDataSet extends Element {
  dataset: {
    [key: string]: string;
  };
}

export default function Panel({}: Props): ReactElement {
  const { music, setMusic, playing, beat, icons } = useMusic();
  const [startCell, setStartCell] = useState<boolean>(false);
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const playingCol = usePlay();

  useEffect(() => {
    if (openSelector) {
      const clickHandler = (e: MouseEvent) => {
        const target = e.target as Element;
        if (!target.closest('.selector')) {
          setOpenSelector(false);
        }
      };
      const keyUpHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpenSelector(false);
        }
      };
      document.addEventListener('click', clickHandler);
      document.addEventListener('keyup', keyUpHandler);
      return () => {
        document.removeEventListener('click', clickHandler);
        document.removeEventListener('keyup', keyUpHandler);
      };
    }
  }, [openSelector]);

  const toggleCell = useCallback(
    (pos, force?) => {
      const newMusic = [...music];

      newMusic[pos[0]].notes[pos[1]] = force ?? !newMusic[pos[0]].notes[pos[1]];
      setMusic(newMusic);
    },
    [music]
  );

  const toggleHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      const target = e.target as ElementWithDataSet;
      const row = +target.dataset.posRow;
      const col = +target.dataset.posCol;
      if ((e.type === 'click' || e.buttons === 1) && target.matches('[data-pos-row]')) {
        toggleCell([row, col], !startCell);
        if (e.type === 'click' && e.detail === 0) {
          setStartCell(!startCell);
        }
      }
    },
    [startCell, beat, music]
  );
  const setStartHandler = useCallback<
    React.MouseEventHandler<HTMLDivElement> | React.FocusEventHandler<HTMLDivElement>
  >(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FocusEvent<HTMLDivElement>) => {
      const target = e.target as ElementWithDataSet;
      if (!target.matches('[data-pos-row]')) return;
      const row = +target.dataset.posRow;
      const col = +target.dataset.posCol;
      setStartCell(!!music[row].notes[col]);
    },
    [beat]
  );

  const convertCamelCaseToUpperCaseWithSpace = useCallback(
    (preName: string) => preName.replace(/([A-Z])/g, ' $1').toUpperCase(),
    []
  );

  return (
    <>
      <section className={styles.container}>
        <div
          className={styles.panel}
          onMouseOver={toggleHandler}
          onMouseOut={toggleHandler}
          onClick={toggleHandler}
          onMouseDown={setStartHandler as React.MouseEventHandler<HTMLDivElement>}
          onFocus={setStartHandler as React.FocusEventHandler<HTMLDivElement>}
        >
          {music.map(({ notes, inst, show }, rowIndex) => {
            const SvgIcon = icons[inst];
            return show ? (
              <div role='grid' key={inst} className={styles.panelLine}>
                <SvgIcon
                  className={cn(styles.svgIcon, styles[INST_COLORS[rowIndex]])}
                  viewBox='0 0 45 45'
                />
                {notes.slice(0, beat).map((note, colIndex) => (
                  <Cell
                    key={colIndex}
                    color={INST_COLORS[rowIndex]}
                    on={note}
                    pos={[rowIndex, colIndex]}
                    play={playing && playingCol === colIndex}
                  />
                ))}
              </div>
            ) : null;
          })}

          <div role='grid' className={styles.panelLine}>
            <AdjustSvg
              className={styles.svgIcon}
              style={{ cursor: 'pointer' }}
              viewBox='0 0 50 50'
              onClick={() => setOpenSelector(!openSelector)}
            />
          </div>
        </div>

        {openSelector
          ? createPortal(
              <Selector
                namePropName='inst'
                togglePropName='show'
                listState={music}
                iconSet={icons}
                nameConvertor={convertCamelCaseToUpperCaseWithSpace}
                setListState={setMusic}
              />,
              document.getElementById('root')
            )
          : null}
      </section>
    </>
  );
}
