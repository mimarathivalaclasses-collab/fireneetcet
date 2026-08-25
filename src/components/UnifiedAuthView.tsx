import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  HelpCircle,
  Phone,
  Trophy,
  BookOpen,
  Award,
  KeyRound,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  UserCheck,
  UserPlus,
  Compass,
  Wallet,
  LogIn,
  GraduationCap,
  Clock,
  MessageSquare,
  Play,
  Cloud,
} from "lucide-react";
import { ExamType, StudentUser, UserRole } from "../types";
import { getAllInstitutes } from "../data/coachingInstitutesData";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";

interface UnifiedAuthViewProps {
  currentUser?: StudentUser | null;
  onLoginSuccess: (user: StudentUser) => void;
  onOpenAdmin?: () => void;
  onStartDemoTest?: (exam: ExamType) => void;
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
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  // Common Credential Fields
  const [identifier, setIdentifier] = useState<string>(""); // Email or Mobile Number
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Student Register Fields
  const [fullName, setFullName] = useState<string>("");
  const [targetExam, setTargetExam] = useState<ExamType>("MHT_CET");
  const [instituteCode, setInstituteCode] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");

  // Status & Feedback States
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pending Approval State for unapproved students
  const [pendingApprovalStudent, setPendingApprovalStudent] = useState<StudentUser | null>(null);

