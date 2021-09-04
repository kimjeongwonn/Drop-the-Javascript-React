import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Controller from '../Containers/Controller/Controller';
import Panel from '../Containers/Panel/Panel';
import { useMusic } from '../Contexts/MusicContext';
import usePlay from '../Hook/usePlay';

export default function App(): ReactElement {
  return (
    <>
      <Panel />
      <Controller />
    </>
  );
}
