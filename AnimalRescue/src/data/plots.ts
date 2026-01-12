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
    trivia: [
      'Lions are the only cats that live in groups called prides!',
      'A lion\'s roar can be heard from 5 miles away!',
      'Lions sleep up to 20 hours a day to save energy for hunting.',
    ],
  },
  {
    id: 'ff-2',
    name: 'Ella the Elephant',
    emoji: '🐘',
    description: 'A gentle elephant separated from her herd',
    savedState: 'pending',
    trivia: [
      'Elephants are the largest land animals on Earth!',
      'An elephant\'s trunk has over 40,000 muscles!',
      'Elephants can recognize themselves in mirrors, showing self-awareness.',
    ],
  },
  {
    id: 'ff-3',
    name: 'Zara the Zebra',
    emoji: '🦓',
    description: 'A young zebra lost in the smoke',
    savedState: 'pending',
    trivia: [
      'Every zebra has a unique stripe pattern, like fingerprints!',
      'Zebra stripes may confuse flies and keep them away.',
      'Baby zebras can walk just 20 minutes after being born!',
    ],
  },
  {
    id: 'ff-4',
    name: 'Milo the Monkey',
    emoji: '🐒',
    description: 'A clever monkey stuck in a tall tree',
    savedState: 'pending',
    trivia: [
      'Monkeys use different sounds to warn about different predators!',
      'Some monkeys can count and understand basic math.',
      'A group of monkeys is called a troop or a barrel!',
    ],
  },
  {
    id: 'ff-5',
    name: 'Gigi the Giraffe',
    emoji: '🦒',
    description: 'A tall giraffe cornered by flames',
    savedState: 'pending',
    trivia: [
      'Giraffes are the tallest animals on Earth, up to 18 feet tall!',
      'A giraffe\'s tongue is about 20 inches long and dark purple!',
      'Giraffes only need 30 minutes of sleep per day.',
    ],
  },
];

const oilSpillCreatures: Creature[] = [
  {
    id: 'os-1',
    name: 'Nemo the Clownfish',
    emoji: '🐠',
    description: 'A colorful clownfish covered in oil',
    savedState: 'pending',
    trivia: [
      'Clownfish live inside sea anemones that would sting other fish!',
      'All clownfish are born male and can change to female.',
      'Clownfish do a special wiggle dance to clean their anemone home.',
    ],
  },
  {
    id: 'os-2',
    name: 'Shelly the Turtle',
    emoji: '🐢',
    description: 'A wise sea turtle struggling to swim',
    savedState: 'pending',
    trivia: [
      'Sea turtles have been around for over 100 million years!',
      'Sea turtles can hold their breath for up to 7 hours while sleeping.',
      'Female sea turtles return to the same beach where they were born to lay eggs.',
    ],
  },
  {
    id: 'os-3',
    name: 'Dolly the Dolphin',
    emoji: '🐬',
    description: 'A playful dolphin in distress',
    savedState: 'pending',
    trivia: [
      'Dolphins sleep with one eye open and half their brain awake!',
      'Each dolphin has a unique whistle, like a name.',
      'Dolphins can swim up to 20 miles per hour!',
    ],
  },
  {
    id: 'os-4',
    name: 'Oscar the Octopus',
    emoji: '🐙',
    description: 'A smart octopus trapped under debris',
    savedState: 'pending',
    trivia: [
      'Octopuses have three hearts and blue blood!',
      'An octopus can change color in less than a second.',
      'Octopuses have been observed using coconut shells as armor!',
    ],
  },
  {
    id: 'os-5',
    name: 'Wally the Whale',
    emoji: '🐋',
    description: 'A magnificent whale affected by the spill',
    savedState: 'pending',
    trivia: [
      'Blue whales are the largest animals ever to exist on Earth!',
      'A whale\'s heart is the size of a small car.',
      'Whales sing songs that can travel thousands of miles underwater.',
    ],
  },
];

