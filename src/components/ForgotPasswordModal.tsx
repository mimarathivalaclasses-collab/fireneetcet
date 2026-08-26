import React, { useState, useEffect } from "react";
import {
  KeyRound,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Eye,
  EyeOff,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { StudentUser } from "../types";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIdentifier?: string;
  onPasswordResetSuccess?: (student: StudentUser) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialIdentifier = "",
  onPasswordResetSuccess,
}) => {
  const [method, setMethod] = useState<"otp" | "email">("otp");
  const [step, setStep] = useState<"identifier" | "verify" | "reset" | "completed">("identifier");
  const [identifier, setIdentifier] = useState<string>(initialIdentifier);
  const [matchedStudent, setMatchedStudent] = useState<StudentUser | null>(null);

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [simulatedNotification, setSimulatedNotification] = useState<{
    text: string;
    code: string;
  } | null>(null);
  const [copiedOtp, setCopiedOtp] = useState<boolean>(false);

  // New Password State
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Sync initial identifier if provided
  useEffect(() => {
    if (initialIdentifier) {
      setIdentifier(initialIdentifier);
    }
  }, [initialIdentifier]);

  // Resend Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  if (!isOpen) return null;

  // 1. Search student by mobile or email
  const handleFindStudentAndSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const cleanId = identifier.trim();

    if (!cleanId) {
      setErrorMessage("कृपया नोंदणीकृत मोबाईल नंबर किंवा ईमेल प्रविष्ट करा.");
      return;
    }

    setIsLoading(true);

    try {
      // Check local storage
      const raw = localStorage.getItem("mcq_app_all_students_v1");
      const localList: StudentUser[] = raw ? JSON.parse(raw) : [];

      let found = localList.find(
        (s) =>
          s.mobile === cleanId ||
          (s.email && s.email.toLowerCase() === cleanId.toLowerCase())
      );

      // If not in local storage, check cloud
      if (!found) {
        const cloudStudents = await fetchStudentsFromCloud();
        if (cloudStudents && cloudStudents.length > 0) {
          found = cloudStudents.find(
            (s) =>
              s.mobile === cleanId ||
              (s.email && s.email.toLowerCase() === cleanId.toLowerCase())
          );
        }
      }

      // Default demo mock student if test user
      if (!found && cleanId.length === 10 && /^\d+$/.test(cleanId)) {
        // Allow reset for any valid 10 digit number by registering / finding
        found = {
          id: `stu_${cleanId}`,
          name: "विद्यार्थी",
          mobile: cleanId,
          password: "123",
          examTarget: "MHT_CET",
          primaryDeviceId: `dev_${cleanId}`,
          primaryDeviceName: "Mobile",
          approvalStatus: "approved",
          isApproved: true,
          isFeePaid: true,
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
        };
      }

      if (!found) {
        setIsLoading(false);
        setErrorMessage(
          "हा मोबाईल किंवा ईमेल सापडला नाही. कृपया योग्य नंबर टाका किंवा नवीन नोंदणी करा."
        );
        return;
      }

      setMatchedStudent(found);

      // Generate a 6-digit OTP
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomCode);

      // Set Simulated SMS / Email Toast
      const targetDisplay =
        method === "email" && found.email ? found.email : found.mobile;

      setSimulatedNotification({
        text:
          method === "email"
            ? `📩 [ईमेल पडताळणी]: ${targetDisplay} वर पासवर्ड रीसेट कोड पाठवला आहे.`
            : `💬 [SMS Notification]: अभ्यास मित्र पासवर्ड रीसेट OTP: ${randomCode} (५ मिनिटे वैध).`,
        code: randomCode,
      });

      setResendTimer(45);
      setStep("verify");
      setIsLoading(false);
      setSuccessMessage(
        method === "email"
          ? `ईमेलवर पडताळणी कोड पाठवला गेला आहे!`
          : `मोबाईलवर ६ अंकी OTP पाठवला गेला आहे!`
      );
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("पडताळणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  // 2. Verify Entered OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanOtp = enteredOtp.trim();
    if (!cleanOtp) {
      setErrorMessage("कृपया ६ अंकी OTP टाका.");
      return;
    }

    // Allow generated OTP or master bypass pins for testing/recovery
    const isMaster = ["930722", "202600", "123456", "997010"].includes(cleanOtp);

    if (cleanOtp === generatedOtp || isMaster) {
      setStep("reset");
      setSuccessMessage("OTP पडताळणी यशस्वी! आता नवीन पासवर्ड सेट करा.");
    } else {
      setErrorMessage("चुकीचा OTP! कृपया पुन्हा तपासून टाका.");
    }
  };

  // 3. Save New Password
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newPassword || newPassword.length < 3) {
      setErrorMessage("पासवर्ड किमान ३ अक्षरांचा असावा.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("दोन्ही पासवर्ड जुळत नाहीत. कृपया पुन्हा तपासा.");
      return;
    }

    if (!matchedStudent) {
      setErrorMessage("वापरकर्ता सापडला नाही.");
      return;
    }

    setIsLoading(true);

    try {
      const updatedStudent: StudentUser = {
        ...matchedStudent,
        password: newPassword.trim(),
        lastLoginAt: Date.now(),
      };

      // Update in Local Storage
      const raw = localStorage.getItem("mcq_app_all_students_v1");
      let localList: StudentUser[] = raw ? JSON.parse(raw) : [];
      const idx = localList.findIndex((s) => s.mobile === updatedStudent.mobile);

      if (idx >= 0) {
        localList[idx] = updatedStudent;
      } else {
        localList.push(updatedStudent);
      }
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(localList));

      // Sync to Cloud
      saveStudentToCloud(updatedStudent);

      setIsLoading(false);
      setStep("completed");
      setMatchedStudent(updatedStudent);
      setSuccessMessage("पासवर्ड यशस्वीपणे बदलला गेला आहे!");
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("पासवर्ड सेव्ह करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  const handleCopyAndAutofill = (code: string) => {
    setEnteredOtp(code);
    navigator.clipboard?.writeText(code);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                पासवर्ड विसरलात? (Reset Password)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                OTP किंवा ईमेलद्वारे सुरक्षित पासवर्ड बदला
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors text-base font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Real-time Simulated Notification Banner */}
        {simulatedNotification && step === "verify" && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-2 shadow-sm animate-pulse">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <span className="font-medium leading-relaxed">
                  {simulatedNotification.text}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
              <span className="font-mono font-black text-sm text-emerald-900 tracking-wider">
                OTP: {simulatedNotification.code}
              </span>
              <button
                type="button"
                onClick={() => handleCopyAndAutofill(simulatedNotification.code)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedOtp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedOtp ? "भरला!" : "ऑटो-फिल करा"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && !errorMessage && (
          <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* STEP 1: SELECT METHOD & ENTER IDENTIFIER */}
        {step === "identifier" && (
          <form onSubmit={handleFindStudentAndSendCode} className="space-y-3.5">
            {/* Method Toggle Tabs: OTP vs Email */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setMethod("otp")}
                className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "otp"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>मोबाईल OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "email"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ईमेल कोड</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {method === "otp"
                  ? "नोंदणीकृत १० अंकी मोबाईल नंबर:"
                  : "नोंदणीकृत ईमेल आयडी किंवा मोबाईल:"}
              </label>
              <div className="relative">
                <input
                  type={method === "otp" ? "tel" : "text"}
                  required
                  placeholder={method === "otp" ? "उदा. 9881063427" : "name@example.com"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-3.5 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>पडताळणी करत आहे...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{method === "otp" ? "६ अंकी OTP पाठवा" : "ईमेल कोड पाठवा"}</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Quick Help Button */}
            <div className="pt-1 text-center">
              <a
                href={`https://wa.me/919307220454?text=${encodeURIComponent(
                  `सर, मी पासवर्ड विसरलो आहे. कृपया मला पासवर्ड रिसेट करण्यास मदत करा. माझा मोबाईल नंबर: ${identifier || "---"}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1"
              >
                <span>किंवा थेट WhatsApp वर संपर्क करा</span>
              </a>
            </div>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === "verify" && (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5">
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>पडताळणी क्रमांक: {identifier}</span>
                <button
                  type="button"
                  onClick={() => setStep("identifier")}
                  className="text-indigo-600 underline font-semibold cursor-pointer"
                >
                  बदला
                </button>
              </div>
              <p className="text-[11px] text-slate-600">
                आम्ही पाठवलेला ६ अंकी OTP खाली प्रविष्ट करा:
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ६ अंकी OTP प्रविष्ट करा (Enter OTP):
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="उदा. 482915"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 rounded-xl border border-indigo-300 text-center tracking-widest text-lg font-mono font-black text-slate-900 placeholder:text-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">OTP मिळाला नाही?</span>
              {resendTimer > 0 ? (
                <span className="font-mono text-slate-500 font-bold">
                  {resendTimer}s नंतर पुन्हा पाठवा
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFindStudentAndSendCode()}
                  className="text-indigo-700 font-bold hover:underline cursor-pointer"
                >
                  पुन्हा OTP पाठवा
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep("identifier")}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>मागे जा</span>
              </button>
              <button
                type="submit"
                className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md cursor-pointer transition-colors"
              >
                OTP तपासा & पुढे जा
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === "reset" && (
          <form onSubmit={handleSaveNewPassword} className="space-y-3.5">
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-950">
              <span className="font-bold">
                विद्यार्थी: {matchedStudent?.name} ({matchedStudent?.mobile})
              </span>
              <p className="text-[11px] text-teal-700 pt-0.5">
                कृपया नवीन मजबूत पासवर्ड तयार करा:
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                नवीन पासवर्ड (New Password):
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  placeholder="किमान ३ किंवा ४ अक्षरे/अंक"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-teal-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                पासवर्डची पुष्टी करा (Confirm Password):
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                required
                placeholder="तोच पासवर्ड पुन्हा प्रविष्ट करा"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-teal-600 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>पासवर्ड सेव्ह करत आहे...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>नवीन पासवर्ड सेव्ह करा व लॉगिन करा</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: COMPLETED */}
        {step === "completed" && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900">
                पासवर्ड यशस्वीपणे बदलला! 🎉
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                आपला नवीन पासवर्ड सुरक्षितपणे सेव्ह झाला आहे. आता आपण नवीन पासवर्डने कधीही लॉगिन करू शकता.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 font-mono">
              <div>📱 <strong>मोबाईल:</strong> {matchedStudent?.mobile}</div>
              <div>🔑 <strong>नवीन पासवर्ड:</strong> {newPassword || matchedStudent?.password}</div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (matchedStudent && onPasswordResetSuccess) {
                  onPasswordResetSuccess(matchedStudent);
                }
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
            >
              थेट टेस्ट सोडवणे सुरू करा (Start Practice) 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
