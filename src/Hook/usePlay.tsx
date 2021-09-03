import { useEffect, useRef, useState } from 'react';
import { useMusic } from '../Contexts/MusicContext';

export default function usePlay(callback?: (playingCol: number) => void) {
  const timerId = useRef<number>();
  const { playing, beat, bpm } = useMusic();
  const [playingCol, setPlayingCol] = useState<number>(0);
  useEffect(() => {
    if (!playing) {
      window.clearTimeout(timerId.current);
      setPlayingCol(0);
    }
    if (playing) {
      timerId.current = window.setTimeout(() => {
        setPlayingCol((playingCol + 1) % beat);
        callback?.(playingCol);
      }, 60000 / bpm);
    }

    return () => {
      window.clearTimeout(timerId.current);
    };
  }, [playing, playingCol, bpm]);

  return playingCol;
}