const farmFloodCreatures: Creature[] = [
  { id: 'ffl-1', name: 'Clarabelle the Cow', emoji: '🐮', description: 'A gentle cow stuck in a muddy field', savedState: 'pending', trivia: ['Cows have best friends and get stressed when separated!', 'Cows can sleep standing up but only dream lying down.', 'A cow has nearly 360-degree vision to watch for predators.'] },
  { id: 'ffl-2', name: 'Porky the Pig', emoji: '🐷', description: 'A small piglet trapped in the barn', savedState: 'pending', trivia: ['Pigs are smarter than dogs and can play video games!', 'Pigs don\'t sweat, so they roll in mud to cool off.', 'Baby pigs can recognize their own names at just two weeks old.'] },
  { id: 'ffl-3', name: 'Shaun the Sheep', emoji: '🐑', description: 'A fluffy sheep stranded on a roof', savedState: 'pending', trivia: ['Sheep can remember 50 different faces for years!', 'Sheep have rectangular pupils for amazing peripheral vision.', 'A group of sheep is called a flock or a mob.'] },
  { id: 'ffl-4', name: 'Horace the Horse', emoji: '🐴', description: 'A strong horse wading through water', savedState: 'pending', trivia: ['Horses can sleep both lying down and standing up!', 'Horses have the largest eyes of any land mammal.', 'A horse\'s teeth take up more space in their head than their brain!'] },
  { id: 'ffl-5', name: 'Ginger the Chicken', emoji: '🐔', description: 'A scared hen perched on a floating fence', savedState: 'pending', trivia: ['Chickens can recognize over 100 different faces!', 'Chickens dream just like humans do.', 'A mother hen turns her eggs about 50 times a day.'] },
];

const zooEscapeCreatures: Creature[] = [
  { id: 'ze-1', name: 'Penny the Panda', emoji: '🐼', description: 'A peaceful panda lost in the city streets', savedState: 'pending', trivia: ['Pandas spend 12 hours a day eating bamboo!', 'Pandas are excellent swimmers and climbers.', 'Baby pandas are born pink and are smaller than a stick of butter!'] },
  { id: 'ze-2', name: 'Tony the Tiger', emoji: '🐯', description: 'A confused tiger wandering near a playground', savedState: 'pending', trivia: ['Every tiger has unique stripes, like human fingerprints!', 'Tigers are the largest wild cat species in the world.', 'Tigers can run at speeds of up to 40 miles per hour.'] },
  { id: 'ze-3', name: 'Gary the Gorilla', emoji: '🦍', description: 'A strong gorilla climbing a skyscraper', savedState: 'pending', trivia: ['Gorillas share 98% of their DNA with humans!', 'Gorillas can learn sign language and communicate with people.', 'Each gorilla has unique nose prints, just like our fingerprints.'] },
  { id: 'ze-4', name: 'Joey the Kangaroo', emoji: '🦘', description: 'A bouncy kangaroo hopping through traffic', savedState: 'pending', trivia: ['Kangaroos can\'t walk backwards!', 'Baby kangaroos are called joeys and are born the size of a jellybean.', 'Kangaroos can jump up to 30 feet in a single leap!'] },
  { id: 'ze-5', name: 'Percy the Peacock', emoji: '🦚', description: 'A colorful peacock on a subway platform', savedState: 'pending', trivia: ['Only male peacocks have the beautiful colorful tail feathers!', 'A peacock\'s tail can be over 5 feet long.', 'Peacocks can fly despite their long tails, but prefer to run.'] },
];

const arcticMeltCreatures: Creature[] = [
  { id: 'am-1', name: 'Pip the Penguin', emoji: '🐧', description: 'A small penguin on a shrinking ice floe', savedState: 'pending', trivia: ['Penguins propose to their mates with a pebble!', 'Emperor penguins can dive deeper than 1,800 feet.', 'Penguins have a gland that removes salt from ocean water.'] },
  { id: 'am-2', name: 'Barnaby the Bear', emoji: '🐻‍❄️', description: 'A polar bear swimming for too long', savedState: 'pending', trivia: ['Polar bear fur is not white - it\'s actually transparent!', 'Polar bears can swim for days without resting.', 'A polar bear\'s skin is black to absorb heat from the sun.'] },
  { id: 'am-3', name: 'Sammy the Seal', emoji: '🦭', description: 'A playful seal caught in a fishing net', savedState: 'pending', trivia: ['Seals can sleep underwater and come up for air automatically!', 'Seals use their whiskers to detect fish in dark water.', 'Some seals can hold their breath for up to 2 hours!'] },
  { id: 'am-4', name: 'Fiona the Fox', emoji: '🦊', description: 'An arctic fox lost in the melting snow', savedState: 'pending', trivia: ['Arctic foxes change color with the seasons!', 'An arctic fox\'s hearing is so good it can hear prey under snow.', 'Arctic foxes have fur on the bottom of their paws for warmth.'] },
  { id: 'am-5', name: 'Ollie the Owl', emoji: '🦉', description: 'A snowy owl with nowhere to land', savedState: 'pending', trivia: ['Snowy owls can turn their heads 270 degrees!', 'Snowy owls hunt during the day, unlike most owls.', 'A snowy owl can eat up to 5 lemmings per day!'] },
];

