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

const farmFloodCreatures: Creature[] = [
  { id: 'ffl-1', name: 'Clarabelle the Cow', emoji: '🐮', description: 'A gentle cow stuck in a muddy field', savedState: 'pending' },
  { id: 'ffl-2', name: 'Porky the Pig', emoji: '🐷', description: 'A small piglet trapped in the barn', savedState: 'pending' },
  { id: 'ffl-3', name: 'Shaun the Sheep', emoji: '🐑', description: 'A fluffy sheep stranded on a roof', savedState: 'pending' },
  { id: 'ffl-4', name: 'Horace the Horse', emoji: '🐴', description: 'A strong horse wading through water', savedState: 'pending' },
  { id: 'ffl-5', name: 'Ginger the Chicken', emoji: '🐔', description: 'A scared hen perched on a floating fence', savedState: 'pending' },
];

const zooEscapeCreatures: Creature[] = [
  { id: 'ze-1', name: 'Penny the Panda', emoji: '🐼', description: 'A peaceful panda lost in the city streets', savedState: 'pending' },
  { id: 'ze-2', name: 'Tony the Tiger', emoji: '🐯', description: 'A confused tiger wandering near a playground', savedState: 'pending' },
  { id: 'ze-3', name: 'Gary the Gorilla', emoji: '🦍', description: 'A strong gorilla climbing a skyscraper', savedState: 'pending' },
  { id: 'ze-4', name: 'Joey the Kangaroo', emoji: '🦘', description: 'A bouncy kangaroo hopping through traffic', savedState: 'pending' },
  { id: 'ze-5', name: 'Percy the Peacock', emoji: '🦚', description: 'A colorful peacock on a subway platform', savedState: 'pending' },
];

const arcticMeltCreatures: Creature[] = [
  { id: 'am-1', name: 'Pip the Penguin', emoji: '🐧', description: 'A small penguin on a shrinking ice floe', savedState: 'pending' },
  { id: 'am-2', name: 'Barnaby the Bear', emoji: '🐻‍❄️', description: 'A polar bear swimming for too long', savedState: 'pending' },
  { id: 'am-3', name: 'Sammy the Seal', emoji: '🦭', description: 'A playful seal caught in a fishing net', savedState: 'pending' },
  { id: 'am-4', name: 'Fiona the Fox', emoji: '🦊', description: 'An arctic fox lost in the melting snow', savedState: 'pending' },
  { id: 'am-5', name: 'Ollie the Owl', emoji: '🦉', description: 'A snowy owl with nowhere to land', savedState: 'pending' },
];

const mountainQuakeCreatures: Creature[] = [
  { id: 'mq-1', name: 'Billy the Goat', emoji: '🐐', description: 'A mountain goat trapped on a crumbling ledge', savedState: 'pending' },
  { id: 'mq-2', name: 'Eddie the Eagle', emoji: '🦅', description: 'A majestic eagle whose nest fell down', savedState: 'pending' },
  { id: 'mq-3', name: 'Bruno the Bear', emoji: '🐻', description: 'A big brown bear stuck behind a rockslide', savedState: 'pending' },
  { id: 'mq-4', name: 'Monty the Marmot', emoji: '🐹', description: 'A tiny marmot whose burrow collapsed', savedState: 'pending' },
  { id: 'mq-5', name: 'Luna the Lynx', emoji: '🐱', description: 'A swift lynx cornered by falling debris', savedState: 'pending' },
];

const desertStormCreatures: Creature[] = [
  { id: 'ds-1', name: 'Cammy the Camel', emoji: '🐫', description: 'A patient camel blinded by the sandstorm', savedState: 'pending' },
  { id: 'ds-2', name: 'Manny the Meerkat', emoji: '🦦', description: 'A lookout meerkat separated from the mob', savedState: 'pending' },
  { id: 'ds-3', name: 'Sid the Scorpion', emoji: '🦂', description: 'A small scorpion buried under the sand', savedState: 'pending' },
  { id: 'ds-4', name: 'Felix the Fennec', emoji: '🦊', description: 'A big-eared fox hiding from the wind', savedState: 'pending' },
  { id: 'ds-5', name: 'Lizzy the Lizard', emoji: '🦎', description: 'A colorful lizard lost in the dunes', savedState: 'pending' },
];

