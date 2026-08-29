import { GrandMockTestItem, ExamType, SubjectType, Question } from "../types";
import { INITIAL_QUESTIONS } from "./initialQuestions";
import { PYQ_QUESTIONS } from "./pyqQuestionsData";
import { buildGuaranteedNonRepeatingMock } from "../utils/proceduralQuestionEngine";
import { NEET_180_FULL_QUESTIONS, NEET_180_GRAND_TEST_ITEM } from "./neetFullMock180Questions";

export { NEET_180_FULL_QUESTIONS, NEET_180_GRAND_TEST_ITEM };

export const GRAND_MOCK_TESTS: GrandMockTestItem[] = [
  NEET_180_GRAND_TEST_ITEM,
  {
    id: "grand-test-01",
    testNumber: 1,
    title: "MHT-CET Grand Full Mock 01 (PCM Engineering)",
    titleMr: "MHT-CET मुख्य परीक्षा सराव पेपर ०१ (PCM इंजिनिअरिंग)",
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
      unattempted: 0,
    },
    syllabusCoverage: "Full 11th (20%) + 12th (80%) Physics, Chemistry, Maths",
    syllabusCoverageMr: "संपूर्ण ११ वी (२०%) + १२ वी (८०%) भौतिकशास्त्र, रसायनशास्त्र, गणित",
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
    ],
    descriptionMr: "महाराष्ट्र राज्य सीईटी सेलच्या अधिकृत पद्धतीनुसार १५० मिनिटांचा परिपूर्ण सराव. गणित प्रत्येक प्रश्न २ गुण, भौतिक व रसायन १ गुण. निगेटिव्ह मार्किंग नाही.",
    instructionsMr: [
      "सेक्शन १: Physics (५० प्रश्न - ५० गुण) आणि Chemistry (५० प्रश्न - ५० गुण) - ९० मिनिटे.",
      "सेक्शन २: Mathematics (५० प्रश्न - १०० गुण - प्रत्येक अचूक उत्तरास २ गुण) - ९० मिनिटे.",
      "कोणतीही नकारात्मक गुण पद्धती (No Negative Marking) नाही.",
      "प्रत्येक प्रश्नाला दिलेला वेळ व्यवस्थापित करा.",
    ],
  },
  {
    id: "grand-test-02",
    testNumber: 2,
    title: "MHT-CET Grand Full Mock 02 (PCB Pharmacy / Agri / Bio)",
    titleMr: "MHT-CET मुख्य परीक्षा सराव पेपर ०२ (PCB फार्मसी व कृषी)",
    exam: "MHT_CET",
    group: "PCB",
    targetPercentileGoal: "99.0+ %ile Target (Govt. Pharmacy Colleges)",
    totalMarks: 200,
    durationMinutes: 150,
    totalQuestions: 200,
    markingScheme: {
      correct: 1,
      incorrect: 0,
      unattempted: 0,
    },
    syllabusCoverage: "Complete 11th & 12th Physics, Chemistry, Biology (Botany & Zoology)",
    syllabusCoverageMr: "संपूर्ण ११ वी व १२ वी भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्र",
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
    ],
    descriptionMr: "PCB ग्रुपसाठी २०० गुणांची परिपूर्ण मुख्य परीक्षा चाचणी. जीवशास्त्राचे १०० प्रश्न आणि भौतिक+रसायनचे प्रत्येकी ५० प्रश्न.",
    instructionsMr: [
      "Physics ५० प्रश्न (५० गुण), Chemistry ५० प्रश्न (५० गुण), Biology १०० प्रश्न (१०० गुण).",
      "एकूण वेळ १५० मिनिटे. निगेटिव्ह मार्किंग नाही.",
      "जीवशास्त्रातील आकृत्या व वर्गीकरणावर आधारित प्रश्नांवर विशेष भर.",
    ],
  },
  {
    id: "grand-test-03",
    testNumber: 3,
    title: "NEET-UG All India Grand Mock 01 (MBBS / BDS Target)",
    titleMr: "NEET-UG राष्ट्रीय मुख्य परीक्षा पेपर ०१ (MBBS / AIIMS लक्ष्य)",
    exam: "NEET",
    targetPercentileGoal: "650+ Marks Target (Top Govt Medical Colleges)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "NCERT Class 11 & 12 Complete Biology (Botany + Zoology), Physics, Chemistry",
    syllabusCoverageMr: "एनसीईआरटी वर्ग ११ व १२ संपूर्ण जीवशास्त्र, भौतिकशास्त्र, रसायनशास्त्र",
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
    ],
    descriptionMr: "NTA च्या NEET-UG अधिकृत पॅटर्ननुसार २०० मिनिटे, ७२० गुण चाचणी. बरोबर उत्तरास +४ गुण, चुकीच्या उत्तरास -१ निगेटिव्ह मार्किंग.",
    instructionsMr: [
      "एकूण प्रश्न १८० (Biology ९० प्रश्न = ३६० गुण, Physics ४५ प्रश्न = १८० गुण, Chemistry ४५ प्रश्न = १८० गुण).",
      "प्रत्येक अचूक उत्तरासाठी +४ गुण मिळतील.",
      "प्रत्येक चुकीच्या उत्तरासाठी -१ गुण वजा केला जाईल (Negative Marking).",
      "वेळ: ३ तास २० मिनिटे (२०० मिनिटे).",
    ],
  },
  {
    id: "grand-test-04",
    testNumber: 4,
    title: "NEET-UG All India Grand Mock 02 (High-Yield NCERT Master)",
    titleMr: "NEET-UG राष्ट्रीय मुख्य परीक्षा पेपर ०२ (हाय-यिल्ड NCERT मास्टर)",
    exam: "NEET",
    targetPercentileGoal: "680+ Marks Target (Top 1000 AIR Rank)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "Full Syllabus High-Yield NCERT Lines & Conceptual Numericals",
    syllabusCoverageMr: "संपूर्ण अभ्यासक्रम हाय-यिल्ड NCERT संकल्पना आणि न्यूमेरिकल प्रॉब्लेम्स",
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
    ],
    descriptionMr: "कठिण आणि ट्रिकी प्रश्नांचा समावेश असलेली NEET ग्रँड टेस्ट. विद्यार्थ्यांचा राष्ट्रीय स्तरावरील संभाव्य रँक शोधण्यासाठी अत्यंत उपयुक्त.",
    instructionsMr: [
      "अचूकता (Accuracy) ९०%+ ठेवण्याचा प्रयत्न करा.",
      "अंदाजे उत्तरे (Tukka) देणे टाळा, अन्यथा -१ निगेटिव्ह गुणांमुळे रँक घसरू शकतो.",
      "जीवशास्त्रातील NCERT थेट ओळींवर आधारित प्रश्न वेगाने सोडवा.",
    ],
  },
  {
    id: "grand-test-05",
    testNumber: 5,
    title: "JEE Main All India Grand Mock 01 (NIT / IIIT / JEE Adv. Target)",
    titleMr: "JEE Main राष्ट्रीय मुख्य परीक्षा पेपर ०१ (NIT / IIIT प्रवेश लक्ष्य)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.2+ %ile Target (Top 5 NITs / IIT Advance Qualify)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "Class 11 & 12 Physics, Chemistry, Mathematics (Full Syllabus)",
    syllabusCoverageMr: "वर्ग ११ व १२ संपूर्ण भौतिकशास्त्र, रसायनशास्त्र, गणित",
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
    ],
    descriptionMr: "NTA JEE Main अधिकृत फॉरमॅटनुसार ३०० गुणांची चाचणी. प्रत्येक विषयात २५ प्रश्न (१०० गुण). +४ बरोबर, -१ चूक.",
    instructionsMr: [
      "Physics २५ प्रश्न, Chemistry २५ प्रश्न, Mathematics २५ प्रश्न.",
      "वेळ: ३ तास (१८० मिनिटे). एकूण गुण: ३००.",
      "प्रत्येक अचूक उत्तरास +४ गुण, प्रत्येक चुकीच्या उत्तरास -१ गुण.",
      "गणितातील कॅल्क्युलेशन वेगाने व काळजीपूर्वक करा.",
    ],
  },
  {
    id: "grand-test-06",
    testNumber: 6,
    title: "JEE Main All India Grand Mock 02 (Advanced Problem Solving)",
    titleMr: "JEE Main राष्ट्रीय मुख्य परीक्षा पेपर ०२ (रँक बूस्टर चॅलेंजर)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.7+ %ile Target (Under 3000 All India Rank)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "Multi-concept problems, Mechanics, Electrodynamics, Organic, Calculus",
    syllabusCoverageMr: "मल्टी-कॉन्सेप्ट प्रश्न, मेकॅनिक्स, ऑरगॅनिक रिॲक्शन मेकॅनिझम व कॅल्क्युलस",
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
    ],
    descriptionMr: "सर्वोच्च गुण मिळवून ९९.७+ पर्सेंटाईल गाठण्यासाठी खास डिझाइन केलेला काठिण्यपातळी असलेला पेपर.",
    instructionsMr: [
      "कठिण न्यूमेरिकल प्रश्नांमध्ये एकके (Units) आणि चिन्हांची खात्री करा.",
      "रसायनशास्त्रातील NCERT इनऑर्गेनिक प्रश्न सुरुवातीच्या ३० मिनिटांत पूर्ण करा.",
    ],
  },
  {
    id: "grand-test-07",
    testNumber: 7,
    title: "MHT-CET Grand Full Mock 03 (COEP / VJTI 99.8%ile Special)",
    titleMr: "MHT-CET मुख्य परीक्षा सराव पेपर ०३ (COEP / VJTI स्पेशल)",
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
      unattempted: 0,
    },
    syllabusCoverage: "High-Weightage Chapters: Rotational Dynamics, Calculus, Thermodynamics, P-Block",
    syllabusCoverageMr: "उच्च वेटेज प्रकरणे: रोटेशनल मोशन, कॅल्क्युलस, थर्मोडायनॅमिक्स, पी-ब्लॉक",
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
    ],
    descriptionMr: "महाराष्ट्रातील अव्वल इंजिनिअरिंग कॉलेजसाठी रँक निश्चित करणारी मुख्य परीक्षा.",
    instructionsMr: [
      "१५० मिनिटांत १५० प्रश्न सोडवण्याची गती राखा.",
      "गणितात १०० पैकी ९०+ गुण मिळवण्याचे उद्दिष्ट ठेवा.",
    ],
  },
  {
    id: "grand-test-08",
    testNumber: 8,
    title: "NEET-UG All India Grand Mock 03 (Full NCERT Speed & Accuracy)",
    titleMr: "NEET-UG राष्ट्रीय मुख्य परीक्षा पेपर ०३ (स्पीड व अचूकता मास्टर)",
    exam: "NEET",
    targetPercentileGoal: "670+ Marks Target (State Top 50 Merit List)",
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 180,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "Complete Biology, Physics Optics & Modern Physics, Physical & Organic Chem",
    syllabusCoverageMr: "संपूर्ण जीवशास्त्र, भौतिकशास्त्र मॉडर्न फिजिक्स, रसायनशास्त्र",
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
    ],
    descriptionMr: "प्रत्यक्ष NEET हॉलमधील वेळेचे दडपण हाताळण्यासाठी व अचूकता वाढवण्यासाठी विशेष टेस्ट.",
    instructionsMr: [
      "Biology चाचणी ४५ ते ५० मिनिटांत पूर्ण करण्याचा सराव करा.",
      "उरलेला वेळ Physics व Chemistry च्या न्यूमेरिकल्ससाठी वापरा.",
    ],
  },
  {
    id: "grand-test-09",
    testNumber: 9,
    title: "JEE Main All India Grand Mock 03 (Speed-Calculus & Organic Chemistry)",
    titleMr: "JEE Main राष्ट्रीय मुख्य परीक्षा पेपर ०३ (कॅल्क्युलस व ऑरगॅनिक बूस्टर)",
    exam: "JEE_MAIN",
    targetPercentileGoal: "99.5+ %ile Target (Top NIT CS Branches)",
    totalMarks: 300,
    durationMinutes: 180,
    totalQuestions: 75,
    markingScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
    },
    syllabusCoverage: "Full PCM Standard High-Frequency NTA Syllabus",
    syllabusCoverageMr: "संपूर्ण भौतिकशास्त्र, रसायनशास्त्र, गणित उच्च-वारंवारता NTA अभ्यासक्रम",
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
    ],
    descriptionMr: "JEE मेनच्या प्रत्यक्ष परीक्षेतील वेळेचे अचूक नियोजन शिकवणारी राष्ट्रीय दर्जाची टेस्ट.",
    instructionsMr: [
      "प्रत्येक विषयात किमान १५+ प्रश्न अचूक सोडवण्याचे लक्ष्य ठेवा.",
      "निगेटिव्ह गुण टाळण्यासाठी संशयास्पद प्रश्न सोडून द्या.",
    ],
  },
  {
    id: "grand-test-10",
    testNumber: 10,
    title: "MHT-CET / NEET / JEE Super Finale Grand Mock 10 (All-Rounder)",
    titleMr: "महाराष्ट्र महा-अंतिम मुख्य परीक्षा सराव पेपर १० (ऑल-राऊंडर ग्रँड फिनाले)",
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
      unattempted: 0,
    },
    syllabusCoverage: "Comprehensive 100% Syllabus All Subjects Grand Master Test",
    syllabusCoverageMr: "१००% संपूर्ण अभ्यासक्रम सर्व विषय महा-सराव अंतिम परीक्षा",
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
    ],
    descriptionMr: "परीक्षेपूर्वी आत्मविश्वासाची अंतिम चाचणी घेण्यासाठी तयार केलेला परिपूर्ण महा-सराव पेपर.",
    instructionsMr: [
      "ही अंतिम सराव चाचणी शांतचित्ताने द्या.",
      "निकालानंतर मिळालेला पर्सेंटाईल व रँक तपासा आणि चुका रिव्हाईज करा.",
    ],
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
      titleMr: `MHT-CET PCM मुख्य परीक्षा सराव पेपर ${i} (${year} अधिकृत शिफ्ट ${shiftNum})`,
      exam: "MHT_CET",
      group: "PCM",
      targetPercentileGoal: `${(98.0 + (i % 20) * 0.09).toFixed(1)}+ %ile Target`,
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 150,
      markingScheme: { correct: 1, mathsCorrect: 2, incorrect: 0, unattempted: 0 },
      syllabusCoverage: `Complete Class 11th & 12th PCM Shift ${shiftNum} Standard Syllabus`,
      syllabusCoverageMr: `संपूर्ण ११वी व १२वी भौतिकशास्त्र, रसायनशास्त्र, गणित शिफ्ट ${shiftNum} पॅटर्न`,
      difficulty: i % 3 === 0 ? "High Rank Challenger" : i % 2 === 0 ? "Moderate to Hard" : "Real Exam Exact",
      subjectsIncluded: ["Physics", "Chemistry", "Mathematics"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Mathematics", questionCount: 50, marks: 100 },
      ],
      predictedCollegeTargets: ["COEP Pune", "VJTI Mumbai", "PICT Pune", "SPIT Mumbai", "Walchand Sangli"],
      descriptionMr: `महाराष्ट्र सीईटी सेलच्या अधिकृत परीक्षेसारखी १५० मिनिटांची शिफ्ट-वाईज चाचणी.`,
      instructionsMr: [
        "Physics ५० गुण, Chemistry ५० गुण, Mathematics १०० गुण.",
        "निगेटिव्ह मार्किंग नाही. संपूर्ण १५० प्रश्न सोडवा.",
      ],
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
      titleMr: `MHT-CET PCB मुख्य परीक्षा सराव पेपर ${i} (${year} फार्मसी व कृषी शिफ्ट ${shiftNum})`,
      exam: "MHT_CET",
      group: "PCB",
      targetPercentileGoal: `${(98.2 + (i % 15) * 0.1).toFixed(1)}+ %ile Target`,
      totalMarks: 200,
      durationMinutes: 150,
      totalQuestions: 200,
      markingScheme: { correct: 1, incorrect: 0, unattempted: 0 },
      syllabusCoverage: `Complete Biology (100 Qs), Physics (50 Qs), Chemistry (50 Qs)`,
      syllabusCoverageMr: `संपूर्ण जीवशास्त्र (१०० प्रश्न), भौतिकशास्त्र (५० प्रश्न), रसायनशास्त्र (५० प्रश्न)`,
      difficulty: i % 2 === 0 ? "Real Exam Exact" : "Moderate to Hard",
      subjectsIncluded: ["Physics", "Chemistry", "Biology"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 50, marks: 50 },
        { subject: "Chemistry", questionCount: 50, marks: 50 },
        { subject: "Biology", questionCount: 100, marks: 100 },
      ],
      predictedCollegeTargets: ["ICT Mumbai", "Govt Pharmacy College Karad", "Bombay College of Pharmacy", "MPKV Rahuri"],
      descriptionMr: `PCB ग्रुपसाठी फार्मसी व ॲग्री प्रवेशासाठी २०० गुणांची मुख्य सराव परीक्षा.`,
      instructionsMr: [
        "वेळ: १५० मिनिटे. निगेटिव्ह मार्किंग नाही.",
        "Biology १०० गुणांसाठी १०० प्रश्न वेगाने सोडवा.",
      ],
    });
  }

  // 3. NEET All India Grand Mocks 76 to 95 (20 Tests)
  for (let i = 76; i <= 95; i++) {
    const testIdx = i - 75 + 3;
    list.push({
      id: `grand-test-neet-${i}`,
      testNumber: i,
      title: `NEET-UG All India Grand Mock Test ${testIdx} (720 Marks NTA Exact)`,
      titleMr: `NEET-UG राष्ट्रीय मुख्य सराव परीक्षा पेपर ${testIdx} (७२० गुण NTA पॅटर्न)`,
      exam: "NEET",
      targetPercentileGoal: `${620 + (i % 8) * 10}+ Marks Target (MBBS Govt College)`,
      totalMarks: 720,
      durationMinutes: 200,
      totalQuestions: 180,
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      syllabusCoverage: "NCERT Complete 11th & 12th Biology, Physics & Chemistry",
      syllabusCoverageMr: "एनसीईआरटी वर्ग ११ व १२ संपूर्ण जीवशास्त्र, भौतिकशास्त्र, रसायनशास्त्र",
      difficulty: i % 3 === 0 ? "High Rank Challenger" : "Real Exam Exact",
      subjectsIncluded: ["Biology", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Biology", questionCount: 90, marks: 360 },
        { subject: "Physics", questionCount: 45, marks: 180 },
        { subject: "Chemistry", questionCount: 45, marks: 180 },
      ],
      predictedCollegeTargets: ["AIIMS New Delhi / Nagpur", "KEM Hospital Mumbai", "BJ Medical Pune", "GMC Aurangabad"],
      descriptionMr: `७२० गुणांची NTA राष्ट्रीय परीक्षा पॅटर्न टेस्ट. +४ बरोबर, -१ निगेटिव्ह मार्किंग.`,
      instructionsMr: [
        "वेळ: ३ तास २० मिनिटे (२०० मिनिटे).",
        "+४ अचूक उत्तरास, -१ चुकीच्या उत्तरास.",
      ],
    });
  }

  // 4. JEE Main Full Papers 96 to 110 (15 Tests)
  for (let i = 96; i <= 110; i++) {
    const testIdx = i - 95 + 3;
    list.push({
      id: `grand-test-jee-${i}`,
      testNumber: i,
      title: `JEE Main All India Grand Mock Paper ${testIdx} (NTA 300 Marks Session)`,
      titleMr: `JEE Main राष्ट्रीय मुख्य परीक्षा सराव पेपर ${testIdx} (३०० गुण NTA पॅटर्न)`,
      exam: "JEE_MAIN",
      targetPercentileGoal: `${(99.0 + (i % 10) * 0.08).toFixed(2)}+ %ile (Top NITs CSE)`,
      totalMarks: 300,
      durationMinutes: 180,
      totalQuestions: 75,
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      syllabusCoverage: "NTA Prescribed Physics, Chemistry & Mathematics Complete Syllabus",
      syllabusCoverageMr: "वर्ग ११ व १२ संपूर्ण भौतिकशास्त्र, रसायनशास्त्र, गणित",
      difficulty: "Real Exam Exact",
      subjectsIncluded: ["Mathematics", "Physics", "Chemistry"],
      subjectDistribution: [
        { subject: "Physics", questionCount: 25, marks: 100 },
        { subject: "Chemistry", questionCount: 25, marks: 100 },
        { subject: "Mathematics", questionCount: 25, marks: 100 },
      ],
      predictedCollegeTargets: ["NIT Trichy", "VNIT Nagpur", "IIIT Pune", "SVNIT Surat"],
      descriptionMr: `NTA JEE Main अधिकृत फॉरमॅटनुसार ३०० गुणांची चाचणी.`,
      instructionsMr: [
        "Physics २५ प्रश्न, Chemistry २५ प्रश्न, Mathematics २५ प्रश्न.",
        "+४ बरोबर, -१ चूक.",
      ],
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
    let tier = "पात्रता स्तर (Qualifying)";
    let admission = "स्थानिक खाजगी अभियांत्रिकी महाविद्यालये";
    let steps = ["मूलभूत संकल्पनांची उजळणी करा", "कमीत कमी ५० सूत्रे रोज लिहा"];

    if (rawScore >= 180) {
      percentile = 99.85 + (rawScore - 180) * 0.007;
      stateRank = "Top 1 - 250";
      tier = "🏆 State Topper Tier (COEP / VJTI Open CSE)";
      admission = "COEP Pune किंवा VJTI Mumbai (CSE / IT 100% खात्रीशीर)";
      steps = ["हीच गती कायम ठेवा", "टाईम मॅनेजमेंट रिव्हिजन चालू ठेवा"];
    } else if (rawScore >= 160) {
      percentile = 99.1 + (rawScore - 160) * 0.037;
      stateRank = "250 - 1,200";
      tier = "🌟 Top 1% State Elite (PICT / SPIT / Walchand CSE)";
      admission = "PICT Pune, SPIT Mumbai, Walchand Sangli (Top Branches)";
      steps = ["गणितातील शिल्लक १०-१५ गुणांची सुधारणा करा", "मॉक टेस्ट चुका दुरुस्त करा"];
    } else if (rawScore >= 140) {
      percentile = 97.5 + (rawScore - 140) * 0.075;
      stateRank = "1,200 - 3,500";
      tier = "Top Tier (Govt Engineering Colleges)";
      admission = "Government College of Engg Pune/Amravati/Aurangabad";
      steps = ["भौतिकशास्त्रातील न्यूमेरिकल सराव वाढवा", "केमिस्ट्रीचे इनऑर्गेनिक रिव्हिजन करा"];
    } else if (rawScore >= 115) {
      percentile = 92.0 + (rawScore - 115) * 0.22;
      stateRank = "3,500 - 12,000";
      tier = "Above Average Tier (Reputed Institutes)";
      admission = "VIT Pune, Cummins, PCCOE Pune, Somaiya Mumbai";
      steps = ["दुपारी रोज एक सराव पेपर सोडवा", "हाय-यिल्ड नोट्स वाचा"];
    } else if (rawScore >= 80) {
      percentile = 78.0 + (rawScore - 80) * 0.4;
      stateRank = "12,000 - 35,000";
      tier = "Average Tier";
      admission = "पुणे व मुंबईतील इतर नामांकित खाजगी महाविद्यालये";
      steps = ["सोप्या चॅप्टर्सवर पकड घट्ट करा", "मागील ५ वर्षांचे PYQ पूर्ण करा"];
    }

    return {
      predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
      estimatedStateRank: stateRank,
      estimatedAllIndiaRank: airRank,
      gradeTier: tier,
      admissionChance: admission,
      recommendedNextSteps: steps,
    };
  }

  if (exam === "NEET") {
    // 720 Marks Base
    let percentile = 50.0;
    let stateRank = "40,000+";
    let airRank = "2,00,000+";
    let tier = "Qualifying Tier";
    let admission = "खाजगी / डीम्ड वैद्यकीय महाविद्यालये किंवा BAMS/BHMS";
    let steps = ["NCERT बायोलॉजी दररोज २ तास वाचा", "फिजिक्स फॉर्म्युले पुन्हा लिहा"];

    if (rawScore >= 670) {
      percentile = 99.9;
      stateRank = "State Top 100";
      airRank = "AIR Top 1,000";
      tier = "🏆 All India Medical Top Tier (AIIMS / Top GMC)";
      admission = "AIIMS New Delhi, Seth GS Mumbai, MAMC Delhi, BJMC Pune";
      steps = ["उत्कृष्ट कामगिरी! परीक्षा हॉलमधील सिली मिस्टेक ०% वर आणा"];
    } else if (rawScore >= 620) {
      percentile = 98.8 + ((rawScore - 620) / 50) * 1.0;
      stateRank = "State 100 - 900";
      airRank = "AIR 1,000 - 8,000";
      tier = "🌟 Government Medical College (MBBS 100% Confirm)";
      admission = "GMC Nagpur, GMC Aurangabad, GMC Miraj, GMC Nanded";
      steps = ["फिजिक्सचे कठीण प्रश्न सोडवण्याचा सराव करा", "निगेटिव्ह मार्किंग -१ टाळा"];
    } else if (rawScore >= 550) {
      percentile = 94.0 + ((rawScore - 550) / 70) * 4.5;
      stateRank = "State 900 - 3,500";
      airRank = "AIR 8,000 - 30,000";
      tier = "Semi-Govt / Govt BDS / Top BAMS";
      admission = "Semi-Government Medical College किंवा शासकीय BDS / BAMS";
      steps = ["बायोलॉजीमध्ये ३६० पैकी ३४०+ स्कोअर करण्याचे लक्ष्य ठेवा"];
    } else if (rawScore >= 450) {
      percentile = 85.0 + ((rawScore - 450) / 100) * 8.5;
      stateRank = "State 3,500 - 10,000";
      airRank = "AIR 30,000 - 90,000";
      tier = "Private MBBS / BDS / BHMS";
      admission = "खाजगी वैद्यकीय महाविद्यालये / फिजिओथेरपी / पशुवैद्यकीय";
      steps = ["केमिस्ट्रीच्या ऑरगॅनिक रिअॅक्शन्स पुन्हा करा"];
    }

    return {
      predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
      estimatedStateRank: stateRank,
      estimatedAllIndiaRank: airRank,
      gradeTier: tier,
      admissionChance: admission,
      recommendedNextSteps: steps,
    };
  }

  // Default: JEE Main (300 Marks Base)
  let percentile = 60.0;
  let stateRank = "15,000+";
  let airRank = "1,50,000+";
  let tier = "Qualifying Tier";
  let admission = "राज्यस्तरीय खाजगी अभियांत्रिकी महाविद्यालये";
  let steps = ["बेसिक फिजिक्स आणि केमिस्ट्री फॉर्म्युले रिव्हाईज करा"];

  if (rawScore >= 220) {
    percentile = 99.7;
    stateRank = "State Top 150";
    airRank = "AIR Top 2,500";
    tier = "🏆 National Elite Tier (Top NITs CSE / JEE Adv. Ranker)";
    admission = "NIT Trichy / Surathkal CSE, IIIT Hyderabad, Top IIT Aspirant";
    steps = ["JEE Advanced चा कठीण प्रश्नसराव सुरू करा"];
  } else if (rawScore >= 170) {
    percentile = 98.5 + ((rawScore - 170) / 50) * 1.1;
    stateRank = "State 150 - 1,200";
    airRank = "AIR 2,500 - 15,000";
    tier = "🌟 Top NIT / IIIT Core & Tech Branches";
    admission = "VNIT Nagpur, SVNIT Surat, IIIT Pune, NIT Warangal";
    steps = ["मॅथ्सच्या स्पीडवर काम करा", "कॅल्क्युलस शॉर्टकट्स वापरा"];
  } else if (rawScore >= 120) {
    percentile = 93.0 + ((rawScore - 120) / 50) * 5.0;
    stateRank = "State 1,200 - 5,000";
    airRank = "AIR 15,000 - 65,000";
    tier = "Good NIT / Reputed State Colleges";
    admission = "NITs इतर शाखा किंवा COEP/VJTI ऑल इंडिया सीट्स";
    steps = ["केमिस्ट्रीच्या इनऑर्गेनिक NCERT वर भर द्या"];
  } else if (rawScore >= 80) {
    percentile = 82.0 + ((rawScore - 80) / 40) * 10.5;
    stateRank = "State 5,000 - 15,000";
    airRank = "AIR 65,000 - 1,50,000";
    tier = "Qualifying for JEE Advanced Threshold";
    admission = "उत्कृष्ट खाजगी विद्यापीठे व राज्य शासकीय महाविद्यालये";
    steps = ["निगेटिव्ह गुण कमी करा", "सोपे प्रश्न आधी निवडून सोडवा"];
  }

  return {
    predictedPercentile: Number(Math.min(99.99, percentile).toFixed(2)),
    estimatedStateRank: stateRank,
    estimatedAllIndiaRank: airRank,
    gradeTier: tier,
    admissionChance: admission,
    recommendedNextSteps: steps,
  };
}

/**
 * Builds the exact question set for a Grand Mock Test by combining standard curated questions and procedural engine
 */
export function buildGrandMockQuestionSet(
  testItem: GrandMockTestItem,
  availableQuestions: Question[]
): Question[] {
  // If this is the specific 180-Question NEET Grand Mock, return the exact official 180 questions in order
  if (testItem.id === "grand-test-neet-180" || testItem.id === "grand-test-03") {
    return NEET_180_FULL_QUESTIONS.map((q, idx) => ({
      ...q,
      id: `${testItem.id}-official-q-${idx + 1}`,
    }));
  }

  const resultQuestions: Question[] = [];
  const pool = [...NEET_180_FULL_QUESTIONS, ...availableQuestions, ...INITIAL_QUESTIONS, ...PYQ_QUESTIONS];

  testItem.subjectDistribution.forEach((dist) => {
    // 1. Gather all questions matching exam and subject
    const matching = pool.filter(
      (q) => (q.exam === testItem.exam || testItem.exam === "MHT_CET") && q.subject === dist.subject
    );

    // 2. Fallback matching if not enough
    const anySubMatching = pool.filter((q) => q.subject === dist.subject);
    const combined = matching.length >= dist.questionCount ? matching : anySubMatching;

    // 3. Shuffle
    const shuffled = [...combined].sort(() => Math.random() - 0.5);

    // 4. If we still need more to reach exact count, procedural generate
    if (shuffled.length < dist.questionCount) {
      const generated = buildGuaranteedNonRepeatingMock(
        testItem.exam,
        dist.subject,
        "All",
        dist.questionCount - shuffled.length,
        pool
      );
      resultQuestions.push(...shuffled, ...generated);
    } else {
      resultQuestions.push(...shuffled.slice(0, dist.questionCount));
    }
  });

  // Ensure unique IDs
  return resultQuestions.map((q, idx) => ({
    ...q,
    id: `${testItem.id}-q-${idx + 1}-${q.id || "gen"}`,
  }));
}
