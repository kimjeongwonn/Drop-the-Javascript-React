import React, { ReactElement, useCallback, useState } from 'react';
import styles from './Panel.module.scss';
import { useMusic } from '../../Contexts/MusicContext';
import Cell from '../../Components/Cell/Cell';

interface Props {
  playingCol?: number;
}
interface ElementWithDataSet extends Element {
  dataset: {
    [key: string]: string;
  };
}

export default function Panel({ playingCol }: Props): ReactElement {
  const { music, setMusic } = useMusic();
  const [startCell, setStartCell] = useState<boolean>(false);

  const toggleCell = useCallback((pos, force?) => {
    const newMusic = [...music];

    newMusic[pos[0]].notes[pos[1]] = force ?? !newMusic[pos[0]].notes[pos[1]];
    setMusic(newMusic);
  }, []);

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
    [startCell]
  );
  const setStartHandler = useCallback<
    React.MouseEventHandler<HTMLDivElement> | React.FocusEventHandler<HTMLDivElement>
  >((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as ElementWithDataSet;
    if (!target.matches('[data-pos-row]')) return;
    const row = +target.dataset.posRow;
    const col = +target.dataset.posCol;
    setStartCell(!!music[row].notes[col]);
  }, []);

  return (
    <section
      className={styles.panel}
      onMouseOver={toggleHandler}
      onMouseOut={toggleHandler}
      onClick={toggleHandler}
      onMouseDown={setStartHandler as React.MouseEventHandler<HTMLDivElement>}
      onFocus={setStartHandler as React.FocusEventHandler<HTMLDivElement>}
    >
      {music.map(({ notes, inst }, rowIndex) => (
        <div key={inst} className={styles.panelLine}>
          {notes.map((note, colIndex) => (
            <Cell
              key={colIndex}
              color='blue'
              on={note}
              pos={[rowIndex, colIndex]}
              play={playingCol === colIndex}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
