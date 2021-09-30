import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Loading from '../Components/Loading/Loading';
import { instInfo, InstNameUnion } from '../Data/instData';

interface AudioContextInterface {
  audioContext: AudioContext;
  instAudioBuffers: Partial<Record<InstNameUnion, AudioBuffer>>;
  audioContextGain: GainNode;
  audioAnalyser: AnalyserNode;
}

const AudioContext = React.createContext<AudioContextInterface>(null);

interface Props {
  children: React.ReactNode;
}

export default function AudioProvider({ children }: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const audioContextRef = useRef<AudioContext>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const audioContextGainRef = useRef<GainNode>(audioContextRef.current.createGain());
  const audioAnalyserRef = useRef<AnalyserNode>(audioContextRef.current.createAnalyser());
  audioContextGainRef.current.connect(audioAnalyserRef.current);
  audioAnalyserRef.current.connect(audioContextRef.current.destination);

  const instAudioBuffers = useRef<Partial<Record<InstNameUnion, AudioBuffer>>>({});

  useEffect(() => {
    audioContextGainRef.current.gain.value = 0.5;
    const instPromiseArray: Partial<Record<InstNameUnion, Promise<Response>>> = {};
    for (const instName in instInfo) {
      instPromiseArray[instName as InstNameUnion] = fetch(
        instInfo[instName as InstNameUnion].wavUrl
      );
    }

    (async () => {
      try {
        const instNameArray = Object.keys(instPromiseArray) as InstNameUnion[];
        const instBufferArray = Object.values(instPromiseArray);
        const promiseList = await Promise.all(instBufferArray);

        const arrayBufferList = await Promise.all<ArrayBuffer>(
          promiseList.map(fetchPromise => fetchPromise.arrayBuffer())
        );

        const audioBufferList = await Promise.all<AudioBuffer>(
          arrayBufferList.map(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
        );

        audioBufferList.forEach(
          (value, index) => (instAudioBuffers.current[instNameArray[index]] = value)
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
      audioContext: audioContextRef.current,
      instAudioBuffers: instAudioBuffers.current,
      audioContextGain: audioContextGainRef.current,
      audioAnalyser: audioAnalyserRef.current
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
