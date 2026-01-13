import { Ingredient } from '../types';

export const INGREDIENTS: Ingredient[] = [
  // Proteins
  { id: 'chicken', name: 'Chicken', emoji: '🍗', price: 3, category: 'protein' },
  { id: 'beef', name: 'Beef', emoji: '🥩', price: 4, category: 'protein' },
  { id: 'fish', name: 'Fish', emoji: '🐟', price: 3, category: 'protein' },
  { id: 'shrimp', name: 'Shrimp', emoji: '🦐', price: 4, category: 'protein' },
  { id: 'egg', name: 'Egg', emoji: '🥚', price: 1, category: 'protein' },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', price: 2, category: 'protein' },
  
  // Vegetables
  { id: 'tomato', name: 'Tomato', emoji: '🍅', price: 1, category: 'vegetable' },
  { id: 'carrot', name: 'Carrot', emoji: '🥕', price: 1, category: 'vegetable' },
  { id: 'onion', name: 'Onion', emoji: '🧅', price: 1, category: 'vegetable' },
  { id: 'potato', name: 'Potato', emoji: '🥔', price: 1, category: 'vegetable' },
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', price: 1, category: 'vegetable' },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', price: 2, category: 'vegetable' },
  { id: 'corn', name: 'Corn', emoji: '🌽', price: 1, category: 'vegetable' },
  { id: 'mushroom', name: 'Mushroom', emoji: '🍄', price: 2, category: 'vegetable' },
  { id: 'pepper', name: 'Bell Pepper', emoji: '🫑', price: 1, category: 'vegetable' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', price: 1, category: 'vegetable' },
  { id: 'eggplant', name: 'Eggplant', emoji: '🍆', price: 2, category: 'vegetable' },
  { id: 'garlic', name: 'Garlic', emoji: '🧄', price: 1, category: 'vegetable' },
  
  // Dairy
  { id: 'cheese', name: 'Cheese', emoji: '🧀', price: 2, category: 'dairy' },
  { id: 'butter', name: 'Butter', emoji: '🧈', price: 2, category: 'dairy' },
  { id: 'milk', name: 'Milk', emoji: '🥛', price: 1, category: 'dairy' },
  
  // Grains
  { id: 'bread', name: 'Bread', emoji: '🍞', price: 1, category: 'grain' },
  { id: 'rice', name: 'Rice', emoji: '🍚', price: 1, category: 'grain' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', price: 1, category: 'grain' },
  { id: 'flour', name: 'Flour', emoji: '🌾', price: 1, category: 'grain' },
  
  // Fruits
  { id: 'apple', name: 'Apple', emoji: '🍎', price: 1, category: 'fruit' },
  { id: 'lemon', name: 'Lemon', emoji: '🍋', price: 1, category: 'fruit' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', price: 2, category: 'fruit' },
  { id: 'banana', name: 'Banana', emoji: '🍌', price: 1, category: 'fruit' },
  { id: 'orange', name: 'Orange', emoji: '🍊', price: 1, category: 'fruit' },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', price: 2, category: 'fruit' },
  { id: 'peach', name: 'Peach', emoji: '🍑', price: 2, category: 'fruit' },
  { id: 'coconut', name: 'Coconut', emoji: '🥥', price: 2, category: 'fruit' },
  
  // Spices & Other
  { id: 'salt', name: 'Salt', emoji: '🧂', price: 1, category: 'spice' },
  { id: 'honey', name: 'Honey', emoji: '🍯', price: 2, category: 'other' },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', price: 2, category: 'other' },
  { id: 'ice', name: 'Ice', emoji: '🧊', price: 1, category: 'other' },
  { id: 'oil', name: 'Oil', emoji: '🫒', price: 1, category: 'other' },
];

export const getIngredientById = (id: string): Ingredient | undefined => {
  return INGREDIENTS.find(ing => ing.id === id);
};

export const getIngredientsByIds = (ids: string[]): Ingredient[] => {
  return ids.map(id => getIngredientById(id)).filter((ing): ing is Ingredient => ing !== undefined);
};
