import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Panel from '../Containers/Panel/Panel';
import { useMusic } from '../Contexts/MusicContext';
import usePlay from '../Hook/usePlay';

export default function App(): ReactElement {
  const { playing, setPlaying } = useMusic();
  const playingCol = usePlay();
  return (
    <>
      <button onClick={() => setPlaying(!playing)}>dd</button>
      <Panel playingCol={playing ? playingCol : null} />
    </>
  );
}
