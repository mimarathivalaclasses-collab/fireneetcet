import React from "react";
import {
  Home,
  Layers,
  FileText,
  BookOpen,
  User,
  Users,
  Trophy,
  Gift,
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
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] px-1 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-colors"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "home"
              ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === "home" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">होम</span>
        </button>

        {/* 2. Mock Tests */}
        <button
          type="button"
          onClick={() => handleNav("mock_test")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "mock_test"
              ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Layers className={`w-5 h-5 ${activeTab === "mock_test" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">चाचणी</span>
        </button>

        {/* 3. Grand Tests */}
        <button
          type="button"
          onClick={() => handleNav("grand_tests")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
            activeTab === "grand_tests"
              ? "text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Trophy className={`w-5 h-5 ${activeTab === "grand_tests" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">ग्रँड टेस्ट</span>
          <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        {/* 4. PYQ Papers */}
        <button
          type="button"
          onClick={() => handleNav("pyq")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
            activeTab === "pyq"
              ? "text-purple-600 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === "pyq" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">PYQ</span>
        </button>

        {/* 4. Notes */}
        <button
          type="button"
          onClick={() => handleNav("notes")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            activeTab === "notes"
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === "notes" ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">नोट्स</span>
        </button>

        {/* 5. Refer & Earn */}
        <button
          type="button"
          onClick={() => handleNav("refer_earn")}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
            activeTab === "refer_earn"
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 font-black shadow-2xs"
              : "text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300"
          }`}
        >
          <Gift className="w-5 h-5 stroke-2 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">रेफर</span>
          <span className="absolute -top-0.5 right-0.5 px-1 py-0.2 rounded-full text-[7px] font-black bg-emerald-500 text-slate-950">
            ₹२९
          </span>
        </button>

        {/* 6. Profile / Auth */}
        <button
          type="button"
          onClick={onOpenAuthModal}
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all active:scale-95 cursor-pointer"
        >
          <User className="w-5 h-5 stroke-2" />
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">{currentUser ? "खाते" : "लॉगिन"}</span>
        </button>
      </div>
    </nav>
  );
};

