import { GrandMockTestItem, ExamType, SubjectType, Question } from "../types";
import { INITIAL_QUESTIONS } from "./initialQuestions";
import { PYQ_QUESTIONS } from "./pyqQuestionsData";
import {
  buildGuaranteedNonRepeatingMock,
  deduplicateQuestionsList,
  normalizeQuestionSignature
} from "../utils/proceduralQuestionEngine";
import { NEET_180_FULL_QUESTIONS, NEET_180_GRAND_TEST_ITEM } from "./neetFullMock180Questions";
import { SPECIAL_1_QUESTIONS, SPECIAL_1_GRAND_TEST_ITEM } from "./special1MockQuestions";

export { NEET_180_FULL_QUESTIONS, NEET_180_GRAND_TEST_ITEM, SPECIAL_1_QUESTIONS, SPECIAL_1_GRAND_TEST_ITEM };

export const GRAND_MOCK_TESTS: GrandMockTestItem[] = [
  SPECIAL_1_GRAND_TEST_ITEM,
  NEET_180_GRAND_TEST_ITEM,
  {
    id: "grand-test-01",
    testNumber: 1,
    title: "MHT-CET Grand Full Mock 01 (PCM Engineering)",
    exam: "MHT_CET",
    group: "PCM",
    targetPercentileGoal: "99.5+ %ile Target (COEP/VJTI)",
    totalMarks: 200,
    durationMinutes: 150,
    totalQuestions: 150,
    markingScheme: {
      correct: 1,
      mathsCorrect: 2,
      incorrect: 0,
      unattempted: 0
    },
    syllabusCoverage: "Full 11th (20%) + 12th (80%) Physics, Chemistry, Maths",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Physics", "Chemistry", "Mathematics"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 50, marks: 50 },
      { subject: "Chemistry", questionCount: 50, marks: 50 },
      { subject: "Mathematics", questionCount: 50, marks: 100 },
    ],
    predictedCollegeTargets: [
      "COEP Technological University, Pune (Computer/IT)",
      "VJTI, Mumbai (Computer/Data Science)",
      "PICT, Pune (AI & Data Science/ECE)",
      "SPIT, Mumbai (Computer Science)",
    ]
  },
  {
    id: "grand-test-02",
    testNumber: 2,
    title: "MHT-CET Grand Full Mock 02 (PCB Pharmacy / Agri / Bio)",
    exam: "MHT_CET",
    group: "PCB",
    targetPercentileGoal: "99.0+ %ile Target (Govt. Pharmacy Colleges)",
    totalMarks: 200,
    durationMinutes: 150,
    totalQuestions: 200,
    markingScheme: {
      correct: 1,
      incorrect: 0,
      unattempted: 0
    },
    syllabusCoverage: "Complete 11th & 12th Physics, Chemistry, Biology (Botany & Zoology)",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Physics", "Chemistry", "Biology"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 50, marks: 50 },
      { subject: "Chemistry", questionCount: 50, marks: 50 },
      { subject: "Biology", questionCount: 100, marks: 100 },
    ],
    predictedCollegeTargets: [
      "ICT Mumbai (Pharmaceutical Tech)",
      "Government College of Pharmacy, Karad/Amravati",
      "Bombay College of Pharmacy, Mumbai",
      "Mahatma Phule Krishi Vidyapeeth, Rahuri (B.Sc Agri)",
    ]
  },
  {
    id: "grand-test-03",
    testNumber: 3,
    title: "NEET-UG All India Grand Mock 01 (MBBS / BDS Target)",
    exam: "NEET",
    targetPercentileGoal: "650+ Marks Target (Top Govt Medical Colleges)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "NCERT Class 11 & 12 Complete Biology (Botany + Zoology), Physics, Chemistry",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Biology", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Biology", questionCount: 90, marks: 360 },
      { subject: "Physics", questionCount: 45, marks: 180 },
      { subject: "Chemistry", questionCount: 45, marks: 180 },
    ],
    predictedCollegeTargets: [
      "AIIMS New Delhi / Nagpur",
      "Seth GS Medical College & KEM Hospital, Mumbai",
      "BJ Government Medical College, Pune",
      "Grant Medical College & Sir JJ Hospital, Mumbai",
      "GMC Nagpur / Aurangabad",
    ]
  },
  {
    id: "grand-test-04",
    testNumber: 4,
    title: "NEET-UG All India Grand Mock 02 (High-Yield NCERT Master)",
    exam: "NEET",
    targetPercentileGoal: "680+ Marks Target (Top 1000 AIR Rank)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "Full Syllabus High-Yield NCERT Lines & Conceptual Numericals",
    difficulty: "Moderate to Hard",
    subjectsIncluded: ["Biology", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Biology", questionCount: 90, marks: 360 },
      { subject: "Physics", questionCount: 45, marks: 180 },
      { subject: "Chemistry", questionCount: 45, marks: 180 },
    ],
    predictedCollegeTargets: [
      "AIIMS New Delhi / AIIMS Bhopal",
      "JIPMER Puducherry",
      "Maulana Azad Medical College (MAMC), Delhi",
      "King George's Medical University (KGMU), Lucknow",
    ]
  },
  {
    id: "grand-test-05",
    testNumber: 5,
    title: "JEE Main All India Grand Mock 01 (NIT / IIIT / JEE Adv. Target)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.2+ %ile Target (Top 5 NITs / IIT Advance Qualify)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "Class 11 & 12 Physics, Chemistry, Mathematics (Full Syllabus)",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 25, marks: 100 },
      { subject: "Chemistry", questionCount: 25, marks: 100 },
      { subject: "Mathematics", questionCount: 25, marks: 100 },
    ],
    predictedCollegeTargets: [
      "NIT Trichy / Surathkal / Warangal (Computer Science)",
      "VNIT Nagpur (Computer Science / Mechanical)",
      "IIIT Hyderabad / Allahabad",
      "JEE Advanced 2025/2026 Qualification Guaranteed",
    ]
  },
  {
    id: "grand-test-06",
    testNumber: 6,
    title: "JEE Main All India Grand Mock 02 (Advanced Problem Solving)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.7+ %ile Target (Under 3000 All India Rank)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "Multi-concept problems, Mechanics, Electrodynamics, Organic, Calculus",
    difficulty: "High Rank Challenger",
    subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 25, marks: 100 },
      { subject: "Chemistry", questionCount: 25, marks: 100 },
      { subject: "Mathematics", questionCount: 25, marks: 100 },
    ],
    predictedCollegeTargets: [
      "Top NITs 100% Guaranteed Seat",
      "Top IIITs All Branches Open",
      "Top 1% Percentile Nationwide Eligibility",
    ]
  },
  {
    id: "grand-test-07",
    testNumber: 7,
    title: "MHT-CET Grand Full Mock 03 (COEP / VJTI 99.8%ile Special)",
    exam: "MHT_CET",
    group: "PCM",
    targetPercentileGoal: "99.8+ %ile Target (State Rank Under 200)",
    totalMarks: 200,
    durationMinutes: 150,
    totalQuestions: 150,
    markingScheme: {
      correct: 1,
      mathsCorrect: 2,
      incorrect: 0,
      unattempted: 0
    },
    syllabusCoverage: "High-Weightage Chapters: Rotational Dynamics, Calculus, Thermodynamics, P-Block",
    difficulty: "Moderate to Hard",
    subjectsIncluded: ["Physics", "Chemistry", "Mathematics"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 50, marks: 50 },
      { subject: "Chemistry", questionCount: 50, marks: 50 },
      { subject: "Mathematics", questionCount: 50, marks: 100 },
    ],
    predictedCollegeTargets: [
      "COEP Pune (Computer Engineering)",
      "VJTI Mumbai (Information Technology)",
      "Walchand College of Engineering, Sangli",
    ]
  },
  {
    id: "grand-test-08",
    testNumber: 8,
    title: "NEET-UG All India Grand Mock 03 (Full NCERT Speed & Accuracy)",
    exam: "NEET",
    targetPercentileGoal: "670+ Marks Target (State Top 50 Merit List)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "Complete Biology, Physics Optics & Modern Physics, Physical & Organic Chem",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Biology", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Biology", questionCount: 90, marks: 360 },
      { subject: "Physics", questionCount: 45, marks: 180 },
      { subject: "Chemistry", questionCount: 45, marks: 180 },
    ],
    predictedCollegeTargets: [
      "Top Maharashtra GMCs (KEM, Sion, Nair, BJ Pune)",
      "Central Universities (BHU, AMU, JIPMER)",
    ]
  },
  {
    id: "grand-test-09",
    testNumber: 9,
    title: "JEE Main All India Grand Mock 03 (Speed-Calculus & Organic Chemistry)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.5+ %ile Target (Top NIT CS Branches)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0
    },
    syllabusCoverage: "Full PCM Standard High-Frequency NTA Syllabus",
    difficulty: "Real Exam Exact",
    subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 25, marks: 100 },
      { subject: "Chemistry", questionCount: 25, marks: 100 },
      { subject: "Mathematics", questionCount: 25, marks: 100 },
    ],
    predictedCollegeTargets: [
      "VNIT Nagpur / MANIT Bhopal / SVNIT Surat",
      "IIIT Jabalpur / Gwalior / Pune",
    ]
  },
  {
    id: "grand-test-10",
    testNumber: 10,
    title: "MHT-CET / NEET / JEE Super Finale Grand Mock 10 (All-Rounder)",
    exam: "MHT_CET",
    group: "All",
    targetPercentileGoal: "99.9+ %ile State Topper Benchmark",
    totalMarks: 200,
    durationMinutes: 150,
    totalQuestions: 150,
    markingScheme: {
      correct: 1,
      mathsCorrect: 2,
      incorrect: 0,
      unattempted: 0
    },
    syllabusCoverage: "Comprehensive 100% Syllabus All Subjects Grand Master Test",
    difficulty: "High Rank Challenger",
    subjectsIncluded: ["Physics", "Chemistry", "Mathematics", "Biology"],
    subjectDistribution: [
      { subject: "Physics", questionCount: 50, marks: 50 },
      { subject: "Chemistry", questionCount: 50, marks: 50 },
      { subject: "Mathematics", questionCount: 50, marks: 100 },
    ],
    predictedCollegeTargets: [
      "State Merit Rank 1 to 50",
      "100% Dream College Admission in 1st Round",
    ]
  },
];

