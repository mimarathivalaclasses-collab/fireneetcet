import { Question } from "../types";
import { PYQ_QUESTIONS } from "./pyqQuestionsData";
import { EXTRA_QUESTIONS } from "./extraQuestionsData";
import { TARGET_TRIUMPH_PHYSICS_QUESTIONS } from "./targetTriumphPhysicsData";
import { NEET_180_FULL_QUESTIONS } from "./neetFullMock180Questions";
import { SPECIAL_1_QUESTIONS } from "./special1MockQuestions";

const BASE_QUESTIONS: Question[] = [
  // ==========================================
  // NET / CET / JEE SPECIAL MOCK QUESTIONS
  // ==========================================
  {
    id: "net_cet_jee_q1",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Units, Measurements & Dimensions",
    topic: "SI Units & Dimensions",
    difficulty: "Easy",
    questionText: "Which of the following is an SI unit of a physical quantity?",
    options: [
      "Joule",
      "Meter/second",
      "Newton",
      "All of the above",
    ],
    correctOption: 3,
    formula: "SI Units: Fundamental (m, kg, s) & Derived (J = N·m, N = kg·m/s², m/s)",
    explanation: "Joule (Unit of Energy/Work), Meter/second (Unit of Velocity), and Newton (Unit of Force) are all standard SI units (fundamental or derived) of physical quantities. Hence, all of the above is the correct choice.",
    pyqYear: "MHT-CET / NEET Special"
  },
  {
    id: "net_cet_jee_q2",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "Factors Affecting Reaction Rate",
    difficulty: "Easy",
    questionText: "The rate of a chemical reaction depends upon which of the following factors?",
    options: [
      "Temperature",
      "Pressure",
      "Concentration of Reactants",
      "All of the above",
    ],
    correctOption: 3,
    formula: "Rate = k [A]^x [B]^y, k = A e^(-Ea/RT)",
    explanation: "The rate of a chemical reaction is influenced by temperature (Arrhenius equation), pressure (for gaseous reactants), concentration of reactants, and catalyst surface area. Therefore, it depends on all of the above.",
    pyqYear: "CET / JEE Practice"
  },
  {
    id: "net_cet_jee_q3",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Mathematical Reasoning & General Aptitude",
    topic: "National Eligibility Test Scheme",
    difficulty: "Easy",
    questionText: "How many total questions are there in Paper-1 of the UGC NET / SET examination?",
    options: [
      "50",
      "100",
      "150",
      "75",
    ],
    correctOption: 0,
    formula: "Total Marks = 50 × 2 = 100 Marks (No negative marking)",
    explanation: "In the UGC NET / SET examination, Paper-1 (General Paper on Teaching and Research Aptitude) contains exactly 50 mandatory multiple-choice questions carrying 2 marks each (Total 100 Marks).",
    pyqYear: "UGC NET / SET Paper 1"
  },
  {
    id: "net_cet_jee_q4",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Mathematical Reasoning & General Aptitude",
    topic: "JEE Main Exam Pattern",
    difficulty: "Easy",
    questionText: "How many questions are to be attempted in Mathematics in the JEE Main examination?",
    options: [
      "25",
      "30",
      "20",
      "50",
    ],
    correctOption: 0,
    formula: "JEE Main Pattern: 20 Section A MCQs + 5 Section B NVQs = 25 Questions (100 Marks)",
    explanation: "In the JEE Main examination, Mathematics comprises 25 questions to be answered (20 multiple choice questions in Section A + 5 numerical answer type questions out of 10 in Section B), accounting for 100 marks.",
    pyqYear: "NTA JEE Main Pattern"
  },
  {
    id: "net_cet_jee_q5",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "MHT-CET Marking Pattern",
    difficulty: "Easy",
    questionText: "How many total marks are allotted to Physics in the Maharashtra MHT-CET examination?",
    options: [
      "50",
      "100",
      "40",
      "60",
    ],
    correctOption: 0,
    formula: "MHT-CET Paper 1: Physics 50 Questions (50 Marks) + Chemistry 50 Questions (50 Marks) = 100 Marks",
    explanation: "In Maharashtra MHT-CET, Physics contains 50 questions of 1 mark each, making a total of 50 marks in Paper-1 (Physics + Chemistry = 100 marks).",
    pyqYear: "State CET Cell Maharashtra"
  },
  // ==========================================
  // PHYSICS (NEET / JEE / MHT-CET)
  // ==========================================
  {
    id: "phy_01",
    exam: "NEET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Moment of Inertia & Rolling",
    difficulty: "Medium",
    questionText: "A solid cylinder of mass M and radius R rolls down an inclined plane of inclination θ without slipping. The acceleration of the cylinder is:",
    options: [
      "g sin θ",
      "(2/3) g sin θ",
      "(1/2) g sin θ",
      "(3/4) g sin θ",
    ],
    correctOption: 1,
    formula: "a = (g sin θ) / (1 + I / (M R^2)) = (g sin θ) / (1 + k^2/R^2)",
    explanation: "For rolling without slipping on an inclined plane, acceleration a = (g sin θ) / (1 + I/(M R^2)). For a solid cylinder, moment of inertia about its axis is I = (1/2) M R^2. Therefore, 1 + I/(MR^2) = 1 + 1/2 = 3/2. So, a = (g sin θ) / (3/2) = (2/3) g sin θ.",
    pyqYear: "NEET 2022 / MHT-CET 2023"
  },
  {
    id: "phy_02",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Capacitance with Dielectrics",
    difficulty: "Hard",
    questionText: "A parallel plate capacitor with air between plates has a capacitance of 9 pF. The separation between its plates is 'd'. The space between the plates is now filled with two dielectrics. One dielectric has dielectric constant k1 = 3 and thickness d/3 while the other has dielectric constant k2 = 6 and thickness 2d/3. The new capacitance is:",
    options: [
      "40.5 pF",
      "20.25 pF",
      "27 pF",
      "18 pF",
    ],
    correctOption: 0,
    formula: "C_new = (ε0 A) / (t1/k1 + t2/k2)",
    explanation: "Capacitance with multiple slabs in series: C = ε0 A / [(d/3)/3 + (2d/3)/6] = ε0 A / [d/9 + d/9] = ε0 A / (2d/9) = (9/2) * (ε0 A / d). Since initial C0 = ε0 A / d = 9 pF, C_new = (9/2) * 9 pF = 81 / 2 = 40.5 pF.",
    pyqYear: "JEE Main 2021"
  },
  {
    id: "phy_03",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Young's Double Slit Experiment",
    difficulty: "Medium",
    questionText: "In a Young's double slit experiment, the fringe width is found to be 0.4 mm. If the whole apparatus is immersed in water of refractive index 4/3 without disturbing the geometrical arrangement, the new fringe width will be:",
    options: [
      "0.30 mm",
      "0.40 mm",
      "0.53 mm",
      "0.15 mm",
    ],
    correctOption: 0,
    formula: "β' = β / μ",
    explanation: "Fringe width β = λD / d. When immersed in a medium of refractive index μ, the wavelength becomes λ' = λ/μ. Thus, new fringe width β' = β / μ = 0.4 mm / (4/3) = 0.4 * 3 / 4 = 0.30 mm.",
    pyqYear: "MHT-CET 2022"
  },
  {
    id: "phy_04",
    exam: "NEET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Carnot Engine Efficiency",
    difficulty: "Easy",
    questionText: "An ideal Carnot engine works between temperature 500 K (source) and 300 K (sink). If it absorbs 1000 J of heat from the source in each cycle, the work done by the engine per cycle is:",
    options: [
      "400 J",
      "600 J",
      "300 J",
      "500 J",
    ],
    correctOption: 0,
    formula: "η = 1 - T2/T1 = W / Q1 => W = Q1 * (1 - T2/T1)",
    explanation: "Efficiency η = 1 - (T_sink / T_source) = 1 - (300/500) = 1 - 0.6 = 0.4 (or 40%). Work done W = η * Q1 = 0.4 * 1000 J = 400 J.",
    pyqYear: "NEET 2023"
  },
  {
    id: "phy_05",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Photoelectric Effect & de-Broglie",
    difficulty: "Medium",
    questionText: "The de-Broglie wavelength of an electron accelerated through a potential difference of V volts is λ. If the accelerating potential is increased to 4V, the new de-Broglie wavelength will be:",
    options: [
      "2 λ",
      "λ / 2",
      "4 λ",
      "λ / 4",
    ],
    correctOption: 1,
    formula: "λ = h / sqrt(2 m e V) ∝ 1 / sqrt(V)",
    explanation: "The de-Broglie wavelength of an electron is inversely proportional to the square root of the potential difference (λ ∝ 1/√V). When V becomes 4V, λ' = λ / √4 = λ / 2.",
    pyqYear: "JEE Main 2023"
  },

  // ==========================================
  // CHEMISTRY (NEET / JEE / MHT-CET)
  // ==========================================
  {
    id: "chem_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "Hybridisation & Molecular Geometry",
    difficulty: "Medium",
    questionText: "Which of the following molecules has a square planar shape according to VSEPR theory?",
    options: [
      "SF4",
      "XeF4",
      "CH4",
      "BF4^-",
    ],
    correctOption: 1,
    formula: "Steric number = Bond Pairs + Lone Pairs",
    explanation: "In XeF4, Xenon has 8 valence electrons. It forms 4 single bonds with F and has 2 lone pairs. Total electron pairs = 4 + 2 = 6 (sp3d2 hybridisation). The octahedral electron geometry with 2 lone pairs in trans positions gives a square planar molecular geometry.",
    pyqYear: "NEET 2023"
  },
  {
    id: "chem_02",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
    topic: "Aldol & Cannizzaro Reactions",
    difficulty: "Hard",
    questionText: "Which of the following compounds will undergo Cannizzaro reaction when treated with 50% concentrated NaOH solution?",
    options: [
      "Acetaldehyde (CH3CHO)",
      "Acetone (CH3COCH3)",
      "Benzaldehyde (C6H5CHO)",
      "Propionaldehyde (CH3CH2CHO)",
    ],
    correctOption: 2,
    formula: "Aldehydes with no α-hydrogen undergo disproportionation in conc. alkali",
    explanation: "The Cannizzaro reaction is given by aldehydes that lack an alpha-hydrogen (α-H) atom. Benzaldehyde (C6H5CHO) has no α-hydrogen on the carbonyl carbon and therefore undergoes disproportionation (redox) to form Benzyl alcohol and Sodium benzoate.",
    pyqYear: "JEE Main 2022"
  },
  {
    id: "chem_03",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Osmotic Pressure & Van't Hoff Factor",
    difficulty: "Medium",
    questionText: "Which of the following 0.1 M aqueous solutions will exhibit the highest boiling point elevation (ΔTb)?",
    options: [
      "0.1 M Glucose (C6H12O6)",
      "0.1 M NaCl",
      "0.1 M CaCl2",
      "0.1 M Al2(SO4)3",
    ],
    correctOption: 3,
    formula: "ΔTb = i * Kb * m (Higher Van't Hoff factor i gives higher ΔTb)",
    explanation: "Elevation in boiling point ΔTb = i * Kb * m. For non-electrolyte glucose, i = 1. For NaCl, i = 2 (Na+ + Cl-). For CaCl2, i = 3 (Ca2+ + 2Cl-). For Al2(SO4)3, i = 5 (2Al3+ + 3SO4^2-). Since Al2(SO4)3 gives 5 ions (highest i value), it produces the maximum elevation in boiling point.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "chem_04",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "First Order Kinetics Half Life",
    difficulty: "Easy",
    questionText: "A first order reaction has a rate constant of 6.93 x 10^-3 s^-1. How much time is required for 75% of the reaction to be completed?",
    options: [
      "100 s",
      "200 s",
      "300 s",
      "150 s",
    ],
    correctOption: 1,
    formula: "t_1/2 = 0.693 / k ; t_75% = 2 * t_1/2",
    explanation: "For first-order reaction: t_1/2 = 0.693 / k = 0.693 / (6.93 * 10^-3) = 100 s. Time required for 75% completion is equal to two half-lives (t_75% = 2 * t_1/2 = 2 * 100 s = 200 s).",
    pyqYear: "NEET 2021"
  },

  // ==========================================
  // MATHEMATICS (JEE / MHT-CET)
  // ==========================================
  {
    id: "math_01",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Calculus (Differentiation & Integration)",
    topic: "Definite Integrals & King's Property",
    difficulty: "Hard",
    questionText: "Evaluate the definite integral: I = ∫[0 to π/2] (sin^3 x) / (sin^3 x + cos^3 x) dx.",
    options: [
      "π / 2",
      "π / 4",
      "π",
      "1",
    ],
    correctOption: 1,
    formula: "King's Rule: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx",
    explanation: "By property ∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx: I = ∫[0 to π/2] (cos^3 x) / (cos^3 x + sin^3 x) dx. Adding both: 2I = ∫[0 to π/2] [(sin^3 x + cos^3 x) / (sin^3 x + cos^3 x)] dx = ∫[0 to π/2] 1 dx = [x][0 to π/2] = π/2. Therefore, I = π / 4.",
    pyqYear: "JEE Main 2023 / MHT-CET 2024"
  },
  {
    id: "math_02",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Adjoint and Inverse of Matrix",
    difficulty: "Medium",
    questionText: "If A is a square matrix of order 3 and |A| = 4, then the value of |adj(A)| is equal to:",
    options: [
      "4",
      "16",
      "64",
      "12",
    ],
    correctOption: 1,
    formula: "|adj(A)| = |A|^(n - 1)",
    explanation: "For any square matrix A of order n, the determinant of its adjoint is given by |adj(A)| = |A|^(n-1). Here n = 3 and |A| = 4. Thus, |adj(A)| = 4^(3 - 1) = 4^2 = 16.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "math_03",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Angle between two vectors",
    difficulty: "Medium",
    questionText: "If vectors a = 2i + 2j - k and b = 6i - 3j + 2k are two vectors, what is the value of the scalar dot product a · b?",
    options: [
      "4",
      "8",
      "12",
      "16",
    ],
    correctOption: 0,
    formula: "a · b = a1*b1 + a2*b2 + a3*b3",
    explanation: "Dot product a · b = (2)(6) + (2)(-3) + (-1)(2) = 12 - 6 - 2 = 4.",
    pyqYear: "JEE Main 2022"
  },
  {
    id: "math_04",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Probability & Binomial Distribution",
    topic: "Binomial Expectation & Variance",
    difficulty: "Easy",
    questionText: "A fair coin is tossed 10 times. The mean (expected value) of the number of heads obtained is:",
    options: [
      "2.5",
      "5",
      "10",
      "7.5",
    ],
    correctOption: 1,
    formula: "Mean = n * p, where p = 0.5",
    explanation: "In binomial distribution, Mean E(X) = n * p. Here n = 10 and probability of getting a head p = 1/2 = 0.5. Mean = 10 * 0.5 = 5.",
    pyqYear: "MHT-CET 2023"
  },

  // ==========================================
  // BIOLOGY (NEET / MHT-CET)
  // ==========================================
  {
    id: "bio_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Genetics & Principles of Inheritance",
    topic: "Mendelian Dihybrid Ratio",
    difficulty: "Medium",
    questionText: "In a Mendelian dihybrid cross involving round yellow seeds (RRYY) and wrinkled green seeds (rryy), what proportion of the F2 generation plants will be phenotypically round and yellow?",
    options: [
      "9 / 16",
      "3 / 16",
      "1 / 16",
      "7 / 16",
    ],
    correctOption: 0,
    formula: "Mendelian Dihybrid Phenotypic Ratio = 9 : 3 : 3 : 1",
    explanation: "The classical phenotypic ratio of a Mendelian dihybrid F2 generation is 9 (Round Yellow) : 3 (Round Green) : 3 (Wrinkled Yellow) : 1 (Wrinkled Green). Thus, the proportion of round and yellow offspring is 9/16.",
    pyqYear: "NEET 2023"
  },
  {
    id: "bio_02",
    exam: "NEET",
    subject: "Biology",
    chapter: "Human Physiology (Circulation, Digestion, Neural Control)",
    topic: "Cardiac Cycle & Pacemaker",
    difficulty: "Easy",
    questionText: "In the human heart, the natural pacemaker responsible for initiating the heartbeat rhythm is:",
    options: [
      "Atrioventricular Node (AV Node)",
      "Sinoatrial Node (SA Node)",
      "Purkinje Fibres",
      "Bundle of His",
    ],
    correctOption: 1,
    formula: "SA Node generates action potentials at ~70-75 beats/min",
    explanation: "The Sinoatrial node (SA node), located in the right upper corner of the right atrium, possesses intrinsic auto-rhythmicity and generates action potentials at the highest frequency (~70-75 times/min), making it the natural pacemaker of the heart.",
    pyqYear: "NEET 2022"
  },
  {
    id: "bio_03",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Plant Physiology (Photosynthesis, Respiration)",
    topic: "Light Reaction & ATP Synthesis",
    difficulty: "Medium",
    questionText: "During non-cyclic photophosphorylation in plants, the photolysis of water molecule occurs at:",
    options: [
      "Photosystem I (PS I)",
      "Photosystem II (PS II) on the inner side of thylakoid membrane",
      "Stroma matrix",
      "Outer chloroplast membrane",
    ],
    correctOption: 1,
    formula: "2 H2O -> 4 H+ + 4 e- + O2 (via Oxygen Evolving Complex of PS II)",
    explanation: "Photolysis of water (splitting of water into protons, electrons, and oxygen) is associated with the Oxygen Evolving Complex located on the inner side (lumen side) of the thylakoid membrane associated with Photosystem II (P680).",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "bio_04",
    exam: "NEET",
    subject: "Biology",
    chapter: "Cell Structure and Cell Division",
    topic: "Meiosis Prophase I Stages",
    difficulty: "Hard",
    questionText: "During which stage of Meiotic Prophase I does the process of 'crossing over' and chiasmata formation between non-sister chromatids take place?",
    options: [
      "Leptotene",
      "Zygotene",
      "Pachytene",
      "Diplotene",
    ],
    correctOption: 2,
    formula: "Crossing over mediated by Recombinase enzyme in Pachytene",
    explanation: "Recombination (crossing over) between homologous non-sister chromatids occurs during the Pachytene stage of Prophase I, mediated by the recombinase enzyme. Chiasmata become visible subsequently during Diplotene.",
    pyqYear: "NEET 2022"
  },
  // ==========================================
  // USER ADDED QUESTIONS (NEET / JEE / MHT-CET)
  // ==========================================
  {
    id: "user_phy_centripetal_mht",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Circular Motion & Centripetal Acceleration",
    difficulty: "Easy",
    questionText: "An object moves in a circular path of radius 10 m with constant speed 5 m/s. Its centripetal acceleration is:",
    options: [
      "2.5 m/s²",
      "5.0 m/s²",
      "0.5 m/s²",
      "10 m/s²",
    ],
    correctOption: 0,
    formula: "a_c = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s²",
    explanation: "Centripetal Acceleration (a) = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s².",
    pyqYear: "MHT-CET / NEET Special"
  },
  {
    id: "user_phy_centripetal_neet",
    exam: "NEET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Circular Motion & Centripetal Acceleration",
    difficulty: "Easy",
    questionText: "An object moves in a circular path of radius 10 m with constant speed 5 m/s. Its centripetal acceleration is:",
    options: [
      "2.5 m/s²",
      "5.0 m/s²",
      "0.5 m/s²",
      "10 m/s²",
    ],
    correctOption: 0,
    formula: "a_c = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s²",
    explanation: "Centripetal Acceleration (a) = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s².",
    pyqYear: "NEET / MHT-CET"
  },
  {
    id: "user_phy_centripetal_jee",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Circular Motion & Centripetal Acceleration",
    difficulty: "Easy",
    questionText: "An object moves in a circular path of radius 10 m with constant speed 5 m/s. Its centripetal acceleration is:",
    options: [
      "2.5 m/s²",
      "5.0 m/s²",
      "0.5 m/s²",
      "10 m/s²",
    ],
    correctOption: 0,
    formula: "a_c = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s²",
    explanation: "Centripetal Acceleration (a) = v² / r = (5)² / 10 = 25 / 10 = 2.5 m/s².",
    pyqYear: "JEE Main Foundation"
  },
  // =========================================================================
  // ADDITIONAL HIGH-YIELD QUESTIONS: CHEMISTRY, MATHS, BIOLOGY & PHYSICS
  // =========================================================================

  // --- CHEMISTRY: CHEMICAL BONDING ---
  {
    id: "chem_bond_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "VSEPR Theory & Molecular Geometry",
    difficulty: "Medium",
    questionText: "According to VSEPR theory, the geometry and shape of Xenon Tetrafluoride (XeF4) molecule are respectively:",
    options: [
      "Octahedral and Square Planar",
      "Square Planar and Octahedral",
      "Tetrahedral and Tetrahedral",
      "Trigonal Bipyramidal and See-saw",
    ],
    correctOption: 0,
    formula: "Steric Number = 1/2 [V + M - C + A] = 1/2 [8 + 4] = 6 (sp³d² hybridisation with 4 bond pairs + 2 lone pairs)",
    explanation: "In XeF4, Xe has 8 valence electrons. 4 electrons form bonds with 4 F atoms, leaving 2 lone pairs. Total electron pairs = 6 (Steric No. = 6, sp³d²). The electron geometry is Octahedral. Due to minimization of repulsion, the 2 lone pairs occupy axial positions, resulting in a Square Planar molecular shape.",
    pyqYear: "NEET 2021 / MHT-CET 2022"
  },
  {
    id: "chem_bond_01_jee",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "VSEPR Theory & Molecular Geometry",
    difficulty: "Medium",
    questionText: "According to VSEPR theory, the geometry and shape of Xenon Tetrafluoride (XeF4) molecule are respectively:",
    options: [
      "Octahedral and Square Planar",
      "Square Planar and Octahedral",
      "Tetrahedral and Tetrahedral",
      "Trigonal Bipyramidal and See-saw",
    ],
    correctOption: 0,
    formula: "Steric Number = 1/2 [V + M - C + A] = 1/2 [8 + 4] = 6 (sp³d² hybridisation with 4 bond pairs + 2 lone pairs)",
    explanation: "In XeF4, Xe has 8 valence electrons. 4 electrons form bonds with 4 F atoms, leaving 2 lone pairs. Total electron pairs = 6 (Steric No. = 6, sp³d²). The electron geometry is Octahedral. Due to minimization of repulsion, the 2 lone pairs occupy axial positions, resulting in a Square Planar molecular shape.",
    pyqYear: "JEE Main 2020"
  },
  {
    id: "chem_bond_01_mht",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "VSEPR Theory & Molecular Geometry",
    difficulty: "Medium",
    questionText: "According to VSEPR theory, the geometry and shape of Xenon Tetrafluoride (XeF4) molecule are respectively:",
    options: [
      "Octahedral and Square Planar",
      "Square Planar and Octahedral",
      "Tetrahedral and Tetrahedral",
      "Trigonal Bipyramidal and See-saw",
    ],
    correctOption: 0,
    formula: "Steric Number = 1/2 [V + M - C + A] = 1/2 [8 + 4] = 6 (sp³d² hybridisation with 4 bond pairs + 2 lone pairs)",
    explanation: "In XeF4, Xe has 8 valence electrons. 4 electrons form bonds with 4 F atoms, leaving 2 lone pairs. Total electron pairs = 6 (Steric No. = 6, sp³d²). The electron geometry is Octahedral. Due to minimization of repulsion, the 2 lone pairs occupy axial positions, resulting in a Square Planar molecular shape.",
    pyqYear: "MHT-CET 2023"
  },

  // --- CHEMISTRY: CHEMICAL THERMODYNAMICS ---
  {
    id: "chem_thermo_spont_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Thermodynamics & Chemical Energetics",
    topic: "Gibbs Free Energy & Spontaneity",
    difficulty: "Medium",
    questionText: "For a chemical reaction, ΔH = -35.5 kJ/mol and ΔS = -83.6 J/(K·mol). At what temperature will the reaction become spontaneous at standard pressure?",
    options: [
      "T < 425 K",
      "T > 425 K",
      "T < 298 K only",
      "Any temperature",
    ],
    correctOption: 0,
    formula: "ΔG = ΔH - TΔS < 0 for spontaneity => T < ΔH / ΔS",
    explanation: "A reaction is spontaneous when ΔG < 0. So, ΔH - TΔS < 0 => TΔS > ΔH. Since ΔS is negative (-83.6 J/K·mol), dividing by negative reverses inequality: T < ΔH / ΔS = (-35500 J/mol) / (-83.6 J/K·mol) ≈ 424.64 K ≈ 425 K. Thus, the reaction is spontaneous below 425 K.",
    pyqYear: "NEET 2020 / JEE Main 2019"
  },
  {
    id: "chem_thermo_spont_01_jee",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Thermodynamics & Chemical Energetics",
    topic: "Gibbs Free Energy & Spontaneity",
    difficulty: "Medium",
    questionText: "For a chemical reaction, ΔH = -35.5 kJ/mol and ΔS = -83.6 J/(K·mol). At what temperature will the reaction become spontaneous at standard pressure?",
    options: [
      "T < 425 K",
      "T > 425 K",
      "T < 298 K only",
      "Any temperature",
    ],
    correctOption: 0,
    formula: "ΔG = ΔH - TΔS < 0 for spontaneity => T < ΔH / ΔS",
    explanation: "A reaction is spontaneous when ΔG < 0. So, ΔH - TΔS < 0 => TΔS > ΔH. Since ΔS is negative (-83.6 J/K·mol), dividing by negative reverses inequality: T < ΔH / ΔS = (-35500 J/mol) / (-83.6 J/K·mol) ≈ 424.64 K ≈ 425 K. Thus, the reaction is spontaneous below 425 K.",
    pyqYear: "JEE Main 2022"
  },
  {
    id: "chem_thermo_spont_01_mht",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Thermodynamics & Chemical Energetics",
    topic: "Gibbs Free Energy & Spontaneity",
    difficulty: "Medium",
    questionText: "For a chemical reaction, ΔH = -35.5 kJ/mol and ΔS = -83.6 J/(K·mol). At what temperature will the reaction become spontaneous at standard pressure?",
    options: [
      "T < 425 K",
      "T > 425 K",
      "T < 298 K only",
      "Any temperature",
    ],
    correctOption: 0,
    formula: "ΔG = ΔH - TΔS < 0 for spontaneity => T < ΔH / ΔS",
    explanation: "A reaction is spontaneous when ΔG < 0. So, ΔH - TΔS < 0 => TΔS > ΔH. Since ΔS is negative (-83.6 J/K·mol), dividing by negative reverses inequality: T < ΔH / ΔS = (-35500 J/mol) / (-83.6 J/K·mol) ≈ 424.64 K ≈ 425 K. Thus, the reaction is spontaneous below 425 K.",
    pyqYear: "MHT-CET 2021"
  },

  // --- CHEMISTRY: COORDINATION COMPOUNDS ---
  {
    id: "chem_coord_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Coordination Compounds & d-Block",
    topic: "Spin-Only Magnetic Moment",
    difficulty: "Medium",
    questionText: "The spin-only magnetic moment of [Mn(CN)6]⁴⁻ complex ion (Atomic number of Mn = 25) is approximately:",
    options: [
      "1.73 BM",
      "5.92 BM",
      "3.87 BM",
      "2.83 BM",
    ],
    correctOption: 0,
    formula: "μ = √(n(n + 2)) BM, where n is number of unpaired electrons",
    explanation: "In [Mn(CN)6]⁴⁻, Mn is in +2 oxidation state (Mn²⁺: 3d⁵). Since CN⁻ is a strong field ligand, pairing occurs: t2g⁵ eg⁰. Thus, there is only n = 1 unpaired electron. Spin-only magnetic moment μ = √(1(1+2)) = √3 ≈ 1.73 BM.",
    pyqYear: "NEET 2023 / JEE Main 2021"
  },
  {
    id: "chem_coord_01_jee",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Coordination Compounds & d-Block",
    topic: "Spin-Only Magnetic Moment",
    difficulty: "Medium",
    questionText: "The spin-only magnetic moment of [Mn(CN)6]⁴⁻ complex ion (Atomic number of Mn = 25) is approximately:",
    options: [
      "1.73 BM",
      "5.92 BM",
      "3.87 BM",
      "2.83 BM",
    ],
    correctOption: 0,
    formula: "μ = √(n(n + 2)) BM, where n is number of unpaired electrons",
    explanation: "In [Mn(CN)6]⁴⁻, Mn is in +2 oxidation state (Mn²⁺: 3d⁵). Since CN⁻ is a strong field ligand, pairing occurs: t2g⁵ eg⁰. Thus, there is only n = 1 unpaired electron. Spin-only magnetic moment μ = √(1(1+2)) = √3 ≈ 1.73 BM.",
    pyqYear: "JEE Main 2023"
  },
  {
    id: "chem_coord_01_mht",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Coordination Compounds & d-Block",
    topic: "Spin-Only Magnetic Moment",
    difficulty: "Medium",
    questionText: "The spin-only magnetic moment of [Mn(CN)6]⁴⁻ complex ion (Atomic number of Mn = 25) is approximately:",
    options: [
      "1.73 BM",
      "5.92 BM",
      "3.87 BM",
      "2.83 BM",
    ],
    correctOption: 0,
    formula: "μ = √(n(n + 2)) BM, where n is number of unpaired electrons",
    explanation: "In [Mn(CN)6]⁴⁻, Mn is in +2 oxidation state (Mn²⁺: 3d⁵). Since CN⁻ is a strong field ligand, pairing occurs: t2g⁵ eg⁰. Thus, there is only n = 1 unpaired electron. Spin-only magnetic moment μ = √(1(1+2)) = √3 ≈ 1.73 BM.",
    pyqYear: "MHT-CET 2023"
  },

  // --- MATHEMATICS: MATRICES & DETERMINANTS ---
  {
    id: "math_matrix_adj_01",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Determinant of Adjoint Matrix",
    difficulty: "Medium",
    questionText: "If A is a 3 × 3 non-singular matrix such that |A| = 4, then the value of |adj(adj(A))| is equal to:",
    options: [
      "256",
      "64",
      "16",
      "1024",
    ],
    correctOption: 0,
    formula: "|adj(adj(A))| = |A|^{(n - 1)^2}",
    explanation: "For an n × n matrix A, the property states |adj(adj(A))| = |A|^{(n-1)^2}. Here n = 3 and |A| = 4. So exponent = (3 - 1)^2 = 2^2 = 4. Therefore, |adj(adj(A))| = 4^4 = 256.",
    pyqYear: "JEE Main 2021 / MHT-CET 2022"
  },
  {
    id: "math_matrix_adj_01_mht",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Determinant of Adjoint Matrix",
    difficulty: "Medium",
    questionText: "If A is a 3 × 3 non-singular matrix such that |A| = 4, then the value of |adj(adj(A))| is equal to:",
    options: [
      "256",
      "64",
      "16",
      "1024",
    ],
    correctOption: 0,
    formula: "|adj(adj(A))| = |A|^{(n - 1)^2}",
    explanation: "For an n × n matrix A, the property states |adj(adj(A))| = |A|^{(n-1)^2}. Here n = 3 and |A| = 4. So exponent = (3 - 1)^2 = 2^2 = 4. Therefore, |adj(adj(A))| = 4^4 = 256.",
    pyqYear: "MHT-CET 2023"
  },

  // --- MATHEMATICS: DEFINITE INTEGRATION ---
  {
    id: "math_def_int_prop_01",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Integral Calculus (Indefinite & Definite)",
    topic: "King's Property of Definite Integrals",
    difficulty: "Medium",
    questionText: "Evaluate the definite integral: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx.",
    options: [
      "π/4",
      "π/2",
      "π",
      "1",
    ],
    correctOption: 0,
    formula: "∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx => 2I = ∫[0 to a] 1 dx = a => I = a/2",
    explanation: "Let I = ∫[0 to π/2] √sin(x)/(√sin(x) + √cos(x)) dx. Using King's property ∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx: I = ∫[0 to π/2] √sin(π/2 - x)/(√sin(π/2 - x) + √cos(π/2 - x)) dx = ∫[0 to π/2] √cos(x)/(√cos(x) + √sin(x)) dx. Adding the two equations: 2I = ∫[0 to π/2] 1 dx = [x][0 to π/2] = π/2 => I = π/4.",
    pyqYear: "JEE Main 2022 / MHT-CET 2021"
  },
  {
    id: "math_def_int_prop_01_mht",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Integral Calculus (Indefinite & Definite)",
    topic: "King's Property of Definite Integrals",
    difficulty: "Medium",
    questionText: "Evaluate the definite integral: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx.",
    options: [
      "π/4",
      "π/2",
      "π",
      "1",
    ],
    correctOption: 0,
    formula: "∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx => 2I = ∫[0 to a] 1 dx = a => I = a/2",
    explanation: "Let I = ∫[0 to π/2] √sin(x)/(√sin(x) + √cos(x)) dx. Using King's property ∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx: I = ∫[0 to π/2] √sin(π/2 - x)/(√sin(π/2 - x) + √cos(π/2 - x)) dx = ∫[0 to π/2] √cos(x)/(√cos(x) + √sin(x)) dx. Adding the two equations: 2I = ∫[0 to π/2] 1 dx = [x][0 to π/2] = π/2 => I = π/4.",
    pyqYear: "MHT-CET 2023"
  },

  // --- BIOLOGY: GENETICS & PRINCIPLES OF INHERITANCE ---
  {
    id: "bio_genetics_hardy_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Genetics & Molecular Basis of Inheritance",
    topic: "Hardy-Weinberg Principle & Allele Frequencies",
    difficulty: "Medium",
    questionText: "In a population of 1000 individuals, 360 belong to genotype AA, 480 to Aa, and 160 to aa. Based on this data, the frequency of allele 'A' in the population is:",
    options: [
      "0.6",
      "0.4",
      "0.36",
      "0.48",
    ],
    correctOption: 0,
    formula: "Frequency of A (p) = (2 * AA + Aa) / (2 * Total) = p² + (1/2)(2pq) = 0.36 + 0.24 = 0.6",
    explanation: "Total individuals = 1000 => Total alleles = 2000. Total 'A' alleles = (2 * 360 from AA) + (1 * 480 from Aa) = 720 + 480 = 1200. Frequency of allele A (p) = 1200 / 2000 = 0.60. Alternatively, p = p² + 1/2(2pq) = 0.36 + 0.24 = 0.6.",
    pyqYear: "NEET 2022 / MHT-CET (PCB) 2023"
  },
  {
    id: "bio_genetics_hardy_01_mht",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Genetics & Molecular Basis of Inheritance",
    topic: "Hardy-Weinberg Principle & Allele Frequencies",
    difficulty: "Medium",
    questionText: "In a population of 1000 individuals, 360 belong to genotype AA, 480 to Aa, and 160 to aa. Based on this data, the frequency of allele 'A' in the population is:",
    options: [
      "0.6",
      "0.4",
      "0.36",
      "0.48",
    ],
    correctOption: 0,
    formula: "Frequency of A (p) = (2 * AA + Aa) / (2 * Total) = p² + (1/2)(2pq) = 0.36 + 0.24 = 0.6",
    explanation: "Total individuals = 1000 => Total alleles = 2000. Total 'A' alleles = (2 * 360 from AA) + (1 * 480 from Aa) = 720 + 480 = 1200. Frequency of allele A (p) = 1200 / 2000 = 0.60. Alternatively, p = p² + 1/2(2pq) = 0.36 + 0.24 = 0.6.",
    pyqYear: "MHT-CET (PCB) 2023"
  },

  // --- BIOLOGY: BIOTECHNOLOGY ---
  {
    id: "bio_biotech_pcr_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Biotechnology: Principles & Applications",
    topic: "Polymerase Chain Reaction (PCR) Steps",
    difficulty: "Easy",
    questionText: "What is the correct sequential order of steps in a Polymerase Chain Reaction (PCR) cycle?",
    options: [
      "Denaturation → Annealing → Extension",
      "Annealing → Denaturation → Extension",
      "Extension → Denaturation → Annealing",
      "Denaturation → Extension → Annealing",
    ],
    correctOption: 0,
    formula: "Step 1: Denaturation (~94°C) | Step 2: Annealing (~54°C) | Step 3: Extension (~72°C using Taq polymerase)",
    explanation: "The correct sequence of PCR is: 1. Denaturation (separation of DNA strands at ~94°C), 2. Annealing (binding of primers to single strands at ~54°C), and 3. Extension (synthesis of new DNA strand by thermostable Taq DNA polymerase at ~72°C).",
    pyqYear: "NEET 2021 / MHT-CET 2022"
  },
  {
    id: "bio_biotech_pcr_01_mht",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Biotechnology: Principles & Applications",
    topic: "Polymerase Chain Reaction (PCR) Steps",
    difficulty: "Easy",
    questionText: "What is the correct sequential order of steps in a Polymerase Chain Reaction (PCR) cycle?",
    options: [
      "Denaturation → Annealing → Extension",
      "Annealing → Denaturation → Extension",
      "Extension → Denaturation → Annealing",
      "Denaturation → Extension → Annealing",
    ],
    correctOption: 0,
    formula: "Step 1: Denaturation (~94°C) | Step 2: Annealing (~54°C) | Step 3: Extension (~72°C using Taq polymerase)",
    explanation: "The correct sequence of PCR is: 1. Denaturation (separation of DNA strands at ~94°C), 2. Annealing (binding of primers to single strands at ~54°C), and 3. Extension (synthesis of new DNA strand by thermostable Taq DNA polymerase at ~72°C).",
    pyqYear: "MHT-CET (PCB) 2023"
  },

  // --- PHYSICS: ROTATIONAL DYNAMICS (CONSERVATION OF ANGULAR MOMENTUM) ---
  {
    id: "phy_rot_ang_mom_01",
    exam: "NEET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Conservation of Angular Momentum",
    difficulty: "Medium",
    questionText: "A thin uniform circular disc of mass M and radius R is rotating about its central vertical axis with angular velocity ω0. Another identical disc is gently placed on top of it coaxially. The final common angular velocity of the two discs is:",
    options: [
      "ω0 / 2",
      "ω0",
      "2 ω0",
      "ω0 / 4",
    ],
    correctOption: 0,
    formula: "L_initial = L_final => I1 * ω0 = (I1 + I2) * ω => (1/2 M R²) ω0 = (M R²) ω => ω = ω0 / 2",
    explanation: "Since no external torque acts on the system (τ_ext = 0), total angular momentum is conserved: L_initial = L_final. I1 = (1/2)MR², I_total = (1/2)MR² + (1/2)MR² = MR². Thus, (1/2)MR² * ω0 = MR² * ω => ω = ω0 / 2.",
    pyqYear: "NEET 2022 / JEE Main 2020"
  },
  {
    id: "phy_rot_ang_mom_01_jee",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Conservation of Angular Momentum",
    difficulty: "Medium",
    questionText: "A thin uniform circular disc of mass M and radius R is rotating about its central vertical axis with angular velocity ω0. Another identical disc is gently placed on top of it coaxially. The final common angular velocity of the two discs is:",
    options: [
      "ω0 / 2",
      "ω0",
      "2 ω0",
      "ω0 / 4",
    ],
    correctOption: 0,
    formula: "L_initial = L_final => I1 * ω0 = (I1 + I2) * ω => ω = ω0 / 2",
    explanation: "Conserving angular momentum: I1 ω0 = (I1 + I2) ω. Since I1 = I2 = (1/2)MR², ω = ω0 / 2.",
    pyqYear: "JEE Main 2021"
  },
  {
    id: "phy_rot_ang_mom_01_mht",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Conservation of Angular Momentum",
    difficulty: "Medium",
    questionText: "A thin uniform circular disc of mass M and radius R is rotating about its central vertical axis with angular velocity ω0. Another identical disc is gently placed on top of it coaxially. The final common angular velocity of the two discs is:",
    options: [
      "ω0 / 2",
      "ω0",
      "2 ω0",
      "ω0 / 4",
    ],
    correctOption: 0,
    formula: "L1 = L2 => (1/2 M R²) ω0 = (M R²) ω => ω = ω0 / 2",
    explanation: "Total angular momentum remains conserved. ω = ω0 / 2.",
    pyqYear: "MHT-CET 2023"
  },

  // --- PHYSICS: OPTICS (BREWSTER'S LAW & POLARIZATION) ---
  {
    id: "phy_optics_brewster_01",
    exam: "NEET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Brewster's Law & Polarization",
    difficulty: "Easy",
    questionText: "Unpolarized light is incident on a glass plate of refractive index μ = √3. If the reflected ray is completely linearly polarized, the angle of refraction in the glass is:",
    options: [
      "30°",
      "60°",
      "45°",
      "90°",
    ],
    correctOption: 0,
    formula: "tan(i_p) = μ => tan(i_p) = √3 => i_p = 60°. Since i_p + r = 90°, r = 90° - 60° = 30°",
    explanation: "According to Brewster's law, tan(i_p) = μ. For μ = √3, polarising angle i_p = 60°. At Brewster's angle, reflected and refracted rays are perpendicular, so i_p + r = 90°. Therefore, angle of refraction r = 90° - 60° = 30°.",
    pyqYear: "NEET 2020 / MHT-CET 2022"
  },
  {
    id: "phy_optics_brewster_01_jee",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Brewster's Law & Polarization",
    difficulty: "Easy",
    questionText: "Unpolarized light is incident on a glass plate of refractive index μ = √3. If the reflected ray is completely linearly polarized, the angle of refraction in the glass is:",
    options: [
      "30°",
      "60°",
      "45°",
      "90°",
    ],
    correctOption: 0,
    formula: "tan(i_p) = μ => i_p = 60° => r = 90° - 60° = 30°",
    explanation: "At Brewster's angle, reflected and refracted rays are mutually perpendicular. Thus r = 30°.",
    pyqYear: "JEE Main 2021"
  },
  {
    id: "phy_optics_brewster_01_mht",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Brewster's Law & Polarization",
    difficulty: "Easy",
    questionText: "Unpolarized light is incident on a glass plate of refractive index μ = √3. If the reflected ray is completely linearly polarized, the angle of refraction in the glass is:",
    options: [
      "30°",
      "60°",
      "45°",
      "90°",
    ],
    correctOption: 0,
    formula: "tan(i_p) = μ => i_p = 60° => r = 90° - 60° = 30°",
    explanation: "tan(i_p) = √3 => i_p = 60°. r = 90° - 60° = 30°.",
    pyqYear: "MHT-CET 2023"
  },

  // --- CHEMISTRY: ORGANIC CHEMISTRY (ALDEHYDES & KETONES) ---
  {
    id: "chem_org_cannizzaro_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones & Carboxylic Acids",
    topic: "Cannizzaro Reaction & α-Hydrogen",
    difficulty: "Easy",
    questionText: "Which of the following compounds undergoes Cannizzaro reaction on treatment with concentrated 50% NaOH?",
    options: [
      "Benzaldehyde (C6H5CHO)",
      "Acetaldehyde (CH3CHO)",
      "Acetone (CH3COCH3)",
      "Propionaldehyde (CH3CH2CHO)",
    ],
    correctOption: 0,
    formula: "2 C6H5CHO + conc. NaOH -> C6H5COONa (Sodium benzoate) + C6H5CH2OH (Benzyl alcohol)",
    explanation: "Aldehydes lacking α-hydrogen atoms undergo Cannizzaro reaction (disproportionation / redox) upon heating with concentrated alkali. Benzaldehyde has no α-hydrogen, producing benzyl alcohol and sodium benzoate. Acetaldehyde and propionaldehyde undergo aldol condensation because they possess α-hydrogens.",
    pyqYear: "NEET 2022 / JEE Main 2020"
  },
  {
    id: "chem_org_cannizzaro_01_jee",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones & Carboxylic Acids",
    topic: "Cannizzaro Reaction & α-Hydrogen",
    difficulty: "Easy",
    questionText: "Which of the following compounds undergoes Cannizzaro reaction on treatment with concentrated 50% NaOH?",
    options: [
      "Benzaldehyde (C6H5CHO)",
      "Acetaldehyde (CH3CHO)",
      "Acetone (CH3COCH3)",
      "Propionaldehyde (CH3CH2CHO)",
    ],
    correctOption: 0,
    formula: "2 C6H5CHO + NaOH -> C6H5COONa + C6H5CH2OH",
    explanation: "Benzaldehyde lacks alpha hydrogen and undergoes disproportionation (Cannizzaro reaction).",
    pyqYear: "JEE Main 2021"
  },
  {
    id: "chem_org_cannizzaro_01_mht",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones & Carboxylic Acids",
    topic: "Cannizzaro Reaction & α-Hydrogen",
    difficulty: "Easy",
    questionText: "Which of the following compounds undergoes Cannizzaro reaction on treatment with concentrated 50% NaOH?",
    options: [
      "Benzaldehyde (C6H5CHO)",
      "Acetaldehyde (CH3CHO)",
      "Acetone (CH3COCH3)",
      "Propionaldehyde (CH3CH2CHO)",
    ],
    correctOption: 0,
    formula: "2 C6H5CHO + NaOH -> C6H5COONa + C6H5CH2OH",
    explanation: "Benzaldehyde undergoes Cannizzaro reaction as it has no alpha hydrogens.",
    pyqYear: "MHT-CET 2023"
  },

  // --- MATHEMATICS: VECTORS & 3D GEOMETRY ---
  {
    id: "math_vec_angle_01",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Cross Product & Area of Parallelogram",
    difficulty: "Medium",
    questionText: "If vectors a = 2î + ĵ - k̂ and b = î + 3ĵ + 4k̂ represent the adjacent sides of a parallelogram, its area (in square units) is:",
    options: [
      "5√6",
      "5√3",
      "10√2",
      "15",
    ],
    correctOption: 0,
    formula: "Area = |a × b| = |7î - 9ĵ + 5k̂| = √(49 + 81 + 25) = √150 = 5√6",
    explanation: "Vector cross product a × b = |î ĵ k̂; 2 1 -1; 1 3 4| = î(4 - (-3)) - ĵ(8 - (-1)) + k̂(6 - 1) = 7î - 9ĵ + 5k̂. Magnitude |a × b| = √(7² + (-9)² + 5²) = √(49 + 81 + 25) = √150 = 5√6 sq. units.",
    pyqYear: "JEE Main 2022 / MHT-CET 2021"
  },
  {
    id: "math_vec_angle_01_mht",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Cross Product & Area of Parallelogram",
    difficulty: "Medium",
    questionText: "If vectors a = 2î + ĵ - k̂ and b = î + 3ĵ + 4k̂ represent the adjacent sides of a parallelogram, its area (in square units) is:",
    options: [
      "5√6",
      "5√3",
      "10√2",
      "15",
    ],
    correctOption: 0,
    formula: "Area = |a × b| = √150 = 5√6",
    explanation: "Area = |a × b| = 5√6 square units.",
    pyqYear: "MHT-CET 2023"
  },

  // --- BIOLOGY: PLANT PHYSIOLOGY (PHOTOSYNTHESIS) ---
  {
    id: "bio_plant_c4_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Plant Physiology & Photosynthesis",
    topic: "C4 Pathway & Kranz Anatomy",
    difficulty: "Medium",
    questionText: "In C4 plants (like maize and sugarcane), the primary CO2 acceptor and the primary CO2 fixing enzyme in mesophyll cells are respectively:",
    options: [
      "Phosphoenolpyruvate (PEP) and PEP carboxylase (PEPcase)",
      "Ribulose-1,5-bisphosphate (RuBP) and RuBisCO",
      "Oxaloacetate (OAA) and Malate dehydrogenase",
      "Phosphoglyceric acid (PGA) and RuBisCO",
    ],
    correctOption: 0,
    formula: "PEP (3C) + CO2 + H2O --(PEPcase)--> Oxaloacetic Acid (OAA, 4C)",
    explanation: "In C4 plants, initial CO2 fixation takes place in mesophyll cells where Phosphoenolpyruvate (PEP, 3-carbon compound) acts as the primary CO2 acceptor in the presence of PEP carboxylase (PEPcase) enzyme, forming the first stable 4-carbon product Oxaloacetic acid (OAA). RuBisCO is present in bundle sheath cells.",
    pyqYear: "NEET 2021 / MHT-CET (PCB) 2022"
  },
  {
    id: "bio_plant_c4_01_mht",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Plant Physiology & Photosynthesis",
    topic: "C4 Pathway & Kranz Anatomy",
    difficulty: "Medium",
    questionText: "In C4 plants (like maize and sugarcane), the primary CO2 acceptor and the primary CO2 fixing enzyme in mesophyll cells are respectively:",
    options: [
      "Phosphoenolpyruvate (PEP) and PEP carboxylase (PEPcase)",
      "Ribulose-1,5-bisphosphate (RuBP) and RuBisCO",
      "Oxaloacetate (OAA) and Malate dehydrogenase",
      "Phosphoglyceric acid (PGA) and RuBisCO",
    ],
    correctOption: 0,
    formula: "PEP + CO2 -> OAA (via PEPcase)",
    explanation: "In mesophyll cells of C4 plants, PEP is the acceptor and PEPcase is the enzyme.",
    pyqYear: "MHT-CET (PCB) 2023"
  },

  // --- CHEMISTRY: SOLUTIONS & COLLIGATIVE PROPERTIES (User Provided) ---
  {
    id: "chem_sol_osmotic_01_mht",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Osmotic Pressure & Molar Mass of Polymers",
    difficulty: "Medium",
    questionText: "Which of the following colligative properties is used to determine the molar mass of polymers and proteins?",
    options: [
      "Relative lowering of vapour pressure",
      "Elevation of boiling point",
      "Depression of freezing point",
      "Osmotic pressure",
    ],
    correctOption: 3,
    formula: "π = CRT = (w2 * R * T) / (M2 * V)",
    explanation: "Osmotic pressure measurement is preferred for macromolecules (polymers, proteins, biomolecules) because its magnitude is large even for dilute solutions at room temperature, and biomolecules are unstable at elevated temperatures.",
    pyqYear: "MHT-CET 2023 / NEET Standard"
  },
  {
    id: "chem_sol_osmotic_01_neet",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Osmotic Pressure & Molar Mass of Polymers",
    difficulty: "Medium",
    questionText: "Which of the following colligative properties is used to determine the molar mass of polymers and proteins?",
    options: [
      "Relative lowering of vapour pressure",
      "Elevation of boiling point",
      "Depression of freezing point",
      "Osmotic pressure",
    ],
    correctOption: 3,
    formula: "π = CRT = (w2 * R * T) / (M2 * V)",
    explanation: "Osmotic pressure measurement is preferred for macromolecules because its magnitude is large even for dilute solutions at room temperature.",
    pyqYear: "NEET 2022"
  },

  // --- BIOLOGY: SEXUAL REPRODUCTION IN FLOWERING PLANTS (User Provided) ---
  {
    id: "bio_repro_triple_fusion_01_mht",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Reproduction in Organisms & Plants",
    topic: "Double Fertilization & Triple Fusion",
    difficulty: "Easy",
    questionText: "During double fertilization in angiosperms, triple fusion produces:",
    options: [
      "Zygote",
      "Primary Endosperm Nucleus (PEN)",
      "Synergid",
      "Antipodal cell",
    ],
    correctOption: 1,
    formula: "Male Gamete (n) + Secondary Diploid Nucleus (2n) -> Triploid Primary Endosperm Nucleus (PEN - 3n)",
    explanation: "Triple fusion involves the fusion of one haploid male gamete (n) with the diploid secondary nucleus (2n) to form a triploid Primary Endosperm Nucleus (PEN - 3n), which later develops into nutrient-rich endosperm.",
    pyqYear: "MHT-CET (PCB) 2023"
  },
  {
    id: "bio_repro_triple_fusion_01_neet",
    exam: "NEET",
    subject: "Biology",
    chapter: "Reproduction in Organisms & Plants",
    topic: "Double Fertilization & Triple Fusion",
    difficulty: "Easy",
    questionText: "During double fertilization in angiosperms, triple fusion produces:",
    options: [
      "Zygote",
      "Primary Endosperm Nucleus (PEN)",
      "Synergid",
      "Antipodal cell",
    ],
    correctOption: 1,
    formula: "Male Gamete (n) + Diploid Secondary Nucleus (2n) -> Triploid PEN (3n)",
    explanation: "Triple fusion involves the fusion of one male gamete (n) with the diploid secondary nucleus (2n) to form a triploid Primary Endosperm Nucleus (3n).",
    pyqYear: "NEET 2021"
  },

  // --- MATHEMATICS: MATRICES DETERMINANT OF ADJOINT (User Provided) ---
  {
    id: "math_matrix_adj_val_01_mht",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Determinant of Adjoint Matrix Property",
    difficulty: "Easy",
    questionText: "If matrix A is of order 3x3 and |A| = 5, then the value of |adj A| is:",
    options: [
      "5",
      "25",
      "125",
      "1/5",
    ],
    correctOption: 1,
    formula: "|adj A| = |A|^(n - 1) = 5^(3 - 1) = 5² = 25",
    explanation: "For a square matrix A of order n, the property is |adj A| = |A|^(n-1). Here n = 3 and |A| = 5, so |adj A| = 5^(3-1) = 5² = 25.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "math_matrix_adj_val_01_jee",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    topic: "Determinant of Adjoint Matrix Property",
    difficulty: "Easy",
    questionText: "If matrix A is of order 3x3 and |A| = 5, then the value of |adj A| is:",
    options: [
      "5",
      "25",
      "125",
      "1/5",
    ],
    correctOption: 1,
    formula: "|adj A| = |A|^(n - 1) = 5^(3 - 1) = 5² = 25",
    explanation: "For a square matrix A of order n, |adj A| = |A|^(n-1). Here n = 3, so |adj A| = 5^(3-1) = 5² = 25.",
    pyqYear: "JEE Main 2022"
  },
  // ==========================================
  // ADDITIONAL HIGH-YIELD CURATED QUESTIONS
  // ==========================================
  {
    id: "phy_rot_consv_ang_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Conservation of Angular Momentum",
    difficulty: "Medium",
    questionText: "A person standing on a rotating turntable pulls his outstretched hands inward. His moment of inertia decreases to half. The new angular velocity will become:",
    options: ["Half", "Double", "Four times", "Remains unchanged"],
    correctOption: 1,
    formula: "L = I1 × ω1 = I2 × ω2 => ω2 = (I1/I2) × ω1",
    explanation: "According to the Law of Conservation of Angular Momentum (L = Iω = constant), when no external torque acts, I1 × ω1 = I2 × ω2. Since I2 = I1 / 2, we get ω2 = 2 × ω1. The angular speed doubles.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "phy_rot_radius_gyr_01",
    exam: "NEET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Radius of Gyration of Solid Sphere",
    difficulty: "Easy",
    questionText: "The radius of gyration of a uniform solid sphere of radius R about its diameter axis is:",
    options: ["√(2/5) R", "√(3/5) R", "√(1/2) R", "√(2/3) R"],
    correctOption: 0,
    formula: "I = (2/5) M R² = M K² => K = √(2/5) R",
    explanation: "The moment of inertia of a solid sphere of mass M and radius R about its diameter is I = (2/5) M R². Equating I = M K², we get K² = (2/5) R², hence radius of gyration K = √(2/5) R.",
    pyqYear: "NEET 2022"
  },
  {
    id: "chem_sol_vant_hoff_01",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    topic: "Van't Hoff Factor for Complete Dissociation",
    difficulty: "Easy",
    questionText: "For an electrolyte K3[Fe(CN)6] undergoing 100% dissociation in aqueous solution, the value of Van't Hoff factor (i) is:",
    options: ["3", "4", "5", "1"],
    correctOption: 1,
    formula: "i = 1 + (n - 1)α; For complete dissociation (α = 1), i = n",
    explanation: "K3[Fe(CN)6] ionizes as: K3[Fe(CN)6] -> 3 K⁺ + [Fe(CN)6]³⁻. Total number of ions produced per molecule (n) = 3 + 1 = 4. For complete dissociation (α = 1), i = n = 4.",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "chem_kinetics_first_order_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Half-Life of First Order Reaction",
    difficulty: "Medium",
    questionText: "A first order reaction has a rate constant k = 6.93 × 10⁻³ s⁻¹. The time required for 75% completion of the reaction is:",
    options: ["100 s", "200 s", "300 s", "400 s"],
    correctOption: 1,
    formula: "t(75%) = 2 × t(1/2) = 2 × (0.693 / k)",
    explanation: "Half-life t(1/2) = 0.693 / k = 0.693 / (6.93 × 10⁻³) = 100 s. For a first order reaction, the time required for 75% completion is equal to 2 half-lives: t(75%) = 2 × t(1/2) = 2 × 100 s = 200 s.",
    pyqYear: "NEET 2023"
  },
  {
    id: "math_diff_chain_01",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Differentiation",
    topic: "Derivative of Logarithmic Function",
    difficulty: "Medium",
    questionText: "If y = log(sec x + tan x), then dy/dx is equal to:",
    options: ["sec x", "tan x", "sec x tan x", "sec² x"],
    correctOption: 0,
    formula: "d/dx [log(sec x + tan x)] = sec x",
    explanation: "dy/dx = (1 / (sec x + tan x)) × d/dx(sec x + tan x) = (sec x tan x + sec² x) / (sec x + tan x) = sec x(tan x + sec x) / (sec x + tan x) = sec x.",
    pyqYear: "MHT-CET 2022"
  },
  {
    id: "math_integ_std_01",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Indefinite Integration",
    topic: "Standard Integral of 1/(x² + a²)",
    difficulty: "Easy",
    questionText: "The value of ∫ dx / (x² + 16) is:",
    options: [
      "(1/4) tan⁻¹(x/4) + C",
      "(1/2) tan⁻¹(x/2) + C",
      "(1/4) log|x + 4| + C",
      "(1/16) tan⁻¹(x/16) + C",
    ],
    correctOption: 0,
    formula: "∫ dx / (x² + a²) = (1/a) tan⁻¹(x/a) + C",
    explanation: "Here a² = 16 => a = 4. Using the standard formula ∫ dx/(x² + a²) = (1/a) tan⁻¹(x/a) + C, we get (1/4) tan⁻¹(x/4) + C.",
    pyqYear: "MHT-CET 2021"
  },
  {
    id: "bio_dna_replication_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Molecular Basis of Inheritance",
    topic: "Semi-Conservative Replication & Meselson-Stahl Experiment",
    difficulty: "Medium",
    questionText: "The experimental proof for semi-conservative replication of DNA was first demonstrated by Meselson and Stahl in:",
    options: [
      "Escherichia coli (E. coli)",
      "Streptococcus pneumoniae",
      "Bacteriophage T2",
      "Neurospora crassa",
    ],
    correctOption: 0,
    formula: "Semi-conservative DNA replication proven using ¹⁵NH4Cl density gradient centrifugation",
    explanation: "Matthew Meselson and Franklin Stahl performed their landmark experiment in 1958 using Escherichia coli (E. coli) grown in medium containing heavy isotope of nitrogen (¹⁵N) followed by ¹⁴N.",
    pyqYear: "NEET 2022"
  },
  {
    id: "bio_biotech_pcr_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Biotechnology: Principles and Processes",
    topic: "PCR Steps and Taq Polymerase",
    difficulty: "Easy",
    questionText: "The correct sequence of steps in Polymerase Chain Reaction (PCR) is:",
    options: [
      "Denaturation -> Annealing -> Extension",
      "Annealing -> Denaturation -> Extension",
      "Denaturation -> Extension -> Annealing",
      "Extension -> Denaturation -> Annealing",
    ],
    correctOption: 0,
    formula: "PCR Cycle: Denaturation (~94°C) -> Annealing (~55°C) -> Extension (~72°C using Taq DNA polymerase)",
    explanation: "PCR consists of three fundamental sequential steps: 1. Denaturation (separation of DNA strands at 94-96°C), 2. Annealing (primer binding at 50-60°C), and 3. Extension (DNA synthesis by thermostable Taq polymerase at 72°C).",
    pyqYear: "NEET 2023"
  },
];

function deduplicateBaseQuestions(list: Question[]): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of list) {
    if (!q || !q.questionText) continue;
    const textSig = `${q.questionText} ${q.questionTextMr || ""}`.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "").slice(0, 160);
    const key = `${q.id}__${textSig}`;
    if (!seen.has(key) && !seen.has(textSig)) {
      seen.add(key);
      seen.add(textSig);
      out.push(q);
    }
  }
  return out;
}

export const INITIAL_QUESTIONS: Question[] = deduplicateBaseQuestions([
  ...SPECIAL_1_QUESTIONS,
  ...BASE_QUESTIONS,
  ...PYQ_QUESTIONS,
  ...EXTRA_QUESTIONS,
  ...TARGET_TRIUMPH_PHYSICS_QUESTIONS,
  ...NEET_180_FULL_QUESTIONS,
]);
