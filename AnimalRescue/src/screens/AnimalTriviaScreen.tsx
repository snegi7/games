import { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Button, Card, AnimalCard } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import styles from './AnimalTriviaScreen.module.css';

export function AnimalTriviaScreen() {
  const { savedCreatures, lostCreatures, goBackToResult } = useGameStore();
  const allCreatures = [...savedCreatures, ...lostCreatures];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const selectedCreature = allCreatures[currentIndex] || null;

  const goToNext = useCallback(() => {
    if (currentIndex < allCreatures.length - 1) {
      setSwipeDirection('left');
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, allCreatures.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSwipeDirection('right');
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number) => {
    setSwipeDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
  }, [currentIndex]);

  // Handle swipe gesture
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      const velocityThreshold = 300;

      if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
        // Swiped left - go to next
        goToNext();
      } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
        // Swiped right - go to previous
        goToPrevious();
      }
    },
    [goToNext, goToPrevious]
  );

  if (allCreatures.length === 0) {
    return null;
  }

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < allCreatures.length - 1;

  // Animation variants for sliding
  const slideVariants = {
    enter: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className={styles.title}>🧠 Animal Trivia</h1>
          <p className={styles.subtitle}>
            Learn amazing facts about the animals you encountered!
          </p>
        </motion.div>

        {/* Animal selector */}
        <motion.div
          className={styles.animalSelector}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.animalGrid}>
            {allCreatures.map((creature, index) => (
              <motion.button
                key={creature.id}
                className={`${styles.animalButton} ${
                  currentIndex === index ? styles.selected : ''
                } ${creature.savedState === 'saved' ? styles.saved : styles.lost}`}
                onClick={() => goToIndex(index)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.animalEmoji}>{creature.emoji}</span>
                <span className={styles.animalName}>
                  {creature.name.split(' ')[0]}
                </span>
                <span className={styles.statusBadge}>
                  {creature.savedState === 'saved' ? '✅' : '❌'}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Trivia card with swipe and navigation arrows */}
        <div className={styles.triviaWrapper}>
          {/* Left arrow */}
          <motion.button
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            whileHover={{ scale: canGoPrevious ? 1.1 : 1 }}
            whileTap={{ scale: canGoPrevious ? 0.9 : 1 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={styles.arrowIcon}>‹</span>
          </motion.button>

          <AnimatePresence mode="wait" custom={swipeDirection}>
            {selectedCreature && (
              <motion.div
                key={selectedCreature.id}
                custom={swipeDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={styles.triviaSection}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <Card variant="glass" padding="lg" className={styles.triviaCard}>
                  <div className={styles.triviaHeader}>
                    <AnimalCard creature={selectedCreature} size="md" />
                    <div className={styles.creatureInfo}>
                      <h2 className={styles.creatureName}>{selectedCreature.name}</h2>
                      <p className={styles.creatureDescription}>
                        {selectedCreature.description}
                      </p>
                    </div>
                  </div>

                  <div className={styles.triviaList}>
                    <h3 className={styles.triviaListTitle}>
                      ✨ Did You Know?
                    </h3>
                    {selectedCreature.trivia.map((fact, index) => (
                      <motion.div
                        key={index}
                        className={styles.triviaItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <span className={styles.triviaNumber}>{index + 1}</span>
                        <p className={styles.triviaFact}>{fact}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Swipe hint for mobile */}
                  <p className={styles.swipeHint}>
                    ← Swipe to see more animals →
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right arrow */}
          <motion.button
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            onClick={goToNext}
            disabled={!canGoNext}
            whileHover={{ scale: canGoNext ? 1.1 : 1 }}
            whileTap={{ scale: canGoNext ? 0.9 : 1 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={styles.arrowIcon}>›</span>
          </motion.button>
        </div>

        {/* Page indicator */}
        <div className={styles.pageIndicator}>
          {allCreatures.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles.pageDot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => goToIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Back button */}
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="ghost" size="lg" onClick={goBackToResult}>
            ← Back to Results
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
