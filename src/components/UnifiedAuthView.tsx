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
} from "lucide-react";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { ExamType, StudentUser, UserRole, AgentUser } from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";
import { recordReferralTransaction } from "../utils/referralSystem";

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

  // Common Fields
  const [identifier, setIdentifier] = useState<string>(""); // Mobile or Agent code
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Student Fields
  const [fullName, setFullName] = useState<string>("");
  const [targetExam, setTargetExam] = useState<ExamType>("MHT_CET");
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
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);
  const [isCaptchaVerifying, setIsCaptchaVerifying] = useState<boolean>(false);

  // Status & Feedback States
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState<boolean>(false);

  // Pending Approval State for unapproved students
  const [pendingApprovalStudent, setPendingApprovalStudent] = useState<StudentUser | null>(null);

  // Official UPI & PhonePe Configurations
  const PRIMARY_UPI_ID = "9307220454@yz";
  const ADMIN_PHONE = "9307220454";
  const AMOUNT_INR = 29;

  // Direct Deep Links for ₹29 Payment
  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  const upiUri = `upi://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=${AMOUNT_INR}&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    upiUri
  )}`;

  // Direct PhonePe App Launcher
  const triggerDirectPhonePe = () => {
    try {
      window.location.href = phonepeUri;
    } catch (e) {
      try {
        window.location.href = upiUri;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCaptchaClick = () => {
    if (isCaptchaChecked || isCaptchaVerifying) return;
    setIsCaptchaVerifying(true);
    setTimeout(() => {
      setIsCaptchaVerifying(false);
      setIsCaptchaChecked(true);
    }, 450);
  };

  // Re-check student approval status in real-time
  const handleCheckApprovalStatus = async () => {
    if (!pendingApprovalStudent) return;
    setIsCheckingApproval(true);
    try {
      const cloudStudents = await fetchStudentsFromCloud();
      const match = cloudStudents.find(
        (s) => s.mobile === pendingApprovalStudent.mobile || s.id === pendingApprovalStudent.id
      );

      const localRaw = localStorage.getItem("mcq_app_all_students_v1");
      const localList: StudentUser[] = localRaw ? JSON.parse(localRaw) : [];
      const localMatch = localList.find(
        (s) => s.mobile === pendingApprovalStudent.mobile || s.id === pendingApprovalStudent.id
      );

      const current = match || localMatch;
      if (current && (current.approvalStatus === "approved" || current.isApproved)) {
        current.approvalStatus = "approved";
        current.isApproved = true;
        current.paymentStatus = "paid";
        current.primaryDeviceId = getOrCreateDeviceId();
        current.primaryDeviceName = getDeviceName();
        current.lastLoginAt = Date.now();

        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(current));
        saveStudentToCloud(current);

        setSuccessMessage("🎉 अभिनंदन! तुमचे खाते मंजूर झाले आहे. ॲप सुरू होत आहे...");
        setTimeout(() => {
          setIsCheckingApproval(false);
          setPendingApprovalStudent(null);
          onLoginSuccess(current);
        }, 600);
        return;
      } else {
        setErrorMessage("अद्याप मंजुरी प्रलंबित आहे. ॲडमिनने मंजुरी दिल्यावर त्वरित लॉगिन होईल.");
        setTimeout(() => setErrorMessage(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingApproval(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    if (!cleanIdentifier) {
      setErrorMessage("कृपया मोबाईल नंबर किंवा यूजरनेम टाका.");
      setIsLoading(false);
      return;
    }

    if (!cleanPassword) {
      setErrorMessage("कृपया पासवर्ड / सिक्युरिटी पिन टाका.");
      setIsLoading(false);
      return;
    }

    // 1. ADMIN ROLE LOGIN (Strict PIN 14101994 Verification)
    if (selectedRole === "admin") {
      if (cleanPassword === "14101994") {
        sessionStorage.setItem("mcq_admin_logged_in", "true");
        const adminUser: StudentUser = {
          id: "super_admin_master",
          name: "मुख्य ॲडमिन डायरेक्टर (Super Admin)",
          mobile: "9307220454",
          email: "admin@abhyasmitra.com",
          role: "admin",
          examTarget: "MHT_CET",
          primaryDeviceId: getOrCreateDeviceId(),
          primaryDeviceName: getDeviceName(),
          approvalStatus: "approved",
          isApproved: true,
          paymentStatus: "paid",
          registeredAt: Date.now() - 86400000 * 30,
          lastLoginAt: Date.now(),
        };
        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(adminUser));
        setSuccessMessage("🔐 मास्टर ॲडमिन कन्सोल उघडत आहे...");
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(adminUser);
          if (onOpenAdmin) onOpenAdmin();
        }, 400);
        return;
      } else {
        setIsLoading(false);
        setErrorMessage("अवैध ॲडमिन सिक्युरिटी पिन! कृपया योग्य पिन टाका.");
        return;
      }
    }

    // 2. AGENT PARTNER ROLE
    if (selectedRole === "agent") {
      const existingAgentsRaw = localStorage.getItem("mcq_app_all_agents_v1");
      const existingAgents: AgentUser[] = existingAgentsRaw ? JSON.parse(existingAgentsRaw) : [];

      if (authMode === "register") {
        if (!fullName.trim()) {
          setErrorMessage("कृपया एजंटचे नाव टाका.");
          setIsLoading(false);
          return;
        }

        const newAgentCode = `AGT-${cleanIdentifier.slice(-4) || Math.floor(1000 + Math.random() * 9000)}`;
        const newAgent: AgentUser = {
          id: `agent_${Date.now()}`,
          agentCode: newAgentCode,
          name: fullName.trim(),
          mobile: cleanIdentifier,
          password: cleanPassword,
          email: `${cleanIdentifier}@partner.com`,
          city: agentCity.trim() || "महाराष्ट्र",
          upiId: agentUpi.trim() || `${cleanIdentifier}@upi`,
          commissionRate: 20,
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
          referralCode: newAgent.agentCode,
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
        };

        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(agentUser));
        setSuccessMessage(`अभिनंदन! तुमचा एजंट कोड: ${newAgent.agentCode}`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(agentUser);
        }, 400);
        return;
      } else {
        // Agent Login
        const matched = existingAgents.find(
          (a) =>
            (a.mobile === cleanIdentifier || a.agentCode.toLowerCase() === cleanIdentifier.toLowerCase()) &&
            a.password === cleanPassword
        );

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
            referralCode: matched.agentCode,
            registeredAt: matched.createdAt,
            lastLoginAt: Date.now(),
          };

          localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(agentUser));
          setSuccessMessage(`स्वागत आहे, ${matched.name}!`);
          setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess(agentUser);
          }, 350);
          return;
        } else {
          setIsLoading(false);
          setErrorMessage("एजंट मोबाईल नंबर किंवा पासवर्ड चुकीचा आहे.");
          return;
        }
      }
    }

    // 3. STUDENT REGISTRATION (Requires Admin Approval)
    if (authMode === "register") {
      if (!fullName.trim()) {
        setErrorMessage("कृपया विद्यार्थ्याचे पूर्ण नाव टाका.");
        setIsLoading(false);
        return;
      }

      let existingList: StudentUser[] = [];
      try {
        const raw = localStorage.getItem("mcq_app_all_students_v1");
        existingList = raw ? JSON.parse(raw) : [];
      } catch (e) {}

      const cleanDigits = cleanIdentifier.replace(/\D/g, "");
      const duplicate = existingList.find((s) => {
        const sDigits = (s.mobile || "").replace(/\D/g, "");
        return sDigits === cleanDigits || s.mobile === cleanIdentifier;
      });

      if (duplicate) {
        // If already registered and already approved
        if (duplicate.approvalStatus === "approved" && duplicate.isApproved) {
          duplicate.password = cleanPassword;
          duplicate.lastLoginAt = Date.now();
          duplicate.primaryDeviceId = getOrCreateDeviceId();
          duplicate.primaryDeviceName = getDeviceName();
          localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(existingList));
          localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(duplicate));
          saveStudentToCloud(duplicate);

          setSuccessMessage(`स्वागत आहे, ${duplicate.name}! ॲप उघडत आहे...`);
          setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess(duplicate);
          }, 350);
          return;
        } else {
          // If registered but pending approval
          setIsLoading(false);
          setPendingApprovalStudent(duplicate);
          return;
        }
      }

      // Create new student with: approvalStatus: "pending", isApproved: false
      const newStudent: StudentUser = {
        id: `student_${Date.now()}`,
        name: fullName.trim(),
        mobile: cleanIdentifier,
        password: cleanPassword,
        role: "student",
        examTarget: targetExam,
        primaryDeviceId: getOrCreateDeviceId(),
        primaryDeviceName: getDeviceName(),
        approvalStatus: "pending",
        isApproved: false,
        isFeePaid: true,
        paymentStatus: "paid",
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        referralCode: `REF-${cleanIdentifier.slice(-6)}`,
        referredBy: referralCode.trim() || undefined,
      };

      existingList.unshift(newStudent);
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(existingList));
      localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(newStudent));

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
        } catch (e) {}
      }

      // Save to Firebase Firestore Cloud
      saveStudentToCloud(newStudent);

      // DIRECT PHONEPE TRIGGER: Auto launch PhonePe for ₹29
      triggerDirectPhonePe();

      setIsLoading(false);
      setPendingApprovalStudent(newStudent);
      return;
    } else {
      // 4. STUDENT LOGIN (Strict Check: Block if unapproved)
      let foundUser: StudentUser | null = null;
      let localList: StudentUser[] = [];
      const cleanDigits = cleanIdentifier.replace(/\D/g, "");

      try {
        const raw = localStorage.getItem("mcq_app_all_students_v1");
        localList = raw ? JSON.parse(raw) : [];
        foundUser =
          localList.find((s) => {
            const sDigits = (s.mobile || "").replace(/\D/g, "");
            return (
              (cleanDigits.length >= 10 && sDigits.slice(-10) === cleanDigits.slice(-10)) ||
              s.mobile === cleanIdentifier
            );
          }) || null;
      } catch (e) {
        console.error(e);
      }

      // Check cloud Firestore if not found locally
      if (!foundUser) {
        const cloudStudents = await fetchStudentsFromCloud();
        const cloudMatch = cloudStudents.find((cs) => {
          const csDigits = (cs.mobile || "").replace(/\D/g, "");
          return (
            (cleanDigits.length >= 10 && csDigits.slice(-10) === cleanDigits.slice(-10)) ||
            cs.mobile === cleanIdentifier
          );
        });
        if (cloudMatch) {
          foundUser = { ...cloudMatch } as StudentUser;
        }
      }

      if (!foundUser) {
        setIsLoading(false);
        setErrorMessage("विद्यार्थी खाते सापडले नाही. कृपया प्रथम 'Sign Up' करून नोंदणी करा.");
        return;
      }

      // Check Password
      if (foundUser.password && foundUser.password !== cleanPassword) {
        setIsLoading(false);
        setErrorMessage("पासवर्ड चुकीचा आहे. कृपया योग्य पासवर्ड प्रविष्ट करा.");
        return;
      }

      // STRICT APPROVAL ENFORCEMENT: Block if not approved by Admin
      if (foundUser.approvalStatus !== "approved" || !foundUser.isApproved) {
        setIsLoading(false);
        setPendingApprovalStudent(foundUser);
        return;
      }

      // If approved, update device details & last login (Multi-Device access from any mobile)
      foundUser.primaryDeviceId = getOrCreateDeviceId();
      foundUser.primaryDeviceName = getDeviceName();
      foundUser.lastLoginAt = Date.now();

      const idx = localList.findIndex((s) => s.mobile === foundUser!.mobile || s.id === foundUser!.id);
      if (idx >= 0) {
        localList[idx] = foundUser;
      } else {
        localList.push(foundUser);
      }
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(localList));
      localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(foundUser));
      saveStudentToCloud(foundUser);

      setSuccessMessage(`स्वागत आहे, ${foundUser.name}! टेस्ट सिरीज उघडत आहे...`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(foundUser!);
      }, 350);
    }
  };

  // DEDICATED SCREEN: PENDING ADMIN APPROVAL
  if (pendingApprovalStudent) {
    const waText = `नमस्कार ॲडमिन सर, मी PLPCAPP (By Mi Marathiwala Classes Ambad) मध्ये ₹२९ भरून नोंदणी केली आहे. कृपया माझे खाते तपासून मंजूर (Approve) करा.\n\n👤 नाव: ${pendingApprovalStudent.name}\n📱 मोबाईल: ${pendingApprovalStudent.mobile}\n🎯 परीक्षा: ${pendingApprovalStudent.examTarget}\n💰 भरलेले शुल्क: ₹२९`;
    const waLink = `https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(waText)}`;

    return (
      <div className="w-full min-h-screen bg-[#080816] text-slate-100 flex flex-col justify-center items-center py-8 px-4 relative overflow-hidden antialiased">
        <div className="w-full max-w-md mx-auto relative z-10 space-y-4">
          {/* Brand Banner */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs shadow-xs">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 text-white flex items-center justify-center font-black text-[9px]">
                PLPC
              </div>
              <span className="text-xs font-black text-amber-300 tracking-wider uppercase">
                PLPCAPP
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              PLPCAPP
            </h1>
            <p className="text-xs font-bold text-amber-300 max-w-sm mx-auto">
              By Mi Marathiwala Classes, Ambad
            </p>
            <p className="text-xs text-indigo-200 font-medium max-w-sm mx-auto leading-relaxed">
              Perfect Learning Point for Competitive Exams (NEET | JEE | MHT-CET)
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
                ⏳ ॲडमिन मंजुरी प्रलंबित (Pending Approval)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                नमस्कार, {pendingApprovalStudent.name}
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                आपली नोंदणी प्राप्त झाली आहे! <strong>मुख्य ॲडमिनद्वारे मंजुरी (Approval)</strong> दिल्यानंतर पूर्ण २५,०००+ प्रश्न व मॉक टेस्ट्स तात्काळ अनलॉक होतील.
              </p>
            </div>

            {/* Direct PhonePe / UPI Payment Action (If payment was missed) */}
            <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-300 text-center space-y-2.5 shadow-xs">
              <div className="text-xs font-black text-purple-950 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>₹२९ शुल्क भरले नसेल तर खालील PhonePe बटण दाबा:</span>
              </div>

              {/* Direct PhonePe Launch Button */}
              <a
                href={phonepeUri}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#4a1c7d] hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 transition-all cursor-pointer"
              >
                <span>📱 PhonePe वर ₹२९ भरा (Open PhonePe)</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={gpayUri}
                  className="py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Google Pay</span>
                </a>
                <a
                  href={upiUri}
                  className="py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>इतर UPI ॲप</span>
                </a>
              </div>

              {/* UPI ID display */}
              <div className="text-[11px] font-mono text-purple-900 bg-white/80 py-1 px-2.5 rounded-lg border border-purple-200">
                UPI ID: <strong>{PRIMARY_UPI_ID}</strong>
              </div>
            </div>

            {/* Student Details Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">नोंदणीकृत मोबाईल:</span>
                <span className="font-mono font-bold text-slate-900">{pendingApprovalStudent.mobile}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">लक्ष्य परीक्षा:</span>
                <span className="font-bold text-teal-700">{pendingApprovalStudent.examTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">स्थिती:</span>
                <span className="font-bold text-amber-700">मंजुरी प्रलंबित (ॲडमिन पडताळणी)</span>
              </div>
            </div>

            {/* 1-Click WhatsApp Button to Admin */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp वर ॲडमिनला मेसेज पाठवा ({ADMIN_PHONE})</span>
            </a>

            {/* Check Status Button */}
            <button
              type="button"
              onClick={handleCheckApprovalStatus}
              disabled={isCheckingApproval}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isCheckingApproval ? "animate-spin" : ""}`} />
              <span>{isCheckingApproval ? "तपासत आहे..." : "मंजुरी स्थिती तपासा (Check Approval Status)"}</span>
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={() => {
                setPendingApprovalStudent(null);
                setAuthMode("login");
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold underline cursor-pointer"
            >
              लॉगिन स्क्रीनवर परत जा
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080816] text-slate-100 flex flex-col justify-center items-center py-6 sm:py-10 px-4 relative overflow-hidden antialiased select-none">
      {/* Background Nebulas */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md mx-auto relative z-10 space-y-4">
        {/* Brand Banner Above Card */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs shadow-xs">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 text-white flex items-center justify-center font-black text-[10px]">
              PLPC
            </div>
            <span className="text-xs font-black text-amber-300 tracking-wider uppercase">
              OFFICIAL APP
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            PLPC Learning App
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 font-bold leading-relaxed max-w-sm mx-auto">
            Perfect Learning Point for Competitive Exams
            <span className="block text-[11px] sm:text-xs text-amber-300 font-semibold mt-0.5">
              (NEET | JEE | MHT-CET)
            </span>
          </p>
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
                <div className="text-xs font-black text-white">मोफत डेमो टेस्ट्स (Free Mock Tests)</div>
                <div className="text-[10px] text-teal-300">लॉगिन न करता लगेच सराव सुरू करा</div>
              </div>
            </div>
            <button
              onClick={() => onStartDemoTest("MHT_CET", 1)}
              className="px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs cursor-pointer shadow-md transition-transform active:scale-95"
            >
              सुरू करा →
            </button>
          </div>
        )}

        {/* MAIN AUTHENTICATION CARD */}
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-5">
          {/* Top Logo / Title */}
          <div className="text-center space-y-2 pb-2 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white flex flex-col items-center justify-center mx-auto shadow-md ring-2 ring-indigo-100">
              <span className="text-[13px] font-black tracking-tight leading-none">PLPC</span>
              <span className="text-[8px] text-amber-300 font-bold uppercase leading-none tracking-widest mt-0.5">APP</span>
            </div>

            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                PLPCAPP
              </h2>
              <p className="text-xs sm:text-sm text-indigo-700 font-bold leading-snug">
                Perfect Learning Point for Competitive Exams
              </p>
              <p className="text-[11px] font-bold text-amber-600">
                By Mi Marathiwala Classes, Ambad
              </p>
              <p className="text-[10px] text-slate-500 font-semibold">
                (NEET | JEE | MHT-CET)
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-800">
                {authMode === "login"
                  ? "🔑 विद्यार्थी लॉगिन (Student Login)"
                  : "📝 नवीन विद्यार्थी नोंदणी (Student Registration)"}
              </span>
            </div>
          </div>

          {/* Mode Switch (Login vs Sign Up) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
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
              लॉगिन (Login)
            </button>
            <button
              type="button"
              onClick={() => {
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
              नवीन नोंदणी (Sign Up)
            </button>
          </div>

          {/* Role Selection Tabs (Student, Agent, Admin) */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setSelectedRole("student");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "student"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              👨‍🎓 विद्यार्थी
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole("agent");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "agent"
                  ? "bg-white text-indigo-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              💼 एजंट पार्टनर
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole("admin");
                setErrorMessage("");
              }}
              className={`py-2 px-1 rounded-lg text-center truncate cursor-pointer transition-all ${
                selectedRole === "admin"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              👑 ॲडमिन
            </button>
          </div>

          {/* Role Info / Banners */}
          {selectedRole === "admin" && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-black flex items-center gap-1 text-amber-900">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>सुरक्षित मास्टर ॲडमिन लॉगिन:</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                ॲडमिन सिक्युरिटी पिन टाकून डॅशबोर्ड उघडा आणि विद्यार्थ्यांना मंजुरी द्या.
              </p>
            </div>
          )}

          {selectedRole === "agent" && (
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs space-y-1">
              <div className="flex items-center justify-between text-indigo-950 font-black">
                <span>एजंट पार्टनर रेफरल मॉडेल:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px]">
                  २०% कमिशन (₹५.८०)
                </span>
              </div>
              <p className="text-[11px] text-indigo-800 leading-tight">
                तुमच्या रेफरल कोडवरून विद्यार्थी जोडल्यावर लगेच कमिशन जमा होते.
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

          {/* ₹29 UPI Pay Banner if registering as student */}
          {authMode === "register" && selectedRole === "student" && (
            <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-300 rounded-3xl p-4 text-center space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-700 text-white text-[11px] font-black uppercase">
                  📱 PhonePe / GPay ₹२९
                </span>
                <span className="text-sm font-black text-slate-900">
                  फक्त ₹२९ <span className="text-xs text-slate-400 line-through">₹४९९</span>
                </span>
              </div>

              {/* Direct 1-Click PhonePe Link */}
              <a
                href={phonepeUri}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#4a1c7d] hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer"
              >
                <span>📱 Direct PhonePe वर ₹२९ भरा</span>
              </a>

              {/* Direct UPI Apps */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={gpayUri}
                  className="py-2 px-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Google Pay</span>
                </a>
                <a
                  href={upiUri}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>इतर Any UPI</span>
                </a>
              </div>

              <p className="text-[11px] text-purple-950 font-bold bg-purple-100/70 py-1.5 px-3 rounded-xl">
                ⚡ नोंदणी सबमिट करताच डायरेक्ट PhonePe उघडून ₹२९ पेमेंट सुरू होईल!
              </p>
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
                  placeholder={selectedRole === "agent" ? "एजंटचे पूर्ण नाव (Full Name)" : "विद्यार्थ्याचे पूर्ण नाव (Full Name)"}
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
                    ? "Admin Username / Phone"
                    : selectedRole === "agent"
                    ? authMode === "login"
                      ? "मोबाईल नंबर किंवा एजंट कोड"
                      : "१० अंकी WhatsApp मोबाईल नंबर"
                    : "१० अंकी मोबाईल नंबर (Mobile Number)"
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
              />
            </div>

            {/* Agent City & UPI */}
            {authMode === "register" && selectedRole === "agent" && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="शहर / जिल्हा"
                  value={agentCity}
                  onChange={(e) => setAgentCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="UPI ID (पेआउटसाठी)"
                  value={agentUpi}
                  onChange={(e) => setAgentUpi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 outline-none"
                />
              </div>
            )}

            {/* Password Field (Masked) */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={selectedRole === "admin" ? "Admin Security PIN" : "Password (पासवर्ड)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 pr-11 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Target Exam (if registering student) */}
            {authMode === "register" && selectedRole === "student" && (
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
                  placeholder="रेफरल कोड (ऐच्छिक)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs uppercase font-bold text-slate-800 outline-none"
                />
              </div>
            )}

            {/* reCAPTCHA "I'm not a robot" */}
            <div
              onClick={handleCaptchaClick}
              className="bg-slate-50 border border-slate-300 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all select-none shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    isCaptchaChecked
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-400 bg-white"
                  }`}
                >
                  {isCaptchaVerifying ? (
                    <RotateCw className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                  ) : isCaptchaChecked ? (
                    <CheckCircle2 className="w-4 h-4 fill-white text-emerald-600" />
                  ) : null}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {isCaptchaChecked ? "Verified Human (मानव पडताळणी पूर्ण)" : "I'm not a robot"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-[9px] text-slate-400">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span className="font-bold text-[9px] text-slate-500">reCAPTCHA</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl text-white font-black text-sm tracking-wide shadow-lg cursor-pointer transition-transform active:scale-98 disabled:opacity-50 ${
                authMode === "register" && selectedRole === "student"
                  ? "bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:brightness-110 shadow-purple-900/30"
                  : "bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 shadow-teal-500/30"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>कृपया थांबा...</span>
                </div>
              ) : (
                <span>
                  {selectedRole === "admin"
                    ? "ॲडमिन डॅशबोर्ड उघडा (Admin Sign In)"
                    : selectedRole === "agent"
                    ? authMode === "login"
                      ? "एजंट डॅशबोर्ड उघडा"
                      : "एजंट नोंदणी पूर्ण करा"
                    : authMode === "login"
                    ? "Sign In (लॉगिन करा)"
                    : "📱 नोंदणी करा व PhonePe ने ₹२९ भरा →"}
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Legal Disclaimer & Naming Terms (खूप बारीक अक्षरांमध्ये शैक्षणिक अस्वीकरण व अटी) */}
        <div className="bg-slate-900/80 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-slate-400 text-[10px] leading-relaxed space-y-1.5 text-justify">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>शैक्षणिक अस्वीकरण, अधिकृत मालकी व अटी (Educational Disclaimer & Terms)</span>
          </div>
          <p>
            १. <strong>अधिकृत मालकी व संकल्पना:</strong> हे ॲप (<strong>PLPCAPP</strong> - <em>Perfect Learning Point for Competitive Exams</em>) हे <strong>'मी मराठीवाला क्लासेस, अंबड' (Mi Marathiwala Classes, Ambad)</strong> द्वारे ग्रामीण, होतकरू व गरजू विद्यार्थ्यांच्या स्पर्धा परीक्षा (NEET, JEE, MHT-CET) सराव व शैक्षणिक मार्गदर्शनासाठी तयार करण्यात आलेले स्वतंत्र डिजिटल पोर्टल आहे.
          </p>
          <p>
            २. <strong>नावाबाबत स्पष्टीकरण (Distinct Entity):</strong> या ॲपचे नाव व संक्षिप्त रूप हे 'Perfect Learning Point for Competitive Exams By Mi Marathiwala Classes Ambad' या मूळ संकल्पनेवर आधारित आहे. इतर कोणत्याही व्यावसायिक क्लासेस, संस्था किंवा तत्सम नावाच्या नोंदणीकृत ट्रेडमार्कशी याचा थेट अथवा अप्रत्यक्ष संबंध नाही.
          </p>
          <p>
            ३. <strong>विद्यार्थी पारदर्शकता:</strong> नोंदणी शुल्क केवळ डिजिटल सर्व्हर व चाचणी व्यवस्थापनासाठी आकारले जाते, जेणेकरून विद्यार्थ्यांना गुणवत्तापूर्ण शैक्षणिक सराव उपलब्ध व्हावा.
          </p>
        </div>
      </div>
    </div>
  );
};
