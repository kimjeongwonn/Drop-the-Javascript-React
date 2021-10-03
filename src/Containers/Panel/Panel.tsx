import cn from 'classnames';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as AdjustSvg } from '../../Assets/Image/adjust_icon.svg';
import Cell, { cellColors } from '../../Components/Cell/Cell';
import Selector from '../../Components/Selector/Selector';
import Stepper from '../../Components/Stepper/Stepper';
import { instInfo } from '../../Data/instData';
import usePlay from '../../Hook/usePlay';
import { useAppDispatch, useAppSelector } from '../../Hook/useReducer';
import {
  selectBeat,
  selectBpm,
  selectMusic,
  selectPlaying,
  toggleInstShowing,
  toggleMusicCell
} from '../../Reducers/musicSlice';
import {
  selectCurrentPage,
  selectPageUnit,
  selectTotalPage,
  setPage,
  setView
} from '../../Reducers/viewSlice';
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
  const [startCell, setStartCell] = useState<boolean>(false);
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const playing = useAppSelector(selectPlaying);
  const music = useAppSelector(selectMusic);
  const beat = useAppSelector(selectBeat);
  const bpm = useAppSelector(selectBpm);

  const pageUnit = useAppSelector(selectPageUnit);
  const totalPage = useAppSelector(selectTotalPage);
  const currentPage = useAppSelector(selectCurrentPage);
  const changePageDispatch = useCallback((newPage: number) => dispatch(setPage(newPage)), []);

  const playingCol = usePlay(music, playing, beat, bpm);
  const currentPlayingPage = ~~(playingCol / pageUnit) + 1;

  useEffect(() => {
    dispatch(setView({ width: window.innerWidth, height: window.innerHeight, currentBeat: beat }));
    function resizeHandler() {
      dispatch(
        setView({ width: window.innerWidth, height: window.innerHeight, currentBeat: beat })
      );
    }
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [beat]);

  useEffect(() => {
    if (playing) {
      changePageDispatch(currentPlayingPage);
    }
  }, [currentPlayingPage, playing]);

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

  const toggleCell = (pos: [number, number], force?: boolean) =>
    dispatch(toggleMusicCell({ pos, force }));

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
    [music, pageUnit, currentPage, startCell]
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

  /* lastTarget과 currTarget을 비교하여 같은 Cell 안에서 move이벤트가 발생해도 무시해줌 */
  const touchMoveHandler = useCallback<React.TouchEventHandler>(
    ((): React.TouchEventHandler => {
      let lastTarget: Element | null = null;
      return e => {
        const { clientX, clientY } = e.touches[0];
        const currTarget = document
          .elementFromPoint(clientX, clientY)
          ?.closest('[data-pos-row]') as ElementWithDataSet;
        if (lastTarget === currTarget || !currTarget) return;
        const row = +currTarget.dataset.posRow;
        const col = +currTarget.dataset.posCol + pageUnit * (currentPage - 1);
        toggleCell([row, col], !startCell);
        lastTarget = currTarget;
      };
    })(),
    [startCell, currentPage]
  );

  const toggleInstShowingDispatch = useCallback(
    instName => dispatch(toggleInstShowing(instName)),
    []
  );

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
        setValueState={changePageDispatch}
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
        {music.map(({ notes, instName, show }, rowIndex) => {
          const SvgIcon = instInfo[instName].SvgIcon;
          const activatedNotes = notes.slice(0, beat);
          const pagedNotes = activatedNotes.slice(
            pageUnit * (currentPage - 1),
            pageUnit * currentPage
          );
          return show ? (
            <div role='grid' key={instName} className={styles.panelLine}>
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
              namePropName='instName'
              togglePropName='show'
              iconPropName='SvgIcon'
              listState={music}
              listInfo={instInfo}
              nameConvertor={convertCamelCaseToUpperCaseWithSpace}
              onToggle={toggleInstShowingDispatch}
            />,
            document.getElementById('root')
          )
        : null}
    </section>
  );
}
