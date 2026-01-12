import { create } from 'zustand';
import type { User, Plot, GameScreen, Creature, Question } from '@/types';
import { getRandomPlot } from '@/data/plots';
import { getRandomQuestions } from '@/data/questions';
import { userApi, sessionApi } from '@/services/api';

interface GameState {
  // User state
  user: User | null;
  
  // Screen navigation
  currentScreen: GameScreen;
  
  // Plot state
  currentPlot: Plot | null;
  
  // Game progress
  currentCreatureIndex: number;
  currentQuestionIndex: number;
  questionsForCurrentAnimal: Question[];
  
  // Results
  savedCreatures: Creature[];
  lostCreatures: Creature[];
  
  // Timer state
  isTimerRunning: boolean;
  
  // Actions
  setUserAge: (age: number) => Promise<void>;
  startGame: () => void;
  goToScreen: (screen: GameScreen) => void;
  
  answerQuestion: (isCorrect: boolean) => void;
  timeUp: () => void;
  
  resetGame: () => void;
  playAgain: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  user: null,
  currentScreen: 'age-selection',
  currentPlot: null,
  currentCreatureIndex: 0,
  currentQuestionIndex: 0,
  questionsForCurrentAnimal: [],
  savedCreatures: [],
  lostCreatures: [],
  isTimerRunning: false,

  // Set user age and create/update user
  setUserAge: async (age: number) => {
    const result = await userApi.createUser(age);
    if (result.success && result.data) {
      set({ user: result.data });
    }
  },

  // Start the game with a random plot
  startGame: () => {
    const { user } = get();
    if (!user) return;

    const plot = getRandomPlot();
    const questions = getRandomQuestions('math', user.age, plot.questionsPerCreature);

    set({
      currentPlot: plot,
      currentCreatureIndex: 0,
      currentQuestionIndex: 0,
      questionsForCurrentAnimal: questions,
      savedCreatures: [],
      lostCreatures: [],
      currentScreen: 'plot',
      isTimerRunning: false,
    });
  },

  // Navigate to a specific screen
  goToScreen: (screen: GameScreen) => {
    const { user, currentPlot } = get();
    
    if (screen === 'gameplay' && currentPlot && user) {
      // Prepare questions for the first animal
      const questions = getRandomQuestions('math', user.age, currentPlot.questionsPerCreature);
      set({
        currentScreen: screen,
        questionsForCurrentAnimal: questions,
        isTimerRunning: true,
      });
    } else {
      set({ currentScreen: screen, isTimerRunning: false });
    }
  },

  // Handle answer submission
  answerQuestion: (isCorrect: boolean) => {
    const {
      currentPlot,
      currentCreatureIndex,
      currentQuestionIndex,
      savedCreatures,
      lostCreatures,
      user,
    } = get();

    if (!currentPlot || !user) return;

    const currentCreature = currentPlot.creatures[currentCreatureIndex];

    if (isCorrect) {
      const nextQuestionIndex = currentQuestionIndex + 1;

      // Check if all questions for this animal are answered
      if (nextQuestionIndex >= currentPlot.questionsPerCreature) {
        // Animal saved!
        const savedCreature = { ...currentCreature, savedState: 'saved' as const };
        const newSavedCreatures = [...savedCreatures, savedCreature];

        const nextCreatureIndex = currentCreatureIndex + 1;

        // Check if all animals are processed
        if (nextCreatureIndex >= currentPlot.creatures.length) {
          // Game complete - all animals saved!
          set({
            savedCreatures: newSavedCreatures,
            currentScreen: 'result',
            isTimerRunning: false,
          });

          // Save session
          sessionApi.createSession({
            plotId: currentPlot.id,
            startedAt: new Date(),
            completedAt: new Date(),
            score: newSavedCreatures.length * 100,
            savedCount: newSavedCreatures.length,
            totalCreatures: currentPlot.creatures.length,
          });
        } else {
          // Move to next animal
          const newQuestions = getRandomQuestions('math', user.age, currentPlot.questionsPerCreature);
          set({
            savedCreatures: newSavedCreatures,
            currentCreatureIndex: nextCreatureIndex,
            currentQuestionIndex: 0,
            questionsForCurrentAnimal: newQuestions,
          });
        }
      } else {
        // Move to next question for same animal
        set({ currentQuestionIndex: nextQuestionIndex });
      }
    } else {
      // Wrong answer - animal lost, and all remaining animals are lost too
      const lostCreature = { ...currentCreature, savedState: 'lost' as const };
      const remainingCreatures = currentPlot.creatures
        .slice(currentCreatureIndex + 1)
        .map(c => ({ ...c, savedState: 'lost' as const }));

      const allLostCreatures = [...lostCreatures, lostCreature, ...remainingCreatures];

      set({
        lostCreatures: allLostCreatures,
        currentScreen: 'result',
        isTimerRunning: false,
        questionsForCurrentAnimal: [],
      });

      // Save session
      sessionApi.createSession({
        plotId: currentPlot.id,
        startedAt: new Date(),
        completedAt: new Date(),
        score: savedCreatures.length * 100,
        savedCount: savedCreatures.length,
        totalCreatures: currentPlot.creatures.length,
      });
    }
  },

  // Handle time up
  timeUp: () => {
    const {
      currentPlot,
      currentCreatureIndex,
      savedCreatures,
      lostCreatures,
    } = get();

    if (!currentPlot) return;

    const currentCreature = currentPlot.creatures[currentCreatureIndex];
    const lostCreature = { ...currentCreature, savedState: 'lost' as const };
    
    // All remaining animals are lost too
    const remainingCreatures = currentPlot.creatures
      .slice(currentCreatureIndex + 1)
      .map(c => ({ ...c, savedState: 'lost' as const }));

    const allLostCreatures = [...lostCreatures, lostCreature, ...remainingCreatures];

    set({
      lostCreatures: allLostCreatures,
      currentScreen: 'result',
      isTimerRunning: false,
    });

    // Save session
    sessionApi.createSession({
      plotId: currentPlot.id,
      startedAt: new Date(),
      completedAt: new Date(),
      score: savedCreatures.length * 100,
      savedCount: savedCreatures.length,
      totalCreatures: currentPlot.creatures.length,
    });
  },

  // Reset the entire game
  resetGame: () => {
    set({
      user: null,
      currentScreen: 'age-selection',
      currentPlot: null,
      currentCreatureIndex: 0,
      currentQuestionIndex: 0,
      questionsForCurrentAnimal: [],
      savedCreatures: [],
      lostCreatures: [],
      isTimerRunning: false,
    });
  },

  // Play again with same user
  playAgain: () => {
    const { user } = get();
    if (!user) return;

    const plot = getRandomPlot();
    const questions = getRandomQuestions('math', user.age, plot.questionsPerCreature);

    set({
      currentPlot: plot,
      currentCreatureIndex: 0,
      currentQuestionIndex: 0,
      questionsForCurrentAnimal: questions,
      savedCreatures: [],
      lostCreatures: [],
      currentScreen: 'plot',
      isTimerRunning: false,
    });
  },
}));
