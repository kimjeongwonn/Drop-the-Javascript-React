import React, { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { ReactComponent as ClapIcon } from '../Assets/Image/clap_icon.svg';
import { ReactComponent as ClosedHihatIcon } from '../Assets/Image/closed_hihat_icon.svg';
import { ReactComponent as CymbalIcon } from '../Assets/Image/cymbal_icon.svg';
import { ReactComponent as DrumIcon } from '../Assets/Image/drum_icon.svg';
import { ReactComponent as HightomIcon } from '../Assets/Image/hightom_icon.svg';
import { ReactComponent as KickIcon } from '../Assets/Image/kick_icon.svg';
import { ReactComponent as LowtomIcon } from '../Assets/Image/lowtom_icon.svg';
import { ReactComponent as OpenedHihatIcon } from '../Assets/Image/opened_hihat_icon.svg';
import { ReactComponent as RideIcon } from '../Assets/Image/ride_icon.svg';
import { ReactComponent as SidestickIcon } from '../Assets/Image/sidestick_icon.svg';

const MusicContext = createContext<MusicContextInterface>(null);

export type InstName =
  | 'drum'
  | 'sideStick'
  | 'cymbal'
  | 'openedHihat'
  | 'clap'
  | 'closedHihat'
  | 'ride'
  | 'kick'
  | 'highTom'
  | 'lowTom';

export type InstType = Record<InstName, null | AudioBuffer>;
export type InstIcon = Record<InstName, React.FC<React.SVGProps<SVGSVGElement>>>;

interface Props {
  children: React.ReactNode;
}

interface MusicRow {
  inst: InstName;
  notes: boolean[];
  show: boolean;
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface MusicContextInterface {
  music: MusicRow[];
  setMusic: SetStateType<MusicRow[]>;
  bpm: number;
  setBpm: SetStateType<number>;
  playing: boolean;
  setPlaying: SetStateType<boolean>;
  beat: number;
  setBeat: SetStateType<number>;
  icons: InstIcon;
}

export default function MusicProvider({ children }: Props): ReactElement {
  const icons: InstIcon = {
    drum: DrumIcon,
    sideStick: SidestickIcon,
    cymbal: CymbalIcon,
    openedHihat: OpenedHihatIcon,
    clap: ClapIcon,
    closedHihat: ClosedHihatIcon,
    ride: RideIcon,
    kick: KickIcon,
    highTom: HightomIcon,
    lowTom: LowtomIcon
  };
  const [bpm, setBpm] = useState<number>(150);
  const [playing, setPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>(16);
  const [music, setMusic] = useState<MusicRow[]>(() => {
    return [
      { inst: 'drum', notes: new Array(32).fill(false), show: true },
      { inst: 'sideStick', notes: new Array(32).fill(false), show: true },
      { inst: 'cymbal', notes: new Array(32).fill(false), show: true },
      { inst: 'openedHihat', notes: new Array(32).fill(false), show: true },
      { inst: 'clap', notes: new Array(32).fill(false), show: false },
      { inst: 'closedHihat', notes: new Array(32).fill(false), show: false },
      { inst: 'ride', notes: new Array(32).fill(false), show: false },
      { inst: 'kick', notes: new Array(32).fill(false), show: false },
      { inst: 'highTom', notes: new Array(32).fill(false), show: false },
      { inst: 'lowTom', notes: new Array(32).fill(false), show: false }
    ];
  });
  const contextValue = useMemo<MusicContextInterface>(
    () => ({
      music,
      setMusic,
      bpm,
      setBpm,
      playing,
      setPlaying,
      beat,
      setBeat,
      icons
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
