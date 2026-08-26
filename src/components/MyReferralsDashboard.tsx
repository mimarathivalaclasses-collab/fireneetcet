import React, { useState } from "react";
import {
  Users,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Share2,
  Copy,
  Gift,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Check,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { StudentReferralRecord, StudentUser } from "../types";
import { REFERRAL_CONFIG, formatInr, maskPhoneNumber } from "../utils/referralSystem";

interface MyReferralsDashboardProps {
  currentUser: StudentUser | null;
  studentRefCode: string;
  studentRefUrl: string;
  referredList: StudentReferralRecord[];
  onCopyCode: () => void;
  onCopyLink: () => void;
  copiedCode: boolean;
  copiedLink: boolean;
  onOpenQr: () => void;
  onNavigateToWithdraw?: () => void;
}

export const MyReferralsDashboard: React.FC<MyReferralsDashboardProps> = ({
  currentUser,
  studentRefCode,
  studentRefUrl,
  referredList,
  onCopyCode,
  onCopyLink,
  copiedCode,
  copiedLink,
  onOpenQr,
  onNavigateToWithdraw,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "subscribed">("all");
  const [cheerSentId, setCheerSentId] = useState<string | null>(null);

  const targetMilestone = REFERRAL_CONFIG.FREE_REFUND_MILESTONE; // 10 referrals
  const totalReferredCount = Math.max(
    currentUser?.totalReferredCount || 0,
    referredList.length
  );

  const verifiedCount = referredList.filter(
    (r) => r.status === "verified" || r.status === "subscribed"
  ).length;

  const totalEarnings =
    currentUser?.referralEarnings !== undefined
      ? currentUser.referralEarnings
      : totalReferredCount * REFERRAL_CONFIG.COMMISSION_PER_STUDENT;

  const remainingForMilestone = Math.max(0, targetMilestone - totalReferredCount);
  const progressPercent = Math.min(100, Math.round((totalReferredCount / targetMilestone) * 100));
  const isMilestoneAchieved = totalReferredCount >= targetMilestone;

  // Filtered List
  const filteredList = referredList.filter((item) => {
    const matchesSearch =
      (item.referredStudentName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.referredStudentExam || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.referredStudentMobile || "").includes(searchQuery);

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "verified") return matchesSearch && (item.status === "verified" || item.status === "subscribed");
    if (statusFilter === "subscribed") return matchesSearch && item.status === "joined";
    return matchesSearch;
  });

  const whatsappShareText = `🎯 मित्रांनो, MHT-CET, NEET आणि JEE सराव करण्यासाठी हे सर्वात भारी ॲप आहे! \n🔥 ५०००+ MCQs, १० ग्रँड मॉक टेस्ट्स व नोट्स फक्त ₹२९ मध्ये उपलब्ध आहेत!\n🎁 माझ्या लिंकवरून आत्ताच सुरू करा:\n👉 ${studentRefUrl}\n(किंवा नोंदणी करताना रेफरल कोड वापरा: ${studentRefCode})`;

  const handleSendCheer = (record: StudentReferralRecord) => {
    setCheerSentId(record.id);
    const cheerMsg = `नमस्कार ${record.referredStudentName || "मित्रा"}! 🎯 MHT-CET / NEET / JEE चे ग्रँड मॉक टेस्ट्स आणि सराव प्रश्न सोडवले का? आजच नवीन टेस्ट देऊन तुझा रँक तपास! 🚀 \nॲप लिंक: ${studentRefUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(cheerMsg)}`;
    window.open(url, "_blank");
    setTimeout(() => setCheerSentId(null), 3000);
  };

  // 10 Visual Slots for 100% Refund Goal
  const refundSlots = Array.from({ length: 10 }, (_, idx) => {
    const record = referredList[idx] || null;
    return {
      slotNumber: idx + 1,
      record,
      isFilled: !!record,
    };
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP 100% REFUND MILESTONE HERO BANNER */}
      <div
        id="referral-milestone-hero"
        className={`rounded-3xl p-6 sm:p-7 border-2 transition-all relative overflow-hidden ${
          isMilestoneAchieved
            ? "bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white border-emerald-400 shadow-xl"
            : "bg-gradient-to-br from-amber-500/10 via-slate-900 to-indigo-950 text-white border-amber-500/40 shadow-xl"
        }`}
      >
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40">
                <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>१० रेफरल्स = १००% फी रिफंड उद्दिष्ट (100% Refund Milestone)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {isMilestoneAchieved
                  ? "🎉 अभिनंदन! तुम्ही १००% फी रिफंड उद्दिष्ट साध्य केले आहे!"
                  : `अजून फक्त ${remainingForMilestone} मित्र बाकी — तुमची भरलेली ₹२९ फी पूर्ण परत मिळवा!`}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center shrink-0">
              <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                प्रगती (Progress)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">
                {totalReferredCount} <span className="text-base text-amber-300">/ {targetMilestone}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar & Milestone Stages */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-black">
              <span className="text-amber-200">
                {progressPercent}% पूर्ण झाले ({totalReferredCount}/{targetMilestone} मित्र)
              </span>
              <span className="text-emerald-300 font-mono-numbers">
                एकूण कमाई: ₹{formatInr(totalEarnings)}
              </span>
            </div>

            <div className="w-full h-4 rounded-full bg-black/40 p-0.5 border border-white/20 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isMilestoneAchieved
                    ? "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-md"
                    : "bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stepper Level Indicators */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1 text-center">
              <div
                className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                  totalReferredCount >= 3
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <div className="font-black text-white">३ मित्र</div>
                <div className="text-[10px]">₹१७.४० जमा</div>
              </div>

              <div
                className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                  totalReferredCount >= 5
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <div className="font-black text-white">५ मित्र</div>
                <div className="text-[10px]">₹२९.०० (१००% फी)</div>
              </div>

              <div
                className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                  totalReferredCount >= 8
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <div className="font-black text-white">८ मित्र</div>
                <div className="text-[10px]">₹४६.४० जमा</div>
              </div>

              <div
                className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                  totalReferredCount >= 10
                    ? "bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400/50"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <div className="font-black text-amber-300">१० मित्र 🏆</div>
                <div className="text-[10px] text-amber-200 font-extrabold">१००% रिफंड अनलॉक</div>
              </div>
            </div>
          </div>

          {/* Quick Action Footer in Hero */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                प्रत्येक मित्राच्या जोडणीवर त्वरित <strong>₹५.८० (२०%)</strong> तुमच्या वॉलेटमध्ये जमा होतात.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>मित्र जोडा</span>
              </a>

              {onNavigateToWithdraw && (
                <button
                  type="button"
                  onClick={onNavigateToWithdraw}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                >
                  <span>पैसे काढा (Withdraw) →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 10-SLOT VISUAL AVATAR GRID ("माझे १० रिफंड स्लॉट्स") */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>माझे १० रिफंड स्लॉट्स (10 Milestone Slots)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              प्रत्येक स्लॉट भरल्यास ₹५.८० थेट खात्यावर जमा. १० स्लॉट पूर्ण होताच संपूर्ण फी परत!
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-black text-xs border border-emerald-300 dark:border-emerald-700 font-mono-numbers">
            भरलेले स्लॉट: {totalReferredCount} / 10
          </div>
        </div>

        {/* 10 Visual Slot Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {refundSlots.map((slot) => {
            if (slot.isFilled && slot.record) {
              const rec = slot.record;
              const initials = (rec.referredStudentName || "S")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={slot.slotNumber}
                  className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700/80 space-y-2 relative shadow-xs transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black font-mono-numbers px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      #{slot.slotNumber}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      +₹५.८०
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {rec.referredStudentName || "विद्यार्थी"}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {maskPhoneNumber(rec.referredStudentMobile)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-emerald-200 dark:border-emerald-800 text-slate-600 dark:text-slate-300">
                    <span className="font-bold">{rec.referredStudentExam || "MHT_CET"}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">यशस्वी ✓</span>
                  </div>
                </div>
              );
            }

            // Empty Slot
            return (
              <div
                key={slot.slotNumber}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 space-y-2 flex flex-col justify-between text-center transition-all hover:border-emerald-400 dark:hover:border-emerald-500 group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono-numbers font-bold text-slate-400 dark:text-slate-500">
                  <span>स्लॉट #{slot.slotNumber}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">₹५.८० बाकी</span>
                </div>

                <div className="py-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-300 font-black text-xs flex items-center justify-center mx-auto group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-emerald-900/60 dark:group-hover:text-emerald-300 transition-colors">
                    +
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1">
                    मित्र जोडा
                  </div>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 px-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-300 text-[10px] font-black transition-colors block cursor-pointer"
                >
                  आमंत्रित करा
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. FOUR STATUS METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>एकूण जोडलेले</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono-numbers">
            {totalReferredCount}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            तुमच्या कोडने आलेले विद्यार्थी
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
            <span>यशस्वी नोंदणी</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers">
            {verifiedCount}
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium">
            पडताळलेले व कमिशन जमा
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center justify-between">
            <span>जमा कमिशन</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono-numbers">
            ₹{formatInr(totalEarnings)}
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
            प्रति मित्र ₹५.८० थेट वॉलेटमध्ये
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center justify-between">
            <span>रिफंडसाठी बाकी</span>
            <Trophy className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400 font-mono-numbers">
            {remainingForMilestone} <span className="text-xs font-normal text-slate-500">मित्र</span>
          </div>
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
            {isMilestoneAchieved ? "लक्ष्य पूर्ण झाले!" : "१००% फी परताव्यासाठी"}
          </p>
        </div>
      </div>

      {/* 4. DETAILED REFERRAL FRIENDS LIST WITH SEARCH & FILTER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>जोडलेल्या मित्रांची सविस्तर यादी (Referred Friends Activity)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              प्रत्येक मित्राची सराव स्थिती, परीक्षा आणि मिळालेले कमिशन तपासा.
            </p>
          </div>

          {/* Search Input & Status Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="नाव, परीक्षा शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                सर्व ({referredList.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("verified")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === "verified"
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                सक्रिय व पेड ({verifiedCount})
              </button>
            </div>
          </div>
        </div>

        {/* List Content */}
        {filteredList.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {referredList.length === 0
                ? "अजून कोणीही विद्यार्थी जोडलेला नाही."
                : "शोधाशी जुळणारा कोणताही मित्र सापडला नाही."}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              तुमचा रेफरल कोड किंवा लिंक मित्रांसोबत WhatsApp वर शेअर करा आणि प्रति विद्यार्थी ₹५.८० कमवा!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp वर शेअर करा</span>
              </a>
              <button
                type="button"
                onClick={onCopyLink}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "लिंक कॉपी झाली!" : "लिंक कॉपी"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold bg-slate-50/70 dark:bg-slate-800/50">
                  <th className="py-3 px-3.5 rounded-l-xl">विद्यार्थी नाव व संपर्क</th>
                  <th className="py-3 px-3">लक्ष्य परीक्षा</th>
                  <th className="py-3 px-3">नोंदणी तारीख</th>
                  <th className="py-3 px-3">रेफरल स्थिती</th>
                  <th className="py-3 px-3 text-right">जमा कमिशन</th>
                  <th className="py-3 px-3.5 text-center rounded-r-xl">सराव प्रेरणा</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                {filteredList.map((rec, idx) => {
                  const initials = (rec.referredStudentName || "S")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <tr
                      key={rec.id || idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {rec.referredStudentName || "विद्यार्थी"}
                            </div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              {maskPhoneNumber(rec.referredStudentMobile)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Exam */}
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                          {rec.referredStudentExam || "MHT_CET"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono-numbers">
                        {new Date(rec.timestamp).toLocaleDateString("mr-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-black text-[10px] border border-emerald-300 dark:border-emerald-700 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>सक्रिय व प्रमाणित (Verified)</span>
                        </span>
                      </td>

                      {/* Commission */}
                      <td className="py-3 px-3 text-right font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers text-sm">
                        +₹{formatInr(rec.commissionEarned || 5.8)}
                      </td>

                      {/* Action / Cheer */}
                      <td className="py-3 px-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleSendCheer(rec)}
                          className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] border border-emerald-200 dark:border-emerald-800/80 inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                          title="मित्राला अभ्यासाची टेस्ट आठवण पाठवा"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{cheerSentId === rec.id ? "पाठवले!" : "आठवण पाठवा"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. QUICK SHARING TOOLBOX AT THE BOTTOM */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="space-y-1 max-w-md">
          <div className="font-black text-sm text-white flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>रेफरल लिंक आणि कोड शेअर करा</span>
          </div>
          <p className="text-xs text-slate-400">
            कोड: <span className="font-mono text-amber-300 font-bold">{studentRefCode}</span> · थेट लिंक वापरून मित्रांना मोफत नोंदणी करायला सांगा.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCopyCode}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 transition-all cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "कोड कॉपी झाला!" : "कोड कॉपी"}</span>
          </button>

          <button
            type="button"
            onClick={onCopyLink}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "लिंक कॉपी झाली!" : "लिंक कॉपी"}</span>
          </button>

          <button
            type="button"
            onClick={onOpenQr}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-white/15 transition-all cursor-pointer"
          >
            <span>QR कोड</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp शेअर</span>
          </a>
        </div>
      </div>
    </div>
  );
};
