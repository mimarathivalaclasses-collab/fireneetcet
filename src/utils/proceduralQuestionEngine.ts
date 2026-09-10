import { ExamType, SubjectType, DifficultyLevel, Question } from "../types";

/**
 * Procedural Question Generation & Deduplication Engine
 * Generates mathematically sound, scientifically accurate, randomized questions
 * across ALL topics in Physics, Chemistry, Mathematics, and Biology with bilingual support (Marathi & English).
 * 
 * STRICT ZERO-DUPLICATE GUARANTEE:
 * 1. Unicode-safe normalized signature hashing (preserves Devanagari/Marathi and English text)
 * 2. Multi-tier pool selection (Exact chapter -> Subject-wide -> Dynamic Procedural)
 * 3. Dynamic mathematical and conceptual parameterization with vast random space
 */

export interface GeneratorTemplate {
  subject: SubjectType;
  chapter: string;
  topic: string;
  difficulty: DifficultyLevel;
  generate: (index: number, exam: ExamType) => RawQuestionData;
}

export interface RawQuestionData {
  idPrefix: string;
  chapter: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionText: string;
  questionTextMr?: string;
  correctAnswer: string;
  correctAnswerMr?: string;
  wrongAnswers: [string, string, string];
  wrongAnswersMr?: [string, string, string];
  formula?: string;
  explanation: string;
  explanationMr?: string;
  pyqYear?: string;
}

// Helper: Unicode-safe Normalize question text for strict duplicate detection
export function normalizeQuestionSignature(text: string, textMr?: string): string {
  const combined = `${text || ""} ${textMr || ""}`.toLowerCase();
  // Strip whitespace, punctuation, math operators, special symbols, but KEEP unicode letters (\p{L}) and numbers (\p{N})
  const cleaned = combined.replace(/[^\p{L}\p{N}]/gu, "");
  if (cleaned.length >= 10) {
    return cleaned.slice(0, 350);
  }
  // Fallback if cleaned is very short
  return combined.trim().replace(/\s+/g, " ").slice(0, 350);
}

export function getQuestionSignature(q: Question): string {
  return normalizeQuestionSignature(q.questionText, q.questionTextMr);
}

// Random helpers
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles options so correct option is randomly placed at index 0, 1, 2, or 3
 */
function buildFinalQuestion(
  raw: RawQuestionData,
  index: number,
  exam: ExamType,
  subject: SubjectType
): Question {
  const correctEn = raw.correctAnswer;
  const correctMr = raw.correctAnswerMr || raw.correctAnswer;

  const rawOptionsEn = [correctEn, ...raw.wrongAnswers];
  const rawOptionsMr = raw.wrongAnswersMr
    ? [correctMr, ...raw.wrongAnswersMr]
    : [correctMr, ...raw.wrongAnswers];

  // Random permutation 0..3
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const shuffledOptionsEn = indices.map((idx) => rawOptionsEn[idx]) as [string, string, string, string];
  const shuffledOptionsMr = indices.map((idx) => rawOptionsMr[idx]) as [string, string, string, string];
  const correctOptionIndex = indices.indexOf(0);

  return {
    id: `${raw.idPrefix}_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`,
    exam,
    subject,
    chapter: raw.chapter,
    topic: raw.topic,
    difficulty: raw.difficulty,
    questionText: raw.questionText,
    questionTextMr: raw.questionTextMr,
    options: shuffledOptionsEn,
    optionsMr: shuffledOptionsMr,
    correctOption: correctOptionIndex,
    formula: raw.formula,
    explanation: raw.explanation,
    explanationMr: raw.explanationMr,
    pyqYear: raw.pyqYear || "MHT-CET / NEET Special",
  };
}

/**
 * Deduplicates any question array strictly by ID, Normalized Text Signature, and raw text
 */
export function deduplicateQuestionsList(questions: Question[]): Question[] {
  const seenIds = new Set<string>();
  const seenSigs = new Set<string>();
  const seenEnglishTexts = new Set<string>();
  const clean: Question[] = [];

  for (const q of questions) {
    if (!q || (!q.questionText && !q.questionTextMr)) continue;

    // Direct trimmed lower-case normalized English text
    const enClean = (q.questionText || "")
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]/gu, "");

    const sig = normalizeQuestionSignature(q.questionText, q.questionTextMr);

    // Duplicate condition: ID already seen, or combined signature seen, or exact normalized English text seen
    if (
      (q.id && seenIds.has(q.id)) ||
      seenSigs.has(sig) ||
      (enClean.length >= 12 && seenEnglishTexts.has(enClean))
    ) {
      continue;
    }

    if (q.id) seenIds.add(q.id);
    seenSigs.add(sig);
    if (enClean.length >= 12) seenEnglishTexts.add(enClean);
    clean.push(q);
  }
  return clean;
}

