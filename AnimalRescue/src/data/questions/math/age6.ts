import type { Question } from '@/types';

// Math questions for 6-year-olds
// Focus: Basic counting, simple addition (1-10), number recognition

export const mathQuestionsAge6: Question[] = [
  // Simple Addition (1-5)
  { id: 'm6-001', category: 'math', ageLevel: 6, question: '1 + 1 = ?', options: ['2', '3', '1', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-002', category: 'math', ageLevel: 6, question: '1 + 2 = ?', options: ['2', '3', '4', '1'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-003', category: 'math', ageLevel: 6, question: '2 + 1 = ?', options: ['3', '2', '4', '1'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-004', category: 'math', ageLevel: 6, question: '2 + 2 = ?', options: ['3', '5', '4', '2'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-005', category: 'math', ageLevel: 6, question: '1 + 3 = ?', options: ['3', '4', '5', '2'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-006', category: 'math', ageLevel: 6, question: '3 + 1 = ?', options: ['4', '3', '5', '2'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-007', category: 'math', ageLevel: 6, question: '2 + 3 = ?', options: ['4', '6', '5', '3'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-008', category: 'math', ageLevel: 6, question: '3 + 2 = ?', options: ['5', '4', '6', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-009', category: 'math', ageLevel: 6, question: '1 + 4 = ?', options: ['4', '6', '3', '5'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm6-010', category: 'math', ageLevel: 6, question: '4 + 1 = ?', options: ['5', '4', '6', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // More additions
  { id: 'm6-011', category: 'math', ageLevel: 6, question: '3 + 3 = ?', options: ['5', '6', '7', '4'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-012', category: 'math', ageLevel: 6, question: '2 + 4 = ?', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-013', category: 'math', ageLevel: 6, question: '4 + 2 = ?', options: ['6', '5', '7', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-014', category: 'math', ageLevel: 6, question: '1 + 5 = ?', options: ['5', '7', '4', '6'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm6-015', category: 'math', ageLevel: 6, question: '5 + 1 = ?', options: ['6', '5', '7', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-016', category: 'math', ageLevel: 6, question: '3 + 4 = ?', options: ['6', '8', '7', '5'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-017', category: 'math', ageLevel: 6, question: '4 + 3 = ?', options: ['7', '6', '8', '5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-018', category: 'math', ageLevel: 6, question: '2 + 5 = ?', options: ['6', '8', '5', '7'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm6-019', category: 'math', ageLevel: 6, question: '5 + 2 = ?', options: ['7', '6', '8', '5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-020', category: 'math', ageLevel: 6, question: '4 + 4 = ?', options: ['7', '8', '9', '6'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Subtraction basics
  { id: 'm6-021', category: 'math', ageLevel: 6, question: '2 - 1 = ?', options: ['1', '2', '0', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-022', category: 'math', ageLevel: 6, question: '3 - 1 = ?', options: ['1', '2', '3', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-023', category: 'math', ageLevel: 6, question: '3 - 2 = ?', options: ['1', '2', '0', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-024', category: 'math', ageLevel: 6, question: '4 - 1 = ?', options: ['2', '4', '3', '1'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-025', category: 'math', ageLevel: 6, question: '4 - 2 = ?', options: ['2', '3', '1', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-026', category: 'math', ageLevel: 6, question: '4 - 3 = ?', options: ['2', '1', '0', '3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-027', category: 'math', ageLevel: 6, question: '5 - 1 = ?', options: ['3', '5', '4', '2'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-028', category: 'math', ageLevel: 6, question: '5 - 2 = ?', options: ['3', '4', '2', '5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-029', category: 'math', ageLevel: 6, question: '5 - 3 = ?', options: ['1', '2', '3', '4'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-030', category: 'math', ageLevel: 6, question: '5 - 4 = ?', options: ['1', '2', '0', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Counting questions
  { id: 'm6-031', category: 'math', ageLevel: 6, question: 'How many apples? 🍎🍎🍎', options: ['2', '4', '3', '5'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-032', category: 'math', ageLevel: 6, question: 'How many stars? ⭐⭐⭐⭐', options: ['3', '4', '5', '6'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-033', category: 'math', ageLevel: 6, question: 'How many hearts? ❤️❤️', options: ['1', '3', '2', '4'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-034', category: 'math', ageLevel: 6, question: 'How many fish? 🐟🐟🐟🐟🐟', options: ['4', '6', '3', '5'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm6-035', category: 'math', ageLevel: 6, question: 'How many balls? ⚽⚽⚽⚽⚽⚽', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-036', category: 'math', ageLevel: 6, question: 'How many cats? 🐱', options: ['0', '2', '1', '3'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-037', category: 'math', ageLevel: 6, question: 'How many birds? 🐦🐦🐦🐦🐦🐦🐦', options: ['6', '8', '5', '7'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm6-038', category: 'math', ageLevel: 6, question: 'How many flowers? 🌸🌸🌸🌸🌸🌸🌸🌸', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-039', category: 'math', ageLevel: 6, question: 'How many trees? 🌳🌳🌳🌳🌳🌳🌳🌳🌳', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-040', category: 'math', ageLevel: 6, question: 'How many suns? ☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️', options: ['9', '11', '8', '10'], correctAnswerIndex: 3, difficulty: 'easy' },
  
  // Number comparison
  { id: 'm6-041', category: 'math', ageLevel: 6, question: 'Which is bigger: 3 or 5?', options: ['3', '5', 'Same', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-042', category: 'math', ageLevel: 6, question: 'Which is smaller: 2 or 7?', options: ['7', '2', 'Same', '9'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-043', category: 'math', ageLevel: 6, question: 'Which is bigger: 8 or 4?', options: ['4', '8', 'Same', '12'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-044', category: 'math', ageLevel: 6, question: 'Which is smaller: 9 or 6?', options: ['9', '6', 'Same', '3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-045', category: 'math', ageLevel: 6, question: 'Which is bigger: 1 or 10?', options: ['1', '10', 'Same', '11'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // More addition (medium)
  { id: 'm6-046', category: 'math', ageLevel: 6, question: '5 + 3 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-047', category: 'math', ageLevel: 6, question: '3 + 5 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-048', category: 'math', ageLevel: 6, question: '4 + 5 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-049', category: 'math', ageLevel: 6, question: '5 + 4 = ?', options: ['9', '8', '10', '7'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-050', category: 'math', ageLevel: 6, question: '5 + 5 = ?', options: ['9', '11', '8', '10'], correctAnswerIndex: 3, difficulty: 'medium' },
  
  // More subtraction (medium)
  { id: 'm6-051', category: 'math', ageLevel: 6, question: '6 - 1 = ?', options: ['4', '6', '5', '3'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-052', category: 'math', ageLevel: 6, question: '6 - 2 = ?', options: ['4', '5', '3', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-053', category: 'math', ageLevel: 6, question: '6 - 3 = ?', options: ['2', '4', '3', '5'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-054', category: 'math', ageLevel: 6, question: '7 - 2 = ?', options: ['4', '6', '5', '3'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-055', category: 'math', ageLevel: 6, question: '7 - 3 = ?', options: ['4', '5', '3', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-056', category: 'math', ageLevel: 6, question: '8 - 2 = ?', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-057', category: 'math', ageLevel: 6, question: '8 - 3 = ?', options: ['5', '6', '4', '7'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-058', category: 'math', ageLevel: 6, question: '8 - 4 = ?', options: ['3', '5', '4', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-059', category: 'math', ageLevel: 6, question: '9 - 4 = ?', options: ['5', '6', '4', '3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-060', category: 'math', ageLevel: 6, question: '10 - 5 = ?', options: ['4', '6', '5', '3'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Number ordering
  { id: 'm6-061', category: 'math', ageLevel: 6, question: 'What comes after 3?', options: ['2', '4', '5', '3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-062', category: 'math', ageLevel: 6, question: 'What comes before 5?', options: ['4', '6', '3', '5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-063', category: 'math', ageLevel: 6, question: 'What comes after 7?', options: ['6', '9', '8', '7'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-064', category: 'math', ageLevel: 6, question: 'What comes before 9?', options: ['8', '10', '7', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-065', category: 'math', ageLevel: 6, question: 'What comes after 9?', options: ['8', '11', '10', '9'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Zero concepts
  { id: 'm6-066', category: 'math', ageLevel: 6, question: '0 + 5 = ?', options: ['0', '5', '4', '6'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-067', category: 'math', ageLevel: 6, question: '3 + 0 = ?', options: ['0', '4', '3', '2'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-068', category: 'math', ageLevel: 6, question: '5 - 0 = ?', options: ['0', '5', '4', '6'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-069', category: 'math', ageLevel: 6, question: '4 - 4 = ?', options: ['4', '1', '0', '8'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-070', category: 'math', ageLevel: 6, question: '7 - 7 = ?', options: ['7', '14', '1', '0'], correctAnswerIndex: 3, difficulty: 'easy' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm6-071', category: 'math', ageLevel: 6, question: 'I have 2 apples. I get 2 more. How many now?', options: ['3', '4', '5', '2'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm6-072', category: 'math', ageLevel: 6, question: 'I have 5 cookies. I eat 1. How many left?', options: ['5', '3', '4', '6'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  { id: 'm6-073', category: 'math', ageLevel: 6, question: 'I have 3 toys. I get 3 more. How many now?', options: ['5', '6', '7', '4'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm6-074', category: 'math', ageLevel: 6, question: 'I have 6 candies. I give 2 away. How many left?', options: ['3', '4', '5', '8'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm6-075', category: 'math', ageLevel: 6, question: 'I see 4 birds. 1 flies away. How many left?', options: ['3', '4', '5', '2'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  
  // More counting with emojis
  { id: 'm6-076', category: 'math', ageLevel: 6, question: '🍎 + 🍎 = ?', options: ['1', '2', '3', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm6-077', category: 'math', ageLevel: 6, question: '⭐ + ⭐ + ⭐ = ?', options: ['2', '4', '3', '1'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-078', category: 'math', ageLevel: 6, question: '🐶 + 🐶 + 🐶 + 🐶 = ?', options: ['3', '5', '4', '2'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-079', category: 'math', ageLevel: 6, question: '🌈🌈🌈🌈🌈 - 🌈🌈 = ?', options: ['2', '4', '3', '5'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-080', category: 'math', ageLevel: 6, question: '🎈🎈🎈🎈 + 🎈 = ?', options: ['4', '6', '5', '3'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Pattern recognition
  { id: 'm6-081', category: 'math', ageLevel: 6, question: '1, 2, 3, __?', options: ['5', '4', '3', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm6-082', category: 'math', ageLevel: 6, question: '2, 4, 6, __?', options: ['7', '9', '8', '10'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm6-083', category: 'math', ageLevel: 6, question: '5, 4, 3, __?', options: ['1', '2', '0', '4'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm6-084', category: 'math', ageLevel: 6, question: '1, 3, 5, __?', options: ['6', '8', '7', '9'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm6-085', category: 'math', ageLevel: 6, question: '10, 9, 8, __?', options: ['6', '7', '5', '8'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // More additions sums to 10
  { id: 'm6-086', category: 'math', ageLevel: 6, question: '6 + 2 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-087', category: 'math', ageLevel: 6, question: '2 + 6 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-088', category: 'math', ageLevel: 6, question: '7 + 1 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-089', category: 'math', ageLevel: 6, question: '1 + 7 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-090', category: 'math', ageLevel: 6, question: '6 + 3 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // More subtractions
  { id: 'm6-091', category: 'math', ageLevel: 6, question: '9 - 1 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-092', category: 'math', ageLevel: 6, question: '9 - 2 = ?', options: ['7', '8', '6', '9'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-093', category: 'math', ageLevel: 6, question: '10 - 1 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm6-094', category: 'math', ageLevel: 6, question: '10 - 2 = ?', options: ['8', '9', '7', '10'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-095', category: 'math', ageLevel: 6, question: '10 - 3 = ?', options: ['6', '8', '7', '5'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Final questions
  { id: 'm6-096', category: 'math', ageLevel: 6, question: '6 + 4 = ?', options: ['9', '11', '10', '8'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-097', category: 'math', ageLevel: 6, question: '7 + 3 = ?', options: ['10', '9', '11', '8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm6-098', category: 'math', ageLevel: 6, question: '8 + 2 = ?', options: ['9', '11', '10', '8'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm6-099', category: 'math', ageLevel: 6, question: '9 + 1 = ?', options: ['10', '9', '11', '8'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm6-100', category: 'math', ageLevel: 6, question: '10 - 10 = ?', options: ['10', '1', '0', '20'], correctAnswerIndex: 2, difficulty: 'medium' },
];
