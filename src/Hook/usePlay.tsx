import { useEffect, useRef, useState } from 'react';
import { useAudio } from '../Contexts/AudioContext';
import { InstType, useMusic } from '../Contexts/MusicContext';

export default function usePlay(): number {
  const timerId = useRef<number>();
  const { playing, beat, bpm, music } = useMusic();
  const { audioContextRef, instDataRef, audioContextGainRef } = useAudio();
  const [playingCol, setPlayingCol] = useState<number>(0);

  function playAudio(col: number) {
    const playingInst: (keyof InstType)[] = [];
    const ctx = audioContextRef.current;

    music.forEach(row => {
      if (row.show && row.notes[col]) {
        playingInst.push(row.inst);
      }
    });

    playingInst.forEach(inst => {
      const insts = instDataRef.current;
      const node = ctx.createBufferSource();
      node.buffer = insts[inst];
      node.connect(audioContextGainRef.current);
      node.start();
      node.onended = function () {
        this.stop();
        this.disconnect(audioContextGainRef.current);
      };
    });
  }

  useEffect(() => {
    if (!playing) {
      window.clearTimeout(timerId.current);
      setPlayingCol(0);
    }
    if (playing) {
      playAudio(playingCol);
      timerId.current = window.setTimeout(() => {
        setPlayingCol((playingCol + 1) % beat);
      }, 60000 / bpm);
    }

    return () => {
      window.clearTimeout(timerId.current);
    };
  }, [playing, playingCol]);

  return playingCol;
}
