import {
  InstituteProfile,
  InstituteStudent,
  InstituteWeeklyTest,
  InstituteSubmission,
  ExamType,
  SubjectType,
  Question,
} from "../types";
import { INITIAL_QUESTIONS } from "./initialQuestions";
import { PYQ_QUESTIONS } from "./pyqQuestionsData";

export const ALL_DEFAULT_INSTITUTES: InstituteProfile[] = [
  {
    id: "inst_plpc_ambad",
    name: "Mi Marathiwala Classes, Ambad (Jalna)",
    nameMr: "मी मराठीवाला क्लासेस, अंबड (जि. जालना)",
    instituteCode: "MARATHIWALA-AMBAD",
    directorName: "प्रा. डी. के. सर (Director - Mi Marathiwala Classes)",
    contactNumber: "+91 93072 20454",
    city: "अंबड (जि. जालना, महाराष्ट्र)",
    adminPasscode: "marathi123",
    maxStudentsLimit: 2000,
    batches: [
      "मराठीवाला 12th Toppers Super-50 (PCM)",
      "मराठीवाला Target NEET 650+ Medico",
      "मराठीवाला MHT-CET 99+ Percentile",
      "मराठीवाला 11th Science Foundation Star",
    ],
    bannerNotice: "Mi Marathiwala Classes CBT Portal: Weekly Grand Mock Test is LIVE every Sunday 10:00 AM.",
    bannerNoticeMr: "📢 मी मराठीवाला क्लासेस ऑनलाईन टेस्ट पॅनल: सर्व बॅचेससाठी दर रविवारी सकाळी १०:०० वाजता महा-मॉक टेस्ट सुरू आहे!",
    createdAt: 1704067200000,
  },
  {
    id: "inst_mimarathi",
    name: "Mi Marathi Vala Classes & Tech Prep",
    nameMr: "मी मराठी वाला क्लासेस (NEET / JEE / MHT-CET अकॅडमी)",
    instituteCode: "MIMARATHI",
    directorName: "संचालक: प्रा. अमोल पाटील सर",
    contactNumber: "+91 93072 20454",
    city: "महाराष्ट्र (पुणे, लातूर, छत्रपती संभाजीनगर)",
    adminPasscode: "9307220454",
    maxStudentsLimit: 2000,
    batches: [
      "12th Science Toppers (PCM)",
      "Target NEET 650+ Super Batch",
      "MHT-CET 99+ Percentile Crash Batch",
      "JEE Mains Top Rankers",
      "11th Foundation Star Batch",
    ],
    bannerNotice: "Online CBT Mock Tests & Live Rank Analysis for all batches.",
    bannerNoticeMr: "📢 सर्व बॅचेससाठी साप्ताहिक ऑनलाईन टेस्ट दर रविवारी सुरू आहे. टॉप रँक मिळवा!",
    createdAt: 1704067200000,
  },
  {
    id: "inst_shree_academy",
    name: "Shree Science & Career Academy",
    nameMr: "श्री सायन्स व करिअर अकॅडमी (MHT-CET / NEET)",
    instituteCode: "SHREE2026",
    directorName: "प्रा. ए. के. पाटील सर (M.Sc. Physics)",
    contactNumber: "+91 98765 43210",
    city: "लातूर / पुणे",
    adminPasscode: "2026",
    maxStudentsLimit: 2000,
    batches: [
      "12th Science Toppers (PCM)",
      "Target NEET Super 30 (PCB)",
      "JEE Mains Challenger Batch",
      "MHT-CET FastTrack Crash Batch",
    ],
    bannerNotice: "Weekly Grand Mock Test is LIVE every Sunday.",
    bannerNoticeMr: "📢 साप्ताहिक युनिट टेस्ट ॲपवर वेळेत द्या. निकाल सोमवारी जाहीर होईल.",
    createdAt: 1704067200000,
  },
  {
    id: "inst_royal_academy",
    name: "Royal Science Institute",
    nameMr: "रॉयल सायन्स इन्स्टिट्यूट व करिअर पॉईंट",
    instituteCode: "ROYAL2026",
    directorName: "डॉ. आर. व्ही. जोशी सर",
    contactNumber: "+91 94220 98765",
    city: "छत्रपती संभाजीनगर",
    adminPasscode: "royal123",
    maxStudentsLimit: 2000,
    batches: ["NEET Elite PCB", "MHT-CET PCM Crash", "11th Science Foundation"],
    bannerNotice: "All batch students must attempt practice tests before 8:00 PM.",
    bannerNoticeMr: "📢 सायंकाळी ८:०० वाजेपूर्वी सर्व विद्यार्थ्यांनी टेस्ट पूर्ण करावी.",
    createdAt: 1704067200000,
  },
  {
    id: "inst_vidyadeep",
    name: "Vidyadeep Career Classes",
    nameMr: "विद्यादीप करिअर अकॅडमी",
    instituteCode: "VIDYADEEP",
    directorName: "प्रा. एस. एन. कुलकर्णी सर",
    contactNumber: "+91 98900 11223",
    city: "नांदेड / कोल्हापूर",
    adminPasscode: "vidya2026",
    maxStudentsLimit: 2000,
    batches: ["12th Board + MHT-CET", "NEET Medical Achievers"],
    bannerNotice: "New test series uploaded for chapter-wise preparation.",
    bannerNoticeMr: "📢 प्रकरणनिहाय नवीन टेस्ट सिरीज ॲपवर जोडण्यात आली आहे.",
    createdAt: 1704067200000,
  },
];

