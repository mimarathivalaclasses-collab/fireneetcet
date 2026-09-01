import React from "react";
import {
  Home,
  FileCheck2,
  BarChart3,
  Bookmark,
  User,
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
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] px-3 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-colors select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "home"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === "home" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Home</span>
        </button>

        {/* 2. Tests */}
        <button
          type="button"
          onClick={() => handleNav("grand_tests")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "grand_tests" || activeTab === "mock_test"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <FileCheck2 className={`w-5 h-5 ${activeTab === "grand_tests" || activeTab === "mock_test" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Tests</span>
        </button>

        {/* 3. Performance / Analytics */}
        <button
          type="button"
          onClick={() => handleNav("analytics")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "analytics"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <BarChart3 className={`w-5 h-5 ${activeTab === "analytics" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Performance</span>
        </button>

        {/* 4. Bookmarks */}
        <button
          type="button"
          onClick={() => handleNav("bookmarks")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "bookmarks"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${activeTab === "bookmarks" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Bookmarks</span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={onOpenAuthModal}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "profile"
              ? "text-indigo-600 dark:text-indigo-400 font-black"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <User className="w-5 h-5 stroke-2" />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};


