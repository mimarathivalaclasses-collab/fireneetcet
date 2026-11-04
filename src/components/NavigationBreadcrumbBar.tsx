import React from "react";
import {
  ArrowLeft,
  Home,
  Compass,
  Building2,
  Trophy,
  Layers,
  BookOpen,
  HelpCircle,
  Clock,
  Send,
  FileText,
  AlertTriangle,
  Zap,
  Sparkles,
  PlusCircle,
  Bookmark,
  TrendingUp,
  Cpu,
  ChevronRight,
  User,
  AlertCircle,
  Scale,
} from "lucide-react";
import { NavigationTab, ExamType } from "../types";

interface NavigationBreadcrumbBarProps {
  activeTab: NavigationTab;
  currentExam: ExamType;
  historyStack: NavigationTab[];
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

interface TabMeta {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

const TAB_METADATA: Record<NavigationTab, TabMeta> = {
  home: {
    title: "Home & Guidance",
    icon: Compass,
    color: "from-indigo-600 to-slate-900",
  },
  auth_portal: {
    title: "Student & Class Auth Portal",
    icon: User,
    color: "from-indigo-600 to-slate-900",
    badge: "Login / Register",
  },
  classes_portal: {
    title: "Classes Portal & Weekly Tests",
    icon: Building2,
    color: "from-indigo-700 to-purple-800",
    badge: "Coaching Hub",
  },
  classes_info: {
    title: "Classes Registration & Info",
    icon: Building2,
    color: "from-purple-700 to-indigo-800",
    badge: "40% Referral",
  },
  grand_tests: {
    title: "100+ Grand Exam Mocks",
    icon: Trophy,
    color: "from-amber-600 to-orange-700",
    badge: "100+ Full Tests",
  },
  all_questions: {
    title: "All Questions Bank",
    icon: Layers,
    color: "from-blue-600 to-indigo-700",
  },
  notes: {
    title: "Topic Notes & Quick Revision",
    icon: BookOpen,
    color: "from-emerald-600 to-teal-700",
    badge: "PDF Ready",
  },
  practice: {
    title: "Subject-wise Practice",
    icon: HelpCircle,
    color: "from-blue-600 to-indigo-700",
  },
  pyq: {
    title: "PYQ Archive (2018-2024)",
    icon: Clock,
    color: "from-purple-600 to-pink-700",
  },
  mock_test: {
    title: "Mock Test Setup",
    icon: Send,
    color: "from-emerald-600 to-teal-700",
  },
  omr: {
    title: "Digital OMR Sheet",
    icon: FileText,
    color: "from-rose-600 to-red-700",
  },
  pdf_bank: {
    title: "25,000 MCQ Bank & PDF Generator",
    icon: FileText,
    color: "from-amber-600 to-orange-700",
    badge: "Print Ready",
  },
  mistakes: {
    title: "Mistakes Bank & Error Log",
    icon: AlertTriangle,
    color: "from-rose-600 to-amber-700",
  },
  flashcards: {
    title: "High-Yield Smart Flashcards",
    icon: Zap,
    color: "from-amber-500 to-yellow-600",
    badge: "Smart Cards",
  },
  ai_generator: {
    title: "Gemini AI Question Generator",
    icon: Sparkles,
    color: "from-purple-600 to-indigo-700",
    badge: "AI Powered",
  },
  add_question: {
    title: "Add Custom Questions",
    icon: PlusCircle,
    color: "from-emerald-600 to-teal-700",
  },
  bookmarks: {
    title: "Bookmarked Questions",
    icon: Bookmark,
    color: "from-amber-600 to-orange-600",
  },
  formulas: {
    title: "Formulas & Short Notes",
    icon: Cpu,
    color: "from-cyan-600 to-blue-700",
  },
  analytics: {
    title: "Performance & Analytics",
    icon: TrendingUp,
    color: "from-indigo-600 to-purple-700",
  },
  agent_portal: {
    title: "Agent Portal (₹10 Commission)",
    icon: TrendingUp,
    color: "from-teal-600 to-emerald-700",
    badge: "₹10 Commission",
  },
  refer_earn: {
    title: "Student Refer & 100% Refund",
    icon: Sparkles,
    color: "from-amber-600 to-orange-700",
    badge: "100% Refund",
  },
  leaderboard: {
    title: "Toppers Leaderboard (Top 50)",
    icon: Trophy,
    color: "from-amber-500 to-orange-600",
    badge: "Top 50",
  },
  coaching_register: {
    title: "Coaching Registration Portal",
    icon: Building2,
    color: "from-purple-700 to-indigo-800",
    badge: "30 Min Free",
  },
  feedback: {
    title: "Report Issues & Feedback",
    icon: AlertCircle,
    color: "from-rose-600 to-orange-600",
    badge: "Feedback",
  },
  compliance_rules: {
    title: "Rules & Regulations",
    icon: Scale,
    color: "from-indigo-600 to-slate-900",
    badge: "Policies",
  },
};

export const NavigationBreadcrumbBar: React.FC<NavigationBreadcrumbBarProps> = ({
  activeTab,
  currentExam,
  historyStack,
  onBack,
  onNavigateHome,
  onNavigateTab,
}) => {
  if (activeTab === "home") return null;

  const currentMeta = TAB_METADATA[activeTab] || {
    title: "Active Section",
    icon: Compass,
    color: "from-indigo-600 to-slate-900",
  };

  const IconComp = currentMeta.icon;
  const previousTab = historyStack.length > 0 ? historyStack[historyStack.length - 1] : "home";
  const previousMeta = TAB_METADATA[previousTab];

  return (
    <>
      {/* Top Universal Back & Breadcrumb Bar */}
      <div className="relative z-20 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
          {/* Left Actions: Back Button & Home Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onBack}
              id="global-btn-back"
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:ring-2 hover:ring-indigo-400 border border-transparent dark:border-slate-700"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back</span>
            </button>

            <button
              onClick={onNavigateHome}
              id="global-btn-home"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all"
              title="Go to Home"
            >
              <Home className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Main Menu</span>
              <span className="sm:hidden">Home</span>
            </button>

            {/* Visual Divider */}
            <span className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:inline-block"></span>

            {/* Breadcrumb Trail */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span
                onClick={onNavigateHome}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Compass className="w-3 h-3 text-indigo-500" />
                <span>Home</span>
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
              {previousTab !== "home" && previousMeta && (
                <>
                  <span
                    onClick={() => onNavigateTab(previousTab)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer text-slate-600 dark:text-slate-300 truncate max-w-[120px]"
                  >
                    {previousMeta.title.split(" ")[0]}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
                </>
              )}
              <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-[180px]">
                {currentMeta.title}
              </span>
            </div>
          </div>

          {/* Right Section Identifier & Exam Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs">
              <IconComp className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="font-extrabold text-slate-900 dark:text-white text-xs truncate max-w-[180px] sm:max-w-xs">
                {currentMeta.title}
              </span>
              {currentMeta.badge && (
                <span className="hidden sm:inline-block text-[10px] font-black uppercase px-1.5 py-0.2 rounded-md bg-indigo-600 text-white">
                  {currentMeta.badge}
                </span>
              )}
            </div>

            <span className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-slate-900 dark:bg-slate-800 text-amber-400 border border-slate-800 dark:border-slate-700 font-mono-numbers">
              {currentExam}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Back Button for Mobile & Long Pages */}
      <div className="fixed bottom-20 left-3 z-30 sm:hidden pb-[env(safe-area-inset-bottom,0px)]">
        <button
          onClick={onBack}
          id="floating-mobile-btn-back"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/95 text-white text-xs font-black shadow-xl ring-2 ring-amber-400/80 backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back</span>
        </button>
      </div>
    </>
  );
};
