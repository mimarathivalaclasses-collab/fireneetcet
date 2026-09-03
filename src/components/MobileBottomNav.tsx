import React from "react";
import {
  Home,
  FileCheck2,
  BarChart3,
  Bookmark,
  User,
  BookOpen,
  Zap,
} from "lucide-react";
import { NavigationTab, StudentUser } from "../types";

interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onNavigate?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  currentUser: StudentUser | null;
  onOpenAuthModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  onSelectTab,
  currentUser,
  onOpenAuthModal,
}) => {
  const handleNav = (tab: NavigationTab) => {
    if (onNavigate) onNavigate(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] px-2 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-colors select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "home"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === "home" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Home</span>
        </button>

        {/* 2. Most MVP Notes (New Direct Option) */}
        <button
          type="button"
          onClick={() => handleNav("notes")}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
            activeTab === "notes"
              ? "text-emerald-600 dark:text-emerald-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <span className="absolute -top-1 right-0 px-1 py-0.2 rounded-full bg-emerald-500 text-[8px] font-black text-white leading-none">
            MVP
          </span>
          <BookOpen className={`w-5 h-5 ${activeTab === "notes" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Notes</span>
        </button>

        {/* 3. Tests (Grand Tests & Topic Mocks) */}
        <button
          type="button"
          onClick={() => handleNav("grand_tests")}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "grand_tests" || activeTab === "mock_test"
              ? "text-amber-500 dark:text-amber-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <FileCheck2 className={`w-5 h-5 ${activeTab === "grand_tests" || activeTab === "mock_test" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Tests</span>
        </button>

        {/* 4. Practice Mode */}
        <button
          type="button"
          onClick={() => handleNav("practice")}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "practice" || activeTab === "pyq"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Zap className={`w-5 h-5 ${activeTab === "practice" || activeTab === "pyq" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">सराव</span>
        </button>

        {/* 5. Performance / Analytics */}
        <button
          type="button"
          onClick={() => handleNav("analytics")}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "analytics"
              ? "text-cyan-600 dark:text-cyan-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <BarChart3 className={`w-5 h-5 ${activeTab === "analytics" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">प्रगती</span>
        </button>
      </div>
    </nav>
  );
};


