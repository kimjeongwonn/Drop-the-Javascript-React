import React, { ReactElement, useCallback, useState } from 'react';
import styles from './Panel.module.scss';
import { useMusic } from '../../Contexts/MusicContext';
import Cell from '../../Components/Cell/Cell';

interface Props {}
interface ElementWithDataSet extends Element {
  dataset: {
    [key: string]: string;
  };
}

export default function Panel({}: Props): ReactElement {
  const { music, setMusic } = useMusic();
  const [startCell, setStartCell] = useState<boolean>(false);

  const toggleCell = useCallback((pos, force?) => {
    const newMusic = [...music];

    newMusic[pos[0]].notes[pos[1]] = force ?? !newMusic[pos[0]].notes[pos[1]];
    setMusic(newMusic);
  }, []);

  const overHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      const target = e.target as ElementWithDataSet;
      const row = +target.dataset.posRow;
      const col = +target.dataset.posCol;
      if (e.buttons === 1 && target.matches('[data-pos-row]')) {
        toggleCell([row, col], !startCell);
      }
    },
    [startCell]
  );

  const downHandler = useCallback(
    e => {
      const target = e.target as ElementWithDataSet;
      if (!target.matches('[data-pos-row]')) return;
      const row = +target.dataset.posRow;
      const col = +target.dataset.posCol;
      setStartCell(!!music[row].notes[col]);
    },
    [music]
  );

  return (
    <section className={styles.panel} onMouseOver={overHandler} onMouseDown={downHandler}>
      {music.map(({ notes, inst }, rowIndex) => (
        <div key={inst} className={styles.panelLine}>
          {notes.map((note, colIndex) => (
            <Cell key={colIndex} color='blue' on={note} pos={[rowIndex, colIndex]} />
          ))}
        </div>
      ))}
    </section>
  );
}
