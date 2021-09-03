import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Panel from '../Containers/Panel/Panel';
import { useMusic } from '../Contexts/MusicContext';

export default function App(): ReactElement {
  const timerId = useRef<number>();
  const { playing, beat, setPlaying } = useMusic();
  const [playingCol, setPlayingCol] = useState<number>();

  useEffect(() => {
    if (!playing) {
      window.clearTimeout(timerId.current);
      setPlayingCol(0);
    }
    if (playing) {
      timerId.current = window.setTimeout(() => {
        console.log('interval');

        setPlayingCol((playingCol + 1) % beat);
      }, 250);
    }

    return () => {
      window.clearTimeout(timerId.current);
    };
  }, [playing, playingCol]);

  return (
    <>
      <button onClick={() => setPlaying(!playing)}>dd</button>
      <Panel playingCol={playing ? playingCol : null} />
    </>
  );
}
