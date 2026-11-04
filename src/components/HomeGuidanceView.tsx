import React, { useState } from "react";
import {
  Trophy,
  Zap,
  BookOpen,
  Calendar,
  Bookmark,
  BarChart3,
  MessageCircle,
  CircleDot,
  ArrowRight,
  Sparkles,
  Award,
  Atom,
  Stethoscope,
  BookOpenCheck,
  ShieldCheck,
  Flame,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Layers,
  GraduationCap,
  Play,
} from "lucide-react";
import { ExamType, LanguageMode, NavigationTab, StudentUser, TestResultData, SubjectType } from "../types";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { triggerHaptic } from "../utils/haptics";

interface HomeGuidanceViewProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  language: LanguageMode;
  onNavigate: (tab: NavigationTab) => void;
  currentUser?: StudentUser | null;
  trialSecondsRemaining?: number;
  onOpenAuthModal?: () => void;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
  practiceStats?: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  testHistory?: TestResultData[];
}

export const HomeGuidanceView: React.FC<HomeGuidanceViewProps> = ({
  currentExam,
  onSelectExam,
  onNavigate,
  currentUser,
  practiceStats,
  testHistory = [],
}) => {
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const studentName = currentUser?.name ? currentUser.name.trim().split(" ")[0] : "Student";

  // Interactive Daily Challenge Question State
  const [dailySelectedOption, setDailySelectedOption] = useState<number | null>(null);
  const [dailyShowSolution, setDailyShowSolution] = useState(false);

  // Daily High-Yield Challenge MCQ (changes based on current exam)
  const dailyQuestion = currentExam === "NEET"
    ? {
        id: "daily_neet",
        subject: "Biology",
        text: "In the DNA double helix structure, the two strands are held together by:",
        options: ["Peptide bonds", "Hydrogen bonds", "Phosphodiester bonds", "Electrovalent bonds"],
        correct: 1,
        formula: "A = T (2 Hydrogen bonds) and G ≡ C (3 Hydrogen bonds)",
        explanation: "Nitrogenous base pairs in DNA are held together by complementary hydrogen bonds.",
      }
    : currentExam === "JEE_MAIN"
    ? {
        id: "daily_jee",
        subject: "Mathematics",
        text: "If |a × b| = a · b, then the angle θ between vectors a and b is:",
        options: ["0°", "45° (π/4)", "90° (π/2)", "180° (π)"],
        correct: 1,
        formula: "|a||b| sin θ = |a||b| cos θ => tan θ = 1 => θ = 45°",
        explanation: "sin θ = cos θ when θ = 45° or π/4 radians.",
      }
    : {
        id: "daily_cet",
        subject: "Physics",
        text: "In vertical circular motion, the minimum critical velocity at the highest point is:",
        options: ["√(r g)", "√(3 r g)", "√(5 r g)", "2 √(r g)"],
        correct: 0,
        formula: "v_H = √(r g), v_M = √(3 r g), v_L = √(5 r g)",
        explanation: "At the highest point, when tension in string T=0, minimum centripetal velocity is √(rg).",
      };

  const handleDailyOptionClick = (idx: number) => {
    if (dailySelectedOption !== null) return;
    setDailySelectedOption(idx);
    setDailyShowSolution(true);
    if (idx === dailyQuestion.correct) {
      triggerHaptic("success");
    } else {
      triggerHaptic("warning");
    }
  };

  // Dynamic Real Metrics
  const testsTaken = testHistory.length > 0 
    ? testHistory.length 
    : (currentUser?.totalTestsTaken || 0);

  const testQuestionsAttempted = testHistory.reduce((sum, t) => sum + (t.attempted || t.questions?.length || 0), 0);
  const testQuestionsCorrect = testHistory.reduce((sum, t) => sum + (t.correct || 0), 0);

  const totalAttempted = Math.max(
    (practiceStats?.totalAttempted || 0) + (currentUser?.totalQuestionsSolved || 0),
    testQuestionsAttempted
  );
  const totalCorrect = Math.max(
    (practiceStats?.totalCorrect || 0) + (currentUser?.totalCorrect || 0),
    testQuestionsCorrect
  );

  const overallAccuracy = totalAttempted > 0 
    ? Math.round((totalCorrect / totalAttempted) * 100) 
    : testHistory.length > 0
    ? Math.round(testHistory.reduce((acc, t) => acc + (t.accuracy || 0), 0) / testHistory.length)
    : (currentUser?.overallAccuracy || 0);

  const maxExamMarks = currentExam === "NEET" ? 720 : currentExam === "JEE_MAIN" ? 300 : 200;

  const bestScoreVal = testHistory.length > 0
    ? Math.max(...testHistory.map((t) => t.score || 0))
    : (currentUser?.highestScore || (totalCorrect * (currentExam === "NEET" ? 4 : 1)));

  const bestScore = `${bestScoreVal}/${maxExamMarks}`;

  const rank = totalAttempted === 0 && testsTaken === 0
    ? "New"
    : overallAccuracy >= 85
    ? "Top 500"
    : overallAccuracy >= 70
    ? "Top 2,500"
    : "Top 8,000";

  // Subjects for the 4-Grid
  const subjects = [
    {
      name: "Physics",
      en: "Physics",
      icon: "⚡",
      chapters: currentExam === "NEET" ? "28 Chapters" : "12 Chapters",
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-100",
      accent: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Chemistry",
      en: "Chemistry",
      icon: "🧪",
      chapters: currentExam === "NEET" ? "30 Chapters" : "16 Chapters",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: currentExam === "NEET" ? "Botany" : "Maths",
      en: currentExam === "NEET" ? "Botany" : "Maths",
      icon: currentExam === "NEET" ? "🌿" : "📐",
      chapters: currentExam === "NEET" ? "20 Chapters" : "12 Chapters",
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-100",
      accent: "text-purple-600 dark:text-purple-400",
    },
    {
      name: currentExam === "NEET" ? "Zoology" : "Biology",
      en: currentExam === "NEET" ? "Zoology" : "Biology",
      icon: currentExam === "NEET" ? "🫀" : "🧬",
      chapters: currentExam === "NEET" ? "18 Chapters" : "22 Chapters",
      bg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800 text-orange-950 dark:text-orange-100",
      accent: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-3.5 sm:px-4 py-2.5 sm:py-4 space-y-3.5 pb-24 select-none antialiased">
      {/* 0. Mobile PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* 1. Mobile-First Top Header Bar: Greeting + Target Exam Switcher + Flame Streak */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
            {studentName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
              Welcome, {studentName}!
            </h1>
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-black text-orange-600 dark:text-orange-400 cursor-pointer active:scale-95 transition-all"
              >
                <span>{currentExam === "NEET" ? "NEET (720M)" : currentExam === "JEE_MAIN" ? "JEE Main (300M)" : "MHT-CET (200M)"}</span>
                <ChevronDown className="w-3 h-3 stroke-[3]" />
              </button>

              {/* Exam Switcher Dropdown */}
              {isExamDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1 z-50 animate-in fade-in zoom-in-95">
                  {(["MHT_CET", "NEET", "JEE_MAIN"] as ExamType[]).map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => {
                        onSelectExam(ex);
                        setIsExamDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentExam === ex
                          ? "bg-orange-600 text-white font-black"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {ex === "MHT_CET" ? "🎯 MHT-CET (200M)" : ex === "NEET" ? "🩺 NEET (720M)" : "⚛️ JEE Main (300M)"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Daily Streak Flame */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-black shrink-0 shadow-2xs">
          <Flame className="w-4 h-4 text-orange-600 animate-pulse fill-orange-500" />
          <span>3 Days Streak</span>
        </div>
      </div>

      {/* 2. Today's Daily Target Card (Compact Mobile Hero, ~120px) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white rounded-2xl p-3.5 sm:p-4 shadow-md shadow-orange-600/20">
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-amber-200 uppercase tracking-tight">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Daily Practice Goal</span>
            </div>

            <div>
              <h2 className="text-sm sm:text-base font-black text-white leading-tight">
                {totalAttempted > 0 ? Math.min(totalAttempted, 20) : 12} of 20 Questions Solved
              </h2>
              <p className="text-[11px] text-orange-100 font-medium mt-0.5">
                {overallAccuracy > 0 ? `${overallAccuracy}% Accuracy • Rank: ${rank}` : "Solve 20 questions daily to boost your rank"}
              </p>
            </div>

            <button
              onClick={() => onNavigate("practice")}
              className="mt-1 px-3 py-1.5 rounded-lg bg-white text-orange-900 font-black text-xs flex items-center gap-1 shadow-xs hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 fill-orange-900" />
              <span>Start Practice →</span>
            </button>
          </div>

          {/* Mini Radial Battery Meter */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="30"
                className="text-white/20 stroke-current"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                className="text-amber-300 stroke-current drop-shadow-sm transition-all duration-700"
                strokeWidth="7"
                strokeDasharray={`${2 * Math.PI * 30}`}
                strokeDashoffset={`${2 * Math.PI * 30 * (1 - Math.max(15, overallAccuracy) / 100)}`}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs sm:text-sm font-black text-white font-mono leading-none">
                {overallAccuracy || 60}%
              </span>
              <span className="text-[8px] font-bold text-amber-200 uppercase mt-0.5">
                Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 4 Subjects (2x2 Compact Thumb-Friendly Native Grid) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs px-0.5">
          <span className="font-black text-slate-800 dark:text-slate-200">
            Choose Subject
          </span>
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
            All Chapters Ready
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {subjects.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate("practice")}
              className={`p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer active:scale-95 shadow-2xs ${sub.bg}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{sub.icon}</span>
                  <span className="text-xs font-black truncate">{sub.name}</span>
                </div>
                <div className="text-[10px] opacity-75 font-mono font-bold mt-0.5 pl-0.5">
                  {sub.chapters}
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. The 4 Primary Power Tiles (2x2 Thumb-Friendly Native Cards) */}
      <div className="space-y-1.5 pt-0.5">
        <div className="flex items-center justify-between text-xs px-0.5">
          <span className="font-black text-slate-800 dark:text-slate-200">
            Primary Modules
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            100% Free & Unlimited
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Card 1: 10 Grand Mocks */}
          <div
            onClick={() => onNavigate("grand_tests")}
            className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-amber-300 dark:border-amber-800 hover:border-amber-500 transition-all cursor-pointer active:scale-95 shadow-xs space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Trophy className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                Grand Mock Tests
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                10 Full Tests • OMR & Rank
              </p>
            </div>
            <span className="text-[10.5px] font-bold text-amber-600 dark:text-amber-400 block pt-0.5">
              Start Test →
            </span>
          </div>

          {/* Card 2: 200 Points Notes */}
          <div
            onClick={() => onNavigate("notes")}
            className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 transition-all cursor-pointer active:scale-95 shadow-xs space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                200 Points Notes & PDF
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                200 Key Points Per Subject
              </p>
            </div>
            <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 block pt-0.5">
              Get PDF →
            </span>
          </div>

          {/* Card 3: PYQs 2015-2025 */}
          <div
            onClick={() => onNavigate("pyq")}
            className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-blue-300 dark:border-blue-800 hover:border-blue-500 transition-all cursor-pointer active:scale-95 shadow-xs space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black">
              <Calendar className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                Previous Years PYQs
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                2015-2025 Solved Papers
              </p>
            </div>
            <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 block pt-0.5">
              Solve Now →
            </span>
          </div>

          {/* Card 4: Mistakes & Bookmarks */}
          <div
            onClick={() => onNavigate("bookmarks")}
            className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-rose-300 dark:border-rose-800 hover:border-rose-500 transition-all cursor-pointer active:scale-95 shadow-xs space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black">
              <Bookmark className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                Mistakes & Saved
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Wrong MCQs & Bookmarks
              </p>
            </div>
            <span className="text-[10.5px] font-bold text-rose-600 dark:text-rose-400 block pt-0.5">
              Review →
            </span>
          </div>
        </div>
      </div>

      {/* 5. Interactive "Daily Question" (Daily Quick Challenge MCQ) */}
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-orange-400 font-black">
            <Zap className="w-4 h-4 fill-orange-400" />
            <span>Daily Challenge Question (Daily MCQ)</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            {dailyQuestion.subject}
          </span>
        </div>

        {/* Question Text in English */}
        <p className="text-xs sm:text-[13px] font-bold text-slate-100 leading-snug">
          {dailyQuestion.text}
        </p>

        {/* 4 Interactive Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
          {dailyQuestion.options.map((opt, oIdx) => {
            const isSelected = dailySelectedOption === oIdx;
            const isCorrect = oIdx === dailyQuestion.correct;
            const showStatus = dailyShowSolution;

            let btnClass = "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700";
            if (showStatus) {
              if (isCorrect) {
                btnClass = "bg-emerald-600 text-white border-emerald-500 font-black";
              } else if (isSelected) {
                btnClass = "bg-rose-600 text-white border-rose-500";
              }
            }

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleDailyOptionClick(oIdx)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all cursor-pointer active:scale-98 ${btnClass}`}
              >
                <span>
                  {String.fromCharCode(65 + oIdx)}. {opt}
                </span>
                {showStatus && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                {showStatus && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Solution Explanation popup if attempted */}
        {dailyShowSolution && (
          <div className="pt-2 border-t border-slate-800 text-xs space-y-1 animate-in fade-in">
            <div className="font-mono text-emerald-400 font-bold">
              Formula: {dailyQuestion.formula}
            </div>
            <div className="text-slate-300 text-[11px] leading-relaxed">
              {dailyQuestion.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 6. Performance Summary Strip (Single Clean Row) */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl text-center text-xs">
        <div>
          <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Tests</span>
          <strong className="font-mono font-black text-slate-900 dark:text-white text-xs">{testsTaken}</strong>
        </div>
        <div>
          <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Solved</span>
          <strong className="font-mono font-black text-orange-600 dark:text-orange-400 text-xs">{totalAttempted}</strong>
        </div>
        <div>
          <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Score</span>
          <strong className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-xs">{bestScore}</strong>
        </div>
        <div>
          <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Rank</span>
          <strong className="font-mono font-black text-amber-500 text-xs">{rank}</strong>
        </div>
      </div>

      {/* 7. Class Branding Footer */}
      <div className="pt-2 text-center text-[10px] text-slate-400 dark:text-slate-500 space-y-0.5">
        <div className="font-black text-slate-700 dark:text-slate-300 text-[11px] flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
          <span>Mi Marathiwala Classes, Ambad</span>
        </div>
        <div>Support: 9307220454 · UPI: 9307220454@yz</div>
      </div>
    </div>
  );
};
