import { Question, FinalExam } from './types';
import { getLessons } from './data';

const lessons = getLessons();

const getQuestionsForLessons = (lessonIds: number[]): Question[] => {
  return lessons
    .filter(lesson => lessonIds.includes(lesson.id))
    .flatMap(lesson => lesson.quiz);
};

// According to the curriculum plan:
// Semester 1: الموضوع الأول, الثاني, الثالث, and الحوار الأول والثاني. (Lessons 2, 3, 4, 5, 6). Also including intro (Lesson 1).
const semester1LessonIds = [1, 2, 3, 4, 5, 6];

// Semester 2: الحوار الثالث, الرابع, الخامس, السادس, السابع. (Lessons 7, 8, 9, 10, 11).
const semester2LessonIds = [7, 8, 9, 10, 11];

const allLessonIds = lessons.map(l => l.id);

// Function to shuffle an array and take the first N elements
const shuffleAndPick = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const semester1Questions = shuffleAndPick(getQuestionsForLessons(semester1LessonIds), 20);
const semester2Questions = shuffleAndPick(getQuestionsForLessons(semester2LessonIds), 20);
const comprehensiveQuestions = shuffleAndPick(getQuestionsForLessons(allLessonIds), 40);


export const finalExams: FinalExam[] = [
  {
    key: 'semester1',
    title: 'اختبار نهاية الفصل الدراسي الأول',
    questions: semester1Questions,
  },
  {
    key: 'semester2',
    title: 'اختبار نهاية الفصل الدراسي الثاني',
    questions: semester2Questions,
  },
  {
    key: 'comprehensive',
    title: 'الاختبار الشامل للفصلين',
    questions: comprehensiveQuestions,
  },
];

export const getFinalExam = (key: string): FinalExam | undefined => {
    return finalExams.find(exam => exam.key === key);
}
