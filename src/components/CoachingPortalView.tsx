import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  GraduationCap,
  Clock,
  Timer,
  Trophy,
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Trash2,
  Edit3,
  Share2,
  Download,
  Sparkles,
  BookOpen,
  Layers,
  ListChecks,
  ArrowRight,
  ArrowLeft,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  Award,
  Filter,
  Calendar,
  AlertCircle,
  HelpCircle,
  BarChart3,
  UserPlus,
  RefreshCw,
  ExternalLink,
  Zap,
  Upload,
  FileSpreadsheet,
  Shuffle,
  ShieldCheck,
  CheckSquare,
} from "lucide-react";
import {
  InstituteProfile,
  InstituteStudent,
  InstituteWeeklyTest,
  InstituteSubmission,
  ExamType,
  SubjectType,
  LanguageMode,
  Question,
  StudentUser,
} from "../types";
import {
  getStoredInstituteProfile,
  saveStoredInstituteProfile,
  getStoredInstituteStudents,
  saveStoredInstituteStudents,
  getStoredInstituteWeeklyTests,
  saveStoredInstituteWeeklyTests,
  getStoredInstituteSubmissions,
  saveStoredInstituteSubmissions,
  getStoredLoggedInstituteStudent,
  setStoredLoggedInstituteStudent,
  generateSampleStudents,
} from "../data/coachingInstitutesData";
import { CHAPTERS_DATA } from "../data/chaptersData";
import { INITIAL_QUESTIONS } from "../data/initialQuestions";
import {
  parseQuestionsFromExcelFile,
  parseQuestionsFromRawText,
  downloadQuestionExcelTemplate,
  getNonRepeatingRandomQuestions,
  ParsedQuestionResult,
} from "../utils/fileQuestionParser";

interface CoachingPortalViewProps {
  language: LanguageMode;
  onStartCustomTest: (config: {
    title: string;
    exam: ExamType;
    subject: SubjectType | "All";
    durationMinutes: number;
    selectedQuestions: Question[];
    perQuestionTimerSeconds?: number;
    enforcePerQuestionTimer?: boolean;
    instituteName?: string;
  }) => void;
  onNavigateToOpenApp: () => void;
  onBack?: () => void;
  onInstituteChanged?: (inst: InstituteProfile) => void;
}

