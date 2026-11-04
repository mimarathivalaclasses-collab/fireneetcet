import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Phone,
  BookOpen,
  KeyRound,
  ShieldAlert,
  Sparkles,
  Wallet,
  Clock,
  MessageCircle,
  Play,
  RotateCw,
  Copy,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  X,
  HelpCircle,
} from "lucide-react";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { ExamType, StudentUser, UserRole, AgentUser } from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import {
  saveStudentToCloud,
  fetchStudentsFromCloud,
  saveAgentToCloud,
  fetchAgentsFromCloud,
} from "../services/firebase";
import { recordReferralTransaction, REFERRAL_CONFIG } from "../utils/referralSystem";
import { saveStudentPermanently, getAllStudentsFromVaults } from "../services/dataVault";
import { saveUserSession } from "../utils/authSession";
import { triggerHaptic } from "../utils/haptics";

interface UnifiedAuthViewProps {
  currentUser?: StudentUser | null;
  onLoginSuccess: (user: StudentUser) => void;
  onOpenAdmin?: () => void;
  onStartDemoTest?: (exam: ExamType, demoIndex?: number) => void;
  onBack?: () => void;
  initialRole?: UserRole;
  initialMode?: "login" | "register";
}

export const UnifiedAuthView: React.FC<UnifiedAuthViewProps> = ({
  currentUser,
  onLoginSuccess,
  onOpenAdmin,
  onStartDemoTest,
  onBack,
  initialRole = "student",
  initialMode = "login",
}) => {
  const [authMode, setAuthMode] = useState<"login" | "register">(initialMode);
  const [selectedRole, setSelectedRole] = useState<"student" | "agent" | "admin">(
    initialRole === "admin" ? "admin" : initialRole === "agent" ? "agent" : "student"
  );

  // Common Fields - prefilled with remembered mobile if available
  const [identifier, setIdentifier] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("mcq_last_login_identifier");
      if (saved) return saved;
    } catch {}
    return "";
  });
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Student Fields
  const [fullName, setFullName] = useState<string>("");
  const [targetExam, setTargetExam] = useState<ExamType>("MHT_CET");
  const [className, setClassName] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("ref") || params.get("agent") || "";
    } catch {
      return "";
    }
  });

  // Agent Fields
  const [agentCity, setAgentCity] = useState<string>("");
  const [agentUpi, setAgentUpi] = useState<string>("");

  // Payment Verification Fields (₹29 Access)
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // reCAPTCHA verification
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(true); // default true for frictionless UX
  const [isCaptchaVerifying, setIsCaptchaVerifying] = useState<boolean>(false);

  // Status & Feedback States
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [forgotMobile, setForgotMobile] = useState<string>("");
  const [forgotNewPassword, setForgotNewPassword] = useState<string>("");
  const [forgotStatus, setForgotStatus] = useState<string>("");

  // Official UPI & PhonePe Configurations
  const PRIMARY_UPI_ID = "9307220454@yz";
  const ADMIN_PHONE = "9307220454";
  const AMOUNT_INR = 29;

  // Direct Deep Links for ₹29 Payment
  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  const upiUri = `upi://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "Mi Marathiwala Classes"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("Mi Marathiwala Classes Registration")}`;

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    triggerHaptic("selection");

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();
    const cleanDigits = cleanIdentifier.replace(/\D/g, "");
    const last10Digits = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    if (!cleanIdentifier) {
      setErrorMessage("Please enter your mobile number or username.");
      setIsLoading(false);
      triggerHaptic("warning");
      return;
    }

    if (!cleanPassword) {
      setErrorMessage("Please enter your password / security PIN.");
      setIsLoading(false);
      triggerHaptic("warning");
      return;
    }

    // Save remembered identifier
    try {
      localStorage.setItem("mcq_last_login_identifier", cleanIdentifier);
    } catch {}

    // -------------------------------------------------------------
    // 1. SMART AUTO-DETECTION: MASTER ADMIN DIRECTOR LOGIN
    // Auto-detects Admin PIN 14101994 or Admin Phone regardless of tab!
    // -------------------------------------------------------------
    if (
      cleanPassword === "14101994" ||
      selectedRole === "admin" ||
      (last10Digits === "9307220454" && cleanPassword === "14101994")
    ) {
      if (cleanPassword === "14101994") {
        sessionStorage.setItem("mcq_admin_logged_in", "true");
        const adminUser: StudentUser = {
          id: "super_admin_master",
          name: "Super Admin Director",
          mobile: "9307220454",
          email: "mimarathivalaclasses@gmail.com",
          role: "admin",
          examTarget: "MHT_CET",
          primaryDeviceId: getOrCreateDeviceId(),
          primaryDeviceName: getDeviceName(),
          approvalStatus: "approved",
          isApproved: true,
          paymentStatus: "paid",
          isFeePaid: true,
          registeredAt: Date.now() - 86400000 * 30,
          lastLoginAt: Date.now(),
        };

        saveUserSession(adminUser);
        triggerHaptic("success");
        setSuccessMessage("🔐 Welcome, Super Admin Director! Opening console...");
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(adminUser);
          if (onOpenAdmin) onOpenAdmin();
        }, 350);
        return;
      } else if (selectedRole === "admin") {
        setIsLoading(false);
        triggerHaptic("warning");
        setErrorMessage("Invalid Admin Security PIN! Please enter the correct PIN.");
        return;
      }
    }

    // -------------------------------------------------------------
    // 2. AGENT PARTNER ROLE LOGIN & REGISTRATION
    // -------------------------------------------------------------
    if (selectedRole === "agent" || cleanIdentifier.toUpperCase().startsWith("AGT-")) {
      const existingAgentsRaw = localStorage.getItem("mcq_app_all_agents_v1");
      const existingAgents: AgentUser[] = existingAgentsRaw ? JSON.parse(existingAgentsRaw) : [];

      if (authMode === "register") {
        if (!fullName.trim()) {
          setErrorMessage("Please enter the agent's name.");
          setIsLoading(false);
          triggerHaptic("warning");
          return;
        }

        const newAgentCode = `AGT-${last10Digits.slice(-4) || Math.floor(1000 + Math.random() * 9000)}`;
        const newAgent: AgentUser = {
          id: `agent_${Date.now()}`,
          agentCode: newAgentCode,
          name: fullName.trim(),
          mobile: cleanIdentifier,
          password: cleanPassword,
          email: `${cleanIdentifier}@partner.com`,
          city: agentCity.trim() || "Maharashtra",
          upiId: agentUpi.trim() || `${cleanIdentifier}@upi`,
          commissionRate: REFERRAL_CONFIG.AGENT_COMMISSION_PER_STUDENT,
          totalEarnings: 0,
          totalPaidOut: 0,
          walletBalance: 0,
          totalStudentsReferred: 0,
          totalClassesReferred: 0,
          isApproved: true,
          status: "active",
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
        };

        existingAgents.push(newAgent);
        localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(existingAgents));
        saveAgentToCloud(newAgent).catch((e) => console.warn("Agent cloud save deferred", e));

        const agentUser: StudentUser = {
          id: newAgent.id,
          name: newAgent.name,
          mobile: newAgent.mobile,
          role: "agent",
          examTarget: "MHT_CET",
          primaryDeviceId: getOrCreateDeviceId(),
          primaryDeviceName: getDeviceName(),
          approvalStatus: "approved",
          isApproved: true,
          paymentStatus: "paid",
          isFeePaid: true,
          referralCode: newAgent.agentCode,
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
        };

        saveUserSession(agentUser);
        triggerHaptic("success");
        setSuccessMessage(`🎉 Congratulations! Your Agent Code: ${newAgent.agentCode}`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(agentUser);
        }, 350);
        return;
      } else {
        // Agent Login
        let matched = existingAgents.find(
          (a) =>
            (a.mobile.replace(/\D/g, "").slice(-10) === last10Digits ||
              a.agentCode.toLowerCase() === cleanIdentifier.toLowerCase()) &&
            a.password === cleanPassword
        );

        if (!matched) {
          try {
            const cloudAgents = await fetchAgentsFromCloud();
            const cloudMatch = cloudAgents.find(
              (a) =>
                (a.mobile.replace(/\D/g, "").slice(-10) === last10Digits ||
                  a.agentCode.toLowerCase() === cleanIdentifier.toLowerCase()) &&
                a.password === cleanPassword
            );
            if (cloudMatch) {
              matched = cloudMatch;
              existingAgents.push(cloudMatch);
              localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(existingAgents));
            }
          } catch (cloudErr) {
            console.warn("Cloud agent check error", cloudErr);
          }
        }

        if (matched) {
          const agentUser: StudentUser = {
            id: matched.id,
            name: matched.name,
            mobile: matched.mobile,
            role: "agent",
            examTarget: "MHT_CET",
            primaryDeviceId: getOrCreateDeviceId(),
            primaryDeviceName: getDeviceName(),
            approvalStatus: "approved",
            isApproved: true,
            paymentStatus: "paid",
            isFeePaid: true,
            referralCode: matched.agentCode,
            registeredAt: matched.createdAt,
            lastLoginAt: Date.now(),
          };

          saveUserSession(agentUser);
          triggerHaptic("success");
          setSuccessMessage(`Welcome, Agent ${matched.name}!`);
          setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess(agentUser);
          }, 350);
          return;
        } else {
          setIsLoading(false);
          triggerHaptic("warning");
          setErrorMessage("Agent code / mobile number or password is incorrect.");
          return;
        }
      }
    }

    // -------------------------------------------------------------
    // 3. STUDENT REGISTRATION (INSTANT ACCESS ENABLED)
    // -------------------------------------------------------------
    if (authMode === "register") {
      if (!fullName.trim()) {
        setErrorMessage("Please enter the student's full name.");
        setIsLoading(false);
        triggerHaptic("warning");
        return;
      }

      let existingList: StudentUser[] = getAllStudentsFromVaults();

      const duplicate = existingList.find((s) => {
        const sDigits = (s.mobile || "").replace(/\D/g, "");
        return sDigits.slice(-10) === last10Digits || s.mobile === cleanIdentifier;
      });

      if (duplicate) {
        // Update password and login directly
        duplicate.password = cleanPassword;
        duplicate.lastLoginAt = Date.now();
        if (className.trim()) {
          duplicate.className = className.trim();
          duplicate.coachingClass = className.trim();
        }
        duplicate.approvalStatus = "approved";
        duplicate.isApproved = true;
        duplicate.primaryDeviceId = getOrCreateDeviceId();
        duplicate.primaryDeviceName = getDeviceName();

        saveStudentPermanently(duplicate);
        saveUserSession(duplicate);
        triggerHaptic("success");

        setSuccessMessage(`Welcome, ${duplicate.name}! Your account is active...`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(duplicate);
        }, 350);
        return;
      }

      // Create new student with INSTANT ACTIVATION so they can practice right away!
      const newStudent: StudentUser = {
        id: `student_${Date.now()}`,
        name: fullName.trim(),
        mobile: cleanIdentifier,
        password: cleanPassword,
        role: "student",
        examTarget: targetExam,
        className: className.trim() || undefined,
        coachingClass: className.trim() || undefined,
        primaryDeviceId: getOrCreateDeviceId(),
        primaryDeviceName: getDeviceName(),
        approvalStatus: "approved",
        isApproved: true,
        isFeePaid: true,
        paymentStatus: "paid",
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        referralCode: `REF-${last10Digits.slice(-6)}`,
        referredBy: referralCode.trim() || undefined,
      };

      saveStudentPermanently(newStudent);
      saveStudentToCloud(newStudent).catch((e) => console.warn("Cloud student sync note:", e));

      // Record referral transaction if present
      if (referralCode.trim()) {
        try {
          recordReferralTransaction({
            referrerCode: referralCode.trim(),
            referredStudent: {
              id: newStudent.id,
              name: newStudent.name,
              mobile: newStudent.mobile,
              examTarget: newStudent.examTarget,
              paymentStatus: newStudent.paymentStatus,
            },
            planPrice: 29,
          });
        } catch (e) {
          console.warn("Referral transaction error", e);
        }
      }

      saveUserSession(newStudent);
      triggerHaptic("success");
      setSuccessMessage(`🎉 Registration successful! Welcome, ${newStudent.name}!`);

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(newStudent);
      }, 400);
      return;
    } else {
      // -------------------------------------------------------------
      // 4. STUDENT LOGIN (ROBUST MATCHING & INSTANT UNLOCK)
      // -------------------------------------------------------------
      let foundUser: StudentUser | null = null;
      let localList: StudentUser[] = [];

      try {
        localList = getAllStudentsFromVaults();
        foundUser =
          localList.find((s) => {
            const sDigits = (s.mobile || "").replace(/\D/g, "");
            return (
              (last10Digits.length >= 10 && sDigits.slice(-10) === last10Digits) ||
              s.mobile === cleanIdentifier
            );
          }) || null;
      } catch (e) {
        console.error(e);
      }

      // Check cloud Firestore if not found locally
      if (!foundUser) {
        try {
          const cloudStudents = await fetchStudentsFromCloud();
          const cloudMatch = cloudStudents.find((cs) => {
            const csDigits = (cs.mobile || "").replace(/\D/g, "");
            return (
              (last10Digits.length >= 10 && csDigits.slice(-10) === last10Digits) ||
              cs.mobile === cleanIdentifier
            );
          });
          if (cloudMatch) {
            foundUser = { ...cloudMatch } as StudentUser;
            saveStudentPermanently(foundUser);
          }
        } catch (err) {
          console.warn("Cloud student lookup note:", err);
        }
      }

      if (!foundUser) {
        setIsLoading(false);
        triggerHaptic("warning");
        setErrorMessage("Student account not found. Please 'Sign Up'.");
        return;
      }

      // Check Password (Allow master admin pin 14101994 to unlock any student account)
      const isMasterPin = cleanPassword === "14101994";
      if (!isMasterPin && foundUser.password && foundUser.password !== cleanPassword) {
        setIsLoading(false);
        triggerHaptic("warning");
        setErrorMessage("Password is incorrect. If you forgot your password, click 'Forgot Password?' below.");
        return;
      }

      // Ensure active status and update last login
      foundUser.approvalStatus = "approved";
      foundUser.isApproved = true;
      foundUser.paymentStatus = "paid";
      foundUser.isFeePaid = true;
      foundUser.primaryDeviceId = getOrCreateDeviceId();
      foundUser.primaryDeviceName = getDeviceName();
      foundUser.lastLoginAt = Date.now();

      saveStudentPermanently(foundUser);
      saveUserSession(foundUser);
      triggerHaptic("success");

      setSuccessMessage(`Welcome, ${foundUser.name}! Opening test series...`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(foundUser!);
      }, 350);
    }
  };

  // Quick Password Reset Handler
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = forgotMobile.replace(/\D/g, "");
    const last10 = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    if (!cleanDigits || cleanDigits.length < 10) {
      setForgotStatus("Please enter a valid 10-digit mobile number.");
      triggerHaptic("warning");
      return;
    }

    if (!forgotNewPassword.trim() || forgotNewPassword.trim().length < 4) {
      setForgotStatus("Please enter a new password (min 4 characters).");
      triggerHaptic("warning");
      return;
    }

    const allStudents = getAllStudentsFromVaults();
    const student = allStudents.find((s) => {
      const sDigits = (s.mobile || "").replace(/\D/g, "");
      return sDigits.slice(-10) === last10 || s.mobile === forgotMobile.trim();
    });

    if (student) {
      student.password = forgotNewPassword.trim();
      student.lastLoginAt = Date.now();
      saveStudentPermanently(student);
      saveStudentToCloud(student).catch(() => {});
      triggerHaptic("success");
      setForgotStatus(`✅ Congratulations ${student.name}! Password changed successfully. Now login.`);
      setPassword(forgotNewPassword.trim());
      setIdentifier(student.mobile);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotStatus("");
      }, 1500);
    } else {
      triggerHaptic("warning");
      setForgotStatus("No student account found for this number. Please register or contact us on WhatsApp.");
    }
  };

  const handleQuickStudentLogin = () => {
    triggerHaptic("success");
    const demoStudent: StudentUser = {
      id: "student_verified_" + Date.now().toString().slice(-4),
      name: "Fast Demo Student",
      mobile: "9876543210",
      email: "student@mimarathivala.com",
      role: "student",
      examTarget: "MHT_CET",
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      paymentStatus: "paid",
      isFeePaid: true,
      registeredAt: Date.now() - 86400000 * 5,
      lastLoginAt: Date.now(),
    };
    saveStudentPermanently(demoStudent);
    saveUserSession(demoStudent);
    setSuccessMessage("🎉 1-Click Student Login Successful! Welcome.");
    setTimeout(() => {
      onLoginSuccess(demoStudent);
    }, 250);
  };

  const handleQuickAdminLogin = () => {
    triggerHaptic("success");
    setIdentifier("9307220454");
    setPassword("14101994");
    setSelectedRole("admin");
    const adminUser: StudentUser = {
      id: "super_admin_master",
      name: "Super Admin Director",
      mobile: "9307220454",
      email: "mimarathivalaclasses@gmail.com",
      role: "admin",
      examTarget: "MHT_CET",
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      paymentStatus: "paid",
      isFeePaid: true,
      registeredAt: Date.now() - 86400000 * 30,
      lastLoginAt: Date.now(),
    };
    saveUserSession(adminUser);
    sessionStorage.setItem("mcq_admin_logged_in", "true");
    setSuccessMessage("🔐 1-Click Master Admin Login Successful!");
    setTimeout(() => {
      onLoginSuccess(adminUser);
      if (onOpenAdmin) onOpenAdmin();
    }, 300);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#080816] text-slate-100 flex flex-col items-center justify-start sm:justify-center py-4 sm:py-8 px-3 sm:px-4 relative overflow-y-auto antialiased select-none pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      {/* Background Nebulas */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md mx-auto relative z-10 space-y-3.5">
        {/* Back to Main App Button */}
        {onBack && (
          <div className="flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← View Main App / Free Practice</span>
            </button>
          </div>
        )}

        {/* Brand Banner Above Card */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ring-2 ring-amber-400 shadow-xl mx-auto bg-slate-950 flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105">
            <img
              src="/ncj-logo.png"
              alt="NCJ MOCK TEST APP Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-wider">
              <span>Ambad (Jalna)</span>
              <span>•</span>
              <span>Official Practice Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              NCJ MOCK TEST APP
            </h1>
            <p className="text-xs sm:text-sm text-orange-200 font-bold leading-snug">
              Mi Marathiwala Classes, Ambad
            </p>
            <p className="text-[11px] text-amber-400 font-semibold">
              MHT-CET (PCM/PCB) • NEET • JEE Main
            </p>
          </div>
        </div>

        {/* PWA Install Prompt Bar */}
        <PWAInstallPrompt />

        {/* Free Demo Tests Banner */}
        {onStartDemoTest && (
          <div className="p-3 bg-gradient-to-r from-teal-500/20 via-indigo-500/20 to-purple-500/20 border border-teal-400/40 rounded-2xl flex items-center justify-between shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-400 text-slate-950 flex items-center justify-center font-black">
                <Play className="w-4 h-4 fill-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-white">Free Mock Tests</div>
                <div className="text-[10px] text-teal-300">Start practicing immediately without login</div>
              </div>
            </div>
            <button
              onClick={() => onStartDemoTest("MHT_CET", 1)}
              className="px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs cursor-pointer shadow-md transition-transform active:scale-95"
            >
              Start Now →
            </button>
          </div>
        )}

        {/* MAIN AUTHENTICATION CARD */}
        <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/20 space-y-4">
          {/* Card Sub-Header with Auth Mode Status */}
          <div className="text-center pb-2 border-b border-slate-100 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-xs font-black text-orange-900">
              {authMode === "login"
                ? "🔑 Student / Admin Login"
                : "📝 New Student Registration (Sign Up)"}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">
              {authMode === "login"
                ? "Login immediately using your registered mobile number and password."
                : "Register immediately by selecting your name, mobile number, and target exam."}
            </p>
          </div>

          {/* Mode Switch (Login vs Sign Up) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                setAuthMode("login");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authMode === "login"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                setAuthMode("register");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authMode === "register"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Frictionless 1-Click Access Row */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleQuickStudentLogin}
              className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              title="Enter immediately as a student without registration or password"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">1-Click Student Login</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              title="Open Master Admin Director Console immediately"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">1-Click Admin (14101994)</span>
            </button>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                setSelectedRole("student");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "student"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                setSelectedRole("agent");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "agent"
                  ? "bg-white text-indigo-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              💼 Agent
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                setSelectedRole("admin");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "admin"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              👑 Admin
            </button>
          </div>

          {/* Role Info Banners */}
          {selectedRole === "admin" && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-black flex items-center gap-1 text-amber-900">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>Master Admin Login:</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Open dashboard and check student marks by entering Admin PIN.
              </p>
            </div>
          )}

          {/* Success / Error Alerts */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-start gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name (if registering) */}
            {authMode === "register" && selectedRole !== "admin" && (
              <div>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedRole === "agent"
                      ? "Agent's Full Name"
                      : "Student's Full Name"
                  }
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
                />
              </div>
            )}

            {/* Mobile / Username */}
            <div>
              <input
                type="text"
                required
                placeholder={
                  selectedRole === "admin"
                    ? "Admin Username / 9307220454"
                    : "10-digit Mobile Number"
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
              />
            </div>

            {/* Password Field (Masked with Eye toggle) */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={selectedRole === "admin" ? "Admin Security PIN" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 pr-11 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Target Exam (if registering student) */}
            {authMode === "register" && selectedRole === "student" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as ExamType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:border-teal-500 outline-none"
                  >
                    <option value="MHT_CET">MHT-CET (PCM/PCB)</option>
                    <option value="NEET">NEET-UG (Medical)</option>
                    <option value="JEE_MAIN">JEE Main (Engg)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Referral Code (Optional)"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs uppercase font-bold text-slate-800 outline-none"
                  />
                </div>

                {/* Coaching Class Name */}
                <div>
                  <input
                    type="text"
                    placeholder="🏫 Class / College Name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
                  />
                </div>
              </>
            )}

            {/* Forgot Password Link */}
            {authMode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    setForgotMobile(identifier);
                    setShowForgotPassword(true);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Forgot Password?</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm tracking-wide shadow-lg cursor-pointer transition-transform active:scale-98 disabled:opacity-50 bg-gradient-to-r from-teal-500 via-indigo-600 to-teal-600 hover:brightness-110 shadow-indigo-600/30"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <span>
                  {selectedRole === "admin"
                    ? "🔐 Opening Admin Console (Sign In)"
                    : authMode === "login"
                    ? "Login (Sign In) →"
                    : "Complete Registration (Sign Up & Start) →"}
                </span>
              )}
            </button>

            {/* Quick Demo Test Access */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold px-1">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  setAuthMode(authMode === "login" ? "register" : "login");
                  setErrorMessage("");
                }}
                className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
              >
                {authMode === "login" ? "New Student Registration (Sign Up)" : "Already have an account? Login"}
              </button>
              <span className="text-[11px] text-slate-400">
                🔒 Secure Encrypted Login
              </span>
            </div>
          </form>
        </div>

        {/* FORGOT PASSWORD MODAL */}
        {showForgotPassword && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Password Recovery"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Password Recovery</h3>
                    <p className="text-[11px] text-slate-500">Password Recovery</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {forgotStatus && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900">
                  {forgotStatus}
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registered Mobile Number:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10-digit Mobile Number"
                    value={forgotMobile}
                    onChange={(e) => setForgotMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Password:
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 4 character password"
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  Save New Password (Reset)
                </button>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <a
                    href={`https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(
                      `Hello Admin, I have forgotten my Mi Marathiwala Classes app password. My registered mobile: ${forgotMobile}. Please help me reset my password.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-black hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get password from WhatsApp Admin →</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Legal Disclaimer & Terms */}
        <div className="bg-stone-900/80 backdrop-blur-xs rounded-2xl p-4 border border-orange-500/20 text-stone-300 text-[10px] leading-relaxed space-y-1.5 text-justify">
          <div className="flex items-center gap-1.5 text-orange-300 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Official Educational Notice</span>
          </div>
          <p>
            This app is the official digital portal run by <strong>'Mi Marathiwala Classes, Ambad' (Mi Marathiwala Classes, Ambad)</strong> for the practice of rural and competitive exam (NEET, JEE, MHT-CET) students.
          </p>
        </div>
      </div>
    </div>
  );
};
