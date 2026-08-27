import React, { useState, useMemo } from "react";
import {
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  Shuffle,
  Layers,
  BarChart2,
  ArrowLeft,
  Filter,
  History,
  Search,
  Check,
  Award,
  HelpCircle,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { ExamType, SubjectType, Question, LanguageMode, MistakeItem, TestResultData } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam } from "../data/chaptersData";
import { buildGuaranteedNonRepeatingMock } from "../utils/proceduralQuestionEngine";

interface MockTestSetupProps {
  currentExam: ExamType;
  questions: Question[];
  language: LanguageMode;
  mistakes?: MistakeItem[];
  practiceStats?: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  testHistory?: TestResultData[];
  onStartTest: (config: {
    title: string;
    exam: ExamType;
    subject: SubjectType | "All";
    chapterFilter: string;
    durationMinutes: number;
    questionCount: number;
    selectedQuestions: Question[];
  }) => void;
  onOpenAiGenerator: () => void;
  onBack?: () => void;
  onViewResult?: (res: TestResultData) => void;
}

export const MockTestSetup: React.FC<MockTestSetupProps> = ({
  currentExam,
  questions,
  language,
  mistakes = [],
  practiceStats,
  testHistory = [],
  onStartTest,
  onOpenAiGenerator,
  onBack,
  onViewResult,
}) => {
  // Default to 'category' (चॅप्टरनिहाय सराव) so students see chapters first and clearly!
  const [activeMainTab, setActiveMainTab] = useState<"category" | "full_mock" | "result">("category");

  // Subject Selection for Chapter Wise Test
  const availableSubjects = useMemo(() => getSubjectsForExam(currentExam), [currentExam]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>(availableSubjects[0] || "Physics");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(25);
  const [searchChapterText, setSearchChapterText] = useState<string>("");

  // Ensure selected subject is valid for current exam
  const currentSubject = useMemo(() => {
    if (availableSubjects.includes(selectedSubject)) return selectedSubject;
    return availableSubjects[0] || "Physics";
  }, [availableSubjects, selectedSubject]);

  // Duration mapping based on question count
  const getDurationForTier = (count: number): number => {
    switch (count) {
      case 10:
        return 15;
      case 20:
        return 25;
      case 25:
        return 35;
      case 30:
        return 40;
      case 50:
        return 60;
      case 100:
        return 120;
      default:
        return Math.max(15, Math.round(count * 1.3));
    }
  };

  // Filtered Chapters based on subject and search query
  const filteredChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => {
      const matchExam = ch.exams.includes(currentExam);
      const matchSubject = ch.subject === currentSubject;
      if (!matchExam || !matchSubject) return false;

      if (!searchChapterText.trim()) return true;
      const query = searchChapterText.toLowerCase().trim();
      return (
        ch.name.toLowerCase().includes(query) ||
        ch.nameMr.toLowerCase().includes(query)
      );
    });
  }, [currentExam, currentSubject, searchChapterText]);

  // Launch Test for a specific Chapter
  const handleStartChapterTest = (chapterName: string, count: number) => {
    const duration = getDurationForTier(count);
    const chosen = buildGuaranteedNonRepeatingMock(
      currentExam,
      currentSubject,
      chapterName,
      count,
      questions
    );

    const chapterDisplayName = chapterName === "All" ? `सर्व धडे एकत्र (${currentSubject})` : chapterName;
    const testTitle = `${currentExam} • ${currentSubject} • ${chapterDisplayName} (${chosen.length} प्रश्न • ${duration} मिनिटे)`;

    onStartTest({
      title: testTitle,
      exam: currentExam,
      subject: currentSubject,
      chapterFilter: chapterName,
      durationMinutes: duration,
      questionCount: chosen.length,
      selectedQuestions: chosen,
    });
  };

  // Full Syllabus Mock Tests List
  const fullMockTests = useMemo(() => {
    const isPCM = currentExam === "JEE_MAIN" || currentExam === "MHT_CET";

    return [
      {
        id: "mock-full-s1",
        title: `${currentExam} संपूर्ण अभ्यासक्रम महा-मॉक टेस्ट (Full Syllabus Mock)`,
        subtitle: "सर्व विषयांचे एकत्र प्रश्न, अधिकृत बोर्ड व NTA पॅटर्ननुसार अचूक परीक्षा स्वरूप",
        subject: "All" as const,
        chapter: "All",
        questionsCount: currentExam === "NEET" ? 180 : currentExam === "JEE_MAIN" ? 75 : 150,
        durationMinutes: 180,
        totalMarks: currentExam === "NEET" ? 720 : currentExam === "JEE_MAIN" ? 300 : 200,
        badge: "Full Syllabus",
        badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
      },
      {
        id: "mock-physics-full",
        title: `${currentExam} Physics संपूर्ण विषय टेस्ट (All Physics Chapters)`,
        subtitle: "भौतिकशास्त्राच्या सर्व ११वी व १२वी च्या धड्यांवर आधारित ५० प्रश्नांचा संच",
        subject: "Physics" as SubjectType,
        chapter: "All",
        questionsCount: 50,
        durationMinutes: 60,
        totalMarks: 50,
        badge: "Physics 50Q",
        badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
      },
      {
        id: "mock-chemistry-full",
        title: `${currentExam} Chemistry संपूर्ण विषय टेस्ट (Organic + Inorganic + Physical)`,
        subtitle: "रसायनशास्त्राच्या सर्व घटकांवर आधारित महत्त्वाचे ५० प्रश्न",
        subject: "Chemistry" as SubjectType,
        chapter: "All",
        questionsCount: 50,
        durationMinutes: 60,
        totalMarks: 50,
        badge: "Chemistry 50Q",
        badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      },
      {
        id: isPCM ? "mock-maths-full" : "mock-bio-full",
        title: isPCM
          ? `${currentExam} Mathematics संपूर्ण गणित टेस्ट (Calculus, Vectors & Algebra)`
          : `${currentExam} Biology संपूर्ण जीवशास्त्र टेस्ट (Botany + Zoology 360 Marks)`,
        subtitle: isPCM
          ? "गणिताच्या सर्व धड्यांवरील ५० महत्त्वाचे २-गुणांचे प्रश्न"
          : "NCERT लाइन-बाय-लाइन आधारित ९० प्रश्न",
        subject: (isPCM ? "Mathematics" : "Biology") as SubjectType,
        chapter: "All",
        questionsCount: isPCM ? 50 : 90,
        durationMinutes: 90,
        totalMarks: isPCM ? 100 : 360,
        badge: isPCM ? "Maths 100 Marks" : "Bio 360 Marks",
        badgeColor: isPCM
          ? "bg-amber-100 text-amber-900 border-amber-200"
          : "bg-emerald-100 text-emerald-900 border-emerald-200",
      },
      {
        id: "mock-quick-speed",
        title: `${currentExam} दैनिक १५ मिनिटे स्पीड चॅलेंज (Daily Speed Test)`,
        subtitle: "वेळेचे अचूक नियोजन आणि उच्च अचूकतेसाठी जलद १० प्रश्न",
        subject: "All" as const,
        chapter: "All",
        questionsCount: 10,
        durationMinutes: 15,
        totalMarks: 10,
        badge: "Quick 10Q",
        badgeColor: "bg-rose-100 text-rose-900 border-rose-200",
      },
    ];
  }, [currentExam]);

  // Subject Details Helper (Icons, Marathi Names, Colors)
  const getSubjectMeta = (subj: SubjectType) => {
    switch (subj) {
      case "Physics":
        return {
          nameMr: "भौतिकशास्त्र (Physics)",
          desc: "नियम, सूत्रे व गणिते",
          color: "bg-blue-600 text-white",
          activeBorder: "border-blue-600 bg-blue-50/80 text-blue-900",
          iconBg: "bg-blue-100 text-blue-700",
          tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "Chemistry":
        return {
          nameMr: "रसायनशास्त्र (Chemistry)",
          desc: "ऑर्गेनिक, इनऑर्गेनिक व फिजिकल",
          color: "bg-purple-600 text-white",
          activeBorder: "border-purple-600 bg-purple-50/80 text-purple-900",
          iconBg: "bg-purple-100 text-purple-700",
          tagColor: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "Mathematics":
        return {
          nameMr: "गणित (Mathematics)",
          desc: "कॅल्क्युलस, त्रिकोणमिती व भूमिती",
          color: "bg-amber-600 text-white",
          activeBorder: "border-amber-600 bg-amber-50/80 text-amber-900",
          iconBg: "bg-amber-100 text-amber-700",
          tagColor: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "Biology":
        return {
          nameMr: "जीवशास्त्र (Biology)",
          desc: "वनस्पती व प्राण्यांचे वर्गीकरण",
          color: "bg-emerald-600 text-white",
          activeBorder: "border-emerald-600 bg-emerald-50/80 text-emerald-900",
          iconBg: "bg-emerald-100 text-emerald-700",
          tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return {
          nameMr: subj,
          desc: "सराव चाचण्या",
          color: "bg-indigo-600 text-white",
          activeBorder: "border-indigo-600 bg-indigo-50/80 text-indigo-900",
          iconBg: "bg-indigo-100 text-indigo-700",
          tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-4 animate-in fade-in">
      {/* 1. TOP HEADER & BACK NAVIGATION */}
      <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {currentExam} चाचणी केंद्र (Mock Test Hub)
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 text-[10px] font-black uppercase">
                {currentExam}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              धडानिहाय (Chapter-wise) सराव करा किंवा संपूर्ण परीक्षेची मॉक टेस्ट द्या
            </p>
          </div>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">मुख्य मेनू</span>
          </button>
        )}
      </div>

      {/* 2. THREE CLEAR MAIN TABS (सोपे ३ टॅब) */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-200/90 dark:bg-slate-800 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveMainTab("category")}
          className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMainTab === "category"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-black shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="truncate">१. धडानिहाय टेस्ट (Chapters)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("full_mock")}
          className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMainTab === "full_mock"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-black shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="truncate">२. संपूर्ण विषय टेस्ट (Full Mocks)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("result")}
          className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMainTab === "result"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-black shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span className="truncate">३. निकाल व विश्लेषण ({testHistory.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CHAPTER-WISE MOCK TESTS (धडानिहाय सराव - अतिशय सोपे आणि स्पष्ट) */}
      {/* ========================================================================= */}
      {activeMainTab === "category" && (
        <div className="space-y-4">
          {/* STEP 1: SELECT SUBJECT (पायरी १: विषय निवडा) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                  १
                </span>
                <span>पायरी १: विषय निवडा (Select Subject):</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                निवडलेला विषय: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{currentSubject}</strong>
              </span>
            </div>

            {/* Big Subject Selection Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableSubjects.map((sub) => {
                const meta = getSubjectMeta(sub);
                const isSelected = currentSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? `${meta.activeBorder} shadow-sm scale-101 ring-2 ring-indigo-500/20`
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${meta.iconBg}`}>
                        {sub === "Physics" ? "⚡" : sub === "Chemistry" ? "🧪" : sub === "Mathematics" ? "📐" : "🌿"}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {sub}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {meta.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT NUMBER OF QUESTIONS (पायरी २: चाचणीचा आकार निवडा) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                  २
                </span>
                <span>पायरी २: किती प्रश्नांची टेस्ट द्यायची आहे? (Select Questions Count):</span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { count: 10, label: "१० प्रश्न", time: "१५ मिनिटे", tag: "⚡ जलद सराव" },
                { count: 25, label: "२५ प्रश्न", time: "३५ मिनिटे", tag: "🎯 स्टँडर्ड टेस्ट" },
                { count: 50, label: "५० प्रश्न", time: "६० मिनिटे", tag: "🔥 सखोल सराव" },
                { count: 100, label: "१०० प्रश्न", time: "१२० मिनिटे", tag: "🏆 महा-सराव" },
              ].map((tier) => {
                const isSelected = selectedQuestionCount === tier.count;
                return (
                  <button
                    key={tier.count}
                    type="button"
                    onClick={() => setSelectedQuestionCount(tier.count)}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      {tier.tag}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {tier.label}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      ⏱️ {tier.time}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: CHAPTER LIST & INSTANT START (पायरी ३: धडा निवडून टेस्ट सुरू करा) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                    ३
                  </span>
                  <span>पायरी ३: धडा निवडा आणि 'सुरू करा' वर क्लिक करा:</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-6">
                  {currentSubject} चे एकूण {filteredChapters.length} धडे उपलब्ध आहेत
                </p>
              </div>

              {/* Search Bar for Chapters */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="धड्याचे नाव शोधा (उदा. Rotational...)"
                  value={searchChapterText}
                  onChange={(e) => setSearchChapterText(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Quick Button: All Chapters Combined */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 font-black">
                  <Shuffle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black">
                    {currentSubject} चे सर्व धडे एकत्र (Full Subject Test)
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    संपूर्ण {currentSubject} मधील सर्व धड्यांतून एकत्रित {selectedQuestionCount} प्रश्नांची टेस्ट
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartChapterTest("All", selectedQuestionCount)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>एकत्रित टेस्ट सुरू करा ({selectedQuestionCount} प्रश्न)</span>
              </button>
            </div>

            {/* Clean Chapter Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredChapters.map((ch, idx) => {
                return (
                  <div
                    key={`${ch.name}_${idx}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          धडा क्र. {idx + 1}
                        </span>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            ch.weightage === "High"
                              ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300"
                          }`}
                        >
                          ⭐ {ch.weightage} Weightage
                        </span>
                      </div>

                      {/* Chapter Names */}
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-2 leading-snug">
                        {ch.nameMr || ch.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {ch.name}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        ⏱️ {getDurationForTier(selectedQuestionCount)} मिनिटे
                      </span>

                      <button
                        type="button"
                        onClick={() => handleStartChapterTest(ch.name, selectedQuestionCount)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>टेस्ट द्या ({selectedQuestionCount} प्रश्न) →</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredChapters.length === 0 && (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
                कोणताही धडा सापडला नाही. कृपया शोध शब्द तपासा.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FULL SYLLABUS MOCKS (संपूर्ण अभ्यासक्रम चाचण्या) */}
      {/* ========================================================================= */}
      {activeMainTab === "full_mock" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {currentExam} संपूर्ण विषय व ग्रँड चाचण्या (Full Syllabus Tests)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                प्रत्यक्ष परीक्षेच्या वातावरणाचा सराव करण्यासाठी संपूर्ण अभ्यासक्रमाच्या टेस्ट्स
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAiGenerator}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI टेस्ट मेकर</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {fullMockTests.map((test) => {
              const pastAttempt = testHistory.find(
                (th) => th.title.includes(test.title) || th.title.includes(test.id)
              );

              return (
                <div
                  key={test.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase border ${test.badgeColor}`}>
                        {test.badge}
                      </span>
                      {pastAttempt ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-emerald-100 text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          गुण: {pastAttempt.score}/{pastAttempt.maxMarks}
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          नवीन
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {test.subtitle}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-bold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        {test.durationMinutes} मिनिटे
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        {test.questionsCount} प्रश्न
                      </span>
                      <span>•</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {test.totalMarks} गुण
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const count = Math.min(test.questionsCount, questions.length);
                      const chosen = buildGuaranteedNonRepeatingMock(
                        currentExam,
                        test.subject,
                        test.chapter,
                        count,
                        questions
                      );

                      onStartTest({
                        title: test.title,
                        exam: currentExam,
                        subject: test.subject,
                        chapterFilter: test.chapter,
                        durationMinutes: test.durationMinutes,
                        questionCount: chosen.length,
                        selectedQuestions: chosen,
                      });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{pastAttempt ? "पुन्हा टेस्ट द्या (Re-attempt)" : "चाचणी सुरू करा (Start Test)"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TEST RESULTS & HISTORY (माझे निकाल) */}
      {/* ========================================================================= */}
      {activeMainTab === "result" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              सोडवलेल्या सर्व चाचण्यांचे निकाल ({testHistory.length})
            </h2>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <History className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                अद्याप कोणतीही चाचणी सोडवलेली नाही
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                धडानिहाय टेस्ट किंवा संपूर्ण मॉक टेस्ट सोडवा. तुमचा निकाल, अचूकता आणि बरोबर-चूक प्रश्न येथे दिसतील.
              </p>
              <button
                type="button"
                onClick={() => setActiveMainTab("category")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs shadow-xs cursor-pointer"
              >
                पहिली धडानिहाय टेस्ट सुरू करा →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {testHistory.map((res, index) => (
                <div
                  key={`${res.testId || "test"}_${res.completedAt || index}_${index}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-indigo-100 text-indigo-900">
                        {res.exam}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(res.completedAt).toLocaleDateString("mr-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {res.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                      <span>अचूकता: <strong className="text-emerald-600">{res.accuracy}%</strong></span>
                      <span>•</span>
                      <span>बरोबर: <strong className="text-emerald-600">{res.correct}</strong></span>
                      <span>•</span>
                      <span>चूक: <strong className="text-rose-600">{res.wrong}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {res.score} / {res.maxMarks}
                      </div>
                      <span className="text-[11px] text-slate-500 font-bold">
                        {res.percentage}% गुण
                      </span>
                    </div>

                    {onViewResult && (
                      <button
                        type="button"
                        onClick={() => onViewResult(res)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        विश्लेषण पहा
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
