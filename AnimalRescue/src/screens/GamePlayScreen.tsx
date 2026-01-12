import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, AnimalCard, Timer, ProgressPills } from '@/components/ui';
import { useGameStore } from '@/store/gameStore';
import { SOUNDS } from '@/hooks/useSound';
import { playWrongSound } from '@/utils/soundGenerator';
import styles from './GamePlayScreen.module.css';

export function GamePlayScreen() {
  const {
    currentPlot,
    currentCreatureIndex,
    currentQuestionIndex,
    questionsForCurrentAnimal,
    savedCreatures,
    isTimerRunning,
    answerQuestion,
    timeUp,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  // Preload wrong answer sound
  useEffect(() => {
    wrongSoundRef.current = new Audio(SOUNDS.wrongAnswer);
    wrongSoundRef.current.volume = 0.5;
  }, []);

  const handleTimeUp = useCallback(() => {
    timeUp();
  }, [timeUp]);

  // Reset timer key when question changes
  useEffect(() => {
    setTimerKey(prev => prev + 1);
  }, [currentQuestionIndex, currentCreatureIndex]);

  // Early return AFTER all hooks
  if (!currentPlot || questionsForCurrentAnimal.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const currentCreature = currentPlot.creatures[currentCreatureIndex];
  const currentQuestion = questionsForCurrentAnimal[currentQuestionIndex];

  if (!currentCreature || !currentQuestion) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading game...</div>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Play wrong answer sound if incorrect
    if (!correct) {
      if (wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(() => {
          // Fallback to synthesized sound
          playWrongSound();
        });
      } else {
        playWrongSound();
      }
    }

    // Wait for feedback animation, then process
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setTimerKey(prev => prev + 1); // Reset timer
      answerQuestion(correct);
    }, correct ? 800 : 1500);
  };

  return (
    <div className={styles.container}>
      {/* Progress bar at top */}
      <div className={styles.topBar}>
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>Animals Saved:</span>
          <div className={styles.animalProgress}>
            {currentPlot.creatures.map((creature, idx) => (
              <motion.span
                key={creature.id}
                className={`${styles.animalDot} ${
                  idx < savedCreatures.length ? styles.saved :
                  idx === currentCreatureIndex ? styles.current : ''
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {creature.emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gameArea}>
        {/* Left side - Animal */}
        <motion.div 
          className={styles.animalSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card variant="glass" padding="md" className={styles.animalCard}>
            <h2 className={styles.saveTitle}>
              Save {currentCreature.name}!
            </h2>
            
            <motion.div
              key={currentCreature.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <AnimalCard 
                creature={currentCreature} 
                size="lg" 
                showName={false}
              />
            </motion.div>

            <div className={styles.timerSection}>
              <Timer
                key={timerKey}
                seconds={currentPlot.timePerQuestion + (currentQuestion.bonusTime || 0)}
                onComplete={handleTimeUp}
                isRunning={isTimerRunning && !showFeedback}
              />
            </div>

            <div className={styles.questionProgress}>
              <span className={styles.progressText}>
                Question {currentQuestionIndex + 1} of {currentPlot.questionsPerCreature}
              </span>
              <ProgressPills
                total={currentPlot.questionsPerCreature}
                completed={currentQuestionIndex}
                size="md"
              />
            </div>
          </Card>
        </motion.div>

        {/* Right side - Question */}
        <motion.div 
          className={styles.questionSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card variant="solid" padding="lg" className={styles.questionCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCreatureIndex}-${currentQuestionIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.questionHeader}>
                  <span className={styles.categoryBadge}>
                    📐 Math
                  </span>
                </div>

                <h3 className={styles.questionText}>
                  {currentQuestion.question}
                </h3>

                <div className={styles.optionsGrid}>
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`${styles.optionButton} ${
                        selectedAnswer === index
                          ? showFeedback
                            ? isCorrect
                              ? styles.correct
                              : styles.incorrect
                            : styles.selected
                          : ''
                      } ${
                        showFeedback && index === currentQuestion.correctAnswerIndex
                          ? styles.correctAnswer
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                      whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                    >
                      <span className={styles.optionLetter}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={styles.optionText}>{option}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feedback overlay */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <span className={styles.feedbackIcon}>
                    {isCorrect ? '✅' : '❌'}
                  </span>
                  <span className={styles.feedbackText}>
                    {isCorrect ? 'Correct!' : 'Wrong Answer!'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
