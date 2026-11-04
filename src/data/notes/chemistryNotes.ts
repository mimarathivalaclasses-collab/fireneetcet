import { TopicNote } from "../../types";

export const CHEMISTRY_NOTES: TopicNote[] = [
  // 1. Chemical Bonding & Molecular Structure
  {
    id: "note_chem_chemical_bonding",
    chapter: "Chemical Bonding & Molecular Structure",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "VSEPR, Hybridization, MOT, Dipole Moment & Hydrogen Bonding Notes",
    summary: "VSEPR Theory shapes, Steric number hybridization rule, Molecular Orbital Theory (Bond Order, Paramagnetism), Dipole Moment, and Hydrogen bonding.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. VSEPR Theory & Hybridization Shortcuts",
        points: [
          "Steric Number (SN) = (Valence electrons of Central Atom + Monovalent attached atoms - Positive charge + Negative charge) / 2.",
          "SN = 2 => sp (Linear, 180°), e.g., BeCl₂, CO₂.",
          "SN = 3 => sp² (Trigonal Planar, 120°), e.g., BF₃; 1 lone pair => Bent/V-shaped, e.g., SO₂.",
          "SN = 4 => sp³ (Tetrahedral, 109.5°), e.g., CH₄; 1 lone pair => Trigonal Pyramidal (107°), e.g., NH₃; 2 lone pairs => Bent/Angular (104.5°), e.g., H₂O.",
          "SN = 5 => sp³d (Trigonal Bipyramidal, 120° & 90°), e.g., PCl₅; 1 lone pair => See-saw (SF₄); 2 lone pairs => T-shaped (ClF₃); 3 lone pairs => Linear (XeF₂).",
          "SN = 6 => sp³d² (Octahedral, 90°), e.g., SF₆; 1 lone pair => Square Pyramidal (BrF₅); 2 lone pairs => Square Planar (XeF₄).",
          "VSEPR Repulsion Order: Lone Pair - Lone Pair (lp-lp) > Lone Pair - Bond Pair (lp-bp) > Bond Pair - Bond Pair (bp-bp).",
        ],
        keyFormula: "Steric No. = [V + M - C + A] / 2 | Repulsion: lp-lp > lp-bp > bp-bp"
      },
      {
        title: "2. Molecular Orbital Theory (MOT) & Bond Order",
        points: [
          "Bond Order (BO) = (N_b - N_a) / 2, where N_b is bonding electrons and N_a is anti-bonding electrons.",
          "Stability: Higher Bond Order => Greater Bond Strength, Shorter Bond Length (Bond Order ∝ 1 / Bond Length).",
          "Quick Trick for Total Electrons (10 to 18 electrons):",
          "14 electrons (N₂) = BO 3.0; 13 or 15 electrons (N₂⁺, O₂⁺) = BO 2.5; 12 or 16 electrons (C₂, O₂) = BO 2.0; 11 or 17 electrons = BO 1.5; 10 or 18 electrons (B₂, F₂) = BO 1.0.",
          "Magnetic Nature: Unpaired electron in MO => Paramagnetic (e.g., O₂ has 2 unpaired electrons in π*2px, π*2py => Paramagnetic; B₂ is Paramagnetic). All electrons paired => Diamagnetic (e.g., N₂).",
        ],
        keyFormula: "Bond Order = (N_b - N_a) / 2 | BO ∝ Bond Dissociation Energy ∝ 1/Bond Length",
        keyMnemonic: "MOT Peak: 14 electrons = Max BO 3.0. Step down by 0.5 for each electron away from 14."
      },
    ],
    quickRevisionPoints: [
      { en: "Intermolecular Hydrogen Bonding increases boiling point (e.g., H₂O > H₂S, Ethanol > Dimethyl ether)." },
      { en: "Intramolecular Hydrogen Bonding occurs within the same molecule (e.g., o-nitrophenol, salicylaldehyde), lowering boiling point and making it steam volatile." },
    ],
    keyFormulasTable: [
      { name: "Steric Number", formula: "SN = (V + M - C + A) / 2", description: "Determines molecular hybridization state" },
      { name: "MOT Bond Order", formula: "BO = (N_b - N_a) / 2", description: "Net covalent bond strength between two nuclei" },
      { name: "Dipole Moment", formula: "μ = q × d (in Debye, D)", description: "Vector measure of net molecular polarity" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming O2 is diamagnetic because it has 16 (an even number) of electrons.",
        correction: "According to MOT, O2 has 2 unpaired electrons in its degenerate anti-bonding π* orbitals, making it distinctly PARAMAGNETIC."
      },
    ]
  },

  // 2. Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids
  {
    id: "note_chem_aldehydes_ketones_acids",
    chapter: "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Named Reactions, Nucleophilic Addition & Carboxylic Acid Derivatives",
    summary: "Rosenmund, Stephen, Gatterman-Koch, Aldol Condensation, Cannizzaro Reaction, Clemmensen & Wolff-Kishner Reduction, Tollens' & Fehling's tests, and HVZ Reaction.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Preparation & Named Carbonyl Syntheses",
        points: [
          "Rosenmund Reduction: Acyl chloride (R-COCl) + H₂ / Pd-BaSO₄ (poisoned with quinoline/S) => Aldehyde (R-CHO).",
          "Stephen Reaction: Nitrile (R-CN) + SnCl₂ / HCl => Imine hydrochloride => (H₃O⁺) => Aldehyde (R-CHO).",
          "Etard Reaction: Toluene + CrO₂Cl₂ (in CS₂) => Chromium complex => (H₃O⁺) => Benzaldehyde.",
          "Gatterman-Koch Reaction: Benzene + CO + HCl in presence of anhyd. AlCl₃ / CuCl => Benzaldehyde.",
          "Ozonolysis: Alkene + O₃ => Ozonide => (Zn / H₂O) => Aldehydes and/or Ketones.",
        ],
        keyFormula: "R-COCl + H₂ --(Pd/BaSO₄)--> R-CHO | R-CN --(SnCl₂/HCl)--> R-CHO"
      },
      {
        title: "2. Nucleophilic Addition & Condensation Reactions",
        points: [
          "Reactivity order towards Nucleophilic Addition: HCHO > R-CHO > Ar-CHO > R-CO-R (due to steric hindrance and +I inductive effect of alkyl groups).",
          "Aldol Condensation: Requires α-hydrogen. 2 CH₃CHO + dil. NaOH => CH₃-CH(OH)-CH₂-CHO (Aldol) => (Heat, -H₂O) => CH₃-CH=CH-CHO (Crotonaldehyde).",
          "Cannizzaro Reaction: In absence of α-hydrogen (e.g., HCHO, PhCHO) + 50% conc. KOH => Disproportionation/Redox => 1 molecule reduced to Alcohol + 1 molecule oxidized to Carboxylate salt.",
          "Clemmensen Reduction: Carbonyl (>C=O) + Zn-Hg / conc. HCl => Alkane (>CH₂).",
          "Wolff-Kishner Reduction: Carbonyl (>C=O) + NH₂-NH₂ (Hydrazine) / KOH, ethylene glycol (heat) => Alkane (>CH₂) + N₂.",
          "Haloform / Iodoform Test: Compounds with CH₃-C=O or CH₃-CH(OH)- group + I₂ / NaOH => Yellow precipitate of CHI₃ (Iodoform).",
        ],
        keyFormula: "Aldol: 2 R-CH₂CHO --(dil NaOH)--> β-hydroxyaldehyde | CHI₃ (Yellow ppt)",
        keyMnemonic: "Cannizzaro = 'CANNOT have alpha-H'. Clemmensen = Acidic (HCl), Wolff-Kishner = Basic (KOH)."
      },
      {
        title: "3. Carboxylic Acids & Hell-Volhard-Zelinsky (HVZ) Reaction",
        points: [
          "Acidity of Carboxylic Acids: Electron Withdrawing Groups (-I, -M like -NO₂, -CN, -F, -Cl) INCREASE acidity by stabilizing conjugate carboxylate base (R-COO⁻).",
          "Acidity order: HCOOH > CH₃COOH > C₂H₅COOH. Trichloroacetic acid > Dichloroacetic acid > Monochloroacetic acid > Acetic acid.",
          "HVZ Reaction: R-CH₂-COOH + X₂ (Cl₂/Br₂) in presence of Red Phosphorus => α-halo carboxylic acid (R-CH(X)-COOH).",
          "Decarboxylation: R-COONa + Soda-lime (NaOH + CaO, 3:1 ratio, heat) => Alkane (R-H) + Na₂CO₃.",
        ],
        keyFormula: "HVZ: R-CH₂COOH + X₂ / Red P --> R-CH(X)COOH | Decarboxylation: Soda-lime (3:1)"
      },
    ],
    quickRevisionPoints: [
      { en: "Tollens' reagent [Ag(NH₃)₂]⁺ reduces with aldehydes to give Silver Mirror, but ketones DO NOT respond (except α-hydroxy ketones)." },
      { en: "Fehling's solution (A: CuSO₄ + B: Rochelle salt) gives red cuprous oxide (Cu₂O) precipitate with aliphatic aldehydes; aromatic aldehydes do not react." },
    ],
    keyFormulasTable: [
      { name: "Aldol Condensation", formula: "2 CH₃CHO --(OH⁻)--> CH₃CH=CHCHO + H₂O", description: "Enolization and nucleophilic addition of α-carbon" },
      { name: "Cannizzaro Reaction", formula: "2 HCHO + KOH --> CH₃OH + HCOOK", description: "Disproportionation of non-enolizable aldehydes" },
      { name: "HVZ Reaction", formula: "R-CH₂COOH + Br₂/P --> R-CH(Br)COOH", description: "Specific halogenation at α-position of carboxylic acids" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Expecting Benzaldehyde to undergo Aldol condensation or Fehling's test.",
        correction: "Benzaldehyde has NO alpha-hydrogens (undergoes Cannizzaro instead) and is too weak to reduce Fehling's solution."
      },
    ]
  },

  // 3. Solutions & Colligative Properties
  {
    id: "note_chem_solutions",
    chapter: "Solutions & Colligative Properties",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Solutions & Colligative Properties Complete Master Notes",
    summary: "Raoult's Law, Ideal & Non-Ideal Solutions, Boiling Point Elevation, Freezing Point Depression, Osmotic Pressure, and van 't Hoff Factor (i).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Concentration Terms & Raoult's Law",
        points: [
          "Molarity (M) = moles of solute / Volume of solution (L) [Temperature dependent].",
          "Molality (m) = moles of solute / Mass of solvent (kg) [Temperature INDEPENDENT].",
          "Henry's Law: p = K_H · x (Solubility of gas in liquid ∝ partial pressure of gas).",
          "Raoult's Law (Volatile liquid-liquid): P_total = P_A + P_B = P°_A x_A + P°_B x_B.",
          "Ideal Solution: ΔH_mix = 0, ΔV_mix = 0 (e.g., Benzene + Toluene, n-Hexane + n-Heptane).",
          "Positive Deviation: P_exp > P_calc, ΔH_mix > 0, ΔV_mix > 0, forms minimum boiling azeotrope (e.g., Ethanol + Acetone).",
          "Negative Deviation: P_exp < P_calc, ΔH_mix < 0, ΔV_mix < 0, forms maximum boiling azeotrope (e.g., Chloroform + Acetone, HNO₃ + H₂O).",
        ],
        keyFormula: "P_total = P°_A x_A + P°_B x_B | p = K_H · x"
      },
      {
        title: "2. The 4 Colligative Properties & van 't Hoff Factor",
        points: [
          "1. Relative Lowering of Vapour Pressure (RLVP): (P° - P) / P° = i · x_solute = i · (n₂ / n₁).",
          "2. Elevation of Boiling Point: ΔT_b = T_b - T°_b = i · K_b · m (where K_b is molal boiling point elevation / ebullioscopic constant).",
          "3. Depression of Freezing Point: ΔT_f = T°_f - T_f = i · K_f · m (where K_f is molal cryoscopic constant).",
          "4. Osmotic Pressure: π = i · C R T = i · (n₂ / V) R T.",
          "van 't Hoff factor for Dissociation: i = 1 + (n - 1) α, where n is number of ions produced per molecule and α is degree of dissociation.",
          "van 't Hoff factor for Association: i = 1 + (1/n - 1) α (for dimerization n=2: i = 1 - α/2).",
        ],
        keyFormula: "ΔT_b = i K_b m | ΔT_f = i K_f m | π = i C R T | i = 1 + (n-1)α"
      },
    ],
    quickRevisionPoints: [
      { en: "Colligative properties depend ONLY on the NUMBER of solute particles in solution, independent of their chemical nature." },
      { en: "Isotonic solutions have the SAME osmotic pressure (π₁ = π₂ => C₁ = C₂ at same temperature)." },
    ],
    keyFormulasTable: [
      { name: "RLVP Formula", formula: "(P° - P)/P° = i (n₂/n₁)", description: "Relative lowering of solvent vapour pressure" },
      { name: "Boiling Elevation", formula: "ΔT_b = i K_b m", description: "Increase in boiling temperature of solution" },
      { name: "Freezing Depression", formula: "ΔT_f = i K_f m", description: "Decrease in freezing point of solution" },
      { name: "Osmotic Pressure", formula: "π = i C R T", description: "Pressure required to prevent osmosis" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting the van 't Hoff factor (i) for ionic electrolytes like NaCl, CaCl2, Al2(SO4)3 in colligative calculations.",
        correction: "For 100% dissociated NaCl: i = 2; for CaCl2: i = 3; for Al2(SO4)3: i = 5."
      },
    ]
  },

  // 4. Electrochemistry & Chemical Kinetics
  {
    id: "note_chem_kinetics_electro",
    chapter: "Electrochemistry & Chemical Kinetics",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Nernst Equation, Kohlrausch Law, Rate Laws & Arrhenius Equation",
    summary: "Nernst Equation, Gibbs free energy & EMF, Kohlrausch's Law, Faraday's Laws, Integrated Rate Equations (Zero & First Order), Half-Life, and Arrhenius Activation Energy.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Electrochemistry & Nernst Equation",
        points: [
          "Nernst Equation at 298 K: E_cell = E°_cell - (0.0591 / n) log10 Q.",
          "Equilibrium Constant relation: E°_cell = (0.0591 / n) log10 K_eq.",
          "Gibbs Free Energy & EMF: ΔG° = - n F E°_cell (where F = 96,500 C/mol). Positive E°_cell => Negative ΔG° => Spontaneous reaction.",
          "Molar Conductivity: Λ_m = (κ × 1000) / M (where κ is conductivity in S/cm and M is molarity).",
          "Kohlrausch's Law: Limiting molar conductivity Λ°_m = ν₊ λ°₊ + ν₋ λ°₋.",
          "Degree of dissociation of weak electrolyte: α = Λ_m / Λ°_m. Dissociation constant: K_a = C α² / (1 - α).",
          "Faraday's 1st Law: Mass deposited W = Z · I · t = (M / nF) · I · t.",
        ],
        keyFormula: "E_cell = E° - (0.0591/n) log Q | ΔG° = -nFE° | W = (M/nF)It"
      },
      {
        title: "2. Chemical Kinetics, Rate Laws & Arrhenius Equation",
        points: [
          "Rate of Reaction: Rate = - (1/a) d[A]/dt = + (1/b) d[B]/dt.",
          "Units of Rate Constant (k): (mol/L)^(1-n) · s⁻¹ (where n is reaction order). Zero order: mol L⁻¹ s⁻¹; 1st order: s⁻¹; 2nd order: L mol⁻¹ s⁻¹.",
          "Zero Order Kinetics: [A]_t = [A]₀ - k t. Half life: t_1/2 = [A]₀ / (2k) (depends directly on initial concentration).",
          "First Order Kinetics: k = (2.303 / t) log10 ([A]₀ / [A]_t). Half life: t_1/2 = 0.693 / k (INDEPENDENT of initial concentration).",
          "Time for 99.9% completion of 1st order reaction: t_99.9% = 10 × t_1/2.",
          "Arrhenius Equation: k = A e^(-E_a / RT) => log10(k₂ / k₁) = (E_a / 2.303 R) [ (T₂ - T₁) / (T₁ T₂) ].",
        ],
        keyFormula: "k = (2.303/t) log([A]₀/[A]) | t_1/2 = 0.693/k | log(k₂/k₁) = (E_a/2.303R)(ΔT/T₁T₂)"
      },
    ],
    quickRevisionPoints: [
      { en: "Molecularity is theoretical, always an integer (1, 2, 3), and never zero or fractional; Order of reaction is experimental and CAN be zero, fractional, or negative." },
      { en: "A catalyst speeds up reaction by providing an alternate pathway with LOWER activation energy (E_a), but DOES NOT change ΔH, ΔG, or equilibrium constant K_eq." },
    ],
    keyFormulasTable: [
      { name: "Nernst Equation", formula: "E_cell = E° - (0.0591/n) log Q", description: "Cell EMF under non-standard conditions at 298 K" },
      { name: "First Order Rate", formula: "k = (2.303/t) log([A]₀/[A])", description: "Integrated rate law for first-order reaction" },
      { name: "First Order Half-Life", formula: "t_1/2 = 0.693 / k", description: "Time to reduce reactant concentration by half" },
      { name: "Arrhenius Equation", formula: "k = A exp(-E_a / RT)", description: "Effect of temperature on rate constant" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing zero order half-life dependence with first order half-life.",
        correction: "For zero order, doubling [A]0 DOUBLES t_1/2. For first order, changing [A]0 has ZERO effect on t_1/2."
      },
    ]
  },

  // 5. p-Block & d & f-Block Elements
  {
    id: "note_chem_inorganic_blocks",
    chapter: "p-Block & d & f-Block Elements",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "p-Block, Transition Metals, Lanthanoid Contraction & Color Notes",
    summary: "Oxoacids of Phosphorus & Sulphur, Interhalogen compounds, Noble gases, Transition metal properties, Magnetic moments (spin-only), Lanthanoid contraction, and KMnO₄ / K₂Cr₂O₇ reactions.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. p-Block Elements & Oxoacids",
        points: [
          "Group 15 (Nitrogen family): Haber Process for NH₃ (Fe catalyst, Mo promoter). Ostwald process for HNO₃. Oxoacids of Phosphorus: H₃PO₂ (monobasic, strong reducing agent with 2 P-H bonds), H₃PO₃ (dibasic, 1 P-H bond), H₃PO₄ (tribasic, 0 P-H bonds).",
          "Group 16 (Chalcogens): Contact process for H₂SO₄ (V₂O₅ catalyst). Anomalous behavior of Oxygen due to small size and high electronegativity. Oxoacids of Sulphur: H₂SO₄, H₂S₂O₇ (Oleum), H₂S₂O₈ (Marshall's acid with peroxo linkage -O-O-).",
          "Group 17 (Halogens): Oxidizing power order: F₂ > Cl₂ > Br₂ > I₂. Bleaching powder: CaOCl₂. Interhalogens (XX'ₙ): More reactive than pure halogens (except F₂) due to weaker X-X' bond.",
          "Group 18 (Noble Gases): XeF₂ (Linear), XeF₄ (Square Planar), XeF₆ (Distorted Octahedral), XeO₃ (Pyramidal), XeOF₄ (Square Pyramidal).",
        ],
        keyFormula: "Spin-only Magnetic Moment: μ = √[ n (n + 2) ] BM"
      },
      {
        title: "2. d-Block & f-Block Elements",
        points: [
          "General Electronic Configuration: d-block: (n-1)d¹⁻¹⁰ ns¹⁻²; f-block: (n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns².",
          "Variable Oxidation States: Highest oxidation state in 3d series is Manganese (+7 in KMnO₄) and in transition elements is Osmium/Ruthenium (+8 in OsO₄).",
          "Color of Transition Metal Ions: Due to d-d transitions. Ions with d⁰ (e.g., Sc³⁺, Ti⁴⁺) or d¹⁰ (e.g., Zn²⁺, Cu⁺) configuration are COLORLESS.",
          "Magnetic Moment (Spin-only formula): μ = √[ n (n + 2) ] Bohr Magnetons (BM), where n = number of unpaired d electrons.",
          "Lanthanoid Contraction: Steady decrease in atomic and ionic radii from La³⁺ to Lu³⁺ due to poor shielding effect of 4f electrons. Consequence: Zr and Hf have almost identical atomic radii (0.160 nm and 0.159 nm).",
          "Potassium Dichromate (K₂Cr₂O₇): Orange Cr₂O₇²⁻ in acidic medium converts to yellow CrO₄²⁻ in alkaline medium: Cr₂O₇²⁻ + 2OH⁻ ⇌ 2CrO₄²⁻ + H₂O.",
          "Potassium Permanganate (KMnO₄): Intense purple color due to Ligand-to-Metal Charge Transfer (LMCT), NOT d-d transition (Mn is in +7 state, d⁰).",
        ],
        keyFormula: "μ = √[ n(n+2) ] BM | Cr₂O₇²⁻ (Orange, Acidic) ⇌ 2CrO₄²⁻ (Yellow, Basic)"
      },
    ],
    quickRevisionPoints: [
      { en: "Lanthanoid Contraction causes pairs like Zr/Hf, Nb/Ta, and Mo/W to have nearly identical atomic radii and similar chemical properties." },
      { en: "Acidic KMnO₄ oxidizes Fe²⁺ to Fe³⁺, Oxalate (C₂O₄²⁻) to CO₂, and Iodide (I⁻) to I₂." },
    ],
    keyFormulasTable: [
      { name: "Spin-only Formula", formula: "μ = √[ n (n + 2) ] BM", description: "Magnetic moment from number of unpaired electrons (n)" },
      { name: "Marshall's Acid", formula: "H₂S₂O₈ (Peroxodisulphuric acid)", description: "Contains peroxy linkage (-O-O-) with S in +6 state" },
      { name: "Pyrophosphoric Acid", formula: "H₄P₂O₇", description: "Contains P-O-P linkage with four ionizable -OH groups" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Believing KMnO4 color is due to d-d transition.",
        correction: "Mn in KMnO4 is Mn⁷⁺ which has d⁰ configuration (no d-electrons!). Its intense color is due to Charge Transfer from Oxygen to Manganese."
      },
    ]
  },

  // 6. Thermodynamics & Chemical Equilibrium
  {
    id: "note_chem_thermo_equilibrium",
    chapter: "Thermodynamics & Equilibrium",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Enthalpy, Entropy, Gibbs Energy, Le Chatelier's Principle & pH Notes",
    summary: "Hess's Law, Enthalpy of reaction, Entropy change (ΔS), Gibbs spontaneity criterion (ΔG = ΔH - TΔS), Equilibrium constants (Kp & Kc), Le Chatelier's Principle, and Buffer solutions.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Chemical Thermodynamics & Spontaneity",
        points: [
          "First Law of Chemical Thermodynamics: ΔU = q + w (IUPAC sign convention: w = - P_ext ΔV).",
          "Enthalpy: H = U + P V => ΔH = ΔU + Δn_g R T (where Δn_g = moles of gaseous products - moles of gaseous reactants).",
          "Hess's Law of Constant Heat Summation: Total enthalpy change of a reaction is the same whether it occurs in one step or several steps.",
          "Entropy (S): Measure of molecular randomness. ΔS = q_rev / T. For phase change: ΔS_fus = ΔH_fus / T_m.",
          "Gibbs Free Energy: ΔG = ΔH - T ΔS.",
          "Spontaneity Criteria: If ΔG < 0 (Spontaneous / Exergonic); If ΔG = 0 (At Equilibrium); If ΔG > 0 (Non-spontaneous / Endergonic).",
          "Temperature dependence of Spontaneity: When ΔH < 0 and ΔS > 0 => Spontaneous at ALL temperatures.",
        ],
        keyFormula: "ΔH = ΔU + Δn_g R T | ΔG = ΔH - T ΔS | ΔG° = - 2.303 R T log K_eq"
      },
      {
        title: "2. Chemical & Ionic Equilibrium",
        points: [
          "Relation between K_p and K_c: K_p = K_c (R T)^(Δn_g).",
          "Le Chatelier's Principle: If a stress (change in concentration, pressure, temperature) is applied to a system at equilibrium, the equilibrium shifts in the direction that tends to counteract the change.",
          "Exothermic reaction (ΔH < 0): Favorable at LOW temperature; Endothermic reaction (ΔH > 0): Favorable at HIGH temperature.",
          "Pressure increase shifts equilibrium towards FEWER moles of gas.",
          "Ostwald's Dilution Law for weak acid: K_a = C α² / (1 - α) ≈ C α² => α = √(K_a / C) and [H⁺] = √(K_a · C).",
          "pH & pOH: pH = - log10[H⁺], pH + pOH = 14 (at 298 K).",
          "Henderson-Hasselbalch Equation for Acidic Buffer: pH = pK_a + log10([Salt] / [Acid]).",
          "Solubility Product (K_sp): For salt A_x B_y ⇌ x A^(y+) + y B^(x-): K_sp = x^x · y^y · S^(x+y).",
        ],
        keyFormula: "K_p = K_c (RT)^(Δn_g) | pH = pK_a + log([Salt]/[Acid]) | K_sp = x^x y^y S^(x+y)"
      },
    ],
    quickRevisionPoints: [
      { en: "Adding an inert gas at CONSTANT VOLUME has NO effect on equilibrium; adding at CONSTANT PRESSURE shifts towards greater number of gas moles." },
      { en: "Water ionic product K_w = 1.0 × 10⁻¹⁴ at 25°C; Kw increases with temperature because auto-ionization of water is endothermic." },
    ],
    keyFormulasTable: [
      { name: "Gibbs-Helmholtz", formula: "ΔG = ΔH - T ΔS", description: "Fundamental thermodynamic criterion of spontaneity" },
      { name: "Kp-Kc Relation", formula: "K_p = K_c (R T)^(Δn_g)", description: "Conversion between pressure and molar equilibrium constants" },
      { name: "Henderson Equation", formula: "pH = pK_a + log([Conjugate Base]/[Acid])", description: "pH calculation for buffer solutions" },
      { name: "Solubility Product", formula: "K_sp = [M^(n+)]^x [X^(m-)]^y", description: "Equilibrium constant for sparingly soluble salts" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Calculating Δn_g by including solid or liquid phases.",
        correction: "Δn_g includes ONLY stoichiometric coefficients of GASEOUS products and reactants: Δn_g = Σ n_g(products) - Σ n_g(reactants)."
      },
    ]
  },

  // 7. Coordination Compounds
  {
    id: "note_chem_coordination_compounds",
    chapter: "Coordination Compounds",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "IUPAC Nomenclature, Werner's Theory, VBT, CFT & Isomerism Notes",
    summary: "Werner's Primary & Secondary valencies, IUPAC naming rules, Structural & Stereoisomerism, Valence Bond Theory (Inner vs Outer orbital complexes), Crystal Field Splitting (Δ_o & Δ_t), and Synergic bonding.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Werner's Theory & IUPAC Nomenclature",
        points: [
          "Werner's Theory: Primary Valency is ionizable and corresponds to Oxidation State; Secondary Valency is non-ionizable, directional, and corresponds to Coordination Number.",
          "Coordination Number (CN): Total number of ligand donor atoms directly bonded to central metal atom (e.g., [Co(en)₃]³⁺ has CN = 6 because 'en' is bidentate).",
          "IUPAC Naming Order: Cation named first, then Anion. Ligands listed alphabetically before metal name. Anionic ligands end in '-o' (e.g., chlorido, oxalato), neutral ligands: aqua (H₂O), ammine (NH₃), carbonyl (CO).",
          "If coordination sphere is an anion, metal name ends in '-ate' (e.g., ferrate, cuprate, platinate) with oxidation number in Roman numerals in parentheses.",
        ],
        keyFormula: "Coordination Number = Number of Ligands × Denticity"
      },
      {
        title: "2. Valence Bond Theory (VBT) & Crystal Field Theory (CFT)",
        points: [
          "Spectrochemical Series (Ligand field strength): I⁻ < Br⁻ < S²⁻ < Cl⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < CN⁻ < CO.",
          "Strong Field Ligands (e.g., CN⁻, CO, en, NH₃): Cause pairing of d-electrons against Hund's rule => form Low Spin / Inner Orbital Complexes (d²sp³).",
          "Weak Field Ligands (e.g., F⁻, Cl⁻, H₂O): Cannot force electron pairing => form High Spin / Outer Orbital Complexes (sp³d²).",
          "Octahedral CFT Splitting: d-orbitals split into lower t₂g (dxy, dyz, dxz) of energy -0.4 Δ_o and higher eg (dx²-y², dz²) of energy +0.6 Δ_o.",
          "Tetrahedral CFT Splitting: Inverted splitting without 'g' subscript: lower e (-0.6 Δ_t) and higher t₂ (+0.4 Δ_t). Relation: Δ_t = (4/9) Δ_o.",
          "Synergic Bonding in Metal Carbonyls [M(CO)ₙ]: Metal-carbon bond strengthens due to σ-bond donation (CO -> M) AND π-backbonding donation (filled d-orbital of M -> empty π* orbital of CO).",
        ],
        keyFormula: "Δ_t = (4/9) Δ_o | CFSE_oct = [ -0.4 n(t₂g) + 0.6 n(eg) ] Δ_o + nP",
        keyMnemonic: "Ligand strength: Halogens (weakest) < Oxygen donors < Nitrogen donors < Carbon donors (CN, CO strongest)."
      },
    ],
    quickRevisionPoints: [
      { en: "Geometrical Isomerism: [Ma₄b₂] and [Ma₃b₃] show cis-trans and fac-mer (facial-meridional) isomerism respectively." },
      { en: "Optical Isomerism: Cis-[Co(en)₂Cl₂]⁺ is chiral and optically active (resolvable into d and l isomers); Trans-[Co(en)₂Cl₂]⁺ has a plane of symmetry and is optically inactive." },
    ],
    keyFormulasTable: [
      { name: "CFT Tetrahedral vs Octahedral", formula: "Δ_t = (4/9) Δ_o", description: "Relation between tetrahedral and octahedral crystal field splitting" },
      { name: "Octahedral CFSE", formula: "CFSE = (-0.4 n_t2g + 0.6 n_eg) Δ_o", description: "Crystal field stabilization energy" },
      { name: "Spin-only Magnetic Moment", formula: "μ = √[ n (n + 2) ] BM", description: "Calculates paramagnetic moment from unpaired d electrons" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Denticity with Coordination Number.",
        correction: "Denticity is the number of donor atoms PER ligand (e.g. EDTA has denticity 6). Coordination number is total bonds to the metal."
      },
    ]
  },

  // 6. Aldehydes, Ketones & Carboxylic Acids
  {
    id: "note_chem_aldehydes_ketones_carboxylic",
    chapter: "Aldehydes, Ketones & Carboxylic Acids",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Aldol, Cannizzaro, Nucleophilic Addition, Tollens/Fehling & HVZ Reaction Notes",
    summary: "Carbonyl chemistry, Nucleophilic addition reactivity order, Aldol & Cross-Aldol condensation, Cannizzaro reaction, Clemmensen & Wolff-Kishner reductions, Iodoform test, Tollens/Fehling tests, and Carboxylic acid acidity order.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Carbonyl Reactivity & Important Named Reactions",
        points: [
          "Reactivity towards Nucleophilic Addition: HCHO > RCHO > ArCHO > R-CO-R > Ar-CO-Ar (Steric crowding and +I effect decrease reactivity).",
          "Aldol Condensation: Aldehydes/Ketones having at least one α-hydrogen in presence of dilute base (NaOH/Ba(OH)₂) -> β-hydroxy aldehyde/ketone -> heat -> α,β-unsaturated carbonyl.",
          "Cannizzaro Reaction: Aldehydes with NO α-hydrogen (HCHO, PhCHO, (CH₃)₃C-CHO) with concentrated 50% NaOH undergo disproportionation (self redox) -> 1 molecule oxidized to Carboxylate salt + 1 molecule reduced to Alcohol.",
          "Cross-Cannizzaro: When HCHO reacts with PhCHO in conc. NaOH, HCHO is ALWAYS oxidized to Formate (HCOONa) and PhCHO is reduced to Benzyl alcohol (PhCH₂OH).",
          "Clemmensen Reduction: Carbonyl (>C=O) -> Alkane (-CH₂-) using Zn-Hg + conc. HCl (suitable for acid-stable groups).",
          "Wolff-Kishner Reduction: Carbonyl (>C=O) -> Alkane (-CH₂-) using NH₂-NH₂ + KOH / Ethylene glycol + heat (suitable for base-stable groups).",
          "Rosenmund Reduction: Acyl chloride (RCOCl) + H₂ / Pd-BaSO₄ (poisoned with quinoline/S) -> Aldehyde (RCHO).",
          "Stephen Reaction: Nitrile (R-C≡N) + SnCl₂/HCl -> Imine hydrochloride -> H₃O⁺ -> RCHO.",
        ],
        keyFormula: "HCHO + 50% NaOH -> HCOONa + CH₃OH (Cannizzaro) | >C=O + Zn-Hg/HCl -> -CH₂-",
        keyMnemonic: "Aldol needs ALPHA-H; Cannizzaro CANNOT have alpha-H."
      },
      {
        title: "2. Tests of Distinction & Carboxylic Acid Acidity",
        points: [
          "Tollens' Test (Silver Mirror Test): Aldehydes (aliphatic & aromatic) reduce ammoniacal AgNO₃ to Ag mirror. Ketones do NOT give Tollens test (except α-hydroxy ketones).",
          "Fehling's Test: Aliphatic aldehydes reduce alkaline CuSO₄ (Fehling A + B) to red precipitate of Cu₂O. Aromatic aldehydes (PhCHO) do NOT give Fehling test.",
          "Iodoform Test (Haloform Test): Compounds with CH₃-C=O group (Ethanal, all methyl ketones) or CH₃-CH(OH)- group (Ethanol, 2-alkanols) give yellow crystalline precipitate of CHI₃ (mp 119°C) with I₂/NaOH.",
          "Carboxylic Acid Acidity: R-COOH > Ph-OH > H₂O > R-OH > HC≡CH. -I/-M groups (NO₂, CN, F, Cl) INCREASE acidity; +I groups (CH₃, C₂H₅) DECREASE acidity.",
          "Acidity Order: CF₃COOH > CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > HCOOH > PhCOOH > CH₃COOH.",
          "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acid with α-H + X₂ (Cl₂/Br₂) in presence of Red Phosphorus -> α-halo carboxylic acid.",
        ],
        keyFormula: "R-COCH₃ + 3I₂ + 4NaOH -> R-COONa + CHI₃↓ (yellow) + 3NaI + 3H₂O"
      },
    ],
    quickRevisionPoints: [
      { en: "Formic acid (HCOOH) is the only carboxylic acid that gives Tollens and Fehling tests because it contains an aldehyde -CHO group." },
      { en: "Benzoic acid is stronger than acetic acid, but Formic acid (HCOOH) is stronger than Benzoic acid (PhCOOH)." },
    ],
    keyFormulasTable: [
      { name: "Iodoform Reagent", formula: "I₂ + NaOH (or NaOI)", description: "Detects methyl carbonyls and 2-hydroxy compounds producing yellow CHI₃" },
      { name: "Tollens Reagent", formula: "[Ag(NH₃)₂]⁺ OH⁻", description: "Mild oxidizing agent reduced to silver mirror by aldehydes" },
      { name: "Clemmensen Reagent", formula: "Zn-Hg + concentrated HCl", description: "Reduces carbonyl group to methylene in acidic medium" },
      { name: "Wolff-Kishner Reagent", formula: "NH₂NH₂ + KOH / Glycol", description: "Reduces carbonyl group to methylene in basic medium" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking Benzaldehyde gives a positive Fehling's test.",
        correction: "Benzaldehyde reduces Tollens' reagent but FAILS to reduce Fehling's solution."
      },
    ]
  },

  // 7. Chemical & Ionic Equilibrium
  {
    id: "note_chem_equilibrium_ionic",
    chapter: "Chemical & Ionic Equilibrium",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Le Chatelier, pH Calculations, Buffer Solutions & Solubility Product (Ksp) Notes",
    summary: "Law of Chemical Equilibrium, Kp vs Kc relations, Le Chatelier's Principle effects (T, P, Conc, Inert gas), Ostwald's Dilution Law, pH/pOH, Hydrolysis of Salts, Buffer Action & Henderson-Hasselbalch, and Ksp Precipitation criteria.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Chemical Equilibrium & Le Chatelier's Principle",
        points: [
          "Relation between K_p and K_c: K_p = K_c (R T)^(Δn_g), where Δn_g = (moles of gaseous products) - (moles of gaseous reactants).",
          "If Δn_g = 0 => K_p = K_c (e.g., H₂ + I₂ ⇌ 2HI, dimensionless).",
          "If Δn_g > 0 => K_p > K_c (at T > 1/R); If Δn_g < 0 => K_p < K_c (e.g., N₂ + 3H₂ ⇌ 2NH₃).",
          "Equilibrium constant K depends ONLY on TEMPERATURE; Catalyst and pressure do NOT change K.",
          "Le Chatelier's Principle:",
          "Temperature: Exothermic reaction (ΔH < 0) favors backward direction on heating (K decreases); Endothermic (ΔH > 0) favors forward direction on heating (K increases).",
          "Pressure: Increasing pressure shifts equilibrium towards FEWER moles of gas.",
          "Inert gas addition at Constant Volume: NO EFFECT on equilibrium.",
          "Inert gas addition at Constant Pressure: Shifts towards GREATER number of gaseous moles (Δn_g > 0).",
        ],
        keyFormula: "K_p = K_c (R T)^(Δn_g) | ΔG° = - 2.303 R T log K_eq"
      },
      {
        title: "2. Ionic Equilibrium, Buffers & Solubility Product (Ksp)",
        points: [
          "Ostwald Dilution Law: For weak electrolyte with dissociation degree α: K_a = C α² / (1 - α) ≈ C α² => α = √(K_a / C). [H⁺] = C α = √(K_a · C).",
          "pH and pOH: pH = -log₁₀[H⁺], pOH = -log₁₀[OH⁻]. At 25°C: pH + pOH = 14 (K_w = 1.0 × 10⁻¹⁴).",
          "Acidic Buffer (Weak Acid + Conjugate Salt, e.g., CH₃COOH + CH₃COONa): pH = pK_a + log₁₀([Salt] / [Acid]).",
          "Basic Buffer (Weak Base + Conjugate Salt, e.g., NH₄OH + NH₄Cl): pOH = pK_b + log₁₀([Salt] / [Base]), pH = 14 - pOH.",
          "Salt Hydrolysis pH Formulas:",
          "1. Strong Acid + Weak Base (NH₄Cl): pH = 7 - (1/2) pK_b - (1/2) log C (Acidic, pH < 7).",
          "2. Weak Acid + Strong Base (CH₃COONa): pH = 7 + (1/2) pK_a + (1/2) log C (Basic, pH > 7).",
          "3. Weak Acid + Weak Base (CH₃COONH₄): pH = 7 + (1/2) pK_a - (1/2) pK_b (Independent of C).",
          "Solubility Product (K_sp): For salt A_x B_y ⇌ x A^(y+) + y B^(x-), K_sp = x^x · y^y · S^(x+y).",
          "Precipitation Criteria: If Ionic Product (Q_sp) > K_sp => Precipitation occurs; If Q_sp < K_sp => Unsaturated solution (No ppt).",
        ],
        keyFormula: "pH = pK_a + log([Salt]/[Acid]) | K_sp = x^x · y^y · S^(x+y)"
      },
    ],
    quickRevisionPoints: [
      { en: "Common Ion Effect decreases the degree of ionization of a weak electrolyte (e.g., adding CH₃COONa suppresses ionization of CH₃COOH)." },
      { en: "Solubility of AgCl (AB type) K_sp = S² => S = √(K_sp); for Ag₂CrO₄ (A₂B type) K_sp = 4 S³ => S = ∛(K_sp / 4)." },
    ],
    keyFormulasTable: [
      { name: "Henderson Acidic Buffer", formula: "pH = pK_a + log([Salt] / [Acid])", description: "Calculates pH of acidic buffer mixture" },
      { name: "Henderson Basic Buffer", formula: "pOH = pK_b + log([Salt] / [Base])", description: "Calculates pOH of basic buffer mixture" },
      { name: "Equilibrium Constant Relation", formula: "K_p = K_c (R T)^(Δn_g)", description: "Interconverts partial pressure and concentration equilibrium constants" },
      { name: "Precipitation Condition", formula: "Q_sp > K_sp", description: "Condition where solute precipitates from solution" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting to include only GASEOUS species when calculating Δn_g in K_p = K_c(RT)^Δn_g.",
        correction: "Δn_g strictly includes GASEOUS molecules: Δn_g = n_gas(products) - n_gas(reactants). Pure solids and liquids have activity = 1."
      },
    ]
  },

  // 8. p-Block Elements (Groups 15 to 18)
  {
    id: "note_chem_p_block_elements",
    chapter: "p-Block Elements (Groups 15 to 18)",
    subject: "Chemistry",
    exams: ["NEET", "JEE_MAIN", "MHT_CET"],
    title: "Nitrogen, Phosphorus, Oxygen, Halogens & Noble Gas Compounds Notes",
    summary: "Inert pair effect, Anomalous properties of 2nd period, Ammonia Haber process, Nitric acid Ostwald process, Oxoacids of P and S, Interhalogens, and Xenon fluorides geometry & hydrolysis.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Group 15 (Nitrogen Family) & Group 16 (Oxygen Family)",
        points: [
          "Inert Pair Effect: Reluctance of valence s-electrons to participate in bonding down the group => lower oxidation state (+3 for Bi, +4 for Pb, +1 for Tl) is MORE stable than higher state (+5, +6, +3).",
          "Haber Process for NH₃: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92.4 kJ/mol). Optimum: 200 atm, 700 K, Fe catalyst with Mo promoter.",
          "Ostwald's Process for HNO₃: 4NH₃ + 5O₂ (Pt catalyst, 500 K, 9 bar) -> 4NO + 6H₂O -> 2NO + O₂ -> 2NO₂ -> 3NO₂ + H₂O -> 2HNO₃ + NO.",
          "Oxoacids of Phosphorus: H₃PO₂ (Hypophosphorous, 1 P-OH, Monobasic, strong reducing agent), H₃PO₃ (Phosphorous, 2 P-OH, Dibasic, reducing), H₃PO₄ (Orthophosphoric, 3 P-OH, Tribasic, non-reducing).",
          "Contact Process for H₂SO₄: 2SO₂ + O₂ (V₂O₅ catalyst, 450°C, 2 bar) -> 2SO₃ -> absorbed in H₂SO₄ -> H₂S₂O₇ (Oleum) + H₂O -> 2H₂SO₄.",
          "Anomalous behavior of N and O: Small size, high electronegativity, absence of d-orbitals (max covalency of N = 4, cannot form NCl₅).",
        ],
        keyFormula: "H₃PO₂ = Monobasic (1 P-OH, 2 P-H) | H₃PO₃ = Dibasic (2 P-OH, 1 P-H) | H₃PO₄ = Tribasic (3 P-OH)"
      },
      {
        title: "2. Group 17 (Halogens) & Group 18 (Noble Gases)",
        points: [
          "Electron Gain Enthalpy Order: Cl > F > Br > I (F has smaller size and strong inter-electronic repulsions in compact 2p subshell).",
          "Bond Dissociation Enthalpy: Cl₂ > Br₂ > F₂ > I₂ (F-F bond is weaker due to high lone pair repulsions).",
          "Oxidizing Power: F₂ > Cl₂ > Br₂ > I₂ (F₂ is the strongest oxidizing halogen due to high hydration energy).",
          "Bleaching Action: Cl₂ bleaches by OXIDATION (permanent); SO₂ bleaches by REDUCTION (temporary).",
          "Interhalogen Compounds (XX'ₙ): More reactive than pure halogens (except F₂) because X-X' bond is polar and weaker.",
          "Xenon Compounds Structures & Hybridization:",
          "XeF₂: sp³d hybridization, Linear geometry, 3 equatorial lone pairs (180°).",
          "XeF₄: sp³d² hybridization, Square Planar, 2 axial lone pairs (90°).",
          "XeF₆: sp³d³ hybridization, Distorted Octahedral, 1 lone pair.",
          "XeOF₄: sp³d² hybridization, Square Pyramidal.",
          "XeO₃: sp³ hybridization, Pyramidal.",
          "Hydrolysis of XeF₆: Complete hydrolysis gives explosive solid XeO₃: XeF₆ + 3H₂O -> XeO₃ + 6HF.",
        ],
        keyFormula: "XeF₂ = Linear (sp³d) | XeF₄ = Square Planar (sp³d²) | XeF₆ + 3H₂O -> XeO₃ + 6HF",
        keyMnemonic: "XeF₂: 2 bonds + 3 LP = 5 (sp³d, Linear) | XeF₄: 4 bonds + 2 LP = 6 (sp³d², Sq Planar)"
      },
    ],
    quickRevisionPoints: [
      { en: "Helium is used in diving apparatus mixed with oxygen (80% He + 20% O₂) because of its extremely low solubility in blood at high pressure." },
      { en: "Fluorine does NOT exhibit any positive oxidation state because it is the most electronegative element and lacks d-orbitals." },
    ],
    keyFormulasTable: [
      { name: "XeF₂ Geometry", formula: "Linear (sp³d)", description: "2 Xe-F single bonds with 3 equatorial lone pairs" },
      { name: "XeF₄ Geometry", formula: "Square Planar (sp³d²)", description: "4 Xe-F equatorial bonds with 2 axial lone pairs" },
      { name: "Oleum Reaction", formula: "SO₃ + H₂SO₄ -> H₂S₂O₇", description: "Formation of pyrosulfuric acid in contact process" },
      { name: "Phosphinic Acid", formula: "H₃PO₂ (Hypophosphorous)", description: "Monobasic strong reducing oxoacid with two direct P-H bonds" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming H₃PO₃ and H₃PO₂ have basicity equal to the number of Hydrogen atoms (i.e. 3).",
        correction: "Basicity is ONLY equal to the number of ionizable P-OH groups! H₃PO₄ is tribasic (3 P-OH), H₃PO₃ is dibasic (2 P-OH), and H₃PO₂ is monobasic (1 P-OH)."
      },
    ]
  },
  // 6. Haloalkanes & Haloarenes, Alcohols, Phenols & Ethers
  {
    id: "note_chem_organic_mechanisms",
    chapter: "Organic Chemistry (Haloalkanes, Alcohols & Amines)",
    subject: "Chemistry",
    exams: ["NEET", "MHT_CET", "JEE_MAIN"],
    title: "SN1 vs SN2 Mechanisms, Lucas Test, Reimer-Tiemann, Hoffmann Bromamide & Diazonium Reactions",
    summary: "Crucial Organic Chemistry reactions, stereochemistry, Lucas test for alcohol differentiation, acidity of phenols, and Diazonium salt conversions.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. SN1 vs SN2 Substitution Mechanism Comparison",
        points: [
          "SN1 Mechanism: Two-step mechanism via Carbocation intermediate. Rate = k[R-X] (Unimolecular). Reactivity order: 3° > 2° > 1° > CH₃X. Polar protic solvent (H₂O, EtOH) favors SN1. Stereochemistry: Racemization (Retention + Inversion).",
          "SN2 Mechanism: Single-step concerted mechanism via Pentacoordinated Transition State. Rate = k[R-X][Nu⁻] (Bimolecular). Reactivity order: CH₃X > 1° > 2° > 3°. Polar aprotic solvent (Acetone, DMSO, DMF) favors SN2. Stereochemistry: 100% Walden Inversion.",
          "Allylic & Benzylic Halides: Undergo fast SN1 AND fast SN2 due to resonance stabilization of both carbocation and transition state.",
          "Aryl and Vinyl halides are extremely inert towards nucleophilic substitution due to partial double bond character (resonance) and sp² hybridized carbon.",
        ],
        keyFormula: "SN1: 3° > 2° > 1° (Carbocation, Racemic) | SN2: 1° > 2° > 3° (Transition State, Inversion)",
        keyMnemonic: "SN1 = 1 substrate in rate law (3° best) | SN2 = 2 molecules collide (1° unhindered best)"
      },
      {
        title: "2. Name Reactions: Reimer-Tiemann, Kolbe, Williamson & Hoffmann",
        points: [
          "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH => Salicylaldehyde (Electrophile is Dichlorocarbene :CCl₂).",
          "Kolbe's Reaction: Phenol + NaOH + CO₂ (4-7 atm, 400 K) => Salicylic acid (precursor for Aspirin).",
          "Lucas Test (Anhydrous ZnCl₂ + conc. HCl): 3° alcohol gives instant turbidity (cloudiness); 2° alcohol gives turbidity in 5 minutes; 1° alcohol gives no turbidity at room temperature.",
          "Williamson Ether Synthesis: R-X + R'-O⁻Na⁺ => R-O-R'. R-X must be 1° alkyl halide! If 3° R-X is used, Alkene is formed via Elimination (E2).",
          "Hoffmann Bromamide Degradation: 1° Amide + Br₂ + 4 KOH => 1° Amine with ONE LESS CARBON atom (R-CONH₂ -> R-NH₂ + K₂CO₃ + 2KBr + 2H₂O).",
          "Carbylamine Test (Isocyanide test): 1° Amine (Aliphatic or Aromatic) + CHCl₃ + 3 KOH => Extremely foul-smelling Isocyanide (R-NC). 2° and 3° amines DO NOT give this test.",
          "Gabriel Phthalimide Synthesis: Used for preparation of pure 1° Aliphatic amines ONLY. Aromatic 1° amines (Aniline) cannot be prepared by this method because aryl halides do not undergo nucleophilic attack on phthalimide anion.",
        ],
        keyFormula: "R-CONH₂ + Br₂ + 4KOH -> R-NH₂ (1 less carbon) | Lucas Reagent = Anhydrous ZnCl₂ + Conc. HCl"
      },
    ],
    quickRevisionPoints: [
      { en: "Phenol is more acidic than Alcohols because the phenoxide ion is resonance stabilized, whereas alkoxide ion has no resonance." },
      { en: "Picric acid is 2,4,6-trinitrophenol and is a strong acid even without a carboxylic group due to 3 strong -M and -I NO₂ groups." },
      { en: "Sandmeyer reaction replaces diazonium group with Cl, Br, or CN using Cu₂Cl₂/HCl, Cu₂Br₂/HBr, or CuCN/KCN." },
    ],
    keyFormulasTable: [
      { name: "Lucas Test", formula: "Anhyd. ZnCl₂ + Conc. HCl", description: "Differentiates 1°, 2°, 3° alcohols based on turbidity time" },
      { name: "Reimer-Tiemann Electrophile", formula: ":CCl₂ (Dichlorocarbene)", description: "Generated from CHCl₃ + OH⁻ via alpha-elimination" },
      { name: "Aspirin Synthesis", formula: "Salicylic Acid + Acetic Anhydride -> Aspirin", description: "Acetylsalicylic acid painkiller and blood thinner" },
      { name: "Carbylamine Reaction", formula: "R-NH₂ + CHCl₃ + 3KOH -> R-NC + 3KCl + 3H₂O", description: "Specific detection test for primary aliphatic/aromatic amines" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Attempting Gabriel Phthalimide synthesis to synthesize Aniline (Aromatic 1° amine).",
        correction: "Gabriel Phthalimide can ONLY synthesize aliphatic 1° amines because aryl halides do not undergo SN2 substitution with potassium phthalimide."
      },
    ]
  },
];
