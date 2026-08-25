import { GrandMockTestItem, ExamType, SubjectType } from "../types";
import { GRAND_MOCK_TESTS } from "./grandMockTestsData";

const STORAGE_KEY = "mcq_app_grand_mock_tests_config_v1";

/**
 * Generates 110+ Structured Main Exam Simulations (JSON-friendly config)
 */
export function generateDefaultExamSimulations(): GrandMockTestItem[] {
  // Start with hand-crafted top tests from GRAND_MOCK_TESTS
  const list: GrandMockTestItem[] = [...GRAND_MOCK_TESTS];
  const existingCount = list.length;

  if (existingCount >= 100) {
    return list;
  }

  // 1. MHT-CET PCM Engineering Simulations (Tests up to 40)
  for (let i = existingCount + 1; i <= 40; i++) {
    const isSpecial = i % 5 === 0;
    const target = isSpecial ? "99.8+ %ile (COEP/VJTI Tech)" : `${98.0 + (i % 15) * 0.1}%ile Target`;
    list.push({
      id: `grand-test-pcm-${i}`,
      testNumber: i,
      title: `MHT-CET Grand Full Mock ${i.toString().padStart(2, "0")} (PCM Engineering)`,
      titleMr: `MHT-CET मुख्य परीक्षा सराव चाचणी ${i.toString().padStart(2, "0")} (PCM इंजिनिअरिंग)`,
      exam: "MHT_CET",
      group: "PCM",
      targetPercentileGoal: target,
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 150,
      markingScheme: {
        correct: 1,
        mathsCorrect: 2,
        incorrect: 0,
        unattempted: 0,
      },
      syllabusCoverage: `Complete Class 11th (20%) + Class 12th (80%) PCM Standard Set ${i}`,
      syllabusCoverageMr: `संपूर्ण ११ वी (२०%) व १२ वी (८०%) भौतिकशास्त्र, रसायनशास्त्र आणि गणित - सराव संच ${i}`,
      difficulty: isSpecial ? "High Rank Challenger" : i % 2 === 0 ? "Moderate to Hard" : "Real Exam Exact",
      subjectsIncluded: ["Physics", "Chemistry", "Mathematics"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Mathematics", questionCount: 50, marks: 100 },
      ],
      predictedCollegeTargets: [
        "COEP Pune (Computer Science / AI)",
        "VJTI Mumbai (Information Tech)",
        "PICT Pune (Computer Engg)",
        "SPIT Mumbai / Walchand Sangli",
      ],
      descriptionMr: `महाराष्ट्र CET सेलच्या ताज्या पॅटर्नवर आधारित २०० गुणांची संपूर्ण मॉक टेस्ट ${i}. वेळेचे नियोजन आणि अचूकतेचा सराव करा.`,
      instructionsMr: [
        "Physics ५० गुण (५० प्रश्न) + Chemistry ५० गुण (५० प्रश्न) - ९० मिनिटे.",
        "Mathematics १०० गुण (५० प्रश्न - प्रत्येक अचूक उत्तरास २ गुण) - ९० मिनिटे.",
        "निगेटिव्ह मार्किंग नाही.",
      ],
    });
  }

  // 2. MHT-CET PCB Pharmacy / Agri Simulations (Tests 41 to 70)
  for (let i = 41; i <= 70; i++) {
    const isSpecial = i % 5 === 0;
    list.push({
      id: `grand-test-pcb-${i}`,
      testNumber: i,
      title: `MHT-CET Grand Full Mock ${i.toString().padStart(2, "0")} (PCB Pharmacy / Agri)`,
      titleMr: `MHT-CET मुख्य परीक्षा सराव चाचणी ${i.toString().padStart(2, "0")} (PCB फार्मसी व ॲग्री)`,
      exam: "MHT_CET",
      group: "PCB",
      targetPercentileGoal: "99.0+ %ile Target (Top Pharmacy Colleges)",
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 200,
      markingScheme: {
        correct: 1,
        incorrect: 0,
        unattempted: 0,
      },
      syllabusCoverage: `Complete Class 11th & 12th Physics, Chemistry, Biology Set ${i}`,
      syllabusCoverageMr: `वर्ग ११ व १२ संपूर्ण भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्र संच ${i}`,
      difficulty: isSpecial ? "High Rank Challenger" : "Real Exam Exact",
      subjectsIncluded: ["Physics", "Chemistry", "Biology"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Biology", questionCount: 100, marks: 100 },
      ],
      predictedCollegeTargets: [
        "ICT Mumbai (Pharma)",
        "Govt College of Pharmacy, Karad/Amravati",
        "Bombay College of Pharmacy",
        "MPKV Rahuri (B.Sc Agri)",
      ],
      descriptionMr: `PCB ग्रुपसाठी २०० गुणांची परिपूर्ण सराव चाचणी ${i}. जीवशास्त्रातील आकृत्या व हाय-यिल्ड संकल्पनांवर भर.`,
      instructionsMr: [
        "Physics ५० प्रश्न (५० गुण), Chemistry ५० प्रश्न (५० गुण), Biology १०० प्रश्न (१०० गुण).",
        "वेळ: १५० मिनिटे. निगेटिव्ह मार्किंग नाही.",
      ],
    });
  }

  // 3. NEET-UG All India 720-Marks Medical Simulations (Tests 71 to 90)
  for (let i = 71; i <= 90; i++) {
    const isSpecial = i % 4 === 0;
    list.push({
      id: `grand-test-neet-${i}`,
      testNumber: i,
      title: `NEET-UG All India Grand Mock ${i.toString().padStart(2, "0")} (720 Marks Full CBT)`,
      titleMr: `NEET-UG राष्ट्रीय मुख्य परीक्षा पेपर ${i.toString().padStart(2, "0")} (७२० गुण ऑल इंडिया)`,
      exam: "NEET",
      targetPercentileGoal: "650+ Marks Target (Govt. Medical College)",
      totalMarks: 720,
      durationMinutes: 200,
      totalQuestions: 180,
      markingScheme: {
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      },
      syllabusCoverage: `NCERT Class 11 & 12 Complete Biology (90Q), Physics (45Q), Chemistry (45Q) Set ${i}`,
      syllabusCoverageMr: `एनसीईआरटी वर्ग ११ व १२ संपूर्ण अभ्यासक्रम - सेट ${i}`,
      difficulty: isSpecial ? "High Rank Challenger" : i % 2 === 0 ? "Moderate to Hard" : "Real Exam Exact",
      subjectsIncluded: ["Biology", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Biology", questionCount: 90, marks: 360 },
        { subject: "Physics", questionCount: 45, marks: 180 },
        { subject: "Chemistry", questionCount: 45, marks: 180 },
      ],
      predictedCollegeTargets: [
        "AIIMS New Delhi / Nagpur",
        "Seth GS Medical College (KEM), Mumbai",
        "BJ Medical College, Pune",
        "GMC Nagpur / GMC Miraj / GMC Aurangabad",
      ],
      descriptionMr: `NTA NEET-UG अधिकृत पॅटर्ननुसार ७२० गुणांची २०० मिनिटांची टेस्ट ${i}. +४ बरोबर आणि -१ निगेटिव्ह मार्किंग.`,
      instructionsMr: [
        "एकूण प्रश्न १८० (Biology ९० = ३६० गुण, Physics ४५ = १८० गुण, Chemistry ४५ = १८० गुण).",
        "बरोबर उत्तरास +४ गुण, चुकीच्या उत्तरास -१ गुण वजा.",
        "वेळ: २०० मिनिटे (३ तास २० मिनिटे).",
      ],
    });
  }

  // 4. JEE Main All India 300-Marks Engineering Simulations (Tests 91 to 110)
  for (let i = 91; i <= 110; i++) {
    const isSpecial = i % 4 === 0;
    list.push({
      id: `grand-test-jee-${i}`,
      testNumber: i,
      title: `JEE Main All India Grand Mock ${i.toString().padStart(2, "0")} (300 Marks Full CBT)`,
      titleMr: `JEE Main राष्ट्रीय मुख्य परीक्षा पेपर ${i.toString().padStart(2, "0")} (३०० गुण ऑल इंडिया)`,
      exam: "JEE_MAIN",
      targetPercentileGoal: "99.4+ %ile Target (Top 5 NITs / IIITs)",
      totalMarks: 300,
      durationMinutes: 180,
      totalQuestions: 75,
      markingScheme: {
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      },
      syllabusCoverage: `Class 11 & 12 Physics (25Q), Chemistry (25Q), Mathematics (25Q) Full Set ${i}`,
      syllabusCoverageMr: `वर्ग ११ व १२ भौतिकशास्त्र (२५), रसायनशास्त्र (२५) आणि गणित (२५) - संच ${i}`,
      difficulty: isSpecial ? "High Rank Challenger" : i % 2 === 0 ? "Moderate to Hard" : "Real Exam Exact",
      subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 25, marks: 100 },
        { subject: "Chemistry", questionCount: 25, marks: 100 },
        { subject: "Mathematics", questionCount: 25, marks: 100 },
      ],
      predictedCollegeTargets: [
        "NIT Trichy / Surathkal / Warangal (CSE)",
        "VNIT Nagpur (Tech & Core Branches)",
        "IIIT Hyderabad / IIIT Pune",
        "JEE Advanced 2025/2026 Qualification",
      ],
      descriptionMr: `NTA JEE Main पॅटर्ननुसार ३०० गुणांची १८० मिनिटांची टेस्ट ${i}. अचूकता आणि वेळेचे गणित सांभाळा.`,
      instructionsMr: [
        "Physics २५ प्रश्न (१०० गुण), Chemistry २५ प्रश्न (१०० गुण), Mathematics २५ प्रश्न (१०० गुण).",
        "बरोबर उत्तरास +४ गुण, चुकीच्या उत्तरास -१ निगेटिव्ह मार्किंग.",
        "वेळ: १८० मिनिटे (३ तास).",
      ],
    });
  }

  return list;
}