const mountainQuakeCreatures: Creature[] = [
  { id: 'mq-1', name: 'Billy the Goat', emoji: '🐐', description: 'A mountain goat trapped on a crumbling ledge', savedState: 'pending', trivia: ['Mountain goats can climb nearly vertical cliffs!', 'Mountain goats are actually related to antelopes, not goats.', 'Their special hooves have rough pads for gripping rocks.'] },
  { id: 'mq-2', name: 'Eddie the Eagle', emoji: '🦅', description: 'A majestic eagle whose nest fell down', savedState: 'pending', trivia: ['Eagles can see fish from a mile away!', 'Eagle nests can weigh over 2 tons and be 10 feet wide.', 'Eagles mate for life and use the same nest for years.'] },
  { id: 'mq-3', name: 'Bruno the Bear', emoji: '🐻', description: 'A big brown bear stuck behind a rockslide', savedState: 'pending', trivia: ['Bears can run as fast as a horse - up to 35 mph!', 'A bear\'s sense of smell is 7 times better than a dog\'s.', 'Bears don\'t truly hibernate; they can wake up if disturbed.'] },
  { id: 'mq-4', name: 'Monty the Marmot', emoji: '🐹', description: 'A tiny marmot whose burrow collapsed', savedState: 'pending', trivia: ['Marmots whistle loudly to warn each other of danger!', 'Marmots hibernate for up to 8 months of the year.', 'Marmots live in groups and greet each other by touching noses.'] },
  { id: 'mq-5', name: 'Luna the Lynx', emoji: '🐱', description: 'A swift lynx cornered by falling debris', savedState: 'pending', trivia: ['Lynx have huge furry paws that work like snowshoes!', 'A lynx can spot a mouse from 250 feet away.', 'Lynx are solitary cats that hunt mostly at night.'] },
];

const desertStormCreatures: Creature[] = [
  { id: 'ds-1', name: 'Cammy the Camel', emoji: '🐫', description: 'A patient camel blinded by the sandstorm', savedState: 'pending', trivia: ['Camels can drink 30 gallons of water in just 13 minutes!', 'Camel humps store fat, not water, for energy.', 'Camels can close their nostrils to keep out sand.'] },
  { id: 'ds-2', name: 'Manny the Meerkat', emoji: '🦦', description: 'A lookout meerkat separated from the mob', savedState: 'pending', trivia: ['Meerkats take turns being the lookout for predators!', 'Meerkats are immune to some types of venom.', 'Baby meerkats are taught to hunt by adults in the group.'] },
  { id: 'ds-3', name: 'Sid the Scorpion', emoji: '🦂', description: 'A small scorpion buried under the sand', savedState: 'pending', trivia: ['Scorpions glow under ultraviolet light!', 'Scorpions have been on Earth for over 400 million years.', 'Some scorpions can survive a whole year without eating.'] },
  { id: 'ds-4', name: 'Felix the Fennec', emoji: '🦊', description: 'A big-eared fox hiding from the wind', savedState: 'pending', trivia: ['Fennec foxes have the largest ears relative to body size!', 'Their big ears help them hear prey underground.', 'Fennec foxes can go long periods without drinking water.'] },
  { id: 'ds-5', name: 'Lizzy the Lizard', emoji: '🦎', description: 'A colorful lizard lost in the dunes', savedState: 'pending', trivia: ['Some lizards can detach their tails to escape predators!', 'Lizards smell with their tongues like snakes do.', 'The fastest lizard can run up to 21 miles per hour.'] },
];

