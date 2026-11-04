import { TopicNote } from "../../types";

export const PHYSICS_JEE_CET_EXTRA_NOTES: TopicNote[] = [
  // 1. Units, Dimensions, Error Analysis & Instruments
  {
    id: "note_phy_units_dimensions",
    chapter: "Units, Dimensions, Errors & Instruments",
    subject: "Physics",
    exams: ["MHT_CET", "JEE_MAIN", "NEET"],
    title: "Dimensional Analysis, Error Propagation, Vernier Caliper & Screw Gauge Master Sheet",
    summary: "High-yield guaranteed scoring chapter for JEE/CET/NEET covering Dimensions of fundamental & derived constants (G, h, ε₀, μ₀), Relative & Percentage errors, Vernier Least Count, and Screw Gauge Pitch & Zero Error corrections.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Dimensional Formulas & Same Dimension Sets",
        points: [
          "Universal Gravitational Constant G: F = G m₁ m₂ / r² => [G] = [M⁻¹ L³ T⁻²].",
          "Planck's Constant h: E = h ν => [h] = [M¹ L² T⁻¹] (Same dimensions as Angular Momentum L!).",
          "Permittivity of Free Space ε₀: F = (1/4πε₀) (q²/r²) => [ε₀] = [M⁻¹ L⁻³ T⁴ A²].",
          "Permeability of Free Space μ₀: c = 1 / √(μ₀ ε₀) => [μ₀] = [M¹ L¹ T⁻² A⁻²].",
          "Resistance R = [M¹ L² T⁻³ A⁻²], Capacitance C = [M⁻¹ L⁻² T⁴ A²], Inductance L = [M¹ L² T⁻² A⁻²].",
          "Same Dimension Pairs (Extremely High Frequency in JEE/CET):",
          "• [Work] = [Torque] = [Energy] = [Heat] = [M¹ L² T⁻²].",
          "• [Impulse] = [Linear Momentum] = [M¹ L¹ T⁻¹].",
          "• [Surface Tension] = [Surface Energy] = [Spring Constant k] = [M¹ L⁰ T⁻²].",
          "• [Stress] = [Pressure] = [Modulus of Elasticity] = [Energy Density] = [M¹ L⁻¹ T⁻²].",
          "• [Angular Momentum] = [Planck's Constant h] = [M¹ L² T⁻¹].",
          "• Dimensionless quantities [M⁰ L⁰ T⁰]: Refractive index, Strain, Dielectric constant, Relative density, Angle (radian), Solid angle (steradian), Reynolds number, Quality factor.",
          "• Characteristic Time Constant quantities: [R C] = [L / R] = [√(L C)] = Time [T¹].",
          "• Velocity of EM wave: [1 / √(μ₀ ε₀)] = [E / B] = Velocity [L¹ T⁻¹].",
        ],
        keyFormula: "[G] = [M⁻¹ L³ T⁻²] | [h] = [M¹ L² T⁻¹] | [RC] = [L/R] = [T¹]",
        keyMnemonic: "Remember: 'Heavy Plank Rocks Angular Momentum' -> Both h and L have dimensions [M¹ L² T⁻¹].",
        examTip: "In JEE/CET, to find dimensions of unknown constant in equations like (P + a/V²)(V - b) = RT: [a/V²] = [P] => [a] = [P V²] = [M¹ L⁵ T⁻²] and [b] = [V] = [L³]."
      },
      {
        title: "2. Error Analysis & Combination of Errors",
        points: [
          "Sum or Difference Z = A ± B: Absolute errors ALWAYS add up! ΔZ = ΔA + ΔB (maximum possible error).",
          "Product or Quotient Z = A · B or Z = A / B: Fractional/Relative errors ALWAYS add up! (ΔZ / Z) = (ΔA / A) + (ΔB / B).",
          "Power rule: If Z = A^p · B^q / C^r: Maximum fractional error: (ΔZ / Z) = p (ΔA / A) + q (ΔB / B) + r (ΔC / C).",
          "Percentage Error in Z: % Error = [ p (%A) + q (%B) + r (%C) ]. (Negative powers NEVER subtract, they always add!).",
          "Significant figures: Leading zeroes are never significant (0.0052 has 2 SF). Trailing zeroes after decimal are significant (5.200 has 4 SF). Zeroes between non-zero digits are significant (5002 has 4 SF).",
        ],
        keyFormula: "% Error in Z = p (%A) + q (%B) + r (%C)",
        keyMnemonic: "Golden Rule: 'Errors never cancel each other, they always compound (add)!'",
        examTip: "Typical JEE Question: If g = 4π² L / T² and error in L is 2%, error in T is 3%, then % error in g = 1(2%) + 2(3%) = 8%."
      },
      {
        title: "3. Vernier Caliper & Screw Gauge (Micrometer)",
        points: [
          "Vernier Caliper: If n divisions of Vernier Scale (VSD) equal (n - 1) divisions of Main Scale (MSD):",
          "Least Count (LC) = 1 MSD - 1 VSD = 1 MSD / n.",
          "Standard caliper: 1 MSD = 1 mm, 10 VSD = 9 MSD => LC = 1 mm - 0.9 mm = 0.1 mm = 0.01 cm.",
          "Total Reading = Main Scale Reading (MSR) + (VSD coincidence × LC) - (Zero Error).",
          "Screw Gauge (Micrometer):",
          "Pitch = Distance moved on main scale / Number of complete rotations of circular cap.",
          "Least Count (LC) = Pitch / Total Number of Circular Scale Divisions (CSD).",
          "Standard gauge: Pitch = 1 mm, CSD = 100 divisions => LC = 1 mm / 100 = 0.01 mm = 0.001 cm.",
          "Zero Error Correction: True Reading = Observed Reading - (Zero Error with proper sign).",
          "• Positive Zero Error (0 of circular scale lies below reference line): Zero Error is positive (+x), so we SUBTRACT it.",
          "• Negative Zero Error (0 of circular scale lies above reference line): Zero Error is negative (-x), so subtracting negative gives an ADDITION.",
        ],
        keyFormula: "LC_Vernier = 1 MSD - 1 VSD | LC_Screw = Pitch / Total CSD divisions",
        keyMnemonic: "Correct Reading = Observed Reading - (Zero Error WITH sign).",
        examTip: "In JEE Main: If n divisions of Vernier scale coincide with m divisions of main scale, LC = (1 - m/n) MSD."
      },
    ],
    quickRevisionPoints: [
      { en: "[Work] = [Torque] = [M¹ L² T⁻²], but work is scalar while torque is vector." },
      { en: "Dimension of 1 / √(μ₀ ε₀) is velocity of light [L¹ T⁻¹] = 3 × 10⁸ m/s." },
      { en: "In calculating percentage errors, exponents always multiply: % in A³ is 3 × (% in A)." },
      { en: "Zero error correction rule: True Reading = Observed Reading - (Zero Error)." },
    ],
    keyFormulasTable: [
      { name: "Universal Gravitational Const", formula: "[G] = [M⁻¹ L³ T⁻²]", description: "F = G m₁ m₂ / r²" },
      { name: "Planck's Constant", formula: "[h] = [M¹ L² T⁻¹]", description: "E = h ν (Same as Angular Momentum)" },
      { name: "Power Error Formula", formula: "ΔZ/Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C)", description: "For Z = A^p B^q / C^r" },
      { name: "Screw Gauge LC", formula: "LC = Pitch / CSD divisions", description: "Standard: 1 mm / 100 = 0.01 mm" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Subtracting error terms when quantities are in denominator.",
        correction: "Errors NEVER subtract in worst-case analysis. Even for C in denominator (A / C), % error = %A + %C."
      },
    ]
  },

  // 2. Work, Energy, Power & Collisions
  {
    id: "note_phy_work_energy_power",
    chapter: "Work, Energy, Power & Collisions",
    subject: "Physics",
    exams: ["MHT_CET", "JEE_MAIN", "NEET"],
    title: "Work-Energy Theorem, Conservative Forces, Power & 1D/2D Collisions Sheet",
    summary: "Comprehensive guide for mechanics scoring: Work done by constant & variable forces, Potential energy curves, Work-Energy Theorem (W_net = ΔK), Coefficient of Restitution (e), and Elastic/Inelastic collision velocities.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Work Done & Work-Energy Theorem",
        points: [
          "Work done by constant force: W = F · s = F s cos θ. Scalar quantity. Positive when θ < 90°, Zero when θ = 90° (centripetal force does zero work!), Negative when θ > 90° (friction does negative work).",
          "Work done by variable force: W = ∫ F · dx = Area under Force-Displacement (F-x) graph.",
          "Work done by spring force: W_spring = - (1/2) k (x₂² - x₁²). Work done by external agent stretching spring from 0 to x: W_ext = +(1/2) k x².",
          "Work-Energy Theorem: Total work done by ALL forces (conservative + non-conservative + external + pseudo) acting on a particle equals the change in its kinetic energy:",
          "W_net = W_c + W_nc + W_ext = ΔK = (1/2) m (v² - u²). Valid in all inertial and non-inertial frames!",
        ],
        keyFormula: "W_net = ΔK = (1/2) m (v² - u²) | W = ∫ F dx",
        keyMnemonic: "Work-Energy is King: When kinematics gets messy with time/angles, use W_net = ΔK directly.",
        examTip: "In circular motion, magnetic Lorentz force (F = q v × B), and normal reaction on stationary surfaces, work done is ALWAYS ZERO because force is perpendicular to displacement."
      },
      {
        title: "2. Conservative Forces, Potential Energy & Power",
        points: [
          "Conservative Force: Work done in a closed path is zero (∮ F · dr = 0). Work done depends only on initial and final positions, independent of path. Examples: Gravitational, Electrostatic, Spring force.",
          "Relation between Conservative Force and Potential Energy: F = - dU / dx (or F = - ∇U = - [∂U/∂x î + ∂U/∂y ĵ + ∂U/∂z k̂]).",
          "Equilibrium Conditions (where F = -dU/dx = 0):",
          "• Stable Equilibrium: U is minimum, d²U/dx² > 0 (Small displacement produces restoring force, oscillates).",
          "• Unstable Equilibrium: U is maximum, d²U/dx² < 0 (Small displacement drives particle away).",
          "• Neutral Equilibrium: U is constant, d²U/dx² = 0.",
          "Power: Rate of doing work. Instantaneous Power P = dW / dt = F · v = F v cos θ. SI unit: Watt (1 W = 1 J/s). 1 Horsepower (hp) = 746 W.",
          "If a pump lifts water of mass m to height h in time t: Power P = m g h / t = (ρ V g h) / t.",
          "If water emerges with velocity v from pipe of area A: Kinetic power = (1/2) (dm/dt) v² = (1/2) ρ A v³ (proportional to v³!).",
        ],
        keyFormula: "F = - dU/dx | P = F · v | Pipe Power = (1/2) ρ A v³",
        keyMnemonic: "Stable vs Unstable: Stable sits at bottom of potential valley (d²U/dx² > 0).",
        examTip: "NEET/JEE PYQ: If power delivered to a car of mass m is constant P, then velocity v ∝ t^(1/2), displacement s ∝ t^(3/2), and force F ∝ t^(-1/2)."
      },
      {
        title: "3. Collisions & Coefficient of Restitution",
        points: [
          "Conservation of Linear Momentum: In ALL collisions (elastic or inelastic), total linear momentum is conserved because internal collision forces cancel: m₁ u₁ + m₂ u₂ = m₁ v₁ + m₂ v₂.",
          "Coefficient of Restitution (e): e = (Relative velocity of separation) / (Relative velocity of approach) = (v₂ - v₁) / (u₁ - u₂).",
          "• Perfectly Elastic Collision: e = 1. Both momentum AND kinetic energy are conserved.",
          "• Inelastic Collision: 0 < e < 1. Momentum conserved, Kinetic energy lost (as heat/sound).",
          "• Perfectly Inelastic Collision: e = 0. Bodies stick together and move with common velocity: v_common = (m₁ u₁ + m₂ u₂) / (m₁ + m₂). Maximum kinetic energy loss!",
          "Final velocities in 1D Elastic Collision (e = 1):",
          "v₁ = [ (m₁ - m₂) / (m₁ + m₂) ] u₁ + [ 2 m₂ / (m₁ + m₂) ] u₂.",
          "v₂ = [ (m₂ - m₁) / (m₁ + m₂) ] u₂ + [ 2 m₁ / (m₁ + m₂) ] u₁.",
          "Special Cases (1D Elastic):",
          "• If m₁ = m₂ (equal masses): Velocities are EXCHANGED! (v₁ = u₂, v₂ = u₁).",
          "• If target m₂ is at rest (u₂ = 0) and m₁ >> m₂ (heavy striker): v₁ ≈ u₁, v₂ ≈ 2 u₁.",
          "• If heavy target m₂ >> m₁ is at rest (u₂ = 0): v₁ ≈ - u₁ (ball rebounds with same speed), v₂ ≈ 0.",
          "Bouncing ball on floor with restitution e: Height after n bounces: h_n = e^(2n) h₀. Velocity after n bounces: v_n = e^n v₀. Total distance before stopping: H_total = h₀ [ (1 + e²) / (1 - e²) ].",
        ],
        keyFormula: "v₁ = [(m₁-m₂)/(m₁+m₂)]u₁ + [2m₂/(m₁+m₂)]u₂ | h_n = e^(2n) h₀",
        keyMnemonic: "Equal masses elastic collision = Velocity swap! (Billards balls exchange speeds).",
        examTip: "Loss of Kinetic Energy in 1D inelastic collision: ΔK = (1/2) [ (m₁ m₂) / (m₁ + m₂) ] (u₁ - u₂)² (1 - e²). When e = 0, loss is maximum."
      },
    ],
    quickRevisionPoints: [
      { en: "Work-energy theorem (W_net = ΔK) is always valid regardless of the nature of forces involved." },
      { en: "Stable equilibrium occurs at the minimum of the potential energy curve (d²U/dx² > 0)." },
      { en: "In 1D elastic collision between two equal masses, their velocities are simply swapped." },
      { en: "A bouncing ball reaches height h_n = e^(2n) h₀ after n bounces on a fixed hard floor." },
    ],
    keyFormulasTable: [
      { name: "Work-Energy Theorem", formula: "W_all = ΔK = (1/2)m(v² - u²)", description: "Fundamental law of mechanics" },
      { name: "Force from Potential Energy", formula: "F = - dU/dx", description: "Conservative force relationship" },
      { name: "Restitution Coefficient", formula: "e = (v₂ - v₁) / (u₁ - u₂)", description: "e = 1 for elastic, e = 0 for perfectly inelastic" },
      { name: "Kinetic Energy Loss", formula: "ΔK = (1/2)[m₁m₂/(m₁+m₂)](u₁-u₂)²(1-e²)", description: "Loss in partially/perfectly inelastic collisions" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming kinetic energy is conserved in all collisions.",
        correction: "Kinetic energy is conserved ONLY in perfectly elastic collisions (e = 1). In inelastic collisions, KE is lost as heat/sound, though linear momentum is ALWAYS conserved."
      },
    ]
  },

  // 3. Wave Optics: YDSE, Diffraction & Polarization
  {
    id: "note_phy_wave_optics",
    chapter: "Wave Optics, Interference & Diffraction",
    subject: "Physics",
    exams: ["MHT_CET", "JEE_MAIN", "NEET"],
    title: "Huygens' Principle, YDSE, Single Slit Diffraction & Brewster's Law Sheet",
    summary: "Complete Wave Optics revision: Wavefronts, Path difference vs Phase difference, YDSE Fringe width β = λD/d, Intensity formula I = 4I₀ cos²(φ/2), Single-slit central maxima width 2λD/a, and Malus' Law.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Huygens' Wave Theory & Coherent Sources",
        points: [
          "Wavefront: Locus of all points in a medium vibrating in the same phase. Shape depends on light source: Point source -> Spherical wavefront; Line source (slit) -> Cylindrical wavefront; Source at infinity -> Plane wavefront.",
          "Huygens' Principle: Every point on a primary wavefront acts as a secondary source of spherical wavelets spreading in all directions with speed of light. The forward envelope tangent to these secondary wavelets gives the new wavefront.",
          "Laws of Reflection and Refraction proved by wave theory: In refraction, v = c / n => λ = λ₀ / n (Frequency ν remains strictly CONSTANT when light enters another medium!).",
          "Coherent Sources: Sources emitting light waves of identical frequency, wavelength, and a CONSTANT (or zero) phase difference. Two independent light bulbs can NEVER be coherent.",
        ],
        keyFormula: "v = c / n | λ = λ₀ / n | Frequency ν = Constant across media",
        keyMnemonic: "Color of light is determined by its Frequency (ν), NOT its wavelength!",
        examTip: "NEET/MHT-CET Question: When light travels from air to glass, frequency remains constant, while speed and wavelength decrease by a factor of n."
      },
      {
        title: "2. Young's Double Slit Experiment (YDSE)",
        points: [
          "Path difference: Δx = (y · d) / D, where d = distance between slits, D = distance to screen, y = distance from central bright fringe.",
          "Phase difference: φ = (2π / λ) · Δx.",
          "Constructive Interference (Bright Fringes): Δx = n λ (n = 0, 1, 2...). Position: y_n = n (λ D / d).",
          "Destructive Interference (Dark Fringes): Δx = (2n - 1) (λ / 2) (n = 1, 2...). Position: y'_n = (2n - 1) (λ D / 2d).",
          "Fringe Width β: Distance between any two consecutive bright (or dark) fringes: β = λ D / d. All bright and dark fringes are equally spaced.",
          "Resultant Intensity of two coherent waves with individual intensities I₁ and I₂: I = I₁ + I₂ + 2√(I₁ I₂) cos φ.",
          "If I₁ = I₂ = I₀: I_resultant = 4 I₀ cos²(φ / 2). Maximum intensity I_max = 4 I₀ (at φ = 0, 2π), Minimum intensity I_min = 0 (at φ = π, 3π).",
          "Ratio of Intensities: I_max / I_min = [ (√I₁ + √I₂) / (√I₁ - √I₂) ]² = [ (a₁ + a₂) / (a₁ - a₂) ]².",
          "YDSE in a liquid of refractive index μ: Wavelength decreases to λ' = λ / μ, so fringe width decreases: β' = β / μ.",
          "Introduction of thin mica sheet of thickness t and refractive index μ in one beam: Entire fringe pattern shifts by distance: Δy = [ (μ - 1) t D ] / d = [ (μ - 1) t ] · (β / λ). Fringe width remains unchanged!",
        ],
        keyFormula: "β = λ D / d | I = 4 I₀ cos²(φ/2) | Shift Δy = (μ - 1) t D / d",
        keyMnemonic: "Wider Screen (D↑) or Longer Red Wave (λ↑) -> Fat Fringes (β↑).",
        examTip: "In white light YDSE: Central fringe is White; the nearest bright fringe on either side is Violet, while outermost is Red."
      },
      {
        title: "3. Single Slit Diffraction & Brewster's Law of Polarization",
        points: [
          "Single Slit Fraunhofer Diffraction (Slit width 'a'):",
          "Condition for Minima: a sin θ = n λ => sin θ_n ≈ n λ / a (n = ±1, ±2, ±3...). Note: For diffraction minima, path difference is n λ (opposite of interference!).",
          "Condition for Secondary Maxima: a sin θ = (2n + 1) (λ / 2) (n = 1, 2...).",
          "Angular width of Central Maximum: 2 θ₁ = 2 λ / a.",
          "Linear width of Central Maximum on screen: W_central = 2 λ D / a = 2 β_diffraction (Twice the width of secondary maxima!).",
          "Polarization: Confirms that light is a TRANSVERSE wave. Longitudinal sound waves cannot be polarized.",
          "Malus' Law: When polarized light of intensity I₀ passes through an analyzer at angle θ to polarizer transmission axis: I = I₀ cos² θ.",
          "Brewster's Law: When unpolarized light reflects at polarizing angle (Brewster's angle i_p), reflected light is completely plane polarized perpendicular to plane of incidence:",
          "tan i_p = n (or n₂ / n₁). At this angle, the reflected ray and refracted ray are mutually PERPENDICULAR (i_p + r = 90°).",
        ],
        keyFormula: "Central Diffraction Width = 2 λ D / a | tan i_p = n | I = I₀ cos² θ",
        keyMnemonic: "Diffraction Central Maximum = 2 × Normal Width (Takes up double space).",
        examTip: "JEE Main PYQ: If Brewster angle is 60°, then refractive index n = tan 60° = √3 ≈ 1.732, and angle of refraction r = 90° - 60° = 30°."
      },
    ],
    quickRevisionPoints: [
      { en: "Frequency of light never changes when light passes from one medium to another." },
      { en: "In YDSE, fringe width β = λ D / d is directly proportional to D and λ, inversely to d." },
      { en: "Central diffraction maximum has width 2λD/a, which is exactly double the width of secondary maxima." },
      { en: "Brewster's angle satisfies tan i_p = n, and reflected ray is perpendicular to refracted ray." },
    ],
    keyFormulasTable: [
      { name: "YDSE Fringe Width", formula: "β = λ D / d", description: "Distance between adjacent bright fringes" },
      { name: "Central Diffraction Width", formula: "W = 2 λ D / a", description: "Width of central maximum in single slit" },
      { name: "Brewster's Law", formula: "tan i_p = n", description: "Complete polarization by reflection" },
      { name: "Malus' Law", formula: "I = I₀ cos² θ", description: "Intensity transmitted through analyzer" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Applying the interference formula condition (nλ for bright) to single-slit diffraction.",
        correction: "In single-slit diffraction, a sin θ = nλ gives MINIMA (dark fringes), while in YDSE Δx = nλ gives MAXIMA (bright fringes)."
      },
    ]
  },

  // 4. Kinematics: 1D & 2D Motion, Projectile & Relative Velocity
  {
    id: "note_phy_kinematics",
    chapter: "Kinematics: 1D & 2D Motion & Projectile",
    subject: "Physics",
    exams: ["MHT_CET", "JEE_MAIN", "NEET"],
    title: "Equations of Motion, Projectile Trajectory, Max Height, Range & Relative Velocity Sheet",
    summary: "High-yield mechanics foundation covering Galileo's ratio of distances (1:3:5...), Projectile Time of Flight T = (2u sin θ)/g, Maximum Height H = (u² sin² θ)/2g, Range R = (u² sin 2θ)/g, Equation of trajectory, and River-boat relative velocity problems.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. 1D Motion with Constant Acceleration & Free Fall",
        points: [
          "Kinematic Equations for constant acceleration 'a':",
          "1. v = u + a t",
          "2. s = u t + (1/2) a t²",
          "3. v² = u² + 2 a s",
          "4. Distance traveled in n-th second: s_nth = u + (a / 2) (2n - 1).",
          "Galileo's Law of Odd Numbers: For a body released from rest (u = 0) under uniform acceleration (g), distances traveled in equal successive time intervals are in ratio: s₁ : s₂ : s₃ : s₄ = 1 : 3 : 5 : 7 : ...",
          "Free Fall from height h (u = 0): Time to reach ground: t = √(2h / g). Velocity on striking ground: v = √(2 g h).",
          "Body thrown vertically upwards with speed u: Maximum height H = u² / (2g). Time of ascent = Time of descent = u / g. Total time of flight T = 2u / g. Speed on returning to thrower = u (downwards).",
          "Stopping distance for vehicle: s_stop = u² / (2 a) ∝ u² (Doubling the speed quadruples the stopping distance!).",
        ],
        keyFormula: "s_nth = u + (a/2)(2n - 1) | v = √(2gh) | Stopping s ∝ u²",
        keyMnemonic: "Remember Galileo: Distances in consecutive seconds = 1x, 3x, 5x, 7x... from rest.",
        examTip: "In MHT-CET: A ball dropped from top of tower falls h/2 in last second. Height of tower h is obtained from h = (1/2)gt² and h/2 = (1/2)g(t-1)² => t = 2 ± √2 s => h ≈ 57 m."
      },
      {
        title: "2. 2D Motion: Projectile Motion from Ground",
        points: [
          "Initial velocity u at angle θ with horizontal: Horizontal component u_x = u cos θ (constant, a_x = 0); Vertical component u_y = u sin θ (under constant downward acceleration a_y = -g).",
          "Time of Flight T: T = (2 u_y) / g = (2 u sin θ) / g. Time to reach maximum height t_h = T / 2 = (u sin θ) / g.",
          "Maximum Height H: H = (u_y²) / (2g) = (u² sin² θ) / (2g).",
          "Horizontal Range R: R = u_x · T = (u² sin 2θ) / g = (2 u_x u_y) / g.",
          "Maximum Range: Occurs at θ = 45°: R_max = u² / g. At this angle, Maximum Height H = R_max / 4.",
          "Complementary Angles: Range is identical for angles θ and (90° - θ): R_θ = R_(90-θ). If T₁ and T₂ are times of flight for these complementary angles: R = (1/2) g T₁ T₂.",
          "Relation between Range and Max Height: R = 4 H cot θ => tan θ = 4 H / R.",
          "Equation of Trajectory (Parabola): y = x tan θ - [ g x² / (2 u² cos² θ) ] = x tan θ [ 1 - (x / R) ].",
          "Velocity at any instant t: v = √(v_x² + v_y²) = √[ (u cos θ)² + (u sin θ - g t)² ]. At highest point, velocity is MINIMUM and purely horizontal: v_top = u cos θ (NOT zero!).",
        ],
        keyFormula: "T = (2u sin θ)/g | H = (u² sin² θ)/2g | R = (u² sin 2θ)/g | tan θ = 4H/R",
        keyMnemonic: "Remember: 'Four Heights on Range' -> tan θ = 4H / R.",
        examTip: "NEET/JEE Question: If a projectile is fired at 45°, R = 4H. Kinetic energy at top is K_top = (1/2) m (u cos 45°)² = K_initial / 2."
      },
      {
        title: "3. Relative Velocity & River-Boat Problems",
        points: [
          "Relative Velocity in 1D: Velocity of A with respect to B: v_AB = v_A - v_B.",
          "• Moving in same direction: |v_AB| = v_A - v_B.",
          "• Moving in opposite directions: |v_AB| = v_A + v_B.",
          "River-Boat Crossing (River speed v_r, Boat speed in still water v_b, width of river d):",
          "1. Shortest Time to cross river: Steer boat directly perpendicular to flow (θ = 90° to bank):",
          "Time t_min = d / v_b. Drift along the bank during crossing: x = v_r · t_min = (v_r · d) / v_b.",
          "2. Shortest Path (Zero Drift): Boat must reach directly opposite bank (drift x = 0). Boat must head upstream at angle α to river flow where sin θ = v_r / v_b (only possible if v_b > v_r):",
          "Crossing time: t = d / √(v_b² - v_r²).",
          "Rain-Man Problem: Velocity of rain relative to walking man: v_rm = v_r - v_m. To avoid getting wet, man must hold umbrella along the direction of relative velocity vector v_rm: tan θ = v_man / v_rain.",
        ],
        keyFormula: "t_min = d / v_b | Zero Drift Angle: sin θ = v_r / v_b | tan θ_umbrella = v_m / v_r",
        keyMnemonic: "Shortest time = Aim straight across (don't fight current). Shortest path = Aim upstream (fight current).",
        examTip: "If swimmer speed in still water is less than river flow speed (v_b < v_r), zero drift is physically IMPOSSIBLE."
      },
    ],
    quickRevisionPoints: [
      { en: "At the highest point of projectile motion, vertical velocity is zero, but horizontal velocity is u cos θ." },
      { en: "Range of projectile is identical for complementary launch angles θ and (90° - θ)." },
      { en: "Relation between Range and Max Height: tan θ = 4 H / R." },
      { en: "For minimum time crossing of river, swimmer must head directly across perpendicular to river flow." },
    ],
    keyFormulasTable: [
      { name: "Time of Flight", formula: "T = (2 u sin θ) / g", description: "Total airborne time of projectile" },
      { name: "Maximum Height", formula: "H = (u² sin² θ) / (2 g)", description: "Peak vertical altitude reached" },
      { name: "Horizontal Range", formula: "R = (u² sin 2θ) / g", description: "Maximum at 45° where R_max = u²/g" },
      { name: "Trajectory Equation", formula: "y = x tan θ [ 1 - x/R ]", description: "Parabolic trajectory in terms of Range R" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming speed at highest point of projectile is zero.",
        correction: "Only the vertical component (v_y = 0) becomes zero. The horizontal component remains v_x = u cos θ, so total velocity is u cos θ."
      },
    ]
  },
];
