import { motion } from 'framer-motion';
import type { Creature } from '@/types';
import styles from './AnimalCard.module.css';

interface AnimalCardProps {
  creature: Creature;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  animate?: boolean;
}

export function AnimalCard({ 
  creature, 
  size = 'md', 
  showName = true,
  animate = true 
}: AnimalCardProps) {
  const getStateClass = () => {
    switch (creature.savedState) {
      case 'saved':
        return styles.saved;
      case 'lost':
        return styles.lost;
      default:
        return styles.pending;
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${styles[size]} ${getStateClass()}`}
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div className={styles.emojiContainer}>
        <span className={styles.emoji}>{creature.emoji}</span>
        {creature.savedState === 'saved' && (
          <motion.div
            className={styles.badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          >
            ✓
          </motion.div>
        )}
        {creature.savedState === 'lost' && (
          <motion.div
            className={`${styles.badge} ${styles.badgeLost}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          >
            ✗
          </motion.div>
        )}
      </div>
      {showName && (
        <div className={styles.name}>{creature.name}</div>
      )}
    </motion.div>
  );
}
