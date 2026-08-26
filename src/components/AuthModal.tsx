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
  X,
} from "lucide-react";
import { StudentUser, ExamType, DeviceApprovalRequest } from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import { saveStudentToCloud, fetchStudentsFromCloud } from "../services/firebase";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

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
  const [rollNo, setRollNo] = useState<string>("");
  const [examTarget, setExamTarget] = useState<ExamType>("MHT_CET");

  // Status for pending approval student
  const [pendingStudent, setPendingStudent] = useState<StudentUser | null>(null);
  const [utrInput, setUtrInput] = useState<string>("");
  const [utrSubmitted, setUtrSubmitted] = useState<boolean>(false);

  // Device Conflict / Approval State
  const [deviceMismatchError, setDeviceMismatchError] = useState<{
    student: StudentUser;
    oldDevice: string;
    newDeviceId: string;
  } | null>(null);
  const [approvalSent, setApprovalSent] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>("");
  const [adminPinError, setAdminPinError] = useState<string>("");
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);

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

    if (mobile.trim().length < 10) {
      alert("कृपया वैध १० अंकी मोबाईल नंबर टाका.");
      return;
    }

    if (!password.trim() || password.trim().length < 4) {
      alert("कृपया किमान ४ अक्षरांचा सुरक्षित पासवर्ड तयार करा.");
      return;
    }

    const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
    const students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];

    // Check if phone already registered
    const existing = students.find((s) => s.mobile === mobile.trim());
    if (existing) {
      alert("हा मोबाईल नंबर आधीच नोंदणीकृत आहे! कृपया खालील पासवर्ड टाकून लॉगिन करा.");
      setMode("login");
      return;
    }

    // Create New Student in 'pending' status
    const newUser: StudentUser = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      mobile: mobile.trim(),
      password: password.trim(),
      rollNo: rollNo.trim() || undefined,
      examTarget,
      primaryDeviceId: currentDeviceId,
      primaryDeviceName: currentDeviceName,
      isApproved: false, // Must be approved by Admin
      approvalStatus: "pending",
      paymentStatus: "unpaid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    students.push(newUser);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
    saveStudentToCloud(newUser);

    // Show pending approval screen to student
    setPendingStudent(newUser);
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim()) {
      alert("कृपया आपला नोंदणीकृत मोबाईल नंबर टाका.");
      return;
    }

    // Quick Admin Passcode Trap
    if (mobile.trim() === "admin" || mobile.trim() === "9307220454" || mobile.trim() === "2026") {
      if (password.trim() === "2026" || password.trim() === "admin" || password.trim() === "9307220454" || password.trim() === "1234") {
        sessionStorage.setItem("mcq_admin_logged_in", "true");
        if (onOpenAdminDashboard) {
          onOpenAdminDashboard();
        }
        return;
      }
    }

    const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
    let students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];
    let student = students.find((s) => s.mobile === mobile.trim());

    if (!student) {
      // Check cloud Firestore
      const cloudStudents = await fetchStudentsFromCloud();
      const cloudMatch = cloudStudents.find((s) => s.mobile === mobile.trim());
      if (cloudMatch) {
        student = cloudMatch;
        students.push(cloudMatch);
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
      }
    }

    if (!student) {
      alert("या मोबाईल नंबरवर नोंदणी सापडली नाही. कृपया प्रथम नाव व पासवर्ड टाकून 'नवीन नोंदणी' (Register) करा.");
      setMode("register");
      return;
    }

    // Password Check
    if (student.password && student.password !== password.trim()) {
      alert("चुकीचा पासवर्ड! कृपया योग्य पासवर्ड प्रविष्ट करा किंवा ॲडमिनशी संपर्क साधा.");
      return;
    }

    // Approval Status Check
    if (student.approvalStatus === "pending") {
      setPendingStudent(student);
      return;
    }

    if (student.approvalStatus === "rejected") {
      alert("तुमचे खाते ॲडमिनद्वारे तात्पुरते ब्लॉक / नाकारले गेले आहे. कृपया 9307220454 वर संपर्क साधा.");
      return;
    }

    // Auto-update device on new login (Seamless multi-device support enabled)
    student.primaryDeviceId = currentDeviceId;
    student.primaryDeviceName = currentDeviceName;

    // Login Approved!
    student.lastLoginAt = Date.now();
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
    onLoginSuccess(student);
  };

  const handleSendApprovalRequest = () => {
    if (!deviceMismatchError) return;

    const req: DeviceApprovalRequest = {
      id: `req-${Date.now()}`,
      studentId: deviceMismatchError.student.id,
      studentName: deviceMismatchError.student.name,
      mobile: deviceMismatchError.student.mobile,
      registeredDeviceId: deviceMismatchError.student.primaryDeviceId,
      newDeviceId: currentDeviceId,
      newDeviceName: currentDeviceName,
      requestTime: Date.now(),
      status: "pending",
    };

    onRequestDeviceApproval(req);
    setApprovalSent(true);
  };

  // Instant teacher / admin bypass approval PIN
  const handleVerifyAdminPin = () => {
    const cleanPin = adminPin.trim();
    if (cleanPin === "2026" || cleanPin === "1234" || cleanPin === "admin" || cleanPin === "9307220454") {
      const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
      const students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];

      const targetStudent = pendingStudent || (deviceMismatchError ? deviceMismatchError.student : null);

      if (targetStudent) {
        const idx = students.findIndex((s) => s.id === targetStudent.id);
        const updatedStudent: StudentUser = {
          ...targetStudent,
          primaryDeviceId: currentDeviceId,
          primaryDeviceName: currentDeviceName,
          isApproved: true,
          approvalStatus: "approved",
          paymentStatus: "verified",
          lastLoginAt: Date.now(),
        };

        if (idx >= 0) {
          students[idx] = updatedStudent;
          localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
        }

        onLoginSuccess(updatedStudent);
      }
    } else {
      setAdminPinError("अवैध ॲडमिन पिन. कृपया क्लास शिक्षकांशी संपर्क साधा किंवा 9307220454 / 2026 टाका.");
    }
  };

  // Submit UTR from Pending screen
  const handleSubmitUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrInput.trim() || utrInput.trim().length < 6) {
      alert("कृपया योग्य UTR / Transaction ID टाका.");
      return;
    }

    if (pendingStudent) {
      // 1. Save receipt
      try {
        const existingRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        existing.push({
          id: `pay-${Date.now()}`,
          studentId: pendingStudent.id,
          studentName: pendingStudent.name,
          studentPhone: pendingStudent.mobile,
          upiId: UPI_ID,
          amount: 199,
          planName: "NEET/JEE/MHT-CET संपूर्ण प्रो प्लॅन",
          utr: utrInput.trim(),
          date: new Date().toISOString(),
          status: "pending",
        });
        localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(existing));

        // 2. Update student record with UTR
        const savedStudentsRaw = localStorage.getItem("mcq_app_all_students_v1");
        const students: StudentUser[] = savedStudentsRaw ? JSON.parse(savedStudentsRaw) : [];
        const idx = students.findIndex((s) => s.id === pendingStudent.id);
        if (idx >= 0) {
          students[idx].paymentUtr = utrInput.trim();
          students[idx].paymentStatus = "submitted";
          localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(students));
        }
      } catch (err) {
        console.error("Failed to store payment receipt", err);
      }

      setUtrSubmitted(true);
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

          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            विद्यार्थी लॉगिन व नोंदणी
          </h2>
          <p className="text-slate-300 text-xs mt-1.5 max-w-sm mx-auto">
            {isTrialExpired
              ? "⏱️ १० मिनिटांची मोफत चाचणी वेळ संपली आहे. पुढे सुरू ठेवण्यासाठी लॉगिन करा किंवा ॲडमिन मंजुरी मिळवा."
              : "सुरक्षित परीक्षा तयारीसाठी अधिकृत विद्यार्थी खाते"}
          </p>

          {/* Mode Switch Tabs */}
          {!pendingStudent && !deviceMismatchError && (
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
                    तुमचा मोबाईल नंबर: <strong>{pendingStudent.mobile}</strong>. ॲडमिनने मंजुरी (Approve) दिल्यानंतर तुमचे खाते तात्काळ अनलॉक होईल.
                  </p>
                </div>

                {/* UTR Submission Box */}
                {!utrSubmitted ? (
                  <form onSubmit={handleSubmitUtr} className="pt-2 border-t border-amber-200/60 space-y-2">
                    <div className="text-[11px] font-black text-slate-800">
                      💳 पेमेंट केले असल्यास UTR प्रविष्ट करा (तात्काळ मंजुरीसाठी):
                    </div>
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-300">
                      <input
                        type="text"
                        placeholder="12 अंकी UTR / Ref No"
                        value={utrInput}
                        onChange={(e) => setUtrInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs font-mono font-bold focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                      >
                        पाठवा
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-3 bg-emerald-100/90 rounded-2xl border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>UTR ({utrInput}) प्राप्त झाले! ॲडमिन पडताळणी करत आहेत.</span>
                  </div>
                )}

                {/* Direct Pay QR Code Pill */}
                <div className="p-3 rounded-2xl bg-white border border-amber-200 text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold flex items-center justify-center gap-1.5 text-emerald-800">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>अधिकृत UPI ID वर ₹199 पाठवा:</span>
                  </div>
                  <div className="font-mono font-black text-sm text-slate-900 bg-slate-100 py-1 px-3 rounded-lg select-all">
                    {UPI_ID}
                  </div>
                </div>

                {/* WhatsApp Admin Direct Contact */}
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(
                      `नमस्कार ॲडमिन, मी ${pendingStudent.name} (${pendingStudent.mobile}) MHT-CET/NEET ॲपमध्ये नोंदणी केली आहे. कृपया माझे खाते मंजूर (Approve) करा.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>ॲडमिनशी WhatsApp वर संपर्क करा (९३०७२२०४५४)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setPendingStudent(null);
                      setMode("login");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
                  >
                    दुसऱ्या नंबरने लॉगिन करा
                  </button>
                </div>
              </div>

              {/* Master PIN Override Box for Teacher/Admin In-Person */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                  <span>शिक्षक / ॲडमिन थेट पिनद्वारे त्वरित अनलॉक करा:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="मास्टर पिन (उदा. 9307220454 किंवा 2026)"
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setAdminPinError("");
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyAdminPin}
                    className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-black shadow-xs cursor-pointer"
                  >
                    अनलॉक
                  </button>
                </div>
                {adminPinError && (
                  <p className="text-[11px] text-rose-600 font-bold">{adminPinError}</p>
                )}
              </div>
            </div>
          ) : deviceMismatchError ? (
            /* SCREEN 2: DEVICE CONFLICT ERROR */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-rose-950">
                  डिव्हाइस सुरक्षा चेतावणी (Device Binding Mismatch)
                </h3>
                <p className="text-xs text-rose-800 leading-relaxed font-medium">
                  विद्यार्थी <strong>{deviceMismatchError.student.name}</strong> चे खाते आधीच{" "}
                  <span className="font-bold underline">{deviceMismatchError.oldDevice}</span> वर नोंदणीकृत आहे.
                </p>
              </div>

              {!approvalSent ? (
                <button
                  type="button"
                  onClick={handleSendApprovalRequest}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>शिक्षकांना डिव्हाइस बदल विनंती पाठवा</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold text-center">
                  ✅ शिक्षकांकडे विनंती पाठवली आहे. कृपया शिक्षकांशी संपर्क साधा.
                </div>
              )}

              {/* In-person Teacher PIN Unlock */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-700">
                  किंवा शिक्षकांचा मास्टर पिन प्रविष्ट करा:
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="मास्टर पिन (उदा. 9307220454 / 2026)"
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setAdminPinError("");
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyAdminPin}
                    className="px-4 py-2 rounded-xl bg-indigo-700 text-white text-xs font-black cursor-pointer"
                  >
                    अनलॉक
                  </button>
                </div>
                {adminPinError && (
                  <p className="text-[11px] text-rose-600 font-bold">{adminPinError}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setDeviceMismatchError(null)}
                className="w-full text-center text-xs text-slate-500 hover:underline font-bold"
              >
                मागे जा
              </button>
            </div>
          ) : mode === "login" ? (
            /* SCREEN 3: STUDENT LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1.5">
                  नोंदणीकृत मोबाईल नंबर (Mobile Number):
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="१० अंकी मोबाईल नंबर टाका"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 font-mono font-bold text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1.5">
                  पासवर्ड (Password):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="आपला पासवर्ड टाका"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 font-mono font-bold text-sm text-slate-900 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 hover:from-indigo-800 hover:to-purple-900 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                <span>लॉगिन करा व अभ्यास सुरू करा</span>
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-slate-500 hover:text-indigo-700 cursor-pointer"
                >
                  🔑 पासवर्ड विसरलात? (Forgot Password)
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-xs font-black text-indigo-700 hover:underline cursor-pointer"
                >
                  नवीन नोंदणी (Sign Up)
                </button>
              </div>

              {/* Direct UPI Payment Banner */}
              {onOpenPaymentModal && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onClose) onClose();
                      onOpenPaymentModal();
                    }}
                    className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-400 transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-emerald-950">
                          थेट UPI द्वारे ॲक्सेस मिळवा
                        </div>
                        <div className="text-[10px] font-mono text-emerald-700">
                          ID: 9307220454@yz (₹२९)
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 underline">
                      QR कोड
                    </span>
                  </button>
                </div>
              )}

              {/* Master Admin Panel Trigger */}
              {onOpenAdminDashboard && (
                <div className="text-center pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (onClose) onClose();
                      onOpenAdminDashboard();
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-indigo-700 flex items-center justify-center gap-1 mx-auto"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>शिक्षक / ॲडमिन डॅशबोर्ड लॉगिन</span>
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* SCREEN 4: STUDENT REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  विद्यार्थ्याचे पूर्ण नाव (Username / Full Name):
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अमित संजय देशमुख"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-bold text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    मोबाईल नंबर (Mobile):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="१० अंकी मोबाईल नंबर"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    पासवर्ड तयार करा (Password):
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="किमान ४ अक्षरे"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs text-slate-900 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  लक्ष्य परीक्षा (Target Exam):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["MHT_CET", "NEET", "JEE_MAIN"] as ExamType[]).map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setExamTarget(ex)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        examTarget === ex
                          ? "bg-indigo-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {ex === "MHT_CET" ? "MHT-CET" : ex === "NEET" ? "NEET" : "JEE Main"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                ℹ️ <strong>महत्त्वाची सूचना:</strong> नोंदणी केल्यानंतर विनंती ॲडमिनकडे जाईल. ॲडमिनने मंजूर केल्यावर किंवा पेमेंट पडताळणी झाल्यावर ॲप पूर्णपणे सुरू होईल.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <UserPlus className="w-4 h-4" />
                <span>नोंदणी करा व मंजुरीसाठी पाठवा (Submit)</span>
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-slate-500 font-medium">आधीच नोंदणी आहे? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-xs font-black text-indigo-700 hover:underline cursor-pointer"
                >
                  लॉगिन करा (Login)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Forgot Password OTP/Email Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        initialIdentifier={mobile}
        onPasswordResetSuccess={(student) => {
          setShowForgotModal(false);
          onLoginSuccess(student);
        }}
      />
    </div>
  );
};
