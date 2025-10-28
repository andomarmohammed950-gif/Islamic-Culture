import React from 'react';
import { UserProfile, Lesson, FinalExamKey } from '../types';
import { finalExams } from '../finalExamsData';


interface DashboardProps {
  user: UserProfile;
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
  onViewReport: () => void;
  onStartFinalExam: (examKey: FinalExamKey) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, lessons, onStartLesson, onViewReport, onStartFinalExam }) => {
  
  const allQuizzesAttempted = Object.keys(user.quizResults).length === lessons.length;

  return (
    <div className="fade-in">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-800">مرحباً بك يا {user.name}</h1>
        <p className="text-gray-600 mt-2">جميع الدروس متاحة أمامك. اختر أي درس لتبدأ رحلتك التعليمية أو قم بإجراء الاختبارات النهائية.</p>
      </header>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">الدروس التعليمية</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const result = user.quizResults[lesson.id];
          
          let status: 'passed' | 'failed' | 'not_started' = 'not_started';
          if (result) {
            status = result.passed ? 'passed' : 'failed';
          }

          const statusStyles = {
            card: 'bg-white border-gray-200 shadow-sm hover:border-cyan-300',
            icon: 'text-gray-400',
            button: 'bg-cyan-600 hover:bg-cyan-700 text-white',
            titleText: 'text-gray-900',
            statusText: 'text-gray-500',
          };

          if (status === 'passed') {
            statusStyles.card = 'bg-green-50/80 border-green-200 shadow-sm';
            statusStyles.icon = 'text-green-600';
            statusStyles.statusText = 'text-green-700 font-semibold';
          } else if (status === 'failed') {
            statusStyles.card = 'bg-red-50/80 border-red-200 shadow-sm';
            statusStyles.icon = 'text-red-600';
            statusStyles.statusText = 'text-red-700 font-semibold';
          }

          return (
            <div key={lesson.id} className={`lesson-card p-6 rounded-2xl border flex flex-col ${statusStyles.card}`}>
              <div className="flex items-start mb-4">
                <div className={`p-2 bg-gray-100 rounded-full me-4`}>
                   {status === 'not_started' && <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${statusStyles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                  {status === 'failed' && <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${statusStyles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {status === 'passed' && <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${statusStyles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                </div>
                <div>
                    <h3 className={`text-xl font-bold ${statusStyles.titleText}`}>{lesson.title}</h3>
                    {result ? <p className={`text-sm mt-1 ${statusStyles.statusText}`}>النتيجة: {result.score}% - {result.passed ? 'ناجح' : 'راسب'}</p> : <p className="text-sm mt-1 text-gray-500">لم تبدأ بعد</p>}
                </div>
              </div>
              <div className="flex-grow"></div>
              <button
                onClick={() => onStartLesson(lesson)}
                className={`w-full mt-4 font-bold py-2 px-4 rounded-lg transition-all duration-200 ${statusStyles.button}`}
              >
                {status === 'not_started' ? 'ابدأ الدرس' : 'مراجعة الدرس'}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">الاختبارات النهائية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalExams.map(exam => {
                const result = user.finalExamResults[exam.key];
                return (
                    <div key={exam.key} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{exam.questions.length} سؤال</p>
                        {result && (
                            <p className="mt-2 text-sm font-semibold text-cyan-700">
                                آخر درجة: {result.score}%
                            </p>
                        )}
                        <div className="flex-grow"></div>
                        <button onClick={() => onStartFinalExam(exam.key)} className="w-full mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200">
                            {result ? 'إعادة الاختبار' : 'ابدأ الاختبار'}
                        </button>
                    </div>
                );
            })}
        </div>
      </div>


      {allQuizzesAttempted && (
        <div className="mt-10 text-center">
            <button onClick={onViewReport} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                عرض التقرير النهائي
            </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
