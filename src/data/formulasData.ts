import { FormulaCard } from "../types";

export const FORMULA_CARDS: FormulaCard[] = [
  // PHYSICS
  {
    id: "f_phy_01",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Physics",
    chapter: "Rotational Dynamics",
    title: "Rolling Acceleration on Incline",
    formula: "a = (g · sin θ) / (1 + I / (M·R²)) = (g · sin θ) / (1 + k²/R²)",
    description: "Used to calculate linear acceleration of a body rolling without slipping down an inclined plane of angle θ.",
    keyUnits: "a in m/s², θ in degrees/rad",
    tip: "Solid Sphere: k²/R² = 2/5 (0.4) | Disc/Cylinder: k²/R² = 1/2 (0.5) | Ring/Hollow Cylinder: k²/R² = 1 (1.0). Sphere reaches bottom first!"
  },
  {
    id: "f_phy_02",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Physics",
    chapter: "Electrostatics & Current Electricity",
    title: "Capacitance with Dielectric Slabs",
    formula: "C = (ε₀ · A) / [ (d - Σt) + Σ(tᵢ / kᵢ) ]",
    description: "Equivalent capacitance of a parallel plate capacitor when partially filled with dielectrics of thicknesses tᵢ and dielectric constants kᵢ.",
    keyUnits: "C in Farads (F) / pF",
    tip: "If completely filled with slab of thickness d: C = k · C₀"
  },
  {
    id: "f_phy_03",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Physics",
    chapter: "Optics (Ray & Wave Optics)",
    title: "Young's Double Slit Fringe Width",
    formula: "β = (λ · D) / d",
    description: "Fringe width (distance between two successive bright or dark bands) in YDSE.",
    keyUnits: "β, D, d in meters; λ in nm / Å",
    tip: "In medium of refractive index μ: β' = β / μ (fringe width decreases)."
  },
  {
    id: "f_phy_04",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Physics",
    chapter: "Thermodynamics & Kinetic Theory",
    title: "Carnot Engine Efficiency & Work",
    formula: "η = 1 - (T_sink / T_source) = W / Q_in",
    description: "Maximum theoretical efficiency of any heat engine operating between absolute temperatures T_source (T₁) and T_sink (T₂).",
    keyUnits: "Temperatures MUST be in Kelvin (K).",
    tip: "Always convert Celsius to Kelvin: T(K) = T(°C) + 273.15."
  },

  // CHEMISTRY
  {
    id: "f_chem_01",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Chemistry",
    chapter: "Solutions & Colligative Properties",
    title: "Colligative Properties & Van't Hoff Factor",
    formula: "ΔTb = i · Kb · m  |  ΔTf = i · Kf · m  |  π = i · C · R · T",
    description: "Boiling point elevation, freezing point depression, and osmotic pressure accounting for dissociation/association.",
    keyUnits: "m = molality (mol/kg), π = atm/bar",
    tip: "For complete dissociation: i = 1 + (n - 1)α where n is number of ions produced per molecule."
  },
  {
    id: "f_chem_02",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    title: "Nernst Equation for Cell EMF",
    formula: "E_cell = E°_cell - (0.0591 / n) · log₁₀(Q)  [at 298 K]",
    description: "Calculates the electromotive force (EMF) of an electrochemical cell at non-standard ion concentrations.",
    keyUnits: "E in Volts (V), n = number of transferred electrons",
    tip: "At equilibrium: E_cell = 0 and Q = K_eq, so E°_cell = (0.0591 / n) log₁₀(K_eq)."
  },
  {
    id: "f_chem_03",
    exam: ["NEET", "JEE_MAIN", "MHT_CET"],
    subject: "Chemistry",
    chapter: "Electrochemistry & Chemical Kinetics",
    title: "First Order Kinetics Half-Life",
    formula: "t₁/₂ = 0.693 / k  |  k = (2.303 / t) · log₁₀([A]₀ / [A]ₜ)",
    description: "Half-life of first order reaction is independent of initial concentration [A]₀.",
    keyUnits: "k in s⁻¹ or min⁻¹",
    tip: "Time for 75% completion = 2 · t₁/₂; Time for 99.9% completion ≈ 10 · t₁/₂."
  },

  // MATHEMATICS
  {
    id: "f_math_01",
    exam: ["JEE_MAIN", "MHT_CET"],
    subject: "Mathematics",
    chapter: "Calculus (Differentiation & Integration)",
    title: "King's Property of Definite Integrals",
    formula: "∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx",
    description: "Extremely useful in simplifying symmetric integrals involving sin/cos and polynomials.",
    tip: "Add original integral I and transformed integral I to eliminate tough denominators!"
  },
  {
    id: "f_math_02",
    exam: ["JEE_MAIN", "MHT_CET"],
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    title: "Adjoint and Determinant Properties",
    formula: "|adj(A)| = |A|^(n - 1)  |  |adj(adj(A))| = |A|^((n - 1)²)",
    description: "Relationships for square matrices of order n.",
    tip: "Also remember: A · adj(A) = adj(A) · A = |A| · Iₙ and A⁻¹ = adj(A) / |A|."
  },
  {
    id: "f_math_03",
    exam: ["JEE_MAIN", "MHT_CET"],
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    title: "Shortest Distance Between Skew Lines",
    formula: "d = | (a₂ - a₁) · (b₁ × b₂) | / | b₁ × b₂ |",
    description: "Shortest distance between two non-parallel, non-intersecting 3D lines r = a₁ + λb₁ and r = a₂ + μb₂.",
    tip: "If lines intersect, distance d = 0, meaning (a₂ - a₁) · (b₁ × b₂) = 0."
  },
];
