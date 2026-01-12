import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import { DEFAULT_GAME_CONFIG } from '@/types';
import { unlockAudio } from '@/utils/audioUnlock';
import styles from './AgeSelectionScreen.module.css';

export function AgeSelectionScreen() {
  const [selectedAge, setSelectedAge] = useState(8);
  const { setUserAge, startGame } = useGameStore();
  
  const { minAge, maxAge } = DEFAULT_GAME_CONFIG;
  const ages = Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i);

  const handleIncrement = () => {
    if (selectedAge < maxAge) {
      setSelectedAge(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedAge > minAge) {
      setSelectedAge(prev => prev - 1);
    }
  };

  const handleStart = async () => {
    // Unlock audio on user interaction (important for mobile)
    await unlockAudio();
    await setUserAge(selectedAge);
    startGame();
  };

  return (
    <div className={styles.container}>
      {/* Floating decorations */}
      <div className={styles.decorations}>
        <motion.span
          className={styles.floatingEmoji}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          style={{ left: '10%', top: '15%' }}
        >
          🦁
        </motion.span>
        <motion.span
          className={styles.floatingEmoji}
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          style={{ right: '15%', top: '20%' }}
        >
          🐘
        </motion.span>
        <motion.span
          className={styles.floatingEmoji}
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          style={{ left: '20%', bottom: '25%' }}
        >
          🐬
        </motion.span>
        <motion.span
          className={styles.floatingEmoji}
          animate={{ y: [0, -18, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
          style={{ right: '10%', bottom: '30%' }}
        >
          🐢
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="glass" padding="lg" className={styles.card}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            🦁 Animal Rescue 🐬
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Save animals by solving math puzzles!
          </motion.p>

          <motion.div 
            className={styles.ageSelector}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className={styles.ageLabel}>How old are you?</p>
            
            <div className={styles.dialContainer}>
              <motion.button
                className={styles.dialButton}
                onClick={handleDecrement}
                disabled={selectedAge <= minAge}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={styles.dialIcon}>▲</span>
              </motion.button>

              <div className={styles.ageDisplay}>
                <div className={styles.ageWindow}>
                  <AnimatePresence mode="wait">
                    {ages.map(age => (
                      age === selectedAge && (
                        <motion.div
                          key={age}
                          className={styles.ageNumber}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                          {age}
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </div>
                <span className={styles.yearsLabel}>years old</span>
              </div>

              <motion.button
                className={styles.dialButton}
                onClick={handleIncrement}
                disabled={selectedAge >= maxAge}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={styles.dialIcon}>▼</span>
              </motion.button>
            </div>

            {/* Age indicator dots */}
            <div className={styles.ageIndicator}>
              {ages.map(age => (
                <motion.div
                  key={age}
                  className={`${styles.dot} ${age === selectedAge ? styles.activeDot : ''}`}
                  animate={{ scale: age === selectedAge ? 1.3 : 1 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              variant="primary"
              size="xl"
              fullWidth
              onClick={handleStart}
            >
              🚀 Start Rescue Mission!
            </Button>
          </motion.div>

          <motion.p 
            className={styles.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Questions will match your age level
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
}
