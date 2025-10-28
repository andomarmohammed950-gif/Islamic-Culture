// Fix: Added missing AnalysisType enum and AnalysisOption interface.
export enum AnalysisType {
  SUMMARY = 'summary',
  KEY_POINTS = 'key_points',
  TOLERANCE_THEME = 'tolerance_theme',
  ETHICAL_DIALOGUES = 'ethical_dialogues',
  CHAPTER_1_ANALYSIS = 'chapter_1_analysis',
}

export interface AnalysisOption {
  key: AnalysisType;
  label: string;
  description: string;
}

export type FinalExamKey = 'semester1' | 'semester2' | 'comprehensive';

export interface FinalExamResult {
  score: number;
  date: string;
}

export interface UserProfile {
  name: string;
  quizResults: Record<number, QuizResult>;
  finalExamResults: Record<string, FinalExamResult>;
}

export interface QuizResult {
  score: number;
  passed: boolean;
  incorrectAnswers: number[]; // Array of question indices
}

export type QuestionType = 'mcq' | 'tf';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  feedback: string;
  relatedContentKey: string;
}

export interface Lesson {
  id: number;
  title: string;
  objectives: string[];
  content: string; // Markdown format
  summaryPoints: string[];
  quiz: Question[];
}

export interface FinalExam {
    key: FinalExamKey;
    title: string;
    questions: Question[];
}