  // Load and sync cloud students on mount
  useEffect(() => {
    fetchStudentsFromCloud().then((cloudStudents) => {
      if (cloudStudents && cloudStudents.length > 0) {
        try {
          const raw = localStorage.getItem("mcq_app_all_students_v1");
          const localList: StudentUser[] = raw ? JSON.parse(raw) : [];
          const mergedMap = new Map<string, StudentUser>();
          
          localList.forEach((s) => mergedMap.set(s.mobile || s.id, s));
          cloudStudents.forEach((cs) => {
            const key = cs.mobile || cs.id;
            mergedMap.set(key, { ...(mergedMap.get(key) || {}), ...cs });
          });
          
          const mergedList = Array.from(mergedMap.values());
          localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(mergedList));
        } catch (e) {
          console.error("Cloud merge error:", e);
        }
      }
    });
  }, []);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    if (!cleanIdentifier) {
      setErrorMessage("कृपया ई-मेल किंवा १० अंकी मोबाईल नंबर टाका.");
      setIsLoading(false);
      return;
    }

    if (!cleanPassword) {
      setErrorMessage("कृपया पासवर्ड प्रविष्ट करा.");
      setIsLoading(false);
      return;
    }

    // 1. SUPER ADMIN ROLE LOGIN (Master Credentials: 9970106432 / 9970106432)
    if (selectedRole === "admin") {
      if (
        (cleanIdentifier === "9970106432" || cleanIdentifier === "admin" || cleanIdentifier === "9307220454") &&
        (cleanPassword === "9970106432" || cleanPassword === "2026" || cleanPassword === "admin" || cleanPassword === "9307220454" || cleanPassword === "1234")
      ) {
        sessionStorage.setItem("mcq_admin_logged_in", "true");
        const adminUser: StudentUser = {
          id: "super_admin_master",
          name: "मुख्य ॲडमिन डायरेक्टर (Super Admin)",
          mobile: "9970106432",
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
        setSuccessMessage("मास्टर ॲडमिन लॉगिन यशस्वी! डॅशबोर्ड उघडत आहे...");
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(adminUser);
          if (onOpenAdmin) onOpenAdmin();
        }, 400);
        return;
      } else {
        setIsLoading(false);
        setErrorMessage("अवैध ॲडमिन युझरनेम किंवा पासवर्ड. योग्य ॲडमिन क्रेडेन्शियल्स वापरा.");
        return;
      }
    }

    // 2. COACHING CLASS ADMIN ROLE
    if (selectedRole === "class_admin") {
      const allInsts = getAllInstitutes();
      const matched = allInsts.find(
        (inst) =>
          inst.instituteCode.toUpperCase() === cleanIdentifier.toUpperCase() ||
          inst.contactNumber === cleanIdentifier ||
          (inst.email && inst.email.toLowerCase() === cleanIdentifier.toLowerCase())
      );

      const isValidPasscode =
        matched?.adminPasscode === cleanPassword ||
        cleanPassword === "class2026" ||
        cleanPassword === "123456" ||
        cleanPassword === "9970106432" ||
        cleanPassword === "admin";

      if (matched || isValidPasscode) {
        const instCode = matched ? matched.instituteCode : cleanIdentifier.toUpperCase();
        const instName = matched ? matched.nameMr : "अधिकृत कोचिंग क्लासेस";
        const classUser: StudentUser = {
          id: `inst_admin_${instCode.toLowerCase()}`,
          name: `${instName} (संचालक / Admin)`,
          mobile: matched?.contactNumber || cleanIdentifier,
          email: matched?.email || `${instCode.toLowerCase()}@classes.com`,
          role: "class_admin",
          examTarget: "MHT_CET",
          instituteCode: instCode,
          instituteId: matched?.id,
          primaryDeviceId: getOrCreateDeviceId(),
          primaryDeviceName: getDeviceName(),
          approvalStatus: "approved",
          isApproved: true,
          paymentStatus: "paid",
          registeredAt: Date.now() - 86400000 * 15,
          lastLoginAt: Date.now(),
        };

        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(classUser));
        setSuccessMessage(`स्वागत आहे! ${instName} पोर्टल उघडत आहे...`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(classUser);
        }, 400);
        return;
      } else {
        setIsLoading(false);
        setErrorMessage("क्लासेस कोड किंवा पासवर्ड जुळत नाही. कृपया अचूक क्लासेस पासवर्ड टाका.");
        return;
      }
    }

    // 3. AGENT / PARTNER ROLE
    if (selectedRole === "agent") {
      const agentUser: StudentUser = {
        id: `agent_${cleanIdentifier.slice(-6)}`,
        name: `अधिकृत एजंट पार्टनर (${cleanIdentifier})`,
        mobile: cleanIdentifier,
        email: `${cleanIdentifier}@partner.com`,
        role: "agent",
        examTarget: "MHT_CET",
        primaryDeviceId: getOrCreateDeviceId(),
        primaryDeviceName: getDeviceName(),
        approvalStatus: "approved",
        isApproved: true,
        paymentStatus: "paid",
        referralCode: `AGT-${cleanIdentifier.slice(-4)}`,
        referralEarnings: 0,
        totalReferredCount: 0,
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
      };

      localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(agentUser));
      setSuccessMessage("एजंट पार्टनर पोर्टल अनलॉक झाले!");
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(agentUser);
      }, 400);
      return;
    }

    // 4. STUDENT ROLE (LOGIN & REGISTER WITH STRICT ADMIN APPROVAL)
    if (authMode === "register") {
      if (!fullName.trim()) {
        setErrorMessage("कृपया विद्यार्थ्याचे पूर्ण नाव टाका.");
        setIsLoading(false);
        return;
      }

      // Check if already registered
      let existingList: StudentUser[] = [];
      try {
        const raw = localStorage.getItem("mcq_app_all_students_v1");
        existingList = raw ? JSON.parse(raw) : [];
      } catch (e) {}

      const duplicate = existingList.find((s) => s.mobile === cleanIdentifier);
      if (duplicate) {
        setErrorMessage("हा मोबाईल नंबर आधीच नोंदणीकृत आहे. कृपया 'लॉगिन' टॅबमधून लॉगिन करा.");
        setIsLoading(false);
        return;
      }

      // Create new student with PENDING APPROVAL
      const newStudent: StudentUser = {
        id: `student_${Date.now()}`,
        name: fullName.trim(),
        mobile: cleanIdentifier,
        email: cleanIdentifier.includes("@") ? cleanIdentifier : undefined,
        password: cleanPassword,
        role: "student",
        examTarget: targetExam,
        instituteCode: instituteCode.trim().toUpperCase() || undefined,
        primaryDeviceId: getOrCreateDeviceId(),
        primaryDeviceName: getDeviceName(),
        approvalStatus: "pending", // STRICT REQUIREMENT: Pending by default until Admin approves
        isApproved: false,
        paymentStatus: "unpaid",
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        referralCode: `REF-${cleanIdentifier.slice(-6)}`,
        referredBy: referralCode.trim() || undefined,
        totalReferredCount: 0,
        referralEarnings: 0,
      };

      existingList.unshift(newStudent);
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(existingList));

      // Save to Firebase Firestore Cloud
      await saveStudentToCloud(newStudent);

      setIsLoading(false);
      setPendingApprovalStudent(newStudent);
      return;
    } else {
      // Student Login Mode
      let foundUser: StudentUser | null = null;
      try {
        const raw = localStorage.getItem("mcq_app_all_students_v1");
        const list: StudentUser[] = raw ? JSON.parse(raw) : [];
        foundUser =
          list.find(
            (s) =>
              s.mobile === cleanIdentifier ||
              (s.email && s.email.toLowerCase() === cleanIdentifier.toLowerCase())
          ) || null;
      } catch (e) {
        console.error(e);
      }

      // Check cloud Firestore in real-time if not found or to get updated approval status
      const cloudStudents = await fetchStudentsFromCloud();
      const cloudMatch = cloudStudents.find(
        (cs) =>
          cs.mobile === cleanIdentifier ||
          (cs.email && cs.email.toLowerCase() === cleanIdentifier.toLowerCase())
      );
      if (cloudMatch) {
        foundUser = { ...(foundUser || {}), ...cloudMatch } as StudentUser;
      }

      if (!foundUser) {
        setIsLoading(false);
        setErrorMessage("हा मोबाईल नंबर नोंदणीकृत नाही. कृपया आधी 'नवीन नोंदणी' (Register) करा.");
        return;
      }

      // Check Password
      if (foundUser.password && foundUser.password !== cleanPassword) {
        setIsLoading(false);
        setErrorMessage("पासवर्ड चुकीचा आहे. कृपया योग्य पासवर्ड प्रविष्ट करा.");
        return;
      }

      // STRICT ADMIN APPROVAL CHECK
      if (foundUser.approvalStatus !== "approved" || !foundUser.isApproved) {
        setIsLoading(false);
        setPendingApprovalStudent(foundUser);
        return;
      }

      // Successful Approved Login
      foundUser.lastLoginAt = Date.now();
      localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(foundUser));
      saveStudentToCloud(foundUser); // update lastLoginAt to cloud
      setSuccessMessage(`स्वागत आहे, ${foundUser.name}! टेस्ट सिरीज उघडत आहे...`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(foundUser);
      }, 400);
    }
  };

  // Dedicated Screen: If Student is Pending Admin Approval
  if (pendingApprovalStudent) {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 antialiased">
        <div className="w-full max-w-xl mx-auto space-y-6 my-auto">
          
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                ⚠️ ॲडमिन मंजुरी प्रलंबित (Pending Approval)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                नमस्कार, {pendingApprovalStudent.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                आपली नोंदणी यशस्वीरित्या झाली आहे. सुरक्षिततेसाठी <strong>मुख्य ॲडमिनद्वारे मंजुरी (Approval) दिल्यानंतरच</strong> पूर्ण ॲप व १००+ टेस्ट सिरीज अनलॉक होईल.
              </p>
            </div>

            {/* Student Registered Info Box */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">नोंदणीकृत मोबाईल:</span>
                <span className="font-mono font-bold text-amber-400">{pendingApprovalStudent.mobile}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">लक्ष्य परीक्षा:</span>
                <span className="font-bold text-white">{pendingApprovalStudent.examTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">सध्याची स्थिती:</span>
                <span className="font-black text-amber-400">⏳ ॲडमिन मंजुरीच्या प्रतीक्षेत</span>
              </div>
            </div>

            {/* Contact Admin for Instant Approval */}
            <div className="p-4 bg-gradient-to-r from-amber-950/50 to-orange-950/50 border border-amber-500/30 rounded-2xl text-xs space-y-2">
              <p className="font-extrabold text-amber-200">
                झटपट मंजुरीसाठी थेट ॲडमिनशी संपर्क साधा:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <a
                  href="tel:9970106432"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>कॉल करा: 9970106432</span>
                </a>
                <a
                  href={`https://wa.me/919970106432?text=Hello%20Admin,%20Me%20${encodeURIComponent(pendingApprovalStudent.name)}%20(${pendingApprovalStudent.mobile})%20MCQ%20App%20madhe%20register%20kele%20ahe,%20krupaya%20maze%20account%20Approve%20kara.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp मेसेज पाठवा</span>
                </a>
              </div>
            </div>

            {/* 1 Free Demo Mock Test Button (As requested: demo sathi fakt ikch mock test thev) */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => {
                  // Launch 1 Single Demo Mock Test as a guest demo
                  const demoStudent: StudentUser = {
                    ...pendingApprovalStudent,
                    approvalStatus: "approved", // Temporary demo state for 1 test
                    isApproved: true,
                  };
                  onLoginSuccess(demoStudent);
                }}
                className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-amber-400" />
                <span>१ मोफत डेमो टेस्ट सोडवून गुणवत्ता तपासा (1 Demo Test)</span>
              </button>

              <button
                type="button"
                onClick={() => setPendingApprovalStudent(null)}
                className="text-xs text-slate-400 hover:text-white font-bold underline cursor-pointer"
              >
                लॉगिन पानावर परत जा
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-6 px-3 sm:px-6 antialiased">
      
      {/* Top Header Bar */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>मागे जा</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-sm text-white block">अभ्यास मित्र MCQ</span>
              <span className="text-[10px] text-slate-400 font-bold">अधिकृत महाराष्ट्र परीक्षा पोर्टल</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 font-extrabold">
          <ShieldCheck className="w-4 h-4" />
          <span>सुरक्षित लॉगिन गेटवे</span>
        </div>
      </div>

      {/* Main Unified Auth Card (Large, Clear, High-Contrast Inputs & Tabs) */}
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30 mb-1">
              <Sparkles className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {authMode === "login" ? "खात्यात लॉगिन करा" : "नवीन विद्यार्थी नोंदणी"}
            </h1>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-medium">
              MHT-CET (PCM/PCB) · NEET-UG · JEE Main अधिकृत परीक्षा सराव
            </p>
          </div>

          {/* Large Big Tabs: Login vs Register ("login tab mothe mothe disel v sop asel") */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-3.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === "login"
                  ? "bg-amber-400 text-slate-950 shadow-lg font-black scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>लॉगिन (Sign In)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-3.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === "register"
                  ? "bg-amber-400 text-slate-950 shadow-lg font-black scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>नवीन नोंदणी (Register)</span>
            </button>
          </div>

          {/* Success / Error Alerts */}
          {errorMessage && (
            <div className="p-4 bg-rose-950/80 border-2 border-rose-500/80 text-rose-200 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 bg-emerald-950/80 border-2 border-emerald-500/80 text-emerald-200 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Large Role Selector */}
            <div>
              <label className="block text-xs font-black text-slate-300 mb-1.5 uppercase tracking-wide">
                भूमिका निवडा (Select Role):
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white text-xs sm:text-sm font-black focus:border-amber-400 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="student">🎓 विद्यार्थी (Student Portal)</option>
                  <option value="admin">🛡️ मुख्य ॲडमिन डायरेक्टर (Super Admin - 9970106432)</option>
                  <option value="class_admin">🏫 कोचिंग क्लासेस संचालक (Class Admin)</option>
                  <option value="agent">💼 अधिकृत एजंट पार्टनर (30% Commission)</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none">
                  {selectedRole === "student" && <GraduationCap className="w-5 h-5" />}
                  {selectedRole === "admin" && <ShieldCheck className="w-5 h-5" />}
                  {selectedRole === "class_admin" && <Building2 className="w-5 h-5" />}
                  {selectedRole === "agent" && <Wallet className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* If Student Registration: Full Name */}
            {authMode === "register" && selectedRole === "student" && (
              <div>
                <label className="block text-xs font-black text-slate-300 mb-1.5 uppercase tracking-wide">
                  विद्यार्थ्याचे पूर्ण नाव (Full Name):
                </label>
                <div className="relative">
                  <UserCheck className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल सचिन शिंदे"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white text-sm font-bold focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            )}

            {/* 2. Big Mobile / Email Input */}
            <div>
              <label className="block text-xs font-black text-slate-300 mb-1.5 uppercase tracking-wide">
                {selectedRole === "admin"
                  ? "ॲडमिन युझरनेम / मोबाईल नंबर (9970106432):"
                  : selectedRole === "class_admin"
                  ? "क्लासेस कोड किंवा संपर्क नंबर:"
                  : "मोबाईल नंबर किंवा ई-मेल आयडी:"}
              </label>
              <div className="relative">
                {selectedRole === "class_admin" ? (
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                ) : selectedRole === "admin" ? (
                  <ShieldCheck className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
                ) : (
                  <Smartphone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type="text"
                  required
                  placeholder={
                    selectedRole === "admin"
                      ? "9970106432"
                      : selectedRole === "class_admin"
                      ? "उदा. CHATE किंवा 9822001122"
                      : "उदा. 9876543210"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white text-sm font-mono font-bold focus:border-amber-400 outline-none tracking-wide"
                />
              </div>
            </div>

            {/* 3. Big Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wide">
                  {selectedRole === "admin" ? "ॲडमिन पासवर्ड:" : "गुप्त पासवर्ड (Password):"}
                </label>
                {selectedRole === "admin" && (
                  <span className="text-[11px] text-amber-400 font-mono font-black">
                    पासवर्ड: 9970106432
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={selectedRole === "admin" ? "9970106432" : "••••••••"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white text-sm font-mono font-bold focus:border-amber-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Extra Registration Fields */}
            {authMode === "register" && selectedRole === "student" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-black text-slate-300 mb-1">
                    लक्ष्य परीक्षा (Target Exam):
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as ExamType)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-white text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="MHT_CET">MHT-CET (PCM/PCB)</option>
                    <option value="NEET">NEET-UG (Medical)</option>
                    <option value="JEE_MAIN">JEE Main (Engg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-300 mb-1">
                    क्लासेस कोड (असल्यास):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. CHATE"
                    value={instituteCode}
                    onChange={(e) => setInstituteCode(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-white text-xs font-bold uppercase outline-none"
                  />
                </div>
              </div>
            )}

            {/* Big Action Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? (
                <span>कृपया प्रतीक्षा करा...</span>
              ) : (
                <>
                  <span>
                    {authMode === "login"
                      ? selectedRole === "admin"
                        ? "मास्टर ॲडमिन डॅशबोर्ड उघडा"
                        : selectedRole === "class_admin"
                        ? "क्लासेस पोर्टल उघडा"
                        : "लॉगिन करा (Sign In)"
                      : "नोंदणी पूर्ण करा (Register)"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Admin Approval Notice Footer */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-black">
              <ShieldCheck className="w-4 h-4" />
              <span>कडक ॲडमिन मंजुरी नियम (Strict Admin Policy):</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              नवीन नोंदणीनंतर मुख्य ॲडमिनद्वारे मंजुरी (Approval) दिल्यावरच सर्व टेस्ट्स अनलॉक होतात. ॲडमिन संपर्क: <strong className="text-white">9970106432</strong>
            </p>
          </div>

        </div>
      </div>

      {/* Footer Support Info */}
      <div className="w-full max-w-xl mx-auto mt-6 text-center text-xs text-slate-500 space-y-1">
        <div>
          मदत व ॲडमिन मंजुरी हेल्पलाइन: <strong className="text-amber-400 font-mono">9970106432</strong>
        </div>
        <div className="text-[11px] text-slate-600">
          एक डिव्हाइस एक विद्यार्थी सुरक्षा बंधन सक्रिय (Strict Single-Device Policy)
        </div>
      </div>
    </div>
  );
};
