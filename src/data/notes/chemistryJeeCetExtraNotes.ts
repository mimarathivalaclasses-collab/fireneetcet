import { TopicNote } from "../../types";

export const CHEMISTRY_JEE_CET_EXTRA_NOTES: TopicNote[] = [
  // 1. Mole Concept & Stoichiometry
  {
    id: "note_chem_mole_concept",
    chapter: "Some Basic Concepts of Chemistry & Mole Concept",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Mole Concept, Stoichiometry, Limiting Reagent & Concentration Terms Master Sheet",
    summary: "Essential physical chemistry numerical foundation: Mole definitions (N_A = 6.022 × 10²³), Molar volume at STP (22.7 L or 22.4 L), Molarity, Molality, Normality, Mole fraction, Limiting Reagent calculations, and Empirical to Molecular Formula conversion.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. The Mole Concept & Avogadro's Number",
        points: [
          "1 Mole = Amount of substance containing as many elementary entities as atoms in exactly 12 g of Carbon-12 = 6.022 × 10²³ particles (Avogadro Constant N_A).",
          "Number of moles (n):",
          "• In terms of mass: n = Mass in grams (w) / Molar mass in g/mol (M).",
          "• In terms of particles: n = Number of particles (N) / N_A.",
          "• In terms of ideal gas volume at STP: n = Volume in Liters at STP / 22.4 L (or 22.7 L under modern standard 1 bar, 273.15 K).",
          "Gram Atomic Mass (GAM) = Mass of 1 mole of atoms in grams.",
          "Gram Molecular Mass (GMM) = Mass of 1 mole of molecules in grams.",
          "Mass of a single atom = (Atomic mass in grams) / N_A. Mass of 1 atom of C-12 = 12 / (6.022 × 10²³) ≈ 1.99 × 10⁻²³ g.",
          "1 Atomic Mass Unit (1 amu or 1 u or 1 Dalton) = 1/12th mass of a C-12 atom = 1 / N_A = 1.66056 × 10⁻²⁴ g = 1.66056 × 10⁻²⁷ kg.",
          "Vapor Density (VD) = Density of gas / Density of H₂ gas = (Molar Mass of gas) / 2 => Molar Mass = 2 × VD.",
        ],
        keyFormula: "n = w / M = N / N_A = V_STP / 22.4 L | Molar Mass = 2 × VD",
        keyMnemonic: "Mole Triad: Mass / MolarMass = Particles / N_A = Volume_STP / 22.4",
        examTip: "In NEET/CET: To find total number of electrons in 1.6 g of CH₄: Moles of CH₄ = 1.6 / 16 = 0.1 mol. Each CH₄ molecule has 6 + 4(1) = 10 electrons. Total electrons = 0.1 × N_A × 10 = 1 N_A = 6.022 × 10²³ electrons."
      },
      {
        title: "2. Concentration Units: Molarity, Molality, Normality & PPM",
        points: [
          "Molarity (M): Moles of solute per liter of solution: M = n_solute / V_solution (in L) = (w₂ × 1000) / (M₂ × V_mL). Unit: mol/L. Dependent on Temperature (changes with T because volume changes).",
          "Molality (m): Moles of solute per kg of solvent: m = n_solute / W_solvent (in kg) = (w₂ × 1000) / (M₂ × W_solvent in g). Unit: mol/kg. INDEPENDENT of Temperature!",
          "Normality (N): Gram equivalents of solute per liter of solution: N = Gram equivalents / V_in_L = Molarity × n-factor (valence factor).",
          "n-factor (Valence factor):",
          "• For Acids: Basicity (number of replaceable H⁺ ions). HCl = 1, H₂SO₄ = 2, H₃PO₄ = 3, H₃PO₃ = 2 (dibasic!), H₃PO₂ = 1 (monobasic!).",
          "• For Bases: Acidity (number of replaceable OH⁻ ions). NaOH = 1, Ca(OH)₂ = 2, Al(OH)₃ = 3.",
          "• For Salts: Total positive or negative charge on ions. NaCl = 1, Na₂CO₃ = 2, Al₂(SO₄)₃ = 6.",
          "Mole Fraction (χ): χ_A = n_A / (n_A + n_B). Sum of mole fractions of all components is always 1 (χ_A + χ_B = 1). Independent of Temperature.",
          "Relation between Molarity (M) and Molality (m) with density d (in g/mL): m = (1000 × M) / [ 1000 d - (M × M₂) ].",
          "Dilution Formula: M₁ V₁ = M₂ V₂ | Mixing Formula: M_mix = (M₁ V₁ + M₂ V₂) / (V₁ + V₂).",
        ],
        keyFormula: "N = M × n-factor | m = (w₂ × 1000)/(M₂ × W_solvent_g) | M₁V₁ = M₂V₂",
        keyMnemonic: "Temperature Independent = Molality (m) and Mole Fraction (χ) because mass doesn't expand!",
        examTip: "NEET Repeat Question: H₃PO₃ has basicity 2 (two replaceable P-OH hydrogens) and 1 non-ionizable P-H bond, so for 0.1 M H₃PO₃, Normality is 0.2 N."
      },
      {
        title: "3. Stoichiometry, Limiting Reagent & Empirical Formula",
        points: [
          "Stoichiometric Calculations: Based on balanced chemical equation. Moles of reactant consumed and products formed are proportional to their stoichiometric coefficients.",
          "Limiting Reagent (LR): The reactant that is completely consumed first in a reaction, thereby limiting the maximum amount of product that can be formed.",
          "How to identify Limiting Reagent: For each reactant, calculate ratio: (Given Moles) / (Stoichiometric Coefficient). The reactant with the SMALLEST ratio is the Limiting Reagent!",
          "Empirical Formula (EF): Simplest whole number ratio of atoms of each element in a compound. Steps:",
          "1. Divide % composition of each element by its Atomic Mass to get Relative Number of Moles.",
          "2. Divide all mole values by the SMALLEST mole value to get Simplest Atomic Ratio.",
          "3. If ratio is fractional, multiply by smallest integer to make all whole numbers.",
          "Molecular Formula (MF) = (Empirical Formula)_n, where n = (Molar Mass) / (Empirical Formula Mass).",
        ],
        keyFormula: "LR Criterion = Min(Given Moles / Stoichiometric Coeff) | MF = (EF)_n",
        keyMnemonic: "Smallest Moles/Coefficient ratio is ALWAYS the Limiting Reagent!",
        examTip: "Example: 2H₂ + O₂ -> 2H₂O. If 3 moles H₂ and 2 moles O₂ are reacted: H₂ ratio = 3/2 = 1.5; O₂ ratio = 2/1 = 2. Since 1.5 < 2, H₂ is the Limiting Reagent, and exactly 3 moles of H₂O will form."
      },
    ],
    quickRevisionPoints: [
      { en: "1 mole of any ideal gas at STP occupies 22.4 L (or 22.7 L under IUPAC 1 bar standard)." },
      { en: "Molality and Mole Fraction do not change with temperature, whereas Molarity decreases with rising temperature." },
      { en: "Phosphorous acid H₃PO₃ is dibasic (n-factor = 2); Hypophosphorous acid H₃PO₂ is monobasic (n-factor = 1)." },
      { en: "Molar mass of any gas is exactly twice its vapor density: M = 2 × VD." },
    ],
    keyFormulasTable: [
      { name: "Avogadro Number", formula: "N_A = 6.022 × 10²³ mol⁻¹", description: "Number of entities in 1 mole" },
      { name: "Molarity Equation", formula: "M = (w₂ × 1000) / (M₂ × V_mL)", description: "Moles solute per liter solution" },
      { name: "Normality Relation", formula: "N = M × n-factor", description: "n-factor = basicity/acidity/valence" },
      { name: "Vapor Density", formula: "Molar Mass = 2 × VD", description: "Relative to H₂ gas density" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming H₃PO₃ is tribasic because it contains 3 hydrogen atoms in its formula.",
        correction: "Only hydrogens attached directly to oxygen (P-OH) are ionizable. H₃PO₃ has two P-OH and one direct P-H bond, so basicity is 2 (dibasic)."
      },
    ]
  },

  // 2. Periodic Table & Periodic Trends
  {
    id: "note_chem_periodic_table",
    chapter: "Classification of Elements & Periodic Trends",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Modern Periodic Table, Ionization Energy, Electron Gain Enthalpy & Electronegativity",
    summary: "Complete inorganic foundation: Modern Periodic Law (Moseley, Z-dependence), Screening effect & Effective Nuclear Charge Z_eff, Atomic/Ionic radii trends, Anomalous Ionization Enthalpy (Be > B, N > O), Electron Gain Enthalpy exceptions (Cl > F, S > O), and Pauling Electronegativity scale.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Modern Periodic Law & Screening Effect (Slater's Rules)",
        points: [
          "Moseley's Experiment (1913): √ν = a (Z - b). Proved that Atomic Number (Z), not atomic mass, is the fundamental property of elements.",
          "Modern Periodic Law: Physical and chemical properties of elements are periodic functions of their Atomic Numbers (Z).",
          "Effective Nuclear Charge: Z_eff = Z - σ, where σ is the screening / shielding constant of inner core electrons.",
          "Shielding power of orbitals: s > p > d > f (d and f orbitals have diffused shape and provide poor shielding).",
          "Consequences of Poor Shielding by 3d/4f electrons:",
          "• Transition Contraction: Ga radius (135 pm) is slightly smaller than Al radius (143 pm) due to poor shielding of 10 intervening 3d electrons!",
          "• Lanthanoid Contraction: Due to poor shielding of 14 intervening 4f electrons, Zr and Hf have almost IDENTICAL atomic radii (Zr ≈ 160 pm, Hf ≈ 159 pm); similarly Nb ≈ Ta, Mo ≈ W.",
        ],
        keyFormula: "Z_eff = Z - σ | Moseley: √ν = a(Z - b) | Zr ≈ Hf (Lanthanoid Contraction)",
        keyMnemonic: "Shielding order: 'Sharp (s) > Principal (p) > Diffuse (d) > Fundamental (f)'.",
        examTip: "JEE Main PYQ: Why do Zr (4d series) and Hf (5d series) have almost identical atomic and ionic radii? Answer: Lanthanoid Contraction due to poor shielding of 4f electrons."
      },
      {
        title: "2. Atomic Radii & Ionization Enthalpy Anomalies",
        points: [
          "Atomic Radii: Decreases across a period (left to right) due to increasing Z_eff; Increases down a group due to addition of new shells.",
          "Noble gases have the largest radius in their respective period because their radius is measured as Van der Waals radius (no covalent bond formed).",
          "Ionic Radii: Cation is always SMALLER than parent atom (Na⁺ < Na); Anion is always LARGER than parent atom (Cl⁻ > Cl).",
          "Isoelectronic Species (same number of electrons, e.g. N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ - all have 10 e⁻): Radius DECREASES with increasing atomic number Z (Radius ∝ 1 / Z): Al³⁺ < Mg²⁺ < Na⁺ < F⁻ < O²⁻ < N³⁻.",
          "First Ionization Enthalpy (Δ_i H₁): Energy required to remove most loosely bound electron from an isolated gaseous atom. General trend: Increases across period, decreases down group.",
          "Crucial Ionization Enthalpy Exceptions:",
          "• Beryllium vs Boron: Be (1s² 2s²) > B (1s² 2s² 2p¹). Be has completely filled stable 2s orbital and electron is removed from penetrating 2s subshell; in B, electron is removed from less penetrating 2p.",
          "• Nitrogen vs Oxygen: N (1s² 2s² 2p³) > O (1s² 2s² 2p⁴). Nitrogen has half-filled stable 2p³ configuration with extra exchange energy, whereas Oxygen easily loses 1 electron from paired 2p⁴ to attain stable half-filled state.",
          "Successive Ionization Energies: IE₁ < IE₂ < IE₃ << IE₄. A sudden huge jump indicates removal of electron from a noble gas stable shell (e.g. huge jump from IE₂ to IE₃ indicates Group 2 alkaline earth metal like Mg).",
        ],
        keyFormula: "Isoelectronic size: Radius ∝ 1/Z | IE Order: Li < B < Be < C < O < N < F < Ne",
        keyMnemonic: "Remember Period 2 IE order: Li < B < Be < C < O < N < F < Ne (Be jumps over B; N jumps over O).",
        examTip: "Repeated NEET/JEE Question: Correct order of 1st Ionization enthalpy for Period 2 elements is Li < B < Be < C < O < N < F < Ne."
      },
      {
        title: "3. Electron Gain Enthalpy & Electronegativity",
        points: [
          "Electron Gain Enthalpy (Δ_eg H): Enthalpy change when an electron is added to an isolated neutral gaseous atom to form anion. More negative = greater electron affinity.",
          "Halogens have the most negative electron gain enthalpies in their respective periods.",
          "Crucial 2nd Period vs 3rd Period Exceptions (Extremely High Yield in NEET/JEE!):",
          "• Chlorine vs Fluorine: Electron gain enthalpy of Chlorine is MORE negative than Fluorine (Cl > F!). Reason: Compact size of 2p subshell in F results in strong inter-electronic repulsions for incoming electron; 3p in Cl is larger with less repulsion.",
          "Order of Halogen Electron Affinity: Cl > F > Br > I.",
          "• Sulfur vs Oxygen: S has MORE negative electron gain enthalpy than O (S > O). Order of Group 16: S > Se > Te > Po > O (Oxygen has LEAST negative Δ_eg H in its group!).",
          "Noble gases have large positive electron gain enthalpies because incoming electron enters the next higher principal quantum shell.",
          "Electronegativity: Qualitative measure of ability of an atom in a molecule to attract shared pair of electrons towards itself. Pauling Scale: Fluorine is most electronegative element (EN = 4.0).",
          "Electronegativity order: F (4.0) > O (3.5) > N (3.0) ≈ Cl (3.0) > Br (2.8) > I (2.5) ≈ C (2.5) > H (2.1).",
        ],
        keyFormula: "Halogen Electron Affinity: Cl > F > Br > I | Pauling: F = 4.0, O = 3.5, N = 3.0",
        keyMnemonic: "Cl beats F in Electron Gain, but F beats Cl in Electronegativity!",
        examTip: "Classic NEET Trap: Which has highest electron affinity? Answer: Chlorine (Cl), NOT Fluorine. Which is most electronegative? Answer: Fluorine (F)."
      },
    ],
    quickRevisionPoints: [
      { en: "Zr and Hf have almost identical atomic radii due to Lanthanoid Contraction." },
      { en: "In Period 2, Ionization Enthalpy of Be > B (penetrating 2s²) and N > O (stable half-filled 2p³)." },
      { en: "Chlorine has higher electron gain enthalpy than Fluorine due to less electron-electron repulsion in 3p." },
      { en: "Fluorine is the most electronegative element in the entire periodic table (Pauling value = 4.0)." },
    ],
    keyFormulasTable: [
      { name: "Effective Nuclear Charge", formula: "Z_eff = Z - σ", description: "Slater's shielding constant σ" },
      { name: "Moseley's Law", formula: "√ν = a (Z - b)", description: "Proved atomic number basis" },
      { name: "Halogen Affinity Order", formula: "Cl > F > Br > I", description: "Cl is highest in entire periodic table" },
      { name: "Group 16 Affinity Order", formula: "S > Se > Te > Po > O", description: "Oxygen is lowest in group" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Choosing Fluorine as the element with highest electron affinity.",
        correction: "Fluorine is the most ELECTRONEGATIVE, but CHLORINE has the highest negative electron gain enthalpy (electron affinity) due to lower electron-electron repulsion."
      },
    ]
  },

  // 3. Hydrocarbons: Alkanes, Alkenes, Alkynes & Aromatic
  {
    id: "note_chem_hydrocarbons",
    chapter: "Hydrocarbons (Alkanes, Alkenes, Alkynes & Aromatic)",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Markovnikov Rule, Ozonolysis, Wurtz, Anti-Markovnikov & Huckel's Rule Sheet",
    summary: "High-yield organic chemistry revision covering Wurtz reaction, Kolbe's electrolytic synthesis, Markovnikov addition vs Kharasch peroxide effect, Ozonolysis cleavage products, Acidity of terminal alkynes, and Huckel's 4n+2 aromaticity criterion.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Alkanes: Preparations, Wurtz Reaction & Free Radical Halogenation",
        points: [
          "Wurtz Reaction: 2 R-X + 2 Na (in dry ether) -> R-R + 2 NaX. Best suited for preparation of symmetrical alkanes with EVEN number of carbon atoms (e.g. ethane, butane). Methane CANNOT be prepared by Wurtz reaction. Unsymmetrical mixtures (R-X + R'-X) give complex mixture of 3 alkanes (R-R, R'-R', R-R') hard to separate.",
          "Kolbe's Electrolytic Method: Electrolysis of aqueous sodium/potassium carboxylate: 2 R-COONa + 2 H₂O -> R-R + 2 CO₂ (at anode) + H₂ + 2 NaOH (at cathode). Anode: Alkane + CO₂; Cathode: H₂ gas. Methane cannot be prepared.",
          "Decarboxylation: R-COONa + Soda lime (NaOH + CaO in 3:1 ratio) heated -> R-H + Na₂CO₃. Alkane formed has ONE CARBON LESS than parent carboxylic acid!",
          "Free Radical Halogenation of Alkanes: Reactivity: F₂ > Cl₂ > Br₂ > I₂. Fluorination is explosive (performed diluted with inert gas); Iodination is reversible (conducted in presence of oxidizing agent like HNO₃/HIO₃).",
          "Relative reactivity of C-H bonds towards Chlorination at room temp: 3° (5.0) : 2° (3.8) : 1° (1.0). Towards Bromination (highly selective): 3° (1600) : 2° (82) : 1° (1). Bromination gives almost exclusively the 3° alkyl bromide!",
        ],
        keyFormula: "Wurtz: 2 R-X + 2 Na -> R-R | Soda Lime Decarboxylation: R-COONa -> R-H",
        keyMnemonic: "Wurtz = Even symmetrical carbons only; Soda Lime = Loses one Carbon as CO₃²⁻.",
        examTip: "NEET Question: Kolbe's electrolysis yields alkane and CO₂ at the ANODE and H₂ at the CATHODE with solution becoming basic (NaOH formed, pH increases)."
      },
      {
        title: "2. Alkenes: Markovnikov Rule, Peroxide Effect & Ozonolysis",
        points: [
          "Markovnikov's Rule: In electrophilic addition of an unsymmetrical reagent (like HX) to an unsymmetrical alkene, the negative part of the addendum attaches to the double-bonded carbon containing LESSER number of hydrogen atoms (proceeds via most stable carbocation: 3° > 2° > 1°).",
          "Example: CH₃-CH=CH₂ + HBr -> CH₃-CH(Br)-CH₃ (2-Bromopropane is major).",
          "Anti-Markovnikov's Addition (Kharasch / Peroxide Effect): Addition of HBr (ONLY HBr, NOT HCl or HI!) in the presence of organic peroxides (like benzoyl peroxide) proceeds via Free Radical mechanism where Br attaches to carbon with MORE hydrogen atoms.",
          "Example: CH₃-CH=CH₂ + HBr (Peroxide) -> CH₃-CH₂-CH₂-Br (1-Bromopropane is major).",
          "Why only HBr? HCl bond is too strong (heterolysis endothermic); HI gives I atoms which readily recombine to I₂ instead of adding to alkene double bond.",
          "Ozonolysis (O₃ followed by Zn / H₂O reductive workup): Cleaves C=C double bond completely and replaces it with two C=O carbonyl groups.",
          "• =CH₂ yields Formaldehyde (HCHO).",
          "• =CH-R yields Aldehyde (R-CHO).",
          "• =C(R)(R') yields Ketone (R-CO-R').",
          "Zn dust is essential: Zn destroys H₂O₂ preventing oxidation of aldehydes to carboxylic acids.",
        ],
        keyFormula: "Markovnikov = Negative to less H | Anti-Markovnikov = ONLY for HBr + Peroxide",
        keyMnemonic: "Markovnikov: 'Rich get richer' (H goes to C with more H; Br goes to C with fewer H).",
        examTip: "Identifying unknown alkene by ozonolysis: Join the two carbonyl products back together at oxygen atoms with a double bond! E.g. Acetone + Formaldehyde -> 2-Methylprop-1-ene."
      },
      {
        title: "3. Alkynes Acidity & Aromaticity (Huckel's 4n+2 Rule)",
        points: [
          "Acidity of Terminal Alkynes: Terminal alkynes (HC≡CH, R-C≡CH) possess acidic sp-hybridized hydrogen (50% s-character, highest electronegativity). React with sodium metal or sodamide (NaNH₂) to liberate H₂ gas:",
          "HC≡CH + 2 Na -> Na⁺ ⁻C≡C⁻ Na⁺ + H₂ ↑.",
          "Acidity Order: HC≡CH > CH₃-C≡CH >> CH₂=CH₂ > CH₃-CH₃.",
          "Hydration of Alkynes (Kucherov Reaction): Addition of H₂O in presence of 1% HgSO₄ / 40% H₂SO₄ at 333 K:",
          "• Ethyne (HC≡CH) gives ACETALDEHYDE (CH₃CHO) via tautomerization of vinyl alcohol.",
          "• Propyne (CH₃-C≡CH) and all higher alkynes give KETONES (Acetone).",
          "Huckel's Rule of Aromaticity: A compound is Aromatic if it satisfies all 4 conditions:",
          "1. Cyclic ring system.",
          "2. Planar geometry (all ring atoms are sp² or sp hybridized).",
          "3. Complete cyclic delocalization of π-electrons throughout the ring.",
          "4. Contains (4n + 2) π-electrons, where n = 0, 1, 2, 3... (i.e. 2, 6, 10, 14, 18 π electrons).",
          "Anti-Aromatic Compounds: Cyclic, planar, completely conjugated, but possess 4n π-electrons (e.g. Cyclobutadiene has 4 π e⁻, n = 1). Highly unstable!",
          "Non-Aromatic: Any compound that breaks planarity or has an sp³ atom disrupting conjugation (e.g. 1,3-Cyclohexadiene, Cyclooctatetraene which assumes non-planar tub shape).",
        ],
        keyFormula: "Huckel's Rule: (4n + 2) π electrons | Alkyne Hydration: Ethyne -> Acetaldehyde",
        keyMnemonic: "Aromatic: 4n + 2 π e⁻ (Stable). Anti-aromatic: 4n π e⁻ (Very Unstable).",
        examTip: "Direct NEET Question: Cyclooctatetraene (8 π electrons) is NON-aromatic (NOT anti-aromatic) because it bends into a non-planar tub conformation to avoid anti-aromaticity."
      },
    ],
    quickRevisionPoints: [
      { en: "Wurtz reaction cannot be used to prepare methane (CH₄) or odd-carbon alkanes in good yield." },
      { en: "Peroxide effect (Anti-Markovnikov addition) occurs ONLY with HBr, not with HCl or HI." },
      { en: "Terminal alkynes react with NaNH₂ or ammoniacal AgNO₃ due to acidic hydrogen on sp-hybridized carbon." },
      { en: "Huckel's rule requires (4n + 2) delocalized π electrons in a planar cyclic conjugated system." },
    ],
    keyFormulasTable: [
      { name: "Huckel's Rule", formula: "(4n + 2) π electrons", description: "n = 0, 1, 2, 3... (2, 6, 10, 14 π e⁻)" },
      { name: "Peroxide Effect Major", formula: "R-CH=CH₂ + HBr (Peroxide) -> R-CH₂-CH₂-Br", description: "1-bromo alkane formed" },
      { name: "Kucherov Reaction", formula: "HC≡CH + H₂O (Hg²⁺/H⁺) -> CH₃CHO", description: "Ethyne gives Acetaldehyde" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Applying peroxide effect to HCl or HI additions on alkenes.",
        correction: "Peroxide effect is valid EXCLUSIVELY for HBr. Both HCl and HI ALWAYS follow Markovnikov's rule even in the presence of peroxides."
      },
    ]
  },

  // 4. Polymers & Chemistry in Everyday Life
  {
    id: "note_chem_polymers_everyday",
    chapter: "Polymers & Chemistry in Everyday Life",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Addition/Condensation Polymers, Nylon, Bakelite, Drugs & Soaps Complete Revision",
    summary: "Guaranteed scoring chapter for MHT-CET and NEET: Natural vs Synthetic polymers, LDPE vs HDPE, Nylon-6 vs Nylon-6,6, Dacron/Terylene, Bakelite & Novolac, Antacids, Antihistamines, Tranquilizers, Analgesics (Narcotic/Non-narcotic), and Anionic/Cationic/Non-ionic detergents.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Polymers: Classification, Addition vs Condensation",
        points: [
          "Classification based on Intermolecular Forces:",
          "• Elastomers: Weakest intermolecular forces (van der Waals). Vulcanized rubber, Buna-S, Buna-N, Neoprene.",
          "• Fibers: Strongest intermolecular forces (Hydrogen bonding / dipole-dipole). High tensile strength. Nylon-6,6, Terylene / Dacron, Polyacrylonitrile (PAN/Orlon).",
          "• Thermoplastics: Intermediate forces; soften on heating and harden on cooling repeatedly. Polythene, Polystyrene, PVC, Teflon.",
          "• Thermosetting Polymers: Heavily cross-linked / branched molecules; set permanently on heating in a mould, CANNOT be remoulded. Bakelite, Melamine-formaldehyde resin.",
          "Low Density Polythene (LDPE): Prepared at high pressure (1000-2000 atm) and 350-570 K in presence of traces of O₂/peroxide. Highly branched structure, low density, poor conductor, used in squeeze bottles, flexible pipes.",
          "High Density Polythene (HDPE): Prepared at low pressure (6-7 atm) and 333-343 K using Ziegler-Natta catalyst [TiCl₄ + (C₂H₅)₃Al]. Linear unbranched chains, high density, close packing, used in buckets, dustbins, pipes.",
        ],
        keyFormula: "Ziegler-Natta Catalyst = TiCl₄ + (C₂H₅)₃Al (Triethylaluminium + Titanium tetrachloride)",
        keyMnemonic: "Forces strength: Elastomers < Thermoplastics < Fibers (Thermosetting has covalent cross-links).",
        examTip: "NEET/MHT-CET Question: Ziegler-Natta catalyst is used for the manufacturing of High Density Polythene (HDPE), giving linear unbranched polymer chains."
      },
      {
        title: "2. Commercially Important Polymers & Monomers",
        points: [
          "Nylon-6,6: Condensation copolymer of Hexamethylenediamine [H₂N-(CH₂)₆-NH₂] + Adipic acid [HOOC-(CH₂)₄-COOH]. Polyamide fiber.",
          "Nylon-6: Prepared by heating Caprolactam (7-membered cyclic amide) with water at high temperature (533-543 K).",
          "Terylene / Dacron: Condensation copolymer of Ethylene glycol [HO-CH₂-CH₂-OH] + Terephthalic acid (benzene-1,4-dicarboxylic acid). Polyester.",
          "Bakelite: Cross-linked thermosetting polymer of Phenol + Formaldehyde (HCHO). Linear intermediate is Novolac (used in paints). Cross-linked product is Bakelite (used in electrical switches, plugs, handles of utensils).",
          "Melamine Polymer: Melamine (heterocyclic 2,4,6-triamino-1,3,5-triazine) + Formaldehyde. Used for unbreakable crockery.",
          "Teflon (PTFE): Monomer is Tetrafluoroethene (CF₂=CF₂). Heat resistant, non-stick cookware coatings.",
          "Natural Rubber: Linear cis-1,4-polyisoprene (monomer is Isoprene: 2-Methylbuta-1,3-diene). Vulcanization: Heated with Sulfur (3-5%) to introduce disulfide cross-links and stiffen rubber.",
          "Neoprene: Monomer is Chloroprene (2-Chlorobuta-1,3-diene). Synthetic rubber.",
          "Buna-S: 1,3-Butadiene + Styrene. Buna-N: 1,3-Butadiene + Acrylonitrile.",
          "Biodegradable Polymers: PHBV (Poly β-hydroxybutyrate-co-β-hydroxyvalerate - monomers: 3-hydroxybutanoic acid + 3-hydroxypentanoic acid) and Nylon-2-nylon-6 (Glycine + Aminocaproic acid).",
        ],
        keyFormula: "Nylon-6 Monomer = Caprolactam | Natural Rubber = cis-1,4-polyisoprene",
        keyMnemonic: "PHBV and Nylon-2-nylon-6 are earth-friendly (Biodegradable).",
        examTip: "Match-the-following in NEET: Neoprene = Chloroprene; Natural rubber = Isoprene (cis-isomer); Gutta-percha = trans-polyisoprene."
      },
      {
        title: "3. Chemistry in Everyday Life: Drugs & Detergents",
        points: [
          "Antacids: Histamine stimulates secretion of pepsin and HCl in stomach. Cimetidine (Tegamet) and Ranitidine (Zantac) prevent histamine interaction with receptors in stomach wall. Omeprazole and Lansoprazole.",
          "Antihistamines: Prevent allergic actions of histamine. Brompheniramine (Dimetapp) and Terfenadine (Seldane).",
          "Tranquilizers: Neurologically active drugs used for stress and mental diseases. Chlordiazepoxide and Meprobamate (mild tranquilizers for tension); Equanil (controls depression and hypertension); Barbiturates (Veronal, Amytal, Nembutal, Luminal, Seconal - hypnotics/sleep-inducing).",
          "Analgesics (Pain relievers):",
          "• Non-narcotic (Non-addictive): Aspirin (acetylsalicylic acid - inhibits prostaglandins, antipyretic, anti-blood clotting prevents heart attack), Paracetamol.",
          "• Narcotic (Addictive): Morphine, Heroin, Codeine (relieve severe postoperative/cardiac/cancer pain, cause sleep and addiction).",
          "Antimicrobials:",
          "• Antibiotics: Penicillin (narrow spectrum), Ampicillin/Amoxicillin (synthetic modification, broad spectrum), Chloramphenicol (broad spectrum, cured typhoid/pneumonia/meningitis), Vancomycin, Ofloxacin.",
          "• Antiseptics: Applied to living tissues (wounds, cuts). Dettol (mixture of Chloroxylenol + α-Terpineol), Bithionol (added to soaps for antiseptic properties), 0.2% phenol, Tincture of Iodine (2-3% solution of iodine in alcohol-water mixture), Iodoform (CHI₃).",
          "• Disinfectants: Applied to inanimate objects (floors, drainage). 1% phenol, 0.2-0.4 ppm Chlorine in water.",
          "Artificial Sweeteners: Aspartame (100x sweeter than cane sugar, unstable at cooking temperature, used only in cold foods/drinks), Saccharin (550x), Sucralose (600x, trichloro derivative of sucrose, stable at cooking temperature), Alitame (2000x, high potency, hard to control sweetness).",
          "Detergents: (1) Anionic: Sodium lauryl sulfate, Sodium dodecylbenzenesulfonate (used in toothpastes, household cleaners); (2) Cationic: Cetyltrimethylammonium bromide (germicidal, expensive, used in hair conditioners); (3) Non-ionic: Liquid dishwashing detergents (polyethylene glycol + stearic acid, do not contain any ions).",
        ],
        keyFormula: "Dettol = Chloroxylenol + α-Terpineol | Aspirin = 2-Acetoxybenzoic acid",
        keyMnemonic: "Aspartame is destroyed by Heat (Cold drinks only); Sucralose handles the Stove!",
        examTip: "Direct NEET Question: Dettol is a mixture of chloroxylenol and terpineol; Bithionol is added to soaps to impart antiseptic properties."
      },
    ],
    quickRevisionPoints: [
      { en: "High Density Polythene (HDPE) is manufactured using Ziegler-Natta catalyst [TiCl₄ + (C₂H₅)₃Al]." },
      { en: "Nylon-6 is synthesized from Caprolactam; Nylon-6,6 from Hexamethylenediamine + Adipic acid." },
      { en: "Aspirin (acetylsalicylic acid) inhibits prostaglandin synthesis and acts as an anti-blood clotting agent." },
      { en: "Dettol is a widely used antiseptic composed of chloroxylenol and α-terpineol." },
    ],
    keyFormulasTable: [
      { name: "Ziegler-Natta Catalyst", formula: "TiCl₄ + (C₂H₅)₃Al", description: "Used for HDPE production" },
      { name: "Aspirin Structure", formula: "2-Acetoxybenzoic acid", description: "Analgesic & antiplatelet drug" },
      { name: "Dettol Composition", formula: "Chloroxylenol + Terpineol", description: "Everyday antiseptic" },
      { name: "Teflon Monomer", formula: "CF₂=CF₂ (Tetrafluoroethene)", description: "Non-stick cookware polymer" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Using Aspartame in cooked hot meals or baking.",
        correction: "Aspartame decomposes and loses its sweetness at cooking temperatures. It can be used ONLY in cold drinks and cold foods."
      },
    ]
  },
];
