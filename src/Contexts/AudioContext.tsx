import React, { createContext, ReactElement, useContext, useEffect, useMemo, useRef } from 'react';

import clap from '../Assets/Sound/clap.wav';
import closedHihat from '../Assets/Sound/closed-hihat.wav';
import cymbal from '../Assets/Sound/cymbal.wav';
import drum from '../Assets/Sound/drum.wav';
import highTom from '../Assets/Sound/high-tom.wav';
import kick from '../Assets/Sound/kick.wav';
import lowTom from '../Assets/Sound/low-tom.wav';
import openedHihat from '../Assets/Sound/opened-hihat.wav';
import ride from '../Assets/Sound/ride.wav';
import sidestick from '../Assets/Sound/sidestick.wav';
import { InstName, InstType } from './MusicContext';

const audiosFetch: Record<InstName, Promise<Response>> = {
  clap: fetch(clap),
  closedHihat: fetch(closedHihat),
  cymbal: fetch(cymbal),
  drum: fetch(drum),
  highTom: fetch(highTom),
  kick: fetch(kick),
  lowTom: fetch(lowTom),
  openedHihat: fetch(openedHihat),
  ride: fetch(ride),
  sideStick: fetch(sidestick)
};

const AudioContext = createContext<AudioContextInterface>(null);

interface AudioContextInterface {
  audioContextRef: React.MutableRefObject<AudioContext>;
  instDataRef: React.MutableRefObject<InstType>;
  audioContextGainRef: React.MutableRefObject<GainNode>;
}

interface Props {
  children: React.ReactNode;
}

export default function AudioProvider({ children }: Props): ReactElement {
  const instDataRef = useRef<InstType>({
    drum: null,
    sideStick: null,
    cymbal: null,
    openedHihat: null,
    clap: null,
    closedHihat: null,
    ride: null,
    kick: null,
    highTom: null,
    lowTom: null
  });

  const audioContextRef = useRef<AudioContext>(null);
  const audioContextGainRef = useRef<GainNode>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    audioContextGainRef.current = audioContextRef.current.createGain();

    audioContextGainRef.current.gain.value = 0.5;
    console.log(audioContextGainRef.current);
    // console.log(audiosFetch);
    (async () => {
      try {
        const list = await Promise.all(Object.values(audiosFetch));
        const arrayBufferList = await Promise.all<ArrayBuffer>(list.map(r => r.arrayBuffer()));
        const audioBufferList = await Promise.all<AudioBuffer>(
          arrayBufferList.map(a => audioContextRef.current.decodeAudioData(a))
        );
        audioBufferList.forEach(
          (value, index) =>
            (instDataRef.current[Object.keys(audiosFetch)[index] as keyof InstType] = value)
        );
      } catch (e) {
        console.error(e);
      }
      // TODO: 로딩 끝
    })();
    // TODO: 에러처리 추가
  }, []);

  const audioContextValue = useMemo<AudioContextInterface>(
    () => ({
      audioContextRef,
      instDataRef,
      audioContextGainRef
    }),
    []
  );

  return <AudioContext.Provider value={audioContextValue}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioContextInterface {
  const context = useContext<AudioContextInterface>(AudioContext);
  if (!context) throw new Error('AudioContext의 Provider 내에서 사용해야 합니다!');
  return context;
}