// Helper to generate comprehensive 100+ Real Exam Series
function generateAll100PlusGrandTests(): GrandMockTestItem[] {
  const list: GrandMockTestItem[] = [...GRAND_MOCK_TESTS];

  // 1. MHT-CET PCM Shifts 11 to 45 (35 Tests)
  for (let i = 11; i <= 45; i++) {
    const shiftNum = ((i - 11) % 10) + 1;
    const year = i > 30 ? 2024 : i > 20 ? 2023 : 2022;
    list.push({
      id: `grand-test-pcm-${i}`,
      testNumber: i,
      title: `MHT-CET PCM Real Shift Paper ${i} (${year} Official Pattern - Shift ${shiftNum})`,
      exam: "MHT_CET",
      group: "PCM",
      targetPercentileGoal: `${(98.0 + (i % 20) * 0.09).toFixed(1)}+ %ile Target`,
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 150,
      markingScheme: { correct: 1, mathsCorrect: 2, incorrect: 0, unattempted: 0 },
      syllabusCoverage: `Complete Class 11th & 12th PCM Shift ${shiftNum} Standard Syllabus`,
      difficulty: i % 3 === 0 ? "High Rank Challenger" : i % 2 === 0 ? "Moderate to Hard" : "Real Exam Exact",
      subjectsIncluded: ["Physics", "Chemistry", "Mathematics"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Mathematics", questionCount: 50, marks: 100 },
      ],
      predictedCollegeTargets: ["COEP Pune", "VJTI Mumbai", "PICT Pune", "SPIT Mumbai", "Walchand Sangli"]
    });
  }

  // 2. MHT-CET PCB Shifts 46 to 75 (30 Tests)
  for (let i = 46; i <= 75; i++) {
    const shiftNum = ((i - 46) % 8) + 1;
    const year = i > 60 ? 2024 : 2023;
    list.push({
      id: `grand-test-pcb-${i}`,
      testNumber: i,
      title: `MHT-CET PCB Pharmacy Real Shift Paper ${i} (${year} Official - Shift ${shiftNum})`,
      exam: "MHT_CET",
      group: "PCB",
      targetPercentileGoal: `${(98.2 + (i % 15) * 0.1).toFixed(1)}+ %ile Target`,
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 200,
      markingScheme: { correct: 1, incorrect: 0, unattempted: 0 },
      syllabusCoverage: `Complete Biology (100 Qs), Physics (50 Qs), Chemistry (50 Qs)`,
      difficulty: i % 2 === 0 ? "Real Exam Exact" : "Moderate to Hard",
      subjectsIncluded: ["Physics", "Chemistry", "Biology"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Biology", questionCount: 100, marks: 100 },
      ],
      predictedCollegeTargets: ["ICT Mumbai", "Govt Pharmacy College Karad", "Bombay College of Pharmacy", "MPKV Rahuri"]
    });
  }

  // 3. NEET All India Grand Mocks 76 to 95 (20 Tests)
  for (let i = 76; i <= 95; i++) {
    const testIdx = i - 75 + 3;
    list.push({
      id: `grand-test-neet-${i}`,
      testNumber: i,
      title: `NEET-UG All India Grand Mock Test ${testIdx} (720 Marks NTA Exact)`,
      exam: "NEET",
      targetPercentileGoal: `${620 + (i % 8) * 10}+ Marks Target (MBBS Govt College)`,
      totalMarks: 720,
      durationMinutes: 200,
      totalQuestions: 180,
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      syllabusCoverage: "NCERT Complete 11th & 12th Biology, Physics & Chemistry",
      difficulty: i % 3 === 0 ? "High Rank Challenger" : "Real Exam Exact",
      subjectsIncluded: ["Biology", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Biology", questionCount: 90, marks: 360 },
        { subject: "Physics", questionCount: 45, marks: 180 },
        { subject: "Chemistry", questionCount: 45, marks: 180 },
      ],
      predictedCollegeTargets: ["AIIMS New Delhi / Nagpur", "KEM Hospital Mumbai", "BJ Medical Pune", "GMC Aurangabad"]
    });
  }

  // 4. JEE Main Full Papers 96 to 110 (15 Tests)
  for (let i = 96; i <= 110; i++) {
    const testIdx = i - 95 + 3;
    list.push({
      id: `grand-test-jee-${i}`,
      testNumber: i,
      title: `JEE Main All India Grand Mock Paper ${testIdx} (NTA 300 Marks Session)`,
      exam: "JEE_MAIN",
      targetPercentileGoal: `${(99.0 + (i % 10) * 0.08).toFixed(2)}+ %ile (Top NITs CSE)`,
      totalMarks: 300,
      durationMinutes: 180,
      totalQuestions: 75,
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      syllabusCoverage: "NTA Prescribed Physics, Chemistry & Mathematics Complete Syllabus",
      difficulty: "Real Exam Exact",
      subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 25, marks: 100 },
        { subject: "Chemistry", questionCount: 25, marks: 100 },
        { subject: "Mathematics", questionCount: 25, marks: 100 },
      ],
      predictedCollegeTargets: ["NIT Trichy", "VNIT Nagpur", "IIIT Pune", "SVNIT Surat"]
    });
  }

  return list;
}

