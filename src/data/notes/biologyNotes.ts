import { TopicNote } from "../../types";

export const BIOLOGY_NOTES: TopicNote[] = [
  // 1. Human Physiology (Circulation, Digestion, Neural Control)
  {
    id: "note_bio_circulation_physiology",
    chapter: "Human Physiology (Circulation, Digestion, Neural Control)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Cardiovascular System, ECG, Digestion, Neural Synapse & Nephron Notes",
    summary: "Cardiac Cycle, Pacemaker SA Node, ECG Waves, Digestion Enzymes, Synaptic Transmission, Action Potential, and Counter-Current Mechanism in Nephron.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Cardiovascular System & ECG Waves",
        points: [
          "Sinoatrial (SA) Node: Located in right atrium upper corner, acts as natural pacemaker, generates 70-75 impulses/min.",
          "Cardiac Output: Stroke Volume × Heart Rate = 70 mL × 72 bpm ≈ 5040 mL/min (~5 Litres/min).",
          "Duration of 1 Cardiac Cycle: 0.8 seconds (Atrial systole: 0.1s, Ventricular systole: 0.3s, Joint diastole: 0.4s).",
          "Heart Sounds: Lubb (1st sound, closure of AV tricuspid & bicuspid valves), Dubb (2nd sound, closure of semilunar valves).",
          "ECG Waves: P wave (Atrial depolarisation), QRS complex (Ventricular depolarisation), T wave (Ventricular repolarisation).",
        ],
        keyFormula: "Cardiac Output = Stroke Volume (70 mL) × Heart Rate (72 bpm) ≈ 5 L/min",
        keyMnemonic: "ECG: P = Atrium Squeeze, QRS = Ventricle Squeeze, T = Ventricle Relax."
      },
      {
        title: "2. Excretion & Neural Transmission",
        points: [
          "Glomerular Filtration Rate (GFR): ~125 mL/min = 180 Litres/day. 99% of filtrate is reabsorbed by renal tubules (Daily urine output ≈ 1.5 L).",
          "Juxtaglomerular Apparatus (JGA): Fall in GFR activates JG cells to release Renin => converts Angiotensinogen to Angiotensin I => Angiotensin II (vasoconstrictor, stimulates Aldosterone from adrenal cortex).",
          "Counter-Current Mechanism: Maintained between Henle's Loop and Vasa Recta with NaCl and Urea, maintaining hyperosmolarity in medullary interstitium (300 to 1200 mOsmol/L).",
          "Resting Membrane Potential of Neuron: -70 mV (maintained by 3 Na⁺ out / 2 K⁺ in ATPase pump).",
          "Action Potential: Depolarization occurs due to rapid INFLUX of Na⁺ ions (+30 mV); Repolarization occurs due to EFFLUX of K⁺ ions.",
        ],
        keyFormula: "GFR = 125 mL/min (180 L/day) | Resting Potential = -70 mV"
      },
    ],
    quickRevisionPoints: [
      { en: "Universal Donor blood group is O Negative (O-); Universal Recipient is AB Positive (AB+)." },
      { en: "Parietal / Oxyntic cells of stomach secrete HCl and Castle's Intrinsic Factor (essential for Vitamin B12 absorption)." },
    ],
    keyFormulasTable: [
      { name: "Cardiac Output", formula: "CO = Stroke Volume × Heart Rate", description: "Volume of blood pumped by each ventricle per minute" },
      { name: "Daily GFR Output", formula: "GFR = 125 mL/min = 180 L/day", description: "Total blood plasma ultrafiltered by kidney glomeruli daily" },
      { name: "Sodium Potassium Pump", formula: "3 Na⁺ OUT : 2 K⁺ IN", description: "Active transport ratio maintaining neuronal resting potential" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Depolarization and Repolarization ion fluxes in neuron.",
        correction: "Depolarization is caused by rapid INFLOW of Na⁺; Repolarization is caused by OUTFLOW of K⁺."
      },
    ]
  },

  // 2. Genetics & Principles of Inheritance
  {
    id: "note_bio_genetics_principles",
    chapter: "Genetics & Principles of Inheritance",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Mendelian Genetics, DNA Replication, Transcription & Genetic Code Notes",
    summary: "Mendel's Laws, Dihybrid Cross, Incomplete Dominance, Codominance, Hershey-Chase Experiment, DNA Replication, Transcription, and Genetic Code.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Mendelian Genetics & Cross Ratios",
        points: [
          "Monohybrid Cross Phenotypic Ratio: 3 : 1, Genotypic Ratio: 1 : 2 : 1.",
          "Dihybrid Cross Phenotypic Ratio: 9 : 3 : 3 : 1, Genotypic Ratio: 1:2:2:4:1:2:1:2:1.",
          "Test Cross Ratio (Monohybrid): 1 : 1, (Dihybrid): 1 : 1 : 1 : 1.",
          "Incomplete Dominance (Mirabilis jalapa / Snapdragon): Phenotypic & Genotypic Ratio both = 1 : 2 : 1 (Red : Pink : White).",
          "Codominance: ABO Blood grouping (IA and IB alleles are codominant over i). Controlled by gene I with 3 alleles yielding 6 genotypes and 4 phenotypes.",
          "Sex Determination in Birds: ZZ (Male homogametic) and ZW (Female heterogametic).",
        ],
        keyFormula: "Dihybrid Phenotypic: 9:3:3:1 | Incomplete Dominance: 1:2:1",
        keyMnemonic: "Blood Group: IA = IB > i (IA and IB are codominant, i is recessive)."
      },
      {
        title: "2. Molecular Basis: DNA, Replication & Central Dogma",
        points: [
          "Chargaff's Rule: In double stranded DNA, [A] = [T] and [G] = [C], so (A + G) / (T + C) = 1.",
          "DNA Packaging: Nucleosome contains histone octamer (2 each of H2A, H2B, H3, H4) wrapped by ~200 bp of DNA. H1 histone seals entry/exit.",
          "Hershey-Chase Experiment (1952): Proved DNA is the genetic material using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat).",
          "Meselson-Stahl Experiment (1958): Proved Semi-conservative DNA replication using ¹⁵N and ¹⁴N.",
          "DNA Polymerase: Synthesizes new strand strictly in 5' -> 3' direction. Continuous on leading strand, discontinuous (Okazaki fragments) on lagging strand.",
          "Genetic Code: 64 codons total. 61 sense codons code for 20 amino acids. 3 Stop codons: UAA, UAG, UGA. Start codon: AUG (Methionine).",
        ],
        keyFormula: "[A] = [T], [G] = [C] => Purines (A+G) = Pyrimidines (T+C)",
        keyMnemonic: "Stop codons: U Are Away (UAA), U Are Gone (UAG), U Go Away (UGA)."
      },
    ],
    quickRevisionPoints: [
      { en: "Central Dogma: DNA -> (Transcription) -> mRNA -> (Translation) -> Protein. Proposed by Francis Crick." },
      { en: "Lac Operon: Inducer is Allolactose/Lactose. Structural genes: z (β-galactosidase), y (permease), a (transacetylase)." },
    ],
    keyFormulasTable: [
      { name: "Chargaff Rule", formula: "A + G = T + C", description: "Equimolar purines and pyrimidines in dsDNA" },
      { name: "Nucleosome DNA Length", formula: "~200 base pairs", description: "Length of DNA wrapped around histone octamer" },
      { name: "Codon Allocation", formula: "61 Sense + 3 Nonsense = 64", description: "Triplet codons in universal genetic code" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing DNA synthesis direction as 3' to 5'.",
        correction: "DNA and RNA polymerization ALWAYS proceeds strictly in 5' to 3' direction."
      },
    ]
  },

  // 3. Plant Physiology (Photosynthesis, Respiration)
  {
    id: "note_bio_plant_physiology",
    chapter: "Plant Physiology (Photosynthesis, Respiration)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Light & Dark Reactions, C3 & C4 Cycles, Glycolysis, Krebs Cycle & ETS Notes",
    summary: "Z-scheme light reaction, Calvin C3 Cycle (RuBisCO), Hatch-Slack C4 pathway (Kranz anatomy), Glycolysis steps, TCA / Krebs Cycle, and Electron Transport System (ATP yield).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Photosynthesis: Light & Dark Reactions (C3 & C4 Pathways)",
        points: [
          "Photosystems: PS II (reaction center P680, photolysis of water on inner thylakoid membrane), PS I (reaction center P700).",
          "Non-cyclic Photophosphorylation: Generates both ATP and NADPH + H⁺ with O₂ release; Cyclic Photophosphorylation: Involves ONLY PS I, generates ONLY ATP (no NADPH, no O₂).",
          "Calvin Cycle (C3 pathway): First stable product is 3-PGA (3-carbon). Primary CO₂ acceptor is RuBP (5-carbon ketose sugar) catalyzed by RuBisCO (most abundant enzyme on Earth). To make 1 Glucose molecule: 6 CO₂ + 18 ATP + 12 NADPH required.",
          "C4 Pathway (Hatch-Slack): Occurs in maize, sugarcane, sorghum. Kranz anatomy in leaf (bundle sheath cells with agranal chloroplasts). Primary CO₂ acceptor is PEP (3-carbon) catalyzed by PEPcase in mesophyll cells. First stable product is OAA (4-carbon). Avoids Photorespiration!",
        ],
        keyFormula: "1 Glucose in C3 = 6 CO₂ + 18 ATP + 12 NADPH | 1 Glucose in C4 = 30 ATP",
        keyMnemonic: "C4 Kranz: PEPcase in Mesophyll (fixes CO2 to OAA) -> RuBisCO in Bundle Sheath."
      },
      {
        title: "2. Cellular Respiration: Glycolysis, Krebs Cycle & ETS",
        points: [
          "Glycolysis (EMP Pathway): Occurs in Cytoplasm of all living cells. 1 Glucose (6C) -> 2 Pyruvate (3C). Net gain: 2 ATP + 2 NADH (No oxygen required).",
          "Link Reaction: Pyruvate + CoA + NAD⁺ --(Pyruvate Dehydrogenase, Mg²⁺)--> Acetyl CoA (2C) + CO₂ + NADH.",
          "Krebs / TCA Cycle: Occurs in Mitochondrial Matrix. Acetyl CoA (2C) + OAA (4C) -> Citric Acid (6C). Per Acetyl CoA: 3 NADH + 1 FADH₂ + 1 GTP (ATP). Per Glucose (2 turns): 6 NADH + 2 FADH₂ + 2 GTP.",
          "Electron Transport System (ETS): Inner mitochondrial membrane. Complex I (NADH dehydrogenase), Complex II (Succinate dehydrogenase), Complex III (Cytochrome bc₁), Complex IV (Cytochrome c oxidase with Cu centers), Complex V (ATP Synthase F₀-F₁).",
          "Theoretical ATP Yield per Glucose: 1 NADH = 2.5 (or 3) ATP; 1 FADH₂ = 1.5 (or 2) ATP => Total ~36 to 38 ATP per glucose oxidized aerobically.",
          "Respiratory Quotient (RQ): Volume of CO₂ evolved / Volume of O₂ consumed. Carbohydrates: RQ = 1.0; Fats (Tripalmitin): RQ = 0.7; Proteins: RQ ≈ 0.9; Organic acids (Malic acid): RQ > 1.",
        ],
        keyFormula: "RQ = Vol CO₂ evolved / Vol O₂ consumed | Tripalmitin RQ = 102 CO₂ / 145 O₂ = 0.7"
      },
    ],
    quickRevisionPoints: [
      { en: "Succinate Dehydrogenase (Complex II) is the ONLY enzyme of Krebs cycle embedded in the inner mitochondrial membrane; all others are in matrix." },
      { en: "RuBisCO has both Carboxylase and Oxygenase activity; high O2 and high temperature favor wasteful Photorespiration (C2 cycle) in C3 plants." },
    ],
    keyFormulasTable: [
      { name: "C3 Calvin ATP Cost", formula: "1 Glucose = 18 ATP + 12 NADPH", description: "Energy cost for standard hexose sugar synthesis in C3" },
      { name: "C4 Plant ATP Cost", formula: "1 Glucose = 30 ATP + 12 NADPH", description: "Higher energy expenditure in C4 to overcome photorespiration" },
      { name: "Respiratory Quotient", formula: "RQ = CO₂ evolved / O₂ consumed", description: "Substrate oxidation stoichiometry indicator" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming C4 plants lack the Calvin cycle.",
        correction: "C4 plants DO perform the Calvin cycle! It takes place specifically in their bundle sheath cells where RuBisCO is concentrated."
      },
    ]
  },

  // 4. Cell Structure and Cell Division
  {
    id: "note_bio_cell_biology",
    chapter: "Cell Structure and Cell Division",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Prokaryotes vs Eukaryotes, Organelles, Mitosis & Meiosis Crossing Over Notes",
    summary: "Fluid Mosaic Model, Endomembrane System, Mitochondria & Chloroplast 70S ribosomes, Cell Cycle phases (G1, S, G2, M), Mitosis stages, and Meiosis Prophase I substages (Crossing over at Pachytene).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Cell Structure & Endomembrane System",
        points: [
          "Fluid Mosaic Model (Singer & Nicolson, 1972): Phospholipid bilayer with quasi-fluid nature; protein 'icebergs in a sea of lipids'. Lipid:Protein ratio in human RBC membrane is ~40% lipids and 52% proteins.",
          "Endomembrane System: Includes Endoplasmic Reticulum (RER: protein synthesis, SER: lipid/steroid synthesis), Golgi Apparatus (packaging and glycosylation of glycoproteins & glycolipids), Lysosomes (acid hydrolases at pH ~5.0), and Vacuoles (tonoplast membrane). Note: Mitochondria, Chloroplasts, and Peroxisomes are NOT part of endomembrane system!",
          "Semi-Autonomous Organelles: Mitochondria and Chloroplasts possess their own circular dsDNA, 70S ribosomes, and RNA, dividing by fission.",
          "Ribosomes: 70S (Prokaryotes: 50S + 30S), 80S (Eukaryotes: 60S + 40S). 'S' is Svedberg sedimentation coefficient.",
        ],
        keyFormula: "Prokaryotic Ribosome: 70S (50S + 30S) | Eukaryotic Ribosome: 80S (60S + 40S)"
      },
      {
        title: "2. Cell Cycle & Meiosis Stages (Prophase I)",
        points: [
          "Cell Cycle Phases: G1 (growth and metabolically active), S phase (DNA REPLICATION doubles DNA content from 2C to 4C, but chromosome number remains 2n; Centriole duplicates in cytoplasm), G2 (protein synthesis for mitosis), M Phase (Nuclear & Cytoplasmic division).",
          "Quiescent Stage (G0): Inactive exit stage where cells remain metabolically active but do not proliferate (e.g., Heart cells, Neurons).",
          "Mitosis Stages: Prophase -> Metaphase (chromosomes align at equatorial plate; BEST stage to study chromosome morphology) -> Anaphase (centromere splits, sister chromatids move to opposite poles) -> Telophase (nuclear envelope reforms).",
          "Meiosis I - Prophase I substages (High Yield!):",
          "1. Leptotene: Chromatin condenses into visible chromosomes.",
          "2. Zygotene: Synapsis between homologous chromosomes mediated by Synaptonemal Complex forming Bivalents / Tetrads.",
          "3. Pachytene: CROSSING OVER (Recombination) between non-sister chromatids of homologous chromosomes catalyzed by enzyme Recombinase.",
          "4. Diplotene: Dissolution of synaptonemal complex; X-shaped Chiasmata become visible.",
          "5. Diakinesis: Terminalization of chiasmata, nucleolus disappears, spindle forms.",
        ],
        keyFormula: "S-phase: DNA doubles (2C -> 4C), Chromosome count remains 2n",
        keyMnemonic: "Prophase I stages: Lazy Zebras Paint Dear Deer -> Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis."
      },
    ],
    quickRevisionPoints: [
      { en: "Centromere splits in Mitotic Anaphase and Meiotic Anaphase II; Centromere DOES NOT split in Anaphase I of Meiosis." },
      { en: "Crossing over occurs during Pachytene stage of Prophase I, creating genetic variations." },
    ],
    keyFormulasTable: [
      { name: "S-Phase DNA Content", formula: "2C -> 4C (2n remains 2n)", description: "DNA replication without change in ploidy number" },
      { name: "Meiotic Gamete Yield", formula: "1 Parent Cell (2n) -> 4 Haploid Cells (n)", description: "Reductional division output per single meiotic cycle" },
      { name: "Crossing Over Stage", formula: "Pachytene (Recombinase enzyme)", description: "Substage of Prophase I where non-sister chromatid exchange occurs" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking chromosome number doubles in S-phase.",
        correction: "Only DNA AMOUNT doubles (2C to 4C); the number of chromosomes remains EXACTLY 2n."
      },
    ]
  },

  // 5. Biotechnology: Principles & Processes
  {
    id: "note_bio_biotechnology",
    chapter: "Biotechnology: Principles & Processes",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Restriction Enzymes, pBR322 Vector, PCR & Gel Electrophoresis Notes",
    summary: "Restriction Endonucleases (Molecular Scissors), Palindromic sequences, Gel Electrophoresis (Ethidium Bromide), pBR322 selectable markers, Polymerase Chain Reaction (PCR 3 steps), and Bioreactors.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Tools of Recombinant DNA Technology",
        points: [
          "Restriction Endonucleases: First discovered was Hind II (cuts at specific 6 bp sequence). EcoRI cuts at palindromic sequence 5'-GAATTC-3' between G and A yielding sticky overhanging ends.",
          "Agarose Gel Electrophoresis: Separates DNA fragments on basis of size/charge (DNA is negatively charged due to phosphate backbone, moves towards positive Anode). Smaller fragments travel farther. Visualized using Ethidium Bromide (EtBr) staining under UV light appearing as BRIGHT ORANGE bands. Elution is extracting DNA from gel piece.",
          "Cloning Vector pBR322: Features include ori (origin of replication, controls copy number), rop (codes for proteins in replication), and Selectable Markers: amp^R (ampicillin resistance) and tet^R (tetracycline resistance).",
          "Insertional Inactivation: Inserting foreign gene at BamHI site of tet^R gene disrupts tetracycline resistance, allowing recombinant selection. Blue-White Screening: Inactivation of β-galactosidase (lacZ gene) yields white recombinant colonies (non-recombinants turn blue in X-gal medium).",
        ],
        keyFormula: "EcoRI Palindromic site: 5'-G A A T T C-3' | 3'-C T T A A G-5'"
      },
      {
        title: "2. Polymerase Chain Reaction (PCR) & Bioreactors",
        points: [
          "PCR (Invented by Kary Mullis, 1983): In vitro amplification of DNA sequence into billions of copies. 3 Steps in each cycle:",
          "1. Denaturation: High temperature (94-96°C) separates dsDNA into single strands.",
          "2. Annealing: Medium temperature (50-60°C) where primers bind to complementary 3' ends.",
          "3. Extension: Optimum temperature (72°C) where thermostable Taq Polymerase (isolated from thermophilic bacterium Thermus aquaticus) synthesizes new DNA strand using dNTPs.",
          "Bioreactors: Large vessels (100-1000 Litres) providing optimal temperature, pH, substrate, oxygen, and salts. Most common is Stirred-tank bioreactor (ensures even oxygen distribution).",
          "Downstream Processing: Separation, purification, quality testing, and formulation of biological product with preservatives before marketing.",
        ],
        keyFormula: "PCR Yield = 2^n copies (where n = number of cycles)",
        keyMnemonic: "PCR Steps: D A E -> Denaturation (94°C) -> Annealing (55°C) -> Extension (72°C)."
      },
    ],
    quickRevisionPoints: [
      { en: "Taq Polymerase is used in PCR because it remains active at high temperatures (thermostable up to 95°C)." },
      { en: "Microinjection is used to inject rDNA directly into nucleus of ANIMAL cell; Biolistics / Gene Gun (coated with gold/tungsten) is used for PLANT cells." },
    ],
    keyFormulasTable: [
      { name: "PCR Amplification", formula: "Copies = 2^n", description: "Exponential DNA amplification after n thermal cycles" },
      { name: "Taq Optimal Temperature", formula: "72°C (Extension phase)", description: "Thermostable DNA synthesis temperature" },
      { name: "EcoRI Recognition Sequence", formula: "5'-GAATTC-3'", description: "Hexanucleotide palindromic cleavage sequence" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing the temperature order of the 3 PCR steps.",
        correction: "Order is: Denaturation (Highest, ~94°C) -> Annealing (Lowest, ~55°C) -> Extension (Medium, ~72°C)."
      },
    ]
  },

  // 6. Reproduction in Organisms & Humans
  {
    id: "note_bio_reproduction",
    chapter: "Reproduction in Organisms & Humans",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Male & Female Reproductive Systems, Menstrual Cycle & Embryogenesis Notes",
    summary: "Spermatogenesis vs Oogenesis, Sertoli & Leydig cells, Menstrual cycle hormones (LH surge), Fertilization, Blastocyst implantation, and Assisted Reproductive Technologies (IVF, ICSI, ZIFT).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Gametogenesis & Reproductive Organs",
        points: [
          "Spermatogenesis: Occurs in Seminiferous Tubules. Leydig cells (interstitial cells) secrete Testosterone under LH influence. Sertoli cells provide nutrition to developing spermatozoa under FSH influence.",
          "1 Primary Spermatocyte (2n) yields 4 functional Spermatozoa (n). Sperm acrosome is derived from Golgi apparatus and contains hyaluronidase enzyme.",
          "Oogenesis: Initiated during embryonic development. Primary oocytes remain arrested in Diplotene stage of Prophase I until puberty. 1 Primary Oocyte yields ONLY 1 functional Ovum (n) and 2-3 tiny non-functional Polar Bodies.",
          "Oogenesis resumes upon fertilization: Secondary oocyte completes Meiosis II upon sperm entry, releasing 2nd polar body and ootid.",
        ],
        keyFormula: "1 Primary Spermatocyte = 4 Sperms | 1 Primary Oocyte = 1 Ovum + Polar Bodies"
      },
      {
        title: "2. Menstrual Cycle, Fertilization & ART",
        points: [
          "Menstrual Phases (28 days cycle):",
          "1. Menstrual Phase (Days 1-5): Breakdown of endometrial lining due to sharp fall in Progesterone and Estrogen.",
          "2. Follicular / Proliferative Phase (Days 6-13): FSH stimulates follicle growth; growing follicles secrete Estrogen, repairing endometrium.",
          "3. Ovulatory Phase (Day 14): LH Surge (rapid peak in LH levels) triggers OVULATION (rupture of Graafian follicle and release of secondary oocyte).",
          "4. Luteal / Secretory Phase (Days 15-28): Ruptured Graafian follicle transforms into Corpus Luteum, which secretes huge amounts of PROGESTERONE (pregnancy hormone). If fertilization fails, corpus luteum degenerates into Corpus Albicans.",
          "Fertilization: Occurs in the Ampullary region of Fallopian Tube (Oviduct). Cortical reaction prevents Polyspermy.",
          "Assisted Reproductive Technologies (ART): IVF-ET (In Vitro Fertilization & Embryo Transfer), ZIFT (Zygote Intra-Fallopian Transfer - up to 8 blastomeres), IUT (Intra-Uterine Transfer - >8 blastomeres), GIFT (Gamete Intra-Fallopian Transfer), ICSI (Intra-Cytoplasmic Sperm Injection).",
        ],
        keyFormula: "LH Surge (Day 14) -> Ovulation | ZIFT: <= 8 blastomeres | IUT: > 8 blastomeres",
        keyMnemonic: "Cycle Phases: Menstruation -> Follicular (Estrogen) -> LH Surge (Ovulation) -> Luteal (Progesterone)."
      },
    ],
    quickRevisionPoints: [
      { en: "Human Chorionic Gonadotropin (hCG), human Placental Lactogen (hPL), and Relaxin are produced in women ONLY during pregnancy." },
      { en: "Colostrum (first milk secreted after parturition) is rich in IgA antibodies, providing passive immunity to the newborn infant." },
    ],
    keyFormulasTable: [
      { name: "Ovulation Trigger", formula: "LH Surge (Day 14 of 28-day cycle)", description: "Peak luteinizing hormone inducing follicle rupture" },
      { name: "ZIFT Limit", formula: "Embryo ≤ 8 blastomeres -> Fallopian tube", description: "Zygote intra-fallopian transfer cell stage constraint" },
      { name: "IUT Threshold", formula: "Embryo > 8 blastomeres -> Uterus", description: "Intra-uterine transfer for advanced blastocyst stages" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Saying fertilization occurs in the uterus.",
        correction: "Fertilization strictly occurs in the Ampullary region of the Fallopian tube. Implantation (at blastocyst stage) occurs in the uterus."
      },
    ]
  },

  // 7. Ecology & Environmental Issues
  {
    id: "note_bio_ecology",
    chapter: "Ecology & Environmental Issues",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Population Interactions, Ecological Pyramids, Biodiversity & Conservation Notes",
    summary: "Population growth models (Exponential vs Logistic), Interspecific interactions (Mutualism, Commensalism, Parasitism, Amensalism), 10% Energy Law, Inverted biomass pyramid, and In-situ vs Ex-situ conservation.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Population Ecology & Species Interactions",
        points: [
          "Exponential Growth (Unlimited resources): dN/dt = r N => N_t = N₀ e^(r t) (J-shaped curve).",
          "Logistic Growth (Verhulst-Pearl, Limited resources): dN/dt = r N [ (K - N) / K ] (S-shaped / Sigmoid curve, where K is Carrying Capacity).",
          "Population Interactions Summary:",
          "- Mutualism (+ / +): Both species benefit (e.g., Lichen: Alga + Fungus; Mycorrhiza: Fungi + Roots; Fig & Fig Wasp).",
          "- Commensalism (+ / 0): One benefits, other unaffected (e.g., Orchid on mango branch, Barnacles on whale, Cattle egret & grazing cattle).",
          "- Parasitism (+ / -): Parasite benefits, host harmed (e.g., Cuscuta on hedge plants, Liver fluke, Malarial Plasmodium).",
          "- Predation (+ / -): Predator captures and feeds on prey (maintains species diversity and controls prey population).",
          "- Amensalism (- / 0): One inhibited/harmed, other unaffected (e.g., Penicillium fungus secreting penicillin inhibiting bacterial growth).",
          "- Competition (- / -): Both species harmed (Gause's Competitive Exclusion Principle: two closely related species competing for same limiting resource cannot co-exist indefinitely).",
        ],
        keyFormula: "Logistic: dN/dt = r N (1 - N/K) | Exponential: dN/dt = r N"
      },
      {
        title: "2. Ecosystem Energy Flow & Biodiversity Conservation",
        points: [
          "Lindeman's 10% Energy Law: Only ~10% of energy is transferred from one trophic level to the next; 90% is lost as heat and metabolic respiration.",
          "Ecological Pyramids: Pyramid of Energy is ALWAYS UPRIGHT (unidirectional energy flow). Pyramid of Biomass in SEA / AQUATIC ecosystem is INVERTED (Phytoplankton < Zooplankton < Small Fish < Big Fish). Pyramid of Numbers in tree ecosystem with parasites is INVERTED.",
          "Species-Area Relationship (Alexander von Humboldt): log S = log C + Z log A (Rectangular Hyperbola; Z value typically 0.1 to 0.2; for entire continents Z = 0.6 to 1.2).",
          "In-situ (On-site) Conservation: Conserving species in their natural habitat. Includes National Parks, Wildlife Sanctuaries, Biosphere Reserves, and Sacred Groves (Khasi & Jaintia hills in Meghalaya, Western Ghats).",
          "Ex-situ (Off-site) Conservation: Conserving threatened species outside natural habitat in protective care. Includes Botanical Gardens, Zoological Parks, Wildlife Safari Parks, Cryopreservation of gametes (-196°C liquid Nitrogen), Seed Banks, and Tissue Culture.",
        ],
        keyFormula: "Species-Area: log S = log C + Z log A | 10% Energy Transfer Law",
        keyMnemonic: "In-situ = Inside nature (Parks, Sanctuaries). Ex-situ = Outside/Exit (Zoos, Cryo, Seed banks)."
      },
    ],
    quickRevisionPoints: [
      { en: "Pyramid of energy is ALWAYS upright and can NEVER be inverted, because energy is lost as heat at each step in accordance with Second Law of Thermodynamics." },
      { en: "The 'Evil Quartet' driving biodiversity loss: 1. Habitat loss and fragmentation (most important!), 2. Over-exploitation, 3. Alien species invasions, 4. Co-extinctions." },
    ],
    keyFormulasTable: [
      { name: "Logistic Growth Rate", formula: "dN/dt = r N (1 - N/K)", description: "Verhulst-Pearl sigmoid population growth model" },
      { name: "Species-Area Relationship", formula: "log S = log C + Z log A", description: "Humboldt's biogeographic species diversity scaling" },
      { name: "Lindeman's Energy Transfer", formula: "E_(n+1) = 0.10 × E_n", description: "Trophic level ecological efficiency rule" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Classifying Botanical Gardens and Zoos under In-situ conservation.",
        correction: "Botanical gardens, Zoos, and Seed Banks are EX-SITU (off-site) conservation methods."
      },
    ]
  },

  // 8. Human Physiology: Circulation & Excretion
  {
    id: "note_bio_human_physiology_circ_excret",
    chapter: "Human Physiology: Circulation & Excretion",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Cardiac Cycle, ECG Interpretation, Nephron Counter-Current & RAAS Notes",
    summary: "Cardiac cycle phases, Heart sounds (LUB-DUB), Standard ECG waves (P, QRS, T), Blood groups (ABO and Rh incompatibility Erythroblastosis Foetalis), Nephron structure, Urine formation (Glomerular filtration, Reabsorption, Tubular secretion), Counter-Current Multiplier in Loop of Henle, and RAAS Renin-Angiotensin kidney regulation.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Body Fluids, Cardiac Cycle & ECG Waves",
        points: [
          "Cardiac Output = Stroke Volume × Heart Rate = 70 mL × 72 beats/min ≈ 5040 mL/min (≈ 5 Litres/min).",
          "Heart Sounds: First sound 'LUB' (closure of tricuspid & bicuspid valves at onset of ventricular systole); Second sound 'DUB' (closure of semilunar valves at onset of ventricular diastole).",
          "Standard ECG Waves:",
          "- P-wave: Depolarization of Atria (both atria contract).",
          "- QRS-complex: Depolarization of Ventricles (ventricular contraction begins just after Q).",
          "- T-wave: Repolarization of Ventricles (ventricles return from excited to relaxed state). End of T-wave marks the end of ventricular systole.",
          "Blood Groups: Universal Donor = O negative (no antigens A, B, Rh); Universal Recipient = AB positive (no antibodies, has Rh antigen).",
          "Erythroblastosis Foetalis: Occurs when Rh-negative mother carries Rh-positive fetus for 2nd time. Prevented by administering anti-Rh antibodies (Rhogam) to mother immediately after 1st delivery.",
        ],
        keyFormula: "Cardiac Output = Stroke Volume (70 mL) × Heart Rate (72 bpm) ≈ 5 L/min",
        keyMnemonic: "ECG: P = Atria contract, QRS = Ventricles pump, T = Ventricles relax."
      },
      {
        title: "2. Excretory System, Nephron & RAAS Regulation",
        points: [
          "Glomerular Filtration Rate (GFR): ~125 mL/min = 180 Litres/day. Over 99% of filtrate is reabsorbed; only ~1.5 Litres urine is excreted daily.",
          "Nephron Functions:",
          "- PCT (Proximal Convoluted Tubule): Reabsorbs ~70-80% of electrolytes and water + 100% of Glucose and Amino acids (lined by simple cuboidal brush border epithelium).",
          "- Descending Loop of Henle: Permeable to WATER, impermeable to electrolytes (filtrate becomes hypertonic/concentrated down the loop).",
          "- Ascending Loop of Henle: Impermeable to WATER, actively transports NaCl out (filtrate becomes hypotonic/diluted as it ascends).",
          "- DCT and Collecting Duct: Conditional reabsorption of Na⁺ and water under Aldosterone and ADH control.",
          "Kidney Hormonal Regulation:",
          "- ADH (Vasopressin from Posterior Pituitary): Increases water reabsorption in DCT/Collecting duct, preventing Diuresis. Deficiency causes Diabetes Insipidus (excess dilute urine without sugar).",
          "- RAAS (Renin-Angiotensin-Aldosterone System): Fall in GFR -> JGA cells release RENIN -> converts Angiotensinogen to Angiotensin I -> ACE converts to Angiotensin II (potent vasoconstrictor, raises BP) -> stimulates Adrenal Cortex to release ALDOSTERONE -> increases Na⁺ & water reabsorption.",
          "- ANF (Atrial Natriuretic Factor from Heart Atria): Released when BP increases -> causes Vasodilation and excretion of Na⁺ -> lowers blood pressure (acts as a check on RAAS).",
        ],
        keyFormula: "GFR = 125 mL/min (180 L/day) | Renin -> Angiotensin II -> Aldosterone -> Raises BP"
      },
    ],
    quickRevisionPoints: [
      { en: "Juxtaglomerular Apparatus (JGA) is formed by cellular modifications in the DCT and the afferent arteriole at their contact point." },
      { en: "In human heart, Sino-Atrial Node (SAN) is the natural Pacemaker, generating maximum action potentials (70-75 per minute)." },
    ],
    keyFormulasTable: [
      { name: "Cardiac Output", formula: "CO = SV × HR", description: "Volume of blood pumped by each ventricle per minute" },
      { name: "Daily GFR", formula: "GFR = 180 Litres / day", description: "Total fluid filtered by glomeruli of both kidneys daily" },
      { name: "RAAS Pathway", formula: "Angiotensinogen --(Renin)--> Ang I --(ACE)--> Ang II", description: "Blood pressure and fluid balance restoration cascade" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Diabetes Mellitus with Diabetes Insipidus.",
        correction: "Diabetes Mellitus is caused by INSULIN deficiency (high blood sugar, glucose in urine). Diabetes Insipidus is caused by ADH (Vasopressin) deficiency (excessive dilute urination, NO sugar in urine)."
      },
    ]
  },

  // 9. Human Health, Disease & Microbes in Human Welfare
  {
    id: "note_bio_human_health_disease_microbes",
    chapter: "Human Health, Disease & Microbes",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Immunity Types, AIDS/HIV, Cancer, Drugs & Microbes in Welfare Notes",
    summary: "Innate vs Acquired Immunity, Antibodies structure (IgG, IgA, IgM, IgE), HIV Life Cycle & ELISA test, Cancer characteristics & Oncogenes, Common pathogens (Typhoid, Malaria Plasmodium life cycle, Filariasis), and Microbes in Sewage Treatment, Biogas & Biofertilizers.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Immunity, Antibodies & Major Human Diseases",
        points: [
          "Innate Immunity Barriers: Physical (Skin, Mucus), Physiological (HCl in stomach, Saliva, Tears with Lysozyme), Cellular (PMNL-neutrophils, Macrophages, NK cells), Cytokine (Interferons secreted by virus-infected cells protect non-infected cells).",
          "Antibody Structure: Molecule represented as H₂L₂ (2 heavy chains + 2 light chains joined by Disulfide bonds).",
          "- IgG: Most abundant antibody (~80%), crosses placenta to protect fetus.",
          "- IgA: Present in Colostrum, saliva, and tears (secretory antibody).",
          "- IgM: Largest pentameric antibody, first produced during primary immune response.",
          "- IgE: Mediates allergic reactions, triggers Histamine and Serotonin release from mast cells.",
          "Malaria (Plasmodium): Female Anopheles mosquito injects Sporozoites -> liver cells -> RBC rupture releasing Haemozoin toxin (causes chills and high fever every 3-4 days) -> gametocytes develop in RBC -> fertilization occurs in mosquito gut.",
          "Typhoid (Salmonella typhi): Diagnosed by WIDAL test. Sustained high fever (39-40°C), intestinal perforation in severe cases.",
          "AIDS (HIV): Retrovirus with RNA genome and Reverse Transcriptase enzyme. Binds to CD4 receptor on Helper T-lymphocytes (T_H cells). Diagnosed by ELISA test, confirmed by Western Blot.",
          "Cancer: Loss of Contact Inhibition, metastasis (malignant tumors spread to distant sites). Caused by Carcinogens and activation of Cellular Oncogenes (c-onc / proto-oncogenes).",
        ],
        keyFormula: "Antibody = H₂L₂ | Malaria Toxin = Haemozoin | Typhoid Test = Widal | AIDS Test = ELISA"
      },
      {
        title: "2. Microbes in Human Welfare & Biotechnology Applications",
        points: [
          "Household & Industrial Products:",
          "- Curd formation: Lactobacillus / LAB (improves nutritional quality by increasing Vitamin B12).",
          "- Bread & Alcohol fermentation: Saccharomyces cerevisiae (Baker's / Brewer's yeast).",
          "- Swiss cheese large holes: Propionibacterium sharmanii (produces large amount of CO₂).",
          "- Statins (Blood cholesterol lowering agent): Monascus purpureus yeast (inhibits cholesterol synthesis enzyme).",
          "- Cyclosporin A (Immunosuppressive agent in organ transplantation): Trichoderma polysporum fungus.",
          "- Streptokinase (Clot buster for clearing blood clots in myocardial infarction): Streptococcus bacterium.",
          "- Citric acid (Aspergillus niger fungus), Acetic acid (Acetobacter aceti), Butyric acid (Clostridium butyricum), Lactic acid (Lactobacillus).",
          "Sewage Treatment Plant (STP):",
          "- Primary Treatment: Physical removal of large/small particles by filtration and sedimentation.",
          "- Secondary / Biological Treatment: Aeration tank with vigorous growth of aerobic 'Flocs' (bacteria + fungal filaments) -> drastically reduces BOD (Biochemical Oxygen Demand). Higher BOD = More polluted water.",
          "- Anaerobic Sludge Digestion: Methanogenic bacteria (Methanobacterium) produce BIOGAS (CH₄ 50-70% + CO₂ + H₂S).",
          "Biofertilizers: Rhizobium (symbiotic in legumes), Azotobacter/Azospirillum (free-living N₂ fixers), Anabaena/Nostoc (Cyanobacteria in paddy fields), Mycorrhiza / Glomus (fungus absorbs Phosphorus for plant).",
        ],
        keyFormula: "High BOD = High Water Pollution | Biogas = CH₄ (60%) + CO₂ + H₂S",
        keyMnemonic: "Statins = Monascus | Cyclosporin = Trichoderma | Clot buster = Streptococcus."
      },
    ],
    quickRevisionPoints: [
      { en: "Interferons are glycoproteins produced by virus-infected cells to protect healthy neighboring cells from viral infection (innate cytokine barrier)." },
      { en: "ELISA (Enzyme Linked Immunosorbent Assay) is based on the principle of antigen-antibody interaction for rapid pathogen detection." },
    ],
    keyFormulasTable: [
      { name: "Blood Cholesterol Lowering", formula: "Statins from Monascus purpureus", description: "Competitively inhibits HMG-CoA reductase in cholesterol synthesis" },
      { name: "Immunosuppressant", formula: "Cyclosporin A from Trichoderma polysporum", description: "Prevents organ graft rejection in transplant patients" },
      { name: "Clot Buster", formula: "Streptokinase from Streptococcus", description: "Dissolves intravascular blood clots in coronary thrombosis" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing the organisms that produce Cyclosporin A and Statins.",
        correction: "Statins are produced by the yeast MONASCUS PURPUREUS. Cyclosporin A is produced by the fungus TRICHODERMA POLYSPORUM."
      },
    ]
  },
  // 6. Molecular Basis of Inheritance (DNA, Replication, Transcription, Lac Operon)
  {
    id: "note_bio_molecular_inheritance",
    chapter: "Molecular Basis of Inheritance",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "DNA Double Helix, Replication, Transcription, Genetic Code & Lac Operon Notes",
    summary: "High-yield NCERT biology points covering Chargaff's rules, Meselson-Stahl experiment, Genetic code characteristics, Translation steps, and Lac Operon regulation.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. DNA Structure & Experiments (Griffith, Hershey-Chase, Meselson-Stahl)",
        points: [
          "Chargaff's Rule: In double-stranded DNA, Purines = Pyrimidines => [A] + [G] = [T] + [C]. Specifically [A] = [T] and [G] = [C]. The ratio (A+T)/(G+C) varies across species but is constant within a species.",
          "DNA Double Helix (Watson & Crick, 1953): Pitch of helix = 3.4 nm (34 Å), distance between adjacent base pairs = 0.34 nm (3.4 Å), 10 base pairs per turn.",
          "Griffith's Transformation Experiment (1928): Used Streptococcus pneumoniae (S-strain virulent/smooth coat, R-strain avirulent/rough coat). Heat-killed S + Live R -> Mice died. Proved 'Transforming Principle'.",
          "Hershey and Chase Experiment (1952): Used T2 bacteriophage with ³⁵S (labels protein coat) and ³²P (labels DNA). Unequivocally proved that DNA is the genetic material.",
          "Meselson and Stahl Experiment (1958): Used heavy nitrogen ¹⁵N and ¹⁴N with CsCl density gradient centrifugation in E. coli. Proved Semi-conservative mode of DNA replication.",
        ],
        keyFormula: "[A] = [T] | [G] = [C] | Purines (A+G) = Pyrimidines (T+C) | DNA Pitch = 3.4 nm (10 bp)"
      },
      {
        title: "2. Genetic Code, Translation & The Lac Operon",
        points: [
          "Genetic Code Properties: Triplet (61 sense codons + 3 stop codons: UAA, UAG, UGA), Unambiguous (1 codon codes for only 1 amino acid), Degenerate (some amino acids coded by more than 1 codon), Universal, Commaless.",
          "AUG has DUAL functions: Codes for Methionine AND acts as Initiator Codon.",
          "Lac Operon Regulation (Jacob & Monod): Negative regulation with inducible system. Inducer is ALLOLACTOSE / Lactose.",
          "Structural Genes: z-gene -> β-galactosidase (hydrolyzes lactose into glucose + galactose); y-gene -> Permease (increases cell permeability to β-galactosides); a-gene -> Transacetylase.",
          "In the absence of inducer: Repressor protein (produced constitutively by i-gene) binds to Operator (O) region, preventing RNA Polymerase from transcribing structural genes.",
        ],
        keyFormula: "z-gene = β-galactosidase | y-gene = Permease | a-gene = Transacetylase | Stop Codons = UAA, UAG, UGA"
      },
    ],
    quickRevisionPoints: [
      { en: "Leading strand synthesis is continuous in 5'->3' direction, while lagging strand synthesis is discontinuous forming Okazaki fragments joined by DNA Ligase." },
      { en: "tRNA is the adapter molecule having an anticodon loop that reads mRNA codon and an amino acid acceptor 3' CCA end." },
    ],
    keyFormulasTable: [
      { name: "DNA Base Pair Rule", formula: "A+G = T+C (d.s. DNA)", description: "Chargaff equivalency rule for double-stranded DNA molecules" },
      { name: "Initiator Codon", formula: "AUG (Methionine / Formyl-Met)", description: "Universal start codon for protein synthesis" },
      { name: "Nonsense Stop Codons", formula: "UAA (Ochre), UAG (Amber), UGA (Opal)", description: "Terminates translation as no tRNA recognizes them" },
      { name: "Lac Structural Genes", formula: "z-gene (β-gal), y-gene (permease), a-gene (transacetylase)", description: "Genes responsible for lactose metabolism in E. coli" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming RNA Polymerase can synthesize RNA in both 5' to 3' and 3' to 5' directions.",
        correction: "All nucleic acid polymerases (DNA Pol and RNA Pol) can ONLY catalyze chain elongation in the 5' to 3' direction!"
      },
    ]
  },
];
