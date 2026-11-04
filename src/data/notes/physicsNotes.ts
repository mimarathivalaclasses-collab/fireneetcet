import { TopicNote } from "../../types";

export const PHYSICS_NOTES: TopicNote[] = [
  // 1. Rotational Dynamics
  {
    id: "note_phy_rotational_dynamics",
    chapter: "Rotational Dynamics",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Complete Rotational Dynamics & Circular Motion Revision Note",
    summary: "Comprehensive guide covering Centripetal Force, Banking of Roads, Vertical Circular Motion, Moment of Inertia Theorems, Torque, and Rolling Motion.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Uniform Circular Motion & Banking of Roads",
        points: [
          "Centripetal Acceleration: a_c = v²/r = ω²r = vω (directed towards center).",
          "Centripetal Force: F_c = m v² / r = m ω² r.",
          "Most Safe (Optimum) Speed on Banked Road: v_0 = √(r g tan θ). At this speed, friction is zero.",
          "Maximum Safe Speed with friction μ_s: v_max = √[ r g (μ_s + tan θ) / (1 - μ_s tan θ) ].",
          "Minimum Safe Speed with friction μ_s: v_min = √[ r g (tan θ - μ_s) / (1 + μ_s tan θ) ].",
          "Conical Pendulum: Period T = 2π √(L cos θ / g) = 2π √(h / g). Frequency n = (1/2π) √(g / L cos θ).",
        ],
        keyFormula: "v = √(r g tan θ) | T = 2π √(L cos θ / g)",
        keyMnemonic: "Remember: 'Top speed needs Plus upstairs' -> (tan θ + μ) in numerator for v_max.",
        examTip: "In MHT-CET/NEET, if road is frictionless, directly use tan θ = v² / (r g)."
      },
      {
        title: "2. Vertical Circular Motion (VCM)",
        points: [
          "Velocity at Top (Highest Point H): v_H = √(r g). Tension T_H = 0.",
          "Velocity at Bottom (Lowest Point L): v_L = √(5 r g). Tension T_L = 6 mg.",
          "Velocity at Mid-way (Horizontal M): v_M = √(3 r g). Tension T_M = 3 mg.",
          "Difference in Tension between Bottom and Top: T_L - T_H = 6 mg (always constant).",
        ],
        keyFormula: "v_L = √(5rg) | v_H = √(rg) | T_L - T_H = 6mg",
        examTip: "Mass tied to rigid light rod: v_H = 0, v_L = √(4 r g) = 2√(r g), T_L - T_H = 6 mg."
      },
      {
        title: "3. Moment of Inertia & Theorems",
        points: [
          "Radius of Gyration: k = √(I / M) => I = M k².",
          "Parallel Axes Theorem: I_O = I_C + M h² (axis through C must pass through center of mass).",
          "Perpendicular Axes Theorem (only for planar 2D laminas): I_z = I_x + I_y.",
          "Ring (central axis): I = M R², Disc: I = (1/2) M R².",
          "Solid Sphere: I = (2/5) M R², Hollow Sphere: I = (2/3) M R².",
          "Solid Cylinder: I = (1/2) M R², Thin Rod (center): I = (1/12) M L².",
        ],
        keyFormula: "I_O = I_C + M h² | I_z = I_x + I_y | I = M k²",
        keyMnemonic: "Spheres: Solid (2/5 = 0.4) is smaller MI than Hollow (2/3 = 0.67)."
      },
      {
        title: "4. Rolling Motion on an Inclined Plane",
        points: [
          "Total Kinetic Energy: E_total = K_trans + K_rot = (1/2) M v² (1 + k²/R²).",
          "Linear Acceleration down incline θ: a = (g sin θ) / (1 + k²/R²).",
          "Velocity at bottom: v = √[ (2 g h) / (1 + k²/R²) ].",
          "Order of arrival at bottom (fastest to slowest): Solid Sphere > Disc/Solid Cylinder > Hollow Sphere > Ring/Hollow Cylinder.",
        ],
        keyFormula: "a = (g sin θ) / (1 + k²/R²) | v = √[ 2gh / (1 + k²/R²) ]"
      },
    ],
    quickRevisionPoints: [
      { en: "Angular momentum is conserved (L = I ω = constant) when net external torque τ_ext = 0." },
      { en: "Kinetic energy of rotation: E_rot = (1/2) I ω² = L² / (2I)." },
      { en: "Torque-Angular Acceleration relation: τ = I α = dL/dt." },
    ],
    keyFormulasTable: [
      { name: "Centripetal Force", formula: "F_c = m v² / r = m ω² r", description: "Force directed towards center of circle" },
      { name: "Banking Angle", formula: "tan θ = v² / (r g)", description: "Optimum road banking without friction" },
      { name: "VCM Min Bottom Velocity", formula: "v_L = √(5 g r)", description: "Critical speed at lowest point to complete loop" },
      { name: "Parallel Axes Theorem", formula: "I = I_cm + M d²", description: "Calculates MI about any parallel axis at distance d" },
      { name: "Rolling Acceleration", formula: "a = (g sin θ) / (1 + k²/R²)", description: "Acceleration down inclined plane of angle θ" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Applying Parallel Axes Theorem about an arbitrary axis instead of Center of Mass.",
        correction: "I_C MUST always be the axis passing strictly through the Center of Mass."
      },
      {
        mistake: "Confusing Radius of Gyration (k) with Radius of Object (R).",
        correction: "For a disc, k = R/√2, so k²/R² = 1/2. For sphere, k²/R² = 2/5."
      },
    ]
  },

  // 2. Thermodynamics & Kinetic Theory
  {
    id: "note_phy_thermo",
    chapter: "Thermodynamics & Kinetic Theory",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Thermodynamics & KTG Complete Fast Track Notes",
    summary: "First Law of Thermodynamics, Isothermal, Adiabatic, Isobaric, Isochoric processes, Carnot Engine Efficiency, and Mean Free Path.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. First Law & Thermodynamic Processes",
        points: [
          "First Law of Thermodynamics: ΔQ = ΔU + ΔW, where ΔU = n C_v ΔT.",
          "Work done in general: W = ∫ P dV (Area under P-V indicator diagram).",
          "Isothermal Process (T = const, ΔU = 0): W = n R T ln(V2 / V1) = 2.303 n R T log10(P1 / P2).",
          "Adiabatic Process (ΔQ = 0, P V^γ = const): W = (P1 V1 - P2 V2) / (γ - 1) = n R (T1 - T2) / (γ - 1).",
          "Isochoric Process (V = const, ΔW = 0): ΔQ = ΔU = n C_v ΔT.",
          "Isobaric Process (P = const): W = P (V2 - V1) = n R ΔT. ΔQ = n C_p ΔT.",
        ],
        keyFormula: "ΔQ = ΔU + ΔW | W_iso = n R T ln(V2/V1) | P V^γ = const"
      },
      {
        title: "2. Heat Engines, Refrigerators & Carnot Cycle",
        points: [
          "Efficiency of Heat Engine: η = W / Q1 = 1 - (Q2 / Q1) = 1 - (T2 / T1).",
          "Coefficient of Performance (COP) of Refrigerator: β = Q2 / W = T2 / (T1 - T2).",
          "Relation between η and β: β = (1 - η) / η.",
          "Mayer's Relation: C_p - C_v = R (for 1 mole) or c_p - c_v = R / M (per gram).",
          "Adiabatic exponent γ = C_p / C_v = 1 + 2/f (Monoatomic: γ = 5/3, Diatomic: γ = 7/5).",
        ],
        keyFormula: "η = 1 - T2/T1 | β = T2 / (T1 - T2) | C_p - C_v = R",
        examTip: "Always convert temperatures to Kelvin (K = °C + 273.15) before calculating Carnot efficiency."
      },
      {
        title: "3. Kinetic Theory of Gases (KTG)",
        points: [
          "Gas Pressure: P = (1/3) ρ v_rms² = (1/3) (N m / V) v_rms².",
          "Root Mean Square Velocity: v_rms = √(3 R T / M) = √(3 k_B T / m).",
          "Average Velocity: v_avg = √(8 R T / π M), Most Probable Velocity: v_mp = √(2 R T / M).",
          "Ratio: v_mp : v_avg : v_rms = √2 : √(8/π) : √3 = 1 : 1.128 : 1.224.",
          "Mean Free Path: λ = 1 / (√2 π n d²), where n = N/V and d is molecular diameter.",
        ],
        keyFormula: "v_rms = √(3RT/M) | λ = 1 / (√2 π n d²)",
        keyMnemonic: "RAM -> RMS (highest) > Average > Most Probable (lowest)."
      },
    ],
    quickRevisionPoints: [
      { en: "In cyclic process, total internal energy change ΔU = 0, so net Q = net W." },
      { en: "Slope of Adiabatic curve on P-V diagram is γ times steeper than Isothermal curve (Slope_ad = γ × Slope_iso)." },
    ],
    keyFormulasTable: [
      { name: "First Law", formula: "ΔQ = ΔU + P ΔV", description: "Conservation of energy in thermodynamics" },
      { name: "Carnot Efficiency", formula: "η = 1 - T_sink / T_source", description: "Maximum theoretical heat engine efficiency" },
      { name: "RMS Speed", formula: "v_rms = √(3 R T / M)", description: "Root mean square speed of gas molecules" },
      { name: "Mean Free Path", formula: "λ = 1 / (√2 π n d²)", description: "Average distance traversed between collisions" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Plugging Celsius temperature into Carnot formula η = 1 - T2/T1.",
        correction: "T1 and T2 must ALWAYS be in absolute Kelvin (K = °C + 273)."
      },
    ]
  },

  // 3. Electrostatics & Current Electricity
  {
    id: "note_phy_electrostatics_current",
    chapter: "Electrostatics & Current Electricity",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Electrostatics, Capacitors & Current Electricity Master Notes",
    summary: "Coulomb's Law, Gauss's Law, Electric Potential, Capacitance with Dielectrics, Ohm's Law, Kirchhoff's Laws, Wheatstone Bridge, and Potentiometer.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Electrostatics & Gauss's Theorem",
        points: [
          "Coulomb's Force: F = (1 / 4πε₀) · (q₁ q₂ / r²) (in vacuum).",
          "Electric Field of Point Charge: E = (1 / 4πε₀) · (q / r²).",
          "Electric Dipole Moment: p = q × (2a) (directed from -q to +q). Torque τ = p × E.",
          "Gauss's Law: Total electric flux Φ = ∮ E · dA = Q_enclosed / ε₀.",
          "Electric Field near Infinite Plane Sheet: E = σ / (2ε₀) (independent of distance).",
          "Electric Field outside Spherical Shell (r ≥ R): E = (1/4πε₀)(Q/r²); Inside shell (r < R): E = 0.",
        ],
        keyFormula: "Φ = Q_enc / ε₀ | E_sheet = σ / (2ε₀) | τ = p × E"
      },
      {
        title: "2. Capacitance & Energy Storage",
        points: [
          "Parallel Plate Capacitor: C₀ = ε₀ A / d.",
          "With Dielectric of constant K filling entire space: C = K C₀.",
          "With Dielectric slab of thickness t: C = ε₀ A / [ (d - t) + (t/K) ].",
          "Energy Stored in Capacitor: U = (1/2) C V² = (1/2) Q V = Q² / (2C).",
          "Energy Density of Electric Field: u_E = (1/2) ε₀ E².",
          "Series Combination: 1/C_eq = 1/C₁ + 1/C₂; Parallel: C_eq = C₁ + C₂.",
        ],
        keyFormula: "C = K ε₀ A / d | U = (1/2) C V² = Q² / (2C)"
      },
      {
        title: "3. Current Electricity & Circuit Laws",
        points: [
          "Drift Velocity: v_d = e E τ / m => Current I = n e A v_d.",
          "Resistance & Resistivity: R = ρ L / A. Temperature dependence: R_T = R₀(1 + α ΔT).",
          "Kirchhoff's Current Law (KCL / Junction Law): Σ I = 0 (Conservation of Charge).",
          "Kirchhoff's Voltage Law (KVL / Loop Law): Σ IR + Σ E = 0 (Conservation of Energy).",
          "Wheatstone Bridge Balance Condition: P / Q = R / S (Galvanometer current I_G = 0).",
          "Meter Bridge (Unknown Resistance X): X = R · (l_X / l_R).",
          "Potentiometer Principle: Potential drop V ∝ l (V = k l, where k is potential gradient).",
        ],
        keyFormula: "I = n e A v_d | P/Q = R/S | E₁/E₂ = l₁/l₂",
        examTip: "Internal resistance of cell using potentiometer: r = R ( (l₁ - l₂) / l₂ )."
      },
    ],
    quickRevisionPoints: [
      { en: "Electric potential inside a hollow charged conducting sphere is constant and equals potential at surface V = (1/4πε₀)(Q/R)." },
      { en: "When a dielectric slab is inserted with battery disconnected: Q remains constant, V decreases by K, C increases by K, U decreases by K." },
    ],
    keyFormulasTable: [
      { name: "Coulomb's Law", formula: "F = (1/4πε₀)(q₁q₂/r²)", description: "Electrostatic force between two stationary charges" },
      { name: "Capacitor Energy", formula: "U = (1/2) C V²", description: "Electrostatic potential energy in a capacitor" },
      { name: "Wheatstone Balance", formula: "P / Q = R / S", description: "Balanced bridge condition for null deflection" },
      { name: "Cell Internal Resistance", formula: "r = R (l₁/l₂ - 1)", description: "Measurement using Potentiometer" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Series vs Parallel formulas for Capacitors and Resistors.",
        correction: "Capacitors in parallel ADD directly (C1+C2), while in series they add reciprocally (1/C1+1/C2) - opposite of resistors!"
      },
    ]
  },

  // 4. Optics (Ray & Wave Optics)
  {
    id: "note_phy_optics",
    chapter: "Optics (Ray & Wave Optics)",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Ray Optics, Optical Instruments & Wave Optics Master Notes",
    summary: "Refraction, Total Internal Reflection, Lens Maker's Formula, Prism Dispersion, Microscopes, Telescopes, YDSE Fringe Width, and Diffraction.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Ray Optics & Optical Instruments",
        points: [
          "Snell's Law: n₁ sin i = n₂ sin r => sin i / sin r = μ₂ / μ₁.",
          "Total Internal Reflection (TIR): Critical angle sin C = 1 / μ (when light travels from denser to rarer medium).",
          "Lens Maker's Formula: 1/f = (μ - 1) [ (1/R₁) - (1/R₂) ].",
          "Thin Lenses in Contact: 1/f_eq = 1/f₁ + 1/f₂ => Power P_eq = P₁ + P₂.",
          "Prism Formula: μ = sin[ (A + δ_m) / 2 ] / sin(A / 2). For thin prism: δ = (μ - 1) A.",
          "Compound Microscope Magnification: Normal adjustment: M = (v₀ / u₀) × (D / f_e). At near point: M = (v₀/u₀) [ 1 + (D/f_e) ].",
          "Astronomical Telescope Magnification: Normal adjustment: M = f₀ / f_e. Tube length L = f₀ + f_e.",
        ],
        keyFormula: "1/f = (μ-1)(1/R₁ - 1/R₂) | sin C = 1/μ | M_tele = f₀/f_e"
      },
      {
        title: "2. Wave Optics & Interference (YDSE)",
        points: [
          "Huygens' Principle: Every point on a wavefront acts as a secondary source of spherical wavelets.",
          "Superposition & Resultant Intensity: I = I₁ + I₂ + 2√(I₁ I₂) cos φ. Maximum I_max = (√I₁ + √I₂)², Minimum I_min = (√I₁ - √I₂)². If I₁=I₂=I₀: I = 4I₀ cos²(φ/2).",
          "Young's Double Slit Experiment (YDSE): Path difference Δx = y d / D.",
          "Bright Fringe condition: Δx = n λ => y_n = n λ D / d (n = 0, 1, 2...).",
          "Dark Fringe condition: Δx = (2n - 1) λ / 2 => y_n = (2n - 1) λ D / (2d).",
          "Fringe Width (Bandwidth): β = λ D / d (same for bright and dark fringes).",
          "Single Slit Diffraction Minima: a sin θ = n λ (n = 1, 2, 3...). Width of Central Maxima = 2 λ D / a.",
        ],
        keyFormula: "β = λ D / d | Central Max Width = 2 λ D / a | I = 4 I₀ cos²(φ/2)"
      },
    ],
    quickRevisionPoints: [
      { en: "When YDSE apparatus is immersed in a liquid of refractive index μ, fringe width decreases: β' = β / μ." },
      { en: "Brewster's Law of Polarization: tan i_p = μ. Reflected and refracted rays are perpendicular (i_p + r = 90°)." },
    ],
    keyFormulasTable: [
      { name: "Lens Maker's Equation", formula: "1/f = (μ - 1)(1/R₁ - 1/R₂)", description: "Focal length in terms of radii of curvature" },
      { name: "YDSE Fringe Width", formula: "β = λ D / d", description: "Distance between two consecutive bright or dark fringes" },
      { name: "Telescope Magnification", formula: "M = f₀ / f_e", description: "Angular magnification in normal adjustment" },
      { name: "Brewster's Law", formula: "μ = tan i_p", description: "Polarizing angle for complete linear polarization" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Applying YDSE bright fringe condition (n λ) to diffraction maxima.",
        correction: "In Single Slit Diffraction, a sin θ = n λ gives MINIMA (destructive interference), NOT maxima!"
      },
    ]
  },

  // 5. Electromagnetic Induction & AC
  {
    id: "note_phy_emi_ac",
    chapter: "Electromagnetic Induction & AC",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Faraday's Laws, Lenz's Law, LCR Circuits & Resonance Notes",
    summary: "Magnetic Flux, Faraday's Laws, Lenz's Law, Motional EMF, Self & Mutual Inductance, AC RMS values, LCR Series Circuit, Resonant Frequency, and Power Factor.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Electromagnetic Induction (EMI)",
        points: [
          "Magnetic Flux: Φ = B · A = B A cos θ (SI unit: Weber, Wb).",
          "Faraday's Law: Induced EMF e = - dΦ / dt = - N (dΦ / dt).",
          "Lenz's Law: Direction of induced EMF always opposes the change in flux causing it (Conservation of Energy).",
          "Motional EMF in a moving rod: e = B v L (when B, v, L are mutually perpendicular).",
          "Rotating Rod in Magnetic Field: e = (1/2) B ω L² = B π f L².",
          "Self Inductance (L): Φ = L I => e = - L (dI / dt). Solenoid: L = μ₀ n² A l = μ₀ N² A / l.",
          "Mutual Inductance (M): e₂ = - M (dI₁ / dt). Coupling factor: M = k √(L₁ L₂), where 0 ≤ k ≤ 1.",
        ],
        keyFormula: "e = - dΦ/dt | e = B v L | e = (1/2) B ω L² | L = μ₀ n² A l"
      },
      {
        title: "2. Alternating Current (AC) & LCR Resonance",
        points: [
          "RMS Values: I_rms = I₀ / √2 ≈ 0.707 I₀, V_rms = V₀ / √2 ≈ 0.707 V₀.",
          "Average Value (half cycle): I_avg = (2 / π) I₀ ≈ 0.637 I₀.",
          "Inductive Reactance: X_L = ω L = 2π f L (Current lags voltage by 90°).",
          "Capacitive Reactance: X_C = 1 / (ω C) = 1 / (2π f C) (Current leads voltage by 90°).",
          "Series LCR Impedance: Z = √[ R² + (X_L - X_C)² ]. Phase angle: tan φ = (X_L - X_C) / R.",
          "Resonance Condition (X_L = X_C): Resonant frequency f_r = 1 / (2π √(L C)). At resonance, Z_min = R (purely resistive) and current is maximum.",
          "Quality Factor (Q-factor): Q = ω_r L / R = (1/R) √(L/C).",
          "Average AC Power: P_avg = V_rms I_rms cos φ, where cos φ = R / Z is the Power Factor.",
        ],
        keyFormula: "Z = √[ R² + (X_L - X_C)² ] | f_r = 1 / (2π √(LC)) | P_avg = V_rms I_rms cos φ"
      },
    ],
    quickRevisionPoints: [
      { en: "In a purely inductive or purely capacitive AC circuit, φ = 90°, so Power Factor cos φ = 0 and average power consumed is ZERO (Wattless Current)." },
      { en: "Transformer Equation: V_s / V_p = N_s / N_p = I_p / I_s = k (transformation ratio)." },
    ],
    keyFormulasTable: [
      { name: "Faraday's Law", formula: "e = - dΦ / dt", description: "EMF induced due to rate of change of magnetic flux" },
      { name: "Resonant Frequency", formula: "f_r = 1 / (2π √(LC))", description: "Frequency at which capacitive and inductive reactance balance" },
      { name: "LCR Impedance", formula: "Z = √[ R² + (ωL - 1/ωC)² ]", description: "Total effective opposition to AC in series LCR" },
      { name: "Power Factor", formula: "cos φ = R / Z", description: "Ratio of true power to apparent power in AC circuit" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming domestic AC voltage (220V, 50Hz) is the peak voltage V0.",
        correction: "220V is the RMS value (V_rms). Peak voltage is actually V0 = 220 × √2 ≈ 311 Volts!"
      },
    ]
  },

  // 6. Modern Physics & Dual Nature
  {
    id: "note_phy_modern_physics",
    chapter: "Modern Physics & Dual Nature",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Photoelectric Effect, Bohr Model, Radioactivity & Semiconductors",
    summary: "Einstein's Photoelectric Equation, de Broglie wavelength, Bohr's postulates & energy levels, Radioactive decay law, Half-life, p-n junction, and logic gates.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Photoelectric Effect & Dual Nature of Radiation",
        points: [
          "Photon Energy: E = h ν = h c / λ. Momentum: p = h / λ = E / c.",
          "Einstein's Photoelectric Equation: K_max = h ν - Φ₀ = e V₀, where Φ₀ = h ν₀ is work function.",
          "Stopping Potential (V₀): e V₀ = h ν - Φ₀ => V₀ = (h/e) ν - (Φ₀/e).",
          "Key observations: Photoelectric current ∝ Light Intensity. Kinetic energy of photoelectrons depends ONLY on Frequency (ν), NOT on intensity.",
          "de Broglie Wavelength: λ = h / p = h / (m v) = h / √(2 m K).",
          "For electron accelerated through potential V: λ = 12.27 / √V Å = 1.227 / √V nm.",
        ],
        keyFormula: "K_max = h ν - Φ₀ = e V₀ | λ = h / √(2mK) = 12.27/√V Å"
      },
      {
        title: "2. Atomic Structure & Bohr's Hydrogen Model",
        points: [
          "Bohr Postulate 1: Centripetal force provided by electrostatic attraction: m v² / r = (1/4πε₀) (e² / r²).",
          "Bohr Postulate 2: Quantization of Angular Momentum: L = m v r = n (h / 2π) = n ℏ.",
          "Radius of nth orbit: r_n = 0.529 · (n² / Z) Å.",
          "Velocity of electron: v_n = 2.18 × 10⁶ · (Z / n) m/s = (c / 137) · (Z / n).",
          "Total Energy of nth state: E_n = - 13.6 · (Z² / n²) eV.",
          "Rydberg Formula for Spectral Lines: 1/λ = R_H Z² [ (1/n₁²) - (1/n₂²) ].",
          "Spectral Series: Lyman (n₁=1, UV), Balmer (n₁=2, Visible), Paschen (n₁=3, IR), Brackett (n₁=4, IR), Pfund (n₁=5, Far IR).",
        ],
        keyFormula: "E_n = -13.6 (Z²/n²) eV | r_n = 0.529 (n²/Z) Å | 1/λ = R_H [ 1/n₁² - 1/n₂² ]",
        keyMnemonic: "L B P B P -> Lyman (UV), Balmer (Visible), Paschen, Brackett, Pfund (all IR)."
      },
      {
        title: "3. Radioactivity & Semiconductor Electronics",
        points: [
          "Radioactive Decay Law: N(t) = N₀ e^(-λ t).",
          "Half-life: T_1/2 = ln 2 / λ = 0.693 / λ. Mean life: τ = 1 / λ = 1.44 T_1/2.",
          "Remaining nuclei after n half-lives: N = N₀ (1/2)^n, where n = t / T_1/2.",
          "Mass Defect: Δm = [ Z m_p + (A - Z) m_n ] - M_nucleus. Binding Energy = Δm × 931.5 MeV.",
          "Intrinsic vs Extrinsic Semiconductors: n_type (doped with pentavalent P, As: electrons majority); p_type (doped with trivalent B, Al, In: holes majority). Mass action law: n_e · n_h = n_i².",
          "Logic Gates: AND (Y=A·B), OR (Y=A+B), NOT (Y=A'), NAND (Y=(A·B)'), NOR (Y=(A+B)').",
        ],
        keyFormula: "N = N₀ (1/2)^n | T_1/2 = 0.693/λ | BE = Δm × 931.5 MeV"
      },
    ],
    quickRevisionPoints: [
      { en: "Balmer series is the only spectral series of hydrogen falling in the visible spectrum region." },
      { en: "Universal Logic Gates: NAND and NOR can be combined to form all basic gates (AND, OR, NOT)." },
    ],
    keyFormulasTable: [
      { name: "Einstein Photoelectric Equation", formula: "K_max = h ν - Φ₀ = e V₀", description: "Conservation of energy in photoelectric emission" },
      { name: "de Broglie Wavelength", formula: "λ = h / p = 1.227 / √V nm", description: "Matter wave wavelength of moving particles" },
      { name: "Bohr Orbit Energy", formula: "E_n = -13.6 / n² eV", description: "Energy of electron in nth orbit of hydrogen" },
      { name: "Half-Life Period", formula: "T_1/2 = 0.693 / λ", description: "Time required for half of radioactive nuclei to decay" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming increasing light intensity increases the maximum kinetic energy of photoelectrons.",
        correction: "Intensity only increases the NUMBER of photoelectrons (current); Kinetic energy depends STRICTLY on frequency of incident light."
      },
    ]
  },

  // 7. Oscillations & Waves
  {
    id: "note_phy_oscillations_waves",
    chapter: "Oscillations & Waves",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Simple Harmonic Motion (SHM), Wave Superposition, Doppler Effect Notes",
    summary: "Differential equation of linear SHM, Velocity, Acceleration, Energy of SHM, Simple Pendulum, Standing Waves in Strings & Pipes, Beats, and Doppler Effect.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Simple Harmonic Motion (SHM)",
        points: [
          "Differential Equation: d²x/dt² + ω² x = 0 (where ω = √(k/m)).",
          "Displacement: x = A sin(ω t + φ). Velocity: v = ω √(A² - x²). Max velocity at mean position: v_max = A ω.",
          "Acceleration: a = - ω² x. Max acceleration at extreme: a_max = ω² A.",
          "Kinetic Energy: K = (1/2) m ω² (A² - x²); Potential Energy: U = (1/2) m ω² x².",
          "Total Mechanical Energy: E_total = K + U = (1/2) m ω² A² (constant at all positions).",
          "Simple Pendulum: T = 2π √(L / g). Seconds pendulum has T = 2 seconds (length L ≈ 1 meter).",
          "Spring-Mass System: T = 2π √(m / k). In series: 1/k_eq = 1/k₁ + 1/k₂; In parallel: k_eq = k₁ + k₂.",
        ],
        keyFormula: "v = ω√(A² - x²) | a = -ω² x | E = (1/2) m ω² A² | T = 2π√(L/g)"
      },
      {
        title: "2. Stationary Waves, Organ Pipes & Doppler Effect",
        points: [
          "Stretched String Fundamental Frequency: n = (1 / 2L) √(T / m) (where m is mass per unit length).",
          "Pipe Open at Both Ends: Fundamental n₀ = v / (2L). All harmonics (1n₀, 2n₀, 3n₀...) present.",
          "Pipe Closed at One End: Fundamental n_c = v / (4L). ONLY ODD harmonics (1n_c, 3n_c, 5n_c...) present.",
          "End Correction (e): Open pipe: L' = L + 2e = L + 2(0.3 d); Closed pipe: L' = L + e = L + 0.3 d.",
          "Beats Frequency: Beat frequency = |n₁ - n₂| (Difference of frequencies).",
          "Doppler Effect in Sound: Apparent frequency f' = f [ (v ± v_o) / (v ∓ v_s) ].",
        ],
        keyFormula: "n_open = v/(2L) | n_closed = v/(4L) | Beat Freq = |n₁ - n₂|",
        examTip: "A closed pipe of length L has the same fundamental frequency as an open pipe of length 2L."
      },
    ],
    quickRevisionPoints: [
      { en: "In SHM, Kinetic energy equals Potential energy at x = ± A / √2 (where K = U = E/2)." },
      { en: "Waxing a tuning fork decreases its frequency; Filing a tuning fork increases its frequency." },
    ],
    keyFormulasTable: [
      { name: "Total SHM Energy", formula: "E = (1/2) m ω² A²", description: "Constant mechanical energy in simple harmonic motion" },
      { name: "Open Pipe Fundamental", formula: "n = v / (2L)", description: "Fundamental frequency of organ pipe open at both ends" },
      { name: "Closed Pipe Fundamental", formula: "n = v / (4L)", description: "Fundamental frequency of pipe closed at one end" },
      { name: "Doppler Sound Formula", formula: "f' = f [ (v ± v_o) / (v ∓ v_s) ]", description: "Apparent sound pitch due to relative motion" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Counting both even and odd harmonics for an organ pipe closed at one end.",
        correction: "A closed pipe produces ONLY odd harmonics (1st, 3rd, 5th...). The 1st overtone is the 3rd harmonic!"
      },
    ]
  },

  // 8. Gravitation & Laws of Motion
  {
    id: "note_phy_gravitation_laws",
    chapter: "Gravitation & Laws of Motion",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Gravitation, Kepler's Laws, Newton's Laws & Friction Master Notes",
    summary: "Newton's Universal Law of Gravitation, Variation of g with altitude & depth, Kepler's Laws, Escape Velocity, Orbital Velocity, Newton's Laws of Motion, and Friction.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Gravitation, Kepler's Laws & Satellites",
        points: [
          "Newton's Law: F = G M m / r² (where G = 6.67 × 10⁻¹¹ N·m²/kg²).",
          "Acceleration due to gravity at Earth surface: g = G M / R² ≈ 9.8 m/s².",
          "Variation with Altitude h: g_h = g (1 - 2h/R) (for h << R) or g_h = g [ R / (R + h) ]².",
          "Variation with Depth d: g_d = g (1 - d/R). At center of Earth (d = R): g_center = 0.",
          "Kepler's 3rd Law (Law of Periods): T² ∝ r³ => T² = (4π² / G M) r³.",
          "Escape Velocity from surface: v_e = √(2 G M / R) = √(2 g R) ≈ 11.2 km/s.",
          "Orbital Velocity of satellite near surface: v_o = √(G M / R) = √(g R) ≈ 7.92 km/s. Note: v_e = √2 · v_o.",
        ],
        keyFormula: "g = GM/R² | v_e = √(2gR) ≈ 11.2 km/s | v_o = √(gR) | T² ∝ r³"
      },
      {
        title: "2. Newton's Laws of Motion & Friction",
        points: [
          "Newton's 2nd Law: F_net = dp/dt = m a (for constant mass). Impulse J = F Δt = Δp.",
          "Conservation of Linear Momentum: When F_ext = 0 => m₁ v₁ + m₂ v₂ = constant.",
          "Static Friction: f_s ≤ μ_s N (self-adjusting force). Limiting friction f_L = μ_s N.",
          "Kinetic Friction: f_k = μ_k N (constant, μ_k < μ_s).",
          "Angle of Friction (λ): tan λ = μ_s. Angle of Repose (θ): θ = λ.",
          "Connected Bodies on Pulley (Atwood Machine): a = (m₁ - m₂) g / (m₁ + m₂), Tension T = 2 m₁ m₂ g / (m₁ + m₂).",
        ],
        keyFormula: "F = dp/dt = m a | f_L = μ_s N | a_pulley = (m₁ - m₂)g / (m₁ + m₂)"
      },
    ],
    quickRevisionPoints: [
      { en: "Total energy of an orbiting satellite is negative: E_total = - G M m / (2r) = - K = U / 2." },
      { en: "Geostationary Satellite: Time period = 24 hours, height above surface ≈ 36,000 km, rotates West to East in equatorial plane." },
    ],
    keyFormulasTable: [
      { name: "Escape Velocity", formula: "v_e = √(2 g R)", description: "Minimum speed required to escape gravitational pull" },
      { name: "Orbital Velocity", formula: "v_o = √(g R)", description: "Horizontal speed to maintain circular orbit around Earth" },
      { name: "Gravity at Depth", formula: "g_d = g (1 - d/R)", description: "Linear decrease of gravitational acceleration inside Earth" },
      { name: "Atwood Acceleration", formula: "a = (m₁ - m₂)g / (m₁ + m₂)", description: "Acceleration of two masses connected across light pulley" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Using formula g_h = g(1 - 2h/R) when h is comparable to Earth radius R (e.g., h = R).",
        correction: "g_h = g(1 - 2h/R) is an approximation valid ONLY for h << R (e.g., h < 500 km). For large h, use exact formula g_h = g [R / (R + h)]²."
      },
    ]
  },

  // 8. Electromagnetic Induction (EMI) & AC Circuits
  {
    id: "note_phy_emi_ac_circuits",
    chapter: "Electromagnetic Induction & AC Circuits",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "EMI, Faraday's Laws, Self/Mutual Inductance & LCR Resonance Notes",
    summary: "Magnetic Flux, Faraday's Laws, Lenz's Law, Motional EMF, Inductance (L and M), AC Peak vs RMS, Reactance, Impedance, LCR Series Resonance, Quality Factor, and Transformers.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Faraday's Laws, Lenz's Law & Motional EMF",
        points: [
          "Magnetic Flux: Φ = B · A = B A cos θ (SI Unit: Weber, Wb; 1 Wb = 10⁸ Maxwell).",
          "Faraday's Law of Induction: e = - dΦ/dt = - N (dΦ/dt).",
          "Lenz's Law: Induced current opposes the change in magnetic flux causing it (Conservation of Energy).",
          "Motional EMF (Rod of length L moving with velocity v perpendicular to B): e = B L v. Induced Current I = B L v / R.",
          "Rotating Rod EMF (Length L rotating with angular speed ω): e = (1/2) B L² ω.",
          "Self Inductance (L): Φ = L I => e = - L (dI/dt). For solenoid: L = μ₀ N² A / l = μ₀ n² A l.",
          "Energy Stored in Inductor: U = (1/2) L I² (Magnetic energy density u_B = B² / 2μ₀).",
          "Mutual Inductance (M): Φ₂ = M I₁ => e₂ = - M (dI₁/dt). For concentric coils: M = k √(L₁ L₂).",
        ],
        keyFormula: "e = - dΦ/dt | e_motional = B L v | U = (1/2) L I² | M = k √(L₁ L₂)",
        keyMnemonic: "Lenz opposes cause: Increase in flux -> opposing field; Decrease in flux -> supporting field."
      },
      {
        title: "2. Alternating Current (AC) & LCR Series Resonance",
        points: [
          "RMS & Peak Values: I_rms = I₀ / √2 ≈ 0.707 I₀, V_rms = V₀ / √2 ≈ 0.707 V₀.",
          "Average Value (Half Cycle): I_avg = 2 I₀ / π ≈ 0.637 I₀ (Full cycle average is 0).",
          "Inductive Reactance: X_L = ω L = 2π f L (Current lags voltage by π/2).",
          "Capacitive Reactance: X_C = 1 / (ω C) = 1 / (2π f C) (Current leads voltage by π/2).",
          "Impedance of LCR Series Circuit: Z = √[ R² + (X_L - X_C)² ].",
          "Resonance Condition: X_L = X_C => ω_r = 1 / √(L C) => f_r = 1 / (2π √(L C)).",
          "At Resonance: Impedance Z = R (minimum), Current I = V/R (maximum), Power Factor cos φ = 1 (purely resistive).",
          "Quality Factor (Q-factor): Q = ω_r L / R = (1 / R) √(L / C) = f_r / Bandwidth.",
          "Power in AC Circuit: P_avg = V_rms I_rms cos φ, where cos φ = R / Z (Power Factor).",
          "Transformer Ratio: V_s / V_p = N_s / N_p = I_p / I_s = k (Step-up: k > 1, Step-down: k < 1).",
        ],
        keyFormula: "f_r = 1 / (2π √(LC)) | Z = √[R² + (X_L - X_C)²] | P_avg = V_rms I_rms cos φ"
      },
    ],
    quickRevisionPoints: [
      { en: "In purely inductive or capacitive circuit, phase angle is 90° and average power consumed is ZERO (Wattless Current)." },
      { en: "Choke coil has high inductance L and very low resistance R, ideal for controlling AC without major power loss." },
    ],
    keyFormulasTable: [
      { name: "Resonant Frequency", formula: "f_r = 1 / (2π √(LC))", description: "Frequency at which series LCR circuit has minimum impedance" },
      { name: "Impedance", formula: "Z = √[R² + (X_L - X_C)²]", description: "Total opposition to AC current in LCR circuit" },
      { name: "Power Factor", formula: "cos φ = R / Z", description: "Ratio of true power to apparent power in AC circuit" },
      { name: "Transformer Ratio", formula: "V_s / V_p = N_s / N_p", description: "Voltage transformation relation for ideal transformer" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming frequency of AC in DC circuit or calculating X_L for DC.",
        correction: "For direct current (DC), frequency f = 0. Therefore, X_L = 0 (inductor acts as short circuit/pure wire) and X_C = ∞ (capacitor blocks DC completely)."
      },
    ]
  },

  // 9. Magnetic Effects of Electric Current & Magnetism
  {
    id: "note_phy_magnetism_matter",
    chapter: "Magnetic Effects of Electric Current & Magnetism",
    subject: "Physics",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Biot-Savart Law, Ampere's Law, Moving Coil Galvanometer & Magnetic Materials",
    summary: "Biot-Savart Law, Field of Straight Wire & Circular Loop, Solenoid, Force on Moving Charge (Lorentz Force), Cyclotron, Torque on Loop, MCG Conversion (Ammeter & Voltmeter), and Dia/Para/Ferromagnetism.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Biot-Savart Law, Ampere's Law & Lorentz Force",
        points: [
          "Biot-Savart Law: dB = (μ₀ / 4π) · (I dl sin θ / r²), where μ₀/4π = 10⁻⁷ T·m/A.",
          "Magnetic Field at center of Circular Coil of N turns: B = μ₀ N I / (2 R).",
          "Field on Axis of Circular Coil: B_axis = (μ₀ N I R²) / [ 2 (R² + x²)^(3/2) ].",
          "Long Straight Wire at distance d: B = μ₀ I / (2π d).",
          "Inside Ideal Long Solenoid: B = μ₀ n I = μ₀ (N/L) I. At end of solenoid: B_end = (1/2) μ₀ n I.",
          "Lorentz Magnetic Force: F = q (v × B) = q v B sin θ.",
          "Circular Path in perpendicular B: Radius r = m v / (q B) = p / (q B) = √(2 m K) / (q B). Time period T = 2π m / (q B).",
          "Force on Current Carrying Conductor in B: F = I (L × B) = I L B sin θ.",
          "Force between two parallel long currents: F/L = (μ₀ I₁ I₂) / (2π d) (Attract if same direction, Repel if opposite).",
        ],
        keyFormula: "B_center = μ₀ N I / 2R | B_wire = μ₀ I / 2πd | r = mv / qB | F = q(v × B)"
      },
      {
        title: "2. Moving Coil Galvanometer (MCG) & Magnetic Properties of Matter",
        points: [
          "MCG Deflection Principle: Torque τ = N I A B = C θ => I = (C / NAB) θ = K θ.",
          "Conversion to Ammeter: Connect small shunt resistance S in parallel: S = [ I_g / (I - I_g) ] · G.",
          "Conversion to Voltmeter: Connect high series resistance R_s: R_s = (V / I_g) - G.",
          "Diamagnetic: Repelled weakly by magnets, χ is small and negative, μ_r < 1 (e.g., Bi, Cu, H₂O, NaCl, Superconductors with χ = -1).",
          "Paramagnetic: Attracted weakly, χ is small and positive, χ ∝ 1/T (Curie's Law, e.g., Al, O₂, Na, Pt, FeCl₃).",
          "Ferromagnetic: Strongly attracted, forms domains, χ is very large and positive. Above Curie Temp T_c becomes Paramagnetic (e.g., Fe, Co, Ni, Nd).",
          "Curie-Weiss Law (above T_c): χ = C / (T - T_c).",
        ],
        keyFormula: "S = [I_g / (I - I_g)] G | R_s = (V / I_g) - G | Curie Law: χ = C / T"
      },
    ],
    quickRevisionPoints: [
      { en: "Magnetic Lorentz force does ZERO work on a charged particle because F is always perpendicular to velocity v (Kinetic energy remains constant)." },
      { en: "Ideal Ammeter has ZERO resistance; Ideal Voltmeter has INFINITE resistance." },
    ],
    keyFormulasTable: [
      { name: "Shunt Resistance", formula: "S = (I_g · G) / (I - I_g)", description: "Parallel resistor to convert galvanometer into ammeter" },
      { name: "Series Multiplier", formula: "R_s = (V / I_g) - G", description: "Series resistor to convert galvanometer into voltmeter" },
      { name: "Solenoid Field", formula: "B = μ₀ n I", description: "Uniform magnetic field inside long solenoid" },
      { name: "Curie-Weiss Law", formula: "χ = C / (T - T_c)", description: "Susceptibility of ferromagnetic material above Curie temperature" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Connecting shunt in series or voltmeter multiplier in parallel.",
        correction: "Ammeter Shunt is ALWAYS in PARALLEL with Galvanometer. Voltmeter Multiplier is ALWAYS in SERIES."
      },
    ]
  },

  // 10. Semiconductor Electronics & Logic Gates
  {
    id: "note_phy_semiconductor_devices",
    chapter: "Semiconductor Electronics & Logic Gates",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Semiconductor Physics, P-N Junction, Zener Diode & Logic Gates Notes",
    summary: "Intrinsic vs Extrinsic Semiconductors (P-type and N-type), Depletion Layer, Forward & Reverse Bias, Half Wave & Full Wave Rectifiers, Zener Diode as Voltage Regulator, Optoelectronic Devices (LED, Photodiode, Solar Cell), and Boolean Logic Gates (AND, OR, NOT, NAND, NOR, XOR).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Semiconductors & P-N Junction Diode",
        points: [
          "Intrinsic Semiconductor (Pure Si, Ge): n_e = n_h = n_i. Conductivity σ = e (n_e μ_e + n_h μ_h).",
          "Extrinsic N-type: Doped with Pentavalent (P, As, Sb). Majority carriers = Electrons (n_e >> n_h), Donor energy level just below conduction band.",
          "Extrinsic P-type: Doped with Trivalent (B, Al, Ga, In). Majority carriers = Holes (n_h >> n_e), Acceptor level just above valence band.",
          "Mass Action Law: n_e · n_h = n_i² (always constant at thermal equilibrium).",
          "Forward Bias: P connected to Positive, N to Negative. Depletion layer width DECREASES, barrier height reduces (V_0 - V), conduction current flows easily.",
          "Reverse Bias: P connected to Negative, N to Positive. Depletion layer width INCREASES, barrier height rises (V_0 + V), only tiny minority leakage current flows (~μA).",
          "Rectifiers: Half-Wave Rectifier efficiency η_max = 40.6%, Ripple frequency = f. Full-Wave Rectifier η_max = 81.2%, Ripple frequency = 2f.",
        ],
        keyFormula: "n_e · n_h = n_i² | η_full_wave = 81.2% | Ripple freq_FW = 2f"
      },
      {
        title: "2. Zener Diode, Optoelectronics & Logic Gates",
        points: [
          "Zener Diode: Heavily doped P-N junction operated in REVERSE BREAKDOWN region, acts as constant Voltage Regulator.",
          "Photodiode: Operated in REVERSE bias to detect optical signals. Fast response, current proportional to light intensity.",
          "Light Emitting Diode (LED): Operated in FORWARD bias. Emits photons when electron-hole recombine. Energy bandgap E_g = h c / λ.",
          "Solar Cell: P-N junction operating with NO external bias (generates EMF from sunlight by photovoltaic effect).",
          "Logic Gates & Truth Tables:",
          "AND Gate: Y = A · B (High only when ALL inputs are High 1).",
          "OR Gate: Y = A + B (High when ANY input is High 1).",
          "NOT Gate: Y = A' (Inverts input, 0 -> 1, 1 -> 0).",
          "NAND Gate (Universal): Y = (A · B)' (Low only when both inputs are 1).",
          "NOR Gate (Universal): Y = (A + B)' (High only when both inputs are 0).",
          "XOR Gate: Y = A ⊕ B = A' B + A B' (High when inputs are DIFFERENT).",
          "De Morgan's Laws: (A + B)' = A' · B' and (A · B)' = A' + B'.",
        ],
        keyFormula: "De Morgan: (A + B)' = A' · B' | (A · B)' = A' + B' | Zener: V_out = V_Z",
        keyMnemonic: "NAND & NOR are Universal: Build all other gates using only NAND or only NOR."
      },
    ],
    quickRevisionPoints: [
      { en: "In semiconductor, conductivity increases with temperature (Negative Temperature Coefficient of resistance)." },
      { en: "Zener breakdown occurs in heavily doped diodes with thin depletion region; Avalanche breakdown occurs in lightly doped diodes with thick depletion region." },
    ],
    keyFormulasTable: [
      { name: "Mass Action Law", formula: "n_e · n_h = n_i²", description: "Product of electron and hole concentrations in thermal equilibrium" },
      { name: "LED Emission Wavelength", formula: "λ = h c / E_g", description: "Wavelength of light emitted by LED of bandgap E_g" },
      { name: "Zener Output", formula: "V_L = V_Z", description: "Constant regulated output voltage across load resistor" },
      { name: "XOR Logic", formula: "Y = A ⊕ B = A' B + A B'", description: "Exclusive OR logic expression" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Connecting Photodiode in forward bias or Zener regulator in forward bias.",
        correction: "Photodiodes and Zener Voltage Regulators MUST ALWAYS be operated in REVERSE BIAS."
      },
    ]
  },
];
