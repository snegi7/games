import type { Question, QuestionCategory } from '@/types';
import { mathQuestionsAge6 } from './math/age6';
import { mathQuestionsAge7 } from './math/age7';
import { mathQuestionsAge8 } from './math/age8';
import { mathQuestionsAge9 } from './math/age9';
import { mathQuestionsAge10 } from './math/age10';
import { mathQuestionsAge11 } from './math/age11';
import { mathQuestionsAge12 } from './math/age12';
import { mathQuestionsAge13 } from './math/age13';
import { mathQuestionsAge14 } from './math/age14';

// ============================================
// QUESTION DATA STRUCTURE
// Questions are organized by category and age level
// Easy to add new categories or age levels
// ============================================

type QuestionBank = {
  [key in QuestionCategory]?: {
    [age: number]: Question[];
  };
};

const questionBank: QuestionBank = {
  math: {
    6: mathQuestionsAge6,
    7: mathQuestionsAge7,
    8: mathQuestionsAge8,
    9: mathQuestionsAge9,
    10: mathQuestionsAge10,
    11: mathQuestionsAge11,
    12: mathQuestionsAge12,
    13: mathQuestionsAge13,
    14: mathQuestionsAge14,
  },
  // Add more categories here:
  // geography: { 6: geographyQuestionsAge6, ... },
  // science: { 6: scienceQuestionsAge6, ... },
};

// Get questions for a specific category and age
export function getQuestions(
  category: QuestionCategory,
  age: number
): Question[] {
  const categoryQuestions = questionBank[category];
  if (!categoryQuestions) {
    console.warn(`No questions found for category: ${category}`);
    return [];
  }
  
  const ageQuestions = categoryQuestions[age];
  if (!ageQuestions) {
    // Fallback to closest age if exact age not found
    const ages = Object.keys(categoryQuestions).map(Number).sort((a, b) => a - b);
    const closestAge = ages.reduce((prev, curr) => 
      Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
    );
    console.warn(`No questions for age ${age}, falling back to age ${closestAge}`);
    return categoryQuestions[closestAge] || [];
  }
  
  return ageQuestions;
}

// Get a random selection of questions
export function getRandomQuestions(
  category: QuestionCategory,
  age: number,
  count: number
): Question[] {
  const questions = [...getQuestions(category, age)];
  const shuffled = questions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get all available categories
export function getAvailableCategories(): QuestionCategory[] {
  return Object.keys(questionBank) as QuestionCategory[];
}

// Get available age levels for a category
export function getAvailableAges(category: QuestionCategory): number[] {
  const categoryQuestions = questionBank[category];
  if (!categoryQuestions) return [];
  return Object.keys(categoryQuestions).map(Number).sort((a, b) => a - b);
}
