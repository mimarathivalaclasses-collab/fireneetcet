import { Question, ExamType, SubjectType, DifficultyLevel } from "../types";
import { CHAPTERS_DATA, getApplicableExamsForSubject } from "../data/chaptersData";

// Subject keywords for intelligent auto-detection
const SUBJECT_KEYWORDS: Record<SubjectType, string[]> = {
  Physics: [
    "velocity", "acceleration", "force", "torque", "momentum", "energy", "work", "power",
    "electric", "current", "voltage", "resistance", "capacitor", "magnetic", "flux", "induction",
    "optics", "refraction", "reflection", "lens", "mirror", "wavelength", "frequency", "wave",
    "thermodynamics", "entropy", "carnot", "heat", "isothermal", "adiabatic", "gravity", "mass",
    "photon", "photoelectric", "semiconductor", "diode", "transistor", "logic gate", "radian",
    "angular", "inertia", "radius of gyration", "newton", "joule", "pascal", "kelvin", "ampere"
  ],
  Chemistry: [
    "reaction", "acid", "base", "ph", "mole", "molarity", "molality", "enthalpy", "entropy",
    "orbital", "hybridization", "periodic", "ionization", "electronegativity", "polymer",
    "coordination", "ligand", "isomer", "aldehyde", "ketone", "carboxylic", "alcohol", "phenol",
    "ether", "amine", "haloalkane", "equilibrium", "rate constant", "arrhenius", "electrochemistry",
    "galvanic", "solubility", "d-block", "p-block", "f-block", "redox", "oxidation", "reduction"
  ],
  Mathematics: [
    "integral", "integration", "derivative", "differentiation", "limit", "matrix", "matrices",
    "determinant", "vector", "probability", "permutation", "combination", "parabola", "ellipse",
    "hyperbola", "circle", "straight line", "trigonometry", "sin", "cos", "tan", "quadrant",
    "complex number", "quadratic", "binomial", "sequence", "series", "progression", "ap", "gp"
  ],
  Biology: [
    "cell", "mitochondria", "dna", "rna", "chromosome", "genetics", "mendel", "allele",
    "photosynthesis", "respiration", "krebs", "glycolysis", "hormone", "enzyme", "neuron",
    "synapse", "kidney", "nephron", "heart", "cardiac", "blood", "artery", "reproduction",
    "ovary", "testis", "gamete", "embryo", "biotechnology", "pcr", "plasmid", "ecology",
    "ecosystem", "biodiversity", "species", "plant", "zoology", "botany", "xylem", "phloem"
  ],
};

// Automatic Subject Detective
export function detectSubjectFromText(text: string): SubjectType {
  const lower = text.toLowerCase();
  const scores: Record<SubjectType, number> = {
    Physics: 0,
    Chemistry: 0,
    Mathematics: 0,
    Biology: 0,
  };

  (Object.keys(SUBJECT_KEYWORDS) as SubjectType[]).forEach((subj) => {
    SUBJECT_KEYWORDS[subj].forEach((kw) => {
      if (lower.includes(kw.toLowerCase())) {
        scores[subj] += 1;
      }
    });
  });

  let bestSubject: SubjectType = "Physics";
  let maxScore = 0;
  (Object.keys(scores) as SubjectType[]).forEach((subj) => {
    if (scores[subj] > maxScore) {
      maxScore = scores[subj];
      bestSubject = subj;
    }
  });

  return bestSubject;
}

// Automatic Chapter Detective from available subject chapters
export function detectChapterFromText(text: string, subject: SubjectType): string {
  const lower = text.toLowerCase();
  const chapters = CHAPTERS_DATA.filter((c) => c.subject === subject);

  for (const ch of chapters) {
    const chKeywords = ch.name.toLowerCase().split(/[\s,&-]+/).filter((w) => w.length > 3);
    for (const kw of chKeywords) {
      if (lower.includes(kw)) {
        return ch.name;
      }
    }
  }

  return chapters[0]?.name || "General";
}

export interface ParsedQuestionDraft {
  questionText: string;
  questionTextMr?: string;
  options: [string, string, string, string];
  optionsMr?: [string, string, string, string];
  correctOption: number;
  explanation: string;
  explanationMr?: string;
  formula?: string;
  pyqYear?: string;
  detectedSubject: SubjectType;
  detectedChapter: string;
  applicableExams: ExamType[];
}

/**
 * Intelligent Parser for Plain-Text questions copied from WhatsApp / Word / PDFs.
 * Supports patterns like:
 * Q. Question here? / 1. Question here?
 * (A) Option 1
 * (B) Option 2
 * (C) Option 3
 * (D) Option 4
 * Ans: A or Option A or (A) or 1
 * Explanation: ...
 * Formula: ...
 */
