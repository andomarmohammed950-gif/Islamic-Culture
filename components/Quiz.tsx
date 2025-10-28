import React, { useState } from 'react';
import { Lesson as LessonType } from '../types';

interface QuizProps {
  lesson: LessonType;
  onComplete: (lessonId: number, score: number, passed: boolean, incorrectAnswers: number[]) => void;
}

const PASS_PERCENTAGE = 70;

const Quiz: React.FC<QuizProps> = ({ lesson, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  const currentQuestion = lesson.quiz[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => [...prev, currentQuestionIndex]);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < lesson.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finished
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / lesson.quiz.length) * 100);
      const finalIncorrect = isCorrect ? incorrectAnswers : [...incorrectAnswers, currentQuestionIndex];
      onComplete(lesson.id, finalScore, finalScore >= PASS_PERCENTAGE, finalIncorrect);
    }
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / lesson.quiz.length) * 100;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 fade-in max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-800 mb-2">{`اختبار: ${lesson.title}`}</h1>
      <p className="text-gray-500 mb-6">{`السؤال ${currentQuestionIndex + 1} من ${lesson.quiz.length}`}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease' }}></div>
      </div>

      <div key={currentQuestionIndex}>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-6 text-gray-900">{currentQuestion.text}</p>
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              let buttonClass = "bg-white hover:bg-gray-100 border border-gray-300 text-gray-800";
              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass = "bg-green-600 text-white border-green-600";
                } else if (option === selectedAnswer) {
                  buttonClass = "bg-red-600 text-white border-red-600";
                } else {
                  buttonClass = "bg-white border-gray-300 text-gray-800 opacity-70"
                }
              } else if (option === selectedAnswer) {
                  buttonClass = "bg-cyan-100 ring-2 ring-cyan-500 border-cyan-500 text-cyan-900";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && setSelectedAnswer(option)}
                  className={`w-full text-right p-4 rounded-lg ${buttonClass} disabled:cursor-not-allowed transition-colors duration-200`}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {isAnswered && (
        <div className={`mt-6 p-4 rounded-lg text-sm fade-in ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
          <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة.'}
          </p>
          {!isCorrect && <p className="mt-1 text-red-700">{currentQuestion.feedback}</p>}
        </div>
      )}

      <div className="mt-8 text-center">
        {!isAnswered ? (
          <button onClick={handleAnswer} disabled={!selectedAnswer} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            تأكيد الإجابة
          </button>
        ) : (
          <button onClick={handleNext} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition fade-in">
            {currentQuestionIndex < lesson.quiz.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;