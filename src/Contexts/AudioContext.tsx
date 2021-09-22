import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

import Loading from '../Components/Loading/Loading';
import { InstName, InstType } from './MusicContext';

import clapUrl from '../Assets/Sound/clap.wav';
import closedHihatUrl from '../Assets/Sound/closed-hihat.wav';
import cymbalUrl from '../Assets/Sound/cymbal.wav';
import drumUrl from '../Assets/Sound/drum.wav';
import highTomUrl from '../Assets/Sound/high-tom.wav';
import kickUrl from '../Assets/Sound/kick.wav';
import lowTomUrl from '../Assets/Sound/low-tom.wav';
import openedHihatUrl from '../Assets/Sound/opened-hihat.wav';
import rideUrl from '../Assets/Sound/ride.wav';
import sidestickUrl from '../Assets/Sound/sidestick.wav';

console.log(clapUrl);

const audiosFetch: Record<InstName, Promise<Response>> = {
  clap: fetch(clapUrl),
  closedHihat: fetch(closedHihatUrl),
  cymbal: fetch(cymbalUrl),
  drum: fetch(drumUrl),
  highTom: fetch(highTomUrl),
  kick: fetch(kickUrl),
  lowTom: fetch(lowTomUrl),
  openedHihat: fetch(openedHihatUrl),
  ride: fetch(rideUrl),
  sideStick: fetch(sidestickUrl)
};

const AudioContext = createContext<AudioContextInterface>(null);

interface AudioContextInterface {
  audioContextRef: React.MutableRefObject<AudioContext>;
  instDataRef: React.MutableRefObject<InstType>;
  audioContextGainRef: React.MutableRefObject<GainNode>;
  audioAnalyserRef: React.MutableRefObject<AnalyserNode>;
}

interface Props {
  children: React.ReactNode;
}

export default function AudioProvider({ children }: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
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

  const audioContextRef = useRef<AudioContext>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new (window.AudioContext || window.webkitAudioContext)()
  );

  const audioContextGainRef = useRef<GainNode>(audioContextRef.current.createGain());
  const audioAnalyserRef = useRef<AnalyserNode>(audioContextRef.current.createAnalyser());
  audioContextGainRef.current.connect(audioAnalyserRef.current);
  audioAnalyserRef.current.connect(audioContextRef.current.destination);

  useEffect(() => {
    audioContextGainRef.current.gain.value = 0.5;

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
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const audioContextValue = useMemo<AudioContextInterface>(
    () => ({
      audioContextRef,
      instDataRef,
      audioContextGainRef,
      audioAnalyserRef
    }),
    []
  );

  return (
    <AudioContext.Provider value={audioContextValue}>
      {isLoading ? createPortal(<Loading />, document.getElementById('root')) : children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextInterface {
  const context = useContext<AudioContextInterface>(AudioContext);
  if (!context) throw new Error('AudioContext의 Provider 내에서 사용해야 합니다!');
  return context;
}
