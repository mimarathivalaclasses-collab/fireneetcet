import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
  Search,
  Filter,
  CreditCard,
  Phone,
  MessageSquare,
  Lock,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  Zap,
  DollarSign,
  UserCheck,
  UserX,
  X,
  PlusCircle,
  Sparkles,
  MessageCircle,
  AlertCircle,
  Share2,
  Copy,
  Edit3,
  Wallet,
  Send,
  Menu,
  Award,
  Layers,
  ArrowRight,
  Check,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  StudentUser,
  StudentTestSubmission,
  ExamType,
  PaymentReceiptRecord,
  DeviceApprovalRequest,
  AgentUser,
  AgentPayoutRequest,
  UserFeedbackReport,
} from "../types";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import {
  saveStudentToCloud,
  fetchStudentsFromCloud,
  updateStudentApprovalInCloud,
  deleteStudentFromCloud,
  fetchFeedbackReportsFromCloud,
  updateFeedbackReportStatusInCloud,
  deleteFeedbackReportFromCloud,
  fetchStudentTestSubmissionsFromCloud,
} from "../services/firebase";
import { AdminStudentProgressView } from "./AdminStudentProgressView";

interface AdminApprovalDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: StudentUser | null;
  onApproveStudent?: (studentId: string) => void;
  onRejectStudent?: (studentId: string) => void;
}