const jungleFloodCreatures: Creature[] = [
  { id: 'jf-1', name: 'Jada the Jaguar', emoji: '🐆', description: 'A sleek jaguar trapped on a floating log', savedState: 'pending' },
  { id: 'jf-2', name: 'Sid the Sloth', emoji: '🦥', description: 'A very slow sloth in a sinking tree', savedState: 'pending' },
  { id: 'jf-3', name: 'Tico the Toucan', emoji: '🦜', description: 'A bright toucan with wet wings', savedState: 'pending' },
  { id: 'jf-4', name: 'Freddy the Frog', emoji: '🐸', description: 'A tiny frog whose pond overflowed', savedState: 'pending' },
  { id: 'jf-5', name: 'Sly the Snake', emoji: '🐍', description: 'A long snake tangled in river weeds', savedState: 'pending' },
];

const savannaDroughtCreatures: Creature[] = [
  { id: 'sd-1', name: 'Rudy the Rhino', emoji: '🦏', description: 'A thirsty rhino searching for water', savedState: 'pending' },
  { id: 'sd-2', name: 'Chester the Cheetah', emoji: '🐆', description: 'A fast cheetah too weak to run', savedState: 'pending' },
  { id: 'sd-3', name: 'Harry the Hyena', emoji: '🐺', description: 'A hungry hyena lost in the dry grass', savedState: 'pending' },
  { id: 'sd-4', name: 'Ozzie the Ostrich', emoji: '🐦', description: 'A large bird stuck in the cracked earth', savedState: 'pending' },
  { id: 'sd-5', name: 'Benny the Buffalo', emoji: '🐃', description: 'A heavy buffalo trapped in a dried-up mud hole', savedState: 'pending' },
];

const cityStormCreatures: Creature[] = [
  { id: 'cs-1', name: 'Cookie the Cat', emoji: '🐱', description: 'A stray cat hiding under a car', savedState: 'pending' },
  { id: 'cs-2', name: 'Duke the Dog', emoji: '🐶', description: 'A friendly dog lost in the heavy rain', savedState: 'pending' },
  { id: 'cs-3', name: 'Ruby the Rabbit', emoji: '🐰', description: 'A pet rabbit escaped from a backyard', savedState: 'pending' },
  { id: 'cs-4', name: 'Pip the Pigeon', emoji: '🐦', description: 'A city bird with a broken wing', savedState: 'pending' },
  { id: 'cs-5', name: 'Squeaky the Squirrel', emoji: '🐿️', description: 'A busy squirrel trapped in a drain pipe', savedState: 'pending' },
];

const riverPollutionCreatures: Creature[] = [
  { id: 'rp-1', name: 'Bucky the Beaver', emoji: '🦫', description: 'A busy beaver whose dam is full of trash', savedState: 'pending' },
  { id: 'rp-2', name: 'Dilly the Duck', emoji: '🦆', description: 'A mother duck stuck in plastic rings', savedState: 'pending' },
  { id: 'rp-3', name: 'Otto the Otter', emoji: '🦦', description: 'A playful otter in dirty water', savedState: 'pending' },
  { id: 'rp-4', name: 'Sally the Salmon', emoji: '🐟', description: 'A strong fish unable to swim upstream', savedState: 'pending' },
  { id: 'rp-5', name: 'Frankie the Frog', emoji: '🐸', description: 'A green frog in a polluted pond', savedState: 'pending' },
];

