import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import React, { ReactElement } from 'react';

const MusicContext = createContext(null);

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
  changeBeat: (newBeat: number) => void;
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
  const changeBeat = useCallback(
    newBeat => {
      if (newBeat < beat) {
        setMusic(
          music.map(row => {
            return { ...row, notes: [...row.notes].slice(0, newBeat) };
          })
        );
      }
      if (newBeat > beat) {
        setMusic(
          music.map(row => {
            return { ...row, notes: [...row.notes, ...new Array(newBeat - beat).fill(false)] };
          })
        );
      }
      if (newBeat === beat) {
        return;
      }
      setBeat(newBeat);
    },
    [beat]
  );
  const contextValue = useMemo(
    () => ({
      music,
      setMusic,
      bpm,
      setBpm,
      playing,
      setPlaying,
      beat,
      changeBeat
    }),
    [music, bpm, playing, beat]
  );
  return <MusicContext.Provider value={contextValue}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext<MusicContextProps>(MusicContext);
  if (!context) throw new Error();
  return context;
}
