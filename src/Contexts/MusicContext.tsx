import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

const MusicContext = createContext<MusicContextInterface>(null);

export interface InstType {
  drum: null | AudioBuffer;
  sideStick: null | AudioBuffer;
  cymbal: null | AudioBuffer;
  openedHihat: null | AudioBuffer;
  clap: null | AudioBuffer;
  closedHihat: null | AudioBuffer;
  ride: null | AudioBuffer;
  kick: null | AudioBuffer;
  highTom: null | AudioBuffer;
  lowTom: null | AudioBuffer;
}

type InstSet = keyof InstType;

interface Props {
  children: React.ReactNode;
}

interface MusicRow {
  inst: InstSet;
  notes: boolean[];
}

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface MusicContextInterface {
  music: MusicRow[];
  setMusic: SetStateType<MusicRow[]>;
  bpm: number;
  setBpm: SetStateType<number>;
  playing: boolean;
  setPlaying: SetStateType<boolean>;
  beat: number;
  changeBeat: (newBeat: number) => void;
}

export default function MusicProvider({ children }: Props): ReactElement {
  const [bpm, setBpm] = useState<number>(150);
  const [playing, setPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>(16);
  const [music, setMusic] = useState<MusicRow[]>(() => {
    return [
      { inst: 'drum', notes: new Array(beat).fill(false) },
      { inst: 'cymbal', notes: new Array(beat).fill(false) },
      { inst: 'highTom', notes: new Array(beat).fill(false) },
      { inst: 'openedHihat', notes: new Array(beat).fill(false) }
    ];
  });
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
  const contextValue = useMemo<MusicContextInterface>(
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
  const context = useContext<MusicContextInterface>(MusicContext);
  if (!context) throw new Error('MusicContext의 Provider 내에서 사용해야 합니다!');
  return context;
}
