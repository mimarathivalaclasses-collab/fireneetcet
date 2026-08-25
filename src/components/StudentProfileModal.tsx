import React from "react";
import {
  X,
  ShieldCheck,
  Smartphone,
  Award,
  Target,
  Flame,
  Trophy,
  Zap,
  Bookmark,
  Calendar,
  CheckCircle2,
  Lock,
  LogOut,
  Phone,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Share2,
} from "lucide-react";
import { StudentUser, TestResultData } from "../types";
import { getAchievementBadges, getDailyStreak } from "../utils/achievementSystem";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentUser | null;
  onLogout: () => void;
  practiceStats: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  testHistory: TestResultData[];
  bookmarksCount: number;
  onNavigateTab: (tab: any) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  practiceStats,
  testHistory,
  bookmarksCount,
  onNavigateTab,
}) => {
  if (!isOpen || !currentUser) return null;

  const streakData = getDailyStreak();
  const badges = getAchievementBadges(
    practiceStats.totalAttempted,
    practiceStats.totalCorrect,
    testHistory,
    streakData.currentStreak,
    bookmarksCount
  );

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const accuracy =
    practiceStats.totalAttempted > 0
      ? Math.round((practiceStats.totalCorrect / practiceStats.totalAttempted) * 100)
      : 0;

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-5 h-5" />;
      case "Target":
        return <Target className="w-5 h-5" />;
      case "Flame":
        return <Flame className="w-5 h-5" />;
      case "Trophy":
        return <Trophy className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Bookmark":
        return <Bookmark className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">{currentUser.name}</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    प्रमाणित विद्यार्थी
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  मोबाईल: <strong>{currentUser.mobile}</strong> · टार्गेट:{" "}
                  <strong className="text-amber-400">{currentUser.examTarget}</strong>
                </p>
              </div>
            </div>

            {/* Quick Streak Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/20">
              <Flame className="w-5 h-5 text-orange-400 animate-pulse fill-orange-400" />
              <div>
                <div className="text-[10px] text-slate-300 uppercase font-bold">सलग अभ्यास</div>
                <div className="text-sm font-black text-orange-300 font-mono-numbers">
                  {streakData.currentStreak} दिवस Streak
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 block">एकूण सोडवलेले</span>
              <span className="text-lg font-black text-slate-900 font-mono-numbers">
                {practiceStats.totalAttempted}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 block">अचूक उत्तरे</span>
              <span className="text-lg font-black text-emerald-600 font-mono-numbers">
                {practiceStats.totalCorrect}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 block">ॲक्युरसी</span>
              <span className="text-lg font-black text-amber-600 font-mono-numbers">
                {accuracy}%
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 block">अनलॉक बॅजेस</span>
              <span className="text-lg font-black text-indigo-600 font-mono-numbers">
                {unlockedCount} / {badges.length}
              </span>
            </div>
          </div>

          {/* Achievement Badges Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-black text-slate-900">
                  विद्यार्थी गौरव बॅजेस व यश (Achievements & Badges)
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600">
                {unlockedCount} अनलॉक झाले
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    badge.isUnlocked
                      ? "bg-linear-to-br from-amber-50/70 to-orange-50/40 border-amber-300 shadow-xs"
                      : "bg-slate-50 border-slate-200 opacity-75"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                      badge.isUnlocked
                        ? `bg-linear-to-br ${badge.color} text-white`
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {renderBadgeIcon(badge.icon)}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {badge.titleMr}
                      </h4>
                      {badge.isUnlocked ? (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                          ✓ अनलॉक
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {badge.currentCount}/{badge.targetCount}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight">
                      {badge.descriptionMr}
                    </p>

                    {/* Progress Bar for Locked */}
                    {!badge.isUnlocked && (
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral & Rewards Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>१० मित्रांना जोडा = १००% फी रिफंड!</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                तुमचा रेफरल कोड: <strong className="font-mono">{currentUser.referralCode || `REF-${currentUser.mobile.slice(-6)}`}</strong>
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigateTab("refer_earn");
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>रेफर पोर्टल उघडा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Device Security & System Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>सुरक्षित डिव्हाइस बाइंडिंग माहिती:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              डिव्हाइस: <strong className="font-mono">{currentUser.primaryDeviceName || "Default Device"}</strong> · 
              ID: <span className="font-mono text-slate-500">{currentUser.primaryDeviceId.slice(0, 16)}...</span>
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉग आऊट (Logout)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            बंद करा
          </button>
        </div>
      </div>
    </div>
  );
};