export const PROCEDURAL_TEMPLATES: GeneratorTemplate[] = [
  // =========================================================================
  // PHYSICS TEMPLATES
  // =========================================================================

  // 1. Rotational Dynamics - Centripetal Acceleration
  {
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Centripetal Acceleration & Circular Motion",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const radius = getRandomChoice([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 40, 50]);
      const speed = getRandomChoice([3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 30]);
      const acc = (speed * speed) / radius;
      const accFixed = Number.isInteger(acc) ? acc.toString() : acc.toFixed(1);
      return {
        idPrefix: `proc_phy_rot_acc`,
        chapter: "Rotational Dynamics",
        topic: "Centripetal Acceleration & Circular Motion",
        difficulty: "Medium",
        questionText: `An object moves along a circular path of radius ${radius} m with a uniform linear speed of ${speed} m/s. What is its centripetal acceleration?`,
        questionTextMr: `एक वस्तू ${radius} m त्रिज्येच्या वर्तुळाकार मार्गावर ${speed} m/s या एकसमान वेगाने फिरते. तिचे केंद्राभिसारी प्रवेग (Centripetal Acceleration) किती असेल?`,
        correctAnswer: `${accFixed} m/s²`,
        wrongAnswers: [`${(acc * 2).toFixed(1)} m/s²`, `${(acc / 2).toFixed(1)} m/s²`, `${(speed / radius).toFixed(1)} m/s²`],
        formula: `a_c = v² / r = (${speed})² / ${radius} = ${accFixed} m/s²`,
        explanation: `Centripetal acceleration is given by a_c = v² / r. Substituting v = ${speed} m/s and r = ${radius} m gives a_c = ${accFixed} m/s².`,
        explanationMr: `केंद्राभिसारी प्रवेगाचे सूत्र a_c = v² / r आहे. किमती भरल्यास a_c = (${speed})² / ${radius} = ${accFixed} m/s² मिळते.`,
      };
    },
  },

  // 2. Rotational Dynamics - Moment of Inertia
  {
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Moment of Inertia",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const mass = getRandomChoice([2, 3, 4, 5, 6, 8, 10, 12]);
      const radius = getRandomChoice([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const type = getRandomChoice([
        { name: "solid disc about its central transverse axis", nameMr: "मध्य अक्षाभोवती भरीव चकती (Solid Disc)", factor: 0.5, factorFormula: "1/2 M R²" },
        { name: "thin circular ring about its central transverse axis", nameMr: "मध्य अक्षाभोवती पातळ वर्तुळाकार कडे (Ring)", factor: 1.0, factorFormula: "M R²" },
        { name: "solid sphere about its central diameter", nameMr: "व्यासाभोवती भरीव गोल (Solid Sphere)", factor: 0.4, factorFormula: "2/5 M R²" },
        { name: "hollow spherical shell about its diameter", nameMr: "व्यासाभोवती पोकळ गोल (Spherical Shell)", factor: 2 / 3, factorFormula: "2/3 M R²" },
      ]);
      const mi = type.factor * mass * radius * radius;
      const miFixed = mi.toFixed(2);
      return {
        idPrefix: `proc_phy_mi`,
        chapter: "Rotational Dynamics",
        topic: "Moment of Inertia",
        difficulty: "Medium",
        questionText: `Calculate the moment of inertia of a ${type.name} of mass ${mass} kg and radius ${radius} m.`,
        questionTextMr: `${mass} kg वस्तुमान आणि ${radius} m त्रिज्या असलेल्या ${type.nameMr}चे जडत्वाचे परिबल (Moment of Inertia) काढा.`,
        correctAnswer: `${miFixed} kg·m²`,
        wrongAnswers: [`${(mi * 2).toFixed(2)} kg·m²`, `${(mi * 1.5).toFixed(2)} kg·m²`, `${(mi * 0.5).toFixed(2)} kg·m²`],
        formula: `I = ${type.factorFormula} = ${type.factor.toFixed(2)} × ${mass} × (${radius})² = ${miFixed} kg·m²`,
        explanation: `Using the formula I = ${type.factorFormula} for ${type.name}, we get I = ${miFixed} kg·m².`,
        explanationMr: `जडत्वाचे परिबल I = ${type.factorFormula} नुसार I = ${miFixed} kg·m² येते.`,
      };
    },
  },

  // 3. Oscillations - Spring Constant & Time Period
  {
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Time Period of Spring-Mass System",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const mass = getRandomChoice([1, 2, 4, 9, 16, 25]);
      const k = getRandomChoice([100, 400, 900, 1600, 2500]);
      const freqVal = (Math.sqrt(k) / Math.sqrt(mass)).toFixed(0);
      const ansVal = `(2π / ${freqVal}) s`;
      return {
        idPrefix: `proc_phy_shm`,
        chapter: "Oscillations & Waves",
        topic: "Time Period of Spring-Mass System",
        difficulty: "Medium",
        questionText: `A body of mass ${mass} kg is attached to a light spring of force constant k = ${k} N/m. The time period of its vertical oscillation is:`,
        questionTextMr: `${mass} kg वस्तुमानाचा गोळा k = ${k} N/m स्प्रिंग स्थिरांक असलेल्या स्प्रिंगला जोडला आहे. त्याच्या उभ्या दोलनाचा आवर्तकाळ किती असेल?`,
        correctAnswer: ansVal,
        wrongAnswers: [`(2π / ${Math.sqrt(k)}) s`, `(π / ${Math.sqrt(mass)}) s`, `(4π × ${Math.sqrt(k)}) s`],
        formula: `T = 2π √(m/k) = 2π √(${mass}/${k}) = ${ansVal}`,
        explanation: `Period of oscillation for a spring-mass system is T = 2π √(m / k). Substituting m = ${mass} kg and k = ${k} N/m gives T = ${ansVal}.`,
        explanationMr: `स्प्रिंग-वस्तुमान प्रणालीचा आवर्तकाळ T = 2π √(m/k) असतो. सूत्रामध्ये किमती भरल्यास T = ${ansVal} मिळतो.`,
      };
    },
  },

  // 4. Thermodynamics - Carnot Efficiency
  {
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Carnot Engine & Efficiency",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const T1_celsius = getRandomChoice([327, 427, 527, 627, 727]);
      const T2_celsius = getRandomChoice([27, 77, 127, 177]);
      const T1 = T1_celsius + 273;
      const T2 = T2_celsius + 273;
      const eff = (1 - T2 / T1) * 100;
      const effFixed = eff.toFixed(1);
      return {
        idPrefix: `proc_phy_carnot`,
        chapter: "Thermodynamics & Kinetic Theory",
        topic: "Carnot Engine & Efficiency",
        difficulty: "Medium",
        questionText: `A Carnot engine operates between source temperature ${T1_celsius}°C and sink temperature ${T2_celsius}°C. What is its percentage efficiency?`,
        questionTextMr: `एक कार्नोट इंजिन ${T1_celsius}°C स्त्रोत तापमान आणि ${T2_celsius}°C सिंक तापमानामध्ये कार्य करते. त्याची कार्यक्षमता (Efficiency) किती टक्के असेल?`,
        correctAnswer: `${effFixed}%`,
        wrongAnswers: [`${(eff * 1.3).toFixed(1)}%`, `${(eff * 0.7).toFixed(1)}%`, `${(100 - eff).toFixed(1)}%`],
        formula: `η = (1 - T₂/T₁) × 100%, where T₁ = ${T1} K, T₂ = ${T2} K`,
        explanation: `Efficiency η = 1 - (T₂/T₁) in Kelvin. T₁ = ${T1_celsius} + 273 = ${T1} K, T₂ = ${T2_celsius} + 273 = ${T2} K. η = 1 - (${T2}/${T1}) = ${effFixed}%.`,
        explanationMr: `कार्यक्षमता η = (1 - T₂/T₁) × १००%. केल्विनमध्ये T₁ = ${T1} K व T₂ = ${T2} K. म्हणून कार्यक्षमता = ${effFixed}% येते.`,
      };
    },
  },

  // 5. Current Electricity - Ohm's Law & Internal Resistance
  {
    subject: "Physics",
    chapter: "Current Electricity",
    topic: "EMF, Internal Resistance and Terminal Voltage",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const emf = getRandomChoice([6, 9, 12, 15, 18, 24]);
      const r = getRandomChoice([0.5, 1, 1.5, 2]);
      const R = getRandomChoice([4, 5, 8, 10, 20]);
      const current = emf / (R + r);
      const vTerminal = current * R;
      return {
        idPrefix: `proc_phy_elec_terminal`,
        chapter: "Current Electricity",
        topic: "EMF and Internal Resistance",
        difficulty: "Medium",
        questionText: `A battery of EMF ${emf} V and internal resistance ${r} Ω is connected across an external resistor of ${R} Ω. What is the terminal potential difference across the battery?`,
        questionTextMr: `${emf} V विद्युतवाहक बल (EMF) आणि ${r} Ω अंतर्गत रोध (Internal Resistance) असलेली बॅटरी ${R} Ω च्या बाह्य रोधाला जोडली आहे. बॅटरीच्या टोकांमधील विभवांतर (Terminal PD) किती असेल?`,
        correctAnswer: `${vTerminal.toFixed(2)} V`,
        wrongAnswers: [`${emf.toFixed(2)} V`, `${(vTerminal * 0.75).toFixed(2)} V`, `${current.toFixed(2)} V`],
        formula: `I = E / (R + r) = ${current.toFixed(2)} A, V = I × R = ${vTerminal.toFixed(2)} V`,
        explanation: `Total circuit current I = E / (R + r) = ${emf} / (${R} + ${r}) = ${current.toFixed(2)} A. Terminal voltage V = I × R = ${vTerminal.toFixed(2)} V.`,
        explanationMr: `एकूण विद्युतप्रवाह I = E / (R + r) = ${current.toFixed(2)} A. टोकांमधील विभवांतर V = I × R = ${vTerminal.toFixed(2)} V.`,
      };
    },
  },

  // 6. Optics - Lens Formula
  {
    subject: "Physics",
    chapter: "Ray & Wave Optics",
    topic: "Lens Formula and Magnification",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const f = getRandomChoice([10, 15, 20, 25, 30]);
      const u = getRandomChoice([-20, -30, -40, -50]);
      const inv_v = 1 / f + 1 / u;
      const v = 1 / inv_v;
      return {
        idPrefix: `proc_phy_optics_lens`,
        chapter: "Ray & Wave Optics",
        topic: "Lens Formula",
        difficulty: "Medium",
        questionText: `An object is placed at a distance of ${Math.abs(u)} cm in front of a convex lens of focal length ${f} cm. At what distance from the lens is the real image formed?`,
        questionTextMr: `${f} cm नाभीय अंतर (Focal Length) असलेल्या बहिर्गोल भिंगासमोर ${Math.abs(u)} cm अंतरावर एक वस्तू ठेवली आहे. भिंगापासून किती अंतरावर तिची वास्तव प्रतिमा तयार होईल?`,
        correctAnswer: `${v.toFixed(1)} cm`,
        wrongAnswers: [`${(v * 1.5).toFixed(1)} cm`, `${f.toFixed(1)} cm`, `${(Math.abs(u) + f).toFixed(1)} cm`],
        formula: `1/f = 1/v - 1/u => 1/v = 1/${f} - 1/${Math.abs(u)} => v = ${v.toFixed(1)} cm`,
        explanation: `By lens formula 1/f = 1/v - 1/u, substituting f = +${f} cm and u = ${u} cm yields v = +${v.toFixed(1)} cm.`,
        explanationMr: `भिंगाचे सूत्र 1/f = 1/v - 1/u वापरून प्रतिमेचे अंतर v = +${v.toFixed(1)} cm मिळते.`,
      };
    },
  },

  // 7. Electrostatics - Capacitors
  {
    subject: "Physics",
    chapter: "Electrostatics & Current",
    topic: "Capacitance Combinations",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const c1 = getRandomChoice([2, 4, 6, 8, 12]);
      const c2 = getRandomChoice([3, 6, 12, 24]);
      const isParallel = idx % 2 === 0;
      const cEq = isParallel ? c1 + c2 : (c1 * c2) / (c1 + c2);
      const textEn = isParallel
        ? `Two capacitors of capacitance ${c1} µF and ${c2} µF are connected in parallel. What is the equivalent capacitance?`
        : `Two capacitors of capacitance ${c1} µF and ${c2} µF are connected in series. What is the equivalent capacitance?`;
      const textMr = isParallel
        ? `${c1} µF आणि ${c2} µF धारकता असलेले दोन संधारित्र (Capacitors) समांतर जोडणीत जोडले आहेत. समतुल्य धारकता किती?`
        : `${c1} µF आणि ${c2} µF धारकता असलेले दोन संधारित्र एकसर जोडणीत जोडले आहेत. समतुल्य धारकता किती?`;
      return {
        idPrefix: `proc_phy_cap_eq`,
        chapter: "Electrostatics & Current",
        topic: "Capacitance Combinations",
        difficulty: "Easy",
        questionText: textEn,
        questionTextMr: textMr,
        correctAnswer: `${cEq.toFixed(2)} µF`,
        wrongAnswers: [`${(cEq * 2).toFixed(2)} µF`, `${(c1 * c2).toFixed(2)} µF`, `${Math.abs(c1 - c2).toFixed(2)} µF`],
        formula: isParallel ? `C_eq = C1 + C2 = ${c1} + ${c2} = ${cEq} µF` : `1/C_eq = 1/C1 + 1/C2 => C_eq = ${cEq.toFixed(2)} µF`,
        explanation: isParallel
          ? `In parallel combination, equivalent capacitance is simply C = C1 + C2 = ${cEq} µF.`
          : `In series combination, equivalent capacitance is C = (C1 × C2)/(C1 + C2) = ${cEq.toFixed(2)} µF.`,
        explanationMr: isParallel
          ? `समांतर जोडणीत C_eq = C1 + C2 = ${cEq} µF असते.`
          : `एकसर जोडणीत C_eq = (C1 × C2)/(C1 + C2) = ${cEq.toFixed(2)} µF असते.`,
      };
    },
  },

  // 8. Modern Physics - De Broglie Wavelength
  {
    subject: "Physics",
    chapter: "Dual Nature of Radiation and Matter",
    topic: "De Broglie Wavelength of Electron",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const vVolt = getRandomChoice([100, 144, 400, 625, 900]);
      const lambda = (12.27 / Math.sqrt(vVolt)).toFixed(3);
      return {
        idPrefix: `proc_phy_debroglie`,
        chapter: "Dual Nature of Radiation and Matter",
        topic: "De Broglie Wavelength",
        difficulty: "Medium",
        questionText: `An electron is accelerated from rest through a potential difference of V = ${vVolt} Volts. What is the de Broglie wavelength associated with it?`,
        questionTextMr: `एक इलेक्ट्रॉन स्थिर अवस्थेतून V = ${vVolt} व्होल्ट विभवांतराने गतिमान केला जातो. त्याच्याशी संबंधित डि-ब्रॉग्ली तरंगलांबी (de Broglie wavelength) किती असेल?`,
        correctAnswer: `${lambda} Å`,
        wrongAnswers: [`${(parseFloat(lambda) * 2).toFixed(3)} Å`, `${(parseFloat(lambda) / 2).toFixed(3)} Å`, `${Math.sqrt(vVolt).toFixed(3)} Å`],
        formula: `λ = 12.27 / √V Å = 12.27 / √${vVolt} = ${lambda} Å`,
        explanation: `For an electron accelerated through V volts, de Broglie wavelength is given by λ = 12.27 / √V Å = ${lambda} Å.`,
        explanationMr: `इलेक्ट्रॉनसाठी डि-ब्रॉग्ली तरंगलांबी सूत्र: λ = १२.२७ / √V Å = ${lambda} Å.`,
      };
    },
  },

  // =========================================================================
  // CHEMISTRY TEMPLATES
  // =========================================================================

  // 9. Electrochemistry - Standard Cell Potential
  {
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "Galvanic Cell & Standard EMF",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const metals = [
        { name: "Zn - Cu (Daniell Cell)", E_cat: 0.34, E_ano: -0.76, cat: "Cu²⁺/Cu", ano: "Zn²⁺/Zn" },
        { name: "Mg - Ag Cell", E_cat: 0.8, E_ano: -2.37, cat: "Ag⁺/Ag", ano: "Mg²⁺/Mg" },
        { name: "Fe - Cd Cell", E_cat: -0.4, E_ano: -0.44, cat: "Cd²⁺/Cd", ano: "Fe²⁺/Fe" },
        { name: "Ni - Cu Cell", E_cat: 0.34, E_ano: -0.25, cat: "Cu²⁺/Cu", ano: "Ni²⁺/Ni" },
        { name: "Al - Cu Cell", E_cat: 0.34, E_ano: -1.66, cat: "Cu²⁺/Cu", ano: "Al³⁺/Al" },
      ];
      const m = getRandomChoice(metals);
      const E_cell = m.E_cat - m.E_ano;
      return {
        idPrefix: `proc_chem_ecell`,
        chapter: "Electrochemistry & Chemical Kinetics",
        topic: "Standard Cell Potential",
        difficulty: "Medium",
        questionText: `For a galvanic cell composed of cathode (${m.cat}, E° = ${m.E_cat > 0 ? "+" : ""}${m.E_cat} V) and anode (${m.ano}, E° = ${m.E_ano > 0 ? "+" : ""}${m.E_ano} V), calculate the standard EMF (E°_cell).`,
        questionTextMr: `कॅथोड (${m.cat}, E° = ${m.E_cat} V) आणि ॲनोड (${m.ano}, E° = ${m.E_ano} V) असलेल्या गॅल्व्हॅनिक घटचे प्रमाण विद्युतवाहक बल (E°_cell) किती असेल?`,
        correctAnswer: `${E_cell.toFixed(2)} V`,
        wrongAnswers: [`${(E_cell * 0.5).toFixed(2)} V`, `${(m.E_cat + m.E_ano).toFixed(2)} V`, `${(-E_cell).toFixed(2)} V`],
        formula: `E°_cell = E°_cathode - E°_anode = (${m.E_cat}) - (${m.E_ano}) = ${E_cell.toFixed(2)} V`,
        explanation: `Standard cell potential E°_cell = E°_cathode - E°_anode. Substituting given values gives E°_cell = ${E_cell.toFixed(2)} V.`,
        explanationMr: `प्रमाण सेल पोटेंशियल E°_cell = E°_कॅथोड - E°_ॲनोड = ${E_cell.toFixed(2)} V.`,
      };
    },
  },

  // 10. Chemical Kinetics - First Order Half Life
  {
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "First Order Reaction & Half Life",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const k_val = getRandomChoice([0.0693, 0.0231, 0.03465, 0.1386, 0.01155]);
      const t_half = 0.693 / k_val;
      return {
        idPrefix: `proc_chem_kin_t_half`,
        chapter: "Electrochemistry & Chemical Kinetics",
        topic: "First Order Half Life",
        difficulty: "Medium",
        questionText: `The rate constant for a first-order chemical reaction is k = ${k_val} s⁻¹. What is the half-life (t₁/₂) of the reaction?`,
        questionTextMr: `एका प्रथम श्रेणीच्या (First-order) रासायनिक अभिक्रियेचा दर स्थिरांक k = ${k_val} s⁻¹ आहे. या अभिक्रियेचा अर्धाळुकाळ (Half-life, t₁/₂) किती असेल?`,
        correctAnswer: `${t_half.toFixed(1)} s`,
        wrongAnswers: [`${(t_half * 2).toFixed(1)} s`, `${(t_half / 2).toFixed(1)} s`, `${(k_val * 100).toFixed(1)} s`],
        formula: `t₁/₂ = 0.693 / k = 0.693 / ${k_val} = ${t_half.toFixed(1)} s`,
        explanation: `For a first order reaction, half life is independent of initial concentration and given by t₁/₂ = 0.693 / k = ${t_half.toFixed(1)} s.`,
        explanationMr: `प्रथम श्रेणीच्या अभिक्रियेसाठी t₁/₂ = ०.६९३ / k असते. म्हणून t₁/₂ = ${t_half.toFixed(1)} सेकंद.`,
      };
    },
  },

  // 11. Solutions - Osmotic Pressure / Molarity
  {
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Osmotic Pressure Calculation",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const M = getRandomChoice([0.1, 0.2, 0.25, 0.5, 1.0, 1.5]);
      const T_celsius = getRandomChoice([27, 37, 47, 57]);
      const T_kelvin = T_celsius + 273;
      const R = 0.0821;
      const pi = M * R * T_kelvin;
      return {
        idPrefix: `proc_chem_osmotic`,
        chapter: "Solutions & Colligative Properties",
        topic: "Osmotic Pressure",
        difficulty: "Medium",
        questionText: `What is the osmotic pressure (π) of a ${M} M non-electrolyte aqueous solution at ${T_celsius}°C? (Take R = 0.0821 L·atm/mol·K)`,
        questionTextMr: `${T_celsius}°C तापमानावर ${M} M तीव्रता असलेल्या विद्युत अनपघटनी (Non-electrolyte) द्रावणाचा परासरणी दाब (Osmotic Pressure) किती असेल? (R = 0.0821 L·atm/mol·K)`,
        correctAnswer: `${pi.toFixed(2)} atm`,
        wrongAnswers: [`${(pi * 1.5).toFixed(2)} atm`, `${(pi * 0.5).toFixed(2)} atm`, `${(M * T_celsius).toFixed(2)} atm`],
        formula: `π = C R T = ${M} × 0.0821 × ${T_kelvin} = ${pi.toFixed(2)} atm`,
        explanation: `Osmotic pressure π = CRT. Converting T to Kelvin (${T_celsius} + 273 = ${T_kelvin} K), π = ${M} × 0.0821 × ${T_kelvin} = ${pi.toFixed(2)} atm.`,
        explanationMr: `परासरणी दाबाचे सूत्र π = CRT आहे. केल्विन तापमान ${T_kelvin} K वापरल्यास π = ${pi.toFixed(2)} atm मिळते.`,
      };
    },
  },

  // 12. Structure of Atom - Number of Photons / Energy
  {
    subject: "Chemistry",
    chapter: "Structure of Atom",
    topic: "Planck Quantum Theory & Photon Energy",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const wavelengths = [
        { val: 300, energy: "6.626 × 10⁻¹⁹ J", wrong: ["3.313 × 10⁻¹⁹ J", "13.25 × 10⁻¹⁹ J", "1.98 × 10⁻¹⁹ J"] },
        { val: 400, energy: "4.969 × 10⁻¹⁹ J", wrong: ["2.484 × 10⁻¹⁹ J", "9.938 × 10⁻¹⁹ J", "6.626 × 10⁻¹⁹ J"] },
        { val: 600, energy: "3.313 × 10⁻¹⁹ J", wrong: ["6.626 × 10⁻¹⁹ J", "1.656 × 10⁻¹⁹ J", "4.969 × 10⁻¹⁹ J"] },
      ];
      const w = getRandomChoice(wavelengths);
      return {
        idPrefix: `proc_chem_atom_photon`,
        chapter: "Structure of Atom",
        topic: "Photon Energy",
        difficulty: "Medium",
        questionText: `Calculate the energy of a single photon of electromagnetic radiation having a wavelength of λ = ${w.val} nm. (h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s)`,
        questionTextMr: `λ = ${w.val} nm तरंगलांबी असलेल्या एका फोटॉनची ऊर्जा किती असेल? (h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s)`,
        correctAnswer: w.energy,
        wrongAnswers: w.wrong as [string, string, string],
        formula: `E = h c / λ = (6.626 × 10⁻³⁴ × 3 × 10⁸) / (${w.val} × 10⁻⁹) = ${w.energy}`,
        explanation: `Using Einstein-Planck formula E = hc/λ, substituting λ = ${w.val} × 10⁻⁹ m gives E = ${w.energy}.`,
        explanationMr: `फोटॉन ऊर्जेचे सूत्र E = hc/λ वापरून उत्तर ${w.energy} मिळते.`,
      };
    },
  },

  // =========================================================================
  // BIOLOGY TEMPLATES
  // =========================================================================

  // 13. Genetics - Monohybrid & Dihybrid Phenotypic/Genotypic Ratios
  {
    subject: "Biology",
    chapter: "Principles of Inheritance and Variation (Genetics)",
    topic: "Mendelian Cross Ratios",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const crosses = [
        { type: "Mendelian monohybrid cross phenotypic ratio in F2 generation", typeMr: "मेंडेलच्या एकसंकर संकरणातील (Monohybrid Cross) F2 पिढीचे स्वरूप गुणोत्तर (Phenotypic Ratio)", ratio: "3 : 1", wrong: ["1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1"] },
        { type: "Mendelian monohybrid cross genotypic ratio in F2 generation", typeMr: "मेंडेलच्या एकसंकर संकरणातील (Monohybrid Cross) F2 पिढीचे जनुक गुणोत्तर (Genotypic Ratio)", ratio: "1 : 2 : 1", wrong: ["3 : 1", "9 : 3 : 3 : 1", "1 : 1 : 1 : 1"] },
        { type: "Mendelian dihybrid cross phenotypic ratio in F2 generation", typeMr: "मेंडेलच्या द्विसंकर संकरणातील (Dihybrid Cross) F2 पिढीचे स्वरूप गुणोत्तर (Phenotypic Ratio)", ratio: "9 : 3 : 3 : 1", wrong: ["9 : 7", "12 : 3 : 1", "1 : 2 : 2 : 4 : 1 : 2 : 1 : 2 : 1"] },
        { type: "Mendelian dihybrid test cross ratio", typeMr: "द्विसंकर चाचणी संकरणाचे (Dihybrid Test Cross) गुणोत्तर", ratio: "1 : 1 : 1 : 1", wrong: ["9 : 3 : 3 : 1", "3 : 1", "1 : 2 : 1"] },
      ];
      const c = getRandomChoice(crosses);
      return {
        idPrefix: `proc_bio_genetics_ratio`,
        chapter: "Principles of Inheritance and Variation (Genetics)",
        topic: "Mendel Cross Ratios",
        difficulty: "Medium",
        questionText: `According to classical genetics, what is the ${c.type}?`,
        questionTextMr: `अभिजात जनुकशास्त्रानुसार, ${c.typeMr} खालीलपैकी कोणते असते?`,
        correctAnswer: c.ratio,
        wrongAnswers: c.wrong as [string, string, string],
        formula: `Mendelian Standard Ratios: Monohybrid (3:1 / 1:2:1), Dihybrid (9:3:3:1 / 1:1:1:1)`,
        explanation: `In standard Mendelian genetics with complete dominance, the ${c.type} is strictly ${c.ratio}.`,
        explanationMr: `मेंडेलच्या नियमांनुसार संपूर्ण प्रभावीपणा (Complete Dominance) असताना ${c.typeMr} अचूकपणे ${c.ratio} असते.`,
      };
    },
  },

  // 14. Cell Biology - Stages of Meiosis Prophase I
  {
    subject: "Biology",
    chapter: "Cell Structure and Cell Division",
    topic: "Meiosis Stages & Crossing Over",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const stages = [
        { name: "Pachytene (Prophase I)", nameMr: "पॅकिटीन (पूर्वावस्था I)", event: "Crossing over and Recombination nodule formation", eventMr: "समजातीय गुणसूत्रांमधील क्रॉसिंग ओव्हर (Crossing over) व पुनर्संयोजन गाठींची निर्मिती" },
        { name: "Diplotene (Prophase I)", nameMr: "डिप्लोटीन (पूर्वावस्था I)", event: "Dissolution of synaptonemal complex and appearance of X-shaped Chiasmata", eventMr: "सायनॅप्टोनिमल कॉम्प्लेक्सचे विघटन आणि 'X' आकाराचे कायझमॅटा (Chiasmata) दिसणे" },
        { name: "Zygotene (Prophase I)", nameMr: "झायगोटीन (पूर्वावस्था I)", event: "Synapsis of homologous chromosomes and formation of Synaptonemal complex", eventMr: "समजातीय गुणसूत्रांचे युगलन (Synapsis) आणि सायनॅप्टोनिमल संकुलाची निर्मिती" },
        { name: "Metaphase I", nameMr: "मध्यावस्था I (Metaphase I)", event: "Bivalent chromosomes align symmetrically on the equatorial plate", eventMr: "विषुववृत्तीय प्रतलावर समजातीय जोड्यांची सममित मांडणी" },
        { name: "Anaphase I", nameMr: "पश्चावस्था I (Anaphase I)", event: "Homologous chromosomes segregate to opposite poles while sister chromatids remain united", eventMr: "समजातीय गुणसूत्रांचे ध्रुवांकडे वहन, तर अर्धगुणसूत्रे एकत्र राहणे" },
      ];
      const s = getRandomChoice(stages);
      return {
        idPrefix: `proc_bio_meiosis`,
        chapter: "Cell Structure and Cell Division",
        topic: "Meiosis Stages & Events",
        difficulty: "Medium",
        questionText: `During which specific stage of meiotic cell division does '${s.event}' characteristically take place?`,
        questionTextMr: `अर्धसूत्री विभाजनाच्या (Meiosis) कोणत्या विशिष्ट टप्प्यात '${s.eventMr}' ही प्रक्रिया घडते?`,
        correctAnswer: s.name,
        correctAnswerMr: s.nameMr,
        wrongAnswers: ["Leptotene", "Telophase I", "Diakinesis"].filter((st) => !s.name.includes(st)).slice(0, 3) as [string, string, string],
        wrongAnswersMr: ["लेप्टोटीन", "अंत्यावस्था I", "डायकायनेसिस"].slice(0, 3) as [string, string, string],
        formula: `Prophase I stages sequence: Leptotene -> Zygotene -> Pachytene -> Diplotene -> Diakinesis`,
        explanation: `During meiotic cell division, ${s.event.toLowerCase()} occurs specifically during ${s.name}.`,
        explanationMr: `अर्धसूत्री विभाजनात ${s.eventMr} ही घटना ${s.nameMr} मध्ये घडते.`,
      };
    },
  },

  // 15. Plant Physiology - Photosynthesis & Light Reactions
  {
    subject: "Biology",
    chapter: "Photosynthesis & Respiration in Plants",
    topic: "Light Reaction End Products & Photosystems",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const facts = [
        { qEn: "The primary assimilatory power products generated during the light reactions of photosynthesis are:", qMr: "प्रकाश संश्लेषणाच्या प्रकाश अभिक्रियेत तयार होणारी प्राथमिक ऊर्जा उत्पादने कोणती?", ansEn: "ATP, NADPH and O₂", ansMr: "ATP, NADPH आणि O₂", wEn: ["Glucose and Starch", "ADP and NADP⁺", "RuBP and 3-PGA"], wMr: ["ग्लुकोज आणि स्टार्च", "ADP आणि NADP⁺", "RuBP आणि 3-PGA"] },
        { qEn: "The primary CO₂ acceptor molecule in C3 cycle (Calvin cycle) is:", qMr: "C3 चक्रात (Calvin Cycle) कार्बन डायऑक्साईड (CO₂) स्वीकारणारा प्राथमिक घटक कोणता?", ansEn: "Ribulose-1,5-bisphosphate (RuBP)", ansMr: "रिब्युलोझ-१,५-बायफॉस्फेट (RuBP)", wEn: ["Phosphoenolpyruvate (PEP)", "Oxaloacetic acid (OAA)", "Phosphoglyceraldehyde (PGAL)"], wMr: ["फॉस्फोइनॉलपायरुव्हेट (PEP)", "ऑक्झॅलोॲसिटिक ॲसिड (OAA)", "PGAL"] },
        { qEn: "The primary CO₂ acceptor molecule in C4 plants mesophyll cells is:", qMr: "C4 वनस्पतींच्या मेसोफिल पेशींमध्ये CO₂ स्वीकारणारा प्राथमिक रेणू कोणता?", ansEn: "Phosphoenolpyruvate (PEP)", ansMr: "फॉस्फोइनॉलपायरुव्हेट (PEP)", wEn: ["RuBP", "Malic acid", "Pyruvic acid"], wMr: ["RuBP", "मॅलिक ॲसिड", "पायरुव्हिक ॲसिड"] },
      ];
      const f = getRandomChoice(facts);
      return {
        idPrefix: `proc_bio_photosynth`,
        chapter: "Photosynthesis & Respiration in Plants",
        topic: "Photosynthesis Mechanisms",
        difficulty: "Easy",
        questionText: f.qEn,
        questionTextMr: f.qMr,
        correctAnswer: f.ansEn,
        correctAnswerMr: f.ansMr,
        wrongAnswers: f.wEn as [string, string, string],
        wrongAnswersMr: f.wMr as [string, string, string],
        formula: `Light Reactions: H2O + NADP+ + ADP + Pi --(Light/Chlorophyll)--> O2 + NADPH + ATP`,
        explanation: `In plant physiology, ${f.ansEn} represents the fundamental accepted fact in photosynthesis biochemical pathways.`,
        explanationMr: `प्रकाश संश्लेषणातील मूलभूत प्रक्रियेनुसार ${f.ansMr} हे योग्य उत्तर आहे.`,
      };
    },
  },

  // 16. Human Physiology - Blood Clotting & Factors
  {
    subject: "Biology",
    chapter: "Body Fluids and Circulation",
    topic: "Blood Clotting Mechanism and Ions",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const ions = [
        { name: "Calcium ion (Ca²⁺)", nameMr: "कॅल्शियम आयन (Ca²⁺)", role: "Essential mineral ion required at almost all stages of the blood coagulation cascade", roleMr: "रक्त गोठण्याच्या (Blood Clotting) जवळजवळ सर्व टप्प्यांमध्ये आवश्यक असणारा खनिज आयन" },
        { name: "Thrombin", nameMr: "थ्रॉम्बिन (Thrombin)", role: "Active enzyme that converts soluble Fibrinogen into insoluble Fibrin meshwork", roleMr: "द्राव्य फायब्रिनोजेनचे अद्राव्य फायब्रिन धाग्यांमध्ये रूपांतर करणारा विकर" },
        { name: "Vitamin K", nameMr: "व्हिटॅमिन K (Vitamin K)", role: "Essential vitamin required for normal hepatic synthesis of prothrombin and factors VII, IX, X", roleMr: "यकृतामध्ये प्रोथ्रॉम्बिन व इतर क्लॉटिंग घटकांच्या निर्मितीसाठी लागणारे जीवनसत्व" },
      ];
      const item = getRandomChoice(ions);
      return {
        idPrefix: `proc_bio_clotting`,
        chapter: "Body Fluids and Circulation",
        topic: "Blood Coagulation Cascade",
        difficulty: "Easy",
        questionText: `Which of the following is the ${item.role}?`,
        questionTextMr: `खालीलपैकी ${item.roleMr} कोणता घटक आहे?`,
        correctAnswer: item.name,
        correctAnswerMr: item.nameMr,
        wrongAnswers: ["Sodium ion (Na⁺)", "Potassium ion (K⁺)", "Vitamin D"].filter((x) => !item.name.includes(x)).slice(0, 3) as [string, string, string],
        wrongAnswersMr: ["सोडियम आयन (Na⁺)", "पोटॅशियम आयन (K⁺)", "व्हिटॅमिन D"].slice(0, 3) as [string, string, string],
        formula: `Coagulation: Prothrombin --(Thrombokinase + Ca²⁺)--> Thrombin; Fibrinogen --(Thrombin)--> Fibrin Clot`,
        explanation: `${item.name} plays a vital role in the blood clotting cascade as ${item.role.toLowerCase()}.`,
        explanationMr: `रक्त गोठण्याच्या प्रक्रियेत ${item.nameMr} हा घटक अत्यंत महत्त्वाचा असतो.`,
      };
    },
  },

  // =========================================================================
  // MATHEMATICS TEMPLATES
  // =========================================================================

  // 17. Integration - Standard Definite Integrals
  {
    subject: "Mathematics",
    chapter: "Definite & Indefinite Integration",
    topic: "Definite Integral of Linear Function",
    difficulty: "Medium",
    generate: (idx, exam) => {
      const a = getRandomInt(1, 4);
      const b = a + getRandomInt(1, 4);
      const m = getRandomChoice([2, 4, 6, 8]);
      const integralVal = (m * (b * b - a * a)) / 2;
      return {
        idPrefix: `proc_math_def_int`,
        chapter: "Definite & Indefinite Integration",
        topic: "Definite Integrals",
        difficulty: "Medium",
        questionText: `Evaluate the definite integral: ∫ from ${a} to ${b} (${m}x) dx.`,
        questionTextMr: `निश्चित समाकलन (Definite Integral) सोडवा: ∫ (${a} ते ${b}) (${m}x) dx चे मूल्य किती?`,
        correctAnswer: `${integralVal}`,
        wrongAnswers: [`${integralVal + m}`, `${integralVal - a}`, `${integralVal * 2}`],
        formula: `∫ (${m}x) dx = [${m} x² / 2] from ${a} to ${b} = ${m / 2} × (${b}² - ${a}²) = ${integralVal}`,
        explanation: `Integrating ${m}x gives (${m}/2)x². Evaluating between limits [${a}, ${b}]: (${m}/2) × (${b * b} - ${a * a}) = ${integralVal}.`,
        explanationMr: `${m}x चे समाकलन (${m}/2)x² येते. सीमा [${a}, ${b}] टाकल्यास उत्तर = ${integralVal} मिळते.`,
      };
    },
  },

  // 18. Matrices - Determinant of 2x2 Matrix
  {
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Determinant Calculation",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const a11 = getRandomInt(2, 7);
      const a12 = getRandomInt(1, 6);
      const a21 = getRandomInt(1, 5);
      const a22 = getRandomInt(2, 8);
      const det = a11 * a22 - a12 * a21;
      return {
        idPrefix: `proc_math_det`,
        chapter: "Matrices & Determinants",
        topic: "Determinant Calculation",
        difficulty: "Easy",
        questionText: `Find the determinant of the 2×2 matrix: A = [[${a11}, ${a12}], [${a21}, ${a22}]].`,
        questionTextMr: `२×२ मॅट्रिक्स A = [[${a11}, ${a12}], [${a21}, ${a22}]] चा निश्चयक (Determinant) किती?`,
        correctAnswer: `${det}`,
        wrongAnswers: [`${det + 2}`, `${det - 3}`, `${a11 * a22 + a12 * a21}`],
        formula: `|A| = (a₁₁ × a₂₂) - (a₁₂ × a₂₁) = (${a11} × ${a22}) - (${a12} × ${a21}) = ${det}`,
        explanation: `Determinant of 2x2 matrix is computed by ad - bc = (${a11} × ${a22}) - (${a12} × ${a21}) = ${det}.`,
        explanationMr: `२×२ निश्चयकाचे मूल्य ad - bc = (${a11} × ${a22}) - (${a12} × ${a21}) = ${det} येते.`,
      };
    },
  },

  // 19. Vectors - Dot Product of Two Vectors
  {
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Scalar (Dot) Product",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const x1 = getRandomInt(1, 5);
      const y1 = getRandomInt(1, 5);
      const z1 = getRandomInt(1, 5);
      const x2 = getRandomInt(1, 5);
      const y2 = getRandomInt(1, 5);
      const z2 = getRandomInt(1, 5);
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      return {
        idPrefix: `proc_math_vector_dot`,
        chapter: "Vectors & 3D Geometry",
        topic: "Vector Dot Product",
        difficulty: "Easy",
        questionText: `Find the dot product of two vectors a = ${x1}i + ${y1}j + ${z1}k and b = ${x2}i + ${y2}j + ${z2}k.`,
        questionTextMr: `a = ${x1}i + ${y1}j + ${z1}k आणि b = ${x2}i + ${y2}j + ${z2}k या दोन सदिश राशींचा (Vectors) अदिश गुणाकार (Dot Product a · b) काढा.`,
        correctAnswer: `${dot}`,
        wrongAnswers: [`${dot + 4}`, `${dot - 2}`, `${x1 * x2 * y1 * y2}`],
        formula: `a · b = (a_x × b_x) + (a_y × b_y) + (a_z × b_z) = (${x1}×${x2}) + (${y1}×${y2}) + (${z1}×${z2}) = ${dot}`,
        explanation: `Scalar dot product is sum of products of corresponding components: (${x1}×${x2}) + (${y1}×${y2}) + (${z1}×${z2}) = ${dot}.`,
        explanationMr: `अदिश गुणाकार a · b = (${x1}×${x2}) + (${y1}×${y2}) + (${z1}×${z2}) = ${dot}.`,
      };
    },
  },

  // 20. Probability - Conditional Probability
  {
    subject: "Mathematics",
    chapter: "Probability & Statistics",
    topic: "Conditional Probability Formula",
    difficulty: "Easy",
    generate: (idx, exam) => {
      const pB = getRandomChoice([0.4, 0.5, 0.6, 0.8]);
      const pAB = getRandomChoice([0.1, 0.2, 0.24, 0.3]);
      const pAgivenB = (pAB / pB).toFixed(2);
      return {
        idPrefix: `proc_math_prob_cond`,
        chapter: "Probability & Statistics",
        topic: "Conditional Probability",
        difficulty: "Easy",
        questionText: `If P(B) = ${pB} and P(A ∩ B) = ${pAB}, calculate the conditional probability P(A | B).`,
        questionTextMr: `जर P(B) = ${pB} आणि P(A ∩ B) = ${pAB} असेल, तर सशर्त संभाव्यता P(A | B) काढा.`,
        correctAnswer: `${pAgivenB}`,
        wrongAnswers: [`${(pAB * pB).toFixed(2)}`, `${(pB - pAB).toFixed(2)}`, `0.95`],
        formula: `P(A | B) = P(A ∩ B) / P(B) = ${pAB} / ${pB} = ${pAgivenB}`,
        explanation: `By definition of conditional probability, P(A | B) = P(A ∩ B) / P(B) = ${pAB} / ${pB} = ${pAgivenB}.`,
        explanationMr: `सशर्त संभाव्यतेचे सूत्र P(A | B) = P(A ∩ B) / P(B) = ${pAgivenB} येते.`,
      };
    },
  },
];