const jungleFloodCreatures: Creature[] = [
  { id: 'jf-1', name: 'Jada the Jaguar', emoji: '🐆', description: 'A sleek jaguar trapped on a floating log', savedState: 'pending', trivia: ['Jaguars have the strongest bite of any big cat!', 'Unlike most cats, jaguars love swimming.', 'Jaguars can see six times better than humans in the dark.'] },
  { id: 'jf-2', name: 'Sid the Sloth', emoji: '🦥', description: 'A very slow sloth in a sinking tree', savedState: 'pending', trivia: ['Sloths are excellent swimmers!', 'Sloths only poop once a week and climb down to do it.', 'Algae grows on sloth fur, helping them blend into trees.'] },
  { id: 'jf-3', name: 'Tico the Toucan', emoji: '🦜', description: 'A bright toucan with wet wings', savedState: 'pending', trivia: ['A toucan\'s bill can be one-third of its body length!', 'Toucans tuck their bills under their wings when sleeping.', 'Their colorful bills help them stay cool in the heat.'] },
  { id: 'jf-4', name: 'Freddy the Frog', emoji: '🐸', description: 'A tiny frog whose pond overflowed', savedState: 'pending', trivia: ['Frogs drink water through their skin, not their mouths!', 'Some frogs can freeze solid in winter and thaw in spring.', 'A group of frogs is called an army.'] },
  { id: 'jf-5', name: 'Sly the Snake', emoji: '🐍', description: 'A long snake tangled in river weeds', savedState: 'pending', trivia: ['Snakes smell with their tongues!', 'Snakes don\'t have eyelids - they sleep with eyes open.', 'Some snakes can go up to two years without eating.'] },
];

const savannaDroughtCreatures: Creature[] = [
  { id: 'sd-1', name: 'Rudy the Rhino', emoji: '🦏', description: 'A thirsty rhino searching for water', savedState: 'pending', trivia: ['A group of rhinos is called a crash!', 'Rhino horns are made of the same stuff as your fingernails.', 'Rhinos have poor eyesight but excellent hearing and smell.'] },
  { id: 'sd-2', name: 'Chester the Cheetah', emoji: '🐆', description: 'A fast cheetah too weak to run', savedState: 'pending', trivia: ['Cheetahs are the fastest land animals - up to 70 mph!', 'Cheetahs can accelerate faster than most sports cars.', 'Cheetahs can\'t roar - they chirp and purr like house cats!'] },
  { id: 'sd-3', name: 'Harry the Hyena', emoji: '🐺', description: 'A hungry hyena lost in the dry grass', savedState: 'pending', trivia: ['Hyenas have the strongest jaws of any mammal their size!', 'Female hyenas lead the pack and are larger than males.', 'Hyena "laughs" are actually communication sounds.'] },
  { id: 'sd-4', name: 'Ozzie the Ostrich', emoji: '🐦', description: 'A large bird stuck in the cracked earth', savedState: 'pending', trivia: ['Ostriches are the largest and heaviest birds alive!', 'An ostrich eye is bigger than its brain.', 'Ostriches can run up to 45 miles per hour.'] },
  { id: 'sd-5', name: 'Benny the Buffalo', emoji: '🐃', description: 'A heavy buffalo trapped in a dried-up mud hole', savedState: 'pending', trivia: ['Buffalo vote on which direction the herd should move!', 'Buffalo can jump 6 feet high from a standing position.', 'Buffalo have excellent memories and remember locations for years.'] },
];

const cityStormCreatures: Creature[] = [
  { id: 'cs-1', name: 'Cookie the Cat', emoji: '🐱', description: 'A stray cat hiding under a car', savedState: 'pending', trivia: ['Cats spend 70% of their lives sleeping!', 'Cats can rotate their ears 180 degrees.', 'A cat\'s nose print is unique, like a human fingerprint.'] },
  { id: 'cs-2', name: 'Duke the Dog', emoji: '🐶', description: 'A friendly dog lost in the heavy rain', savedState: 'pending', trivia: ['Dogs can understand up to 250 words and gestures!', 'A dog\'s sense of smell is 10,000 times stronger than humans.', 'Dogs dream just like people do - you can see their paws twitch!'] },
  { id: 'cs-3', name: 'Ruby the Rabbit', emoji: '🐰', description: 'A pet rabbit escaped from a backyard', savedState: 'pending', trivia: ['Rabbits can see almost 360 degrees around them!', 'A happy rabbit will jump and twist in the air - it\'s called a binky.', 'Rabbit teeth never stop growing throughout their lives.'] },
  { id: 'cs-4', name: 'Pip the Pigeon', emoji: '🐦', description: 'A city bird with a broken wing', savedState: 'pending', trivia: ['Pigeons can find their way home from 1,000 miles away!', 'Pigeons were used to deliver messages in both World Wars.', 'Pigeons can recognize all 26 letters of the alphabet.'] },
  { id: 'cs-5', name: 'Squeaky the Squirrel', emoji: '🐿️', description: 'A busy squirrel trapped in a drain pipe', savedState: 'pending', trivia: ['Squirrels plant thousands of trees by forgetting where they buried nuts!', 'A squirrel\'s front teeth never stop growing.', 'Squirrels can fall from 100 feet without getting hurt.'] },
];