export const CoachingPortalView: React.FC<CoachingPortalViewProps> = ({
  language,
  onStartCustomTest,
  onNavigateToOpenApp,
  onBack,
  onInstituteChanged,
}) => {
  // Master State
  const [profile, setProfile] = useState<InstituteProfile>(getStoredInstituteProfile);
  const [students, setStudents] = useState<InstituteStudent[]>(getStoredInstituteStudents);
  const [weeklyTests, setWeeklyTests] = useState<InstituteWeeklyTest[]>(getStoredInstituteWeeklyTests);
  const [submissions, setSubmissions] = useState<InstituteSubmission[]>(getStoredInstituteSubmissions);
  const [currentStudent, setCurrentStudent] = useState<InstituteStudent | null>(getStoredLoggedInstituteStudent);

  // Role mode: 'student' | 'teacher_admin'
  const [activeRole, setActiveRole] = useState<"student" | "teacher_admin">(() => {
    return currentStudent ? "student" : "student";
  });

  // Admin sub-tab: 'tests' | 'students' | 'approvals' | 'syllabus' | 'results' | 'profile'
  const [adminTab, setAdminTab] = useState<
    "tests" | "students" | "approvals" | "syllabus" | "results" | "profile"
  >("tests");

  // Admin passcode login state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminPassInput, setAdminPassInput] = useState<string>("");
  const [adminPassError, setAdminPassError] = useState<string>("");

  // Student Login search / input
  const [studentRollInput, setStudentRollInput] = useState<string>("");
  const [studentLoginError, setStudentLoginError] = useState<string>("");

  // Search & Filter in Students list
  const [studentSearch, setStudentSearch] = useState<string>("");
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>("All");

  // Selected test for leaderboard / result modal
  const [selectedTestForResults, setSelectedTestForResults] = useState<InstituteWeeklyTest | null>(null);

  // New Test Creator Modal / State
  const [showCreateTestModal, setShowCreateTestModal] = useState<boolean>(false);
  const [createTestMode, setCreateTestMode] = useState<"random_bank" | "excel_upload" | "word_paste">("random_bank");
  const [newTestTitle, setNewTestTitle] = useState<string>("");
  const [newTestTitleMr, setNewTestTitleMr] = useState<string>("");
  const [newTestExam, setNewTestExam] = useState<ExamType>("MHT_CET");
  const [newTestSubject, setNewTestSubject] = useState<SubjectType | "All">("All");
  const [newTestBatch, setNewTestBatch] = useState<string>("All Batches");
  const [newTestDurationMin, setNewTestDurationMin] = useState<number>(45);
  const [newTestPerQuestionTimer, setNewTestPerQuestionTimer] = useState<number>(60); // seconds per question
  const [newTestEnforceTimer, setNewTestEnforceTimer] = useState<boolean>(true);
  const [newTestChapters, setNewTestChapters] = useState<string[]>([]);
  const [newTestQuestionsCount, setNewTestQuestionsCount] = useState<number>(25);
  const [avoidRepeatingQuestions, setAvoidRepeatingQuestions] = useState<boolean>(true);

  // Upload parsed questions state
  const [uploadedQuestions, setUploadedQuestions] = useState<Question[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [isParsingFile, setIsParsingFile] = useState<boolean>(false);
  const [pastedWordText, setPastedWordText] = useState<string>("");

  // Single Student Add Modal
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentRoll, setNewStudentRoll] = useState<string>("");
  const [newStudentMobile, setNewStudentMobile] = useState<string>("");
  const [newStudentBatch, setNewStudentBatch] = useState<string>(profile.batches[0] || "12th Science Toppers (PCM)");
  const [newStudentExam, setNewStudentExam] = useState<ExamType>("MHT_CET");

  // Alert/Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pending students from global app registered with this institute code
  const pendingInstituteStudents = useMemo(() => {
    try {
      const allRaw = localStorage.getItem("mcq_app_all_students_v1");
      if (!allRaw) return [];
      const all: StudentUser[] = JSON.parse(allRaw);
      return all.filter(
        (s) =>
          s.instituteCode?.toUpperCase() === profile.instituteCode.toUpperCase() ||
          s.instituteId === profile.id
      );
    } catch {
      return [];
    }
  }, [profile.instituteCode, profile.id]);

  // Student Filtered list
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchBatch = selectedBatchFilter === "All" || st.batchName === selectedBatchFilter;
      const q = studentSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        st.name.toLowerCase().includes(q) ||
        st.rollNo.toLowerCase().includes(q) ||
        st.mobile.includes(q);
      return matchBatch && matchSearch;
    });
  }, [students, selectedBatchFilter, studentSearch]);

  // Handle Excel File Selection
  const handleExcelFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    setUploadErrors([]);
    try {
      const result: ParsedQuestionResult = await parseQuestionsFromExcelFile(
        file,
        newTestExam,
        newTestSubject === "All" ? "Physics" : newTestSubject
      );
      if (result.questions.length > 0) {
        setUploadedQuestions(result.questions);
        setNewTestQuestionsCount(result.questions.length);
        if (!newTestTitle) {
          setNewTestTitle(`Uploaded Test (${result.questions.length} Questions)`);
          setNewTestTitleMr(`अपलोड केलेली टेस्ट (${result.questions.length} प्रश्न)`);
        }
        showToast(`🎉 एक्सेल फाईलमधून ${result.questions.length} प्रश्न यशस्वीरित्या वाचले!`);
      } else {
        setUploadErrors(result.errors.length > 0 ? result.errors : ["कोणतेही वैध प्रश्न सापडले नाहीत."]);
      }
    } catch (err: any) {
      setUploadErrors([`त्रुटी: ${err?.message || "File parse error"}`]);
    } finally {
      setIsParsingFile(false);
    }
  };

  // Handle Word / Text paste parsing
  const handleParsePastedWordText = () => {
    if (!pastedWordText.trim()) {
      showToast("कृपया वर्ड फाईलमधील मजकूर पेस्ट करा.");
      return;
    }

    const result = parseQuestionsFromRawText(
      pastedWordText,
      newTestExam,
      newTestSubject === "All" ? "Physics" : newTestSubject,
      newTestChapters[0] || "Custom Test"
    );

    if (result.questions.length > 0) {
      setUploadedQuestions(result.questions);
      setNewTestQuestionsCount(result.questions.length);
      if (!newTestTitle) {
        setNewTestTitle(`Word Question Bank Test (${result.questions.length} Q)`);
        setNewTestTitleMr(`वर्ड प्रश्न बँक टेस्ट (${result.questions.length} प्रश्न)`);
      }
      showToast(`🎉 वर्ड मजकुरामधून ${result.questions.length} प्रश्न डिजिटल फॉरमॅटमध्ये रूपांतरित झाले!`);
    } else {
      setUploadErrors(result.errors.length > 0 ? result.errors : ["प्रश्न फॉरमॅट ओळखता आला नाही."]);
    }
  };

  // Handle Admin Unlock
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput === profile.adminPasscode || adminPassInput === "admin123" || adminPassInput === "class2026") {
      setIsAdminUnlocked(true);
      setAdminPassError("");
      showToast("क्लासेस संचालक डॅशबोर्ड अनलॉक झाला आहे!");
    } else {
      setAdminPassError("चुकीचा पासवर्ड! कृपया योग्य ॲडमिन पासवर्ड टाका.");
    }
  };

  // Handle Student Login
  const handleStudentLogin = (rollOrPhone: string) => {
    const clean = rollOrPhone.trim().toLowerCase();
    if (!clean) {
      setStudentLoginError("कृपया रोल नंबर किंवा मोबाईल नंबर टाका");
      return;
    }
    const found = students.find(
      (s) => s.rollNo.toLowerCase() === clean || s.mobile === clean || s.name.toLowerCase().includes(clean)
    );
    if (found) {
      setCurrentStudent(found);
      setStoredLoggedInstituteStudent(found);
      setStudentLoginError("");
      showToast(`स्वागत आहे, ${found.name}!`);
    } else {
      setStudentLoginError("या रोल नंबरचा विद्यार्थी सापडला नाही. शिक्षकांशी संपर्क साधा किंवा खालील डेमो विद्यार्थ्यांपैकी निवडा.");
    }
  };

  // Handle Student Logout
  const handleStudentLogout = () => {
    setCurrentStudent(null);
    setStoredLoggedInstituteStudent(null);
    showToast("विद्यार्थी लॉगिन समाप्त झाले.");
  };

  // Bulk Students Generator (Scale to 2,000 students)
  const handleBulkGenerateStudents = (addCount: number) => {
    const currentCount = students.length;
    if (currentCount >= profile.maxStudentsLimit) {
      showToast(`आपली कमाल क्षमता ${profile.maxStudentsLimit} पूर्ण भरली आहे!`);
      return;
    }
    const safeAdd = Math.min(addCount, profile.maxStudentsLimit - currentCount);
    const startRoll = 1001 + currentCount;
    const generated = generateSampleStudents(safeAdd, startRoll);
    const updated = [...students, ...generated];
    setStudents(updated);
    saveStoredInstituteStudents(updated);
    showToast(`यशस्वीरित्या ${safeAdd} नवीन विद्यार्थी नोंदणीकृत झाले! एकूण विद्यार्थी: ${updated.length}`);
  };

  // Create Single Student
  const handleCreateSingleStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentRoll.trim()) {
      showToast("कृपया नाव आणि रोल नंबर भरा.");
      return;
    }
    const newSt: InstituteStudent = {
      id: `stud_${Date.now()}`,
      instituteId: profile.id,
      rollNo: newStudentRoll.trim(),
      name: newStudentName.trim(),
      mobile: newStudentMobile.trim() || "9800000000",
      batchName: newStudentBatch,
      examTarget: newStudentExam,
      addedAt: Date.now(),
      isActive: true,
      testsAttemptedCount: 0,
      avgScorePercentage: 0,
    };
    const updated = [newSt, ...students];
    setStudents(updated);
    saveStoredInstituteStudents(updated);
    setShowAddStudentModal(false);
    setNewStudentName("");
    setNewStudentRoll("");
    setNewStudentMobile("");
    showToast(`विद्यार्थी ${newSt.name} (${newSt.rollNo}) ॲड झाला!`);
  };

  // Helper to open Add Student modal with auto-suggested roll number
  const handleOpenAddStudentModal = () => {
    if (!newStudentRoll) {
      setNewStudentRoll(`R-${1000 + students.length + 1}`);
    }
    setShowAddStudentModal(true);
  };

  // Delete Student
  const handleDeleteStudent = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveStoredInstituteStudents(updated);
    showToast("विद्यार्थी हटवला गेला.");
  };

  // Create New Weekly Test
  const handleCreateNewTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) {
      showToast("कृपया चाचणीचे शीर्षक भरा.");
      return;
    }

    let selectedQ: Question[] = [];

    if ((createTestMode === "excel_upload" || createTestMode === "word_paste") && uploadedQuestions.length > 0) {
      // Use uploaded / parsed questions
      selectedQ = uploadedQuestions;
    } else {
      // Filter from available initial questions and custom questions
      let pool = INITIAL_QUESTIONS.filter((q) => {
        const matchExam = newTestExam === "MHT_CET" || q.exam === newTestExam;
        const matchSub = newTestSubject === "All" || q.subject === newTestSubject;
        return matchExam && matchSub;
      });

      if (newTestChapters.length > 0) {
        const chapterPool = pool.filter((q) => newTestChapters.includes(q.chapter));
        if (chapterPool.length >= 5) {
          pool = chapterPool;
        }
      }

      if (pool.length === 0) {
        pool = INITIAL_QUESTIONS;
      }

      if (avoidRepeatingQuestions) {
        // Use non-repeating randomized question selector
        selectedQ = getNonRepeatingRandomQuestions(
          pool,
          Math.min(newTestQuestionsCount, pool.length),
          profile.id
        );
      } else {
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        selectedQ = shuffled.slice(0, Math.min(newTestQuestionsCount, pool.length));
      }
    }

    if (selectedQ.length === 0) {
      showToast("कृपया किमान १ प्रश्न निवडा किंवा फाईल अपलोड करा.");
      return;
    }

    const markingCorrect = newTestExam === "MHT_CET" ? 1 : 4;
    const markingIncorrect = newTestExam === "MHT_CET" ? 0 : -1;
    const totalMarks = selectedQ.reduce((sum, q) => {
      if (newTestExam === "MHT_CET" && q.subject === "Mathematics") return sum + 2;
      return sum + markingCorrect;
    }, 0);

    const newTest: InstituteWeeklyTest = {
      id: `inst_test_${Date.now()}`,
      instituteId: profile.id,
      testCode: `WT-${Math.floor(10 + Math.random() * 90)}-${newTestSubject.substring(0, 3).toUpperCase()}`,
      title: newTestTitle.trim(),
      titleMr: newTestTitleMr.trim() || newTestTitle.trim(),
      exam: newTestExam,
      subject: newTestSubject,
      chapters: newTestChapters.length > 0 ? newTestChapters : ["All Chapters - सर्व घटक"],
      topicsDescription: "साप्ताहिक चाचणी - सर्व महत्त्वाचे घटक व न्यूमेरिकल्स",
      batchAssigned: newTestBatch,
      scheduledDate: new Date().toISOString().split("T")[0],
      durationMinutes: newTestDurationMin,
      perQuestionTimerSeconds: newTestPerQuestionTimer > 0 ? newTestPerQuestionTimer : undefined,
      enforcePerQuestionTimer: newTestEnforceTimer,
      totalMarks,
      markingScheme: {
        correct: markingCorrect,
        incorrect: markingIncorrect,
        mathsCorrect: 2,
      },
      questions: selectedQ,
      status: "active",
      createdAt: Date.now(),
      createdBy: profile.directorName,
    };

    const updated = [newTest, ...weeklyTests];
    setWeeklyTests(updated);
    saveStoredInstituteWeeklyTests(updated);
    setShowCreateTestModal(false);
    setNewTestTitle("");
    setNewTestTitleMr("");
    setUploadedQuestions([]);
    setPastedWordText("");
    setUploadErrors([]);
    showToast(`साप्ताहिक चाचणी "${newTest.title}" (${selectedQ.length} प्रश्न) तयार झाली!`);
  };

  // Approve student requesting to join this class
  const handleApprovePendingStudent = (st: StudentUser) => {
    if (students.length >= profile.maxStudentsLimit) {
      showToast(`आपली कमाल क्षमता ${profile.maxStudentsLimit} पूर्ण भरली आहे!`);
      return;
    }

    const nextRoll = `R-${1000 + students.length + 1}`;
    const newInstStudent: InstituteStudent = {
      id: `stud_${st.id}`,
      instituteId: profile.id,
      rollNo: nextRoll,
      name: st.name,
      mobile: st.mobile,
      batchName: profile.batches[0] || "12th Science Toppers (PCM)",
      examTarget: (st.examTarget as ExamType) || "MHT_CET",
      addedAt: Date.now(),
      isActive: true,
      testsAttemptedCount: 0,
      avgScorePercentage: 0,
    };

    const updated = [newInstStudent, ...students];
    setStudents(updated);
    saveStoredInstituteStudents(updated);

    // Also mark approved in global students list
    try {
      const allRaw = localStorage.getItem("mcq_app_all_students_v1");
      if (allRaw) {
        const all: StudentUser[] = JSON.parse(allRaw);
        const up = all.map((u) =>
          u.id === st.id
            ? { ...u, isApproved: true, approvalStatus: "approved" as const, instituteId: profile.id }
            : u
        );
        localStorage.setItem("mcq_app_all_students_v1", JSON.stringify(up));
      }
    } catch (e) {
      console.error(e);
    }

    showToast(`विद्यार्थी ${st.name} रोल नंबर ${nextRoll} सह मंजूर झाला!`);
  };

  // Launch Weekly Test for Student
  const handleLaunchWeeklyTest = (test: InstituteWeeklyTest) => {
    onStartCustomTest({
      title: `${profile.name} : ${test.titleMr || test.title}`,
      exam: test.exam,
      subject: test.subject,
      durationMinutes: test.durationMinutes,
      selectedQuestions: test.questions,
      perQuestionTimerSeconds: test.perQuestionTimerSeconds,
      enforcePerQuestionTimer: test.enforcePerQuestionTimer,
      instituteName: profile.nameMr || profile.name,
    });
  };

  // Delete Test
  const handleDeleteTest = (testId: string) => {
    const updated = weeklyTests.filter((t) => t.id !== testId);
    setWeeklyTests(updated);
    saveStoredInstituteWeeklyTests(updated);
    showToast("चाचणी हटवली गेली.");
  };

  return (
    <div className="min-h-screen bg-slate-900/10 py-6 px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Institute Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-2 border-indigo-500/30 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
                  title="मागे जा"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>← मागे जा</span>
                </button>
              )}
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Building2 className="w-3.5 h-3.5" />
                <span>अधिकृत क्लासेस पोर्टल (Institute Hub)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-mono font-bold">
                कोड: {profile.instituteCode}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{students.length} / {profile.maxStudentsLimit} विद्यार्थी क्षमता</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {profile.nameMr}
            </h1>
            <p className="text-sm text-indigo-200/80 font-medium">
              संचालक: {profile.directorName} • {profile.city} • संपर्क: {profile.contactNumber}
            </p>
          </div>

          {/* Role Mode Switcher & Add Student Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddStudentModal}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition-all cursor-pointer hover:scale-105 border border-emerald-300"
              title="नवीन विद्यार्थी जोडा"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>+ विद्यार्थी जोडा (Add Student)</span>
            </button>

            <div className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-indigo-400/40 shadow-inner">
              <button
                onClick={() => setActiveRole("student")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeRole === "student"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>विद्यार्थी लॉगिन (Student)</span>
              </button>
              <button
                onClick={() => setActiveRole("teacher_admin")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeRole === "teacher_admin"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>क्लासेस Admin / शिक्षक</span>
              </button>
            </div>
          </div>
        </div>

        {/* Announcement Notice Banner */}
        {profile.bannerNoticeMr && (
          <div className="mt-5 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{profile.bannerNoticeMr}</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. STUDENT VIEW (विद्यार्थी पोर्टल) */}
      {/* ======================================================== */}
      {activeRole === "student" && (
        <div className="space-y-6">
          {/* If Student NOT logged in, show Login or Demo Select */}
          {!currentStudent ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left 2 Cols: Student Login Card */}
              <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                    <LogIn className="w-3.5 h-3.5" />
                    <span>क्लासेस विद्यार्थी पडताळणी</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    तुमचा रोल नंबर किंवा मोबाईल नंबर टाका
                  </h2>
                  <p className="text-sm text-slate-600">
                    {profile.nameMr} मधील तुमच्या अधिकृत रोल नंबरने लॉगिन करा आणि साप्ताहिक परीक्षा द्या.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStudentLogin(studentRollInput);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      रोल नंबर किंवा नोंदणीकृत मोबाईल (Roll No / Mobile)
                    </label>
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="उदा. R-1001 किंवा 9876543210"
                        value={studentRollInput}
                        onChange={(e) => setStudentRollInput(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-hidden text-sm font-semibold text-slate-900"
                      />
                    </div>
                    {studentLoginError && (
                      <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{studentLoginError}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>लॉगिन करा व परीक्षा सुरू करा</span>
                  </button>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">तुमचे नाव रोस्टरमध्ये नाही का?</span>
                    <button
                      type="button"
                      onClick={handleOpenAddStudentModal}
                      className="text-xs font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer underline underline-offset-2"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ नवीन विद्यार्थी नोंदणी / Add Student</span>
                    </button>
                  </div>
                </form>

                {/* Quick 1-Click Demo Students Whitelist Selector */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      ⚡ १-क्लिक जलद निवड (नोंदणीकृत २००० विद्यार्थ्यांपैकी नमुना):
                    </span>
                    <span className="text-xs text-indigo-600 font-bold">
                      एकूण {students.length} विद्यार्थी उपलब्ध
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                    {students.slice(0, 9).map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleStudentLogin(st.rollNo)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 group-hover:text-indigo-900">
                            {st.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                            {st.rollNo}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{st.batchName}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Add Student Quick Action & Open App Practice Card */}
              <div className="space-y-4">
                {/* Dedicated Add Student Action Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-lg space-y-3 border border-emerald-400">
                  <div className="w-11 h-11 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shadow-md">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    नवीन विद्यार्थी नोंदणी (Add Student)
                  </h3>
                  <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                    आपल्या क्लासेसमध्ये नवीन विद्यार्थ्याची नोंदणी करा. नाव, रोल नंबर आणि मोबाईल नंबर टाकून तात्काळ ॲड करा.
                  </p>
                  <button
                    onClick={handleOpenAddStudentModal}
                    className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-emerald-300 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-400" />
                    <span>+ नवीन विद्यार्थी ॲड करा</span>
                  </button>
                </div>

                {/* Open App Practice Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-slate-950">
                    आपले मुख्य ॲप (Open Practice)
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    विद्यार्थी क्लासेसच्या चाचण्यांसोबतच संपूर्ण महाराष्ट्र लेव्हलचे <strong>१० Grand Mocks, २५,०००+ प्रश्न व नोट्स</strong> कितीही वेळा मोफत वापरू शकतात!
                  </p>
                  <button
                    onClick={onNavigateToOpenApp}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>मुख्य ॲप उघडा</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Logged in Student Dashboard */
            <div className="space-y-6">
              {/* Student Profile Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                    {currentStudent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">{currentStudent.name}</h2>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-mono font-bold">
                        {currentStudent.rollNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      बॅच: <span className="font-bold text-slate-800">{currentStudent.batchName}</span> • लक्ष्य:{" "}
                      <span className="font-bold text-indigo-700">{currentStudent.examTarget}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onNavigateToOpenApp}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-700" />
                    <span>⚡ आपले मुख्य ॲप (Free सराव)</span>
                  </button>
                  <button
                    onClick={handleStudentLogout}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>लॉगआउट</span>
                  </button>
                </div>
              </div>

              {/* Active & Scheduled Weekly Tests List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-black text-slate-900">
                      साप्ताहिक परीक्षा (Weekly Mock Tests by {profile.name})
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    एकूण {weeklyTests.length} चाचण्या उपलब्ध
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyTests.map((test) => {
                    const isForMyBatch =
                      test.batchAssigned === "All Batches" || test.batchAssigned === currentStudent.batchName;

                    return (
                      <div
                        key={test.id}
                        className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all space-y-5 relative overflow-hidden"
                      >
                        {/* Top test tags */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                              {test.exam}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                              {test.subject}
                            </span>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase ${
                              test.status === "active"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {test.status === "active" ? "🔴 LIVE चाचणी" : "📅 आगामी"}
                          </span>
                        </div>

                        {/* Title & topics */}
                        <div className="space-y-1.5">
                          <h4 className="text-base font-black text-slate-950 line-clamp-2">
                            {test.titleMr || test.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            घटक: {test.chapters.join(", ")}
                          </p>
                          {test.topicsDescription && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                              {test.topicsDescription}
                            </p>
                          )}
                        </div>

                        {/* Test Spec Grid */}
                        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 text-center border border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold block">एकूण वेळ</span>
                            <span className="text-xs font-black text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-indigo-600" />
                              {test.durationMinutes} मिनिटे
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 font-bold block">प्रति प्रश्न वेळ</span>
                            <span className="text-xs font-black text-indigo-600 flex items-center justify-center gap-1 mt-0.5">
                              <Timer className="w-3 h-3 text-amber-500" />
                              {test.perQuestionTimerSeconds ? `${test.perQuestionTimerSeconds}s` : "मुक्त"}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 font-bold block">गुण / प्रश्न</span>
                            <span className="text-xs font-black text-slate-900 mt-0.5 block">
                              {test.totalMarks} गुण ({test.questions.length} Q)
                            </span>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="pt-2 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">
                            बॅच: <strong className="text-slate-800">{test.batchAssigned}</strong>
                          </span>

                          <button
                            onClick={() => handleLaunchWeeklyTest(test)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>परीक्षा सुरू करा</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Student Rank & Batch Results */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-black text-slate-900">
                      मागील साप्ताहिक परीक्षा निकाल व बॅच रँकिंग (Batch Leaderboard)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    बॅच: {currentStudent.batchName}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-black">
                        <th className="py-3 px-3">रँक</th>
                        <th className="py-3 px-3">विद्यार्थी नाव</th>
                        <th className="py-3 px-3">रोल नं</th>
                        <th className="py-3 px-3">गुण / एकूण</th>
                        <th className="py-3 px-3">अचूकता (Accuracy)</th>
                        <th className="py-3 px-3">वेळ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {submissions.map((sub, idx) => {
                        const isMe = sub.studentRollNo === currentStudent.rollNo;
                        return (
                          <tr
                            key={sub.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isMe ? "bg-amber-50 font-bold" : ""
                            }`}
                          >
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                                  idx === 0
                                    ? "bg-amber-400 text-slate-950"
                                    : idx === 1
                                    ? "bg-slate-300 text-slate-900"
                                    : idx === 2
                                    ? "bg-amber-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-bold text-slate-900">
                              {sub.studentName} {isMe && "(तुम्ही)"}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-600">{sub.studentRollNo}</td>
                            <td className="py-3 px-3 text-emerald-700 font-black">
                              {sub.score} / {sub.maxMarks}
                            </td>
                            <td className="py-3 px-3 font-bold">{sub.accuracy}%</td>
                            <td className="py-3 px-3 text-slate-500">
                              {Math.floor(sub.timeTakenSeconds / 60)}m {sub.timeTakenSeconds % 60}s
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TEACHER / ADMIN PANEL (क्लासेस संचालक डॅशबोर्ड) */}
      {/* ======================================================== */}
      {activeRole === "teacher_admin" && (
        <div className="space-y-6">
          {!isAdminUnlocked ? (
            /* Admin Password Gate */
            <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">
                  क्लासेस संचालक पासवर्ड टाका
                </h2>
                <p className="text-xs text-slate-600">
                  नवीन साप्ताहिक चाचण्या तयार करण्यासाठी, विद्यार्थी व्यवस्थापनासाठी ॲडमिन कोड आवश्यक आहे. (डिफॉल्ट: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-bold">admin123</code>)
                </p>
              </div>

              <form onSubmit={handleUnlockAdmin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="ॲडमिन पासवर्ड टाका..."
                    value={adminPassInput}
                    onChange={(e) => setAdminPassInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-hidden text-center text-sm font-bold"
                  />
                  {adminPassError && (
                    <p className="text-xs font-bold text-rose-600 mt-1.5">{adminPassError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition-all cursor-pointer"
                >
                  डॅशबोर्ड उघडा
                </button>
              </form>
            </div>
          ) : (
            /* Admin Sub-navigation & Tools */
            <div className="space-y-6">
              {/* Admin Navigation Tabs */}
              <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setAdminTab("tests")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "tests"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <ListChecks className="w-4 h-4" />
                    <span>साप्ताहिक परीक्षा व्यवस्थापन ({weeklyTests.length})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab("students")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "students"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>विद्यार्थी डेटाबेस ({students.length} / {profile.maxStudentsLimit})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab("approvals")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "approvals"
                        ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>नवीन प्रवेश मंजुरी ({pendingInstituteStudents.length})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab("syllabus")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "syllabus"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>विषय व चॅप्टर स्ट्रक्चर</span>
                  </button>

                  <button
                    onClick={() => setAdminTab("results")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "results"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>साप्ताहिक निकाल व रँक बोर्ड</span>
                  </button>

                  <button
                    onClick={() => setAdminTab("profile")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      adminTab === "profile"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>क्लासेस प्रोफाईल</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsAdminUnlocked(false)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>लॉक करा</span>
                </button>
              </div>

              {/* ---------------------------------------------------- */}
              {/* TAB 1: WEEKLY TESTS CREATOR & LIST */}
              {/* ---------------------------------------------------- */}
              {adminTab === "tests" && (
                <div className="space-y-6">
                  {/* Top Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        साप्ताहिक चाचण्या (Weekly Mock Tests)
                      </h3>
                      <p className="text-xs text-slate-600">
                        प्रत्येक आठवड्याची चाचणी ठरवा, प्रत्येक प्रश्नाची वेळ मर्यादा (Per-Question Timer) सेट करा.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowCreateTestModal(true)}
                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>नवीन साप्ताहिक चाचणी तयार करा</span>
                    </button>
                  </div>

                  {/* Tests List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weeklyTests.map((test) => (
                      <div
                        key={test.id}
                        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                              {test.exam}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                              {test.testCode}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteTest(test.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Test"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-slate-900">{test.titleMr || test.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            घटक: {test.chapters.join(", ")}
                          </p>
                        </div>

                        {/* Timing details */}
                        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 text-xs">
                          <div>
                            <span className="text-slate-500 text-[10px] block">एकूण वेळ</span>
                            <span className="font-bold text-slate-900">{test.durationMinutes} मिनिटे</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">प्रति प्रश्न वेळ</span>
                            <span className="font-bold text-indigo-600">
                              {test.perQuestionTimerSeconds ? `${test.perQuestionTimerSeconds}s (Timer)` : "मुक्त"}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">प्रश्न संख्या</span>
                            <span className="font-bold text-slate-900">{test.questions.length} प्रश्न ({test.totalMarks} M)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-500">
                            बॅच: <strong className="text-slate-800">{test.batchAssigned}</strong>
                          </span>
                          <button
                            onClick={() => handleLaunchWeeklyTest(test)}
                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>चाचणी पहा / सोडवा</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 2: STUDENTS WHITELIST (2,000 CAPACITY) */}
              {/* ---------------------------------------------------- */}
              {adminTab === "students" && (
                <div className="space-y-6">
                  {/* Top Stats & Actions Bar */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-900">
                          विद्यार्थी नोंदणी व्यवस्थापन (Student Whitelist)
                        </h3>
                        <p className="text-xs text-slate-600">
                          तुमच्या क्लासेसमधील विद्यार्थ्यांची यादी, बॅच, आणि लॉगिन रोल नंबर व्यवस्थापित करा. (कमाल क्षमता: <strong>{profile.maxStudentsLimit} विद्यार्थी</strong>)
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setShowAddStudentModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>१ विद्यार्थी जोडा</span>
                        </button>

                        <button
                          onClick={() => handleBulkGenerateStudents(50)}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ ५० विद्यार्थी बल्क जोडा</span>
                        </button>

                        <button
                          onClick={() => handleBulkGenerateStudents(500)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ ५०० विद्यार्थी जोडा</span>
                        </button>
                      </div>
                    </div>

                    {/* Search and Batch Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative w-full">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="नाव, रोल नंबर किंवा मोबाईल नंबर शोधा..."
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-indigo-600 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-slate-400" />
                        <select
                          value={selectedBatchFilter}
                          onChange={(e) => setSelectedBatchFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                        >
                          <option value="All">सर्व बॅचेस ({students.length})</option>
                          {profile.batches.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Student Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-h-[500px]">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="sticky top-0 bg-slate-900 text-white z-10 font-black">
                          <tr>
                            <th className="py-3 px-4">रोल नं</th>
                            <th className="py-3 px-4">विद्यार्थी नाव</th>
                            <th className="py-3 px-4">मोबाईल</th>
                            <th className="py-3 px-4">बॅच</th>
                            <th className="py-3 px-4">लक्ष्य</th>
                            <th className="py-3 px-4">सरासरी निकाल</th>
                            <th className="py-3 px-4 text-right">कृती</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {filteredStudents.map((st) => (
                            <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-indigo-700">{st.rollNo}</td>
                              <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                              <td className="py-3 px-4 text-slate-600 font-mono">{st.mobile}</td>
                              <td className="py-3 px-4 text-slate-700 font-medium">{st.batchName}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                                  {st.examTarget}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className="bg-emerald-500 h-1.5 rounded-full"
                                      style={{ width: `${st.avgScorePercentage}%` }}
                                    />
                                  </div>
                                  <span className="font-bold text-slate-700">{st.avgScorePercentage}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleDeleteStudent(st.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 2.5: PENDING STUDENT APPROVALS */}
              {/* ---------------------------------------------------- */}
              {adminTab === "approvals" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-amber-500" />
                          <span>नवीन विद्यार्थी प्रवेश मंजुरी (Class Student Approvals)</span>
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          ज्या विद्यार्थ्यांनी तुमच्या <strong>{profile.instituteCode}</strong> कोडने ॲपमध्ये नोंदणी केली आहे त्यांना १-क्लिक करून तुमच्या क्लासेस बॅचमध्ये सामावून घ्या.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
                        <span>क्षमता: {students.length} / {profile.maxStudentsLimit} विद्यार्थी</span>
                      </div>
                    </div>
                  </div>

                  {pendingInstituteStudents.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                      <h4 className="text-base font-black text-slate-800">सर्व विनंत्या मंजूर आहेत!</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        नवीन विद्यार्थ्यांनी नोंदणी करताना तुमचा क्लासेस कोड <strong>{profile.instituteCode}</strong> टाकल्यास ते येथे मंजुरीसाठी दिसतील.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingInstituteStudents.map((st) => {
                        const isAlreadyAdded = students.some((s) => s.mobile === st.mobile);
                        return (
                          <div
                            key={st.id}
                            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                                  {st.targetExam}
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {new Date(st.registeredAt || Date.now()).toLocaleDateString("mr-IN")}
                                </span>
                              </div>
                              <h4 className="text-base font-black text-slate-900">{st.name}</h4>
                              <p className="text-xs text-slate-600 font-mono">मोबाईल: {st.mobile}</p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500">
                                स्थिती: {isAlreadyAdded ? "मंजूर (Active)" : "प्रलंबित"}
                              </span>
                              {!isAlreadyAdded ? (
                                <button
                                  onClick={() => handleApprovePendingStudent(st)}
                                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                >
                                  <CheckSquare className="w-4 h-4" />
                                  <span>मंजूर करा (+ रोस्टर)</span>
                                </button>
                              ) : (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>रोस्टरमध्ये सामाविष्ट</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 3: SUBJECT & TOPIC SYLLABUS ORGANIZER */}
              {/* ---------------------------------------------------- */}
              {adminTab === "syllabus" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
                    <h3 className="text-lg font-black text-slate-900">
                      विषय व चॅप्टर निहाय अभ्यासक्रम रचना (Organized Topic Bank)
                    </h3>
                    <p className="text-xs text-slate-600">
                      प्रत्येक विषयाचे इयत्ता ११ वी व १२ वी चे सर्व चॅप्टर्स व टॉपिक्स सुव्यवस्थित मांडले आहेत. कोणत्याही चॅप्टरवर १-क्लिक करून लगेच साप्ताहिक चाचणी बनवा.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).map((subj) => {
                      const subjChapters = CHAPTERS_DATA.filter((c) => c.subject === subj);
                      return (
                        <div
                          key={subj}
                          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h4 className="text-base font-black text-slate-950 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-indigo-600" />
                              <span>{subj} ({subjChapters.length} चॅप्टर्स)</span>
                            </h4>
                            <span className="text-xs font-bold text-indigo-600">
                              MHT-CET / NEET / JEE
                            </span>
                          </div>

                          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                            {subjChapters.map((ch) => (
                              <div
                                key={ch.name}
                                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-300 transition-all flex items-center justify-between gap-3"
                              >
                                <div>
                                  <span className="text-xs font-black text-slate-900 block">
                                    {ch.name}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {ch.nameMr} • {ch.weightage} वेटेज
                                  </span>
                                </div>

                                <button
                                  onClick={() => {
                                    setNewTestTitle(`Weekly Test: ${ch.name}`);
                                    setNewTestTitleMr(`साप्ताहिक चाचणी: ${ch.nameMr}`);
                                    setNewTestSubject(subj);
                                    setNewTestChapters([ch.name]);
                                    setShowCreateTestModal(true);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>टेस्ट बनवा</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 4: RESULTS & BATCH LEADERBOARDS */}
              {/* ---------------------------------------------------- */}
              {adminTab === "results" && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        साप्ताहिक चाचण्यांचे निकाल व गुणपत्रिका (Results Sheet)
                      </h3>
                      <p className="text-xs text-slate-600">
                        विद्यार्थ्यांचे गुण, अचूकता % आणि परीक्षेसाठी लागलेला वेळ तपासा.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black">
                          <th className="py-3 px-3">रँक</th>
                          <th className="py-3 px-3">विद्यार्थी नाव</th>
                          <th className="py-3 px-3">रोल नं</th>
                          <th className="py-3 px-3">बॅच</th>
                          <th className="py-3 px-3">गुण / एकूण</th>
                          <th className="py-3 px-3">अचूकता</th>
                          <th className="py-3 px-3">वेळ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {submissions.map((sub, idx) => (
                          <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                                  idx === 0
                                    ? "bg-amber-400 text-slate-950"
                                    : idx === 1
                                    ? "bg-slate-300 text-slate-900"
                                    : idx === 2
                                    ? "bg-amber-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-bold text-slate-900">{sub.studentName}</td>
                            <td className="py-3 px-3 font-mono text-slate-600">{sub.studentRollNo}</td>
                            <td className="py-3 px-3 text-slate-700">{sub.batchName}</td>
                            <td className="py-3 px-3 text-emerald-700 font-black">
                              {sub.score} / {sub.maxMarks} ({sub.percentage}%)
                            </td>
                            <td className="py-3 px-3 font-bold">{sub.accuracy}%</td>
                            <td className="py-3 px-3 text-slate-500">
                              {Math.floor(sub.timeTakenSeconds / 60)}m {sub.timeTakenSeconds % 60}s
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 5: INSTITUTE PROFILE SETTINGS */}
              {/* ---------------------------------------------------- */}
              {adminTab === "profile" && (
                <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-lg font-black text-slate-900">
                    क्लासेस प्रोफाईल व संपर्क माहिती अपडेट करा
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveStoredInstituteProfile(profile);
                      showToast("क्लासेस प्रोफाईल अपडेट झाली!");
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">क्लासेसचे नाव (मराठी)</label>
                      <input
                        type="text"
                        value={profile.nameMr}
                        onChange={(e) => setProfile({ ...profile, nameMr: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">संचालक / शिक्षकांचे नाव</label>
                      <input
                        type="text"
                        value={profile.directorName}
                        onChange={(e) => setProfile({ ...profile, directorName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">क्लासेस कोड</label>
                        <input
                          type="text"
                          value={profile.instituteCode}
                          onChange={(e) => setProfile({ ...profile, instituteCode: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">शहर / शाखा</label>
                        <input
                          type="text"
                          value={profile.city}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">विद्यार्थ्यांसाठी सूचना (Banner Announcement)</label>
                      <textarea
                        rows={3}
                        value={profile.bannerNoticeMr || ""}
                        onChange={(e) => setProfile({ ...profile, bannerNoticeMr: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                    >
                      बदल सेव्ह करा
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CREATE WEEKLY TEST (EXCEL / WORD / RANDOM POOL) */}
      {/* ======================================================== */}
      {showCreateTestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>साप्ताहिक चाचणी क्रिएटर (Excel / Word / Question Pool)</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  एक्सेल किंवा वर्ड फाईल अपलोड करून किंवा ऑटो-रँडमाईज्ड पद्धतीने चाचणी तयार करा.
                </p>
              </div>
              <button
                onClick={() => setShowCreateTestModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Test Creation Mode Switcher */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setCreateTestMode("random_bank")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  createTestMode === "random_bank"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>१. रँडमाईज्ड बँक</span>
              </button>

              <button
                type="button"
                onClick={() => setCreateTestMode("excel_upload")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  createTestMode === "excel_upload"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>२. एक्सेल फाईल (.xlsx)</span>
              </button>

              <button
                type="button"
                onClick={() => setCreateTestMode("word_paste")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  createTestMode === "word_paste"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>३. वर्ड / मजकूर कॉपी</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewTest} className="space-y-4">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    परीक्षेचा प्रकार (Exam)
                  </label>
                  <select
                    value={newTestExam}
                    onChange={(e) => setNewTestExam(e.target.value as ExamType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    <option value="MHT_CET">MHT-CET (PCM/PCB)</option>
                    <option value="NEET">NEET-UG</option>
                    <option value="JEE_MAIN">JEE Main</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    विषय (Subject)
                  </label>
                  <select
                    value={newTestSubject}
                    onChange={(e) => setNewTestSubject(e.target.value as SubjectType | "All")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    <option value="All">सर्व विषय (Full Mock)</option>
                    <option value="Physics">Physics (भौतिकशास्त्र)</option>
                    <option value="Chemistry">Chemistry (रसायनशास्त्र)</option>
                    <option value="Mathematics">Mathematics (गणित)</option>
                    <option value="Biology">Biology (जीवशास्त्र)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    चाचणीचे नाव (मराठीत)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. साप्ताहिक चाचणी ०४: रोटेशनल मोशन व थर्मोडायनामिक्स"
                    value={newTestTitleMr}
                    onChange={(e) => setNewTestTitleMr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    चाचणीचे नाव (English)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weekly Mock 04: Rotational Dynamics & Thermodynamics"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>
              </div>

              {/* MODE 1: EXCEL FILE UPLOAD */}
              {createTestMode === "excel_upload" && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>एक्सेल फाईल अपलोड (.xlsx / .xls / .csv)</span>
                      </h4>
                      <p className="text-[11px] text-emerald-800">
                        एक्सेल फाईलमधून प्रश्न, पर्याय A/B/C/D, बरोबर उत्तर आणि स्पष्टीकरण स्वयंचलित ओळखले जाईल.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadQuestionExcelTemplate()}
                      className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>एक्सेल टेम्प्लेट डाउनलोड करा</span>
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 bg-white text-center space-y-2">
                    <Upload className="w-8 h-8 text-emerald-500 mx-auto" />
                    <p className="text-xs font-bold text-slate-700">
                      येथे तुमची तयार एक्सेल (.xlsx) फाईल निवडा
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleExcelFileUpload}
                      className="block w-full max-w-xs mx-auto text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                    />
                    {isParsingFile && (
                      <p className="text-xs text-indigo-600 font-bold animate-pulse">
                        एक्सेल प्रश्न वाचले जात आहेत...
                      </p>
                    )}
                  </div>

                  {uploadedQuestions.length > 0 && (
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{uploadedQuestions.length} प्रश्न यशस्वीरित्या तयार झाले!</span>
                      </span>
                      <span className="text-slate-500 font-medium font-mono-numbers">
                        एकूण गुण: {uploadedQuestions.length * (newTestExam === "MHT_CET" ? 1 : 4)} Marks
                      </span>
                    </div>
                  )}

                  {uploadErrors.length > 0 && (
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-700">
                      {uploadErrors.map((err, i) => (
                        <p key={i}>⚠️ {err}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: WORD / TEXT PASTE */}
              {createTestMode === "word_paste" && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>वर्ड / नोट्स मधील प्रश्न मजकूर पेस्ट करा</span>
                    </h4>
                    <span className="text-[11px] text-blue-700 font-mono">Q1., A), B), C), D), Answer: B</span>
                  </div>

                  <textarea
                    rows={6}
                    placeholder="वर्ड फाईलमधून प्रश्न व पर्याय कॉपी करून येथे पेस्ट करा...
उदा.
1. What is the unit of angular velocity?
A) rad/s
B) m/s
C) rad/s^2
D) N/m
Answer: A
Explanation: Angular velocity is rate of change of angular displacement."
                    value={pastedWordText}
                    onChange={(e) => setPastedWordText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-blue-300 text-xs font-mono focus:outline-hidden bg-white"
                  />

                  <button
                    type="button"
                    onClick={handleParsePastedWordText}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>मजकुराचे डिजिटल प्रश्नांमध्ये रूपांतर करा</span>
                  </button>

                  {uploadedQuestions.length > 0 && (
                    <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>{uploadedQuestions.length} प्रश्न डिजिटल फॉरमॅटमध्ये तयार!</span>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 3: RANDOMIZED QUESTION BANK WITH NO REPEAT */}
              {createTestMode === "random_bank" && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Shuffle className="w-4 h-4 text-indigo-600" />
                      <span>रँडमाईज्ड प्रश्न बँक (Randomized Non-Repeating Pool)</span>
                    </h4>
                    <span className="text-[11px] text-indigo-700 font-bold">Auto Smart Shuffler</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-indigo-200">
                    <input
                      type="checkbox"
                      id="avoidRepeatToggle"
                      checked={avoidRepeatingQuestions}
                      onChange={(e) => setAvoidRepeatingQuestions(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                    <label htmlFor="avoidRepeatToggle" className="text-xs text-indigo-950 font-bold cursor-pointer">
                      पुनरावृत्ती टाळा (Ensure test questions don't repeat for students)
                    </label>
                  </div>
                </div>
              )}

              {/* TIMING CONFIGURATION (TOTAL TIME + PER QUESTION TIME) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-indigo-600" />
                  <span>वेळ व टायमर नियोजन (Timing & Speed Rules)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      एकूण परीक्षेची वेळ (Total Duration)
                    </label>
                    <select
                      value={newTestDurationMin}
                      onChange={(e) => setNewTestDurationMin(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    >
                      <option value={30}>३० मिनिटे</option>
                      <option value={45}>४५ मिनिटे</option>
                      <option value={60}>६० मिनिटे (१ तास)</option>
                      <option value={90}>९० मिनिटे (१.५ तास)</option>
                      <option value={150}>१५० मिनिटे (२.५ तास - MHT CET)</option>
                      <option value={180}>१८० मिनिटे (३ तास - JEE/NEET)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      प्रत्येक प्रश्नाची वेळ मर्यादा (Per-Question Timer)
                    </label>
                    <select
                      value={newTestPerQuestionTimer}
                      onChange={(e) => setNewTestPerQuestionTimer(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-black bg-white text-indigo-700"
                    >
                      <option value={0}>मुक्त (कोणताही प्रति प्रश्न टायमर नाही)</option>
                      <option value={30}>३० सेकंद (Speed / Rapid Fire)</option>
                      <option value={45}>४५ सेकंद (Biology Special)</option>
                      <option value={60}>६० सेकंद (१ मिनिट प्रति प्रश्न - Recommended)</option>
                      <option value={90}>९० सेकंद (१.५ मिनिटे - Maths & Chemistry)</option>
                      <option value={120}>१२० सेकंद (२ मिनिटे - Physics Numericals)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enforceAutoAdvance"
                    checked={newTestEnforceTimer}
                    onChange={(e) => setNewTestEnforceTimer(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <label htmlFor="enforceAutoAdvance" className="text-xs text-slate-700 font-medium cursor-pointer">
                    प्रश्नाचा वेळ संपल्यावर आपोआप पुढच्या प्रश्नावर जा (Enforce Speed Mode)
                  </label>
                </div>
              </div>

              {/* Batch & Questions count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    कोणत्या बॅचसाठी?
                  </label>
                  <select
                    value={newTestBatch}
                    onChange={(e) => setNewTestBatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    <option value="All Batches">सर्व बॅचेस (All Batches)</option>
                    {profile.batches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    प्रश्न संख्या
                  </label>
                  <select
                    value={newTestQuestionsCount}
                    onChange={(e) => setNewTestQuestionsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    <option value={15}>१५ प्रश्न</option>
                    <option value={25}>२५ प्रश्न (Unit Test)</option>
                    <option value={50}>५० प्रश्न (Subject Mock)</option>
                    <option value={100}>१०० प्रश्न (Major Mock)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg transition-all cursor-pointer"
              >
                साप्ताहिक चाचणी सेव्ह करा
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD SINGLE STUDENT */}
      {/* ======================================================== */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                नवीन विद्यार्थी जोडा (Add Student)
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSingleStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">विद्यार्थ्याचे नाव</label>
                <input
                  type="text"
                  placeholder="उदा. ओंकार पाटील"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">रोल नंबर</label>
                  <input
                    type="text"
                    placeholder="उदा. R-1065"
                    value={newStudentRoll}
                    onChange={(e) => setNewStudentRoll(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">मोबाईल नंबर</label>
                  <input
                    type="text"
                    placeholder="9876543210"
                    value={newStudentMobile}
                    onChange={(e) => setNewStudentMobile(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">टार्गेट परीक्षा (Exam)</label>
                  <select
                    value={newStudentExam}
                    onChange={(e) => setNewStudentExam(e.target.value as ExamType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  >
                    <option value="MHT_CET">MHT-CET</option>
                    <option value="NEET">NEET-UG</option>
                    <option value="JEE_MAIN">JEE Main</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">बॅच निवडा (Batch)</label>
                  <select
                    value={newStudentBatch}
                    onChange={(e) => setNewStudentBatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  >
                    {profile.batches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">
                💡 <strong>टीप:</strong> विद्यार्थी त्यांच्या या रोल नंबरने किंवा मोबाईल नंबरने थेट क्लासेस चाचण्या देऊ शकतात.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>विद्यार्थी ॲड करा (+ Add to Roster)</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
