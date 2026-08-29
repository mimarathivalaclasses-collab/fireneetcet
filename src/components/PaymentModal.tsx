import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  QrCode,
  Copy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Phone,
  HelpCircle,
  X,
  CreditCard,
  Building2,
  Gift,
  Users,
  Award,
  ExternalLink,
  Smartphone,
  Check,
} from "lucide-react";
import { recordReferralTransaction } from "../utils/referralSystem";
import { saveStudentToCloud } from "../services/firebase";
import { StudentUser } from "../types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amount?: number;
  initialPlanType?: "student" | "coaching";
  onPaymentSuccess?: (utr: string) => void;
  currentUser?: StudentUser | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName,
  amount: customAmount,
  initialPlanType = "student",
  onPaymentSuccess,
  currentUser,
}) => {
  const UPI_ID = "9307220454@yz";
  const PAYEE_NAME = "AbhyasMitra MHT-CET";
  const CONTACT_NUMBER = "9307220454";

  const activeAmount = customAmount !== undefined ? customAmount : 29;
  const activePlanTitle = planName || "NEET/JEE/MHT-CET संपूर्ण सराव व ग्रँड टेस्ट्स विद्यार्थी प्लॅन (Student Access)";

  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [studentName, setStudentName] = useState(currentUser?.name || "");
  const [studentPhone, setStudentPhone] = useState(currentUser?.mobile || "");
  const [referralCodeInput, setReferralCodeInput] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("ref") || params.get("agent") || "";
    } catch {
      return "";
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoActivating, setIsAutoActivating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [autoActivated, setAutoActivated] = useState(false);

  if (!isOpen) return null;

  // Standard UPI URI format
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(activePlanTitle)}`;

  // Quick App Intent Links
  const gpayUri = `gpay://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(activePlanTitle)}`;

  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(activePlanTitle)}`;

  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(activePlanTitle)}`;

  // QR code URL using qrserver
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    upiUri
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Instant 1-Second Auto Activation Logic
  const handleInstantAutoActivate = (customUtr?: string) => {
    const finalUtr = customUtr || utrNumber.trim() || `AUTO_UPI_${Date.now().toString().slice(-8)}`;
    setIsAutoActivating(true);

    setTimeout(() => {
      setIsAutoActivating(false);
      setAutoActivated(true);
      setSuccessMessage(true);

      // Fire celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });

      // Update student in LocalStorage and Cloud Firestore to Instant Approved & Fee Paid
      try {
        const phone = studentPhone.trim() || currentUser?.mobile || CONTACT_NUMBER;
        const name = studentName.trim() || currentUser?.name || "विद्यार्थी";

        const studentsRaw = localStorage.getItem("mcq_app_all_students_v1");
        let students: StudentUser[] = studentsRaw ? JSON.parse(studentsRaw) : [];

        let studentIdx = students.findIndex((s) => s.mobile === phone);
        let updatedStudent: StudentUser;

        if (studentIdx >= 0) {
          students[studentIdx] = {
            ...students[studentIdx],
            isApproved: true,
            isFeePaid: true,
            paymentStatus: "paid",
            paymentUtr: finalUtr,
            amountPaid: activeAmount,
            approvedAt: Date.now(),
          };
          updatedStudent = students[studentIdx];
        } else {
          updatedStudent = {
            id: `student_user_${phone}`,
            name: name,
            mobile: phone,
            password: "123",
            examTarget: currentUser?.examTarget || "MHT_CET",
            primaryDeviceId: currentUser?.primaryDeviceId || `dev_${phone}`,
            primaryDeviceName: currentUser?.primaryDeviceName || "Mobile Browser",
            approvalStatus: "approved",
            registeredAt: Date.now(),
            lastLoginAt: Date.now(),
            isApproved: true,
            isFeePaid: true,
            paymentStatus: "paid",
            paymentUtr: finalUtr,
            amountPaid: activeAmount,
            trialStartedAt: Date.now(),
            approvedAt: Date.now(),
          };
          students.push(updatedStudent);
        }

        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
        localStorage.setItem("mcq_current_user_v1", JSON.stringify(updatedStudent));

        // Save to Firebase Cloud
        saveStudentToCloud(updatedStudent);

        // Record receipt
        const existingReceiptsRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
        const existingReceipts = existingReceiptsRaw ? JSON.parse(existingReceiptsRaw) : [];
        existingReceipts.push({
          id: `pay-${Date.now()}`,
          upiId: UPI_ID,
          amount: activeAmount,
          planName: activePlanTitle,
          utr: finalUtr,
          studentName: name,
          studentPhone: phone,
          date: new Date().toISOString(),
          status: "approved",
          instantActivated: true,
        });
        localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(existingReceipts));

        // Record referral transaction if code present
        if (referralCodeInput.trim()) {
          try {
            recordReferralTransaction({
              referrerCode: referralCodeInput.trim(),
              referredStudent: {
                id: updatedStudent.id,
                name: updatedStudent.name,
                mobile: updatedStudent.mobile,
                paymentStatus: "paid",
              },
              planPrice: activeAmount,
            });
          } catch (e) {}
        }
      } catch (err) {
        console.error("Instant activation error:", err);
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(finalUtr);
      }
    }, 1200);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 4) {
      alert("कृपया वैध UTR / Transaction Ref नंबर टाका किंवा 'झटपट ॲक्टिव्हेट करा' दाबा.");
      return;
    }
    handleInstantAutoActivate(utrNumber.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2.5 shadow-sm">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center justify-center gap-2">
            <span>थेट UPI व झटपट ॲक्टिव्हेशन</span>
          </h2>
          <p className="text-emerald-200/90 text-xs mt-1 font-medium">
            PhonePe, Google Pay, Paytm, BHIM द्वारे फक्त ₹{activeAmount} भरा आणि १ सेकंदात खाते सुरू करा!
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>विद्यार्थी ऑल-इन-वन ॲक्सेस • फक्त ₹२९ (आजीवन सराव)</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {successMessage ? (
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-300">
                🎉 अभिनंदन! तुमचे खाते तात्काळ सक्रिय झाले आहे!
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold leading-relaxed">
                तुमचे <strong>{activePlanTitle}</strong> १ सेकंदात यशस्वीरीत्या अनलॉक झाले आहे. आता तुम्ही सर्व २५,०००+ प्रश्न, १० ग्रँड टेस्ट्स, OMR व नोट्स अमर्याद वापरू शकता!
              </p>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                रक्कम: ₹{activeAmount} | खाते: {studentPhone || currentUser?.mobile || "सक्रिय"}
              </div>

              {/* 1-Click WhatsApp Confirmation Link */}
              <a
                href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                  `🎉 नमस्कार सर, मी ₹${activeAmount} चे पेमेंट केले आहे आणि माझे खाते यशस्वीरीत्या सक्रिय झाले आहे!\n👤 नाव: ${studentName || currentUser?.name || "विद्यार्थी"}\n📱 मोबाईल: ${studentPhone || currentUser?.mobile || CONTACT_NUMBER}\n📚 परीक्षा: ${currentUser?.examTarget || "MHT-CET"}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>WhatsApp वर पावती पाठवा / संपर्क करा ({CONTACT_NUMBER})</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs shadow-xs transition-colors cursor-pointer"
              >
                सराव सुरू करा (Start Practice Now) →
              </button>
            </div>
          ) : (
            <>
              {/* Active Plan Pricing Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    🎯 विद्यार्थी संपूर्ण ॲक्सेस (Student Plan)
                  </div>
                  <div className="text-xs font-black text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {activePlanTitle}
                  </div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mt-0.5">
                    ✓ सर्व सराव MCQs + ग्रँड मॉक टेस्ट्स + नोट्स + OMR
                  </div>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">फीस</div>
                  <div className="text-2xl font-black text-emerald-950 dark:text-emerald-300 font-mono-numbers">
                    ₹{activeAmount}
                  </div>
                </div>
              </div>

              {/* 10 Referral Refund Offer Banner */}
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex items-start gap-2.5">
                <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 dark:text-amber-300">
                  <span className="font-black text-amber-900 dark:text-amber-200">🎁 १० मित्रांना रेफर करा आणि १००% फी परत मिळवा!</span>
                  <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5 leading-snug">
                    तुमच्या रेफरल कोडने १० मित्रांनी ॲप सुरू केल्यास तुमचे भरलेले सर्व ₹२९ थेट तुमच्या खात्यावर पूर्णपणे रिफंड मिळतील!
                  </p>
                </div>
              </div>

              {/* Instant UPI App Launch Buttons (Mobile friendly) */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>१-क्लिकने थेट UPI ॲप उघडा (Direct UPI Pay):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={gpayUri}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-center font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Google Pay</span>
                  </a>
                  <a
                    href={phonepeUri}
                    className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 border border-purple-300 dark:border-purple-800 text-center font-bold text-xs text-purple-900 dark:text-purple-300 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>PhonePe</span>
                  </a>
                  <a
                    href={paytmUri}
                    className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 border border-cyan-300 dark:border-cyan-800 text-center font-bold text-xs text-cyan-900 dark:text-cyan-300 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Paytm</span>
                  </a>
                  <a
                    href={upiUri}
                    className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800 text-center font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>BHIM / Any</span>
                  </a>
                </div>
              </div>

              {/* QR Code Box */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-center">
                <div className="bg-white p-3 rounded-2xl border border-slate-300 shadow-md inline-block">
                  <img
                    src={qrCodeUrl}
                    alt="Payment QR Code"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain mx-auto"
                  />
                  <div className="mt-2 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                    Scan with Any UPI App (₹{activeAmount})
                  </div>
                </div>

                {/* Copy Official Payee UPI ID */}
                <div className="w-full max-w-sm space-y-1.5">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1">
                    <span>माझा अधिकृत UPI ID (Payee UPI ID):</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border-2 border-emerald-500 shadow-xs">
                    <span className="flex-1 font-mono font-black text-sm text-slate-950 dark:text-white tracking-wide text-left pl-2 select-all">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                        copied
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {copied ? (
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
                </div>
              </div>

              {/* Instant 1-Second Auto Activation Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleInstantAutoActivate()}
                  disabled={isAutoActivating}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  {isAutoActivating ? (
                    <span>१ सेकंदात ॲक्टिव्हेट होत आहे...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>⚡ पेमेंट केले, १ सेकंदात ऑटो-ॲक्टिव्हेट करा (Instant Activate)</span>
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
                  <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase">
                    किंवा UTR टाका
                  </span>
                </div>
              </div>

              {/* UTR Submission Form */}
              <form onSubmit={handleVerifySubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="नाव (Student / Class Name)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="मोबाईल नंबर (Phone)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="12 अंकी UTR / Ref No (उदा. 423819028341)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-xs font-mono font-bold focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="रेफरल कोड / एजंट कोड (ऐच्छिक - उदा. AGT-1001 किंवा REF-982341)"
                    value={referralCodeInput}
                    onChange={(e) => setReferralCodeInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-xs font-mono font-semibold uppercase focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>UTR सबमिट करा व खाते अनलॉक करा</span>
                </button>
              </form>

              {/* Direct Help / WhatsApp Contact */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>मदत / तात्काळ मंजुरी: <strong>{CONTACT_NUMBER}</strong></span>
                </div>
                <a
                  href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                    `नमस्कार सर, मी ₹${activeAmount} चे पेमेंट केले आहे. कृपया खाते सक्रिय करा.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
