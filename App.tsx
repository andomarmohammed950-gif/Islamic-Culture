import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, Lesson as LessonType, FinalExamKey } from './types';
import { getLessons } from './data';
import { getFinalExam } from './finalExamsData';
import { getUser, saveUser } from './services/storageService';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import FinalReport from './components/FinalReport';
import FinalExam from './components/FinalExam';

type View = 'welcome' | 'dashboard' | 'lesson' | 'quiz' | 'report' | 'finalExam';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<View>('welcome');
  const [activeLesson, setActiveLesson] = useState<LessonType | null>(null);
  const [activeExam, setActiveExam] = useState<ReturnType<typeof getFinalExam>>(null);
  const lessons = getLessons();

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      setView('dashboard');
    }
  }, []);
  
  const handleStart = (name: string) => {
    const newUser: UserProfile = {
      name,
      quizResults: {},
      finalExamResults: {},
    };
    setUser(newUser);
    saveUser(newUser);
    setView('dashboard');
  };

  const handleStartLesson = (lesson: LessonType) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleStartFinalExam = (examKey: FinalExamKey) => {
    const examData = getFinalExam(examKey);
    if (examData) {
        setActiveExam(examData);
        setView('finalExam');
    }
  };
  
  const handleQuizComplete = useCallback((lessonId: number, score: number, passed: boolean, incorrectAnswers: number[]) => {
    if (!user) return;
    
    const newResults = { ...user.quizResults, [lessonId]: { score, passed, incorrectAnswers } };
    
    const updatedUser = { ...user, quizResults: newResults };
    setUser(updatedUser);
    saveUser(updatedUser);

    setActiveLesson(null);
    setView('dashboard');
  }, [user]);

  const handleFinalExamComplete = useCallback((examKey: string, score: number) => {
    if (!user) return;

    const newResults = { 
        ...user.finalExamResults, 
        [examKey]: { score, date: new Date().toISOString() } 
    };
    
    const updatedUser = { ...user, finalExamResults: newResults };
    setUser(updatedUser);
    saveUser(updatedUser);

    setActiveExam(null);
    setView('dashboard');
  }, [user]);


  const handleViewDashboard = () => {
    setActiveLesson(null);
    setActiveExam(null);
    setView('dashboard');
  }

  const handleViewReport = () => {
    setView('report');
  }

  const handleResetProgress = () => {
    if (!user) return;
    const resetUser: UserProfile = {
      name: user.name,
      quizResults: {},
      finalExamResults: {},
    };
    setUser(resetUser);
    saveUser(resetUser);
    setView('dashboard');
  }

  const renderView = () => {
    switch (view) {
      case 'welcome':
        return <Welcome onStart={handleStart} />;
      case 'dashboard':
        if (!user) return <Welcome onStart={handleStart} />;
        return <Dashboard user={user} lessons={lessons} onStartLesson={handleStartLesson} onViewReport={handleViewReport} onStartFinalExam={handleStartFinalExam}/>;
      case 'lesson':
        if (!activeLesson) {
          setView('dashboard');
          return null;
        }
        return <Lesson lesson={activeLesson} onStartQuiz={handleStartQuiz} onBack={handleViewDashboard} failedQuizResult={user?.quizResults[activeLesson.id]} />;
      case 'quiz':
        if (!activeLesson || !user) {
          setView('dashboard');
          return null;
        }
        return <Quiz lesson={activeLesson} onComplete={handleQuizComplete} />;
      case 'report':
        if(!user) return null;
        return <FinalReport user={user} lessons={lessons} onReset={handleResetProgress} onBackToDashboard={handleViewDashboard}/>
      case 'finalExam':
        if (!activeExam || !user) {
            setView('dashboard');
            return null;
        }
        return <FinalExam exam={activeExam} onComplete={handleFinalExamComplete} onBack={handleViewDashboard} />;
      default:
        const savedUser = getUser();
        return savedUser ? <Dashboard user={savedUser} lessons={lessons} onStartLesson={handleStartLesson} onViewReport={handleViewReport} onStartFinalExam={handleStartFinalExam} /> : <Welcome onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-['Tajawal'] text-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto">
          {renderView()}
        </div>
      </main>
       <footer className="w-full mt-12 pt-8 pb-4 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-500 mt-6">تم تطوير هذا التطبيق بواسطة محمد بهاء</p>
          </div>
        </footer>
    </div>
  );
};

export default App;