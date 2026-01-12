import type { Plot, Creature } from '@/types';

// ============================================
// PLOT METADATA
// Add new plots here by following the structure
// ============================================

const forestFireCreatures: Creature[] = [
  {
    id: 'ff-1',
    name: 'Leo the Lion',
    emoji: '🦁',
    description: 'A brave lion cub trapped near the river',
    savedState: 'pending',
  },
  {
    id: 'ff-2',
    name: 'Ella the Elephant',
    emoji: '🐘',
    description: 'A gentle elephant separated from her herd',
    savedState: 'pending',
  },
  {
    id: 'ff-3',
    name: 'Zara the Zebra',
    emoji: '🦓',
    description: 'A young zebra lost in the smoke',
    savedState: 'pending',
  },
  {
    id: 'ff-4',
    name: 'Milo the Monkey',
    emoji: '🐒',
    description: 'A clever monkey stuck in a tall tree',
    savedState: 'pending',
  },
  {
    id: 'ff-5',
    name: 'Gigi the Giraffe',
    emoji: '🦒',
    description: 'A tall giraffe cornered by flames',
    savedState: 'pending',
  },
];

const oilSpillCreatures: Creature[] = [
  {
    id: 'os-1',
    name: 'Nemo the Clownfish',
    emoji: '🐠',
    description: 'A colorful clownfish covered in oil',
    savedState: 'pending',
  },
  {
    id: 'os-2',
    name: 'Shelly the Turtle',
    emoji: '🐢',
    description: 'A wise sea turtle struggling to swim',
    savedState: 'pending',
  },
  {
    id: 'os-3',
    name: 'Dolly the Dolphin',
    emoji: '🐬',
    description: 'A playful dolphin in distress',
    savedState: 'pending',
  },
  {
    id: 'os-4',
    name: 'Oscar the Octopus',
    emoji: '🐙',
    description: 'A smart octopus trapped under debris',
    savedState: 'pending',
  },
  {
    id: 'os-5',
    name: 'Wally the Whale',
    emoji: '🐋',
    description: 'A magnificent whale affected by the spill',
    savedState: 'pending',
  },
];

export const plots: Plot[] = [
  {
    id: 'forest-fire',
    title: 'Forest Fire Emergency!',
    description: 'A terrible forest fire has broken out in the Savanna! Five amazing animals are trapped and need your help. Answer math questions correctly to rescue each one before time runs out!',
    backgroundType: 'forest-fire',
    creatures: forestFireCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 10,
  },
  {
    id: 'oil-spill',
    title: 'Ocean Oil Spill Crisis!',
    description: 'An oil rig has leaked into the ocean! Five sea creatures are in danger and need to be rescued. Solve math problems quickly to save them from the spreading oil!',
    backgroundType: 'oil-spill',
    creatures: oilSpillCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 10,
  },
];

// Helper function to get a random plot
export function getRandomPlot(): Plot {
  const randomIndex = Math.floor(Math.random() * plots.length);
  // Deep clone to avoid mutating the original
  return JSON.parse(JSON.stringify(plots[randomIndex]));
}

// Helper function to get plot by ID
export function getPlotById(id: string): Plot | undefined {
  const plot = plots.find(p => p.id === id);
  if (plot) {
    return JSON.parse(JSON.stringify(plot));
  }
  return undefined;
}
