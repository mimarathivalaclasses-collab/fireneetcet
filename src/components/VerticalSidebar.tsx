import React from "react";
import {
  Compass,
  Trophy,
  Zap,
  BookOpen,
  Calendar,
  AlertTriangle,
  BarChart3,
  CircleDot,
  Gift,
  Building2,
  Bookmark,
  Sparkles,
  HelpCircle,
  FileText,
  KeyRound,
  ShieldCheck,
  Award,
  Rocket,
} from "lucide-react";
import { NavigationTab, ExamType, StudentUser } from "../types";

interface VerticalSidebarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  currentExam: ExamType;
  onSelectExam?: (exam: ExamType) => void;
  mistakesCount?: number;
  bookmarkCount?: number;
  currentUser: StudentUser | null;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
  pendingApprovalsCount?: number;
}

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({
  activeTab,
  onNavigate,
  currentExam,
  onSelectExam,
  mistakesCount = 0,
  bookmarkCount = 0,
  currentUser,
  onOpenPaymentModal,
  onOpenAdminDashboard,
  pendingApprovalsCount = 0,
}) => {
  const navItems = [
    {
      id: "home" as NavigationTab,
      label: "मुख्य मेनू",
      sublabel: "Home Dashboard",
      icon: Compass,
      color: "text-indigo-500",
      activeBg: "bg-indigo-600 text-white shadow-sm",
    },
    {
      id: "grand_tests" as NavigationTab,
      label: "१० ग्रँड टेस्ट्स",
      sublabel: "Special 1 + NEET 180Q",
      icon: Trophy,
      color: "text-amber-500",
      badge: "Full Mock",
      badgeColor: "bg-amber-500 text-slate-950",
      activeBg: "bg-amber-500 text-slate-950 font-black shadow-sm",
    },
    {
      id: "mock_test" as NavigationTab,
      label: "चॅप्टर सराव",
      sublabel: "Chapter-wise Tests",
      icon: Zap,
      color: "text-blue-500",
      activeBg: "bg-blue-600 text-white shadow-sm",
    },
    {
      id: "notes" as NavigationTab,
      label: "रिव्हिजन नोट्स",
      sublabel: "High-Yield Notes & PDF",
      icon: BookOpen,
      color: "text-emerald-500",
      activeBg: "bg-emerald-600 text-white shadow-sm",
    },
    {
      id: "pyq" as NavigationTab,
      label: "मागील वर्षे (PYQ)",
      sublabel: "2015-2025 Solved",
      icon: Calendar,
      color: "text-purple-500",
      activeBg: "bg-purple-600 text-white shadow-sm",
    },
    {
      id: "omr" as NavigationTab,
      label: "डिजिटल OMR",
      sublabel: "Offline Sheet Practice",
      icon: CircleDot,
      color: "text-amber-600",
      activeBg: "bg-amber-600 text-white shadow-sm",
    },
    {
      id: "mistakes" as NavigationTab,
      label: "माझ्या चुका",
      sublabel: "Mistakes Revision Bank",
      icon: AlertTriangle,
      color: "text-rose-500",
      badge: mistakesCount > 0 ? `${mistakesCount}` : undefined,
      badgeColor: "bg-rose-600 text-white",
      activeBg: "bg-rose-600 text-white shadow-sm",
    },
    {
      id: "analytics" as NavigationTab,
      label: "प्रगती व निकाल",
      sublabel: "Performance & Rank",
      icon: BarChart3,
      color: "text-cyan-500",
      activeBg: "bg-cyan-600 text-white shadow-sm",
    },
    {
      id: "bookmarks" as NavigationTab,
      label: "महत्त्वाचे प्रश्न",
      sublabel: "Saved Bookmarks",
      icon: Bookmark,
      color: "text-amber-400",
      badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined,
      badgeColor: "bg-amber-400 text-slate-900",
      activeBg: "bg-indigo-600 text-white shadow-sm",
    },
  ];

  const secondaryItems = [
    {
      id: "refer_earn" as NavigationTab,
      label: "रेफर आणि कमवा",
      sublabel: "१० रेफर = १००% फी परत",
      icon: Gift,
      color: "text-emerald-400",
      badge: "₹२९ परत",
      badgeColor: "bg-emerald-500 text-slate-950 font-black",
      activeBg: "bg-emerald-700 text-white shadow-sm",
    },
    {
      id: "classes_portal" as NavigationTab,
      label: "कोचिंग क्लासेस पोर्टल",
      sublabel: "Institutes & Batches",
      icon: Building2,
      color: "text-purple-400",
      activeBg: "bg-purple-700 text-white shadow-sm",
    },
    {
      id: "feedback" as NavigationTab,
      label: "मदत व शंका निरसन",
      sublabel: "Student Support 24/7",
      icon: HelpCircle,
      color: "text-slate-400",
      activeBg: "bg-slate-700 text-white shadow-sm",
    },
  ];

  return (
    <aside
      aria-label="Sidebar Navigation"
      className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto scrollbar-thin transition-colors z-30 select-none"
    >
      {/* Target Exam Indicator & Selector */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transform -rotate-45" />
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">लक्ष्य परीक्षा:</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 font-mono">
            {currentExam === "MHT_CET" ? "MHT-CET" : currentExam === "NEET" ? "NEET" : "JEE MAIN"}
          </span>
        </div>

        {onSelectExam && (
          <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => onSelectExam("MHT_CET")}
              className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
                currentExam === "MHT_CET"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              MHT-CET
            </button>
            <button
              onClick={() => onSelectExam("NEET")}
              className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
                currentExam === "NEET"
                  ? "bg-emerald-600 text-white font-black shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              NEET
            </button>
            <button
              onClick={() => onSelectExam("JEE_MAIN")}
              className={`py-1 rounded-lg text-center transition-all cursor-pointer ${
                currentExam === "JEE_MAIN"
                  ? "bg-blue-600 text-white font-black shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              JEE
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation Items (उभी मेनू यादी) */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          मुख्य अभ्यास साधने
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === "mock_test" && activeTab === "practice");

          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? item.activeBg
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 " + item.color
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate leading-tight">
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] truncate leading-tight ${
                      isActive ? "text-white/80" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-[10px] font-black rounded-md shrink-0 font-mono-numbers ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Tools & Special Portals */}
      <div className="p-3 pt-1 space-y-1 border-t border-slate-100 dark:border-slate-800/80">
        <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          अधिक साधने & पोर्टल्स
        </div>

        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? item.activeBg
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 " + item.color
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate leading-tight">
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] truncate leading-tight ${
                      isActive ? "text-white/80" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-[10px] font-black rounded-md shrink-0 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Admin Panel Quick Action (If Admin) */}
      {onOpenAdminDashboard && (
        <div className="p-3 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={onOpenAdminDashboard}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span>मास्टर ॲडमिन पॅनल</span>
            </div>
            {pendingApprovalsCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-black bg-amber-400 text-slate-950 rounded-full animate-pulse">
                {pendingApprovalsCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Subscription / Support Footer Card */}
      <div className="mt-auto p-3 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-stone-900 dark:to-orange-950/40 p-3 rounded-2xl border border-orange-200 dark:border-orange-900/50 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center font-black text-[9px] shadow-xs">
              म
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              मराठीवाला PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
            १० ग्रँड टेस्ट्स, २५,०००+ प्रश्न व सर्व नोट्स फक्त ₹२९ मध्ये!
          </p>
          {onOpenPaymentModal && (
            <button
              onClick={onOpenPaymentModal}
              className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              सदस्यत्व घ्या (₹२९)
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
