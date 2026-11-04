import React, { useState } from "react";
import {
  Zap,
  X,
  Trophy,
  BookOpen,
  Calendar,
  Bookmark,
  AlertTriangle,
  Scale,
  Share2,
  Download,
  Moon,
  Sun,
  Sparkles,
  ChevronUp,
} from "lucide-react";
import { NavigationTab } from "../types";
import { triggerHaptic } from "../utils/haptics";

interface AppQuickActionSheetProps {
  onNavigate: (tab: NavigationTab) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenInstallModal?: () => void;
  bookmarkCount?: number;
  mistakesCount?: number;
}

export const AppQuickActionSheet: React.FC<AppQuickActionSheetProps> = ({
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenInstallModal,
  bookmarkCount = 0,
  mistakesCount = 0,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    triggerHaptic("medium");
    setIsOpen(true);
  };

  const handleClose = () => {
    triggerHaptic("light");
    setIsOpen(false);
  };

  const handleAction = (tab: NavigationTab) => {
    triggerHaptic("selection");
    onNavigate(tab);
    setIsOpen(false);
  };

  const handleShare = () => {
    triggerHaptic("success");
    const shareText = `🎯 Mi Marathiwala Classes (Ambad) - NCJ MOCK TEST APP\n🔥 MHT-CET, NEET & JEE Practice App! 10 Grand Mock Tests, Digital OMR & Notes!\n👉 Start Free Practice Now: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: "NCJ MOCK TEST APP - Mi Marathiwala Classes",
        text: shareText,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("App link copied! You can now paste and send it on WhatsApp.");
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Speed Dial Button on Mobile (above bottom nav) */}
      <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Quick App Menu"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white font-black text-xs shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-105 active:scale-90 transition-all duration-200 cursor-pointer border border-amber-300/40"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow text-amber-100" />
          <span className="tracking-wide">Quick Menu</span>
          <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Sheet Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick App Menu"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Bottom Sheet Container */}
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl p-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] space-y-4 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Native Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    NCJ Quick Actions
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Quickly jump to any section with one click
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* 1. Grand Tests */}
              <button
                type="button"
                onClick={() => handleAction("grand_tests")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-all active:scale-95 cursor-pointer"
              >
                <Trophy className="w-6 h-6 text-amber-500 mb-1" />
                <span className="text-xs font-black">Grand Mocks</span>
                <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">10 Full Tests</span>
              </button>

              {/* 2. Notes */}
              <button
                type="button"
                onClick={() => handleAction("notes")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-all active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-6 h-6 text-emerald-500 mb-1" />
                <span className="text-xs font-black">100 Notes</span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Revision Sheets</span>
              </button>

              {/* 3. PYQ Papers */}
              <button
                type="button"
                onClick={() => handleAction("pyq")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-950/60 transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-xs font-black">PYQ Archive</span>
                <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold">2015-2025</span>
              </button>

              {/* 4. Formulas */}
              <button
                type="button"
                onClick={() => handleAction("formulas")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-blue-900 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-all active:scale-95 cursor-pointer"
              >
                <Zap className="w-6 h-6 text-blue-500 mb-1" />
                <span className="text-xs font-black">Formulas</span>
                <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold">Short Tricks</span>
              </button>

              {/* 5. Bookmarks */}
              <button
                type="button"
                onClick={() => handleAction("bookmarks")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 text-orange-900 dark:text-orange-200 hover:bg-orange-100 dark:hover:bg-orange-950/60 transition-all active:scale-95 cursor-pointer relative"
              >
                <Bookmark className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-xs font-black">Bookmarks</span>
                <span className="text-[9px] text-orange-600 dark:text-orange-400 font-bold">
                  {bookmarkCount} Items
                </span>
              </button>

              {/* 6. Mistakes Bank */}
              <button
                type="button"
                onClick={() => handleAction("mistakes")}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-all active:scale-95 cursor-pointer relative"
              >
                <AlertTriangle className="w-6 h-6 text-rose-500 mb-1" />
                <span className="text-xs font-black">Mistakes Bank</span>
                <span className="text-[9px] text-rose-600 dark:text-rose-400 font-bold">
                  {mistakesCount} Errors
                </span>
              </button>
            </div>

            {/* Utility Rows: Share, Rules & Theme */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-blue-500" />
                  <span>Share App</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("compliance_rules")}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-indigo-500" />
                  <span>Rules & Policies</span>
                </button>
              </div>

              {/* Theme toggle & Install Shortcut */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isDarkMode ? "Dark Theme Active" : "Light Theme Active"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    onToggleDarkMode();
                  }}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
