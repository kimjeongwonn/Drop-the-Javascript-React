import { createContext, useContext, useMemo, useState } from 'react';
import React, { ReactElement } from 'react';

const MusicContext = createContext(null);

export const audioContext = new window.AudioContext();

const instSet = {
  drum: 'null',
  'side-stick': 'null',
  cymbal: 'null',
  'opened-hihat': 'null',
  clap: 'null',
  'closed-hihat': 'null',
  ride: 'null',
  kick: 'null',
  'high-tom': 'null',
  'low-tom': 'null'
};

type InstType = keyof typeof instSet;

interface Props {
  children: React.ReactNode;
}

interface MusicProps {
  inst: InstType;
  notes: boolean[];
}

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface MusicContextProps {
  music: MusicProps[];
  setMusic: SetStateType<MusicProps[]>;
  bpm: number;
  setBpm: SetStateType<number>;
  playing: boolean;
  setPlaying: SetStateType<boolean>;
  beat: number;
  setBeat: SetStateType<number>;
}

export default function MusicProvider({ children }: Props): ReactElement {
  const [music, setMusic] = useState<MusicProps[]>(() => {
    return [
      { inst: 'drum', notes: new Array(16).fill(false) },
      { inst: 'cymbal', notes: new Array(16).fill(false) },
      { inst: 'high-tom', notes: new Array(16).fill(false) },
      { inst: 'opened-hihat', notes: new Array(16).fill(false) }
    ];
  });
  const [bpm, setBpm] = useState<number>(150);
  const [playing, setPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>(16);

  const contextValue = useMemo(
    () => ({
      music,
      setMusic,
      bpm,
      setBpm,
      playing,
      setPlaying,
      beat,
      setBeat
    }),
    [music, bpm, playing]
  );
  return <MusicContext.Provider value={contextValue}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext<MusicContextProps>(MusicContext);
  if (!context) throw new Error();
  return context;
}
