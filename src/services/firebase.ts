import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { StudentUser, UserFeedbackReport, TestResultData, StudentTestSubmission, AgentUser } from "../types";

export const firebaseConfig = {
  apiKey: "AIzaSyDsjW4JPyQLljXq8wotHBV1G25aiFYzXlo",
  authDomain: "mimarathiwalaclasses.firebaseapp.com",
  projectId: "mimarathiwalaclasses",
  storageBucket: "mimarathiwalaclasses.firebasestorage.app",
  messagingSenderId: "510272029698",
  appId: "1:510272029698:web:203f4727b20fb2aff6d31b",
  measurementId: "G-JLX1JC9Z29",
};

// Initialize Firebase App safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Firestore Collections
export const COLLECTIONS = {
  STUDENTS: "students",
  AGENTS: "agents",
  FEEDBACK_REPORTS: "feedback_reports",
  TEST_RESULTS: "test_results",
  TEST_SUBMISSIONS: "student_test_submissions",
  INSTITUTES: "institutes",
  SYSTEM_CONFIG: "system_config",
};

// ==========================================
// 1. STUDENT REGISTRATION & CLOUD SYNC
// ==========================================

export async function saveStudentToCloud(student: StudentUser): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, student.mobile || student.id);
    await setDoc(
      docRef,
      {
        ...student,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn("Firestore saveStudentToCloud offline/error, saved to localStorage:", error);
    return false;
  }
}

export async function fetchStudentsFromCloud(): Promise<StudentUser[]> {
  try {
    const colRef = collection(db, COLLECTIONS.STUDENTS);
    const snap = await getDocs(colRef);
    const cloudList: StudentUser[] = [];
    snap.forEach((docSnap) => {
      cloudList.push(docSnap.data() as StudentUser);
    });
    return cloudList;
  } catch (error) {
    console.warn("Firestore fetchStudentsFromCloud error, falling back to local:", error);
    return [];
  }
}

export async function updateStudentApprovalInCloud(
  studentIdentifier: string,
  approvalStatus: "approved" | "pending" | "rejected",
  isApproved: boolean
): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, studentIdentifier);
    await updateDoc(docRef, {
      approvalStatus,
      isApproved,
      updatedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.warn("Firestore updateStudentApprovalInCloud error:", error);
    return false;
  }
}

export async function deleteStudentFromCloud(studentIdentifier: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, studentIdentifier);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.warn("Firestore deleteStudentFromCloud error:", error);
    return false;
  }
}

// ==========================================
// 2. USER FEEDBACK & ERROR REPORTS CLOUD SYNC
// ==========================================

export async function saveFeedbackReportToCloud(report: UserFeedbackReport): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.FEEDBACK_REPORTS, report.id);
    await setDoc(
      docRef,
      {
        ...report,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn("Firestore saveFeedbackReportToCloud error:", error);
    return false;
  }
}

export async function fetchFeedbackReportsFromCloud(): Promise<UserFeedbackReport[]> {
  try {
    const colRef = collection(db, COLLECTIONS.FEEDBACK_REPORTS);
    const snap = await getDocs(colRef);
    const reports: UserFeedbackReport[] = [];
    snap.forEach((docSnap) => {
      reports.push(docSnap.data() as UserFeedbackReport);
    });
    return reports.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.warn("Firestore fetchFeedbackReportsFromCloud error:", error);
    return [];
  }
}

export async function updateFeedbackReportStatusInCloud(
  reportId: string,
  status: "pending" | "resolved",
  adminReply?: string
): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.FEEDBACK_REPORTS, reportId);
    await updateDoc(docRef, {
      status,
      adminReply: adminReply || "",
      updatedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.warn("Firestore updateFeedbackReportStatusInCloud error:", error);
    return false;
  }
}

export async function deleteFeedbackReportFromCloud(reportId: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTIONS.FEEDBACK_REPORTS, reportId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.warn("Firestore deleteFeedbackReportFromCloud error:", error);
    return false;
  }
}

// ==========================================
// 3. TEST RESULT & SUBMISSION CLOUD BACKUP
// ==========================================

export async function saveTestResultToCloud(result: TestResultData, userMobile?: string): Promise<boolean> {
  try {
    const docId = `result_${result.testId || Date.now()}`;
    const docRef = doc(db, COLLECTIONS.TEST_RESULTS, docId);
    await setDoc(docRef, {
      ...result,
      userMobile: userMobile || "anonymous",
      savedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.warn("Firestore saveTestResultToCloud error:", error);
    return false;
  }
}

export async function saveStudentTestSubmissionToCloud(submission: StudentTestSubmission): Promise<boolean> {
  try {
    const docId = submission.id || `sub_${submission.studentMobile}_${Date.now()}`;
    const docRef = doc(db, COLLECTIONS.TEST_SUBMISSIONS, docId);
    await setDoc(docRef, {
      ...submission,
      savedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.warn("Firestore saveStudentTestSubmissionToCloud error:", error);
    return false;
  }
}

export async function fetchStudentTestSubmissionsFromCloud(): Promise<StudentTestSubmission[]> {
  try {
    const colRef = collection(db, COLLECTIONS.TEST_SUBMISSIONS);
    const snap = await getDocs(colRef);
    const submissions: StudentTestSubmission[] = [];
    snap.forEach((docSnap) => {
      submissions.push(docSnap.data() as StudentTestSubmission);
    });
    return submissions.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  } catch (error) {
    console.warn("Firestore fetchStudentTestSubmissionsFromCloud error:", error);
    return [];
  }
}

// ==========================================
// 4. OFFICIAL AGENT PARTNERS CLOUD SYNC
// ==========================================

export async function saveAgentToCloud(agent: AgentUser): Promise<boolean> {
  try {
    const docId = agent.mobile || agent.agentCode || agent.id;
    const docRef = doc(db, COLLECTIONS.AGENTS, docId);
    await setDoc(
      docRef,
      {
        ...agent,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn("Firestore saveAgentToCloud offline/error, saved to localStorage:", error);
    return false;
  }
}

export async function fetchAgentsFromCloud(): Promise<AgentUser[]> {
  try {
    const colRef = collection(db, COLLECTIONS.AGENTS);
    const snap = await getDocs(colRef);
    const cloudAgents: AgentUser[] = [];
    snap.forEach((docSnap) => {
      cloudAgents.push(docSnap.data() as AgentUser);
    });
    return cloudAgents;
  } catch (error) {
    console.warn("Firestore fetchAgentsFromCloud error:", error);
    return [];
  }
}

