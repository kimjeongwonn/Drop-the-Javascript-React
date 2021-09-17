import React, { ReactElement, useEffect } from 'react';
import Controller from '../Containers/Controller/Controller';
import Panel from '../Containers/Panel/Panel';
import { useAudio } from '../Contexts/AudioContext';

export default function App(): ReactElement {
  const { audioContextRef } = useAudio();

  useEffect(() => {
    window.addEventListener('click', function audioContextInit() {
      audioContextRef.current.resume();
      window.removeEventListener('click', audioContextInit);
    });
  });

  return (
    <>
      <Panel />
      <Controller />
    </>
  );
}
