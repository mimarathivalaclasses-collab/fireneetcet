import React, { useState } from "react";
import {
  Layers,
  Award,
  Target,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  CheckCircle,
  BarChart2,
  Bookmark,
  AlertCircle,
} from "lucide-react";
import { ExamType, Question, NavigationTab } from "../types";
import { getSubjectsForExam } from "../data/chaptersData";
import { getDailyStreak } from "../utils/achievementSystem";

interface TopStatsDashboardProps {
  currentExam: ExamType;
  questions: Question[];
  practiceStats: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  onNavigate?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  bookmarkCount?: number;
  mistakesCount?: number;
}

interface SubjectTheme {
  icon: React.ElementType;
  gradient: string;
  barGradient: string;
  textColor: string;
  bgLight: string;
  borderColor: string;
  badgeBg: string;
  nameMr: string;
}

const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  Physics: {
    icon: Atom,
    gradient: "from-sky-500 to-blue-600",
    barGradient: "from-sky-400 via-blue-500 to-indigo-500",
    textColor: "text-sky-300",
    bgLight: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    badgeBg: "bg-sky-500/20 text-sky-200 border-sky-400/40",
    nameMr: "भौतिकशास्त्र (Physics)",
  },
  Chemistry: {
    icon: FlaskConical,
    gradient: "from-emerald-500 to-teal-600",
    barGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    textColor: "text-emerald-300",
    bgLight: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
    nameMr: "रसायनशास्त्र (Chemistry)",
  },
  Mathematics: {
    icon: Calculator,
    gradient: "from-amber-500 to-orange-600",
    barGradient: "from-amber-400 via-orange-500 to-red-500",
    textColor: "text-amber-300",
    bgLight: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    badgeBg: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    nameMr: "गणित (Mathematics)",
  },
  Biology: {
    icon: Dna,
    gradient: "from-rose-500 to-pink-600",
    barGradient: "from-rose-400 via-pink-500 to-purple-500",
    textColor: "text-rose-300",
    bgLight: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    badgeBg: "bg-rose-500/20 text-rose-200 border-rose-400/40",
    nameMr: "जीवशास्त्र (Biology)",
  },
  Botany: {
    icon: Dna,
    gradient: "from-green-500 to-emerald-600",
    barGradient: "from-green-400 to-emerald-500",
    textColor: "text-green-300",
    bgLight: "bg-green-500/10",
    borderColor: "border-green-500/30",
    badgeBg: "bg-green-500/20 text-green-200 border-green-400/40",
    nameMr: "वनस्पतीशास्त्र (Botany)",
  },
  Zoology: {
    icon: Dna,
    gradient: "from-violet-500 to-purple-600",
    barGradient: "from-violet-400 to-purple-500",
    textColor: "text-violet-300",
    bgLight: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    badgeBg: "bg-violet-500/20 text-violet-200 border-violet-400/40",
    nameMr: "प्राणीशास्त्र (Zoology)",
  },
};

const DEFAULT_THEME: SubjectTheme = {
  icon: BookOpen,
  gradient: "from-indigo-500 to-purple-600",
  barGradient: "from-indigo-400 via-purple-500 to-pink-500",
  textColor: "text-indigo-300",
  bgLight: "bg-indigo-500/10",
  borderColor: "border-indigo-500/30",
  badgeBg: "bg-indigo-500/20 text-indigo-200 border-indigo-400/40",
  nameMr: "विषय",
};