export const DEFAULT_INSTITUTE: InstituteProfile = ALL_DEFAULT_INSTITUTES[0];

// Generate authentic Maharashtra student names
const MAHARASHTRA_FIRST_NAMES = [
  "प्रणव", "आदित्य", "रोहन", "साहिल", "तेजस", "ओमकार", "स्वप्निल", "ऋषिकेश", "अभिषेक", "वैभव",
  "साक्षी", "अनुजा", "स्नेहा", "पूजा", "रिया", "नेहा", "पल्लवी", "श्रावणी", "ज्ञानेश्वरी", "आकांक्षा",
  "सिद्धेश", "हर्षल", "यश", "मयूर", "सुशांत", "कार्तिक", "समर्थ", "ओंकार", "विनायक", "गौरव",
  "अंकिता", "दीपाली", "रुतुजा", "सायली", "प्राजक्ता", "भाग्यश्री", "श्रद्धा", "मानसी", "प्रियांका", "अमृता",
];

const MAHARASHTRA_LAST_NAMES = [
  "पाटील", "देशमुख", "शिंदे", "कुलकर्णी", "जोशी", "कदम", "गायकवाड", "पवार", "मोरे", "चव्हाण",
  "जाधव", "भोसले", "माने", "जगताप", "सावंत", "थोरात", "तांबडे", "सूर्यवंशी", "वाघमारे", "कांबळे",
];

export function generateSampleStudents(
  count: number = 60,
  startRollNo: number = 1001,
  instituteId: string = DEFAULT_INSTITUTE.id,
  batches: string[] = DEFAULT_INSTITUTE.batches
): InstituteStudent[] {
  const students: InstituteStudent[] = [];
  const exams: ExamType[] = ["MHT_CET", "NEET", "JEE_MAIN"];

  for (let i = 0; i < count; i++) {
    const fn = MAHARASHTRA_FIRST_NAMES[i % MAHARASHTRA_FIRST_NAMES.length];
    const ln = MAHARASHTRA_LAST_NAMES[(i * 3 + 2) % MAHARASHTRA_LAST_NAMES.length];
    const rollNo = `R-${startRollNo + i}`;
    const batch = batches[i % batches.length];
    const targetExam = batch.includes("NEET") ? "NEET" : batch.includes("JEE") ? "JEE_MAIN" : "MHT_CET";
    const phone = `9${Math.floor(100000000 + (i * 9876543) % 900000000)}`;

    students.push({
      id: `stud_${instituteId}_${startRollNo + i}`,
      instituteId,
      rollNo,
      name: `${fn} ${ln}`,
      mobile: phone,
      batchName: batch,
      examTarget: targetExam,
      addedAt: Date.now() - i * 86400000 * 2,
      isActive: true,
      testsAttemptedCount: (i % 5) + 1,
      avgScorePercentage: Math.min(98, Math.max(52, 60 + ((i * 7) % 38))),
    });
  }

  return students;
}

