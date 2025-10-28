import React from 'react';
import { UserProfile, Lesson } from '../types';

interface FinalReportProps {
  user: UserProfile;
  lessons: Lesson[];
  onReset: () => void;
  onBackToDashboard: () => void;
}

const FinalReport: React.FC<FinalReportProps> = ({ user, lessons, onReset, onBackToDashboard }) => {
  const attemptedLessonsCount = Object.keys(user.quizResults).length;
  const passedLessonsCount = Object.values(user.quizResults).filter(r => r.passed).length;
  
  const overallScore = attemptedLessonsCount > 0 
    ? Math.round(Object.values(user.quizResults).reduce((acc, r) => acc + r.score, 0) / attemptedLessonsCount)
    : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 fade-in max-w-3xl mx-auto">
      <header className="text-center border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-cyan-800">تقرير الأداء النهائي</h1>
        <p className="text-gray-700 mt-2 text-xl">هذا هو ملخص أدائك في الدورة يا {user.name}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">متوسط الدرجات الكلي</p>
          <p className="text-4xl font-bold text-cyan-700 mt-1">{overallScore}%</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">الدروس المكتملة بنجاح</p>
          <p className="text-4xl font-bold text-green-600 mt-1">{passedLessonsCount} / {lessons.length}</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">تفاصيل النتائج:</h2>
      <div className="space-y-3">
        {lessons.map(lesson => {
          const result = user.quizResults[lesson.id];
          if (!result) return (
             <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-100">
              <span className="font-semibold text-gray-500">{lesson.title}</span>
              <span className="font-bold text-sm text-gray-400">لم يتم المحاولة</span>
            </div>
          );
          const isPassed = result.passed;
          return (
            <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-lg ${isPassed ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className="font-semibold text-gray-800">{lesson.title}</span>
              <span className={`font-bold text-lg ${isPassed ? 'text-green-700' : 'text-red-700'}`}>{result.score}%</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onBackToDashboard} className="bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-all duration-200">
          العودة للدروس
        </button>
        <button onClick={onReset} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-all duration-200">
          إعادة الدورة من البداية
        </button>
      </div>
    </div>
  );
};

export default FinalReport;