import React from "react";
import {
  BookOpen,
  Timer,
  Sparkles,
  PlusCircle,
  Bookmark,
  FileText,
  BarChart3,
  Languages,
  GraduationCap,
  Layers,
  Calendar,
  CircleDot,
  AlertTriangle,
  Zap,
  Compass,
  User,
  ShieldCheck,
  Clock,
  LogIn,
  LogOut,
  Printer,
  Trophy,
  Building2,
  KeyRound,
  Gift,
  Share2,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import {
  ExamType,
  LanguageMode,
  NavigationTab,
  AppView,
  StudentUser,
  InstituteProfile,
} from "../types";
import { formatTrialTime } from "../utils/deviceSecurity";
import { PWAInstallPrompt } from "./PWAInstallPrompt";

interface HeaderProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  language: LanguageMode;
  onToggleLanguage?: (lang: LanguageMode) => void;
  onChangeLanguage?: (lang: LanguageMode) => void;
  activeTab?: NavigationTab | AppView;
  currentView?: AppView | NavigationTab;
  onSelectTab?: (tab: NavigationTab) => void;
  onNavigate?: (view: AppView) => void;
  bookmarkCount?: number;
  savedBookmarksCount?: number;
  mistakesCount?: number;
  totalQuestionsCount?: number;
  totalSolvedCount?: number;
  currentUser?: StudentUser | null;
  trialSecondsRemaining?: number;
  onOpenAuthModal?: () => void;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
  pendingApprovalsCount?: number;
  activeInstitute?: InstituteProfile | null;
  onLogoutInstitute?: () => void;
  onLogout?: () => void;
  onOpenDrawer?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentExam,
  onSelectExam,
  language,
  onToggleLanguage,
  onChangeLanguage,
  activeTab,
  currentView,
  onSelectTab,
  onNavigate,
  bookmarkCount = 0,
  savedBookmarksCount = 0,
  mistakesCount = 0,
  totalQuestionsCount,
  totalSolvedCount = 0,
  currentUser = null,
  trialSecondsRemaining = 600,
  onOpenAuthModal,
  onOpenPaymentModal,
  onOpenAdminDashboard,
  pendingApprovalsCount = 0,
  activeInstitute = null,
  onLogoutInstitute,
  onLogout,
  onOpenDrawer,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const currentLang = language;
  const handleLangChange = (lang: LanguageMode) => {
    if (onToggleLanguage) onToggleLanguage(lang);
    if (onChangeLanguage) onChangeLanguage(lang);
  };

  const activeNav = (activeTab || currentView || "practice") as NavigationTab;
  const handleNavClick = (nav: NavigationTab) => {
    if (onSelectTab) onSelectTab(nav);
    if (onNavigate) onNavigate(nav as AppView);
  };

  const bookmarksTotal = bookmarkCount || savedBookmarksCount;
  const isExamActive = (exam: ExamType) => currentExam === exam;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Drawer Trigger + App Dynamic Branding */}
        <div className="flex items-center gap-2.5">
          {onOpenDrawer && (
            <button
              id="btn-open-navigation-drawer"
              onClick={onOpenDrawer}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              title="सर्व साधने व मेनू (Menu)"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {activeInstitute ? (
            <div
              id="app-branding-institute"
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={() => handleNavClick("classes_portal")}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-xs">
                    {activeInstitute.nameMr || activeInstitute.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-black bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 font-mono">
                    {activeInstitute.instituteCode}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="app-branding"
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white flex items-center justify-center shadow-sm shrink-0 ring-1 ring-white/20">
                <GraduationCap className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white">
                    🎯 सराव मित्र
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                    STUDY CENTER
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-bold tracking-tight">
                  MHT-CET • NEET • JEE PORTAL
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Center: Clean Segmented Exam Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            id="exam-btn-mhtcet"
            onClick={() => onSelectExam("MHT_CET")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("MHT_CET")
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            MHT-CET
          </button>
          <button
            id="exam-btn-neet"
            onClick={() => onSelectExam("NEET")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("NEET")
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            NEET
          </button>
          <button
            id="exam-btn-jee"
            onClick={() => onSelectExam("JEE_MAIN")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("JEE_MAIN")
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            JEE
          </button>
        </div>

        {/* Right Action & Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              id="lang-bilingual"
              onClick={() => handleLangChange("bilingual")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === "bilingual"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="द्विभाषिक (English + मराठी)"
            >
              द्विभाषिक
            </button>
            <button
              id="lang-mr"
              onClick={() => handleLangChange("mr")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === "mr"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="मराठी माध्यम"
            >
              मराठी
            </button>
            <button
              id="lang-en"
              onClick={() => handleLangChange("en")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === "en"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          {onToggleDarkMode && (
            <button
              id="btn-header-theme-toggle"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          )}

          {/* Student Profile / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                title="विद्यार्थी खाते"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="max-w-[90px] sm:max-w-[130px] truncate">{currentUser.name}</span>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                  title="लॉग आऊट (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="लॉगिन किंवा खाते उघडा"
            >
              <LogIn className="w-4 h-4" />
              <span>लॉगिन</span>
            </button>
          )}
        </div>
      </div>

      {/* Clean Primary Navigation Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs font-bold">
            {/* 1. Home */}
            <button
              id="nav-home"
              onClick={() => handleNavClick("home")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "home"
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : "text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>🏠 मुख्य मेनू (Home)</span>
            </button>

            {/* 2. Grand Tests */}
            <button
              id="nav-grand-tests"
              onClick={() => handleNavClick("grand_tests")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "grand_tests"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/50 hover:bg-amber-100"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>🏆 १० ग्रँड टेस्ट्स</span>
            </button>

            {/* 3. Practice / Mock */}
            <button
              id="nav-mock-test"
              onClick={() => handleNavClick("mock_test")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "mock_test" || activeNav === "practice"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>🎯 चॅप्टर सराव</span>
            </button>

            {/* 4. Revision Notes */}
            <button
              id="nav-notes"
              onClick={() => handleNavClick("notes")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "notes"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>📚 रिव्हिजन नोट्स</span>
            </button>

            {/* 5. PYQs */}
            <button
              id="nav-pyq"
              onClick={() => handleNavClick("pyq")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "pyq"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-purple-900 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-700/50 hover:bg-purple-100"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>📝 PYQ (मागील वर्षे)</span>
            </button>

            {/* 6. Mistakes Bank */}
            <button
              id="nav-mistakes"
              onClick={() => handleNavClick("mistakes")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "mistakes"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-rose-900 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/50 hover:bg-rose-100"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>⚠️ माझ्या चुका</span>
              {mistakesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-numbers bg-rose-600 text-white font-bold">
                  {mistakesCount}
                </span>
              )}
            </button>

            {/* 7. Analytics */}
            <button
              id="nav-analytics"
              onClick={() => handleNavClick("analytics")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeNav === "analytics"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-700/50 hover:bg-indigo-100"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
              <span>📊 प्रगती व निकाल</span>
            </button>

            {/* 8. More Options / Drawer trigger */}
            {onOpenDrawer && (
              <button
                id="nav-more-tools"
                onClick={onOpenDrawer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                title="इतर साधने पहा (More Tools)"
              >
                <span>अधिक...</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
