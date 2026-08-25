import * as XLSX from "xlsx";
import { Question, ExamType, SubjectType, DifficultyLevel } from "../types";

export interface ParsedQuestionResult {
  questions: Question[];
  errors: string[];
  totalParsed: number;
}

/**
 * Intelligent parser for text copied from Word / PDF or .txt files
 */
export function parseQuestionsFromRawText(
  rawText: string,
  defaultExam: ExamType = "MHT_CET",
  defaultSubject: SubjectType = "Physics",
  defaultChapter: string = "General Mock"
): ParsedQuestionResult {
  const errors: string[] = [];
  const questions: Question[] = [];

  if (!rawText || !rawText.trim()) {
    return { questions: [], errors: ["कोणताही मजकूर आढळला नाही."], totalParsed: 0 };
  }

  // Normalize newlines
  const text = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split by Question markers (e.g. Q1., Q.1, 1., 1), प्रश्न १, etc.)
  const questionBlocks = text.split(/(?=(?:Q(?:uestion|\.)?\s*\d+[.:)-]|(?:प्रश्न\s*)?\d+[.:)-]))/i);

  questionBlocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (!trimmed || trimmed.length < 15) return;

    try {
      const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length < 4) return;

      let questionText = "";
      let questionTextMr = "";
      let optA = "";
      let optB = "";
      let optC = "";
      let optD = "";
      let correctOpt = 0;
      let explanation = "";
      let explanationMr = "";

      // Extract Question line(s)
      const firstLine = lines[0].replace(/^(?:Q(?:uestion|\.)?\s*\d+[\.\:\)\-]|(?:प्रश्न\s*)?\d+[\.\:\)\-]\s*)/i, "").trim();
      questionText = firstLine;

      let lineIdx = 1;
      while (
        lineIdx < lines.length &&
        !lines[lineIdx].match(/^[\(\[]?[A-Da-d1-4अ-ड][\)\]\.\:\-]/) &&
        !lines[lineIdx].match(/^(?:ans|answer|उत्तर|solution|स्पष्टीकरण)/i)
      ) {
        questionText += " " + lines[lineIdx];
        lineIdx++;
      }

      // Check if bilingual question text
      if (questionText.includes("/") || questionText.includes("|")) {
        const parts = questionText.split(/[\/\|]/);
        questionText = parts[0].trim();
        questionTextMr = parts[1]?.trim() || parts[0].trim();
      } else {
        questionTextMr = questionText;
      }

      // Parse Options & Answer
      for (let i = lineIdx; i < lines.length; i++) {
        const line = lines[i];

        // Option A
        if (line.match(/^[\(\[]?(?:A|a|1|अ)[\)\]\.\:\-]\s*(.*)/)) {
          optA = line.replace(/^[\(\[]?(?:A|a|1|अ)[\)\]\.\:\-]\s*/, "").trim();
        }
        // Option B
        else if (line.match(/^[\(\[]?(?:B|b|2|ब)[\)\]\.\:\-]\s*(.*)/)) {
          optB = line.replace(/^[\(\[]?(?:B|b|2|ब)[\)\]\.\:\-]\s*/, "").trim();
        }
        // Option C
        else if (line.match(/^[\(\[]?(?:C|c|3|क)[\)\]\.\:\-]\s*(.*)/)) {
          optC = line.replace(/^[\(\[]?(?:C|c|3|क)[\)\]\.\:\-]\s*/, "").trim();
        }
        // Option D
        else if (line.match(/^[\(\[]?(?:D|d|4|ड)[\)\]\.\:\-]\s*(.*)/)) {
          optD = line.replace(/^[\(\[]?(?:D|d|4|ड)[\)\]\.\:\-]\s*/, "").trim();
        }
        // Answer line
        else if (line.match(/^(?:ans|answer|correct|उत्तर)[\:\=\-\s]+(.*)/i)) {
          const ansMatch = line.replace(/^(?:ans|answer|correct|उत्तर)[\:\=\-\s]*/i, "").trim().toUpperCase();
          if (ansMatch.startsWith("A") || ansMatch.startsWith("1") || ansMatch.startsWith("अ")) correctOpt = 0;
          else if (ansMatch.startsWith("B") || ansMatch.startsWith("2") || ansMatch.startsWith("ब")) correctOpt = 1;
          else if (ansMatch.startsWith("C") || ansMatch.startsWith("3") || ansMatch.startsWith("क")) correctOpt = 2;
          else if (ansMatch.startsWith("D") || ansMatch.startsWith("4") || ansMatch.startsWith("ड")) correctOpt = 3;
        }
        // Explanation line
        else if (line.match(/^(?:exp|explanation|sol|solution|स्पष्टीकरण|रीती)[\:\=\-\s]+(.*)/i)) {
          explanation = line.replace(/^(?:exp|explanation|sol|solution|स्पष्टीकरण|रीती)[\:\=\-\s]*/i, "").trim();
          explanationMr = explanation;
        }
      }

      // Fallbacks if options are empty
      if (!optA) optA = "पर्याय A";
      if (!optB) optB = "पर्याय B";
      if (!optC) optC = "पर्याय C";
      if (!optD) optD = "पर्याय D";
      if (!explanation) {
        explanation = `Correct Option: ${["A", "B", "C", "D"][correctOpt]}. Verified standard textbook solution.`;
        explanationMr = `अचूक उत्तर: ${["A", "B", "C", "D"][correctOpt]}. प्रमाणित अभ्यासक्रमानुसार योग्य स्पष्टीकरण.`;
      }

      questions.push({
        id: `custom_q_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 6)}`,
        exam: defaultExam,
        subject: defaultSubject,
        chapter: defaultChapter,
        difficulty: "Medium",
        questionText,
        questionTextMr,
        options: [optA, optB, optC, optD],
        optionsMr: [optA, optB, optC, optD],
        correctOption: correctOpt,
        explanation,
        explanationMr,
        isCustom: true,
        createdAt: Date.now(),
      });
    } catch (err: any) {
      errors.push(`प्रश्न #${index + 1} वाचण्यात त्रुटी: ${err?.message || "Format mismatch"}`);
    }
  });

  return {
    questions,
    errors,
    totalParsed: questions.length,
  };
}

