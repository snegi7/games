import type { Question } from '@/types';

// Math questions for 10-year-olds
// Focus: Multiplication tables, simple division, basic decimals, easy fractions
// All questions designed to be solvable within 10 seconds

export const mathQuestionsAge10: Question[] = [
  // Simple multiplication (times tables)
  { id: 'm10-001', category: 'math', ageLevel: 10, question: '7 × 8 = ?', options: ['54', '56', '63', '48'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-002', category: 'math', ageLevel: 10, question: '9 × 6 = ?', options: ['54', '48', '56', '45'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-003', category: 'math', ageLevel: 10, question: '8 × 9 = ?', options: ['72', '63', '81', '64'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-004', category: 'math', ageLevel: 10, question: '6 × 7 = ?', options: ['48', '42', '36', '49'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-005', category: 'math', ageLevel: 10, question: '9 × 9 = ?', options: ['72', '81', '90', '63'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-006', category: 'math', ageLevel: 10, question: '12 × 5 = ?', options: ['50', '55', '60', '65'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-007', category: 'math', ageLevel: 10, question: '11 × 6 = ?', options: ['66', '55', '77', '60'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-008', category: 'math', ageLevel: 10, question: '12 × 4 = ?', options: ['44', '52', '48', '40'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-009', category: 'math', ageLevel: 10, question: '15 × 4 = ?', options: ['50', '55', '60', '45'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-010', category: 'math', ageLevel: 10, question: '25 × 4 = ?', options: ['90', '100', '75', '80'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Easy double-digit multiplication
  { id: 'm10-011', category: 'math', ageLevel: 10, question: '20 × 5 = ?', options: ['100', '90', '110', '80'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-012', category: 'math', ageLevel: 10, question: '30 × 3 = ?', options: ['60', '90', '120', '80'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-013', category: 'math', ageLevel: 10, question: '50 × 2 = ?', options: ['100', '150', '75', '125'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-014', category: 'math', ageLevel: 10, question: '10 × 12 = ?', options: ['100', '110', '120', '130'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-015', category: 'math', ageLevel: 10, question: '11 × 11 = ?', options: ['111', '121', '110', '122'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Simple division
  { id: 'm10-016', category: 'math', ageLevel: 10, question: '56 ÷ 8 = ?', options: ['6', '7', '8', '9'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-017', category: 'math', ageLevel: 10, question: '72 ÷ 9 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-018', category: 'math', ageLevel: 10, question: '63 ÷ 7 = ?', options: ['8', '9', '7', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-019', category: 'math', ageLevel: 10, question: '48 ÷ 6 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-020', category: 'math', ageLevel: 10, question: '81 ÷ 9 = ?', options: ['8', '7', '9', '10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-021', category: 'math', ageLevel: 10, question: '100 ÷ 10 = ?', options: ['10', '100', '1', '20'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-022', category: 'math', ageLevel: 10, question: '60 ÷ 5 = ?', options: ['10', '11', '12', '15'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-023', category: 'math', ageLevel: 10, question: '80 ÷ 4 = ?', options: ['20', '16', '25', '18'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-024', category: 'math', ageLevel: 10, question: '90 ÷ 6 = ?', options: ['12', '18', '15', '14'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-025', category: 'math', ageLevel: 10, question: '120 ÷ 10 = ?', options: ['10', '11', '12', '15'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Decimals (simple)
  { id: 'm10-026', category: 'math', ageLevel: 10, question: '2.5 + 2.5 = ?', options: ['4', '5', '4.5', '5.5'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-027', category: 'math', ageLevel: 10, question: '3.0 + 1.5 = ?', options: ['4.0', '4.5', '5.0', '3.5'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-028', category: 'math', ageLevel: 10, question: '5.0 - 2.5 = ?', options: ['2.0', '3.0', '2.5', '3.5'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-029', category: 'math', ageLevel: 10, question: '10.0 - 3.5 = ?', options: ['6.5', '7.0', '7.5', '6.0'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-030', category: 'math', ageLevel: 10, question: '1.5 × 2 = ?', options: ['2.5', '3.0', '3.5', '2.0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-031', category: 'math', ageLevel: 10, question: '2.5 × 4 = ?', options: ['8', '10', '9', '12'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-032', category: 'math', ageLevel: 10, question: '6.0 ÷ 2 = ?', options: ['2.0', '3.0', '4.0', '2.5'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-033', category: 'math', ageLevel: 10, question: '9.0 ÷ 3 = ?', options: ['2.0', '3.0', '4.0', '2.5'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-034', category: 'math', ageLevel: 10, question: 'Which is greater: 0.8 or 0.5?', options: ['0.5', '0.8', 'Same', 'Cannot tell'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-035', category: 'math', ageLevel: 10, question: 'Which is greater: 0.25 or 0.3?', options: ['0.25', '0.3', 'Same', 'Cannot tell'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Simple fractions
  { id: 'm10-036', category: 'math', ageLevel: 10, question: '1/2 + 1/2 = ?', options: ['1/4', '1', '2', '1/2'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-037', category: 'math', ageLevel: 10, question: '1/4 + 1/4 = ?', options: ['1/2', '2/4', '1/8', 'Both A and B'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm10-038', category: 'math', ageLevel: 10, question: '3/4 - 1/4 = ?', options: ['2/4', '1/2', '1/4', 'Both A and B'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm10-039', category: 'math', ageLevel: 10, question: '1/2 of 10 = ?', options: ['2', '5', '10', '20'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-040', category: 'math', ageLevel: 10, question: '1/4 of 20 = ?', options: ['4', '5', '10', '2'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-041', category: 'math', ageLevel: 10, question: '1/3 of 12 = ?', options: ['3', '4', '6', '2'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-042', category: 'math', ageLevel: 10, question: '1/5 of 25 = ?', options: ['4', '5', '10', '15'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-043', category: 'math', ageLevel: 10, question: 'Convert 1/2 to decimal', options: ['0.2', '0.5', '0.25', '2.0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-044', category: 'math', ageLevel: 10, question: 'Convert 1/4 to decimal', options: ['0.4', '0.14', '0.25', '4.0'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-045', category: 'math', ageLevel: 10, question: 'Which is larger: 1/2 or 1/3?', options: ['1/3', '1/2', 'Same', 'Cannot tell'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Percentages (easy)
  { id: 'm10-046', category: 'math', ageLevel: 10, question: '50% of 20 = ?', options: ['5', '10', '15', '25'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-047', category: 'math', ageLevel: 10, question: '50% of 100 = ?', options: ['25', '75', '50', '100'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-048', category: 'math', ageLevel: 10, question: '25% of 100 = ?', options: ['20', '25', '50', '75'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-049', category: 'math', ageLevel: 10, question: '10% of 50 = ?', options: ['5', '10', '15', '25'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-050', category: 'math', ageLevel: 10, question: '100% of 30 = ?', options: ['0', '15', '30', '60'], correctAnswerIndex: 2, difficulty: 'easy' },
  
  // Word problems (simple) - extra 5 seconds to read
  { id: 'm10-051', category: 'math', ageLevel: 10, question: 'You have 24 candies, share equally with 4 friends. Each gets?', options: ['4', '5', '6', '8'], correctAnswerIndex: 2, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-052', category: 'math', ageLevel: 10, question: 'A book costs $8. How much for 5 books?', options: ['$35', '$40', '$45', '$50'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-053', category: 'math', ageLevel: 10, question: 'If 3 pens cost $6, how much for 1 pen?', options: ['$1', '$2', '$3', '$6'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-054', category: 'math', ageLevel: 10, question: 'Pizza cut into 8 slices. You eat 3. How many left?', options: ['4', '5', '6', '3'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-055', category: 'math', ageLevel: 10, question: 'Bus has 40 seats. 25 taken. How many empty?', options: ['10', '15', '20', '25'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  
  // Factors and multiples (easy)
  { id: 'm10-056', category: 'math', ageLevel: 10, question: 'Is 12 a multiple of 4?', options: ['No', 'Yes'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-057', category: 'math', ageLevel: 10, question: 'Is 5 a factor of 20?', options: ['Yes', 'No'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-058', category: 'math', ageLevel: 10, question: 'Is 15 divisible by 3?', options: ['No', 'Yes'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-059', category: 'math', ageLevel: 10, question: 'What is 6 × 1?', options: ['0', '1', '6', '7'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-060', category: 'math', ageLevel: 10, question: 'What is 8 × 0?', options: ['0', '8', '80', '1'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Order of operations (simple)
  { id: 'm10-061', category: 'math', ageLevel: 10, question: '2 + 3 × 2 = ?', options: ['10', '8', '12', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-062', category: 'math', ageLevel: 10, question: '(2 + 3) × 2 = ?', options: ['10', '8', '12', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-063', category: 'math', ageLevel: 10, question: '10 - 4 ÷ 2 = ?', options: ['3', '8', '6', '5'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm10-064', category: 'math', ageLevel: 10, question: '(10 - 4) ÷ 2 = ?', options: ['3', '8', '6', '5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm10-065', category: 'math', ageLevel: 10, question: '5 + 5 × 0 = ?', options: ['0', '5', '10', '25'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Geometry (simple)
  { id: 'm10-066', category: 'math', ageLevel: 10, question: 'Perimeter of square with side 4 = ?', options: ['8', '12', '16', '20'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-067', category: 'math', ageLevel: 10, question: 'Area of square with side 5 = ?', options: ['10', '20', '25', '30'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm10-068', category: 'math', ageLevel: 10, question: 'Perimeter of rectangle 5×3 = ?', options: ['8', '15', '16', '30'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-069', category: 'math', ageLevel: 10, question: 'Area of rectangle 4×6 = ?', options: ['10', '20', '24', '48'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-070', category: 'math', ageLevel: 10, question: 'How many sides does a pentagon have?', options: ['4', '5', '6', '7'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm10-071', category: 'math', ageLevel: 10, question: 'Store has 125 apples. Sells 75. How many left?', options: ['40', '50', '60', '200'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-072', category: 'math', ageLevel: 10, question: 'You save $8 per week. How much in 5 weeks?', options: ['$35', '$40', '$45', '$13'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-073', category: 'math', ageLevel: 10, question: 'Library has 450 books. Gets 50 more. Total?', options: ['400', '500', '550', '600'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-074', category: 'math', ageLevel: 10, question: 'Train has 200 seats. 125 people board. Empty seats?', options: ['65', '75', '85', '325'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-075', category: 'math', ageLevel: 10, question: 'A box has 6 donuts. How many in 8 boxes?', options: ['42', '48', '54', '14'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  
  // More word problems - extra 5 seconds to read
  { id: 'm10-076', category: 'math', ageLevel: 10, question: 'Movie starts at 3:00 PM, lasts 2 hours. End time?', options: ['4:00 PM', '5:00 PM', '6:00 PM', '5:30 PM'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-077', category: 'math', ageLevel: 10, question: 'Class has 30 students. Half are boys. How many girls?', options: ['10', '15', '20', '25'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-078', category: 'math', ageLevel: 10, question: '50% off $20. Sale price?', options: ['$5', '$10', '$15', '$25'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-079', category: 'math', ageLevel: 10, question: 'You walk 2 km each way. Total distance?', options: ['2 km', '4 km', '6 km', '8 km'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-080', category: 'math', ageLevel: 10, question: 'A dozen eggs = 12. How many in 2 dozen?', options: ['18', '20', '24', '36'], correctAnswerIndex: 2, difficulty: 'easy', bonusTime: 5 },
  
  // Exponents (simple)
  { id: 'm10-081', category: 'math', ageLevel: 10, question: '2² = ?', options: ['2', '4', '6', '8'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-082', category: 'math', ageLevel: 10, question: '3² = ?', options: ['6', '9', '12', '27'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-083', category: 'math', ageLevel: 10, question: '10² = ?', options: ['20', '100', '1000', '10'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-084', category: 'math', ageLevel: 10, question: '5² = ?', options: ['10', '15', '20', '25'], correctAnswerIndex: 3, difficulty: 'easy' },
  { id: 'm10-085', category: 'math', ageLevel: 10, question: '1² = ?', options: ['0', '1', '2', '11'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // More word problems - extra 5 seconds to read
  { id: 'm10-086', category: 'math', ageLevel: 10, question: 'Cake needs 3 eggs. How many eggs for 4 cakes?', options: ['10', '12', '14', '7'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-087', category: 'math', ageLevel: 10, question: 'Game costs $15. You have $50. How many can you buy?', options: ['2', '3', '4', '5'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm10-088', category: 'math', ageLevel: 10, question: 'Each team has 5 players. 6 teams playing. Total players?', options: ['25', '30', '35', '11'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-089', category: 'math', ageLevel: 10, question: 'Trip is 100 km. Done 45 km. How many km left?', options: ['45', '55', '65', '145'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-090', category: 'math', ageLevel: 10, question: 'Pencils cost $2 each. How much for 9 pencils?', options: ['$16', '$18', '$20', '$11'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  
  // Ratios (simple) - word problems get extra 5 seconds
  { id: 'm10-091', category: 'math', ageLevel: 10, question: 'Ratio 4:8 simplified = ?', options: ['1:2', '2:4', '4:1', '8:4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm10-092', category: 'math', ageLevel: 10, question: 'Boys:Girls = 1:1. If 10 boys, how many girls?', options: ['5', '10', '15', '20'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-093', category: 'math', ageLevel: 10, question: 'Red:Blue = 2:1. If 4 red, how many blue?', options: ['1', '2', '4', '8'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm10-094', category: 'math', ageLevel: 10, question: 'Recipe: 2 cups flour for 1 cake. For 3 cakes?', options: ['4 cups', '5 cups', '6 cups', '8 cups'], correctAnswerIndex: 2, difficulty: 'easy', bonusTime: 5 },
  { id: 'm10-095', category: 'math', ageLevel: 10, question: 'If 1 toy costs $5, how much for 6 toys?', options: ['$25', '$30', '$35', '$40'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  
  // Final easy questions
  { id: 'm10-096', category: 'math', ageLevel: 10, question: '7 × 7 = ?', options: ['42', '49', '56', '63'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-097', category: 'math', ageLevel: 10, question: '64 ÷ 8 = ?', options: ['6', '7', '8', '9'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm10-098', category: 'math', ageLevel: 10, question: '5 × 5 = ?', options: ['20', '25', '30', '35'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-099', category: 'math', ageLevel: 10, question: '100 ÷ 5 = ?', options: ['15', '20', '25', '50'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm10-100', category: 'math', ageLevel: 10, question: '8 × 6 = ?', options: ['42', '48', '54', '56'], correctAnswerIndex: 1, difficulty: 'medium' },
];
