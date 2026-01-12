import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOUNDS } from '@/hooks/useSound';
import { playTickSound } from '@/utils/soundGenerator';
import styles from './Timer.module.css';

interface TimerProps {
  seconds: number;
  onComplete: () => void;
  isRunning: boolean;
  onTick?: (remaining: number) => void;
}

export function Timer({ seconds, onComplete, isRunning, onTick }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const useSynthTickRef = useRef(false);
  
  const getColorClass = useCallback(() => {
    if (remaining > 6) return styles.safe;
    if (remaining > 3) return styles.caution;
    return styles.danger;
  }, [remaining]);

  // Preload tick sound
  useEffect(() => {
    tickAudioRef.current = new Audio(SOUNDS.clockTick);
    tickAudioRef.current.volume = 0.4;
    
    tickAudioRef.current.onerror = () => {
      useSynthTickRef.current = true;
    };
    
    return () => {
      if (tickAudioRef.current) {
        tickAudioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        onTick?.(next);
        
        // Play tick sound for last 6 seconds
        if (next <= 6 && next > 0) {
          if (useSynthTickRef.current) {
            playTickSound();
          } else if (tickAudioRef.current) {
            tickAudioRef.current.currentTime = 0;
            tickAudioRef.current.play().catch(() => {
              playTickSound();
            });
          }
        }
        
        if (next <= 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete, onTick]);

  const isLow = remaining <= 3;

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.digitalClock} ${getColorClass()}`}>
        {/* Clock frame */}
        <div className={styles.clockFrame}>
          {/* LED dots decoration */}
          <div className={styles.ledDots}>
            <span className={styles.ledDot} />
            <span className={styles.ledDot} />
          </div>
          
          {/* Digital display */}
          <div className={styles.display}>
            <AnimatePresence mode="wait">
              <motion.div
                key={remaining}
                className={styles.digits}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
              >
                {formatTime(remaining)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pulsing effect for low time */}
          {isLow && (
            <motion.div
              className={styles.pulseOverlay}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
          )}
        </div>

        {/* Colon blink animation */}
        <motion.div
          className={styles.colonBlink}
          animate={{ opacity: isRunning ? [1, 0.3, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </div>
  );
}
