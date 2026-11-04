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
  // Default to 'category' (Chapter-wise practice) so students see chapters first and clearly!
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
      return ch.name.toLowerCase().includes(query);
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

    const chapterDisplayName = chapterName === "All" ? `All Chapters (${currentSubject})` : chapterName;
    const testTitle = `${currentExam} • ${currentSubject} • ${chapterDisplayName} (${chosen.length} Questions • ${duration} Minutes)`;

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
        title: `${currentExam} Full Syllabus Mock Test`,
        subtitle: "Comprehensive test covering all subjects, exactly as per Board & NTA patterns",
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
        title: `${currentExam} Physics Full Subject Test`,
        subtitle: "50 questions set based on all Physics chapters of 11th and 12th standard",
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
        title: `${currentExam} Chemistry Full Subject Test`,
        subtitle: "50 important questions based on Organic, Inorganic and Physical Chemistry",
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
          ? `${currentExam} Mathematics Full Subject Test`
          : `${currentExam} Biology Full Subject Test`,
        subtitle: isPCM
          ? "50 important 2-mark questions from all Mathematics chapters"
          : "90 questions based on NCERT line-by-line",
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
        title: `${currentExam} Daily 15-Minute Speed Challenge`,
        subtitle: "10 rapid questions for accurate time management and high accuracy",
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

  // Subject Details Helper (Icons, Names, Colors)
  const getSubjectMeta = (subj: SubjectType) => {
    switch (subj) {
      case "Physics":
        return {
          name: "Physics",
          desc: "Laws, Formulas & Numericals",
          color: "bg-blue-600 text-white",
          activeBorder: "border-blue-600 bg-blue-50/80 text-blue-900",
          iconBg: "bg-blue-100 text-blue-700",
          tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "Chemistry":
        return {
          name: "Chemistry",
          desc: "Organic, Inorganic & Physical",
          color: "bg-purple-600 text-white",
          activeBorder: "border-purple-600 bg-purple-50/80 text-purple-900",
          iconBg: "bg-purple-100 text-purple-700",
          tagColor: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "Mathematics":
        return {
          name: "Mathematics",
          desc: "Calculus, Trigonometry & Geometry",
          color: "bg-amber-600 text-white",
          activeBorder: "border-amber-600 bg-amber-50/80 text-amber-900",
          iconBg: "bg-amber-100 text-amber-700",
          tagColor: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "Biology":
        return {
          name: "Biology",
          desc: "Plant & Animal Classification",
          color: "bg-emerald-600 text-white",
          activeBorder: "border-emerald-600 bg-emerald-50/80 text-emerald-900",
          iconBg: "bg-emerald-100 text-emerald-700",
          tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return {
          name: subj,
          desc: "Practice Tests",
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
                {currentExam} Mock Test Hub
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 text-[10px] font-black uppercase">
                {currentExam}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Practice Chapter-wise or take a Full Mock Test
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
            <span className="hidden sm:inline">Main Menu</span>
          </button>
        )}
      </div>

      {/* 2. THREE CLEAR MAIN TABS */}
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
          <span className="truncate">1. Chapter Tests</span>
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
          <span className="truncate">2. Full Subject Mocks</span>
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
          <span className="truncate">3. Results & Analysis ({testHistory.length})</span>
        </button>
      </div>

      {/* TAB 1: CHAPTER-WISE MOCK TESTS */}
      {activeMainTab === "category" && (
        <div className="space-y-4">
          {/* STEP 1: SELECT SUBJECT */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                  1
                </span>
                <span>Step 1: Select Subject:</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                Selected Subject: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{currentSubject}</strong>
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

          {/* STEP 2: SELECT NUMBER OF QUESTIONS */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                <span>Step 2: Select Questions Count:</span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { count: 10, label: "10 Questions", time: "15 Minutes", tag: "⚡ Quick Practice" },
                { count: 25, label: "25 Questions", time: "35 Minutes", tag: "🎯 Standard Test" },
                { count: 50, label: "50 Questions", time: "60 Minutes", tag: "🔥 Deep Practice" },
                { count: 100, label: "100 Questions", time: "120 Minutes", tag: "🏆 Mega Practice" },
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

          {/* STEP 3: SELECT CHAPTER */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                    3
                  </span>
                  <span>Step 3: Select Chapter & Start:</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-6">
                  Total {filteredChapters.length} chapters available for {currentSubject}
                </p>
              </div>

              {/* Search Bar for Chapters */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Chapter Name (e.g. Rotational...)"
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
                    All Chapters Combined ({currentSubject})
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Test with {selectedQuestionCount} questions combined from all {currentSubject} chapters
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartChapterTest("All", selectedQuestionCount)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Start Combined Test ({selectedQuestionCount} Qs)</span>
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
                          Chapter No. {idx + 1}
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
                        {ch.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {ch.name}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        ⏱️ {getDurationForTier(selectedQuestionCount)} min.
                      </span>

                      <button
                        type="button"
                        onClick={() => handleStartChapterTest(ch.name, selectedQuestionCount)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Take Test ({selectedQuestionCount} Qs) →</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredChapters.length === 0 && (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
                No chapters found. Please check your search term.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FULL SYLLABUS MOCKS */}
      {activeMainTab === "full_mock" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {currentExam} Full Syllabus & Grand Mock Tests
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Full syllabus tests to simulate actual exam environment
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAiGenerator}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Test Maker</span>
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
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-emerald-100 text-emerald-800">
                          Score: {pastAttempt.score}/{pastAttempt.maxMarks}
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          New
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
                        {test.durationMinutes} min.
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        {test.questionsCount} Qs
                      </span>
                      <span>•</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {test.totalMarks} Marks
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const count = test.questionsCount;
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
                    <span>{pastAttempt ? "Re-attempt Test" : "Start Test Now"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: TEST RESULTS & HISTORY */}
      {activeMainTab === "result" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Solved Test Results ({testHistory.length})
            </h2>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <History className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No tests taken yet
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Take chapter-wise tests or full mock tests. Your results, accuracy, and correct/wrong answers will appear here.
              </p>
              <button
                type="button"
                onClick={() => setActiveMainTab("category")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs shadow-xs cursor-pointer"
              >
                Start your first Chapter Test →
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
                        {new Date(res.completedAt).toLocaleDateString("en-IN", {
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
                      <span>Accuracy: <strong className="text-emerald-600">{res.accuracy}%</strong></span>
                      <span>•</span>
                      <span>Correct: <strong className="text-emerald-600">{res.correct}</strong></span>
                      <span>•</span>
                      <span>Wrong: <strong className="text-rose-600">{res.wrong}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {res.score} / {res.maxMarks}
                      </div>
                      <span className="text-[11px] text-slate-500 font-bold">
                        {res.percentage}% Score
                      </span>
                    </div>

                    {onViewResult && (
                      <button
                        type="button"
                        onClick={() => onViewResult(res)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        View Analysis
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