// Initial Preloaded Weekly Tests Created by Classes
export const INITIAL_INSTITUTE_WEEKLY_TESTS: InstituteWeeklyTest[] = [
  {
    id: "inst_test_01",
    instituteId: DEFAULT_INSTITUTE.id,
    testCode: "WT-01-PHY-CHEM",
    title: "Weekly Unit Test 01: Physics (Rotational Dynamics) + Chemistry (Solutions)",
    titleMr: "साप्ताहिक घटक चाचणी ०१: भौतिकशास्त्र (परिभ्रमण गती) + रसायनशास्त्र (द्रावणे)",
    exam: "MHT_CET",
    subject: "All",
    chapters: ["Rotational Dynamics", "Solutions & Colligative Properties", "Solid State"],
    topicsDescription: "Moment of Inertia, Conservation of Angular Momentum, Raoult's Law, Osmotic Pressure, Elevation in B.P.",
    batchAssigned: "12th Science Toppers (PCM)",
    scheduledDate: "2026-08-23",
    durationMinutes: 45,
    perQuestionTimerSeconds: 60,
    enforcePerQuestionTimer: true,
    totalMarks: 50,
    markingScheme: {
      correct: 1,
      incorrect: 0,
      mathsCorrect: 2,
    },
    questions: INITIAL_QUESTIONS.slice(0, 25),
    status: "active",
    createdAt: Date.now() - 172800000,
    createdBy: "प्रा. अमोल पाटील सर",
  },
  {
    id: "inst_test_02",
    instituteId: DEFAULT_INSTITUTE.id,
    testCode: "WT-02-MATHS-MATRICES",
    title: "Class Rank Booster: Mathematics (Matrices & Trigonometry)",
    titleMr: "क्लास रँक बूस्टर: गणित (मॅट्रायसेस व त्रिकोणमिती)",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapters: ["Matrices", "Trigonometric Functions", "Vectors"],
    topicsDescription: "Adjoint Method, Inverse of Matrix, General Solutions, Dot and Cross Products.",
    batchAssigned: "12th Science Toppers (PCM)",
    scheduledDate: "2026-08-24",
    durationMinutes: 60,
    perQuestionTimerSeconds: 90,
    enforcePerQuestionTimer: true,
    totalMarks: 50,
    markingScheme: {
      correct: 2,
      incorrect: 0,
      mathsCorrect: 2,
    },
    questions: INITIAL_QUESTIONS.filter((q) => q.subject === "Mathematics").slice(0, 25),
    status: "active",
    createdAt: Date.now() - 86400000,
    createdBy: "प्रा. अमोल पाटील सर",
  },
  {
    id: "inst_test_03",
    instituteId: DEFAULT_INSTITUTE.id,
    testCode: "WT-03-NEET-BIO",
    title: "NEET Super 30: Biology (Genetics & Biotechnology Complete)",
    titleMr: "NEET सुपर ३०: जीवशास्त्र (अनुवांशिकता व जैवतंत्रज्ञान संपूर्ण सराव)",
    exam: "NEET",
    subject: "Biology",
    chapters: ["Principles of Inheritance & Variation", "Molecular Basis of Inheritance", "Biotechnology Principles"],
    topicsDescription: "Mendelian Genetics, DNA Replication, Transcription, Translation, Recombinant DNA Technology.",
    batchAssigned: "Target NEET 650+ Super Batch",
    scheduledDate: "2026-08-25",
    durationMinutes: 45,
    perQuestionTimerSeconds: 45,
    enforcePerQuestionTimer: true,
    totalMarks: 100,
    markingScheme: {
      correct: 4,
      incorrect: -1,
    },
    questions: PYQ_QUESTIONS.filter((q) => q.subject === "Biology").slice(0, 25),
    status: "active",
    createdAt: Date.now() - 43200000,
    createdBy: "डॉ. सावंत मॅडम (NEET Faculty)",
  },
];

