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
  ChevronLeft,
  ChevronRight,
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
  FileSpreadsheet,
  Cpu,
  HelpCircle,
  ArrowRight,
  Share2,
  Megaphone,
  CheckCircle2,
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
  const [activeNoticeIndex, setActiveNoticeIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "practice" | "study" | "portal">("all");

  const isDemoUser = currentUser?.id?.startsWith("demo_user_");

  // Notice Board Announcements (जसे फोटोत वरती Notice Board स्लायडर आहे)
  const noticeItems = [
    {
      id: "notice-offer",
      tag: "विशेष ऑफर • 90% OFF",
      title: "MHT-CET • NEET • JEE संपूर्ण सराव संच फक्त ₹२९ मध्ये!",
      subtitle: "२५,०००+ प्रश्न, १० Grand Tests, सविस्तर नोट्स आणि OMR सिस्टीम उपलब्ध.",
      ctaText: "फक्त ₹२९ मध्ये सुरू करा",
      action: () => (onOpenPaymentModal ? onOpenPaymentModal() : onNavigate("grand_tests")),
      badgeColor: "bg-amber-400 text-slate-950",
      theme: "from-indigo-900 via-slate-900 to-indigo-950 text-white border-indigo-500/40",
    },
    {
      id: "notice-refund",
      tag: "🎁 १००% फी रिफंड",
      title: "१० मित्रांना रेफर करा आणि तुमची ₹२९ फी पूर्ण परत मिळवा!",
      subtitle: "तुमचा युनिक रेफरल कोड किंवा लिंक मित्रांना शेअर करा. प्रत्येक रेफरवर ₹५.८० थेट खात्यात!",
      ctaText: "रेफरल पोर्टल उघडा",
      action: () => onNavigate("refer_earn"),
      badgeColor: "bg-emerald-400 text-slate-950",
      theme: "from-emerald-950 via-slate-900 to-teal-950 text-white border-emerald-500/40",
    },
    {
      id: "notice-grand-tests",
      tag: "🏆 १० Grand Tests लाइव्ह",
      title: "नवीन NTA & State Board पॅटर्ननुसार १० संपूर्ण टेस्ट सिरीज!",
      subtitle: "निगेटिव्ह मार्किंग, अचूक परसेंटाईल कॅल्क्युलेटर आणि सविस्तर स्पष्टीकरणासह उत्तरपत्रिका.",
      ctaText: "ग्रँड टेस्ट द्या",
      action: () => onNavigate("grand_tests"),
      badgeColor: "bg-orange-400 text-slate-950",
      theme: "from-amber-950 via-slate-900 to-orange-950 text-white border-amber-500/40",
    },
    {
      id: "notice-classes",
      tag: "🏛️ क्लासेस व एजंट पार्टनर",
      title: "आपल्या कोचिंग क्लाससाठी ब्रँडेड टेस्ट पोर्टल सुरू करा!",
      subtitle: "विद्यार्थी बॅच मॅनेजमेंट, संस्था लोगो आणि थेट २०% कमिशन पेआऊट.",
      ctaText: "क्लासेस पोर्टल",
      action: () => onNavigate("classes_portal"),
      badgeColor: "bg-purple-400 text-slate-950",
      theme: "from-purple-950 via-slate-900 to-indigo-950 text-white border-purple-500/40",
    },
  ];

  // Auto-cycle Notice Board Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNoticeIndex((prev) => (prev + 1) % noticeItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [noticeItems.length]);

  const handlePrevNotice = () => {
    setActiveNoticeIndex((prev) => (prev === 0 ? noticeItems.length - 1 : prev - 1));
  };

  const handleNextNotice = () => {
    setActiveNoticeIndex((prev) => (prev + 1) % noticeItems.length);
  };

  const handleShareApp = () => {
    const shareText = `🎯 MHT-CET, NEET & JEE सराव करण्यासाठी हे सर्वोत्तम ॲप आहे! \n🔥 फक्त ₹२९ मध्ये २५,०००+ प्रश्न, १० Grand Tests, OMR आणि नोट्स!\n🎁 १० मित्रांना रेफर करा आणि १००% फी परत मिळवा!\n👉 आत्ताच सुरू करा: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: "MHT-CET • NEET • JEE सराव ॲप",
        text: shareText,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("ॲप लिंक कॉपी झाली आहे! आपण WhatsApp वर पाठवू शकता.");
    }
  };

  // 15 Clean Grid Icon Items (जसे स्क्रीनशॉटमध्ये स्वच्छ ३-कॉलम / ४-कॉलम आयकॉन्स आहेत)
  const homeGridItems = [
    {
      id: "tile-pyq",
      category: "practice",
      titleMr: "मागील प्रश्नपत्रिका",
      titleEn: "Previous Year Papers",
      shortLabel: "PYQ (2019-25)",
      badge: "2019-2025",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
      icon: History,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      action: () => onNavigate("pyq"),
    },
    {
      id: "tile-mock-tests",
      category: "practice",
      titleMr: "सराव चाचण्या",
      titleEn: "Chapter Mock Tests",
      shortLabel: "घटकनिहाय टेस्ट्स",
      badge: "सर्व विषय",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
      icon: Layers,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      action: () => onNavigate("mock_test"),
    },
    {
      id: "tile-grand-tests",
      category: "practice",
      titleMr: "ग्रँड टेस्ट्स",
      titleEn: "10 Full Simulators",
      shortLabel: "१० मुख्य संच",
      badge: "१० संच NTA",
      badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold",
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      action: () => onNavigate("grand_tests"),
      popular: true,
    },
    {
      id: "tile-omr-test",
      category: "practice",
      titleMr: "डिजिटल OMR टेस्ट",
      titleEn: "OMR Sheet Practice",
      shortLabel: "OMR सराव",
      badge: "लाईव्ह टाइमर",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
      icon: CircleDot,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
      action: () => onNavigate("omr"),
    },
    {
      id: "tile-question-bank",
      category: "practice",
      titleMr: "प्रश्नसंच बँक",
      titleEn: "25,000+ Question Bank",
      shortLabel: "Master Q-Bank",
      badge: "२५,०००+ MCQs",
      badgeColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
      icon: FileText,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
      action: () => onNavigate("all_questions"),
    },
    {
      id: "tile-daily-streak",
      category: "practice",
      titleMr: "दैनिक २० प्रश्न",
      titleEn: "Daily Target Streak",
      shortLabel: "२० प्रश्न चॅलेंज",
      badge: "दररोज सराव",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
      icon: Flame,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
      action: () => onNavigate("mock_test"),
    },
    {
      id: "tile-topic-notes",
      category: "study",
      titleMr: "अभ्यास नोट्स",
      titleEn: "Topic Short Notes",
      shortLabel: "चॅप्टर नोट्स",
      badge: "Quick Revision",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
      action: () => onNavigate("notes"),
    },
    {
      id: "tile-formulas",
      category: "study",
      titleMr: "महत्त्वाची सूत्रे",
      titleEn: "Formula Sheets & Tricks",
      shortLabel: "फॉर्म्युला हँडबुक",
      badge: "शॉर्टकट ट्रिक्स",
      badgeColor: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
      icon: Zap,
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400",
      action: () => onNavigate("formulas"),
    },
    {
      id: "tile-flashcards",
      category: "study",
      titleMr: "स्पीड फ्लॅशकार्ड्स",
      titleEn: "High-Yield Flashcards",
      shortLabel: "फ्लॅशकार्ड्स",
      badge: "तोंडपाठ करा",
      badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
      icon: Sparkles,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
      action: () => onNavigate("flashcards"),
    },
    {
      id: "tile-mistakes-bank",
      category: "study",
      titleMr: "माझ्या चुकांची वही",
      titleEn: "Mistakes Notebook",
      shortLabel: "चूक दुरुस्ती",
      badge: "Auto-Saved",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
      icon: AlertTriangle,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400",
      action: () => onNavigate("mistakes"),
    },
    {
      id: "tile-pdf-bank",
      category: "study",
      titleMr: "PDF व प्रिंट बँक",
      titleEn: "Printable Test Papers",
      shortLabel: "Printable PDF",
      badge: "OMR + प्रश्न",
      badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
      icon: Printer,
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
      action: () => onNavigate("pdf_bank"),
    },
    {
      id: "tile-bookmarks",
      category: "study",
      titleMr: "महत्त्वाचे प्रश्न",
      titleEn: "Saved Starred Questions",
      shortLabel: "बुकमार्क्स",
      badge: "स्टार केलेले",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
      icon: Bookmark,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      action: () => onNavigate("bookmarks"),
    },
    {
      id: "tile-refer-earn",
      category: "portal",
      titleMr: "रेफर आणि कमवा",
      titleEn: "100% Fee Refund Tracker",
      shortLabel: "१००% रिफंड पोर्टल",
      badge: "१० मित्र = रिफंड",
      badgeColor: "bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300 font-bold",
      icon: Gift,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      action: () => onNavigate("refer_earn"),
      popular: true,
    },
    {
      id: "tile-leaderboard",
      category: "portal",
      titleMr: "महा लीडरबोर्ड",
      titleEn: "State Rank & Percentile",
      shortLabel: "महाराष्ट्र रँक",
      badge: "Top 100",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
      icon: BarChart3,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      action: () => onNavigate("leaderboard"),
    },
    {
      id: "tile-classes-portal",
      category: "portal",
      titleMr: "क्लासेस पोर्टल",
      titleEn: "Coaching Class System",
      shortLabel: "संस्था डॅशबोर्ड",
      badge: "संस्था कोड",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
      icon: Building2,
      color: "from-indigo-600 to-blue-700",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
      action: () => onNavigate("classes_portal"),
    },
    {
      id: "tile-agent-portal",
      category: "portal",
      titleMr: "एजंट पोर्टल",
      titleEn: "Agent Partner 20% Payout",
      shortLabel: "२०% कमिशन",
      badge: "थेट UPI पेआऊट",
      badgeColor: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
      icon: Users,
      color: "from-teal-600 to-cyan-700",
      bgColor: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
      action: () => onNavigate("agent_portal"),
    },
    {
      id: "tile-ai-generator",
      category: "portal",
      titleMr: "AI प्रश्न जनरेटर",
      titleEn: "Custom AI Exam Creator",
      shortLabel: "AI टेस्ट मेकर",
      badge: "Smart AI",
      badgeColor: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300",
      icon: Cpu,
      color: "from-fuchsia-500 to-pink-600",
      bgColor: "bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400",
      action: () => onNavigate("ai_generator"),
    },
    {
      id: "tile-feedback",
      category: "portal",
      titleMr: "मदत व तक्रार",
      titleEn: "Student Helpdesk",
      shortLabel: "सपोर्ट सेंटर",
      badge: "२४x७ सपोर्ट",
      badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
      icon: HelpCircle,
      color: "from-slate-600 to-slate-800",
      bgColor: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
      action: () => onNavigate("feedback"),
    },
  ];

  // Search filtering
  const filteredGridItems = homeGridItems.filter((item) => {
    const matchesSearch =
      item.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortLabel.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && item.category === selectedCategory;
  });

  const activeNotice = noticeItems[activeNoticeIndex];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 animate-in fade-in">
      {/* 1. TOP ACCOUNT & LOGIN STATUS BAR */}
      <div
        id="home-account-strip"
        className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <GraduationCap className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {currentUser && !isDemoUser ? `नमस्कार, ${currentUser.name}` : "विद्यार्थी सराव पोर्टल"}
              </span>
              {currentUser && !isDemoUser ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>सक्रिय</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-[10px] font-bold border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span>डेमो: {formatTrialTime(trialSecondsRemaining)}</span>
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              लक्ष्य परीक्षा: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{currentExam}</strong>
              {currentUser?.mobile && <span> • {currentUser.mobile}</span>}
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          {currentUser && !isDemoUser ? (
            <>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>खाते</span>
              </button>
              {onOpenAdminDashboard && (
                <button
                  type="button"
                  onClick={onOpenAdminDashboard}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin</span>
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-rose-200 dark:border-rose-800"
                  title="लॉग आऊट करा"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>लॉगिन</span>
              </button>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>नोंदणी</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. NOTICE BOARD SLIDING CARD (जसे फोटो २ मध्ये वरती Notice Board स्लायडर आहे) */}
      <div
        id="home-notice-board-card"
        className={`rounded-3xl p-5 sm:p-6 border-2 transition-all relative overflow-hidden bg-gradient-to-br ${activeNotice.theme} shadow-lg`}
      >
        <div className="relative z-10 space-y-3">
          {/* Top Notice Board Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                <span>सूचना फलक (Notice Board)</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-xs ${activeNotice.badgeColor}`}>
                {activeNotice.tag}
              </span>
              <div className="flex items-center gap-1 pl-2">
                <button
                  type="button"
                  onClick={handlePrevNotice}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="मागील सूचना"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextNotice}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="पुढील सूचना"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notice Title & Content */}
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {activeNotice.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed">
              {activeNotice.subtitle}
            </p>
          </div>

          {/* Action & Pagination Dots */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5">
              {noticeItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveNoticeIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeNoticeIndex ? "w-6 bg-amber-400" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  title={`सूचना ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={activeNotice.action}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{activeNotice.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleShareApp}
                className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-white/20"
                title="मित्रांना शेअर करा"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">शेअर</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TARGET EXAM SELECTOR & SEARCH BAR (जसे फोटो १ मध्ये वरती Class 12th Exam + Search आहे) */}
      <div className="space-y-3">
        {/* Exam Target Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold w-full sm:w-auto">
            {(["MHT_CET", "NEET", "JEE_MAIN"] as ExamType[]).map((exam) => (
              <button
                key={exam}
                type="button"
                onClick={() => onSelectExam && onSelectExam(exam)}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  currentExam === exam
                    ? "bg-indigo-600 text-white font-black shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>
                  {exam === "MHT_CET" ? "🎯 MHT-CET" : exam === "NEET" ? "🩺 NEET" : "⚡ JEE Main"}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Demo Test Short Link for non-logged users */}
          {(!currentUser || isDemoUser) && onStartDemoTest && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-amber-600 dark:text-amber-400">मोफत डेमो:</span>
              <button
                type="button"
                onClick={() => onStartDemoTest(currentExam, 1)}
                className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-black hover:underline cursor-pointer border border-amber-300 dark:border-amber-700"
              >
                डेमो टेस्ट १ सुरू करा →
              </button>
            </div>
          )}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="सराव टेस्ट, PYQ, नोट्स, फॉर्म्युले किंवा विषय शोधा..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 font-medium shadow-2xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              सर्व विभाग
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("practice")}
              className={`px-3 py-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedCategory === "practice"
                  ? "bg-blue-600 text-white font-black shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              सराव व टेस्ट्स
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("study")}
              className={`px-3 py-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedCategory === "study"
                  ? "bg-indigo-600 text-white font-black shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              नोट्स व रिव्हिजन
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("portal")}
              className={`px-3 py-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedCategory === "portal"
                  ? "bg-emerald-600 text-white font-black shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              रिफंड व पोर्टल्स
            </button>
          </div>
        </div>
      </div>

      {/* 4. CLEAN 3-COLUMN / 4-COLUMN ICON GRID (जसे फोटो १ व फोटो २ मध्ये स्पष्ट आणि सुंदर डिझाईन आहे) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>सर्व अभ्यास विभाग (Main Features Grid)</span>
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
            एकूण {filteredGridItems.length} विभाग
          </span>
        </div>

        {/* 3-Column on Mobile, 4-Column on Desktop Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {filteredGridItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                type="button"
                onClick={item.action}
                className={`group p-3 sm:p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between text-center cursor-pointer relative overflow-hidden hover:-translate-y-1 active:scale-95 ${
                  item.popular ? "ring-2 ring-amber-400/60 dark:ring-amber-500/50" : ""
                }`}
              >
                {/* Popular / New Badge */}
                {item.popular && (
                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase shadow-2xs">
                    ★ Top
                  </span>
                )}

                {/* Circular / Rounded Colorful Icon */}
                <div className="pt-1 pb-2">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.bgColor}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>

                {/* Title & Subtext */}
                <div className="space-y-0.5 w-full">
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {item.titleMr}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold line-clamp-1">
                    {item.shortLabel}
                  </div>
                </div>

                {/* Mini Badge at bottom */}
                <div className="pt-2 w-full">
                  <span
                    className={`inline-block w-full py-0.5 px-1 rounded-lg text-[9px] sm:text-[10px] font-bold truncate ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. BOTTOM QUICK REFERRAL & REWARD TEASER */}
      <div
        id="home-bottom-refund-strip"
        className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400 shrink-0" />
            <h4 className="text-sm sm:text-base font-black text-white">
              १० रेफरल्स पूर्ण करा = १००% फी रिफंड किंवा थेट UPI विड्रॉल! 🎁
            </h4>
          </div>
          <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
            प्रत्येक मित्राच्या ₹२९ नोंदणीवर <strong>₹५.८० थेट कमिशन</strong>. १० मित्रांना ॲप जोडा आणि तुमची फी १००% परत मिळवा.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("refer_earn")}
          className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          <Gift className="w-4 h-4" />
          <span>रेफरल डॅशबोर्ड उघडा →</span>
        </button>
      </div>
    </div>
  );
};
