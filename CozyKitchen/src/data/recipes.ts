import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  // Easy recipes (4 ingredients) - Starting unlocked
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    emoji: '🍳',
    ingredients: ['egg', 'butter', 'salt', 'milk'],
    sellPrice: 8,
    unlockPrice: 0,
    difficulty: 'easy',
    description: 'Fluffy and delicious scrambled eggs!',
  },
  {
    id: 'toast-and-butter',
    name: 'Buttery Toast',
    emoji: '🍞',
    ingredients: ['bread', 'butter', 'honey', 'salt'],
    sellPrice: 6,
    unlockPrice: 0,
    difficulty: 'easy',
    description: 'Crispy toast with golden butter and honey.',
  },
  {
    id: 'garden-salad',
    name: 'Garden Salad',
    emoji: '🥗',
    ingredients: ['lettuce', 'tomato', 'cucumber', 'oil'],
    sellPrice: 7,
    unlockPrice: 0,
    difficulty: 'easy',
    description: 'Fresh veggies from the garden!',
  },
  {
    id: 'fruit-bowl',
    name: 'Fruit Bowl',
    emoji: '🍇',
    ingredients: ['apple', 'banana', 'strawberry', 'orange'],
    sellPrice: 9,
    unlockPrice: 0,
    difficulty: 'easy',
    description: 'A colorful bowl of fresh fruits.',
  },
  
  // Easy-Medium recipes (5 ingredients)
  {
    id: 'grilled-cheese',
    name: 'Grilled Cheese',
    emoji: '🧀',
    ingredients: ['bread', 'cheese', 'butter', 'tomato', 'salt'],
    sellPrice: 12,
    unlockPrice: 15,
    difficulty: 'easy',
    description: 'Gooey melted cheese sandwich!',
  },
  {
    id: 'veggie-stir-fry',
    name: 'Veggie Stir Fry',
    emoji: '🥘',
    ingredients: ['broccoli', 'carrot', 'pepper', 'garlic', 'oil'],
    sellPrice: 14,
    unlockPrice: 18,
    difficulty: 'easy',
    description: 'Colorful veggies sizzled to perfection.',
  },
  {
    id: 'bacon-eggs',
    name: 'Bacon & Eggs',
    emoji: '🥓',
    ingredients: ['bacon', 'egg', 'butter', 'salt', 'pepper'],
    sellPrice: 15,
    unlockPrice: 20,
    difficulty: 'easy',
    description: 'Classic breakfast combo!',
  },
  
  // Medium recipes (6 ingredients)
  {
    id: 'chicken-salad',
    name: 'Chicken Salad',
    emoji: '🥗',
    ingredients: ['chicken', 'lettuce', 'tomato', 'cucumber', 'cheese', 'oil'],
    sellPrice: 20,
    unlockPrice: 25,
    difficulty: 'medium',
    description: 'Hearty salad with grilled chicken.',
  },
  {
    id: 'mushroom-pasta',
    name: 'Mushroom Pasta',
    emoji: '🍝',
    ingredients: ['pasta', 'mushroom', 'garlic', 'butter', 'cheese', 'salt'],
    sellPrice: 22,
    unlockPrice: 28,
    difficulty: 'medium',
    description: 'Creamy pasta with sautéed mushrooms.',
  },
  {
    id: 'fish-tacos',
    name: 'Fish Tacos',
    emoji: '🌮',
    ingredients: ['fish', 'flour', 'lettuce', 'tomato', 'lemon', 'salt'],
    sellPrice: 24,
    unlockPrice: 30,
    difficulty: 'medium',
    description: 'Crispy fish in soft tortillas.',
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    emoji: '🍚',
    ingredients: ['rice', 'egg', 'carrot', 'corn', 'onion', 'oil'],
    sellPrice: 18,
    unlockPrice: 22,
    difficulty: 'medium',
    description: 'Savory rice with veggies and egg.',
  },
  {
    id: 'potato-soup',
    name: 'Potato Soup',
    emoji: '🥣',
    ingredients: ['potato', 'onion', 'milk', 'butter', 'salt', 'bacon'],
    sellPrice: 19,
    unlockPrice: 24,
    difficulty: 'medium',
    description: 'Creamy, comforting potato soup.',
  },
  
  // Medium-Hard recipes (7 ingredients)
  {
    id: 'beef-stir-fry',
    name: 'Beef Stir Fry',
    emoji: '🥩',
    ingredients: ['beef', 'broccoli', 'carrot', 'pepper', 'garlic', 'onion', 'oil'],
    sellPrice: 30,
    unlockPrice: 40,
    difficulty: 'medium',
    description: 'Tender beef with crunchy vegetables.',
  },
  {
    id: 'shrimp-pasta',
    name: 'Shrimp Pasta',
    emoji: '🦐',
    ingredients: ['shrimp', 'pasta', 'garlic', 'butter', 'lemon', 'salt', 'oil'],
    sellPrice: 32,
    unlockPrice: 42,
    difficulty: 'medium',
    description: 'Garlic butter shrimp over pasta.',
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    emoji: '🍛',
    ingredients: ['chicken', 'onion', 'tomato', 'garlic', 'rice', 'oil', 'salt'],
    sellPrice: 28,
    unlockPrice: 35,
    difficulty: 'medium',
    description: 'Aromatic curry with tender chicken.',
  },
  {
    id: 'veggie-pizza',
    name: 'Veggie Pizza',
    emoji: '🍕',
    ingredients: ['flour', 'tomato', 'cheese', 'mushroom', 'pepper', 'onion', 'oil'],
    sellPrice: 26,
    unlockPrice: 32,
    difficulty: 'medium',
    description: 'Cheesy pizza loaded with veggies.',
  },
  
  // Hard recipes (8 ingredients)
  {
    id: 'seafood-paella',
    name: 'Seafood Paella',
    emoji: '🥘',
    ingredients: ['rice', 'shrimp', 'fish', 'tomato', 'pepper', 'onion', 'garlic', 'oil'],
    sellPrice: 45,
    unlockPrice: 60,
    difficulty: 'hard',
    description: 'Spanish rice with fresh seafood.',
  },
  {
    id: 'beef-burger',
    name: 'Gourmet Burger',
    emoji: '🍔',
    ingredients: ['beef', 'bread', 'cheese', 'lettuce', 'tomato', 'onion', 'bacon', 'salt'],
    sellPrice: 40,
    unlockPrice: 50,
    difficulty: 'hard',
    description: 'Juicy burger with all the fixings.',
  },
  {
    id: 'banana-pancakes',
    name: 'Banana Pancakes',
    emoji: '🥞',
    ingredients: ['flour', 'egg', 'milk', 'banana', 'butter', 'honey', 'salt', 'chocolate'],
    sellPrice: 35,
    unlockPrice: 45,
    difficulty: 'hard',
    description: 'Fluffy pancakes with banana and chocolate.',
  },
  {
    id: 'fruit-smoothie',
    name: 'Tropical Smoothie',
    emoji: '🥤',
    ingredients: ['banana', 'strawberry', 'orange', 'coconut', 'milk', 'honey', 'ice', 'peach'],
    sellPrice: 38,
    unlockPrice: 48,
    difficulty: 'hard',
    description: 'Refreshing tropical fruit blend.',
  },
];

// Starting recipes that are unlocked for free
export const STARTING_RECIPE_IDS = RECIPES
  .filter(r => r.unlockPrice === 0)
  .map(r => r.id);

export const getRecipeById = (id: string): Recipe | undefined => {
  return RECIPES.find(recipe => recipe.id === id);
};

export const calculateRecipeCost = (recipe: Recipe): number => {
  // Sum up the cost of all ingredients for a recipe
  return recipe.ingredients.reduce((total) => total + 1, 0); // Simplified: each ingredient costs 1 to use
};
