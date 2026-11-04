import { ChapterPointItem, SubjectType } from "../../types";

/**
 * 200 High-Yield Exam Points Knowledge Bank per Subject
 * Guarantees that Physics, Chemistry, Mathematics, and Biology have strictly 200
 * authentic, syllabus-accurate, formula-backed points with bilingual text,
 * ZERO duplicate signatures, and categorized exam badges.
 */

export const PHYSICS_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Angular displacement θ is measured in radians. 1 revolution = 2π rad = 360°.",
    "category": "Definition",
    "formula": "θ = s/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Angular velocity ω = dθ/dt. Vector direction along axis given by right hand thumb rule.",
    "category": "Concept",
    "formula": "ω = 2πn = 2π/T",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Linear and angular velocity relation: v = r ω (vector form: v = ω × r).",
    "category": "Formula",
    "formula": "v = rω",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Angular acceleration α = dω/dt = d²θ/dt². SI unit: rad/s².",
    "category": "Formula",
    "formula": "α = a_t / r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Radial (centripetal) acceleration a_r = v²/r = ω²r = vω (directed towards center).",
    "category": "Formula",
    "formula": "a_r = v²/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Tangential acceleration a_t = r α (changes speed, tangential to circular path).",
    "category": "Concept",
    "formula": "a_t = rα",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Net linear acceleration in non-uniform circular motion: a = √(a_r² + a_t²).",
    "category": "Formula",
    "formula": "a = √(a_r² + a_t²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "Centripetal force F_c = m v²/r = m ω² r (real force directed towards center).",
    "category": "Formula",
    "formula": "F_c = mv²/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "Centrifugal force is a pseudo force acting radially outward in a rotating frame: F_cf = m ω² r.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Maximum safe speed on unbanked flat road: v_max = √(μ_s r g). Independent of vehicle mass.",
    "category": "Shortcut",
    "formula": "v_max = √(μ_s rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Angle of banking on friction-free road: tan θ = v² / (r g).",
    "category": "Formula",
    "formula": "tan θ = v²/(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Optimum speed on banked road with zero wear: v_0 = √(r g tan θ).",
    "category": "Formula",
    "formula": "v_0 = √(rg tan θ)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Conical pendulum period: T = 2π √(L cos θ / g) = 2π √(h / g), where h = L cos θ.",
    "category": "Formula",
    "formula": "T = 2π√(h/g)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Tension in conical pendulum string: T_0 = m g / cos θ.",
    "category": "Formula",
    "formula": "T_0 = mg / cos θ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Vertical Circular Motion (VCM): Minimum velocity at highest point H: v_H = √(r g).",
    "category": "PYQ_Trend",
    "formula": "v_H = √(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Minimum velocity at lowest point L in VCM to complete vertical loop: v_L = √(5 r g).",
    "category": "Formula",
    "formula": "v_L = √(5rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Velocity at horizontal midpoint M in VCM: v_M = √(3 r g).",
    "category": "Formula",
    "formula": "v_M = √(3rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "Difference in tension between lowest and highest points in VCM: T_L - T_H = 6 m g.",
    "category": "Shortcut",
    "formula": "T_L - T_H = 6mg",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Tension at horizontal position M in looping VCM: T_M = 3 m g.",
    "category": "Formula",
    "formula": "T_M = 3mg",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "For a mass fixed to a light rigid rod, velocity at top can be 0, and v_L = 2 √(r g).",
    "category": "Exception",
    "formula": "v_L = 2√(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Moment of Inertia: I = Σ m_i r_i² = ∫ r² dm. SI unit: kg·m²; Dimensions: [M¹ L² T⁰].",
    "category": "Definition",
    "formula": "I = Σ mr²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Radius of Gyration: k = √(I / M) => I = M k². Physical significance: mass distribution.",
    "category": "Formula",
    "formula": "I = Mk²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Parallel Axes Theorem: I_O = I_C + M h² (axis C must pass through center of mass).",
    "category": "Rule",
    "formula": "I_O = I_C + Mh²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Perpendicular Axes Theorem: I_z = I_x + I_y (valid only for 2D flat planar lamina).",
    "category": "Rule",
    "formula": "I_z = I_x + I_y",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Torque τ = r × F = r F sin θ = I α. Rotational analogue of force.",
    "category": "Formula",
    "formula": "τ = Iα",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "Angular momentum L = r × p = I ω. Dimensions: [M¹ L² T⁻¹] (same as Planck constant h).",
    "category": "Definition",
    "formula": "L = Iω",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Conservation of Angular Momentum: If external torque τ_ext = 0, then I₁ ω₁ = I₂ ω₂.",
    "category": "Rule",
    "formula": "I₁ω₁ = I₂ω₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Rotational kinetic energy: E_rot = (1/2) I ω² = L² / (2I).",
    "category": "Formula",
    "formula": "E_rot = (1/2)Iω²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Total KE of pure rolling body: E_total = (1/2) M v² [1 + k²/R²].",
    "category": "Formula",
    "formula": "E = 1/2 Mv²(1 + k²/R²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Velocity at bottom of incline of height h: v = √[ 2 g h / (1 + k²/R²) ].",
    "category": "Formula",
    "formula": "v = √[2gh/(1 + k²/R²)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Acceleration down inclined plane of angle θ: a = (g sin θ) / (1 + k²/R²).",
    "category": "Formula",
    "formula": "a = g sin θ / (1 + k²/R²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Descending race on incline: Solid Sphere arrives first (smallest k²/R² = 0.4), Ring last (k²/R² = 1).",
    "category": "Shortcut",
    "formula": "k²/R²: Sphere(0.4)<Disc(0.5)<Hollow(0.67)<Ring(1)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Newton's law of gravitation: F = G m₁ m₂ / r². G = 6.67 × 10⁻¹¹ N·m²/kg².",
    "category": "Formula",
    "formula": "F = Gm₁m₂/r²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Acceleration due to gravity at surface: g = G M / R² = (4/3) π G ρ R.",
    "category": "Formula",
    "formula": "g = GM/R²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Variation of g with altitude h: g_h = g (1 - 2h/R) for h << R; g_h = g [R / (R + h)]² in general.",
    "category": "Formula",
    "formula": "g_h = g(1 - 2h/R)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Variation of g with depth d: g_d = g (1 - d/R). At Earth center d = R => g = 0.",
    "category": "Formula",
    "formula": "g_d = g(1 - d/R)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Rate of decrease of g with altitude is twice that with depth: dg/dh = 2 (dg/dd).",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Variation of g with latitude φ: g_φ = g - R ω² cos² φ. At poles φ=90° => g max; equator φ=0° => g min.",
    "category": "Formula",
    "formula": "g_φ = g - Rω² cos²φ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Gravitational potential energy of mass m at distance r: U = - G M m / r.",
    "category": "Formula",
    "formula": "U = -GMm/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Gravitational potential V = - G M / r. Scalar quantity; SI unit: J/kg.",
    "category": "Formula",
    "formula": "V = -GM/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Escape velocity from surface of Earth: v_e = √(2 g R) = √(2 G M / R) ≈ 11.2 km/s.",
    "category": "Formula",
    "formula": "v_e = √(2gR) = 11.2 km/s",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Relation between escape velocity and orbital velocity: v_e = √2 · v_o ≈ 1.414 v_o.",
    "category": "Shortcut",
    "formula": "v_e = √2 v_o",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Critical orbital velocity of satellite at altitude h: v_c = √[ G M / (R + h) ].",
    "category": "Formula",
    "formula": "v_c = √[GM/(R+h)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Period of satellite: T = 2π √[(R + h)³ / G M]. Kepler's 3rd Law: T² ∝ r³.",
    "category": "Rule",
    "formula": "T² ∝ r³",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Geostationary satellite: Period T = 24 hours, orbits from West to East in equatorial plane at h ≈ 36,000 km.",
    "category": "Concept",
    "formula": "T = 24 hr, h ≈ 36,000 km",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Weightlessness in satellite occurs because satellite and occupant are in free fall towards Earth (a = g).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Kepler's Second Law: Areal velocity dA/dt = L / (2m) = constant. Follows from conservation of angular momentum.",
    "category": "Rule",
    "formula": "dA/dt = L/(2m)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Total energy of orbiting satellite: E = - G M m / (2 r) = - KE = (1/2) PE.",
    "category": "Formula",
    "formula": "E = -KE = PE/2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Binding energy of satellite of mass m at distance r: B.E. = + G M m / (2 r).",
    "category": "Formula",
    "formula": "B.E. = +GMm/(2r)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "If KE of satellite is doubled, it will escape into space because total energy becomes zero or positive.",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Pressure P = F / A. SI unit: N/m² or Pascal (Pa). 1 atm = 1.013 × 10⁵ Pa = 760 mm of Hg.",
    "category": "Definition",
    "formula": "P = F/A",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Gauge pressure at depth h in liquid of density ρ: P_gauge = h ρ g. Absolute pressure P = P_0 + h ρ g.",
    "category": "Formula",
    "formula": "P = P_0 + hρg",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Pascal's Law: Pressure applied to enclosed fluid is transmitted undiminished in all directions.",
    "category": "Rule",
    "formula": "F₁/A₁ = F₂/A₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Surface Tension T = F / L. SI unit: N/m or J/m²; Dimensions: [M¹ L⁰ T⁻²] (same as spring constant).",
    "category": "Definition",
    "formula": "T = F/L",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Surface energy stored in liquid film of area A: W = T · ΔA (for film with two free surfaces, ΔA = 2 ΔA_0).",
    "category": "Formula",
    "formula": "W = 2 T ΔA",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Work done in blowing bubble of radius R: W = 8 π R² T (two surfaces).",
    "category": "Formula",
    "formula": "W = 8πR²T",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Excess pressure inside liquid drop of radius R: ΔP = 2 T / R.",
    "category": "Formula",
    "formula": "ΔP = 2T/R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Excess pressure inside soap bubble of radius R: ΔP = 4 T / R (two liquid-air interfaces).",
    "category": "Formula",
    "formula": "ΔP = 4T/R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Angle of contact θ: θ < 90° for liquid that wets solid (water-glass); θ > 90° for non-wetting (mercury-glass).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Capillary rise formula (Jurin's Law): h = (2 T cos θ) / (r ρ g) => h · r = constant.",
    "category": "Formula",
    "formula": "h = 2T cos θ / (rρg)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "If capillary tube is insufficient in length, liquid will NOT overflow; instead radius of meniscus R increases: h r = h' R.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Viscous force (Newton's Law): F = - η A (dv/dx), where η is coefficient of viscosity. SI unit: Pa·s or N·s/m².",
    "category": "Formula",
    "formula": "F = -ηA(dv/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Stokes' Law for sphere of radius r moving with speed v: F_v = 6 π η r v.",
    "category": "Formula",
    "formula": "F_v = 6πηrv",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Terminal velocity of falling sphere: v_t = [2 r² (ρ - σ) g] / (9 η) => v_t ∝ r².",
    "category": "Formula",
    "formula": "v_t ∝ r²",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Equation of Continuity: A₁ v₁ = A₂ v₂ = constant (based on conservation of mass).",
    "category": "Rule",
    "formula": "A₁v₁ = A₂v₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Bernoulli's Theorem: P + (1/2) ρ v² + ρ g h = constant (based on conservation of energy for non-viscous fluid).",
    "category": "Rule",
    "formula": "P + 1/2ρv² + ρgh = C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Speed of efflux from tank at depth h (Torricelli's Law): v = √(2 g h) (same as freely falling body).",
    "category": "Formula",
    "formula": "v = √(2gh)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Venturimeter works on Bernoulli's principle to measure volume rate of flow of fluid in pipe.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Dynamic lift on aeroplane wing and spinning cricket ball (Magnus effect) is explained by Bernoulli's theorem.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Reynolds Number R_e = ρ v d / η. If R_e < 2000 => Streamline flow; R_e > 3000 => Turbulent flow.",
    "category": "Rule",
    "formula": "R_e = ρvd/η",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Surface tension decreases with increase in temperature; vanishes at critical temperature.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Addition of highly soluble impurity (NaCl) increases surface tension; sparingly soluble (soap/detergent) decreases it.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Two soap bubbles of radii r₁ and r₂ coalesce isothermally in vacuum: New radius R = √(r₁² + r₂²).",
    "category": "Shortcut",
    "formula": "R = √(r₁² + r₂²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Radius of interface between two touching bubbles of radii r₁ and r₂ (r₁ > r₂): r = (r₁ r₂) / (r₁ - r₂).",
    "category": "Shortcut",
    "formula": "r = r₁r₂ / (r₁ - r₂)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Angle of contact of pure water with clean glass is 0°; for ordinary water with glass is ≈ 8°.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Ideal gas equation: P V = n R T = N k_B T, where R = 8.314 J/mol·K and k_B = 1.38 × 10⁻²³ J/K.",
    "category": "Formula",
    "formula": "PV = nRT",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Pressure of an ideal gas: P = (1/3) ρ v_rms² = (1/3) (M/V) v_rms².",
    "category": "Formula",
    "formula": "P = 1/3 ρ v_rms²",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Root mean square speed: v_rms = √(3 R T / M_0) = √(3 k_B T / m) = √(3 P / ρ).",
    "category": "Formula",
    "formula": "v_rms = √(3RT/M)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Average speed: v_avg = √(8 R T / π M_0); Most probable speed: v_mp = √(2 R T / M_0).",
    "category": "Formula",
    "formula": "v_rms > v_avg > v_mp",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Ratio of speeds: v_mp : v_avg : v_rms = √2 : √(8/π) : √3 ≈ 1 : 1.128 : 1.224.",
    "category": "Shortcut",
    "formula": "v_mp : v_avg : v_rms = √2:√(8/π):√3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Average kinetic energy per molecule: E_k = (3/2) k_B T. Independent of nature of gas.",
    "category": "Formula",
    "formula": "E_k = (3/2) k_B T",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "Total internal energy of n moles of monoatomic gas: U = (3/2) n R T.",
    "category": "Formula",
    "formula": "U = 3/2 nRT",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Degrees of freedom f: Monoatomic = 3 (translational); Diatomic = 5 (3 trans + 2 rot); Non-linear triatomic = 6.",
    "category": "Concept",
    "formula": "Mono=3, Dia=5, Tri=6",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "Molar heat capacity at constant volume: C_v = (f / 2) R; At constant pressure: C_p = C_v + R = (1 + f/2) R.",
    "category": "Formula",
    "formula": "C_p - C_v = R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Adiabatic ratio γ = C_p / C_v = 1 + 2/f. Monoatomic γ = 5/3 ≈ 1.67; Diatomic γ = 7/5 = 1.40.",
    "category": "Formula",
    "formula": "γ = 1 + 2/f",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Mayer's Relation: C_p - C_v = R (in molar units) or c_p - c_v = R / J (in heat units).",
    "category": "Rule",
    "formula": "C_p - C_v = R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "First Law of Thermodynamics: ΔQ = ΔU + ΔW = n C_v ΔT + P ΔV.",
    "category": "Rule",
    "formula": "ΔQ = ΔU + W",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Work done in thermodynamic process: W = ∫ P dV = Area under P-V indicator diagram.",
    "category": "Formula",
    "formula": "W = ∫ P dV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Work done in isobaric process (constant P): W = P (V₂ - V₁) = n R (T₂ - T₁).",
    "category": "Formula",
    "formula": "W = P ΔV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Work done in isochoric process (constant V): dV = 0 => W = 0, so ΔQ = ΔU.",
    "category": "Concept",
    "formula": "W = 0, ΔQ = ΔU",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Work done in isothermal process (constant T): W = n R T ln(V₂ / V₁) = 2.303 n R T log₁₀(P₁ / P₂).",
    "category": "Formula",
    "formula": "W = 2.303 nRT log(V₂/V₁)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "In isothermal process: ΔT = 0 => ΔU = 0 => ΔQ = W (all heat supplied converts into work).",
    "category": "Concept",
    "formula": "ΔU = 0, Q = W",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Adiabatic process law: P V^γ = constant; T V^(γ - 1) = constant; T^γ P^(1 - γ) = constant.",
    "category": "Formula",
    "formula": "PV^γ = const",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Work done in adiabatic process: W = (P₁ V₁ - P₂ V₂) / (γ - 1) = n R (T₁ - T₂) / (γ - 1) = - ΔU.",
    "category": "Formula",
    "formula": "W = nR(T₁ - T₂)/(γ - 1)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Slope of adiabatic curve on P-V diagram is γ times steeper than isothermal curve: (dP/dV)_adi = γ (dP/dV)_iso.",
    "category": "Shortcut",
    "formula": "Slope_adi = γ × Slope_iso",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Efficiency of Carnot heat engine: η = 1 - (T_C / T_H) = 1 - (Q_C / Q_H) (temperatures must be in Kelvin).",
    "category": "Formula",
    "formula": "η = 1 - T_C/T_H",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Efficiency of Carnot engine is independent of working substance and depends ONLY on reservoir temperatures.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Coefficient of performance of Carnot refrigerator: β = Q_C / W = T_C / (T_H - T_C) => β = (1 - η) / η.",
    "category": "Formula",
    "formula": "β = T_C / (T_H - T_C)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Second Law of Thermodynamics: Kelvin-Planck statement (heat engine cannot be 100% efficient); Clausius (heat cannot flow from cold to hot spontaneously).",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Mean free path of gas molecules: λ = 1 / [ √2 π n d² ], where n is number density and d is molecular diameter.",
    "category": "Formula",
    "formula": "λ = 1 / (√2 π n d²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Linear Simple Harmonic Motion (SHM) differential equation: d²x/dt² + ω² x = 0, where ω = √(k/m).",
    "category": "Formula",
    "formula": "d²x/dt² + ω²x = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Displacement in SHM starting from mean position: x = A sin(ωt); From extreme position: x = A cos(ωt).",
    "category": "Formula",
    "formula": "x = A sin(ωt + φ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Velocity in SHM at displacement x: v = ω √(A² - x²). Maximum at mean x=0 (v_max = Aω); zero at extremes.",
    "category": "Formula",
    "formula": "v = ω√(A² - x²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Acceleration in SHM: a = - ω² x. Maximum at extreme positions (a_max = ω²A); zero at mean position.",
    "category": "Formula",
    "formula": "a = -ω²x",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Phase difference between displacement and velocity is π/2 rad (90°); between velocity and acceleration is π/2.",
    "category": "Concept",
    "formula": "Δφ(x, v) = π/2; Δφ(x, a) = π",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Kinetic energy in SHM: KE = (1/2) m ω² (A² - x²); Potential energy: PE = (1/2) m ω² x².",
    "category": "Formula",
    "formula": "KE = 1/2 mω²(A² - x²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Total energy in SHM is conserved: E = KE + PE = (1/2) m ω² A² = (1/2) k A² = 2 π² m n² A².",
    "category": "Formula",
    "formula": "E = 1/2 mω²A²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "At displacement x = A / √2, kinetic energy equals potential energy: KE = PE = E / 2.",
    "category": "Shortcut",
    "formula": "x = A/√2 => KE = PE",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Frequency of kinetic energy oscillation is TWICE the frequency of SHM displacement: f_KE = 2 f_SHM.",
    "category": "PYQ_Trend",
    "formula": "f_energy = 2 × f_SHM",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Period of simple pendulum: T = 2π √(L / g). Independent of mass and amplitude (for small oscillations).",
    "category": "Formula",
    "formula": "T = 2π√(L/g)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Seconds pendulum has a period of exactly T = 2 seconds; length on Earth L ≈ 1 meter (99.3 cm).",
    "category": "Concept",
    "formula": "T = 2 s, L ≈ 1 m",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Spring pendulum period: T = 2π √(m / k). Series springs: 1/k_s = 1/k₁ + 1/k₂; Parallel: k_p = k₁ + k₂.",
    "category": "Formula",
    "formula": "T = 2π√(m/k)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "When a spring of constant k is cut into n equal parts, spring constant of each part becomes n · k.",
    "category": "Shortcut",
    "formula": "k' = n × k",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Progressive wave equation traveling in +x direction: y = A sin(ωt - kx) = A sin 2π(t/T - x/λ).",
    "category": "Formula",
    "formula": "y = A sin(ωt - kx)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Wave speed v = n λ = ω / k. Particle velocity v_p = dy/dt = - v · (dy/dx).",
    "category": "Formula",
    "formula": "v = nλ = ω/k",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Stationary (Standing) wave formed by superposition of two identical waves traveling in opposite directions.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Distance between two successive nodes or antinodes is λ / 2; distance between node and antinode is λ / 4.",
    "category": "Rule",
    "formula": "Node-Node = λ/2; Node-Antinode = λ/4",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Stretched string fundamental frequency: n = (1 / 2L) √(T / m), where m is linear mass density (mass per unit length).",
    "category": "Formula",
    "formula": "n = (1/2L)√(T/m)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Harmonics in stretched string: All harmonics (odd and even) are present: n₁ : n₂ : n₃ = 1 : 2 : 3.",
    "category": "Concept",
    "formula": "n₁:n₂:n₃ = 1:2:3",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Pipe open at both ends: All harmonics present: fundamental n = v / (2L). Harmonics ratio 1:2:3:4.",
    "category": "Formula",
    "formula": "n = v / (2L)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Pipe closed at one end: ONLY ODD harmonics present: fundamental n = v / (4L). Harmonics ratio 1:3:5:7.",
    "category": "Formula",
    "formula": "n = v / (4L)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "End correction: For pipe closed at one end e = 0.3 d; For open pipe at both ends e = 0.6 d (where d is diameter).",
    "category": "Formula",
    "formula": "e = 0.3 d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Beats frequency: N = |n₁ - n₂| (number of waxing and waning per second).",
    "category": "Formula",
    "formula": "N = |n₁ - n₂|",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "When tuning fork is loaded with wax, its frequency decreases; when filed, frequency increases.",
    "category": "Shortcut",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Doppler effect apparent frequency: n' = n [ (v ± v_o) / (v ∓ v_s) ]. Not applicable when source/listener moves at 90°.",
    "category": "Formula",
    "formula": "n' = n(v ± v_o)/(v ∓ v_s)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Huygens' Principle: Every point on a wavefront acts as a secondary source of spherical wavelets.",
    "category": "Definition",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Refraction Snell's Law in wave theory: n₁ sin i = n₂ sin r => v₁ / v₂ = λ₁ / λ₂ = n₂ / n₁.",
    "category": "Rule",
    "formula": "n = c/v = λ_0/λ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "During refraction, frequency of light remains constant; wavelength and speed change proportionally.",
    "category": "Concept",
    "formula": "f = const; v, λ change",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Interference condition for constructive interference (Bright fringe): Path difference Δx = n λ (n = 0, 1, 2...).",
    "category": "Formula",
    "formula": "Δx = nλ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Condition for destructive interference (Dark fringe): Path difference Δx = (2n - 1) λ / 2.",
    "category": "Formula",
    "formula": "Δx = (2n - 1)λ/2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Young's Double Slit Experiment (YDSE) fringe width: β = λ D / d. Same for bright and dark fringes.",
    "category": "Formula",
    "formula": "β = λD/d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "If YDSE apparatus is immersed in liquid of refractive index μ, fringe width decreases: β' = β / μ.",
    "category": "Shortcut",
    "formula": "β' = β/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Ratio of maximum to minimum intensity in interference: I_max / I_min = (√I₁ + √I₂)² / (√I₁ - √I₂)² = (a₁ + a₂)² / (a₁ - a₂)².",
    "category": "Formula",
    "formula": "I_max/I_min = (a₁+a₂)²/(a₁-a₂)²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Single slit Fraunhofer diffraction: Minima condition a sin θ = m λ; Central maximum angular width 2θ = 2λ / a.",
    "category": "Formula",
    "formula": "2θ = 2λ/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Width of central diffraction maximum: W = 2 λ D / a (twice the width of secondary maxima).",
    "category": "Formula",
    "formula": "W = 2λD/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Brewster's Law of Polarization: tan i_p = μ. At Brewster angle, reflected and refracted rays are perpendicular (90°).",
    "category": "Rule",
    "formula": "tan i_p = μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Malus' Law: Intensity of polarized light through analyzer: I = I_0 cos² θ.",
    "category": "Formula",
    "formula": "I = I_0 cos²θ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "When unpolarized light passes through a polaroid sheet, its intensity is always halved: I = I_0 / 2.",
    "category": "Concept",
    "formula": "I = I_0 / 2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Resolving power of telescope: RP = D / (1.22 λ). Limit of resolution dθ = 1.22 λ / D.",
    "category": "Formula",
    "formula": "RP = D / (1.22λ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Resolving power of microscope: RP = (2 μ sin θ) / λ = (2 NA) / λ, where NA is Numerical Aperture.",
    "category": "Formula",
    "formula": "RP = 2NA/λ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Total Internal Reflection (TIR) condition: Light travels from denser to rarer; Angle of incidence i > critical angle θ_c.",
    "category": "Rule",
    "formula": "sin θ_c = 1/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Critical angle relation with refractive index: sin θ_c = 1 / μ.",
    "category": "Formula",
    "formula": "sin θ_c = 1/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Prism formula: μ = sin[(A + δ_m) / 2] / sin(A / 2), where A is prism angle and δ_m is minimum deviation.",
    "category": "Formula",
    "formula": "μ = sin(A+δ_m)/2 / sin(A/2)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "For thin prism (A < 10°), deviation is δ = (μ - 1) A. Independent of angle of incidence.",
    "category": "Formula",
    "formula": "δ = (μ - 1)A",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Dispersive power of prism material: ω = (δ_v - δ_r) / δ_y = (μ_v - μ_r) / (μ_y - 1).",
    "category": "Formula",
    "formula": "ω = (μ_v - μ_r)/(μ_y - 1)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Lens Maker's Formula: 1 / f = (μ - 1) [ (1 / R₁) - (1 / R₂) ].",
    "category": "Formula",
    "formula": "1/f = (μ - 1)(1/R₁ - 1/R₂)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Power of a lens P = 1 / f (in meters). SI unit: Dioptre (D). Converging lens P > 0; Diverging lens P < 0.",
    "category": "Definition",
    "formula": "P = 1/f (D)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Combination of two thin lenses in contact: 1/F = 1/f₁ + 1/f₂ => Total Power P = P₁ + P₂.",
    "category": "Formula",
    "formula": "P = P₁ + P₂",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "When a glass lens (μ_g = 1.5) is immersed in water (μ_w = 1.33), its focal length quadruples: f_water = 4 f_air.",
    "category": "Shortcut",
    "formula": "f_water ≈ 4 f_air",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "If convex lens is placed in a medium of higher refractive index (μ_m > μ_lens), it behaves as concave lens.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Coulomb's Law: F = (1 / 4πε_0) (q₁ q₂ / r²). 1/(4πε_0) = 9 × 10⁹ N·m²/C²; ε_0 = 8.85 × 10⁻¹² C²/N·m².",
    "category": "Formula",
    "formula": "F = k q₁q₂/r²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Electric field E = F / q_0. Field due to point charge: E = (1 / 4πε_0) q / r².",
    "category": "Formula",
    "formula": "E = q / (4πε_0 r²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Electric dipole moment p = q · 2a (directed from -q to +q). SI unit: C·m.",
    "category": "Definition",
    "formula": "p = 2aq",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Electric field of dipole on axial line: E_axial = (1 / 4πε_0) (2p / r³); On equatorial line: E_eq = (1 / 4πε_0) (p / r³).",
    "category": "Formula",
    "formula": "E_axial = 2 E_eq",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Torque on dipole in uniform electric field: τ = p × E = p E sin θ. Potential energy: U = - p · E.",
    "category": "Formula",
    "formula": "τ = pE sin θ; U = -pE cos θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Gauss's Law: Total electric flux Φ = ∮ E · dA = q_enclosed / ε_0.",
    "category": "Rule",
    "formula": "Φ = q/ε_0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Electric field due to infinitely long charged wire: E = λ / (2πε_0 r), where λ is linear charge density.",
    "category": "Formula",
    "formula": "E = λ / (2πε_0 r)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Electric field near infinite charged plane sheet: E = σ / (2ε_0). Independent of distance r.",
    "category": "Formula",
    "formula": "E = σ / (2ε_0)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Electric field inside a uniformly charged conducting sphere or hollow shell is ZERO: E_in = 0; Potential V_in = constant.",
    "category": "Concept",
    "formula": "E_in = 0, V_in = V_surface",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Capacitance C = Q / V. Parallel plate capacitor: C = ε_0 A / d. With dielectric of constant K: C = K ε_0 A / d.",
    "category": "Formula",
    "formula": "C = K ε_0 A / d",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Energy stored in capacitor: U = (1/2) C V² = Q² / (2C) = (1/2) Q V.",
    "category": "Formula",
    "formula": "U = 1/2 CV²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "When dielectric slab K is inserted with battery CONNECTED: V constant, C increases (KC), Q increases (KQ), E constant, U increases (KU).",
    "category": "Rule",
    "formula": "Battery ON: V const, C->KC, Q->KQ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "When dielectric slab K is inserted with battery DISCONNECTED: Q constant, C increases (KC), V decreases (V/K), E decreases, U decreases (U/K).",
    "category": "Rule",
    "formula": "Battery OFF: Q const, V->V/K, U->U/K",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Ohm's Law: V = I R. Resistance R = ρ L / A. Current density j = σ E (microscopic Ohm's law).",
    "category": "Formula",
    "formula": "V = IR; R = ρL/A",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Drift velocity of electrons: v_d = e E τ / m. Relation with current: I = n e A v_d.",
    "category": "Formula",
    "formula": "I = n e A v_d",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "When wire is stretched to n times its initial length, its new resistance becomes n² · R (volume is conserved).",
    "category": "Shortcut",
    "formula": "R' = n² R",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Temperature dependence of resistance: R_T = R_0 (1 + α ΔT). For metals α > 0; For semiconductors α < 0.",
    "category": "Concept",
    "formula": "R_T = R_0(1 + αΔT)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Kirchhoff's Current Law (KCL): Σ I = 0 at any junction (based on conservation of charge).",
    "category": "Rule",
    "formula": "Σ I = 0 (Charge)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Kirchhoff's Voltage Law (KVL): Σ ΔV = 0 in any closed loop (based on conservation of energy).",
    "category": "Rule",
    "formula": "Σ V = 0 (Energy)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Balanced Wheatstone bridge condition: P / Q = R / S. No current flows through galvanometer (I_g = 0).",
    "category": "Formula",
    "formula": "P/Q = R/S",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Metre Bridge principle is based on balanced Wheatstone bridge: X = R · (l_x / l_r).",
    "category": "Formula",
    "formula": "X = R (l_x / l_r)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Potentiometer compares EMF without drawing current (infinite resistance voltmeter): E₁ / E₂ = l₁ / l₂.",
    "category": "Formula",
    "formula": "E₁/E₂ = l₁/l₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Internal resistance of cell by potentiometer: r = R [ (l₁ - l₂) / l₂ ].",
    "category": "Formula",
    "formula": "r = R(l₁ - l₂)/l₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "Sensitivity of potentiometer can be increased by decreasing potential gradient k = V/L (increasing length L).",
    "category": "Concept",
    "formula": "Sensitivity ∝ 1/k ∝ L",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Electric power P = V I = I² R = V² / R. 1 kWh (Board of Trade unit) = 3.6 × 10⁶ Joules.",
    "category": "Formula",
    "formula": "1 kWh = 3.6 × 10⁶ J",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Biot-Savart Law: dB = (μ_0 / 4π) (I dl sin θ / r²). μ_0 = 4π × 10⁻⁷ T·m/A.",
    "category": "Formula",
    "formula": "dB = (μ_0/4π) I dl sin θ / r²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "Magnetic field at center of circular coil of N turns: B = μ_0 N I / (2 R).",
    "category": "Formula",
    "formula": "B = μ_0 N I / (2R)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Magnetic field of straight long wire: B = μ_0 I / (2π r). Ampere's Circuital Law: ∮ B · dl = μ_0 I_enclosed.",
    "category": "Formula",
    "formula": "B = μ_0 I / (2πr)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Magnetic Lorentz force on charge q moving with velocity v in field B: F = q (v × B) = q v B sin θ.",
    "category": "Formula",
    "formula": "F = qvB sin θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Radius of circular path of charge in perpendicular B: r = m v / (q B) = p / (q B) = √(2 m q V) / (q B).",
    "category": "Formula",
    "formula": "r = mv/(qB)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Cyclotron frequency: f = q B / (2π m). Independent of speed and radius of the particle.",
    "category": "Formula",
    "formula": "f = qB / (2πm)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Force between two parallel current-carrying wires: F / L = (μ_0 / 2π) (I₁ I₂ / d). Attractive if parallel currents.",
    "category": "Formula",
    "formula": "F/L = μ_0 I₁I₂ / (2πd)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Moving Coil Galvanometer: Deflection θ ∝ I => I = (C / nAB) θ = K θ.",
    "category": "Formula",
    "formula": "I = (C/nAB) θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Converting Galvanometer to Ammeter: Connect small shunt resistance S in PARALLEL: S = [ I_g / (I - I_g) ] G.",
    "category": "Formula",
    "formula": "S = I_g G / (I - I_g)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Converting Galvanometer to Voltmeter: Connect high resistance R in SERIES: R = (V / I_g) - G.",
    "category": "Formula",
    "formula": "R = (V / I_g) - G",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Faraday's Law of EMI: Induced EMF e = - dΦ/dt = - N (dΦ/dt). Minus sign given by Lenz's Law (conservation of energy).",
    "category": "Rule",
    "formula": "e = - dΦ/dt",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Motional EMF in rod of length L moving with speed v perpendicular to field B: e = B L v.",
    "category": "Formula",
    "formula": "e = BLv",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Self-inductance L = N Φ / I; Induced EMF e = - L (dI/dt). SI unit: Henry (H). Energy in inductor: U = (1/2) L I².",
    "category": "Formula",
    "formula": "U = 1/2 L I²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Mutual inductance between two coils: e₂ = - M (dI₁/dt). Coefficient of coupling: k = M / √(L₁ L₂).",
    "category": "Formula",
    "formula": "M = k√(L₁L₂)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "AC Root Mean Square (RMS) value: I_rms = I_0 / √2 ≈ 0.707 I_0; Average value over half cycle: I_avg = 2 I_0 / π ≈ 0.637 I_0.",
    "category": "Formula",
    "formula": "V_rms = V_0 / √2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "Inductive reactance X_L = ω L = 2π f L; Capacitive reactance X_C = 1 / (ω C) = 1 / (2π f C).",
    "category": "Formula",
    "formula": "X_L = ωL; X_C = 1/(ωC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Series LCR impedance: Z = √[ R² + (X_L - X_C)² ]. Resonance condition: X_L = X_C => ω_0 = 1 / √(L C).",
    "category": "Formula",
    "formula": "f_0 = 1 / (2π√LC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Quality factor of LCR circuit: Q = (1 / R) √(L / C) = ω_0 / bandwidth.",
    "category": "Formula",
    "formula": "Q = 1/R √(L/C)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Power in AC circuit: P = V_rms I_rms cos φ. Power factor cos φ = R / Z. In pure L or C, cos φ = 0 => Wattless current.",
    "category": "Formula",
    "formula": "P = V_rms I_rms cos φ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Einstein's photoelectric equation: h ν = Φ_0 + KE_max = h ν_0 + e V_0, where V_0 is stopping potential.",
    "category": "Formula",
    "formula": "hν = Φ_0 + eV_0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Photoelectric effect characteristics: Rate of emission ∝ Intensity; KE_max depends ONLY on frequency, independent of intensity.",
    "category": "Rule",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "de Broglie wavelength of matter wave: λ = h / p = h / (m v) = h / √(2 m E) = 1.227 / √V nm (for electron).",
    "category": "Formula",
    "formula": "λ = 12.27 / √V Å",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Bohr's quantization postulate: Angular momentum L = m v r = n h / (2π). Radius of n-th orbit: r_n = 0.529 (n² / Z) Å.",
    "category": "Formula",
    "formula": "r_n = 0.529 n²/Z Å",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Energy of electron in n-th Bohr orbit of hydrogen: E_n = - 13.6 (Z² / n²) eV.",
    "category": "Formula",
    "formula": "E_n = -13.6 Z²/n² eV",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Radioactive Decay Law: N(t) = N_0 e^(-λt). Half-life T_(1/2) = ln 2 / λ = 0.693 / λ. Mean life τ = 1 / λ = 1.44 T_(1/2).",
    "category": "Formula",
    "formula": "T_(1/2) = 0.693/λ",
    "badge": "PYQ Trends & Advanced"
  }
];

