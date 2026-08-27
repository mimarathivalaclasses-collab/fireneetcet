import React, { useState, useEffect } from "react";
import {
  History,
  Layers,
  Trophy,
  BookOpen,
  CircleDot,
  FileText,
  AlertTriangle,
  Sparkles,
  Printer,
  Users,
  Gift,
  Building2,
  Bookmark,
  BarChart3,
  Flame,
  Search,
  Target,
  Clock,
  ShieldCheck,
  LogIn,
  LogOut,
  UserPlus,
  RefreshCw,
  Zap,
  KeyRound,
  GraduationCap,
  Cpu,
  HelpCircle,
  ArrowRight,
  Share2,
  Megaphone,
  CheckCircle2,
  Play,
  X,
  ChevronRight,
  FileCheck,
} from "lucide-react";
import { ExamType, LanguageMode, NavigationTab, StudentUser } from "../types";
import { formatTrialTime } from "../utils/deviceSecurity";

interface HomeGuidanceViewProps {
  currentExam: ExamType;
  onSelectExam?: (exam: ExamType) => void;
  language: LanguageMode;
  onNavigate: (tab: NavigationTab) => void;
  currentUser: StudentUser | null;
  trialSecondsRemaining: number;
  onOpenAuthModal: () => void;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
  onLogout?: () => void;
  onStartDemoTest?: (exam: ExamType, demoIndex: number) => void;
}