// Initial Demo Submissions for Batch Leaderboard
export const INITIAL_INSTITUTE_SUBMISSIONS: InstituteSubmission[] = [
  {
    id: "sub_01",
    testId: "inst_test_01",
    instituteId: DEFAULT_INSTITUTE.id,
    studentId: "stud_1001",
    studentRollNo: "R-1001",
    studentName: "प्रणव पाटील",
    batchName: "12th Science Toppers (PCM)",
    score: 48,
    maxMarks: 50,
    percentage: 96,
    accuracy: 96,
    correctCount: 24,
    wrongCount: 1,
    unattemptedCount: 0,
    timeTakenSeconds: 1840,
    submittedAt: Date.now() - 3600000 * 5,
    userAnswers: {},
  },
  {
    id: "sub_02",
    testId: "inst_test_01",
    instituteId: DEFAULT_INSTITUTE.id,
    studentId: "stud_1004",
    studentRollNo: "R-1004",
    studentName: "साक्षी देशमुख",
    batchName: "12th Science Toppers (PCM)",
    score: 46,
    maxMarks: 50,
    percentage: 92,
    accuracy: 94,
    correctCount: 23,
    wrongCount: 2,
    unattemptedCount: 0,
    timeTakenSeconds: 2100,
    submittedAt: Date.now() - 3600000 * 4,
    userAnswers: {},
  },
  {
    id: "sub_03",
    testId: "inst_test_01",
    instituteId: DEFAULT_INSTITUTE.id,
    studentId: "stud_1002",
    studentRollNo: "R-1002",
    studentName: "आदित्य शिंदे",
    batchName: "12th Science Toppers (PCM)",
    score: 44,
    maxMarks: 50,
    percentage: 88,
    accuracy: 90,
    correctCount: 22,
    wrongCount: 2,
    unattemptedCount: 1,
    timeTakenSeconds: 1950,
    submittedAt: Date.now() - 3600000 * 3,
    userAnswers: {},
  },
];

// LocalStorage Persistence Keys
const STORAGE_ALL_INSTITUTES = "mhtcet_all_institutes_v1";
const STORAGE_INSTITUTE_PROFILE = "mhtcet_institute_profile_v1";
const STORAGE_INSTITUTE_STUDENTS = "mhtcet_institute_students_v1";
const STORAGE_INSTITUTE_TESTS = "mhtcet_institute_weekly_tests_v1";
const STORAGE_INSTITUTE_SUBMISSIONS = "mhtcet_institute_submissions_v1";
const STORAGE_CURRENT_LOGGED_INSTITUTE_STUDENT = "mhtcet_logged_inst_student_v1";
const STORAGE_ACTIVE_WHITELABEL_INSTITUTE = "mhtcet_active_whitelabel_institute_v1";

export function getAllInstitutes(): InstituteProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_ALL_INSTITUTES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading all institutes", e);
  }
  saveAllInstitutes(ALL_DEFAULT_INSTITUTES);
  return ALL_DEFAULT_INSTITUTES;
}

export function saveAllInstitutes(institutes: InstituteProfile[]) {
  try {
    localStorage.setItem(STORAGE_ALL_INSTITUTES, JSON.stringify(institutes));
  } catch (e) {
    console.error("Error saving all institutes", e);
  }
}

