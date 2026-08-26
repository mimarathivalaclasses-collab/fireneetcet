import { AgentUser, StudentUser, StudentReferralRecord, AgentPayoutRequest, ExamType } from "../types";

export const REFERRAL_CONFIG = {
  COMMISSION_PERCENT: 20, // 20%
  STUDENT_PLAN_PRICE: 29, // ₹29
  COMMISSION_PER_STUDENT: 5.8, // 20% of ₹29 = ₹5.80
  MINIMUM_WITHDRAWAL_INR: 100, // Minimum ₹100 required for withdrawal
  FREE_REFUND_MILESTONE: 10, // 10 referrals = 100% refund milestone
  ADMIN_CONTACT_PHONE: "9307220454",
  ADMIN_UPI_ID: "9307220454@yz",
};

const REFERRALS_LOG_KEY = "mcq_app_referrals_log_v2";
const PAYOUTS_LOG_KEY = "mcq_app_agent_payouts_v1";
const ALL_AGENTS_KEY = "mcq_app_all_agents_v1";
const ALL_STUDENTS_KEY = "mcq_app_all_students_v1";

/**
 * Format currency with 2 decimal places if needed or clean representation
 */
export function formatInr(amount: number): string {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
}

/**
 * Mask phone number for public/agent view for privacy (e.g. 98234XXXXX)
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 5) return "98XXXXXX";
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 10) {
    return `${clean.slice(0, 5)}XXXXX`;
  }
  return `${clean.slice(0, 3)}XXXX${clean.slice(-2)}`;
}

/**
 * Load all recorded referral transactions
 */
