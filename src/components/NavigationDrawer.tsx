import React from "react";
import {
  X,
  User,
  Moon,
  Sun,
  Trophy,
  BarChart3,
  History,
  Bookmark,
  Share2,
  Shield,
  Building2,
  Zap,
  Gift,
  HelpCircle,
  Phone,
  MessageSquare,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
  Star,
  FileText,
  Layers,
} from "lucide-react";
import { StudentUser, ExamType, NavigationTab, LanguageMode } from "../types";
import { MiMarathiwalaLogo } from "./MiMarathiwalaLogo";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentUser | null;
  currentExam?: ExamType;
  onSelectExam?: (exam: ExamType) => void;
  activeTab: NavigationTab;
  onNavigate?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  bookmarkCount?: number;
  mistakesCount?: number;
  trialSecondsRemaining?: number;
  pendingApprovalsCount?: number;
  onOpenAuthModal: () => void;
  onOpenPaymentModal: () => void;
  onOpenAdminDashboard: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentExam = "MHT_CET",
  onSelectExam,
  activeTab,
  onNavigate,
  onSelectTab,
  isDarkMode = false,
  onToggleDarkMode,
  bookmarkCount = 0,
  mistakesCount = 0,
  trialSecondsRemaining = 600,
  pendingApprovalsCount = 0,
  onOpenAuthModal,
  onOpenPaymentModal,
  onOpenAdminDashboard,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (tab: NavigationTab) => {
    if (onNavigate) {
      onNavigate(tab);
    } else if (onSelectTab) {
      onSelectTab(tab);
    }
    onClose();
  };

  const handleShareApp = () => {
    const shareText = `🎯 Mi Marathiwala Classes (Ambad) - MHT-CET, NEET & JEE Main Practice App!\n🔥 Only ₹29 for 25,000+ MCQs, 10 Grand Tests, Practice & Notes!\n🎁 Refer 10 friends and get 100% Fee Refund!\n👉 Start Now: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: "Mi Marathiwala Classes - MHT-CET • NEET • JEE Practice App",
        text: shareText,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("App link copied! You can now share it on WhatsApp.");
    }
  };

  const handleRateUs = () => {
    alert("⭐⭐⭐⭐⭐ \n\nThank you! Your 5-star rating means a lot to us. Share your feedback via WhatsApp at 9307220454.");
  };

  const handleOpenWhatsAppAdmin = () => {
    const msg = encodeURIComponent(
      currentUser
        ? `Hello Admin, I am ${currentUser.name} (${currentUser.mobile}). I need information regarding app/payment approval.`
        : `Hello Admin, I need information regarding MHT-CET / NEET practice app and class registration.`
    );
    window.open(`https://wa.me/919307220454?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`relative w-[300px] sm:w-[340px] max-w-[85vw] h-full ${
          isDarkMode ? "bg-slate-900 text-slate-100 border-r border-slate-800" : "bg-white text-slate-900 border-r border-slate-200"
        } shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200`}
      >
        {/* Header Profile Section - Bhagva Theme */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-stone-950 via-orange-950 to-stone-900 text-white relative border-b border-orange-500/20">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-orange-600/60 text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* App Brand Banner */}
          <div className="mb-3.5 pr-8 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <MiMarathiwalaLogo size="sm" showText={false} />
              <div className="min-w-0">
                <span className="font-black text-sm text-white tracking-tight block truncate">
                  NCJ MOCK TEST APP
                </span>
                <span className="text-[10px] text-amber-300 font-bold block truncate">
                  Mi Marathiwala Classes, Ambad
                </span>
              </div>
            </div>
            <p className="text-[9px] text-orange-200/90 font-medium leading-tight mt-1.5">
              Competitive Exam Center • (MHT-CET | NEET | JEE Main)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shrink-0">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm truncate text-white">
                {currentUser ? currentUser.name : "Guest Student"}
              </h3>
              <p className="text-[11px] text-slate-300 font-mono-numbers">
                {currentUser ? `📱 ${currentUser.mobile}` : "Login for full access"}
              </p>
              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                {currentUser ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified Account
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuthModal();
                      onClose();
                    }}
                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center gap-1 hover:bg-amber-300 transition-colors"
                  >
                    <LogIn className="w-3 h-3" />
                    Login / Register
                  </button>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-bold">
                  {currentExam}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight Banner in Drawer */}
          <div className="mt-3.5 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="line-through text-slate-400 text-[11px]">₹299</span>
                <span className="font-black text-amber-300 text-sm">₹29</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-600 text-white uppercase">
                  90% OFF
                </span>
              </div>
              <p className="text-[10px] text-emerald-300">Refer 10 = 100% Refund</p>
            </div>
            <button
              onClick={() => {
                onOpenPaymentModal();
                onClose();
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] shadow-sm transition-all cursor-pointer"
            >
              Get Now
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Menu Options */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {/* Night Mode Toggle */}
          <div
            onClick={onToggleDarkMode}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
              isDarkMode ? "hover:bg-slate-800 text-slate-200" : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            <div className="flex items-center gap-3 text-xs font-bold">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Night Mode</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isDarkMode ? "bg-indigo-900/60 text-indigo-300" : "bg-slate-200 text-slate-700"
              }`}
            >
              {isDarkMode ? "ON" : "OFF"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-1.5" />

          {/* Student Refer & Earn (Top Highlight) */}
          <button
            onClick={() => handleItemClick("refer_earn")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "refer_earn"
                ? "bg-emerald-600 text-white shadow-md"
                : isDarkMode
                ? "text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50"
                : "text-emerald-950 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>🎁 Refer & Earn (₹29 Back / Commission)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-emerald-500 text-slate-950">
              Refer 10 = Free
            </span>
          </button>


          {/* Practice Auto-Question Engine */}
          <button
            onClick={() => handleItemClick("practice")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "practice"
                ? "bg-emerald-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>⚡ Practice (1,250,000+ Question Bank)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-900">
              Auto Sets
            </span>
          </button>

          {/* Grand Tests */}
          <button
            onClick={() => handleItemClick("grand_tests")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "grand_tests"
                ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>🏆 Grand Tests (NEET 180Q / MHT-CET)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 text-amber-900">
              NEET 180Q
            </span>
          </button>

          {/* Topic-Wise Mock Tests */}
          <button
            onClick={() => handleItemClick("mock_test")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "mock_test"
                ? "bg-blue-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>🎯 Topic-wise Mock Tests</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-blue-100 text-blue-900">
              Topic Mocks
            </span>
          </button>

          {/* PYQ Papers */}
          <button
            onClick={() => handleItemClick("pyq")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "pyq"
                ? "bg-emerald-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-emerald-500" />
              <span>📑 Previous Year PYQs (2019-2025)</span>
            </div>
          </button>

          {/* Study Material & Notes */}
          <button
            onClick={() => handleItemClick("notes")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "notes"
                ? "bg-indigo-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>📚 Study Notes & Formulas</span>
            </div>
          </button>

          {/* Performance & Analytics */}
          <button
            onClick={() => handleItemClick("analytics")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "analytics"
                ? "bg-teal-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 text-teal-500" />
              <span>📊 Performance Analytics</span>
            </div>
          </button>

          {/* Leaderboard (Top 50 Students) */}
          <button
            onClick={() => handleItemClick("leaderboard")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "leaderboard"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>🏆 Leaderboard (Top 50 Ranking)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-amber-200 text-amber-950">
              Live
            </span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => handleItemClick("bookmarks")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "bookmarks"
                ? "bg-amber-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>🔖 Saved Questions</span>
            </div>
            {bookmarkCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 text-amber-900 font-mono-numbers">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Student Refer & Earn */}
          <button
            onClick={() => handleItemClick("refer_earn")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "refer_earn"
                ? "bg-emerald-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-4 h-4 text-emerald-500" />
              <span>💰 Refer & Get 100% Refund</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-emerald-100 text-emerald-950">
              Refer 10
            </span>
          </button>

          {/* Feedback & Problem Report */}
          <button
            onClick={() => handleItemClick("feedback")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "feedback"
                ? "bg-rose-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <span>💬 Report Error / Feedback</span>
            </div>
          </button>

          {/* Share App */}
          <button
            onClick={handleShareApp}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              isDarkMode ? "text-slate-200 hover:bg-slate-800" : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-blue-500" />
              <span>📤 Share App</span>
            </div>
          </button>

          {/* Rate Us */}
          <button
            onClick={handleRateUs}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              isDarkMode ? "text-slate-200 hover:bg-slate-800" : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-500" />
              <span>⭐ Rate Us</span>
            </div>
          </button>

          {/* Rules, Regulations & Compliance Center */}
          <button
            onClick={() => handleItemClick("compliance_rules")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              activeTab === "compliance_rules"
                ? "bg-indigo-600 text-white"
                : isDarkMode
                ? "text-slate-200 hover:bg-slate-800"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>📜 Rules & Regulations</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Rules
            </span>
          </button>

          {/* Master Admin Portal */}
          <button
            onClick={() => {
              onOpenAdminDashboard();
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-bold ${
              isDarkMode ? "text-amber-300 hover:bg-slate-800" : "text-amber-800 hover:bg-amber-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <KeyRound className="w-4 h-4 text-amber-500" />
              <span>🔐 Master Admin Panel</span>
            </div>
          </button>
        </div>

        {/* Footer Support Contact */}
        <div className={`p-3.5 border-t ${isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"}`}>
          <button
            onClick={handleOpenWhatsAppAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Admin: 9307220454</span>
          </button>
        </div>
      </div>
    </div>
  );
};
