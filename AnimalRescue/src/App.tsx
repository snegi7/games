import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import {
  AgeSelectionScreen,
  PlotScreen,
  GamePlayScreen,
  ResultScreen,
} from './screens';
import { BackgroundMusic } from './components/audio/BackgroundMusic';
import { SoundEffects } from './components/audio/SoundEffects';

function App() {
  const { currentScreen } = useGameStore();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'age-selection':
        return <AgeSelectionScreen />;
      case 'plot':
        return <PlotScreen />;
      case 'gameplay':
        return <GamePlayScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <AgeSelectionScreen />;
    }
  };

  return (
    <>
      {/* Audio components */}
      <BackgroundMusic />
      <SoundEffects />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