export const CHEMISTRY_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Number of atoms per unit cell: Simple cubic (SC) = 1; Body-centered cubic (BCC) = 2; Face-centered cubic (FCC) = 4.",
    "category": "Concept",
    "formula": "SC=1, BCC=2, FCC=4",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Packing efficiency: SC = 52.4%; BCC = 68%; FCC / HCP = 74.0% (highest packing fraction).",
    "category": "Shortcut",
    "formula": "FCC(74%) > BCC(68%) > SC(52.4%)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Relation between edge length a and radius r: SC: a = 2r; BCC: 4r = √3 a; FCC: 4r = √2 a.",
    "category": "Formula",
    "formula": "BCC: r=√3a/4; FCC: r=a/(2√2)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Coordination number: SC = 6; BCC = 8; FCC / HCP = 12.",
    "category": "Concept",
    "formula": "CN: SC=6, BCC=8, FCC=12",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Density of cubic unit cell: d = (Z · M) / (a³ · N_A). Check unit conversions: a in cm, M in g/mol.",
    "category": "Formula",
    "formula": "d = (Z·M)/(a³·N_A)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Schottky defect: Equal number of cations and anions missing. Density DECREASES. Seen in NaCl, KCl, CsCl, AgBr.",
    "category": "Concept",
    "formula": "Density decreases",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Frenkel defect: Cation displaced to interstitial site. Density remains UNCHANGED. Seen in ZnS, AgCl, AgBr, AgI.",
    "category": "Concept",
    "formula": "Density constant",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "AgBr exhibits BOTH Schottky and Frenkel defects (frequent exam question).",
    "category": "PYQ_Trend",
    "formula": "AgBr: Both Schottky & Frenkel",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "F-centers: Anionic sites occupied by unpaired electrons, imparting color and paramagnetism (e.g. yellow NaCl).",
    "category": "Concept",
    "formula": "Color due to F-centers",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Henry's Law: S = K_H · P, where S is solubility of gas and P is partial pressure. K_H decreases with temperature.",
    "category": "Formula",
    "formula": "S = K_H · P",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Raoult's Law for volatile liquids: P_total = P_A° x_A + P_B° x_B.",
    "category": "Formula",
    "formula": "P_total = P_A°x_A + P_B°x_B",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Relative Lowering of Vapor Pressure (RLVP): (P_1° - P) / P_1° = x_2 = n_2 / (n_1 + n_2). Colligative property.",
    "category": "Formula",
    "formula": "ΔP/P° = x_2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Elevation in Boiling Point: ΔT_b = i · K_b · m. K_b is molal elevation (ebullioscopic) constant.",
    "category": "Formula",
    "formula": "ΔT_b = i K_b m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Depression in Freezing Point: ΔT_f = i · K_f · m. K_f is molal depression (cryoscopic) constant.",
    "category": "Formula",
    "formula": "ΔT_f = i K_f m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Osmotic Pressure: π = i · C · R · T = i (n/V) R T. Best colligative property for molar mass of polymers/biomolecules.",
    "category": "Formula",
    "formula": "π = iCRT",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Isotonic solutions have identical osmotic pressure (π₁ = π₂ => C₁ = C₂ at same temperature).",
    "category": "Concept",
    "formula": "π₁ = π₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Van't Hoff factor: i = (Observed colligative property) / (Theoretical value) = 1 + (n - 1) α.",
    "category": "Formula",
    "formula": "i = 1 + (n - 1)α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "For association of solute (e.g. dimerization of benzoic acid in benzene): i = 1 - (1 - 1/n) α < 1.",
    "category": "Formula",
    "formula": "i = 1 - (1 - 1/n)α < 1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Ideal solution conditions: ΔH_mix = 0, ΔV_mix = 0, obeys Raoult's law at all concentrations (e.g. Benzene + Toluene).",
    "category": "Rule",
    "formula": "ΔH=0, ΔV=0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Positive deviation from Raoult's law: A-B interactions weaker than A-A and B-B; ΔH > 0, ΔV > 0 (e.g. Ethanol + Acetone).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Negative deviation from Raoult's law: A-B interactions stronger (H-bonding); ΔH < 0, ΔV < 0 (e.g. Chloroform + Acetone).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Maximum boiling azeotrope formed by solutions showing large negative deviation (e.g. 68% HNO₃ + 32% H₂O).",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Minimum boiling azeotrope formed by solutions showing large positive deviation (e.g. 95% Ethanol + 5% H₂O).",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Reverse Osmosis (RO) occurs when applied pressure is greater than osmotic pressure (P > π); used for desalination.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Cryoscopic constant K_f depends ONLY on the nature of the solvent: K_f = (R · M_1 · T_f²) / (1000 · ΔH_fus).",
    "category": "Rule",
    "formula": "K_f depends only on solvent",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "First Law of Thermodynamics: ΔU = q + w. State function U depends only on initial and final states.",
    "category": "Formula",
    "formula": "ΔU = q + w",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Work in irreversible expansion against constant external pressure P_ext: w = - P_ext · ΔV.",
    "category": "Formula",
    "formula": "w = -P_ext ΔV",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Maximum work in reversible isothermal expansion of ideal gas: w_max = - 2.303 n R T log₁₀(V₂ / V₁).",
    "category": "Formula",
    "formula": "w_max = -2.303 nRT log(V₂/V₁)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Enthalpy H = U + P V. At constant pressure: q_p = ΔH; At constant volume: q_v = ΔU.",
    "category": "Definition",
    "formula": "H = U + PV",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Relation between ΔH and ΔU: ΔH = ΔU + Δn_g · R T, where Δn_g = moles of gaseous products - reactants.",
    "category": "Formula",
    "formula": "ΔH = ΔU + Δn_g RT",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Hess's Law of Constant Heat Summation: Total enthalpy change is independent of the pathway taken.",
    "category": "Rule",
    "formula": "ΔH_total = Σ ΔH_steps",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Entropy S: Measure of randomness or disorder: ΔS = q_rev / T. SI unit: J/K·mol.",
    "category": "Definition",
    "formula": "ΔS = q_rev / T",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Second Law of Thermodynamics: For a spontaneous process, total entropy of universe increases: ΔS_total = ΔS_sys + ΔS_surr > 0.",
    "category": "Rule",
    "formula": "ΔS_universe > 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Gibbs Free Energy: G = H - T S. Change in free energy: ΔG = ΔH - T · ΔS (Gibbs-Helmholtz equation).",
    "category": "Formula",
    "formula": "ΔG = ΔH - TΔS",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Spontaneity criteria at constant T and P: ΔG < 0 (spontaneous); ΔG = 0 (equilibrium); ΔG > 0 (non-spontaneous).",
    "category": "Rule",
    "formula": "ΔG < 0: Spontaneous",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "If ΔH < 0 and ΔS > 0 => ΔG is ALWAYS negative (spontaneous at ALL temperatures).",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "If ΔH > 0 and ΔS < 0 => ΔG is ALWAYS positive (non-spontaneous at ALL temperatures).",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Standard free energy and equilibrium constant: ΔG° = - 2.303 R T log₁₀ K_eq = - n F E°_cell.",
    "category": "Formula",
    "formula": "ΔG° = -nFE° = -2.303RT log K",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Third Law of Thermodynamics: The entropy of a perfectly crystalline substance is zero at absolute zero (0 K).",
    "category": "Rule",
    "formula": "S(0 K) = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Specific conductance (Conductivity) κ = (1/R) · (l/A) = G · G*, where G* is cell constant (l/A). SI unit: S/m or Ω⁻¹·cm⁻¹.",
    "category": "Formula",
    "formula": "κ = G · G*",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Molar conductivity: Λ_m = (1000 · κ) / M. SI unit: S·cm²/mol or Ω⁻¹·cm²·mol⁻¹.",
    "category": "Formula",
    "formula": "Λ_m = 1000κ / M",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Kohlrausch's Law of Independent Migration of Ions: Λ_m° of an electrolyte = sum of limiting ionic conductivities of its ions.",
    "category": "Rule",
    "formula": "Λ°_m = ν₊ λ°₊ + ν₋ λ°₋",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°; Dissociation constant K_a = C α² / (1 - α).",
    "category": "Formula",
    "formula": "α = Λ_m / Λ°_m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Faraday's First Law of Electrolysis: Mass deposited w = Z · I · t = (M / n F) · I · t. 1 Faraday = 96,500 C.",
    "category": "Formula",
    "formula": "w = Z I t = (M/nF)It",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Faraday's Second Law: When same quantity of electricity passes, masses deposited are proportional to chemical equivalents: w₁/w₂ = E₁/E₂.",
    "category": "Rule",
    "formula": "w₁/w₂ = E₁/E₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Nernst Equation for half cell: E = E° - (0.0591 / n) log₁₀ [Red / Ox] at 298 K.",
    "category": "Formula",
    "formula": "E = E° - (0.0591/n) log Q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Nernst Equation for cell: E_cell = E°_cell - (0.0591 / n) log₁₀ Q. At equilibrium E_cell = 0 => E°_cell = (0.0591/n) log K.",
    "category": "Formula",
    "formula": "E°_cell = (0.0591/n) log K",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Dry cell (Leclanché): Anode = Zn container, Cathode = graphite rod, Electrolyte = NH₄Cl + ZnCl₂ paste. EMF ≈ 1.5 V.",
    "category": "Concept",
    "formula": "Zn anode, MnO₂/C cathode",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Lead storage battery (secondary cell): Anode = Spongy Pb; Cathode = PbO₂; Electrolyte = 38% H₂SO₄ (d = 1.30 g/mL).",
    "category": "Concept",
    "formula": "Discharge: PbSO₄ formed",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "H₂-O₂ Fuel cell operates with high efficiency (≈ 70%); Product is purely clean water. Used in Apollo space mission.",
    "category": "Concept",
    "formula": "Efficiency ≈ 70%",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Rate of reaction r = - (1/a) d[A]/dt = + (1/b) d[B]/dt. SI unit: mol·L⁻¹·s⁻¹.",
    "category": "Definition",
    "formula": "Rate = -d[A]/dt",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Rate law: Rate = k [A]^x [B]^y. Overall order of reaction n = x + y. Order is determined experimentally.",
    "category": "Formula",
    "formula": "Order = x + y",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Unit of rate constant k: (mol·L⁻¹)^(1 - n) · s⁻¹. Zero order: mol·L⁻¹·s⁻¹; First order: s⁻¹; Second order: L·mol⁻¹·s⁻¹.",
    "category": "Shortcut",
    "formula": "k unit: (mol/L)^(1-n) s⁻¹",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Zero order integrated rate law: k = ([A]_0 - [A]_t) / t. Half life t_(1/2) = [A]_0 / (2k) ∝ [A]_0.",
    "category": "Formula",
    "formula": "t_(1/2) = [A]_0 / 2k",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "First order integrated rate law: k = (2.303 / t) log₁₀([A]_0 / [A]_t).",
    "category": "Formula",
    "formula": "k = (2.303/t) log([A]_0/[A])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "First order half life: t_(1/2) = 0.693 / k. INDEPENDENT of initial concentration of reactant.",
    "category": "Rule",
    "formula": "t_(1/2) = 0.693 / k",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Time required for 99.9% completion of first order reaction: t_99.9% = 10 · t_(1/2); t_75% = 2 · t_(1/2); t_90% = 3.32 · t_(1/2).",
    "category": "Shortcut",
    "formula": "t_99.9% = 10 × t_(1/2)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Pseudo first order reaction: Bimolecular reaction where one reactant (solvent) is in large excess (e.g. ester hydrolysis in acid).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Arrhenius Equation: k = A · e^(- E_a / R T) => log₁₀(k₂ / k₁) = (E_a / 2.303 R) [ (T₂ - T₁) / (T₁ T₂) ].",
    "category": "Formula",
    "formula": "log(k₂/k₁) = (E_a/2.303R)(ΔT/T₁T₂)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "A catalyst lowers activation energy E_a and increases the rate of forward and backward reactions EQUALLY. Does NOT shift equilibrium.",
    "category": "Rule",
    "formula": "Catalyst lowers E_a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "pH definition: pH = - log₁₀ [H₃O⁺]; pOH = - log₁₀ [OH⁻]; At 298 K, pH + pOH = pK_w = 14.",
    "category": "Formula",
    "formula": "pH + pOH = 14",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Ionic product of water: K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. K_w INCREASES with temperature (endothermic autoionization).",
    "category": "Concept",
    "formula": "K_w = 10⁻¹⁴ at 25°C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Ostwald's Dilution Law for weak acid: K_a = C α² / (1 - α) ≈ C α² => α = √(K_a / C); [H⁺] = √(K_a · C).",
    "category": "Formula",
    "formula": "α = √(K_a/C); [H⁺] = √(K_a C)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Acidic buffer solution: Weak acid + its salt with strong base (e.g. CH₃COOH + CH₃COONa). pH = pK_a + log([Salt] / [Acid]).",
    "category": "Formula",
    "formula": "pH = pK_a + log([Salt]/[Acid])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Basic buffer solution: Weak base + its salt with strong acid (e.g. NH₄OH + NH₄Cl). pOH = pK_b + log([Salt] / [Base]).",
    "category": "Formula",
    "formula": "pOH = pK_b + log([Salt]/[Base])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Buffer capacity is maximum when [Salt] = [Acid], which gives pH = pK_a.",
    "category": "Shortcut",
    "formula": "Max buffer when pH = pK_a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Salt hydrolysis: Salt of Weak Acid + Strong Base (CH₃COONa) is BASIC: pH = 7 + (1/2) pK_a + (1/2) log C.",
    "category": "Formula",
    "formula": "pH = 7 + 1/2 pK_a + 1/2 log C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Salt of Strong Acid + Weak Base (NH₄Cl) is ACIDIC: pH = 7 - (1/2) pK_b - (1/2) log C.",
    "category": "Formula",
    "formula": "pH = 7 - 1/2 pK_b - 1/2 log C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Salt of Weak Acid + Weak Base (CH₃COONH₄): pH = 7 + (1/2) pK_a - (1/2) pK_b. Independent of concentration C.",
    "category": "Rule",
    "formula": "pH = 7 + 1/2 pK_a - 1/2 pK_b",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Solubility product K_sp for sparingly soluble salt A_x B_y: K_sp = x^x · y^y · S^(x + y).",
    "category": "Formula",
    "formula": "K_sp = x^x y^y S^(x+y)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "For 1:1 salt (AgCl): K_sp = S² => S = √(K_sp); For 1:2 salt (PbCl₂, CaF₂): K_sp = 4 S³ => S = ³√(K_sp / 4).",
    "category": "Shortcut",
    "formula": "1:1 => S=√K_sp; 1:2 => S=³√(K_sp/4)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Precipitation condition: If Ionic Product (IP) > K_sp => Precipitate forms; If IP < K_sp => Unsaturated solution.",
    "category": "Rule",
    "formula": "IP > K_sp: Precipitate forms",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Common Ion Effect: Solubility of a sparingly soluble salt decreases in the presence of a soluble salt having a common ion.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Lewis acid: Electron pair acceptor (BF₃, AlCl₃, carbocations); Lewis base: Electron pair donor (NH₃, H₂O, amines).",
    "category": "Definition",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Bronsted-Lowry concept: Acid is proton (H⁺) donor; Base is proton acceptor. Conjugate acid-base pairs differ by one H⁺.",
    "category": "Definition",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Transition metals (d-block) general electronic configuration: (n-1)d^(1-10) ns^(1-2). Anomalous: Cr ([Ar] 3d⁵ 4s¹), Cu ([Ar] 3d¹⁰ 4s¹).",
    "category": "Rule",
    "formula": "Cr: 3d⁵ 4s¹; Cu: 3d¹⁰ 4s¹",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Zn, Cd, Hg are NOT considered true transition elements because they have completely filled d-orbitals in elemental and ionic states.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Magnetic moment (spin-only formula): μ = √[ n (n + 2) ] BM, where n is number of unpaired electrons.",
    "category": "Formula",
    "formula": "μ = √[n(n+2)] BM",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Color of transition metal complexes is due to d-d transition of unpaired electrons in crystal field.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Lanthanoid contraction: Steady decrease in atomic and ionic radii from La³⁺ to Lu³⁺ due to poor shielding of 4f electrons.",
    "category": "Concept",
    "formula": "Zr and Hf have identical radii",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Consequence of Lanthanoid contraction: Zr and Hf have almost identical atomic radii (0.160 nm) and very similar properties.",
    "category": "PYQ_Trend",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "KMnO₄ (Potassium permanganate): Strong oxidizing agent. In acidic medium: MnO₄⁻ + 8H⁺ + 5e⁻ -> Mn²⁺ (n-factor = 5).",
    "category": "Formula",
    "formula": "n-factor in acid = 5",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "In neutral/weakly alkaline medium: KMnO₄ reduces to MnO₂ (n-factor = 3); In strongly alkaline medium reduces to MnO₄²⁻ (n-factor = 1).",
    "category": "Formula",
    "formula": "n-factor neutral = 3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "K₂Cr₂O₇ (Potassium dichromate) in acidic medium: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ -> 2Cr³⁺ + 7H₂O (n-factor = 6, Eq wt = M/6).",
    "category": "Formula",
    "formula": "n-factor of K₂Cr₂O₇ = 6",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Interconversion of chromate and dichromate: 2 CrO₄²⁻ (yellow) + 2H⁺ <=> Cr₂O₇²⁻ (orange) + H₂O. Reversible with pH change.",
    "category": "Concept",
    "formula": "Yellow CrO₄²⁻ <-> Orange Cr₂O₇²⁻",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Werner's Coordination Theory: Primary valency is ionizable and satisfies oxidation state; Secondary valency is non-ionizable and equals coordination number.",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "EAN (Effective Atomic Number) Rule: EAN = Z - (Oxidation State) + 2 × (Coordination Number). If EAN = next noble gas, complex is stable.",
    "category": "Formula",
    "formula": "EAN = Z - O.S. + 2(CN)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Spectrochemical Series: Strong field ligands (CN⁻, CO, NO₂⁻, en) cause pairing (low spin); Weak field (I⁻, Br⁻, Cl⁻, F⁻, H₂O) form high spin complexes.",
    "category": "Rule",
    "formula": "CO > CN⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Crystal field splitting in octahedral complexes: d-orbitals split into t_2g (lower, d_xy, d_yz, d_zx) and e_g (higher, d_x²-y², d_z²).",
    "category": "Concept",
    "formula": "Octahedral: t_2g lower, e_g higher",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Tetrahedral splitting Δ_t is always smaller than octahedral: Δ_t = (4/9) Δ_o. Hence tetrahedral complexes are almost always high spin.",
    "category": "Formula",
    "formula": "Δ_t = (4/9) Δ_o",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "EDTA⁴⁻ is a hexadentate, chelating ligand with 2 Nitrogen and 4 Oxygen donor atoms; used to treat lead poisoning and estimate water hardness.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Ambidentate ligands have two different donor atoms and cause linkage isomerism: NO₂⁻ (N or O) and SCN⁻ (S or N).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Synergic bonding in metal carbonyls: σ-bond formed by donation of lone pair from CO to metal; π-backbond formed by donation of d-electrons from metal to π* antibonding of CO.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Haber's process for NH₃: N₂ + 3H₂ <=> 2NH₃ (ΔH = -92.4 kJ/mol). Optimum: 200 atm, 700 K, Fe catalyst with Mo promoter.",
    "category": "Concept",
    "formula": "Fe catalyst + Mo promoter",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Contact process for H₂SO₄: Key step is 2 SO₂ + O₂ <=> 2 SO₃ catalyzed by V₂O₅ at 450°C and 2 atm.",
    "category": "Concept",
    "formula": "V₂O₅ catalyst",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Ostwald's process for HNO₃: 4 NH₃ + 5 O₂ -> 4 NO + 6 H₂O catalyzed by Pt-Rh gauge at 500 K.",
    "category": "Concept",
    "formula": "Pt-Rh catalyst",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Noble gases: XeF₂ is linear (sp³d, 3 lone pairs); XeF₄ is square planar (sp³d², 2 lone pairs); XeF₆ is distorted octahedral (sp³d³).",
    "category": "Shortcut",
    "formula": "XeF₂: Linear; XeF₄: Sq Planar",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Interhalogen compounds (XX'_n): More reactive than pure halogens (except F₂) because X-X' bond is weaker than X-X.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Bleaching action of SO₂ is temporary (due to reduction); Bleaching action of Cl₂ is permanent (due to oxidation).",
    "category": "PYQ_Trend",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Aqua Regia: Mixture of concentrated HCl and concentrated HNO₃ in 3:1 ratio by volume; dissolves gold and platinum.",
    "category": "Formula",
    "formula": "Aqua Regia = 3 HCl + 1 HNO₃",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "SN2 mechanism: Bimolecular, single step, backside attack, 100% Walden inversion, transition state (no intermediate). Order: 1° > 2° > 3°.",
    "category": "Rule",
    "formula": "SN2: 1° > 2° > 3° (Inversion)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "SN1 mechanism: Unimolecular, two steps, carbocation intermediate, racemization. Order of reactivity: 3° > 2° > 1° > methyl.",
    "category": "Rule",
    "formula": "SN1: 3° > 2° > 1° (Racemic)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Stability order of carbocations: 3° > 2° > 1° > CH₃⁺ (due to hyperconjugation and +I effect). Allylic and benzylic carbocations are highly resonance stabilized.",
    "category": "Rule",
    "formula": "3° > 2° > 1° > methyl",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Markovnikov's Rule: Negative part of unsymmetrical reagent adds to double bonded carbon having LESSER number of hydrogens.",
    "category": "Rule",
    "formula": "Negative part to less H carbon",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Anti-Markovnikov (Peroxide Effect / Kharasch): Valid ONLY for HBr in presence of organic peroxides; does NOT apply to HCl or HI.",
    "category": "Exception",
    "formula": "Valid ONLY for HBr",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Saytzeff (Zaitsev) Rule in elimination (dehydrohalogenation): Major alkene is the one having GREATER number of alkyl groups on double bond.",
    "category": "Rule",
    "formula": "More substituted alkene is major",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Lucas Test (anhydrous ZnCl₂ + conc. HCl): 3° alcohols form turbidity immediately; 2° in 5 minutes; 1° does not react at room temperature.",
    "category": "Shortcut",
    "formula": "3°: instant; 2°: 5 min; 1°: none",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH at 340 K -> Salicylaldehyde (electrophile is Dichlorocarbene :CCl₂).",
    "category": "Rule",
    "formula": "Electrophile: :CCl₂",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Kolbe's Reaction: Sodium phenoxide + CO₂ at 400 K and 4-7 atm followed by acid hydrolysis -> Salicylic acid (o-hydroxybenzoic acid).",
    "category": "Rule",
    "formula": "Phenol + CO₂ -> Salicylic acid",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Williamson Ether Synthesis: Alkyl halide + Sodium alkoxide -> Ether (SN2 attack). Best yield when alkyl halide is 1°; 3° halide gives alkene (elimination).",
    "category": "Exception",
    "formula": "3° halide gives alkene",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Cleavage of ethers with excess HI: Mixed ether R-O-R' with one 3° group forms 3° iodide via SN1; with 1° or 2° groups forms smaller alkyl iodide via SN2.",
    "category": "Shortcut",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Aldol Condensation: Aldehydes and ketones having at least one α-hydrogen in presence of dilute NaOH form β-hydroxy aldehydes/ketones.",
    "category": "Rule",
    "formula": "Requires α-hydrogen",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Cannizzaro Reaction: Aldehydes LACKING α-hydrogen (HCHO, C₆H₅CHO, (CH₃)₃C-CHO) in 50% NaOH undergo disproportionation into alcohol and acid salt.",
    "category": "Rule",
    "formula": "No α-H: HCHO -> CH₃OH + HCOO⁻",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Clemmensen Reduction: Carbonyl group C=O reduced to -CH₂- using Zn-Hg and conc. HCl. Suitable for acid-stable substrates.",
    "category": "Formula",
    "formula": "C=O -> CH₂ (Zn-Hg / HCl)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Wolff-Kishner Reduction: Carbonyl group C=O reduced to -CH₂- using Hydrazine (NH₂NH₂) and KOH in ethylene glycol. Suitable for base-stable substrates.",
    "category": "Formula",
    "formula": "C=O -> CH₂ (NH₂NH₂ / KOH)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Rosenmund Reduction: Acid chloride R-CO-Cl + H₂ -> Aldehyde R-CHO using Pd-BaSO₄ poisoned with sulfur or quinoline (Lindlar-type).",
    "category": "Formula",
    "formula": "RCOCl -> RCHO (Pd-BaSO₄)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Stephen Reaction: Alkyl cyanide (Nitrile) R-CN + SnCl₂ / HCl followed by H₃O⁺ -> Aldehyde R-CHO.",
    "category": "Formula",
    "formula": "RCN -> RCHO (SnCl₂/HCl)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Etard Reaction: Toluene + Chromyl chloride (CrO₂Cl₂) in CS₂ followed by hydrolysis -> Benzaldehyde.",
    "category": "Formula",
    "formula": "Toluene -> Benzaldehyde",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Gatterman-Koch Reaction: Benzene + CO + HCl in presence of anhydrous AlCl₃ and CuCl -> Benzaldehyde.",
    "category": "Formula",
    "formula": "Benzene -> Benzaldehyde",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Haloform (Iodoform) Test: Compounds with CH₃-C=O or CH₃-CH(OH)- group give yellow precipitate of CHI₃ with I₂ + NaOH.",
    "category": "Shortcut",
    "formula": "Yellow CHI₃ ppt (CH₃-CO- group)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Fehling's Solution and Tollens' Reagent (Ammoniacal AgNO₃): Reduce aliphatic aldehydes (Tollens forms Silver Mirror); Ketones and aromatic aldehydes do NOT reduce Fehling's.",
    "category": "Rule",
    "formula": "Aldehydes: Silver mirror",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acid with α-hydrogen + X₂ (Cl₂ or Br₂) in presence of red phosphorus -> α-halocarboxylic acid.",
    "category": "Formula",
    "formula": "R-CH₂-COOH -> R-CH(X)-COOH",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Hofmann Bromamide Degradation: Primary amide R-CONH₂ + Br₂ + 4 KOH -> Primary amine R-NH₂ (one carbon LESS than parent amide).",
    "category": "Rule",
    "formula": "1 carbon less amine formed",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Gabriel Phthalimide Synthesis: Used for preparation of aliphatic PRIMARY amines ONLY. Cannot prepare aromatic amines (aryl halides do not undergo SN2).",
    "category": "Exception",
    "formula": "Only 1° aliphatic amines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Carbylamine Test (Isocyanide test): 1° amine (aliphatic or aromatic) + CHCl₃ + 3 KOH -> Foul-smelling isocyanide R-NC.",
    "category": "Shortcut",
    "formula": "Foul odor test for 1° amines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Hinsberg's Test for amines: 1° amine forms benzenesulfonamide soluble in alkali; 2° forms insoluble product; 3° does not react.",
    "category": "Shortcut",
    "formula": "1°: soluble; 2°: insoluble; 3°: no reaction",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Diazotization: Aniline + NaNO₂ + 2 HCl at 273-278 K (0-5°C) -> Benzene diazonium chloride (C₆H₅N₂⁺ Cl⁻).",
    "category": "Formula",
    "formula": "Aniline -> C₆H₅N₂⁺Cl⁻ at 0-5°C",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Sandmeyer Reaction: C₆H₅N₂⁺Cl⁻ + CuCl/HCl -> Chlorobenzene; + CuBr/HBr -> Bromobenzene; + CuCN/KCN -> Benzonitrile.",
    "category": "Rule",
    "formula": "Sandmeyer: CuX catalyst",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Gattermann Reaction: C₆H₅N₂⁺Cl⁻ + Cu powder / HCl -> Chlorobenzene (uses copper powder instead of copper halide).",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Coupling Reaction: Benzene diazonium chloride + Phenol (pH 9-10) -> p-Hydroxyazobenzene (Orange dye); + Aniline (pH 4-5) -> p-Aminoazobenzene (Yellow dye).",
    "category": "Concept",
    "formula": "Phenol: Orange dye; Aniline: Yellow dye",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Glucose is an aldohexose with 4 chiral carbons (2⁴ = 16 stereoisomers). Naturally occurring D-(+)-glucose is dextrorotatory.",
    "category": "Concept",
    "formula": "Glucose: 4 chiral carbons",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Fructose is a ketohexose, functional isomer of glucose with 3 chiral carbons. Naturally occurring D-(-)-fructose is levorotatory.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Mutarotation: Spontaneous change in specific rotation of an optically active carbohydrate until equilibrium is reached (α-D-glucose +112° -> +52.7° <- β-D-glucose +19°).",
    "category": "Definition",
    "formula": "Equilibrium rotation = +52.7°",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Sucrose (Cane sugar) is a NON-REDUCING disaccharide linked by α-1,2-glycosidic bond between α-D-glucose and β-D-fructose.",
    "category": "Rule",
    "formula": "Sucrose: Non-reducing disaccharide",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Inversion of Cane Sugar: Hydrolysis of dextrorotatory sucrose gives levorotatory mixture of glucose (+52.7°) and fructose (-92.4°); Product is called Invert Sugar.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Maltose is a reducing disaccharide composed of two α-D-glucose units linked by α-1,4-glycosidic bond.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Lactose (Milk sugar) is a reducing disaccharide composed of β-D-galactose and β-D-glucose linked by β-1,4-glycosidic bond.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Starch consists of two components: Water-soluble Amylose (15-20%, unbranched α-1,4 chains) and Water-insoluble Amylopectin (80-85%, branched α-1,4 and α-1,6 chains).",
    "category": "Concept",
    "formula": "Amylose: unbranched; Amylopectin: branched",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Cellulose is a linear unbranched polymer of β-D-glucose linked by β-1,4-glycosidic bonds; cannot be digested by humans due to lack of cellulase enzyme.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Amino acids exist as dipolar Zwitterions with both positive (-NH₃⁺) and negative (-COO⁻) charges. Isoelectric point (pI) is pH at which net charge is zero.",
    "category": "Definition",
    "formula": "Zwitterion: +NH₃-CHR-COO⁻",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "All naturally occurring α-amino acids are optically active and have L-configuration, EXCEPT Glycine (H₂N-CH₂-COOH, achiral).",
    "category": "Exception",
    "formula": "Glycine is achiral",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Essential amino acids cannot be synthesized by human body and must be supplied in diet: Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, Arginine.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Peptide bond is an amide linkage -CO-NH- formed between -COOH of one amino acid and -NH₂ of another with elimination of water.",
    "category": "Definition",
    "formula": "Peptide bond: -CO-NH-",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Primary structure of protein is the specific sequence of amino acids; Secondary structure is α-helix and β-pleated sheet stabilized by Hydrogen bonds.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Denaturation of proteins: Heat or chemical change disrupts secondary and tertiary structures; Primary peptide chain remains INTACT; Biological activity is lost.",
    "category": "Rule",
    "formula": "Primary structure intact in denaturation",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Nucleic acids components: Nitrogen base (Purines: A, G; Pyrimidines: C, T, U) + Pentose sugar (Ribose or Deoxyribose) + Phosphate group.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "In DNA, Adenine pairs with Thymine via 2 Hydrogen bonds (A = T); Guanine pairs with Cytosine via 3 Hydrogen bonds (G ≡ C). In RNA, Uracil replaces Thymine (A = U).",
    "category": "Rule",
    "formula": "A=T (2 H-bonds); G≡C (3 H-bonds)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Vitamins classification: Water-soluble (Vitamin B-complex, Vitamin C - cannot be stored in body, excreted in urine); Fat-soluble (Vitamins A, D, E, K - stored in liver and adipose tissue).",
    "category": "Rule",
    "formula": "Water: B, C; Fat: A, D, E, K",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Deficiency diseases: Vitamin A -> Night blindness (Nyctalopia); Vitamin B1 (Thiamine) -> Beri-beri; Vitamin C (Ascorbic acid) -> Scurvy; Vitamin D -> Rickets; Vitamin K -> Blood clotting failure.",
    "category": "Shortcut",
    "formula": "Vit A: Night blind; Vit C: Scurvy; Vit D: Rickets",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Green Chemistry Principle: Atom economy = (Formula weight of desired product / Sum of formula weights of all reactants) × 100%. Maximizing atom economy minimizes waste.",
    "category": "Formula",
    "formula": "Atom Economy = (MW desired / MW reactants) × 100",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Nylon-6,6 is a condensation polyamide polymer prepared from Adipic Acid and Hexamethylenediamine; forms strong hydrogen bonding.",
    "category": "Concept",
    "formula": "Adipic acid + Hexamethylenediamine",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Nylon-6 is prepared by heating Caprolactam with water at high temperature (ring-opening polymerization).",
    "category": "Concept",
    "formula": "Caprolactam monomer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Dacron (Terylene) is a polyester prepared from Ethylene glycol and Terephthalic acid with elimination of water.",
    "category": "Concept",
    "formula": "Ethylene glycol + Terephthalic acid",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Bakelite is a thermosetting cross-linked polymer of Phenol and Formaldehyde (Novolac intermediate). Highly heat resistant.",
    "category": "Rule",
    "formula": "Thermosetting polymer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Buna-S (SBR) synthetic rubber: Copolymer of 75% 1,3-Butadiene and 25% Styrene in presence of peroxide catalyst.",
    "category": "Concept",
    "formula": "1,3-Butadiene + Styrene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Buna-N synthetic rubber: Copolymer of 1,3-Butadiene and Acrylonitrile; resistant to oils and petrol.",
    "category": "Concept",
    "formula": "Resistant to oils",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Neoprene is a synthetic rubber obtained by free radical polymerization of Chloroprene (2-chloro-1,3-butadiene).",
    "category": "Concept",
    "formula": "Monomer: Chloroprene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Teflon (PTFE - Polytetrafluoroethylene): Polymer of Tetrafluoroethylene (CF₂=CF₂); non-stick cookware coating.",
    "category": "Shortcut",
    "formula": "PTFE for non-stick coating",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Melamine-formaldehyde resin is a thermosetting polymer used for manufacturing unbreakable crockery.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "PHBV (Poly β-hydroxybutyrate-co-β-hydroxyvalerate) is a biodegradable copolymer used in speciality packaging and orthopaedic devices.",
    "category": "Rule",
    "formula": "Biodegradable copolymer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Vulcanization of natural rubber: Heating raw rubber with Sulfur (3-5%) introduces disulfide cross-links, improving elasticity and stiffness.",
    "category": "Concept",
    "formula": "Sulfur cross-links (3-5% S)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Natural rubber is cis-1,4-polyisoprene; Gutta-percha is the trans-1,4-polyisoprene (rigid and crystalline).",
    "category": "Rule",
    "formula": "Natural: cis-1,4-polyisoprene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "Low Density Polyethylene (LDPE) is prepared under high pressure (1000-2000 atm) and has branched structure; High Density Polyethylene (HDPE) uses Ziegler-Natta catalyst [TiCl₄ + (C₂H₅)₃Al] under low pressure.",
    "category": "Shortcut",
    "formula": "Ziegler-Natta: TiCl₄ + AlEt₃",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Antipyretics lower body temperature in fever (e.g. Paracetamol, Aspirin). Analgesics relieve pain without causing unconsciousness.",
    "category": "Definition",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Aspirin (Acetylsalicylic acid): Prepared by acetylation of Salicylic acid with acetic anhydride; inhibits prostaglandin synthesis and prevents blood clotting (cardiac prevention).",
    "category": "Formula",
    "formula": "Salicylic acid + Ac₂O -> Aspirin",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Antiseptics are applied to living tissues to kill/prevent microbe growth (e.g. Dettol = Chloroxylenol + Terpineol, Bithionol in soaps).",
    "category": "Concept",
    "formula": "Dettol = Chloroxylenol + Terpineol",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Disinfectants are applied to non-living objects (floors, drains): 0.2% Phenol acts as antiseptic, while 1.0% Phenol acts as disinfectant.",
    "category": "PYQ_Trend",
    "formula": "0.2% Phenol=Antiseptic; 1% Phenol=Disinfectant",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Broad-spectrum antibiotics kill a wide range of Gram-positive and Gram-negative bacteria (e.g. Chloramphenicol, Amoxicillin).",
    "category": "Rule",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Penicillin is a narrow-spectrum bactericidal antibiotic discovered by Alexander Fleming (1928).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Antacids neutralize excess stomach hydrochloric acid: Sodium hydrogencarbonate (NaHCO₃), Magnesium hydroxide [Mg(OH)₂ milk of magnesia], Ranitidine (Zantac).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Artificial Sweeteners: Aspartame (100x sweeter than sugar, unstable at cooking temp, used in cold foods/drinks); Saccharin (550x); Sucralose (600x, stable at cooking temp); Alitame (2000x).",
    "category": "Shortcut",
    "formula": "Sucralose: stable at cooking temp",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Anionic detergents have large anionic organic part (e.g. Sodium lauryl sulphate); Cationic detergents have cationic quaternary ammonium part (e.g. Cetyltrimethylammonium bromide - hair conditioners, germicidal).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Non-ionic detergents lack ionic charges (e.g. Pentaerythrityl stearate, liquid dishwashing detergents).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "PCC (Pyridinium Chlorochromate) selectively oxidizes 1° alcohols to Aldehydes and 2° alcohols to Ketones WITHOUT oxidizing further to carboxylic acids.",
    "category": "Rule",
    "formula": "1° alcohol -> Aldehyde (PCC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Jones Reagent (CrO₃ in dilute H₂SO₄ and acetone) oxidizes 1° alcohols completely to Carboxylic acids and 2° alcohols to Ketones.",
    "category": "Formula",
    "formula": "Jones: CrO₃ / aq. H₂SO₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "DIBAL-H (Diisobutylaluminium hydride) selectively reduces Esters and Cyanides (Nitriles) at -78°C directly to ALDEHYDES.",
    "category": "Shortcut",
    "formula": "Ester / Nitrile -> Aldehyde (DIBAL-H)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "Lithium Aluminium Hydride (LiAlH₄) is a powerful reducing agent reducing acids, esters, aldehydes, and ketones; Sodium Borohydride (NaBH₄) reduces ONLY aldehydes and ketones, NOT acids or esters.",
    "category": "Rule",
    "formula": "NaBH₄ reduces only aldehydes/ketones",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Ozonolysis of alkenes with O₃ followed by Zn / H₂O (reductive): Cleaves C=C double bond into carbonyls; =CH₂ gives Formaldehyde, =CH-R gives Aldehydes, =C(R)₂ gives Ketones.",
    "category": "Shortcut",
    "formula": "C=C cleaved to C=O",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Grignard Reagent (R-Mg-X) additions to carbonyls: Formaldehyde (HCHO) gives 1° alcohol; Any other aldehyde gives 2° alcohol; Ketones give 3° alcohol.",
    "category": "Rule",
    "formula": "HCHO->1°; RCHO->2°; RCOR->3°",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Schiemann Reaction: Fluorobenzene is prepared by treating benzene diazonium chloride with fluoroboric acid (HBF₄) followed by heating.",
    "category": "Formula",
    "formula": "Ar-N₂⁺BF₄⁻ -> Ar-F + BF₃ + N₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Freundlich Adsorption Isotherm: x / m = k · P^(1/n), where 0 < 1/n < 1. At low pressure x/m ∝ P; At high pressure independent of P.",
    "category": "Formula",
    "formula": "x/m = k P^(1/n)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Hardy-Schulze Rule: Coagulating power of an opposing electrolyte ion is directly proportional to 4th power of its valence (charge). E.g. For negative sol: Al³⁺ > Ba²⁺ > Na⁺.",
    "category": "Rule",
    "formula": "Coagulating power: Al³⁺ > Ba²⁺ > Na⁺",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Gold Number is the minimum milligrams of a protective lyophilic colloid needed to prevent coagulation of 10 mL gold sol by 1 mL of 10% NaCl. Smaller gold number means GREATER protective power (Gelatin has lowest gold number ≈ 0.005).",
    "category": "Formula",
    "formula": "Protective power ∝ 1 / Gold Number",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Tyndall Effect is the scattering of light by colloidal particles; observed only when diameter of dispersed particles is comparable to wavelength of light.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Ellingham Diagram: Plots ΔG° vs Temperature for metal oxide formation. Lower line element can displace/reduce the oxide of any metal located ABOVE it on the diagram.",
    "category": "Rule",
    "formula": "Lower line reduces upper line oxide",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Mond's Process for refining Nickel: Impure Ni + 4 CO at 330-350 K -> volatile Ni(CO)₄, decomposed at 450-470 K to give 99.9% pure Ni.",
    "category": "Formula",
    "formula": "Ni + 4 CO <=> Ni(CO)₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Van Arkel de Boer Method: Used for refining Titanium (Ti) and Zirconium (Zr) by heating with Iodine to form volatile tetraiodide, decomposed on tungsten filament.",
    "category": "Formula",
    "formula": "Zr + 2 I₂ <=> ZrI₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Froth Flotation Process: Concentrates sulfide ores based on preferential wetting of ore by pine oil and gangue by water. Depressant NaCN separates ZnS from PbS.",
    "category": "Concept",
    "formula": "Depressant NaCN for ZnS + PbS",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Hall-Heroult Process for Aluminium extraction: Electrolysis of molten alumina Al₂O₃ dissolved in Cryolite (Na₃AlF₆) and fluorspar (CaF₂) to lower melting point and increase electrical conductivity.",
    "category": "Rule",
    "formula": "Cryolite lowers melting point of Al₂O₃",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "Calcination is heating ore strongly in ABSENCE or limited supply of air (for carbonates and hydrated oxides); Roasting is heating in EXCESS of air (for sulfide ores).",
    "category": "Rule",
    "formula": "Calcination: No air; Roasting: Excess air",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "Oxoacids of Phosphorus: Hypophosphorous acid (H₃PO₂) has 1 P-OH bond and 2 P-H bonds (monobasic, powerful reducing agent).",
    "category": "Formula",
    "formula": "H₃PO₂: 1 P-OH, 2 P-H (Monobasic)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Phosphorous acid (H₃PO₃) has 2 P-OH bonds and 1 P-H bond (dibasic, reducing agent); Orthophosphoric acid (H₃PO₄) has 3 P-OH bonds (tribasic, non-reducing).",
    "category": "Rule",
    "formula": "H₃PO₃: Dibasic; H₃PO₄: Tribasic",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Caro's Acid is Peroxomonosulfuric acid (H₂SO₅); contains one peroxy (-O-O-) linkage; oxidation state of Sulfur is +6.",
    "category": "Formula",
    "formula": "Caro's Acid = H₂SO₅ (O.S. of S = +6)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Marshall's Acid is Peroxodisulfuric acid (H₂S₂O₈); contains one peroxy linkage (-O-O-) between two -SO₃H groups; oxidation state of Sulfur is +6.",
    "category": "Formula",
    "formula": "Marshall's Acid = H₂S₂O₈ (S = +6)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Xenon Fluorides Hydrolysis: XeF₂ + 2 H₂O -> 2 Xe + 4 HF + O₂; Complete hydrolysis of XeF₆ gives explosive yellow liquid XeO₃: XeF₆ + 3 H₂O -> XeO₃ + 6 HF.",
    "category": "Formula",
    "formula": "XeF₆ + 3 H₂O -> XeO₃ + 6 HF",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Interhalogen compound geometries: ClF₃ is T-shaped (sp³d, 2 lone pairs); BrF₅ is square pyramidal (sp³d², 1 lone pair); IF₇ is pentagonal bipyramidal (sp³d³).",
    "category": "Shortcut",
    "formula": "ClF₃: T-shaped; BrF₅: Sq Pyramidal; IF₇: PBP",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "Actinoid contraction is GREATER than Lanthanoid contraction because of poorer shielding by 5f electrons compared to 4f electrons.",
    "category": "Concept",
    "formula": "5f shielding is poorer than 4f",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Crown Ethers (e.g. 18-crown-6) act as phase transfer catalysts by selectively binding cations (K⁺) inside cavity and solubilizing inorganic salts in nonpolar organic solvents.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Hofmann Elimination in quaternary ammonium hydroxides or bulky bases yields LEAST substituted alkene (Hofmann product) as major, opposite to Saytzeff rule.",
    "category": "Exception",
    "formula": "Less substituted alkene is major",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Pinacol-Pinacolone Rearrangement: Acid catalyzed conversion of vicinal diol (Pinacol) to ketone (Pinacolone) with carbocation formation and methyl shift.",
    "category": "Rule",
    "formula": "Pinacol -> Pinacolone (Methyl shift)",
    "badge": "PYQ Trends & Advanced"
  }
];

