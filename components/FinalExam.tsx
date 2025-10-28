import React, { useState } from 'react';
import { FinalExam as FinalExamType } from '../types';

interface FinalExamProps {
  exam: FinalExamType;
  onComplete: (examKey: string, score: number) => void;
  onBack: () => void;
}

const FinalExam: React.FC<FinalExamProps> = ({ exam, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = exam.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    exam.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score++;
      }
    });
    const finalScore = Math.round((score / exam.questions.length) * 100);
    onComplete(exam.key, finalScore);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 fade-in max-w-3xl mx-auto">
        <button onClick={onBack} className="text-cyan-600 hover:text-cyan-700 mb-4 font-semibold">&larr; العودة إلى لوحة التحكم</button>
      <h1 className="text-3xl font-bold text-cyan-800 mb-2">{exam.title}</h1>
      <p className="text-gray-500 mb-6">{`السؤال ${currentQuestionIndex + 1} من ${exam.questions.length}`}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease' }}></div>
      </div>

      <div key={currentQuestionIndex}>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-6 text-gray-900">{currentQuestion.text}</p>
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-right p-4 rounded-lg transition-colors duration-200 ${
                    isSelected 
                      ? "bg-cyan-100 ring-2 ring-cyan-500 border-cyan-500 text-cyan-900" 
                      : "bg-white hover:bg-gray-100 border border-gray-300 text-gray-800"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <button 
            onClick={handlePrev} 
            disabled={currentQuestionIndex === 0} 
            className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
          السابق
        </button>
        
        {currentQuestionIndex === exam.questions.length - 1 ? (
          <button 
            onClick={handleSubmit} 
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition">
            إنهاء وتسليم الاختبار
          </button>
        ) : (
          <button onClick={handleNext} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition">
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default FinalExam;