export function parseRawQuestionText(
  rawText: string,
  fallbackExam: ExamType = "NEET"
): ParsedQuestionDraft | null {
  if (!rawText.trim()) return null;

  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return null;

  let questionText = "";
  let questionTextMr = "";
  const rawOptions: string[] = ["", "", "", ""];
  const rawOptionsMr: string[] = ["", "", "", ""];
  let correctOption = 0;
  let explanation = "";
  let explanationMr = "";
  let formula = "";
  let pyqYear = "";

  let currentSection: "question" | "optA" | "optB" | "optC" | "optD" | "ans" | "exp" | "formula" = "question";

  // Regex patterns
  const optARegex = /^(\(?A\)?|[aA][\.\)\:])\s*(.*)/i;
  const optBRegex = /^(\(?B\)?|[bB][\.\)\:])\s*(.*)/i;
  const optCRegex = /^(\(?C\)?|[cC][\.\)\:])\s*(.*)/i;
  const optDRegex = /^(\(?D\)?|[dD][\.\)\:])\s*(.*)/i;
  const ansRegex = /^(Ans|Answer|Correct|उत्तर|योग्य उत्तर)[\s\:\-\=]+([A-Da-d1-4])/i;
  const expRegex = /^(Exp|Explanation|Solution|स्पष्टीकरण|रीजन)[\s\:\-\=]+(.*)/i;
  const formRegex = /^(Formula|Equation|सूत्र)[\s\:\-\=]+(.*)/i;
  const pyqRegex = /(NEET|JEE|MHT-?CET|CET)\s*(\d{4})/i;

  const questionLines: string[] = [];

  for (const line of lines) {
    // Check PYQ Year
    const pyqMatch = line.match(pyqRegex);
    if (pyqMatch && !pyqYear) {
      pyqYear = `${pyqMatch[1].toUpperCase()} ${pyqMatch[2]}`;
    }

    // Check Answer
    const ansMatch = line.match(ansRegex);
    if (ansMatch) {
      currentSection = "ans";
      const char = ansMatch[2].toUpperCase();
      if (char === "A" || char === "1") correctOption = 0;
      else if (char === "B" || char === "2") correctOption = 1;
      else if (char === "C" || char === "3") correctOption = 2;
      else if (char === "D" || char === "4") correctOption = 3;
      continue;
    }

    // Check Formula
    const formMatch = line.match(formRegex);
    if (formMatch) {
      currentSection = "formula";
      formula = formMatch[2].trim();
      continue;
    }

    // Check Explanation
    const expMatch = line.match(expRegex);
    if (expMatch) {
      currentSection = "exp";
      explanation = expMatch[2].trim();
      continue;
    }

    // Check Options A, B, C, D
    const matchA = line.match(optARegex);
    if (matchA) {
      currentSection = "optA";
      rawOptions[0] = matchA[2].trim();
      continue;
    }

    const matchB = line.match(optBRegex);
    if (matchB) {
      currentSection = "optB";
      rawOptions[1] = matchB[2].trim();
      continue;
    }

    const matchC = line.match(optCRegex);
    if (matchC) {
      currentSection = "optC";
      rawOptions[2] = matchC[2].trim();
      continue;
    }

    const matchD = line.match(optDRegex);
    if (matchD) {
      currentSection = "optD";
      rawOptions[3] = matchD[2].trim();
      continue;
    }

    // Appending to current section
    if (currentSection === "question") {
      // Strip leading "Q. 1", "Q1.", "1." etc
      const cleaned = line.replace(/^(Q[\.\:\s]*\d*[\.\:\)]*|\d+[\.\)\:])\s*/i, "");
      questionLines.push(cleaned || line);
    } else if (currentSection === "optA") {
      rawOptions[0] += (rawOptions[0] ? " " : "") + line;
    } else if (currentSection === "optB") {
      rawOptions[1] += (rawOptions[1] ? " " : "") + line;
    } else if (currentSection === "optC") {
      rawOptions[2] += (rawOptions[2] ? " " : "") + line;
    } else if (currentSection === "optD") {
      rawOptions[3] += (rawOptions[3] ? " " : "") + line;
    } else if (currentSection === "exp") {
      explanation += (explanation ? " " : "") + line;
    } else if (currentSection === "formula") {
      formula += (formula ? " " : "") + line;
    }
  }

  questionText = questionLines.join(" ").trim();
  if (!questionText) {
    questionText = lines[0] || "Sample Question";
  }

  // Fallback defaults for missing options
  if (!rawOptions[0]) rawOptions[0] = "Option A";
  if (!rawOptions[1]) rawOptions[1] = "Option B";
  if (!rawOptions[2]) rawOptions[2] = "Option C";
  if (!rawOptions[3]) rawOptions[3] = "Option D";

  const fullTextContext = `${questionText} ${rawOptions.join(" ")} ${explanation}`;
  const detectedSubject = detectSubjectFromText(fullTextContext);
  const detectedChapter = detectChapterFromText(fullTextContext, detectedSubject);
  const applicableExams = getApplicableExamsForSubject(detectedSubject);

  if (!explanation) {
    explanation = `The correct answer is Option ${String.fromCharCode(65 + correctOption)}.`;
  }

  return {
    questionText,
    questionTextMr: questionTextMr || questionText,
    options: [rawOptions[0], rawOptions[1], rawOptions[2], rawOptions[3]],
    optionsMr: [
      rawOptionsMr[0] || rawOptions[0],
      rawOptionsMr[1] || rawOptions[1],
      rawOptionsMr[2] || rawOptions[2],
      rawOptionsMr[3] || rawOptions[3],
    ],
    correctOption,
    explanation,
    explanationMr: explanationMr || undefined,
    formula: formula || undefined,
    pyqYear: pyqYear || undefined,
    detectedSubject,
    detectedChapter,
    applicableExams,
  };
}

/**
 * Splits bulk raw text containing multiple questions (separated by Q1, Q2 or double blank lines or ---)
 */
export function parseBulkRawQuestions(bulkText: string): ParsedQuestionDraft[] {
  // Normalize line endings
  const clean = bulkText.replace(/\r\n/g, "\n");
  
  // Split by Question markers or dividers
  const blocks = clean.split(/(?=\n\s*(?:Q\.?\s*\d+|\d+\.|\-{3,}))/gi).filter((b) => b.trim().length > 15);

  const results: ParsedQuestionDraft[] = [];
  for (const block of blocks) {
    const parsed = parseRawQuestionText(block);
    if (parsed && parsed.questionText && parsed.options.every((o) => o.length > 0)) {
      results.push(parsed);
    }
  }

  return results;
}