export const AdminApprovalDashboard: React.FC<AdminApprovalDashboardProps> = ({
  isOpen,
  onClose,
  currentUser,
  onApproveStudent,
  onRejectStudent,
}) => {
  // Navigation Tabs in Admin Console (Classes tab permanently removed)
  const [activeTab, setActiveTab] = useState<
    "pending_approvals" | "all_students" | "student_progress" | "payments" | "feedback_inbox" | "agents"
  >("pending_approvals");

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("mcq_admin_logged_in") === "true";
  });
  const [passcode, setPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Core Data Lists
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [testSubmissions, setTestSubmissions] = useState<StudentTestSubmission[]>([]);
  const [feedbackReports, setFeedbackReports] = useState<UserFeedbackReport[]>([]);
  const [payments, setPayments] = useState<PaymentReceiptRecord[]>([]);
  const [agents, setAgents] = useState<AgentUser[]>([]);
  const [agentPayouts, setAgentPayouts] = useState<AgentPayoutRequest[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [examFilter, setExamFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [feedbackFilter, setFeedbackFilter] = useState<"ALL" | "pending" | "resolved">("ALL");

  // Modals for Adding / Editing
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentMobile, setNewStudentMobile] = useState<string>("");
  const [newStudentPassword, setNewStudentPassword] = useState<string>("123456");
  const [newStudentExam, setNewStudentExam] = useState<ExamType>("MHT_CET");

  const [editingStudent, setEditingStudent] = useState<StudentUser | null>(null);
  const [editingAgent, setEditingAgent] = useState<AgentUser | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string>("");
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Lockout countdown
  useEffect(() => {
    let interval: any;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  // Refresh data from localStorage & Firebase Cloud
  const loadAllData = async () => {
    try {
      const studentsRaw = localStorage.getItem("mcq_app_all_students_v1");
      let localStudents: StudentUser[] = studentsRaw ? JSON.parse(studentsRaw) : [];

      // Merge with Firebase Cloud Students
      const cloudStudents = await fetchStudentsFromCloud();
      if (cloudStudents && cloudStudents.length > 0) {
        const map = new Map<string, StudentUser>();
        localStudents.forEach((s) => map.set(s.mobile || s.id, s));
        cloudStudents.forEach((cs) => {
          const key = cs.mobile || cs.id;
          map.set(key, { ...(map.get(key) || {}), ...cs });
        });
        localStudents = Array.from(map.values());
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(localStudents));
      }
      setStudents(localStudents);

      // Load Feedback & Error Reports
      const fbRaw = localStorage.getItem("mcq_app_user_feedbacks_v1");
      let localFeedbacks: UserFeedbackReport[] = fbRaw ? JSON.parse(fbRaw) : [];
      const cloudFeedbacks = await fetchFeedbackReportsFromCloud();
      if (cloudFeedbacks && cloudFeedbacks.length > 0) {
        const fbMap = new Map<string, UserFeedbackReport>();
        localFeedbacks.forEach((f) => fbMap.set(f.id, f));
        cloudFeedbacks.forEach((cf) => fbMap.set(cf.id, cf));
        localFeedbacks = Array.from(fbMap.values());
        localStorage.setItem("mcq_app_user_feedbacks_v1", JSON.stringify(localFeedbacks));
      }
      setFeedbackReports(localFeedbacks);

      const paymentsRaw = localStorage.getItem("mcq_app_payment_receipts_v1");
      setPayments(paymentsRaw ? JSON.parse(paymentsRaw) : []);

      // Load Test Submissions & Activity
      const subRaw = localStorage.getItem("mcq_app_all_student_submissions_v1");
      let localSubs: StudentTestSubmission[] = subRaw ? JSON.parse(subRaw) : [];
      const cloudSubs = await fetchStudentTestSubmissionsFromCloud();
      if (cloudSubs && cloudSubs.length > 0) {
        const subMap = new Map<string, StudentTestSubmission>();
        localSubs.forEach((s) => subMap.set(s.id, s));
        cloudSubs.forEach((cs) => subMap.set(cs.id, cs));
        localSubs = Array.from(subMap.values()).sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
        localStorage.setItem("mcq_app_all_student_submissions_v1", JSON.stringify(localSubs.slice(0, 500)));
      }
      setTestSubmissions(localSubs);

      const agentsRaw = localStorage.getItem("mcq_app_all_agents_v1");
      setAgents(agentsRaw ? JSON.parse(agentsRaw) : []);

      const payoutsRaw = localStorage.getItem("mcq_app_agent_payouts_v1");
      setAgentPayouts(payoutsRaw ? JSON.parse(payoutsRaw) : []);
    } catch (e) {
      console.error("Error loading admin data", e);
    }
  };

  // 1-Click WhatsApp Approval Notification
  const sendWhatsAppApprovalNotification = (student: StudentUser) => {
    if (!student.mobile) {
      showToast("विद्यार्थ्याचा मोबाईल नंबर उपलब्ध नाही.");
      return;
    }
    const cleanNumber = student.mobile.replace(/\D/g, "");
    const formattedNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const message = encodeURIComponent(
      `🎓 *अभिनंदन ${student.name}!* \n\n` +
      `आपले *MHT-CET / NEET / JEE सराव ॲप* चे खाते ॲडमिनद्वारे *मंजूर (Approved)* करण्यात आले आहे! 🎉\n\n` +
      `📱 *लॉगिन मोबाईल:* ${student.mobile}\n` +
      `🔑 *पासवर्ड:* ${student.password || "आपण नोंदणी करताना ठेवलेला पासवर्ड"}\n` +
      `🎯 *टारगेट परीक्षा:* ${student.examTarget}\n` +
      `⚡ *सर्व टेस्ट्स अनलॉक:* २५,०००+ प्रश्न, Grand Tests, PYQs आणि नोट्स पूर्णपणे सुरू झाले आहेत!\n\n` +
      `आताच ॲप उघडा आणि कुठल्याही मोबाईलवरून लॉगिन करून सराव सुरू करा!\n` +
      `शुभेच्छा! 🏆`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
    showToast("WhatsApp मेसेज पाठवण्यासाठी विंडो उघडली!");
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // STRICT PIN VERIFICATION (PIN: 14101994)
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) {
      setPasscodeError(`अनेक वेळा चुकीचा पिन टाकला. कृपया ${lockoutTimer} सेकंद थांबा.`);
      return;
    }

    const cleanPin = passcode.trim();
    if (cleanPin === "14101994") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("mcq_admin_logged_in", "true");
      setPasscodeError("");
      setFailedAttempts(0);
      loadAllData();
      showToast("🔐 मास्टर ॲडमिन कन्सोलमध्ये स्वागत आहे!");
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      if (nextFailed >= 5) {
        setLockoutTimer(30);
        setPasscodeError("सुरक्षेच्या कारणास्तव ५ चुकीच्या प्रयत्नांनंतर ३० सेकंद लॉक करण्यात आले आहे.");
      } else {
        setPasscodeError(`अवैध ॲडमिन सिक्युरिटी पिन! (${5 - nextFailed} प्रयत्न शिल्लक)`);
      }
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("mcq_admin_logged_in");
    setPasscode("");
    showToast("ॲडमिन सेशन बंद झाले.");
  };

  // ================= STUDENT ACTIONS (Approve / Reject / Edit / Delete) =================
  const handleApprove = (studentId: string) => {
    const updated = students.map((s) =>
      s.id === studentId
        ? {
            ...s,
            approvalStatus: "approved" as const,
            isApproved: true,
            isFeePaid: true,
            paymentStatus: "paid" as const,
            approvedAt: Date.now(),
          }
        : s
    );
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    // Sync in Firebase Cloud
    const targetStudent = updated.find((s) => s.id === studentId);
    if (targetStudent) {
      updateStudentApprovalInCloud(targetStudent.mobile || targetStudent.id, "approved", true);
      saveStudentToCloud(targetStudent);
    }

    // Sync with current student user in session if matches
    const currentRaw = localStorage.getItem("mcq_app_current_student_user_v1");
    if (currentRaw) {
      try {
        const cur: StudentUser = JSON.parse(currentRaw);
        if (cur.id === studentId || cur.mobile === targetStudent?.mobile) {
          cur.approvalStatus = "approved";
          cur.isApproved = true;
          cur.isFeePaid = true;
          cur.paymentStatus = "paid";
          localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(cur));
        }
      } catch (e) {}
    }

    if (onApproveStudent) onApproveStudent(studentId);
    showToast("✅ विद्यार्थी यशस्वीरित्या मंजूर (Approved) करण्यात आला!");
  };

  const handleReject = (studentId: string) => {
    const updated = students.map((s) =>
      s.id === studentId
        ? {
            ...s,
            approvalStatus: "rejected" as const,
            isApproved: false,
          }
        : s
    );
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    // Update in Firebase Cloud
    const targetStudent = updated.find((s) => s.id === studentId);
    if (targetStudent) {
      updateStudentApprovalInCloud(targetStudent.mobile || targetStudent.id, "rejected", false);
      saveStudentToCloud(targetStudent);
    }

    if (onRejectStudent) onRejectStudent(studentId);
    showToast("विद्यार्थी ब्लॉक / रिजेक्ट करण्यात आला.");
  };

  const handleDeleteStudent = (studentId: string, name: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की '${name}' या विद्यार्थ्याला कायमचे डेटाबेसमधून हटवायचे आहे?`)) {
      const targetStudent = students.find((s) => s.id === studentId);
      if (targetStudent) {
        deleteStudentFromCloud(targetStudent.mobile || targetStudent.id);
      }

      const updated = students.filter((s) => s.id !== studentId);
      setStudents(updated);
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));
      showToast(`'${name}' हा विद्यार्थी पूर्णपणे हटवला गेला.`);
    }
  };

  const handleSaveEditedStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const updated = students.map((s) => (s.id === editingStudent.id ? editingStudent : s));
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    // Sync to Cloud
    saveStudentToCloud(editingStudent);

    // Update current active user if matching
    const currentRaw = localStorage.getItem("mcq_app_current_student_user_v1");
    if (currentRaw) {
      try {
        const cur: StudentUser = JSON.parse(currentRaw);
        if (cur.id === editingStudent.id || cur.mobile === editingStudent.mobile) {
          localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(editingStudent));
        }
      } catch (e) {}
    }

    setEditingStudent(null);
    showToast("विद्यार्थी माहिती व पासवर्ड यशस्वीरित्या अपडेट झाली!");
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentMobile.trim()) {
      alert("कृपया विद्यार्थ्याचे नाव आणि मोबाईल नंबर भरा.");
      return;
    }
    const newStudent: StudentUser = {
      id: `stud_${Date.now()}`,
      name: newStudentName.trim(),
      mobile: newStudentMobile.trim(),
      password: newStudentPassword.trim() || "123456",
      role: "student",
      examTarget: newStudentExam,
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      isFeePaid: true,
      paymentStatus: "paid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    const updated = [newStudent, ...students];
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    // Save to Cloud
    saveStudentToCloud(newStudent);

    setIsAddingStudent(false);
    setNewStudentName("");
    setNewStudentMobile("");
    setNewStudentPassword("123456");
    showToast("नवीन विद्यार्थी जोडला व मंजूर केला गेला!");
  };

  // Feedback Resolution Actions
  const handleToggleFeedbackStatus = async (report: UserFeedbackReport) => {
    const newStatus: "pending" | "resolved" = report.status === "resolved" ? "pending" : "resolved";
    const updated: UserFeedbackReport[] = feedbackReports.map((f) =>
      f.id === report.id ? { ...f, status: newStatus } : f
    );
    setFeedbackReports(updated);
    localStorage.setItem("mcq_app_user_feedbacks_v1", JSON.stringify(updated));
    await updateFeedbackReportStatusInCloud(report.id, newStatus);
    showToast(newStatus === "resolved" ? "✅ त्रुटी दुरुस्त म्हणून मार्क केली!" : "⏳ त्रुटी प्रलंबित ठेवली.");
  };

  const handleDeleteFeedback = async (reportId: string) => {
    if (confirm("हा अभिप्राय / त्रुटी अहवाल नक्की हटवायचा आहे का?")) {
      const updated = feedbackReports.filter((f) => f.id !== reportId);
      setFeedbackReports(updated);
      localStorage.setItem("mcq_app_user_feedbacks_v1", JSON.stringify(updated));
      await deleteFeedbackReportFromCloud(reportId);
      showToast("अहवाल हटवला गेला.");
    }
  };

  const sendWhatsAppFeedbackReply = (report: UserFeedbackReport) => {
    if (!report.studentMobile) {
      showToast("विद्यार्थ्याचा संपर्क क्रमांक उपलब्ध नाही.");
      return;
    }
    const cleanNumber = report.studentMobile.replace(/\D/g, "");
    const formattedNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const message = encodeURIComponent(
      `नमस्ते *${report.studentName || "विद्यार्थी मित्र"}*,\n\n` +
      `तुम्ही ॲपमध्ये नोंदवलेल्या *"${report.subject} - ${report.issueCategory}"* संदर्भातील मुद्द्याची पडताळणी झाली असून योग्य दुरुस्ती केली आहे. ✅\n\n` +
      `📝 *नोंदवलेला प्रश्न:* "${report.description}"\n\n` +
      `🙏 अभिप्राय दिल्याबद्दल धन्यवाद! ॲपमध्ये सराव सुरू ठेवा.`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  // Agent Payout Actions
  const handleApprovePayout = (payoutId: string, utrInput?: string) => {
    const utr = utrInput || prompt("कृपया ट्रान्सफर केलेला बँक UTR नंबर प्रविष्ट करा:") || `UTR${Date.now()}`;
    const updated = agentPayouts.map((p) =>
      p.id === payoutId
        ? {
            ...p,
            status: "approved" as const,
            adminUtr: utr,
            processedAt: Date.now(),
          }
        : p
    );
    setAgentPayouts(updated);
    localStorage.setItem("mcq_app_agent_payouts_v1", JSON.stringify(updated));
    showToast("विड्रॉल पेआउट मंजूर व पेड म्हणून मार्क झाले!");
  };

  const handleDeletePayout = (payoutId: string) => {
    if (window.confirm("ही विड्रॉल विनंती हटवायची आहे का?")) {
      const updated = agentPayouts.filter((p) => p.id !== payoutId);
      setAgentPayouts(updated);
      localStorage.setItem("mcq_app_agent_payouts_v1", JSON.stringify(updated));
      showToast("विड्रॉल विनंती हटवली गेली.");
    }
  };

  const handleDeletePayment = (paymentId: string) => {
    if (window.confirm("ही पेमेंट पावती हटवायची आहे का?")) {
      const updated = payments.filter((p) => p.id !== paymentId);
      setPayments(updated);
      localStorage.setItem("mcq_app_payment_receipts_v1", JSON.stringify(updated));
      showToast("पेमेंट पावती हटवली गेली.");
    }
  };

  // Filtered Students
  const pendingStudents = students.filter((s) => s.approvalStatus === "pending" || !s.isApproved);
  const approvedStudents = students.filter((s) => s.approvalStatus === "approved" && s.isApproved);

  const filteredStudents = students.filter((std) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      std.name.toLowerCase().includes(q) ||
      std.mobile.includes(q);

    const matchesExam = examFilter === "ALL" || std.examTarget === examFilter;
    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "approved"
        ? std.approvalStatus === "approved" && std.isApproved
        : statusFilter === "pending"
        ? std.approvalStatus === "pending" || !std.isApproved
        : std.approvalStatus === "rejected";

    return matchesSearch && matchesExam && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/85 backdrop-blur-md">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. SECURE ADMIN PIN LOCK SCREEN (NO PIN DISPLAYED) */}
      {!isAdminAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg font-black">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                सुरक्षित मास्टर ॲडमिन कन्सोल
              </h2>
              <p className="text-xs text-slate-400">
                विद्यार्थी मंजुरी (Approval), एडिट-डिलिट व पेमेंट व्यवस्थापन
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ॲडमिन सिक्युरिटी पिन प्रविष्ट करा:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPasscode ? "text" : "password"}
                    required
                    disabled={lockoutTimer > 0}
                    placeholder="सिक्युरिटी पिन टाका"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm font-mono font-bold focus:border-amber-400 outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passcodeError && (
                  <p className="text-rose-400 text-xs mt-1.5 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passcodeError}</span>
                  </p>
                )}
                {lockoutTimer > 0 && (
                  <p className="text-amber-400 text-xs mt-1 font-bold">
                    ⏳ लॉक कालावधी: {lockoutTimer} सेकंद
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={lockoutTimer > 0}
                  className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  डॅशबोर्ड उघडा
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* 2. AUTHENTICATED FULLSCREEN ADMIN CONSOLE */
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          {/* SIDEBAR NAVIGATION */}
          <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white border-r border-slate-800 shrink-0 select-none">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xs font-black text-white">Super Admin</h1>
                  <span className="text-[10px] text-amber-400 font-bold">Student Approval Portal</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
              <button
                onClick={() => setActiveTab("pending_approvals")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "pending_approvals"
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>प्रलंबित मंजुरी (Approvals)</span>
                </div>
                {pendingStudents.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {pendingStudents.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("all_students")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all_students"
                    ? "bg-indigo-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>सर्व विद्यार्थी (Edit/Delete)</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{students.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("student_progress")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "student_progress"
                    ? "bg-blue-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span>विद्यार्थी सराव व निकाल</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/30 text-blue-300">
                  {testSubmissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "payments"
                    ? "bg-emerald-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>पेमेंट पावत्या व UTR</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{payments.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("feedback_inbox")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "feedback_inbox"
                    ? "bg-rose-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-300" />
                  <span>त्रुटी व तक्रार इनबॉक्स</span>
                </div>
                {feedbackReports.filter((f) => f.status === "pending").length > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                    {feedbackReports.filter((f) => f.status === "pending").length}
                  </span>
                ) : (
                  <span className="text-[11px] opacity-80 font-mono">{feedbackReports.length}</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("agents")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "agents"
                    ? "bg-teal-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-teal-400" />
                  <span>एजंट पार्टनर व पेआउट</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{agents.length}</span>
              </button>
            </nav>

            {/* Sidebar Bottom Controls */}
            <div className="p-3 border-t border-slate-800 space-y-2">
              <button
                onClick={loadAllData}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>डेटा रिफ्रेश</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleAdminLogout}
                  className="flex-1 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold cursor-pointer"
                >
                  लॉग आऊट
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                >
                  बंद करा
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-900">
                  {activeTab === "pending_approvals" && "विद्यार्थी मंजुरी विनंत्या (Pending Approvals)"}
                  {activeTab === "all_students" && "विद्यार्थी व्यवस्थापन (संपादन व हटवणे)"}
                  {activeTab === "student_progress" && "विद्यार्थी सराव व निकाल ट्रॅकर (Student Performance & Activity)"}
                  {activeTab === "payments" && "पेमेंट पावत्या व UTR पडताळणी"}
                  {activeTab === "feedback_inbox" && "विद्यार्थी तक्रार व त्रुटी निवारण इनबॉक्स"}
                  {activeTab === "agents" && "एजंट नेटवर्क व कमिशन व्यवस्थापन"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeTab === "all_students" && (
                  <button
                    onClick={() => setIsAddingStudent(true)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ विद्यार्थी जोडा</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  ✕ बंद करा
                </button>
              </div>
            </header>

            {/* Mobile Tab Scroller */}
            <div className="md:hidden bg-slate-900 text-white flex items-center gap-1 p-1.5 overflow-x-auto text-xs font-bold shrink-0">
              <button
                onClick={() => setActiveTab("pending_approvals")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "pending_approvals" ? "bg-amber-500 text-slate-950 font-black" : "text-slate-300"
                }`}
              >
                मंजुरी ({pendingStudents.length})
              </button>
              <button
                onClick={() => setActiveTab("all_students")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "all_students" ? "bg-indigo-600 text-white font-black" : "text-slate-300"
                }`}
              >
                विद्यार्थी ({students.length})
              </button>
              <button
                onClick={() => setActiveTab("student_progress")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "student_progress" ? "bg-blue-600 text-white font-black" : "text-slate-300"
                }`}
              >
                सराव ट्रॅकर
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "payments" ? "bg-emerald-600 text-white font-black" : "text-slate-300"
                }`}
              >
                पेमेंट्स ({payments.length})
              </button>
              <button
                onClick={() => setActiveTab("feedback_inbox")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "feedback_inbox" ? "bg-rose-600 text-white font-black" : "text-slate-300"
                }`}
              >
                तक्रारी ({feedbackReports.filter((f) => f.status === "pending").length})
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`px-3 py-1 rounded-lg shrink-0 ${
                  activeTab === "agents" ? "bg-teal-600 text-white font-black" : "text-slate-300"
                }`}
              >
                एजंट ({agents.length})
              </button>
            </div>

            {/* Scrollable Main Body */}
            <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4">
              {/* TAB 1: PENDING APPROVALS */}
              {activeTab === "pending_approvals" && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        प्रलंबित विद्यार्थी मंजुरी (Pending Student Approvals)
                      </h3>
                      <p className="text-xs text-slate-500">
                        विद्यार्थ्याने नोंदणी किंवा पेमेंट केल्यानंतर मंजुरी दिल्यावरच त्याचे खाते सुरू होईल.
                      </p>
                    </div>
                    {pendingStudents.length > 0 && (
                      <button
                        onClick={() => {
                          pendingStudents.forEach((s) => handleApprove(s.id));
                          showToast("सर्व प्रलंबित विद्यार्थ्यांना एका क्लिकवर मंजूर केले!");
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                      >
                        ✓ सर्वांना एकदम मंजूर करा
                      </button>
                    )}
                  </div>

                  {pendingStudents.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                      <p className="font-bold text-slate-800 text-sm">सर्व विद्यार्थी मंजूर आहेत!</p>
                      <p className="mt-1">कोणतीही प्रलंबित विनंती शिल्लक नाही.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pendingStudents.map((std) => (
                        <div
                          key={std.id}
                          className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{std.name}</h4>
                              <p className="text-xs text-slate-600 font-mono">📱 {std.mobile}</p>
                              <p className="text-xs text-teal-700 font-bold mt-0.5">🎯 {std.examTarget}</p>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                              ⏳ मंजुरी प्रलंबित
                            </span>
                          </div>

                          {std.paymentUtr && (
                            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                              <span className="text-slate-500">UTR / Ref: </span>
                              <strong className="text-emerald-700">{std.paymentUtr}</strong>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => {
                                handleApprove(std.id);
                                sendWhatsAppApprovalNotification(std);
                              }}
                              className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>मंजूर करा (Approve)</span>
                            </button>
                            <button
                              onClick={() => sendWhatsAppApprovalNotification(std)}
                              className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 cursor-pointer"
                              title="WhatsApp वर मंजुरी संदेश पाठवा"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingStudent(std)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="विद्यार्थी माहिती संपादन"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(std.id, std.name)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="हटवा"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ALL STUDENTS (EDIT & DELETE) */}
              {activeTab === "all_students" && (
                <div className="space-y-3">
                  {/* Search & Filter Bar */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="नाव किंवा मोबाईल नंबरने शोधा..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={examFilter}
                        onChange={(e) => setExamFilter(e.target.value)}
                        className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
                      >
                        <option value="ALL">सर्व परीक्षा</option>
                        <option value="MHT_CET">MHT-CET</option>
                        <option value="NEET">NEET</option>
                        <option value="JEE_MAIN">JEE Main</option>
                      </select>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
                      >
                        <option value="ALL">सर्व स्टेटस</option>
                        <option value="approved">मंजूर (Approved)</option>
                        <option value="pending">प्रलंबित (Pending)</option>
                        <option value="rejected">ब्लॉक (Rejected)</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredStudents.map((std) => (
                      <div
                        key={std.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{std.name}</h4>
                              <p className="text-xs text-slate-500 font-mono">📱 {std.mobile}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                std.approvalStatus === "approved" && std.isApproved
                                  ? "bg-emerald-100 text-emerald-800"
                                  : std.approvalStatus === "pending" || !std.isApproved
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {std.approvalStatus === "approved" && std.isApproved ? "मंजूर" : "प्रलंबित"}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] grid grid-cols-2 gap-1 text-slate-700">
                            <div>🎯 <strong>{std.examTarget}</strong></div>
                            <div>🔑 <strong>{std.password || "123456"}</strong></div>
                          </div>

                          {/* Performance Mini Status */}
                          <div className="bg-indigo-50/70 p-2 rounded-xl text-[11px] flex items-center justify-between text-indigo-900 border border-indigo-100">
                            <span className="font-bold flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5 text-indigo-600" />
                              <span>{std.totalTestsTaken || 0} टेस्ट्स • {std.totalQuestionsSolved || 0} Qs</span>
                            </span>
                            <span className="font-mono font-black text-emerald-700 bg-white px-1.5 py-0.5 rounded-md border border-indigo-100 text-[10px]">
                              {std.overallAccuracy || 0}% अचूक
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                          {std.approvalStatus !== "approved" || !std.isApproved ? (
                            <button
                              onClick={() => {
                                handleApprove(std.id);
                                sendWhatsAppApprovalNotification(std);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>मंजूर करा</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReject(std.id)}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>ब्लॉक करा</span>
                            </button>
                          )}
                          <button
                            onClick={() => sendWhatsAppApprovalNotification(std)}
                            className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer"
                            title="WhatsApp वर संपर्क"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingStudent(std)}
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                            title="संपादन करा"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(std.id, std.name)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="डेटाबेसमधून हटवा"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: STUDENT PROGRESS & TEST ACTIVITY TRACKER */}
              {activeTab === "student_progress" && (
                <AdminStudentProgressView
                  students={students}
                  testSubmissions={testSubmissions}
                  onRefresh={loadAllData}
                />
              )}

              {/* TAB 4: PAYMENTS */}
              {activeTab === "payments" && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        पेमेंट पावत्या व UTR पडताळणी
                      </h3>
                      <p className="text-xs text-slate-500">
                        विद्यार्थ्यांनी भरलेले ₹२९ शुल्क व त्यांचे UTR नंबर.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-black">
                      एकूण पावत्या: {payments.length}
                    </span>
                  </div>

                  {payments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                      <CreditCard className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="font-bold text-slate-800">कोणत्याही पावत्या नोंदवलेल्या नाहीत.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {payments.map((p) => (
                        <div key={p.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{p.studentName}</h4>
                              <p className="text-xs text-slate-600 font-mono">📱 {p.studentPhone}</p>
                            </div>
                            <span className="text-sm font-black text-emerald-700">₹{p.amount || 29}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-xl text-xs font-mono text-slate-800 flex items-center justify-between">
                            <span>UTR: <strong>{p.utr}</strong></span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(p.utr);
                                showToast("UTR कॉपी केला!");
                              }}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                            <span>{new Date(p.date).toLocaleString("mr-IN")}</span>
                            <button
                              onClick={() => handleDeletePayment(p.id)}
                              className="text-rose-600 hover:text-rose-800 font-bold"
                            >
                              हटवा
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: FEEDBACK & ISSUE INBOX */}
              {activeTab === "feedback_inbox" && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      विद्यार्थी तक्रार व त्रुटी निवारण इनबॉक्स
                    </h3>
                    <p className="text-xs text-slate-500">
                      विद्यार्थ्यांनी नोंदवलेल्या त्रुटी तपासून WhatsApp वर निराकरण पाठवा.
                    </p>
                  </div>

                  {feedbackReports.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                      <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="font-bold text-slate-800">सध्या कोणतीही तक्रार आलेली नाही.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {feedbackReports.map((report) => (
                        <div
                          key={report.id}
                          className={`bg-white rounded-2xl p-4 border shadow-xs space-y-2.5 ${
                            report.status === "resolved" ? "border-emerald-200 opacity-80" : "border-rose-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xs font-black text-slate-900">
                                {report.studentName} ({report.studentMobile})
                              </h4>
                              <p className="text-[11px] font-bold text-indigo-700">
                                📌 {report.subject} · {report.issueCategory}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                report.status === "resolved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {report.status === "resolved" ? "✅ दुरुस्त (Resolved)" : "⏳ प्रलंबित (Pending)"}
                            </span>
                          </div>

                          <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                            "{report.description}"
                          </p>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => handleToggleFeedbackStatus(report)}
                              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                                report.status === "resolved"
                                  ? "bg-slate-200 text-slate-800"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{report.status === "resolved" ? "प्रलंबित ठेवा" : "दुरुस्त म्हणून मार्क करा"}</span>
                            </button>
                            <button
                              onClick={() => sendWhatsAppFeedbackReply(report)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp उत्तर</span>
                            </button>
                            <button
                              onClick={() => handleDeleteFeedback(report.id)}
                              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: AGENTS */}
              {activeTab === "agents" && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        एजंट पार्टनर व कमिशन व्यवस्थापन
                      </h3>
                      <p className="text-xs text-slate-500">
                        प्रत्येक रेफरलवर २०% (₹५.८०) कमिशन व पेआउट विनंत्या.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-900 rounded-xl text-xs font-black">
                      एकूण एजंट्स: {agents.length}
                    </span>
                  </div>

                  {agentPayouts.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                      <h4 className="text-xs font-black text-amber-900">विड्रॉल विनंत्या (Payout Requests):</h4>
                      {agentPayouts.map((po) => (
                        <div key={po.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{po.agentName}</span> ({po.agentPhone})
                            <p className="text-slate-500 font-mono">UPI: {po.upiId} | रक्कम: <strong>₹{po.amount}</strong></p>
                          </div>
                          <div className="flex items-center gap-2">
                            {po.status === "pending" ? (
                              <button
                                onClick={() => handleApprovePayout(po.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                              >
                                मंजूर व पेड करा
                              </button>
                            ) : (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                                Paid (UTR: {po.adminUtr})
                              </span>
                            )}
                            <button
                              onClick={() => handleDeletePayout(po.id)}
                              className="text-rose-600 hover:text-rose-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {agents.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                      <Wallet className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="font-bold text-slate-800">कोणतेही एजंट नोंदणीकृत नाहीत.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {agents.map((ag) => (
                        <div key={ag.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{ag.name}</h4>
                              <p className="text-xs text-slate-600 font-mono">📱 {ag.mobile}</p>
                              <p className="text-xs text-teal-700 font-bold font-mono">Code: {ag.agentCode}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-black text-emerald-700">₹{ag.walletBalance || 0}</span>
                              <p className="text-[10px] text-slate-500">रेफरल्स: {ag.totalReferrals || 0}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">नवीन विद्यार्थी जोडा</h3>
              <button onClick={() => setIsAddingStudent(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">विद्यार्थ्याचे नाव:</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शिंदे"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">मोबाईल नंबर:</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. 9881063427"
                  value={newStudentMobile}
                  onChange={(e) => setNewStudentMobile(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">पासवर्ड:</label>
                <input
                  type="text"
                  required
                  value={newStudentPassword}
                  onChange={(e) => setNewStudentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">परीक्षा लक्ष्य:</label>
                <select
                  value={newStudentExam}
                  onChange={(e) => setNewStudentExam(e.target.value as ExamType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white outline-none"
                >
                  <option value="MHT_CET">MHT-CET (PCM/PCB)</option>
                  <option value="NEET">NEET (Medical)</option>
                  <option value="JEE_MAIN">JEE Main (Engineering)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-md"
                >
                  जोडा व मंजूर करा
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingStudent(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">विद्यार्थी माहिती संपादन करा</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEditedStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">नाव:</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">मोबाईल:</label>
                <input
                  type="text"
                  required
                  value={editingStudent.mobile}
                  onChange={(e) => setEditingStudent({ ...editingStudent, mobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">पासवर्ड:</label>
                <input
                  type="text"
                  required
                  value={editingStudent.password || ""}
                  onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">परीक्षा:</label>
                <select
                  value={editingStudent.examTarget}
                  onChange={(e) => setEditingStudent({ ...editingStudent, examTarget: e.target.value as ExamType })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white outline-none"
                >
                  <option value="MHT_CET">MHT-CET</option>
                  <option value="NEET">NEET</option>
                  <option value="JEE_MAIN">JEE Main</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">मंजुरी स्थिती (Approval Status):</label>
                <select
                  value={editingStudent.approvalStatus}
                  onChange={(e) => {
                    const status = e.target.value as "approved" | "pending" | "rejected";
                    setEditingStudent({
                      ...editingStudent,
                      approvalStatus: status,
                      isApproved: status === "approved",
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white outline-none"
                >
                  <option value="approved">मंजूर (Approved)</option>
                  <option value="pending">प्रलंबित (Pending)</option>
                  <option value="rejected">ब्लॉक (Rejected)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-md"
                >
                  बदल सेव्ह करा
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
