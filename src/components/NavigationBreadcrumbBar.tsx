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
  titleMr: string;
  titleEn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

const TAB_METADATA: Record<NavigationTab, TabMeta> = {
  home: {
    titleMr: "मार्गदर्शन व मुख्य मेनू",
    titleEn: "Home & Guidance",
    icon: Compass,
    color: "from-indigo-600 to-slate-900",
  },
  auth_portal: {
    titleMr: "विद्यार्थी व क्लासेस लॉगिन पॅनल",
    titleEn: "Student & Class Auth Portal",
    icon: User,
    color: "from-indigo-600 to-slate-900",
    badge: "Login / Register",
  },
  classes_portal: {
    titleMr: "क्लासेस पोर्टल व वीकली टेस्ट्स",
    titleEn: "Classes Portal & Weekly Tests",
    icon: Building2,
    color: "from-indigo-700 to-purple-800",
    badge: "Coaching Hub",
  },
  classes_info: {
    titleMr: "क्लासेस नोंदणी व ४०% कमिशन माहिती",
    titleEn: "Classes Registration & Info",
    icon: Building2,
    color: "from-purple-700 to-indigo-800",
    badge: "40% Referral",
  },
  grand_tests: {
    titleMr: "१००+ ग्रँड मुख्य परीक्षा सिम्युलेटर",
    titleEn: "100+ Grand Exam Mocks",
    icon: Trophy,
    color: "from-amber-600 to-orange-700",
    badge: "100+ Full Tests",
  },
  all_questions: {
    titleMr: "सर्व प्रश्नसंच रिपॉझिटरी",
    titleEn: "All Questions Bank",
    icon: Layers,
    color: "from-blue-600 to-indigo-700",
  },
  notes: {
    titleMr: "टॉपिक नोट्स व रिव्हिजन शीट्स",
    titleEn: "Topic Notes & Quick Revision",
    icon: BookOpen,
    color: "from-emerald-600 to-teal-700",
    badge: "PDF Ready",
  },
  practice: {
    titleMr: "सराव मोड (Practice Mode)",
    titleEn: "Subject-wise Practice",
    icon: HelpCircle,
    color: "from-blue-600 to-indigo-700",
  },
  pyq: {
    titleMr: "मागील वर्षांचे प्रश्न (PYQ 2018-2024)",
    titleEn: "PYQ Archive",
    icon: Clock,
    color: "from-purple-600 to-pink-700",
  },
  mock_test: {
    titleMr: "मॉक टेस्ट व प्रश्नपत्रिका सेटअप",
    titleEn: "Mock Test Setup",
    icon: Send,
    color: "from-emerald-600 to-teal-700",
  },
  omr: {
    titleMr: "डिजिटल OMR शीट सिम्युलेटर",
    titleEn: "Digital OMR Sheet",
    icon: FileText,
    color: "from-rose-600 to-red-700",
  },
  pdf_bank: {
    titleMr: "२५,००० MCQ बँक व PDF जनरेटर",
    titleEn: "25,000 MCQ Bank & PDF Generator",
    icon: FileText,
    color: "from-amber-600 to-orange-700",
    badge: "Print Ready",
  },
  mistakes: {
    titleMr: "चूक बँक व ॲनालिसिस",
    titleEn: "Mistakes Bank & Error Log",
    icon: AlertTriangle,
    color: "from-rose-600 to-amber-700",
  },
  flashcards: {
    titleMr: "हाय-यिल्ड फ्लॅशकार्ड्स",
    titleEn: "High-Yield Smart Flashcards",
    icon: Zap,
    color: "from-amber-500 to-yellow-600",
    badge: "Smart Cards",
  },
  ai_generator: {
    titleMr: "AI प्रश्न जनरेटर",
    titleEn: "Gemini AI Question Generator",
    icon: Sparkles,
    color: "from-purple-600 to-indigo-700",
    badge: "AI Powered",
  },
  add_question: {
    titleMr: "नवीन प्रश्न जोडा / Bulk Import",
    titleEn: "Add Custom Questions",
    icon: PlusCircle,
    color: "from-emerald-600 to-teal-700",
  },
  bookmarks: {
    titleMr: "सेव्ह केलेले प्रश्न",
    titleEn: "Bookmarked Questions",
    icon: Bookmark,
    color: "from-amber-600 to-orange-600",
  },
  formulas: {
    titleMr: "फॉर्म्युला व शॉर्टकट ट्रिक्स",
    titleEn: "Formulas & Short Notes",
    icon: Cpu,
    color: "from-cyan-600 to-blue-700",
  },
  analytics: {
    titleMr: "प्रगती अहवाल व ॲनालिटिक्स",
    titleEn: "Performance & Analytics",
    icon: TrendingUp,
    color: "from-indigo-600 to-purple-700",
  },
  agent_portal: {
    titleMr: "एजंट पोर्टल व ३०% कमिशन",
    titleEn: "Agent 30% Commission Portal",
    icon: TrendingUp,
    color: "from-teal-600 to-emerald-700",
    badge: "30% Commission",
  },
  refer_earn: {
    titleMr: "विद्यार्थी रेफर व १००% फी रिफंड",
    titleEn: "Student Refer & 100% Refund",
    icon: Sparkles,
    color: "from-amber-600 to-orange-700",
    badge: "100% Refund",
  },
  leaderboard: {
    titleMr: "टॉपर रँकिंग व लीडरबोर्ड (Top 50)",
    titleEn: "Toppers Leaderboard",
    icon: Trophy,
    color: "from-amber-500 to-orange-600",
    badge: "Top 50",
  },
  coaching_register: {
    titleMr: "कोचिंग क्लासेस नोंदणी पोर्टल",
    titleEn: "Coaching Registration Portal",
    icon: Building2,
    color: "from-purple-700 to-indigo-800",
    badge: "30 Min Free",
  },
  feedback: {
    titleMr: "त्रुटी व चुका नोंदणी कक्ष (अभिप्राय)",
    titleEn: "Report Issues & Feedback",
    icon: AlertCircle,
    color: "from-rose-600 to-orange-600",
    badge: "Feedback",
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
    titleMr: "सराव विभाग",
    titleEn: "Active Section",
    icon: Compass,
    color: "from-indigo-600 to-slate-900",
  };

  const IconComp = currentMeta.icon;
  const previousTab = historyStack.length > 0 ? historyStack[historyStack.length - 1] : "home";
  const previousMeta = TAB_METADATA[previousTab];

  return (
    <>
      {/* Top Universal Back & Breadcrumb Bar */}
      <div className="sticky top-[57px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
          {/* Left Actions: Back Button & Home Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onBack}
              id="global-btn-back"
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:ring-2 hover:ring-indigo-400"
              title="मागील पानावर जा / Back"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>मागे जा (Back)</span>
            </button>

            <button
              onClick={onNavigateHome}
              id="global-btn-home"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 border border-slate-200 cursor-pointer transition-all"
              title="मुख्य मार्गदर्शन पानावर जा (Go to Home)"
            >
              <Home className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">मुख्य मेनू</span>
              <span className="sm:hidden">होम</span>
            </button>

            {/* Visual Divider */}
            <span className="h-5 w-px bg-slate-200 hidden sm:inline-block"></span>

            {/* Breadcrumb Trail */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span
                onClick={onNavigateHome}
                className="hover:text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Compass className="w-3 h-3 text-indigo-500" />
                <span>होम</span>
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              {previousTab !== "home" && previousMeta && (
                <>
                  <span
                    onClick={() => onNavigateTab(previousTab)}
                    className="hover:text-indigo-600 hover:underline cursor-pointer text-slate-600 truncate max-w-[120px]"
                  >
                    {previousMeta.titleMr.split(" ")[0]}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </>
              )}
              <span className="font-extrabold text-slate-900 truncate max-w-[180px]">
                {currentMeta.titleMr}
              </span>
            </div>
          </div>

          {/* Right Section Identifier & Exam Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs">
              <IconComp className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-extrabold text-slate-900 text-xs truncate max-w-[180px] sm:max-w-xs">
                {currentMeta.titleMr}
              </span>
              {currentMeta.badge && (
                <span className="hidden sm:inline-block text-[10px] font-black uppercase px-1.5 py-0.2 rounded-md bg-indigo-600 text-white">
                  {currentMeta.badge}
                </span>
              )}
            </div>

            <span className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-slate-900 text-amber-400 font-mono-numbers">
              {currentExam}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Back Button for Mobile & Long Pages */}
      <div className="fixed bottom-4 left-4 z-40 sm:hidden">
        <button
          onClick={onBack}
          id="floating-mobile-btn-back"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-black shadow-xl ring-2 ring-amber-400/80 backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>मागे जा</span>
        </button>
      </div>
    </>
  );
};
