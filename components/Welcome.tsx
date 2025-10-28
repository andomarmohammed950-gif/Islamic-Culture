import React, { useState } from 'react';

interface WelcomeProps {
  onStart: (name: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 fade-in">
      <div className="w-full max-w-md text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-cyan-700 mb-2">
          أهلاً بك في دورة الثقافة الإسلامية
        </h1>
        <p className="text-gray-600 mb-8">
          منصة تفاعلية لتعلم مبادئ الثقافة الإسلامية من خلال ملخصات و اختبارات ذكية.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            الرجاء إدخال اسمك للبدء
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="الاسم الكريم"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-6"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            ابدأ رحلتك التعليمية
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;