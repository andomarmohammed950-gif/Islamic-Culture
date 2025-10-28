import React, { useMemo } from 'react';
import { Lesson as LessonType, QuizResult } from '../types';

interface LessonProps {
  lesson: LessonType;
  onStartQuiz: () => void;
  onBack: () => void;
  failedQuizResult?: QuizResult;
}

const Lesson: React.FC<LessonProps> = ({ lesson, onStartQuiz, onBack, failedQuizResult }) => {
    const keysToHighlight = useMemo(() => {
        if (!failedQuizResult || failedQuizResult.passed) return new Set();
        
        const incorrectQuestionIndices = failedQuizResult.incorrectAnswers;
        const keys = incorrectQuestionIndices.map(index => lesson.quiz[index]?.relatedContentKey);
        return new Set(keys.filter(Boolean));
    }, [failedQuizResult, lesson.quiz]);

    const renderContent = (content: string) => {
        return content.split('\n').map((line, index) => {
            const keyMatch = line.match(/\[KEY:(\w+)]/);
            const key = keyMatch ? keyMatch[1] : null;
            const cleanLine = line.replace(/\[KEY:(\w+)]/, '').trim();
            const isHighlighted = key && keysToHighlight.has(key);

            let element;
            if (cleanLine.startsWith('### ')) {
                element = <h3 key={index} className="text-xl font-bold mt-6 mb-2 text-cyan-700">{cleanLine.substring(4)}</h3>;
            } else if (cleanLine.startsWith('## ')) {
                element = <h2 key={index} className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-200 pb-2 text-cyan-800">{cleanLine.substring(3)}</h2>;
            } else if (cleanLine.startsWith('- ')) {
                element = <li key={index} className="ms-6 my-2 text-gray-700">{cleanLine.substring(2)}</li>;
            } else if (cleanLine) {
                element = <p key={index} className="my-4 leading-relaxed text-gray-800">{cleanLine}</p>;
            } else {
                return null;
            }

            if (isHighlighted) {
                return (
                    <div key={index} className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-2 rounded-md">
                        <p className="font-bold text-yellow-800 text-sm mb-1">
                            💡 نقطة للمراجعة
                        </p>
                        {React.cloneElement(element, { className: `${element.props.className} text-gray-900`})}
                    </div>
                );
            }

            return element;
        });
    };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 fade-in max-w-4xl mx-auto">
      <header className="border-b border-gray-200 pb-4 mb-6">
        <button onClick={onBack} className="text-cyan-600 hover:text-cyan-700 mb-4 font-semibold">&larr; العودة إلى قائمة الدروس</button>
        <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
      </header>
      
      {lesson.id === 4 && (
        <div className="academic-warning bg-amber-50 border-r-4 border-amber-400 text-amber-900 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-bold mb-4">📚 دراسة المذهب الأشعري - تنويه منهجي مهم</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold mb-1">تحذير وإبراء للذمة:</h3>
              <p>يؤكد المطور أن محتوى هذا الدرس يُقدَم للغرض الأكاديمي والدراسي فقط، كمادة معرفية في تاريخ تطور الفكر الإسلامي. وليس المقصود منه التفقه أو الاعتقاد بهذا المذهب.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">الغرض العلمي:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>دراسة تاريخية تحليلية لتطور المدارس الكلامية</li>
                <li>فهم السياق التاريخي لظهور المذاهب العقدية</li>
                <li>المقارنة الأكاديمية بين مناهج الاستدلال</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-green-700">التأكيد على المنهج الحق:</h3>
              <ul className="list-disc list-inside space-y-1 text-green-800">
                <li>المنهج الحق هو منهج السلف الصالح من الصحابة والتابعين</li>
                <li>وهو الذي يجب أن يكون عليه اعتقاد كل مسلم</li>
                <li>نبرأ ذمتنا من أي مخالفة لهذا المنهج</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold mb-2">تحذيرات استخدام المحتوى:</h3>
              <ul className="space-y-1">
                <li className="flex items-center"><span className="text-red-600 me-2">❌</span> لا يجوز اتخاذ هذا الدرس للتفقه أو الاعتقاد</li>
                <li className="flex items-center"><span className="text-green-600 me-2">✅</span> يقدم فقط للفهم الأكاديمي والتاريخي</li>
                <li className="flex items-center"><span className="text-blue-600 me-2">🎯</span> الغاية: المعرفة بالتراث الإسلامي وليس الاعتقاد به</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {failedQuizResult && !failedQuizResult.passed && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
            <h3 className="font-bold">لقد رسبت في الاختبار السابق.</h3>
            <p className="text-sm">لقد قمنا بتحديد النقاط المتعلقة بالأسئلة التي أخطأت فيها لمساعدتك على المراجعة.</p>
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-700 mb-3">أهداف الدرس</h2>
        <ul className="list-disc pe-8 space-y-2 text-gray-700">
          {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
        </ul>
      </section>

      <article className="prose max-w-none mb-8">
        {renderContent(lesson.content)}
      </article>

      <section className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-cyan-700 mb-3">خلاصة سريعة - نقاط يجب تذكرها</h2>
        <ul className="list-disc pe-8 space-y-2 text-gray-700">
          {lesson.summaryPoints.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </section>

      <button onClick={onStartQuiz} className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg">
        ابدأ الاختبار
      </button>
    </div>
  );
};

export default Lesson;