export const HomeGuidanceView: React.FC<HomeGuidanceViewProps> = ({
  currentExam,
  onSelectExam,
  language,
  onNavigate,
  currentUser,
  trialSecondsRemaining,
  onOpenAuthModal,
  onOpenPaymentModal,
  onOpenAdminDashboard,
  onLogout,
  onStartDemoTest,
}) => {
  const [showNotice, setShowNotice] = useState<boolean>(true);
  const [activeNoticeIdx, setActiveNoticeIdx] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<"study" | "extra">("study");

  const isDemoUser = currentUser?.id?.startsWith("demo_user_");

  // Compact ticker notices (takes very little space on top)
  const compactNotices = [
    {
      id: "n1",
      tag: "🔥 विशेष ऑफर",
      text: "MHT-CET • NEET • JEE संपूर्ण सराव संच फक्त ₹२९ मध्ये उपलब्ध!",
      cta: "सुरू करा",
      action: () => (onOpenPaymentModal ? onOpenPaymentModal() : onNavigate("grand_tests")),
    },
    {
      id: "n2",
      tag: "🎁 १००% रिफंड",
      text: "१० मित्रांना ॲप शेअर करा आणि तुमची फी पूर्ण परत मिळवा!",
      cta: "रेफर करा",
      action: () => onNavigate("refer_earn"),
    },
    {
      id: "n3",
      tag: "🏆 Grand Tests",
      text: "१० संपूर्ण नवीन पॅटर्न मॉक टेस्ट्स आणि OMR सिस्टीम लाईव्ह आहे.",
      cta: "टेस्ट पहा",
      action: () => onNavigate("grand_tests"),
    },
  ];

  // Auto cycle compact notice every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNoticeIdx((prev) => (prev + 1) % compactNotices.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [compactNotices.length]);

  const currentNotice = compactNotices[activeNoticeIdx];

  // The 4 Primary Student Hero Cards
  const primaryHeroCards = [
    {
      id: "hero-mock-test",
      title: "मॉक टेस्ट सोडवा",
      titleEn: "Start Mock Test",
      description: "विषय व चॅप्टर निवडून थेट टाईमरसह टेस्ट सुरू करा",
      badge: "सराव चाचण्या",
      badgeColor: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
      gradient: "from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800",
      icon: Play,
      iconBg: "bg-white/20 text-white",
      action: () => onNavigate("mock_test"),
      buttonText: "टेस्ट सुरू करा →",
    },
    {
      id: "hero-notes-formulas",
      title: "नोट्स व सूत्रे",
      titleEn: "Revision Notes & Formulas",
      description: "Physics, Chemistry, Maths व Biology चॅप्टर नोट्स आणि शॉर्ट ट्रिक्स",
      badge: "रिव्हिजन",
      badgeColor: "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200",
      gradient: "from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800",
      icon: BookOpen,
      iconBg: "bg-white/20 text-white",
      action: () => onNavigate("notes"),
      buttonText: "नोट्स वाचा →",
    },
    {
      id: "hero-pyq-papers",
      title: "मागील प्रश्नपत्रिका",
      titleEn: "PYQ Papers (2019-2025)",
      description: "गेल्या ६ वर्षांतील अधिकृत बोर्ड व CET प्रश्न स्पष्टीकरणासह",
      badge: "PYQ सराव",
      badgeColor: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
      gradient: "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800",
      icon: History,
      iconBg: "bg-white/20 text-white",
      action: () => onNavigate("pyq"),
      buttonText: "PYQ सोडवा →",
    },
    {
      id: "hero-mistakes-book",
      title: "माझ्या चुकांची वही",
      titleEn: "Mistakes Notebook",
      description: "टेस्टमध्ये चुकलेले प्रश्न आपोआप सेव्ह होतात; पुन्हा सराव करा",
      badge: "सुधारणा",
      badgeColor: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
      gradient: "from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800",
      icon: AlertTriangle,
      iconBg: "bg-white/20 text-white",
      action: () => onNavigate("mistakes"),
      buttonText: "चुका पहा →",
    },
  ];

  // Secondary practice & study tools (Clean, well-spaced)
  const studyTools = [
    {
      id: "tool-grand-tests",
      title: "१० ग्रँड टेस्ट्स",
      sub: "संपूर्ण पॅटर्न मॉक सिरीज",
      badge: "१० संच",
      icon: Trophy,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      action: () => onNavigate("grand_tests"),
    },
    {
      id: "tool-omr",
      title: "डिजिटल OMR टेस्ट",
      sub: "गोल रंगवण्याचा प्रत्यक्ष सराव",
      badge: "OMR शीट",
      icon: CircleDot,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400",
      action: () => onNavigate("omr"),
    },
    {
      id: "tool-formulas",
      title: "महत्त्वाची सूत्रे",
      sub: "फॉर्म्युला हँडबुक व ट्रिक्स",
      badge: "शॉर्टकट",
      icon: Zap,
      color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 dark:text-yellow-400",
      action: () => onNavigate("formulas"),
    },
    {
      id: "tool-flashcards",
      title: "स्पीड फ्लॅशकार्ड्स",
      sub: "जलद उजळणी व व्याख्या",
      badge: "फ्लॅशकार्ड्स",
      icon: Sparkles,
      color: "text-violet-600 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-400",
      action: () => onNavigate("flashcards"),
    },
    {
      id: "tool-pdf",
      title: "PDF व प्रिंट बँक",
      sub: "प्रिंट काढून सोडवण्यासाठी",
      badge: "Print PDF",
      icon: Printer,
      color: "text-teal-600 bg-teal-50 dark:bg-teal-950/50 dark:text-teal-400",
      action: () => onNavigate("pdf_bank"),
    },
    {
      id: "tool-qbank",
      title: "प्रश्नसंच बँक",
      sub: "२५,०००+ प्रश्न संग्रह",
      badge: "२५,०००+ MCQs",
      icon: FileText,
      color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-400",
      action: () => onNavigate("all_questions"),
    },
    {
      id: "tool-bookmarks",
      title: "महत्त्वाचे प्रश्न",
      sub: "स्टार केलेले आवडते प्रश्न",
      badge: "Saved",
      icon: Bookmark,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      action: () => onNavigate("bookmarks"),
    },
    {
      id: "tool-leaderboard",
      title: "महाराष्ट्र रँक",
      sub: "विद्यार्थ्यांमधील क्रमवारी",
      badge: "लीडरबोर्ड",
      icon: BarChart3,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400",
      action: () => onNavigate("leaderboard"),
    },
  ];

  const extraPortals = [
    {
      id: "portal-refer",
      title: "रेफर आणि कमवा",
      sub: "१० मित्र = १००% फी रिफंड",
      badge: "₹५.८०/विद्यार्थी",
      icon: Gift,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      action: () => onNavigate("refer_earn"),
    },
    {
      id: "portal-classes",
      title: "कोचिंग क्लासेस पोर्टल",
      sub: "संस्था डॅशबोर्ड व बॅचेस",
      badge: "संस्था कोड",
      icon: Building2,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
      action: () => onNavigate("classes_portal"),
    },
    {
      id: "portal-agent",
      title: "एजंट पार्टनर पोर्टल",
      sub: "२०% थेट कमिशन पेआऊट",
      badge: "UPI पेआऊट",
      icon: Users,
      color: "text-teal-600 bg-teal-50 dark:bg-teal-950/50 dark:text-teal-400",
      action: () => onNavigate("agent_portal"),
    },
    {
      id: "portal-ai",
      title: "AI प्रश्न जनरेटर",
      sub: "कस्टम टेस्ट मेकर",
      badge: "AI सराव",
      icon: Cpu,
      color: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-950/50 dark:text-fuchsia-400",
      action: () => onNavigate("ai_generator"),
    },
    {
      id: "portal-feedback",
      title: "मदत व सपोर्ट",
      sub: "काही अडचण आल्यास संपर्क",
      badge: "२४x७ सपोर्ट",
      icon: HelpCircle,
      color: "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300",
      action: () => onNavigate("feedback"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 space-y-4 animate-in fade-in">
      {/* 1. COMPACT 1-LINE ANNOUNCEMENT TICKER (Reduced space / Minimal) */}
      {showNotice && (
        <div
          id="compact-notice-ticker"
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-50 via-amber-100 to-orange-50 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-orange-950/30 border border-amber-300/80 dark:border-amber-700/60 flex items-center justify-between gap-2 text-xs shadow-2xs transition-all"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] shrink-0 uppercase tracking-wide">
              {currentNotice.tag}
            </span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate text-[11px] sm:text-xs">
              {currentNotice.text}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={currentNotice.action}
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] transition-colors cursor-pointer"
            >
              {currentNotice.cta}
            </button>
            <button
              type="button"
              onClick={() => setShowNotice(false)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title="सूचना बंद करा"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. STUDENT STATUS & EXAM TARGET SELECTOR */}
      <div
        id="student-quick-bar"
        className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3"
      >
        {/* Student Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <GraduationCap className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                {currentUser && !isDemoUser ? `नमस्कार, ${currentUser.name}` : "विद्यार्थी सराव पोर्टल"}
              </span>
              {currentUser && !isDemoUser ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>सक्रिय विद्यार्थी</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-[10px] font-bold border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>डेमो वेळ: {formatTrialTime(trialSecondsRemaining)}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              खालीलपैकी कोणताही पर्याय निवडून तात्काळ सराव सुरू करा 👇
            </p>
          </div>
        </div>

        {/* Target Exam Switcher Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold w-full sm:w-auto">
          {(["MHT_CET", "NEET", "JEE_MAIN"] as ExamType[]).map((exam) => (
            <button
              key={exam}
              type="button"
              onClick={() => onSelectExam && onSelectExam(exam)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-black flex items-center justify-center gap-1 ${
                currentExam === exam
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>{exam === "MHT_CET" ? "🎯 MHT-CET" : exam === "NEET" ? "🩺 NEET" : "⚡ JEE"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. THE 4 MAIN HERO STUDENT ACTION CARDS (मोठे, स्पष्ट आणि वापरण्यास अतिशय सोपे) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>मुख्य सराव पर्याय (Select & Start):</span>
          </h2>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            🎯 {currentExam}
          </span>
        </div>

        {/* 2x2 Grid of Large, Clear Study Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {primaryHeroCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                onClick={card.action}
                className="group relative rounded-3xl p-4 sm:p-5 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${card.gradient} text-white group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    {card.titleEn}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      card.action();
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black text-white shadow-xs transition-all flex items-center gap-1.5 bg-gradient-to-r ${card.gradient}`}
                  >
                    <span>{card.buttonText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. HOW TO USE QUICK 3-STEP GUIDE FOR STUDENTS (अतिशय सोपी मराठी मार्गदर्शिका) */}
      <div
        id="quick-student-steps"
        className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60"
      >
        <div className="text-xs font-black text-indigo-950 dark:text-indigo-300 mb-2.5 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>ॲप कसे वापरावे? (३ सोप्या पायऱ्या):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
              १
            </span>
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">विषय निवडा</strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Physics, Chemistry, Maths किंवा Bio निवडा.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
              २
            </span>
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">प्रश्नांची उत्तरे द्या</strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                योग्य पर्यायावर टिक करा आणि 'Next' दाबा.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
              ३
            </span>
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">निकाल व स्पष्टीकरण</strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                टेस्ट शेवटी तुमचे गुण व सविस्तर उत्तरे मिळतील!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECONDARY TOOLS & FEATURES (CLEAN TABS: अभ्यास साधने vs इतर सुविधा) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedTab("study")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTab === "study"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>इतर सराव साधने ({studyTools.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("extra")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTab === "extra"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>पोर्टल्स व सुविधा ({extraPortals.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Grid based on Tab */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {(selectedTab === "study" ? studyTools : extraPortals).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                type="button"
                onClick={item.action}
                className="group p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs hover:shadow-xs transition-all flex flex-col items-start justify-between text-left cursor-pointer active:scale-95"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. BOTTOM REFER & EARN 1-CLICK STRIP */}
      <div
        id="home-bottom-refer-strip"
        className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-400 text-slate-950">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white">
              १० मित्रांना ॲप जोडा = १००% फी रिफंड किंवा थेट UPI विड्रॉल! 🎁
            </h4>
            <p className="text-[11px] text-emerald-200/90 font-medium">
              प्रत्येक मित्राच्या नोंदीवर ₹५.८० कमिशन खात्यात जमा होते.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("refer_earn")}
          className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shrink-0 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <span>रेफरल डॅशबोर्ड</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

