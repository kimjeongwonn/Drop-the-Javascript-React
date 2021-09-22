import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './AudioVisualizer.module.scss';

interface Props {
  analyserRef: React.MutableRefObject<AnalyserNode>;
  showCondition?: boolean;
  width?: number;
  height?: number;
}

export default function AudioVisualizer({ analyserRef, width, height }: Props): ReactElement {
  const { current: analyser } = analyserRef;
  const canvasRef: { current: HTMLCanvasElement } = useRef(null);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const WIDTH = width;
  const HEIGHT = height;
  useEffect(() => {
    const { current: canvas } = canvasRef;
    const canvasCtx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const barWidth = WIDTH / ~~(bufferLength * 0.8);
    let animationId: number;
    function draw() {
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < ~~(bufferLength * 0.8); i++) {
        const v = dataArray[i] / 255.0;
        const y = v * HEIGHT;

        canvasCtx.fillStyle = `hsl(${(360 / ~~(bufferLength * 0.8)) * i},100%,75%)`;
        canvasCtx.fillRect(i * barWidth, HEIGHT - y, barWidth + 1, y);
      }
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
    draw();
  }, [WIDTH, HEIGHT]);

  return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
}

AudioVisualizer.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};
