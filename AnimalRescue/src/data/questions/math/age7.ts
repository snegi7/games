import type { Question } from '@/types';

// Math questions for 7-year-olds
// Focus: Addition and subtraction up to 20, intro to place value

export const mathQuestionsAge7: Question[] = [
  // Addition (sums to 15)
  { id: 'm7-001', category: 'math', ageLevel: 7, question: '6 + 5 = ?', options: ['10', '12', '11', '9'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-002', category: 'math', ageLevel: 7, question: '7 + 4 = ?', options: ['11', '10', '12', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-003', category: 'math', ageLevel: 7, question: '8 + 3 = ?', options: ['10', '12', '11', '9'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-004', category: 'math', ageLevel: 7, question: '9 + 2 = ?', options: ['11', '10', '12', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-005', category: 'math', ageLevel: 7, question: '6 + 6 = ?', options: ['11', '13', '12', '10'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-006', category: 'math', ageLevel: 7, question: '7 + 5 = ?', options: ['12', '11', '13', '10'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-007', category: 'math', ageLevel: 7, question: '8 + 4 = ?', options: ['11', '13', '12', '10'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-008', category: 'math', ageLevel: 7, question: '9 + 3 = ?', options: ['12', '11', '13', '10'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-009', category: 'math', ageLevel: 7, question: '7 + 6 = ?', options: ['12', '14', '13', '11'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-010', category: 'math', ageLevel: 7, question: '8 + 5 = ?', options: ['13', '12', '14', '11'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // More addition (sums to 20)
  { id: 'm7-011', category: 'math', ageLevel: 7, question: '9 + 5 = ?', options: ['13', '15', '14', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-012', category: 'math', ageLevel: 7, question: '8 + 6 = ?', options: ['14', '13', '15', '12'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-013', category: 'math', ageLevel: 7, question: '7 + 7 = ?', options: ['13', '15', '14', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-014', category: 'math', ageLevel: 7, question: '9 + 6 = ?', options: ['15', '14', '16', '13'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-015', category: 'math', ageLevel: 7, question: '8 + 7 = ?', options: ['14', '16', '15', '13'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-016', category: 'math', ageLevel: 7, question: '9 + 7 = ?', options: ['16', '15', '17', '14'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-017', category: 'math', ageLevel: 7, question: '8 + 8 = ?', options: ['15', '17', '16', '14'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-018', category: 'math', ageLevel: 7, question: '9 + 8 = ?', options: ['17', '16', '18', '15'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-019', category: 'math', ageLevel: 7, question: '9 + 9 = ?', options: ['17', '19', '18', '16'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-020', category: 'math', ageLevel: 7, question: '10 + 10 = ?', options: ['20', '19', '21', '18'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Subtraction from numbers up to 15
  { id: 'm7-021', category: 'math', ageLevel: 7, question: '11 - 5 = ?', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-022', category: 'math', ageLevel: 7, question: '12 - 6 = ?', options: ['6', '5', '7', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-023', category: 'math', ageLevel: 7, question: '13 - 7 = ?', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-024', category: 'math', ageLevel: 7, question: '14 - 8 = ?', options: ['6', '5', '7', '4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-025', category: 'math', ageLevel: 7, question: '15 - 9 = ?', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-026', category: 'math', ageLevel: 7, question: '11 - 3 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-027', category: 'math', ageLevel: 7, question: '12 - 4 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-028', category: 'math', ageLevel: 7, question: '13 - 5 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-029', category: 'math', ageLevel: 7, question: '14 - 6 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-030', category: 'math', ageLevel: 7, question: '15 - 7 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Subtraction from numbers up to 20
  { id: 'm7-031', category: 'math', ageLevel: 7, question: '16 - 8 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-032', category: 'math', ageLevel: 7, question: '17 - 9 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-033', category: 'math', ageLevel: 7, question: '18 - 9 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-034', category: 'math', ageLevel: 7, question: '19 - 9 = ?', options: ['10', '9', '11', '8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-035', category: 'math', ageLevel: 7, question: '20 - 10 = ?', options: ['9', '11', '10', '8'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Place value (tens and ones)
  { id: 'm7-036', category: 'math', ageLevel: 7, question: 'How many tens in 14?', options: ['4', '1', '0', '14'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm7-037', category: 'math', ageLevel: 7, question: 'How many ones in 17?', options: ['1', '17', '7', '10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-038', category: 'math', ageLevel: 7, question: '1 ten + 5 ones = ?', options: ['6', '51', '15', '10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-039', category: 'math', ageLevel: 7, question: '1 ten + 8 ones = ?', options: ['18', '81', '9', '10'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-040', category: 'math', ageLevel: 7, question: '2 tens = ?', options: ['2', '12', '20', '22'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Adding with 10
  { id: 'm7-041', category: 'math', ageLevel: 7, question: '10 + 3 = ?', options: ['13', '30', '103', '7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-042', category: 'math', ageLevel: 7, question: '10 + 7 = ?', options: ['70', '17', '107', '3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-043', category: 'math', ageLevel: 7, question: '5 + 10 = ?', options: ['15', '50', '105', '510'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-044', category: 'math', ageLevel: 7, question: '10 + 9 = ?', options: ['90', '109', '19', '1'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-045', category: 'math', ageLevel: 7, question: '10 + 0 = ?', options: ['0', '100', '10', '1'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm7-046', category: 'math', ageLevel: 7, question: 'Sam has 8 toys. He gets 5 more. How many now?', options: ['12', '14', '13', '11'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  { id: 'm7-047', category: 'math', ageLevel: 7, question: 'There are 15 birds. 7 fly away. How many left?', options: ['8', '7', '9', '22'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm7-048', category: 'math', ageLevel: 7, question: 'I have 9 apples and 6 oranges. How many fruits?', options: ['14', '16', '15', '3'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  { id: 'm7-049', category: 'math', ageLevel: 7, question: 'Mom baked 12 cookies. We ate 4. How many left?', options: ['8', '7', '16', '9'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm7-050', category: 'math', ageLevel: 7, question: 'I read 7 pages today and 8 yesterday. Total pages?', options: ['14', '16', '15', '1'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  
  // Missing number problems
  { id: 'm7-051', category: 'math', ageLevel: 7, question: '5 + __ = 12', options: ['6', '8', '7', '5'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-052', category: 'math', ageLevel: 7, question: '__ + 6 = 13', options: ['7', '6', '8', '9'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-053', category: 'math', ageLevel: 7, question: '14 - __ = 8', options: ['5', '7', '6', '4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-054', category: 'math', ageLevel: 7, question: '__ - 5 = 9', options: ['14', '13', '15', '4'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm7-055', category: 'math', ageLevel: 7, question: '8 + __ = 15', options: ['6', '8', '7', '9'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Doubles
  { id: 'm7-056', category: 'math', ageLevel: 7, question: 'Double of 6 = ?', options: ['12', '66', '8', '10'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-057', category: 'math', ageLevel: 7, question: 'Double of 7 = ?', options: ['77', '14', '9', '12'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-058', category: 'math', ageLevel: 7, question: 'Double of 8 = ?', options: ['18', '16', '88', '10'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-059', category: 'math', ageLevel: 7, question: 'Double of 9 = ?', options: ['18', '99', '19', '12'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-060', category: 'math', ageLevel: 7, question: 'Half of 10 = ?', options: ['2', '5', '10', '1'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Comparing numbers
  { id: 'm7-061', category: 'math', ageLevel: 7, question: 'Which is greater: 14 or 17?', options: ['14', '17', 'Same', '31'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-062', category: 'math', ageLevel: 7, question: 'Which is smaller: 19 or 15?', options: ['19', '15', 'Same', '4'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-063', category: 'math', ageLevel: 7, question: '12 __ 15 (< or >)?', options: ['>', '<', '=', '+'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-064', category: 'math', ageLevel: 7, question: '18 __ 13 (< or >)?', options: ['<', '=', '>', '+'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-065', category: 'math', ageLevel: 7, question: '16 __ 16 (< or > or =)?', options: ['>', '<', '=', '+'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Number patterns
  { id: 'm7-066', category: 'math', ageLevel: 7, question: '2, 4, 6, 8, __?', options: ['9', '11', '10', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-067', category: 'math', ageLevel: 7, question: '5, 10, 15, __?', options: ['25', '20', '18', '16'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm7-068', category: 'math', ageLevel: 7, question: '20, 18, 16, __?', options: ['15', '13', '14', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-069', category: 'math', ageLevel: 7, question: '1, 3, 5, 7, __?', options: ['8', '10', '9', '11'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-070', category: 'math', ageLevel: 7, question: '10, 20, 30, __?', options: ['35', '40', '50', '45'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // More operations
  { id: 'm7-071', category: 'math', ageLevel: 7, question: '5 + 6 + 1 = ?', options: ['11', '13', '12', '10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-072', category: 'math', ageLevel: 7, question: '3 + 4 + 5 = ?', options: ['12', '11', '13', '14'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-073', category: 'math', ageLevel: 7, question: '2 + 8 + 4 = ?', options: ['13', '15', '14', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-074', category: 'math', ageLevel: 7, question: '10 + 5 + 2 = ?', options: ['17', '16', '18', '15'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-075', category: 'math', ageLevel: 7, question: '6 + 6 + 6 = ?', options: ['18', '16', '20', '12'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Subtraction practice
  { id: 'm7-076', category: 'math', ageLevel: 7, question: '20 - 5 = ?', options: ['14', '16', '15', '25'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-077', category: 'math', ageLevel: 7, question: '20 - 8 = ?', options: ['12', '11', '13', '28'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-078', category: 'math', ageLevel: 7, question: '18 - 10 = ?', options: ['8', '28', '10', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm7-079', category: 'math', ageLevel: 7, question: '16 - 9 = ?', options: ['8', '6', '7', '25'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-080', category: 'math', ageLevel: 7, question: '15 - 15 = ?', options: ['15', '30', '0', '1'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Counting by skip
  { id: 'm7-081', category: 'math', ageLevel: 7, question: 'Count by 2s: 6, 8, __?', options: ['9', '11', '10', '12'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-082', category: 'math', ageLevel: 7, question: 'Count by 5s: 10, 15, __?', options: ['25', '20', '16', '18'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-083', category: 'math', ageLevel: 7, question: 'Count by 10s: 30, 40, __?', options: ['45', '50', '55', '60'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm7-084', category: 'math', ageLevel: 7, question: 'Count backwards by 2: 12, 10, __?', options: ['9', '7', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-085', category: 'math', ageLevel: 7, question: 'Count by 3s: 3, 6, 9, __?', options: ['10', '11', '12', '15'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // More word problems
  { id: 'm7-086', category: 'math', ageLevel: 7, question: 'I had 16 stickers. I gave 8 to my friend. How many left?', options: ['7', '9', '8', '24'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-087', category: 'math', ageLevel: 7, question: 'There are 7 red balls and 9 blue balls. How many balls?', options: ['15', '17', '16', '2'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-088', category: 'math', ageLevel: 7, question: 'I need 20 points. I have 13. How many more do I need?', options: ['7', '6', '8', '33'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm7-089', category: 'math', ageLevel: 7, question: 'The bus has 12 people. 5 get off. How many on the bus?', options: ['17', '7', '8', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm7-090', category: 'math', ageLevel: 7, question: 'I scored 9 points and then 8 more. Total points?', options: ['16', '18', '17', '1'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Ordering numbers
  { id: 'm7-091', category: 'math', ageLevel: 7, question: 'Put in order (smallest first): 15, 8, 12', options: ['15, 12, 8', '8, 12, 15', '12, 8, 15', '8, 15, 12'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm7-092', category: 'math', ageLevel: 7, question: 'Put in order (largest first): 11, 19, 7', options: ['19, 11, 7', '7, 11, 19', '11, 7, 19', '19, 7, 11'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-093', category: 'math', ageLevel: 7, question: 'What is between 14 and 16?', options: ['13', '17', '15', '14'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-094', category: 'math', ageLevel: 7, question: 'What is between 18 and 20?', options: ['17', '21', '19', '18'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm7-095', category: 'math', ageLevel: 7, question: 'Which is closest to 10: 7 or 13?', options: ['7', '13', 'Same', '10'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Final questions
  { id: 'm7-096', category: 'math', ageLevel: 7, question: '11 + 8 = ?', options: ['18', '20', '19', '17'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-097', category: 'math', ageLevel: 7, question: '12 + 7 = ?', options: ['19', '18', '20', '17'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-098', category: 'math', ageLevel: 7, question: '14 + 5 = ?', options: ['18', '20', '19', '17'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm7-099', category: 'math', ageLevel: 7, question: '13 + 6 = ?', options: ['19', '18', '20', '17'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm7-100', category: 'math', ageLevel: 7, question: '15 + 5 = ?', options: ['19', '21', '20', '25'], correctAnswerIndex: 2, difficulty: 'easy' },
];
