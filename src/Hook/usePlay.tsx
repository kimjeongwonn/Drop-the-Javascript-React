import { useEffect, useRef, useState } from 'react';
import { useAudio } from '../Contexts/AudioContext';
import { InstNameUnion } from '../Data/instData';
import { MusicState } from '../Reducers/initialStore';

export default function usePlay(
  music: MusicState['music'],
  playing: boolean,
  beat: number,
  bpm: number
): number {
  const timerId = useRef<number>();
  const { audioContext, audioContextGain, instAudioBuffers } = useAudio();
  const [playingCol, setPlayingCol] = useState<number>(0);

  function playAudio(col: number) {
    const playingInst: InstNameUnion[] = [];

    music.forEach(row => {
      if (row.show && row.notes[col]) {
        playingInst.push(row.instName);
      }
    });

    playingInst.forEach(inst => {
      const node = audioContext.createBufferSource();
      node.buffer = instAudioBuffers[inst];
      node.connect(audioContextGain);
      node.start();
      node.onended = function () {
        this.stop();
        this.disconnect(audioContextGain);
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
