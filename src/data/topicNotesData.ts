import { TopicNote } from "../types";

export const TOPIC_NOTES_DATA: TopicNote[] = [
  // ==========================================
  // PHYSICS: Rotational Dynamics
  // ==========================================
  {
    id: "note_phy_rotational_dynamics",
    chapter: "Rotational Dynamics",
    chapterMr: "परिपत्रक गती आणि परिभ्रमण गती (Rotational Dynamics)",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Complete Rotational Dynamics & Circular Motion Revision Note",
    titleMr: "परिपत्रक आणि परिभ्रमण गती संपूर्ण रिव्हिजन नोट्स",
    summary: "Comprehensive guide covering Centripetal Force, Banking of Roads, Vertical Circular Motion, Moment of Inertia Theorems, Torque, and Rolling Motion.",
    summaryMr: "अभिकेंद्री बल, रस्त्याचे बँकिंग, उभ्या वर्तुळाकार गती, जडत्व आघूर्ण (MI) ची प्रमेये, टॉर्क आणि रोलिंग गती या सर्वांची सविस्तर सूत्रे व स्पष्टीकरणे.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Uniform Circular Motion & Banking of Roads",
        titleMr: "१. एकसमान वर्तुळाकार गती व रस्त्याचे बँकिंग",
        points: [
          "Centripetal Acceleration: a_c = v²/r = ω²r = vω (directed towards center).",
          "Centripetal Force: F_c = m v² / r = m ω² r.",
          "Most Safe (Optimum) Speed on Banked Road: v_0 = √(r g tan θ). At this speed, friction is zero.",
          "Maximum Safe Speed with friction μ_s: v_max = √[ r g (μ_s + tan θ) / (1 - μ_s tan θ) ].",
          "Minimum Safe Speed with friction μ_s: v_min = √[ r g (tan θ - μ_s) / (1 + μ_s tan θ) ].",
          "Conical Pendulum: Period T = 2π √(L cos θ / g) = 2π √(h / g). Frequency n = (1/2π) √(g / L cos θ).",
        ],
        pointsMr: [
          "अभिकेंद्री प्रवेग (Centripetal Acceleration): a_c = v²/r = ω²r (केंद्राच्या दिशेने).",
          "बँक केलेल्या वळणावर सुरक्षित कमाल वेग (Optimum Speed): v = √(r g tan θ).",
          "घर्षण (μ_s) सह कमाल वेग: v_max = √[ r g (μ_s + tan θ) / (1 - μ_s tan θ) ].",
          "शंकू लंबक (Conical Pendulum) आवर्तकाळ: T = 2π √(L cos θ / g).",
        ],
        keyFormula: "v = √(r g tan θ) | T = 2π √(L cos θ / g)",
        keyMnemonic: "Remember: 'Top speed needs Plus upstairs' -> (tan θ + μ) in numerator for v_max.",
        examTip: "In MHT-CET/NEET, if road is frictionless, directly use tan θ = v² / (r g).",
        examTipMr: "घर्षणरहित रस्त्यासाठी सरळ tan θ = v² / (rg) वापरा.",
      },
      {
        title: "2. Vertical Circular Motion (VCM)",
        titleMr: "२. उभ्या प्रतलातील वर्तुळाकार गती (VCM)",
        points: [
          "Velocity at Top (Highest Point H): v_H = √(r g). Tension T_H = 0.",
          "Velocity at Bottom (Lowest Point L): v_L = √(5 r g). Tension T_L = 6 mg.",
          "Velocity at Mid-way (Horizontal M): v_M = √(3 r g). Tension T_M = 3 mg.",
          "Difference in Tension between Bottom and Top: T_L - T_H = 6 mg (always constant).",
        ],
        pointsMr: [
          "सर्वोच्च बिंदूवरील किमान वेग (Top point): v_H = √(r g), ताण T_H = 0.",
          "सर्वात खालच्या बिंदूवरील किमान वेग (Bottom point): v_L = √(5 r g), ताण T_L = 6 mg.",
          "तळातील आणि शिखरावरील ताणातील फरक: T_L - T_H = 6 mg (नेहमी ६ पट वस्तुमान×गुरुत्व).",
        ],
        keyFormula: "v_L = √(5rg) | v_H = √(rg) | T_L - T_H = 6mg",
        examTip: "Mass tied to rigid light rod: v_H = 0, v_L = √(4 r g) = 2√(r g), T_L - T_H = 6 mg.",
      },
      {
        title: "3. Moment of Inertia & Theorems",
        titleMr: "३. जडत्व आघूर्ण (Moment of Inertia) आणि प्रमेये",
        points: [
          "Radius of Gyration: k = √(I / M) => I = M k².",
          "Parallel Axes Theorem: I_O = I_C + M h² (axis through C must pass through center of mass).",
          "Perpendicular Axes Theorem (only for planar 2D laminas): I_z = I_x + I_y.",
          "Ring (about central axis): I = M R², Disc: I = (1/2) M R².",
          "Solid Sphere: I = (2/5) M R², Hollow Sphere: I = (2/3) M R².",
          "Solid Cylinder: I = (1/2) M R², Thin Rod (center): I = (1/12) M L².",
        ],
        pointsMr: [
          "परिभ्रमण त्रिज्या (Radius of Gyration): k = √(I / M) म्हणजेच I = M k².",
          "समांतर अक्ष प्रमेय (Parallel Axes Theorem): I_O = I_C + M h².",
          "लंब अक्ष प्रमेय (Perpendicular Axes Theorem - 2D साठी): I_z = I_x + I_y.",
          "चकती (Disc): I = (1/2) M R², घन गोल (Solid Sphere): I = (2/5) M R², पोकळ गोल (Hollow Sphere): I = (2/3) M R².",
        ],
        keyFormula: "I_O = I_C + M h² | I_z = I_x + I_y | I = M k²",
        keyMnemonic: "Spheres: Solid (2/5 = 0.4) is smaller MI than Hollow (2/3 = 0.67).",
      },
      {
        title: "4. Rolling Motion on an Inclined Plane",
        titleMr: "४. उतरत्या प्रतलावर फिरणाऱ्या वस्तूची गती (Rolling Motion)",
        points: [
          "Total Kinetic Energy: E_total = K_trans + K_rot = (1/2) M v² (1 + k²/R²).",
          "Linear Acceleration down incline θ: a = (g sin θ) / (1 + k²/R²).",
          "Velocity at bottom: v = √[ (2 g h) / (1 + k²/R²) ].",
          "Order of arrival at bottom (fastest to slowest): Solid Sphere > Disc/Solid Cylinder > Hollow Sphere > Ring/Hollow Cylinder.",
        ],
        pointsMr: [
          "एकूण गतिज ऊर्जा: E = (1/2) M v² (1 + k²/R²).",
          "उतरणीवरील प्रवेग: a = (g sin θ) / (1 + k²/R²).",
          "तळाशी सर्वात आधी कोण पोहोचते? घन गोल (Solid Sphere) > चकती (Disc) > पोकळ गोल > कडे (Ring).",
        ],
        keyFormula: "a = (g sin θ) / (1 + k²/R²) | v = √[ 2gh / (1 + k²/R²) ]",
      },
    ],
    quickRevisionPoints: [
      {
        en: "Angular momentum is conserved (L = I ω = constant) when net external torque τ_ext = 0.",
        mr: "बाह्य टॉर्क शून्य (τ = 0) असल्यास कोनीय संवेग स्थिर राहतो (L = I ω = स्थिरांक).",
      },
      {
        en: "Kinetic energy of rotation: E_rot = (1/2) I ω² = L² / (2I).",
        mr: "परिभ्रमण गतिज ऊर्जा: E_rot = (1/2) I ω² = L² / (2I).",
      },
      {
        en: "Torque-Angular Acceleration relation: τ = I α = dL/dt.",
        mr: "टॉर्क आणि कोनीय प्रवेग: τ = I α = dL/dt.",
      },
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
        mistakeMr: "समांतर अक्ष प्रमेयात I_C च्या जागी गुरुत्वमध्य नसणारा कोणताही इतर अक्ष वापरणे.",
        correction: "I_C MUST always be the axis passing strictly through the Center of Mass.",
        correctionMr: "I_C हा अक्ष अनिवार्यपणे वस्तूच्या गुरुत्वमध्यामधूनच (Center of Mass) गेलेला असावा.",
      },
      {
        mistake: "Confusing Radius of Gyration (k) with Radius of Object (R).",
        mistakeMr: "परिभ्रमण त्रिज्या (k) आणि वस्तूची प्रत्यक्ष त्रिज्या (R) एकच समजणे.",
        correction: "For a disc, k = R/√2, so k²/R² = 1/2. For sphere, k²/R² = 2/5.",
        correctionMr: "चकतीसाठी k²/R² = 1/2 आणि घन गोलासाठी 2/5 असते.",
      },
    ],
  },

  // ==========================================
  // PHYSICS: Thermodynamics & Kinetic Theory
  // ==========================================
  {
    id: "note_phy_thermo",
    chapter: "Thermodynamics & Kinetic Theory",
    chapterMr: "उष्णतागतिकी आणि वायूंचा गतिज सिद्धांत (Thermodynamics)",
    subject: "Physics",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Thermodynamics & KTG Complete Fast Track Notes",
    titleMr: "उष्णतागतिकी आणि गतिज सिद्धांत रिव्हिजन नोट्स",
    summary: "First Law of Thermodynamics, Isothermal, Adiabatic, Isobaric, Isochoric processes, Carnot Engine Efficiency, and Mean Free Path.",
    summaryMr: "उष्णतागतिकीचा पहिला नियम, समतापी, रुद्धोष्म, समदाब प्रक्रिया, कार्नो इंजिन कार्यक्षमता आणि सरासरी मुक्त मार्ग.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. First Law & Thermodynamic Processes",
        titleMr: "१. पहिला नियम व विविध प्रक्रिया",
        points: [
          "First Law of Thermodynamics: ΔQ = ΔU + ΔW, where ΔU = n C_v ΔT.",
          "Work done in general: W = ∫ P dV (Area under P-V indicator diagram).",
          "Isothermal Process (T = const, ΔU = 0): W = n R T ln(V2 / V1) = 2.303 n R T log10(P1 / P2).",
          "Adiabatic Process (ΔQ = 0, P V^γ = const): W = (P1 V1 - P2 V2) / (γ - 1) = n R (T1 - T2) / (γ - 1).",
          "Isochoric Process (V = const, ΔW = 0): ΔQ = ΔU = n C_v ΔT.",
          "Isobaric Process (P = const): W = P (V2 - V1) = n R ΔT. ΔQ = n C_p ΔT.",
        ],
        pointsMr: [
          "पहिला नियम: ΔQ = ΔU + ΔW (येथे ΔU = n C_v ΔT).",
          "समतापी प्रक्रिया (T स्थिर, ΔU = 0): W = 2.303 n R T log10(V2 / V1).",
          "रुद्धोष्म प्रक्रिया (ΔQ = 0): W = n R (T1 - T2) / (γ - 1).",
          "समदाब प्रक्रिया (P स्थिर): W = P ΔV = n R ΔT.",
        ],
        keyFormula: "ΔQ = ΔU + ΔW | W_iso = n R T ln(V2/V1) | P V^γ = const",
      },
      {
        title: "2. Heat Engines, Refrigerators & Carnot Cycle",
        titleMr: "२. उष्मा इंजिन आणि कार्नो सायकल",
        points: [
          "Efficiency of Heat Engine: η = W / Q1 = 1 - (Q2 / Q1) = 1 - (T2 / T1).",
          "Coefficient of Performance (COP) of Refrigerator: β = Q2 / W = T2 / (T1 - T2).",
          "Relation between η and β: β = (1 - η) / η.",
          "Mayer's Relation: C_p - C_v = R (for 1 mole) or c_p - c_v = R / M (per gram).",
          "Adiabatic exponent γ = C_p / C_v = 1 + 2/f (Monoatomic: γ = 5/3, Diatomic: γ = 7/5).",
        ],
        pointsMr: [
          "कार्नो इंजिन कार्यक्षमता: η = 1 - T_sink / T_source = 1 - T2/T1.",
          "रेफ्रिजरेटरचा COP (β): β = T2 / (T1 - T2).",
          "मेयरचे सूत्र: C_p - C_v = R.",
          "γ चे मूल्य: एकअणुक (Monoatomic) = 5/3 (1.67), द्विअणुक (Diatomic) = 7/5 (1.40).",
        ],
        keyFormula: "η = 1 - T2/T1 | β = T2 / (T1 - T2) | C_p - C_v = R",
        examTip: "Always convert temperatures to Kelvin (K = °C + 273.15) before calculating Carnot efficiency.",
      },
      {
        title: "3. Kinetic Theory of Gases (KTG)",
        titleMr: "३. वायूंचा गतिज सिद्धांत (KTG)",
        points: [
          "Gas Pressure: P = (1/3) ρ v_rms² = (1/3) (N m / V) v_rms².",
          "Root Mean Square Velocity: v_rms = √(3 R T / M) = √(3 k_B T / m).",
          "Average Velocity: v_avg = √(8 R T / π M), Most Probable Velocity: v_mp = √(2 R T / M).",
          "Ratio: v_mp : v_avg : v_rms = √2 : √(8/π) : √3 = 1 : 1.128 : 1.224.",
          "Mean Free Path: λ = 1 / (√2 π n d²), where n = N/V and d is molecular diameter.",
        ],
        pointsMr: [
          "दाब सूत्र: P = (1/3) ρ v_rms².",
          "RMS वेग: v_rms = √(3 R T / M).",
          "वेगांचे गुणोत्तर: v_mp : v_avg : v_rms = √2 : √(8/π) : √3.",
          "सरासरी मुक्त मार्ग (Mean Free Path): λ = 1 / (√2 π n d²).",
        ],
        keyFormula: "v_rms = √(3RT/M) | λ = 1 / (√2 π n d²)",
        keyMnemonic: "RAM -> RMS (highest) > Average > Most Probable (lowest).",
      },
    ],
    quickRevisionPoints: [
      { en: "In cyclic process, total internal energy change ΔU = 0, so net Q = net W.", mr: "चक्रीय प्रक्रियेमध्ये (Cyclic process) ΔU = 0, त्यामुळे निव्वळ Q = निव्वळ W." },
      { en: "Slope of Adiabatic curve on P-V diagram is γ times steeper than Isothermal curve (Slope_ad = γ × Slope_iso).", mr: "P-V आलेखावर रुद्धोष्म वक्राचा उतार समतापी वक्रापेक्षा γ पट तीव्र असतो." },
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
        mistakeMr: "कार्नो सूत्रात तापमानाची व्हॅल्यू सेल्सिअस (°C) मध्ये टाकणे.",
        correction: "T1 and T2 must ALWAYS be in absolute Kelvin (K = °C + 273).",
        correctionMr: "T1 व T2 नेहमी केल्विन (K = °C + 273) मध्येच असले पाहिजेत.",
      },
    ],
  },

  // ==========================================
  // CHEMISTRY: Solutions & Colligative Properties
  // ==========================================
  {
    id: "note_chem_solutions",
    chapter: "Solutions & Colligative Properties",
    chapterMr: "द्रावणे आणि संलग्न गुणधर्म (Solutions)",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Solutions & Colligative Properties Complete Master Notes",
    titleMr: "द्रावणे आणि संलग्न गुणधर्म संपूर्ण नोट्स",
    summary: "Raoult's Law, Relative Lowering of Vapor Pressure, Elevation in Boiling Point, Depression in Freezing Point, Osmotic Pressure, and Van't Hoff factor (i).",
    summaryMr: "राउल्टचा नियम, बाष्पदाब अवनमन, उत्कलनांक उन्नयन, गोठणबिंदू अवनमन, परासरण दाब आणि व्हँट हॉफ घटक (i).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Raoult's Law & Vapor Pressure",
        titleMr: "१. राउल्टचा नियम आणि बाष्पदाब",
        points: [
          "Raoult's Law for volatile liquids: P_total = P_A + P_B = P°_A x_A + P°_B x_B.",
          "Ideal Solutions: Obey Raoult's law at all concentrations (ΔH_mix = 0, ΔV_mix = 0, e.g. Benzene + Toluene).",
          "Positive Deviation: P_exp > P_calc, ΔH_mix > 0, ΔV_mix > 0, forms minimum boiling azeotrope (e.g. Ethanol + Acetone).",
          "Negative Deviation: P_exp < P_calc, ΔH_mix < 0, ΔV_mix < 0, forms maximum boiling azeotrope (e.g. Chloroform + Acetone).",
          "Henry's Law: S = K_H × P (solubility of gas in liquid is proportional to partial pressure).",
        ],
        pointsMr: [
          "राउल्टचा नियम: P_total = P°_A x_A + P°_B x_B.",
          "आदर्श द्रावण (Ideal Solution): ΔH_mix = 0 आणि ΔV_mix = 0 (उदा. बेंझिन + टोल्युइन).",
          "धनात्मक विचलन (Positive Deviation): बाष्पदाब वाढतो, ΔH > 0 (उदा. इथेनॉल + अॅसिटोन).",
          "ऋणात्मक विचलन (Negative Deviation): हायड्रोजन बंधामुळे बाष्पदाब घटतो, ΔH < 0 (उदा. क्लोरोफॉर्म + अॅसिटोन).",
        ],
        keyFormula: "P_total = P°_A x_A + P°_B x_B | S = K_H · P",
      },
      {
        title: "2. The Four Colligative Properties",
        titleMr: "२. चार संलग्न गुणधर्म (Colligative Properties)",
        points: [
          "1. Relative Lowering of Vapor Pressure: (P°_1 - P_1) / P°_1 = x_2 = n2 / (n1 + n2) ≈ W2 M1 / (M2 W1).",
          "2. Elevation in Boiling Point: ΔTb = i × Kb × m, where m = molality = (W2 × 1000) / (M2 × W1 in g).",
          "3. Depression in Freezing Point: ΔTf = i × Kf × m.",
          "4. Osmotic Pressure: π = i × C R T = i × (n2 / V) R T.",
          "Isotonic Solutions: Two solutions having same osmotic pressure (π1 = π2 => C1 = C2 at same T).",
        ],
        pointsMr: [
          "१. बाष्पदाब सापेक्ष अवनमन: (P° - P)/P° = x_2 (विद्राव्याचा मोल अंश).",
          "२. उत्कलनांक उन्नयन: ΔTb = i × Kb × m.",
          "३. गोठणबिंदू अवनमन: ΔTf = i × Kf × m.",
          "४. परासरण दाब (Osmotic Pressure): π = i C R T.",
          "समपरासारी द्रावणे (Isotonic Solutions): ज्या द्रावणांचा परासरण दाब समान असतो (π1 = π2).",
        ],
        keyFormula: "ΔTb = i Kb m | ΔTf = i Kf m | π = i C R T",
      },
      {
        title: "3. Van't Hoff Factor (i) & Degree of Dissociation/Association",
        titleMr: "३. व्हँट हॉफ घटक (i) आणि वियोजन/संयोजन प्रमाण",
        points: [
          "Definition: i = (Observed Colligative Property) / (Theoretical Colligative Property) = Normal Molar Mass / Abnormal Molar Mass.",
          "Degree of Dissociation (α): α = (i - 1) / (n - 1), where n = number of ions produced (e.g. NaCl: n=2, BaCl2: n=3, Al2(SO4)3: n=5).",
          "Degree of Association (α): α = (1 - i) / (1 - 1/n), for dimerization (Acetic acid in benzene): n = 2, i = 1 - α/2.",
        ],
        pointsMr: [
          "व्हँट हॉफ घटक: i = प्रयोगात्मक मूल्य / सैद्धांतिक मूल्य = सामान्य आण्विक वस्तुमान / प्रायोगिक वस्तुमान.",
          "वियोजन प्रमाण (Dissociation α): α = (i - 1) / (n - 1).",
          "संयोजन प्रमाण (Association α): α = (1 - i) / (1 - 1/n).",
        ],
        keyFormula: "α = (i - 1) / (n - 1) | i = 1 + (n - 1)α",
        keyMnemonic: "For 100% dissociation: i = n (NaCl -> i=2, K2SO4 -> i=3, K4[Fe(CN)6] -> i=5).",
      },
    ],
    quickRevisionPoints: [
      { en: "Colligative properties depend ONLY on the number of solute particles, not on their chemical nature.", mr: "संलग्न गुणधर्म हे केवळ विद्राव्याच्या कणांच्या संख्येवर अवलंबून असतात, त्यांच्या रासायनिक स्वरूपावर नाही." },
      { en: "Osmotic pressure method is best for determining molar mass of polymers, proteins, and biomolecules due to measurable magnitude at room temp.", mr: "पॉलिमर्स आणि प्रथिनांचे रेणुभार काढण्यासाठी परासरण दाब पद्धत सर्वोत्तम आहे कारण खोलीच्या तापमानालाही तो स्पष्ट मोजता येतो." },
    ],
    keyFormulasTable: [
      { name: "RLVP", formula: "(P° - P) / P° = x₂", description: "Relative Lowering of Vapor Pressure" },
      { name: "Boiling Elevation", formula: "ΔTb = i · Kb · m", description: "Elevation in boiling temperature with molality m" },
      { name: "Freezing Depression", formula: "ΔTf = i · Kf · m", description: "Depression in freezing temperature" },
      { name: "Osmotic Pressure", formula: "π = i · CRT", description: "Osmotic pressure of solution" },
      { name: "Van't Hoff Dissociation", formula: "i = 1 + (n - 1)α", description: "Factor i for electrolyte producing n ions with degree α" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting to multiply Van't Hoff factor (i) for ionic electrolytes like CaCl2 or AlCl3.",
        mistakeMr: "CaCl2 किंवा AlCl3 सारख्या विद्युतअपघटनी क्षारांसाठी i ने गुणायला विसरणे.",
        correction: "Always check if solute is electrolyte (NaCl, BaCl2, K2SO4) and use ΔT = i × K × m.",
        correctionMr: "द्राव्य विद्युतअपघटनी असल्यास नेहमी i चे मूल्य विचारात घ्या.",
      },
    ],
  },

  // ==========================================
  // CHEMISTRY: Chemical Kinetics & Electrochemistry
  // ==========================================
  {
    id: "note_chem_kinetics_electro",
    chapter: "Electrochemistry & Chemical Kinetics",
    chapterMr: "विद्युत रसायन आणि रासायनिक गतीशास्त्र (Electrochemistry & Kinetics)",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Electrochemistry & Chemical Kinetics Fast Notes",
    titleMr: "विद्युत रसायन आणि गतीशास्त्र रिव्हिजन नोट्स",
    summary: "Nernst Equation, Kohlrausch Law, Faraday's Laws, Integrated Rate Laws for Zero and First Order, Arrhenius Equation, and Half-Life.",
    summaryMr: "नर्न्स्ट समीकरण, कोलराउशचा नियम, फॅराडेचे नियम, शून्य व प्रथम श्रेणी अभिक्रिया, अरहेनिअस समीकरण आणि अर्धायुष्यकाळ.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Chemical Kinetics: Rate Laws & Half-Life",
        titleMr: "१. रासायनिक गतीशास्त्र: दर नियम व अर्धायुष्य",
        points: [
          "Zero Order Reaction: Rate = k [A]⁰ = k. Integrated Rate Law: k = ([A]0 - [A]t) / t. Half life: t_1/2 = [A]0 / (2k). Units of k: mol L⁻¹ s⁻¹.",
          "First Order Reaction: Rate = k [A]¹. Integrated Rate Law: k = (2.303 / t) log10([A]0 / [A]t). Half life: t_1/2 = 0.693 / k (independent of initial conc!). Units of k: s⁻¹.",
          "Arrhenius Equation: k = A e^(-Ea / R T) => log10(k2 / k1) = (Ea / 2.303 R) [ (T2 - T1) / (T1 T2) ].",
          "Pseudo First Order: Hydrolysis of ester in excess water: Rate = k' [Ester][H2O] = k [Ester].",
        ],
        pointsMr: [
          "शून्य श्रेणी अभिक्रिया (Zero order): k = ([A]0 - [A]t)/t. अर्धायुष्यकाळ t_1/2 = [A]0 / (2k).",
          "प्रथम श्रेणी अभिक्रिया (First order): k = (2.303 / t) log10([A]0 / [A]t). अर्धायुष्यकाळ t_1/2 = 0.693 / k (आरंभीच्या संहतीवर अवलंबून नसतो!).",
          "अरहेनिअस समीकरण: log10(k2 / k1) = (Ea / 2.303 R) [ (T2 - T1) / (T1 T2) ].",
        ],
        keyFormula: "t_1/2 (1st order) = 0.693 / k | log(k2/k1) = (Ea/2.303R)(1/T1 - 1/T2)",
      },
      {
        title: "2. Electrochemistry: Nernst Equation & Conductivity",
        titleMr: "२. विद्युत रसायन: नर्न्स्ट समीकरण व वाहकता",
        points: [
          "Nernst Equation at 298 K: E_cell = E°_cell - (0.0592 / n) log10(Q), where Q = [Anode ions] / [Cathode ions].",
          "Standard Cell Potential: E°_cell = E°_cathode - E°_anode (both as reduction potentials).",
          "Gibbs Free Energy: ΔG° = -n F E°_cell = -2.303 R T log10(K_c).",
          "Molar Conductivity: Λ_m = (κ × 1000) / M (units: S cm² mol⁻¹).",
          "Kohlrausch's Law: Λ°_m(electrolyte) = x λ°_+ + y λ°_-. Used to calculate Λ°_m of weak electrolytes.",
          "Faraday's 1st Law: W = Z I t = (E / 96500) I t = (M / (n F)) I t.",
        ],
        pointsMr: [
          "नर्न्स्ट समीकरण (298 K वर): E_cell = E°_cell - (0.0592 / n) log10(Q).",
          "सेल विभव: E°_cell = E°_cathode - E°_anode.",
          "गिब्स मुक्त ऊर्जा: ΔG° = -n F E°_cell.",
          "मोलर वाहकता: Λ_m = (κ × 1000) / M.",
          "कोलराउशचा नियम: अनंत सौम्यतेवर विद्युतअपघटनीची मोलर वाहकता ही तिच्या धनायन व ऋणायनांच्या वाहकतेची बेरीज असते.",
          "फॅराडेचा नियम: जमा झालेले वस्तुमान W = (M / nF) × I × t.",
        ],
        keyFormula: "E_cell = E°_cell - (0.0592/n) log Q | ΔG° = -n F E° | W = ZIt",
      },
    ],
    quickRevisionPoints: [
      { en: "For spontaneous electrochemical cell: E°_cell > 0, ΔG° < 0, K_c > 1.", mr: "उत्स्फूर्त सेलमधील अटी: E°_cell > 0 (धन), ΔG° < 0 (ऋण), K_c > 1." },
      { en: "Specific conductance (κ) decreases on dilution, while Molar conductance (Λ_m) increases on dilution.", mr: "द्रावणाचा सौम्यपणा वाढवल्यास विशिष्ट वाहकता (κ) कमी होते, पण मोलर वाहकता (Λ_m) वाढते." },
    ],
    keyFormulasTable: [
      { name: "First Order Rate Constant", formula: "k = (2.303 / t) log10([A]0 / [A]t)", description: "Decay rate constant for first order reactions" },
      { name: "First Order Half-Life", formula: "t_1/2 = 0.693 / k", description: "Constant half life independent of initial concentration" },
      { name: "Nernst Equation", formula: "E = E° - (0.0591 / n) log Q", description: "Cell EMF at non-standard ion concentrations" },
      { name: "Faraday Mass", formula: "W = (M · I · t) / (n · 96500)", description: "Mass deposited during electrolysis" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Using oxidation potential in E°_cathode - E°_anode formula instead of standard reduction potentials.",
        mistakeMr: "E°_cathode - E°_anode सूत्रात रिडक्शन पोटेन्शियलच्या ऐवजी ऑक्सिडेशन पोटेन्शियल वापरणे.",
        correction: "Both cathode and anode values must be strictly Standard Reduction Potentials (SRP).",
        correctionMr: "कॅथोड व अ‍ॅनोड या दोघांचीही व्हॅल्यू प्रमाण क्षपण विभव (SRP) मधेच असावी.",
      },
    ],
  },

  // ==========================================
  // MATHEMATICS: Vectors & 3D Geometry
  // ==========================================
  {
    id: "note_math_vectors_3d",
    chapter: "Vectors & 3D Geometry (सदिश आणि 3D भूमिती)",
    chapterMr: "सदिश आणि 3D भूमिती (Vectors & 3D Geometry)",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Vectors and 3D Geometry Comprehensive Formula Sheet & Notes",
    titleMr: "सदिश आणि त्रिमितीय भूमिती संपूर्ण सूत्रे व नोट्स",
    summary: "Dot Product, Cross Product, Scalar Triple Product, Shortest Distance between Skew Lines, Equation of Line and Plane.",
    summaryMr: "अदिश व सदिश गुणाकार, अदिश त्रिक गुणाकार, दोन रेषांमधील किमान अंतर, रेषा व प्रतलाची समीकरणे.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Vector Products & Applications",
        titleMr: "१. सदिश गुणाकार व उपयोग",
        points: [
          "Dot (Scalar) Product: a · b = |a| |b| cos θ = a1 b1 + a2 b2 + a3 b3.",
          "Condition for Perpendicularity: a · b = 0.",
          "Projection of vector a on vector b: Projection = (a · b) / |b|.",
          "Cross (Vector) Product: a × b = |a| |b| sin θ n̂ = determinant of [i, j, k; a1, a2, a3; b1, b2, b3].",
          "Condition for Collinearity / Parallelism: a × b = 0 => a1/b1 = a2/b2 = a3/b3.",
          "Area of Triangle with adjacent vectors a and b: Area = (1/2) |a × b|.",
          "Area of Parallelogram with diagonals d1 and d2: Area = (1/2) |d1 × d2|.",
          "Scalar Triple Product (Box Product): [a b c] = a · (b × c) = det([a1 a2 a3; b1 b2 b3; c1 c2 c3]). Represents volume of parallelopiped.",
          "Condition for Coplanar Vectors: [a b c] = 0.",
        ],
        pointsMr: [
          "अदिश गुणाकार (Dot product): a · b = a1 b1 + a2 b2 + a3 b3 = |a| |b| cos θ.",
          "दोन सदिश लंबरूप असण्याची अट: a · b = 0.",
          "सदिश a चा b वरील प्रक्षेप (Projection): (a · b) / |b|.",
          "सदिश गुणाकार (Cross product): a × b = |a| |b| sin θ n̂. समांतर असण्याची अट: a × b = 0.",
          "त्रिकोणाचे क्षेत्रफळ: (1/2) |a × b|. समांतरभुज चौकोनाचे क्षेत्रफळ: |a × b| (कर्ण दिले असल्यास 1/2 |d1 × d2|).",
          "अदिश त्रिक गुणाकार [a b c] = 0 असल्यास सदिश एकाच प्रतलात (Coplanar) असतात.",
        ],
        keyFormula: "a · b = |a||b|cos θ | |a × b| = |a||b|sin θ | [a b c] = 0 (Coplanar)",
      },
      {
        title: "2. Three Dimensional (3D) Geometry & Skew Lines",
        titleMr: "२. त्रिमितीय भूमिती व रेषा",
        points: [
          "Direction Cosines: l² + m² + n² = 1, where l = cos α, m = cos β, n = cos γ.",
          "Direction Ratios (a, b, c): l = a / √(a² + b² + c²), m = b / √(a² + b² + c²), n = c / √(a² + b² + c²).",
          "Vector Equation of Line passing through a and parallel to b: r = a + λ b.",
          "Cartesian Equation: (x - x1)/a = (y - y1)/b = (z - z1)/c.",
          "Shortest Distance between two Skew Lines (r = a1 + λ b1 and r = a2 + μ b2): d = | (a2 - a1) · (b1 × b2) | / |b1 × b2|.",
          "Condition for two lines to intersect (coplanar): (a2 - a1) · (b1 × b2) = 0.",
        ],
        pointsMr: [
          "दिशायुक्त कोसाइन: l² + m² + n² = 1.",
          "रेषेचे सदिश समीकरण: r = a + λ b.",
          "दोन तिर्यक रेषांमधील किमान अंतर (Shortest Distance): d = | (a2 - a1) · (b1 × b2) | / |b1 × b2|.",
          "दोन रेषा एकमेकांना छेदण्याची अट: (a2 - a1) · (b1 × b2) = 0.",
        ],
        keyFormula: "d = | (a2 - a1) · (b1 × b2) | / |b1 × b2| | l² + m² + n² = 1",
        examTip: "In MHT-CET, 1 direct question on shortest distance formula is asked every year!",
      },
    ],
    quickRevisionPoints: [
      { en: "Angle between two lines with DRs (a1,b1,c1) and (a2,b2,c2): cos θ = (a1 a2 + b1 b2 + c1 c2) / (√(∑a1²) √(∑a2²)).", mr: "दोन रेषांमधील कोन: cos θ = (a1 a2 + b1 b2 + c1 c2) / (√∑a1² √∑a2²)." },
      { en: "Distance of point (x1, y1, z1) from plane Ax + By + Cz + D = 0: d = |A x1 + B y1 + C z1 + D| / √(A² + B² + C²).", mr: "बिंदूचे प्रतलापासून अंतर: d = |A x1 + B y1 + C z1 + D| / √(A² + B² + C²)." },
    ],
    keyFormulasTable: [
      { name: "Vector Dot Product", formula: "a · b = |a||b| cos θ", description: "Scalar projection and orthogonality check" },
      { name: "Vector Cross Product", formula: "a × b = det([i, j, k; a; b])", description: "Perpendicular vector & parallelogram area" },
      { name: "Shortest Distance", formula: "d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|", description: "Perpendicular distance between skew lines" },
      { name: "Coplanar Vectors", formula: "[a b c] = 0", description: "Zero scalar triple product indicates coplanarity" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming l² + m² + n² = 1 holds for Direction Ratios (a, b, c).",
        mistakeMr: "Direction Ratios (a, b, c) ची बेरीज a² + b² + c² = 1 असते असे मानणे.",
        correction: "Only Direction Cosines (l, m, n) satisfy l² + m² + n² = 1. DRs must be normalized first.",
        correctionMr: "केवळ Direction Cosines (l, m, n) साठी l² + m² + n² = 1 असते.",
      },
    ],
  },

  // ==========================================
  // MATHEMATICS: Calculus & Differentiation
  // ==========================================
  {
    id: "note_math_calculus",
    chapter: "Calculus (Limits, Derivatives & Integration)",
    chapterMr: "कॅल्क्युलस: मर्यादा, अवकलन व समाकलन (Calculus)",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Calculus Master Formula Sheet & Integration Tricks",
    titleMr: "कॅल्क्युलस: अवकलन व समाकलन संपूर्ण सूत्रे",
    summary: "Standard Derivatives, Chain Rule, Logarithmic Differentiation, Standard Integrals, Integration by Parts, and Definite Integral Properties.",
    summaryMr: "अवकलन नियम, साखळी नियम, समाकलनाची मूलभूत सूत्रे, खंडश: समाकलन (By Parts) आणि निश्चित समाकलनाचे गुणधर्म.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Differentiation Rules & Standard Derivatives",
        titleMr: "१. अवकलनाचे नियम व प्रमाण सूत्रे",
        points: [
          "Product Rule: d/dx [u · v] = u (dv/dx) + v (du/dx).",
          "Quotient Rule: d/dx [u / v] = [ v (du/dx) - u (dv/dx) ] / v².",
          "Chain Rule: dy/dx = (dy/du) · (du/dx).",
          "Logarithmic Differentiation: Used for [f(x)]^[g(x)], take ln y = g(x) ln f(x) and differentiate.",
          "Parametric Differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt), and d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt).",
          "Standard derivatives: d/dx [tan⁻¹ x] = 1/(1+x²), d/dx [sin⁻¹ x] = 1/√(1-x²), d/dx [a^x] = a^x ln a.",
        ],
        pointsMr: [
          "गुणाकार नियम: d/dx [u · v] = u v' + v u'.",
          "भागाकार नियम: d/dx [u / v] = (v u' - u v') / v².",
          "साखळी नियम (Chain Rule): dy/dx = (dy/du) · (du/dx).",
          "प्रचलिक अवकलन (Parametric): dy/dx = (dy/dt) / (dx/dt).",
        ],
        keyFormula: "d/dx [u/v] = (v u' - u v')/v² | dy/dx = (dy/dt)/(dx/dt)",
      },
      {
        title: "2. Indefinite & Definite Integration Tricks",
        titleMr: "२. समाकलन तंत्र व निश्चित समाकलन गुणधर्म",
        points: [
          "Integration by Parts (LIATE rule): ∫ u v dx = u ∫ v dx - ∫ [ (du/dx) ∫ v dx ] dx.",
          "LIATE priority: Logarithmic > Inverse Trig > Algebraic > Trigonometric > Exponential.",
          "Euler Formula: ∫ e^x [ f(x) + f'(x) ] dx = e^x f(x) + C.",
          "King's Property of Definite Integral: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.",
          "Even/Odd Function Property: ∫_{-a}^a f(x) dx = 2 ∫_0^a f(x) dx (if even f(-x)=f(x)) OR 0 (if odd f(-x)=-f(x)).",
        ],
        pointsMr: [
          "खंडश: समाकलन (By Parts - LIATE): ∫ u v dx = u ∫ v dx - ∫ [ u' ∫ v dx ] dx.",
          "LIATE क्रम: Logarithmic > Inverse > Algebraic > Trigonometric > Exponential.",
          "शॉर्टकट सूत्र: ∫ e^x [ f(x) + f'(x) ] dx = e^x f(x) + C.",
          "किंग्स प्रॉपर्टी (King's Property): ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.",
          "सम/विषम फलन: f(-x) = -f(x) (विषम) असल्यास ∫_{-a}^a f(x) dx = 0.",
        ],
        keyFormula: "∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C | ∫_a^b f(x) dx = ∫_a^b f(a+b-x) dx",
        keyMnemonic: "LIATE: Log, Inverse, Algebraic, Trig, Exponential for choosing 'u'.",
      },
    ],
    quickRevisionPoints: [
      { en: "Area bounded by y = f(x), x-axis, x=a to x=b: Area = ∫_a^b |y| dx.", mr: "वक्राने बंदिस्त केलेले क्षेत्रफळ: Area = ∫_a^b |y| dx." },
      { en: "Area between parabola y² = 4ax and line y = mx: Area = 8 a² / (3 m³).", mr: "परवलय y²=4ax आणि रेषा y=mx मधील क्षेत्रफळ = 8 a² / (3 m³)." },
    ],
    keyFormulasTable: [
      { name: "Integration by Parts", formula: "∫ u v dx = u ∫ v dx - ∫ [u' ∫ v dx] dx", description: "LIATE priority rule for product of functions" },
      { name: "Exponential Shortcut", formula: "∫ e^x [f(x) + f'(x)] dx = e^x f(x)", description: "Instant standard form integration" },
      { name: "King's Rule", formula: "∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx", description: "Symmetric cancellation in definite integrals" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting the dt/dx term when taking second derivative of parametric functions d²y/dx².",
        mistakeMr: "प्रचलिक फलाचे दुसरे अवकलन (d²y/dx²) करताना शेवटी dt/dx ने गुणायला विसरणे.",
        correction: "d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt). NEVER just differentiate dy/dx with respect to t alone.",
        correctionMr: "d²y/dx² = [ d/dt (dy/dx) ] ÷ (dx/dt) हे सूत्र वापरा.",
      },
    ],
  },

  // ==========================================
  // BIOLOGY: Genetics & Molecular Basis of Inheritance
  // ==========================================
  {
    id: "note_bio_genetics_molecular",
    chapter: "Genetics & Molecular Basis of Inheritance",
    chapterMr: "जनुकशास्त्र आणि वारशाचा आण्विक आधार (Genetics & Molecular Basis)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Mendelian Genetics, DNA Replication & Central Dogma Notes",
    titleMr: "मेंडेलचे नियम, डीएनए प्रतिकृती व प्रथिन निर्मिती संपूर्ण नोट्स",
    summary: "Mendel's Laws, Dihybrid Cross, Incomplete Dominance, Codominance, Hershey-Chase Experiment, DNA Replication, Transcription, and Genetic Code.",
    summaryMr: "मेंडेलचे नियम, द्विसंकर संतती, अपूर्ण प्रभाविता, डीएनए प्रतिकृती (Replication), ट्रान्सक्रिप्शन, ट्रान्सलेशन आणि जनुकीय संकेत (Genetic Code).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Mendelian Genetics & Ratios",
        titleMr: "१. मेंडेलचे अनुवंशिकता नियम व गुणोत्तरे",
        points: [
          "Monohybrid Cross Phenotypic Ratio: 3 : 1, Genotypic Ratio: 1 : 2 : 1.",
          "Dihybrid Cross Phenotypic Ratio: 9 : 3 : 3 : 1, Genotypic Ratio: 1:2:2:4:1:2:1:2:1.",
          "Test Cross Ratio (Monohybrid): 1 : 1, (Dihybrid): 1 : 1 : 1 : 1.",
          "Incomplete Dominance (Mirabilis jalapa / Snapdragon): Phenotypic & Genotypic Ratio both = 1 : 2 : 1 (Red : Pink : White).",
          "Codominance: ABO Blood grouping (IA and IB alleles are codominant over i). Controlled by gene I with 3 alleles yielding 6 genotypes and 4 phenotypes.",
          "Sex Determination in Birds: ZZ (Male homogametic) and ZW (Female heterogametic).",
        ],
        pointsMr: [
          "एकसंकर (Monohybrid) दृश्य स्वरूप: ३ : १, जनुकीय स्वरूप: १ : २ : १.",
          "द्विसंकर (Dihybrid) दृश्य स्वरूप: ९ : ३ : ३ : १.",
          "कसोटी संकर (Test Cross): १ : १ (Monohybrid) आणि १ : १ : १ : १ (Dihybrid).",
          "अपूर्ण प्रभाविता (Snapdragon): दृश्य व जनुकीय दोन्ही १ : २ : १ (लाल : गुलाबी : पांढरा).",
          "सहप्रभाविता (Codominance): मानवी ABO रक्तगट (३ अ‍ॅलील्स, ६ जीनोटाइप्स, ४ फिनोटाइप्स).",
        ],
        keyFormula: "Dihybrid Phenotypic: 9:3:3:1 | Incomplete Dominance: 1:2:1",
        keyMnemonic: "Blood Group: IA = IB > i (IA and IB are codominant, i is recessive).",
      },
      {
        title: "2. Molecular Basis: DNA, Replication & Central Dogma",
        titleMr: "२. आण्विक आधार: डीएनए, प्रतिकृती व सेंट्रल डोग्मा",
        points: [
          "Chargaff's Rule: In double stranded DNA, [A] = [T] and [G] = [C], so (A + G) / (T + C) = 1. (A + T) / (G + C) varies across species.",
          "DNA Packaging: Nucleosome contains histone octamer (2 each of H2A, H2B, H3, H4) wrapped by ~200 bp of DNA. H1 histone seals the entry/exit.",
          "Hershey-Chase Experiment (1952): Proved DNA is the genetic material using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat).",
          "Meselson-Stahl Experiment (1958): Proved Semi-conservative DNA replication using ¹⁵N and ¹⁴N with CsCl density gradient centrifugation.",
          "DNA Polymerase III: Synthesizes new strand in strictly 5' -> 3' direction. Continuous on leading strand, discontinuous (Okazaki fragments) on lagging strand.",
          "Genetic Code: 64 codons total. 61 sense codons code for 20 amino acids. 3 Stop codons: UAA (Ochre), UAG (Amber), UGA (Opal). Start codon: AUG (codes for Methionine).",
        ],
        pointsMr: [
          "चारगाफचा नियम: द्विसर्पिल DNA मध्ये [A] = [T] आणि [G] = [C], म्हणजेच (A+G)/(T+C) = १.",
          "न्यूक्लियोझोम: हिस्टोन अष्टक (H2A, H2B, H3, H4 चे २-२ घटक) आणि सुमारे २०० bp DNA, H1 हिस्टोन बाहेर जोडलेला असतो.",
          "हर्षी-चेस प्रयोग: ³²P (DNA) आणि ³⁵S (प्रथिन) वापरून DNA हाच अनुवंशिक घटक असल्याचे सिद्ध केले.",
          "मेसेलसन-स्टाल प्रयोग: ¹⁵N आणि ¹⁴N आयसोटोप्स वापरून DNA चे अर्ध-संरक्षक (Semi-conservative) द्विगुणन सिद्ध केले.",
          "जनुकीय संकेत (Genetic Code): एकूण ६४ कोडॉन्स. ६१ अमिनो आम्लांसाठी, ३ स्टॉप कोडॉन्स (UAA, UAG, UGA), आणि AUG हा स्टार्ट कोडॉन (मेथिओनाइन).",
        ],
        keyFormula: "[A] = [T], [G] = [C] => Purines (A+G) = Pyrimidines (T+C)",
        keyMnemonic: "Stop codons: U Are Away (UAA), U Are Gone (UAG), U Go Away (UGA).",
        examTip: "RNA Polymerase II transcribes hnRNA (precursor of mRNA) in eukaryotes.",
      },
    ],
    quickRevisionPoints: [
      { en: "Central Dogma: DNA -> (Transcription) -> mRNA -> (Translation) -> Protein. Proposed by Francis Crick.", mr: "सेंट्रल डोग्मा: DNA → (ट्रान्सक्रिप्शन) → mRNA → (ट्रान्सलेशन) → प्रथिने. फ्रान्सिस क्रिक यांनी मांडला." },
      { en: "Lac Operon: Inducer is Allolactose/Lactose. Structural genes: z (β-galactosidase), y (permease), a (transacetylase).", mr: "लॅक ऑपेरॉन: प्रेरक लॅक्टोज आहे. जनुके: z (β-गॅलॅक्टोसिडेस), y (परमीएझ), a (ट्रान्सअ‍ॅसिटायलेझ)." },
    ],
    keyFormulasTable: [
      { name: "Chargaff Rule", formula: "A + G = T + C", description: "Equimolar purines and pyrimidines in dsDNA" },
      { name: "Nucleosome DNA Length", formula: "~200 base pairs", description: "Length of DNA wrapped around histone octamer" },
      { name: "Codon Allocation", formula: "61 Sense + 3 Nonsense = 64", description: "Triplet codons in universal genetic code" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing DNA synthesis direction as 3' to 5'.",
        mistakeMr: "DNA पॉलिमरेझची दिशा 3' ते 5' अशी लिहिणे.",
        correction: "DNA and RNA polymerization ALWAYS proceeds strictly in 5' to 3' direction.",
        correctionMr: "नवीन धाग्याची निर्मिती नेहमी 5' ते 3' दिशेनेच होते.",
      },
    ],
  },

  // ==========================================
  // BIOLOGY: Human Physiology & Circulation
  // ==========================================
  {
    id: "note_bio_circulation",
    chapter: "Human Physiology: Circulation & Respiration",
    chapterMr: "मानवी शरीरक्रियाशास्त्र: रक्ताभिसरण व श्वसन (Circulation & Respiration)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Cardiovascular System, ECG, Blood Groups & Respiratory Volumes",
    titleMr: "हृदय, रक्तगट, ईसीजी (ECG) आणि श्वसन क्षमता संपूर्ण नोट्स",
    summary: "Cardiac Cycle, Pacemaker (SA Node), ECG Waves interpretation, Double Circulation, Blood Groups, and Respiratory Capacities (Tidal Volume, Vital Capacity).",
    summaryMr: "हृदयाचे ठोके, पेसमेकर (SA Node), ECG तरंगांचा अर्थ, दुहेरी रक्ताभिसरण, रक्तगट आणि फुप्फुसाची श्वसन क्षमता (TV, VC, TLC).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Cardiac Cycle, Nodal Tissue & ECG",
        titleMr: "१. हृदय चक्र, नोडल ऊती व ईसीजी (ECG)",
        points: [
          "Sinoatrial (SA) Node: Located in right atrium upper corner, acts as natural pacemaker, generates 70-75 impulses/min.",
          "Cardiac Output: Stroke Volume × Heart Rate = 70 mL × 72 bpm ≈ 5040 mL/min (~5 Litres/min).",
          "Duration of 1 Cardiac Cycle: 0.8 seconds (Atrial systole: 0.1s, Ventricular systole: 0.3s, Joint diastole: 0.4s).",
          "Heart Sounds: Lubb (1st sound, closure of AV tricuspid & bicuspid valves), Dubb (2nd sound, closure of semilunar valves).",
          "ECG Waves: P wave (Atrial depolarisation), QRS complex (Ventricular depolarisation), T wave (Ventricular repolarisation).",
        ],
        pointsMr: [
          "SA नोड (पेसमेकर): उजव्या अलिंदात असतो, दर मिनिटाला ७०-७५ विद्युत आवेग निर्माण करतो.",
          "कार्डियाक आउटपुट: स्ट्रोक व्हॉल्यूम × ठोके = ७० mL × ७२ = ~५ लिटर प्रति मिनिट.",
          "एका हृदय चक्राचा कालावधी: ०.८ सेकंद.",
          "हृदयाचे आवाज: लब (Lubb - AV व्हॉल्व्ह बंद होताना), डब (Dubb - सेमीलुनार व्हॉल्व्ह बंद होताना).",
          "ECG तरंग: P तरंग (अलिंदाचे विध्रुवीकरण), QRS कॉम्प्लेक्स (निलयाचे विध्रुवीकरण), T तरंग (निलयाचे पुनर्ध्रुवीकरण).",
        ],
        keyFormula: "Cardiac Output = Stroke Volume (70 mL) × Heart Rate (72 bpm) ≈ 5 L/min",
        keyMnemonic: "ECG: P = Atrium Squeeze, QRS = Ventricle Squeeze, T = Ventricle Relax.",
      },
      {
        title: "2. Respiratory Volumes & Capacities",
        titleMr: "२. श्वसन घनफळ आणि फुप्फुस क्षमता",
        points: [
          "Tidal Volume (TV): Normal quiet breathing = ~500 mL (6000-8000 mL/min).",
          "Inspiratory Reserve Volume (IRV): 2500 - 3000 mL.",
          "Expiratory Reserve Volume (ERV): 1000 - 1100 mL.",
          "Residual Volume (RV): Air remaining in lungs after forced expiration = 1100 - 1200 mL (cannot be measured by spirometer).",
          "Vital Capacity (VC): Maximum volume exhaled after forced inspiration: VC = ERV + TV + IRV = 3500 - 4500 mL.",
          "Total Lung Capacity (TLC): RV + ERV + TV + IRV = VC + RV ≈ 5800 mL.",
        ],
        pointsMr: [
          "टायडल व्हॉल्यूम (TV): सामान्य श्वासोच्छ्वास = ५०० mL.",
          "इन्स्पिरेटरी रिझर्व्ह (IRV): २५०० ते ३००० mL.",
          "एक्स्पिरेटरी रिझर्व्ह (ERV): १००० ते ११०० mL.",
          "रेसिड्यूअल व्हॉल्यूम (RV): जबरदस्तीने श्वास सोडल्यानंतरही फुप्फुसात उरलेली हवा = ११०० ते १२०० mL (स्पायरोमीटरने मोजता येत नाही).",
          "व्हाइटल कपॅसिटी (VC): VC = TV + IRV + ERV = ~४००० ते ४६०० mL.",
          "एकूण फुप्फुस क्षमता (TLC): TLC = VC + RV = ~५८०० mL.",
        ],
        keyFormula: "VC = TV + IRV + ERV | TLC = VC + RV",
        examTip: "Residual Volume (RV), Functional Residual Capacity (FRC), and TLC cannot be measured directly with a standard spirometer.",
      },
    ],
    quickRevisionPoints: [
      { en: "Oxygen-Hemoglobin dissociation curve is Sigmoid shaped; shifts to right with higher CO2, higher H+ (lower pH), higher temperature (Bohr effect).", mr: "ऑक्सिजन-हिमोग्लोबिन वक्र सिग्मॉइड आकाराचा असतो; CO2 व तापमान वाढल्यास तो उजवीकडे सरकतो (बोर इफेक्ट)." },
      { en: "Universal Donor blood group: O Negative (O-); Universal Recipient: AB Positive (AB+).", mr: "सर्वयोग्य दाता: O निगेटिव्ह (O-); सर्वयोग्य ग्राहक: AB पॉझिटिव्ह (AB+)." },
    ],
    keyFormulasTable: [
      { name: "Cardiac Output", formula: "CO = SV × HR = 70 mL × 72 = 5040 mL", description: "Blood volume pumped per ventricle per minute" },
      { name: "Vital Capacity", formula: "VC = TV + IRV + ERV", description: "Maximum exhaled air after deep inhalation" },
      { name: "Total Lung Capacity", formula: "TLC = VC + RV", description: "Total air volume in lungs after maximal inspiration" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming O+ is universal donor.",
        mistakeMr: "O+ हा सर्वयोग्य दाता आहे असे समजणे.",
        correction: "O Negative (O-) is the true universal donor because it lacks A, B, and Rh antigens on RBCs.",
        correctionMr: "O निगेटिव्ह (O-) हा खरा सर्वयोग्य दाता आहे कारण त्याच्यावर A, B आणि Rh तिन्ही प्रतिजने नसतात.",
      },
    ],
  },
];
