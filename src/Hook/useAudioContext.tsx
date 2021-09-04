import { useMemo } from 'react';

export default function useAudioContext() {
  const audioContext = useMemo(() => {
    // @ts-ignore
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }, []);

  return;
}
