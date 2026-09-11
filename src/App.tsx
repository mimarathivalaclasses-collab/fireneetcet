import React, { useState, useEffect } from "react";
import {
  ExamType,
  LanguageMode,
  NavigationTab,
  Question,
  TestResultData,
  MistakeItem,
  StudentUser,
  DeviceApprovalRequest,
  StudentTestSubmission,
} from "./types";
import { INITIAL_QUESTIONS } from "./data/initialQuestions";
import { Header } from "./components/Header";
import { TopStatsDashboard } from "./components/TopStatsDashboard";
import { CoachingPortalView } from "./components/CoachingPortalView";
import { MainExamSimulatorView } from "./components/MainExamSimulatorView";
import { AllQuestionsBankView } from "./components/AllQuestionsBankView";
import { TopicNotesView } from "./components/TopicNotesView";
import { HomeGuidanceView } from "./components/HomeGuidanceView";
import { PracticeMode } from "./components/PracticeMode";
import { MockTestSetup } from "./components/MockTestSetup";
import { ActiveTestView } from "./components/ActiveTestView";
import { TestResultView } from "./components/TestResultView";
import { AiQuestionGenerator } from "./components/AiQuestionGenerator";
import { AddQuestionView } from "./components/AddQuestionView";
import { BookmarksView } from "./components/BookmarksView";
import { FormulasView } from "./components/FormulasView";
import { AnalyticsView } from "./components/AnalyticsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { PyqView } from "./components/PyqView";
import { MistakesBankView } from "./components/MistakesBankView";
import { OmrSheetView } from "./components/OmrSheetView";
import { PdfBankGeneratorView } from "./components/PdfBankGeneratorView";
import { FlashcardsView } from "./components/FlashcardsView";
import { AgentPortalView } from "./components/AgentPortalView";
import { StudentReferEarnView } from "./components/StudentReferEarnView";
import { FeedbackReportView } from "./components/FeedbackReportView";
import { ClassesInfoRegistrationView } from "./components/ClassesInfoRegistrationView";
import { UnifiedAuthView } from "./components/UnifiedAuthView";
import { RoleBasedAccessWrapper } from "./components/RoleBasedAccessWrapper";
import { NavigationBreadcrumbBar } from "./components/NavigationBreadcrumbBar";
import { NavigationDrawer } from "./components/NavigationDrawer";
import { VerticalSidebar } from "./components/VerticalSidebar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { AuthModal } from "./components/AuthModal";
import { PaymentModal } from "./components/PaymentModal";
import { AdminApprovalDashboard } from "./components/AdminApprovalDashboard";
import { SecurityWatermark } from "./components/SecurityWatermark";
import { getOrCreateDeviceId, getDeviceName } from "./utils/deviceSecurity";
import { findInstituteByCode } from "./data/coachingInstitutesData";
import {
  deduplicateQuestionsList,
  buildGuaranteedNonRepeatingMock,
  normalizeQuestionSignature,
} from "./utils/proceduralQuestionEngine";
import { saveStudentTestSubmissionToCloud, saveStudentToCloud } from "./services/firebase";
import {
  getAllStudentsFromVaults,
  saveStudentPermanently,
  syncAndHealWithCloud,
  VAULT_KEYS,
  VAULT_EVENT_NAME,
} from "./services/dataVault";
import {
  getUserSession,
  saveUserSession,
  clearUserSession,
  AUTH_EVENT_NAME,
} from "./utils/authSession";

const STORAGE_KEYS = {
  QUESTIONS: "mcq_app_questions_v1",
  BOOKMARKS: "mcq_app_bookmarks_v1",
  TEST_HISTORY: "mcq_app_test_history_v1",
  PRACTICE_STATS: "mcq_app_practice_stats_v1",
  CURRENT_EXAM: "mcq_app_exam_v1",
  LANGUAGE: "mcq_app_lang_v1",
  MISTAKES: "mcq_app_mistakes_v1",
  CURRENT_USER: "mcq_app_current_user_v1",
  TRIAL_SECONDS: "mcq_app_trial_seconds_v1",
  DEVICE_REQUESTS: "mcq_app_device_requests_v1",
};

