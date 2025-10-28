
import { AnalysisType, AnalysisOption } from './types';

export const ANALYSIS_OPTIONS: AnalysisOption[] = [
  {
    key: AnalysisType.SUMMARY,
    label: 'ملخص شامل للكتاب',
    description: 'احصل على ملخص أكاديمي مفصل للمحتويات الكاملة للكتاب.',
  },
  {
    key: AnalysisType.KEY_POINTS,
    label: 'النقاط والمفاهيم الأساسية',
    description: 'استخراج أبرز المفاهيم والنقاط الجوهرية التي يركز عليها الكتاب.',
  },
  {
    key: AnalysisType.TOLERANCE_THEME,
    label: 'تحليل محور التسامح',
    description: 'تحليل معمق لكيفية تناول الكتاب لموضوع التسامح في الإسلام.',
  },
  {
    key: AnalysisType.ETHICAL_DIALOGUES,
    label: 'تحليل الحوارات الأخلاقية',
    description: 'استعراض وتحليل قسم الحوارات الأخلاقية وأهم الدروس المستفادة.',
  },
  {
    key: AnalysisType.CHAPTER_1_ANALYSIS,
    label: 'تحليل الموضوع الأول',
    description: 'تحليل تفصيلي للموضوع الأول: "سماحة الإسلام في معاملة أهل الأديان الأخرى".',
  },
];
