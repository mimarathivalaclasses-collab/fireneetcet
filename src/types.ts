export type ExamType = "NEET" | "JEE_MAIN" | "MHT_CET";

export type SubjectType = "Physics" | "Chemistry" | "Mathematics" | "Biology";

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export type LanguageMode = "bilingual" | "mr" | "en";

export interface Question {
  id: string;
  exam: ExamType;
  subject: SubjectType;
  chapter: string;
  topic?: string;
  difficulty: DifficultyLevel;
  questionText: string;
  questionTextMr?: string;
  options: [string, string, string, string];
  optionsMr?: [string, string, string, string];
  correctOption: number; // 0, 1, 2, 3
  explanation: string;
  explanationMr?: string;
  formula?: string;
  pyqYear?: string; // e.g. "NEET 2023", "JEE Main 2024", "MHT-CET 2023"
  isCustom?: boolean;
  isAiGenerated?: boolean;
  createdAt?: number;
}

export type QuestionStatus = "answered" | "marked_for_review" | "not_answered" | "not_visited";

export interface TestSession {
  id: string;
  title: string;
  exam: ExamType;
  subject: SubjectType | "All";
  chapterFilter?: string;
  durationMinutes: number;
  totalTimeSeconds: number;
  remainingSeconds: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> optionIndex (0-3)
  statuses: Record<string, QuestionStatus>;
  markedAnswers: Record<string, boolean>; // if marked for review
  startTime: number;
  endTime?: number;
  isCompleted: boolean;
  timeSpentPerQuestion: Record<string, number>; // seconds
}

export interface SubjectResult {
  subject: SubjectType;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  score: number;
  maxScore: number;
  accuracy: number;
}

export interface TestResultData {
  testId: string;
  title: string;
  exam: ExamType;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  score: number;
  maxMarks: number;
  percentage: number;
  accuracy: number;
  timeTakenSeconds: number;
  subjectBreakdown: SubjectResult[];
  completedAt: number;
  questions: Question[];
  userAnswers: Record<string, number>;
  timeSpentPerQuestion: Record<string, number>;
}

export interface BookmarkItem {
  id: string;
  questionId: string;
  savedAt: number;
  userNote?: string;
  question: Question;
}

export interface FormulaCard {
  id: string;
  exam: ExamType[];
  subject: SubjectType;
  chapter: string;
  title: string;
  titleMr: string;
  formula: string;
  description: string;
  descriptionMr: string;
  keyUnits?: string;
  tip?: string;
}

export interface MistakeItem {
  id: string;
  question: Question;
  selectedOption: number;
  correctOption?: number;
  recordedAt?: number;
  timestamp?: number;
  source?: "practice" | "mock_test";
  notes?: string;
  attemptCount?: number;
  mistakeCount?: number;
  isResolved?: boolean;
  resolved?: boolean;
}

export interface FlashcardItem {
  id: string;
  exam: ExamType[];
  subject: SubjectType;
  chapter: string;
  topic: string;
  front: string;
  frontMr?: string;
  back: string;
  backMr?: string;
  keyFact?: string;
  badge?: string; // e.g. "NEET Repeat Trend", "High Yield"
  mnemonic?: string;
}

export interface ChapterPointItem {
  id: number;
  point: string;
  pointMr: string;
  category?: "Concept" | "Formula" | "Rule" | "Definition" | "Shortcut" | "PYQ_Trend" | "Exception";
  formula?: string;
  badge?: string;
}

export interface TopicNoteSection {
  title: string;
  titleMr: string;
  points: string[];
  pointsMr: string[];
  keyFormula?: string;
  keyMnemonic?: string;
  examTip?: string;
  examTipMr?: string;
}

export interface TopicNote {
  id: string;
  chapter: string;
  chapterMr: string;
  subject: SubjectType;
  exams: ExamType[];
  title: string;
  titleMr: string;
  summary: string;
  summaryMr: string;
  highYieldWeightage: "High" | "Medium" | "Low";
  sections: TopicNoteSection[];
  points100?: ChapterPointItem[];
  quickRevisionPoints: {
    en: string;
    mr: string;
  }[];
  keyFormulasTable: {
    name: string;
    formula: string;
    description: string;
  }[];
  commonMistakesToAvoid: {
    mistake: string;
    mistakeMr: string;
    correction: string;
    correctionMr: string;
  }[];
}

export interface UserFeedbackReport {
  id: string;
  userName: string;
  userMobile: string;
  studentName?: string;
  studentMobile?: string;
  userRole?: string;
  category?: "question_error" | "mock_test_issue" | "app_suggestion" | "login_issue" | "other" | string;
  categoryMr?: string;
  issueCategory?: string;
  subject?: SubjectType | string;
  exam?: ExamType;
  questionNumberOrTopic?: string;
  questionId?: string;
  questionText?: string;
  description: string;
  status: "pending" | "resolved";
  createdAt?: number;
  timestamp?: number;
  adminReply?: string;
}