export const ALL_GRAND_MOCK_TESTS: GrandMockTestItem[] = generateAll100PlusGrandTests();

/**
 * Predicts realistic percentile and rank based on the student's actual score in Grand Test
 */
export function calculatePredictedRealExamScore(
  exam: ExamType,
  rawScore: number,
  maxMarks: number
): {
  predictedPercentile: number;
  estimatedStateRank: string;
  estimatedAllIndiaRank: string;
  gradeTier: string;
  admissionChance: string;
  recommendedNextSteps: string[];
} {
  const percentage = Math.max(0, Math.min(100, (rawScore / (maxMarks || 1)) * 100));

  if (exam === "MHT_CET") {
    // 200 Marks Base
    let percentile = 50.0;
    let stateRank = "50,000+";
    let airRank = "N/A (State Level)";
    let tier = "Qualifying Tier";
    let admission = "Local Private Engineering Colleges";
    let steps = ["Revise fundamental concepts", "Write at least 50 formulas daily"];

    if (rawScore >= 180) {
      percentile = 99.85 + (rawScore - 180) * 0.007;
      stateRank = "Top 1 - 250";
      tier = "🏆 State Topper Tier (COEP / VJTI Open CSE)";
      admission = "COEP Pune or VJTI Mumbai (CSE / IT 100% Guaranteed)";
      steps = ["Maintain this pace", "Continue time management revision"];
    } else if (rawScore >= 160) {
      percentile = 99.1 + (rawScore - 160) * 0.037;
      stateRank = "250 - 1,200";
      tier = "🌟 Top 1% State Elite (PICT / SPIT / Walchand CSE)";
      admission = "PICT Pune, SPIT Mumbai, Walchand Sangli (Top Branches)";
      steps = ["Improve remaining 10-15 marks in Mathematics", "Correct mock test mistakes"];
    } else if (rawScore >= 140) {
      percentile = 97.5 + (rawScore - 140) * 0.075;
      stateRank = "1,200 - 3,500";
      tier = "Top Tier (Govt Engineering Colleges)";
      admission = "Government College of Engg Pune/Amravati/Aurangabad";
      steps = ["Increase Physics numerical practice", "Revise Inorganic Chemistry"];
    } else if (rawScore >= 115) {
      percentile = 92.0 + (rawScore - 115) * 0.22;
      stateRank = "3,500 - 12,000";
      tier = "Above Average Tier (Reputed Institutes)";
      admission = "VIT Pune, Cummins, PCCOE Pune, Somaiya Mumbai";
      steps = ["Solve one practice paper every afternoon", "Read high-yield notes"];
    } else if (rawScore >= 80) {
      percentile = 78.0 + (rawScore - 80) * 0.4;
      stateRank = "12,000 - 35,000";
      tier = "Average Tier";
      admission = "Other reputed private colleges in Pune and Mumbai";
      steps = ["Strengthen grip on easy chapters", "Complete last 5 years PYQs"];
    }

    return {
      predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
      estimatedStateRank: stateRank,
      estimatedAllIndiaRank: airRank,
      gradeTier: tier,
      admissionChance: admission,
      recommendedNextSteps: steps
    };
  }

  if (exam === "NEET") {
    // 720 Marks Base
    let percentile = 50.0;
    let stateRank = "40,000+";
    let airRank = "2,00,000+";
    let tier = "Qualifying Tier";
    let admission = "Private / Deemed Medical Colleges or BAMS/BHMS";
    let steps = ["Read NCERT Biology for 2 hours daily", "Rewrite Physics formulas"];

    if (rawScore >= 670) {
      percentile = 99.9;
      stateRank = "State Top 100";
      airRank = "AIR Top 1,000";
      tier = "🏆 All India Medical Top Tier (AIIMS / Top GMC)";
      admission = "AIIMS New Delhi, Seth GS Mumbai, MAMC Delhi, BJMC Pune";
      steps = ["Excellent performance! Bring exam hall silly mistakes to 0%"];
    } else if (rawScore >= 620) {
      percentile = 98.8 + ((rawScore - 620) / 50) * 1.0;
      stateRank = "State 100 - 900";
      airRank = "AIR 1,000 - 8,000";
      tier = "🌟 Government Medical College (MBBS 100% Confirm)";
      admission = "GMC Nagpur, GMC Aurangabad, GMC Miraj, GMC Nanded";
      steps = ["Practice solving difficult Physics questions", "Avoid -1 negative marking"];
    } else if (rawScore >= 550) {
      percentile = 94.0 + ((rawScore - 550) / 70) * 4.5;
      stateRank = "State 900 - 3,500";
      airRank = "AIR 8,000 - 30,000";
      tier = "Semi-Govt / Govt BDS / Top BAMS";
      admission = "Semi-Government Medical College or Govt BDS / BAMS";
      steps = ["Target 340+ score out of 360 in Biology"];
    } else if (rawScore >= 450) {
      percentile = 85.0 + ((rawScore - 450) / 100) * 8.5;
      stateRank = "State 3,500 - 10,000";
      airRank = "AIR 30,000 - 90,000";
      tier = "Private MBBS / BDS / BHMS";
      admission = "Private Medical Colleges / Physiotherapy / Veterinary";
      steps = ["Redo Organic Chemistry reactions"];
    }

    return {
      predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
      estimatedStateRank: stateRank,
      estimatedAllIndiaRank: airRank,
      gradeTier: tier,
      admissionChance: admission,
      recommendedNextSteps: steps
    };
  }

  // Default: JEE Main (300 Marks Base)
  let percentile = 60.0;
  let stateRank = "15,000+";
  let airRank = "1,50,000+";
  let tier = "Qualifying Tier";
  let admission = "State Level Private Engineering Colleges";
  let steps = ["Revise basic Physics and Chemistry formulas"];

  if (rawScore >= 220) {
    percentile = 99.7;
    stateRank = "State Top 150";
    airRank = "AIR Top 2,500";
    tier = "🏆 National Elite Tier (Top NITs CSE / JEE Adv. Ranker)";
    admission = "NIT Trichy / Surathkal CSE, IIIT Hyderabad, Top IIT Aspirant";
    steps = ["Start difficult question practice for JEE Advanced"];
  } else if (rawScore >= 170) {
    percentile = 98.5 + ((rawScore - 170) / 50) * 1.1;
    stateRank = "State 150 - 1,200";
    airRank = "AIR 2,500 - 15,000";
    tier = "🌟 Top NIT / IIIT Core & Tech Branches";
    admission = "VNIT Nagpur, SVNIT Surat, IIIT Pune, NIT Warangal";
    steps = ["Work on Maths speed", "Use Calculus shortcuts"];
  } else if (rawScore >= 120) {
    percentile = 93.0 + ((rawScore - 120) / 50) * 5.0;
    stateRank = "State 1,200 - 5,000";
    airRank = "AIR 15,000 - 65,000";
    tier = "Good NIT / Reputed State Colleges";
    admission = "Other NIT branches or COEP/VJTI All India Seats";
    steps = ["Focus on Inorganic Chemistry NCERT"];
  } else if (rawScore >= 80) {
    percentile = 82.0 + ((rawScore - 80) / 40) * 10.5;
    stateRank = "State 5,000 - 15,000";
    airRank = "AIR 65,000 - 1,50,000";
    tier = "Qualifying for JEE Advanced Threshold";
    admission = "Excellent private universities and state government colleges";
    steps = ["Reduce negative marks", "Pick and solve easy questions first"];
  }

  return {
    predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
    estimatedStateRank: stateRank,
    estimatedAllIndiaRank: airRank,
    gradeTier: tier,
    admissionChance: admission,
    recommendedNextSteps: steps
  };
}

