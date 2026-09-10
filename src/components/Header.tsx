import React, { useState, useRef, useEffect } from "react";
import {
  Rocket,
  Building2,
  LogIn,
  LogOut,
  User,
  Sun,
  Moon,
  Languages,
  Menu,
  ChevronDown,
  ShieldCheck,
  Award,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  ExamType,
  LanguageMode,
  NavigationTab,
  AppView,
  StudentUser,
  InstituteProfile,
} from "../types";
import { MiMarathiwalaLogo } from "./MiMarathiwalaLogo";

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
  currentUser = null,
  onOpenAuthModal,
  activeInstitute = null,
  onLogout,
  onOpenDrawer,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = language;
  const handleLangChange = (lang: LanguageMode) => {
    if (onToggleLanguage) onToggleLanguage(lang);
    if (onChangeLanguage) onChangeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const handleNavClick = (nav: NavigationTab) => {
    if (onSelectTab) onSelectTab(nav);
    if (onNavigate) onNavigate(nav as AppView);
  };

  const isExamActive = (exam: ExamType) => currentExam === exam;

  // Student first name for compact display
  const studentFirstName = currentUser?.name
    ? currentUser.name.trim().split(" ")[0]
    : "विद्यार्थी";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-colors select-none pt-[env(safe-area-inset-top,0px)]">
      {/* Primary Navigation Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT SECTION: Hamburger + Logo + App Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onOpenDrawer && (
            <button
              id="btn-open-navigation-drawer"
              type="button"
              onClick={onOpenDrawer}
              className="p-2 sm:p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-100 border border-orange-200/80 dark:border-orange-800/80 transition-colors cursor-pointer shrink-0 active:scale-95"
              title="सर्व मेनू (Menu)"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {activeInstitute ? (
            <div
              id="app-branding-institute"
              className="flex items-center gap-2 cursor-pointer select-none min-w-0"
              onClick={() => handleNavClick("classes_portal")}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-5 h-5 text-amber-200" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate block">
                  {activeInstitute.nameMr || activeInstitute.name}
                </span>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 font-mono block">
                  {activeInstitute.instituteCode}
                </span>
              </div>
            </div>
          ) : (
            <div
              id="app-branding"
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0 group"
              onClick={() => handleNavClick("home")}
            >
              {/* Bhagva Logo Badge with Mi Marathiwala Classes Name */}
              <MiMarathiwalaLogo size="md" showText={true} />
            </div>
          )}
        </div>

        {/* CENTER SECTION (Desktop / Tablet): Compact Segmented Exam Selector */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <button
            id="exam-btn-mhtcet"
            type="button"
            onClick={() => onSelectExam("MHT_CET")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("MHT_CET")
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            MHT-CET
          </button>
          <button
            id="exam-btn-neet"
            type="button"
            onClick={() => onSelectExam("NEET")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("NEET")
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            NEET
          </button>
          <button
            id="exam-btn-jee"
            type="button"
            onClick={() => onSelectExam("JEE_MAIN")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("JEE_MAIN")
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            JEE
          </button>
        </div>

        {/* RIGHT SECTION: Controls & Authentication Area */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Quick Notes (Most MVP Revision Notes) Button */}
          <button
            id="header-btn-quick-notes"
            type="button"
            onClick={() => handleNavClick("notes")}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 hover:from-emerald-500/25 hover:to-teal-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-400/40 dark:border-emerald-600/40 text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all"
            title="100% Guaranteed High-Yield Most MVP Notes (सर्व विषयांच्या नोट्स)"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden xs:inline">MVP नोट्स</span>
            <span className="xs:hidden">नोट्स</span>
            <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-tight">
              100% MVP
            </span>
          </button>
          
          {/* Language Switcher (Desktop Full / Mobile Dropdown) */}
          <div className="relative" ref={langDropdownRef}>
            {/* Desktop Pill */}
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                id="lang-bilingual"
                type="button"
                onClick={() => handleLangChange("bilingual")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentLang === "bilingual"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
                title="द्विभाषिक (English + मराठी)"
              >
                द्विभाषिक
              </button>
              <button
                id="lang-mr"
                type="button"
                onClick={() => handleLangChange("mr")}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentLang === "mr"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
                title="मराठी माध्यम"
              >
                मराठी
              </button>
              <button
                id="lang-en"
                type="button"
                onClick={() => handleLangChange("en")}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentLang === "en"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Tablet/Mobile Compact Language Icon Button */}
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="भाषा बदला (Change Language)"
              aria-label="Change Language"
            >
              <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </button>

            {/* Language Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  type="button"
                  onClick={() => handleLangChange("bilingual")}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    currentLang === "bilingual"
                      ? "text-indigo-600 dark:text-indigo-400 font-black bg-indigo-50/50 dark:bg-indigo-950/40"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span>द्विभाषिक</span>
                  {currentLang === "bilingual" && <span className="text-[10px]">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange("mr")}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    currentLang === "mr"
                      ? "text-indigo-600 dark:text-indigo-400 font-black bg-indigo-50/50 dark:bg-indigo-950/40"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span>मराठी</span>
                  {currentLang === "mr" && <span className="text-[10px]">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange("en")}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    currentLang === "en"
                      ? "text-indigo-600 dark:text-indigo-400 font-black bg-indigo-50/50 dark:bg-indigo-950/40"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span>English</span>
                  {currentLang === "en" && <span className="text-[10px]">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          {onToggleDarkMode && (
            <button
              id="btn-header-theme-toggle"
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer active:scale-95"
              title={isDarkMode ? "लाइट मोड" : "डार्क मोड"}
              aria-label="Toggle Dark/Light Mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}

          {/* AUTHENTICATION STATE: Login or Profile + Logout */}
          {currentUser ? (
            /* LOGGED IN: Profile pill + Accessible Logout */
            <div className="flex items-center gap-1.5" ref={profileDropdownRef}>
              {/* Profile Button */}
              <button
                id="btn-header-profile"
                type="button"
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer active:scale-95 shadow-xs"
                title={`${currentUser.name} - विद्यार्थी खाते`}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                  {studentFirstName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[70px] sm:max-w-[110px] truncate font-bold text-[11px] sm:text-xs">
                  {studentFirstName}
                </span>
              </button>

              {/* Logout Button */}
              {onLogout && (
                <button
                  id="btn-header-logout"
                  type="button"
                  onClick={onLogout}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors cursor-pointer shrink-0 active:scale-95"
                  title="लॉग आऊट (Logout)"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            /* LOGGED OUT: Clean, High-Contrast Login Button */
            <button
              id="btn-header-login"
              type="button"
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-orange-500/25 active:scale-95 shrink-0"
              title="लॉगिन किंवा मोफत खाते उघडा"
            >
              <LogIn className="w-4 h-4" />
              <span className="tracking-tight">लॉगिन</span>
            </button>
          )}

        </div>
      </div>

      {/* SECONDARY MOBILE SUB-BAR: Compact Exam Selector (Shown on screens < md) */}
      <div className="md:hidden px-3 pb-2 pt-0.5 border-t border-slate-100 dark:border-slate-800/80">
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-bold">
          <button
            id="mobile-exam-btn-mhtcet"
            type="button"
            onClick={() => onSelectExam("MHT_CET")}
            className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
              isExamActive("MHT_CET")
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            🎯 MHT-CET
          </button>
          <button
            id="mobile-exam-btn-neet"
            type="button"
            onClick={() => onSelectExam("NEET")}
            className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
              isExamActive("NEET")
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            🩺 NEET
          </button>
          <button
            id="mobile-exam-btn-jee"
            type="button"
            onClick={() => onSelectExam("JEE_MAIN")}
            className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
              isExamActive("JEE_MAIN")
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-black shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            ⚡ JEE
          </button>
        </div>
      </div>
    </header>
  );
};
