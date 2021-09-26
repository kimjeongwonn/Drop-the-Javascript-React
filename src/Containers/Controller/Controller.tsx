import React, { ReactElement, useCallback } from 'react';
import clearIconSrc from '../../Assets/Image/clear_icon.svg';
import loadIconSrc from '../../Assets/Image/load_icon.svg';
import playIconSrc from '../../Assets/Image/play_icon.svg';
import saveIconSrc from '../../Assets/Image/save_icon.svg';
import stopIconSrc from '../../Assets/Image/stop_icon.svg';
import Button from '../../Components/Button/Button';
import Slider from '../../Components/Slider/Slider';
import Stepper from '../../Components/Stepper/Stepper';
import { useAudio } from '../../Contexts/AudioContext';
import { useAppDispatch, useAppSelector } from '../../Hook/useReducer';
import { MusicState, MUSIC_CONSTANCE } from '../../Reducers/initialStore';
import {
  changeBeat,
  changeBpm,
  clearMusic as clearMusicAction,
  selectBeat,
  selectBpm,
  selectMusic,
  selectPlaying,
  setMusic as setMusicAction,
  togglePlaying as togglePlayingAction
} from '../../Reducers/musicSlice';
import styles from './Controller.module.scss';

export default function Controller(): ReactElement {
  const dispatch = useAppDispatch();

  const playing = useAppSelector(selectPlaying);
  const music = useAppSelector(selectMusic);
  const beat = useAppSelector(selectBeat);
  const bpm = useAppSelector(selectBpm);

  const { audioContextGain } = useAudio();

  const togglePlaying = useCallback(() => dispatch(togglePlayingAction()), []);
  const clearMusic = useCallback(() => dispatch(clearMusicAction()), []);
  const onChangeVolume: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => (audioContextGain.gain.value = +e.target.value),
    []
  );

  const setBeat = useCallback((newBeat: number) => dispatch(changeBeat(newBeat)), []);
  const setBpm = useCallback((newBpm: number) => dispatch(changeBpm(newBpm)), []);
  const setMusic = useCallback(
    (newMusic: MusicState['music']) => dispatch(setMusicAction(newMusic)),
    []
  );

  const getFileFromState = useCallback(() => {
    const blob = new window.Blob([JSON.stringify({ music, beat, bpm })], {
      type: 'application/json'
    });
    const filename = 'DJS_' + new Date().toLocaleString() + '.json';
    const url = window.URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = filename;
    aTag.click();
    aTag.remove();
    window.URL.revokeObjectURL(url);
  }, [music, beat, bpm]);

  const getStateFromFile = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.click();
    input.addEventListener('change', async () => {
      if (input.files.item(0).type !== 'application/json') {
        throw new Error('JSON 파일만 불러올 수 있습니다.');
      }
      try {
        const loadedState = JSON.parse(await input.files.item(0).text());
        if (!('beat' in loadedState && 'bpm' in loadedState && 'music' in loadedState)) {
          throw new Error('정상적인 파일이 아닙니다!');
        }
        setBeat(loadedState.beat);
        setBpm(loadedState.bpm);
        setMusic(loadedState.music);
      } catch (e) {
        console.error(e);
      } finally {
        input.remove();
      }
    });
  }, []);

  const { MAX_BEAT, MAX_BPM, MIN_BEAT, MIN_BPM } = MUSIC_CONSTANCE;

  return (
    <section className={styles.controller}>
      <div className={styles.player}>
        <Button onClick={togglePlaying} icon={playing ? stopIconSrc : playIconSrc} />
        <Stepper
          valueState={beat}
          setValueState={setBeat}
          step={1}
          min={MIN_BEAT}
          max={MAX_BEAT}
          label='Beat'
        />
        <Stepper
          valueState={bpm}
          setValueState={setBpm}
          step={10}
          min={MIN_BPM}
          max={MAX_BPM}
          label='BPM'
          debounceDelay={1000}
        />
      </div>
      <div className={styles.menu}>
        <Slider initialValue={0.5} min={0} max={1} step={0.01} onChange={onChangeVolume} />
        <Button onClick={getFileFromState} icon={saveIconSrc} size='md' />
        <Button onClick={getStateFromFile} icon={loadIconSrc} size='md' />
        <Button onClick={clearMusic} icon={clearIconSrc} size='md' />
      </div>
    </section>
  );
}
