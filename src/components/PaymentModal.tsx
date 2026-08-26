import React, { useState } from "react";
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
} from "lucide-react";
import { recordReferralTransaction } from "../utils/referralSystem";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amount?: number;
  initialPlanType?: "student" | "coaching";
  onPaymentSuccess?: (utr: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName,
  amount: customAmount,
  initialPlanType = "student",
  onPaymentSuccess,
}) => {
  const UPI_ID = "9307220454@yz";
  const PAYEE_NAME = "AbhyasMitra MHT-CET";
  const CONTACT_NUMBER = "9307220454";

  // Selected Plan: "student" (₹29) or "coaching" (₹499 / 3 months)
  const [selectedPlan, setSelectedPlan] = useState<"student" | "coaching">(
    initialPlanType
  );

  const activeAmount =
    customAmount !== undefined
      ? customAmount
      : selectedPlan === "student"
      ? 29
      : 499;

  const activePlanTitle =
    planName ||
    (selectedPlan === "student"
      ? "NEET/JEE/MHT-CET संपूर्ण सराव व १० ग्रँड टेस्ट्स प्लॅन (Student Access)"
      : "क्लासेस व इन्स्टिट्यूट ३ महिन्यांचा संपूर्ण पोर्टल प्लॅन (२००० विद्यार्थी)");

  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("ref") || params.get("agent") || "";
    } catch {
      return "";
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  // Standard UPI URI format
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(activePlanTitle)}`;

  // QR code URL using quickchart / qrserver
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    upiUri
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      alert("कृपया वैध १२ अंकी UTR / Transaction Ref नंबर टाका.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);

      // Store in local storage for admin verification
      try {
        const existingRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        existing.push({
          id: `pay-${Date.now()}`,
          upiId: UPI_ID,
          amount: activeAmount,
          planName: activePlanTitle,
          utr: utrNumber.trim(),
          studentName: studentName.trim() || "User",
          studentPhone: studentPhone.trim() || CONTACT_NUMBER,
          date: new Date().toISOString(),
          status: "pending",
        });
        localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(existing));

        // Update student record
        if (studentPhone.trim()) {
          const studentsRaw = localStorage.getItem("mcq_app_all_students_v1");
          if (studentsRaw) {
            const students = JSON.parse(studentsRaw);
            const idx = students.findIndex((s: any) => s.mobile === studentPhone.trim());
            if (idx >= 0) {
              students[idx].paymentUtr = utrNumber.trim();
              students[idx].paymentStatus = "submitted";
              students[idx].amountPaid = activeAmount;
              localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
            }
          }
        }
        // Record referral transaction if code present
        if (referralCodeInput.trim()) {
          try {
            recordReferralTransaction({
              referrerCode: referralCodeInput.trim(),
              referredStudent: {
                id: `pay_std_${studentPhone.trim() || Date.now()}`,
                name: studentName.trim() || "विद्यार्थी",
                mobile: studentPhone.trim() || CONTACT_NUMBER,
                paymentStatus: "paid",
              },
              planPrice: activeAmount,
            });
          } catch (e) {}
        }
      } catch (err) {
        console.error("Failed to save receipt", err);
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(utrNumber);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2.5">
            <QrCode className="w-6 h-6 text-emerald-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            थेट UPI द्वारे ॲक्टिव्ह करा (Direct UPI Pay)
          </h2>
          <p className="text-emerald-200/90 text-xs mt-1 font-medium">
            PhonePe, Google Pay, Paytm, BHIM द्वारे फक्त QR स्कॅन करा किंवा UPI ID वापरा
          </p>

          {/* Plan Selector Buttons */}
          <div className="mt-3 inline-flex p-1 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold w-full max-w-xs">
            <button
              type="button"
              onClick={() => setSelectedPlan("student")}
              className={`flex-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedPlan === "student"
                  ? "bg-white text-slate-950 font-black shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>विद्यार्थी प्लॅन (₹२९)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlan("coaching")}
              className={`flex-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedPlan === "coaching"
                  ? "bg-white text-slate-950 font-black shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>क्लासेस प्लॅन (₹४९९)</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {successMessage ? (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-emerald-950">
                पेमेंट तपशील यशस्वीरीत्या नोंदवला गेला!
              </h3>
              <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                तुमचा UTR क्रमांक (<strong>{utrNumber}</strong>) प्राप्त झाला आहे. <strong>पेमेंट पडताळणी सुरू असून पुढील १५ मिनिटांत ॲडमिन कडून मंजुरी (Approval) मिळेल.</strong>
              </p>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 text-left space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <span>⏱️ १५ मिनिटांत मंजुरी न झाल्यास:</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  काही कारणास्तव १५ मिनिटांत खाते सुरू न झाल्यास त्वरित खालील बटनावर क्लिक करून ॲडमिनला व्हॉट्सॲप मेसेज किंवा स्क्रीनशॉट पाठवा.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs font-mono font-bold text-slate-700">
                रक्कम: ₹{activeAmount} | प्राप्तकर्ता: {UPI_ID}
              </div>

              <a
                href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                  `नमस्कार ॲडमिन, मी ₹${activeAmount} चे पेमेंट केले आहे. UTR: ${utrNumber}. १५ मिनिटे झाली आहेत, कृपया माझे खाते मंजूर करा.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>WhatsApp द्वारे ॲडमिनशी संपर्क करा ({CONTACT_NUMBER})</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                बंद करा (Close)
              </button>
            </div>
          ) : (
            <>
              {/* Active Plan Pricing Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                    {selectedPlan === "student"
                      ? "🎯 विद्यार्थी संपूर्ण ॲक्सेस"
                      : "🏫 क्लासेस व इन्स्टिट्यूट ३ महिने प्लॅन"}
                  </div>
                  <div className="text-xs font-black text-slate-900 line-clamp-1 mt-0.5">
                    {activePlanTitle}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                    {selectedPlan === "student"
                      ? "✓ सर्व सराव MCQs + १० ग्रँड मॉक टेस्ट्स + नोट्स"
                      : "✓ व्हाईट-लेबल पोर्टल + अमर्याद टेस्ट्स (२००० विद्यार्थी)"}
                  </div>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">फीस</div>
                  <div className="text-2xl font-black text-emerald-950 font-mono-numbers">
                    ₹{activeAmount}
                  </div>
                </div>
              </div>

              {/* 10 Referral Refund Offer Banner */}
              {selectedPlan === "student" && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950">
                    <span className="font-black text-amber-900">🎁 १० मित्रांना रेफर करा आणि १००% पैसे वापस मिळवा!</span>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                      तुमच्या रेफरल कोडने १० मित्रांनी ॲप सुरू केल्यास तुमचे भरलेले सर्व ₹२९ थेट तुमच्या खात्यावर पूर्णपणे रिफंड मिळतील!
                    </p>
                  </div>
                </div>
              )}

              {/* QR Code Box */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-center">
                <div className="bg-white p-3 rounded-2xl border border-slate-300 shadow-md inline-block">
                  <img
                    src={qrCodeUrl}
                    alt="Payment QR Code"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain mx-auto"
                  />
                  <div className="mt-2 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                    Scan with PhonePe / GPay / Paytm (₹{activeAmount})
                  </div>
                </div>

                {/* Copy Official Payee UPI ID */}
                <div className="w-full max-w-sm space-y-1.5">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1">
                    <span>माझा अधिकृत UPI ID (Payee UPI ID):</span>
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
                  <p className="text-[11px] text-slate-500">
                    PhonePe / GPay / Paytm मध्ये <strong>{UPI_ID}</strong> वर थेट ₹{activeAmount} पाठवू शकता.
                  </p>
                </div>
              </div>

              {/* UTR Submission Form */}
              <form onSubmit={handleVerifySubmit} className="space-y-2.5 pt-1">
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>पेमेंट झाल्यावर UTR किंवा Transaction Ref नंबर प्रविष्ट करा:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="नाव (Student / Class Name)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="मोबाईल नंबर (Phone)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="12 अंकी UTR / Ref No (उदा. 423819028341)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-xl text-xs font-mono font-bold focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="रेफरल कोड / एजंट कोड (ऐच्छिक - उदा. AGT-1001 किंवा REF-982341)"
                    value={referralCodeInput}
                    onChange={(e) => setReferralCodeInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-semibold uppercase focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>पडताळणी चालू आहे...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>पेमेंट सबमिट करा व खाते त्वरित अनलॉक करा</span>
                    </>
                  )}
                </button>
              </form>

              {/* Direct Help / WhatsApp Contact */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>पेमेंट अडचण किंवा तात्काळ मंजुरीसाठी: <strong>{CONTACT_NUMBER}</strong></span>
                </div>
                <a
                  href={`https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent(
                    `नमस्कार, मी ₹${activeAmount} चे पेमेंट केले आहे. कृपया माझे खाते सक्रिय करा.`
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
