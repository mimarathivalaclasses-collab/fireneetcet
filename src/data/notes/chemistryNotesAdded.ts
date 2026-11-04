import { TopicNote } from "../../types";

export const CHEMISTRY_NOTES_ADDED: TopicNote[] = [
  // 1. Solid State
  {
    id: "note_chem_solid_state",
    chapter: "Solid State",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Unit Cells, Packing Efficiency, Density & Point Defects Master Notes",
    summary: "Complete guide to Crystalline vs Amorphous solids, 7 Crystal Systems, SC/BCC/FCC Unit cells, Coordination numbers, Packing fractions, Density formula, and Schottky/Frenkel defects.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Unit Cell Types, Radius Relations & Packing Efficiency",
        points: [
          "Simple Cubic (SC): Atoms at 8 corners. Effective atoms per unit cell Z = 8 × (1/8) = 1. Relation: a = 2r => r = a/2. Coordination number (CN) = 6. Packing Efficiency = 52.4%, Void Space = 47.6%.",
          "Body-Centered Cubic (BCC): Atoms at 8 corners + 1 in body center. Z = (8 × 1/8) + 1 = 2. Relation: Body diagonal √3 a = 4r => r = (√3 / 4) a. Coordination number (CN) = 8. Packing Efficiency = 68%, Void Space = 32%. (e.g. Fe, Cr, W, Na).",
          "Face-Centered Cubic (FCC / CCP / HCP): Atoms at 8 corners + 6 face centers. Z = (8 × 1/8) + (6 × 1/2) = 4. Relation: Face diagonal √2 a = 4r => r = (√2 / 4) a = a / (2√2). Coordination number (CN) = 12. Packing Efficiency = 74%, Void Space = 26%. (e.g. Cu, Ag, Au, Al).",
          "Density of Unit Cell Formula: d = (Z · M) / (a³ · N_A), where a is edge length in cm (1 pm = 10⁻¹⁰ cm = 10⁻¹² m), M is molar mass in g/mol, N_A = 6.022 × 10²³.",
          "Tetrahedral and Octahedral Voids: If number of closed packed spheres is N, number of Octahedral Voids = N, number of Tetrahedral Voids = 2N. Total voids = 3N.",
          "Radius ratio for Tetrahedral void: r_void / r_sphere = 0.225; For Octahedral void: r_void / r_sphere = 0.414; For Cubic void: 0.732.",
        ],
        keyFormula: "d = (Z · M)/(a³ · N_A) | SC: a=2r, PE=52.4% | BCC: 4r=√3a, PE=68% | FCC: 4r=√2a, PE=74%",
        keyMnemonic: "Packing Efficiency order: Simple (52%) < Body (68%) < Face (74%). More crowded = higher PE!",
        examTip: "Watch units in density formula: edge length 'a' must be in cm (if a = 400 pm, a = 4 × 10⁻⁸ cm, so a³ = 64 × 10⁻²⁴ cm³)."
      },
      {
        title: "2. Crystal Defects & Magnetic Properties",
        points: [
          "Stoichiometric Defects: Do not disturb stoichiometry of compound.",
          "Schottky Defect: Equal number of cations and anions missing from lattice. Creates vacancy. DENSITY DECREASES. Shown by highly ionic compounds with high CN and similar cation/anion size (e.g. NaCl, KCl, CsCl, AgBr).",
          "Frenkel Defect (Dislocation defect): Smaller ion (usually cation) is displaced to interstitial site. DENSITY REMAINS UNCHANGED. Shown by compounds with large size difference (e.g. ZnS, AgCl, AgBr, AgI).",
          "CRITICAL PYQ EXCEPTION: AgBr exhibits BOTH Schottky Defect AND Frenkel Defect!",
          "Non-Stoichiometric Defects: Metal Excess Defect due to Anion Vacancies: An electron trapped in anion vacancy is called F-CENTRE (Farbenzenter), responsible for color (e.g. NaCl imparts Yellow color, LiCl Pink, KCl Violet).",
          "Metal Excess due to Interstitial Cations: ZnO is white at room temperature, turns YELLOW upon heating due to loss of oxygen and trapped electrons.",
          "Ferromagnetic: Strongly attracted by magnetic field, permanent magnets (Fe, Co, Ni, CrO₂).",
          "Antiferromagnetic: Magnetic moments aligned antiparallel cancel out, net μ = 0 (e.g. MnO).",
          "Ferrimagnetic: Magnetic moments aligned antiparallel in unequal numbers, small net magnetic moment (e.g. Fe₃O₄, Ferrites like MgFe₂O₄).",
        ],
        keyFormula: "Schottky => Density ↓ | Frenkel => Density = Const | AgBr => BOTH Defects | F-Centre => Color"
      },
    ],
    quickRevisionPoints: [
      { en: "Z values: SC = 1, BCC = 2, FCC = 4. Packing: SC 52.4%, BCC 68%, FCC 74%." },
      { en: "Density d = (Z · M) / (a³ · N_A). Always convert edge length pm to cm (10⁻⁸ cm)." },
      { en: "AgBr shows both Schottky and Frenkel defects. F-centre causes colour in alkali halides." },
    ],
    keyFormulasTable: [
      { name: "Unit Cell Density", formula: "d = (Z · M) / (a³ · N_A)", description: "Density of crystalline unit cell in g/cm³" },
      { name: "BCC Radius Relation", formula: "r = (√3 / 4) · a", description: "Atomic radius in terms of edge length for BCC" },
      { name: "FCC Radius Relation", formula: "r = a / (2√2) = (√2 / 4) · a", description: "Atomic radius in terms of edge length for FCC/CCP" },
      { name: "Tetrahedral & Octahedral Voids", formula: "Octa = N, Tetra = 2N", description: "Number of voids for N close packed spheres" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting to cube the unit conversion 10⁻¹⁰ m when calculating a³.",
        correction: "If a = 400 pm = 4 × 10⁻⁸ cm, then a³ = (4 × 10⁻⁸)³ = 64 × 10⁻²⁴ cm³."
      },
    ]
  },

  // 2. Halogen Derivatives (Haloalkanes & Haloarenes)
  {
    id: "note_chem_halogen_derivatives",
    chapter: "Halogen Derivatives",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "SN1 vs SN2 Mechanisms, Saytzeff Elimination, Grignard & Haloarenes Notes",
    summary: "Complete guide covering Alkyl Halides preparation, Darzens process, Markovnikov/anti-Markovnikov rules, SN1 vs SN2 comparative kinetics and stereochemistry, Elimination vs Substitution, and Organometallics.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Preparation of Alkyl Halides & Key Rules",
        points: [
          "From Alcohols using Thionyl Chloride (Darzens Process): R-OH + SOCl₂ (in pyridine) -> R-Cl + SO₂↑ + HCl↑. Best method because both by-products are gaseous and escape, leaving pure alkyl chloride.",
          "From Alkenes: Addition of HX: Follows Markovnikov's Rule (Negative part of addendum attaches to carbon with FEWER hydrogen atoms).",
          "Kharasch Effect (Peroxide Effect / Anti-Markovnikov): Addition of HBr (ONLY HBr, not HCl or HI) in presence of organic peroxides (e.g. benzoyl peroxide) gives 1-bromoalkane via free radical mechanism.",
          "Finkelstein Reaction (Halogen Exchange): R-Cl / R-Br + NaI (in dry acetone) -> R-I + NaCl↓ / NaBr↓. Acetone precipitates NaCl/NaBr driving reaction forward.",
          "Swarts Reaction (Preparation of Fluorides): R-Cl / R-Br + AgF (or SbF₃, CoF₂, Hg₂F₂) -> R-F + AgCl↓.",
        ],
        keyFormula: "R-OH + SOCl₂ -> R-Cl + SO₂↑ + HCl↑ | Finkelstein: NaI/Acetone | Swarts: AgF",
        keyMnemonic: "Swarts is for Fluoride ('S'ports 'F'luorine). Finkelstein is for Iodide ('I' in Finkel)."
      },
      {
        title: "2. SN1 vs SN2 Reaction Mechanisms",
        points: [
          "SN2 (Substitution Nucleophilic Bimolecular): Single-step, concerted mechanism with pentacoordinate transition state.",
          "SN2 Kinetics: Rate = k [Substrate] [Nucleophile] (Second order).",
          "SN2 Stereochemistry: 100% WALDEN INVERSION (backside nucleophilic attack like an umbrella turned inside out).",
          "SN2 Reactivity order of Alkyl Halides: Methyl > 1° > 2° > 3° (governed by STERIC HINDRANCE). Favored by strong nucleophiles and POLAR APROTIC solvents (e.g. Acetone, DMSO, DMF).",
          "SN1 (Substitution Nucleophilic Unimolecular): Two-step mechanism via CARBOCATION intermediate.",
          "SN1 Kinetics: Rate = k [Substrate] (First order, independent of nucleophile concentration).",
          "SN1 Stereochemistry: RACEMISATION (racemic mixture of retention + inversion with slight excess of inversion due to ion pair effect).",
          "SN1 Reactivity order: 3° > 2° > 1° > Methyl (governed by CARBOCATION STABILITY: 3° > 2° > 1°). Favored by weak nucleophiles and POLAR PROTIC solvents (e.g. H₂O, alcohol, acetic acid). Allylic and Benzylic halides show high SN1 reactivity due to resonance stabilization.",
        ],
        keyFormula: "SN2: Rate = k[R-X][Nu⁻], Inversion, 1°>2°>3° | SN1: Rate = k[R-X], Racemic, 3°>2°>1°",
        examTip: "Allylic (CH₂=CH-CH₂-X) and Benzylic (C₆H₅-CH₂-X) halides are exceptionally reactive towards BOTH SN1 (resonance stable carbocation) and SN2 (less steric hindrance)."
      },
      {
        title: "3. Elimination Reactions, Grignard & Haloarenes",
        points: [
          "Saytzeff's (Zaitsev's) Rule in β-elimination (dehydrohalogenation using alcoholic KOH): Major product is the MORE SUBSTITUTED alkene (alkene having greater number of alkyl groups attached to double bond).",
          "Hoffmann Elimination: When bulky base (e.g. potassium t-butoxide) or leaving group is fluoride (-F), LESS substituted alkene is major product.",
          "Grignard Reagent: R-X + Mg (in dry ether) -> R-Mg-X (Alkyl Magnesium Halide). Extremely reactive towards active hydrogen (water, alcohols) to form alkane: R-MgX + H₂O -> R-H + Mg(OH)X. Hence ether MUST be strictly DRY.",
          "Wurtz Reaction: 2 R-X + 2 Na (dry ether) -> R-R (alkane with EVEN number of carbons).",
          "Wurtz-Fittig Reaction: Ar-X + R-X + 2 Na -> Ar-R (alkylbenzene). Fittig Reaction: 2 Ar-X + 2 Na -> Ar-Ar (Biphenyl).",
          "Low reactivity of Haloarenes (Chlorobenzene) towards nucleophilic substitution: Due to (1) Resonance (partial double bond character of C-Cl bond), (2) sp² hybridized carbon (more electronegative, shorter C-Cl bond), (3) Instability of phenyl cation.",
          "Electron withdrawing groups (-NO₂) at ORTHO and PARA positions dramatically INCREASE the reactivity of haloarenes towards nucleophilic substitution.",
        ],
        keyFormula: "Saytzeff: More stable alkene is major | R-MgX + H₂O -> R-H | Wurtz: 2 R-X + 2 Na -> R-R"
      },
    ],
    quickRevisionPoints: [
      { en: "Darzens (SOCl₂) is cleanest method for R-Cl; Finkelstein for R-I; Swarts for R-F." },
      { en: "SN2: 1 step, Walden inversion, 1° > 2° > 3°. SN1: 2 steps, carbocation, 3° > 2° > 1°." },
      { en: "Saytzeff rule: Dehydrohalogenation yields more alkylated, stable alkene." },
    ],
    keyFormulasTable: [
      { name: "Finkelstein Reaction", formula: "R-X + NaI (acetone) -> R-I + NaX↓", description: "Halogen exchange to prepare alkyl iodides" },
      { name: "Swarts Reaction", formula: "R-X + AgF -> R-F + AgX↓", description: "Preparation of alkyl fluorides using metallic fluorides" },
      { name: "Wurtz Reaction", formula: "2 R-X + 2 Na (dry ether) -> R-R + 2 NaX", description: "Coupling of two alkyl halides to form symmetrical alkanes" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Applying anti-Markovnikov peroxide effect to HCl or HI.",
        correction: "Peroxide effect operates ONLY with HBr. For HCl (bond too strong) and HI (radicals combine to form I₂), it always follows Markovnikov addition."
      },
    ]
  },

  // 3. Alcohols, Phenols and Ethers
  {
    id: "note_chem_alcohols_phenols_ethers",
    chapter: "Alcohols, Phenols and Ethers",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Hydroboration, Lucas Test, Acidity of Phenol, Kolbe & Williamson Synthesis",
    summary: "Complete study of Alcohols preparation, Lucas distinction test, Phenol preparation (from Cumene), Acidity comparison, Kolbe's and Reimer-Tiemann reactions, Williamson Ether Synthesis and HI cleavage.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Alcohols: Preparation & Lucas Reagent Distinction",
        points: [
          "Hydroboration-Oxidation of Alkenes: Alkene + B₂H₆ followed by alkaline H₂O₂ -> ALCOHOL with Anti-Markovnikov orientation (no carbocation rearrangement). Propene gives Propan-1-ol.",
          "Acid Catalyzed Hydration of Alkenes: Alkene + H₂O/H⁺ -> Follows Markovnikov addition with carbocation rearrangement possible.",
          "Reduction of Carbonyl Compounds: Aldehydes reduced with NaBH₄ / LiAlH₄ give 1° alcohols; Ketones give 2° alcohols; Esters/Acids reduced with LiAlH₄ give 1° alcohols.",
          "From Grignard Reagent: Formaldehyde (HCHO) + RMgX -> 1° Alcohol; Other Aldehydes (R'CHO) + RMgX -> 2° Alcohol; Ketones (R'COR'') + RMgX -> 3° Alcohol.",
          "Lucas Reagent Test (Anhydrous ZnCl₂ + Conc. HCl): Distinguishes 1°, 2°, 3° alcohols via SN1 formation of insoluble alkyl chloride (turbidity):",
          "3° Alcohol: Immediate turbidity (white cloudiness appears instantly).",
          "2° Alcohol: Turbidity appears within 5 minutes.",
          "1° Alcohol: No turbidity at room temperature; appears only upon heating.",
        ],
        keyFormula: "HCHO + RMgX -> 1° Alc | RCHO + RMgX -> 2° Alc | RCOR + RMgX -> 3° Alc | Lucas: 3° > 2° > 1°",
        examTip: "To prepare 1-Propanol from propene, use Hydroboration-Oxidation. Direct hydration gives 2-Propanol."
      },
      {
        title: "2. Phenols: Cumene Process & Acidity",
        points: [
          "Industrial Preparation from Cumene (Isopropylbenzene): Cumene + O₂ (air) -> Cumene hydroperoxide, which upon acid hydrolysis (H⁺/H₂O) gives PHENOL + ACETONE (valuable by-product).",
          "Acidity Comparison: Phenol is MORE ACIDIC than Alcohols and Water: Alcohols (pKa ~ 16-18) < Water (pKa = 14) < Phenol (pKa ≈ 10) < Carboxylic acids (pKa ~ 4-5).",
          "Reason: Phenoxide ion is resonance stabilized by delocalization of negative charge into the aromatic benzene ring; Alkoxide ion (R-O⁻) has no resonance and is destabilized by +I effect of alkyl group.",
          "Substituent effect on Phenol Acidity: Electron Withdrawing Groups (-NO₂, -CN, -X) INCREASE acidity by stabilizing phenoxide ion. Order: Picric acid (2,4,6-trinitrophenol, pKa ≈ 0.38) > 4-Nitrophenol > 2-Nitrophenol > 3-Nitrophenol > Phenol > Cresols.",
          "Intramolecular vs Intermolecular H-bonding: 2-Nitrophenol (o-nitrophenol) has INTRAmolecular H-bonding -> steam volatile, lower boiling point. 4-Nitrophenol (p-nitrophenol) has INTERmolecular H-bonding -> higher boiling point, less volatile.",
        ],
        keyFormula: "Cumene + O₂ -> Cumene hydroperoxide -> Phenol + Acetone | Acidity: p-NO₂ > o-NO₂ > Phenol"
      },
      {
        title: "3. Name Reactions of Phenols & Williamson Ether Synthesis",
        points: [
          "Kolbe's Reaction: Sodium phenoxide + CO₂ (at 400 K, 4-7 atm) followed by H⁺ -> Salicylic Acid (2-hydroxybenzoic acid). Salicylic acid + acetic anhydride gives ASPIRIN (acetylsalicylic acid).",
          "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH (at 340 K) followed by H⁺ -> Salicylaldehyde (2-hydroxybenzaldehyde). Electrophile involved is DICHLOROCARBENE (:CCl₂).",
          "Reaction with Zinc Dust: Phenol + Zn dust (distillation) -> Benzene + ZnO.",
          "Williamson Ether Synthesis: Sodium alkoxide + Primary Alkyl Halide: R-O⁻ Na⁺ + R'-X -> R-O-R' + NaX. Follows SN2 mechanism. Best yield when alkyl halide R'-X is PRIMARY (1°).",
          "CRITICAL TRAP: If a Tertiary Alkyl Halide (3° R-X) is used with sodium alkoxide, ELIMINATION occurs to give ALKENE instead of ether: (CH₃)₃C-Br + CH₃ONa -> (CH₃)₂C=CH₂ + CH₃OH + NaBr.",
          "Cleavage of Ethers with Conc. HI: In unsymmetrical ether R-O-R':",
          "Case 1: If both alkyl groups are 1° or 2°, the SMALLER alkyl group forms Alkyl Iodide (via SN2): CH₃-O-CH₂CH₃ + HI -> CH₃I + CH₃CH₂OH.",
          "Case 2: If one of the alkyl groups is TERTIARY (3°), the 3° group forms the Alkyl Iodide (via SN1 carbocation): (CH₃)₃C-O-CH₃ + HI -> (CH₃)₃C-I + CH₃OH.",
        ],
        keyFormula: "Kolbe: Phenol + CO₂ -> Salicylic Acid | Reimer-Tiemann: :CCl₂ -> Salicylaldehyde | Williamson: 1° R-X + R'ONa -> Ether"
      },
    ],
    quickRevisionPoints: [
      { en: "Lucas test turbidity: 3° immediate, 2° in 5 min, 1° on heating." },
      { en: "Phenol acidity: Electron withdrawing groups (-NO₂) increase acidity; Picric acid is strong acid." },
      { en: "Reimer-Tiemann intermediate is Dichlorocarbene (:CCl₂); gives Salicylaldehyde." },
      { en: "Williamson synthesis: 1° halide gives ether; 3° halide gives alkene (elimination)." },
    ],
    keyFormulasTable: [
      { name: "Kolbe Reaction", formula: "C₆H₅ONa + CO₂ -> Salicylic Acid", description: "Carboxylation of phenol to salicylic acid at 400 K" },
      { name: "Reimer-Tiemann Reaction", formula: "C₆H₅OH + CHCl₃ + NaOH -> Salicylaldehyde", description: "Formylation of phenol via dichlorocarbene intermediate" },
      { name: "Williamson Ether Synthesis", formula: "R-ONa + R'-X -> R-O-R' + NaX", description: "SN2 nucleophilic displacement of 1° alkyl halide by alkoxide" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Predicting ether formation when treating sodium ethoxide with t-butyl bromide.",
        correction: "Tertiary halides undergo rapid E2 elimination with strong basic alkoxides, forming Isobutylene (alkene), NOT ether."
      },
    ]
  },

  // 4. Amines & Nitrogen Containing Compounds
  {
    id: "note_chem_amines_nitrogen",
    chapter: "Amines & Nitrogen Containing Compounds",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Gabriel Phthalimide, Hoffmann Bromamide, Basicity & Diazonium Salts Notes",
    summary: "Complete study covering Gabriel Phthalimide & Hoffmann Bromamide preparations, Basicity order in aqueous vs gaseous phase, Carbylamine test, Hinsberg test, and Diazonium coupling reactions.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Preparation of Amines: Gabriel & Hoffmann Methods",
        points: [
          "Gabriel Phthalimide Synthesis: Phthalimide + ethanolic KOH -> Potassium phthalimide, reacted with 1° Alkyl Halide (R-X) followed by alkaline hydrolysis -> PURE 1° ALIPHATIC AMINE.",
          "CRITICAL LIMITATION: Aromatic primary amines (like Aniline) CANNOT be prepared by Gabriel synthesis because aryl halides do not undergo nucleophilic substitution with phthalimide anion.",
          "Hoffmann Bromamide Degradation: Primary Acid Amide + Br₂ + 4 KOH -> Primary Amine (with ONE LESS CARBON atom) + K₂CO₃ + 2 KBr + 2 H₂O.",
          "Example: Ethanamide (CH₃CONH₂, 2 carbons) gives Methanamine (CH₃NH₂, 1 carbon); Benzamide gives Aniline.",
          "Reduction of Nitriles (Mendius Reaction): R-CN + Na / C₂H₅OH (or LiAlH₄) -> R-CH₂-NH₂ (1° amine with same number of carbons).",
        ],
        keyFormula: "Gabriel: R-X -> 1° Aliphatic Amine | Hoffmann: R-CONH₂ + Br₂ + 4KOH -> R-NH₂ (carbon drops by 1)",
        examTip: "If a question asks: 'Convert Propanoic acid to Ethanamine', the path is: Propanoic acid -> SOCl₂ -> Propanamide -> Hoffmann Bromamide degradation -> Ethanamine."
      },
      {
        title: "2. Basicity Order of Amines",
        points: [
          "Amines are Lewis bases due to unshared lone pair of electrons on Nitrogen atom.",
          "In Gaseous Phase (governed strictly by +I inductive effect): 3° Amine > 2° Amine > 1° Amine > NH₃.",
          "In Aqueous Phase: Basicity depends on combination of (1) +I effect, (2) Solvation / Hydration effect of cation, and (3) Steric hindrance.",
          "For METHYL substituted amines (-CH₃): 2° > 1° > 3° > NH₃ (Order: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃). Mnemonic: '213'.",
          "For ETHYL substituted amines (-C₂H₅): 2° > 3° > 1° > NH₃ (Order: (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃). Mnemonic: '231'.",
          "Aromatic Amines (Aniline) are MUCH WEAKER bases than Ammonia: Lone pair on nitrogen is delocalized into benzene ring via resonance (+R effect).",
          "Substituent on Aniline: Electron releasing groups (-OCH₃, -CH₃) INCREASE basicity; Electron withdrawing groups (-NO₂, -CN, -COOH) DECREASE basicity.",
        ],
        keyFormula: "Gas: 3° > 2° > 1° > NH₃ | Aqueous Methyl: 2° > 1° > 3° (213) | Aqueous Ethyl: 2° > 3° > 1° (231)",
        keyMnemonic: "Aqueous basicity: Methyl is Small -> 213; Ethyl is Bigger -> 231. 2° Amine is ALWAYS king!"
      },
      {
        title: "3. Distinction Tests & Diazonium Salts",
        points: [
          "Carbylamine Test (Isocyanide Test): 1° Amine (aliphatic or aromatic) + CHCl₃ + 3 alc. KOH (warm) -> Alkyl/Aryl Isocyanide (Carbylamine, R-NC) + 3 KCl + 3 H₂O. Extremely foul smelling! Negative for 2° and 3° amines.",
          "Hinsberg Reagent Test (Benzene Sulfonyl Chloride, C₆H₅SO₂Cl):",
          "1° Amine forms N-alkylbenzene sulfonamide which has acidic H on nitrogen -> SOLUBLE IN ALKALI (NaOH).",
          "2° Amine forms N,N-dialkylbenzene sulfonamide which has no H on nitrogen -> INSOLUBLE IN ALKALI.",
          "3° Amine does NOT react with Hinsberg reagent.",
          "Diazotization of Aniline: Aniline + NaNO₂ + 2 HCl (at cold 273 - 278 K / 0-5°C) -> Benzene Diazonium Chloride (C₆H₅N₂⁺ Cl⁻).",
          "Sandmeyer Reaction: C₆H₅N₂⁺ Cl⁻ + CuCl/HCl -> Chlorobenzene; + CuBr/HBr -> Bromobenzene; + CuCN/KCN -> Benzonitrile.",
          "Gattermann Reaction: Uses Cu powder + HX to form haloarenes.",
          "Coupling Reactions (Azo Dyes): Diazonium chloride + Phenol (in basic medium pH 9-10) -> p-Hydroxyazobenzene (ORANGE DYE); Diazonium chloride + Aniline (in mildly acidic medium pH 4-5) -> p-Aminoazobenzene (YELLOW DYE).",
        ],
        keyFormula: "1° Amine + CHCl₃ + 3KOH -> R-NC (Foul smell) | Phenol coupling -> Orange Dye | Aniline coupling -> Yellow Dye"
      },
    ],
    quickRevisionPoints: [
      { en: "Gabriel synthesis prepares ONLY 1° aliphatic amines (cannot prepare aniline)." },
      { en: "Hoffmann Bromamide drops carbon count by 1: RCONH₂ -> RNH₂." },
      { en: "Aqueous basicity: Methyl = 2° > 1° > 3° (213); Ethyl = 2° > 3° > 1° (231)." },
      { en: "Carbylamine test is specific to 1° amines (foul smelling isocyanide)." },
    ],
    keyFormulasTable: [
      { name: "Hoffmann Bromamide Reaction", formula: "R-CONH₂ + Br₂ + 4 KOH -> R-NH₂ + K₂CO₃ + 2 KBr + 2 H₂O", description: "Degradation of primary acid amide to primary amine with one less carbon" },
      { name: "Carbylamine Reaction", formula: "R-NH₂ + CHCl₃ + 3 KOH -> R-NC + 3 KCl + 3 H₂O", description: "Diagnostic test for primary aliphatic and aromatic amines" },
      { name: "Diazotization Reaction", formula: "Ar-NH₂ + NaNO₂ + 2 HCl (0-5°C) -> Ar-N₂⁺Cl⁻ + NaCl + 2 H₂O", description: "Conversion of primary aromatic amine to diazonium salt" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming Aniline can be prepared by Gabriel Phthalimide synthesis.",
        correction: "Aryl halides (chlorobenzene) do not undergo nucleophilic substitution with potassium phthalimide, so Aniline CANNOT be made this way."
      },
    ]
  },

  // 5. Biomolecules
  {
    id: "note_chem_biomolecules",
    chapter: "Biomolecules",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "Carbohydrates, Amino Acids, Protein Structures, Nucleic Acids & Vitamins",
    summary: "Complete high-yield revision covering D-Glucose cyclic structure, Haworth representations, Reducing vs Non-reducing sugars, Zwitter ions, Peptide linkages, Denaturation, DNA/RNA double helix, and Vitamin deficiencies.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Carbohydrates: Glucose & Polysaccharides",
        points: [
          "D-Glucose (Aldohexose, Dextrose): Open chain has 1 aldehyde group (-CHO), 1 primary alcohol (-CH₂OH), and 4 secondary alcohol groups (-CHOH-). Has 4 chiral carbons => 2⁴ = 16 optical isomers.",
          "Reactions of Glucose: (1) Prolonged heating with HI gives n-HEXANE (proves 6 carbons in straight chain); (2) Reaction with Hydroxylamine gives Oxime, with HCN gives Cyanohydrin (proves carbonyl >C=O); (3) Mild oxidation with Bromine water gives GLUCONIC ACID (proves -CHO); (4) Strong oxidation with Conc. HNO₃ gives SACCHARIC ACID (proves -CHO and 1° alcohol); (5) Acetylation with Acetic Anhydride gives Glucose Pentaacetate (proves 5 -OH groups).",
          "Cyclic Structure of Glucose: Exists as 6-membered pyranose ring (α-D-glucopyranose and β-D-glucopyranose) differing only at C-1 (Anomeric Carbon). Such isomers are called ANOMERS.",
          "Reducing vs Non-Reducing Sugars: All monosaccharides (glucose, fructose, galactose) and disaccharides with free hemiacetal group (Maltose = α-D-glc + α-D-glc, Lactose = β-D-gal + β-D-glc) are REDUCING.",
          "SUCROSE (Invert Sugar) is NON-REDUCING because anomeric carbons C-1 of glucose and C-2 of fructose are linked in α-1,β-2 glycosidic bond. Hydrolysis of dextrorotatory sucrose gives levorotatory mixture (due to high levorotation of fructose, -92.4°), hence called Invert Sugar.",
          "Starch: Consists of Amylose (15-20%, water soluble, linear α-1,4-glycosidic bonds, gives blue color with I₂) and Amylopectin (80-85%, water insoluble, branched with α-1,4 and α-1,6 branch linkages).",
          "Cellulose: Straight chain polymer of β-D-glucose linked by β-1,4-glycosidic linkages.",
        ],
        keyFormula: "Glucose + HI -> n-Hexane | Glucose + Br₂/H₂O -> Gluconic Acid | Sucrose -> Glucose + Fructose (Invert Sugar)",
        examTip: "Sucrose is NON-REDUCING; Maltose and Lactose are REDUCING disaccharides."
      },
      {
        title: "2. Amino Acids, Peptide Bond & Protein Structures",
        points: [
          "α-Amino Acids: Contain both amino (-NH₂) and carboxylic acid (-COOH) groups on same α-carbon. All naturally occurring amino acids are L-configuration and optically active EXCEPT GLYCINE (H₂N-CH₂-COOH, achiral).",
          "Zwitter Ion: In aqueous solution, -COOH loses H⁺ to form -COO⁻, and -NH₂ gains H⁺ to form -NH₃⁺, creating dipolar neutral ion. The pH at which net charge is zero is called ISOELECTRIC POINT (pI).",
          "Essential Amino Acids (must be supplied in diet): Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, Arginine (Mnemonic: PVT TIM HALL).",
          "Peptide Linkage: Amide bond (-CO-NH-) formed between -COOH of one amino acid and -NH₂ of another with elimination of water.",
          "Protein Hierarchy: Primary (linear sequence of amino acids), Secondary (α-helix stabilized by intramolecular H-bonds; β-pleated sheet), Tertiary (3D folding, active conformation, stabilized by disulfide -S-S- bonds, H-bonds, van der Waals, ionic bonds), Quaternary (assembly of multiple subunits, e.g. Haemoglobin has 4 subunits).",
          "Denaturation of Proteins: When protein is subjected to heat or pH change, secondary and tertiary structures are destroyed, biological activity is LOST. PRIMARY STRUCTURE REMAINS INTACT (e.g. curdling of milk, boiling of egg).",
        ],
        keyFormula: "Peptide Bond: -CO-NH- | Glycine: Achiral (Optically Inactive) | Denaturation: 1° Structure Intact",
        keyMnemonic: "Essential Amino Acids: PVT TIM HALL -> Phenylalanine, Valine, Threonine, Tryptophan, Isoleucine, Methionine, Histidine, Arginine, Leucine, Lysine."
      },
      {
        title: "3. Nucleic Acids & Vitamins",
        points: [
          "Nucleoside = Pentose Sugar + Nitrogenous Base. Nucleotide = Nucleoside + Phosphate group (Sugar + Base + Phosphate).",
          "Bases: Purines (Adenine A, Guanine G); Pyrimidines (Cytosine C, Thymine T in DNA, Uracil U in RNA).",
          "DNA Double Helix (Watson-Crick Model): Antiparallel strands linked by Hydrogen bonds: A = T (2 Hydrogen bonds) and G ≡ C (3 Hydrogen bonds).",
          "Chargaff's Rule: In double stranded DNA: Amount of A = T, and G = C. Hence (A + G) = (T + C) => Purines = Pyrimidines. (A + T) / (G + C) is constant for a species.",
          "Fat-Soluble Vitamins: A, D, E, K (stored in liver and adipose tissue). Water-Soluble Vitamins: B-complex, C (must be supplied regularly, excreted in urine; exception: Vitamin B12 stored in liver).",
          "Vitamin Deficiencies: Vitamin A -> Night Blindness (Xerophthalmia); Vitamin B1 (Thiamine) -> Beri-beri; Vitamin B3 (Niacin) -> Pellagra; Vitamin B12 -> Pernicious Anemia; Vitamin C (Ascorbic acid) -> Scurvy; Vitamin D -> Rickets in children, Osteomalacia in adults; Vitamin K -> Increased blood clotting time.",
        ],
        keyFormula: "DNA: A=T (2 H-bonds) | G≡C (3 H-bonds) | Chargaff: A + G = T + C | Fat-soluble: A, D, E, K"
      },
    ],
    quickRevisionPoints: [
      { en: "Glucose open chain has 4 chiral carbons; n-hexane with HI proves straight chain." },
      { en: "Sucrose is non-reducing invert sugar; Glycine is only optically inactive amino acid." },
      { en: "DNA: A pairs with T (2 H-bonds), G pairs with C (3 H-bonds)." },
      { en: "Denaturation of protein destroys 2° and 3° structures; 1° remains intact." },
    ],
    keyFormulasTable: [
      { name: "Chargaff Rule", formula: "A + G = T + C", description: "Ratio of purines to pyrimidines is 1:1 in dsDNA" },
      { name: "Glucose Oxidation", formula: "Glucose + Br₂/H₂O -> Gluconic Acid", description: "Selective oxidation of aldehyde group to monocarboxylic acid" },
      { name: "Peptide Bond Formation", formula: "R-COOH + H₂N-R' -> R-CONH-R' + H₂O", description: "Condensation linkage between two amino acids" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking denaturation breaks peptide bonds in proteins.",
        correction: "Denaturation breaks H-bonds and tertiary folding, but COVALENT PEPTIDE BONDS (primary structure) REMAIN INTACT."
      },
    ]
  },

  // 6. Ionic Equilibria
  {
    id: "note_chem_ionic_equilibria",
    chapter: "Ionic Equilibria",
    subject: "Chemistry",
    exams: ["MHT_CET", "NEET", "JEE_MAIN"],
    title: "pH, Ostwald Dilution Law, Buffer Solutions & Solubility Product (Ksp)",
    summary: "Comprehensive guide covering Ostwald's dilution law for weak electrolytes, pH/pOH calculations, Henderson-Hasselbalch equation for buffers, Common Ion Effect, and Solubility Product Ksp precipitation conditions.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Ostwald's Dilution Law & pH Scale",
        points: [
          "Degree of Dissociation (α): Fraction of total electrolyte dissociated into ions: α = Number of dissociated moles / Total moles.",
          "Ostwald's Dilution Law (for weak monoprotic acid HA): K_a = C α² / (1 - α). For weak electrolyte (α << 1, α < 0.05): K_a ≈ C α² => α = √(K_a / C) = √(K_a · V).",
          "Key Takeaway: Degree of dissociation α is inversely proportional to square root of concentration C, and directly proportional to square root of dilution V.",
          "Ionic Product of Water (K_w): At 298 K (25°C), K_w = [H⁺] [OH⁻] = 1.0 × 10⁻¹⁴ mol²/L². (Note: K_w increases with temperature; at 90°C K_w ≈ 10⁻¹², so neutral pH = 6 at 90°C).",
          "pH and pOH definitions: pH = - log₁₀[H⁺] = - log₁₀[H₃O⁺]; pOH = - log₁₀[OH⁻].",
          "Fundamental Relation at 25°C: pH + pOH = pK_w = 14.",
          "For strong monoprotic acid of concentration C: [H⁺] = C => pH = - log C.",
          "For weak acid of concentration C: [H⁺] = C α = √(K_a · C) => pH = (1/2) [ pK_a - log C ].",
        ],
        keyFormula: "α = √(K_a / C) | K_w = [H⁺][OH⁻] = 10⁻¹⁴ | pH + pOH = 14 | [H⁺] = √(K_a · C)",
        examTip: "For 10⁻⁸ M HCl solution, pH is NOT 8 (an acid can never have basic pH > 7!). You must add water's contribution: [H⁺] = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ M => pH ≈ 6.96."
      },
      {
        title: "2. Buffer Solutions & Henderson Equation",
        points: [
          "Buffer Solution: A solution that resists any drastic change in its pH upon addition of small amounts of strong acid or strong base.",
          "Acidic Buffer: Mixture of WEAK ACID + its salt with STRONG BASE (e.g. CH₃COOH + CH₃COONa, or HCN + NaCN). pH < 7.",
          "Henderson-Hasselbalch Equation for Acidic Buffer: pH = pK_a + log₁₀ [ Salt / Acid ].",
          "Maximum Buffer Capacity of Acidic Buffer occurs when [Salt] = [Acid], giving pH = pK_a.",
          "Basic Buffer: Mixture of WEAK BASE + its salt with STRONG ACID (e.g. NH₄OH + NH₄Cl). pH > 7.",
          "Henderson Equation for Basic Buffer: pOH = pK_b + log₁₀ [ Salt / Base ] => pH = 14 - pOH.",
          "Maximum Buffer Capacity of Basic Buffer occurs when [Salt] = [Base], giving pOH = pK_b.",
          "Human blood is a natural buffer maintained at pH ≈ 7.4 by Carbonic acid - Bicarbonate buffer system (H₂CO₃ / HCO₃⁻).",
        ],
        keyFormula: "pH = pK_a + log([Salt]/[Acid]) | pOH = pK_b + log([Salt]/[Base]) | Max Buffer: pH = pK_a",
        keyMnemonic: "Henderson equation: 'Salt always sits on top' (Numerator is Salt, Denominator is Acid/Base)."
      },
      {
        title: "3. Common Ion Effect & Solubility Product (Ksp)",
        points: [
          "Common Ion Effect: Suppression of degree of dissociation of a weak electrolyte by addition of a strong electrolyte containing a common ion.",
          "Examples: Addition of CH₃COONa suppresses ionization of CH₃COOH; Addition of NH₄Cl suppresses ionization of NH₄OH (used in Qualitative Analysis of Group III radicals: Fe³⁺, Al³⁺, Cr³⁺ precipitates as hydroxides).",
          "Solubility Product (K_sp): Equilibrium constant for a sparingly soluble salt A_x B_y ⇌ x A^(y+) + y B^(x-):",
          "K_sp = [A^(y+)]^x · [B^(x-)]^y.",
          "For 1:1 salt (AgCl, BaSO₄): S moles/L => K_sp = S² => S = √(K_sp).",
          "For 1:2 or 2:1 salt (CaF₂, PbCl₂, Ag₂CrO₄): K_sp = (S) · (2S)² = 4 S³ => S = ³√(K_sp / 4).",
          "For 1:3 or 3:1 salt (AlCl₃, Fe(OH)₃): K_sp = (S) · (3S)³ = 27 S⁴ => S = ⁴√(K_sp / 27).",
          "Precipitation Criteria (Comparing Ionic Product IP with K_sp):",
          "If IP < K_sp: Unsaturated solution (No precipitation occurs, more solute can dissolve).",
          "If IP = K_sp: Saturated solution (Dynamic equilibrium).",
          "If IP > K_sp: Supersaturated solution -> PRECIPITATION OCCURS.",
        ],
        keyFormula: "AgCl: K_sp = S² | PbCl₂: K_sp = 4S³ | Al(OH)₃: K_sp = 27S⁴ | Precipitate if IP > K_sp"
      },
    ],
    quickRevisionPoints: [
      { en: "Ostwald dilution: α = √(K_a / C); dissociation increases with dilution." },
      { en: "pH = -log[H⁺]; pH + pOH = 14 at 25°C. Acid buffer: pH = pKa + log([Salt]/[Acid])." },
      { en: "Ksp formulas: 1:1 salt = S²; 1:2 salt = 4S³; 1:3 salt = 27S⁴. Precipitation occurs if IP > Ksp." },
    ],
    keyFormulasTable: [
      { name: "Ostwald Dilution Law", formula: "α = √(K_a / C)", description: "Degree of dissociation of weak monobasic acid" },
      { name: "Henderson Equation (Acid Buffer)", formula: "pH = pK_a + log₁₀([Salt] / [Acid])", description: "pH of acidic buffer solution" },
      { name: "Henderson Equation (Basic Buffer)", formula: "pOH = pK_b + log₁₀([Salt] / [Base])", description: "pOH of basic buffer solution" },
      { name: "Solubility Product (AB₂ Salt)", formula: "K_sp = 4 S³", description: "Solubility product for binary divalent salts like PbCl₂ or CaF₂" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing Ksp = S² for salts like PbCl₂ or CaF₂.",
        correction: "PbCl₂ dissociates into Pb²⁺ (S) and 2 Cl⁻ (2S), so K_sp = [Pb²⁺][Cl⁻]² = (S)(2S)² = 4S³."
      },
    ]
  },
];
