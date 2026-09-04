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
} from "lucide-react";
import { StudentUser, ExamType, DeviceApprovalRequest } from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";

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

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [examTarget, setExamTarget] = useState<ExamType>("MHT_CET");

  // Status for pending approval student
  const [pendingStudent, setPendingStudent] = useState<StudentUser | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);

  // PhonePe / UPI Direct URIs
  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=29&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=29&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    "PLPCAPP - Mi Marathiwala"
  )}&am=29&cu=INR&tn=${encodeURIComponent("PLPCAPP Registration")}`;

  if (!isOpen) return null;

  const currentDeviceId = getOrCreateDeviceId();
  const currentDeviceName = getDeviceName();

  // Registration Handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      alert("कृपया आपले पूर्ण नाव आणि मोबाईल नंबर प्रविष्ट करा.");
      return;
    }

    const cleanDigits = mobile.trim().replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      alert("कृपया वैध १० अंकी मोबाईल नंबर टाका.");
      return;
    }

    if (!password.trim() || password.trim().length < 3) {
      alert("कृपया किमान ३ अक्षरांचा सुरक्षित पासवर्ड तयार करा.");
      return;
    }

    const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
    const students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];

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

        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(existing));
        saveStudentToCloud(existing);
        onLoginSuccess(existing);
        return;
      } else {
        setPendingStudent(existing);
        return;
      }
    }

    // Create New Student: approvalStatus: "pending", isApproved: false
    const newUser: StudentUser = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      mobile: mobile.trim(),
      password: password.trim(),
      examTarget,
      primaryDeviceId: currentDeviceId,
      primaryDeviceName: currentDeviceName,
      isApproved: false,
      approvalStatus: "pending",
      paymentStatus: "paid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    students.push(newUser);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
    localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(newUser));
    saveStudentToCloud(newUser);

    // Direct launch PhonePe deep link
    try {
      window.location.href = phonepeUri;
    } catch (err) {
      console.error(err);
    }

    setPendingStudent(newUser);
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let cleanMobile = mobile.trim().replace(/[\s\-\(\)]/g, "");
    const cleanPassword = password.trim();
    const cleanDigits = cleanMobile.replace(/\D/g, "");

    if (!cleanDigits && !cleanMobile) {
      alert("कृपया आपला नोंदणीकृत मोबाईल नंबर टाका.");
      return;
    }

    const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
    let students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];
    let student = students.find((s) => {
      const sDigits = (s.mobile || "").replace(/\D/g, "");
      return (
        (cleanDigits.length >= 10 && sDigits.slice(-10) === cleanDigits.slice(-10)) ||
        s.mobile === cleanMobile
      );
    });

    if (!student) {
      // Check cloud Firestore
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
        students.push(cloudMatch);
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
      }
    }

    if (!student) {
      alert("हे विद्यार्थी खाते सापडले नाही. कृपया 'नवीन नोंदणी' (Sign Up) करा.");
      return;
    }

    // Password Check
    if (student.password && student.password !== cleanPassword) {
      alert("चुकीचा पासवर्ड! कृपया योग्य पासवर्ड प्रविष्ट करा.");
      return;
    }

    // STRICT APPROVAL CHECK: Block unapproved student
    if (student.approvalStatus !== "approved" || !student.isApproved) {
      setPendingStudent(student);
      return;
    }

    // Multi-device access: Update device info
    student.primaryDeviceId = currentDeviceId;
    student.primaryDeviceName = currentDeviceName;
    student.lastLoginAt = Date.now();

    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
    localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(student));
    saveStudentToCloud(student);

    onLoginSuccess(student);
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
      if (match && (match.approvalStatus === "approved" || match.isApproved)) {
        match.approvalStatus = "approved";
        match.isApproved = true;
        match.paymentStatus = "paid";
        match.primaryDeviceId = currentDeviceId;
        match.primaryDeviceName = currentDeviceName;
        match.lastLoginAt = Date.now();

        localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(match));
        saveStudentToCloud(match);
        alert("🎉 अभिनंदन! आपले खाते मंजूर झाले आहे!");
        onLoginSuccess(match);
      } else {
        alert("अद्याप ॲडमिन मंजुरी प्रलंबित आहे. कृपया ॲडमिनशी संपर्क साधा.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white text-center relative">
          {onClose && !isTrialExpired && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 text-white flex flex-col items-center justify-center mx-auto mb-2.5 shadow-lg ring-2 ring-white/20">
            <span className="text-[12px] font-black tracking-tight leading-none">PLPC</span>
            <span className="text-[8px] text-amber-300 font-bold uppercase leading-none tracking-widest mt-0.5">APP</span>
          </div>

          {/* Big App Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            PLPCAPP
          </h1>

          {/* Subtitle */}
          <p className="text-xs font-bold text-amber-300 mt-0.5">
            By Mi Marathiwala Classes, Ambad
          </p>
          <p className="text-xs text-indigo-200 font-medium max-w-sm mx-auto leading-relaxed">
            Perfect Learning Point for Competitive Exams (NEET | JEE | MHT-CET)
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-slate-200">
            <span>
              {mode === "login"
                ? "🔑 विद्यार्थी लॉगिन (Student Login)"
                : "📝 नवीन विद्यार्थी नोंदणी (New Registration)"}
            </span>
          </div>

          {isTrialExpired && (
            <p className="text-rose-300 text-xs mt-2 max-w-sm mx-auto font-semibold bg-rose-950/60 py-1 px-3 rounded-lg border border-rose-800/60">
              ⏱️ १० मिनिटांची मोफत चाचणी वेळ संपली आहे. पुढे सुरू ठेवण्यासाठी लॉगिन करा किंवा ॲडमिन मंजुरी मिळवा.
            </p>
          )}

          {/* Mode Switch Tabs */}
          {!pendingStudent && (
            <div className="mt-4 inline-flex p-1 rounded-2xl bg-white/10 border border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                लॉगिन (Login)
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`px-5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mode === "register"
                    ? "bg-white text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                नवीन नोंदणी (Sign Up)
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* SCREEN 1: PENDING ADMIN APPROVAL STATE */}
          {pendingStudent ? (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md animate-pulse">
                  <Clock className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900 uppercase tracking-wide">
                    मंजुरी प्रलंबित (Pending Admin Approval)
                  </span>
                  <h3 className="text-base font-black text-slate-900 pt-1">
                    नमस्कार {pendingStudent.name}, तुमची नोंदणी ॲडमिनकडे पाठवण्यात आली आहे!
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    मोबाईल: <strong>{pendingStudent.mobile}</strong>. ॲडमिनने मंजुरी दिल्यावर तुमचे खाते तात्काळ अनलॉक होईल.
                  </p>
                </div>

                {/* Direct PhonePe / UPI Payment Button */}
                <div className="p-3 bg-purple-100/70 rounded-2xl border border-purple-300 space-y-2">
                  <a
                    href={phonepeUri}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#5f259f] hover:bg-[#4a1c7d] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer"
                  >
                    <span>📱 PhonePe वर ₹२९ भरा (Open PhonePe)</span>
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={gpayUri}
                      className="py-1.5 px-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold text-[11px] flex items-center justify-center"
                    >
                      <span>Google Pay</span>
                    </a>
                    <a
                      href={upiUri}
                      className="py-1.5 px-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold text-[11px] flex items-center justify-center"
                    >
                      <span>इतर UPI</span>
                    </a>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-purple-950">
                    UPI ID: {UPI_ID}
                  </div>
                </div>

                {/* WhatsApp Admin Direct Contact */}
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(
                      `नमस्कार ॲडमिन सर, मी ${pendingStudent.name} (${pendingStudent.mobile}) PLPCAPP (By Mi Marathiwala Classes Ambad) मध्ये नोंदणी केली असून ₹२९ भरले आहेत. कृपया माझे खाते मंजूर (Approve) करा.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp वर ॲडमिनला मेसेज पाठवा ({ADMIN_PHONE})</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCheckCloudApproval}
                    disabled={isCheckingStatus}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isCheckingStatus ? "animate-spin" : ""}`} />
                    <span>{isCheckingStatus ? "तपासत आहे..." : "मंजुरी स्थिती तपासा (Check Approval)"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPendingStudent(null);
                      setMode("login");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline font-bold mt-1"
                  >
                    लॉगिन स्क्रीनवर परत जा
                  </button>
                </div>
              </div>
            </div>
          ) : mode === "login" ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  नोंदणीकृत मोबाईल नंबर:
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="उदा. 9881063427"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-slate-900 text-sm font-bold focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  पासवर्ड:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="आपला पासवर्ड प्रविष्ट करा"
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
                <span>लॉगिन करा (Sign In)</span>
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  विद्यार्थ्याचे पूर्ण नाव:
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल सचिन पाटील"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  मोबाईल नंबर (WhatsApp):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="उदा. 9881063427"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:border-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  पासवर्ड तयार करा:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="किमान ३ अक्षरी पासवर्ड"
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
                  टारगेट परीक्षा:
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

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>📱 नोंदणी करा व PhonePe ने ₹२९ भरा →</span>
              </button>
            </form>
          )}

          {/* Legal Disclaimer & Naming Terms (खूप बारीक अक्षरांमध्ये अस्वीकरण व अटी) */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 leading-snug space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <p className="font-bold text-slate-700 flex items-center gap-1">
              <span>⚖️ शैक्षणिक अस्वीकरण व अटी:</span>
            </p>
            <p className="text-slate-600 text-[9px] leading-tight">
              हे ॲप गरजू विद्यार्थ्यांच्या मोफत/सुलभ परीक्षा सरावासाठी आहे. नावाचे इतर कोणत्याही संस्थेशी साधर्म्य आढळल्यास तो निव्वळ योगायोग समजावा. कायदेशीर आक्षेप असल्यास विना-वाद १० आठवड्यांत (10 weeks) नाव बदलले जाईल.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
