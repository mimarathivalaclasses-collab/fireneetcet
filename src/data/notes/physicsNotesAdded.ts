import { TopicNote } from "../../types";

export const PHYSICS_NOTES_ADDED: TopicNote[] = [
  // 1. Mechanical Properties of Fluids
  {
    id: "note_phy_fluids",
    chapter: "Mechanical Properties of Fluids",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Surface Tension, Viscosity, Bernoulli's Principle & Capillarity Master Notes",
    summary: "Complete high-yield revision covering Surface Tension, Surface Energy, Angle of Contact, Excess Pressure in drops/bubbles, Capillary Rise, Viscosity, Stokes' Law, Terminal Velocity, and Bernoulli's Equation.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Surface Tension & Surface Energy",
        points: [
          "Surface Tension (T): Force per unit length acting perpendicular to an imaginary line on liquid surface: T = F / L. SI unit: N/m or J/m², Dimensions: [M¹ L⁰ T⁻²].",
          "Relation between Surface Tension and Surface Energy: Work done to increase surface area by ΔA is dW = T · ΔA.",
          "For liquid drop (1 free surface): dW = T · 4π (r₂² - r₁²).",
          "For soap bubble (2 free surfaces): dW = 2 · T · 4π (r₂² - r₁²) = 8π T (r₂² - r₁²).",
          "Excess pressure inside liquid drop: ΔP = P_in - P_out = 2T / R.",
          "Excess pressure inside soap bubble (two surfaces): ΔP = 4T / R.",
          "Work done in blowing a soap bubble from radius r to 2r: W = 8π T [(2r)² - r²] = 24π T r².",
        ],
        keyFormula: "T = F/L | dW = T · ΔA | ΔP_drop = 2T/R | ΔP_bubble = 4T/R",
        keyMnemonic: "Remember: Soap Bubble has Double surfaces, so Double excess pressure (4T/R vs 2T/R).",
        examTip: "In NEET/MHT-CET: If n small droplets of radius r coalesce into 1 big drop of radius R: R = n^(1/3) r, Surface area decreases, Energy is RELEASED, Temperature RISES: ΔW = 4π T R³ (1/r - 1/R)."
      },
      {
        title: "2. Angle of Contact & Capillarity",
        points: [
          "Angle of contact θ: Angle between tangent to liquid surface and solid surface inside the liquid.",
          "Acute angle (θ < 90°): Liquid wets solid (e.g. pure water on clean glass θ ≈ 0°, kerosene on glass). Meniscus is concave.",
          "Obtuse angle (θ > 90°): Liquid does not wet solid (e.g. mercury on glass θ ≈ 135°). Meniscus is convex.",
          "Right angle (θ = 90°): Plane meniscus (e.g. water in silver tube).",
          "Capillary rise formula (Ascent formula): h = (2 T cos θ) / (r ρ g) = (2 T) / (R ρ g), where R = r / cos θ is radius of curvature.",
          "In an elevator accelerating upwards with 'a': h = 2T cos θ / [r ρ (g + a)].",
          "In artificial satellite / weightlessness (g_eff = 0): Liquid rises to the very top of the tube, no overflow; radius of curvature adjusts: h R = constant (Jurins Law).",
        ],
        keyFormula: "h = (2T cos θ) / (r ρ g) | h · r = Constant",
        examTip: "If capillary tube of insufficient length L < h is used: Liquid will NOT overflow! It reaches the top edge and increases its radius of curvature R such that h·R = L·R'."
      },
      {
        title: "3. Viscosity, Stokes' Law & Terminal Velocity",
        points: [
          "Newton's Law of Viscosity: Viscous drag force F = - η A (dv / dx), where η is coefficient of viscosity, dv/dx is velocity gradient.",
          "SI unit of η: N·s/m² or Pa·s or Poiseuille (PI). CGS unit: Poise (1 Pa·s = 10 Poise). Dimensions: [M¹ L⁻¹ T⁻¹].",
          "Effect of temperature: Viscosity of liquids DECREASES with temperature; Viscosity of gases INCREASES with temperature (η_gas ∝ √T).",
          "Stokes' Law: Viscous force on sphere of radius r moving with speed v in fluid: F_v = 6 π η r v.",
          "Terminal Velocity (v_t): Constant maximum velocity when net force = 0 (Weight = Upthrust + Viscous Drag):",
          "v_t = [ 2 r² (ρ - σ) g ] / [ 9 η ], where ρ is density of sphere, σ is density of fluid.",
          "Key proportionality: v_t ∝ r² (Terminal velocity is directly proportional to SQUARE of radius).",
        ],
        keyFormula: "F_v = 6πηrv | v_t = [2r²(ρ - σ)g] / [9η] | v_t ∝ r²",
        keyMnemonic: "Stokes = 'Six Pi Eta R V'. Terminal speed grows with R-squared!",
        examTip: "If two raindrops of radius r coalesce at terminal velocity v, the new drop has radius R = 2^(1/3) r, so new terminal velocity v' = 2^(2/3) v ≈ 1.58 v."
      },
      {
        title: "4. Fluid Dynamics & Bernoulli's Principle",
        points: [
          "Equation of Continuity (Conservation of Mass for incompressible streamline flow): A₁ v₁ = A₂ v₂ => A · v = Constant (Volume Flow Rate dV/dt).",
          "Where area is narrow, velocity is high, and pressure is LOW.",
          "Bernoulli's Equation (Conservation of Energy for ideal fluid): P + (1/2) ρ v² + ρ g h = Constant.",
          "Pressure Head = P / (ρ g), Velocity Head = v² / (2 g), Gravitational Head = h.",
          "Torricelli's Theorem (Speed of Efflux from orifice at depth h): v = √(2 g h). Range on ground R = 2 √(h (H - h)), maximum range R_max = H when h = H/2.",
          "Venturimeter: Measures rate of flow: Q = A₁ A₂ √[ (2 g h) / (A₁² - A₂²) ].",
          "Magnus Effect (Dynamic Lift on spinning ball) and Aerofoil (Airplane wing): Velocity on top is higher -> Pressure is lower -> Net upward lift force.",
        ],
        keyFormula: "A₁v₁ = A₂v₂ | P + 1/2 ρv² + ρgh = Const | v = √(2gh) | R_max = H"
      },
    ],
    quickRevisionPoints: [
      { en: "Surface Tension T = F/L. Liquid drop excess pressure = 2T/R; Soap bubble = 4T/R." },
      { en: "Capillary ascent h = 2T cos θ / (r ρ g). Jurin's Law: h · r = constant." },
      { en: "Stokes' law F = 6πηrv; Terminal velocity v_t ∝ r²." },
      { en: "Bernoulli: P + 1/2 ρv² + ρgh = const. Narrow cross-section => high velocity => LOW pressure." },
    ],
    keyFormulasTable: [
      { name: "Excess Pressure (Drop)", formula: "ΔP = 2T / R", description: "Excess pressure inside spherical liquid drop" },
      { name: "Excess Pressure (Bubble)", formula: "ΔP = 4T / R", description: "Excess pressure inside soap bubble (two free surfaces)" },
      { name: "Capillary Rise", formula: "h = (2T cos θ) / (r ρ g)", description: "Height of liquid column in vertical capillary tube" },
      { name: "Terminal Velocity", formula: "v_t = 2 r² (ρ - σ) g / (9 η)", description: "Constant terminal velocity of spherical body in viscous fluid" },
      { name: "Torricelli's Efflux Velocity", formula: "v = √(2 g h)", description: "Velocity of fluid exiting an orifice at depth h" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Using ΔP = 2T/R for a soap bubble.",
        correction: "Soap bubble has 2 liquid surfaces in contact with air, so ΔP = 4T/R. Only liquid drop in air has 2T/R."
      },
      {
        mistake: "Assuming liquid overflows if capillary tube is shorter than calculated h.",
        correction: "Liquid NEVER overflows; the meniscus flattens to a larger radius of curvature R such that h·R remains constant."
      },
    ]
  },

  // 2. Current Electricity & Measurement Instruments
  {
    id: "note_phy_current_instruments",
    chapter: "Current Electricity & Measurement Instruments",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Kirchhoff's Laws, Potentiometer, Meter Bridge & Galvanometer Conversion",
    summary: "Complete guide to Kirchhoff's Current & Voltage Laws, Wheatstone Network, Meter Bridge, Kelvin's Method, Potentiometer applications, and Shunt/Multiplier conversions.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Kirchhoff's Circuit Laws",
        points: [
          "Kirchhoff's First Law (Current Law / KCL / Junction Rule): Algebraic sum of all currents meeting at a junction is zero: Σ I = 0. Based on CONSERVATION OF CHARGE.",
          "Kirchhoff's Second Law (Voltage Law / KVL / Loop Rule): In any closed loop, algebraic sum of potential differences and EMFs is zero: Σ IR + Σ E = 0. Based on CONSERVATION OF ENERGY.",
          "Sign convention: Current in traversal direction gives -IR drop; Traversing from negative to positive terminal of cell gives +E.",
        ],
        keyFormula: "Σ I_junction = 0 (Charge Conservation) | Σ ΔV_loop = 0 (Energy Conservation)"
      },
      {
        title: "2. Wheatstone Bridge & Meter Bridge",
        points: [
          "Wheatstone Network Balance Condition: When galvanometer shows zero deflection (I_g = 0), P / Q = R / S.",
          "If battery and galvanometer are interchanged, balance condition remains UNCHANGED.",
          "Meter Bridge: Works on Wheatstone principle using 1 m uniform resistance wire. Unknown resistance X: X / R = l_x / l_R = l_x / (100 - l_x).",
          "Formula for unknown resistance: X = R · [ l_x / (100 - l_x) ].",
          "Most sensitive condition: Null point should be obtained near center of wire (between 40 cm and 60 cm).",
          "Kelvin's Method: Used to determine resistance of galvanometer G using meter bridge: G = R · [ l_g / (100 - l_g) ].",
        ],
        keyFormula: "P/Q = R/S | X = R [l_x / (100 - l_x)] | G = R [l_g / (100 - l_g)]",
        examTip: "End errors in Meter Bridge occur due to contact resistance and soldering at ends; eliminated by taking reading with interchanged positions of X and R."
      },
      {
        title: "3. Potentiometer & Applications",
        points: [
          "Potentiometer Principle: Fall of potential along uniform wire is directly proportional to its length: V ∝ l => V = k · l, where k = V/L is Potential Gradient (V/m).",
          "Does NOT draw any current from cell at null point; acts as an IDEAL VOLTMETER with infinite effective resistance.",
          "Comparison of EMFs (Individual method): E₁ / E₂ = l₁ / l₂.",
          "Comparison of EMFs (Sum & Difference / Combination method): (E₁ + E₂) / (E₁ - E₂) = l₁ / l₂ => E₁ / E₂ = (l₁ + l₂) / (l₁ - l₂).",
          "Internal Resistance of Cell (r): r = R · [ (l₁ - l₂) / l₂ ] = R · [ (l₁ / l₂) - 1 ], where l₁ is balancing length for open circuit (EMF E) and l₂ is for closed circuit (terminal voltage V).",
          "Sensitivity of Potentiometer: Increased by decreasing potential gradient k (i.e. increasing wire length L or adding series resistance with driver cell).",
        ],
        keyFormula: "k = V/L | E₁/E₂ = l₁/l₂ | E₁/E₂ = (l₁+l₂)/(l₁-l₂) | r = R [(l₁ - l₂)/l₂]",
        examTip: "Why Potentiometer is superior to Voltmeter: Voltmeter draws small current and measures Terminal Voltage V < E; Potentiometer draws NO current and measures TRUE EMF E."
      },
      {
        title: "4. Conversion of Moving Coil Galvanometer (MCG)",
        points: [
          "MCG to Ammeter: Connected with a LOW resistance in PARALLEL called SHUNT (S).",
          "Shunt formula: S = (I_g · G) / (I - I_g) = G / (n - 1), where n = I / I_g is multiplying factor.",
          "Effective resistance of Ammeter: R_A = (S · G) / (S + G) ≈ S (very small). Ideal Ammeter has R_A = 0.",
          "MCG to Voltmeter: Connected with a HIGH resistance (R_s) in SERIES.",
          "Series resistance formula: R_s = (V / I_g) - G = (n - 1) G, where n = V / V_g.",
          "Effective resistance of Voltmeter: R_V = G + R_s (very large). Ideal Voltmeter has R_V = ∞.",
        ],
        keyFormula: "S = (I_g · G) / (I - I_g) | R_s = (V / I_g) - G | R_ideal_ammeter = 0 | R_ideal_voltmeter = ∞"
      },
    ],
    quickRevisionPoints: [
      { en: "KCL is based on Charge Conservation; KVL is based on Energy Conservation." },
      { en: "Meter Bridge: X = R [l_x / (100 - l_x)]. Best accuracy at center 50 cm." },
      { en: "Potentiometer cell internal resistance: r = R [(l₁ - l₂) / l₂]." },
      { en: "Ammeter = Shunt S in parallel; Voltmeter = High resistance R_s in series." },
    ],
    keyFormulasTable: [
      { name: "Meter Bridge Unknown Resistance", formula: "X = R · [l_x / (100 - l_x)]", description: "Calculates unknown resistance using null deflection length" },
      { name: "Potentiometer Internal Resistance", formula: "r = R · [(l₁ - l₂) / l₂]", description: "Internal resistance of cell using open and closed circuit balance" },
      { name: "Galvanometer Shunt for Ammeter", formula: "S = (I_g · G) / (I - I_g)", description: "Low parallel resistance required to convert MCG to ammeter" },
      { name: "Galvanometer Series Resistor for Voltmeter", formula: "R_s = (V / I_g) - G", description: "High series resistance required to convert MCG to voltmeter" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing open circuit length l₁ and closed circuit length l₂ in potentiometer formula.",
        correction: "Open circuit length l₁ (balancing EMF E) is ALWAYS GREATER than closed circuit length l₂ (balancing terminal voltage V). So l₁ > l₂ always."
      },
    ]
  },

  // 3. Structure of Atoms and Nuclei
  {
    id: "note_phy_atoms_nuclei",
    chapter: "Structure of Atoms and Nuclei",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Bohr's Hydrogen Model, Spectral Series, Binding Energy & Radioactivity",
    summary: "Comprehensive guide to Bohr's postulates, Hydrogen energy levels, Lyman/Balmer/Paschen series, Mass defect, Nuclear binding energy, and Radioactive decay law.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Bohr's Atomic Model & Postulates",
        points: [
          "Postulate 1: Electron revolves around nucleus in stable non-radiating circular orbits under electrostatic force: m v²/r = (1/4πε₀) (Z e²/r²).",
          "Postulate 2 (Bohr's Quantization Rule): Orbital angular momentum is integral multiple of h/2π: L = m v r = n (h / 2π), where n = 1, 2, 3... (Principal quantum number).",
          "Postulate 3: Electron radiates photon only when jumping from higher energy state E_i to lower state E_f: hν = E_i - E_f.",
          "Radius of Bohr Orbit: r_n = [ ε₀ h² n² ] / [ π m Z e² ] = 0.529 · (n² / Z) Å. (r ∝ n² / Z). For H atom ground state (n=1, Z=1): r₁ = 0.529 Å = a₀.",
          "Orbital Velocity: v_n = [ Z e² ] / [ 2 ε₀ n h ] = (c / 137) · (Z / n) ≈ 2.18 × 10⁶ · (Z / n) m/s. (v ∝ Z / n).",
          "Kinetic Energy: KE = (1/8πε₀) (Z e²/r) = 13.6 · (Z²/n²) eV.",
          "Potential Energy: PE = - (1/4πε₀) (Z e²/r) = - 2 · KE = - 27.2 · (Z²/n²) eV.",
          "Total Energy: TE = KE + PE = - KE = (1/2) PE = - 13.6 · (Z² / n²) eV. (Negative sign indicates bound system).",
        ],
        keyFormula: "L = nh/2π | r_n = 0.529 (n²/Z) Å | E_n = - 13.6 (Z²/n²) eV | TE = - KE = PE / 2",
        keyMnemonic: "Energy proportions: PE is twice TE (PE = 2 TE), and KE is opposite TE (KE = -TE)."
      },
      {
        title: "2. Hydrogen Spectral Series & Rydberg Formula",
        points: [
          "Rydberg Formula: Wave number ν̄ = 1 / λ = R · Z² [ (1 / n₁²) - (1 / n₂²) ], where Rydberg constant R ≈ 1.097 × 10⁷ m⁻¹.",
          "Lyman Series: n₁ = 1, n₂ = 2, 3, 4... Spectral Region: ULTRAVIOLET (UV). Shortest wavelength (Series limit): λ_min = 1/R ≈ 912 Å.",
          "Balmer Series: n₁ = 2, n₂ = 3, 4, 5... Spectral Region: VISIBLE. (Only series in visible region!). First line H_α: n₂=3 -> n₁=2 (Red light).",
          "Paschen Series: n₁ = 3, n₂ = 4, 5, 6... Spectral Region: INFRARED (Near IR).",
          "Brackett Series: n₁ = 4, n₂ = 5, 6... Spectral Region: INFRARED (Middle IR).",
          "Pfund Series: n₁ = 5, n₂ = 6, 7... Spectral Region: INFRARED (Far IR).",
          "Number of spectral lines emitted when electron de-excites from state n to ground state: N = n (n - 1) / 2.",
        ],
        keyFormula: "1/λ = R [1/n₁² - 1/n₂²] | N_lines = n(n - 1)/2",
        keyMnemonic: "Spectral Series Order: Lazy Boys Play Badminton Politely -> Lyman, Balmer, Paschen, Brackett, Pfund.",
        examTip: "Balmer series is the ONLY series lying in the visible region. If a question mentions 'visible spectrum of hydrogen', n₁ MUST BE 2."
      },
      {
        title: "3. Nuclear Physics, Binding Energy & Radioactivity",
        points: [
          "Nuclear Radius: R = R₀ A^(1/3), where R₀ ≈ 1.2 × 10⁻¹⁵ m = 1.2 fm. Nuclear volume V ∝ A => Nuclear density is INDEPENDENT of mass number A (ρ ≈ 2.3 × 10¹⁷ kg/m³).",
          "Mass Defect (Δm): Δm = [ Z m_p + (A - Z) m_n ] - M_nucleus.",
          "Binding Energy (BE): BE = Δm · c² = Δm (in amu) × 931.5 MeV.",
          "Binding Energy per Nucleon (BE / A): Measures nuclear stability. Maximum for Iron-56 (Fe⁵⁶, BE/A ≈ 8.75 MeV/nucleon). Low for very light nuclei (leads to Nuclear Fusion) and very heavy nuclei (leads to Nuclear Fission).",
          "Radioactive Decay Law: dN/dt = - λ N => N(t) = N₀ e^(-λt).",
          "Half-Life (T_1/2): Time for half the nuclei to decay: T_1/2 = ln 2 / λ = 0.693 / λ.",
          "Mean Life (τ): Average life of nucleus: τ = 1 / λ = T_1/2 / 0.693 ≈ 1.44 · T_1/2.",
          "Remaining fraction after n half-lives: N / N₀ = (1/2)^n = (1/2)^(t / T_1/2).",
        ],
        keyFormula: "R = R₀ A^(1/3) | BE = Δm × 931.5 MeV | T_1/2 = 0.693 / λ | N = N₀ (1/2)^(t/T_1/2)"
      },
    ],
    quickRevisionPoints: [
      { en: "Bohr radius r_n ∝ n²/Z; Velocity v_n ∝ Z/n; Energy E_n = -13.6 (Z²/n²) eV." },
      { en: "Lyman series = UV (n₁=1); Balmer series = Visible (n₁=2); Paschen = IR (n₁=3)." },
      { en: "Nuclear density is constant for all nuclei: ρ ≈ 2.3 × 10¹⁷ kg/m³." },
      { en: "Radioactive half life T_1/2 = 0.693 / λ; Remaining after n half lives = N₀ (1/2)^n." },
    ],
    keyFormulasTable: [
      { name: "Bohr Total Energy", formula: "E_n = -13.6 (Z² / n²) eV", description: "Quantized energy of electron in nth Bohr orbit" },
      { name: "Rydberg Spectral Formula", formula: "1/λ = R Z² [1/n₁² - 1/n₂²]", description: "Wavelength of emitted photon during electronic transition" },
      { name: "Nuclear Radius", formula: "R = R₀ · A^(1/3)", description: "Radius of atomic nucleus in terms of mass number A (R₀ = 1.2 fm)" },
      { name: "Radioactive Decay Law", formula: "N = N₀ · e^(-λt) = N₀ · (1/2)^(t / T_1/2)", description: "Number of radioactive undecayed nuclei at time t" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking all spectral series lie in the visible region.",
        correction: "ONLY the Balmer series (n₁=2) lies in visible region. Lyman is in UV, while Paschen, Brackett, Pfund are in Infrared."
      },
    ]
  },
];