export const TopStatsDashboard: React.FC<TopStatsDashboardProps> = ({
  currentExam,
  questions,
  practiceStats,
  onNavigate,
  onSelectTab,
  bookmarkCount = 0,
  mistakesCount = 0,
}) => {
  // Default collapsed to save maximum screen space on mobile and desktop
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleNav = (tab: NavigationTab) => {
    if (onNavigate) onNavigate(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const streakData = getDailyStreak();
  const examQuestions = questions.filter((q) => q.exam === currentExam);
  const totalInBank = examQuestions.length;
  const subjects = getSubjectsForExam(currentExam);

  const totalAttempted = practiceStats.totalAttempted;
  const totalCorrect = practiceStats.totalCorrect;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const overallCompletionPct = totalInBank > 0 ? Math.min(100, Math.round((totalAttempted / totalInBank) * 100)) : 0;

  const subjectBreakdown = subjects.map((sub) => {
    const totalSubQuestions = examQuestions.filter((q) => q.subject === sub).length;
    const subStat = practiceStats.subjectWise[sub] || { attempted: 0, correct: 0 };
    const subAccuracy = subStat.attempted > 0 ? Math.round((subStat.correct / subStat.attempted) * 100) : 0;
    const completionPct = totalSubQuestions > 0 ? Math.min(100, Math.round((subStat.attempted / totalSubQuestions) * 100)) : 0;
    const theme = SUBJECT_THEMES[sub] || DEFAULT_THEME;

    return {
      subject: sub,
      theme,
      total: totalSubQuestions,
      attempted: subStat.attempted,
      correct: subStat.correct,
      wrong: Math.max(0, subStat.attempted - subStat.correct),
      accuracy: subAccuracy,
      completionPct,
    };
  });

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8 py-1.5 sm:py-2">
        {/* COMPACT SINGLE-LINE LIVE STATUS STRIP */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Left: Quick Stat Badges Scrollable Strip */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
            {/* Streak Badge */}
            <div
              id="top-stat-streak"
              onClick={() => handleNav("practice")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 font-bold shrink-0 cursor-pointer hover:bg-orange-500/30 transition-colors"
              title="दैनिक अभ्यास सातत्य (Daily Streak)"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>{streakData.currentStreak}d Streak</span>
            </div>

            {/* Questions Bank Count */}
            <div
              id="top-stat-bank"
              onClick={() => handleNav("all_questions")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-medium shrink-0 cursor-pointer hover:bg-slate-750 transition-colors"
              title="एकूण उपलब्ध प्रश्नसंख्या"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{totalInBank} प्रश्न</span>
            </div>

            {/* Solved Progress */}
            <div
              id="top-stat-solved"
              onClick={() => handleNav("practice")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-bold shrink-0 cursor-pointer hover:bg-emerald-900/80 transition-colors"
              title="सोडवलेले प्रश्न आणि प्रगती"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>{totalAttempted}/{totalInBank} ({overallCompletionPct}%)</span>
            </div>

            {/* Accuracy Rate */}
            <div
              id="top-stat-accuracy"
              onClick={() => handleNav("analytics")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-950/80 border border-amber-700/50 text-amber-300 font-bold shrink-0 cursor-pointer hover:bg-amber-900/80 transition-colors"
              title="अचूकता टक्केवारी"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{overallAccuracy}% अचूक</span>
            </div>

            {/* Mistakes & Bookmarks mini indicators */}
            {mistakesCount > 0 && (
              <div
                onClick={() => handleNav("mistakes")}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-950/80 border border-rose-700/50 text-rose-300 font-bold shrink-0 cursor-pointer hover:bg-rose-900/80"
                title="चुकांचा संच"
              >
                <AlertCircle className="w-3 h-3 text-rose-400" />
                <span>{mistakesCount} चुका</span>
              </div>
            )}

            {bookmarkCount > 0 && (
              <div
                onClick={() => handleNav("bookmarks")}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-950/80 border border-amber-700/50 text-amber-300 font-bold shrink-0 cursor-pointer hover:bg-amber-900/80"
                title="सेव्ह केलेले प्रश्न"
              >
                <Bookmark className="w-3 h-3 text-amber-400" />
                <span>{bookmarkCount} सेव्ह</span>
              </div>
            )}
          </div>

          {/* Right: Expand/Collapse Details Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-toggle-top-stats"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 text-[11px] font-bold transition-all cursor-pointer"
              title={isExpanded ? "डॅशबोर्ड संकुचित करा" : "विषयवार तपशील व प्रगती बार बघा"}
            >
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{isExpanded ? "तपशील लपवा" : "विषयवार प्रगती"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* EXPANDED SUBJECT BREAKDOWN PANEL (Shown only on toggle) */}
        {isExpanded && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-2.5 animate-in fade-in">
            {/* Global Progress Bar */}
            <div className="bg-slate-950/80 rounded-xl p-2 sm:p-2.5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-bold text-slate-300">
                  अभ्यासक्रम पूर्णता ({currentExam}):
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[11px] font-black border border-indigo-400/30">
                  {overallCompletionPct}%
                </span>
              </div>

              <div className="flex-1 max-w-md flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(2, overallCompletionPct)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {totalAttempted}/{totalInBank} सोडवले
                </span>
              </div>
            </div>

            {/* Subject-Wise Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {subjectBreakdown.map((sb) => {
                const IconComponent = sb.theme.icon;
                return (
                  <div
                    key={sb.subject}
                    className="bg-slate-950/70 hover:bg-slate-950 rounded-xl p-2.5 border border-slate-800 shadow-xs flex flex-col justify-between space-y-2 group transition-all"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${sb.theme.gradient} text-white flex items-center justify-center shrink-0`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-white truncate max-w-[120px]">
                          {sb.theme.nameMr}
                        </span>
                      </div>
                      <span className="text-[10px] font-black font-mono text-slate-300">
                        {sb.completionPct}%
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${sb.theme.barGradient} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(sb.completionPct > 0 ? 4 : 0, sb.completionPct)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>सोडवले: {sb.attempted}/{sb.total}</span>
                        <span className="text-amber-300 font-bold">{sb.accuracy}% अचूक</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNav("practice")}
                      className="w-full py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{sb.subject} सराव करा</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
