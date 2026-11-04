import React, { useState, useRef, useEffect } from "react";
import {
  Building2,
  LogIn,
  LogOut,
  Sun,
  Moon,
  Languages,
  Menu,
  ChevronDown,
  BookOpen,
  Sparkles,
  Check,
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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileExamOpen, setIsMobileExamOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileExamRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }
      if (mobileExamRef.current && !mobileExamRef.current.contains(target)) {
        setIsMobileExamOpen(false);
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
    : "Student";

  const examShortNames: Record<ExamType, string> = {
    MHT_CET: "CET",
    NEET: "NEET",
    JEE_MAIN: "JEE",
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors select-none pt-[env(safe-area-inset-top,0px)]">
      {/* Primary Unified Navigation Bar (Single, perfectly balanced row) */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* 1. LEFT SECTION: Drawer Menu Button + App Logo & Title */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink">
          {onOpenDrawer && (
            <button
              id="btn-open-navigation-drawer"
              type="button"
              onClick={onOpenDrawer}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer shrink-0 active:scale-95"
              title="Navigation Menu"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </button>
          )}

          {activeInstitute ? (
            <div
              id="app-branding-institute"
              className="flex items-center gap-2 cursor-pointer select-none min-w-0"
              onClick={() => handleNavClick("classes_portal")}
            >
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Building2 className="w-4 h-4 text-amber-200" />
              </div>
              <div className="min-w-0 hidden xs:block">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate block leading-tight">
                  {activeInstitute.name}
                </span>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 font-mono block leading-none">
                  {activeInstitute.instituteCode}
                </span>
              </div>
            </div>
          ) : (
            <div
              id="app-branding"
              className="flex items-center gap-2 cursor-pointer select-none min-w-0 group"
              onClick={() => handleNavClick("home")}
            >
              {/* Logo with Title */}
              <MiMarathiwalaLogo size="sm" showText={true} />
            </div>
          )}
        </div>

        {/* 2. CENTER SECTION: Exam Selector */}
        {/* Desktop Segmented Control */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <button
            id="exam-btn-mhtcet"
            type="button"
            onClick={() => onSelectExam("MHT_CET")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("MHT_CET")
                ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            MHT-CET
          </button>
          <button
            id="exam-btn-neet"
            type="button"
            onClick={() => onSelectExam("NEET")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("NEET")
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            NEET
          </button>
          <button
            id="exam-btn-jee"
            type="button"
            onClick={() => onSelectExam("JEE_MAIN")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isExamActive("JEE_MAIN")
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            JEE Main
          </button>
        </div>

        {/* Mobile Inline Dropdown Pill (Fits neatly in the single header row!) */}
        <div className="md:hidden relative shrink-0" ref={mobileExamRef}>
          <button
            type="button"
            onClick={() => setIsMobileExamOpen(!isMobileExamOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-black cursor-pointer shadow-2xs active:scale-95"
            title="Change Target Exam"
          >
            <span>{examShortNames[currentExam]}</span>
            <ChevronDown className="w-3 h-3 stroke-[3]" />
          </button>

          {isMobileExamOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1 z-50 animate-in fade-in zoom-in-95">
              {(["MHT_CET", "NEET", "JEE_MAIN"] as ExamType[]).map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    onSelectExam(ex);
                    setIsMobileExamOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    currentExam === ex
                      ? "bg-orange-600 text-white font-black"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{ex === "MHT_CET" ? "MHT-CET" : ex === "NEET" ? "NEET" : "JEE Main"}</span>
                  {currentExam === ex && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. RIGHT SECTION: Notes, Language, Theme, and Login / Profile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Quick Notes Button */}
          <button
            id="header-btn-quick-notes"
            type="button"
            onClick={() => handleNavClick("notes")}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black shadow-2xs cursor-pointer active:scale-95 transition-all"
            title="200 Key Points & Notes"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          {onToggleDarkMode && (
            <button
              id="btn-header-theme-toggle"
              type="button"
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0 active:scale-95"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
              aria-label="Toggle Dark/Light Mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}

          {/* Authentication State */}
          {currentUser ? (
            <div className="flex items-center gap-1 shrink-0">
              {/* Profile Button */}
              <button
                id="btn-header-profile"
                type="button"
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer active:scale-95"
                title={`${currentUser.name} - Student Profile`}
              >
                <div className="w-5 h-5 rounded-lg bg-orange-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                  {studentFirstName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate text-xs font-black">
                  {studentFirstName}
                </span>
              </button>

              {/* Logout Button */}
              {onLogout && (
                <button
                  id="btn-header-logout"
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0 active:scale-95"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              id="btn-header-login"
              type="button"
              onClick={onOpenAuthModal}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
              title="Login or Register Free"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
