import React from "react";
import {
  Home,
  FileCheck2,
  BarChart3,
  BookOpen,
  Zap,
} from "lucide-react";
import { NavigationTab, StudentUser } from "../types";
import { triggerHaptic } from "../utils/haptics";

interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onNavigate?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  currentUser?: StudentUser | null;
  onOpenAuthModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  onSelectTab,
}) => {
  const handleNav = (tab: NavigationTab) => {
    triggerHaptic("selection");
    if (onNavigate) onNavigate(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const navItems: {
    id: NavigationTab;
    label: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    matches: (tab: NavigationTab) => boolean;
  }[] = [
    {
      id: "home",
      label: "होम",
      labelEn: "Home",
      icon: Home,
      matches: (t) => t === "home",
    },
    {
      id: "practice",
      label: "सराव",
      labelEn: "Practice",
      icon: Zap,
      matches: (t) => t === "practice" || t === "all_questions" || t === "pyq",
    },
    {
      id: "grand_tests",
      label: "मॉक टेस्ट",
      labelEn: "Tests",
      icon: FileCheck2,
      matches: (t) => t === "grand_tests" || t === "mock_test",
    },
    {
      id: "notes",
      label: "नोट्स",
      labelEn: "Notes",
      icon: BookOpen,
      matches: (t) => t === "notes" || t === "formulas",
    },
    {
      id: "analytics",
      label: "प्रगती",
      labelEn: "Stats",
      icon: BarChart3,
      matches: (t) => t === "analytics" || t === "leaderboard",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))] px-3 sm:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)] transition-all select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.matches(activeTab);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer relative ${
                isActive
                  ? "text-orange-600 dark:text-orange-400 font-black scale-105"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "stroke-[2.5] scale-110" : "stroke-2"
                  }`}
                />
              </div>

              <span className="text-[10.5px] mt-0.5 font-bold tracking-tight">
                {item.label}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-orange-400 mt-0.5 animate-in fade-in zoom-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