const riverPollutionCreatures: Creature[] = [
  { id: 'rp-1', name: 'Bucky the Beaver', emoji: '🦫', description: 'A busy beaver whose dam is full of trash', savedState: 'pending', trivia: ['Beaver dams can be over 2,000 feet long!', 'Beavers have orange teeth because they contain iron for strength.', 'Beavers can hold their breath underwater for 15 minutes.'] },
  { id: 'rp-2', name: 'Dilly the Duck', emoji: '🦆', description: 'A mother duck stuck in plastic rings', savedState: 'pending', trivia: ['Ducks have waterproof feathers thanks to special oil!', 'A duck\'s quack doesn\'t echo, and no one knows why.', 'Ducklings can swim and feed themselves just hours after hatching.'] },
  { id: 'rp-3', name: 'Otto the Otter', emoji: '🦦', description: 'A playful otter in dirty water', savedState: 'pending', trivia: ['Sea otters hold hands while sleeping so they don\'t drift apart!', 'Otters have the thickest fur of any mammal.', 'Otters have a favorite rock they use to crack open shellfish.'] },
  { id: 'rp-4', name: 'Sally the Salmon', emoji: '🐟', description: 'A strong fish unable to swim upstream', savedState: 'pending', trivia: ['Salmon can jump up to 12 feet high to get over waterfalls!', 'Salmon return to the exact stream where they were born to spawn.', 'Salmon can smell their home river from miles away.'] },
  { id: 'rp-5', name: 'Frankie the Frog', emoji: '🐸', description: 'A green frog in a polluted pond', savedState: 'pending', trivia: ['Frogs drink water through their skin, not their mouths!', 'Some frogs can freeze solid in winter and thaw in spring.', 'A group of frogs is called an army.'] },
];

const volcanoEruptionCreatures: Creature[] = [
  { id: 've-1', name: 'Robby the Red Panda', emoji: '🐼', description: 'A fluffy panda escaping the ash', savedState: 'pending', trivia: ['Red pandas are not related to giant pandas at all!', 'Red pandas use their fluffy tails as blankets to stay warm.', 'Red pandas spend most of their lives in trees.'] },
  { id: 've-2', name: 'Terry the Tapir', emoji: '🐗', description: 'A shy tapir running from the heat', savedState: 'pending', trivia: ['Tapirs are related to horses and rhinos!', 'Baby tapirs are born with spots and stripes for camouflage.', 'Tapirs use their long nose like a snorkel when swimming.'] },
  { id: 've-3', name: 'Iggy the Iguana', emoji: '🦎', description: 'A cold-blooded lizard seeking safety', savedState: 'pending', trivia: ['Iguanas have a third eye on top of their head!', 'Iguanas can fall 50 feet and land safely.', 'Iguanas are excellent swimmers and can hold breath for 30 minutes.'] },
  { id: 've-4', name: 'Max the Macaw', emoji: '🦜', description: 'A colorful bird flying through smoke', savedState: 'pending', trivia: ['Macaws can live up to 80 years in captivity!', 'Macaws have tongues with bones inside them.', 'Macaw feathers have antibacterial properties.'] },
  { id: 've-5', name: 'Lemmy the Lemur', emoji: '🐒', description: 'A wide-eyed lemur trapped on a high branch', savedState: 'pending', trivia: ['Lemurs are only found wild on the island of Madagascar!', 'Lemurs sunbathe in a yoga-like position.', 'Female lemurs are always in charge of the group.'] },
];