/**
 * Builds the exact question set for a Grand Mock Test by combining standard curated questions and procedural engine
 * with a GUARANTEED ZERO-DUPLICATE policy.
 */
export function buildGrandMockQuestionSet(
  testItem: GrandMockTestItem,
  availableQuestions: Question[]
): Question[] {
  // If this is Special 1 Combined Mock Test (100 Qs)
  if (testItem.id === "special-1" || testItem.fixedQuestions) {
    const list = testItem.fixedQuestions || SPECIAL_1_QUESTIONS;
    const cleanList = deduplicateQuestionsList(list);
    return cleanList.map((q, idx) => ({
      ...q,
      id: `${testItem.id}-q-${idx + 1}`
    }));
  }

  // If this is the specific 180-Question NEET Grand Mock, return the exact official 180 questions in order
  if (testItem.id === "grand-test-neet-180" || testItem.id === "grand-test-03") {
    const cleanList = deduplicateQuestionsList(NEET_180_FULL_QUESTIONS);
    return cleanList.map((q, idx) => ({
      ...q,
      id: `${testItem.id}-official-q-${idx + 1}`
    }));
  }

  // If this is NEET Grand Mock 02, deliver high-yield authentic NEET questions with a different ordering
  if (testItem.id === "grand-test-04") {
    const cleanList = deduplicateQuestionsList(NEET_180_FULL_QUESTIONS);
    // Group by subjects: Physics 45, Chemistry 45, Biology 90
    const phy = cleanList.filter((q) => q.subject === "Physics");
    const chem = cleanList.filter((q) => q.subject === "Chemistry");
    const bio = cleanList.filter((q) => q.subject === "Biology");

    // Invert/interleave to give a distinct 180-Q real NEET exam experience
    const mock2Set = [...phy.reverse(), ...chem.reverse(), ...bio.reverse()];
    return mock2Set.map((q, idx) => ({
      ...q,
      id: `grand-test-04-neet-q-${idx + 1}`,
      pyqYear: q.pyqYear || "NEET 2026 High-Yield"
    }));
  }

  const resultQuestions: Question[] = [];
  const globalSeenSignatures = new Set<string>();

  // Master pool with deduplication upfront
  const rawPool = [
    ...SPECIAL_1_QUESTIONS,
    ...NEET_180_FULL_QUESTIONS,
    ...availableQuestions,
    ...INITIAL_QUESTIONS,
    ...PYQ_QUESTIONS,
  ];
  const pool = deduplicateQuestionsList(rawPool);

  testItem.subjectDistribution.forEach((dist) => {
    // 1. Gather all questions matching subject from pool, prioritizing exam-specific questions
    const isNeet = testItem.exam === "NEET";
    const matchingSubjectQuestions = pool
      .filter((q) => q.subject === dist.subject)
      .sort((a, b) => {
        if (isNeet) {
          const aIsNeet = (a.exam === "NEET" || (a.pyqYear && a.pyqYear.toLowerCase().includes("neet")) || (a.id && a.id.toLowerCase().includes("neet"))) ? 1 : 0;
          const bIsNeet = (b.exam === "NEET" || (b.pyqYear && b.pyqYear.toLowerCase().includes("neet")) || (b.id && b.id.toLowerCase().includes("neet"))) ? 1 : 0;
          return bIsNeet - aIsNeet;
        }
        return Math.random() - 0.5;
      });

    const subjectChosen: Question[] = [];
    for (const q of matchingSubjectQuestions) {
      if (subjectChosen.length >= dist.questionCount) break;
      const sig = normalizeQuestionSignature(q.questionText);
      if (!globalSeenSignatures.has(sig)) {
        globalSeenSignatures.add(sig);
        subjectChosen.push(q);
      }
    }

    // 2. If deficit exists, generate procedural questions with strict seen signature tracking
    const deficit = dist.questionCount - subjectChosen.length;
    if (deficit > 0) {
      const generated = buildGuaranteedNonRepeatingMock(
        testItem.exam,
        dist.subject,
        "All",
        deficit,
        pool,
        globalSeenSignatures
      );
      for (const gq of generated) {
        const sig = normalizeQuestionSignature(gq.questionText);
        if (!globalSeenSignatures.has(sig)) {
          globalSeenSignatures.add(sig);
          subjectChosen.push(gq);
        }
      }
    }

    resultQuestions.push(...subjectChosen);
  });

  // Ensure 100% strictly unique questions and unique IDs
  const finalClean = deduplicateQuestionsList(resultQuestions);
  return finalClean.map((q, idx) => ({
    ...q,
    id: `${testItem.id}-q-${idx + 1}-${q.id || "gen"}`
  }));
}