const volcanoEruptionCreatures: Creature[] = [
  { id: 've-1', name: 'Robby the Red Panda', emoji: '🐼', description: 'A fluffy panda escaping the ash', savedState: 'pending' },
  { id: 've-2', name: 'Terry the Tapir', emoji: '🐗', description: 'A shy tapir running from the heat', savedState: 'pending' },
  { id: 've-3', name: 'Iggy the Iguana', emoji: '🦎', description: 'A cold-blooded lizard seeking safety', savedState: 'pending' },
  { id: 've-4', name: 'Max the Macaw', emoji: '🦜', description: 'A colorful bird flying through smoke', savedState: 'pending' },
  { id: 've-5', name: 'Lemmy the Lemur', emoji: '🐒', description: 'A wide-eyed lemur trapped on a high branch', savedState: 'pending' },
];

export const plots: Plot[] = [
  {
    id: 'forest-fire',
    title: 'Forest Fire Emergency!',
    description: 'A terrible forest fire has broken out in the Savanna! Five amazing animals are trapped and need your help. Answer math questions correctly to rescue each one before time runs out!',
    backgroundType: 'forest-fire',
    creatures: forestFireCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'oil-spill',
    title: 'Ocean Oil Spill Crisis!',
    description: 'An oil rig has leaked into the ocean! Five sea creatures are in danger and need to be rescued. Solve math problems quickly to save them from the spreading oil!',
    backgroundType: 'oil-spill',
    creatures: oilSpillCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'farm-flood',
    title: 'Farm Flood Rescue!',
    description: 'Heavy rains have flooded the farm! The animals are stuck and the water is rising. Help rescue the farm friends by solving these math challenges!',
    backgroundType: 'flood',
    creatures: farmFloodCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'zoo-escape',
    title: 'Zoo Escape Chaos!',
    description: 'The zoo gates were left open during a storm! Animals are wandering the city and need to be safely returned. Can you help bring them home?',
    backgroundType: 'zoo-breakout',
    creatures: zooEscapeCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'arctic-melt',
    title: 'Arctic Ice Melt!',
    description: 'The ice is melting fast in the North Pole! Polar animals are losing their homes and need your help to find safety. Solve the problems to save them!',
    backgroundType: 'arctic',
    creatures: arcticMeltCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'mountain-quake',
    title: 'Mountain Earthquake!',
    description: 'A strong earthquake has caused rockslides in the mountains! Help the mountain creatures who are trapped or lost. Your math skills can save them!',
    backgroundType: 'earthquake',
    creatures: mountainQuakeCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'desert-storm',
    title: 'Desert Sandstorm!',
    description: 'A massive sandstorm is blowing through the desert! The animals can\'t see where they are going. Help them find shelter before they get buried!',
    backgroundType: 'storm',
    creatures: desertStormCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'jungle-flood',
    title: 'Jungle Monsoon!',
    description: 'The monsoon rains have turned the jungle into a river! Jungle animals are clinging to branches and logs. Rescue them before they float away!',
    backgroundType: 'flood',
    creatures: jungleFloodCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'savanna-drought',
    title: 'Savanna Drought!',
    description: 'It hasn\'t rained in months and the water holes are dry! The savanna animals are weak and thirsty. Help them reach the hidden oasis!',
    backgroundType: 'drought',
    creatures: savannaDroughtCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'city-storm',
    title: 'City Storm Panic!',
    description: 'A huge thunderstorm is hitting the city! Pets and city animals are scared and lost in the rain. Find them and bring them to safety!',
    backgroundType: 'storm',
    creatures: cityStormCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'river-pollution',
    title: 'River Pollution Crisis!',
    description: 'Someone has dumped trash into the river! The water creatures are getting stuck and can\'t swim. Clean up the river and save the animals!',
    backgroundType: 'pollution',
    creatures: riverPollutionCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'volcano-eruption',
    title: 'Volcano Eruption!',
    description: 'A volcano is erupting on a tropical island! The animals need to get to the other side of the island quickly. Help them escape the ash and heat!',
    backgroundType: 'volcano',
    creatures: volcanoEruptionCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
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
