import type { Question } from '@/types';

// Math questions for 8-year-olds
// Focus: Addition/subtraction up to 100, intro to multiplication

export const mathQuestionsAge8: Question[] = [
  // Two-digit addition (no carrying)
  { id: 'm8-001', category: 'math', ageLevel: 8, question: '23 + 14 = ?', options: ['36', '38', '37', '35'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-002', category: 'math', ageLevel: 8, question: '31 + 25 = ?', options: ['56', '55', '57', '54'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-003', category: 'math', ageLevel: 8, question: '42 + 36 = ?', options: ['77', '79', '78', '76'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-004', category: 'math', ageLevel: 8, question: '54 + 23 = ?', options: ['77', '76', '78', '75'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-005', category: 'math', ageLevel: 8, question: '61 + 18 = ?', options: ['78', '80', '79', '77'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Two-digit addition (with carrying)
  { id: 'm8-006', category: 'math', ageLevel: 8, question: '28 + 15 = ?', options: ['42', '44', '43', '41'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-007', category: 'math', ageLevel: 8, question: '37 + 26 = ?', options: ['63', '62', '64', '61'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-008', category: 'math', ageLevel: 8, question: '45 + 38 = ?', options: ['82', '84', '83', '81'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-009', category: 'math', ageLevel: 8, question: '59 + 24 = ?', options: ['83', '82', '84', '81'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-010', category: 'math', ageLevel: 8, question: '67 + 28 = ?', options: ['94', '96', '95', '93'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Two-digit subtraction (no borrowing)
  { id: 'm8-011', category: 'math', ageLevel: 8, question: '48 - 23 = ?', options: ['24', '26', '25', '27'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-012', category: 'math', ageLevel: 8, question: '56 - 34 = ?', options: ['22', '21', '23', '20'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-013', category: 'math', ageLevel: 8, question: '79 - 45 = ?', options: ['33', '35', '34', '32'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-014', category: 'math', ageLevel: 8, question: '87 - 52 = ?', options: ['35', '34', '36', '33'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-015', category: 'math', ageLevel: 8, question: '95 - 61 = ?', options: ['33', '35', '34', '32'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Two-digit subtraction (with borrowing)
  { id: 'm8-016', category: 'math', ageLevel: 8, question: '52 - 28 = ?', options: ['23', '25', '24', '26'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-017', category: 'math', ageLevel: 8, question: '63 - 37 = ?', options: ['26', '25', '27', '24'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-018', category: 'math', ageLevel: 8, question: '74 - 49 = ?', options: ['24', '26', '25', '23'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-019', category: 'math', ageLevel: 8, question: '81 - 56 = ?', options: ['25', '24', '26', '23'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-020', category: 'math', ageLevel: 8, question: '90 - 45 = ?', options: ['44', '46', '45', '43'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Basic multiplication (×2)
  { id: 'm8-021', category: 'math', ageLevel: 8, question: '2 × 3 = ?', options: ['5', '7', '6', '8'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-022', category: 'math', ageLevel: 8, question: '2 × 4 = ?', options: ['8', '6', '10', '7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-023', category: 'math', ageLevel: 8, question: '2 × 5 = ?', options: ['8', '12', '10', '7'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-024', category: 'math', ageLevel: 8, question: '2 × 6 = ?', options: ['12', '10', '14', '8'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-025', category: 'math', ageLevel: 8, question: '2 × 7 = ?', options: ['12', '16', '14', '9'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Basic multiplication (×5)
  { id: 'm8-026', category: 'math', ageLevel: 8, question: '5 × 2 = ?', options: ['10', '7', '12', '15'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-027', category: 'math', ageLevel: 8, question: '5 × 3 = ?', options: ['10', '18', '15', '20'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-028', category: 'math', ageLevel: 8, question: '5 × 4 = ?', options: ['20', '15', '25', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-029', category: 'math', ageLevel: 8, question: '5 × 5 = ?', options: ['20', '30', '25', '10'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-030', category: 'math', ageLevel: 8, question: '5 × 6 = ?', options: ['30', '25', '35', '11'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Basic multiplication (×10)
  { id: 'm8-031', category: 'math', ageLevel: 8, question: '10 × 3 = ?', options: ['13', '30', '33', '103'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-032', category: 'math', ageLevel: 8, question: '10 × 5 = ?', options: ['15', '55', '50', '105'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-033', category: 'math', ageLevel: 8, question: '10 × 7 = ?', options: ['70', '17', '77', '107'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-034', category: 'math', ageLevel: 8, question: '10 × 9 = ?', options: ['19', '99', '90', '109'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-035', category: 'math', ageLevel: 8, question: '10 × 10 = ?', options: ['100', '20', '1010', '110'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Mixed multiplication
  { id: 'm8-036', category: 'math', ageLevel: 8, question: '3 × 3 = ?', options: ['6', '9', '12', '33'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-037', category: 'math', ageLevel: 8, question: '3 × 4 = ?', options: ['12', '7', '15', '34'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-038', category: 'math', ageLevel: 8, question: '4 × 4 = ?', options: ['8', '16', '20', '44'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-039', category: 'math', ageLevel: 8, question: '4 × 5 = ?', options: ['20', '9', '25', '45'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-040', category: 'math', ageLevel: 8, question: '3 × 6 = ?', options: ['9', '18', '21', '36'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Place value
  { id: 'm8-041', category: 'math', ageLevel: 8, question: 'What is the value of 5 in 57?', options: ['5', '50', '7', '57'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-042', category: 'math', ageLevel: 8, question: 'What is the value of 3 in 83?', options: ['30', '3', '8', '83'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-043', category: 'math', ageLevel: 8, question: '40 + 7 = ?', options: ['47', '407', '74', '11'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-044', category: 'math', ageLevel: 8, question: '60 + 9 = ?', options: ['609', '96', '69', '15'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-045', category: 'math', ageLevel: 8, question: '80 + 0 = ?', options: ['8', '800', '80', '0'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm8-046', category: 'math', ageLevel: 8, question: 'There are 5 rows with 4 chairs each. How many chairs?', options: ['9', '20', '45', '54'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm8-047', category: 'math', ageLevel: 8, question: 'I have 45 stickers. I give away 18. How many left?', options: ['63', '27', '28', '26'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm8-048', category: 'math', ageLevel: 8, question: 'A book has 36 pages. I read 19. How many left?', options: ['17', '55', '18', '16'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm8-049', category: 'math', ageLevel: 8, question: '3 friends share 15 cookies equally. Each gets?', options: ['12', '5', '18', '45'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm8-050', category: 'math', ageLevel: 8, question: 'I saved $28 and earned $35 more. Total savings?', options: ['63', '62', '64', '7'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  
  // Patterns
  { id: 'm8-051', category: 'math', ageLevel: 8, question: '3, 6, 9, 12, __?', options: ['13', '16', '15', '18'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-052', category: 'math', ageLevel: 8, question: '4, 8, 12, 16, __?', options: ['18', '22', '20', '24'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-053', category: 'math', ageLevel: 8, question: '100, 90, 80, 70, __?', options: ['50', '65', '60', '55'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-054', category: 'math', ageLevel: 8, question: '25, 30, 35, 40, __?', options: ['50', '45', '42', '55'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-055', category: 'math', ageLevel: 8, question: '5, 10, 15, 20, __?', options: ['30', '22', '25', '35'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Missing numbers
  { id: 'm8-056', category: 'math', ageLevel: 8, question: '25 + __ = 50', options: ['15', '30', '25', '35'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-057', category: 'math', ageLevel: 8, question: '__ + 32 = 67', options: ['35', '34', '36', '99'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm8-058', category: 'math', ageLevel: 8, question: '80 - __ = 45', options: ['25', '45', '35', '125'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm8-059', category: 'math', ageLevel: 8, question: '__ × 5 = 35', options: ['6', '8', '7', '30'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-060', category: 'math', ageLevel: 8, question: '4 × __ = 24', options: ['5', '7', '6', '20'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Comparison
  { id: 'm8-061', category: 'math', ageLevel: 8, question: 'Which is greater: 56 or 65?', options: ['56', '65', 'Same', '121'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-062', category: 'math', ageLevel: 8, question: 'Which is smaller: 89 or 98?', options: ['98', '89', 'Same', '9'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-063', category: 'math', ageLevel: 8, question: '45 __ 54', options: ['>', '=', '<', '+'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-064', category: 'math', ageLevel: 8, question: '73 __ 37', options: ['<', '=', '>', '-'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-065', category: 'math', ageLevel: 8, question: 'Order from smallest: 45, 54, 35', options: ['35, 45, 54', '54, 45, 35', '45, 35, 54', '35, 54, 45'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // More multiplication
  { id: 'm8-066', category: 'math', ageLevel: 8, question: '2 × 8 = ?', options: ['10', '16', '18', '28'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-067', category: 'math', ageLevel: 8, question: '2 × 9 = ?', options: ['18', '11', '20', '29'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-068', category: 'math', ageLevel: 8, question: '5 × 7 = ?', options: ['30', '40', '35', '57'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-069', category: 'math', ageLevel: 8, question: '5 × 8 = ?', options: ['40', '35', '45', '58'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-070', category: 'math', ageLevel: 8, question: '5 × 9 = ?', options: ['40', '50', '45', '59'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // More two-digit operations
  { id: 'm8-071', category: 'math', ageLevel: 8, question: '33 + 33 = ?', options: ['66', '63', '69', '36'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-072', category: 'math', ageLevel: 8, question: '44 + 44 = ?', options: ['84', '88', '48', '44'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm8-073', category: 'math', ageLevel: 8, question: '55 + 45 = ?', options: ['90', '110', '100', '10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-074', category: 'math', ageLevel: 8, question: '72 - 36 = ?', options: ['36', '46', '26', '108'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-075', category: 'math', ageLevel: 8, question: '100 - 50 = ?', options: ['40', '60', '50', '150'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // More word problems
  { id: 'm8-076', category: 'math', ageLevel: 8, question: 'A farmer has 47 apples. He picks 35 more. Total?', options: ['12', '82', '72', '81'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-077', category: 'math', ageLevel: 8, question: 'There are 6 packs with 5 pencils each. Total pencils?', options: ['11', '56', '30', '35'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-078', category: 'math', ageLevel: 8, question: 'I have 82 cards. I trade 28. How many left?', options: ['54', '110', '64', '44'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-079', category: 'math', ageLevel: 8, question: '10 boxes with 10 toys each. Total toys?', options: ['20', '110', '100', '1010'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-080', category: 'math', ageLevel: 8, question: 'Each day I walk 2 km. In 7 days?', options: ['9', '14', '72', '27'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Division intro
  { id: 'm8-081', category: 'math', ageLevel: 8, question: '10 ÷ 2 = ?', options: ['2', '5', '8', '20'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-082', category: 'math', ageLevel: 8, question: '15 ÷ 5 = ?', options: ['5', '3', '10', '75'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-083', category: 'math', ageLevel: 8, question: '20 ÷ 4 = ?', options: ['4', '6', '5', '80'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-084', category: 'math', ageLevel: 8, question: '18 ÷ 2 = ?', options: ['8', '10', '9', '36'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-085', category: 'math', ageLevel: 8, question: '25 ÷ 5 = ?', options: ['5', '4', '6', '125'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // More division
  { id: 'm8-086', category: 'math', ageLevel: 8, question: '12 ÷ 3 = ?', options: ['3', '5', '4', '36'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-087', category: 'math', ageLevel: 8, question: '16 ÷ 4 = ?', options: ['4', '3', '5', '64'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-088', category: 'math', ageLevel: 8, question: '30 ÷ 5 = ?', options: ['5', '7', '6', '150'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-089', category: 'math', ageLevel: 8, question: '40 ÷ 10 = ?', options: ['4', '3', '5', '400'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-090', category: 'math', ageLevel: 8, question: '50 ÷ 10 = ?', options: ['4', '6', '5', '500'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Mental math
  { id: 'm8-091', category: 'math', ageLevel: 8, question: '99 + 1 = ?', options: ['98', '101', '100', '991'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-092', category: 'math', ageLevel: 8, question: '50 + 50 = ?', options: ['100', '55', '1000', '150'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-093', category: 'math', ageLevel: 8, question: '75 + 25 = ?', options: ['90', '110', '100', '50'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm8-094', category: 'math', ageLevel: 8, question: '100 - 1 = ?', options: ['99', '101', '91', '9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm8-095', category: 'math', ageLevel: 8, question: '100 - 25 = ?', options: ['85', '75', '65', '125'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Final questions
  { id: 'm8-096', category: 'math', ageLevel: 8, question: '3 × 7 = ?', options: ['24', '21', '18', '37'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm8-097', category: 'math', ageLevel: 8, question: '4 × 6 = ?', options: ['24', '20', '28', '46'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-098', category: 'math', ageLevel: 8, question: '6 × 5 = ?', options: ['25', '35', '30', '65'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm8-099', category: 'math', ageLevel: 8, question: '7 × 3 = ?', options: ['21', '24', '18', '73'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm8-100', category: 'math', ageLevel: 8, question: '8 × 4 = ?', options: ['28', '36', '32', '84'], correctAnswerIndex: 2, difficulty: 'medium' },
];
