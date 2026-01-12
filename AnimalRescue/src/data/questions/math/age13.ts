import type { Question } from '@/types';

// Math questions for 13-year-olds
// Focus: Algebra, linear equations, Pythagoras, trigonometry basics

export const mathQuestionsAge13: Question[] = [
  // Linear equations
  { id: 'm13-001', category: 'math', ageLevel: 13, question: 'Solve: 3(2x - 1) = 2(x + 5)', options: ['x = 3.25', 'x = 2', 'x = 3', 'x = 4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-002', category: 'math', ageLevel: 13, question: 'Solve: 5x + 3 = 2x + 15', options: ['x = 4', 'x = 6', 'x = 3', 'x = 12'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-003', category: 'math', ageLevel: 13, question: 'Solve: (x + 2)/3 = 5', options: ['x = 13', 'x = 17', 'x = 1', 'x = 15'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-004', category: 'math', ageLevel: 13, question: 'Solve: 4(x - 3) = 3(x + 2)', options: ['x = 18', 'x = 6', 'x = 0', 'x = 12'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-005', category: 'math', ageLevel: 13, question: 'Solve: 2x/5 = 8', options: ['x = 20', 'x = 3.2', 'x = 40', 'x = 16'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-006', category: 'math', ageLevel: 13, question: 'If 3x - 7 = 2x + 5, find x', options: ['x = 12', 'x = 2', 'x = -12', 'x = 6'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-007', category: 'math', ageLevel: 13, question: 'Solve: 2(x + 4) + 3(x - 2) = 22', options: ['x = 4', 'x = 6', 'x = 3', 'x = 5'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-008', category: 'math', ageLevel: 13, question: 'Solve: 6x - 4 = 4x + 10', options: ['x = 7', 'x = 3', 'x = 14', 'x = 1'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-009', category: 'math', ageLevel: 13, question: 'Solve: 5(x - 1) = 3x + 9', options: ['x = 7', 'x = 2', 'x = 14', 'x = 4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-010', category: 'math', ageLevel: 13, question: 'Solve: x/4 + x/2 = 6', options: ['x = 8', 'x = 4', 'x = 12', 'x = 24'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Pythagoras theorem
  { id: 'm13-011', category: 'math', ageLevel: 13, question: 'Right triangle: a=3, b=4. Find c', options: ['5', '7', '12', '25'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-012', category: 'math', ageLevel: 13, question: 'Right triangle: a=5, b=12. Find c', options: ['13', '17', '7', '60'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-013', category: 'math', ageLevel: 13, question: 'Right triangle: a=8, b=15. Find c', options: ['17', '23', '7', '120'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-014', category: 'math', ageLevel: 13, question: 'Right triangle: c=10, a=6. Find b', options: ['8', '4', '16', '64'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-015', category: 'math', ageLevel: 13, question: 'Right triangle: c=13, b=5. Find a', options: ['12', '8', '18', '144'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-016', category: 'math', ageLevel: 13, question: 'Is 5,12,13 a right triangle?', options: ['Yes', 'No', 'Maybe', 'Need more info'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-017', category: 'math', ageLevel: 13, question: 'Is 6,8,11 a right triangle?', options: ['Yes', 'No', 'Maybe', 'Need more info'], correctAnswerIndex: 1, difficulty: 'medium' },
  { id: 'm13-018', category: 'math', ageLevel: 13, question: 'Ladder 10m against wall, 6m from base. Height?', options: ['8m', '4m', '16m', '6m'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-019', category: 'math', ageLevel: 13, question: 'Diagonal of rectangle 6×8', options: ['10', '14', '48', '7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-020', category: 'math', ageLevel: 13, question: 'Distance between (0,0) and (3,4)', options: ['5', '7', '1', '12'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Algebraic expressions
  { id: 'm13-021', category: 'math', ageLevel: 13, question: 'Expand: (x + 3)(x + 5)', options: ['x² + 8x + 15', 'x² + 15x + 8', '2x + 8', 'x² + 8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-022', category: 'math', ageLevel: 13, question: 'Expand: (x - 4)(x + 2)', options: ['x² - 2x - 8', 'x² + 6x - 8', 'x² - 8', 'x² - 6x - 8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-023', category: 'math', ageLevel: 13, question: 'Expand: (x + 5)²', options: ['x² + 10x + 25', 'x² + 25', 'x² + 5x + 25', '2x + 10'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-024', category: 'math', ageLevel: 13, question: 'Expand: (x - 3)²', options: ['x² - 6x + 9', 'x² + 9', 'x² - 3x + 9', 'x² - 9'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-025', category: 'math', ageLevel: 13, question: 'Factorize: x² + 7x + 12', options: ['(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)', '(x+7)(x+12)'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-026', category: 'math', ageLevel: 13, question: 'Factorize: x² - 9', options: ['(x+3)(x-3)', '(x-9)(x+1)', '(x+9)(x-9)', '(x-3)²'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-027', category: 'math', ageLevel: 13, question: 'Factorize: x² + 6x + 9', options: ['(x+3)²', '(x+9)(x+1)', '(x+2)(x+3)', '(x+6)(x+3)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-028', category: 'math', ageLevel: 13, question: 'Simplify: 3x² × 2x³', options: ['6x⁵', '5x⁵', '6x⁶', '5x⁶'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-029', category: 'math', ageLevel: 13, question: 'Simplify: 12x⁴ ÷ 4x²', options: ['3x²', '8x²', '3x⁶', '8x⁶'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-030', category: 'math', ageLevel: 13, question: 'Simplify: (2x³)²', options: ['4x⁶', '4x⁵', '2x⁶', '2x⁵'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Linear graphs
  { id: 'm13-031', category: 'math', ageLevel: 13, question: 'Gradient of y = 4x - 7', options: ['4', '-7', '7', '-4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-032', category: 'math', ageLevel: 13, question: 'y-intercept of y = 3x + 5', options: ['5', '3', '8', '-5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-033', category: 'math', ageLevel: 13, question: 'Equation: gradient 2, passes (0,3)', options: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', 'y = -2x + 3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-034', category: 'math', ageLevel: 13, question: 'Gradient between (2,3) and (4,9)', options: ['3', '6', '2', '12'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-035', category: 'math', ageLevel: 13, question: 'Parallel lines have ___ gradients', options: ['Equal', 'Opposite', 'Negative reciprocal', 'Zero'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-036', category: 'math', ageLevel: 13, question: 'Line through (1,2) and (3,6). y-intercept?', options: ['0', '2', '-1', '1'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-037', category: 'math', ageLevel: 13, question: 'x-intercept of y = 2x - 6', options: ['3', '-3', '6', '-6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-038', category: 'math', ageLevel: 13, question: 'Are y=2x+1 and y=2x-5 parallel?', options: ['Yes', 'No', 'Perpendicular', 'Same line'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-039', category: 'math', ageLevel: 13, question: 'Perpendicular to gradient 3 is', options: ['-1/3', '3', '-3', '1/3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-040', category: 'math', ageLevel: 13, question: 'Midpoint of (2,4) and (8,10)', options: ['(5,7)', '(10,14)', '(6,6)', '(4,5)'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Simultaneous equations
  { id: 'm13-041', category: 'math', ageLevel: 13, question: 'x+y=10, x-y=4. Find x', options: ['7', '3', '5', '10'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-042', category: 'math', ageLevel: 13, question: 'x+y=10, x-y=4. Find y', options: ['3', '7', '5', '4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-043', category: 'math', ageLevel: 13, question: '2x+y=7, x+y=4. Find x', options: ['3', '1', '4', '2'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-044', category: 'math', ageLevel: 13, question: '2x+y=7, x+y=4. Find y', options: ['1', '3', '4', '-1'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-045', category: 'math', ageLevel: 13, question: '3x+2y=12, x=2. Find y', options: ['3', '6', '2', '4'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Indices
  { id: 'm13-046', category: 'math', ageLevel: 13, question: '2⁵ × 2³ = ?', options: ['2⁸', '2¹⁵', '4⁸', '2²'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-047', category: 'math', ageLevel: 13, question: '3⁶ ÷ 3² = ?', options: ['3⁴', '3³', '3⁸', '1⁴'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-048', category: 'math', ageLevel: 13, question: '(5²)³ = ?', options: ['5⁶', '5⁵', '5⁸', '25³'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-049', category: 'math', ageLevel: 13, question: '4⁰ = ?', options: ['1', '0', '4', 'undefined'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-050', category: 'math', ageLevel: 13, question: '2⁻³ = ?', options: ['1/8', '-8', '-6', '8'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Standard form
  { id: 'm13-051', category: 'math', ageLevel: 13, question: '4500 in standard form', options: ['4.5 × 10³', '45 × 10²', '0.45 × 10⁴', '4.5 × 10⁴'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-052', category: 'math', ageLevel: 13, question: '0.0023 in standard form', options: ['2.3 × 10⁻³', '23 × 10⁻⁴', '2.3 × 10³', '0.23 × 10⁻²'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-053', category: 'math', ageLevel: 13, question: '3.2 × 10⁴ = ?', options: ['32000', '3200', '320000', '0.00032'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-054', category: 'math', ageLevel: 13, question: '5.6 × 10⁻² = ?', options: ['0.056', '0.56', '560', '5600'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-055', category: 'math', ageLevel: 13, question: '(2 × 10³) × (3 × 10²) = ?', options: ['6 × 10⁵', '5 × 10⁵', '6 × 10⁶', '5 × 10⁶'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Ratio and proportion
  { id: 'm13-056', category: 'math', ageLevel: 13, question: 'Share $180 in ratio 2:3:4', options: ['40,60,80', '36,54,90', '60,60,60', '45,60,75'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-057', category: 'math', ageLevel: 13, question: 'Direct proportion: y=8 when x=4. y when x=10?', options: ['20', '14', '16', '12'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-058', category: 'math', ageLevel: 13, question: 'Inverse: 6 workers take 8 days. 4 workers take?', options: ['12 days', '10 days', '16 days', '5.3 days'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-059', category: 'math', ageLevel: 13, question: 'Map scale 1:25000. 8cm = real?', options: ['2km', '200m', '20km', '2000m'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-060', category: 'math', ageLevel: 13, question: 'Recipe for 4 needs 300g flour. For 10?', options: ['750g', '500g', '1200g', '600g'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Geometry
  { id: 'm13-061', category: 'math', ageLevel: 13, question: 'Interior angle of regular octagon', options: ['135°', '120°', '144°', '108°'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-062', category: 'math', ageLevel: 13, question: 'Sum of interior angles of pentagon', options: ['540°', '360°', '720°', '180°'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-063', category: 'math', ageLevel: 13, question: 'Exterior angle of regular hexagon', options: ['60°', '120°', '90°', '72°'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-064', category: 'math', ageLevel: 13, question: 'Area of trapezium: a=5, b=9, h=4', options: ['28', '36', '20', '45'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-065', category: 'math', ageLevel: 13, question: 'Volume of cylinder: r=5, h=8 (π≈3.14)', options: ['628', '251.2', '125.6', '314'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Probability
  { id: 'm13-066', category: 'math', ageLevel: 13, question: 'Two dice rolled. P(sum=7)?', options: ['1/6', '1/12', '7/36', '6/36'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-067', category: 'math', ageLevel: 13, question: 'P(A)=0.3, P(B)=0.5, independent. P(A and B)?', options: ['0.15', '0.8', '0.2', '0.35'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-068', category: 'math', ageLevel: 13, question: 'Bag: 4 red, 6 blue. Pick 2 (no replace). P(both red)?', options: ['2/15', '4/25', '4/15', '1/6'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-069', category: 'math', ageLevel: 13, question: 'P(A)=0.4. P(not A)?', options: ['0.6', '0.4', '1.4', '0'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-070', category: 'math', ageLevel: 13, question: 'Expected value: Win $10 (P=0.3), lose $5 (P=0.7)', options: ['-$0.50', '$3', '$1.50', '-$2'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Statistics
  { id: 'm13-071', category: 'math', ageLevel: 13, question: 'Mean of 15, 18, 12, 20, 25', options: ['18', '15', '20', '90'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-072', category: 'math', ageLevel: 13, question: 'Median of 3, 8, 12, 15, 22, 25', options: ['13.5', '12', '15', '14'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-073', category: 'math', ageLevel: 13, question: 'IQR: Q1=15, Q3=35', options: ['20', '50', '25', '10'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-074', category: 'math', ageLevel: 13, question: 'Frequency density = freq ÷ ?', options: ['Class width', 'Total freq', 'Mean', 'Median'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-075', category: 'math', ageLevel: 13, question: 'Cumulative frequency always...', options: ['Increases', 'Decreases', 'Stays same', 'Varies randomly'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // More algebra
  { id: 'm13-076', category: 'math', ageLevel: 13, question: 'Solve: x² = 49', options: ['x = ±7', 'x = 7', 'x = 24.5', 'x = ±24.5'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-077', category: 'math', ageLevel: 13, question: 'Solve: x² - 5x = 0', options: ['x=0 or x=5', 'x=5', 'x=0', 'x=-5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-078', category: 'math', ageLevel: 13, question: 'Solve: x² - 9 = 0', options: ['x = ±3', 'x = 3', 'x = 9', 'x = ±9'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-079', category: 'math', ageLevel: 13, question: 'Rearrange v=u+at for t', options: ['t=(v-u)/a', 't=v-u-a', 't=va/u', 't=v+u-a'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-080', category: 'math', ageLevel: 13, question: 'Rearrange A=πr² for r', options: ['r=√(A/π)', 'r=A/π', 'r=A-π', 'r=π/A'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Sequences
  { id: 'm13-081', category: 'math', ageLevel: 13, question: 'nth term of 5, 8, 11, 14...', options: ['3n+2', '3n+5', 'n+3', '5n'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-082', category: 'math', ageLevel: 13, question: '10th term of 3, 7, 11, 15...', options: ['39', '43', '35', '40'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-083', category: 'math', ageLevel: 13, question: 'Quadratic sequence: 1, 4, 9, 16...', options: ['n²', '2n', 'n+3', '4n'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-084', category: 'math', ageLevel: 13, question: 'Geometric: 2, 6, 18, 54. 5th term?', options: ['162', '108', '216', '72'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-085', category: 'math', ageLevel: 13, question: 'Common ratio of 5, 15, 45, 135...', options: ['3', '10', '5', '15'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Surds and roots
  { id: 'm13-086', category: 'math', ageLevel: 13, question: 'Simplify √50', options: ['5√2', '25√2', '√25', '10√5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-087', category: 'math', ageLevel: 13, question: 'Simplify √72', options: ['6√2', '8√2', '9√2', '12√2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-088', category: 'math', ageLevel: 13, question: '√5 × √20 = ?', options: ['10', '25', '100', '√100'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-089', category: 'math', ageLevel: 13, question: '(√3)² = ?', options: ['3', '9', '√6', '6'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-090', category: 'math', ageLevel: 13, question: '2√5 + 3√5 = ?', options: ['5√5', '5√10', '6√5', '5'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Final questions
  { id: 'm13-091', category: 'math', ageLevel: 13, question: 'Solve: 5(x-2) = 3(x+4)', options: ['x = 11', 'x = 1', 'x = 7', 'x = -1'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-092', category: 'math', ageLevel: 13, question: 'Expand: (2x+3)(x-4)', options: ['2x²-5x-12', '2x²+5x-12', '2x²-11x-12', '2x²-12'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-093', category: 'math', ageLevel: 13, question: 'Factorize: x² - 4x - 12', options: ['(x-6)(x+2)', '(x+6)(x-2)', '(x-3)(x+4)', '(x-12)(x+1)'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-094', category: 'math', ageLevel: 13, question: 'Right triangle a=9, b=12. c=?', options: ['15', '21', '108', '√225'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm13-095', category: 'math', ageLevel: 13, question: 'Volume of cone: r=3, h=4 (V=⅓πr²h)', options: ['12π', '36π', '4π', '9π'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-096', category: 'math', ageLevel: 13, question: '2.5 × 10⁴ + 3.5 × 10⁴ = ?', options: ['6 × 10⁴', '6 × 10⁸', '8.75 × 10⁸', '6 × 10³'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-097', category: 'math', ageLevel: 13, question: 'Gradient perpendicular to -2 is', options: ['1/2', '2', '-1/2', '-2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-098', category: 'math', ageLevel: 13, question: 'nth term of 2, 5, 10, 17...', options: ['n²+1', 'n²+2', '3n-1', '2n²'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm13-099', category: 'math', ageLevel: 13, question: 'Surface area of sphere r=5 (4πr²)', options: ['100π', '500π', '25π', '20π'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm13-100', category: 'math', ageLevel: 13, question: 'Solve: x²+x-12=0', options: ['x=3 or x=-4', 'x=-3 or x=4', 'x=12 or x=-1', 'x=6 or x=-2'], correctAnswerIndex: 0, difficulty: 'hard' },
];
