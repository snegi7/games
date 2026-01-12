import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, AnimalCard } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import type { Creature } from '@/types';
import styles from './AnimalTriviaScreen.module.css';

export function AnimalTriviaScreen() {
  const { savedCreatures, lostCreatures, goBackToResult } = useGameStore();
  const allCreatures = [...savedCreatures, ...lostCreatures];
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(
    allCreatures[0] || null
  );

  if (allCreatures.length === 0) {
    return null;
  }

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
                  selectedCreature?.id === creature.id ? styles.selected : ''
                } ${creature.savedState === 'saved' ? styles.saved : styles.lost}`}
                onClick={() => setSelectedCreature(creature)}
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

        {/* Trivia card */}
        <AnimatePresence mode="wait">
          {selectedCreature && (
            <motion.div
              key={selectedCreature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.triviaSection}
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
                      transition={{ delay: 0.2 + index * 0.15 }}
                    >
                      <span className={styles.triviaNumber}>{index + 1}</span>
                      <p className={styles.triviaFact}>{fact}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