export const plots: Plot[] = [
  {
    id: 'forest-fire',
    title: 'Forest Fire Emergency!',
    description: 'A terrible forest fire has broken out in the Savanna! Five amazing animals are trapped and need your help. Answer math questions correctly to rescue each one before time runs out!',
    backgroundType: 'forest-fire',
    musicFile: 'forest-fire-suspense.mp3',
    creatures: forestFireCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'oil-spill',
    title: 'Ocean Oil Spill Crisis!',
    description: 'An oil rig has leaked into the ocean! Five sea creatures are in danger and need to be rescued. Solve math problems quickly to save them from the spreading oil!',
    backgroundType: 'oil-spill',
    musicFile: 'ocean-crisis-suspense.mp3',
    creatures: oilSpillCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'farm-flood',
    title: 'Farm Flood Rescue!',
    description: 'Heavy rains have flooded the farm! The animals are stuck and the water is rising. Help rescue the farm friends by solving these math challenges!',
    backgroundType: 'flood',
    musicFile: 'folk-guitar-music-track-61031.mp3',
    creatures: farmFloodCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'zoo-escape',
    title: 'Zoo Escape Chaos!',
    description: 'The zoo gates were left open during a storm! Animals are wandering the city and need to be safely returned. Can you help bring them home?',
    backgroundType: 'zoo-breakout',
    musicFile: 'luxury-jazz-loop-312713.mp3',
    creatures: zooEscapeCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'arctic-melt',
    title: 'Arctic Ice Melt!',
    description: 'The ice is melting fast in the North Pole! Polar animals are losing their homes and need your help to find safety. Solve the problems to save them!',
    backgroundType: 'arctic',
    musicFile: 'relaxing-guitar-loop-v10-252354.mp3',
    creatures: arcticMeltCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'mountain-quake',
    title: 'Mountain Earthquake!',
    description: 'A strong earthquake has caused rockslides in the mountains! Help the mountain creatures who are trapped or lost. Your math skills can save them!',
    backgroundType: 'earthquake',
    musicFile: 'relaxing-guitar-128296.mp3',
    creatures: mountainQuakeCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'desert-storm',
    title: 'Desert Sandstorm!',
    description: 'A massive sandstorm is blowing through the desert! The animals can\'t see where they are going. Help them find shelter before they get buried!',
    backgroundType: 'storm',
    musicFile: 'on-a-hot-summer-night-432877.mp3',
    creatures: desertStormCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'jungle-flood',
    title: 'Jungle Monsoon!',
    description: 'The monsoon rains have turned the jungle into a river! Jungle animals are clinging to branches and logs. Rescue them before they float away!',
    backgroundType: 'flood',
    musicFile: 'relaxing-guitar-loop-v5-245859.mp3',
    creatures: jungleFloodCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'savanna-drought',
    title: 'Savanna Drought!',
    description: 'It hasn\'t rained in months and the water holes are dry! The savanna animals are weak and thirsty. Help them reach the hidden oasis!',
    backgroundType: 'drought',
    musicFile: 'relaxing-guitar-music-volume-2-128532.mp3',
    creatures: savannaDroughtCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'city-storm',
    title: 'City Storm Panic!',
    description: 'A huge thunderstorm is hitting the city! Pets and city animals are scared and lost in the rain. Find them and bring them to safety!',
    backgroundType: 'storm',
    musicFile: 'luxury-jazz-loop-312713.mp3',
    creatures: cityStormCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'river-pollution',
    title: 'River Pollution Crisis!',
    description: 'Someone has dumped trash into the river! The water creatures are getting stuck and can\'t swim. Clean up the river and save the animals!',
    backgroundType: 'pollution',
    musicFile: 'relaxing-guitar-loop-16-282882.mp3',
    creatures: riverPollutionCreatures,
    questionsPerCreature: 3,
    timePerQuestion: 20,
  },
  {
    id: 'volcano-eruption',
    title: 'Volcano Eruption!',
    description: 'A volcano is erupting on a tropical island! The animals need to get to the other side of the island quickly. Help them escape the ash and heat!',
    backgroundType: 'volcano',
    musicFile: 'on-a-hot-summer-night-432877.mp3',
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

// Helper function to get the next plot (cycles through all plots)
export function getNextPlot(currentPlotId?: string): Plot {
  if (!currentPlotId) {
    return getRandomPlot();
  }
  
  const currentIndex = plots.findIndex(p => p.id === currentPlotId);
  const nextIndex = (currentIndex + 1) % plots.length;
  // Deep clone to avoid mutating the original
  return JSON.parse(JSON.stringify(plots[nextIndex]));
}
