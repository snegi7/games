import { motion } from 'framer-motion';
import { Button, Card, AnimalCard } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import styles from './ResultScreen.module.css';

export function ResultScreen() {
  const {
    currentPlot,
    savedCreatures,
    lostCreatures,
    playAgain,
    resetGame,
    playNextPlot,
    goToTrivia,
  } = useGameStore();

  if (!currentPlot) return null;

  const allSaved = savedCreatures.length === currentPlot.creatures.length;
  const noneSaved = savedCreatures.length === 0;
  const score = savedCreatures.length * 100;

  const getResultMessage = () => {
    if (allSaved) return { title: '🎉 Amazing!', subtitle: 'You saved all the animals!' };
    if (noneSaved) return { title: '😢 Oh no!', subtitle: 'The animals couldn\'t be saved...' };
    return { 
      title: '🌟 Good Try!', 
      subtitle: `You saved ${savedCreatures.length} out of ${currentPlot.creatures.length} animals!` 
    };
  };

  const result = getResultMessage();

  return (
    <div className={`${styles.container} ${allSaved ? styles.success : noneSaved ? styles.fail : styles.partial}`}>
      {/* Confetti for success */}
      {allSaved && (
        <div className={styles.confetti}>
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.confettiPiece}
              initial={{ 
                y: -20, 
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: window.innerHeight + 20,
                rotate: Math.random() * 720,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
              style={{
                background: ['#FF6B35', '#4ECDC4', '#FFE66D', '#FF6B8A', '#A855F7'][Math.floor(Math.random() * 5)],
                width: 10 + Math.random() * 10,
                height: 10 + Math.random() * 10,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="glass" padding="lg" className={styles.card}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
            className={styles.resultIcon}
          >
            {allSaved ? '🏆' : noneSaved ? '💔' : '⭐'}
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {result.title}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {result.subtitle}
          </motion.p>

          <motion.div
            className={styles.score}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{score}</span>
          </motion.div>

          {/* Saved Animals */}
          {savedCreatures.length > 0 && (
            <motion.div
              className={styles.creaturesSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.checkIcon}>✅</span>
                Rescued Animals
              </h2>
              <div className={styles.creaturesGrid}>
                {savedCreatures.map((creature, index) => (
                  <motion.div
                    key={creature.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                  >
                    <AnimalCard creature={creature} size="sm" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Lost Animals */}
          {lostCreatures.length > 0 && (
            <motion.div
              className={styles.creaturesSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className={`${styles.sectionTitle} ${styles.lostTitle}`}>
                <span className={styles.crossIcon}>❌</span>
                Couldn't Save
              </h2>
              <div className={styles.creaturesGrid}>
                {lostCreatures.map((creature, index) => (
                  <motion.div
                    key={creature.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                  >
                    <AnimalCard creature={creature} size="sm" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Learn About Animals Button */}
          <motion.div
            className={styles.triviaAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={goToTrivia}
              className={styles.triviaButton}
            >
              🧠 Learn About the Animals
            </Button>
          </motion.div>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={playAgain}
            >
              🔄 Play Again
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={playNextPlot}
            >
              ➡️ Next Adventure
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={resetGame}
            >
              🏠 Change Age
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