export type NavigationTab =
  | "home"
  | "auth_portal"
  | "leaderboard"
  | "grand_tests"
  | "classes_portal"
  | "classes_info"
  | "coaching_register"
  | "agent_portal"
  | "refer_earn"
  | "all_questions"
  | "notes"
  | "practice"
  | "pyq"
  | "mock_test"
  | "omr"
  | "pdf_bank"
  | "mistakes"
  | "flashcards"
  | "formulas"
  | "ai_generator"
  | "bookmarks"
  | "add_question"
  | "analytics"
  | "feedback";

export type AppView =
  | "home"
  | "auth_portal"
  | "leaderboard"
  | "grand_tests"
  | "classes_portal"
  | "classes_info"
  | "coaching_register"
  | "agent_portal"
  | "refer_earn"
  | "all_questions"
  | "notes"
  | "practice"
  | "pyq"
  | "mock_test"
  | "mock_test_setup"
  | "active_test"
  | "test_result"
  | "omr"
  | "pdf_bank"
  | "mistakes"
  | "flashcards"
  | "formulas"
  | "ai_generator"
  | "bookmarks"
  | "add_question"
  | "analytics"
  | "feedback";

export interface GrandMockTestItem {
  id: string;
  testNumber: number;
  title: string;
  titleMr: string;
  exam: ExamType;
  group?: "PCM" | "PCB" | "PCMB" | "All";
  targetPercentileGoal: string;
  totalMarks: number;
  durationMinutes: number;
  totalQuestions: number;
  markingScheme: {
    correct: number;
    incorrect: number;
    mathsCorrect?: number;
    unattempted: number;
  };
  syllabusCoverage: string;
  syllabusCoverageMr: string;
  difficulty: "Real Exam Exact" | "Moderate to Hard" | "High Rank Challenger";
  subjectsIncluded: SubjectType[];
  subjectDistribution: {
    subject: SubjectType;
    questionCount: number;
    marks: number;
  }[];
  predictedCollegeTargets: string[];
  descriptionMr: string;
  instructionsMr: string[];
  fixedQuestions?: Question[];
}

export type UserRole = "admin" | "student" | "class_admin" | "agent";

export interface StudentTestSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentMobile: string;
  exam: ExamType;
  testTitle: string;
  testId?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unattempted: number;
  accuracy: number;
  timeSpentSeconds?: number;
  submittedAt: number;
  subjectBreakdown?: {
    subject: SubjectType;
    total: number;
    attempted: number;
    correct: number;
    wrong: number;
    score: number;
  }[];
}

export interface StudentUser {
  id: string;
  name: string;
  mobile: string;
  password?: string;
  rollNo?: string;
  email?: string;
  role?: UserRole;
  examTarget: ExamType;
  primaryDeviceId: string;
  primaryDeviceName: string;
  isApproved: boolean;
  approvalStatus: "pending" | "approved" | "rejected";
  paymentStatus?: "unpaid" | "submitted" | "paid" | "verified";
  isFeePaid?: boolean;
  paymentUtr?: string;
  amountPaid?: number;
  adminNotes?: string;
  registeredAt: number;
  lastLoginAt: number;
  approvedAt?: number;
  updatedAt?: number;
  trialStartedAt?: number;
  instituteId?: string; // If registered under a coaching class
  instituteCode?: string;
  referralCode?: string; // Student's own referral code e.g. "REF-930722"
  referredBy?: string; // Code of agent or friend who referred them
  referralEarnings?: number; // Total ₹ earned from referrals
  totalReferredCount?: number; // Count of friends referred
  refundClaimed?: boolean; // If 10 referrals reached and full refund given

  // Activity & Performance Metrics (कोणी किती सोडवले)
  totalTestsTaken?: number;
  totalQuestionsSolved?: number;
  totalCorrect?: number;
  totalWrong?: number;
  overallAccuracy?: number;
  highestScore?: number;
  lastActiveTime?: number;
  recentTestResults?: StudentTestSubmission[];
}

export interface LeaderboardTopper {
  rank: number;
  studentId: string;
  studentName: string;
  city: string;
  exam: ExamType;
  totalSolved: number;
  totalCorrect: number;
  accuracy: number;
  mockAvgScore: number;
  streakDays: number;
  instituteName?: string;
  badge?: string;
}

export interface AgentUser {
  id: string;
  agentCode: string; // e.g. "AGT-101"
  name: string;
  mobile: string;
  password?: string;
  email?: string;
  city?: string;
  upiId?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    holderName?: string;
  };
  commissionRate: number; // 20% by default (₹5.80 of ₹29)
  totalEarnings: number;
  totalPaidOut: number;
  walletBalance: number;
  totalStudentsReferred: number;
  totalClassesReferred: number;
  isApproved: boolean;
  status: "active" | "pending" | "blocked";
  createdAt: number;
  lastLoginAt: number;
}

