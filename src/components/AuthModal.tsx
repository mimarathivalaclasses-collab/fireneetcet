import React, { useState } from "react";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  UserCheck,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
  Clock,
  LogIn,
  UserPlus,
  Send,
  HelpCircle,
  Eye,
  EyeOff,
  CreditCard,
  QrCode,
  Copy,
  Zap,
  Phone,
  MessageSquare,
  MessageCircle,
  X,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";
import { StudentUser, ExamType, DeviceApprovalRequest } from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";
import { saveUserSession } from "../utils/authSession";
import {
  saveStudentPermanently,
  getAllStudentsFromVaults,
  VAULT_KEYS,
} from "../services/dataVault";

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  isTrialExpired: boolean;
  currentUser: StudentUser | null;
  onLoginSuccess: (user: StudentUser) => void;
  onRequestDeviceApproval: (request: DeviceApprovalRequest) => void;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isTrialExpired,
  currentUser,
  onLoginSuccess,
  onRequestDeviceApproval,
  onOpenPaymentModal,
  onOpenAdminDashboard,
}) => {
  const UPI_ID = "9307220454@yz";
  const ADMIN_PHONE = "9307220454";
  const AMOUNT_INR = 29;

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [examTarget, setExamTarget] = useState<ExamType>("MHT_CET");
  const [className, setClassName] = useState<string>("");

  // Status for pending approval student
  const [pendingStudent, setPendingStudent] = useState<StudentUser | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [utrInput, setUtrInput] = useState<string>("");
  const [utrSubmitted, setUtrSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // PhonePe / UPI Direct URIs
  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    upiUri
  )}`;

  if (!isOpen) return null;

  const currentDeviceId = getOrCreateDeviceId();
  const currentDeviceName = getDeviceName();

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // 1-Click Demo Student Access
  const handleQuickDemoLogin = () => {
    const demoUser: StudentUser = {
      id: `demo_student_${Date.now().toString().slice(-4)}`,
      name: "Demo Student",
      mobile: "9800000000",
      role: "student",
      examTarget: examTarget || "MHT_CET",
      primaryDeviceId: currentDeviceId,
      primaryDeviceName: currentDeviceName,
      isApproved: true,
      approvalStatus: "approved",
      paymentStatus: "paid",
      isFeePaid: true,
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };
    saveStudentPermanently(demoUser);
    saveUserSession(demoUser);
    confetti({ particleCount: 50, spread: 60 });
    onLoginSuccess(demoUser);
  };

  // Registration Handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim() || !mobile.trim()) {
      setErrorMessage("Please enter your full name and mobile number.");
      return;
    }

    const cleanDigits = mobile.trim().replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!password.trim() || password.trim().length < 3) {
      setErrorMessage("Please create a secure password (at least 3 characters).");
      return;
    }

    const students = getAllStudentsFromVaults();

    // Check if phone already registered
    const existing = students.find((s) => {
      const sDigits = (s.mobile || "").replace(/\D/g, "");
      return sDigits.slice(-10) === cleanDigits.slice(-10) || s.mobile === mobile.trim();
    });

    if (existing) {
      if (existing.approvalStatus === "approved" && existing.isApproved) {
        existing.password = password.trim();
        existing.lastLoginAt = Date.now();
        existing.primaryDeviceId = currentDeviceId;
        existing.primaryDeviceName = currentDeviceName;
        if (className.trim()) {
          existing.className = className.trim();
          existing.coachingClass = className.trim();
        }

        saveStudentPermanently(existing);
        saveUserSession(existing);
        saveStudentToCloud(existing);
        onLoginSuccess(existing);
        return;
      } else {
        if (className.trim()) {
          existing.className = className.trim();
          existing.coachingClass = className.trim();
          saveStudentPermanently(existing);
        }
        setPendingStudent(existing);
        return;
      }
    }

    // Create New Student
    const newUser: StudentUser = {
      id: `std_${Date.now()}`,
      name: name.trim(),
      mobile: mobile.trim(),
      password: password.trim(),
      examTarget,
      className: className.trim() || undefined,
      coachingClass: className.trim() || undefined,
      primaryDeviceId: currentDeviceId,
      primaryDeviceName: currentDeviceName,
      isApproved: false,
      approvalStatus: "pending",
      paymentStatus: "paid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
      referralCode: `REF-${cleanDigits.slice(-6)}`,
    };

    saveStudentPermanently(newUser);
    saveStudentToCloud(newUser);

    // Deep link to PhonePe if on mobile
    try {
      window.open(phonepeUri, "_blank");
    } catch (err) {
      console.warn("UPI deep link open deferred", err);
    }

    setPendingStudent(newUser);
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    let cleanMobile = mobile.trim().replace(/[\s\-\(\)]/g, "");
    const cleanPassword = password.trim();
    const cleanDigits = cleanMobile.replace(/\D/g, "");

    // 1. MASTER ADMIN SHORTCUT (Passcode: 14101994)
    if (cleanPassword === "14101994" || (cleanDigits === "9307220454" && cleanPassword === "14101994")) {
      sessionStorage.setItem("mcq_admin_logged_in", "true");
      const adminUser: StudentUser = {
        id: "super_admin_master",
        name: "Super Admin Director",
        mobile: "9307220454",
        email: "admin@abhyasmitra.com",
        role: "admin",
        examTarget: "MHT_CET",
        primaryDeviceId: currentDeviceId,
        primaryDeviceName: currentDeviceName,
        approvalStatus: "approved",
        isApproved: true,
        paymentStatus: "paid",
        registeredAt: Date.now() - 86400000 * 30,
        lastLoginAt: Date.now(),
      };
      saveUserSession(adminUser);
      setSuccessMessage("🔐 Opening Master Admin Console...");
      setTimeout(() => {
        onLoginSuccess(adminUser);
        if (onOpenAdminDashboard) onOpenAdminDashboard();
      }, 350);
      return;
    }

    if (!cleanDigits && !cleanMobile) {
      setErrorMessage("Please enter your registered mobile number.");
      return;
    }

    let students = getAllStudentsFromVaults();
    let student = students.find((s) => {
      const sDigits = (s.mobile || "").replace(/\D/g, "");
      return (
        (cleanDigits.length >= 10 && sDigits.slice(-10) === cleanDigits.slice(-10)) ||
        s.mobile === cleanMobile
      );
    });

    if (!student) {
      // Check cloud Firestore
      try {
        const cloudStudents = await fetchStudentsFromCloud();
        const cloudMatch = cloudStudents.find((s) => {
          const sDigits = (s.mobile || "").replace(/\D/g, "");
          return (
            (cleanDigits.length >= 10 && sDigits.slice(-10) === cleanDigits.slice(-10)) ||
            s.mobile === cleanMobile
          );
        });
        if (cloudMatch) {
          student = cloudMatch;
          saveStudentPermanently(cloudMatch);
        }
      } catch (err) {
        console.warn("Cloud student lookup deferred", err);
      }
    }

    if (!student) {
      setErrorMessage("Student account not found. Please Sign Up.");
      return;
    }

    // Password Check
    if (student.password && student.password !== cleanPassword) {
      setErrorMessage("Incorrect password! Please enter the correct password.");
      return;
    }

    // Auto-activate verified student account
    student.approvalStatus = "approved";
    student.isApproved = true;
    student.paymentStatus = "paid";
    student.isFeePaid = true;

    // Multi-device access: Update device info
    student.primaryDeviceId = currentDeviceId;
    student.primaryDeviceName = currentDeviceName;
    student.lastLoginAt = Date.now();

    saveStudentPermanently(student);
    saveUserSession(student);
    saveStudentToCloud(student);

    setSuccessMessage(`Welcome, ${student.name}!`);
    setTimeout(() => {
      onLoginSuccess(student!);
    }, 300);
  };

  // UTR submission on pending screen
  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrInput.trim() || utrInput.trim().length < 4) {
      alert("Please enter a valid UTR number.");
      return;
    }

    if (pendingStudent) {
      const updated: StudentUser = {
        ...pendingStudent,
        paymentUtr: utrInput.trim(),
        paymentStatus: "paid",
        isFeePaid: true,
      };
      saveStudentPermanently(updated);
      saveStudentToCloud(updated);

      // Record receipt in primary & backup vaults
      const existingReceiptsRaw = localStorage.getItem(VAULT_KEYS.PAYMENTS);
      const existingReceipts = existingReceiptsRaw ? JSON.parse(existingReceiptsRaw) : [];
      existingReceipts.unshift({
        id: `pay-${Date.now()}`,
        upiId: UPI_ID,
        amount: AMOUNT_INR,
        planName: "Mi Marathiwala Classes - Student Access",
        utr: utrInput.trim(),
        studentName: updated.name,
        studentPhone: updated.mobile,
        date: new Date().toISOString(),
        status: "pending_approval",
      });
      localStorage.setItem(VAULT_KEYS.PAYMENTS, JSON.stringify(existingReceipts));
      localStorage.setItem(VAULT_KEYS.PAYMENTS_VAULT, JSON.stringify(existingReceipts));

      setPendingStudent(updated);
      setUtrSubmitted(true);
      confetti({ particleCount: 60, spread: 70 });
    }
  };

  // Check approval in cloud
  const handleCheckCloudApproval = async () => {
    if (!pendingStudent) return;
    setIsCheckingStatus(true);
    try {
      const cloudStudents = await fetchStudentsFromCloud();
      const match = cloudStudents.find(
        (s) => s.mobile === pendingStudent.mobile || s.id === pendingStudent.id
      );

      const localList = getAllStudentsFromVaults();
      const localMatch = localList.find(
        (s) => s.mobile === pendingStudent.mobile || s.id === pendingStudent.id
      );

      const verified = match || localMatch;

      if (verified && (verified.approvalStatus === "approved" || verified.isApproved)) {
        verified.approvalStatus = "approved";
        verified.isApproved = true;
        verified.paymentStatus = "paid";
        verified.primaryDeviceId = currentDeviceId;
        verified.primaryDeviceName = currentDeviceName;
        verified.lastLoginAt = Date.now();

        saveStudentPermanently(verified);
        saveUserSession(verified);
        saveStudentToCloud(verified);
        alert("🎉 Congratulations! Your account has been approved!");
        onLoginSuccess(verified);
      } else {
        alert("Admin approval is still pending. Your account will be unlocked as soon as admin approves it.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-4 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-auto text-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center mx-auto mb-2.5 shadow-lg ring-2 ring-white/20">
            <span className="text-[13px] font-black tracking-tight leading-none">M</span>
            <span className="text-[8px] text-amber-200 font-bold uppercase leading-none tracking-widest mt-0.5">MMC</span>
          </div>

          {/* Big App Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Mi Marathiwala Classes
          </h1>

          {/* Subtitle */}
          <p className="text-xs font-bold text-amber-300 mt-0.5">
            Ambad (Jalna) • Mi Marathiwala Classes
          </p>
          <p className="text-xs text-orange-200 font-medium max-w-sm mx-auto leading-relaxed">
            NEET | JEE | MHT-CET Online Exam & Practice Portal
          </p>

          {isTrialExpired && (
            <p className="text-rose-300 text-xs mt-2 max-w-sm mx-auto font-semibold bg-rose-950/60 py-1 px-3 rounded-lg border border-rose-800/60">
              ⏱️ Trial period expired. Please login or get admin approval to continue.
            </p>
          )}

          {/* Mode Switch Tabs */}
          {!pendingStudent && (
            <div className="mt-4 inline-flex p-1 rounded-2xl bg-white/10 border border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage("");
                }}
                className={`px-4 sm:px-5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setErrorMessage("");
                }}
                className={`px-4 sm:px-5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mode === "register"
                    ? "bg-white text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-4">
          {/* Toast / Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* SCREEN 1: PENDING ADMIN APPROVAL & UPI PAYMENT */}
          {pendingStudent ? (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md animate-pulse">
                  <Clock className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900 uppercase tracking-wide">
                    Pending Admin Approval
                  </span>
                  <h3 className="text-base font-black text-slate-900 pt-1">
                    Hello {pendingStudent.name}, your registration has been successfully recorded!
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Mobile: <strong>{pendingStudent.mobile}</strong>. Pay only ₹29 and enter the UTR number below or contact admin.
                  </p>
                </div>

                {/* Direct UPI Payment App Buttons */}
                <div className="p-3.5 bg-white rounded-2xl border border-slate-300 space-y-2.5 text-left">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>1. Pay ₹29 via UPI apps:</span>
                    <span className="font-mono text-emerald-700 font-black">Just ₹{AMOUNT_INR}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <a
                      href={phonepeUri}
                      className="py-2 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-900 font-black text-xs flex items-center justify-center text-center transition-all"
                    >
                      PhonePe
                    </a>
                    <a
                      href={gpayUri}
                      className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-black text-xs flex items-center justify-center text-center transition-all"
                    >
                      Google Pay
                    </a>
                    <a
                      href={paytmUri}
                      className="py-2 px-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-900 font-black text-xs flex items-center justify-center text-center transition-all"
                    >
                      Paytm
                    </a>
                    <a
                      href={upiUri}
                      className="py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs flex items-center justify-center text-center transition-all"
                    >
                      Other UPI
                    </a>
                  </div>

                  {/* Copy UPI ID */}
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-300">
                    <span className="flex-1 font-mono font-bold text-xs text-slate-900 pl-2 select-all">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        copiedUpi ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"
                      }`}
                    >
                      {copiedUpi ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUpi ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* UTR Submission Form */}
                <form onSubmit={handleUtrSubmit} className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-2 text-left">
                  <div className="text-xs font-bold text-emerald-900">
                    2. Enter UTR / Ref No. after payment:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="12-digit UTR / Ref No."
                      value={utrInput}
                      onChange={(e) => setUtrInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-emerald-300 bg-white text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                  {utrSubmitted && (
                    <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>UTR registered! Admin will approve it shortly.</span>
                    </div>
                  )}
                </form>

                {/* WhatsApp Admin Direct Contact */}
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(
                      `Hello Admin, I am ${pendingStudent.name} (${pendingStudent.mobile}). I have registered in Mi Marathiwala Classes App and paid ₹29.${
                        utrInput ? `\n🧾 UTR: ${utrInput}` : ""
                      }\nPlease approve my account.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message Admin on WhatsApp ({ADMIN_PHONE})</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCheckCloudApproval}
                      disabled={isCheckingStatus}
                      className="py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isCheckingStatus ? "animate-spin" : ""}`} />
                      <span>{isCheckingStatus ? "Checking..." : "Check Approval"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPendingStudent(null);
                        setMode("login");
                      }}
                      className="py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Login with another number</span>
                    </button>
                  </div>

                  {/* Immediate Practice Access */}
                  <button
                    type="button"
                    onClick={() => {
                      if (pendingStudent) {
                        saveUserSession(pendingStudent);
                        onLoginSuccess(pendingStudent);
                      }
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-indigo-700 hover:from-teal-600 hover:to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                  >
                    <span>⚡ Start Free Practice →</span>
                  </button>
                </div>
              </div>
            </div>
          ) : mode === "login" ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Registered Mobile Number:
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter your 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm font-bold focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password / Security PIN:
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm font-bold focus:border-indigo-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Student Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (WhatsApp):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min 3 character password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 pr-11 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Exam:
                </label>
                <select
                  value={examTarget}
                  onChange={(e) => setExamTarget(e.target.value as ExamType)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                >
                  <option value="MHT_CET">MHT-CET (PCM/PCB Engineering & Pharmacy)</option>
                  <option value="NEET">NEET-UG (Medical MBBS/BDS/BAMS)</option>
                  <option value="JEE_MAIN">JEE Main (IIT/NIT Engineering)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  School / College or Class Name:
                </label>
                <input
                  type="text"
                  placeholder="Class or College name (Optional)"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Register & Pay ₹29 via PhonePe →</span>
              </button>
            </form>
          )}

          {/* Educational Disclaimer */}
          <div className="pt-2 text-[10px] text-slate-500 leading-snug space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <p className="font-bold text-slate-700 flex items-center gap-1">
              <span>⚖️ Educational Disclaimer & Terms:</span>
            </p>
            <p className="text-slate-600 text-[9px] leading-tight">
              This app is intended for easy exam practice for students. Any resemblance of the name to other institutions is purely coincidental. In case of legal objections, the name will be changed within 10 weeks without dispute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
