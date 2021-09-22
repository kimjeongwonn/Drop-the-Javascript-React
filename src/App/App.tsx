import React, { ReactElement, useEffect } from 'react';
import AudioVisualizer from '../Components/AudioVisualizer/AudioVisualizer';
import Logo from '../Components/Logo/Logo';
import Controller from '../Containers/Controller/Controller';
import Panel from '../Containers/Panel/Panel';
import { useAudio } from '../Contexts/AudioContext';
import { useMusic } from '../Contexts/MusicContext';
import { usePage } from '../Contexts/PageContext';

export default function App(): ReactElement {
  const { audioAnalyserRef, audioContextRef } = useAudio();
  const { viewHeight, viewWidth } = usePage();
  const { playing } = useMusic();

  useEffect(() => {
    window.addEventListener('click', function audioContextInit() {
      audioContextRef.current.resume();
      window.removeEventListener('click', audioContextInit);
    });
  });

  return (
    <>
      <Logo />
      <Panel />
      <Controller />
      {playing ? (
        <AudioVisualizer analyserRef={audioAnalyserRef} width={viewWidth} height={viewHeight} />
      ) : null}
    </>
  );
}
