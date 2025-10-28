
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ContentDisplayProps {
  isLoading: boolean;
  content: string;
  error: string | null;
  hasSelection: boolean;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ isLoading, content, error, hasSelection }) => {
  const renderFormattedContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('###')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-2 text-cyan-400">{paragraph.replace('###', '').trim()}</h3>;
      }
      if (paragraph.trim().startsWith('##')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 border-b-2 border-slate-700 pb-2 text-cyan-300">{paragraph.replace('##', '').trim()}</h2>;
      }
      if (paragraph.trim().startsWith('* ')) {
        return <li key={index} className="ms-6 my-1">{paragraph.replace('*', '').trim()}</li>;
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="my-4 leading-relaxed text-slate-300">{paragraph}</p>;
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-slate-400 animate-pulse">...جاري التحليل باستخدام الذكاء الاصطناعي</p>
        <p className="mt-2 text-sm text-slate-500">قد يستغرق هذا بعض الوقت.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-6 rounded-lg max-w-md text-center">
          <h3 className="font-bold text-xl mb-2">حدث خطأ</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!hasSelection) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div className="max-w-xl">
            <svg className="mx-auto h-24 w-24 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V21M12 12.75h.008v.008H12v-.008Z" />
            </svg>
            <h2 className="text-3xl font-bold text-slate-400 mt-4">مرحباً بك في محلل الكتب</h2>
            <p className="mt-4 text-slate-500">
            اختر أحد خيارات التحليل من القائمة الجانبية لبدء استكشاف محتوى كتاب "الثقافة الإسلامية". سيقوم الذكاء الاصطناعي بتزويدك بملخصات وتحليلات معمقة.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-xl shadow-inner max-w-4xl mx-auto w-full">
      <article className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-cyan-400">
        {renderFormattedContent(content)}
      </article>
    </div>
  );
};

export default ContentDisplay;
