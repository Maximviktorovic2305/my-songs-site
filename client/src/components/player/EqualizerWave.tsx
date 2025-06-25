// components/EqualizerWave/EqualizerWave.tsx (или по вашему пути к компонентам)
'use client';

import { FC } from 'react';
import styles from './EqualizerWave.module.css'; // Создадим отдельный CSS модуль для волны

interface EqualizerWaveProps {
  isPlaying: boolean;
}

const EqualizerWave: FC<EqualizerWaveProps> = ({ isPlaying }) => {
  if (!isPlaying) {
    return null; // Не рендерим волну, если плеер не играет
  }

  return (
    <div className={styles.equalizerWaveSVGContainer}>
      <svg viewBox="0 0 100 6" preserveAspectRatio="none" className={styles.waveSVG}>
        <defs>
          <filter id="waveShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#a4a8b1" floodOpacity="0.8"/>
          </filter>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a4a8b1" />
          </linearGradient>
        </defs>
        <path
          className={styles.wavePath}
          d="M0,3.5 C25,1 75,6 100,3.5 V7 H0 Z" // Изменены значения для лучшей амплитуды в 7px viewBox
          filter="url(#waveShadow)"
          fill="url(#waveGradient)"
        ></path>
      </svg>
    </div>
  );
};

export default EqualizerWave;