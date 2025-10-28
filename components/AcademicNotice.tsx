
import React from 'react';

interface AcademicNoticeProps {
  onAgree: () => void;
}

const AcademicNotice: React.FC<AcademicNoticeProps> = ({ onAgree }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
      <div className="w-full max-w-xl bg-slate-800 border border-yellow-500/50 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          ⚠️ تنويه أكاديمي هام
        </h2>
        <div className="text-slate-300 space-y-4">
          <p>
            هذا القسم مخصص للدراسة الأكاديمية والتاريخية فقط للفهم العام لتطور الفكر الإسلامي عبر العصور.
          </p>
          <p>
            الغرض من الدراسة هو المعرفة التاريخية بالتراث الإسلامي، فهم تطور المناهج العقدية، والدراسة المقارنة للمذاهب.
          </p>
          <p className="font-bold text-slate-100">
             المنهج الحق هو منهج السلف الصالح من الصحابة والتابعين وهو الذي يجب أن يكون عليه اعتقاد كل مسلم.
          </p>
        </div>
        <button
          onClick={onAgree}
          className="w-full mt-8 bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-700 transition-all duration-200"
        >
          أوافق وأبدأ التعلم
        </button>
      </div>
    </div>
  );
};

export default AcademicNotice;
