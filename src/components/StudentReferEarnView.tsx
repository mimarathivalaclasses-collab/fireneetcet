import React, { useState, useEffect } from "react";
import {
  Gift,
  Share2,
  Copy,
  CheckCircle2,
  Users,
  Wallet,
  Zap,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Trophy,
  ArrowLeft,
  QrCode,
  AlertCircle,
  Clock,
  TrendingUp,
  CreditCard,
  Building2,
  ExternalLink,
} from "lucide-react";
import { StudentUser, StudentReferralRecord, AgentPayoutRequest } from "../types";
import {
  REFERRAL_CONFIG,
  formatInr,
  maskPhoneNumber,
  getReferredStudentsList,
  submitPayoutRequest,
  getUserPayoutsHistory,
} from "../utils/referralSystem";

interface StudentReferEarnViewProps {
  currentUser: StudentUser | null;
  onOpenAuthModal?: () => void;
  onBack?: () => void;
  onNavigateToAgentPortal?: () => void;
}

export const StudentReferEarnView: React.FC<StudentReferEarnViewProps> = ({
  currentUser,
  onOpenAuthModal,
  onBack,
  onNavigateToAgentPortal,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Withdrawal States (Minimum ₹100)
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [upiPayoutInput, setUpiPayoutInput] = useState("");
  const [payoutSuccessMessage, setPayoutSuccessMessage] = useState<string | null>(null);
  const [payoutErrorMessage, setPayoutErrorMessage] = useState<string | null>(null);
  const [isSubmittingWithdraw, setIsSubmittingWithdraw] = useState(false);

  // Active Tab within the view: 'overview' | 'my_referrals' | 'withdraw'
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "my_referrals" | "withdraw">(
    "overview"
  );

  // Student's Referral Code
  const studentRefCode = currentUser
    ? currentUser.referralCode || `REF-${currentUser.mobile.slice(-6)}`
    : "REF-STUDENT";

  const studentRefUrl = `${window.location.origin}${window.location.pathname}?ref=${studentRefCode}`;

  // Referrals Data
  const [referredList, setReferredList] = useState<StudentReferralRecord[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<AgentPayoutRequest[]>([]);

  useEffect(() => {
    if (currentUser) {
      const list = getReferredStudentsList(studentRefCode);
      setReferredList(list);

      const payouts = getUserPayoutsHistory(currentUser.id);
      setPayoutHistory(payouts);

      // default upi if exists
      if (currentUser.mobile && !upiPayoutInput) {
        setUpiPayoutInput(`${currentUser.mobile}@upi`);
      }
    }
  }, [currentUser, studentRefCode]);

  // Calculations: 20% of ₹29 = ₹5.80 per referral
  const totalReferredCount = Math.max(
    currentUser?.totalReferredCount || 0,
    referredList.length
  );
  const availableEarnings =
    currentUser?.referralEarnings !== undefined
      ? currentUser.referralEarnings
      : totalReferredCount * REFERRAL_CONFIG.COMMISSION_PER_STUDENT;

  const minWithdrawal = REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR; // ₹100
  const canWithdraw = availableEarnings >= minWithdrawal;
  const remainingForWithdraw = Math.max(0, minWithdrawal - availableEarnings);
  const referralsNeededForMin = Math.ceil(
    remainingForWithdraw / REFERRAL_CONFIG.COMMISSION_PER_STUDENT
  );

  const targetMilestone = REFERRAL_CONFIG.FREE_REFUND_MILESTONE; // 10 referrals
  const progressToMilestone = Math.min(
    100,
    Math.round((totalReferredCount / targetMilestone) * 100)
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(studentRefCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(studentRefUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutErrorMessage(null);
    setPayoutSuccessMessage(null);

    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    const amt = Number(withdrawAmount);
    if (!amt || isNaN(amt) || amt < minWithdrawal) {
      setPayoutErrorMessage(
        `किमान विड्रॉल रक्कम ₹${minWithdrawal} आहे. कृपया ₹${minWithdrawal} किंवा त्यापेक्षा जास्त रक्कम प्रविष्ट करा.`
      );
      return;
    }

    if (amt > availableEarnings) {
      setPayoutErrorMessage(
        `तुमच्या खात्यात उपलब्ध शिल्लक ₹${formatInr(
          availableEarnings
        )} आहे. त्यापेक्षा जास्त रक्कम काढता येत नाही.`
      );
      return;
    }

    if (!upiPayoutInput.trim()) {
      setPayoutErrorMessage("कृपया वैध UPI ID (PhonePe/Google Pay/Paytm) प्रविष्ट करा.");
      return;
    }

    setIsSubmittingWithdraw(true);

    setTimeout(() => {
      const res = submitPayoutRequest({
        userType: "student",
        userId: currentUser.id,
        userName: currentUser.name,
        userMobile: currentUser.mobile,
        userCode: studentRefCode,
        amount: amt,
        upiId: upiPayoutInput.trim(),
      });

      setIsSubmittingWithdraw(false);

      if (res.success) {
        setPayoutSuccessMessage(res.message);
        setWithdrawAmount("");
        // refresh history
        setPayoutHistory(getUserPayoutsHistory(currentUser.id));
      } else {
        setPayoutErrorMessage(res.message);
      }
    }, 600);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    studentRefUrl
  )}`;

  const whatsappShareText = `🎯 मित्रांनो, MHT-CET, NEET आणि JEE सराव करण्यासाठी हे सर्वात भारी ॲप आहे! \n🔥 ५०००+ MCQs, १० ग्रँड मॉक टेस्ट्स व नोट्स फक्त ₹२९ मध्ये उपलब्ध आहेत!\n🎁 माझ्या लिंकवरून आत्ताच सुरू करा:\n👉 ${studentRefUrl}\n(किंवा नोंदणी करताना रेफरल कोड वापरा: ${studentRefCode})`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 px-3 sm:px-4">
      {/* 1. TOP DUAL SWITCHER & BACK */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>मागे जा (Back)</span>
            </button>
          )}
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300 flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600" />
            <span>विद्यार्थी रेफरल सिस्टीम (२०% कमिशन)</span>
          </span>
        </div>

        {onNavigateToAgentPortal && (
          <button
            onClick={onNavigateToAgentPortal}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white font-black text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-indigo-700/50"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>एजंट पार्टनर पोर्टल वर जा (Agent Portal) →</span>
          </button>
        )}
      </div>

      {/* 2. PROMINENT VERIFIED REFERRAL CODE CARD AT THE VERY TOP (User Requirement: "refer कोडे वर कर म्हणजे त्यांना खरं वाटेल") */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>१००% अस्सल व प्रमाणित रेफरल सिस्टीम (Official Verified System)</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                मित्रांना जोडा · प्रति रेफर ₹२९ च्या २०% (₹५.८०) कमिशन मिळवा!
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-center">
              <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                प्रति विद्यार्थी कमिशन
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono-numbers">
                ₹५.८० <span className="text-xs text-white font-normal">(२०%)</span>
              </div>
            </div>
          </div>

          {/* MAIN REFERRAL CODE HIGHLIGHT BOX */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* The Big Code Badge */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-400/30 space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                <span>तुमचा अधिकृत रेफरल कोड (Referral Code):</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  सक्रिय (Active ID)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px] bg-slate-950/80 px-4 py-3 rounded-2xl border-2 border-emerald-400/50 flex items-center justify-between shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black tracking-wider text-emerald-300 selection:bg-emerald-500">
                    {studentRefCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>कॉपी झाले!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>कोड कॉपी</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
                  title="QR कोड पहा"
                >
                  <QrCode className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">QR कोड</span>
                </button>
              </div>

              {/* Direct Web Link Box */}
              <div className="space-y-1 pt-1">
                <div className="text-[11px] text-slate-300 font-semibold">
                  थेट शेअरिंग लिंक (Direct Link):
                </div>
                <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-700">
                  <span className="flex-1 font-mono text-xs text-slate-300 truncate pl-1">
                    {studentRefUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "कॉपी!" : "लिंक कॉपी"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp 1-Click Action */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white space-y-3 text-center shadow-lg border border-emerald-400/40">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">१-क्लिक WhatsApp शेअर</h3>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  मित्रांना थेट संदेश पाठवून लगेच कमिशन कमवा
                </p>
              </div>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  whatsappShareText
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white text-emerald-950 font-black text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp वर शेअर करा</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIVE STATS DASHBOARD (Balance, Referred Count, Withdrawal Minimum) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              उपलब्ध कमाई (Wallet Balance)
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-950 font-mono-numbers">
            ₹{formatInr(availableEarnings)}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
            <span>किमान विड्रॉल: <strong>₹{minWithdrawal}</strong></span>
            <span
              className={`font-black ${
                canWithdraw ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {canWithdraw ? "✓ विड्रॉल पात्र" : `अजून ₹${formatInr(remainingForWithdraw)} हवे`}
            </span>
          </div>
        </div>

        {/* Total Friends Referred */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              एकूण जोडलेले मित्र (Total Referrals)
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono-numbers">
            {totalReferredCount} <span className="text-sm font-normal text-slate-500">विद्यार्थी</span>
          </div>
          <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
            प्रति मित्र <strong>₹५.८०</strong> थेट जमा झाले
          </div>
        </div>

        {/* 10 Referral 100% Fee Refund Milestone */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>१० रेफरल्स १००% रिफंड</span>
            </span>
            <span className="text-xs font-black text-amber-900 font-mono-numbers">
              {totalReferredCount}/{targetMilestone}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-amber-200/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressToMilestone}%` }}
            />
          </div>

          <div className="text-[11px] text-amber-950 font-bold pt-1">
            {totalReferredCount >= targetMilestone ? (
              <span className="text-emerald-800 flex items-center gap-1 font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                अभिनंदन! १००% फी रिफंड लक्ष्य पूर्ण!
              </span>
            ) : (
              <span>अजून {Math.max(0, targetMilestone - totalReferredCount)} मित्रांना जोडा आणि पूर्ण फी परत मिळवा!</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION SUB-TABS: OVERVIEW & RULES | MY REFERRED LIST | WITHDRAW FORM */}
      <div className="flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab("overview")}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "overview"
              ? "bg-white text-slate-950 font-black shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>नियम व कमिशन चार्ट</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("my_referrals")}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "my_referrals"
              ? "bg-white text-slate-950 font-black shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4 text-indigo-600" />
          <span>रेफर केलेले विद्यार्थी ({totalReferredCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("withdraw")}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "withdraw"
              ? "bg-white text-slate-950 font-black shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Wallet className="w-4 h-4 text-emerald-700" />
          <span>पैसे काढा (Withdraw UPI)</span>
        </button>
      </div>

      {/* TAB CONTENT 1: OVERVIEW & COMMISSION TABLE */}
      {activeSubTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Rules & Transparency Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>रेफरल नियम आणि कमिशन पद्धत</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <div className="font-black text-emerald-950 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>प्रति रेफर २०% थेट कमिशन (₹२९ चे २०% = ₹५.८०)</span>
                </div>
                <p className="text-emerald-900 leading-relaxed">
                  जेव्हा तुमच्या लिंकवरून किंवा रेफरल कोड टाकून कोणताही विद्यार्थी ₹२९ चा प्लॅन सुरू करतो, तेव्हा त्वरित ₹५.८० तुमच्या वॉलेटमध्ये जमा होतात.
                </p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1">
                <div className="font-black text-indigo-950 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>किमान विड्रॉल मर्यादा: ₹१०० (Minimum ₹100 Payout)</span>
                </div>
                <p className="text-indigo-900 leading-relaxed">
                  वॉलेटमध्ये किमान ₹१०० किंवा जास्त रक्कम झाल्यावर तुम्ही तुमच्या PhonePe, Google Pay, Paytm UPI ID वर किंवा बँक खात्यात थेट विड्रॉल विनंती पाठवू शकता.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-black text-amber-950 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>१० रेफरल्स = १००% फी रिफंड किंवा अतिरिक्त नफा!</span>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  १० मित्र जोडल्यावर तुम्ही तुमची संपूर्ण भरलेली ₹२९ फी परत घेऊ शकता किंवा ₹५८ थेट खात्यावर ट्रान्सफर करू शकता.
                </p>
              </div>
            </div>
          </div>

          {/* Transparent Earning Calculator Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>कमिशन कमाई तक्ता (Earnings Chart)</span>
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                २०% प्रति रेफर
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-2">विद्यार्थी संख्या</th>
                    <th className="py-2">दर</th>
                    <th className="py-2 text-right">एकूण कमाई</th>
                    <th className="py-2 text-right">विड्रॉल स्थिती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700 font-mono-numbers">
                  <tr>
                    <td className="py-2.5">५ विद्यार्थी</td>
                    <td className="py-2.5">२०% (₹५.८०)</td>
                    <td className="py-2.5 text-right font-black text-slate-900">₹२९.००</td>
                    <td className="py-2.5 text-right text-slate-400">अजून ५ हवे</td>
                  </tr>
                  <tr className="bg-emerald-50/50">
                    <td className="py-2.5 font-bold">१० विद्यार्थी (रिफंड)</td>
                    <td className="py-2.5">२०% (₹५.८०)</td>
                    <td className="py-2.5 text-right font-black text-emerald-700">₹५८.००</td>
                    <td className="py-2.5 text-right text-emerald-700 font-bold">१००% फी रिफंड</td>
                  </tr>
                  <tr className="bg-emerald-100/40">
                    <td className="py-2.5 font-bold">१८ विद्यार्थी (Min Payout)</td>
                    <td className="py-2.5">२०% (₹५.८०)</td>
                    <td className="py-2.5 text-right font-black text-emerald-800">₹१०४.४०</td>
                    <td className="py-2.5 text-right text-emerald-700 font-bold">✓ थेट UPI विड्रॉल</td>
                  </tr>
                  <tr>
                    <td className="py-2.5">५० विद्यार्थी</td>
                    <td className="py-2.5">२०% (₹५.८०)</td>
                    <td className="py-2.5 text-right font-black text-slate-900">₹२९०.००</td>
                    <td className="py-2.5 text-right text-emerald-700 font-bold">✓ थेट खात्यात</td>
                  </tr>
                  <tr>
                    <td className="py-2.5">१०० विद्यार्थी</td>
                    <td className="py-2.5">२०% (₹५.८०)</td>
                    <td className="py-2.5 text-right font-black text-slate-900">₹५८०.००</td>
                    <td className="py-2.5 text-right text-emerald-700 font-bold">✓ थेट खात्यात</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span>अडचण आल्यास संपर्क:</span>
              <a
                href={`https://wa.me/91${REFERRAL_CONFIG.ADMIN_CONTACT_PHONE}?text=Namaskar%20Admin,%20Referral%20babat%20sahayya%20have%20aahe.`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{REFERRAL_CONFIG.ADMIN_CONTACT_PHONE} (WhatsApp)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MY REFERRED STUDENTS LIST ("त्यांनी किती refer केले हे दिसेल") */}
      {activeSubTab === "my_referrals" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>माझ्या रेफरलने सामील झालेले विद्यार्थी</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                खालील विद्यार्थ्यांनी तुमच्या कोडने नोंदणी केली आहे व प्रति विद्यार्थी ₹५.८० जमा झाले आहेत.
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs font-mono-numbers">
              एकूण: {referredList.length} विद्यार्थी
            </div>
          </div>

          {referredList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                अजून कोणीही विद्यार्थी जोडलेला नाही.
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                तुमचा रेफरल कोड किंवा लिंक मित्रांसोबत WhatsApp वर शेअर करा आणि प्रति विद्यार्थी ₹५.८० कमवा!
              </p>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Copy className="w-4 h-4" />
                <span>लिंक कॉपी करून शेअर करा</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                    <th className="py-2.5 px-3 rounded-l-xl">विद्यार्थ्याचे नाव</th>
                    <th className="py-2.5 px-3">मोबाईल</th>
                    <th className="py-2.5 px-3">लक्ष्य परीक्षा</th>
                    <th className="py-2.5 px-3">नोंदणी तारीख</th>
                    <th className="py-2.5 px-3">स्थिती</th>
                    <th className="py-2.5 px-3 text-right rounded-r-xl">कमिशन जमा</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {referredList.map((rec, idx) => (
                    <tr key={rec.id || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {rec.referredStudentName || "विद्यार्थी"}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500">
                        {maskPhoneNumber(rec.referredStudentMobile)}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px]">
                          {rec.referredStudentExam || "MHT_CET"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono-numbers">
                        {new Date(rec.timestamp).toLocaleDateString("mr-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          सक्रिय
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-black text-emerald-700 font-mono-numbers">
                        +₹{formatInr(rec.commissionEarned || 5.8)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: WITHDRAW FORM (MINIMUM ₹100) */}
      {activeSubTab === "withdraw" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Withdrawal Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>UPI विड्रॉल विनंती (Withdrawal)</span>
              </h3>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                किमान मर्यादा: ₹{minWithdrawal}
              </span>
            </div>

            {/* If balance is less than ₹100, show guidance card */}
            {!canWithdraw ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-start gap-2.5 text-amber-950 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">
                      सध्या तुमचे वॉलेट बॅलन्स ₹{formatInr(availableEarnings)} आहे.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      पैसे थेट खात्यावर काढण्यासाठी <strong>किमान ₹{minWithdrawal}</strong> शिल्लक असणे आवश्यक आहे. (अजून <strong>₹{formatInr(remainingForWithdraw)}</strong> किंवा <strong>{referralsNeededForMin}</strong> मित्रांना जोडा).
                    </p>
                  </div>
                </div>

                {/* Progress bar towards ₹100 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-amber-900 font-mono-numbers">
                    <span>सध्या: ₹{formatInr(availableEarnings)}</span>
                    <span>लक्ष्य: ₹{minWithdrawal}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-amber-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{
                        width: `${Math.min(100, (availableEarnings / minWithdrawal) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {payoutSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{payoutSuccessMessage}</span>
              </div>
            )}

            {payoutErrorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{payoutErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawalSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  काढायची रक्कम (रुपये):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={minWithdrawal}
                    max={availableEarnings}
                    required
                    placeholder={`किमान ${minWithdrawal}`}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-emerald-600 font-mono font-bold text-xs outline-none"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>उपलब्ध: ₹{formatInr(availableEarnings)}</span>
                  {availableEarnings >= minWithdrawal && (
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(String(Math.floor(availableEarnings)))}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      सर्व रक्कम (₹{Math.floor(availableEarnings)}) टाका
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  तुमचा UPI ID (PhonePe / GPay / Paytm / BHIM):
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. 9307220454@yz किंवा name@okaxis"
                  value={upiPayoutInput}
                  onChange={(e) => setUpiPayoutInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-emerald-600 font-mono font-bold text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!canWithdraw || isSubmittingWithdraw}
                className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  canWithdraw
                    ? "bg-slate-900 hover:bg-slate-800 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmittingWithdraw
                    ? "विनंती पाठवत आहे..."
                    : `₹${withdrawAmount || minWithdrawal} विड्रॉल विनंती पाठवा`}
                </span>
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                विड्रॉल विनंती पाठवल्यानंतर २४ तासांत रक्कम थेट तुमच्या बँक/UPI खात्यावर जमा केली जाते.
              </span>
            </div>
          </div>

          {/* Payout Requests History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>विड्रॉल इतिहास (Payout History)</span>
            </h3>

            {payoutHistory.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                कोणतीही विड्रॉल विनंती केलेली नाही.
              </div>
            ) : (
              <div className="space-y-2.5">
                {payoutHistory.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-black text-slate-900 font-mono-numbers">
                        ₹{formatInr(p.amount)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        UPI: {p.upiId}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(p.requestedAt).toLocaleString("mr-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "approved" || p.status === "transferred"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {p.status === "approved" || p.status === "transferred"
                          ? "✓ जमा झाले (Paid)"
                          : p.status === "pending"
                          ? "⏳ प्रलंबित (Pending)"
                          : "नाकारले (Rejected)"}
                      </span>
                      {p.adminUtr && (
                        <div className="text-[10px] font-mono text-emerald-700 mt-1">
                          UTR: {p.adminUtr}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <h3 className="font-black text-slate-900 text-base">
              तुमचा रेफरल QR कोड
            </h3>
            <p className="text-xs text-slate-500">
              मित्रांना हा QR कोड स्कॅन करायला सांगा आणि थेट तुमच्या रेफरलने सुरू करा.
            </p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
              <img
                src={qrImageUrl}
                alt="Referral QR Code"
                className="w-48 h-48 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-950">
              कोड: {studentRefCode}
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
            >
              बंद करा (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
