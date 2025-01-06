// src/services/questionService.ts
import questionsData from '../data/questions.json';
import rawExamWeightingsData from '../data/examWeightings.json';
const examWeightingsData = rawExamWeightingsData as ExamWeightingsData;

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  tags: string[];
}

// interface ExamWeightings {
//   [domain: string]: number;
// }

// The shape of each exam's domain percentages:
interface DomainPercentages {
    [domainName: string]: number;
  }
  
  // The shape of the entire file, keyed by exam name:
  interface ExamWeightingsData {
    [examName: string]: DomainPercentages;
  }

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function selectRandomFromArray<T>(arr: T[], n: number): T[] {
  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, n);
}

/**
 * Returns a random subset of questions from the entire pool.
 */
export function getRandomQuizQuestions(numberOfQuestions: number): Question[] {
  const questionPool = questionsData as Question[];
  return selectRandomFromArray(questionPool, numberOfQuestions);
}

/**
 * Returns questions based on weighting percentages for each domain.
 */
export function getWeightedExamQuestions(examName: string, totalQuestions: number): Question[] {
  const questionPool = questionsData as Question[];
  const examWeightings = examWeightingsData[examName];

  let selectedQuestions: Question[] = [];
  let sum = 0; // track how many we've picked so far

  Object.keys(examWeightings).forEach((domain) => {
    const percent = examWeightings[domain];
    const count = Math.round((percent / 100) * totalQuestions);

    // Filter question by domain tag
    const domainQuestions = questionPool.filter(q => q.tags.includes(domain));
    const chosen = selectRandomFromArray(domainQuestions, count);

    selectedQuestions.push(...chosen);
    sum += count;
  });

  // If rounding left a gap or overshoot, handle that here (optional).
  // e.g., if sum < totalQuestions, pick more from the largest domain or so.
  
  return shuffleArray(selectedQuestions);
}
