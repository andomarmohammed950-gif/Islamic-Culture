
import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex-shrink-0 bg-slate-800/50 shadow-md p-4 flex items-center justify-between md:justify-center relative">
      <button onClick={onMenuClick} className="md:hidden p-2 text-slate-400 hover:text-white transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-xl md:text-2xl font-bold text-center text-cyan-400 tracking-wider">
        محلل كتاب الثقافة الإسلامية
      </h1>
      <div className="md:hidden w-8"></div>
    </header>
  );
};

export default Header;
