import React, { ReactElement, useEffect } from 'react';
import AudioVisualizer from '../Components/AudioVisualizer/AudioVisualizer';
import Logo from '../Components/Logo/Logo';
import Controller from '../Containers/Controller/Controller';
import Panel from '../Containers/Panel/Panel';
import { useAudio } from '../Contexts/AudioContext';
import { useAppSelector } from '../Hook/useReducer';
import { selectPlaying } from '../Reducers/musicSlice';

export default function App(): ReactElement {
  const { audioContext, audioAnalyser } = useAudio();
  const playing = useAppSelector(selectPlaying);

  useEffect(() => {
    window.addEventListener('click', function audioContextInit() {
      audioContext.resume();
      window.removeEventListener('click', audioContextInit);
    });
  }, []);

  return (
    <>
      <Logo />
      <Panel />
      <Controller />
      {playing ? <AudioVisualizer analyser={audioAnalyser} /> : null}
    </>
  );
}