export default function App() {
  const currentDeviceId = getOrCreateDeviceId();

  // 1. Student User & Authentication State (Multi-layer persistent session)
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    return getUserSession();
  });

  // Listen to cross-component session change events
  useEffect(() => {
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<StudentUser | null>;
      setCurrentUser(customEvent.detail ?? getUserSession());
    };
    window.addEventListener(AUTH_EVENT_NAME, handleAuthChange);
    return () => window.removeEventListener(AUTH_EVENT_NAME, handleAuthChange);
  }, []);

  // 2. 10 Minutes Free Trial State (600 seconds)
  const [trialSecondsRemaining, setTrialSecondsRemaining] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRIAL_SECONDS);
      if (saved !== null) {
        const val = parseInt(saved, 10);
        return isNaN(val) ? 600 : val;
      }
    } catch (e) {
      console.error("Error loading trial seconds", e);
    }
    return 600;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deviceApprovalRequests, setDeviceApprovalRequests] = useState<DeviceApprovalRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEVICE_REQUESTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading approval requests", e);
    }
    return [];
  });

  // 3. Exam & Language State
  const [currentExam, setCurrentExam] = useState<ExamType>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_EXAM);
    return (saved as ExamType) || "NEET";
  });

  const [language, setLanguage] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved as LanguageMode) || "bilingual";
  });

  // Dark Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("app_theme_dark");
      if (saved !== null) return saved === "true";
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("app_theme_dark", String(isDarkMode));
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 4. Active View Navigation (Defaults to "home" guidance)
  const [activeTab, setActiveTab] = useState<NavigationTab>("home");
  const [historyStack, setHistoryStack] = useState<NavigationTab[]>([]);

  // Active Referral Banner State (when someone opens a shared link)
  const [activeReferralBanner, setActiveReferralBanner] = useState<{ type: "agent" | "student"; code: string } | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const agentCode = params.get("agent");
      const refCode = params.get("ref");
      if (agentCode) return { type: "agent", code: agentCode.trim().toUpperCase() };
      if (refCode) return { type: "student", code: refCode.trim().toUpperCase() };
      const savedAgent = localStorage.getItem("referred_by_agent_code");
      if (savedAgent) return { type: "agent", code: savedAgent };
      const savedRef = localStorage.getItem("referred_by_student_code");
      if (savedRef) return { type: "student", code: savedRef };
    } catch {}
    return null;
  });

  // Check URL query parameters for class branding, agent referral, student referral, or specific tabs
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const classCode = params.get("class");
      const agentCode = params.get("agent");
      const refCode = params.get("ref");
      const tabParam = params.get("tab");
      const authParam = params.get("auth");

      if (classCode) {
        const found = findInstituteByCode(classCode);
        if (found) {
          sessionStorage.setItem("active_coaching_institute_v1", JSON.stringify(found));
          setActiveTab("classes_portal");
        }
      }

      if (agentCode) {
        const cleanAgent = agentCode.trim().toUpperCase();
        localStorage.setItem("referred_by_agent_code", cleanAgent);
        setActiveReferralBanner({ type: "agent", code: cleanAgent });
      }

      if (refCode) {
        const cleanRef = refCode.trim().toUpperCase();
        localStorage.setItem("referred_by_student_code", cleanRef);
        setActiveReferralBanner({ type: "student", code: cleanRef });
      }

      if (tabParam) {
        setActiveTab(tabParam as NavigationTab);
      } else if (authParam === "true") {
        setActiveTab("auth_portal");
      }
    } catch (e) {
      console.error("URL params processing error", e);
    }
  }, []);

  const handleNavigateTab = (nextTab: NavigationTab) => {
    if (nextTab === activeTab) return;

    // Public tabs accessible for exploring features
    const publicTabs: NavigationTab[] = [
      "home",
      "classes_portal",
      "classes_info",
      "agent_portal",
      "refer_earn",
      "auth_portal",
      "notes",
      "formulas",
      "leaderboard",
    ];
    if (!currentUser && trialSecondsRemaining <= 0 && !publicTabs.includes(nextTab)) {
      setIsAuthModalOpen(true);
      return;
    }

    setHistoryStack((prev) => [...prev, activeTab]);
    setActiveTab(nextTab);
    setCurrentTestResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackNavigation = () => {
    if (currentTestResult) {
      setCurrentTestResult(null);
      return;
    }
    if (historyStack.length > 0) {
      const previous = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, prev.length - 1));
      setActiveTab(previous);
    } else {
      setActiveTab("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateHome = () => {
    if (activeTab !== "home") {
      setHistoryStack((prev) => [...prev, activeTab]);
      setActiveTab("home");
    }
    setCurrentTestResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Question Bank State (Initial + User added + AI generated)
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with initial questions so user always gets the curated set
          const idMap = new Map<string, Question>();
          INITIAL_QUESTIONS.forEach((q) => idMap.set(q.id, q));
          parsed.forEach((q: Question) => idMap.set(q.id, q));
          return deduplicateQuestionsList(Array.from(idMap.values()));
        }
      }
    } catch (e) {
      console.error("Error reading saved questions", e);
    }
    return deduplicateQuestionsList(INITIAL_QUESTIONS);
  });

  // 4. Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading bookmarks", e);
    }
    return new Set<string>();
  });

  // 5. Mistakes Bank State
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading mistakes bank", e);
    }
    return [];
  });

  // 6. Test History
  const [testHistory, setTestHistory] = useState<TestResultData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_HISTORY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading test history", e);
    }
    return [];
  });

  // 7. Practice Stats
  const [practiceStats, setPracticeStats] = useState<{
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading practice stats", e);
    }
    return {
      totalAttempted: 0,
      totalCorrect: 0,
      totalWrong: 0,
      subjectWise: {
        Physics: { attempted: 0, correct: 0 },
        Chemistry: { attempted: 0, correct: 0 },
        Mathematics: { attempted: 0, correct: 0 },
        Biology: { attempted: 0, correct: 0 },
      },
    };
  });

  // 8. Active Mock Test State
  const [activeTestConfig, setActiveTestConfig] = useState<{
    title: string;
    exam: ExamType;
    subject: any;
    chapterFilter: string;
    durationMinutes: number;
    questionCount: number;
    selectedQuestions: Question[];
  } | null>(null);

  const [currentTestResult, setCurrentTestResult] = useState<TestResultData | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_EXAM, currentExam);
  }, [currentExam]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.BOOKMARKS,
      JSON.stringify(Array.from(bookmarkedIds))
    );
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEST_HISTORY, JSON.stringify(testHistory));
  }, [testHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(practiceStats));
  }, [practiceStats]);

  // 10-Minute Free Trial Countdown Effect (when not logged in)
  useEffect(() => {
    if (currentUser) return; // logged in users get full access

    const timer = setInterval(() => {
      setTrialSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.setItem(STORAGE_KEYS.TRIAL_SECONDS, "0");
          setIsAuthModalOpen(true);
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem(STORAGE_KEYS.TRIAL_SECONDS, next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentUser]);

  // Seamless Multi-Device Session Update
  useEffect(() => {
    if (currentUser && currentUser.primaryDeviceId !== currentDeviceId) {
      const updatedUser = { ...currentUser, primaryDeviceId: currentDeviceId };
      setCurrentUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    }
  }, [currentUser, currentDeviceId]);

  // User Login Success Handler
  const handleLoginSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    saveUserSession(user);
    setIsAuthModalOpen(false);

    // Role-based destination routing
    if (user.role === "admin") {
      setIsAdminDashboardOpen(true);
    } else if (user.role === "class_admin") {
      setActiveTab("classes_portal");
    } else if (user.role === "agent") {
      setActiveTab("agent_portal");
    } else {
      // Regular student
      setActiveTab("practice");
    }
  };

  // Device Approval Request Handler
  const handleRequestDeviceApproval = (req: DeviceApprovalRequest) => {
    const updated = [req, ...deviceApprovalRequests];
    setDeviceApprovalRequests(updated);
    localStorage.setItem(STORAGE_KEYS.DEVICE_REQUESTS, JSON.stringify(updated));
  };

  // Handlers
  const handleToggleBookmark = (question: Question) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) {
        next.delete(question.id);
      } else {
        next.add(question.id);
      }
      return next;
    });
  };

  // Record a mistake in Mistakes Notebook
  const handleRecordMistake = (
    question: Question,
    selectedOption: number,
    notes?: string
  ) => {
    setMistakes((prev) => {
      const existingIdx = prev.findIndex((m) => m.question.id === question.id);
      const newMistake: MistakeItem = {
        id: `mistake-${question.id}-${Date.now()}`,
        question,
        selectedOption,
        correctOption: question.correctOption,
        timestamp: Date.now(),
        resolved: false,
        notes: notes || undefined,
        mistakeCount: existingIdx >= 0 ? (prev[existingIdx].mistakeCount || 1) + 1 : 1,
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          selectedOption,
          timestamp: Date.now(),
          mistakeCount: (copy[existingIdx].mistakeCount || 1) + 1,
        };
        return copy;
      }
      return [newMistake, ...prev];
    });
  };

  const handleToggleResolveMistake = (mistakeId: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === mistakeId ? { ...m, resolved: !m.resolved } : m))
    );
  };

  const handleDeleteMistake = (mistakeId: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== mistakeId));
  };

  const handleClearMistakes = () => {
    if (window.confirm("तुम्हाला सर्व नोंदवलेल्या चुकांची यादी साफ करायची आहे का?")) {
      setMistakes([]);
    }
  };

  const handleUpdatePracticeStats = (subject: string, isCorrect: boolean) => {
    setPracticeStats((prev) => {
      const subStats = prev.subjectWise[subject] || { attempted: 0, correct: 0 };
      return {
        totalAttempted: prev.totalAttempted + 1,
        totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
        totalWrong: isCorrect ? prev.totalWrong : prev.totalWrong + 1,
        subjectWise: {
          ...prev.subjectWise,
          [subject]: {
            attempted: subStats.attempted + 1,
            correct: isCorrect ? subStats.correct + 1 : subStats.correct,
          },
        },
      };
    });
  };

  const handleAddSingleQuestion = (newQuestion: Question) => {
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const handleBulkImportQuestions = (newQuestions: Question[]) => {
    setQuestions((prev) => [...newQuestions, ...prev]);
  };

  const handleAddAiQuestions = (newQuestions: Question[], startPracticeNow?: boolean) => {
    setQuestions((prev) => [...newQuestions, ...prev]);
    if (startPracticeNow) {
      setActiveTab("practice");
    }
  };

  const handleStartMockTest = (config: any) => {
    const rawQuestions = config.selectedQuestions || [];
    let cleanQuestions = deduplicateQuestionsList(rawQuestions);

    // If deduplication removed any duplicate questions and we are short of target questionCount,
    // automatically top up with fresh, unique questions from the pool!
    const targetCount = config.questionCount || cleanQuestions.length;
    if (cleanQuestions.length < targetCount) {
      const seenSigs = new Set<string>(
        cleanQuestions.map((q) => normalizeQuestionSignature(q.questionText, q.questionTextMr))
      );
      const deficit = targetCount - cleanQuestions.length;
      const topUp = buildGuaranteedNonRepeatingMock(
        config.exam || currentExam,
        config.subject || "All",
        config.chapterFilter || "All",
        deficit,
        questions,
        seenSigs
      );
      cleanQuestions = deduplicateQuestionsList([...cleanQuestions, ...topUp]);
    }

    // Assign strictly unique test question IDs to prevent any React state or option collision
    const seenIds = new Set<string>();
    const finalQuestions = cleanQuestions.map((q, idx) => {
      let uniqueId = q.id;
      if (!uniqueId || seenIds.has(uniqueId)) {
        uniqueId = `${q.id || "test_q"}_pos${idx + 1}`;
      }
      seenIds.add(uniqueId);
      return {
        ...q,
        id: uniqueId,
      };
    });

    setActiveTestConfig({
      ...config,
      selectedQuestions: finalQuestions,
      questionCount: finalQuestions.length,
    });
    setCurrentTestResult(null);
  };

  const handleFinishMockTest = (result: TestResultData) => {
    setTestHistory((prev) => [result, ...prev]);
    setCurrentTestResult(result);
    setActiveTestConfig(null);

    // Auto-record wrong questions into Mistakes Bank
    result.questions.forEach((q) => {
      const userAns = result.userAnswers[q.id];
      if (userAns !== undefined && userAns !== q.correctOption) {
        handleRecordMistake(q, userAns, `मॉक टेस्ट: ${result.exam}`);
      }
    });

    // Update overall practice stats with test results
    setPracticeStats((prev) => {
      const updatedSubjectWise = { ...prev.subjectWise };

      result.subjectBreakdown.forEach((sub) => {
        const cur = updatedSubjectWise[sub.subject] || { attempted: 0, correct: 0 };
        updatedSubjectWise[sub.subject] = {
          attempted: cur.attempted + sub.attempted,
          correct: cur.correct + sub.correct,
        };
      });

      return {
        totalAttempted: prev.totalAttempted + result.attempted,
        totalCorrect: prev.totalCorrect + result.correct,
        totalWrong: prev.totalWrong + result.wrong,
        subjectWise: updatedSubjectWise,
      };
    });

    // Record detailed Student Test Submission for Admin Visibility & Student History
    try {
      const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const studentSubmission: StudentTestSubmission = {
        id: submissionId,
        studentId: currentUser?.id || "guest",
        studentName: currentUser?.name || "विद्यार्थी (Guest)",
        studentMobile: currentUser?.mobile || "9999999999",
        exam: result.exam,
        testTitle: result.title || `Mock Test (${result.exam})`,
        testId: result.testId,
        score: result.score,
        totalMarks: result.maxMarks || (result.totalQuestions * (result.exam === "NEET" ? 4 : 1)),
        percentage: result.percentage,
        totalQuestions: result.totalQuestions,
        correct: result.correct,
        wrong: result.wrong,
        unattempted: result.unattempted,
        accuracy: result.accuracy,
        timeSpentSeconds: result.timeTakenSeconds,
        submittedAt: Date.now(),
        subjectBreakdown: result.subjectBreakdown?.map((sb) => ({
          subject: sb.subject,
          total: sb.totalQuestions,
          attempted: sb.attempted,
          correct: sb.correct,
          wrong: sb.wrong,
          score: sb.score,
        })),
      };

      // 1. Save to local submissions collection
      const savedSubsRaw = localStorage.getItem("mcq_app_all_student_submissions_v1");
      const subsList: StudentTestSubmission[] = savedSubsRaw ? JSON.parse(savedSubsRaw) : [];
      subsList.unshift(studentSubmission);
      localStorage.setItem("mcq_app_all_student_submissions_v1", JSON.stringify(subsList.slice(0, 500)));

      // 2. Backup to Firestore Cloud
      saveStudentTestSubmissionToCloud(studentSubmission);

      // 3. Update student user record in all_students list & vaults
      if (currentUser?.mobile) {
        const allStudents = getAllStudentsFromVaults();
        const idx = allStudents.findIndex((s) => s.mobile === currentUser.mobile || s.id === currentUser.id);
        if (idx !== -1) {
          const st = allStudents[idx];
          const testsCount = (st.totalTestsTaken || 0) + 1;
          const qSolved = (st.totalQuestionsSolved || 0) + result.attempted;
          const qCorrect = (st.totalCorrect || 0) + result.correct;
          const qWrong = (st.totalWrong || 0) + result.wrong;
          const acc = qSolved > 0 ? Math.round((qCorrect / qSolved) * 100) : 0;
          const best = Math.max(st.highestScore || 0, result.score);
          const recent = [studentSubmission, ...(st.recentTestResults || [])].slice(0, 15);

          const updatedStudent: StudentUser = {
            ...st,
            totalTestsTaken: testsCount,
            totalQuestionsSolved: qSolved,
            totalCorrect: qCorrect,
            totalWrong: qWrong,
            overallAccuracy: acc,
            highestScore: best,
            lastActiveTime: Date.now(),
            recentTestResults: recent,
          };
          saveStudentPermanently(updatedStudent);
          setCurrentUser(updatedStudent);
        }
      }
    } catch (err) {
      console.warn("Failed to sync student test submission stats", err);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("तुम्हाला सर्व टेस्ट इतिहास आणि आकडेवारी रिसेट करायची आहे का?")) {
      setTestHistory([]);
      setPracticeStats({
        totalAttempted: 0,
        totalCorrect: 0,
        totalWrong: 0,
        subjectWise: {
          Physics: { attempted: 0, correct: 0 },
          Chemistry: { attempted: 0, correct: 0 },
          Mathematics: { attempted: 0, correct: 0 },
          Biology: { attempted: 0, correct: 0 },
        },
      });
    }
  };

  const unresolvedMistakesCount = mistakes.filter((m) => !m.resolved).length;

  // Calculate pending approval requests count for badge & background cloud sync
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState<number>(0);

  // Self-healing data sync on startup & listen to vault updates
  useEffect(() => {
    const updatePendingCount = () => {
      try {
        const stds = getAllStudentsFromVaults();
        const count = stds.filter((s) => s.approvalStatus === "pending").length;
        setPendingApprovalsCount(count);
      } catch (e) {
        console.error("Failed to read pending count", e);
      }
    };

    updatePendingCount();

    // Auto-heal with Firebase Firestore in the background on launch
    syncAndHealWithCloud()
      .then((res) => {
        if (res.restoredFromCloud > 0 || res.syncedToCloud > 0) {
          updatePendingCount();
        }
      })
      .catch((err) => console.warn("Background cloud sync note:", err));

    const handleVaultUpdated = () => {
      updatePendingCount();
    };

    window.addEventListener(VAULT_EVENT_NAME, handleVaultUpdated);
    const interval = setInterval(updatePendingCount, 4000);
    return () => {
      clearInterval(interval);
      window.removeEventListener(VAULT_EVENT_NAME, handleVaultUpdated);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("तुम्हाला खात्यातून लॉग आऊट करायचे आहे का?")) {
      clearUserSession();
      setCurrentUser(null);
      setActiveTab("home");
    }
  };

  const handleStartDemoTest = (exam: ExamType, demoIndex: number = 1) => {
    const demoStudent: StudentUser = {
      id: `demo_user_${Date.now()}`,
      name: `मोफत डेमो विद्यार्थी (${demoIndex === 1 ? "Physics-Chem" : demoIndex === 2 ? "Maths" : "Biology"})`,
      mobile: "9999999999",
      email: "demo@abhyasmitra.com",
      role: "student",
      examTarget: exam,
      primaryDeviceId: currentDeviceId,
      primaryDeviceName: getDeviceName(),
      approvalStatus: "approved",
      isApproved: true,
      paymentStatus: "unpaid",
      registeredAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    setCurrentUser(demoStudent);
    saveUserSession(demoStudent);

    // Pick questions according to demoIndex
    let filtered = questions.filter((q) => q.exam === exam);
    if (filtered.length === 0) filtered = questions;

    if (demoIndex === 1) {
      const pAndC = filtered.filter((q) => q.subject === "Physics" || q.subject === "Chemistry");
      const testQs = deduplicateQuestionsList(pAndC.length >= 25 ? pAndC.slice(0, 25) : filtered.slice(0, 25));
      setActiveTestConfig({
        title: "मोफत डेमो टेस्ट १: MHT-CET Physics & Chemistry",
        exam: exam,
        subject: "All",
        chapterFilter: "All",
        durationMinutes: 25,
        questionCount: testQs.length,
        selectedQuestions: testQs,
      });
    } else if (demoIndex === 2) {
      const maths = filtered.filter((q) => q.subject === "Mathematics");
      const testQs = deduplicateQuestionsList(maths.length >= 25 ? maths.slice(0, 25) : filtered.slice(0, 25));
      setActiveTestConfig({
        title: "मोफत डेमो टेस्ट २: MHT-CET Mathematics Sprint",
        exam: exam,
        subject: "Mathematics",
        chapterFilter: "All",
        durationMinutes: 25,
        questionCount: testQs.length,
        selectedQuestions: testQs,
      });
    } else {
      const bio = filtered.filter((q) => q.subject === "Biology");
      const testQs = deduplicateQuestionsList(bio.length >= 30 ? bio.slice(0, 30) : filtered.slice(0, 30));
      setActiveTestConfig({
        title: "मोफत डेमो टेस्ट ३: NEET / CET Biology & Science Master",
        exam: exam,
        subject: "Biology",
        chapterFilter: "All",
        durationMinutes: 30,
        questionCount: testQs.length,
        selectedQuestions: testQs,
      });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden ${isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-[#F8FAFC] text-slate-900"} flex flex-col font-sans selection:bg-indigo-600 selection:text-white antialiased transition-colors duration-200`}>
      {/* If active test is ongoing, render dedicated full-screen ActiveTestView */}
      {activeTestConfig ? (
        <ActiveTestView
          testConfig={activeTestConfig}
          language={language}
          onFinishTest={handleFinishMockTest}
          onCancelTest={() => setActiveTestConfig(null)}
        />
      ) : (
        <>
          {/* Security Watermark & Screenshot Protection */}
          <SecurityWatermark currentUser={currentUser} deviceId={currentDeviceId} />

          {/* Master Admin Approval & Payment Management Dashboard */}
          <AdminApprovalDashboard
            isOpen={isAdminDashboardOpen}
            onClose={() => setIsAdminDashboardOpen(false)}
            currentUser={currentUser}
            onApproveStudent={(studentId) => {
              // If approved student is current user, update state
              if (currentUser && currentUser.id === studentId) {
                const updated = { ...currentUser, approvalStatus: "approved" as const, isApproved: true };
                setCurrentUser(updated);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
              }
            }}
          />

          {/* Student Auth & Single Device Security Modal */}
          <AuthModal
            isOpen={isAuthModalOpen || (!currentUser && trialSecondsRemaining <= 0)}
            onClose={() => setIsAuthModalOpen(false)}
            isTrialExpired={!currentUser && trialSecondsRemaining <= 0}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onRequestDeviceApproval={handleRequestDeviceApproval}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
          />

          {/* Direct UPI Payment Modal */}
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            onPaymentSuccess={(utr) => {
              // If not already registered, auto unlock with a verified pro profile
              if (!currentUser) {
                const verifiedUser: StudentUser = {
                  id: `vip-${Date.now()}`,
                  name: "VIP Student (UPI Verified)",
                  mobile: "9307220454",
                  examTarget: currentExam,
                  primaryDeviceId: currentDeviceId,
                  primaryDeviceName: getDeviceName(),
                  isApproved: true,
                  approvalStatus: "approved",
                  registeredAt: Date.now(),
                  lastLoginAt: Date.now(),
                };
                handleLoginSuccess(verifiedUser);
              }
            }}
          />

          {/* Slide-out Navigation Drawer */}
          <NavigationDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activeTab={activeTab}
            onNavigate={handleNavigateTab}
            onSelectTab={handleNavigateTab}
            currentUser={currentUser}
            currentExam={currentExam}
            onSelectExam={setCurrentExam}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
            bookmarkCount={bookmarkedIds.size}
            mistakesCount={unresolvedMistakesCount}
            trialSecondsRemaining={trialSecondsRemaining}
            onOpenAuthModal={() => {
              setIsDrawerOpen(false);
              setIsAuthModalOpen(true);
            }}
            onOpenPaymentModal={() => {
              setIsDrawerOpen(false);
              setIsPaymentModalOpen(true);
            }}
            onOpenAdminDashboard={() => {
              setIsDrawerOpen(false);
              setIsAdminDashboardOpen(true);
            }}
            pendingApprovalsCount={pendingApprovalsCount}
          />

          {/* Main Navigation & App Header */}
          <Header
            currentExam={currentExam}
            onSelectExam={setCurrentExam}
            activeTab={activeTab}
            onSelectTab={handleNavigateTab}
            language={language}
            onToggleLanguage={setLanguage}
            bookmarkCount={bookmarkedIds.size}
            mistakesCount={unresolvedMistakesCount}
            totalQuestionsCount={questions.filter((q) => q.exam === currentExam).length}
            totalSolvedCount={practiceStats.totalAttempted}
            currentUser={currentUser}
            trialSecondsRemaining={trialSecondsRemaining}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            pendingApprovalsCount={pendingApprovalsCount}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          {/* Master Layout: Left Vertical Sidebar + Right Main Content */}
          <div className="flex-1 flex w-full max-w-full min-h-[calc(100vh-65px)]">
            {/* Left Vertical Sidebar (उभी मेनू पट्टी) */}
            <VerticalSidebar
              activeTab={activeTab}
              onNavigate={handleNavigateTab}
              currentExam={currentExam}
              onSelectExam={setCurrentExam}
              mistakesCount={unresolvedMistakesCount}
              bookmarkCount={bookmarkedIds.size}
              currentUser={currentUser}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
              pendingApprovalsCount={pendingApprovalsCount}
            />

            {/* Right Main Content & Breadcrumbs Panel */}
            <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
              {/* Universal Sticky Back & Breadcrumb Navigation Bar */}
              <NavigationBreadcrumbBar
                activeTab={activeTab}
                currentExam={currentExam}
                historyStack={historyStack}
                onBack={handleBackNavigation}
                onNavigateHome={handleNavigateHome}
                onNavigateTab={handleNavigateTab}
              />

              {/* Top Global Live Status & Question Counter Dashboard - displayed cleanly in Analytics */}
              {activeTab === "analytics" && (
                <TopStatsDashboard
                  currentExam={currentExam}
                  questions={questions}
                  practiceStats={practiceStats}
                  onNavigate={handleNavigateTab}
                  bookmarkCount={bookmarkedIds.size}
                  mistakesCount={unresolvedMistakesCount}
                />
              )}

              {/* Main Content Area */}
              <main className="flex-1 pb-24 sm:pb-12 bg-grid-pattern w-full max-w-full overflow-x-hidden">
            {/* If viewing a completed test result */}
            {currentTestResult ? (
              <TestResultView
                result={currentTestResult}
                language={language}
                onRetakeTest={() => {
                  if (activeTestConfig) {
                    setActiveTestConfig(activeTestConfig);
                  } else {
                    handleNavigateTab("mock_test");
                  }
                  setCurrentTestResult(null);
                }}
                onBackToPractice={() => {
                  setCurrentTestResult(null);
                  handleNavigateTab("practice");
                }}
                onToggleBookmark={handleToggleBookmark}
                onGoToMistakes={() => {
                  setCurrentTestResult(null);
                  handleNavigateTab("mistakes");
                }}
                bookmarkedIds={bookmarkedIds}
              />
            ) : (
              <>
                {/* Active Referral Welcome Banner for Shared Link Recipients */}
                {activeReferralBanner && activeTab !== "auth_portal" && (
                  <div className="mx-3 sm:mx-6 my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-600/15 via-amber-500/15 to-orange-600/15 border border-orange-500/30 flex flex-wrap items-center justify-between gap-3 shadow-sm backdrop-blur-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-black text-lg shadow-xs shrink-0">
                        🎁
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-orange-950 dark:text-orange-200">
                          {activeReferralBanner.type === "agent" ? "अधिकृत एजंट भागीदार आमंत्रण:" : "मित्राकडून विशेष आमंत्रण:"} कोड <span className="font-mono bg-orange-200/60 dark:bg-orange-900/60 px-2 py-0.5 rounded text-orange-900 dark:text-orange-100 font-bold">{activeReferralBanner.code}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300">
                          MHT-CET, NEET & JEE Main २५,०००+ प्रश्न, १० Grand Tests आणि मोफत डेमो चाचण्या उपलब्ध आहेत!
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!currentUser && (
                        <button
                          type="button"
                          onClick={() => handleNavigateTab("auth_portal")}
                          className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-sm cursor-pointer transition-all active:scale-95"
                        >
                          लॉगिन / नोंदणी करा →
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveReferralBanner(null)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 py-1 cursor-pointer font-bold"
                        title="बंद करा"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* 0. Dedicated Login & Registration Portal (Unified Modern Design) */}
                {activeTab === "auth_portal" && (
                  <UnifiedAuthView
                    currentUser={currentUser}
                    onLoginSuccess={handleLoginSuccess}
                    onOpenAdmin={() => setIsAdminDashboardOpen(true)}
                    onStartDemoTest={handleStartDemoTest}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 0. Home Guidance View */}
                {activeTab === "home" && (
                  <HomeGuidanceView
                    currentExam={currentExam}
                    onSelectExam={(exam) => setCurrentExam(exam)}
                    language={language}
                    onNavigate={handleNavigateTab}
                    currentUser={currentUser}
                    trialSecondsRemaining={trialSecondsRemaining}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                    onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
                    onLogout={handleLogout}
                    onStartDemoTest={handleStartDemoTest}
                  />
                )}

                {/* 0.1. Coaching Classes & Weekly Mock Tests Hub */}
                {activeTab === "classes_portal" && (
                  <CoachingPortalView
                    language={language}
                    onStartCustomTest={(config) => {
                      handleStartMockTest(config);
                    }}
                    onNavigateToOpenApp={() => {
                      handleNavigateTab("grand_tests");
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 0.15. Coaching Classes Registration & 40% Referral Info */}
                {activeTab === "classes_info" && (
                  <ClassesInfoRegistrationView
                    language={language}
                    onBack={handleBackNavigation}
                    onOpenPortal={() => handleNavigateTab("classes_portal")}
                    onSelectInstitute={() => handleNavigateTab("classes_portal")}
                  />
                )}

                {/* 0.2. 10 Grand Real Exam Simulator & Predictor */}
                {activeTab === "grand_tests" && (
                  <MainExamSimulatorView
                    currentExam={currentExam}
                    language={language}
                    questions={questions}
                    testHistory={testHistory}
                    onStartGrandTest={(config) => {
                      handleStartMockTest(config);
                    }}
                    onViewPastResult={(result) => {
                      setCurrentTestResult(result);
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 0.5. Explore All Questions Bank View */}
                {activeTab === "all_questions" && (
                  <AllQuestionsBankView
                    currentExam={currentExam}
                    questions={questions}
                    language={language}
                    onToggleBookmark={handleToggleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 0.6. Topic Notes & Quick Revision Sheets (PDF Ready) */}
                {activeTab === "notes" && (
                  <TopicNotesView
                    currentExam={currentExam}
                    language={language}
                    onNavigateToPractice={(subject, chapter) => {
                      handleNavigateTab("practice");
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 1. Practice Mode */}
                {activeTab === "practice" && (
                  <PracticeMode
                    currentExam={currentExam}
                    questions={questions}
                    language={language}
                    onToggleBookmark={handleToggleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    onRecordAttempt={(subject, isCorrect) => {
                      handleUpdatePracticeStats(subject, isCorrect);
                    }}
                    onRecordMistake={(question, selectedOption) => {
                      handleRecordMistake(question, selectedOption, "सराव मोड (Practice Mode)");
                    }}
                    onOpenAiGenerator={() => handleNavigateTab("ai_generator")}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 2. PYQ Archive Mode */}
                {activeTab === "pyq" && (
                  <PyqView
                    currentExam={currentExam}
                    questions={questions}
                    language={language}
                    onToggleBookmark={handleToggleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    onStartPracticeWithList={(subset) => {
                      handleNavigateTab("practice");
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 3. Mock Test Mode */}
                {activeTab === "mock_test" && (
                  <MockTestSetup
                    currentExam={currentExam}
                    questions={questions}
                    language={language}
                    mistakes={mistakes}
                    practiceStats={practiceStats}
                    onStartTest={handleStartMockTest}
                    onOpenAiGenerator={() => handleNavigateTab("ai_generator")}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 4. Digital OMR Sheet Mode */}
                {activeTab === "omr" && (
                  <OmrSheetView
                    currentExam={currentExam}
                    language={language}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 4.5. Complete 25,000 MCQ Bank & PDF/Print Generator */}
                {activeTab === "pdf_bank" && (
                  <PdfBankGeneratorView
                    currentExam={currentExam}
                    questions={questions}
                    language={language}
                    onAddQuestions={handleBulkImportQuestions}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 5. Mistakes Bank / Error Tracker */}
                {activeTab === "mistakes" && (
                  <MistakesBankView
                    mistakes={mistakes}
                    language={language}
                    currentExam={currentExam}
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                    onToggleResolveMistake={handleToggleResolveMistake}
                    onRemoveMistake={handleDeleteMistake}
                    onClearAllMistakes={handleClearMistakes}
                    onStartPracticeWithList={(subset) => {
                      handleNavigateTab("practice");
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 6. High-Yield Flashcards */}
                {activeTab === "flashcards" && (
                  <FlashcardsView
                    currentExam={currentExam}
                    language={language}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 7. AI Question Generator */}
                {activeTab === "ai_generator" && (
                  <AiQuestionGenerator
                    currentExam={currentExam}
                    language={language}
                    onAddGeneratedQuestions={handleAddAiQuestions}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 8. Add Question Form */}
                {activeTab === "add_question" && (
                  <AddQuestionView
                    currentExam={currentExam}
                    onAddQuestion={handleAddSingleQuestion}
                    onBulkImport={handleBulkImportQuestions}
                    allQuestions={questions}
                    onBackToPractice={handleBackNavigation}
                  />
                )}

                {/* 9. Bookmarks View */}
                {activeTab === "bookmarks" && (
                  <BookmarksView
                    questions={questions}
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                    language={language}
                    onStartPracticeWithList={(subset) => {
                      handleNavigateTab("practice");
                    }}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 10. Formulas View */}
                {activeTab === "formulas" && (
                  <FormulasView
                    currentExam={currentExam}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 11. Analytics View */}
                {activeTab === "analytics" && (
                  <AnalyticsView
                    testHistory={testHistory}
                    practiceStats={practiceStats}
                    onReviewTest={(test) => setCurrentTestResult(test)}
                    onClearHistory={handleClearHistory}
                    onGoToPractice={() => handleNavigateTab("practice")}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 11.5. Toppers Leaderboard View (Top 50 Students) */}
                {activeTab === "leaderboard" && (
                  <LeaderboardView
                    currentExam={currentExam}
                    currentUser={currentUser}
                    onBack={handleBackNavigation}
                    onNavigateToPractice={() => handleNavigateTab("practice")}
                  />
                )}

                {/* 12. Agent Commission Portal (₹10 Per Referral) */}
                {activeTab === "agent_portal" && (
                  <RoleBasedAccessWrapper
                    currentUser={currentUser}
                    allowedRoles={["agent", "admin"]}
                    titleMr="अधिकृत एजंट कमिशन पोर्टल"
                    descriptionMr="हे पोर्टल केवळ नोंदणीकृत एजंट पार्टनर आणि ॲडमिनसाठी राखीव आहे. कृपया आपल्या एजंट खात्याने लॉगिन करा."
                    onOpenAuth={() => handleNavigateTab("auth_portal")}
                    onBackToHome={handleNavigateHome}
                  >
                    <AgentPortalView onBack={handleBackNavigation} />
                  </RoleBasedAccessWrapper>
                )}

                {/* 13. Student Refer & Earn (10 Referrals = 100% Refund) */}
                {activeTab === "refer_earn" && (
                  <StudentReferEarnView
                    currentUser={currentUser}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* 14. Feedback & Error Report View */}
                {activeTab === "feedback" && (
                  <FeedbackReportView
                    currentUser={currentUser}
                    currentExam={currentExam}
                    onBack={handleBackNavigation}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (PWA Style) */}
          <MobileBottomNav
            activeTab={activeTab}
            onNavigate={handleNavigateTab}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />

          {/* Geometric Balanced Footer */}
          <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-xs py-5 pb-16 sm:pb-5 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="font-semibold text-slate-700">
                  NEET · JEE Main · MHT-CET सराव ॲप
                </p>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono-numbers">NTA & State CET Syllabus</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono-numbers border border-slate-200">
                  Physics · Chem · Maths · Bio
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-medium border border-slate-200">
                  मराठी व इंग्रजी माध्यम
                </span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
