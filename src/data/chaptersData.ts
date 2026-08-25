import { ExamType, SubjectType } from "../types";

export interface ChapterInfo {
  name: string;
  nameMr: string;
  subject: SubjectType;
  exams: ExamType[];
  weightage: "High" | "Medium" | "Low";
  questionCountEstimate?: number;
}

export const CHAPTERS_DATA: ChapterInfo[] = [
  // PHYSICS
  {
    name: "Rotational Dynamics",
    nameMr: "परिपत्रक गती आणि परिभ्रमण गती (Rotational Dynamics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Thermodynamics & Kinetic Theory",
    nameMr: "उष्णतागतिकी आणि वायूंचा गतिज सिद्धांत (Thermodynamics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Electrostatics & Current Electricity",
    nameMr: "स्थितिक विद्युत आणि विद्युतधारा (Electrostatics & Current)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Optics (Ray & Wave Optics)",
    nameMr: "प्रकाशशास्त्र (Ray & Wave Optics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Electromagnetic Induction & AC",
    nameMr: "विद्युतचुंबकीय प्रवर्तन आणि प्रत्यावर्ती धारा (EMI & AC)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Modern Physics & Dual Nature",
    nameMr: "आधुनिक भौतिकशास्त्र आणि अणू-केंद्रक (Modern Physics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Oscillations & Waves",
    nameMr: "दोलने आणि ध्वनी लहरी (Oscillations & Waves)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Gravitation & Laws of Motion",
    nameMr: "गुरुत्वाकर्षण आणि गतीचे नियम (Gravitation & Laws)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },

  // CHEMISTRY
  {
    name: "Chemical Bonding & Molecular Structure",
    nameMr: "रासायनिक बंध आणि आण्विक रचना (Chemical Bonding)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
    nameMr: "अल्डीहाइड्स, कीटोन्स आणि कार्बोक्झिलिक ऍसिड (Carbonyl Compounds)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Solutions & Colligative Properties",
    nameMr: "द्रावणे आणि संलग्न गुणधर्म (Solutions)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Electrochemistry & Chemical Kinetics",
    nameMr: "विद्युत रसायन आणि रासायनिक गतीशास्त्र (Electrochemistry & Kinetics)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "p-Block & d & f-Block Elements",
    nameMr: "p-ब्लॉक, d आणि f-ब्लॉक मूलद्रव्ये (Inorganic Blocks)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Thermodynamics & Equilibrium",
    nameMr: "रासायनिक समतोल आणि उष्मागतिकी (Equilibrium & Thermo)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Coordination Compounds",
    nameMr: "समन्वय संयुगे (Coordination Compounds)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },

  // MATHEMATICS (JEE / MHT-CET)
  {
    name: "Calculus (Differentiation & Integration)",
    nameMr: "कलनशास्त्र: अवकलन व संकलन (Calculus)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Vectors & 3D Geometry",
    nameMr: "सदिश आणि त्रिमितीय भूमिती (Vectors & 3D Geometry)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Matrices & Determinants",
    nameMr: "मॅट्रिसेस आणि निश्चयके (Matrices & Determinants)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Trigonometric Functions & Inverse Trig",
    nameMr: "त्रिकोणमितीय फले व व्यस्त त्रिकोणमिती (Trigonometry)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Probability & Binomial Distribution",
    nameMr: "संभाव्यता आणि द्विपद वितरण (Probability)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Differential Equations & Applications",
    nameMr: "अवकल समीकरणे आणि उपयोजने (Differential Equations)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Coordinate Geometry: Lines & Conics",
    nameMr: "निर्देशक भूमिती: वर्तुळ, परवलय, लंबवर्तुळ (Conic Sections)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    weightage: "High",
  },

  // BIOLOGY (NEET / MHT-CET)
  {
    name: "Human Physiology (Circulation, Digestion, Neural Control)",
    nameMr: "मानवी शरीरक्रियाशास्त्र (Human Physiology)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Genetics & Principles of Inheritance",
    nameMr: "जनुकशास्त्र आणि आनुवंशिकतेची तत्त्वे (Genetics & Evolution)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Plant Physiology (Photosynthesis, Respiration)",
    nameMr: "वनस्पती शरीरक्रियाशास्त्र: प्रकाशसंश्लेषण आणि श्वसन (Plant Physiology)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Cell Structure and Cell Division",
    nameMr: "पेशी रचना आणि पेशी विभाजन (Cell Biology & Cell Cycle)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Biotechnology: Principles & Processes",
    nameMr: "जैवतंत्रज्ञान: तत्त्वे आणि प्रक्रिया (Biotechnology)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "Medium",
  },
  {
    name: "Reproduction in Organisms & Humans",
    nameMr: "सजीवांमधील आणि मानवातील प्रजनन (Reproduction)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "High",
  },
  {
    name: "Ecology & Environmental Issues",
    nameMr: "पर्यावरणशास्त्र आणि परिसंस्था (Ecology)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    weightage: "Medium",
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
      description: "+4 for Correct, -1 for Wrong",
      descriptionMr: "+४ बरोबर उत्तरासाठी, -१ चुकीच्या उत्तरासाठी",
    };
  } else {
    // MHT-CET
    if (subject === "Mathematics") {
      return {
        correctMarks: 2,
        negativeMarks: 0,
        unattemptedMarks: 0,
        description: "+2 for Correct, No Negative Marking",
        descriptionMr: "+२ बरोबर उत्तरासाठी, निगेटिव्ह मार्किंग नाही",
      };
    } else {
      return {
        correctMarks: 1,
        negativeMarks: 0,
        unattemptedMarks: 0,
        description: "+1 for Correct, No Negative Marking",
        descriptionMr: "+१ बरोबर उत्तरासाठी, निगेटिव्ह मार्किंग नाही",
      };
    }
  }
}
