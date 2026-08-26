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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Drawer Trigger + App / Institute Dynamic Branding */}
        <div className="flex items-center gap-2">
          {onOpenDrawer && (
            <button
              id="btn-open-navigation-drawer"
              onClick={onOpenDrawer}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              title="मेनू उघडा (Menu)"
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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 truncate max-w-[160px] sm:max-w-xs">
                    {activeInstitute.nameMr || activeInstitute.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300 font-mono">
                    {activeInstitute.instituteCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="truncate">{activeInstitute.directorName || activeInstitute.city}</span>
                  {onLogoutInstitute && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLogoutInstitute();
                      }}
                      className="text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer text-[10px]"
                      title="क्लासेस मोड बंद करून मुख्य ॲपवर जा"
                    >
                      लॉग आऊट
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              id="app-branding"
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                    MHT-CET · NEET · JEE
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono-numbers">
                    ₹२९ PRO
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                  सराव, १० Grand Tests व नोट्स
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Geometric Segmented Exam Selector */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
          <button
            id="exam-btn-mhtcet"
            onClick={() => onSelectExam("MHT_CET")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              isExamActive("MHT_CET")
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isExamActive("MHT_CET") ? "bg-white" : "bg-amber-500"}`}></span>
            MHT-CET
          </button>
          <button
            id="exam-btn-neet"
            onClick={() => onSelectExam("NEET")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              isExamActive("NEET")
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isExamActive("NEET") ? "bg-white" : "bg-emerald-500"}`}></span>
            NEET
          </button>
          <button
            id="exam-btn-jee"
            onClick={() => onSelectExam("JEE_MAIN")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              isExamActive("JEE_MAIN")
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isExamActive("JEE_MAIN") ? "bg-white" : "bg-blue-500"}`}></span>
            JEE
          </button>
        </div>

        {/* Right Action & Control Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PWA Install Quick Action */}
          <PWAInstallPrompt mini />

          {/* Refer & Earn (10 Referrals = 100% Refund / ₹5.80 each) Top Action Button */}
          <button
            id="btn-header-refer-earn"
            onClick={() => handleNavClick("refer_earn")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-sm transition-all cursor-pointer ring-1 ring-emerald-400 hover:scale-102"
            title="मित्रांना रेफर करा आणि १००% फी परत किंवा थेट कमिशन मिळवा"
          >
            <Gift className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
            <span className="font-extrabold">🎁 रेफर आणि कमवा</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 font-mono-numbers">
              ₹५.८०/विद्यार्थी
            </span>
          </button>

          {/* Master Admin Panel */}
          {onOpenAdminDashboard && (
            <button
              onClick={onOpenAdminDashboard}
              className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs transition-all cursor-pointer ring-1 ring-slate-700"
              title="मास्टर ॲडमिन पॅनल - विद्यार्थी मंजुरी व नियंत्रण"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">ॲडमिन</span>
              {pendingApprovalsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 font-mono-numbers animate-pulse">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Payment Button */}
          {onOpenPaymentModal && (
            <button
              onClick={onOpenPaymentModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-xs transition-all cursor-pointer ring-1 ring-emerald-400"
              title="फक्त ₹२९ सबस्क्रिप्शन"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>₹२९ प्लॅन</span>
            </button>
          )}

          {/* Student Profile / Trial Badge */}
          {currentUser ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                title="विद्यार्थी खाते"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="max-w-[80px] sm:max-w-[120px] truncate">{currentUser.name}</span>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                  title="लॉग आऊट (Logout)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                trialSecondsRemaining < 120
                  ? "bg-red-50 text-red-700 border-red-300 animate-pulse"
                  : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
              }`}
              title="लॉगिन किंवा मोफत ट्रायल"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono-numbers">{formatTrialTime(trialSecondsRemaining)}</span>
            </button>
          )}

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs">
            <button
              id="lang-bilingual"
              onClick={() => handleLangChange("bilingual")}
              className={`px-1.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLang === "bilingual"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="द्विभाषिक (English + मराठी)"
            >
              द्विभाषिक
            </button>
            <button
              id="lang-mr"
              onClick={() => handleLangChange("mr")}
              className={`px-1.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLang === "mr"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="मराठी माध्यम"
            >
              मराठी
            </button>
            <button
              id="lang-en"
              onClick={() => handleLangChange("en")}
              className={`px-1.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLang === "en"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none text-xs font-bold">
            {/* Home / Guidance */}
            <button
              id="nav-home"
              onClick={() => handleNavClick("home")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-bold ${
                activeNav === "home"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>मुख्य मेनू (Home)</span>
            </button>

            {/* 10 Grand Real Exam Full Mocks */}
            <button
              id="nav-grand-tests"
              onClick={() => handleNavClick("grand_tests")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-bold ${
                activeNav === "grand_tests"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-sm ring-1 ring-amber-400"
                  : "text-amber-950 bg-amber-100/90 border border-amber-300 hover:bg-amber-200"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>🏆 १० Grand Tests</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-500 text-slate-950 uppercase">
                १० संच
              </span>
            </button>

            {/* Practice */}
            <button
              id="nav-practice"
              onClick={() => handleNavClick("practice")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-bold ${
                activeNav === "practice"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>⚡ सराव (१२.५ लाख MCQs)</span>
            </button>

            {/* Refer & Earn (10 Referrals = 100% Refund / ₹5.80 commission) */}
            <button
              id="nav-refer-earn"
              onClick={() => handleNavClick("refer_earn")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                activeNav === "refer_earn"
                  ? "bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-400"
                  : "text-emerald-950 bg-emerald-100/90 border border-emerald-300 hover:bg-emerald-200"
              }`}
            >
              <Gift className={`w-3.5 h-3.5 ${activeNav === "refer_earn" ? "text-amber-300" : "text-emerald-700"}`} />
              <span>🎁 रेफर करा आणि कमवा (₹२९ परत)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-600 text-white uppercase">
                १० रेफर = १००% परत
              </span>
            </button>

            {/* Agent Commission Portal */}
            <button
              id="nav-agent-portal"
              onClick={() => handleNavClick("agent_portal")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                activeNav === "agent_portal"
                  ? "bg-indigo-800 text-white shadow-sm ring-1 ring-indigo-400"
                  : "text-indigo-950 bg-indigo-100/90 border border-indigo-300 hover:bg-indigo-200"
              }`}
            >
              <Users className={`w-3.5 h-3.5 ${activeNav === "agent_portal" ? "text-amber-300" : "text-indigo-700"}`} />
              <span>💼 एजंट पोर्टल (२०% कमिशन)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 uppercase">
                ₹५.८०/विद्यार्थी
              </span>
            </button>

            {/* Mock Test */}
            <button
              id="nav-mock-test"
              onClick={() => handleNavClick("mock_test")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "mock_test" ||
                (activeNav as string) === "mock_test_setup" ||
                (activeNav as string) === "active_test" ||
                (activeNav as string) === "test_result"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Timer className="w-3.5 h-3.5 text-emerald-600" />
              <span>मॉक टेस्ट (Mock)</span>
            </button>

            {/* All Questions Repository */}
            <button
              id="nav-all-questions"
              onClick={() => handleNavClick("all_questions")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "all_questions"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-indigo-900 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>सर्व प्रश्न ({totalQuestionsCount || "५०००+"})</span>
            </button>

            {/* Topic Notes & PDF */}
            <button
              id="nav-notes"
              onClick={() => handleNavClick("notes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "notes"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-900 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>अभ्यास नोट्स व PDF</span>
            </button>

            {/* PYQ Archive */}
            <button
              id="nav-pyq"
              onClick={() => handleNavClick("pyq")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "pyq"
                  ? "bg-blue-700 text-white shadow-xs"
                  : "text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>PYQs (मागील वर्षे)</span>
            </button>

            {/* Digital OMR */}
            <button
              id="nav-omr"
              onClick={() => handleNavClick("omr")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "omr"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <CircleDot className="w-3.5 h-3.5 text-amber-600" />
              <span>OMR शीट</span>
            </button>

            {/* Mistakes Bank */}
            <button
              id="nav-mistakes"
              onClick={() => handleNavClick("mistakes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "mistakes"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-red-900 bg-red-50 border border-red-200 hover:bg-red-100"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>माझ्या चुका</span>
              {mistakesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-numbers bg-red-600 text-white font-bold">
                  {mistakesCount}
                </span>
              )}
            </button>

            {/* Formulas */}
            <button
              id="nav-formulas"
              onClick={() => handleNavClick("formulas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "formulas"
                  ? "bg-cyan-700 text-white shadow-xs"
                  : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>सूत्रे (Formulas)</span>
            </button>

            {/* Analytics */}
            <button
              id="nav-analytics"
              onClick={() => handleNavClick("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeNav === "analytics"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>ॲनालिटिक्स</span>
            </button>

            {/* Toppers Leaderboard (Top 50 Students) */}
            <button
              id="nav-leaderboard"
              onClick={() => handleNavClick("leaderboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                activeNav === "leaderboard"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs ring-1 ring-amber-400"
                  : "text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>🏆 टॉपर रँकिंग (Top 50)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