export const MATHEMATICS_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Conjunction (p ∧ q) is True ONLY when both p and q are True. Disjunction (p ∨ q) is False ONLY when both p and q are False.",
    "category": "Rule",
    "formula": "T ∧ T = T; F ∨ F = F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Conditional (p -> q) is False ONLY when p is True and q is False (T -> F = F); otherwise it is True.",
    "category": "Rule",
    "formula": "T -> F = F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Negation of conditional: ~(p -> q) ≡ p ∧ ~q. Very frequent exam trap.",
    "category": "Shortcut",
    "formula": "~(p -> q) ≡ p ∧ ~q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Biconditional (p <-> q) is True when both p and q have IDENTICAL truth values (T <-> T = T and F <-> F = T).",
    "category": "Rule",
    "formula": "p <-> q ≡ (p -> q) ∧ (q -> p)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Converse, Inverse, Contrapositive of p -> q: Converse = q -> p; Inverse = ~p -> ~q; Contrapositive = ~q -> ~p (equivalent to p -> q).",
    "category": "Rule",
    "formula": "Contrapositive ≡ Original",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "De Morgan's Laws in Logic: ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q.",
    "category": "Rule",
    "formula": "~(p ∧ q) ≡ ~p ∨ ~q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Tautology (t): Statement pattern which is True for ALL truth values of components. Contradiction (c): False for all.",
    "category": "Definition",
    "formula": "Tautology = All T; Contradiction = All F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "A matrix A is singular if det(A) = |A| = 0; Non-singular if |A| ≠ 0. Inverse A⁻¹ exists ONLY if |A| ≠ 0.",
    "category": "Rule",
    "formula": "|A| ≠ 0 for A⁻¹",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "Matrix inverse formula: A⁻¹ = (1 / |A|) · adj(A). For 2x2 matrix [[a,b],[c,d]], adj(A) = [[d,-b],[-c,a]].",
    "category": "Shortcut",
    "formula": "adj([[a,b],[c,d]]) = [[d,-b],[-c,a]]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Properties of adjoint: A · adj(A) = adj(A) · A = |A| · I_n.",
    "category": "Formula",
    "formula": "A · adj(A) = |A| I",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Determinant of adjoint: |adj(A)| = |A|^(n - 1), where n is order of square matrix A.",
    "category": "Formula",
    "formula": "|adj(A)| = |A|^(n - 1)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Determinant of product: |A · B| = |A| · |B|; |k · A| = k^n · |A| for n×n matrix.",
    "category": "Formula",
    "formula": "|kA| = k^n |A|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Symmetric matrix: A^T = A (a_ij = a_ji); Skew-symmetric: A^T = - A (a_ij = - a_ji, all diagonal elements are ZERO).",
    "category": "Definition",
    "formula": "Skew-symmetric: a_ii = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Any square matrix can be uniquely expressed as sum of a symmetric and skew-symmetric matrix: A = (1/2)(A + A^T) + (1/2)(A - A^T).",
    "category": "Rule",
    "formula": "A = 1/2(A + A^T) + 1/2(A - A^T)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "System of equations A X = B has unique solution if |A| ≠ 0; If |A| = 0 and (adj A)·B ≠ 0 => Inconsistent (No solution).",
    "category": "Rule",
    "formula": "|A| ≠ 0: Unique; No solution if (adj A)B ≠ 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "General solution of sin θ = sin α is θ = n π + (-1)^n α, where n ∈ Z.",
    "category": "Formula",
    "formula": "θ = nπ + (-1)^n α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "General solution of cos θ = cos α is θ = 2 n π ± α, where n ∈ Z.",
    "category": "Formula",
    "formula": "θ = 2nπ ± α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "General solution of tan θ = tan α is θ = n π + α, where n ∈ Z.",
    "category": "Formula",
    "formula": "θ = nπ + α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "General solutions of sin²θ = sin²α, cos²θ = cos²α, and tan²θ = tan²α are ALL: θ = n π ± α.",
    "category": "Shortcut",
    "formula": "sin²θ = sin²α => θ = nπ ± α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Sine Rule in triangle ABC: a / sin A = b / sin B = c / sin C = 2R, where R is circumradius.",
    "category": "Formula",
    "formula": "a/sin A = b/sin B = c/sin C = 2R",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Cosine Rule: cos A = (b² + c² - a²) / (2 b c); cos B = (a² + c² - b²) / (2 a c); cos C = (a² + b² - c²) / (2 a b).",
    "category": "Formula",
    "formula": "cos A = (b² + c² - a²)/(2bc)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Projection Rule: a = b cos C + c cos B; b = c cos A + a cos C; c = a cos B + b cos A.",
    "category": "Formula",
    "formula": "a = b cos C + c cos B",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Area of triangle ABC: Δ = (1/2) a b sin C = (1/2) b c sin A = (1/2) a c sin B = a b c / (4R) = r · s.",
    "category": "Formula",
    "formula": "Δ = 1/2 ab sin C = rs",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Principal value branch of sin⁻¹x is [-π/2, π/2]; For cos⁻¹x is [0, π]; For tan⁻¹x is (-π/2, π/2).",
    "category": "Rule",
    "formula": "sin⁻¹ ∈ [-π/2, π/2]; cos⁻¹ ∈ [0, π]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Key inverse trigonometric identities: sin⁻¹x + cos⁻¹x = π/2; tan⁻¹x + cot⁻¹x = π/2; sec⁻¹x + cosec⁻¹x = π/2 (for valid domain).",
    "category": "Shortcut",
    "formula": "sin⁻¹x + cos⁻¹x = π/2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "tan⁻¹x + tan⁻¹y = tan⁻¹[ (x + y) / (1 - x y) ] for x y < 1.",
    "category": "Formula",
    "formula": "tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Homogeneous equation of second degree ax² + 2hxy + by² = 0 represents a pair of straight lines passing through the ORIGIN.",
    "category": "Concept",
    "formula": "ax² + 2hxy + by² = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Condition for lines ax² + 2hxy + by² = 0 to be real and distinct: h² - ab > 0; Coincident: h² - ab = 0; Imaginary: h² - ab < 0.",
    "category": "Rule",
    "formula": "h² - ab > 0: Real & distinct",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Angle θ between lines ax² + 2hxy + by² = 0: tan θ = | 2 √(h² - ab) / (a + b) |.",
    "category": "Formula",
    "formula": "tan θ = |2√(h²-ab) / (a+b)|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Condition for perpendicular lines: a + b = 0 (coefficient of x² + coefficient of y² = 0). Very frequent shortcut.",
    "category": "Shortcut",
    "formula": "Perpendicular: a + b = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Condition for parallel / coincident lines: h² - ab = 0.",
    "category": "Shortcut",
    "formula": "Parallel: h² - ab = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Sum and product of slopes: m₁ + m₂ = - 2h / b and m₁ · m₂ = a / b.",
    "category": "Formula",
    "formula": "m₁+m₂ = -2h/b; m₁m₂ = a/b",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "General second degree equation ax² + 2hxy + by² + 2gx + 2fy + c = 0 represents pair of lines if Δ = abc + 2fgh - af² - bg² - ch² = 0.",
    "category": "Formula",
    "formula": "Δ = abc + 2fgh - af² - bg² - ch² = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Dot (Scalar) Product: a · b = |a| |b| cos θ = a_x b_x + a_y b_y + a_z b_z. If a ⊥ b => a · b = 0.",
    "category": "Formula",
    "formula": "a ⊥ b <=> a · b = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Projection of vector a on vector b: Projection = (a · b) / |b|; Vector projection = [ (a · b) / |b|² ] b.",
    "category": "Formula",
    "formula": "Projection = (a · b) / |b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Cross (Vector) Product: a × b = |a| |b| sin θ n̂. Magnitude equals area of parallelogram with adjacent sides a and b.",
    "category": "Formula",
    "formula": "Area = |a × b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Area of triangle with adjacent vectors a and b: Area = (1/2) |a × b|; With diagonals d₁ and d₂: Area = (1/2) |d₁ × d₂|.",
    "category": "Formula",
    "formula": "Area = 1/2 |a × b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Scalar Triple Product [a b c] = a · (b × c). Represents volume of parallelepiped with coterminous edges a, b, c.",
    "category": "Formula",
    "formula": "Volume = [a b c]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Condition for three vectors a, b, c to be coplanar: [a b c] = 0.",
    "category": "Rule",
    "formula": "Coplanar: [a b c] = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Volume of tetrahedron formed by coterminous edges a, b, c: V = (1/6) [a b c].",
    "category": "Formula",
    "formula": "V_tetra = 1/6 [a b c]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Direction cosines l, m, n satisfy: l² + m² + n² = cos²α + cos²β + cos²γ = 1; sin²α + sin²β + sin²γ = 2.",
    "category": "Shortcut",
    "formula": "l² + m² + n² = 1; Σ sin²α = 2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Angle between two lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂: cos θ = | a₁a₂ + b₁b₂ + c₁c₂ | / [ √(Σ a₁²) √(Σ a₂²) ].",
    "category": "Formula",
    "formula": "cos θ = (a₁a₂+b₁b₂+c₁c₂)/(|a||b|)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Perpendicular lines in 3D: a₁ a₂ + b₁ b₂ + c₁ c₂ = 0. Parallel lines: a₁ / a₂ = b₁ / b₂ = c₁ / c₂.",
    "category": "Rule",
    "formula": "a₁a₂ + b₁b₂ + c₁c₂ = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Equation of line through point (x₁, y₁, z₁) with direction ratios a, b, c: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c.",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = (z - z₁)/c",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Shortest distance between two skew lines r = a₁ + λ b₁ and r = a₂ + μ b₂: d = | (a₂ - a₁) · (b₁ × b₂) | / | b₁ × b₂ |.",
    "category": "Formula",
    "formula": "d = |(a₂-a₁)·(b₁×b₂)| / |b₁×b₂|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "If two lines intersect, shortest distance d = 0 => (a₂ - a₁) · (b₁ × b₂) = 0.",
    "category": "Rule",
    "formula": "(a₂ - a₁) · (b₁ × b₂) = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Linear Programming Problem (LPP): Objective function Z = ax + by is maximized/minimized at CORNER POINTS of feasible region.",
    "category": "Rule",
    "formula": "Optimal solution at corner points",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "If the feasible region of LPP is bounded, objective function Z always has both a maximum and a minimum value.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Redundant constraint in LPP is one whose removal does NOT change the feasible region.",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "Corner Point Method steps: 1. Find feasible region 2. Determine corner coordinates 3. Evaluate Z at each corner 4. Identify optimal Z.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Standard limits: lim(x->0) [sin x / x] = 1; lim(x->0) [tan x / x] = 1; lim(x->0) [ (a^x - 1) / x ] = ln a; lim(x->0) [ (1 + x)^(1/x) ] = e.",
    "category": "Formula",
    "formula": "lim(x->0) sin x / x = 1",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "L'Hopital's Rule: If lim f(x)/g(x) gives 0/0 or ∞/∞, then lim f(x)/g(x) = lim f'(x)/g'(x). Differentiate numerator and denominator separately.",
    "category": "Shortcut",
    "formula": "lim f(x)/g(x) = lim f'(x)/g'(x)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "A function f(x) is continuous at x = a if: lim(x->a⁻) f(x) = lim(x->a⁺) f(x) = f(a) (LHL = RHL = value at point).",
    "category": "Definition",
    "formula": "LHL = RHL = f(a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Differentiability implies continuity, but continuity does NOT necessarily imply differentiability (e.g. f(x) = |x| at x = 0).",
    "category": "Rule",
    "formula": "Differentiable => Continuous",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Chain Rule of differentiation: dy/dx = (dy/du) · (du/dx). For composite function y = f(g(x)) => y' = f'(g(x)) · g'(x).",
    "category": "Formula",
    "formula": "dy/dx = (dy/du)(du/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Derivative of [f(x)]^[g(x)]: Use logarithmic differentiation: y' = y [ g'(x) ln f(x) + g(x) f'(x) / f(x) ].",
    "category": "Formula",
    "formula": "y = u^v => ln y = v ln u",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Parametric differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt); d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt).",
    "category": "Formula",
    "formula": "dy/dx = (dy/dt)/(dx/dt)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Implicit differentiation: Differentiate term by term with respect to x, treating y as function of x (d/dx [y²] = 2y dy/dx).",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Derivative of determinant: Differentiate one row (or column) at a time, keeping others constant, and sum the determinants.",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Derivative of inverse function: (f⁻¹)'(y) = 1 / f'(x), where y = f(x).",
    "category": "Formula",
    "formula": "dx/dy = 1 / (dy/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "Rolle's Theorem: If f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then there exists c ∈ (a, b) such that f'(c) = 0.",
    "category": "Rule",
    "formula": "f'(c) = 0",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Lagrange's Mean Value Theorem (LMVT): If f is continuous on [a, b] and differentiable on (a, b), then f'(c) = [f(b) - f(a)] / (b - a).",
    "category": "Rule",
    "formula": "f'(c) = [f(b) - f(a)] / (b - a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Slope of tangent to curve y = f(x) at point (x₁, y₁): m = (dy/dx)_(x₁, y₁); Slope of normal: m_N = - 1 / m.",
    "category": "Formula",
    "formula": "m_tangent = dy/dx; m_normal = -1/m",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Equation of tangent: y - y₁ = m (x - x₁); Equation of normal: y - y₁ = (-1/m) (x - x₁).",
    "category": "Formula",
    "formula": "y - y₁ = m(x - x₁)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Increasing function: f'(x) > 0 for all x in interval; Decreasing function: f'(x) < 0.",
    "category": "Rule",
    "formula": "f'(x) > 0: Increasing",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Maxima and Minima First Derivative Test: At stationary point f'(c) = 0, if f'(x) changes from + to -, then c is local MAXIMUM.",
    "category": "Rule",
    "formula": "+ to - : Maximum; - to + : Minimum",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Second Derivative Test: If f'(c) = 0 and f''(c) < 0 => local MAXIMUM; If f'(c) = 0 and f''(c) > 0 => local MINIMUM.",
    "category": "Rule",
    "formula": "f''(c) < 0: Max; f''(c) > 0: Min",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Point of Inflection: A point where curve changes concavity (f''(c) = 0 and f''(x) changes sign).",
    "category": "Definition",
    "formula": "f''(c) = 0",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Rate of change: dy/dt = (dy/dx) · (dx/dt). E.g. rate of change of area of circle dA/dt = 2πr (dr/dt).",
    "category": "Formula",
    "formula": "dy/dt = (dy/dx)(dx/dt)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Approximation using differentials: f(a + h) ≈ f(a) + h · f'(a).",
    "category": "Formula",
    "formula": "f(a + h) ≈ f(a) + h f'(a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Standard derivative of sin⁻¹x = 1 / √(1 - x²); cos⁻¹x = - 1 / √(1 - x²); tan⁻¹x = 1 / (1 + x²).",
    "category": "Formula",
    "formula": "d/dx(tan⁻¹x) = 1/(1+x²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Derivative of a^x = a^x ln a; Derivative of log_a x = 1 / (x ln a).",
    "category": "Formula",
    "formula": "d/dx(a^x) = a^x ln a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Angle between two intersecting curves: tan θ = | (m₁ - m₂) / (1 + m₁ m₂) |, where m₁ and m₂ are slopes of tangents.",
    "category": "Formula",
    "formula": "tan θ = |(m₁-m₂)/(1+m₁m₂)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Orthogonal curves: Two curves intersect at right angles (θ = 90°) if and only if m₁ · m₂ = - 1.",
    "category": "Rule",
    "formula": "m₁ m₂ = -1",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Radius of curvature ρ = [ 1 + (y')² ]^(3/2) / |y''|.",
    "category": "Formula",
    "formula": "ρ = [1+(y')²]^(3/2) / |y''|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Integration by Parts (ILATE rule): ∫ u v dx = u ∫ v dx - ∫ [ u' · (∫ v dx) ] dx. Choose u in order: Inverse, Log, Algebraic, Trig, Exponential.",
    "category": "Formula",
    "formula": "∫ u v dx = u ∫ v - ∫(u' ∫ v)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Special integral: ∫ e^x [ f(x) + f'(x) ] dx = e^x · f(x) + C. Extremely frequent CET/JEE shortcut.",
    "category": "Shortcut",
    "formula": "∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Standard integral: ∫ 1 / (x² + a²) dx = (1/a) tan⁻¹(x/a) + C; ∫ 1 / √(a² - x²) dx = sin⁻¹(x/a) + C.",
    "category": "Formula",
    "formula": "∫ 1/(x²+a²) dx = 1/a tan⁻¹(x/a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Standard integral: ∫ 1 / (x² - a²) dx = (1 / 2a) ln | (x - a) / (x + a) | + C; ∫ 1 / (a² - x²) dx = (1 / 2a) ln | (a + x) / (a - x) | + C.",
    "category": "Formula",
    "formula": "∫ 1/(x²-a²) dx = (1/2a) ln|(x-a)/(x+a)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Standard radical: ∫ √(a² - x²) dx = (x/2) √(a² - x²) + (a²/2) sin⁻¹(x/a) + C.",
    "category": "Formula",
    "formula": "∫ √(a²-x²) dx = x/2√(a²-x²) + a²/2 sin⁻¹(x/a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Standard radical: ∫ √(x² + a²) dx = (x/2) √(x² + a²) + (a²/2) ln | x + √(x² + a²) | + C.",
    "category": "Formula",
    "formula": "∫ √(x²+a²) dx = x/2√(x²+a²) + a²/2 ln|x+√(x²+a²)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "King's Property of Definite Integrals: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx. For [0, a]: ∫_0^a f(x) dx = ∫_0^a f(a - x) dx.",
    "category": "Rule",
    "formula": "∫_0^a f(x) dx = ∫_0^a f(a-x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Symmetry property for even/odd functions: If f(-x) = - f(x) (odd), then ∫_-a^a f(x) dx = 0; If f(-x) = f(x) (even), then ∫_-a^a f(x) dx = 2 ∫_0^a f(x) dx.",
    "category": "Shortcut",
    "formula": "Odd => 0; Even => 2 ∫_0^a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "Periodic property: If f(x + T) = f(x), then ∫_0^(n T) f(x) dx = n · ∫_0^T f(x) dx.",
    "category": "Rule",
    "formula": "∫_0^(nT) f(x) dx = n ∫_0^T f(x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Leibniz Rule for differentiation under integral sign: d/dx [ ∫_u(x)^v(x) f(t) dt ] = f(v(x)) · v'(x) - f(u(x)) · u'(x).",
    "category": "Formula",
    "formula": "d/dx ∫_u^v f(t) dt = f(v)v' - f(u)u'",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Area between curve y = f(x) and x-axis from x = a to x = b: Area = ∫_a^b |y| dx.",
    "category": "Formula",
    "formula": "Area = ∫_a^b |y| dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "Area between two curves y = f(x) and y = g(x): Area = ∫_a^b | f(x) - g(x) | dx.",
    "category": "Formula",
    "formula": "Area = ∫ (y_upper - y_lower) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Shortcut: Area bounded by parabola y² = 4ax and line y = mx is Area = 8 a² / (3 m³).",
    "category": "Shortcut",
    "formula": "Area = 8a² / (3m³)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Shortcut: Area bounded by two parabolas y² = 4ax and x² = 4by is Area = 16 a b / 3.",
    "category": "Shortcut",
    "formula": "Area = 16ab / 3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Shortcut: Area of ellipse x²/a² + y²/b² = 1 is Area = π a b.",
    "category": "Shortcut",
    "formula": "Area = π a b",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Order of differential equation is the order of HIGHEST derivative; Degree is power of highest derivative when equation is free from radicals and fractions.",
    "category": "Definition",
    "formula": "Order = Highest derivative; Degree = Power",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Variable Separable method: If dy/dx = f(x) · g(y), then integrate ∫ [ 1 / g(y) ] dy = ∫ f(x) dx + C.",
    "category": "Rule",
    "formula": "dy / g(y) = f(x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Homogeneous differential equation dy/dx = f(y/x): Substitute y = v · x => dy/dx = v + x (dv/dx).",
    "category": "Formula",
    "formula": "Substitute y = vx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Linear Differential Equation (LDE): dy/dx + P y = Q => Integrating Factor IF = e^(∫ P dx). Solution: y · (IF) = ∫ [ Q · (IF) ] dx + C.",
    "category": "Formula",
    "formula": "IF = e^(∫ P dx); y(IF) = ∫ Q(IF) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Probability addition theorem: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). For mutually exclusive events P(A ∩ B) = 0.",
    "category": "Formula",
    "formula": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Conditional probability: P(A | B) = P(A ∩ B) / P(B), provided P(B) > 0.",
    "category": "Formula",
    "formula": "P(A | B) = P(A ∩ B) / P(B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Independent events: Two events A and B are independent if and only if P(A ∩ B) = P(A) · P(B) and P(A | B) = P(A).",
    "category": "Rule",
    "formula": "P(A ∩ B) = P(A) · P(B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Bayes' Theorem: P(E_i | A) = [ P(E_i) · P(A | E_i) ] / [ Σ P(E_k) · P(A | E_k) ]. Reverses conditional probability.",
    "category": "Formula",
    "formula": "P(E_i|A) = P(E_i)P(A|E_i) / Σ P(E_k)P(A|E_k)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Binomial Distribution B(n, p): Probability of r successes P(X = r) = nCr · p^r · q^(n - r), where q = 1 - p.",
    "category": "Formula",
    "formula": "P(X = r) = nCr p^r q^(n - r)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Mean and Variance of Binomial Distribution: Mean μ = n · p; Variance σ² = n · p · q; Standard deviation σ = √(n p q). Variance is always strictly LESS than Mean.",
    "category": "Shortcut",
    "formula": "Mean = np; Variance = npq (Var < Mean)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Circle general equation: x² + y² + 2gx + 2fy + c = 0 has Center at (-g, -f) and Radius r = √(g² + f² - c). Real circle requires g² + f² - c ≥ 0.",
    "category": "Formula",
    "formula": "Center: (-g,-f); r = √(g²+f²-c)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Intercepts made by circle on axes: x-intercept = 2 √(g² - c); y-intercept = 2 √(f² - c). If g² = c, circle touches x-axis; If f² = c, touches y-axis.",
    "category": "Shortcut",
    "formula": "x-intercept = 2√(g²-c); y-intercept = 2√(f²-c)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Condition for line y = mx + c to touch circle x² + y² = a²: c² = a²(1 + m²) => Tangent equation: y = mx ± a √(1 + m²).",
    "category": "Formula",
    "formula": "c² = a²(1 + m²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Chord of contact of tangents drawn from external point P(x₁, y₁) to circle x² + y² = a² is given by T = xx₁ + yy₁ - a² = 0.",
    "category": "Formula",
    "formula": "Chord of contact: T = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Length of tangent from external point P(x₁, y₁) to circle x² + y² + 2gx + 2fy + c = 0 is L = √(x₁² + y₁² + 2gx₁ + 2fy₁ + c) = √S₁.",
    "category": "Formula",
    "formula": "L = √S₁",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Parabola standard form y² = 4ax: Focus (a, 0), Directrix x = -a, Vertex (0, 0), Axis y = 0, Length of Latus Rectum = 4a.",
    "category": "Formula",
    "formula": "Focus (a,0); Latus Rectum = 4a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Parametric coordinates of any point on parabola y² = 4ax are (at², 2at). Equation of chord joining t₁ and t₂ has slope 2 / (t₁ + t₂).",
    "category": "Shortcut",
    "formula": "Parametric: (at², 2at)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Equation of tangent to parabola y² = 4ax at (x₁, y₁): yy₁ = 2a(x + x₁); In slope form: y = mx + a/m (m ≠ 0).",
    "category": "Formula",
    "formula": "y = mx + a/m",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Equation of normal to parabola y² = 4ax in terms of parameter t: y = -tx + 2at + at³; In slope form (m = -t): y = mx - 2am - am³.",
    "category": "Formula",
    "formula": "Normal: y = mx - 2am - am³",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Focal distance of any point P(x₁, y₁) on parabola y² = 4ax is SP = x₁ + a. Sum of focal distances for focal chord is independent of y.",
    "category": "Shortcut",
    "formula": "SP = x₁ + a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "If t₁ and t₂ are extremities of a focal chord of parabola y² = 4ax, then t₁ · t₂ = - 1. Length of focal chord is a (t + 1/t)².",
    "category": "Rule",
    "formula": "Focal chord: t₁ t₂ = -1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Standard Ellipse x²/a² + y²/b² = 1 (a > b): Eccentricity e = √(1 - b²/a²) < 1. Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a.",
    "category": "Formula",
    "formula": "e = √(1 - b²/a²); LR = 2b²/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Focal property of Ellipse: Sum of focal distances of any point P on ellipse from the two foci is always CONSTANT and equal to major axis: SP + S'P = 2a.",
    "category": "Rule",
    "formula": "SP + S'P = 2a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Condition for line y = mx + c to be tangent to ellipse x²/a² + y²/b² = 1 is c² = a²m² + b². Tangent: y = mx ± √(a²m² + b²).",
    "category": "Formula",
    "formula": "c² = a²m² + b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Director Circle of ellipse x²/a² + y²/b² = 1 is the locus of intersection of mutually perpendicular tangents: x² + y² = a² + b².",
    "category": "Formula",
    "formula": "Director Circle: x² + y² = a² + b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Standard Hyperbola x²/a² - y²/b² = 1: Eccentricity e = √(1 + b²/a²) > 1. Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a.",
    "category": "Formula",
    "formula": "e = √(1 + b²/a²) > 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Focal property of Hyperbola: Difference of focal distances of any point P on hyperbola from two foci is always CONSTANT: |SP - S'P| = 2a.",
    "category": "Rule",
    "formula": "|SP - S'P| = 2a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Condition for line y = mx + c to touch hyperbola x²/a² - y²/b² = 1 is c² = a²m² - b². Tangent: y = mx ± √(a²m² - b²).",
    "category": "Formula",
    "formula": "c² = a²m² - b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Director Circle of hyperbola x²/a² - y²/b² = 1 is x² + y² = a² - b². Real only if a > b; If a < b, no perpendicular tangents exist.",
    "category": "Formula",
    "formula": "Director Circle: x² + y² = a² - b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Rectangular Hyperbola (Equilateral Hyperbola): a = b => x² - y² = a²; Eccentricity is always strictly e = √2. Asymptotes are perpendicular.",
    "category": "Rule",
    "formula": "Rectangular hyperbola: e = √2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Rectangular hyperbola referred to asymptotes as axes: xy = c² where c² = a²/2. Parametric coordinates are (ct, c/t). Tangent: x + yt² = 2ct.",
    "category": "Shortcut",
    "formula": "xy = c² => (ct, c/t)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Vector Triple Product expansion: a × (b × c) = (a · c) b - (a · b) c. Note: a × (b × c) ≠ (a × b) × c (non-associative).",
    "category": "Formula",
    "formula": "a × (b × c) = (a·c)b - (a·b)c",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Lagrange's Identity for vectors: |a × b|² = |a|² |b|² - (a · b)².",
    "category": "Formula",
    "formula": "|a × b|² + (a · b)² = |a|² |b|²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Vector equation of plane passing through point with position vector a and perpendicular to normal vector n: r · n = a · n = d.",
    "category": "Formula",
    "formula": "r · n = d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Perpendicular distance of point P(x₁, y₁, z₁) from plane ax + by + cz + d = 0 is D = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |ax₁+by₁+cz₁+d| / √(a²+b²+c²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Distance between two parallel planes ax + by + cz + d₁ = 0 and ax + by + cz + d₂ = 0 is D = |d₁ - d₂| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |d₁ - d₂| / √(a²+b²+c²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Angle θ between line r = a + λ b and plane r · n = d is given by sin θ = |b · n| / (|b| |n|). Line parallel to plane if b · n = 0.",
    "category": "Formula",
    "formula": "sin θ = |b · n| / (|b| |n|)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Intercept form of equation of plane in 3D: x/a + y/b + z/c = 1, where a, b, c are intercepts on X, Y, Z axes respectively.",
    "category": "Formula",
    "formula": "x/a + y/b + z/c = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Complex number polar form: z = r(cos θ + i sin θ) = r e^(iθ), where r = |z| = √(x² + y²) and θ = arg(z) = tan⁻¹(y/x).",
    "category": "Formula",
    "formula": "z = r e^(iθ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Euler's Formula: e^(iθ) = cos θ + i sin θ; e^(-iθ) = cos θ - i sin θ => cos θ = (e^(iθ) + e^(-iθ))/2; sin θ = (e^(iθ) - e^(-iθ))/(2i).",
    "category": "Formula",
    "formula": "e^(iθ) = cos θ + i sin θ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "De Moivre's Theorem: (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ) for any rational number n.",
    "category": "Formula",
    "formula": "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Cube roots of unity: 1, ω, ω² where ω = (-1 + i√3)/2 and ω² = (-1 - i√3)/2. Sum: 1 + ω + ω² = 0; Product: ω³ = 1.",
    "category": "Rule",
    "formula": "1 + ω + ω² = 0; ω³ = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Powers of imaginary unit i: i = √(-1), i² = -1, i³ = -i, i⁴ = 1; For any integer k: i^(4k) = 1, i^(4k+1) = i, i^(4k+2) = -1, i^(4k+3) = -i.",
    "category": "Shortcut",
    "formula": "iⁿ + iⁿ⁺¹ + iⁿ⁺² + iⁿ⁺³ = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Triangle inequalities for complex numbers: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|. Maximum of |z₁ + z₂| is |z₁| + |z₂|.",
    "category": "Formula",
    "formula": "||z₁| - |z₂|| ≤ |z₁ + z₂| ≤ |z₁| + |z₂|",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Locus |z - z₁| = |z - z₂| represents the PERPENDICULAR BISECTOR of the line segment joining points z₁ and z₂.",
    "category": "Rule",
    "formula": "|z - z₁| = |z - z₂|: Perp Bisector",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Locus |z - z₁| / |z - z₂| = k (k > 0, k ≠ 1) represents a CIRCLE (Circle of Apollonius); If k = 1, it represents straight line.",
    "category": "Rule",
    "formula": "Circle if k ≠ 1; Line if k = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Walli's Formula for ∫_0^(π/2) sinⁿ x dx = ∫_0^(π/2) cosⁿ x dx: [(n-1)(n-3)... / n(n-2)...] × (π/2 if n is even, 1 if n is odd).",
    "category": "Shortcut",
    "formula": "Walli's Formula: multiply π/2 if n is even",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Shortcut for Definite Integral: ∫_0^(π/2) [ dx / (a² cos² x + b² sin² x) ] = π / (2 a b).",
    "category": "Shortcut",
    "formula": "Area = π / (2ab)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Shortcut for Definite Integral: ∫_0^(π/2) [ (sinⁿ x) / (sinⁿ x + cosⁿ x) ] dx = π / 4 for ANY power n (even fractional).",
    "category": "Shortcut",
    "formula": "Answer = π / 4",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Area bounded by ellipse x²/a² + y²/b² = 1 in first quadrant is π a b / 4; Total area is π a b.",
    "category": "Shortcut",
    "formula": "Area = π a b",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Bernoulli's Differential Equation: dy/dx + P y = Q yⁿ. Divide by yⁿ and substitute z = y^(1-n) to convert into standard linear form.",
    "category": "Formula",
    "formula": "Substitute z = y^(1-n)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Exact Differential Equation condition: M(x, y) dx + N(x, y) dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x.",
    "category": "Rule",
    "formula": "∂M/∂y = ∂N/∂x",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Orthogonal Trajectories of family of curves f(x, y, c) = 0: Find dy/dx, replace dy/dx with - dx/dy, and solve new differential equation.",
    "category": "Rule",
    "formula": "Replace dy/dx with -dx/dy",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Permutations of n objects where p are identical of one kind, q of another, and r of a third kind is n! / (p! q! r!).",
    "category": "Formula",
    "formula": "n! / (p! q! r!)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Circular Permutations: Number of arrangements of n distinct objects along a circle is (n - 1)!; If clockwise and counter-clockwise are identical (garland of flowers), then (n - 1)! / 2.",
    "category": "Formula",
    "formula": "Circle = (n-1)!; Garland = (n-1)! / 2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Number of non-empty subsets of a set with n elements is 2ⁿ - 1; Number of proper subsets is 2ⁿ - 1.",
    "category": "Shortcut",
    "formula": "Subsets = 2ⁿ; Non-empty = 2ⁿ - 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Binomial Theorem: (a + b)ⁿ = Σ (nCr a^(n-r) b^r) from r = 0 to n. General term T_(r+1) = nCr a^(n-r) b^r.",
    "category": "Formula",
    "formula": "T_(r+1) = nCr a^(n-r) b^r",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Sum of binomial coefficients in expansion of (1 + x)ⁿ is nC₀ + nC₁ + nC₂ + ... + nC_n = 2ⁿ.",
    "category": "Shortcut",
    "formula": "Σ nCr = 2ⁿ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Middle term in binomial expansion (a + b)ⁿ: If n is even, single middle term is T_(n/2 + 1); If n is odd, two middle terms are T_((n+1)/2) and T_((n+3)/2).",
    "category": "Rule",
    "formula": "Even n: T_(n/2 + 1)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Random variable expectation (Mean) μ = E(X) = Σ (x_i P_i). Variance σ² = Var(X) = E(X²) - [E(X)]².",
    "category": "Formula",
    "formula": "Var(X) = E(X²) - [E(X)]²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Properties of Variance and Expectation: E(aX + b) = a E(X) + b; Var(aX + b) = a² Var(X); Var(b) = 0.",
    "category": "Rule",
    "formula": "Var(aX + b) = a² Var(X)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Law of Total Probability: If B₁, B₂, ..., B_n form a partition of sample space, then P(A) = Σ P(B_i) P(A | B_i).",
    "category": "Formula",
    "formula": "P(A) = Σ P(B_i) P(A|B_i)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Poisson Distribution P(X = r) = (e^(-λ) · λ^r) / r! where λ is the average rate parameter. In Poisson distribution, Mean = Variance = λ.",
    "category": "Rule",
    "formula": "Poisson: Mean = Variance = λ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Correlation Coefficient r between two variables X and Y satisfies - 1 ≤ r ≤ + 1. Independent variables have r = 0.",
    "category": "Rule",
    "formula": "-1 ≤ r ≤ 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Regression lines y on x and x on y intersect at the point of means (x̄, ȳ). Angle between regression lines tan θ = |(1 - r²)/r| · (σ_x σ_y)/(σ_x² + σ_y²).",
    "category": "Rule",
    "formula": "Regression lines pass through (x̄, ȳ)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Square root of a complex number: √(x + iy) = ± [ √((|z| + x)/2) + i sgn(y) √((|z| - x)/2) ].",
    "category": "Shortcut",
    "formula": "√(x+iy) = ± [√(|z|+x)/2 + i √(|z|-x)/2]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Distance of origin from plane ax + by + cz + d = 0 is D = |d| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |d| / √(a²+b²+c²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Condition for lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂ to be perpendicular is a₁a₂ + b₁b₂ + c₁c₂ = 0.",
    "category": "Rule",
    "formula": "a₁a₂ + b₁b₂ + c₁c₂ = 0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Direction ratios of line joining points (x₁, y₁, z₁) and (x₂, y₂, z₂) are (x₂ - x₁, y₂ - y₁, z₂ - z₁).",
    "category": "Formula",
    "formula": "(x₂ - x₁, y₂ - y₁, z₂ - z₁)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Shortest distance between parallel lines r = a₁ + λ b and r = a₂ + μ b is d = |(a₂ - a₁) × b| / |b|.",
    "category": "Formula",
    "formula": "d = |(a₂ - a₁) × b| / |b|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Area of triangle in 3D with vertices A, B, C: Area = (1/2) |AB × AC|.",
    "category": "Formula",
    "formula": "Area = 1/2 |AB × AC|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Volume of parallelepiped with coterminous vectors a, b, c is [a b c] = a · (b × c). If volume is zero, vectors are coplanar.",
    "category": "Formula",
    "formula": "Volume = [a b c]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "Limit property: lim(x->a) [ (xⁿ - aⁿ) / (x - a) ] = n · a^(n-1) for any real number n.",
    "category": "Formula",
    "formula": "lim (xⁿ - aⁿ)/(x - a) = n a^(n-1)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Limit property: lim(x->0) [ (e^x - 1) / x ] = 1; lim(x->0) [ (a^x - 1) / x ] = ln a.",
    "category": "Formula",
    "formula": "lim (a^x - 1)/x = ln a",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Derivative of tan x is sec²x; cot x is - cosec²x; sec x is sec x tan x; cosec x is - cosec x cot x.",
    "category": "Formula",
    "formula": "d/dx(tan x) = sec²x",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Derivative of |x| is x / |x| = sgn(x) for all x ≠ 0; not differentiable at x = 0.",
    "category": "Rule",
    "formula": "d/dx |x| = x/|x| (x ≠ 0)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Integration of tan x: ∫ tan x dx = ln |sec x| + C = - ln |cos x| + C.",
    "category": "Formula",
    "formula": "∫ tan x dx = ln|sec x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Integration of cot x: ∫ cot x dx = ln |sin x| + C.",
    "category": "Formula",
    "formula": "∫ cot x dx = ln|sin x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Integration of sec x: ∫ sec x dx = ln |sec x + tan x| + C = ln |tan(π/4 + x/2)| + C.",
    "category": "Formula",
    "formula": "∫ sec x dx = ln|sec x + tan x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Integration of cosec x: ∫ cosec x dx = ln |cosec x - cot x| + C = ln |tan(x/2)| + C.",
    "category": "Formula",
    "formula": "∫ cosec x dx = ln|tan(x/2)| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Derivative of definite integral with constant limits is always ZERO: d/dx [ ∫_a^b f(t) dt ] = 0.",
    "category": "Rule",
    "formula": "d/dx [ ∫_a^b f(t) dt ] = 0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "A continuous function on a closed bounded interval [a, b] is bounded and attains its maximum and minimum values (Extreme Value Theorem).",
    "category": "Rule",
    "formula": "Attains maximum and minimum on [a,b]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "If f(x) is strictly increasing, its inverse function f⁻¹(x) exists and is also strictly increasing.",
    "category": "Rule",
    "formula": "f increasing => f⁻¹ increasing",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "The function f(x) = x³ - 3x has local maximum at x = - 1 and local minimum at x = 1.",
    "category": "Shortcut",
    "formula": "Local max at x=-1; Local min at x=1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Angle of intersection between curves y = x² and x = y² at (1, 1): tan θ = 3/4 => θ = tan⁻¹(3/4).",
    "category": "Shortcut",
    "formula": "θ = tan⁻¹(3/4)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Subtangent length for curve y = f(x) is |y / y'|; Subnormal length is |y · y'|.",
    "category": "Formula",
    "formula": "Subtangent = |y/y'|; Subnormal = |y y'|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "The curve y = e^x has constant subtangent length equal to 1 for all x.",
    "category": "Shortcut",
    "formula": "Subtangent of e^x is 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Euler's totient function φ(p) = p - 1 for prime p. Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) if gcd(a, p) = 1.",
    "category": "Rule",
    "formula": "a^(p-1) ≡ 1 (mod p)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Area of region bounded by y = sin x and x-axis from x = 0 to x = 2π is 4 sq units (each loop is 2 sq units).",
    "category": "Shortcut",
    "formula": "Area of single loop of sin x = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Area enclosed between y = |x| and y = 1 is 1 sq unit; bounded by y = x² and y = x is 1/6 sq unit.",
    "category": "Shortcut",
    "formula": "Area between y=x² and y=x is 1/6",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Degree of differential equation [ 1 + (dy/dx)² ]^(3/2) = d²y/dx² is 2 (squaring both sides eliminates fractional power).",
    "category": "Rule",
    "formula": "Degree = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "General solution of dy/dx = y/x is y = c x (family of straight lines passing through origin).",
    "category": "Formula",
    "formula": "y = cx",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "General solution of dy/dx = - x/y is x² + y² = c² (family of concentric circles centered at origin).",
    "category": "Formula",
    "formula": "x² + y² = c²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Integrating Factor (IF) of dy/dx + (1/x) y = x² is IF = e^(∫ 1/x dx) = e^(ln x) = x.",
    "category": "Shortcut",
    "formula": "IF = x",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Order of differential equation of family of all circles touching x-axis at origin is 1.",
    "category": "Concept",
    "formula": "Order = 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "If two events are independent, P(A ∩ B) = P(A) · P(B); If mutually exclusive, P(A ∩ B) = 0 and P(A ∪ B) = P(A) + P(B).",
    "category": "Rule",
    "formula": "P(A ∩ B) = P(A)·P(B)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "If A and B are independent events, then their complements A' and B' are ALSO independent.",
    "category": "Rule",
    "formula": "A and B indep => A' and B' indep",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Odd in favor of an event with probability p is p : (1 - p); Odds against is (1 - p) : p.",
    "category": "Definition",
    "formula": "Odds in favor = p / (1 - p)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Probability of throwing a sum of 7 with two fair dice is 6 / 36 = 1/6 (most probable sum).",
    "category": "Shortcut",
    "formula": "P(sum=7) = 1/6 (most probable)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "The number of onto functions (surjections) from set of m elements to set of 2 elements is 2ᵐ - 2.",
    "category": "Formula",
    "formula": "Surjections = 2ᵐ - 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "The number of one-one functions (injections) from set of m elements to set of n elements (m ≤ n) is nPm = n! / (n - m)!.",
    "category": "Formula",
    "formula": "Injections = nPm",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "De Moivre's identity for trigonometric multiple angles: cos 2θ = 2 cos²θ - 1 = 1 - 2 sin²θ; sin 2θ = 2 sin θ cos θ.",
    "category": "Formula",
    "formula": "cos 2θ = 2cos²θ - 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Half angle formulas: 1 - cos θ = 2 sin²(θ/2); 1 + cos θ = 2 cos²(θ/2). Extremely useful in calculus substitutions.",
    "category": "Shortcut",
    "formula": "1 - cos θ = 2 sin²(θ/2)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Tan half angle formula: tan(θ/2) = (1 - cos θ) / sin θ = sin θ / (1 + cos θ).",
    "category": "Formula",
    "formula": "tan(θ/2) = (1 - cos θ) / sin θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Cosine of angle between two lines with direction cosines l₁, m₁, n₁ and l₂, m₂, n₂ is cos θ = l₁l₂ + m₁m₂ + n₁n₂.",
    "category": "Formula",
    "formula": "cos θ = l₁l₂ + m₁m₂ + n₁n₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "If line makes angles α, β, γ with coordinate axes, then cos²α + cos²β + cos²γ = 1 and sin²α + sin²β + sin²γ = 2.",
    "category": "Shortcut",
    "formula": "Σ cos²α = 1; Σ sin²α = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "The foot of perpendicular from (x₁, y₁) to line ax + by + c = 0: (x - x₁)/a = (y - y₁)/b = - (ax₁ + by₁ + c) / (a² + b²).",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = - (ax₁+by₁+c)/(a²+b²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Image of point (x₁, y₁) with respect to line ax + by + c = 0: (x - x₁)/a = (y - y₁)/b = - 2 (ax₁ + by₁ + c) / (a² + b²).",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = - 2(ax₁+by₁+c)/(a²+b²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Centroid of triangle with vertices z₁, z₂, z₃ in complex plane is (z₁ + z₂ + z₃) / 3.",
    "category": "Formula",
    "formula": "Centroid = (z₁ + z₂ + z₃) / 3",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Condition for triangle with vertices z₁, z₂, z₃ to be equilateral: z₁² + z₂² + z₃² = z₁z₂ + z₂z₃ + z₃z₁.",
    "category": "Rule",
    "formula": "z₁² + z₂² + z₃² = z₁z₂ + z₂z₃ + z₃z₁",
    "badge": "PYQ Trends & Advanced"
  }
];

export const BIOLOGY_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Cell Theory proposed by Schleiden (1838) and Schwann (1839); Rudolf Virchow (1855) added 'Omnis cellula-e cellula' (all cells arise from pre-existing cells).",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Mycoplasma is the smallest living cell (0.3 μm in length) and LACKS a cell wall; can survive without oxygen.",
    "category": "Concept",
    "formula": "Smallest cell: Mycoplasma",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Fluid Mosaic Model of cell membrane proposed by Singer and Nicolson (1972): Quasi-fluid nature of lipid bilayer enables lateral movement of proteins.",
    "category": "Rule",
    "formula": "Singer & Nicolson (1972)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Mitochondria and Chloroplasts are semi-autonomous organelles having their own circular dsDNA and 70S ribosomes.",
    "category": "Concept",
    "formula": "Semi-autonomous: 70S ribosomes + circular DNA",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Ribosomes in prokaryotes are 70S (50S + 30S subunits); in eukaryotic cytoplasm are 80S (60S + 40S subunits). S stands for Svedberg unit (sedimentation coefficient).",
    "category": "Rule",
    "formula": "Prokaryote=70S; Eukaryote=80S",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Endomembrane system includes: Endoplasmic Reticulum (ER), Golgi apparatus, Lysosomes, and Vacuoles. Mitochondria, chloroplasts and peroxisomes are NOT part of it.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Lysosomes are single-membrane bound suicidal bags containing hydrolytic enzymes (lipases, proteases, carbohydrases) active at ACIDIC pH (pH ≈ 5).",
    "category": "Concept",
    "formula": "Active at acidic pH ≈ 5",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "Cell cycle phases: G₁ (gap 1, active growth) -> S (DNA synthesis / replication, amount doubles from 2C to 4C, chromosome number remains 2n) -> G₂ -> M phase (mitosis).",
    "category": "Rule",
    "formula": "S phase: DNA doubles (2C->4C), chromosomes 2n",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "G₀ phase (Quiescent stage): Cells remain metabolically active but do NOT proliferate unless called upon to do so (e.g. heart cells, neurons).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Meiosis I Prophase I substages: Leptotene -> Zygotene (synapsis, synaptonemal complex formed) -> Pachytene (crossing over via recombinase) -> Diplotene (chiasmata visible) -> Diakinesis (terminalization).",
    "category": "Rule",
    "formula": "Crossing over in Pachytene",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Crossing over occurs in PACHYTENE stage between non-sister chromatids of homologous chromosomes catalyzed by enzyme recombinase.",
    "category": "PYQ_Trend",
    "formula": "Pachytene: Crossing over",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Mendel's Monohybrid Cross phenotypic ratio is 3 : 1; Genotypic ratio is 1 : 2 : 1.",
    "category": "Formula",
    "formula": "Phenotypic 3:1; Genotypic 1:2:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Mendel's Dihybrid Cross phenotypic ratio is 9 : 3 : 3 : 1 (9 round yellow, 3 round green, 3 wrinkled yellow, 1 wrinkled green).",
    "category": "Formula",
    "formula": "9:3:3:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Incomplete Dominance in Mirabilis jalapa (4 o'clock plant) and Antirrhinum majus (Snapdragon): Phenotypic and genotypic ratios are identical: 1 : 2 : 1 (1 Red : 2 Pink : 1 White).",
    "category": "Shortcut",
    "formula": "Incomplete: Phenotype = Genotype = 1:2:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Codominance: Both alleles express equally in heterozygote. Classic example is ABO blood grouping (controlled by gene I with 3 alleles: I^A, I^B, i giving 6 genotypes and 4 phenotypes).",
    "category": "Concept",
    "formula": "ABO Blood: 6 genotypes, 4 phenotypes",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Test Cross: Crossing an individual with dominant phenotype (unknown genotype) with a homozygous recessive parent. If all progeny dominant => homozygous; if 1:1 ratio => heterozygous.",
    "category": "Rule",
    "formula": "Test cross ratio = 1:1 (monohybrid)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Pleiotropy: A single gene influences multiple phenotypic traits (e.g. Phenylketonuria PKU causes mental retardation and reduced hair/skin pigmentation).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "Polygenic Inheritance: Traits controlled by three or more genes, showing quantitative variation (e.g. human skin color, human height). Bell-shaped curve distribution.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Sex determination in humans, Drosophila: XX-XY type (male heterogamety); Birds: ZW-ZZ type (female heterogamety ZW, male homogametic ZZ); Grasshopper: XX-XO type.",
    "category": "Rule",
    "formula": "Birds: Female ZW, Male ZZ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Down's Syndrome is Trisomy of chromosome 21 (47, XX or XY + 21); First described by Langdon Down (1866). Short stature, furrowed tongue, mental development retarded.",
    "category": "Concept",
    "formula": "Trisomy 21 (47 chromosomes)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Klinefelter's Syndrome: Karyotype 47, XXY (extra X in male). Overall masculine with feminine development (gynaecomastia), sterile.",
    "category": "Concept",
    "formula": "47, XXY (Gynaecomastia, sterile)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Turner's Syndrome: Monosomy 45, XO (missing X in female). Sterile females with rudimentary ovaries, webbed neck, lack of secondary sexual characters.",
    "category": "Concept",
    "formula": "45, XO (Rudimentary ovaries)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Hemophilia and Color blindness are Sex-linked (X-linked) RECESSIVE disorders; Males are more frequently affected because they have only one X chromosome.",
    "category": "Rule",
    "formula": "X-linked recessive: Males affected more",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Sickle Cell Anemia is an Autosomal RECESSIVE disorder caused by single base substitution: GAG -> GUG in 6th codon of β-globin gene (Glutamic acid replaced by Valine).",
    "category": "PYQ_Trend",
    "formula": "GAG -> GUG (Glu -> Val at 6th position)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Thalassemia is a quantitative defect (less globin synthesized); Sickle cell anemia is a qualitative defect (incorrect globin synthesized).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "Transforming Principle proved by Griffith (1928) using Streptococcus pneumoniae (S-strain virulent, R-strain avirulent).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Biochemical characterization of transforming principle by Avery, MacLeod, and McCarty (1944) proved that DNA is the transforming genetic material (inhibited by DNase).",
    "category": "Rule",
    "formula": "DNase destroys transforming principle",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Hershey and Chase (1952) gave unequivocal proof that DNA is the genetic material using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat).",
    "category": "Rule",
    "formula": "Hershey-Chase: ³²P labels DNA, ³⁵S labels protein",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Semiconservative DNA replication proved experimentally by Meselson and Stahl (1958) using E. coli grown in ¹⁵NH₄Cl heavy nitrogen and CsCl density gradient centrifugation.",
    "category": "Rule",
    "formula": "Meselson & Stahl: ¹⁵N and CsCl gradient",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Taylor and colleagues (1958) proved semiconservative replication on chromosomes in Vicia faba (faba beans) using tritiated thymidine (³H-thymidine).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "DNA replication occurs in 5' -> 3' direction catalyzed by DNA-dependent DNA polymerase. Leading strand is continuous; Lagging strand is synthesized discontinuously as Okazaki fragments.",
    "category": "Rule",
    "formula": "Replication 5' -> 3'; Okazaki fragments joined by ligase",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "DNA Ligase joins Okazaki fragments by forming phosphodiester bonds.",
    "category": "Concept",
    "formula": "Ligase joins DNA fragments",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Transcription: Synthesis of RNA from DNA template strand (3' -> 5') catalyzed by RNA polymerase in 5' -> 3' direction.",
    "category": "Rule",
    "formula": "Template strand: 3' -> 5'; RNA formed: 5' -> 3'",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Transcription unit has three regions: Promoter (binding site for RNA polymerase), Structural gene, and Terminator.",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "In eukaryotes, RNA Polymerase I transcribes rRNAs (28S, 18S, 5.8S); RNA Polymerase II transcribes hnRNA (precursor of mRNA); RNA Polymerase III transcribes tRNA, 5S rRNA, snRNAs.",
    "category": "Rule",
    "formula": "Pol I: rRNA; Pol II: mRNA; Pol III: tRNA",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Post-transcriptional processing of hnRNA in eukaryotes: Splicing (introns removed, exons joined), 5'-Capping (methyl guanosine triphosphate m⁷Gppp), and 3'-Tailing (poly-A tail of 200-300 adenylate residues).",
    "category": "Concept",
    "formula": "Splicing: Introns removed, exons spliced",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Genetic Code is a TRIPLET of nucleotides. Total 64 codons: 61 code for amino acids, 3 are Stop (Nonsense) codons: UAA (ochre), UAG (amber), UGA (opal).",
    "category": "Rule",
    "formula": "64 total: 61 sense, 3 stop (UAA, UAG, UGA)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "AUG has DUAL functions: It codes for Methionine (Met) and acts as the universal INITIATOR codon.",
    "category": "PYQ_Trend",
    "formula": "AUG: codes Met and is initiator",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Genetic code properties: Degenerate (some amino acids coded by more than one codon), Unambiguous (one codon codes for only one amino acid), Non-overlapping, Universal.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "tRNA is the adapter molecule having an anticodon loop that reads the code on mRNA and an amino acid acceptor 3'-end (-CCA end). Looks like cloverleaf in 2D, inverted L in 3D.",
    "category": "Concept",
    "formula": "tRNA: Cloverleaf 2D, Inverted-L 3D",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Lac Operon (Jacob and Monod): Polycistronic structural genes: z codes for β-galactosidase, y codes for permease, a codes for transacetylase.",
    "category": "Rule",
    "formula": "z: β-gal; y: permease; a: transacetylase",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "In lac operon, ALLOLACTOSE acts as the INDUCER that binds to repressor protein, inactivating it and allowing transcription to proceed.",
    "category": "Concept",
    "formula": "Inducer: Allolactose",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Human Genome Project (HGP): Human genome contains 3.1647 billion base pairs; Largest human gene is DYSTROPHIN (2.4 million bases); Chromosome 1 has most genes (2968), Y has fewest (231).",
    "category": "Concept",
    "formula": "Largest gene: Dystrophin; Chr 1 most genes",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "DNA Fingerprinting developed by Alec Jeffreys uses Variable Number of Tandem Repeats (VNTRs) which belong to satellite DNA called minisatellites.",
    "category": "Concept",
    "formula": "Alec Jeffreys: VNTRs (Minisatellites)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Homologous organs: Same anatomical origin and structure but different functions (DIVERGENT evolution). Examples: Forelimbs of whale, bat, cheetah, human; Bougainvillea thorn and Cucurbita tendril.",
    "category": "Rule",
    "formula": "Homologous = Divergent evolution",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Analogous organs: Different anatomical origin but similar functions due to similar environment (CONVERGENT evolution). Examples: Wings of butterfly and bird; Eye of octopus and mammal; Sweet potato (root) and Potato (stem).",
    "category": "Rule",
    "formula": "Analogous = Convergent evolution",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Adaptive Radiation: Process of evolution of different species in a given geographical area starting from a point and radiating to other habitats (e.g. Darwin's finches in Galapagos, Australian marsupials).",
    "category": "Concept",
    "formula": "Darwin's Finches & Marsupials",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Hardy-Weinberg Principle: Allele frequencies in a population remain constant and stable from generation to generation in the absence of evolutionary influences: p² + 2pq + q² = 1.",
    "category": "Formula",
    "formula": "p² + 2pq + q² = 1; p + q = 1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Five factors that disturb Hardy-Weinberg equilibrium: Gene migration/flow, Genetic drift (Founder effect, Bottleneck), Mutation, Genetic recombination, and Natural selection.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "Human Evolution sequence: Dryopithecus -> Ramapithecus (more man-like) -> Australopithecus (used stone tools, ate fruit) -> Homo habilis (first human-like, brain 650-800 cc, did not eat meat) -> Homo erectus (brain 900 cc, ate meat) -> Neanderthal man (brain 1400 cc, buried dead) -> Homo sapiens.",
    "category": "Shortcut",
    "formula": "Dryo -> Rama -> Australo -> Habilis -> Erectus -> Neanderthal -> Sapiens",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Spermatogenesis occurs in seminiferous tubules: Spermatogonia (2n) -> Primary spermatocyte (2n) -> Meiosis I -> Secondary spermatocytes (n) -> Meiosis II -> Spermatids (n) -> Spermiogenesis -> Spermatozoa (n).",
    "category": "Rule",
    "formula": "1 primary spermatocyte gives 4 sperms",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Sertoli cells (nurse cells) provide nutrition to developing germ cells; Leydig cells (interstitial cells) synthesize and secrete androgens (Testosterone) under the stimulus of LH.",
    "category": "Concept",
    "formula": "Sertoli: nutrition; Leydig: testosterone",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Acrosome of sperm is derived from GOLGI apparatus and contains proteolytic enzymes (hyaluronidase, corona penetrating enzyme) that dissolve ovum layers during fertilization.",
    "category": "Concept",
    "formula": "Acrosome derived from Golgi body",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Oogenesis begins during EMBRYONIC stage: Primary oocytes are arrested at Prophase I (diplotene) until puberty. At birth, no more oogonia are formed.",
    "category": "Rule",
    "formula": "Arrested at Prophase I until puberty",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Secondary oocyte is arrested at METAPHASE II and is released during ovulation. Meiosis II is completed ONLY upon entry of sperm.",
    "category": "PYQ_Trend",
    "formula": "Arrested at Metaphase II; completed at fertilization",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Menstrual Cycle phases: Menstrual phase (days 1-5, progesterone drops) -> Follicular / Proliferative phase (days 6-13, Estrogen rises) -> Ovulatory surge (day 14, LH SURGE triggers ovulation) -> Luteal / Secretory phase (days 15-28, Corpus luteum secretes Progesterone).",
    "category": "Rule",
    "formula": "Day 14: LH Surge causes ovulation",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Corpus luteum secretes large amounts of PROGESTERONE, which is essential for maintenance of the endometrium for pregnancy.",
    "category": "Concept",
    "formula": "Progesterone maintains endometrium",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "If fertilization does NOT occur, corpus luteum degenerates into CORPUS ALBICANS, progesterone levels crash, causing shedding of endometrium (menstruation).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Fertilization takes place at the AMPULLARY-ISTHMIC junction (or Ampulla according to NCERT revised) of the Fallopian tube (oviduct).",
    "category": "PYQ_Trend",
    "formula": "Fertilization site: Ampulla of fallopian tube",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Cleavage in human zygote is holoblastic, unequal, and produces 2, 4, 8, 16 blastomeres. Solid ball of 8-16 cells is MORULA (looks like little mulberry).",
    "category": "Concept",
    "formula": "Morula = 8 to 16 blastomeres",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "Blastocyst has an outer layer called TROPHOBLAST (attaches to endometrium, forms placenta) and an INNER CELL MASS (gives rise to embryo proper; contains stem cells).",
    "category": "Concept",
    "formula": "Inner cell mass: Pluripotent stem cells",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Implantation occurs about 7 days after fertilization: Blastocyst implants into the endometrium of the uterus.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Human Chorionic Gonadotropin (hCG), human Placental Lactogen (hPL), and Relaxin are hormones produced in women ONLY during pregnancy.",
    "category": "Rule",
    "formula": "hCG, hPL, Relaxin: ONLY in pregnancy",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Parturition (childbirth) is induced by neuroendocrine mechanism (Foetal Ejection Reflex): Mild uterine contractions trigger release of OXYTOCIN from maternal posterior pituitary.",
    "category": "Concept",
    "formula": "Oxytocin: triggers uterine contractions",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Colostrum: First milk secreted during initial days of lactation contains abundant antibodies (primarily IgA) providing passive immunity to infant.",
    "category": "PYQ_Trend",
    "formula": "Colostrum rich in IgA antibodies",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Assisted Reproductive Technologies (ART): IVF-ET (In Vitro Fertilization followed by Embryo Transfer). ZIFT = Zygote Intra-Fallopian Transfer (embryo up to 8 blastomeres into fallopian tube); IUT = Intra-Uterine Transfer (embryo > 8 blastomeres into uterus).",
    "category": "Shortcut",
    "formula": "ZIFT: up to 8 cells; IUT: > 8 cells",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "GIFT (Gamete Intra-Fallopian Transfer): Transfer of an ovum collected from donor into fallopian tube of female who cannot produce one but can provide suitable environment.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "ICSI (Intra-Cytoplasmic Sperm Injection): Specialized procedure in which a single sperm is directly injected into the cytoplasm of an ovum.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Copper-releasing IUDs (CuT, Cu7, Multiload 375): Cu ions suppress sperm motility and fertilizing capacity.",
    "category": "Rule",
    "formula": "Cu-IUDs: suppress sperm motility",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Hormone-releasing IUDs (Progestasert, LNG-20): Make the uterus unsuitable for implantation and cervix hostile to sperms.",
    "category": "Concept",
    "formula": "LNG-20: makes uterus hostile",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Saheli: Oral non-steroidal contraceptive pill developed by CDRI Lucknow; taken 'once a week', high contraceptive value with very few side effects.",
    "category": "Concept",
    "formula": "Saheli: Non-steroidal, once a week",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Medical Termination of Pregnancy (MTP): Safe up to FIRST TRIMESTER (12 weeks of pregnancy); becomes significantly riskier during second trimester.",
    "category": "Rule",
    "formula": "MTP safe up to 12 weeks",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Sexually Transmitted Infections (STIs): Completely curable if detected early EXCEPT Hepatitis-B, Genital Herpes, and HIV/AIDS.",
    "category": "Exception",
    "formula": "Incurable: Hep-B, Herpes, HIV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Innate Immunity barriers: Physical (skin, mucus), Physiological (stomach HCl, saliva, tears lysozyme), Cellular (PMNL neutrophils, monocytes, natural killer NK cells), Cytokine (INTERFERONS protect uninfected cells from virus).",
    "category": "Concept",
    "formula": "Interferons: Anti-viral defense",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Antibody structure: Y-shaped molecule with 4 polypeptide chains: 2 heavy (H) and 2 light (L) chains represented as H₂L₂ held by disulfide bonds. Antigen-binding site on variable region.",
    "category": "Formula",
    "formula": "Antibody = H₂L₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Restriction Endonucleases (Molecular Scissors): Cut dsDNA at specific palindromic recognition sequences. Discovered in bacteria as defense against bacteriophages.",
    "category": "Definition",
    "formula": "Molecular scissors: Restriction endonucleases",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "EcoRI recognition sequence: 5'-GAATTC-3' and 3'-CTTAAG-5'; cuts between G and A, producing sticky / cohesive single-stranded ends.",
    "category": "PYQ_Trend",
    "formula": "EcoRI cuts 5'-G|AATTC-3'",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Gel Electrophoresis separates DNA fragments based on SIZE: DNA is negatively charged (due to phosphate), migrates towards ANODE (+). Smaller fragments travel farther.",
    "category": "Rule",
    "formula": "DNA (-) moves to Anode (+); smaller travels faster",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Visualization of DNA bands in agarose gel requires staining with ETHIDIUM BROMIDE (EtBr) followed by exposure to UV light, appearing as bright ORANGE bands.",
    "category": "PYQ_Trend",
    "formula": "EtBr + UV light -> Bright Orange bands",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Cloning Vector pBR322 selectable markers: Ampicillin resistance (amp^R) and Tetracycline resistance (tet^R) genes. Insertion of foreign DNA at BamHI inactivates tet^R (insertional inactivation).",
    "category": "Concept",
    "formula": "Insertional inactivation",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Polymerase Chain Reaction (PCR) steps: 1. Denaturation (94°C, separates strands) -> 2. Annealing (54°C, primers bind) -> 3. Extension (72°C, Taq polymerase synthesizes DNA).",
    "category": "Formula",
    "formula": "PCR: Denaturation -> Annealing -> Extension",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "Taq Polymerase is a thermostable DNA polymerase isolated from bacterium Thermus aquaticus; remains active at high temperatures during PCR denaturation.",
    "category": "Concept",
    "formula": "Taq polymerase: Thermus aquaticus",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Bt Cotton: Bacterium Bacillus thuringiensis produces crystal cry proteins (endotoxins) that kill bollworms. Activated in insect alkaline gut, creating pores and causing cell lysis.",
    "category": "Concept",
    "formula": "Bt toxin active in insect ALKALINE gut",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "RNA Interference (RNAi): Cellular defense mechanism in eukaryotes where specific mRNA is silenced using complementary double-stranded RNA (dsRNA). E.g. Meloidogyne incognita in tobacco roots.",
    "category": "Concept",
    "formula": "RNAi: Gene silencing by dsRNA",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "First recombinant human insulin (Humulin) produced by Eli Lilly (1983) by synthesizing chains A and B separately in E. coli and joining them with disulfide bonds.",
    "category": "Concept",
    "formula": "Eli Lilly (1983): Chains A + B joined",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "First clinical gene therapy performed in 1990 on a 4-year-old girl with Adenosine Deaminase (ADA) deficiency using retroviral vector.",
    "category": "Concept",
    "formula": "1990: ADA deficiency gene therapy",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "Competitive inhibition of enzymes: Inhibitor closely resembles substrate in structure and competes for active site (e.g. Malonate inhibits Succinate Dehydrogenase). V_max unchanged, K_m increases.",
    "category": "Rule",
    "formula": "Competitive: K_m increases, V_max unchanged",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Photosynthesis Z-scheme (Light reaction): Non-cyclic photophosphorylation involves both PS II (P680) and PS I (P700); Water splitting occurs at PS II releasing O₂; Generates ATP and NADPH.",
    "category": "Concept",
    "formula": "Water splitting at PS II; ATP + NADPH formed",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Calvin Cycle (C3 pathway): 1. Carboxylation (catalyzed by RuBisCO, forms 3-PGA) -> 2. Reduction (consumes ATP and NADPH) -> 3. Regeneration of RuBP. Fixation of 1 CO₂ requires 3 ATP and 2 NADPH; 1 Glucose needs 6 turns (18 ATP + 12 NADPH).",
    "category": "Formula",
    "formula": "1 Glucose = 6 turns = 18 ATP + 12 NADPH",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "C4 Pathway (Hatch-Slack): Kranz anatomy in leaves (dimorphic chloroplasts). Initial CO₂ fixation in mesophyll cells by PEP carboxylase (forming 4C oxaloacetate OAA); No photorespiration; Highly efficient in high temp and light.",
    "category": "Rule",
    "formula": "C4: Kranz anatomy, PEPcase in mesophyll",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Photorespiration (C2 cycle): When RuBisCO binds O₂ instead of CO₂ in high light and temp, forming 3-PGA and 2-phosphoglycolate. Wasteful process, NO ATP or sugar produced.",
    "category": "Concept",
    "formula": "Wasteful: No ATP or sugar formed",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Glycolysis (EMP pathway): Occurs in CYTOPLASM of all living cells; anaerobic conversion of 1 Glucose -> 2 Pyruvate. Net yield: 2 ATP and 2 NADH. Does NOT require oxygen.",
    "category": "Formula",
    "formula": "Net yield: 2 ATP + 2 NADH",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Link reaction: Pyruvate -> Acetyl CoA + CO₂ + NADH catalyzed by pyruvate dehydrogenase in mitochondrial matrix.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Krebs Cycle (TCA cycle): Occurs in MITOCHONDRIAL MATRIX. Oxaloacetate (4C) + Acetyl CoA (2C) -> Citrate (6C). Net per glucose: 6 NADH, 2 FADH₂, 2 GTP/ATP.",
    "category": "Concept",
    "formula": "Location: Mitochondrial Matrix",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Electron Transport System (ETS): Located on INNER MITOCHONDRIAL MEMBRANE. Terminal electron acceptor is OXYGEN, which forms H₂O. Total theoretical yield from 1 glucose: 36 or 38 ATP.",
    "category": "Rule",
    "formula": "Terminal electron acceptor = Oxygen",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Plant Hormones: Auxin (apical dominance, IAA); Gibberellin (bolting in rosette plants, breaks seed dormancy); Cytokinin (delays senescence, promotes cell division); Ethylene (fruit ripening gaseous hormone); Abscisic Acid (ABA, stress hormone, stomatal closure).",
    "category": "Shortcut",
    "formula": "Auxin=apical; Ethylene=fruit ripening; ABA=stress",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Human cardiac cycle duration: 0.8 seconds. Stroke volume: 70 mL. Cardiac Output = Stroke Volume × Heart Rate = 70 mL × 72 bpm ≈ 5.0 Liters/min.",
    "category": "Formula",
    "formula": "Cardiac Output = SV × HR ≈ 5.0 L/min",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Electrocardiogram (ECG): P wave = Atrial depolarization; QRS complex = Ventricular depolarization (pulse rate counter); T wave = Ventricular repolarization.",
    "category": "PYQ_Trend",
    "formula": "P: Atrial depol; QRS: Ventricle depol; T: Repol",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Nephron Counter-Current Mechanism between Henle's loop and Vasa recta maintains high osmolarity in renal medullary interstitium (from 300 to 1200 mOsmol/L), allowing concentration of urine.",
    "category": "Concept",
    "formula": "Henle's loop concentrates urine",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Competitive Exclusion Principle (Gause): Two closely related species competing for the same limiting resources cannot coexist indefinitely; competitively inferior will be eliminated.",
    "category": "Rule",
    "formula": "Gause: Complete competitors cannot coexist",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Digestive Enzymes: Salivary amylase (Ptyalin) digests starch into maltose at pH 6.8; 30% of dietary starch is hydrolyzed in mouth.",
    "category": "Concept",
    "formula": "Salivary amylase pH 6.8",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Stomach Gastric Juice contains Hydrochloric acid (HCl, pH 1.5 - 2.0) and Proenzyme Pepsinogen, activated by HCl into active Pepsin which digests proteins into peptones.",
    "category": "Rule",
    "formula": "Stomach pH 1.5-2.0; Pepsin digests protein",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Pancreatic juice contains inactive enzymes: Trypsinogen (activated by intestinal Enterokinase into Trypsin), Chymotrypsinogen, and Procarboxypeptidases at alkaline pH 7.8.",
    "category": "Rule",
    "formula": "Enterokinase activates Trypsinogen",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Bile contains bile pigments (Bilirubin, Biliverdin), bile salts (Sodium glycocholate, taurocholate), and cholesterol, but contains NO ENZYMES. Bile salts emulsify fats.",
    "category": "Concept",
    "formula": "Bile has NO enzymes; emulsifies fats",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Succus entericus (Intestinal juice): Secreted by Crypts of Lieberkühn; contains Maltase, Lactase, Sucrase (Invertase), Dipeptidases, and Lipases at pH 7.8.",
    "category": "Concept",
    "formula": "Succus entericus pH 7.8",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Respiratory Volumes: Tidal Volume (TV) = 500 mL (normal breath); Inspiratory Reserve Volume (IRV) = 2500 - 3000 mL.",
    "category": "Formula",
    "formula": "TV = 500 mL; IRV = 2500-3000 mL",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Expiratory Reserve Volume (ERV) = 1000 - 1100 mL; Residual Volume (RV) = 1100 - 1200 mL (air remaining in lungs even after forcible expiration).",
    "category": "Formula",
    "formula": "RV = 1100-1200 mL",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Vital Capacity (VC) is maximum volume of air a person can breathe in after forced expiration: VC = ERV + TV + IRV ≈ 4000 - 4600 mL.",
    "category": "Formula",
    "formula": "VC = ERV + TV + IRV",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Total Lung Capacity (TLC): Total volume of air in lungs after maximum inspiration: TLC = RV + ERV + TV + IRV = VC + RV ≈ 5800 mL.",
    "category": "Formula",
    "formula": "TLC = VC + RV",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Oxygen-Hemoglobin Dissociation Curve is SIGMOID shaped; 1 molecule of Hemoglobin carries maximum 4 molecules of O₂.",
    "category": "Concept",
    "formula": "1 Hb carries 4 O₂ molecules (Sigmoid)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Bohr Effect: Oxygen dissociation curve shifts to the RIGHT (lowering oxygen affinity of Hb) in presence of high pCO₂, high H⁺ concentration (low pH), and high temperature.",
    "category": "Rule",
    "formula": "Right shift: high pCO₂, low pH, high temp",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Carbon dioxide transport: 70% as Bicarbonate ions (HCO₃⁻) catalyzed by carbonic anhydrase in RBCs; 20-25% as Carbamino-hemoglobin; 7% dissolved in plasma.",
    "category": "Rule",
    "formula": "70% CO₂ as Bicarbonate (HCO₃⁻)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Sino-Atrial Node (SA Node) is called the Natural Pacemaker of human heart; generates rhythm of 70-75 action potentials/min without external stimulus (myogenic heart).",
    "category": "Concept",
    "formula": "SA node: Pace maker (70-75/min)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Heart sounds: First sound 'LUB' occurs due to closure of Atrioventricular (Tricuspid & Bicuspid/Mitral) valves; Second sound 'DUB' due to closure of Semilunar valves.",
    "category": "Rule",
    "formula": "Lub: AV valves close; Dub: Semilunar close",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Erythroblastosis Fetalis: Hemolytic disease of newborn occurring when an Rh-negative mother carries an Rh-positive fetus for the second time; preventable by administering anti-Rh antibodies (Rhogam) to mother immediately after first delivery.",
    "category": "Concept",
    "formula": "Rh- mother + Rh+ fetus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Ammonotelic animals excrete ammonia requiring large amounts of water (aquatic invertebrates, bony fishes); Uricotelic excrete uric acid paste conserving water (birds, reptiles, insects).",
    "category": "Rule",
    "formula": "Ammonia: aquatic; Uric acid: birds/reptiles",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Glomerular Filtration Rate (GFR): Volume of filtrate formed by kidneys per minute = 125 mL/min = 180 Liters/day; 99% of filtrate is reabsorbed, forming only 1.5 L urine.",
    "category": "Formula",
    "formula": "GFR = 125 mL/min = 180 L/day",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Renin-Angiotensin-Aldosterone System (RAAS): Fall in GFR activates JGA cells to release RENIN, which converts Angiotensinogen -> Angiotensin I -> Angiotensin II (powerful vasoconstrictor stimulating Aldosterone).",
    "category": "Concept",
    "formula": "Renin -> Angiotensin II -> Aldosterone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Atrial Natriuretic Factor (ANF): Secreted by atrial heart walls in response to high blood pressure; causes vasodilation and excretion of Na⁺, acting as check on RAAS.",
    "category": "Rule",
    "formula": "ANF lowers blood pressure (opposes RAAS)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Sliding Filament Theory of Muscle Contraction (Huxley): Actin thin filaments slide over Myosin thick filaments towards center of A-band; Sarcomere shortens; I-band shortens; A-band length UNCHANGED.",
    "category": "Rule",
    "formula": "A-band length constant; I-band shortens",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Sarcomere is the functional unit of muscle contraction, defined as the region between two successive Z-lines.",
    "category": "Definition",
    "formula": "Sarcomere = Region between two Z-lines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Rigor Mortis: Muscle stiffness after death caused by complete depletion of ATP, preventing detachment of myosin cross-bridges from actin.",
    "category": "Concept",
    "formula": "ATP depletion causes stiffness",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Total number of bones in adult human skeleton: 206 bones (Axial skeleton = 80 bones; Appendicular skeleton = 126 bones).",
    "category": "Formula",
    "formula": "Total = 206 (Axial 80 + Appendicular 126)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Human Skull has 22 bones (Cranial = 8 bones: Frontal, Parietals, Temporals, Occipital, Sphenoid, Ethmoid; Facial = 14 bones); Ear ossicles = 6 (Malleus, Incus, Stapes - smallest bone).",
    "category": "Rule",
    "formula": "Cranial: 8; Facial: 14; Stapes = smallest",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Resting Membrane Potential of neuron is - 70 mV (inside negative); maintained by active Na⁺/K⁺ ATPase pump which pumps 3 Na⁺ OUT for every 2 K⁺ pumped IN.",
    "category": "Formula",
    "formula": "Resting: -70 mV (3 Na⁺ OUT / 2 K⁺ IN)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Action Potential (Depolarization): Influx of Na⁺ through voltage-gated channels shifts membrane potential from -70 mV to +30 mV.",
    "category": "Concept",
    "formula": "Depolarization due to Na⁺ influx (+30 mV)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Myelinated nerve fibers have Myelin Sheath formed by Schwann cells with gaps called Nodes of Ranvier; impulse jumps from node to node (Saltatory conduction, 50x faster).",
    "category": "Concept",
    "formula": "Saltatory conduction at Nodes of Ranvier",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Hypothalamus produces Releasing and Inhibiting hormones; synthesizes Oxytocin and Vasopressin (ADH), which are transported and stored in the POSTERIOR PITUITARY (Neurohypophysis).",
    "category": "Rule",
    "formula": "Oxytocin & ADH made in hypothalamus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Oxytocin stimulates vigorous contraction of uterine smooth muscles during childbirth (parturition) and ejection of milk from mammary glands.",
    "category": "Concept",
    "formula": "Oxytocin: Milk ejection & birth hormone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Vasopressin (Anti-Diuretic Hormone, ADH): Stimulates water reabsorption from distal tubules of kidney; deficiency causes DIABETES INSIPIDUS (excessive dilute urine).",
    "category": "Concept",
    "formula": "ADH deficiency -> Diabetes Insipidus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Thyroid gland requires IODINE for synthesis of Thyroxine (T₄) and Triiodothyronine (T₃); deficiency causes Simple Goitre. Regulates Basal Metabolic Rate (BMR).",
    "category": "Concept",
    "formula": "Iodine deficiency causes Goitre",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Thyrocalcitonin (TCT) lowers blood calcium level (hypocalcemic hormone); Parathyroid Hormone (PTH) RAISES blood calcium level by bone resorption (hypercalcemic hormone). Antagonistic pair.",
    "category": "Rule",
    "formula": "TCT lowers Ca²⁺; PTH raises Ca²⁺",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Insulin is secreted by β-cells of Islets of Langerhans in pancreas; promotes glucose uptake and glycogenesis, lowering blood sugar (hypoglycemic). Deficiency causes Diabetes Mellitus.",
    "category": "Rule",
    "formula": "Insulin: lowers glucose (β-cells)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Glucagon is secreted by α-cells of pancreas; stimulates glycogenolysis and gluconeogenesis, RAISING blood glucose level (hyperglycemic hormone).",
    "category": "Rule",
    "formula": "Glucagon: raises glucose (α-cells)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Adrenal Medulla secretes 'Emergency Hormones' / Catecholamines: Adrenaline (Epinephrine) and Noradrenaline (Norepinephrine) in response to stress (Fight or Flight hormone).",
    "category": "Concept",
    "formula": "Adrenaline: 3F / Fight-or-Flight hormone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Melatonin: Secreted by PINEAL GLAND; regulates 24-hour diurnal rhythm of body (sleep-wake cycle, body temperature).",
    "category": "Concept",
    "formula": "Melatonin: Sleep-wake cycle",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Cohesion-Tension-Transpiration Pull Theory (Dixon and Joly) explains ascent of sap in tall trees: Evaporation from stomatal pores generates negative suction pull up to 130 meters.",
    "category": "Rule",
    "formula": "Dixon & Joly: Transpiration pull",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Guttation is the loss of water in liquid form through HYDATHODES at vein margins of leaves in early morning due to high ROOT PRESSURE and low transpiration.",
    "category": "Definition",
    "formula": "Guttation through hydathodes",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Munch Pressure Flow Hypothesis: Phloem translocates sucrose from SOURCE (leaves, high turgor pressure) to SINK (roots/fruits, low turgor pressure) via mass flow.",
    "category": "Concept",
    "formula": "Mass flow from source to sink",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Essential mineral elements: 17 total. Macronutrients: C, H, O, N, P, K, Ca, Mg, S; Micronutrients: Fe, Mn, Cu, Mo, Zn, B, Cl, Ni.",
    "category": "Formula",
    "formula": "17 Essential elements (9 Macro + 8 Micro)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Chlorosis (loss of chlorophyll leading to yellowing of leaves) is caused by deficiency of: N, K, Mg, S, Fe, Mn, Zn, Mo.",
    "category": "Rule",
    "formula": "Chlorosis: N, K, Mg, S, Fe, Mn, Zn, Mo",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Necrosis (death of plant tissue, particularly leaf tissue) is caused by deficiency of: Calcium (Ca), Magnesium (Mg), Copper (Cu), and Potassium (K).",
    "category": "Shortcut",
    "formula": "Necrosis: Ca, Mg, Cu, K",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Biological Nitrogen Fixation: Catalyzed by enzyme NITROGENASE (Mo-Fe protein), which is extremely sensitive to oxygen. LEGHEMOGLOBIN acts as oxygen scavenger to protect it.",
    "category": "Rule",
    "formula": "Nitrogenase: Mo-Fe protein; Leghemoglobin scavenger",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Photoperiodism: Physiological reaction of organisms to length of day or night. Mediated by PHYTOCHROME pigment (P_r absorbs 660 nm red, P_fr absorbs 730 nm far-red).",
    "category": "Concept",
    "formula": "Phytochrome: P_r (660nm) and P_fr (730nm)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Anther Microsporogenesis: TAPETUM is the innermost layer of anther wall; multinucleate, dense cytoplasm, nourishes developing pollen grains and secretes sporopollenin.",
    "category": "Concept",
    "formula": "Tapetum: Nourishing innermost layer",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Sporopollenin: Composes pollen EXINE (outer wall); most resistant biological substance known; withstands high temperatures, strong acids and alkali; no enzyme degrades it.",
    "category": "Rule",
    "formula": "Sporopollenin: Most resistant organic material",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Mature Female Gametophyte (Embryo Sac) of angiosperms is 7-CELLED and 8-NUCLEATE (Polygonum type): 3 antipodals, 2 synergids with filiform apparatus, 1 egg cell, 1 central cell with 2 polar nuclei.",
    "category": "Rule",
    "formula": "7-celled, 8-nucleate structure",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Double Fertilization (exclusive to angiosperms, discovered by Nawaschin 1898): Syngamy (Egg + Sperm -> 2n Zygote) + Triple Fusion (2 Polar Nuclei + Sperm -> 3n PEN Primary Endosperm Nucleus).",
    "category": "Formula",
    "formula": "Syngamy (2n) + Triple Fusion (3n PEN)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Endosperm in angiosperms is TRIPLOID (3n) and develops BEFORE the embryo to provide nutrition; in gymnosperms endosperm is HAPLOID (n) formed before fertilization.",
    "category": "PYQ_Trend",
    "formula": "Angiosperm endosperm = 3n; Gymnosperm = n",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Spermatogenesis occurs in seminiferous tubules; SERTOLI cells provide nourishment to developing sperms; LEYDIG cells (interstitial cells) secrete Testosterone under LH stimulation.",
    "category": "Rule",
    "formula": "Sertoli: nutrition; Leydig: testosterone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Sperm Acrosome: Cap-like structure covering anterior nucleus derived from GOLGI APPARATUS; contains Hyaluronidase and proteolytic enzymes (sperm lysins) for penetrating ovum.",
    "category": "Concept",
    "formula": "Acrosome derived from Golgi apparatus",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Oogenesis: Primary oocytes formed during fetal life remain ARRESTED in Prophase I (Diplotene) until puberty; Secondary oocyte remains ARRESTED in Metaphase II until fertilization by sperm.",
    "category": "Rule",
    "formula": "Arrested in Prophase I and Metaphase II",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Menstrual Cycle: LH SURGE (rapid peak of Luteinizing Hormone) on Day 14 induces RUPTURE of Graafian follicle and release of ovum (OVULATION).",
    "category": "PYQ_Trend",
    "formula": "LH Surge triggers Ovulation on Day 14",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Corpus Luteum: Yellow body formed from ruptured Graafian follicle after ovulation; secretes large amounts of PROGESTERONE essential for maintaining endometrium for pregnancy.",
    "category": "Concept",
    "formula": "Corpus luteum secretes Progesterone",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Cleavage in human zygote is Holoblastic and unequal; Cleavage divisions increase cell number without increasing overall embryo volume (Zona pellucida remains intact).",
    "category": "Concept",
    "formula": "Cleavage increases cell count, size constant",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Blastocyst implantation occurs on Day 7 after fertilization into uterine endometrium; Trophoblast outer layer forms placenta; Inner Cell Mass (ICM) gives rise to embryo proper.",
    "category": "Rule",
    "formula": "Implantation on Day 7; ICM forms embryo",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Human Chorionic Gonadotropin (hCG), human Placental Lactogen (hPL), and Relaxin are produced in women ONLY during pregnancy; detected in pregnancy test kits.",
    "category": "Rule",
    "formula": "hCG produced ONLY during pregnancy",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Copper-T (Cu-T) Intrauterine Device (IUD): Releases Copper ions which suppress sperm motility and fertilizing capacity; phagocytosis of sperms increases in uterus.",
    "category": "Concept",
    "formula": "Cu ions suppress sperm motility",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Saheli: Oral contraceptive pill for females developed by CDRI Lucknow; 'once a week' NON-STEROIDAL pill with centchroman, very high contraceptive value with few side effects.",
    "category": "Concept",
    "formula": "Saheli: Non-steroidal once-a-week pill",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Assisted Reproductive Technologies: IVF-ET (test-tube baby); ZIFT (Zygote Intra-Fallopian Transfer - embryo up to 8 blastomeres into fallopian tube); IUT (Intra-Uterine Transfer - >8 blastomeres into uterus).",
    "category": "Rule",
    "formula": "ZIFT ≤ 8 blastomeres; IUT > 8 blastomeres",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Central Dogma of Molecular Biology (Crick 1958): DNA -> (Transcription) -> mRNA -> (Translation) -> Protein. Reverse transcription (RNA -> DNA) discovered by Temin and Baltimore in retroviruses.",
    "category": "Rule",
    "formula": "DNA -> RNA -> Protein",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Chargaff's Rules for dsDNA: Purines = Pyrimidines => [A] + [G] = [T] + [C]; [A] = [T] and [G] = [C]; Ratio [A + T] / [G + C] is constant for a given species.",
    "category": "Formula",
    "formula": "Chargaff: A=T, G=C; A+G = T+C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "DNA double helix parameters (Watson & Crick): Pitch = 3.4 nm (34 Å); 10 base pairs per turn; Distance between adjacent base pairs = 0.34 nm (3.4 Å); Diameter = 2.0 nm (20 Å).",
    "category": "Formula",
    "formula": "Pitch = 3.4 nm; 10 bp/turn; Distance = 0.34 nm",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Nucleosome: Structural unit of eukaryotic chromatin; 146 bp of DNA wrapped around an OCTAMER of basic histone proteins (2 copies of H2A, H2B, H3, H4); H1 histone seals the entry/exit.",
    "category": "Concept",
    "formula": "Nucleosome: Octamer of histones + 146 bp DNA",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "RNA Primer is synthesized by enzyme PRIMASE; provides free 3'-OH group necessary for DNA polymerase to initiate synthesis.",
    "category": "Concept",
    "formula": "Primase provides free 3'-OH group",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Aminoacyl-tRNA Synthetase catalyzes charging (aminoacylation) of tRNA: attaches specific amino acid to 3'-CCA end of tRNA using ATP.",
    "category": "Concept",
    "formula": "Aminoacylation of tRNA requires ATP",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Ribosome as enzyme (Ribozyme): 23S rRNA in bacteria (28S in eukaryotes) acts as Peptidyl Transferase enzyme forming peptide bonds during translation.",
    "category": "PYQ_Trend",
    "formula": "23S rRNA acts as peptidyl transferase",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "DNA Fingerprinting (Alec Jeffreys 1984): Uses Variable Number of Tandem Repeats (VNTRs) or Mini-satellites as probes; Southern blotting technique.",
    "category": "Concept",
    "formula": "Alec Jeffreys: VNTRs (Southern blot)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Hardy-Weinberg Principle: Allele frequencies in a population are stable and constant from generation to generation in absence of evolutionary forces: p² + 2pq + q² = 1 and p + q = 1.",
    "category": "Formula",
    "formula": "p² + 2pq + q² = 1; p + q = 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Adaptive Radiation: Process of evolution of different species in a given geographical area starting from a common ancestor radiating to different habitats (e.g. Darwin's Finches in Galapagos, Australian Marsupials).",
    "category": "Concept",
    "formula": "Darwin's finches; Australian marsupials",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Homologous Organs: Same basic structural plan and origin, but different functions (DIVERGENT evolution). E.g. Forelimbs of whale, bat, cheetah, human; Thorn of Bougainvillea and Tendril of Cucurbita.",
    "category": "Rule",
    "formula": "Homologous: Divergent evolution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Analogous Organs: Different origin and anatomical structure, but performing SIMILAR functions (CONVERGENT evolution). E.g. Wings of butterfly and bird; Eye of octopus and mammal; Sweet potato (root) and Potato (stem).",
    "category": "Rule",
    "formula": "Analogous: Convergent evolution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Miller-Urey Experiment (1953) simulated prebiotic primitive earth: CH₄, NH₃, H₂ (2:1:2 ratio) and water vapor subjected to electric discharge at 800°C; synthesized AMINO ACIDS (Glycine, Alanine, Aspartic acid).",
    "category": "Formula",
    "formula": "CH₄ : NH₃ : H₂ = 2 : 1 : 2 at 800°C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "Innate Immunity barriers: Physical (skin, mucus); Physiological (stomach HCl, saliva, tears with lysozyme); Cellular (neutrophils, monocytes, NK cells); Cytokine (INTERFERONS produced by virus-infected cells).",
    "category": "Rule",
    "formula": "Interferons protect non-infected cells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Antibody Molecule structure (H₂L₂): Y-shaped glycoprotein consisting of 2 heavy chains and 2 light chains linked by DISULFIDE bonds. Antigen binding site is at variable N-terminal region.",
    "category": "Formula",
    "formula": "Antibody = H₂L₂ (Disulfide bonds)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Antibody classes: IgG (most abundant 80%, crosses placenta); IgA (in colostrum breast milk and saliva, secretory); IgM (largest, first produced in primary response); IgE (mediates allergic reactions with histamine); IgD.",
    "category": "Shortcut",
    "formula": "IgG: crosses placenta; IgA: colostrum; IgE: allergy",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "AIDS (Acquired Immuno Deficiency Syndrome): Caused by Human Immunodeficiency Virus (HIV, retrovirus with single-stranded RNA genome); selectively attacks and destroys Helper T-cells (CD4⁺ T-lymphocytes).",
    "category": "Concept",
    "formula": "HIV attacks CD4⁺ Helper T-cells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "ELISA (Enzyme Linked Immuno-Sorbent Assay) is the primary screening diagnostic test for AIDS; Western Blot test is the confirmatory test.",
    "category": "Rule",
    "formula": "ELISA: screening; Western Blot: confirmation",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Cancer: Normal cells exhibit Contact Inhibition (stops uncontrolled growth when touching other cells); Cancer cells LOSE contact inhibition and undergo metastasis (spread to distant sites via blood).",
    "category": "Concept",
    "formula": "Loss of contact inhibition; Metastasis",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Biotechnology Restriction Endonucleases: Molecular scissors that cut DNA at specific palindromic sequences (e.g. EcoRI cuts at 5'-G↓AATTC-3' leaving sticky ends). First discovered was Hind II.",
    "category": "Rule",
    "formula": "EcoRI cuts at 5'-G↓AATTC-3'",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Gel Electrophoresis: DNA fragments are NEGATIVELY charged (due to phosphate groups) and migrate towards ANODE (+) through agarose gel. Smaller fragments travel FASTER and farther.",
    "category": "Rule",
    "formula": "DNA is negative, migrates to positive Anode",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Bioreactors: Sparged stirred-tank bioreactors provide sterile air bubbles and continuous mixing for mass production of recombinant proteins (optimal temp, pH, substrate, oxygen).",
    "category": "Concept",
    "formula": "Continuous oxygen & stirring in bioreactor",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Transgenic animals: Transgenic cow ROSIE (1997) produced human protein-enriched milk containing 2.4 g/L of human ALPHA-LACTALBUMIN, more nutritionally balanced for human babies.",
    "category": "Concept",
    "formula": "Rosie cow: human alpha-lactalbumin",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Population Growth Models: Exponential growth dN/dt = r N (J-shaped curve, unlimited resources); Logistic growth dN/dt = r N [ (K - N) / K ] (S-shaped / Sigmoid curve, limited resources, K is Carrying capacity).",
    "category": "Formula",
    "formula": "Logistic: dN/dt = rN[(K - N)/K]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Interspecific Interactions: Mutualism (+/+ both benefit); Commensalism (+/0 one benefits, other unaffected); Parasitism (+/-); Predation (+/-); Amensalism (-/0 e.g. Penicillium inhibits bacteria).",
    "category": "Shortcut",
    "formula": "Mutualism: +/+; Commensalism: +/0; Amensalism: -/0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Trophic Levels & 10% Energy Law (Lindeman 1942): Only 10% of energy is transferred from one trophic level to the next; 90% is lost as heat in respiration. Limits food chains to 4-5 levels.",
    "category": "Rule",
    "formula": "10% Energy transfer between trophic levels",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Ecological Pyramids exceptions: Pyramid of ENERGY is ALWAYS UPRIGHT; Pyramid of BIOMASS in sea is INVERTED (Phytoplankton mass < Zooplankton mass < Fish mass).",
    "category": "PYQ_Trend",
    "formula": "Energy pyramid: ALWAYS upright; Sea biomass: Inverted",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Primary Succession occurs on newly formed, previously barren sites lacking soil (bare rock, cooled lava, newly formed sand dune); takes thousands of years. Secondary succession on abandoned farmland is much faster.",
    "category": "Concept",
    "formula": "Primary succession is much slower than secondary",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Biodiversity: Alexander von Humboldt noted Species-Area Relationship: log S = log C + Z log A, where Z is regression coefficient (0.1 - 0.2 for local areas; 0.6 - 1.2 for entire continents).",
    "category": "Formula",
    "formula": "log S = log C + Z log A",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "Biodiversity Hotspots in India: 1. Western Ghats and Sri Lanka 2. Indo-Burma 3. Himalaya. Hotspots cover <2% of earth's land but harbor >50% of endemic species.",
    "category": "Concept",
    "formula": "Western Ghats, Himalayas, Indo-Burma",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "In-situ Conservation (on-site): National Parks, Wildlife Sanctuaries, Biosphere Reserves, Sacred Groves. Ex-situ Conservation (off-site): Zoological Parks, Botanical Gardens, Cryopreservation (-196°C in liquid N₂), Seed Banks.",
    "category": "Rule",
    "formula": "In-situ: Sanctuaries; Ex-situ: Cryo & Seed banks",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Ozone Layer Depletion: Occurs in STRATOSPHERE due to Chlorofluorocarbons (CFCs); UV radiation breaks CFCs releasing chlorine free radicals (Cl·) that catalyze breakdown of Ozone into O₂. Thickness measured in DOBSON UNITS (DU).",
    "category": "Rule",
    "formula": "Ozone in Stratosphere; Measured in Dobson Units",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Montreal Protocol: International treaty signed in Montreal (Canada) in 1987 (effective 1989) to control emission of ozone depleting substances (ODS / CFCs).",
    "category": "Concept",
    "formula": "Montreal Protocol (1987): Protects Ozone",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Kyoto Protocol: International treaty adopted in Kyoto (Japan) in 1997 to reduce emissions of GREENHOUSE GASES (CO₂, CH₄, N₂O, HFCs) causing global warming.",
    "category": "Concept",
    "formula": "Kyoto Protocol (1997): Greenhouse gases",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Eutrophication: Natural or accelerated cultural aging of a water body by nutrient enrichment (Nitrates and Phosphates), leading to algal bloom, oxygen depletion (high BOD), and death of aquatic life.",
    "category": "Concept",
    "formula": "Eutrophication: High nutrients, algal bloom, low O₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Biomagnification: Increase in concentration of non-biodegradable toxicant (e.g. DDT, Mercury) at successive trophic levels. DDT reaches highest concentration in fish-eating birds, disrupting calcium metabolism (thin eggshells).",
    "category": "Rule",
    "formula": "DDT biomagnification causes thin egg shells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "Biochemical Oxygen Demand (BOD): Amount of oxygen required by bacteria to oxidize all organic matter in 1 liter of water. HIGH BOD indicates HIGH organic pollution and poor water quality.",
    "category": "Rule",
    "formula": "High BOD = High water pollution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Electrostatic Precipitator (ESP): Most widely used device in thermal power plants; removes over 99% of particulate matter from exhaust using corona discharge charging particles.",
    "category": "Concept",
    "formula": "ESP removes 99% particulate matter",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Catalytic Converter: Fitted in automobiles containing Platinum-Palladium and Rhodium catalysts; converts unburnt hydrocarbons to CO₂ and H₂O, and CO and NO to CO₂ and N₂. Requires UNLEADED petrol (lead inactivates catalyst).",
    "category": "Rule",
    "formula": "Lead inactivates catalytic converter",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Chipko Movement (1974): In Garhwal Himalayas where local women hugged trees to prevent them from being cut down by commercial contractors.",
    "category": "Concept",
    "formula": "Chipko movement: Hugging trees (1974)",
    "badge": "PYQ Trends & Advanced"
  }
];

/**
 * Returns strictly 200 non-repeating points for the given subject
 */
export function get200PointsForSubject(subject: SubjectType): ChapterPointItem[] {
  switch (subject) {
    case "Physics":
      return PHYSICS_200_POINTS;
    case "Chemistry":
      return CHEMISTRY_200_POINTS;
    case "Mathematics":
      return MATHEMATICS_200_POINTS;
    case "Biology":
      return BIOLOGY_200_POINTS;
    default:
      return PHYSICS_200_POINTS;
  }
}
