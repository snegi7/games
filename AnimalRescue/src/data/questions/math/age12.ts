import type { Question } from '@/types';

// Math questions for 12-year-olds
// Focus: Pre-algebra, geometry, ratio/proportion, probability

export const mathQuestionsAge12: Question[] = [
  // Algebraic expressions
  { id: 'm12-001', category: 'math', ageLevel: 12, question: 'Simplify: 3x + 2y + 5x - y', options: ['8x + y', '8x + 3y', '2x + y', '8x - y'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-002', category: 'math', ageLevel: 12, question: 'Expand: 3(x + 4)', options: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-003', category: 'math', ageLevel: 12, question: 'Expand: 2(3x - 5)', options: ['6x - 5', '5x - 10', '6x - 10', '6x + 10'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm12-004', category: 'math', ageLevel: 12, question: 'Factorize: 6x + 9', options: ['3(2x + 3)', '6(x + 9)', '3(x + 3)', '9(x + 1)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-005', category: 'math', ageLevel: 12, question: 'Solve: 2x + 5 = 17', options: ['x = 6', 'x = 11', 'x = 22', 'x = 5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-006', category: 'math', ageLevel: 12, question: 'Solve: 3x - 7 = 14', options: ['x = 7', 'x = 21', 'x = 3', 'x = 63'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-007', category: 'math', ageLevel: 12, question: 'Solve: 4(x - 2) = 20', options: ['x = 3', 'x = 7', 'x = 5.5', 'x = 22'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-008', category: 'math', ageLevel: 12, question: 'Solve: x/3 + 4 = 9', options: ['x = 15', 'x = 5', 'x = 27', 'x = 1'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-009', category: 'math', ageLevel: 12, question: 'If y = 2x + 3, find y when x = 5', options: ['10', '13', '8', '25'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-010', category: 'math', ageLevel: 12, question: 'Simplify: 4x² + 3x² - 2x²', options: ['5x²', '9x²', '5x⁶', '5x⁴'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Geometry - circles
  { id: 'm12-011', category: 'math', ageLevel: 12, question: 'Area of circle, radius 5 (π≈3.14)', options: ['31.4', '78.5', '15.7', '25'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-012', category: 'math', ageLevel: 12, question: 'Circumference, diameter 10 (π≈3.14)', options: ['31.4', '78.5', '15.7', '314'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-013', category: 'math', ageLevel: 12, question: 'Diameter if radius = 8', options: ['4', '16', '64', '24'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-014', category: 'math', ageLevel: 12, question: 'Radius if diameter = 14', options: ['28', '7', '196', '14'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-015', category: 'math', ageLevel: 12, question: 'Sector area: radius 6, angle 90° (π≈3.14)', options: ['28.26', '9.42', '113.04', '56.52'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Geometry - 3D shapes
  { id: 'm12-016', category: 'math', ageLevel: 12, question: 'Volume of cuboid 4×5×3', options: ['12', '60', '47', '35'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-017', category: 'math', ageLevel: 12, question: 'Surface area of cube, side 4', options: ['64', '96', '24', '16'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-018', category: 'math', ageLevel: 12, question: 'Volume of cylinder: r=3, h=7 (π≈3.14)', options: ['197.82', '65.94', '131.88', '66'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-019', category: 'math', ageLevel: 12, question: 'Edges in a cube', options: ['6', '8', '12', '4'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm12-020', category: 'math', ageLevel: 12, question: 'Faces in a rectangular prism', options: ['4', '6', '8', '12'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Ratio and proportion
  { id: 'm12-021', category: 'math', ageLevel: 12, question: 'Divide 120 in ratio 3:5', options: ['45, 75', '36, 84', '60, 60', '40, 80'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-022', category: 'math', ageLevel: 12, question: 'If 4:7 = 16:x, find x', options: ['28', '7', '4', '112'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-023', category: 'math', ageLevel: 12, question: 'Direct proportion: y=3 when x=6. y when x=10?', options: ['5', '15', '30', '6'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-024', category: 'math', ageLevel: 12, question: 'Inverse proportion: 4 workers take 6 days. 8 workers?', options: ['12 days', '3 days', '2 days', '48 days'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-025', category: 'math', ageLevel: 12, question: 'Map scale 1:50000. 4cm on map = real?', options: ['2000m', '200m', '20m', '12500m'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Percentages advanced
  { id: 'm12-026', category: 'math', ageLevel: 12, question: 'Percentage change: 50 to 65', options: ['15%', '30%', '23%', '77%'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-027', category: 'math', ageLevel: 12, question: 'Original price if 20% off = $64', options: ['$80', '$76.80', '$51.20', '$84'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-028', category: 'math', ageLevel: 12, question: 'Compound interest: $100, 10% for 2 years', options: ['$120', '$121', '$110', '$100'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-029', category: 'math', ageLevel: 12, question: '8 is what % of 32?', options: ['4%', '40%', '25%', '8%'], correctAnswerIndex: 2, difficulty: 'medium' },
  { id: 'm12-030', category: 'math', ageLevel: 12, question: 'Price increases by 15%, then 10%. Total % increase?', options: ['25%', '26.5%', '15%', '25.5%'], correctAnswerIndex: 1, difficulty: 'hard' },
  
  // Probability
  { id: 'm12-031', category: 'math', ageLevel: 12, question: 'Probability of rolling 6 on fair die', options: ['1/2', '1/3', '1/6', '6'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm12-032', category: 'math', ageLevel: 12, question: 'Probability of NOT rolling 6', options: ['1/6', '5/6', '1', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-033', category: 'math', ageLevel: 12, question: 'Bag: 3 red, 5 blue. P(red)?', options: ['3/5', '5/8', '3/8', '5/3'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm12-034', category: 'math', ageLevel: 12, question: 'Coin tossed twice. P(two heads)?', options: ['1/2', '1/4', '1', '0'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-035', category: 'math', ageLevel: 12, question: 'P(event) = 0.7. P(not event)?', options: ['0.7', '0.3', '1.7', '0'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Integers and operations
  { id: 'm12-036', category: 'math', ageLevel: 12, question: '(-8) × (-5) = ?', options: ['-40', '40', '-13', '13'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-037', category: 'math', ageLevel: 12, question: '(-36) ÷ 6 = ?', options: ['6', '-6', '42', '-42'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-038', category: 'math', ageLevel: 12, question: '-15 + 23 - 8 = ?', options: ['0', '46', '-46', '16'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-039', category: 'math', ageLevel: 12, question: '(-4)² = ?', options: ['-16', '16', '-8', '8'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-040', category: 'math', ageLevel: 12, question: '-(-7) = ?', options: ['-7', '7', '0', '49'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Powers and roots
  { id: 'm12-041', category: 'math', ageLevel: 12, question: '2⁴ × 2³ = ?', options: ['2⁷', '2¹²', '4⁷', '2¹'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-042', category: 'math', ageLevel: 12, question: '3⁵ ÷ 3² = ?', options: ['3⁷', '3³', '1³', '3²·⁵'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-043', category: 'math', ageLevel: 12, question: '(2³)² = ?', options: ['2⁵', '2⁶', '2⁹', '4⁶'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-044', category: 'math', ageLevel: 12, question: '√(64×4) = ?', options: ['16', '256', '8', '32'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-045', category: 'math', ageLevel: 12, question: '∛27 = ?', options: ['9', '3', '27', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  
  // Sequences
  { id: 'm12-046', category: 'math', ageLevel: 12, question: 'Sequence: 2, 6, 18, 54, __?', options: ['108', '162', '72', '216'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-047', category: 'math', ageLevel: 12, question: 'Arithmetic sequence: 5, 8, 11, 14. 10th term?', options: ['32', '29', '35', '26'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-048', category: 'math', ageLevel: 12, question: 'nth term of 3, 5, 7, 9...', options: ['2n', '2n+1', 'n+2', '3n'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-049', category: 'math', ageLevel: 12, question: 'Geometric: 2, 6, 18. Common ratio?', options: ['4', '3', '2', '6'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-050', category: 'math', ageLevel: 12, question: 'Triangular numbers: 1, 3, 6, 10, __?', options: ['13', '14', '15', '16'], correctAnswerIndex: 2, difficulty: 'medium' },
  
  // Angles
  { id: 'm12-051', category: 'math', ageLevel: 12, question: 'Exterior angle of triangle = ?', options: ['Sum of 2 interior opposite', '180°', '90°', '360°'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-052', category: 'math', ageLevel: 12, question: 'Interior angle of regular hexagon', options: ['60°', '90°', '120°', '108°'], correctAnswerIndex: 2, difficulty: 'hard' },
  { id: 'm12-053', category: 'math', ageLevel: 12, question: 'Angles on straight line sum to?', options: ['90°', '180°', '360°', '270°'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-054', category: 'math', ageLevel: 12, question: 'Vertically opposite angles are?', options: ['Equal', 'Supplementary', 'Complementary', '90°'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-055', category: 'math', ageLevel: 12, question: 'Alternate angles in parallel lines are?', options: ['Equal', '180°', '90°', 'Different'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Statistics
  { id: 'm12-056', category: 'math', ageLevel: 12, question: 'Mean of 12, 15, 18, 21, 24', options: ['15', '18', '21', '90'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-057', category: 'math', ageLevel: 12, question: 'Median of 3, 7, 9, 12, 15, 18', options: ['9', '10.5', '12', '10'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-058', category: 'math', ageLevel: 12, question: 'Mode can have ___ value(s)', options: ['Only one', 'Multiple', 'Zero', 'Any of these'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm12-059', category: 'math', ageLevel: 12, question: 'Range vs IQR. Which is affected by outliers?', options: ['IQR', 'Range', 'Both', 'Neither'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-060', category: 'math', ageLevel: 12, question: 'Frequency: 2,2,3,3,3,4. Mode?', options: ['2', '3', '4', '2.5'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // Coordinates and graphs
  { id: 'm12-061', category: 'math', ageLevel: 12, question: 'Gradient of line y = 3x + 2', options: ['2', '3', '5', '6'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-062', category: 'math', ageLevel: 12, question: 'y-intercept of y = 5x - 7', options: ['5', '-7', '7', '-5'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-063', category: 'math', ageLevel: 12, question: 'Gradient between (1,2) and (3,8)', options: ['3', '2', '6', '5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-064', category: 'math', ageLevel: 12, question: 'Horizontal line equation through (3,5)', options: ['x=3', 'y=5', 'y=3', 'x=5'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-065', category: 'math', ageLevel: 12, question: 'If y=2x passes through origin?', options: ['Yes', 'No', 'Sometimes', 'Depends on x'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Word problems - extra 5 seconds to read
  { id: 'm12-066', category: 'math', ageLevel: 12, question: 'Speed=60km/h, Time=2.5hrs. Distance?', options: ['62.5km', '150km', '24km', '57.5km'], correctAnswerIndex: 1, difficulty: 'easy', bonusTime: 5 },
  { id: 'm12-067', category: 'math', ageLevel: 12, question: 'Buy 3 for $5 each, get 20% off. Total?', options: ['$12', '$15', '$3', '$13'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-068', category: 'math', ageLevel: 12, question: 'Rectangle perimeter 48. Width 10. Length?', options: ['38', '14', '24', '19'], correctAnswerIndex: 1, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-069', category: 'math', ageLevel: 12, question: 'Ages ratio 2:5. Sum=35. Older age?', options: ['25', '10', '14', '21'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-070', category: 'math', ageLevel: 12, question: 'Profit margin 25% on $80 cost. Selling price?', options: ['$100', '$60', '$105', '$85'], correctAnswerIndex: 0, difficulty: 'hard', bonusTime: 5 },
  
  // More algebra
  { id: 'm12-071', category: 'math', ageLevel: 12, question: 'Solve: 2(x+3) = x + 10', options: ['x=4', 'x=7', 'x=16', 'x=2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-072', category: 'math', ageLevel: 12, question: 'Solve: 5x - 3 = 2x + 12', options: ['x=5', 'x=3', 'x=15', 'x=9'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-073', category: 'math', ageLevel: 12, question: 'Expand: (x+2)(x+3)', options: ['x²+5x+6', 'x²+6x+5', '2x+5', 'x²+5'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-074', category: 'math', ageLevel: 12, question: 'Factorize: x² + 5x + 6', options: ['(x+2)(x+3)', '(x+1)(x+6)', 'x(x+5)+6', '(x+5)(x+1)'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm12-075', category: 'math', ageLevel: 12, question: 'Evaluate: 3a + 2b when a=4, b=5', options: ['22', '17', '19', '27'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Inequalities
  { id: 'm12-076', category: 'math', ageLevel: 12, question: 'Solve: x + 5 > 12', options: ['x > 7', 'x > 17', 'x < 7', 'x = 7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-077', category: 'math', ageLevel: 12, question: 'Solve: 2x ≤ 14', options: ['x ≤ 7', 'x ≥ 7', 'x < 12', 'x ≤ 12'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-078', category: 'math', ageLevel: 12, question: 'If x > 3, which is true?', options: ['x = 2', 'x = 3', 'x = 4', 'x = 0'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm12-079', category: 'math', ageLevel: 12, question: 'Solve: 3x - 6 < 9', options: ['x < 5', 'x < 1', 'x > 5', 'x < 15'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm12-080', category: 'math', ageLevel: 12, question: 'Graph x ≥ 2 starts at 2 and goes?', options: ['Left', 'Right', 'Up', 'Down'], correctAnswerIndex: 1, difficulty: 'easy' },
  
  // More word problems - extra 5 seconds to read
  { id: 'm12-081', category: 'math', ageLevel: 12, question: 'Phone plan: $25/month + $0.10/text. 50 texts. Bill?', options: ['$30', '$25.50', '$75', '$27.50'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-082', category: 'math', ageLevel: 12, question: 'Triangle angles are 45° and 65°. Third angle?', options: ['70°', '110°', '80°', '60°'], correctAnswerIndex: 0, difficulty: 'easy', bonusTime: 5 },
  { id: 'm12-083', category: 'math', ageLevel: 12, question: 'Buy 4 items at $15 each. 10% discount. Total?', options: ['$54', '$60', '$56', '$66'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-084', category: 'math', ageLevel: 12, question: 'Bank pays 5% interest on $200. Interest after 1 year?', options: ['$10', '$5', '$15', '$205'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-085', category: 'math', ageLevel: 12, question: 'Map scale 1:50000. 3 cm on map = real distance?', options: ['1.5 km', '150 m', '15 km', '150 km'], correctAnswerIndex: 0, difficulty: 'hard', bonusTime: 5 },
  
  // More word problems - extra 5 seconds to read
  { id: 'm12-086', category: 'math', ageLevel: 12, question: 'Recipe for 4 people uses 300g flour. For 6 people?', options: ['450 g', '400 g', '500 g', '200 g'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-087', category: 'math', ageLevel: 12, question: 'Pool fills at 40 L/min. Time to fill 1200 L?', options: ['30 min', '40 min', '35 min', '48000 min'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-088', category: 'math', ageLevel: 12, question: 'Shirt was $40, now $32. Percent off?', options: ['20%', '8%', '25%', '80%'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-089', category: 'math', ageLevel: 12, question: 'Cyclist goes 15 km/h. Time for 45 km?', options: ['3 hours', '30 min', '4 hours', '675 min'], correctAnswerIndex: 0, difficulty: 'medium', bonusTime: 5 },
  { id: 'm12-090', category: 'math', ageLevel: 12, question: 'Circle radius 7 cm. Diameter?', options: ['14 cm', '3.5 cm', '49 cm', '21 cm'], correctAnswerIndex: 0, difficulty: 'easy', bonusTime: 5 },
  
  // Final questions
  { id: 'm12-091', category: 'math', ageLevel: 12, question: '15% of 240 = ?', options: ['36', '24', '40', '15'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-092', category: 'math', ageLevel: 12, question: '3/4 ÷ 1/2 = ?', options: ['3/8', '3/2', '1/2', '6/4'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm12-093', category: 'math', ageLevel: 12, question: 'If 5x = 35, then x = ?', options: ['30', '40', '7', '175'], correctAnswerIndex: 2, difficulty: 'easy' },
  { id: 'm12-094', category: 'math', ageLevel: 12, question: 'Area of triangle base 8, height 5', options: ['40', '20', '13', '80'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-095', category: 'math', ageLevel: 12, question: '(-3)³ = ?', options: ['9', '-9', '27', '-27'], correctAnswerIndex: 3, difficulty: 'medium' },
  { id: 'm12-096', category: 'math', ageLevel: 12, question: 'Simplify: 12x/4', options: ['3x', '8x', '48x', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm12-097', category: 'math', ageLevel: 12, question: 'Exterior angle of regular pentagon', options: ['108°', '72°', '60°', '120°'], correctAnswerIndex: 1, difficulty: 'hard' },
  { id: 'm12-098', category: 'math', ageLevel: 12, question: 'P(even) rolling fair die', options: ['1/6', '1/2', '1/3', '2/3'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-099', category: 'math', ageLevel: 12, question: 'y = mx + c. What is c?', options: ['Gradient', 'y-intercept', 'x-intercept', 'Origin'], correctAnswerIndex: 1, difficulty: 'easy' },
  { id: 'm12-100', category: 'math', ageLevel: 12, question: 'Solve: 2(3x - 4) = 16', options: ['x = 4', 'x = 2', 'x = 6', 'x = 12'], correctAnswerIndex: 0, difficulty: 'medium' },
];
