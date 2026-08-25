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
} from "lucide-react";
import { StudentUser, StudentReferralRecord } from "../types";

interface StudentReferEarnViewProps {
  currentUser: StudentUser | null;
  onOpenAuthModal?: () => void;
  onBack?: () => void;
}

export const StudentReferEarnView: React.FC<StudentReferEarnViewProps> = ({
  currentUser,
  onOpenAuthModal,
  onBack,
}) => {
  const MASTER_ADMIN_PHONE = "9307220454";

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [upiPayoutInput, setUpiPayoutInput] = useState("");
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Generate Referral Code for student
  const studentRefCode = currentUser
    ? currentUser.referralCode || `REF-${currentUser.mobile.slice(-6)}`
    : "REF-DEMO";

  const studentRefUrl = `${window.location.origin}${window.location.pathname}?ref=${studentRefCode}`;

  // Referrals Count & Earnings
  const referredCount = currentUser?.totalReferredCount || 0;
  const earnings = currentUser?.referralEarnings || referredCount * 5;
  const targetGoal = 10;
  const progressPercent = Math.min(100, Math.round((referredCount / targetGoal) * 100));

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

  const handleClaimRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiPayoutInput.trim()) {
      alert("कृपया तुमचा UPI ID टाका.");
      return;
    }

    try {
      const existingRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push({
        id: `refund-${Date.now()}`,
        studentId: currentUser?.id,
        studentName: currentUser?.name || "Student",
        studentPhone: currentUser?.mobile || "",
        upiId: upiPayoutInput.trim(),
        amount: 29,
        planName: "10 Referrals 100% Fee Refund Claim",
        utr: "CLAIM_REFUND",
        date: new Date().toISOString(),
        status: "pending",
      });
      localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(existing));
      setPayoutSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/30 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/30">
              <Gift className="w-3.5 h-3.5 fill-amber-300" />
              <span>विद्यार्थी रेफर अँड अर्न (Refer 10 & Get 100% Fee Refund)</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            १० मित्रांना जोडा आणि संपूर्ण ₹२९ परत मिळवा!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            तुमचा रेफरल कोड किंवा लिंक मित्रांसोबत शेअर करा. १० मित्रांनी ॲप सुरू करताच तुमची संपूर्ण वर्गणी थेट तुमच्या UPI खात्यावर परत मिळेल.
          </p>
        </div>
      </div>

      {/* Progress & Milestone Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>तुमचे रेफरल्स लक्ष्य (10 Referral Milestone)</span>
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-950 font-mono-numbers">
              {referredCount} / {targetGoal} मित्र
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>सुरुवात (0)</span>
              <span>५०% लक्ष्य (5)</span>
              <span>१००% मोफत रिफंड (10)</span>
            </div>
          </div>

          {/* Status Note */}
          {referredCount >= 10 ? (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>अभिनंदन! तुमचे १० रेफरल्स पूर्ण झाले आहेत. तुम्ही १००% रिफंड मिळवण्यासाठी पात्र आहात!</span>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
              💡 अजून <strong>{Math.max(0, targetGoal - referredCount)}</strong> मित्रांना जोडा आणि १००% रिफंड मिळवा.
            </div>
          )}
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              जमा झालेले रिवॉर्ड्स
            </div>
            <div className="text-3xl font-black text-emerald-950 font-mono-numbers mt-1">
              ₹{earnings}
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              ₹५१ शिल्लक झाल्यावर किंवा १० रेफरल्सवर थेट UPI काढता येईल.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-200 text-[10px] text-slate-600 font-bold">
            UPI द्वारे थेट २४ तासांत खात्यात
          </div>
        </div>
      </div>

      {/* Share Links Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Referral Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600" />
            <span>तुमचा युनिक रेफरल कोड व लिंक</span>
          </h3>

          {!currentUser ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-center">
              <p className="text-xs text-amber-900 font-bold">
                तुमचा रेफरल ट्रॅकर सुरू करण्यासाठी कृपया प्रथम लॉगिन करा.
              </p>
              {onOpenAuthModal && (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black cursor-pointer shadow-xs"
                >
                  लॉगिन करा (Login)
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Code Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    तुमचा रेफरल कोड
                  </div>
                  <div className="text-lg font-black text-slate-900 font-mono tracking-wide">
                    {studentRefCode}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>कॉपी झाले!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>कॉपी</span>
                    </>
                  )}
                </button>
              </div>

              {/* Link Box */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700">थेट वेब लिंक:</div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-300">
                  <span className="flex-1 font-mono text-xs text-slate-700 truncate pl-2">
                    {studentRefUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>कॉपी!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>लिंक कॉपी</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Share Button */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `🎯 मित्रांनो, MHT-CET आणि NEET सराव करण्यासाठी हे सर्वात छान ॲप आहे! ५०००+ MCQs आणि १० ग्रँड मॉक टेस्ट्स फक्त ₹२९ मध्ये! माझ्या लिंकवरून लगेच सुरू करा: ${studentRefUrl}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>मित्रांना WhatsApp वर पाठवा (Share to Friends)</span>
              </a>
            </>
          )}
        </div>

        {/* Claim Refund Form */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span>रिफंड / कॅशबॅक क्लेम करा (Claim Refund)</span>
          </h3>

          {payoutSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>तुमची क्लेम विनंती यशस्वीपणे नोंदवली गेली आहे! लवकरच तुमच्या खात्यावर रक्कम पाठवली जाईल.</span>
            </div>
          ) : (
            <form onSubmit={handleClaimRefund} className="space-y-3.5">
              <p className="text-xs text-slate-600 leading-relaxed">
                १० मित्र जोडल्यानंतर किंवा ५१ रुपये जमा झाल्यावर तुमचा UPI ID खाली टाका:
              </p>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  तुमचा UPI ID (PhonePe / GPay / Paytm):
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. 9307220454@pz"
                  value={upiPayoutInput}
                  onChange={(e) => setUpiPayoutInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-emerald-600 font-mono font-bold text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>₹२९ संपूर्ण रिफंड क्लेम करा</span>
              </button>
            </form>
          )}

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>अधिकृत सपोर्ट: <strong>{MASTER_ADMIN_PHONE}</strong> वर थेट संपर्क करू शकता.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
