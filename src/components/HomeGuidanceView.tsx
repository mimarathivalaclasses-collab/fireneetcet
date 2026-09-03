import React from "react";
import {
  Rocket,
  Trophy,
  Zap,
  BookOpen,
  Calendar,
  Bookmark,
  FileText,
  BarChart3,
  MessageCircle,
  CircleDot,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Activity,
  CheckCircle2,
  Atom,
  Stethoscope,
  BookOpenCheck,
  ShieldCheck,
} from "lucide-react";
import { ExamType, LanguageMode, NavigationTab, StudentUser } from "../types";

interface HomeGuidanceViewProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  language: LanguageMode;
  onNavigate: (tab: NavigationTab) => void;
  currentUser?: StudentUser | null;
  trialSecondsRemaining?: number;
  onOpenAdminDashboard?: () => void;
}

export const HomeGuidanceView: React.FC<HomeGuidanceViewProps> = ({
  currentExam,
  onSelectExam,
  onNavigate,
  currentUser,
}) => {
  const isDemoUser = currentUser?.id?.startsWith("demo_user_");
  const studentName = currentUser?.name?.split(" ")[0] || "Arjun";
  const overallAccuracy = currentUser?.overallAccuracy || 72;
  const testsTaken = currentUser?.totalTestsTaken || 28;
  const avgScore = currentUser?.totalQuestionsSolved ? `${Math.round((currentUser.totalQuestionsSolved * 4) / Math.max(1, testsTaken))}/720` : "156/720";
  const bestScore = "612/720";
  const rank = "12,458";

  // 3 Exam Selection Cards (Screen 2: "Choose Your Exam")
  const examCards = [
    {
      id: "NEET" as ExamType,
      name: "NEET",
      fullName: "NEET Medical",
      icon: Stethoscope,
      testsCount: "25 Tests",
      colorClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
      activeRing: "ring-2 ring-emerald-500",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300",
    },
    {
      id: "MHT_CET" as ExamType,
      name: "MHT-CET",
      fullName: "Maharashtra CET",
      icon: BookOpenCheck,
      testsCount: "18 Tests",
      colorClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
      activeRing: "ring-2 ring-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300",
    },
    {
      id: "JEE_MAIN" as ExamType,
      name: "JEE Main",
      fullName: "JEE Engineering",
      icon: Atom,
      testsCount: "30 Tests",
      colorClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800",
      activeRing: "ring-2 ring-purple-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300",
    },
  ];

  // 8 Quick Actions Grid (Screen 2: "Quick Actions")
  const quickActions = [
    {
      title: "ग्रँड मॉक टेस्ट्स",
      subtitle: "Mock Tests",
      icon: Trophy,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800/80 hover:bg-emerald-100/70",
      action: () => onNavigate("grand_tests"),
    },
    {
      title: "चॅप्टर टेस्ट्स",
      subtitle: "Chapter Tests",
      icon: Zap,
      color: "text-orange-500 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/40 border-orange-100 dark:border-orange-800/80 hover:bg-orange-100/70",
      action: () => onNavigate("mock_test"),
    },
    {
      title: "मागील प्रश्नपत्रिका",
      subtitle: "Previous Papers",
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-800/80 hover:bg-blue-100/70",
      action: () => onNavigate("pyq"),
    },
    {
      title: "सराव प्रश्नसंच",
      subtitle: "Practice MCQs",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-800/80 hover:bg-purple-100/70",
      action: () => onNavigate("all_questions"),
    },
    {
      title: "महत्त्वाचे प्रश्न",
      subtitle: "Bookmarks",
      icon: Bookmark,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-800/80 hover:bg-rose-100/70",
      action: () => onNavigate("bookmarks"),
    },
    {
      title: "रिव्हिजन नोट्स",
      subtitle: "My Notes",
      icon: BookOpen,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-100 dark:border-teal-800/80 hover:bg-teal-100/70",
      action: () => onNavigate("notes"),
    },
    {
      title: "प्रगती व रँक",
      subtitle: "Performance",
      icon: BarChart3,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-800/80 hover:bg-amber-100/70",
      action: () => onNavigate("analytics"),
    },
    {
      title: "AI शंका निरसन",
      subtitle: "AI Discuss",
      icon: MessageCircle,
      color: "text-sky-500 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-800/80 hover:bg-sky-100/70",
      action: () => onNavigate("feedback"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6 pb-24 select-none">
      {/* 1. Header Greeting (Hi, Arjun! 👋 Let's crack your dream exam.) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Hi, {studentName}!</span>
            <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Let's crack your dream exam. (चला तुमचे स्वप्न पूर्ण करूया)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("grand_tests")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>PLPC PRO</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Progress Card (Screen 2: "Your Overall Progress - 72%") */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#292bb2] via-[#3a3dc7] to-[#4e51ec] text-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-indigo-500/10">
        {/* Subtle background cosmic glows */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 -mb-8 w-44 h-44 bg-indigo-300/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Progress Summary */}
          <div className="space-y-3 max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-indigo-100">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Your Overall Progress</span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono-numbers">
                {overallAccuracy}%
              </div>
              <p className="text-xs text-indigo-100/90 font-medium mt-0.5">
                Great going! Keep it up. (उत्तम प्रगती! सराव चालू ठेवा.)
              </p>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-amber-300 h-full rounded-full transition-all duration-1000"
                style={{ width: `${overallAccuracy}%` }}
              ></div>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="flex items-center justify-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-white/20 stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-amber-400 stroke-current drop-shadow-md transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallAccuracy / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-white font-mono-numbers leading-tight">
                  {overallAccuracy}%
                </span>
                <span className="text-[9px] font-bold text-indigo-200 uppercase tracking-tight">
                  Score
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stat Strip (Tests Taken, Avg. Score, Best Score, Rank) */}
        <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs">
            <span className="block text-[10px] text-indigo-200 font-bold uppercase tracking-tight">
              Tests Taken
            </span>
            <strong className="text-sm sm:text-base font-black text-white font-mono-numbers">
              {testsTaken}
            </strong>
          </div>
          <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs">
            <span className="block text-[10px] text-indigo-200 font-bold uppercase tracking-tight">
              Avg. Score
            </span>
            <strong className="text-sm sm:text-base font-black text-emerald-300 font-mono-numbers">
              {avgScore}
            </strong>
          </div>
          <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs">
            <span className="block text-[10px] text-indigo-200 font-bold uppercase tracking-tight">
              Best Score
            </span>
            <strong className="text-sm sm:text-base font-black text-amber-300 font-mono-numbers">
              {bestScore}
            </strong>
          </div>
          <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs">
            <span className="block text-[10px] text-indigo-200 font-bold uppercase tracking-tight">
              Rank
            </span>
            <strong className="text-sm sm:text-base font-black text-white font-mono-numbers">
              {rank}
            </strong>
          </div>
        </div>
      </div>

      {/* 3. "Choose Your Exam" (Screen 2: NEET, MHT-CET, JEE Main) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Choose Your Exam</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(परीक्षा निवडा)</span>
          </h2>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            View all
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {examCards.map((card) => {
            const Icon = card.icon;
            const isSelected = currentExam === card.id;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onSelectExam(card.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer group shadow-xs ${
                  card.colorClass
                } ${isSelected ? card.activeRing + " shadow-md scale-[1.02]" : "hover:scale-[1.01]"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg} shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {card.name}
                    </h3>
                    <p className="text-xs font-bold opacity-80">
                      {card.testsCount}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. "Most MVP High-Yield Notes" Section (100% Exam Probability) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl shadow-emerald-950/20 border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Exam Probability • Most MVP Revision Notes</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>सर्व विषयांच्या Most MVP रिव्हिजन नोट्स</span>
              </h2>
              <p className="text-xs text-emerald-100/90 font-medium max-w-2xl mt-0.5">
                NEET, JEE आणि MHT-CET परीक्षेत 100% येण्याची दाट शक्यता असणारे महत्त्वाचे सूत्रे, व्याख्या, रीअ‍ॅक्शन्स, मेमरी ट्रिक्स व चॅप्टरनिहाय 100 पॉइंट्स.
              </p>
            </div>

            <button
              id="btn-home-open-all-notes"
              onClick={() => onNavigate("notes")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span>सर्व नोट्स उघडा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Subject Fast Access Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-emerald-700/50">
            <button
              onClick={() => onNavigate("notes")}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-200 group-hover:text-white">भौतिकशास्त्र</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/40 text-emerald-200 font-bold">Physics</span>
              </div>
              <p className="text-[10px] text-emerald-100/70 mt-1">सूत्र व संकल्पना</p>
            </button>

            <button
              onClick={() => onNavigate("notes")}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-200 group-hover:text-white">रसायनशास्त्र</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/40 text-emerald-200 font-bold">Chemistry</span>
              </div>
              <p className="text-[10px] text-emerald-100/70 mt-1">रिएक्शन्स व चार्ट्स</p>
            </button>

            <button
              onClick={() => onNavigate("notes")}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-200 group-hover:text-white">गणित</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/40 text-emerald-200 font-bold">Maths</span>
              </div>
              <p className="text-[10px] text-emerald-100/70 mt-1">शॉर्टकट युक्त्या</p>
            </button>

            <button
              onClick={() => onNavigate("notes")}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-200 group-hover:text-white">जीवशास्त्र</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/40 text-emerald-200 font-bold">Biology</span>
              </div>
              <p className="text-[10px] text-emerald-100/70 mt-1">डायग्राम्स व मुद्दे</p>
            </button>
          </div>
        </div>
      </div>

      {/* 5. "Quick Actions" (Screen 2: 8 Clean Icons Grid) */}
      <div className="space-y-3">
        <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>Quick Actions</span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(द्रुत साधने)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={action.action}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-xs group hover:scale-[1.02] ${action.bg}`}
              >
                <div className={`w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 shadow-xs flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight">
                    {action.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">
                    {action.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. "Recent Scores" / Live Grand Test Card (Screen 2 & 3) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Recent Scores & Active Tests</span>
          </h2>
          <button
            onClick={() => onNavigate("analytics")}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            सर्व निकाल पहा
          </button>
        </div>

        <div
          onClick={() => onNavigate("grand_tests")}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {currentExam === "NEET" ? "NEET Full Syllabus Mock Test - 12" : "MHT-CET Grand Mock Test - 01"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                28 Apr 2026 • Full Syllabus • 180 min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono-numbers">
              {bestScore}
            </span>
            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer & Terms (खूप बारीक अक्षरांमधील शैक्षणिक अस्वीकरण) */}
      <footer className="pt-4 pb-8 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed space-y-1 text-center">
        <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>PLPC Learning App • शैक्षणिक अस्वीकरण व अटी</span>
        </div>
        <p className="max-w-2xl mx-auto">
          हे ॲप गरीब व गरजू विद्यार्थ्यांच्या स्पर्धा परीक्षा (NEET, JEE, MHT-CET) सराव व शैक्षणिक मदतीसाठी चालवले जात आहे. या नावाचे इतर कोणत्याही संस्थेशी साधर्म्य आढळल्यास तो निव्वळ योगायोग समजावा. कायदेशीर आक्षेप अथवा नोटीस प्राप्त झाल्यास १० आठवड्यांच्या आत (10 Weeks) ॲपचे नाव व ब्रँडिंग तत्काळ बदलण्यात येईल.
        </p>
      </footer>
    </div>
  );
};