export interface AgentPayoutRequest {
  id: string;
  agentId: string;
  agentName: string;
  agentMobile: string;
  agentCode?: string;
  userType?: "agent" | "student";
  amount: number; // minimum 100
  upiId: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    holderName?: string;
  };
  status: "pending" | "approved" | "rejected" | "transferred";
  requestedAt: number;
  processedAt?: number;
  adminUtr?: string;
  adminNotes?: string;
}

export interface StudentReferralRecord {
  id: string;
  referrerCode: string; // AGT-xxxx or REF-xxxx
  referrerId?: string;
  referrerName?: string;
  referrerMobile?: string;
  referrerType: "student" | "agent";
  referredStudentId: string;
  referredStudentName: string;
  referredStudentMobile: string;
  referredStudentExam: ExamType | string;
  planAmount: number; // ₹29
  commissionEarned: number; // ₹5.80 (20%)
  status: "joined" | "subscribed" | "verified";
  timestamp: number;
}

export interface PaymentReceiptRecord {
  id: string;
  studentId?: string;
  studentName: string;
  studentPhone: string;
  upiId: string;
  amount: number;
  planName: string;
  utr: string;
  date: string;
  status: "pending" | "verified" | "rejected";
  verifiedAt?: number;
}

export interface DeviceApprovalRequest {
  id: string;
  studentId: string;
  studentName: string;
  mobile: string;
  registeredDeviceId: string;
  newDeviceId: string;
  newDeviceName: string;
  requestTime: number;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

// -------------------------------------------------------------
// Coaching Classes & Institute Multi-Tenant Management Types
// -------------------------------------------------------------
export interface InstituteProfile {
  id: string;
  name: string;
  nameMr: string;
  instituteCode: string; // e.g. "SHREE2026", "ROYAL_MHT"
  directorName: string;
  contactNumber: string;
  email?: string;
  city: string;
  adminPasscode: string;
  maxStudentsLimit: number; // e.g. 2000
  batches: string[];
  bannerNotice?: string;
  bannerNoticeMr?: string;
  createdAt: number;
}

export interface InstituteStudent {
  id: string;
  instituteId: string;
  rollNo: string;
  name: string;
  mobile: string;
  batchName: string;
  examTarget: ExamType;
  addedAt: number;
  isActive: boolean;
  testsAttemptedCount: number;
  avgScorePercentage: number;
}

export interface InstituteWeeklyTest {
  id: string;
  instituteId: string;
  testCode: string;
  title: string;
  titleMr: string;
  exam: ExamType;
  subject: SubjectType | "All";
  chapters: string[];
  topicsDescription?: string;
  batchAssigned: string; // "All Batches" or specific batch name
  scheduledDate: string; // e.g. "2026-08-23"
  durationMinutes: number; // Overall test timer set by class teacher (e.g. 60 min, 180 min)
  perQuestionTimerSeconds?: number; // Per-question timer (e.g. 60s, 90s, 120s or 0 for none)
  enforcePerQuestionTimer?: boolean; // Whether to auto-advance or alert
  totalMarks: number;
  markingScheme: {
    correct: number;
    incorrect: number;
    mathsCorrect?: number;
  };
  questions: Question[];
  status: "upcoming" | "active" | "completed" | "draft";
  createdAt: number;
  createdBy: string;
}

export interface InstituteSubmission {
  id: string;
  testId: string;
  instituteId: string;
  studentId: string;
  studentRollNo: string;
  studentName: string;
  batchName: string;
  score: number;
  maxMarks: number;
  percentage: number;
  accuracy: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  timeTakenSeconds: number;
  submittedAt: number;
  userAnswers: Record<string, number>;
  timeSpentPerQuestion?: Record<string, number>;
}

export interface AchievementBadge {
  id: string;
  code: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  icon: string;
  color: string;
  category: "practice" | "accuracy" | "streak" | "grand_test" | "special";
  isUnlocked: boolean;
  unlockedAt?: number;
  progress: number; // 0 to 100
  targetCount: number;
  currentCount: number;
}

export interface CoachingRegistrationApplication {
  id: string;
  instituteName: string;
  instituteNameMr: string;
  directorName: string;
  contactNumber: string;
  city: string;
  desiredCode: string;
  adminPasscode: string;
  selectedPlan: "30_min_trial" | "annual_499";
  paymentUtr?: string;
  isPaid: boolean;
  isApproved: boolean;
  status: "pending_payment" | "pending_approval" | "approved" | "rejected";
  appliedAt: number;
  timerExpiresAt: number; // 30 minutes from application
  approvedAt?: number;
  adminNotes?: string;
}

