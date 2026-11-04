import { Question } from "../types";

/**
 * Comprehensive Target Publication MHT-CET Triumph Physics Question Bank
 * Covers Class 11 (20%) and Class 12 (80%) Maharashtra State Board Syllabus
 * with step-by-step mathematical solutions and bilingual explanations.
 */
export const TARGET_TRIUMPH_PHYSICS_QUESTIONS: Question[] = [
  // ==========================================
  // CHAPTER 1: ROTATIONAL DYNAMICS
  // ==========================================
  {
    id: "tt_phy_rot_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Centripetal & Centrifugal Force",
    difficulty: "Easy",
    questionText: "A body of mass 0.5 kg is revolved in a horizontal circle of radius 0.2 m at 2 rev/s. The centripetal force acting on the body is: [Take π² ≈ 10]",
    options: ["16 N", "8 N", "32 N", "4 N"],
    correctOption: 0,
    formula: "F_cp = m r ω² = m r (2π n)² = 4 π² m r n²",
    explanation: "Given m = 0.5 kg, r = 0.2 m, n = 2 Hz. Centripetal Force F = 4 π² m r n² = 4 × 10 × 0.5 × 0.2 × (2)² = 4 × 10 × 0.1 × 4 = 16 N.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_rot_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Moment of Inertia & Radius of Gyration",
    difficulty: "Medium",
    questionText: "The ratio of moment of inertia of a uniform circular disc about its transverse central axis to that about its diameter is:",
    options: ["2 : 1", "1 : 2", "4 : 1", "1 : 4"],
    correctOption: 0,
    formula: "I_transverse = (1/2) M R², I_diameter = (1/4) M R² (Perpendicular Axes Theorem)",
    explanation: "By Perpendicular Axes Theorem: I_z = I_x + I_y. Since disc is symmetric, I_diameter = I_x = I_y = (1/2) I_z = (1/4) M R². Therefore, ratio I_transverse / I_diameter = ((1/2) M R²) / ((1/4) M R²) = 2 / 1 = 2:1.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },
  {
    id: "tt_phy_rot_03",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Conservation of Angular Momentum",
    difficulty: "Medium",
    questionText: "A round turn-table rotates with angular speed ω. A child walks towards the centre from the rim. The angular speed of the turn-table will:",
    options: ["Increase", "Decrease", "Remain unchanged", "First decrease then increase"],
    correctOption: 0,
    formula: "L = I ω = constant. If r decreases, I decreases => ω increases",
    explanation: "Since no external torque acts (τ_ext = 0), angular momentum L = I ω is conserved. As the child moves toward the centre, the distance from axis r decreases, which decreases moment of inertia I = Σ m r². Hence, angular velocity ω must increase.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },
  {
    id: "tt_phy_rot_04",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Rolling Motion on Inclined Plane",
    difficulty: "Hard",
    questionText: "A solid sphere and a solid cylinder of same mass and radius roll down an inclined plane without slipping from the same height. Which one will reach the bottom first?",
    options: [
      "Solid Sphere",
      "Solid Cylinder",
      "Both reach simultaneously",
      "Depends on angle of inclination",
    ],
    correctOption: 0,
    formula: "Acceleration a = (g sin θ) / (1 + K²/R²). Sphere: K²/R² = 2/5 = 0.4. Cylinder: K²/R² = 1/2 = 0.5.",
    explanation: "Linear acceleration for pure rolling on inclined plane is a = (g sin θ) / (1 + K²/R²). For solid sphere, K²/R² = 2/5 = 0.4 => a_sphere = g sin θ / 1.4 ≈ 0.714 g sin θ. For cylinder, K²/R² = 0.5 => a_cyl = g sin θ / 1.5 ≈ 0.667 g sin θ. Since a_sphere > a_cyl, solid sphere has greater acceleration and reaches first.",
    pyqYear: "Target Triumph / MHT-CET 2020"
  },

  // ==========================================
  // CHAPTER 2: MECHANICAL PROPERTIES OF FLUIDS
  // ==========================================
  {
    id: "tt_phy_fluids_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    topic: "Surface Tension & Surface Energy",
    difficulty: "Medium",
    questionText: "The work done in blowing a soap bubble of radius R is W. The additional work done in increasing its radius to 2R is: (Surface tension is T)",
    options: ["3 W", "4 W", "7 W", "8 W"],
    correctOption: 0,
    formula: "Work W = T × ΔA = 2 × [4π (R₂² - R₁²)] × T (Soap bubble has 2 free surfaces)",
    explanation: "A soap bubble has 2 free surfaces, so initial work W = 2 × (4π R² - 0) T = 8π R² T. When radius increases from R to 2R: Additional work ΔW = 2 × [4π (2R)² - 4π R²] T = 8π T [4R² - R²] = 3 × (8π R² T) = 3W.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_fluids_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    topic: "Capillary Rise & Angle of Contact",
    difficulty: "Easy",
    questionText: "If a capillary tube of radius r is dipped in water, the height of water column is h. If the radius is doubled (2r), the new capillary rise will be:",
    options: ["h / 2", "2 h", "h / 4", "4 h"],
    correctOption: 0,
    formula: "Jurin's Law: h = (2 T cos θ) / (r ρ g) => h ∝ 1/r",
    explanation: "By Jurin's Law, capillary rise is inversely proportional to radius (h ∝ 1/r). When radius is doubled (r' = 2r), the new height h' = h/2.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },
  {
    id: "tt_phy_fluids_03",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    topic: "Terminal Velocity & Stokes' Law",
    difficulty: "Medium",
    questionText: "Two rain drops of radii in ratio 1 : 2 fall with terminal velocities v₁ and v₂ respectively. The ratio of their terminal velocities (v₁ / v₂) is:",
    options: ["1 : 4", "1 : 2", "1 : 8", "4 : 1"],
    correctOption: 0,
    formula: "v_t = [2 r² (ρ - σ) g] / (9 η) => v_t ∝ r²",
    explanation: "Terminal velocity is directly proportional to square of radius (v_t ∝ r²). Therefore, v₁ / v₂ = (r₁ / r₂)² = (1 / 2)² = 1 / 4.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },

  // ==========================================
  // CHAPTER 3: KINETIC THEORY OF GASES & RADIATION
  // ==========================================
  {
    id: "tt_phy_ktg_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "RMS Speed of Gas Molecules",
    difficulty: "Medium",
    questionText: "At what temperature will the rms speed of oxygen molecules become double of its value at 27°C?",
    options: ["927°C (1200 K)", "600°C", "327°C", "108°C"],
    correctOption: 0,
    formula: "v_rms = √(3 R T / M) => v_rms ∝ √T",
    explanation: "T₁ = 27 + 273 = 300 K. Since v_rms ∝ √T, to double the velocity (v₂ = 2 v₁), the absolute temperature must become 4 times: T₂ = 4 × T₁ = 4 × 300 K = 1200 K. In Celsius: t₂ = 1200 - 273 = 927°C.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_ktg_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Stefan-Boltzmann Law & Emissive Power",
    difficulty: "Medium",
    questionText: "A black body radiates heat energy at rate E at temperature 227°C. If its temperature is increased to 727°C, the rate of emission of energy will be:",
    options: ["16 E", "4 E", "8 E", "32 E"],
    correctOption: 0,
    formula: "Stefan's Law: E = σ T⁴ => E ∝ T⁴ (T in Kelvin)",
    explanation: "T₁ = 227 + 273 = 500 K. T₂ = 727 + 273 = 1000 K. Ratio T₂/T₁ = 1000 / 500 = 2. Rate of emission E₂ / E₁ = (T₂ / T₁)⁴ = (2)⁴ = 16. So E₂ = 16 E.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },

  // ==========================================
  // CHAPTER 4: THERMODYNAMICS
  // ==========================================
  {
    id: "tt_phy_thermo_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "First Law of Thermodynamics & Work Done",
    difficulty: "Medium",
    questionText: "In an isobaric process at pressure 2 × 10⁵ N/m², the volume of gas expands from 10⁻³ m³ to 3 × 10⁻³ m³. If 800 J of heat is added, the change in internal energy (ΔU) is:",
    options: ["400 J", "1200 J", "600 J", "200 J"],
    correctOption: 0,
    formula: "W = P ΔV, ΔQ = ΔU + W => ΔU = ΔQ - W",
    explanation: "Work done at constant pressure: W = P (V₂ - V₁) = (2 × 10⁵) × (3 × 10⁻³ - 1 × 10⁻³) = 2 × 10⁵ × 2 × 10⁻³ = 400 J. By First Law: ΔU = ΔQ - W = 800 J - 400 J = 400 J.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_thermo_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    topic: "Adiabatic Process & Poisson's Ratio",
    difficulty: "Hard",
    questionText: "A monoatomic gas (γ = 5/3) is compressed adiabatically to 1/8th of its original volume. The final pressure becomes how many times initial pressure P₀?",
    options: ["32 P₀", "16 P₀", "8 P₀", "64 P₀"],
    correctOption: 0,
    formula: "P V^γ = constant => P₂ = P₁ × (V₁ / V₂)^γ",
    explanation: "P₂ = P₀ × (V₀ / (V₀/8))^(5/3) = P₀ × (8)^(5/3) = P₀ × (2³)^(5/3) = P₀ × 2⁵ = 32 P₀.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },

  // ==========================================
  // CHAPTER 5: OSCILLATIONS
  // ==========================================
  {
    id: "tt_phy_osc_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Linear S.H.M. Velocity & Acceleration",
    difficulty: "Medium",
    questionText: "A particle performs S.H.M. of amplitude 5 cm and time period 2 s. Its velocity when it is at a displacement x = 3 cm from mean position is: [Take π ≈ 3.14]",
    options: ["4 π cm/s (≈ 12.56 cm/s)", "3 π cm/s", "5 π cm/s", "2 π cm/s"],
    correctOption: 0,
    formula: "v = ω √(A² - x²), where ω = 2π / T",
    explanation: "ω = 2π / T = 2π / 2 = π rad/s. Velocity v = π √(5² - 3²) = π √(25 - 9) = π √16 = 4π cm/s ≈ 12.56 cm/s.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_osc_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Total Energy in S.H.M.",
    difficulty: "Easy",
    questionText: "In a linear S.H.M., at what displacement from the mean position is the kinetic energy equal to the potential energy?",
    options: ["x = A / √2", "x = A / 2", "x = A / 4", "x = (√3/2) A"],
    correctOption: 0,
    formula: "K.E. = (1/2) k (A² - x²), P.E. = (1/2) k x² => A² - x² = x² => x = A / √2",
    explanation: "K.E. = P.E. => (1/2) k (A² - x²) = (1/2) k x² => A² - x² = x² => 2 x² = A² => x = ± A / √2 ≈ 0.707 A.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },

  // ==========================================
  // CHAPTER 6: SUPERPOSITION OF WAVES
  // ==========================================
  {
    id: "tt_phy_waves_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Organ Pipe Harmonics & Frequencies",
    difficulty: "Medium",
    questionText: "A pipe closed at one end of length 33 cm resonates in fundamental mode with tuning fork of frequency 250 Hz. The velocity of sound in air is: (Neglect end correction)",
    options: ["330 m/s", "340 m/s", "320 m/s", "300 m/s"],
    correctOption: 0,
    formula: "Fundamental frequency for closed pipe n = v / (4 L) => v = 4 n L",
    explanation: "For closed pipe: n = v / (4 L). Given n = 250 Hz, L = 0.33 m. Velocity v = 4 × 250 × 0.33 = 1000 × 0.33 = 330 m/s.",
    pyqYear: "Target Triumph / MHT-CET 2020"
  },
  {
    id: "tt_phy_waves_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Oscillations & Waves",
    topic: "Law of Length for Sonometer",
    difficulty: "Easy",
    questionText: "In a sonometer wire, if the tension is increased 4 times and vibrating length is doubled, the fundamental frequency will:",
    options: [
      "Remain unchanged",
      "Become double",
      "Become half",
      "Increase 4 times",
    ],
    correctOption: 0,
    formula: "n = (1 / 2L) √(T / m) => n ∝ (√T) / L",
    explanation: "New frequency n' ∝ √(4T) / (2L) = (2 √T) / (2 L) = (√T) / L = n. The frequency remains unchanged.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },

  // ==========================================
  // CHAPTER 7: WAVE OPTICS
  // ==========================================
  {
    id: "tt_phy_optics_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Young's Double Slit Experiment (YDSE)",
    difficulty: "Medium",
    questionText: "In YDSE with light of wavelength 6000 Å, the slit separation is 0.6 mm and screen distance is 1 m. The distance between 3rd bright fringe and central bright fringe is:",
    options: ["3.0 mm", "1.5 mm", "4.5 mm", "6.0 mm"],
    correctOption: 0,
    formula: "Fringe width β = λ D / d, Distance of n-th bright fringe y_n = n β = n λ D / d",
    explanation: "Fringe width β = (6000 × 10⁻¹⁰ × 1) / (0.6 × 10⁻³) = 10⁻³ m = 1.0 mm. For 3rd bright fringe (n = 3), distance y₃ = 3 × 1.0 mm = 3.0 mm.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_optics_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    topic: "Brewster's Law & Polarization",
    difficulty: "Easy",
    questionText: "If the polarizing angle of a medium is 60°, the refractive index (μ) of the medium is:",
    options: ["√3 (≈ 1.732)", "1 / √3", "1.5", "1.33"],
    correctOption: 0,
    formula: "Brewster's Law: μ = tan(i_p)",
    explanation: "By Brewster's Law, μ = tan(i_p) = tan(60°) = √3 ≈ 1.732.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },

  // ==========================================
  // CHAPTER 8: ELECTROSTATICS
  // ==========================================
  {
    id: "tt_phy_elec_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Parallel Plate Capacitor with Dielectric",
    difficulty: "Medium",
    questionText: "A parallel plate air capacitor has capacitance C₀. If a dielectric slab of dielectric constant K = 5 and thickness equal to half the plate separation (d/2) is inserted, the new capacitance becomes:",
    options: ["(5/3) C₀", "(3/5) C₀", "5 C₀", "(2/5) C₀"],
    correctOption: 0,
    formula: "C = (ε₀ A) / (d - t + t/K) with C₀ = ε₀ A / d",
    explanation: "C = (ε₀ A) / [d - d/2 + (d/2)/5] = (ε₀ A) / [d/2 + d/10] = (ε₀ A) / [6d / 10] = (10/6) (ε₀ A / d) = (5/3) C₀.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_elec_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Electric Dipole in Uniform Field",
    difficulty: "Easy",
    questionText: "An electric dipole placed in a uniform electric field experiences:",
    options: [
      "Only a torque, but net force is zero",
      "Both net force and torque",
      "Only net force, but torque is zero",
      "Neither force nor torque",
    ],
    correctOption: 0,
    formula: "F_net = q E + (-q E) = 0; Torque τ = p × E = p E sin θ",
    explanation: "In a uniform electric field, the two equal and opposite charges experience equal and opposite forces (qE and -qE), so net force F_net = 0. However, since the forces have different lines of action, they form a couple producing torque τ = p E sin θ.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },

  // ==========================================
  // CHAPTER 9: CURRENT ELECTRICITY
  // ==========================================
  {
    id: "tt_phy_curr_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Potentiometer - Comparison of EMFs",
    difficulty: "Medium",
    questionText: "In a potentiometer experiment, the balancing length for a cell of EMF E₁ is 60 cm. When another cell of EMF E₂ is connected in series aiding with E₁, balancing length is 100 cm. The ratio E₁ / E₂ is:",
    options: ["3 : 2", "2 : 3", "5 : 3", "3 : 5"],
    correctOption: 0,
    formula: "E₁ ∝ 60 and (E₁ + E₂) ∝ 100 => (E₁ + E₂) / E₁ = 100 / 60 = 5 / 3",
    explanation: "From (E₁ + E₂) / E₁ = 5/3 => 1 + E₂/E₁ = 5/3 => E₂/E₁ = 2/3 => E₁/E₂ = 3/2 = 3:2.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },
  {
    id: "tt_phy_curr_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    topic: "Meter Bridge & End Resistance",
    difficulty: "Easy",
    questionText: "In a meter bridge experiment, null point is obtained at 40 cm from left end when unknown resistance X is in left gap and resistance 6 Ω is in right gap. The value of X is:",
    options: ["4 Ω", "9 Ω", "6 Ω", "3 Ω"],
    correctOption: 0,
    formula: "X / R = l_X / l_R = l_X / (100 - l_X)",
    explanation: "X / 6 = 40 / (100 - 40) = 40 / 60 = 2 / 3 => X = 6 × (2/3) = 4 Ω.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },

  // ==========================================
  // CHAPTER 10: MAGNETIC FIELDS DUE TO ELECTRIC CURRENT
  // ==========================================
  {
    id: "tt_phy_mag_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electromagnetic Induction & AC",
    topic: "Magnetic Field at Centre of Circular Coil",
    difficulty: "Medium",
    questionText: "A circular coil of N turns and radius R carries current I producing magnetic field B at its centre. If the coil is rewound into 2N turns of radius R/2 carrying same current, the new magnetic field at centre becomes:",
    options: ["4 B", "2 B", "8 B", "B / 4"],
    correctOption: 0,
    formula: "B = (μ₀ N I) / (2 R) => B' = [μ₀ (2N) I] / [2 (R/2)] = 4 B",
    explanation: "Initial field B = μ₀ N I / (2 R). New field B' = μ₀ (2N) I / (2 (R/2)) = 4 × (μ₀ N I / (2 R)) = 4 B.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },

  // ==========================================
  // CHAPTER 11: ELECTROMAGNETIC INDUCTION & AC CIRCUITS
  // ==========================================
  {
    id: "tt_phy_emi_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electromagnetic Induction & AC",
    topic: "Resonance in Series LCR Circuit",
    difficulty: "Medium",
    questionText: "In a series LCR circuit with L = 0.1 H, C = 10 μF, and R = 10 Ω, the resonant angular frequency (ω₀) and quality factor (Q) are respectively:",
    options: ["1000 rad/s and 10", "500 rad/s and 5", "1000 rad/s and 100", "2000 rad/s and 20"],
    correctOption: 0,
    formula: "ω₀ = 1 / √(L C) and Q = (ω₀ L) / R = (1 / R) √(L / C)",
    explanation: "ω₀ = 1 / √(0.1 × 10 × 10⁻⁶) = 1 / √(10⁻⁶) = 1 / 10⁻³ = 1000 rad/s. Quality factor Q = (ω₀ L) / R = (1000 × 0.1) / 10 = 100 / 10 = 10.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },
  {
    id: "tt_phy_emi_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Electromagnetic Induction & AC",
    topic: "Induced EMF in Rotating Rod",
    difficulty: "Medium",
    questionText: "A metal rod of length 1 m rotates about one of its ends in a perpendicular uniform magnetic field of 0.5 T with angular speed 20 rad/s. The induced EMF between its ends is:",
    options: ["5.0 V", "10.0 V", "2.5 V", "1.0 V"],
    correctOption: 0,
    formula: "e = (1/2) B ω L²",
    explanation: "Induced EMF across rotating rod e = (1/2) B ω L² = (1/2) × 0.5 × 20 × (1)² = 0.5 × 10 = 5.0 V.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },

  // ==========================================
  // CHAPTER 12: DUAL NATURE OF RADIATION & MATTER
  // ==========================================
  {
    id: "tt_phy_dual_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Photoelectric Effect & Stopping Potential",
    difficulty: "Medium",
    questionText: "When light of frequency ν is incident on a photosensitive metal plate, stopping potential is V₀. When light of frequency 2ν is incident, the stopping potential becomes:",
    options: [
      "More than 2 V₀",
      "Exactly 2 V₀",
      "Less than 2 V₀",
      "V₀ / 2",
    ],
    correctOption: 0,
    formula: "e V₀ = h ν - Φ₀ => e V' = 2 h ν - Φ₀ = 2 (h ν - Φ₀) + Φ₀ = 2 e V₀ + Φ₀ > 2 e V₀",
    explanation: "e V' = 2 h ν - Φ₀ = 2 (e V₀ + Φ₀) - Φ₀ = 2 e V₀ + Φ₀. Since work function Φ₀ > 0, V' = 2 V₀ + (Φ₀ / e) > 2 V₀.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
  {
    id: "tt_phy_dual_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "de Broglie Wavelength of Electron",
    difficulty: "Easy",
    questionText: "An electron is accelerated through a potential difference of 100 V. Its de Broglie wavelength is approximately:",
    options: ["1.227 Å", "0.1227 Å", "12.27 Å", "0.0123 Å"],
    correctOption: 0,
    formula: "λ = 12.27 / √V Å for electron",
    explanation: "For an accelerated electron, λ = 12.27 / √V = 12.27 / √100 = 12.27 / 10 = 1.227 Å (0.1227 nm).",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },

  // ==========================================
  // CHAPTER 13: STRUCTURE OF ATOMS & NUCLEI
  // ==========================================
  {
    id: "tt_phy_atom_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Bohr's Hydrogen Spectrum",
    difficulty: "Medium",
    questionText: "The ratio of longest wavelength to shortest wavelength in the Balmer series of hydrogen atom spectrum is:",
    options: ["9 : 5", "5 : 9", "4 : 3", "16 : 9"],
    correctOption: 0,
    formula: "1/λ = R (1/2² - 1/n²). Max λ at n=3: 1/λ_max = R (1/4 - 1/9) = 5R/36. Min λ at n=∞: 1/λ_min = R (1/4 - 0) = R/4.",
    explanation: "Longest wavelength λ_max = 36 / (5 R). Shortest wavelength λ_min = 4 / R. Ratio λ_max / λ_min = (36 / 5R) / (4 / R) = 36 / 20 = 9 / 5 = 9:5.",
    pyqYear: "Target Triumph / MHT-CET 2021"
  },
  {
    id: "tt_phy_atom_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Half Life & Radioactive Decay",
    difficulty: "Easy",
    questionText: "The half-life of a radioactive substance is 30 days. The fraction of initial activity remaining after 90 days will be:",
    options: ["1 / 8 (12.5%)", "1 / 4 (25%)", "1 / 16 (6.25%)", "1 / 2 (50%)"],
    correctOption: 0,
    formula: "N / N₀ = (1/2)^n, where n = total time / half life = 90 / 30 = 3",
    explanation: "Number of half-lives n = 90 / 30 = 3. Remaining fraction N/N₀ = (1/2)³ = 1/8 (12.5%).",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },

  // ==========================================
  // CHAPTER 14: SEMICONDUCTOR DEVICES
  // ==========================================
  {
    id: "tt_phy_semi_01",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Full Wave Rectifier Frequency",
    difficulty: "Easy",
    questionText: "If the input AC frequency to a full-wave rectifier is 50 Hz, the fundamental ripple frequency in the output is:",
    options: ["100 Hz", "50 Hz", "25 Hz", "200 Hz"],
    correctOption: 0,
    formula: "Output ripple frequency for Full-wave rectifier = 2 × f_in = 2 × 50 Hz = 100 Hz",
    explanation: "In a full-wave rectifier, both positive and negative half cycles are rectified, so output pulses occur at twice the input AC frequency: f_out = 2 × 50 Hz = 100 Hz.",
    pyqYear: "Target Triumph / MHT-CET 2023"
  },
  {
    id: "tt_phy_semi_02",
    exam: "MHT_CET",
    subject: "Physics",
    chapter: "Modern Physics & Dual Nature",
    topic: "Zener Diode as Voltage Regulator",
    difficulty: "Easy",
    questionText: "A Zener diode is specially designed to operate in which bias condition?",
    options: [
      "Reverse breakdown region",
      "Forward bias only",
      "Zero bias",
      "Both forward and reverse with equal efficiency",
    ],
    correctOption: 0,
    formula: "Zener diode operates in reverse breakdown region at V_Z = constant",
    explanation: "A Zener diode is a heavily doped p-n junction diode fabricated to work in reverse breakdown voltage region where voltage remains constant over a wide range of reverse currents.",
    pyqYear: "Target Triumph / MHT-CET 2022"
  },
];
