import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Copy,
  QrCode,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  Phone,
  Gift,
  Clock,
  MessageCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { StudentUser } from "../types";
import { saveStudentToCloud } from "../services/firebase";
import { recordReferralTransaction } from "../utils/referralSystem";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (utr: string) => void;
  planTitle?: string;
  planPrice?: number;
  currentUser?: StudentUser | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  planTitle = "विद्यार्थी संपूर्ण सराव पॅक",
  planPrice = 29,
  currentUser,
}) => {
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [studentName, setStudentName] = useState<string>(currentUser?.name || "");
  const [studentPhone, setStudentPhone] = useState<string>(currentUser?.mobile || "");
  const [referralCodeInput, setReferralCodeInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [recordedUtr, setRecordedUtr] = useState<string>("");

  if (!isOpen) return null;

  // Single Standard Rate: ₹29
  const activeAmount = 29;
  const activePlanTitle = "MHT-CET / NEET / JEE संपूर्ण सराव पॅक";

  // Official UPI Configurations
  const UPI_ID = "9307220454@yz";
  const CONTACT_NUMBER = "9307220454";

  // Deep Link URI for ₹29 Payment
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "AbhyasMitra MCQ App"
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent("MCQ App Student Access")}`;

  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "AbhyasMitra MCQ App"
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent("MCQ App Student Access")}`;

  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "AbhyasMitra MCQ App"
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent("MCQ App Student Access")}`;

  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "AbhyasMitra MCQ App"
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent("MCQ App Student Access")}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    upiUri
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Payment Receipt Submission Flow (Enforces Pending Approval)
  const handleSubmitPayment = (customUtr?: string) => {
    const finalUtr = customUtr || utrNumber.trim() || `UPI_${Date.now().toString().slice(-8)}`;
    const phone = studentPhone.trim() || currentUser?.mobile || CONTACT_NUMBER;
    const name = studentName.trim() || currentUser?.name || "विद्यार्थी";

    if (!finalUtr || finalUtr.length < 4) {
      alert("कृपया वैध UTR / ट्रान्झॅक्शन नंबर प्रविष्ट करा.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setRecordedUtr(finalUtr);

      // Fire celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Update student record in LocalStorage & Cloud to: Pending Admin Approval
      try {
        const studentsRaw = localStorage.getItem("mcq_app_all_students_v1");
        let students: StudentUser[] = studentsRaw ? JSON.parse(studentsRaw) : [];

        let studentIdx = students.findIndex((s) => s.mobile === phone);
        let targetStudent: StudentUser;

        if (studentIdx >= 0) {
          students[studentIdx] = {
            ...students[studentIdx],
            approvalStatus: "pending",
            isApproved: false,
            isFeePaid: true,
            paymentStatus: "paid",
            paymentUtr: finalUtr,
            amountPaid: activeAmount,
          };
          targetStudent = students[studentIdx];
        } else {
          targetStudent = {
            id: `student_user_${phone}`,
            name: name,
            mobile: phone,
            password: "123",
            examTarget: currentUser?.examTarget || "MHT_CET",
            primaryDeviceId: getOrCreateDeviceId(),
            primaryDeviceName: getDeviceName(),
            approvalStatus: "pending",
            registeredAt: Date.now(),
            lastLoginAt: Date.now(),
            isApproved: false,
            isFeePaid: true,
            paymentStatus: "paid",
            paymentUtr: finalUtr,
            amountPaid: activeAmount,
          };
          students.push(targetStudent);
        }

        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(targetStudent));

        // Save to Firebase Cloud
        saveStudentToCloud(targetStudent);

        // Record receipt
        const existingReceiptsRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
        const existingReceipts = existingReceiptsRaw ? JSON.parse(existingReceiptsRaw) : [];
        existingReceipts.unshift({
          id: `pay-${Date.now()}`,
          upiId: UPI_ID,
          amount: activeAmount,
          planName: activePlanTitle,
          utr: finalUtr,
          studentName: name,
          studentPhone: phone,
          date: new Date().toISOString(),
          status: "pending_approval",
        });
        localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(existingReceipts));

        // Record referral transaction if code present
        if (referralCodeInput.trim()) {
          try {
            recordReferralTransaction({
              referrerCode: referralCodeInput.trim(),
              referredStudent: {
                id: targetStudent.id,
                name: targetStudent.name,
                mobile: targetStudent.mobile,
                paymentStatus: "paid",
              },
              planPrice: activeAmount,
            });
          } catch (e) {}
        }
      } catch (err) {
        console.error("Payment submission error:", err);
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(finalUtr);
      }
    }, 600);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitPayment(utrNumber.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-6 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2.5 shadow-sm">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center justify-center gap-2">
            <span>थेट UPI पेमेंट व नोंदणी</span>
          </h2>
          <p className="text-emerald-200/90 text-xs mt-1 font-medium">
            PhonePe, Google Pay, Paytm, BHIM द्वारे फक्त ₹{activeAmount} भरा
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>विद्यार्थी ऑल-इन-वन ॲक्सेस • फक्त ₹२९ (आजीवन सराव)</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {submittedSuccess ? (
            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <Clock className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                🎉 पेमेंट पावती नोंदवली गेली आहे!
              </h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                तुमचा UTR: <strong>{recordedUtr}</strong> यशस्वीरित्या सुरक्षित नोंदवला गेला आहे. <strong>ॲडमिन कडून पडताळणी झाल्यावर तुमचे खाते तात्काळ मंजूर (Approved) करण्यात येईल!</strong>
              </p>

              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-mono font-bold text-slate-800">
                रक्कम: ₹{activeAmount} | मोबाईल: {studentPhone || currentUser?.mobile}
              </div>

              {/* 1-Click WhatsApp Confirmation to Admin */}
              <a
                href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                  `नमस्कार ॲडमिन सर, मी ₹${activeAmount} चे पेमेंट केले आहे आणि UTR नोंदवला आहे.\n\n👤 नाव: ${studentName || currentUser?.name || "विद्यार्थी"}\n📱 मोबाईल: ${studentPhone || currentUser?.mobile || CONTACT_NUMBER}\n💰 भरलेली रक्कम: ₹${activeAmount}\n🧾 UTR No: ${recordedUtr}\n📚 परीक्षा: ${currentUser?.examTarget || "MHT-CET"}\n\nकृपया माझे खाते तपासून मंजूर (Approve) करा.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp वर ॲडमिनला मंजुरीसाठी मेसेज पाठवा ({CONTACT_NUMBER})</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl bg-slate-900 text-white font-black text-xs shadow-xs transition-colors cursor-pointer"
              >
                समजले, बंद करा
              </button>
            </div>
          ) : (
            <>
              {/* Active Plan Pricing Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                    🎯 विद्यार्थी संपूर्ण ॲक्सेस (Student Pack)
                  </div>
                  <div className="text-xs font-black text-slate-900 line-clamp-1 mt-0.5">
                    {activePlanTitle}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                    ✓ सर्व सराव MCQs + ग्रँड मॉक टेस्ट्स + नोट्स + OMR
                  </div>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">फीस</div>
                  <div className="text-2xl font-black text-emerald-900 font-mono">
                    ₹{activeAmount}
                  </div>
                </div>
              </div>

              {/* 10 Referral Offer */}
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5">
                <Gift className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <span className="font-black text-amber-900">🎁 १० मित्रांना रेफर करा आणि १००% फी परत मिळवा!</span>
                  <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                    तुमच्या रेफरल कोडने १० मित्रांनी ॲप सुरू केल्यास तुमचे भरलेले सर्व ₹२९ थेट तुमच्या खात्यावर पूर्णपणे रिफंड मिळतील!
                  </p>
                </div>
              </div>

              {/* Instant UPI App Launch Buttons */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>१-क्लिकने थेट UPI ॲप उघडा (Direct UPI Pay):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={gpayUri}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-center font-bold text-xs text-slate-800 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Google Pay</span>
                  </a>
                  <a
                    href={phonepeUri}
                    className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-center font-bold text-xs text-purple-900 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>PhonePe</span>
                  </a>
                  <a
                    href={paytmUri}
                    className="p-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-center font-bold text-xs text-cyan-900 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Paytm</span>
                  </a>
                  <a
                    href={upiUri}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-center font-bold text-xs text-emerald-900 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>BHIM / Any</span>
                  </a>
                </div>
              </div>

              {/* QR Code Box */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-center">
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
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1">
                    <span>अधिकृत Payee UPI ID:</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border-2 border-emerald-500 shadow-xs">
                    <span className="flex-1 font-mono font-black text-sm text-slate-950 tracking-wide text-left pl-2 select-all">
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

              {/* UTR Submission Form */}
              <form onSubmit={handleVerifySubmit} className="space-y-2.5">
                <div className="text-xs font-bold text-slate-800">
                  पेमेंट झाल्यावर खालील फॉर्ममध्ये UTR नंबर भरा:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="आपले नाव (Student Name)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-xl text-xs font-semibold focus:border-emerald-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="मोबाईल नंबर (Phone)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-xl text-xs font-semibold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="12 अंकी UTR / Ref No (उदा. 423819028341)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 bg-white text-slate-900 rounded-xl text-xs font-mono font-bold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="रेफरल कोड / एजंट कोड (ऐच्छिक - उदा. REF-988106)"
                    value={referralCodeInput}
                    onChange={(e) => setReferralCodeInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-xl text-xs font-mono font-semibold uppercase focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? "नोंदणी होत आहे..." : "पेमेंट पावती सबमिट करा"}</span>
                </button>
              </form>

              {/* Direct WhatsApp Contact */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>ॲडमिन संपर्क: <strong>{CONTACT_NUMBER}</strong></span>
                </div>
                <a
                  href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                    `नमस्कार सर, मी ₹${activeAmount} चे पेमेंट केले आहे. कृपया खाते तपासून मंजूर करा.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:underline cursor-pointer"
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
