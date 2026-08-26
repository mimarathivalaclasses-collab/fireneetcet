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
  Smartphone,
  Phone,
  MessageSquare,
  Lock,
  Unlock,
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
  Download,
  Settings,
  ChevronRight,
  Sparkles,
  Building2,
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
} from "lucide-react";
import {
  StudentUser,
  ExamType,
  PaymentReceiptRecord,
  DeviceApprovalRequest,
  InstituteProfile,
  AgentUser,
  AgentPayoutRequest,
  UserFeedbackReport,
} from "../types";
import {
  getAllInstitutes,
  saveAllInstitutes,
} from "../data/coachingInstitutesData";
import { getOrCreateDeviceId, getDeviceName } from "../utils/deviceSecurity";
import {
  saveStudentToCloud,
  fetchStudentsFromCloud,
  updateStudentApprovalInCloud,
  deleteStudentFromCloud,
  fetchFeedbackReportsFromCloud,
  updateFeedbackReportStatusInCloud,
  deleteFeedbackReportFromCloud,
} from "../services/firebase";

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
  // Navigation Tabs in Admin Console
  const [activeTab, setActiveTab] = useState<
    "pending_approvals" | "all_students" | "feedback_inbox" | "classes" | "agents" | "payments" | "devices"
  >("pending_approvals");

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("mcq_admin_logged_in") === "true";
  });
  const [passcode, setPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");
  const [showPasscode, setShowPasscode] = useState<boolean>(false);

  // Core Data Lists
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [feedbackReports, setFeedbackReports] = useState<UserFeedbackReport[]>([]);
  const [payments, setPayments] = useState<PaymentReceiptRecord[]>([]);
  const [deviceRequests, setDeviceRequests] = useState<DeviceApprovalRequest[]>([]);
  const [institutes, setInstitutes] = useState<InstituteProfile[]>([]);
  const [agents, setAgents] = useState<AgentUser[]>([]);
  const [agentPayouts, setAgentPayouts] = useState<AgentPayoutRequest[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [examFilter, setExamFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [feedbackFilter, setFeedbackFilter] = useState<"ALL" | "pending" | "resolved">("ALL");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals for Adding
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentMobile, setNewStudentMobile] = useState<string>("");
  const [newStudentPassword, setNewStudentPassword] = useState<string>("123456");
  const [newStudentExam, setNewStudentExam] = useState<ExamType>("MHT_CET");
  const [newStudentInstitute, setNewStudentInstitute] = useState<string>("");

  const [isAddingInstitute, setIsAddingInstitute] = useState<boolean>(false);
  const [newInstName, setNewInstName] = useState<string>("");
  const [newInstNameMr, setNewInstNameMr] = useState<string>("");
  const [newInstCode, setNewInstCode] = useState<string>("");
  const [newInstDirector, setNewInstDirector] = useState<string>("");
  const [newInstContact, setNewInstContact] = useState<string>("");
  const [newInstCity, setNewInstCity] = useState<string>("");
  const [newInstPasscode, setNewInstPasscode] = useState<string>("class2026");
  const [newInstLimit, setNewInstLimit] = useState<number>(2000);

  // Modals for EDITING (New Feature)
  const [editingStudent, setEditingStudent] = useState<StudentUser | null>(null);
  const [editingInstitute, setEditingInstitute] = useState<InstituteProfile | null>(null);
  const [editingAgent, setEditingAgent] = useState<AgentUser | null>(null);

  // Feedback Notification
  const [toastMessage, setToastMessage] = useState<string>("");
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

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

      // Load Feedback & Error Reports from local storage and cloud
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

      const devRaw = localStorage.getItem("mcq_app_device_approval_requests_v1");
      setDeviceRequests(devRaw ? JSON.parse(devRaw) : []);

      setInstitutes(getAllInstitutes());

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
      `आपले *MHT-CET / NEET / JEE MCQ Mock Test Master 2026* चे ॲप खाते यशस्वीरित्या *मंजूर (Approved)* करण्यात आले आहे! 🎉\n\n` +
      `📱 *लॉगिन मोबाईल:* ${student.mobile}\n` +
      `🎯 *टारगेट परीक्षा:* ${student.examTarget}\n` +
      `⚡ *वैशिष्ट्ये:* १०,०००+ प्रश्न, Target Triumph Physics, ॲनालिटिक्स व पीडीएफ निकाल!\n\n` +
      `आताच ॲप उघडा आणि दररोज २० प्रश्नांचा सराव सुरू करा!\n` +
      `शुभेच्छा! 🏆`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
    showToast("WhatsApp मेसेज विंडो उघडली!");
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
    showToast(newStatus === "resolved" ? "✅ त्रुटी दुरुस्त म्हणून मार्क केली!" : "⏳ त्रुटी प्रलंबित म्हणून मार्क केली.");
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
      `तुम्ही ॲपमध्ये नोंदवलेल्या *"${report.subject} - ${report.issueCategory}"* संदर्भातील त्रुटीचे/अभिप्रायाचे आमच्या तज्ज्ञ शिक्षकांनी निवारण केले आहे. ✅\n\n` +
      `📝 *तुमचा मुद्दा:* "${report.description}"\n\n` +
      `🙏 अभिप्राय दिल्याबद्दल धन्यवाद! ॲप रिफ्रेश करून नवीन अपडेट तपासा.`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = passcode.trim();
    if (
      cleanPin === "2026" ||
      cleanPin === "admin" ||
      cleanPin === "9307220454" ||
      cleanPin === "1234"
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("mcq_admin_logged_in", "true");
      setPasscodeError("");
      loadAllData();
    } else {
      setPasscodeError("अवैध ॲडमिन पासवर्ड. कृपया 9307220454 किंवा 2026 टाका.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("mcq_admin_logged_in");
    setPasscode("");
  };

  // ================= STUDENT ACTIONS (Approve / Reject / Edit / Delete) =================
  const handleApprove = (studentId: string) => {
    const updated = students.map((s) =>
      s.id === studentId
        ? {
            ...s,
            approvalStatus: "approved" as const,
            isApproved: true,
            paymentStatus: s.paymentStatus === "unpaid" ? ("paid" as const) : s.paymentStatus,
          }
        : s
    );
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    // Update in Firebase Cloud
    const targetStudent = updated.find((s) => s.id === studentId);
    if (targetStudent) {
      updateStudentApprovalInCloud(targetStudent.mobile || targetStudent.id, "approved", true);
      saveStudentToCloud(targetStudent);
    }

    // Also sync with current logged in user if match
    const currentRaw = localStorage.getItem("mcq_app_current_user_v1");
    if (currentRaw) {
      try {
        const cur: StudentUser = JSON.parse(currentRaw);
        if (cur.id === studentId) {
          cur.approvalStatus = "approved";
          cur.isApproved = true;
          cur.paymentStatus = "paid";
          localStorage.setItem("mcq_app_current_user_v1", JSON.stringify(cur));
        }
      } catch (e) {}
    }

    if (onApproveStudent) onApproveStudent(studentId);
    showToast("विद्यार्थी यशस्वीरित्या मंजूर करण्यात आला!");
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

  const handleResetDevice = (studentId: string) => {
    const updated = students.map((s) =>
      s.id === studentId
        ? {
            ...s,
            primaryDeviceId: undefined,
            boundDeviceFingerprint: undefined,
          }
        : s
    );
    setStudents(updated);
    localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));

    const targetStudent = updated.find((s) => s.id === studentId);
    if (targetStudent) {
      saveStudentToCloud(targetStudent);
    }

    showToast("विद्यार्थ्याचे डिव्हाइस बंधन (Device Binding) रिसेट केले गेले!");
  };

  const handleDeleteStudent = (studentId: string, name: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की '${name}' या विद्यार्थ्याला पूर्णपणे हटवायचे आहे?`)) {
      const targetStudent = students.find((s) => s.id === studentId);
      if (targetStudent) {
        deleteStudentFromCloud(targetStudent.mobile || targetStudent.id);
      }

      const updated = students.filter((s) => s.id !== studentId);
      setStudents(updated);
      localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(updated));
      showToast(`'${name}' हा विद्यार्थी डेटाबेसमधून हटवला गेला.`);
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

    // Also update current user if matching
    const currentRaw = localStorage.getItem("mcq_app_current_user_v1");
    if (currentRaw) {
      try {
        const cur: StudentUser = JSON.parse(currentRaw);
        if (cur.id === editingStudent.id) {
          localStorage.setItem("mcq_app_current_user_v1", JSON.stringify(editingStudent));
        }
      } catch (e) {}
    }

    setEditingStudent(null);
    showToast("विद्यार्थी माहिती यशस्वीरित्या अपडेट झाली!");
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentMobile.trim()) {
      alert("कृपया नाव आणि मोबाईल नंबर भरा.");
      return;
    }
    const newStudent: StudentUser = {
      id: `stud_${Date.now()}`,
      name: newStudentName.trim(),
      mobile: newStudentMobile.trim(),
      password: newStudentPassword.trim() || "123456",
      role: "student",
      examTarget: newStudentExam,
      instituteCode: newStudentInstitute.trim().toUpperCase() || undefined,
      primaryDeviceId: getOrCreateDeviceId(),
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
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
    setNewStudentInstitute("");
    showToast("नवीन विद्यार्थी यशस्वीरित्या जोडला गेला!");
  };

  // ================= COACHING INSTITUTE ACTIONS (Create / Edit / Delete) =================
  const handleCreateInstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstNameMr.trim() || !newInstCode.trim()) {
      alert("कृपया क्लासेसचे नाव आणि युनिक कोड भरा.");
      return;
    }

    const cleanCode = newInstCode.trim().toUpperCase();
    const newInstitute: InstituteProfile = {
      id: `inst_${Date.now()}`,
      name: newInstName.trim() || newInstNameMr.trim(),
      nameMr: newInstNameMr.trim(),
      instituteCode: cleanCode,
      directorName: newInstDirector.trim() || "संचालक सर",
      contactNumber: newInstContact.trim() || "9307220454",
      city: newInstCity.trim() || "महाराष्ट्र",
      adminPasscode: newInstPasscode.trim() || "class2026",
      maxStudentsLimit: Number(newInstLimit) || 2000,
      batches: ["12th Science Toppers", "Target Super Batch", "MHT-CET Crash Batch"],
      createdAt: Date.now(),
    };

    const updated = [newInstitute, ...institutes];
    setInstitutes(updated);
    saveAllInstitutes(updated);
    setIsAddingInstitute(false);
    setNewInstName("");
    setNewInstNameMr("");
    setNewInstCode("");
    setNewInstDirector("");
    setNewInstContact("");
    setNewInstCity("");
    setNewInstPasscode("class2026");
    showToast(`'${newInstitute.nameMr}' क्लासेस यशस्वीरित्या जोडले गेले!`);
  };

  const handleSaveEditedInstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstitute) return;

    const updated = institutes.map((inst) =>
      inst.id === editingInstitute.id ? editingInstitute : inst
    );
    setInstitutes(updated);
    saveAllInstitutes(updated);
    setEditingInstitute(null);
    showToast("कोचिंग क्लासेस माहिती अपडेट झाली!");
  };

  const handleDeleteInstitute = (instId: string, instName: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की '${instName}' क्लासेस कायमचे हटवायचे आहेत?`)) {
      const updated = institutes.filter((i) => i.id !== instId);
      setInstitutes(updated);
      saveAllInstitutes(updated);
      showToast(`'${instName}' क्लासेस हटवले गेले.`);
    }
  };

  // ================= AGENT ACTIONS (Edit / Delete / Approve) =================
  const handleSaveEditedAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgent) return;

    const updated = agents.map((a) => (a.id === editingAgent.id ? editingAgent : a));
    setAgents(updated);
    localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(updated));
    setEditingAgent(null);
    showToast("एजंट पार्टनर माहिती अपडेट झाली!");
  };

  const handleDeleteAgent = (agentId: string, agentName: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की '${agentName}' या एजंटला हटवायचे आहे?`)) {
      const updated = agents.filter((a) => a.id !== agentId);
      setAgents(updated);
      localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(updated));
      showToast(`'${agentName}' एजंट डेटाबेसमधून हटवला गेला.`);
    }
  };

  // ================= AGENT PAYOUT ACTIONS =================
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

  // ================= DEVICE & PAYMENT ACTIONS =================
  const handleDeleteDeviceRequest = (reqId: string) => {
    if (window.confirm("ही डिव्हाइस विनंती हटवायची आहे का?")) {
      const updated = deviceRequests.filter((r) => r.id !== reqId);
      setDeviceRequests(updated);
      localStorage.setItem("mcq_app_device_approval_requests_v1", JSON.stringify(updated));
      showToast("डिव्हाइस विनंती हटवली गेली.");
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

  // Filtered Students List
  const pendingStudents = students.filter((s) => s.approvalStatus === "pending");
  const approvedStudents = students.filter((s) => s.approvalStatus === "approved");

  const filteredStudents = students.filter((std) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      std.name.toLowerCase().includes(q) ||
      std.mobile.includes(q) ||
      (std.instituteCode && std.instituteCode.toLowerCase().includes(q));

    const matchesExam = examFilter === "ALL" || std.examTarget === examFilter;
    const matchesStatus = statusFilter === "ALL" || std.approvalStatus === statusFilter;

    return matchesSearch && matchesExam && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/80 backdrop-blur-md">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. ADMIN PIN LOCK SCREEN */}
      {!isAdminAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg font-black">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold">मुख्य ॲडमिन कन्सोल</h2>
              <p className="text-xs text-slate-400">
                विद्यार्थी मंजुरी, एडिट-डिलिट, कोचिंग क्लासेस व एजंट व्यवस्थापन
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  मास्टर ॲडमिन पासवर्ड प्रविष्ट करा:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPasscode ? "text" : "password"}
                    required
                    placeholder="उदा. 9307220454 किंवा 2026"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-mono font-bold focus:border-amber-400 outline-none"
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
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{passcodeError}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
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
                  <span className="text-[10px] text-amber-400 font-bold">Edit & Delete Center</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
              <button
                onClick={() => setActiveTab("pending_approvals")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "pending_approvals"
                    ? "bg-amber-500 text-slate-950 font-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>प्रलंबित मंजुरी</span>
                </div>
                {pendingStudents.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                    {pendingStudents.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("all_students")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all_students"
                    ? "bg-indigo-600 text-white font-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>विद्यार्थी (Edit / Delete)</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{students.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("classes")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "classes"
                    ? "bg-purple-600 text-white font-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>कोचिंग क्लासेस (150+)</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{institutes.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("feedback_inbox")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "feedback_inbox"
                    ? "bg-rose-600 text-white font-black shadow-md"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-300" />
                  <span>त्रुटी व तक्रार इनबॉक्स</span>
                </div>
                {feedbackReports.filter((f) => f.status === "pending").length > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
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
                    ? "bg-teal-600 text-white font-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <span>एजंट पार्टनर व कमिशन</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{agents.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "payments"
                    ? "bg-emerald-600 text-white font-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>पेमेंट पावत्या</span>
                </div>
                <span className="text-[11px] opacity-80 font-mono">{payments.length}</span>
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
            <header className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-900">
                  {activeTab === "pending_approvals" && "विद्यार्थी मंजुरी विनंत्या"}
                  {activeTab === "all_students" && "विद्यार्थी व्यवस्थापन (संपादन व हटवणे)"}
                  {activeTab === "feedback_inbox" && "विद्यार्थी तक्रार व त्रुटी निवारण इनबॉक्स"}
                  {activeTab === "classes" && "कोचिंग क्लासेस (संपादन व हटवणे)"}
                  {activeTab === "agents" && "एजंट नेटवर्क व्यवस्थापन"}
                  {activeTab === "payments" && "पेमेंट पावत्या व रेकॉर्ड्स"}
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
                {activeTab === "classes" && (
                  <button
                    onClick={() => setIsAddingInstitute(true)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ क्लासेस जोडा</span>
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
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "pending_approvals" ? "bg-amber-500 text-slate-950" : "text-slate-300"}`}
              >
                मंजुरी ({pendingStudents.length})
              </button>
              <button
                onClick={() => setActiveTab("all_students")}
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "all_students" ? "bg-indigo-600 text-white" : "text-slate-300"}`}
              >
                विद्यार्थी ({students.length})
              </button>
              <button
                onClick={() => setActiveTab("feedback_inbox")}
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "feedback_inbox" ? "bg-rose-600 text-white" : "text-slate-300"}`}
              >
                तक्रारी ({feedbackReports.filter((f) => f.status === "pending").length})
              </button>
              <button
                onClick={() => setActiveTab("classes")}
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "classes" ? "bg-purple-600 text-white" : "text-slate-300"}`}
              >
                क्लासेस ({institutes.length})
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "agents" ? "bg-teal-600 text-white" : "text-slate-300"}`}
              >
                एजंट्स ({agents.length})
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`px-3 py-1 rounded-lg shrink-0 ${activeTab === "payments" ? "bg-emerald-600 text-white" : "text-slate-300"}`}
              >
                पेमेंट्स ({payments.length})
              </button>
            </div>

            {/* Scrollable Main Body */}
            <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4">
              
              {/* TAB 1: PENDING APPROVALS */}
              {activeTab === "pending_approvals" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">प्रलंबित विद्यार्थी मंजुरी</h3>
                      <p className="text-xs text-slate-500">नवीन नोंदणी झालेल्या विद्यार्थ्यांना मंजुरी द्या.</p>
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
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="font-bold text-slate-800">सर्व विद्यार्थी मंजूर आहेत!</p>
                      <p className="mt-1">कोणतीही प्रलंबित विनंती शिल्लक नाही.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pendingStudents.map((std) => (
                        <div key={std.id} className="bg-white rounded-2xl p-4 border border-amber-300 shadow-xs space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{std.name}</h4>
                              <p className="text-xs text-slate-600">📱 {std.mobile} | {std.examTarget}</p>
                              {std.instituteCode && (
                                <p className="text-xs text-purple-700 font-bold mt-0.5">🏫 क्लासेस: {std.instituteCode}</p>
                              )}
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                              प्रलंबित
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => {
                                handleApprove(std.id);
                                sendWhatsAppApprovalNotification(std);
                              }}
                              className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>मंजूर करा (Approve)</span>
                            </button>
                            <button
                              onClick={() => sendWhatsAppApprovalNotification(std)}
                              className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 cursor-pointer"
                              title="WhatsApp वर मंजुरी मेसेज पाठवा"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingStudent(std)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="संपादन करा"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(std.id, std.name)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="हटवा"
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

              {/* TAB 2: ALL STUDENTS (WITH FULL EDIT & DELETE) */}
              {activeTab === "all_students" && (
                <div className="space-y-3">
                  {/* Search and Filters */}
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
                        <option value="approved">मंजूर</option>
                        <option value="pending">प्रलंबित</option>
                        <option value="rejected">ब्लॉक</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Cards Grid with EDIT & DELETE */}
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
                              <p className="text-xs text-slate-500">📱 {std.mobile}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                std.approvalStatus === "approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : std.approvalStatus === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {std.approvalStatus}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-2 rounded-xl text-[11px] grid grid-cols-2 gap-1 text-slate-700">
                            <div>🎯 <strong>{std.examTarget}</strong></div>
                            <div>🔑 <strong>{std.password || "123456"}</strong></div>
                            {std.instituteCode && (
                              <div className="col-span-2 text-purple-700 font-bold">🏫 {std.instituteCode}</div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons: Edit, Delete, Toggle Status */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                          {std.approvalStatus !== "approved" ? (
                            <button
                              onClick={() => handleApprove(std.id)}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>मंजूर</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReject(std.id)}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>ब्लॉक</span>
                            </button>
                          )}

                          {/* WhatsApp NOTIFY BUTTON */}
                          <button
                            onClick={() => sendWhatsAppApprovalNotification(std)}
                            className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer"
                            title="WhatsApp वर मेसेज पाठवा"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>

                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => setEditingStudent(std)}
                            className="py-1.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            title="माहिती संपादित करा (Edit Student)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>एडिट</span>
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDeleteStudent(std.id, std.name)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="डेटाबेसमधून हटवा (Delete Student)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: FEEDBACK & ERROR REPORTS INBOX (NEW FEATURE) */}
              {activeTab === "feedback_inbox" && (
                <div className="space-y-3">
                  {/* Header & Filter */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-rose-600" />
                        <span>विद्यार्थी त्रुटी व अभिप्राय इनबॉक्स (Feedback Inbox)</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        विद्यार्थ्यांनी मॉक टेस्ट किंवा प्रश्नांमध्ये नोंदवलेल्या सर्व शंका व त्रुटी येथे पहा आणि १-क्लिकमध्ये निवारण करा.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={feedbackFilter}
                        onChange={(e) => setFeedbackFilter(e.target.value as any)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
                      >
                        <option value="ALL">सर्व तक्रारी ({feedbackReports.length})</option>
                        <option value="pending">प्रलंबित ({feedbackReports.filter((f) => f.status === "pending").length})</option>
                        <option value="resolved">दुरुस्त झालेले ({feedbackReports.filter((f) => f.status === "resolved").length})</option>
                      </select>
                    </div>
                  </div>

                  {/* Feedback Cards List */}
                  {feedbackReports.filter((f) => feedbackFilter === "ALL" ? true : f.status === feedbackFilter).length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-xs space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <p className="font-bold text-slate-800 text-sm">सर्व तक्रारींचे निवारण झाले आहे!</p>
                      <p className="text-slate-500">कोणतीही प्रलंबित त्रुटी शिल्लक नाही. विद्यार्थी सहजपणे अभ्यास करत आहेत.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {feedbackReports
                        .filter((f) => (feedbackFilter === "ALL" ? true : f.status === feedbackFilter))
                        .map((report) => (
                          <div
                            key={report.id}
                            className={`bg-white rounded-2xl p-4 border shadow-xs flex flex-col justify-between space-y-3 transition-all ${
                              report.status === "resolved"
                                ? "border-emerald-200 bg-emerald-50/20"
                                : "border-rose-300 bg-rose-50/20"
                            }`}
                          >
                            <div className="space-y-2.5">
                              {/* Top Tag & Status */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-900 text-white">
                                      {report.subject}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                                      {report.issueCategory}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {new Date(report.timestamp).toLocaleDateString("mr-IN", {
                                        day: "numeric",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-bold text-slate-800 pt-1">
                                    विद्यार्थी: <span className="font-black text-slate-900">{report.studentName || "अनामिक विद्यार्थी"}</span>
                                    {report.studentMobile && (
                                      <span className="ml-1.5 text-indigo-600 font-mono">📱 {report.studentMobile}</span>
                                    )}
                                  </h4>
                                </div>

                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    report.status === "resolved"
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                      : "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                                  }`}
                                >
                                  {report.status === "resolved" ? "✅ दुरुस्त" : "⏳ प्रलंबित"}
                                </span>
                              </div>

                              {/* Question Preview if Available */}
                              {report.questionText && (
                                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                                  <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                    <span>प्रश्न संदर्भ (Question ID: {report.questionId}):</span>
                                  </div>
                                  <p className="line-clamp-2 italic text-slate-600">"{report.questionText}"</p>
                                </div>
                              )}

                              {/* Student's Feedback Message */}
                              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs text-slate-800">
                                <span className="font-bold text-slate-600 block text-[11px] mb-0.5">तक्रार / त्रुटी तपशील:</span>
                                <p className="font-medium whitespace-pre-wrap">{report.description}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                              {/* Toggle Resolved Button */}
                              <button
                                onClick={() => handleToggleFeedbackStatus(report)}
                                className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${
                                  report.status === "resolved"
                                    ? "bg-amber-100 hover:bg-amber-200 text-amber-900"
                                    : "bg-emerald-600 hover:bg-emerald-700 text-white font-black"
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{report.status === "resolved" ? "प्रलंबित करा" : "✅ दुरुस्त झाले (Mark Resolved)"}</span>
                              </button>

                              {/* WhatsApp Direct Reply */}
                              {report.studentMobile && (
                                <button
                                  onClick={() => sendWhatsAppFeedbackReply(report)}
                                  className="py-1.5 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                                  title="विद्यार्थ्याला थेट WhatsApp वर उत्तर द्या"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">WhatsApp उत्तर</span>
                                </button>
                              )}

                              {/* Delete Report */}
                              <button
                                onClick={() => handleDeleteFeedback(report.id)}
                                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                                title="अहवाल हटवा"
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

              {/* TAB 3: COACHING CLASSES (WITH EDIT & DELETE) */}
              {activeTab === "classes" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {institutes.map((inst) => (
                      <div
                        key={inst.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-purple-300 transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{inst.nameMr}</h4>
                              <span className="text-xs text-purple-700 font-extrabold font-mono">
                                कोड: {inst.instituteCode}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                              {inst.city}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1 text-slate-700">
                            <div>👤 <strong>संचालक:</strong> {inst.directorName}</div>
                            <div>📞 <strong>संपर्क:</strong> {inst.contactNumber}</div>
                            <div>🔑 <strong>पासवर्ड:</strong> <span className="font-mono font-bold">{inst.adminPasscode || "class2026"}</span></div>
                            <div>👥 <strong>क्षमता:</strong> {inst.maxStudentsLimit} विद्यार्थी</div>
                          </div>
                        </div>

                        {/* Action Buttons: Edit, Delete, Contact */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                          {/* EDIT INSTITUTE */}
                          <button
                            onClick={() => setEditingInstitute(inst)}
                            className="flex-1 py-1.5 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold flex items-center justify-center gap-1 cursor-pointer"
                            title="क्लासेस माहिती संपादित करा (Edit Class)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>एडिट (Edit)</span>
                          </button>

                          {/* DELETE INSTITUTE */}
                          <button
                            onClick={() => handleDeleteInstitute(inst.id, inst.nameMr || inst.name)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="क्लासेस हटवा (Delete Class)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* WHATSAPP */}
                          <a
                            href={`https://wa.me/91${inst.contactNumber}?text=Namaskar%20${encodeURIComponent(inst.directorName)},%20tumcha%20Class%20Portal%20Code:%20${inst.instituteCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                            title="WhatsApp संपर्क"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: AGENTS (WITH EDIT & DELETE & PAYOUT APPROVALS) */}
              {activeTab === "agents" && (
                <div className="space-y-6">
                  {/* Payout Withdrawal Requests Section */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-emerald-600" />
                        <div>
                          <h3 className="text-sm font-black text-slate-900">विड्रॉल पेआउट विनंत्या (Payout Requests)</h3>
                          <p className="text-[11px] text-slate-500">एजंट व विद्यार्थ्यांच्या २०% कमिशन विड्रॉल विनंत्या (किमान ₹१००)</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                        {agentPayouts.length} विनंत्या
                      </span>
                    </div>

                    {agentPayouts.length === 0 ? (
                      <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500 font-medium">
                        सध्या कोणतीही प्रलंबित विड्रॉल विनंती नाही.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {agentPayouts.map((payout) => (
                          <div
                            key={payout.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              payout.status === "approved"
                                ? "bg-emerald-50/60 border-emerald-200"
                                : "bg-amber-50/60 border-amber-200"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-black text-slate-900">{payout.agentName}</h4>
                                <p className="text-xs text-slate-500">📱 {payout.mobile} | कोड: <strong className="font-mono text-indigo-700">{payout.agentCode}</strong></p>
                                <p className="text-xs text-slate-700 mt-1">
                                  💳 <strong>UPI ID:</strong> <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border">{payout.upiId}</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-emerald-700 font-mono">₹{payout.amount}</div>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                    payout.status === "approved"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-amber-200 text-amber-900 animate-pulse"
                                  }`}
                                >
                                  {payout.status === "approved" ? "पेड (Paid)" : "प्रलंबित (Pending)"}
                                </span>
                              </div>
                            </div>

                            {payout.adminUtr && (
                              <p className="text-[11px] font-mono text-emerald-800 mt-2 bg-emerald-100/70 p-1.5 rounded-lg">
                                ✅ बँक UTR: {payout.adminUtr}
                              </p>
                            )}

                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/60">
                              {payout.status !== "approved" && (
                                <button
                                  onClick={() => handleApprovePayout(payout.id)}
                                  className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>पैसे पाठवले (Approve)</span>
                                </button>
                              )}
                              <a
                                href={`https://wa.me/91${payout.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `नमस्ते ${payout.agentName}, तुमचे ₹${payout.amount} चे कमिशन पेआउट मंजूर झाले आहे!`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-1.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                WhatsApp
                              </a>
                              <button
                                onClick={() => handleDeletePayout(payout.id)}
                                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                                title="हटवा"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Registered Agents List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      <span>नोंदणीकृत एजंट पार्टनर यादी ({agents.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {agents.map((agent) => (
                        <div
                          key={agent.id}
                          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-teal-300 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-black text-slate-900">{agent.name}</h4>
                                <p className="text-xs text-slate-500">📱 {agent.mobile}</p>
                              </div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono">
                                {agent.agentCode || agent.referralCode}
                              </span>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1 text-slate-700">
                              <div>📍 <strong>शहर:</strong> {agent.city || "महाराष्ट्र"}</div>
                              <div>👥 <strong>एकूण रेफरल्स:</strong> {agent.totalReferredStudents || agent.totalStudentsReferred || 0}</div>
                              <div>💰 <strong>कमिशन कमाई:</strong> ₹{agent.totalEarnedCommission || agent.totalEarnings || 0}</div>
                              {agent.upiId && <div>💳 <strong>UPI:</strong> {agent.upiId}</div>}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => setEditingAgent(agent)}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>एडिट करा</span>
                            </button>
                            <button
                              onClick={() => handleDeleteAgent(agent.id, agent.name)}
                              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="एजंट हटवा"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PAYMENTS (WITH DELETE & VERIFY) */}
              {activeTab === "payments" && (
                <div className="space-y-3">
                  {payments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-xs border border-slate-200">
                      कोणतीही पेमेंट पावती उपलब्ध नाही.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {payments.map((p) => (
                        <div key={p.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{p.studentName}</h4>
                              <p className="text-xs text-slate-500">📱 {p.studentMobile} | ₹{p.amount}</p>
                              <p className="text-[11px] font-mono text-slate-400 mt-0.5">UTR: {p.utrNumber}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.status === "verified"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : p.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => handleDeletePayment(p.id)}
                              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>पावती हटवा</span>
                            </button>
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

      {/* ================= MODAL: EDIT STUDENT ================= */}
      {editingStudent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>विद्यार्थी माहिती संपादन (Edit Student)</span>
              </h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">पूर्ण नाव:</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाईल नंबर:</label>
                  <input
                    type="tel"
                    required
                    value={editingStudent.mobile}
                    onChange={(e) => setEditingStudent({ ...editingStudent, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">पासवर्ड:</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.password || ""}
                    onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">लक्ष्य परीक्षा:</label>
                  <select
                    value={editingStudent.examTarget}
                    onChange={(e) => setEditingStudent({ ...editingStudent, examTarget: e.target.value as ExamType })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white outline-none"
                  >
                    <option value="MHT_CET">MHT-CET</option>
                    <option value="NEET">NEET</option>
                    <option value="JEE_MAIN">JEE Main</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मंजुरी स्टेटस:</label>
                  <select
                    value={editingStudent.approvalStatus}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        approvalStatus: e.target.value as any,
                        isApproved: e.target.value === "approved",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white outline-none"
                  >
                    <option value="approved">मंजूर (Approved)</option>
                    <option value="pending">प्रलंबित (Pending)</option>
                    <option value="rejected">ब्लॉक (Rejected)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">कोचिंग क्लासेस कोड (ऐच्छिक):</label>
                <input
                  type="text"
                  value={editingStudent.instituteCode || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      instituteCode: e.target.value.toUpperCase() || undefined,
                    })
                  }
                  placeholder="उदा. CHATE किंवा MIMARATHI"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  बदल सेव्ह करा (Save Changes)
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT COACHING INSTITUTE ================= */}
      {editingInstitute && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>कोचिंग क्लासेस माहिती संपादन (Edit Class)</span>
              </h3>
              <button
                onClick={() => setEditingInstitute(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedInstitute} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">क्लासेसचे नाव (मराठी):</label>
                  <input
                    type="text"
                    required
                    value={editingInstitute.nameMr || ""}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, nameMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">युनिक क्लासेस कोड:</label>
                  <input
                    type="text"
                    required
                    value={editingInstitute.instituteCode}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, instituteCode: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">संचालकांचे नाव:</label>
                  <input
                    type="text"
                    value={editingInstitute.directorName}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, directorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">संपर्क फोन नंबर:</label>
                  <input
                    type="tel"
                    value={editingInstitute.contactNumber}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">शहर / ठिकाण:</label>
                  <input
                    type="text"
                    value={editingInstitute.city}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ॲडमिन पासवर्ड:</label>
                  <input
                    type="text"
                    value={editingInstitute.adminPasscode || ""}
                    onChange={(e) => setEditingInstitute({ ...editingInstitute, adminPasscode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer"
                >
                  क्लासेस बदल सेव्ह करा
                </button>
                <button
                  type="button"
                  onClick={() => setEditingInstitute(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT AGENT ================= */}
      {editingAgent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-teal-600" />
                <span>एजंट माहिती संपादन (Edit Agent)</span>
              </h3>
              <button
                onClick={() => setEditingAgent(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedAgent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">एजंटचे नाव:</label>
                <input
                  type="text"
                  required
                  value={editingAgent.name}
                  onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाईल:</label>
                  <input
                    type="tel"
                    required
                    value={editingAgent.mobile}
                    onChange={(e) => setEditingAgent({ ...editingAgent, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">रेफरल कोड:</label>
                  <input
                    type="text"
                    required
                    value={editingAgent.referralCode}
                    onChange={(e) => setEditingAgent({ ...editingAgent, referralCode: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">एकूण रेफरल्स:</label>
                  <input
                    type="number"
                    value={editingAgent.totalReferredStudents}
                    onChange={(e) => setEditingAgent({ ...editingAgent, totalReferredStudents: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">जमा कमिशन (₹):</label>
                  <input
                    type="number"
                    value={editingAgent.totalEarnedCommission}
                    onChange={(e) => setEditingAgent({ ...editingAgent, totalEarnedCommission: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer"
                >
                  एजंट माहिती सेव्ह करा
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAgent(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  रद्द करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD STUDENT ================= */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">+ नवीन विद्यार्थी जोडा</h3>
              <button
                onClick={() => setIsAddingStudent(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">विद्यार्थ्याचे नाव:</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल सचिन पाटील"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाईल नंबर (10 Digit):</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="उदा. 9876543210"
                    value={newStudentMobile}
                    onChange={(e) => setNewStudentMobile(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">पासवर्ड:</label>
                  <input
                    type="text"
                    value={newStudentPassword}
                    onChange={(e) => setNewStudentPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">लक्ष्य परीक्षा:</label>
                  <select
                    value={newStudentExam}
                    onChange={(e) => setNewStudentExam(e.target.value as ExamType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold bg-white outline-none"
                  >
                    <option value="MHT_CET">MHT-CET</option>
                    <option value="NEET">NEET</option>
                    <option value="JEE_MAIN">JEE Main</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">क्लासेस कोड (ऐच्छिक):</label>
                  <input
                    type="text"
                    placeholder="उदा. CHATE"
                    value={newStudentInstitute}
                    onChange={(e) => setNewStudentInstitute(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
              >
                विद्यार्थी सेव्ह करा
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD COACHING INSTITUTE ================= */}
      {isAddingInstitute && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">+ नवीन क्लासेस जोडा (Add Class)</h3>
              <button
                onClick={() => setIsAddingInstitute(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInstitute} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">क्लासेस नाव (मराठी):</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. माऊली सायन्स ॲकॅडमी"
                    value={newInstNameMr}
                    onChange={(e) => setNewInstNameMr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">युनिक क्लासेस कोड:</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. MAULI100"
                    value={newInstCode}
                    onChange={(e) => setNewInstCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">संचालकांचे नाव:</label>
                  <input
                    type="text"
                    placeholder="उदा. प्रा. सचिन पाटील"
                    value={newInstDirector}
                    onChange={(e) => setNewInstDirector(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाईल नंबर:</label>
                  <input
                    type="tel"
                    placeholder="उदा. 9876543210"
                    value={newInstContact}
                    onChange={(e) => setNewInstContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">शहर / जिल्हा:</label>
                  <input
                    type="text"
                    placeholder="उदा. पुणे / लातूर"
                    value={newInstCity}
                    onChange={(e) => setNewInstCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ॲडमिन पासवर्ड:</label>
                  <input
                    type="text"
                    placeholder="class2026"
                    value={newInstPasscode}
                    onChange={(e) => setNewInstPasscode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer"
              >
                क्लासेस नोंदणी पूर्ण करा
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