/**
 * Intelligent parser for Excel (.xlsx, .xls, .csv) files
 */
export async function parseQuestionsFromExcelFile(
  file: File,
  defaultExam: ExamType = "MHT_CET",
  defaultSubject: SubjectType = "Physics"
): Promise<ParsedQuestionResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON array
        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (!rawJson || rawJson.length === 0) {
          resolve({
            questions: [],
            errors: ["एक्सेल फाईलमध्ये कोणताही डेटा सापडला नाही."],
            totalParsed: 0,
          });
          return;
        }

        const questions: Question[] = [];
        const errors: string[] = [];

        rawJson.forEach((row, idx) => {
          try {
            // Find key values with case-insensitive column matching
            const getVal = (keys: string[]): string => {
              for (const k of Object.keys(row)) {
                const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, "");
                for (const target of keys) {
                  if (cleanK === target.toLowerCase().replace(/[^a-z0-9]/g, "")) {
                    return String(row[k] || "").trim();
                  }
                }
              }
              return "";
            };

            const qText = getVal(["question", "questiontext", "qtext", "प्रश्न", "question_en"]);
            const qTextMr = getVal(["questionmr", "question_mr", "marathiquestion", "मराठीप्रश्न"]) || qText;
            const optA = getVal(["optiona", "opta", "a", "पर्यायa", "पर्यायअ", "option1"]);
            const optB = getVal(["optionb", "optb", "b", "पर्यायb", "पर्यायब", "option2"]);
            const optC = getVal(["optionc", "optc", "c", "पर्यायc", "पर्यायक", "option3"]);
            const optD = getVal(["optiond", "optd", "d", "पर्यायd", "पर्यायड", "option4"]);
            const ansRaw = getVal(["correctoption", "correctanswer", "answer", "ans", "उत्तर", "correct"]);
            const expEn = getVal(["explanation", "solution", "exp", "sol", "स्पष्टीकरण"]);
            const expMr = getVal(["explanationmr", "solutionmr", "मराठीस्पष्टीकरण"]) || expEn;
            const chapter = getVal(["chapter", "topic", "धडा", "प्रकरण"]) || "General Syllabus";
            const subjectVal = getVal(["subject", "विषय"]) || defaultSubject;
            const examVal = getVal(["exam", "examtype", "परीक्षा"]) || defaultExam;
            const difficultyVal = (getVal(["difficulty", "level"]) || "Medium") as DifficultyLevel;

            if (!qText && !qTextMr) {
              return; // Skip empty row
            }

            // Determine correct option 0, 1, 2, 3
            let correctOptionIndex = 0;
            const cleanAns = ansRaw.trim().toUpperCase();
            if (cleanAns === "A" || cleanAns === "1" || cleanAns === "OPT A" || cleanAns === "अ") correctOptionIndex = 0;
            else if (cleanAns === "B" || cleanAns === "2" || cleanAns === "OPT B" || cleanAns === "ब") correctOptionIndex = 1;
            else if (cleanAns === "C" || cleanAns === "3" || cleanAns === "OPT C" || cleanAns === "क") correctOptionIndex = 2;
            else if (cleanAns === "D" || cleanAns === "4" || cleanAns === "OPT D" || cleanAns === "ड") correctOptionIndex = 3;
            else if (cleanAns === optA.toUpperCase()) correctOptionIndex = 0;
            else if (cleanAns === optB.toUpperCase()) correctOptionIndex = 1;
            else if (cleanAns === optC.toUpperCase()) correctOptionIndex = 2;
            else if (cleanAns === optD.toUpperCase()) correctOptionIndex = 3;

            // Map valid subject
            let finalSubject: SubjectType = defaultSubject;
            if (subjectVal.toLowerCase().includes("phys")) finalSubject = "Physics";
            else if (subjectVal.toLowerCase().includes("chem")) finalSubject = "Chemistry";
            else if (subjectVal.toLowerCase().includes("math")) finalSubject = "Mathematics";
            else if (subjectVal.toLowerCase().includes("bio")) finalSubject = "Biology";

            // Map valid exam
            let finalExam: ExamType = defaultExam;
            if (examVal.toUpperCase().includes("NEET")) finalExam = "NEET";
            else if (examVal.toUpperCase().includes("JEE")) finalExam = "JEE_MAIN";
            else if (examVal.toUpperCase().includes("CET")) finalExam = "MHT_CET";

            questions.push({
              id: `excel_q_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
              exam: finalExam,
              subject: finalSubject,
              chapter,
              difficulty: difficultyVal,
              questionText: qText || qTextMr,
              questionTextMr: qTextMr || qText,
              options: [optA || "A", optB || "B", optC || "C", optD || "D"],
              optionsMr: [optA || "A", optB || "B", optC || "C", optD || "D"],
              correctOption: correctOptionIndex,
              explanation: expEn || `Option ${["A", "B", "C", "D"][correctOptionIndex]} is correct.`,
              explanationMr: expMr || `पर्याय ${["A", "B", "C", "D"][correctOptionIndex]} अचूक आहे.`,
              isCustom: true,
              createdAt: Date.now(),
            });
          } catch (rowErr: any) {
            errors.push(`ओळ #${idx + 2} वाचण्यात त्रुटी: ${rowErr?.message}`);
          }
        });

        resolve({
          questions,
          errors,
          totalParsed: questions.length,
        });
      } catch (err: any) {
        resolve({
          questions: [],
          errors: [`एक्सेल फाईल वाचण्यात त्रुटी आली: ${err?.message || "Unknown error"}`],
          totalParsed: 0,
        });
      }
    };

    reader.onerror = () => {
      resolve({
        questions: [],
        errors: ["फाईल उघडता आली नाही. कृपया फाईल तपासा."],
        totalParsed: 0,
      });
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Generates and triggers download of a standardized Excel template for Questions upload
 */
export function downloadQuestionExcelTemplate() {
  const sampleData = [
    {
      "Question": "What is the unit of electric field in SI system?",
      "Question (मराठी)": "SI पद्धतीमध्ये विद्युत क्षेत्राचे एकक काय आहे?",
      "Option A": "V/m (व्होल्ट/मीटर)",
      "Option B": "N/C (न्यूटन/कूलॉम्ब)",
      "Option C": "Both A and B (दोन्ही A आणि B)",
      "Option D": "Joule (ज्युल)",
      "Correct Answer": "C",
      "Explanation": "Electric field E = F/q (N/C) and E = -dV/dr (V/m), hence both V/m and N/C are valid units.",
      "Explanation (मराठी)": "विद्युत क्षेत्र E = F/q (N/C) आणि E = -dV/dr (V/m), त्यामुळे दोन्ही एकके अचूक आहेत.",
      "Subject": "Physics",
      "Chapter": "Electrostatics",
      "Exam": "MHT_CET",
      "Difficulty": "Easy",
    },
    {
      "Question": "Which of the following is an example of an ambidentate ligand?",
      "Question (मराठी)": "खालीलपैकी कोणते ॲम्बिडेंटेट लिगंडचे उदाहरण आहे?",
      "Option A": "CN⁻ / NC⁻ (सायनाईड)",
      "Option B": "H₂O (पाणी)",
      "Option C": "NH₃ (अमोनिया)",
      "Option D": "Cl⁻ (क्लोराईड)",
      "Correct Answer": "A",
      "Explanation": "Cyanide ligand can bind through both Carbon (C) and Nitrogen (N) donor atoms.",
      "Explanation (मराठी)": "सायनाईड लिगंड कार्बन आणि नायट्रोजन दोन्ही अणूंमार्फत कोऑर्डिनेट बॉण्ड तयार करू शकते.",
      "Subject": "Chemistry",
      "Chapter": "Coordination Compounds",
      "Exam": "MHT_CET",
      "Difficulty": "Medium",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Questions_Template");

  XLSX.writeFile(workbook, "MCQ_Question_Bank_Template.xlsx");
}

/**
 * Randomized Question Pool Engine with No-Repeat Algorithm
 * Ensures questions are uniquely selected and not repeated in consecutive tests
 */
export function getNonRepeatingRandomQuestions(
  pool: Question[],
  requestedCount: number,
  studentIdOrKey?: string
): Question[] {
  if (!pool || pool.length === 0) return [];
  if (pool.length <= requestedCount) {
    // If pool is smaller than requested, shuffle everything and return
    return shuffleArray([...pool]);
  }

  const storageKey = `mcq_attempted_qids_${studentIdOrKey || "default"}`;
  let attemptedIds: string[] = [];

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      attemptedIds = JSON.parse(raw);
    }
  } catch (e) {
    attemptedIds = [];
  }

  // Separate pool into unattempted and already attempted
  const unattempted = pool.filter((q) => !attemptedIds.includes(q.id));
  const attempted = pool.filter((q) => attemptedIds.includes(q.id));

  let selected: Question[] = [];

  if (unattempted.length >= requestedCount) {
    // We have enough fresh questions!
    selected = shuffleArray([...unattempted]).slice(0, requestedCount);
  } else {
    // Pool exhausted! Take all unattempted questions + reshuffle some attempted questions
    const shuffledAttempted = shuffleArray([...attempted]);
    const needed = requestedCount - unattempted.length;
    selected = [...unattempted, ...shuffledAttempted.slice(0, needed)];
    // Reshuffle entire final batch
    selected = shuffleArray(selected);
    // Reset attempted list to just the new selected batch
    attemptedIds = [];
  }

  // Update attempted history
  try {
    const newAttemptedIds = Array.from(new Set([...attemptedIds, ...selected.map((q) => q.id)]));
    // Keep max 500 in history
    if (newAttemptedIds.length > 500) {
      newAttemptedIds.splice(0, newAttemptedIds.length - 500);
    }
    localStorage.setItem(storageKey, JSON.stringify(newAttemptedIds));
  } catch (e) {
    // Ignore storage quota error
  }

  return selected;
}

/**
 * Fisher-Yates pure randomization shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