/**
 * Generate a batch of dynamic procedural questions.
 * Enforces a strict ZERO duplicate policy using global signature tracking.
 */
export function generateProceduralQuestions(
  exam: ExamType,
  subject: SubjectType | "All",
  count: number = 20,
  chapterFilter: string = "All",
  existingSignatures?: Set<string>
): Question[] {
  const seenSignatures = existingSignatures || new Set<string>();

  let matchingTemplates = PROCEDURAL_TEMPLATES.filter((t) => {
    if (subject !== "All" && t.subject !== subject) return false;
    if (chapterFilter !== "All" && t.chapter.toLowerCase() !== chapterFilter.toLowerCase()) return false;
    return true;
  });

  // Fallback to subject level templates if specific chapter has none
  if (matchingTemplates.length === 0) {
    matchingTemplates = PROCEDURAL_TEMPLATES.filter((t) => {
      if (subject !== "All" && t.subject !== subject) return false;
      return true;
    });
  }

  const templatesToUse = matchingTemplates.length > 0 ? matchingTemplates : PROCEDURAL_TEMPLATES;
  const questions: Question[] = [];

  let attempts = 0;
  let templateIndex = 0;

  while (questions.length < count && attempts < count * 50) {
    attempts++;
    const template = templatesToUse[templateIndex % templatesToUse.length];
    templateIndex++;

    const raw = template.generate(questions.length + 1 + attempts, exam);
    const sig = normalizeQuestionSignature(raw.questionText, raw.questionTextMr);

    if (!seenSignatures.has(sig)) {
      seenSignatures.add(sig);
      const q = buildFinalQuestion(raw, questions.length + 1, exam, template.subject);
      questions.push(q);
    }
  }

  return questions;
}

