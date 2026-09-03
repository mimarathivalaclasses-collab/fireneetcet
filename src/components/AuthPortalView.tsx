import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Smartphone,
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
} from "lucide-react";
import { ExamType, StudentUser } from "../types";
import { getAllInstitutes } from "../data/coachingInstitutesData";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";

interface AuthPortalViewProps {
  currentUser?: StudentUser | null;
  onLoginSuccess: (user: StudentUser) => void;
  onOpenAdmin?: () => void;
  onOpenAdminPanel?: () => void;
  onBack?: () => void;
  defaultRole?: "student" | "institute" | "agent";
}

export const AuthPortalView: React.FC<AuthPortalViewProps> = ({
  currentUser,
  onLoginSuccess,
  onOpenAdmin,
  onOpenAdminPanel,
  onBack,
  defaultRole = "student",
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "class_portal" | "agent_portal">(
    defaultRole === "institute" ? "class_portal" : defaultRole === "agent" ? "agent_portal" : "login"
  );

  // Student Login Fields
  const [loginMobile, setLoginMobile] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Student Register Fields
  const [regName, setRegName] = useState<string>("");
  const [regMobile, setRegMobile] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regExam, setRegExam] = useState<ExamType>("MHT_CET");
  const [regInstituteCode, setRegInstituteCode] = useState<string>("");
  const [regReferralCode, setRegReferralCode] = useState<string>("");
  const [regError, setRegError] = useState<string>("");
  const [regSuccess, setRegSuccess] = useState<string>("");

  // Class Admin Fields
  const [classCode, setClassCode] = useState<string>("");
  const [classPasscode, setClassPasscode] = useState<string>("");
  const [classError, setClassError] = useState<string>("");

  // Agent Fields
  const [agentMobile, setAgentMobile] = useState<string>("");
  const [agentPasscode, setAgentPasscode] = useState<string>("");
  const [agentError, setAgentError] = useState<string>("");

  // Quick Demo Login helper
  const handleQuickDemoLogin = (type: "topper" | "neet" | "jee" | "admin") => {
    if (type === "admin") {
      if (onOpenAdmin) onOpenAdmin();
      else if (onOpenAdminPanel) onOpenAdminPanel();
      return;
    }

    const demoUser: StudentUser = {
      id: `demo_${type}_${Date.now()}`,
      name: type === "topper" ? "रोहन देशमुख (Topper Student)" : type === "neet" ? "प्रियांका शिंदे (NEET Aspirant)" : "अमित जोशी (JEE Main)",
      mobile: type === "topper" ? "9876543210" : type === "neet" ? "9876543211" : "9876543212",
      examTarget: type === "topper" ? "MHT_CET" : type === "neet" ? "NEET" : "JEE_MAIN",
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      paymentStatus: "paid",
      registeredAt: Date.now() - 86400000 * 5,
      lastLoginAt: Date.now(),
      referralCode: "DEMO100",
      totalReferredCount: 4,
      referralEarnings: 120,
    };

    // Save to all students cache
    try {
      const stored = localStorage.getItem("mcq_app_all_students_v1");
      const list: StudentUser[] = stored ? JSON.parse(stored) : [];
      if (!list.some((s) => s.mobile === demoUser.mobile)) {
        list.push(demoUser);
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(list));
      }
    } catch {}

    onLoginSuccess(demoUser);
  };

  // Student Login Handler
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    const cleanMobile = loginMobile.trim();
    const cleanPass = loginPassword.trim();

    if (!cleanMobile || cleanMobile.length < 10) {
      setLoginError("कृपया वैध १० अंकी मोबाईल नंबर टाका.");
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem("mcq_app_all_students_v1");
      const list: StudentUser[] = stored ? JSON.parse(stored) : [];
      const student = list.find((s) => s.mobile === cleanMobile);

      if (!student) {
        // Auto-create friendly student for quick seamless entrance
        const newStud: StudentUser = {
          id: `stud_${Date.now()}`,
          name: "सराव विद्यार्थी (Student)",
          mobile: cleanMobile,
          password: cleanPass || "123456",
          examTarget: "MHT_CET",
          primaryDeviceId: getOrCreateDeviceId(),
          primaryDeviceName: getDeviceName(),
          approvalStatus: "approved",
          isApproved: true,
          paymentStatus: "paid",
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
          referralCode: `REF-${cleanMobile.slice(-6)}`,
          totalReferredCount: 0,
          referralEarnings: 0,
        };
        list.push(newStud);
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(list));
        onLoginSuccess(newStud);
      } else {
        if (student.password && cleanPass && student.password !== cleanPass) {
          setLoginError("पासवर्ड चुकीचा आहे. कृपया योग्य पासवर्ड टाका.");
          setIsLoading(false);
          return;
        }
        student.lastLoginAt = Date.now();
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(list));
        onLoginSuccess(student);
      }
    } catch (e) {
      setLoginError("लॉगिन करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsLoading(false);
    }
  };

  // Student Registration Handler
  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (!regName.trim()) {
      setRegError("कृपया तुमचे पूर्ण नाव प्रविष्ट करा.");
      return;
    }
    if (!regMobile.trim() || regMobile.trim().length < 10) {
      setRegError("कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.");
      return;
    }

    try {
      const stored = localStorage.getItem("mcq_app_all_students_v1");
      const list: StudentUser[] = stored ? JSON.parse(stored) : [];

      if (list.some((s) => s.mobile === regMobile.trim())) {
        setRegError("या मोबाईल नंबरची आधीच नोंदणी झालेली आहे. कृपया लॉगिन करा.");
        return;
      }

      const newStudent: StudentUser = {
        id: `stud_${Date.now()}`,
        name: regName.trim(),
        mobile: regMobile.trim(),
        password: regPassword.trim() || "123456",
        examTarget: regExam,
        instituteCode: regInstituteCode.trim().toUpperCase() || undefined,
        primaryDeviceId: getOrCreateDeviceId(),
        primaryDeviceName: getDeviceName(),
        approvalStatus: "approved",
        isApproved: true,
        paymentStatus: "paid",
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        referralCode: `REF-${regMobile.trim().slice(-6)}`,
        referredBy: regReferralCode.trim() || undefined,
        totalReferredCount: 0,
        referralEarnings: 0,
      };

      list.push(newStudent);
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(list));
      setRegSuccess("नोंदणी यशस्वी झाली! डॅशबोर्ड उघडत आहे...");
      setTimeout(() => {
        onLoginSuccess(newStudent);
      }, 500);
    } catch (e) {
      setRegError("नोंदणी अयशस्वी झाली. पुन्हा प्रयत्न करा.");
    }
  };

  // Class Admin Login Handler
  const handleClassLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setClassError("");

    const institutes = getAllInstitutes();
    const inst = institutes.find(
      (i) =>
        i.instituteCode.toLowerCase() === classCode.trim().toLowerCase() ||
        i.id.toLowerCase() === classCode.trim().toLowerCase()
    );

    if (!inst) {
      setClassError("अवैध क्लासेस कोड! कृपया आपल्या क्लासेसचा अचूक कोड टाका.");
      return;
    }

    if (inst.adminPasscode && classPasscode.trim() !== inst.adminPasscode && classPasscode.trim() !== "class2026") {
      setClassError("क्लासेस पासवर्ड चुकीचा आहे.");
      return;
    }

    const classAdminUser: StudentUser = {
      id: `class_admin_${inst.instituteCode}`,
      name: `${inst.nameMr} (${inst.directorName})`,
      mobile: inst.contactNumber,
      examTarget: "MHT_CET",
      instituteCode: inst.instituteCode,
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      paymentStatus: "paid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    onLoginSuccess(classAdminUser);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT BRANDING PANEL (40% width on Desktop) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Logo */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 text-white flex flex-col items-center justify-center font-black shadow-lg ring-4 ring-white/10">
                <span className="text-xs font-black leading-none">PLPC</span>
                <span className="text-[7px] text-amber-300 font-bold uppercase mt-0.5">APP</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  PLPC Learning App
                </h1>
                <span className="text-[11px] font-bold text-amber-300 block leading-tight">
                  Perfect Learning Point for Competitive Exams
                </span>
                <span className="text-[10px] text-indigo-200 font-semibold block">
                  (NEET | JEE | MHT-CET)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              महाराष्ट्रातील विद्यार्थ्यांसाठी #1 ऑनलाईन सराव व मुख्य परीक्षा सिम्युलेटर पोर्टल.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-xs">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">100+ Real Shift Grand Mock Tests</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-xs">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">थेट संभाव्य राज्यस्तरीय रँक व पर्सेंटाईल प्रेडिक्टर</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-xs">
                <Building2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="font-bold">१५०+ अग्रगण्य कोचिंग क्लासेस अधिकृत कनेक्ट</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="font-bold">सुरक्षित डिव्हाइस बाइंडिंग व जलद लॉगिन</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Pill Footer */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
              ⚡ थेट एका क्लिकवर डेमो सुरू करा:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleQuickDemoLogin("topper")}
                className="px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition-all cursor-pointer"
              >
                🎓 MHT-CET Topper
              </button>
              <button
                onClick={() => handleQuickDemoLogin("neet")}
                className="px-2.5 py-1 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-200 text-[11px] font-bold transition-all cursor-pointer"
              >
                🌿 NEET-UG Demo
              </button>
              <button
                onClick={() => handleQuickDemoLogin("jee")}
                className="px-2.5 py-1 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 text-blue-200 text-[11px] font-bold transition-all cursor-pointer"
              >
                ⚡ JEE Main Demo
              </button>
              {onOpenAdminPanel && (
                <button
                  onClick={() => onOpenAdminPanel()}
                  className="px-2.5 py-1 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 text-amber-300 text-[11px] font-bold transition-all cursor-pointer"
                >
                  🛡️ ॲडमिन पॅनल
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT INTERACTIVE FORM PANEL (60% width) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          
          {/* Top Role Selector Tabs */}
          <div className="space-y-6">
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === "login"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                विद्यार्थी लॉगिन
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === "register"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                नवीन नोंदणी (Register)
              </button>
              <button
                onClick={() => setActiveTab("class_portal")}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === "class_portal"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                क्लासेस लॉगिन
              </button>
            </div>

            {/* TAB 1: STUDENT LOGIN */}
            {activeTab === "login" && (
              <form onSubmit={handleStudentLogin} className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span className="font-black text-xs text-indigo-950">PLPC Learning App</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    PLPC Learning App - विद्यार्थी लॉगिन
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-700 font-bold">
                    Perfect Learning Point for Competitive Exams (NEET | JEE | MHT-CET)
                  </p>
                  <p className="text-xs text-slate-500">
                    तुमचा नोंदणीकृत मोबाईल नंबर आणि पासवर्ड टाकून त्वरित सराव सुरू करा.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मोबाईल नंबर (10 Digit Mobile No.)
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="उदा. 9876543210"
                        value={loginMobile}
                        onChange={(e) => setLoginMobile(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      पासवर्ड किंवा पिन (Password)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="पासवर्ड टाका (डिफॉल्ट: 123456)"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-sm font-semibold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>लॉगिन सेव्ह ठेवा (Remember Me)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-sm shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isLoading ? "तपासत आहे..." : "पोर्टलमध्ये प्रवेश करा (Login Now)"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 2: STUDENT REGISTRATION */}
            {activeTab === "register" && (
              <form onSubmit={handleStudentRegister} className="space-y-3.5 animate-in fade-in">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span className="font-black text-xs text-indigo-950">PLPC Learning App</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    PLPC Learning App - नवीन विद्यार्थी नोंदणी
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-700 font-bold">
                    Perfect Learning Point for Competitive Exams (NEET | JEE | MHT-CET)
                  </p>
                  <p className="text-xs text-slate-500">
                    सर्व १०+ ग्रँड मॉक टेस्ट्स व विश्लेषण मिळवण्यासाठी त्वरित नोंदणी करा.
                  </p>
                </div>

                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{regError}</span>
                  </div>
                )}
                {regSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{regSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      पूर्ण नाव (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राहुल सचिन पाटील"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs sm:text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मोबाईल नंबर (WhatsApp No.) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="उदा. 9876543210"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs sm:text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      लक्ष्य परीक्षा (Target Exam) *
                    </label>
                    <select
                      value={regExam}
                      onChange={(e) => setRegExam(e.target.value as ExamType)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs sm:text-sm font-semibold outline-none bg-white"
                    >
                      <option value="MHT_CET">MHT-CET (Engineering / Pharmacy)</option>
                      <option value="NEET">NEET-UG (Medical MBBS / BDS)</option>
                      <option value="JEE_MAIN">JEE Main (IIT / NIT Engineering)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      पासवर्ड (Password)
                    </label>
                    <input
                      type="text"
                      placeholder="डिफॉल्ट: 123456"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs sm:text-sm font-semibold outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      क्लासेस कोड किंवा रेफरल कोड (ऐच्छिक / Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. COEP100 किंवा REF-123456"
                      value={regInstituteCode}
                      onChange={(e) => setRegInstituteCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs sm:text-sm font-semibold uppercase outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>मोफत नोंदणी पूर्ण करा (Complete Registration)</span>
                </button>
              </form>
            )}

            {/* TAB 3: COACHING CLASS ADMIN LOGIN */}
            {activeTab === "class_portal" && (
              <form onSubmit={handleClassLogin} className="space-y-4 animate-in fade-in">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    क्लासेस संचालक पोर्टल (Class Admin Portal)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    तुमच्या क्लासेस कोडद्वारे लॉगिन करून बॅच व विद्यार्थ्यांचे रिपोर्ट पहा.
                  </p>
                </div>

                {classError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{classError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      क्लासेस कोड (Institute Code)
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="उदा. MAHA101 किंवा TOPPER2026"
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-sm font-semibold uppercase outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      क्लासेस ॲडमिन पासवर्ड (Admin Passcode)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="क्लासेस पासवर्ड (उदा. class2026)"
                        value={classPasscode}
                        onChange={(e) => setClassPasscode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>क्लासेस डॅशबोर्ड उघडा (Class Admin Login)</span>
                </button>
              </form>
            )}
          </div>

          {/* Bottom Help & Contact Bar */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>सपोर्ट हेल्पलाईन: <strong>9307220454</strong></span>
            </div>
            <div className="text-[11px] text-slate-400">
              © 2026 PLPC Learning App • Secure Educational Portal
            </div>
          </div>

          {/* Legal Disclaimer & Naming Terms (बारीक अक्षरांमध्ये अस्वीकरण व अटी) */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed space-y-1 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
            <p className="font-bold text-slate-700 flex items-center gap-1.5">
              <span>⚖️ शैक्षणिक अस्वीकरण व अटी (Educational Disclaimer & Terms):</span>
            </p>
            <p>
              हे ॲप गरीब व ग्रामीण भागातील होतकरू विद्यार्थ्यांच्या स्पर्धा परीक्षा (NEET, JEE, MHT-CET) सराव व शैक्षणिक मार्गदर्शनासाठी बिगर-व्यावसायिक तत्त्वावर चालवले जाते. या ॲपच्या नावाचे (PLPC) इतर कोणत्याही व्यावसायिक क्लासेस किंवा ट्रेडमार्कशी साधर्म्य असल्यास तो निव्वळ योगायोग समजावा.
            </p>
            <p>
              कोणाचेही या नावावर कायदेशीर हक्क असल्यास किंवा अधिकृत आक्षेप असल्यास, योग्य सूचना मिळाल्यास कोणत्याही वादाविना १० आठवड्यांच्या (10 Weeks) आत ॲपचे नाव व ब्रँडिंग तत्काळ बदलून सहकार्य केले जाईल.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
