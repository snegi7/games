import { motion } from 'framer-motion';
import { Button, Card, AnimalCard } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import { unlockAudio } from '@/utils/audioUnlock';
import styles from './PlotScreen.module.css';

export function PlotScreen() {
  const { currentPlot, goToScreen } = useGameStore();

  if (!currentPlot) return null;

  const handleContinue = async () => {
    // Unlock audio on this user interaction (important for mobile)
    await unlockAudio();
    goToScreen('gameplay');
  };

  const getBackgroundClass = () => {
    switch (currentPlot.backgroundType) {
      case 'forest-fire':
        return styles.forestFire;
      case 'oil-spill':
        return styles.oilSpill;
      case 'flood':
        return styles.flood;
      case 'zoo-breakout':
        return styles.zooBreakout;
      case 'drought':
        return styles.drought;
      case 'earthquake':
        return styles.earthquake;
      case 'storm':
        return styles.storm;
      case 'arctic':
        return styles.arctic;
      case 'pollution':
        return styles.pollution;
      case 'volcano':
        return styles.volcano;
      default:
        return styles.forestFire;
    }
  };

  return (
    <div className={`${styles.container} ${getBackgroundClass()}`}>
      {/* Animated background effects */}
      <div className={styles.effects}>
        {(currentPlot.backgroundType === 'forest-fire' || currentPlot.backgroundType === 'volcano') && (
          <>
            <div className={styles.flame} style={{ left: '10%', animationDelay: '0s' }} />
            <div className={styles.flame} style={{ left: '30%', animationDelay: '0.3s' }} />
            <div className={styles.flame} style={{ left: '50%', animationDelay: '0.6s' }} />
            <div className={styles.flame} style={{ left: '70%', animationDelay: '0.9s' }} />
            <div className={styles.flame} style={{ left: '90%', animationDelay: '1.2s' }} />
            <div className={styles.smoke} />
          </>
        )}
        {(currentPlot.backgroundType === 'oil-spill' || currentPlot.backgroundType === 'flood' || currentPlot.backgroundType === 'pollution') && (
          <>
            <div className={styles.wave} style={{ bottom: '20%' }} />
            <div className={styles.wave} style={{ bottom: '30%', animationDelay: '-2s' }} />
            {currentPlot.backgroundType === 'oil-spill' && (
              <>
                <div className={styles.oilBlob} style={{ left: '20%', top: '40%' }} />
                <div className={styles.oilBlob} style={{ left: '60%', top: '50%', animationDelay: '-1s' }} />
                <div className={styles.oilBlob} style={{ left: '80%', top: '35%', animationDelay: '-2s' }} />
              </>
            )}
          </>
        )}
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="glass" padding="lg" className={styles.card}>
          {/* Alert icon */}
          <motion.div 
            className={styles.alertIcon}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🚨
          </motion.div>

          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentPlot.title}
          </motion.h1>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentPlot.description}
          </motion.p>

          <motion.div
            className={styles.creaturesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className={styles.creaturesTitle}>
              Animals in Danger!
            </h2>
            
            <div className={styles.creaturesGrid}>
              {currentPlot.creatures.map((creature, index) => (
                <motion.div
                  key={creature.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.7 + index * 0.1,
                    type: 'spring',
                    stiffness: 400
                  }}
                >
                  <AnimalCard creature={creature} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>⏱️</span>
              <span>{currentPlot.timePerQuestion}s per question</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>❓</span>
              <span>{currentPlot.questionsPerCreature} questions per animal</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Button
              variant="success"
              size="xl"
              fullWidth
              onClick={handleContinue}
            >
              🦸 Start Rescue!
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