/**
 * Get all Grand Mock Tests with localStorage fallback & sync
 */
export function getAllGrandMockTests(): GrandMockTestItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 20) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading stored mock tests", e);
  }

  const defaults = generateDefaultExamSimulations();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  } catch (e) {
    console.error("Error storing default mock tests", e);
  }
  return defaults;
}

/**
 * Save updated Grand Mock Tests list
 */
export function saveGrandMockTests(tests: GrandMockTestItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
  } catch (e) {
    console.error("Error saving mock tests", e);
  }
}

/**
 * Add or update single exam simulation
 */
export function upsertGrandMockTest(test: GrandMockTestItem): GrandMockTestItem[] {
  const current = getAllGrandMockTests();
  const existingIdx = current.findIndex((t) => t.id === test.id);
  let updated: GrandMockTestItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = test;
  } else {
    updated = [test, ...current];
  }
  saveGrandMockTests(updated);
  return updated;
}

/**
 * Delete a mock test by ID
 */
export function deleteGrandMockTest(id: string): GrandMockTestItem[] {
  const current = getAllGrandMockTests();
  const filtered = current.filter((t) => t.id !== id);
  saveGrandMockTests(filtered);
  return filtered;
}

/**
 * Reset mock tests to factory defaults (110+ full mocks)
 */
export function resetGrandMockTestsToDefault(): GrandMockTestItem[] {
  const defaults = generateDefaultExamSimulations();
  saveGrandMockTests(defaults);
  return defaults;
}