/**
 * Master Question Assembler for Guaranteed Non-Repeating Mock Tests
 * Assembles exact question counts from static pool and dynamic procedural generator
 * with STRICT ZERO DUPLICATES per test session.
 */
export function buildGuaranteedNonRepeatingMock(
  exam: ExamType,
  subject: SubjectType | "All",
  chapterFilter: string,
  targetCount: number,
  staticQuestions: Question[],
  existingSeenSignatures?: Set<string>
): Question[] {
  const seen = existingSeenSignatures || new Set<string>();
  const result: Question[] = [];

  // Deduplicate static questions first
  const cleanStatic = deduplicateQuestionsList(staticQuestions);

  // If subject === "All", distribute questions evenly across the exam subjects
  if (subject === "All") {
    const subjectsForExam: SubjectType[] =
      exam === "NEET"
        ? ["Biology", "Physics", "Chemistry"]
        : exam === "JEE_MAIN"
        ? ["Physics", "Chemistry", "Mathematics"]
        : ["Physics", "Chemistry", "Mathematics", "Biology"];

    // For NEET: 50% Biology (90 Q), 25% Physics (45 Q), 25% Chemistry (45 Q)
    if (exam === "NEET") {
      const bioCount = Math.round(targetCount * 0.5);
      const phyCount = Math.round(targetCount * 0.25);
      const chemCount = targetCount - bioCount - phyCount;

      const bioQs = buildGuaranteedNonRepeatingMock(exam, "Biology", chapterFilter, bioCount, cleanStatic, seen);
      const phyQs = buildGuaranteedNonRepeatingMock(exam, "Physics", chapterFilter, phyCount, cleanStatic, seen);
      const chemQs = buildGuaranteedNonRepeatingMock(exam, "Chemistry", chapterFilter, chemCount, cleanStatic, seen);

      result.push(...bioQs, ...phyQs, ...chemQs);
      return shuffleArray(result);
    }

    const perSubjectCount = Math.floor(targetCount / subjectsForExam.length);
    const remainder = targetCount % subjectsForExam.length;

    subjectsForExam.forEach((sub, subIdx) => {
      const countForSub = perSubjectCount + (subIdx < remainder ? 1 : 0);
      if (countForSub <= 0) return;

      const subQuestions = buildGuaranteedNonRepeatingMock(
        exam,
        sub,
        chapterFilter,
        countForSub,
        cleanStatic,
        seen
      );
      result.push(...subQuestions);
    });

    return shuffleArray(result);
  }

  // Safety check: NEET never has Mathematics
  if (exam === "NEET" && subject === "Mathematics") {
    return [];
  }

  // Helper to score how well a question matches the target exam
  const scoreExamRelevance = (q: Question): number => {
    let score = 0;
    if (q.exam === exam) score += 10;
    if (exam === "NEET") {
      if (q.pyqYear && q.pyqYear.toLowerCase().includes("neet")) score += 20;
      if (q.id && q.id.toLowerCase().includes("neet")) score += 15;
    } else if (exam === "MHT_CET") {
      if (q.pyqYear && q.pyqYear.toLowerCase().includes("cet")) score += 20;
      if (q.id && q.id.toLowerCase().includes("cet")) score += 15;
    } else if (exam === "JEE_MAIN") {
      if (q.pyqYear && q.pyqYear.toLowerCase().includes("jee")) score += 20;
      if (q.id && q.id.toLowerCase().includes("jee")) score += 15;
    }
    return score;
  };

  // 1. Tier 1: Exact Match (Subject + Chapter), prioritized by exact Exam match
  const tier1Pool = cleanStatic.filter((q) => {
    if (q.subject !== subject) return false;
    if (chapterFilter !== "All" && q.chapter.toLowerCase() !== chapterFilter.toLowerCase()) return false;
    return true;
  }).sort((a, b) => scoreExamRelevance(b) - scoreExamRelevance(a));

  for (const q of tier1Pool) {
    if (result.length >= targetCount) break;
    const sig = normalizeQuestionSignature(q.questionText, q.questionTextMr);
    if (!seen.has(sig)) {
      seen.add(sig);
      result.push(q);
    }
  }

  // 2. Tier 2: If chapterFilter was specific but pool was exhausted, pull related questions from the SAME subject prioritized by Exam
  if (result.length < targetCount && chapterFilter !== "All") {
    const tier2SubjectPool = cleanStatic
      .filter((q) => q.subject === subject)
      .sort((a, b) => scoreExamRelevance(b) - scoreExamRelevance(a));

    for (const q of tier2SubjectPool) {
      if (result.length >= targetCount) break;
      const sig = normalizeQuestionSignature(q.questionText, q.questionTextMr);
      if (!seen.has(sig)) {
        seen.add(sig);
        result.push(q);
      }
    }
  }

  // 3. Tier 3: If still need questions, generate procedural questions with strict duplicate prevention
  const deficit = targetCount - result.length;
  if (deficit > 0) {
    const procedural = generateProceduralQuestions(
      exam,
      subject,
      deficit,
      chapterFilter,
      seen
    );
    for (const pq of procedural) {
      if (result.length >= targetCount) break;
      const sig = normalizeQuestionSignature(pq.questionText, pq.questionTextMr);
      if (!seen.has(sig)) {
        seen.add(sig);
        result.push(pq);
      }
    }
  }

  // 4. Final verification: ensure every question in result is strictly unique
  const finalCleanQuestions: Question[] = [];
  const finalSeen = new Set<string>();

  for (const q of result) {
    const sig = normalizeQuestionSignature(q.questionText, q.questionTextMr);
    if (!finalSeen.has(sig)) {
      finalSeen.add(sig);
      finalCleanQuestions.push(q);
    }
  }

  return shuffleArray(finalCleanQuestions);
}