export function getAllReferralsLog(): StudentReferralRecord[] {
  try {
    const raw = localStorage.getItem(REFERRALS_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading referrals log:", e);
    return [];
  }
}

/**
 * Save referral transactions
 */
export function saveReferralsLog(records: StudentReferralRecord[]): void {
  try {
    localStorage.setItem(REFERRALS_LOG_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Error saving referrals log:", e);
  }
}

/**
 * Load all payout requests
 */
export function getAllPayoutRequests(): AgentPayoutRequest[] {
  try {
    const raw = localStorage.getItem(PAYOUTS_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading payouts log:", e);
    return [];
  }
}

/**
 * Save payout requests
 */
export function savePayoutRequests(requests: AgentPayoutRequest[]): void {
  try {
    localStorage.setItem(PAYOUTS_LOG_KEY, JSON.stringify(requests));
  } catch (e) {
    console.error("Error saving payouts log:", e);
  }
}

/**
 * Record a referral event when a student registers or pays with a referral code.
 * Credits 20% (₹5.80) to the Agent or Student referrer.
 */
export function recordReferralTransaction(params: {
  referrerCode: string;
  referredStudent: {
    id: string;
    name: string;
    mobile: string;
    examTarget?: ExamType | string;
    paymentStatus?: string;
  };
  planPrice?: number;
}): { success: boolean; referrerType?: "agent" | "student"; commissionEarned: number } {
  const cleanCode = params.referrerCode.trim().toUpperCase();
  if (!cleanCode) return { success: false, commissionEarned: 0 };

  const price = params.planPrice || REFERRAL_CONFIG.STUDENT_PLAN_PRICE;
  // 20% of 29 = 5.80
  const commission = Number(((price * REFERRAL_CONFIG.COMMISSION_PERCENT) / 100).toFixed(2));

  let referrerType: "agent" | "student" = cleanCode.startsWith("AGT") ? "agent" : "student";
  let referrerName = "";
  let referrerMobile = "";
  let referrerId = "";

  // 1. Check if referrer is an AGENT
  try {
    const rawAgents = localStorage.getItem(ALL_AGENTS_KEY);
    const agents: AgentUser[] = rawAgents ? JSON.parse(rawAgents) : [];
    const agentIndex = agents.findIndex(
      (a) => a.agentCode.toUpperCase() === cleanCode || a.id.toUpperCase() === cleanCode
    );

    if (agentIndex >= 0) {
      referrerType = "agent";
      referrerId = agents[agentIndex].id;
      referrerName = agents[agentIndex].name;
      referrerMobile = agents[agentIndex].mobile;

      // Update agent earnings and balance
      agents[agentIndex].totalStudentsReferred = (agents[agentIndex].totalStudentsReferred || 0) + 1;
      agents[agentIndex].totalEarnings = Number(
        ((agents[agentIndex].totalEarnings || 0) + commission).toFixed(2)
      );
      agents[agentIndex].walletBalance = Number(
        ((agents[agentIndex].walletBalance || 0) + commission).toFixed(2)
      );

      localStorage.setItem(ALL_AGENTS_KEY, JSON.stringify(agents));

      // Update active agent session if currently logged in
      const sessionRaw = sessionStorage.getItem("mcq_agent_active_user");
      if (sessionRaw) {
        try {
          const curAgent: AgentUser = JSON.parse(sessionRaw);
          if (curAgent.id === agents[agentIndex].id) {
            sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(agents[agentIndex]));
          }
        } catch {}
      }
    }
  } catch (err) {
    console.error("Agent referral credit error:", err);
  }

  // 2. Check if referrer is a STUDENT
  try {
    const rawStudents = localStorage.getItem(ALL_STUDENTS_KEY);
    const students: StudentUser[] = rawStudents ? JSON.parse(rawStudents) : [];
    const studentIndex = students.findIndex(
      (s) =>
        (s.referralCode && s.referralCode.toUpperCase() === cleanCode) ||
        s.mobile === cleanCode ||
        s.id === cleanCode
    );

    if (studentIndex >= 0) {
      referrerType = "student";
      referrerId = students[studentIndex].id;
      referrerName = students[studentIndex].name;
      referrerMobile = students[studentIndex].mobile;

      students[studentIndex].totalReferredCount = (students[studentIndex].totalReferredCount || 0) + 1;
      students[studentIndex].referralEarnings = Number(
        ((students[studentIndex].referralEarnings || 0) + commission).toFixed(2)
      );

      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));

      // Update active student session if logged in
      const curRaw = localStorage.getItem("mcq_app_current_student_user_v1");
      if (curRaw) {
        try {
          const cur: StudentUser = JSON.parse(curRaw);
          if (cur.id === students[studentIndex].id || cur.mobile === students[studentIndex].mobile) {
            cur.totalReferredCount = students[studentIndex].totalReferredCount;
            cur.referralEarnings = students[studentIndex].referralEarnings;
            localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(cur));
          }
        } catch {}
      }
    }
  } catch (err) {
    console.error("Student referral credit error:", err);
  }

  // 3. Record the transaction in the global referral log
  const newRecord: StudentReferralRecord = {
    id: `ref_tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    referrerCode: cleanCode,
    referrerId,
    referrerName,
    referrerMobile,
    referrerType,
    referredStudentId: params.referredStudent.id,
    referredStudentName: params.referredStudent.name,
    referredStudentMobile: params.referredStudent.mobile,
    referredStudentExam: params.referredStudent.examTarget || "MHT_CET",
    planAmount: price,
    commissionEarned: commission,
    status: params.referredStudent.paymentStatus === "paid" ? "verified" : "subscribed",
    timestamp: Date.now(),
  };

  const logs = getAllReferralsLog();
  // Prevent duplicate insertion for same referred student under same referrer
  const alreadyExists = logs.find(
    (l) =>
      l.referrerCode === cleanCode &&
      (l.referredStudentId === params.referredStudent.id ||
        l.referredStudentMobile === params.referredStudent.mobile)
  );

  if (!alreadyExists) {
    logs.unshift(newRecord);
    saveReferralsLog(logs);
  }

  return {
    success: true,
    referrerType,
    commissionEarned: commission,
  };
}

/**
 * Get list of students referred by a given code (either Agent Code or Student Referral Code)
 */
export function getReferredStudentsList(referrerCode: string): StudentReferralRecord[] {
  if (!referrerCode) return [];
  const cleanCode = referrerCode.trim().toUpperCase();
  const allLogs = getAllReferralsLog();

  const filtered = allLogs.filter(
    (log) => log.referrerCode.toUpperCase() === cleanCode || (log.referrerId && log.referrerId === referrerCode)
  );

  // If no transactions logged yet, check all_students storage directly
  if (filtered.length === 0) {
    try {
      const rawStudents = localStorage.getItem(ALL_STUDENTS_KEY);
      const students: StudentUser[] = rawStudents ? JSON.parse(rawStudents) : [];
      const directMatches = students.filter(
        (s) => s.referredBy && s.referredBy.toUpperCase() === cleanCode
      );

      return directMatches.map((s, idx) => ({
        id: `synth_ref_${s.id}_${idx}`,
        referrerCode: cleanCode,
        referrerType: cleanCode.startsWith("AGT") ? "agent" : "student",
        referredStudentId: s.id,
        referredStudentName: s.name,
        referredStudentMobile: s.mobile,
        referredStudentExam: s.examTarget,
        planAmount: 29,
        commissionEarned: REFERRAL_CONFIG.COMMISSION_PER_STUDENT,
        status: s.approvalStatus === "approved" || s.paymentStatus === "paid" ? "verified" : "subscribed",
        timestamp: s.registeredAt || Date.now() - (idx + 1) * 86400000,
      }));
    } catch {}
  }

  return filtered;
}

/**
 * Submit a withdrawal / payout request
 * Strictly enforces Minimum ₹100 withdrawal limit
 */
export function submitPayoutRequest(params: {
  userType: "agent" | "student";
  userId: string;
  userName: string;
  userMobile: string;
  userCode: string;
  amount: number;
  upiId: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    holderName?: string;
  };
}): { success: boolean; message: string; payoutRequest?: AgentPayoutRequest } {
  const amount = Number(params.amount);

  // Validate minimum amount
  if (isNaN(amount) || amount < REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR) {
    return {
      success: false,
      message: `किमान विड्रॉल रक्कम ₹${REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR} आहे. कृपया किमान ₹${REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR} किंवा त्यापेक्षा जास्त रक्कम प्रविष्ट करा.`,
    };
  }

  if (!params.upiId.trim() && (!params.bankDetails || !params.bankDetails.accountNumber.trim())) {
    return {
      success: false,
      message: "कृपया वैध UPI ID (PhonePe/GPay/Paytm) किंवा बँक खात्याचा तपशील भरा.",
    };
  }

  // Check balance and deduct
  if (params.userType === "agent") {
    const rawAgents = localStorage.getItem(ALL_AGENTS_KEY);
    const agents: AgentUser[] = rawAgents ? JSON.parse(rawAgents) : [];
    const idx = agents.findIndex(
      (a) => a.id === params.userId || a.agentCode.toUpperCase() === params.userCode.toUpperCase()
    );

    if (idx < 0) {
      return { success: false, message: "एजंट खाते सापडले नाही." };
    }

    if (agents[idx].walletBalance < amount) {
      return {
        success: false,
        message: `तुमच्या वॉलेटमध्ये फक्त ₹${formatInr(
          agents[idx].walletBalance
        )} शिल्लक आहे. शिल्लक रकमेपेक्षा जास्त रक्कम काढता येत नाही.`,
      };
    }

    // Deduct from agent wallet
    agents[idx].walletBalance = Number((agents[idx].walletBalance - amount).toFixed(2));
    agents[idx].totalPaidOut = Number(((agents[idx].totalPaidOut || 0) + amount).toFixed(2));
    localStorage.setItem(ALL_AGENTS_KEY, JSON.stringify(agents));
    sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(agents[idx]));
  } else {
    // Student Referrer
    const rawStudents = localStorage.getItem(ALL_STUDENTS_KEY);
    const students: StudentUser[] = rawStudents ? JSON.parse(rawStudents) : [];
    const idx = students.findIndex((s) => s.id === params.userId || s.mobile === params.userMobile);

    if (idx >= 0) {
      const currentEarnings = students[idx].referralEarnings || 0;
      if (currentEarnings < amount) {
        return {
          success: false,
          message: `तुमच्या खात्यात फक्त ₹${formatInr(
            currentEarnings
          )} शिल्लक आहे. शिल्लक रकमेपेक्षा जास्त काढता येत नाही.`,
        };
      }
      students[idx].referralEarnings = Number((currentEarnings - amount).toFixed(2));
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));

      const curRaw = localStorage.getItem("mcq_app_current_student_user_v1");
      if (curRaw) {
        try {
          const cur: StudentUser = JSON.parse(curRaw);
          cur.referralEarnings = students[idx].referralEarnings;
          localStorage.setItem("mcq_app_current_student_user_v1", JSON.stringify(cur));
        } catch {}
      }
    }
  }

  // Create Payout Record
  const newPayout: AgentPayoutRequest = {
    id: `payout_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
    agentId: params.userId,
    agentName: params.userName,
    agentMobile: params.userMobile,
    agentCode: params.userCode,
    userType: params.userType,
    amount,
    upiId: params.upiId.trim() || `${params.userMobile}@upi`,
    bankDetails: params.bankDetails,
    status: "pending",
    requestedAt: Date.now(),
  };

  const payouts = getAllPayoutRequests();
  payouts.unshift(newPayout);
  savePayoutRequests(payouts);

  return {
    success: true,
    message: `₹${amount} विड्रॉल विनंती यशस्वीपणे नोंदवली गेली आहे! ॲडमिन कडून २४ तासांत थेट तुमच्या UPI/बँक खात्यावर रक्कम पाठवली जाईल.`,
    payoutRequest: newPayout,
  };
}

/**
 * Get payout history for an agent or student
 */
export function getUserPayoutsHistory(userIdOrCode: string): AgentPayoutRequest[] {
  if (!userIdOrCode) return [];
  const clean = userIdOrCode.trim().toUpperCase();
  const all = getAllPayoutRequests();

  return all.filter(
    (p) =>
      p.agentId === userIdOrCode ||
      (p.agentCode && p.agentCode.toUpperCase() === clean) ||
      p.agentMobile === userIdOrCode
  );
}
