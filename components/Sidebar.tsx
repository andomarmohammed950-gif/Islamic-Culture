
import React from 'react';
import { AnalysisType, AnalysisOption } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: AnalysisOption[];
  onSelectAnalysis: (type: AnalysisType) => void;
  selectedAnalysis: AnalysisType | null;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, options, onSelectAnalysis, selectedAnalysis, isLoading }) => {
  const baseButtonClass = "w-full text-right p-3 my-1 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500/50";
  const selectedButtonClass = "bg-cyan-600 text-white shadow-lg";
  const unselectedButtonClass = "bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white";
  
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`flex flex-col bg-slate-800 shadow-2xl transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:relative md:w-80 lg:w-96 flex-shrink-0 p-4 space-y-4`}>
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">خيارات التحليل</h2>
             <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => onSelectAnalysis(option.key)}
              disabled={isLoading}
              className={`${baseButtonClass} ${selectedAnalysis === option.key ? selectedButtonClass : unselectedButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="font-semibold">{option.label}</div>
              <div className="text-xs opacity-80 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
        <div className="text-center text-xs text-slate-500 mt-auto pt-4">
          مدعوم بواسطة Gemini API
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
