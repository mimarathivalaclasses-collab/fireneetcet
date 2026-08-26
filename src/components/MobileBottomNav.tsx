import React from "react";
import {
  Home,
  Layers,
  FileText,
  Building2,
  User,
  Users,
  Trophy,
  History,
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
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 flex items-center justify-around shadow-lg sm:hidden">
      {/* Home */}
      <button
        onClick={() => handleNav("home")}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === "home"
            ? "text-indigo-600 dark:text-indigo-400 font-extrabold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === "home" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5">होम</span>
      </button>

      {/* Mock Tests */}
      <button
        onClick={() => handleNav("mock_test")}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === "mock_test"
            ? "text-blue-600 dark:text-blue-400 font-extrabold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Layers className={`w-5 h-5 ${activeTab === "mock_test" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5">चाचण्या</span>
      </button>

      {/* 10 Grand Tests */}
      <button
        onClick={() => handleNav("grand_tests")}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
          activeTab === "grand_tests"
            ? "text-amber-600 dark:text-amber-400 font-extrabold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Trophy className={`w-5 h-5 ${activeTab === "grand_tests" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5">Grand Tests</span>
        <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
      </button>

      {/* Refer & Earn (Free ₹29 / Commission) */}
      <button
        onClick={() => handleNav("refer_earn")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
          activeTab === "refer_earn"
            ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
            : "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300"
        }`}
      >
        <Gift className={`w-5 h-5 ${activeTab === "refer_earn" ? "stroke-[2.5] text-emerald-600" : "stroke-2 text-emerald-600"}`} />
        <span className="text-[10px] mt-0.5 font-bold">रेफर & कमवा</span>
        <span className="absolute -top-1 -right-0.5 px-1 py-0.2 rounded-full text-[8px] font-black bg-emerald-500 text-slate-950">
          ₹२९
        </span>
      </button>

      {/* Agent Portal */}
      <button
        onClick={() => handleNav("agent_portal")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
          activeTab === "agent_portal"
            ? "text-indigo-600 dark:text-indigo-400 font-extrabold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Users className={`w-5 h-5 ${activeTab === "agent_portal" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5">एजंट</span>
      </button>

      {/* Profile / Auth */}
      <button
        onClick={onOpenAuthModal}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{currentUser ? "खाते" : "लॉगिन"}</span>
      </button>
    </div>
  );
};
