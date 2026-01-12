import { motion } from 'framer-motion';
import styles from './ProgressPills.module.css';

interface ProgressPillsProps {
  total: number;
  completed: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressPills({ total, completed, size = 'md' }: ProgressPillsProps) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          className={`${styles.pill} ${index < completed ? styles.completed : styles.pending}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {index < completed && (
            <motion.span
              className={styles.checkmark}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              ✓
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
