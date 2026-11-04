import { Question } from "../types";

export const PYQ_QUESTIONS: Question[] = [
  // ==========================================
  // NEET PYQs (2019 - 2024)
  // ==========================================
  {
    id: "pyq_neet_2024_bio_01",
    exam: "NEET",
    subject: "Biology",
    chapter: "Genetics & Evolution",
    topic: "Mendelian Genetics & Test Cross",
    difficulty: "Medium",
    questionText: "In a typical Mendelian dihybrid cross, what is the phenotypic ratio obtained in the F2 generation?",
    options: ["9:3:3:1", "1:2:1", "9:7", "15:1"],
    correctOption: 0,
    formula: "Phenotypic Ratio = (3:1) × (3:1) = 9:3:3:1",
    explanation: "According to Mendel's Law of Independent Assortment, the phenotypic ratio in the F2 generation of a dihybrid cross involving two traits is 9 (both dominant) : 3 (first dominant, second recessive) : 3 (first recessive, second dominant) : 1 (both recessive).",
    pyqYear: "NEET 2024"
  },
  {
    id: "pyq_neet_2024_phy_01",
    exam: "NEET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Critical Angle & Total Internal Reflection",
    difficulty: "Medium",
    questionText: "If the critical angle for total internal reflection from a medium to vacuum is 45°, then the velocity of light in the medium is:",
    options: [
      "2.12 × 10⁸ m/s",
      "3.00 × 10⁸ m/s",
      "1.50 × 10⁸ m/s",
      "2.82 × 10⁸ m/s",
    ],
    correctOption: 0,
    formula: "μ = 1 / sin(C) = c / v  =>  v = c × sin(C)",
    explanation: "Refractive index μ = 1/sin(C) where C = 45°. Therefore μ = 1/sin(45°) = √2 ≈ 1.414. Velocity in medium v = c / μ = (3 × 10⁸) / √2 = (3 / 1.414) × 10⁸ ≈ 2.12 × 10⁸ m/s.",
    pyqYear: "NEET 2024"
  },
  {
    id: "pyq_neet_2023_chem_01",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "Hybridization & Geometry of XeF4",
    difficulty: "Medium",
    questionText: "The shape and hybridization of XeF4 according to VSEPR theory are respectively:",
    options: [
      "Square planar, sp³d²",
      "Tetrahedral, sp³",
      "Octahedral, sp³d²",
      "Square pyramidal, sp³d",
    ],
    correctOption: 0,
    formula: "Steric No. = Bond Pairs (4) + Lone Pairs (2) = 6 (sp³d²)",
    explanation: "Xenon has 8 valence electrons. 4 electrons form bonds with 4 fluorine atoms, leaving 4 non-bonding electrons (2 lone pairs). Total steric number = 4 + 2 = 6, corresponding to sp³d² hybridization with octahedral geometry and a square planar molecular shape.",
    pyqYear: "NEET 2023"
  },
  {
    id: "pyq_neet_2023_bio_02",
    exam: "NEET",
    subject: "Biology",
    chapter: "Human Physiology",
    topic: "Cardiac Output & Stroke Volume",
    difficulty: "Easy",
    questionText: "If the stroke volume of a normal human heart is 70 mL and the heart rate is 72 beats per minute, what is the cardiac output?",
    options: ["5040 mL (≈ 5 L)", "7200 mL", "4200 mL", "3500 mL"],
    correctOption: 0,
    formula: "Cardiac Output = Stroke Volume × Heart Rate",
    explanation: "Cardiac Output = Stroke Volume (SV) × Heart Rate (HR) = 70 mL × 72 beats/min = 5040 mL/min ≈ 5.04 Litres per minute.",
    pyqYear: "NEET 2023"
  },
  {
    id: "pyq_neet_2022_phy_02",
    exam: "NEET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Work done in Adiabatic Process",
    difficulty: "Hard",
    questionText: "An ideal gas undergoes an adiabatic expansion where its temperature drops from 400 K to 300 K. If the gas is monoatomic and contains 2 moles, the work done by the gas is (R = 8.31 J/mol·K):",
    options: ["2493 J", "1662 J", "4155 J", "831 J"],
    correctOption: 0,
    formula: "W = (n R ΔT) / (1 - γ) = -ΔU = -n Cv ΔT",
    explanation: "For monoatomic gas, Cv = (3/2)R. In adiabatic process, W = -ΔU = -n Cv (T2 - T1) = n Cv (T1 - T2) = 2 × (3/2 × 8.31) × (400 - 300) = 3 × 8.31 × 100 = 2493 J.",
    pyqYear: "NEET 2022"
  },

  // ==========================================
  // JEE MAIN PYQs (2019 - 2024)
  // ==========================================
  {
    id: "pyq_jee_2024_math_01",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Calculus (Limits, Derivatives & Integrals)",
    topic: "Definite Integral Properties",
    difficulty: "Medium",
    questionText: "The value of the definite integral ∫ from 0 to π/2 of [sin³(x) / (sin³(x) + cos³(x))] dx is:",
    options: ["π/4", "π/2", "1", "0"],
    correctOption: 0,
    formula: "∫ f(x) dx = ∫ f(a+b - x) dx  =>  2I = (b - a)  =>  I = (b - a)/2",
    explanation: "Applying the property ∫[0 to a] f(x) dx = ∫[0 to a] f(a-x) dx: I = ∫[0 to π/2] cos³(x) / (cos³(x) + sin³(x)) dx. Adding the two equations: 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4.",
    pyqYear: "JEE Main 2024"
  },
  {
    id: "pyq_jee_2024_phy_01",
    exam: "JEE_MAIN",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Angular Momentum Conservation",
    difficulty: "Hard",
    questionText: "A circular disc of mass M and radius R is rotating about its central axis with angular velocity ω0. Another identical disc is gently placed on top of it. What is the new common angular velocity?",
    options: ["ω0 / 2", "ω0 / 4", "ω0 / √2", "2 ω0"],
    correctOption: 0,
    formula: "L_initial = L_final  =>  I1 ω0 = (I1 + I2) ω",
    explanation: "Since no external torque acts on the system, angular momentum is conserved: L_initial = L_final. I1 ω0 = (I1 + I2) ω. Since both discs are identical (I1 = I2 = I), I ω0 = 2I ω => ω = ω0 / 2.",
    pyqYear: "JEE Main 2024"
  },
  {
    id: "pyq_jee_2023_chem_01",
    exam: "JEE_MAIN",
    subject: "Chemistry",
    chapter: "Organic Chemistry: Reactions & Mechanisms",
    topic: "Cannizzaro Reaction",
    difficulty: "Medium",
    questionText: "Which of the following aldehydes will undergo Cannizzaro reaction when treated with concentrated (50%) NaOH?",
    options: [
      "Benzaldehyde (C6H5CHO)",
      "Acetaldehyde (CH3CHO)",
      "Propionaldehyde (CH3CH2CHO)",
      "Acetone (CH3COCH3)",
    ],
    correctOption: 0,
    formula: "Aldehydes with NO α-hydrogen undergo disproportionation (Cannizzaro).",
    explanation: "Cannizzaro reaction is given by aldehydes having no alpha-hydrogen atoms (e.g., Benzaldehyde, Formaldehyde). Acetaldehyde and propionaldehyde have alpha-hydrogens, so they undergo Aldol condensation instead.",
    pyqYear: "JEE Main 2023"
  },
  {
    id: "pyq_jee_2022_math_02",
    exam: "JEE_MAIN",
    subject: "Mathematics",
    chapter: "Matrices, Vectors & 3D Geometry",
    topic: "Angle between 3D Lines",
    difficulty: "Medium",
    questionText: "If vectors a = 2i + 3j - k and b = i - 2j + 4k, then the scalar (dot) product a · b is:",
    options: ["-8", "8", "-4", "12"],
    correctOption: 0,
    formula: "a · b = (a1 × b1) + (a2 × b2) + (a3 × b3)",
    explanation: "Dot product a · b = (2)(1) + (3)(-2) + (-1)(4) = 2 - 6 - 4 = -8.",
    pyqYear: "JEE Main 2022"
  },

  // ==========================================
  // MHT-CET PYQs (2019 - 2024)
  // ==========================================
  {
    id: "pyq_cet_2024_phy_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Centripetal Force & Banking of Roads",
    difficulty: "Easy",
    questionText: "The optimum speed of a vehicle on a banked road of radius r with banking angle θ (neglecting friction) is given by:",
    options: ["v = √(r g tan θ)", "v = √(r g / tan θ)", "v = r g sin θ", "v = √(r g cos θ)"],
    correctOption: 0,
    formula: "tan θ = v² / (r g)  =>  v = √(r g tan θ)",
    explanation: "On a banked road without friction, N sin θ provides the centripetal force (m v² / r) and N cos θ balances gravity (m g). Dividing both gives tan θ = v² / (r g), hence v = √(r g tan θ).",
    pyqYear: "MHT-CET 2024"
  },
  {
    id: "pyq_cet_2024_chem_01",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Chemical Thermodynamics & Energetics",
    topic: "Hess's Law & Enthalpy Calculation",
    difficulty: "Medium",
    questionText: "For an isothermal reversible expansion of an ideal gas, the change in internal energy (ΔU) is:",
    options: ["Zero (0)", "Positive (+ve)", "Negative (-ve)", "Equal to Work (W)"],
    correctOption: 0,
    formula: "For isothermal process, ΔT = 0  =>  ΔU = n Cv ΔT = 0",
    explanation: "For an ideal gas, internal energy is purely a function of temperature. In an isothermal process, temperature remains constant (ΔT = 0), so ΔU = n Cv ΔT = 0.",
    pyqYear: "MHT-CET 2024"
  },
  {
    id: "pyq_cet_2023_math_01",
    exam: "MHT_CET",
    subject: "Mathematics",
    chapter: "Trigonometry & Differential Equations",
    topic: "Order and Degree of Differential Equation",
    difficulty: "Easy",
    questionText: "The order and degree of the differential equation [1 + (dy/dx)²]^(3/2) = 5 (d²y/dx²) are respectively:",
    options: ["Order = 2, Degree = 2", "Order = 2, Degree = 1", "Order = 1, Degree = 3", "Order = 2, Degree = 3"],
    correctOption: 0,
    formula: "Remove fractional powers by squaring both sides: [1 + (dy/dx)²]³ = 25 (d²y/dx²)²",
    explanation: "Squaring both sides to eliminate fractional powers: [1 + (dy/dx)²]³ = 25 (d²y/dx²)². The highest order derivative is d²y/dx² (Order = 2), and its highest power after rationalization is 2 (Degree = 2).",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "pyq_cet_2023_bio_01",
    exam: "MHT_CET",
    subject: "Biology",
    chapter: "Plant Physiology",
    topic: "Double Fertilization in Angiosperms",
    difficulty: "Easy",
    questionText: "In angiosperms, the primary endosperm nucleus (PEN) is formed by the fusion of:",
    options: [
      "One male gamete with two polar nuclei (Triple fusion => 3n)",
      "Two male gametes with egg cell",
      "One male gamete with egg cell",
      "Egg cell with synergids",
    ],
    correctOption: 0,
    formula: "1 Male Gamete (n) + Secondary Nucleus (2n) = PEN (3n)",
    explanation: "Double fertilization consists of syngamy (male gamete + egg cell -> 2n zygote) and triple fusion (second male gamete + diploid secondary nucleus -> 3n primary endosperm nucleus).",
    pyqYear: "MHT-CET 2023"
  },
  {
    id: "pyq_cet_2022_chem_02",
    exam: "MHT_CET",
    subject: "Chemistry",
    chapter: "Electrochemistry & Solutions",
    topic: "Faraday's First Law of Electrolysis",
    difficulty: "Medium",
    questionText: "According to Faraday's First Law of Electrolysis, the mass of substance deposited (W) is directly proportional to:",
    options: [
      "Quantity of electricity passed (Q = I × t)",
      "Square of current (I²)",
      "Resistance of electrolyte (R)",
      "Temperature of solution (T)",
    ],
    correctOption: 0,
    formula: "W = Z × Q = Z × I × t",
    explanation: "Faraday's 1st Law states that mass deposited W = Z · Q = Z · I · t, where Z is the electrochemical equivalent and Q is the charge passed in Coulombs.",
    pyqYear: "MHT-CET 2022"
  },
];
