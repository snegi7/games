import type { Question } from '@/types';

// Math questions for 9-year-olds
// Focus: Multiplication tables, multi-digit addition/subtraction, intro to fractions

export const mathQuestionsAge9: Question[] = [
  // Multiplication tables
  { id: 'm9-001', category: 'math', ageLevel: 9, question: '6 × 6 = ?', options: ['30', '36', '42', '66'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-002', category: 'math', ageLevel: 9, question: '7 × 6 = ?', options: ['42', '48', '36', '76'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-003', category: 'math', ageLevel: 9, question: '8 × 7 = ?', options: ['54', '63', '56', '87'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-004', category: 'math', ageLevel: 9, question: '9 × 6 = ?', options: ['54', '48', '56', '96'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-005', category: 'math', ageLevel: 9, question: '7 × 7 = ?', options: ['42', '56', '49', '77'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-006', category: 'math', ageLevel: 9, question: '8 × 8 = ?', options: ['64', '72', '56', '88'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-007', category: 'math', ageLevel: 9, question: '9 × 9 = ?', options: ['72', '90', '81', '99'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-008', category: 'math', ageLevel: 9, question: '6 × 8 = ?', options: ['48', '42', '54', '68'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-009', category: 'math', ageLevel: 9, question: '7 × 8 = ?', options: ['54', '63', '56', '78'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-010', category: 'math', ageLevel: 9, question: '9 × 7 = ?', options: ['63', '56', '72', '97'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Division
  { id: 'm9-011', category: 'math', ageLevel: 9, question: '36 ÷ 6 = ?', options: ['7', '5', '6', '8'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm9-012', category: 'math', ageLevel: 9, question: '42 ÷ 7 = ?', options: ['6', '7', '5', '8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-013', category: 'math', ageLevel: 9, question: '56 ÷ 8 = ?', options: ['6', '8', '7', '9'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-014', category: 'math', ageLevel: 9, question: '72 ÷ 9 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-015', category: 'math', ageLevel: 9, question: '63 ÷ 7 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-016', category: 'math', ageLevel: 9, question: '48 ÷ 6 = ?', options: ['8', '7', '9', '6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-017', category: 'math', ageLevel: 9, question: '81 ÷ 9 = ?', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-018', category: 'math', ageLevel: 9, question: '54 ÷ 6 = ?', options: ['9', '8', '10', '7'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-019', category: 'math', ageLevel: 9, question: '64 ÷ 8 = ?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-020', category: 'math', ageLevel: 9, question: '49 ÷ 7 = ?', options: ['7', '8', '6', '9'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Three-digit addition
  { id: 'm9-021', category: 'math', ageLevel: 9, question: '125 + 234 = ?', options: ['358', '360', '359', '349'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-022', category: 'math', ageLevel: 9, question: '246 + 153 = ?', options: ['399', '398', '400', '389'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-023', category: 'math', ageLevel: 9, question: '378 + 121 = ?', options: ['498', '500', '499', '489'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-024', category: 'math', ageLevel: 9, question: '456 + 234 = ?', options: ['690', '680', '700', '670'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-025', category: 'math', ageLevel: 9, question: '567 + 333 = ?', options: ['890', '910', '900', '880'], correctAnswerIndex: 2, difficulty: 'hard' },
  
  // Three-digit subtraction
  { id: 'm9-026', category: 'math', ageLevel: 9, question: '456 - 123 = ?', options: ['333', '332', '334', '323'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-027', category: 'math', ageLevel: 9, question: '578 - 245 = ?', options: ['332', '334', '333', '323'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-028', category: 'math', ageLevel: 9, question: '600 - 250 = ?', options: ['350', '340', '360', '250'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-029', category: 'math', ageLevel: 9, question: '743 - 518 = ?', options: ['224', '226', '225', '215'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm9-030', category: 'math', ageLevel: 9, question: '500 - 175 = ?', options: ['325', '315', '335', '375'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Basic fractions
  { id: 'm9-031', category: 'math', ageLevel: 9, question: 'What is half of 10?', options: ['2', '5', '10', '20'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-032', category: 'math', ageLevel: 9, question: 'What is half of 20?', options: ['10', '5', '15', '40'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm9-033', category: 'math', ageLevel: 9, question: 'What is 1/4 of 8?', options: ['4', '2', '1', '8'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-034', category: 'math', ageLevel: 9, question: 'What is 1/4 of 12?', options: ['3', '4', '6', '2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-035', category: 'math', ageLevel: 9, question: 'What is 1/3 of 9?', options: ['2', '4', '3', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-036', category: 'math', ageLevel: 9, question: '1/2 + 1/2 = ?', options: ['1/4', '2', '1', '2/4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-037', category: 'math', ageLevel: 9, question: 'Which is larger: 1/2 or 1/4?', options: ['1/4', '1/2', 'Same', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-038', category: 'math', ageLevel: 9, question: 'Which is larger: 2/3 or 1/3?', options: ['1/3', '2/3', 'Same', '3/3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-039', category: 'math', ageLevel: 9, question: 'What is 3/4 of 8?', options: ['4', '6', '2', '3'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm9-040', category: 'math', ageLevel: 9, question: 'What is 2/3 of 12?', options: ['6', '8', '4', '9'], correctAnswerIndex: 1, difficulty: 'hard' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm9-041', category: 'math', ageLevel: 9, question: 'A box has 8 rows of 7 chocolates. How many chocolates?', options: ['15', '56', '78', '64'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-042', category: 'math', ageLevel: 9, question: '63 students in 7 equal groups. Students per group?', options: ['7', '9', '8', '10'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-043', category: 'math', ageLevel: 9, question: 'Library has 458 books. 125 are borrowed. How many left?', options: ['333', '583', '323', '343'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-044', category: 'math', ageLevel: 9, question: 'Store sold 245 toys Mon and 367 Tue. Total sold?', options: ['612', '602', '622', '512'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-045', category: 'math', ageLevel: 9, question: 'Each shelf holds 9 books. How many on 6 shelves?', options: ['15', '54', '63', '45'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  
  // More multiplication
  { id: 'm9-046', category: 'math', ageLevel: 9, question: '12 × 5 = ?', options: ['50', '70', '60', '65'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-047', category: 'math', ageLevel: 9, question: '11 × 6 = ?', options: ['66', '56', '76', '61'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-048', category: 'math', ageLevel: 9, question: '12 × 8 = ?', options: ['86', '106', '96', '88'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm9-049', category: 'math', ageLevel: 9, question: '11 × 11 = ?', options: ['121', '111', '131', '122'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm9-050', category: 'math', ageLevel: 9, question: '12 × 12 = ?', options: ['124', '154', '144', '134'], correctAnswerIndex: 2, difficulty: 'hard' },
  
  // Order of operations intro
  { id: 'm9-051', category: 'math', ageLevel: 9, question: '2 + 3 × 4 = ?', options: ['20', '14', '24', '11'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm9-052', category: 'math', ageLevel: 9, question: '10 - 2 × 3 = ?', options: ['24', '4', '16', '6'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm9-053', category: 'math', ageLevel: 9, question: '5 × 2 + 3 = ?', options: ['25', '13', '16', '11'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-054', category: 'math', ageLevel: 9, question: '20 ÷ 4 + 5 = ?', options: ['10', '6', '15', '1'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-055', category: 'math', ageLevel: 9, question: '6 × 3 - 8 = ?', options: ['10', '8', '12', '26'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Rounding
  { id: 'm9-056', category: 'math', ageLevel: 9, question: 'Round 47 to nearest 10', options: ['40', '50', '47', '45'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-057', category: 'math', ageLevel: 9, question: 'Round 82 to nearest 10', options: ['90', '80', '82', '85'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm9-058', category: 'math', ageLevel: 9, question: 'Round 235 to nearest 100', options: ['300', '200', '230', '240'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-059', category: 'math', ageLevel: 9, question: 'Round 678 to nearest 100', options: ['600', '700', '680', '670'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-060', category: 'math', ageLevel: 9, question: 'Round 555 to nearest 100', options: ['500', '600', '550', '560'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Patterns
  { id: 'm9-061', category: 'math', ageLevel: 9, question: '7, 14, 21, 28, __?', options: ['32', '36', '35', '42'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-062', category: 'math', ageLevel: 9, question: '8, 16, 24, 32, __?', options: ['38', '40', '42', '36'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-063', category: 'math', ageLevel: 9, question: '9, 18, 27, 36, __?', options: ['42', '54', '45', '63'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-064', category: 'math', ageLevel: 9, question: '100, 95, 90, 85, __?', options: ['75', '82', '80', '78'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm9-065', category: 'math', ageLevel: 9, question: '1, 4, 9, 16, __?', options: ['20', '24', '25', '36'], correctAnswerIndex: 2, difficulty: 'hard' },
  
  // Place value
  { id: 'm9-066', category: 'math', ageLevel: 9, question: 'Value of 4 in 4,567?', options: ['4', '40', '400', '4000'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm9-067', category: 'math', ageLevel: 9, question: 'Value of 5 in 3,512?', options: ['5', '50', '500', '5000'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-068', category: 'math', ageLevel: 9, question: 'Value of 8 in 8,234?', options: ['8', '80', '800', '8000'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm9-069', category: 'math', ageLevel: 9, question: '3000 + 400 + 50 + 6 = ?', options: ['3456', '3546', '3465', '34056'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-070', category: 'math', ageLevel: 9, question: '5000 + 200 + 30 + 1 = ?', options: ['5231', '52031', '5213', '5321'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // More division
  { id: 'm9-071', category: 'math', ageLevel: 9, question: '100 ÷ 10 = ?', options: ['10', '1000', '1', '100'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm9-072', category: 'math', ageLevel: 9, question: '144 ÷ 12 = ?', options: ['11', '13', '12', '14'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm9-073', category: 'math', ageLevel: 9, question: '60 ÷ 12 = ?', options: ['4', '6', '5', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-074', category: 'math', ageLevel: 9, question: '72 ÷ 8 = ?', options: ['9', '8', '10', '7'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-075', category: 'math', ageLevel: 9, question: '96 ÷ 8 = ?', options: ['11', '13', '12', '10'], correctAnswerIndex: 2, difficulty: 'hard' },
  
  // More word problems - extra 5 seconds to read
  { id: 'm9-076', category: 'math', ageLevel: 9, question: 'A cake is cut into 8 equal slices. You eat 3. What fraction left?', options: ['3/8', '5/8', '8/3', '8/5'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-077', category: 'math', ageLevel: 9, question: 'Mom has $500. She spends $275. How much left?', options: ['$225', '$775', '$235', '$215'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-078', category: 'math', ageLevel: 9, question: 'A bus has 45 seats. 28 people get on. How many empty?', options: ['17', '73', '18', '27'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-079', category: 'math', ageLevel: 9, question: 'Farmer has 120 apples. Puts 8 in each box. How many boxes?', options: ['12', '16', '15', '14'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-080', category: 'math', ageLevel: 9, question: 'Rectangle: length 9, width 7. What is the area?', options: ['16', '32', '63', '72'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  
  // More word problems - extra 5 seconds to read
  { id: 'm9-081', category: 'math', ageLevel: 9, question: 'Sara has 36 stickers. She shares equally with 4 friends. Each gets?', options: ['8', '9', '10', '7'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-082', category: 'math', ageLevel: 9, question: 'A movie is 90 minutes. 35 minutes passed. How many left?', options: ['55 min', '65 min', '45 min', '125 min'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-083', category: 'math', ageLevel: 9, question: 'Tom reads 15 pages daily. How many in a week?', options: ['105', '85', '95', '115'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-084', category: 'math', ageLevel: 9, question: 'A pack has 6 juice boxes. How many in 9 packs?', options: ['54', '48', '56', '45'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-085', category: 'math', ageLevel: 9, question: 'School has 340 boys and 285 girls. Total students?', options: ['625', '615', '635', '525'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  
  // Missing numbers
  { id: 'm9-086', category: 'math', ageLevel: 9, question: '__ × 7 = 56', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-087', category: 'math', ageLevel: 9, question: '9 × __ = 81', options: ['8', '10', '9', '7'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-088', category: 'math', ageLevel: 9, question: '__ ÷ 6 = 8', options: ['42', '54', '48', '36'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-089', category: 'math', ageLevel: 9, question: '72 ÷ __ = 9', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm9-090', category: 'math', ageLevel: 9, question: '__ + 456 = 800', options: ['344', '354', '334', '364'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // More fractions
  { id: 'm9-091', category: 'math', ageLevel: 9, question: '1/4 + 1/4 = ?', options: ['1/8', '2/4', '2/8', '1/2'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-092', category: 'math', ageLevel: 9, question: '3/4 - 1/4 = ?', options: ['2/4', '4/4', '2/8', '1/4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm9-093', category: 'math', ageLevel: 9, question: 'Simplify 2/4', options: ['1/4', '1/2', '4/2', '2/2'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-094', category: 'math', ageLevel: 9, question: 'Which equals 1/2: 2/4 or 2/3?', options: ['2/3', '2/4', 'Both', 'Neither'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm9-095', category: 'math', ageLevel: 9, question: '1/3 + 1/3 + 1/3 = ?', options: ['3/9', '3/3', '1/9', '1/3'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Final word problems - extra 5 seconds to read
  { id: 'm9-096', category: 'math', ageLevel: 9, question: 'A classroom has 6 rows with 5 desks each. Total desks?', options: ['30', '25', '35', '11'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-097', category: 'math', ageLevel: 9, question: 'Pizza costs $12. You pay with $20. Change?', options: ['$8', '$7', '$10', '$32'], correctAnswerIndex: 0, difficulty: 'easy', bonusTime: 5 },
  { id: 'm9-098', category: 'math', ageLevel: 9, question: 'A bag has 48 marbles. Split equally into 6 bags. Each bag has?', options: ['7', '9', '8', '6'], correctAnswerIndex: 2, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-099', category: 'math', ageLevel: 9, question: 'Shop sells 125 ice creams Mon, 89 Tue. How many more Mon?', options: ['36', '46', '26', '214'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm9-100', category: 'math', ageLevel: 9, question: 'Garden has 7 rows with 8 flowers each. Total flowers?', options: ['56', '54', '48', '15'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
];
