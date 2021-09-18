import cn from 'classnames';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as AdjustSvg } from '../../Assets/Image/adjust_icon.svg';
import Cell, { cellColors } from '../../Components/Cell/Cell';
import Selector from '../../Components/Selector/Selector';
import Stepper from '../../Components/Stepper/Stepper';
import { useMusic } from '../../Contexts/MusicContext';
import { usePage } from '../../Contexts/PageContext';
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

interface ElementWithDataSet extends Element {
  dataset: {
    [key: string]: string;
  };
}

export default function Panel(): ReactElement {
  const { music, setMusic, playing, beat, icons } = useMusic();
  const [startCell, setStartCell] = useState<boolean>(false);
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const { pageUnit, currentPage, totalPage, setCurrentPage } = usePage();

  const playingCol = usePlay();

  useEffect(() => {
    if (playing) {
      const willMovePage = ~~(playingCol / pageUnit) + 1;
      setCurrentPage(willMovePage);
    }
  }, [playing, playingCol, pageUnit]);

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
      const col = +target.dataset.posCol + pageUnit * (currentPage - 1);
      if ((e.type === 'click' || e.buttons === 1) && target.matches('[data-pos-row]')) {
        toggleCell([row, col], !startCell);
        if (e.type === 'click' && e.detail === 0) {
          setStartCell(!startCell);
        }
      }
    },
    [music, pageUnit, currentPage]
  );

  const setStartHandler = useCallback<
    | React.MouseEventHandler<HTMLDivElement>
    | React.FocusEventHandler<HTMLDivElement>
    | React.TouchEventHandler<HTMLDivElement>
  >(
    (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.FocusEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
    ) => {
      const target = e.target as ElementWithDataSet;
      if (!target.matches('[data-pos-row]')) return;
      const row = +target.dataset.posRow;
      const col = +target.dataset.posCol + pageUnit * (currentPage - 1);
      setStartCell(music[row].notes[col]);
    },
    [music, pageUnit, currentPage]
  );

  const touchMoveHandler = (() => {
    let lastTarget: Element | null = null;
    return useCallback<React.TouchEventHandler>(
      e => {
        const { clientX, clientY } = e.touches[0];
        const currTarget = document
          .elementFromPoint(clientX, clientY)
          ?.closest('[data-pos-row]') as ElementWithDataSet;
        if (lastTarget === currTarget || !currTarget) return;
        const row = +currTarget.dataset.posRow;
        const col = +currTarget.dataset.posCol + pageUnit * (currentPage - 1);
        toggleCell([row, col], !startCell);
        lastTarget = currTarget;
      },
      [music, pageUnit, currentPage]
    );
  })();

  const convertCamelCaseToUpperCaseWithSpace = useCallback(
    (preName: string) => preName.replace(/([A-Z])/g, ' $1').toUpperCase(),
    []
  );

  return (
    <section className={styles.container}>
      <Stepper
        min={1}
        max={totalPage}
        step={1}
        valueState={currentPage}
        onChange={setCurrentPage}
      />
      <div
        className={styles.panel}
        onTouchStart={setStartHandler as React.TouchEventHandler<HTMLDivElement>}
        onTouchMove={touchMoveHandler}
        onMouseOver={toggleHandler}
        onMouseOut={toggleHandler}
        onClick={toggleHandler}
        onMouseDown={setStartHandler as React.MouseEventHandler<HTMLDivElement>}
        onFocus={setStartHandler as React.FocusEventHandler<HTMLDivElement>}
      >
        {music.map(({ notes, inst, show }, rowIndex) => {
          const SvgIcon = icons[inst];
          const activatedNotes = notes.slice(0, beat);
          const pagedNotes = activatedNotes.slice(
            pageUnit * (currentPage - 1),
            pageUnit * currentPage
          );
          return show ? (
            <div role='grid' key={inst} className={styles.panelLine}>
              <SvgIcon
                className={cn(styles.svgIcon, styles[INST_COLORS[rowIndex]])}
                viewBox='0 0 45 45'
              />
              {pagedNotes.map((note, colIndex) => (
                <Cell
                  key={colIndex}
                  color={INST_COLORS[rowIndex]}
                  on={note}
                  pos={[rowIndex, colIndex]}
                  play={playing && playingCol % pageUnit === colIndex}
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
  );
}
