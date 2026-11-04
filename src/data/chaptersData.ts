import { ExamType, SubjectType } from "../types";

export interface ChapterInfo {
  name: string;
  subject: SubjectType;
  exams: ExamType[];
  weightage: "High" | "Medium" | "Low";
  questionCountEstimate?: number;
}

export const CHAPTERS_DATA: ChapterInfo[] = [
  // PHYSICS
  {
    name: "Rotational Dynamics",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Thermodynamics & Kinetic Theory",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Electrostatics & Current Electricity",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Optics (Ray & Wave Optics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Electromagnetic Induction & AC",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Modern Physics & Dual Nature",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Oscillations & Waves",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Gravitation & Laws of Motion",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Mechanical Properties of Fluids",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Current Electricity & Measurement Instruments",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Structure of Atoms and Nuclei",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Wave Optics & Superposition of Waves",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Magnetic Effects of Electric Current & Magnetism",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Semiconductor Electronics & Logic Gates",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },

  // CHEMISTRY
  {
    name: "Chemical Bonding & Molecular Structure",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Solid State",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Solutions & Colligative Properties",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Ionic Equilibria",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Electrochemistry & Chemical Kinetics",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Halogen Derivatives",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Alcohols, Phenols and Ethers",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Amines & Nitrogen Containing Compounds",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Biomolecules",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "p-Block & d & f-Block Elements",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Thermodynamics & Equilibrium",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Coordination Compounds",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },

  // MATHEMATICS (JEE / MHT-CET)
  {
    name: "Mathematical Logic",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Matrices & Determinants",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Trigonometric Functions & Inverse Trig",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Pair of Straight Lines",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Vectors & 3D Geometry",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Linear Programming Problems (LPP)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Differentiation & Applications of Derivatives",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Indefinite & Definite Integration & Area",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Differential Equations & Applications",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Probability & Binomial Distribution",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Coordinate Geometry: Lines & Conics",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Calculus (Differentiation & Integration)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High"
  },

  // BIOLOGY (NEET / MHT-CET)
  {
    name: "Reproduction in Lower and Higher Plants",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Human Reproduction & Reproductive Health",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Respiration and Energy Transfer",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Control and Coordination",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Human Health and Diseases",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Molecular Basis of Inheritance",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Human Physiology (Circulation, Digestion, Neural Control)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Genetics & Principles of Inheritance",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Plant Physiology (Photosynthesis, Respiration)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Cell Structure and Cell Division",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Biotechnology: Principles & Processes",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "Medium"
  },
  {
    name: "Reproduction in Organisms & Humans",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High"
  },
  {
    name: "Ecology & Environmental Issues",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "Medium"
  },
];

export function getSubjectsForExam(exam: ExamType): SubjectType[] {
  switch (exam) {
    case "NEET":
      return ["Physics", "Chemistry", "Biology"];
    case "JEE_MAIN":
      return ["Physics", "Chemistry", "Mathematics"];
    case "MHT_CET":
      return ["Physics", "Chemistry", "Mathematics", "Biology"];
    default:
      return ["Physics", "Chemistry", "Mathematics", "Biology"];
  }
}

export function getApplicableExamsForSubject(subject: SubjectType): ExamType[] {
  switch (subject) {
    case "Physics":
    case "Chemistry":
      return ["NEET", "JEE_MAIN", "MHT_CET"];
    case "Mathematics":
      return ["JEE_MAIN", "MHT_CET"];
    case "Biology":
      return ["NEET", "MHT_CET"];
    default:
      return ["NEET", "JEE_MAIN", "MHT_CET"];
  }
}

export function getMarkingScheme(exam: ExamType, subject: SubjectType) {
  if (exam === "NEET" || exam === "JEE_MAIN") {
    return {
      correctMarks: 4,
      negativeMarks: -1,
      unattemptedMarks: 0,
      description: "+4 for Correct, -1 for Wrong"
    };
  } else {
    // MHT-CET
    if (subject === "Mathematics") {
      return {
        correctMarks: 2,
        negativeMarks: 0,
        unattemptedMarks: 0,
        description: "+2 for Correct, No Negative Marking"
      };
    } else {
      return {
        correctMarks: 1,
        negativeMarks: 0,
        unattemptedMarks: 0,
        description: "+1 for Correct, No Negative Marking"
      };
    }
  }
}
