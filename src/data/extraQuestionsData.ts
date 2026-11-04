import { Question } from "../types";

export const EXTRA_QUESTIONS: Question[] = [
  // ==========================================
  // PHYSICS (MHT-CET / NEET / JEE MAIN)
  // ==========================================
  {
    id: "phy_ext_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Banking of Roads without Friction",
    difficulty: "Easy",
    questionText: "The optimum speed (most safe speed) of a vehicle on a banked road of radius r and angle of banking θ without relying on friction is:",
    options: ["v = √(r g tan θ)", "v = √(r g cot θ)", "v = √(r g sin θ)", "v = √(r g cos θ)"],
    correctOption: 0,
    formula: "tan θ = v² / (r g) => v = √(r g tan θ)",
    explanation: "For a vehicle negotiating a banked curve without slipping or relying on friction, the horizontal component of normal reaction provides centripetal force: N sin θ = m v² / r and N cos θ = m g. Dividing gives tan θ = v² / (r g), so v = √(r g tan θ).",
    pyqYear: "MHT-CET 2022"
  },
  {
    id: "phy_ext_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Carnot Engine Efficiency",
    difficulty: "Medium",
    questionText: "A Carnot engine operates between source temperature 500 K and sink temperature 300 K. If it absorbs 1000 J of heat from the source, the work done per cycle is:",
    options: ["400 J", "600 J", "500 J", "200 J"],
    correctOption: 0,
    formula: "η = 1 - T2/T1 = W / Q1 => W = Q1 × (1 - T2/T1)",
    explanation: "Efficiency of Carnot engine η = 1 - (T_sink / T_source) = 1 - (300 / 500) = 1 - 0.6 = 0.4 (40%). Work done W = η × Q_source = 0.4 × 1000 J = 400 J.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "phy_ext_03",
    exam: "NEET",
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Simple Pendulum in Accelerating Lift",
    difficulty: "Medium",
    questionText: "A simple pendulum has time period T in a stationary lift. If the lift accelerates upwards with acceleration a = g/3, the new time period T' will be:",
    options: ["(√3 / 2) T", "(2 / √3) T", "T / 2", "2 T"],
    correctOption: 0,
    formula: "T = 2π √(L / g_eff); when accelerating upward g_eff = g + a = g + g/3 = 4g/3",
    explanation: "Effective gravity inside upward accelerating lift is g_eff = g + g/3 = 4g/3. New time period T' = 2π √(L / (4g/3)) = √(3/4) × 2π√(L/g) = (√3 / 2) T.",
    pyqYear: "NEET 2021"
  },
  {
    id: "phy_ext_04",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "de-Broglie Wavelength of Electron",
    difficulty: "Easy",
    questionText: "An electron is accelerated through a potential difference of V volts. Its de-Broglie wavelength is approximately given by:",
    options: ["λ = 12.27 / √V Å", "λ = 1.227 / √V Å", "λ = 0.286 / √V Å", "λ = 122.7 / √V Å"],
    correctOption: 0,
    formula: "λ = h / √(2 m e V) = 12.27 / √V Å (where 1 Å = 10⁻¹⁰ m)",
    explanation: "Using λ = h / p = h / √(2 m E) where E = e V. Substituting constants h, m_e, and e yields λ = 1.227 / √V nm = 12.27 / √V Å.",
    pyqYear: "JEE Main 2022"
  },
  {
    id: "phy_ext_05",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Meter Bridge Wire Balancing",
    difficulty: "Easy",
    questionText: "In a Meter Bridge experiment, null point is obtained at 40 cm from the left end when unknown resistance X is in left gap and resistance 12 Ω is in right gap. The value of X is:",
    options: ["8 Ω", "18 Ω", "6 Ω", "16 Ω"],
    correctOption: 0,
    formula: "X / R = l_X / (100 - l_X) => X = 12 × (40 / 60) = 8 Ω",
    explanation: "Using Wheatstone bridge principle for meter bridge: X / R = l_x / (100 - l_x). X / 12 = 40 / 60 = 2 / 3. X = 12 × (2/3) = 8 Ω.",
    pyqYear: "MHT-CET 2021"
  },

  // ==========================================
  // CHEMISTRY (MHT-CET / NEET / JEE MAIN)
  // ==========================================
  {
    id: "chem_ext_01",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Elevation in Boiling Point",
    difficulty: "Medium",
    questionText: "Molal elevation constant (Kb) for water is 0.52 K kg mol⁻¹. The boiling point elevation of 0.1 molal aqueous solution of glucose is:",
    options: ["0.052 K", "0.52 K", "1.04 K", "0.026 K"],
    correctOption: 0,
    formula: "ΔTb = i × Kb × m (for non-electrolyte glucose, i = 1)",
    explanation: "For a non-electrolyte like glucose, Van't Hoff factor i = 1. Boiling point elevation ΔTb = Kb × m = 0.52 × 0.1 = 0.052 K.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "chem_ext_02",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "Faraday's First Law of Electrolysis",
    difficulty: "Medium",
    questionText: "How much charge in Faradays is required for the reduction of 1 mole of Al³⁺ to Al metal?",
    options: ["3 F", "1 F", "2 F", "6 F"],
    correctOption: 0,
    formula: "Al³⁺ + 3e⁻ -> Al => 3 moles of electrons = 3 Faradays",
    explanation: "The electrode reaction is: Al³⁺ + 3 e⁻ -> Al(s). For reduction of 1 mole of Al³⁺, 3 moles of electrons are required, which is equivalent to 3 Faradays (3 × 96500 C).",
    pyqYear: "NEET 2022"
  },
  {
    id: "chem_ext_03",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Coordination Compounds & d-Block",
    topic: "Spin-only Magnetic Moment of Complexes",
    difficulty: "Medium",
    questionText: "The spin-only magnetic moment of [Fe(H2O)6]²⁺ (atomic number of Fe = 26) is:",
    options: ["4.90 BM", "5.92 BM", "2.83 BM", "0.00 BM"],
    correctOption: 0,
    formula: "μ = √(n(n + 2)) BM; Fe²⁺ (d⁶) with weak field H2O has n = 4 unpaired electrons",
    explanation: "Fe²⁺ has configuration [Ar] 3d⁶. Since H2O is a weak field ligand, pairing does not occur (t2g⁴ eg²), so number of unpaired electrons n = 4. Magnetic moment μ = √(4(4+2)) = √24 ≈ 4.90 BM.",
    pyqYear: "JEE Main 2023"
  },
  {
    id: "chem_ext_04",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
    topic: "Cannizzaro Reaction Condition",
    difficulty: "Easy",
    questionText: "Which of the following compounds undergoes Cannizzaro reaction on treatment with 50% concentrated NaOH?",
    options: ["Benzaldehyde (C6H5CHO)", "Acetaldehyde (CH3CHO)", "Acetone (CH3COCH3)", "Propanal (CH3CH2CHO)"],
    correctOption: 0,
    formula: "Aldehydes lacking α-hydrogen undergo disproportionation: 2 C6H5CHO + NaOH -> C6H5COONa + C6H5CH2OH",
    explanation: "Cannizzaro reaction is given by aldehydes having NO alpha-hydrogen atoms. Benzaldehyde (C6H5CHO) and Formaldehyde (HCHO) lack α-hydrogens, undergoing self-redox to alcohol and carboxylate salt.",
    pyqYear: "MHT-CET 2023"
  },

  // ==========================================
  // MATHEMATICS (MHT-CET / JEE MAIN)
  // ==========================================
  {
    id: "math_ext_01",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Dot Product & Angle Between Vectors",
    difficulty: "Easy",
    questionText: "If vectors a = 2i + 2j - k and b = 6i - 3j + 2k, the cosine of the angle between them (cos θ) is:",
    options: ["4 / 21", "2 / 7", "5 / 21", "1 / 7"],
    correctOption: 0,
    formula: "cos θ = (a · b) / (|a| |b|)",
    explanation: "Dot product a · b = (2)(6) + (2)(-3) + (-1)(2) = 12 - 6 - 2 = 4. Magnitude |a| = √(4 + 4 + 1) = 3. Magnitude |b| = √(36 + 9 + 4) = 7. Thus cos θ = 4 / (3 × 7) = 4 / 21.",
    pyqYear: "MHT-CET 2022"
  },
  {
    id: "math_ext_02",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Mathematical Logic",
    topic: "Dual of a Statement Pattern",
    difficulty: "Easy",
    questionText: "The dual of the compound statement (p ∧ q) ∨ (r ∧ s) is:",
    options: [
      "(p ∨ q) ∧ (r ∨ s)",
      "(~p ∨ ~q) ∧ (~r ∨ ~s)",
      "(p ∧ q) ∧ (r ∧ s)",
      "(~p ∧ ~q) ∨ (~r ∧ ~s)",
    ],
    correctOption: 0,
    formula: "To find dual: Replace ∧ with ∨, replace ∨ with ∧, replace T with c, and c with T",
    explanation: "The dual of a proposition is obtained by replacing each '∧' with '∨' and each '∨' with '∧' without changing the logical state of propositional variables. Thus, dual is (p ∨ q) ∧ (r ∨ s).",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "math_ext_03",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Definite Integration & Areas",
    topic: "Definite Integral of Odd Functions",
    difficulty: "Easy",
    questionText: "The value of the definite integral ∫_{-π/2}^{π/2} (x³ + x cos x + sin⁵ x + 1) dx is:",
    options: ["π", "0", "2π", "1"],
    correctOption: 0,
    formula: "For odd function f(-x) = -f(x), ∫_{-a}^{a} f(x) dx = 0",
    explanation: "x³, x cos x, and sin⁵ x are all odd functions, so their integrals from -π/2 to π/2 are 0. The remaining constant term ∫_{-π/2}^{π/2} 1 dx = [x]_{-π/2}^{π/2} = π/2 - (-π/2) = π.",
    pyqYear: "JEE Main 2021"
  },

  // ==========================================
  // BIOLOGY (NEET / MHT-CET)
  // ==========================================
  {
    id: "bio_ext_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Cell: Structure & Function",
    topic: "Organelle Responsible for Protein Synthesis",
    difficulty: "Easy",
    questionText: "Which cellular organelle is called the 'protein factory' of the eukaryotic cell?",
    options: ["Ribosome", "Lysosome", "Golgi Body", "Vacuole"],
    correctOption: 0,
    formula: "70S (prokaryotes) & 80S (eukaryotes) ribosomes perform translation of mRNA to protein",
    explanation: "Ribosomes are non-membrane bound dense ribonucleoprotein particles responsible for assembling amino acids into polypeptides during mRNA translation.",
    pyqYear: "NEET 2023"
  },
  {
    id: "bio_ext_02",
    exam: "NEET",
    subject: "Biology",
    chapter: "Human Physiology: Circulation & Respiration",
    topic: "Cardiac Cycle & Pacemaker of Heart",
    difficulty: "Easy",
    questionText: "The natural pacemaker of the human heart that initiates action potentials at the highest frequency is:",
    options: [
      "Sinoatrial Node (SA Node)",
      "Atrioventricular Node (AV Node)",
      "Bundle of His",
      "Purkinje Fibres",
    ],
    correctOption: 0,
    formula: "SA Node generates ~70-75 action potentials/min, pacing cardiac rhythm",
    explanation: "The SA (Sinoatrial) node located in right atrium wall generates rhythmic impulses at 70-75 bpm and initiates the cardiac contraction cycle, earning the title of heart's pacemaker.",
    pyqYear: "NEET 2022"
  },
];
