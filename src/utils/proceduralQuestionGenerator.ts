import { Question, ExamType, SubjectType, DifficultyLevel } from "../types";

export function generateProceduralQuestions(
  exam: ExamType,
  subject: SubjectType,
  count: number = 10,
  difficulty: DifficultyLevel = "Medium"
): Question[] {
  const generated: Question[] = [];
  const now = Date.now();

  const physicsTemplates = [
    {
      chapter: "Rotational Dynamics",
      chapterMr: "परिपत्रकीय व परिभ्रमण गती",
      gen: (i: number) => {
        const r = 2 + (i % 8);
        const m = 1 + (i % 5);
        const v = 10 + i * 2;
        const correctVal = ((m * v * v) / r).toFixed(1);
        const w1 = ((m * v) / r).toFixed(1);
        const w2 = ((m * v * v) / (2 * r)).toFixed(1);
        const w3 = ((m * v * v * 2) / r).toFixed(1);
        return {
          textEn: `A particle of mass ${m} kg is revolving in a circular path of radius ${r} m with a uniform speed of ${v} m/s. What is the centripetal force acting on it?`,
          textMr: `${m} kg वस्तुमानाचा कण ${r} m त्रिज्येच्या वर्तुळाकार मार्गावर ${v} m/s च्या स्थिर वेगाने फिरत आहे. त्यावर कार्यरत असणारे अभिकेंद्री बल (Centripetal Force) किती असेल?`,
          options: [`${correctVal} N`, `${w1} N`, `${w2} N`, `${w3} N`],
          optionsMr: [`${correctVal} N`, `${w1} N`, `${w2} N`, `${w3} N`],
          correct: 0,
          formula: "F = (m * v^2) / r",
          explanationEn: `Centripetal force is given by F = (m * v^2) / r = (${m} * ${v}^2) / ${r} = ${correctVal} N.`,
          explanationMr: `अभिकेंद्री बलाचे सूत्र: F = (m * v^2) / r = (${m} * ${v}^2) / ${r} = ${correctVal} N.`,
        };
      },
    },
    {
      chapter: "Current Electricity",
      chapterMr: "विद्युतधारा",
      gen: (i: number) => {
        const r1 = 3 + (i % 6);
        const r2 = 6 + (i % 6);
        const rEq = ((r1 * r2) / (r1 + r2)).toFixed(2);
        const w1 = (r1 + r2).toFixed(2);
        const w2 = (r1 * r2).toFixed(2);
        const w3 = ((r1 + r2) / 2).toFixed(2);
        return {
          textEn: `Two resistors of resistance ${r1} Ω and ${r2} Ω are connected in parallel. What is the equivalent resistance of the combination?`,
          textMr: `${r1} Ω आणि ${r2} Ω रोध असलेले दोन रोधक समांतर जोडणीत (Parallel Connection) जोडले आहेत. या जोडणीचा समतुल्य रोध किती असेल?`,
          options: [`${rEq} Ω`, `${w1} Ω`, `${w2} Ω`, `${w3} Ω`],
          optionsMr: [`${rEq} Ω`, `${w1} Ω`, `${w2} Ω`, `${w3} Ω`],
          correct: 0,
          formula: "1/R = 1/R1 + 1/R2 => R = (R1 * R2) / (R1 + R2)",
          explanationEn: `Parallel combination formula: R_eq = (R1 * R2) / (R1 + R2) = (${r1} * ${r2}) / (${r1} + ${r2}) = ${rEq} Ω.`,
          explanationMr: `समांतर जोडणी सूत्र: R_eq = (R1 * R2) / (R1 + R2) = (${r1} * ${r2}) / (${r1} + ${r2}) = ${rEq} Ω.`,
        };
      },
    },
  ];

  const chemistryTemplates = [
    {
      chapter: "Chemical Thermodynamics",
      chapterMr: "रासायनिक उष्मागतिकी",
      gen: (i: number) => {
        const q = 200 + i * 50;
        const w = 80 + i * 20;
        const du = q - w;
        return {
          textEn: `A system absorbs ${q} J of heat and performs ${w} J of work on the surroundings. The change in internal energy (ΔU) is:`,
          textMr: `एका प्रणालीने ${q} J उष्णता शोषून घेतली आणि सभोवतालच्या वातावरणावर ${w} J कार्य केले. तर अंतर्गत ऊर्जेतील बदल (ΔU) किती असेल?`,
          options: [`+${du} J`, `+${q + w} J`, `-${du} J`, `-${q + w} J`],
          optionsMr: [`+${du} J`, `+${q + w} J`, `-${du} J`, `-${q + w} J`],
          correct: 0,
          formula: "ΔU = q + w (by IUPAC convention, w is negative for work done by system)",
          explanationEn: `First Law of Thermodynamics: ΔU = q - w = ${q} - ${w} = +${du} J.`,
          explanationMr: `उष्मागतिकीचा पहिला नियम: ΔU = q - w = ${q} - ${w} = +${du} J.`,
        };
      },
    },
    {
      chapter: "Solutions",
      chapterMr: "द्रावणे",
      gen: (i: number) => {
        const mol = (0.5 + (i % 4) * 0.5).toFixed(1);
        const vol = 2;
        const molarity = (parseFloat(mol) / vol).toFixed(2);
        return {
          textEn: `What is the molarity of a solution containing ${mol} moles of solute dissolved in ${vol} L of solution?`,
          textMr: `${vol} L द्रावणात ${mol} मोल्स विद्राव्य विरघळलेले असल्यास द्रावणाची मोलॅरिटी (Molarity) किती असेल?`,
          options: [`${molarity} M`, `${(parseFloat(mol) * vol).toFixed(2)} M`, `${(parseFloat(mol) + vol).toFixed(2)} M`, `0.10 M`],
          optionsMr: [`${molarity} M`, `${(parseFloat(mol) * vol).toFixed(2)} M`, `${(parseFloat(mol) + vol).toFixed(2)} M`, `0.10 M`],
          correct: 0,
          formula: "M = n / V (L)",
          explanationEn: `Molarity = Moles of solute / Volume in L = ${mol} / ${vol} = ${molarity} M.`,
          explanationMr: `मोलॅरिटी = मोल्स / आकारमान (L) = ${mol} / ${vol} = ${molarity} M.`,
        };
      },
    },
  ];

  const mathTemplates = [
    {
      chapter: "Matrices",
      chapterMr: "मॅट्रिसेस",
      gen: (i: number) => {
        const a = 2 + (i % 4);
        const b = 3 + (i % 3);
        const c = 1 + (i % 5);
        const d = 4 + (i % 4);
        const det = a * d - b * c;
        return {
          textEn: `Find the determinant of matrix A = [[${a}, ${b}], [${c}, ${d}]]:`,
          textMr: `मॅट्रिक्स A = [[${a}, ${b}], [${c}, ${d}]] चा निश्चयक (Determinant) शोधा:`,
          options: [`${det}`, `${det + 2}`, `${det - 3}`, `${a * d + b * c}`],
          optionsMr: [`${det}`, `${det + 2}`, `${det - 3}`, `${a * d + b * c}`],
          correct: 0,
          formula: "|A| = ad - bc",
          explanationEn: `|A| = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}.`,
          explanationMr: `|A| = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}.`,
        };
      },
    },
  ];

  const bioTemplates = [
    {
      chapter: "Reproduction in Lower and Higher Plants",
      chapterMr: "वनस्पतींमधील प्रजनन",
      gen: (i: number) => {
        return {
          textEn: `The transfer of pollen grains from the anther to the stigma of the same flower is known as:`,
          textMr: `परागकण परागकोशातून त्याच फुलाच्या कुक्षीवर स्थानांतरित होण्याच्या प्रक्रियेस काय म्हणतात?`,
          options: ["Autogamy (स्वयुग्मन)", "Geitonogamy (सजातीय परागण)", "Xenogamy (परपरागण)", "Apomixis (अपसंयोग)"],
          optionsMr: ["Autogamy (स्वयुग्मन)", "Geitonogamy (सजातीय परागण)", "Xenogamy (परपरागण)", "Apomixis (अपसंयोग)"],
          correct: 0,
          formula: "Self-pollination within the same flower = Autogamy",
          explanationEn: `Autogamy is the type of self-pollination in which pollen transfer occurs within the same flower.`,
          explanationMr: `स्वयुग्मन (Autogamy) मध्ये परागकण त्याच फुलाच्या परागकोशातून कुक्षीवर पडतात.`,
        };
      },
    },
  ];

  const templates =
    subject === "Physics"
      ? physicsTemplates
      : subject === "Chemistry"
      ? chemistryTemplates
      : subject === "Mathematics"
      ? mathTemplates
      : bioTemplates;

  for (let i = 0; i < count; i++) {
    const tIndex = i % templates.length;
    const t = templates[tIndex];
    const data = t.gen(i + 1);

    generated.push({
      id: `auto_${subject.toLowerCase()}_${now}_${i + 1}`,
      exam,
      subject,
      chapter: t.chapter,
      topic: `${t.chapter} Practice Set`,
      difficulty,
      questionText: data.textEn,
      questionTextMr: data.textMr,
      options: [data.options[0], data.options[1], data.options[2], data.options[3]] as [string, string, string, string],
      optionsMr: [data.optionsMr[0], data.optionsMr[1], data.optionsMr[2], data.optionsMr[3]] as [string, string, string, string],
      correctOption: data.correct,
      explanation: data.explanationEn,
      explanationMr: data.explanationMr,
      formula: data.formula,
      isCustom: true,
      isAiGenerated: true,
    });
  }

  return generated;
}