export function findInstituteByCode(code: string): InstituteProfile | null {
  const all = getAllInstitutes();
  const clean = code.trim().toUpperCase();
  return (
    all.find(
      (inst) =>
        inst.instituteCode.toUpperCase() === clean ||
        inst.id.toUpperCase() === clean ||
        inst.adminPasscode === code.trim()
    ) || null
  );
}

export function getActiveWhiteLabelInstitute(): InstituteProfile | null {
  try {
    const data = sessionStorage.getItem(STORAGE_ACTIVE_WHITELABEL_INSTITUTE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading active white-label institute", e);
  }
  return null;
}

export function setActiveWhiteLabelInstitute(inst: InstituteProfile | null) {
  try {
    if (inst) {
      sessionStorage.setItem(STORAGE_ACTIVE_WHITELABEL_INSTITUTE, JSON.stringify(inst));
    } else {
      sessionStorage.removeItem(STORAGE_ACTIVE_WHITELABEL_INSTITUTE);
    }
  } catch (e) {
    console.error("Error saving active white-label institute", e);
  }
}

export function getStoredInstituteProfile(): InstituteProfile {
  try {
    const data = localStorage.getItem(STORAGE_INSTITUTE_PROFILE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading institute profile", e);
  }
  return DEFAULT_INSTITUTE;
}

export function saveStoredInstituteProfile(profile: InstituteProfile) {
  try {
    localStorage.setItem(STORAGE_INSTITUTE_PROFILE, JSON.stringify(profile));
    // Also sync with all institutes
    const all = getAllInstitutes();
    const idx = all.findIndex((i) => i.id === profile.id);
    if (idx >= 0) {
      all[idx] = profile;
    } else {
      all.push(profile);
    }
    saveAllInstitutes(all);
  } catch (e) {
    console.error("Error saving institute profile", e);
  }
}

export function getStoredInstituteStudents(instituteId?: string): InstituteStudent[] {
  try {
    const data =
      localStorage.getItem(STORAGE_INSTITUTE_STUDENTS) ||
      localStorage.getItem("mhtcet_institute_students_vault_v2") ||
      localStorage.getItem("mhtcet_institute_students_backup_mirror");
    if (data) {
      const parsed: InstituteStudent[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Self-heal other keys
        try {
          localStorage.setItem(STORAGE_INSTITUTE_STUDENTS, data);
          localStorage.setItem("mhtcet_institute_students_vault_v2", data);
        } catch (err) {}
        if (instituteId) {
          return parsed.filter((s) => s.instituteId === instituteId);
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading institute students", e);
  }
  const init = generateSampleStudents(60, 1001, instituteId || DEFAULT_INSTITUTE.id);
  saveStoredInstituteStudents(init);
  return init;
}

export function saveStoredInstituteStudents(students: InstituteStudent[]) {
  try {
    const serialized = JSON.stringify(students);
    localStorage.setItem(STORAGE_INSTITUTE_STUDENTS, serialized);
    localStorage.setItem("mhtcet_institute_students_vault_v2", serialized);
    localStorage.setItem("mhtcet_institute_students_backup_mirror", serialized);
  } catch (e) {
    console.error("Error saving institute students", e);
  }
}

export function getStoredInstituteWeeklyTests(instituteId?: string): InstituteWeeklyTest[] {
  try {
    const data = localStorage.getItem(STORAGE_INSTITUTE_TESTS);
    if (data) {
      const parsed: InstituteWeeklyTest[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (instituteId) {
          return parsed.filter((t) => t.instituteId === instituteId);
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading institute tests", e);
  }
  return INITIAL_INSTITUTE_WEEKLY_TESTS;
}

export function saveStoredInstituteWeeklyTests(tests: InstituteWeeklyTest[]) {
  try {
    localStorage.setItem(STORAGE_INSTITUTE_TESTS, JSON.stringify(tests));
  } catch (e) {
    console.error("Error saving institute tests", e);
  }
}

export function getStoredInstituteSubmissions(instituteId?: string): InstituteSubmission[] {
  try {
    const data = localStorage.getItem(STORAGE_INSTITUTE_SUBMISSIONS);
    if (data) {
      const parsed: InstituteSubmission[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (instituteId) {
          return parsed.filter((s) => s.instituteId === instituteId);
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading institute submissions", e);
  }
  return INITIAL_INSTITUTE_SUBMISSIONS;
}

export function saveStoredInstituteSubmissions(submissions: InstituteSubmission[]) {
  try {
    localStorage.setItem(STORAGE_INSTITUTE_SUBMISSIONS, JSON.stringify(submissions));
  } catch (e) {
    console.error("Error saving institute submissions", e);
  }
}

export function getStoredLoggedInstituteStudent(): InstituteStudent | null {
  try {
    const data = localStorage.getItem(STORAGE_CURRENT_LOGGED_INSTITUTE_STUDENT);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading logged student", e);
  }
  return null;
}

export function setStoredLoggedInstituteStudent(student: InstituteStudent | null) {
  try {
    if (student) {
      localStorage.setItem(STORAGE_CURRENT_LOGGED_INSTITUTE_STUDENT, JSON.stringify(student));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_LOGGED_INSTITUTE_STUDENT);
    }
  } catch (e) {
    console.error("Error saving logged student", e);
  }
}

// ----------------------------------------------------------------------------
// Word / Excel / CSV Text Parser for Coaching Classes Mock Tests
// ----------------------------------------------------------------------------
export function parseMockTestFromWordOrExcel(
  rawText: string,
  exam: ExamType = "MHT_CET",
  subject: SubjectType = "Physics",
  defaultChapter: string = "General Mock Test"
): { questions: Question[]; warnings: string[] } {
  const questions: Question[] = [];
  const warnings: string[] = [];

  if (!rawText.trim()) {
    return { questions, warnings: ["कृपया मजकूर प्रविष्ट करा."] };
  }

  // Detect CSV / TSV format (lines separated by tabs or commas)
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const isTabOrCsv = lines.some((l) => l.includes("\t") || (l.split(",").length >= 5 && l.includes(",")));

  if (isTabOrCsv) {
    lines.forEach((line, lineIdx) => {
      // Skip header if line 0 looks like header
      if (lineIdx === 0 && (line.toLowerCase().includes("question") || line.toLowerCase().includes("option") || line.includes("प्रश्न"))) {
        return;
      }

      const parts = line.includes("\t") ? line.split("\t") : line.split(",");
      const cleanParts = parts.map((p) => p.replace(/^["']|["']$/g, "").trim());

      if (cleanParts.length >= 5) {
        const qText = cleanParts[0];
        const optA = cleanParts[1] || "A";
        const optB = cleanParts[2] || "B";
        const optC = cleanParts[3] || "C";
        const optD = cleanParts[4] || "D";
        const ansRaw = (cleanParts[5] || "A").trim().toUpperCase();

        let correctIdx = 0;
        if (ansRaw === "B" || ansRaw === "2" || ansRaw === "ब") correctIdx = 1;
        else if (ansRaw === "C" || ansRaw === "3" || ansRaw === "क") correctIdx = 2;
        else if (ansRaw === "D" || ansRaw === "4" || ansRaw === "ड") correctIdx = 3;

        const expl = cleanParts[6] || "सविस्तर स्पष्टीकरण: योग्य पर्याय " + ["A", "B", "C", "D"][correctIdx] + " आहे.";
        const chapter = cleanParts[7] || defaultChapter;

        if (qText) {
          questions.push({
            id: `excel_q_${Date.now()}_${lineIdx}`,
            exam,
            subject,
            chapter,
            difficulty: "Medium",
            questionText: qText,
            questionTextMr: qText,
            options: [optA, optB, optC, optD],
            optionsMr: [optA, optB, optC, optD],
            correctOption: correctIdx,
            explanation: expl,
            explanationMr: expl,
            isCustom: true,
            createdAt: Date.now(),
          });
        }
      }
    });

    if (questions.length > 0) {
      return { questions, warnings };
    }
  }

  // Word / Text document block parser
  // Splits by "Q1.", "Q 1.", "1.", "प्र. १", "Question 1", etc.
  const blocks = rawText.split(/\n\s*(?:Q\s*\.?\s*\d+|Question\s*\d+|प्र\s*\.?\s*\d+|\d+\.)[\s\:\-\)]/gi);

  blocks.forEach((blk, idx) => {
    const trimmed = blk.trim();
    if (!trimmed) return;

    const blkLines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (blkLines.length === 0) return;

    let questionLines: string[] = [];
    let options: string[] = ["", "", "", ""];
    let correctIdx = 0;
    let explanation = "योग्य पर्याय योग्य सूत्रावर आधारित आहे.";
    let foundOption = false;

    for (const l of blkLines) {
      // Check for Option A / 1 / (A) / (1)
      const optAMatch = l.match(/^(?:A|1|\(A\)|\(1\)|अ\)|\(अ\))[\.\:\-\)]\s*(.*)$/i);
      const optBMatch = l.match(/^(?:B|2|\(B\)|\(2\)|ब\)|\(ब\))[\.\:\-\)]\s*(.*)$/i);
      const optCMatch = l.match(/^(?:C|3|\(C\)|\(3\)|क\)|\(क\))[\.\:\-\)]\s*(.*)$/i);
      const optDMatch = l.match(/^(?:D|4|\(D\)|\(4\)|ड\)|\(ड\))[\.\:\-\)]\s*(.*)$/i);
      const ansMatch = l.match(/^(?:Ans|Answer|Correct|उत्तर|AnsKey)[\.\:\-\s]+([A-D1-4अ-ड])/i);
      const expMatch = l.match(/^(?:Explanation|Solution|स्पष्टीकरण|Hint)[\.\:\-\s]+(.*)$/i);

      if (optAMatch) {
        options[0] = optAMatch[1].trim();
        foundOption = true;
      } else if (optBMatch) {
        options[1] = optBMatch[1].trim();
        foundOption = true;
      } else if (optCMatch) {
        options[2] = optCMatch[1].trim();
        foundOption = true;
      } else if (optDMatch) {
        options[3] = optDMatch[1].trim();
        foundOption = true;
      } else if (ansMatch) {
        const a = ansMatch[1].toUpperCase();
        if (a === "B" || a === "2" || a === "ब") correctIdx = 1;
        else if (a === "C" || a === "3" || a === "क") correctIdx = 2;
        else if (a === "D" || a === "4" || a === "ड") correctIdx = 3;
        else correctIdx = 0;
      } else if (expMatch) {
        explanation = expMatch[1].trim();
      } else if (!foundOption) {
        questionLines.push(l);
      }
    }

    const qText = questionLines.join(" ").trim();
    if (qText && options[0] && options[1]) {
      // Fill fallback options if empty
      if (!options[2]) options[2] = "वरीलपैकी दोन्ही";
      if (!options[3]) options[3] = "वरीलपैकी काहीही नाही";

      questions.push({
        id: `word_q_${Date.now()}_${idx}`,
        exam,
        subject,
        chapter: defaultChapter,
        difficulty: "Medium",
        questionText: qText,
        questionTextMr: qText,
        options: [options[0], options[1], options[2], options[3]],
        optionsMr: [options[0], options[1], options[2], options[3]],
        correctOption: correctIdx,
        explanation,
        explanationMr: explanation,
        isCustom: true,
        createdAt: Date.now(),
      });
    }
  });

  if (questions.length === 0) {
    warnings.push("कोणताही प्रश्न ओळखता आला नाही. कृपया प्रश्न व ४ पर्यायांचे स्वरूप तपासा.");
  }

  return { questions, warnings };
}
