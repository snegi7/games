import type { Question } from '@/types';

// Math questions for 11-year-olds
// Focus: Fractions, decimals, percentages, basic algebra, geometry

export const mathQuestionsAge11: Question[] = [
  // Fraction operations
  { id: 'm11-001', category: 'math', ageLevel: 11, question: '2/3 + 3/4 = ?', options: ['5/7', '17/12', '5/12', '6/7'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-002', category: 'math', ageLevel: 11, question: '5/6 - 1/3 = ?', options: ['1/2', '4/6', '2/3', '4/3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-003', category: 'math', ageLevel: 11, question: '3/4 × 2/5 = ?', options: ['6/20', '5/9', '6/9', '3/10'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm11-004', category: 'math', ageLevel: 11, question: '2/3 ÷ 1/2 = ?', options: ['1/3', '4/3', '3/4', '2/6'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-005', category: 'math', ageLevel: 11, question: '1 1/2 + 2 1/4 = ?', options: ['3 3/4', '3 1/2', '4 1/4', '3 2/6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-006', category: 'math', ageLevel: 11, question: '4 - 1 2/3 = ?', options: ['2 1/3', '3 2/3', '2 2/3', '3 1/3'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm11-007', category: 'math', ageLevel: 11, question: '2 × 3 1/2 = ?', options: ['6', '7', '6 1/2', '5 1/2'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-008', category: 'math', ageLevel: 11, question: '3/8 + 5/8 = ?', options: ['8/16', '8/8', '1', '2/8'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-009', category: 'math', ageLevel: 11, question: 'Simplify 12/18', options: ['6/9', '2/3', '4/6', '3/2'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-010', category: 'math', ageLevel: 11, question: 'Convert 7/4 to mixed number', options: ['1 3/4', '1 1/2', '2 1/4', '1 2/4'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Decimal operations
  { id: 'm11-011', category: 'math', ageLevel: 11, question: '3.45 + 2.78 = ?', options: ['6.23', '5.23', '6.13', '5.13'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-012', category: 'math', ageLevel: 11, question: '8.5 - 3.27 = ?', options: ['5.33', '5.23', '4.23', '5.13'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-013', category: 'math', ageLevel: 11, question: '2.5 × 3.2 = ?', options: ['7.5', '8.0', '6.4', '7.2'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-014', category: 'math', ageLevel: 11, question: '7.5 ÷ 2.5 = ?', options: ['2.5', '3', '3.5', '2'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-015', category: 'math', ageLevel: 11, question: '0.25 × 100 = ?', options: ['2.5', '250', '25', '0.025'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-016', category: 'math', ageLevel: 11, question: '15 ÷ 0.5 = ?', options: ['7.5', '30', '3', '75'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-017', category: 'math', ageLevel: 11, question: 'Round 3.456 to 1 decimal place', options: ['3.4', '3.5', '3.46', '3.0'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-018', category: 'math', ageLevel: 11, question: '0.6 as a fraction', options: ['6/100', '3/5', '6/1', '1/6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-019', category: 'math', ageLevel: 11, question: '7/8 as a decimal', options: ['0.78', '0.875', '0.785', '0.7'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-020', category: 'math', ageLevel: 11, question: 'Order: 0.45, 0.5, 0.405', options: ['0.405, 0.45, 0.5', '0.5, 0.45, 0.405', '0.45, 0.405, 0.5', '0.405, 0.5, 0.45'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Percentages
  { id: 'm11-021', category: 'math', ageLevel: 11, question: '35% of 200 = ?', options: ['70', '35', '7', '700'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-022', category: 'math', ageLevel: 11, question: 'What % is 15 of 60?', options: ['15%', '25%', '20%', '30%'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-023', category: 'math', ageLevel: 11, question: 'Increase 80 by 25%', options: ['85', '100', '105', '90'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-024', category: 'math', ageLevel: 11, question: 'Decrease 60 by 20%', options: ['40', '50', '48', '52'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm11-025', category: 'math', ageLevel: 11, question: '0.35 as a percentage', options: ['0.35%', '3.5%', '35%', '350%'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-026', category: 'math', ageLevel: 11, question: '3/4 as a percentage', options: ['34%', '75%', '43%', '70%'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-027', category: 'math', ageLevel: 11, question: '15% of 400 = ?', options: ['60', '40', '80', '100'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-028', category: 'math', ageLevel: 11, question: 'Sale: 30% off $50. New price?', options: ['$35', '$20', '$30', '$15'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-029', category: 'math', ageLevel: 11, question: '12.5% as a fraction', options: ['1/4', '1/8', '1/5', '1/10'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-030', category: 'math', ageLevel: 11, question: 'VAT 20% on $150. Total cost?', options: ['$170', '$180', '$200', '$165'], correctAnswerIndex: 1, difficulty: 'hard' },
  
  // Basic algebra
  { id: 'm11-031', category: 'math', ageLevel: 11, question: 'If x + 5 = 12, x = ?', options: ['17', '7', '5', '12'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm11-032', category: 'math', ageLevel: 11, question: 'If 3x = 18, x = ?', options: ['15', '21', '6', '54'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-033', category: 'math', ageLevel: 11, question: 'If x - 7 = 15, x = ?', options: ['22', '8', '15', '7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm11-034', category: 'math', ageLevel: 11, question: 'If x/4 = 8, x = ?', options: ['2', '12', '32', '4'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-035', category: 'math', ageLevel: 11, question: 'If 2x + 3 = 11, x = ?', options: ['7', '4', '5.5', '3'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-036', category: 'math', ageLevel: 11, question: 'Simplify: 3x + 5x', options: ['8x', '15x', '35x', '8x²'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm11-037', category: 'math', ageLevel: 11, question: 'Simplify: 7y - 3y + 2y', options: ['12y', '6y', '2y', '8y'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-038', category: 'math', ageLevel: 11, question: 'If 5x - 10 = 25, x = ?', options: ['3', '7', '5', '35'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-039', category: 'math', ageLevel: 11, question: 'Evaluate 2x + 5 when x = 3', options: ['8', '10', '11', '13'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-040', category: 'math', ageLevel: 11, question: 'Evaluate x² when x = 5', options: ['10', '25', '125', '7'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Geometry
  { id: 'm11-041', category: 'math', ageLevel: 11, question: 'Area of triangle: base 8, height 6', options: ['48', '24', '14', '28'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-042', category: 'math', ageLevel: 11, question: 'Circumference of circle, radius 7 (use π≈22/7)', options: ['44', '22', '154', '14'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-043', category: 'math', ageLevel: 11, question: 'Area of circle, radius 7 (use π≈22/7)', options: ['44', '22', '154', '88'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm11-044', category: 'math', ageLevel: 11, question: 'Volume of cube with side 4', options: ['16', '12', '64', '48'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-045', category: 'math', ageLevel: 11, question: 'Angles in a quadrilateral sum to?', options: ['180°', '360°', '270°', '540°'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-046', category: 'math', ageLevel: 11, question: 'A right angle = ?', options: ['180°', '45°', '90°', '60°'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-047', category: 'math', ageLevel: 11, question: 'Perimeter of regular pentagon, side 5', options: ['10', '25', '15', '20'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm11-048', category: 'math', ageLevel: 11, question: 'Area of parallelogram: base 10, height 6', options: ['16', '60', '30', '32'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-049', category: 'math', ageLevel: 11, question: 'Supplementary angles add to?', options: ['90°', '180°', '360°', '270°'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-050', category: 'math', ageLevel: 11, question: 'Complementary angles add to?', options: ['90°', '180°', '360°', '45°'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Order of operations
  { id: 'm11-051', category: 'math', ageLevel: 11, question: '12 + 8 ÷ 4 - 2 = ?', options: ['3', '12', '8', '14'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-052', category: 'math', ageLevel: 11, question: '(5 + 3) × (7 - 4) = ?', options: ['24', '11', '20', '32'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-053', category: 'math', ageLevel: 11, question: '4² + 3² = ?', options: ['14', '25', '49', '7'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-054', category: 'math', ageLevel: 11, question: '2 × 5² = ?', options: ['100', '50', '20', '14'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-055', category: 'math', ageLevel: 11, question: '(2 + 3)² = ?', options: ['13', '25', '10', '11'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Ratios and proportion
  { id: 'm11-056', category: 'math', ageLevel: 11, question: 'Simplify ratio 24:36', options: ['2:3', '4:6', '12:18', '3:2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm11-057', category: 'math', ageLevel: 11, question: 'Divide 45 in ratio 2:3', options: ['15, 30', '20, 25', '18, 27', '9, 36'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm11-058', category: 'math', ageLevel: 11, question: 'If 3:5 = 12:x, find x', options: ['15', '20', '7.2', '36'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-059', category: 'math', ageLevel: 11, question: 'Scale 1:50. Real length 200cm. Model?', options: ['10000cm', '4cm', '250cm', '150cm'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm11-060', category: 'math', ageLevel: 11, question: 'Ratio boys:girls = 3:4. 28 students. How many boys?', options: ['16', '12', '14', '8'], correctAnswerIndex: 1, difficulty: 'hard' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm11-061', category: 'math', ageLevel: 11, question: 'Train travels 240km in 3 hours. Speed?', options: ['80 km/h', '720 km/h', '60 km/h', '243 km/h'], correctAnswerIndex: 0, difficulty: 'easy', bonusTime: 5 },
  { id: 'm11-062', category: 'math', ageLevel: 11, question: 'Buy 3 books at $15 each, 10% discount. Total?', options: ['$40.50', '$49.50', '$45.00', '$31.50'], correctAnswerIndex: 0, difficulty: 'hard', bonusTime: 5 },
  { id: 'm11-063', category: 'math', ageLevel: 11, question: 'Pool fills at 50L/min. Time for 3000L?', options: ['60 min', '6 min', '600 min', '150 min'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-064', category: 'math', ageLevel: 11, question: 'Profit = Selling Price - Cost. SP=$45, Cost=$30. Profit?', options: ['$75', '$15', '$1.5', '$10'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm11-065', category: 'math', ageLevel: 11, question: '5 workers finish in 12 days. 10 workers finish in?', options: ['24 days', '6 days', '60 days', '2.4 days'], correctAnswerIndex: 1, difficulty: 'hard', bonusTime: 5 },
  
  // Negative numbers
  { id: 'm11-066', category: 'math', ageLevel: 11, question: '-5 + 8 = ?', options: ['-13', '13', '3', '-3'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-067', category: 'math', ageLevel: 11, question: '-7 - 4 = ?', options: ['3', '-3', '11', '-11'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm11-068', category: 'math', ageLevel: 11, question: '-3 × 4 = ?', options: ['12', '-12', '7', '-7'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-069', category: 'math', ageLevel: 11, question: '-12 ÷ 3 = ?', options: ['4', '-4', '36', '-36'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-070', category: 'math', ageLevel: 11, question: '-5 × -3 = ?', options: ['-15', '15', '-8', '8'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Factors, multiples, primes
  { id: 'm11-071', category: 'math', ageLevel: 11, question: 'Is 29 prime?', options: ['No', 'Yes', 'Neither', 'Both'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-072', category: 'math', ageLevel: 11, question: 'HCF of 12 and 18', options: ['36', '2', '6', '3'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-073', category: 'math', ageLevel: 11, question: 'LCM of 4 and 6', options: ['24', '12', '2', '10'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-074', category: 'math', ageLevel: 11, question: 'Prime factorization of 36', options: ['2²×3²', '6×6', '4×9', '2×18'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm11-075', category: 'math', ageLevel: 11, question: 'First 5 prime numbers', options: ['1,2,3,5,7', '2,3,5,7,11', '2,4,6,8,10', '1,3,5,7,9'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // More word problems - extra 5 seconds to read
  { id: 'm11-076', category: 'math', ageLevel: 11, question: 'A square garden has area 49 m². Side length?', options: ['24.5 m', '7 m', '6 m', '8 m'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm11-077', category: 'math', ageLevel: 11, question: 'Car travels 60 km/h for 3 hours. Distance?', options: ['180 km', '20 km', '63 km', '120 km'], correctAnswerIndex: 0, difficulty: 'easy', bonusTime: 5 },
  { id: 'm11-078', category: 'math', ageLevel: 11, question: 'Shop sells 45 items Mon, 62 Tue, 38 Wed. Total?', options: ['135', '145', '155', '125'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-079', category: 'math', ageLevel: 11, question: 'Pizza costs $12. With 15% tip, total?', options: ['$13.50', '$13.80', '$14.40', '$27'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-080', category: 'math', ageLevel: 11, question: 'Tank holds 500 liters. 35% full. How many liters?', options: ['175', '150', '200', '325'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  
  // More word problems - extra 5 seconds to read
  { id: 'm11-081', category: 'math', ageLevel: 11, question: 'Test scores: 80, 90, 85, 75, 70. Average?', options: ['78', '80', '82', '400'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-082', category: 'math', ageLevel: 11, question: 'Rectangle is 12 cm × 8 cm. Perimeter?', options: ['20 cm', '40 cm', '96 cm', '32 cm'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-083', category: 'math', ageLevel: 11, question: 'Bike costs $250. On 20% sale. New price?', options: ['$200', '$230', '$50', '$270'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-084', category: 'math', ageLevel: 11, question: 'Share $120 in ratio 2:3. Larger share?', options: ['$48', '$72', '$60', '$80'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm11-085', category: 'math', ageLevel: 11, question: 'You earn $8/hour. How much for 6.5 hours?', options: ['$48', '$52', '$56', '$14.50'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  
  // Coordinates
  { id: 'm11-086', category: 'math', ageLevel: 11, question: 'Point A(3,5). What is x-coordinate?', options: ['5', '3', '8', '2'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm11-087', category: 'math', ageLevel: 11, question: 'Point B(-2,4). What quadrant?', options: ['I', 'II', 'III', 'IV'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-088', category: 'math', ageLevel: 11, question: 'Origin coordinates?', options: ['(1,1)', '(0,0)', '(0,1)', '(1,0)'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm11-089', category: 'math', ageLevel: 11, question: 'Midpoint of (2,4) and (6,8)', options: ['(4,6)', '(8,12)', '(2,2)', '(4,4)'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm11-090', category: 'math', ageLevel: 11, question: 'Distance from origin to (3,4)', options: ['7', '5', '1', '12'], correctAnswerIndex: 1, difficulty: 'hard' },
  
  // Final questions
  { id: 'm11-091', category: 'math', ageLevel: 11, question: '45% of 80 = ?', options: ['32', '40', '36', '45'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-092', category: 'math', ageLevel: 11, question: '3/5 × 5/9 = ?', options: ['8/14', '15/45', '1/3', '3/9'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-093', category: 'math', ageLevel: 11, question: '2.4 × 1.5 = ?', options: ['3.9', '3.6', '4.5', '2.9'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-094', category: 'math', ageLevel: 11, question: 'If 4x - 8 = 20, x = ?', options: ['3', '5', '7', '12'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-095', category: 'math', ageLevel: 11, question: 'Area of rectangle 12cm × 7cm', options: ['38 cm²', '19 cm²', '84 cm²', '96 cm²'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm11-096', category: 'math', ageLevel: 11, question: '-8 + (-5) = ?', options: ['13', '-13', '3', '-3'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-097', category: 'math', ageLevel: 11, question: '√144 = ?', options: ['14', '12', '72', '11'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm11-098', category: 'math', ageLevel: 11, question: 'LCM of 8 and 12', options: ['4', '96', '24', '48'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm11-099', category: 'math', ageLevel: 11, question: '5/8 as decimal', options: ['0.58', '0.625', '0.585', '0.65'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm11-100', category: 'math', ageLevel: 11, question: 'Evaluate 3x² when x = 4', options: ['144', '48', '24', '36'], correctAnswerIndex: 1, difficulty: 'medium' },
];
