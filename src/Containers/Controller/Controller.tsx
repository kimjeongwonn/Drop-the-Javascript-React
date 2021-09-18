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
import { useMusic } from '../../Contexts/MusicContext';
import styles from './Controller.module.scss';

export default function Controller(): ReactElement {
  const { setPlaying, playing, beat, bpm, setBpm, setBeat, setMusic, music } = useMusic();
  const { audioContextGainRef } = useAudio();

  const togglePlaying = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const clearMusic = useCallback(() => {
    setMusic(music.map(row => ({ ...row, notes: row.notes.fill(false) })));
  }, [music]);

  return (
    <section className={styles.controller}>
      <div className={styles.player}>
        <Button onClick={togglePlaying} icon={playing ? stopIconSrc : playIconSrc} />
        <Stepper valueState={beat} onChange={setBeat} step={1} min={2} max={32} label='Beat' />
        <Stepper valueState={bpm} onChange={setBpm} step={10} min={100} max={500} label='BPM' />
      </div>
      <div className={styles.menu}>
        <Slider
          initialValue={0.5}
          min={0}
          max={1}
          step={0.01}
          onChange={e => (audioContextGainRef.current.gain.value = +e.target.value)}
        />
        <Button icon={saveIconSrc} size='md' />
        <Button icon={loadIconSrc} size='md' />
        <Button onClick={clearMusic} icon={clearIconSrc} size='md' />
      </div>
    </section>
  );
}
