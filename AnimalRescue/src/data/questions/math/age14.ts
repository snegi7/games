import type { Question } from '@/types';

// Math questions for 14-year-olds
// Focus: Advanced algebra, trigonometry, quadratics, circle theorems

export const mathQuestionsAge14: Question[] = [
  // Quadratic equations
  { id: 'm14-001', category: 'math', ageLevel: 14, question: 'Solve: x² + 5x + 6 = 0', options: ['x=-2, x=-3', 'x=2, x=3', 'x=-1, x=-6', 'x=1, x=6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-002', category: 'math', ageLevel: 14, question: 'Solve: x² - 7x + 12 = 0', options: ['x=3, x=4', 'x=-3, x=-4', 'x=2, x=6', 'x=-2, x=-6'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-003', category: 'math', ageLevel: 14, question: 'Solve: x² - 4x - 21 = 0', options: ['x=7, x=-3', 'x=-7, x=3', 'x=21, x=-1', 'x=7, x=3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-004', category: 'math', ageLevel: 14, question: 'Solve: 2x² - 8x = 0', options: ['x=0, x=4', 'x=0, x=-4', 'x=2, x=4', 'x=-2, x=-4'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-005', category: 'math', ageLevel: 14, question: 'Discriminant of x² + 4x + 4', options: ['0', '8', '16', '-8'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-006', category: 'math', ageLevel: 14, question: 'If discriminant < 0, roots are', options: ['No real roots', '2 equal roots', '2 different roots', 'Positive'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-007', category: 'math', ageLevel: 14, question: 'Quadratic formula: x = ?', options: ['(-b±√(b²-4ac))/2a', '(-b±√(b²+4ac))/2a', 'b±√(b²-4ac)/2a', '(-b+√(b²-4ac))/a'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-008', category: 'math', ageLevel: 14, question: 'Complete square: x² + 6x + __', options: ['9', '36', '3', '12'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-009', category: 'math', ageLevel: 14, question: 'Vertex of y = (x-2)² + 3', options: ['(2, 3)', '(-2, 3)', '(2, -3)', '(3, 2)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-010', category: 'math', ageLevel: 14, question: 'Axis of symmetry: y = x² - 6x + 5', options: ['x = 3', 'x = -3', 'x = 5', 'x = 1'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Trigonometry
  { id: 'm14-011', category: 'math', ageLevel: 14, question: 'sin(30°) = ?', options: ['0.5', '√3/2', '1', '√2/2'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-012', category: 'math', ageLevel: 14, question: 'cos(60°) = ?', options: ['0.5', '√3/2', '1', '0'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-013', category: 'math', ageLevel: 14, question: 'tan(45°) = ?', options: ['1', '0', '√2', '∞'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-014', category: 'math', ageLevel: 14, question: 'SOH CAH TOA: sin = ?', options: ['Opp/Hyp', 'Adj/Hyp', 'Opp/Adj', 'Hyp/Opp'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-015', category: 'math', ageLevel: 14, question: 'Right triangle: opp=3, hyp=5. sin(θ)?', options: ['0.6', '0.8', '0.75', '1.67'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-016', category: 'math', ageLevel: 14, question: 'Right triangle: adj=4, hyp=5. cos(θ)?', options: ['0.8', '0.6', '1.25', '0.75'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-017', category: 'math', ageLevel: 14, question: 'Right triangle: opp=5, adj=12. tan(θ)?', options: ['5/12', '12/5', '5/13', '12/13'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-018', category: 'math', ageLevel: 14, question: 'Find angle: sin(θ)=0.5, θ=?', options: ['30°', '60°', '45°', '90°'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-019', category: 'math', ageLevel: 14, question: 'sin²θ + cos²θ = ?', options: ['1', '0', '2', 'tan²θ'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-020', category: 'math', ageLevel: 14, question: 'tan(θ) = sin(θ)/cos(θ). True?', options: ['True', 'False', 'Sometimes', 'Only for 45°'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Circle theorems
  { id: 'm14-021', category: 'math', ageLevel: 14, question: 'Angle at center vs circumference', options: ['Center = 2× circum', 'Same', 'Circum = 2× center', 'No relation'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-022', category: 'math', ageLevel: 14, question: 'Angle in semicircle = ?', options: ['90°', '180°', '45°', '60°'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-023', category: 'math', ageLevel: 14, question: 'Angles in same segment are', options: ['Equal', 'Supplementary', 'Complementary', '90°'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-024', category: 'math', ageLevel: 14, question: 'Opposite angles in cyclic quad sum to', options: ['180°', '360°', '90°', '270°'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-025', category: 'math', ageLevel: 14, question: 'Tangent meets radius at', options: ['90°', '180°', '0°', '45°'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-026', category: 'math', ageLevel: 14, question: 'Two tangents from external point are', options: ['Equal length', 'Perpendicular', 'Parallel', 'Different'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-027', category: 'math', ageLevel: 14, question: 'Chord perpendicular bisector passes through', options: ['Center', 'Circumference', 'Tangent point', 'Origin'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-028', category: 'math', ageLevel: 14, question: 'Arc length formula: θ/360 × ?', options: ['2πr', 'πr²', 'πd', 'r²'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-029', category: 'math', ageLevel: 14, question: 'Sector area formula: θ/360 × ?', options: ['πr²', '2πr', 'πd', 'r'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-030', category: 'math', ageLevel: 14, question: 'Arc: r=6, θ=60°. Length? (π=3.14)', options: ['6.28', '12.56', '18.84', '3.14'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Simultaneous equations
  { id: 'm14-031', category: 'math', ageLevel: 14, question: '2x+3y=12, 4x-y=5. Find x', options: ['2.07', '3', '1', '2'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-032', category: 'math', ageLevel: 14, question: '3x+2y=13, x-y=1. Find y', options: ['2', '4', '3', '5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-033', category: 'math', ageLevel: 14, question: 'y=x², y=2x+3 intersect at', options: ['x=3 or x=-1', 'x=1 or x=-3', 'x=0', 'No intersection'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-034', category: 'math', ageLevel: 14, question: 'x+y=5, xy=6. Find x,y', options: ['2,3', '1,6', '4,1', '0,5'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-035', category: 'math', ageLevel: 14, question: '5x-2y=16, 3x+y=11. Find x+y', options: ['7', '5', '9', '11'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Functions
  { id: 'm14-036', category: 'math', ageLevel: 14, question: 'f(x)=3x-2. f(4)=?', options: ['10', '12', '14', '6'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-037', category: 'math', ageLevel: 14, question: 'f(x)=x²+1. f(-3)=?', options: ['10', '8', '-8', '7'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-038', category: 'math', ageLevel: 14, question: 'f(x)=2x+3, g(x)=x². fg(2)=?', options: ['11', '14', '7', '49'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-039', category: 'math', ageLevel: 14, question: 'f(x)=2x+3, g(x)=x². gf(2)=?', options: ['49', '11', '14', '28'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-040', category: 'math', ageLevel: 14, question: 'f(x)=3x-6. f⁻¹(x)=?', options: ['(x+6)/3', '3x+6', 'x/3-6', '6-3x'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Vectors
  { id: 'm14-041', category: 'math', ageLevel: 14, question: 'a=(3,2), b=(1,4). a+b=?', options: ['(4,6)', '(2,-2)', '(4,8)', '(3,8)'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-042', category: 'math', ageLevel: 14, question: 'a=(5,3). 2a=?', options: ['(10,6)', '(7,5)', '(10,3)', '(5,6)'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-043', category: 'math', ageLevel: 14, question: 'a=(4,3), b=(1,2). a-b=?', options: ['(3,1)', '(5,5)', '(3,5)', '(-3,-1)'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-044', category: 'math', ageLevel: 14, question: '|a|=(3,4). Magnitude=?', options: ['5', '7', '1', '25'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-045', category: 'math', ageLevel: 14, question: 'Unit vector in direction (3,4)', options: ['(0.6,0.8)', '(3,4)', '(1,1)', '(0.75,1)'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Indices and surds
  { id: 'm14-046', category: 'math', ageLevel: 14, question: 'Simplify: √18 + √8', options: ['5√2', '√26', '26', '4√2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-047', category: 'math', ageLevel: 14, question: 'Rationalize: 1/√5', options: ['√5/5', '5√5', '√5', '5/√5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-048', category: 'math', ageLevel: 14, question: 'Simplify: (√3)³', options: ['3√3', '9', '√27', '3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-049', category: 'math', ageLevel: 14, question: 'Expand: (2+√3)(2-√3)', options: ['1', '4', '7', '4-3'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-050', category: 'math', ageLevel: 14, question: '27^(1/3) = ?', options: ['3', '9', '27', '81'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Inequalities
  { id: 'm14-051', category: 'math', ageLevel: 14, question: 'Solve: 3x-5 > 7', options: ['x > 4', 'x > 2/3', 'x < 4', 'x > 12'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-052', category: 'math', ageLevel: 14, question: 'Solve: 2(x+3) ≤ 14', options: ['x ≤ 4', 'x ≤ 7', 'x ≥ 4', 'x ≤ 5.5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-053', category: 'math', ageLevel: 14, question: 'Solve: -2x > 8', options: ['x < -4', 'x > -4', 'x < 4', 'x > 4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-054', category: 'math', ageLevel: 14, question: 'Solve: x² < 9', options: ['-3 < x < 3', 'x < 3', 'x > -3', 'x < 9'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-055', category: 'math', ageLevel: 14, question: 'Solve: x² ≥ 16', options: ['x≤-4 or x≥4', '-4≤x≤4', 'x ≥ 4', 'x ≤ -4'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Transformations of graphs
  { id: 'm14-056', category: 'math', ageLevel: 14, question: 'y=f(x)+3 is f(x) moved', options: ['Up 3', 'Right 3', 'Down 3', 'Left 3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-057', category: 'math', ageLevel: 14, question: 'y=f(x-2) is f(x) moved', options: ['Right 2', 'Left 2', 'Up 2', 'Down 2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-058', category: 'math', ageLevel: 14, question: 'y=-f(x) is f(x) reflected in', options: ['x-axis', 'y-axis', 'y=x', 'Origin'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-059', category: 'math', ageLevel: 14, question: 'y=f(-x) is f(x) reflected in', options: ['y-axis', 'x-axis', 'y=x', 'Origin'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-060', category: 'math', ageLevel: 14, question: 'y=2f(x) is f(x) stretched by factor 2 in', options: ['y-direction', 'x-direction', 'Both', 'Neither'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Probability trees
  { id: 'm14-061', category: 'math', ageLevel: 14, question: 'P(A)=0.3, P(B|A)=0.5. P(A and B)?', options: ['0.15', '0.8', '0.6', '0.35'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-062', category: 'math', ageLevel: 14, question: 'P(rain)=0.4 today and tomorrow. P(rain both)?', options: ['0.16', '0.8', '0.4', '0.2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-063', category: 'math', ageLevel: 14, question: 'P(at least one) = 1 - P(?)', options: ['None', 'All', 'One', 'Some'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-064', category: 'math', ageLevel: 14, question: 'Mutually exclusive: P(A or B) = ?', options: ['P(A)+P(B)', 'P(A)×P(B)', 'P(A)-P(B)', 'P(A)+P(B)-P(A∩B)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-065', category: 'math', ageLevel: 14, question: 'Independent: P(A and B) = ?', options: ['P(A)×P(B)', 'P(A)+P(B)', 'P(A|B)', 'P(B|A)'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Sequences
  { id: 'm14-066', category: 'math', ageLevel: 14, question: 'Sum of first 10 terms: a=3, d=2', options: ['120', '100', '130', '110'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-067', category: 'math', ageLevel: 14, question: 'nth term of geometric: a=2, r=3', options: ['2×3^(n-1)', '3×2^n', '2×3^n', '6^n'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-068', category: 'math', ageLevel: 14, question: '5th term: a=4, r=2', options: ['64', '32', '128', '16'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-069', category: 'math', ageLevel: 14, question: 'Common difference: 7, 11, 15, 19...', options: ['4', '3', '5', '8'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-070', category: 'math', ageLevel: 14, question: 'Sum of infinite geometric: a=6, r=1/2', options: ['12', '9', '6', '∞'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Area and volume
  { id: 'm14-071', category: 'math', ageLevel: 14, question: 'Volume of sphere r=3 (4/3πr³)', options: ['36π', '27π', '12π', '108π'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-072', category: 'math', ageLevel: 14, question: 'Surface area of sphere r=4', options: ['64π', '16π', '256π', '32π'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-073', category: 'math', ageLevel: 14, question: 'Volume of cone r=3, h=7', options: ['21π', '63π', '147π', '7π'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-074', category: 'math', ageLevel: 14, question: 'Similar shapes scale 1:3. Area ratio?', options: ['1:9', '1:3', '1:6', '1:27'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-075', category: 'math', ageLevel: 14, question: 'Similar shapes scale 1:2. Volume ratio?', options: ['1:8', '1:2', '1:4', '1:6'], correctAnswerIndex: 0, difficulty: 'medium' },
  
  // Algebraic fractions
  { id: 'm14-076', category: 'math', ageLevel: 14, question: 'Simplify: (x²-4)/(x+2)', options: ['x-2', 'x+2', 'x²-2', '(x-2)/(x+2)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-077', category: 'math', ageLevel: 14, question: 'Simplify: (x²-9)/(x-3)', options: ['x+3', 'x-3', 'x²+3', '(x+3)/(x-3)'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-078', category: 'math', ageLevel: 14, question: '1/x + 1/(x+1) = ?', options: ['(2x+1)/(x²+x)', '2/(2x+1)', '1/x²', '2x+1'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-079', category: 'math', ageLevel: 14, question: 'Solve: 2/(x-1) = 4', options: ['x = 1.5', 'x = 2', 'x = 0.5', 'x = 3'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-080', category: 'math', ageLevel: 14, question: 'Simplify: (2x)/(4x²)', options: ['1/(2x)', '2/x', 'x/2', '1/2'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Compound measures
  { id: 'm14-081', category: 'math', ageLevel: 14, question: 'Speed 60km/h for 2.5hrs. Distance?', options: ['150km', '24km', '62.5km', '57.5km'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-082', category: 'math', ageLevel: 14, question: 'Density = mass/volume. Mass=120g, V=30cm³', options: ['4 g/cm³', '150 g/cm³', '90 g/cm³', '3600 g/cm³'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-083', category: 'math', ageLevel: 14, question: 'Pressure = Force/Area. F=200N, A=4m²', options: ['50 Pa', '800 Pa', '196 Pa', '204 Pa'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-084', category: 'math', ageLevel: 14, question: 'Average speed: 100km in 2.5hrs', options: ['40 km/h', '250 km/h', '97.5 km/h', '102.5 km/h'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-085', category: 'math', ageLevel: 14, question: 'Time = Distance/Speed. D=180km, S=60km/h', options: ['3 hrs', '120 hrs', '240 hrs', '10800 hrs'], correctAnswerIndex: 0, difficulty: 'easy' },
  
  // Proof
  { id: 'm14-086', category: 'math', ageLevel: 14, question: 'Prove sum of 2 odds is even. Let odd = ?', options: ['2n+1', '2n', 'n+1', 'n'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-087', category: 'math', ageLevel: 14, question: 'Even number can be written as', options: ['2n', '2n+1', 'n+1', 'n/2'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-088', category: 'math', ageLevel: 14, question: 'Consecutive integers: n, n+1, n+2. Sum?', options: ['3n+3', '3n', 'n+3', '3'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-089', category: 'math', ageLevel: 14, question: 'Product of 2 evens (2m)(2n) = ?', options: ['4mn (even)', '2mn', 'mn', '4m+n'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-090', category: 'math', ageLevel: 14, question: 'n² - n = n(n-1). Always divisible by?', options: ['2', '3', '4', '5'], correctAnswerIndex: 0, difficulty: 'hard' },
  
  // Final questions
  { id: 'm14-091', category: 'math', ageLevel: 14, question: 'Solve: x² - 5x - 14 = 0', options: ['x=7, x=-2', 'x=-7, x=2', 'x=14, x=-1', 'x=7, x=2'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-092', category: 'math', ageLevel: 14, question: 'cos(45°) = ?', options: ['√2/2', '1', '0.5', '√3/2'], correctAnswerIndex: 0, difficulty: 'easy' },
  { id: 'm14-093', category: 'math', ageLevel: 14, question: 'Expand: (3x-2)²', options: ['9x²-12x+4', '9x²+4', '9x²-4', '6x-4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-094', category: 'math', ageLevel: 14, question: 'f(x)=x²-4, g(x)=2x. gf(3)=?', options: ['10', '14', '32', '5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-095', category: 'math', ageLevel: 14, question: 'Rationalize: 1/(1+√2)', options: ['√2-1', '1-√2', '1+√2', '(1-√2)/2'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-096', category: 'math', ageLevel: 14, question: 'Vector a=(2,5). |a|=?', options: ['√29', '7', '10', '√7'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-097', category: 'math', ageLevel: 14, question: 'Complete: x² + 8x + __ = (x+4)²', options: ['16', '64', '8', '4'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-098', category: 'math', ageLevel: 14, question: 'Inverse of f(x)=4x-5 is?', options: ['(x+5)/4', '4x+5', '(x-5)/4', 'x/4+5'], correctAnswerIndex: 0, difficulty: 'medium' },
  { id: 'm14-099', category: 'math', ageLevel: 14, question: 'sin 60° × cos 30° = ?', options: ['3/4', '1/2', '√3/2', '1'], correctAnswerIndex: 0, difficulty: 'hard' },
  { id: 'm14-100', category: 'math', ageLevel: 14, question: 'Surface area of cylinder r=2, h=5', options: ['28π', '20π', '40π', '8π'], correctAnswerIndex: 0, difficulty: 'hard' },
];
