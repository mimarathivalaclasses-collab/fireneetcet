import { TopicNote } from "../../types";

export const BIOLOGY_NOTES_ADDED: TopicNote[] = [
  // 1. Reproduction in Lower and Higher Plants
  {
    id: "note_bio_plant_reproduction",
    chapter: "Reproduction in Lower and Higher Plants",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Microsporogenesis, Megasporogenesis, Double Fertilization & Seed Development",
    summary: "Complete NEET/MHT-CET guide to Flower parts, Anther wall tapetum, Sporopollenin, Anatropous ovule, 7-celled 8-nucleate embryo sac, Pollination types, Double fertilization (Syngamy + Triple fusion), and Endosperm types.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Microsporogenesis & Pollen Grain Structure",
        points: [
          "Structure of Anther: Dithecous (two lobes) and tetrasporangiate (four microsporangia).",
          "Anther Wall Layers (outside to inside): (1) Epidermis (protective single layer), (2) Endothecium (hygroscopic fibrous α-cellulosic bands for dehiscence), (3) Middle layers (1-3 ephemeral nutritive layers), (4) TAPETUM (innermost layer, polyploid/multinucleate, secretes enzymes, hormones, and nutritive fluids for developing pollen grains, produces Ubisch bodies and Pollenkit).",
          "Pollen Grain (Microspore) Wall (Sporoderm):",
          "Outer Exine: Thick, sculpted, composed of SPOROPOLLENIN (one of the most resistant biological materials known, unaffected by strong acids, alkalis, high temp, or any known enzyme). Preserves pollen as fossils.",
          "Germ Pores: Thin apertures in exine where sporopollenin is absent (pollen tube emerges here). Monocolpate in monocots, tricolpate in dicots.",
          "Inner Intine: Thin, continuous layer composed of PECTIN and CELLULOSE.",
          "Male Gametophyte: Generative cell (small, divides mitotically into TWO non-motile male gametes) + Vegetative / Tube cell (large, abundant food reserve, forms pollen tube). Shed at 2-celled stage in 60% angiosperms, 3-celled stage in remaining 40%.",
        ],
        keyFormula: "Sporoderm = Exine (Sporopollenin) + Intine (Pectocellulose) | 2 Male Gametes",
        examTip: "Tapetum is nutritive and multinucleate; Sporopollenin is synthesized by tapetum and allows fossil preservation of pollen."
      },
      {
        title: "2. Megasporogenesis & Anatropous Ovule",
        points: [
          "Typical Angiospermic Ovule is ANATROPOUS (inverted by 180° such that micropyle lies close to funicle).",
          "Parts: Funicle (stalk), Hilum (junction of funicle and body), Nucellus (nutritive parenchymatous tissue), Integuments (outer and inner protective coats), Micropyle (small pore for pollen tube entry), Chalaza (basal part opposite to micropyle).",
          "Female Gametophyte (Embryo Sac) Development (Monosporic Polygonium type):",
          "1 Megaspore Mother Cell (MMC, 2n) undergoes meiosis -> 4 haploid megaspores (linear tetrad). 3 degenerate towards micropyle; ONLY ONE functional megaspore (chalazal end) survives.",
          "Functional megaspore undergoes 3 consecutive free-nuclear mitotic divisions to produce an 8-NUCLEATE, 7-CELLED embryo sac:",
          "(1) Egg Apparatus (at micropylar end): 1 Egg cell (female gamete) + 2 Synergids (possess FILIFORM APPARATUS that guides pollen tube entry).",
          "(2) Central Cell: Largest cell with TWO Polar Nuclei (fuses to form diploid secondary nucleus).",
          "(3) Antipodal Cells: 3 cells at chalazal end (nutritive, degenerate).",
        ],
        keyFormula: "Angiosperm Embryo Sac = 7-celled, 8-nucleate structure | Synergid = Filiform apparatus"
      },
      {
        title: "3. Double Fertilization & Endosperm",
        points: [
          "Double Fertilization: Unique characteristic of ANGIOSPERMS, discovered by S.G. Nawaschin (1898) in Lilium and Fritillaria.",
          "Event 1 (Syngamy / Generative Fertilization): 1st Male Gamete (n) + Egg Cell (n) -> Diploid ZYGOTE (2n) -> develops into EMBRYO.",
          "Event 2 (Triple Fusion / Vegetative Fertilization): 2nd Male Gamete (n) + Secondary Diploid Nucleus (2n) -> Triploid PRIMARY ENDOSPERM NUCLEUS (PEN, 3n) -> develops into ENDOSPERM (nutritive tissue).",
          "Endosperm Types:",
          "(1) Nuclear Endosperm (most common, e.g. Coconut water is free-nuclear endosperm, surrounding white meat is cellular endosperm).",
          "(2) Cellular Endosperm (wall formation right from first division, e.g. Petunia, Datura).",
          "(3) Helobial Endosperm (intermediate, e.g. Asphodelus).",
          "Special phenomena: Apomixis (development of seeds without fertilization, mimic of sexual reproduction); Polyembryony (presence of more than one embryo in seed, e.g. Citrus, Mango).",
        ],
        keyFormula: "Syngamy: n + n = 2n Zygote | Triple Fusion: n + 2n = 3n Endosperm (PEN)",
        examTip: "Ploidy levels: Synergid/Antipodal = n; Zygote = 2n; Endosperm in angiosperms = 3n (In gymnosperms, endosperm is haploid n, formed before fertilization!)."
      },
    ],
    quickRevisionPoints: [
      { en: "Tapetum nourishes pollen; Exine is made of resistant Sporopollenin." },
      { en: "Embryo sac is 7-celled, 8-nucleate. Filiform apparatus guides pollen tube." },
      { en: "Double fertilization yields 2n Zygote + 3n Endosperm. Unique to angiosperms." },
    ],
    keyFormulasTable: [
      { name: "Double Fertilization Equation", formula: "Male Gamete(n) + Egg(n) -> 2n Zygote; Male Gamete(n) + 2 Polar Nuclei(2n) -> 3n PEN", description: "Dual fusion events yielding embryo and endosperm" },
      { name: "Ploidy of Endosperm", formula: "Angiosperm = 3n, Gymnosperm = n", description: "Comparison of endosperm genetic ploidy across seed plants" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming gymnosperms also show double fertilization and triploid endosperm.",
        correction: "Double fertilization and 3n endosperm occur ONLY in Angiosperms. In Gymnosperms, endosperm is haploid (n) and forms before fertilization."
      },
    ]
  },

  // 2. Human Reproduction & Reproductive Health
  {
    id: "note_bio_human_reproduction",
    chapter: "Human Reproduction & Reproductive Health",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Gametogenesis, Menstrual Cycle, Fertilization, Placenta & Assisted Reproduction (ART)",
    summary: "Complete guide covering Male/Female reproductive anatomy, Spermatogenesis vs Oogenesis, Hormonal regulation (GnRH, LH, FSH, Progesterone), Menstrual cycle phases, Blastocyst implantation, Parturition, and Contraception/ART (IVF, ZIFT, GIFT).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Male & Female Reproductive Systems & Gametogenesis",
        points: [
          "Male System: Testes located outside abdominal cavity in Scrotum (maintains 2-2.5°C lower than normal body temperature, essential for spermatogenesis).",
          "Seminiferous Tubules: Contain Male germ cells (Spermatogonia, 2n) and SERTOLI CELLS (nurse cells, provide nutrition to developing spermatozoa, secrete Androgen Binding Protein and Inhibin).",
          "Interstitial Spaces: Contain LEYDIG CELLS (interstitial cells) that synthesize and secrete ANDROGENS (Testosterone) under stimulation of LH (ICSH).",
          "Pathway of Sperm: Seminiferous tubules -> Rete testis -> Vasa efferentia -> Epididymis (maturation & storage) -> Vas deferens -> Ejaculatory duct -> Urethra.",
          "Spermatogenesis vs Oogenesis:",
          "Spermatogenesis: Continuous from puberty till death; 1 Primary Spermatocyte (2n) yields 4 functional spermatozoa (n).",
          "Oogenesis: Initiated during embryonic development (no new oogonia added after birth). Arrested at Prophase-I (Diplotene stage) of Meiosis-I as Primary Oocyte until puberty.",
          "Meiosis-I completes just before ovulation, forming 1 Secondary Oocyte (n) and 1st POLAR BODY (unequal division).",
          "Meiosis-II completes ONLY UPON ENTRY OF SPERM in the ampulla, releasing 2nd Polar Body and haploid Ovum (Ootid).",
        ],
        keyFormula: "1 Primary Spermatocyte -> 4 Sperms | 1 Primary Oocyte -> 1 Ovum + 2-3 Polar Bodies",
        examTip: "Meiosis-II in human oocyte is arrested at Metaphase-II and is completed ONLY upon fertilization by sperm entry."
      },
      {
        title: "2. Menstrual Cycle & Hormonal Feedback",
        points: [
          "Standard 28-day cycle divided into 4 phases:",
          "(1) Menstrual Phase (Days 1 - 5): Breakdown of endometrium and blood vessels due to sudden drop in Progesterone and Estrogen levels.",
          "(2) Follicular / Proliferative Phase (Days 6 - 13): FSH stimulates growth of Primary follicle into mature GRAAFIAN FOLLICLE. Developing follicle secretes ESTROGEN, causing proliferation of endometrium (thickening).",
          "(3) Ovulatory Phase (Day 14): LH and FSH attain peak level mid-cycle. Rapid surge of LH (LH SURGE) induces RUPTURE of Graafian follicle and release of ovum (secondary oocyte) into pelvic cavity -> OVULATION.",
          "(4) Luteal / Secretory Phase (Days 15 - 28): Ruptured Graafian follicle transforms into CORPUS LUTEUM (yellow body) which secretes large amounts of PROGESTERONE (pregnancy maintaining hormone) to make endometrium secretory.",
          "If fertilization does NOT occur: Corpus luteum degenerates into CORPUS ALBICANS (white scar), progesterone drops, triggering next menstruation.",
          "If fertilization occurs: Embryo secretes human Chorionic Gonadotropin (hCG) which rescues and maintains Corpus Luteum.",
        ],
        keyFormula: "Day 14: LH Surge -> Ovulation | Corpus Luteum -> High Progesterone | Degenerates -> Corpus Albicans"
      },
      {
        title: "3. Fertilization, Embryo Development & Reproductive Technologies",
        points: [
          "Site of Fertilization: AMPULLA of Fallopian tube.",
          "Acrosome Reaction: Acrosome contains enzymes (Hyaluronidase, Corona penetrating enzyme, Acrosin) that digest zona pellucida.",
          "Cortical Reaction: Entry of sperm triggers exocytosis of cortical granules, hardening zona pellucida to PREVENT POLYSPERMY.",
          "Cleavage & Implantation: Zygote -> 2 -> 4 -> 8 -> 16 celled MORULA -> BLASTOCYST (Trophoblast outer layer + Inner Cell Mass).",
          "Implantation: Occurs on 7th day after fertilization; blastocyst embeds into endometrium of uterus.",
          "Placental Hormones: Secretes hCG (human chorionic gonadotropin, detected in pregnancy test kits), hPL (human placental lactogen), Estrogens, Progesterone, and RELAXIN (secreted by ovary in late pregnancy).",
          "Parturition (Childbirth): Neuroendocrine reflex (Foetal Ejection Reflex) triggers OXYTOCIN release from maternal posterior pituitary, stimulating powerful uterine contractions.",
          "Assisted Reproductive Technologies (ART):",
          "IVF-ET (In Vitro Fertilization & Embryo Transfer): 'Test tube baby'. Zygote or early embryo up to 8 blastomeres transferred into fallopian tube = ZIFT (Zygote Intra Fallopian Transfer). Embryo with more than 8 blastomeres transferred into uterus = IUT (Intra Uterine Transfer).",
          "GIFT (Gamete Intra Fallopian Transfer): Transfer of ovum collected from donor into fallopian tube of recipient who cannot produce ova.",
          "ICSI (Intra Cytoplasmic Sperm Injection): Sperm is directly injected into cytoplasm of ovum.",
        ],
        keyFormula: "ZIFT: Embryo ≤ 8 blastomeres -> Fallopian Tube | IUT: Embryo > 8 blastomeres -> Uterus"
      },
    ],
    quickRevisionPoints: [
      { en: "Spermatogenesis occurs in seminiferous tubules; Leydig cells secrete testosterone under LH." },
      { en: "LH surge on day 14 causes ovulation; Corpus luteum produces Progesterone." },
      { en: "Fertilization happens in the Ampulla. ZIFT = up to 8 blastomeres; IUT = >8 blastomeres." },
    ],
    keyFormulasTable: [
      { name: "Fertilization Locus", formula: "Ampullary Region of Oviduct", description: "Physiological site of sperm-egg fusion" },
      { name: "ZIFT Criterion", formula: "Embryo stage ≤ 8 blastomeres", description: "Transfer of pre-embryo directly into fallopian tube" },
      { name: "IUT Criterion", formula: "Embryo stage > 8 blastomeres", description: "Transfer of advanced embryo directly into uterine cavity" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing ZIFT and IUT transfer destinations.",
        correction: "ZIFT transfers into the Fallopian Tube (up to 8 cells). IUT transfers into the Uterus (>8 cells)."
      },
    ]
  },

  // 3. Control and Coordination (Nervous & Endocrine Systems)
  {
    id: "note_bio_control_coordination",
    chapter: "Control and Coordination",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Nerve Impulse Conduction, Brain Regions, Reflex Arc & Master Endocrine Glands",
    summary: "Complete guide covering Action potential generation (Na⁺ influx/K⁺ efflux), Synaptic transmission, Human brain (Cerebrum, Cerebellum, Medulla), Spinal reflex arc, Pituitary hormones, Thyroid, Adrenal, and Pancreatic hormones.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Nerve Impulse Generation & Conduction",
        points: [
          "Resting Membrane Potential (-70 mV): Axonal membrane is polarized. Outer surface is positive, inner surface is negative.",
          "Maintained by Active Na⁺/K⁺ ATPase Pump: Pumps 3 Na⁺ OUTWARDS for every 2 K⁺ transported INWARDS, using 1 ATP.",
          "Axoplasm has high concentration of K⁺ and negatively charged proteins, and low concentration of Na⁺.",
          "Depolarization (Action Potential, +30 mV): Upon stimulus, voltage-gated Na⁺ channels open rapidly -> rapid INFLUX of Na⁺ -> polarity reverses (inside positive, outside negative).",
          "Repolarization: Na⁺ channels close, voltage-gated K⁺ channels open -> EFFLUX of K⁺ restores negative resting potential inside.",
          "Hyperpolarization: Delayed closure of K⁺ channels drops potential below -70 mV (-90 mV) until Na⁺/K⁺ pump restores equilibrium.",
          "Synaptic Transmission: Chemical synapse uses neurotransmitter (e.g. ACETYLCHOLINE). Nerve impulse reaches axon terminal -> triggers Ca²⁺ influx -> synaptic vesicles fuse with presynaptic membrane and release neurotransmitter into synaptic cleft -> binds to receptors on postsynaptic membrane.",
        ],
        keyFormula: "Resting = -70 mV | Action = +30 mV | Na⁺/K⁺ Pump: 3 Na⁺ OUT : 2 K⁺ IN | Neurotransmitter = Acetylcholine"
      },
      {
        title: "2. Human Brain Divisions & Functions",
        points: [
          "Forebrain (Prosencephalon):",
          "(1) Cerebrum: Largest part (80-85% brain weight). Divided into Left and Right Cerebral Hemispheres connected by a thick nerve tract called CORPUS CALLOSUM (unique mammalian feature).",
          "Cerebral Cortex (Grey matter outside, white matter inside): Sensory, Motor, and Association areas (responsible for complex functions like memory, communication, intelligence).",
          "(2) Thalamus: Major relay station for sensory and motor signals.",
          "(3) Hypothalamus: Master control center for THERMOREGULATION (body temperature), hunger, thirst, satiety, circadian rhythms, and controls pituitary hormones.",
          "Limbic System (Amygdala + Hippocampus + Hypothalamus): Regulates emotional reactions (fear, anger, pleasure) and converts short-term to long-term memory.",
          "Midbrain (Mesencephalon): Contains Corpora Quadrigemina (4 optic/auditory reflex lobes).",
          "Hindbrain (Rhombencephalon):",
          "(1) Cerebellum: 'Little brain'. Highly folded surface; maintains BODY BALANCE, posture, and coordination of voluntary muscular movements (affected by alcohol).",
          "(2) Pons Varolii: Contains PNEUMOTAXIC CENTER which regulates respiration rate.",
          "(3) Medulla Oblongata: Controls involuntary vital functions: cardiac center (heart rate), respiratory rhythm center, vasomotor center, swallowing, vomiting, coughing.",
        ],
        keyFormula: "Corpus Callosum connects Cerebral Hemispheres | Hypothalamus = Thermostat | Cerebellum = Body Balance | Medulla = Vital Involuntary Centers"
      },
      {
        title: "3. Endocrine Glands & Hormone Disorders",
        points: [
          "Pituitary Gland (Hypophysis): Located in sella turcica bone cavity. Master endocrine gland.",
          "Anterior Pituitary (Adenohypophysis): GH (Growth Hormone - hypersecretion in children causes Gigantism, in adults Acromegaly; hyposecretion causes Dwarfism), PRL, TSH, ACTH, LH, FSH.",
          "Posterior Pituitary (Neurohypophysis): Stores and releases hormones synthesized by hypothalamus: (1) OXYTOCIN (induces vigorous uterine contraction during childbirth and milk ejection from mammary glands), (2) ADH / VASOPRESSIN (stimulates water reabsorption in kidney DCT/CD; deficiency causes DIABETES INSIPIDUS - excretion of large volumes of dilute urine without glucose).",
          "Thyroid Gland: Secretes Thyroxine (T₄) and Triiodothyronine (T₃) containing Iodine. Deficiency of dietary iodine causes GOITRE. In children, hypothyroidism causes CRETINISM (mental retardation). Hyperthyroidism causes GRAVES' DISEASE (Exophthalmic goitre).",
          "Also secretes THYROCALCITONIN (TCT): LOWERS blood calcium level.",
          "Parathyroid Glands: Secrete PARATHYROID HORMONE (PTH / Collip's hormone): RAISES blood calcium level by bone resorption and renal reabsorption (hypercalcemic hormone; antagonistic to Calcitonin).",
          "Adrenal Gland:",
          "Adrenal Cortex: Secretes Glucocorticoids (Cortisol - anti-inflammatory, immunosuppressive, increases blood glucose) and Mineralocorticoids (Aldosterone - reabsorbs Na⁺ and water in DCT). Deficiency causes ADDISON'S DISEASE; excess causes CUSHING'S SYNDROME.",
          "Adrenal Medulla: Secretes Adrenaline (Epinephrine) and Noradrenaline - '3F / Emergency / Fight-or-Flight' hormones. Rapidly increase heart rate, alertness, pupil dilation, glycogenolysis.",
          "Pancreas (Islets of Langerhans): Dual (endocrine + exocrine) organ.",
          "α-cells secrete GLUCAGON (hyperglycemic hormone, raises blood glucose).",
          "β-cells secrete INSULIN (hypoglycemic hormone, lowers blood glucose by promoting cellular uptake). Deficiency leads to DIABETES MELLITUS (hyperglycemia and glycosuria).",
        ],
        keyFormula: "Insulin lowers Blood Glucose | Glucagon raises Blood Glucose | Calcitonin lowers Ca²⁺ | PTH raises Ca²⁺"
      },
    ],
    quickRevisionPoints: [
      { en: "Na⁺/K⁺ pump exports 3 Na⁺ and imports 2 K⁺ using ATP, maintaining -70 mV." },
      { en: "Corpus callosum connects cerebral hemispheres; Cerebellum maintains balance." },
      { en: "ADH deficiency causes Diabetes Insipidus (dilute urine); Insulin deficiency causes Diabetes Mellitus." },
      { en: "PTH increases blood Ca²⁺ while Calcitonin decreases blood Ca²⁺ (antagonistic)." },
    ],
    keyFormulasTable: [
      { name: "Resting Membrane Potential", formula: "V_m = -70 mV", description: "Polarized baseline state across axonal neurolemma" },
      { name: "Active Ion Translocation", formula: "3 Na⁺ (out) : 2 K⁺ (in) per 1 ATP", description: "Stoichiometry of electrogenic sodium-potassium pump" },
      { name: "Blood Glucose Homeostasis", formula: "Insulin (Hypoglycemic) vs Glucagon (Hyperglycemic)", description: "Antagonistic pancreatic endocrine regulation" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Diabetes Insipidus with Diabetes Mellitus.",
        correction: "Diabetes Insipidus is caused by ADH deficiency (frequent urination without sugar). Diabetes Mellitus is caused by Insulin deficiency (high blood sugar and glucose in urine)."
      },
    ]
  },

  // 4. Respiration and Energy Transfer in Organisms
  {
    id: "note_bio_respiration_energy",
    chapter: "Respiration and Energy Transfer",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Glycolysis (EMP), Link Reaction, Krebs TCA Cycle, ETS & ATP Calculation",
    summary: "Complete guide covering Cytoplasmic Glycolysis (10 steps), Substrate level phosphorylation, Mitochondrial Pyruvate Dehydrogenase link reaction, Krebs TCA cycle enzymes, Inner membrane Complexes I to V, and Respiratory Quotient (RQ).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Glycolysis (EMP Pathway)",
        points: [
          "Discovered by Embden, Meyerhof, and Parnas (EMP Pathway). Occurs in CYTOPLASM of all living organisms (common to both aerobic and anaerobic respiration).",
          "Breakdown of 1 Molecule of Glucose (6C) into 2 Molecules of Pyruvic Acid (3C) through 10 enzyme-catalyzed steps without requiring oxygen.",
          "Preparatory / Cleavage Phase (Investment of 2 ATP):",
          "Step 1: Glucose -> Glucose-6-phosphate (consumes 1st ATP, catalyzed by Hexokinase).",
          "Step 3: Fructose-6-phosphate -> Fructose-1,6-bisphosphate (consumes 2nd ATP, catalyzed by Phosphofructokinase - PFK, the PACEMAKER / Rate-limiting enzyme of glycolysis).",
          "Payoff / Energy Yielding Phase (Production of 4 ATP + 2 NADH):",
          "Step 6: Glyceraldehyde-3-phosphate -> 1,3-Bisphosphoglycerate produces 2 NADH + 2 H⁺ (catalyzed by G3P dehydrogenase).",
          "Step 7: 1,3-BPG -> 3-Phosphoglycerate yields 2 ATP (Substrate-Level Phosphorylation).",
          "Step 10: Phosphoenolpyruvate (PEP) -> Pyruvate yields 2 ATP (Substrate-Level Phosphorylation, catalyzed by Pyruvate Kinase).",
          "Net Yield of Glycolysis: 2 Pyruvate + 2 ATP (Net) + 2 NADH + 2 H₂O.",
        ],
        keyFormula: "Glucose + 2 NAD⁺ + 2 ADP + 2 Pi -> 2 Pyruvate + 2 NADH + 2 H⁺ + 2 ATP (Net)",
        examTip: "Phosphofructokinase (PFK) is the key regulatory pacemaker enzyme of glycolysis. Substrate level phosphorylation occurs at steps 7 and 10."
      },
      {
        title: "2. Link Reaction & Krebs Cycle (TCA Cycle)",
        points: [
          "Link Reaction (Gateway Step / Oxidative Decarboxylation):",
          "Occurs in MITOCHONDRIAL MATRIX.",
          "Pyruvate (3C) + CoA-SH + NAD⁺ -> Acetyl-CoA (2C) + CO₂↑ + NADH + H⁺ (catalyzed by Pyruvate Dehydrogenase complex requiring Mg²⁺, TPP, Lipoic acid).",
          "Yield from 2 pyruvates: 2 Acetyl-CoA + 2 CO₂ + 2 NADH.",
          "Krebs Cycle (TCA / Citric Acid Cycle):",
          "Discovered by Sir Hans Krebs. Occurs in MITOCHONDRIAL MATRIX.",
          "Step 1: Condensation of Acetyl-CoA (2C) with Oxaloacetate (OAA, 4C) -> CITRIC ACID (6C, first stable product with 3 carboxyl groups), catalyzed by Citrate Synthase.",
          "Decarboxylation steps: Isocitrate (6C) -> α-Ketoglutarate (5C) releases 1st CO₂ and 1 NADH; α-Ketoglutarate (5C) -> Succinyl-CoA (4C) releases 2nd CO₂ and 1 NADH.",
          "Substrate Level Phosphorylation: Succinyl-CoA -> Succinate produces 1 GTP (or 1 ATP).",
          "FADH₂ generation: Succinate -> Fumarate produces 1 FADH₂ (catalyzed by SUCCINATE DEHYDROGENASE - the ONLY enzyme of TCA cycle attached to INNER mitochondrial membrane / Complex II).",
          "Regeneration: Malate -> OAA produces 1 NADH.",
          "Yield of 1 Krebs Cycle turn (for 1 Acetyl-CoA): 3 NADH + 1 FADH₂ + 1 GTP (ATP) + 2 CO₂.",
          "For 1 Glucose molecule (2 turns): 6 NADH + 2 FADH₂ + 2 GTP + 4 CO₂.",
        ],
        keyFormula: "1 Krebs Turn = 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂ | For 1 Glucose = Double this"
      },
      {
        title: "3. Electron Transport System (ETS) & Respiratory Quotient (RQ)",
        points: [
          "ETS location: INNER MITOCHONDRIAL MEMBRANE (Cristae).",
          "Complex I: NADH Dehydrogenase (oxidizes NADH, pumps 4 H⁺ into intermembrane space).",
          "Complex II: Succinate Dehydrogenase (oxidizes FADH₂, transfers electrons to Ubiquinone).",
          "Complex III: Cytochrome bc₁ Complex (pumps 4 H⁺).",
          "Complex IV: Cytochrome c Oxidase (contains cytochromes a and a₃, and two copper centers; reduces molecular OXYGEN - the ULTIMATE / TERMINAL ELECTRON ACCEPTOR - to form H₂O, pumps 2 H⁺).",
          "Complex V: ATP Synthase (F₀-F₁ complex). Chemiosmotic ATP synthesis driven by proton gradient.",
          "ATP Calculations: 1 NADH yields 2.5 (or 3) ATP; 1 FADH₂ yields 1.5 (or 2) ATP.",
          "Net ATP per Glucose in Aerobic Respiration: 36 or 38 ATP (or 30-32 ATP modern calculation). In Anaerobic fermentation: ONLY 2 ATP.",
          "Respiratory Quotient (RQ) = Volume of CO₂ evolved / Volume of O₂ consumed:",
          "Carbohydrates (Glucose): RQ = 1.0 (C₆H₁₂O₆ + 6 O₂ -> 6 CO₂ + 6 H₂O; 6/6 = 1).",
          "Fats (Tripalmitin): RQ = 0.7 (2 C₅₁H₉₈O₆ + 145 O₂ -> 102 CO₂ + 98 H₂O; 102/145 = 0.7).",
          "Proteins: RQ = 0.9.",
          "Organic Acids (Malic acid): RQ > 1 (e.g. 1.33).",
          "Anaerobic Respiration: RQ = INFINITY (∞) (no O₂ consumed).",
        ],
        keyFormula: "RQ = Vol CO₂ / Vol O₂ | Glucose RQ = 1.0 | Fat RQ = 0.7 | Protein RQ = 0.9 | Anaerobic RQ = ∞"
      },
    ],
    quickRevisionPoints: [
      { en: "Glycolysis occurs in cytoplasm; yields 2 ATP net + 2 NADH per glucose." },
      { en: "TCA cycle occurs in matrix; Succinate dehydrogenase is in inner membrane." },
      { en: "Oxygen is the terminal electron acceptor in ETS, forming water." },
      { en: "RQ values: Carbohydrates = 1.0, Fats = 0.7, Proteins = 0.9, Anaerobic = ∞." },
    ],
    keyFormulasTable: [
      { name: "Respiratory Quotient", formula: "RQ = (Volume of CO₂ released) / (Volume of O₂ absorbed)", description: "Ratio indicating respiratory substrate metabolized" },
      { name: "Terminal Oxidation", formula: "1/2 O₂ + 2 H⁺ + 2 e⁻ -> H₂O", description: "Reduction of oxygen at Complex IV of electron transport chain" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming all TCA cycle enzymes reside freely in the mitochondrial matrix.",
        correction: "Succinate Dehydrogenase (Complex II) is firmly embedded in the INNER MITOCHONDRIAL MEMBRANE, not in the matrix."
      },
    ]
  },

  // 5. Human Health and Diseases
  {
    id: "note_bio_human_health",
    chapter: "Human Health and Diseases",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Pathogens, Antibody Structure, Innate vs Acquired Immunity, AIDS & Cancer",
    summary: "Complete guide covering Typhoid (Widal test), Malaria life cycle, Pneumonia, Amoebiasis, Filariasis, Ringworm, Antibody structure (H₂L₂), Immunoglobulin classes (IgG, IgA, IgM, IgE), HIV-AIDS replication, and Cancer characteristics.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Common Infectious Diseases & Pathogens",
        points: [
          "Bacterial Diseases:",
          "(1) Typhoid: Caused by Salmonella typhi. Transmitted via contaminated food and water. Symptoms: sustained high fever (39-40°C), stomach pain, constipation, intestinal perforation in severe cases. Confirmatory test: WIDAL TEST. Classic carrier: Mary Mallon ('Typhoid Mary').",
          "(2) Pneumonia: Caused by Streptococcus pneumoniae and Haemophilus influenzae. Infects ALVEOLI of lungs (alveoli fill with fluid leading to severe breathing problems). Lips and fingernails turn grey to bluish in severe cases.",
          "Viral Diseases: Common Cold: Caused by RHINOVIRUS. Infects nose and respiratory tract, but NOT THE LUNGS. Lasts 3-7 days.",
          "Protozoan Diseases:",
          "(1) Malaria: Caused by Plasmodium (P. vivax, P. malariae, P. falciparum - malignant malaria, fatal). Vector: Female Anopheles mosquito.",
          "Life cycle: Sporozoites injected with mosquito saliva -> infect LIVER cells -> asexual reproduction -> rupture RBCs releasing toxic pigment HAEMOZOIN (causes shivering chills and high fever recurring every 3-4 days) -> gametocytes develop in RBCs -> taken up by mosquito -> fertilization and development in mosquito gut -> sporozoites migrate to salivary glands.",
          "(2) Amoebiasis (Amoebic dysentery): Caused by Entamoeba histolytica in large intestine. Mechanical carrier: Houseflies. Stools with excess mucous and blood clots.",
          "Helminthic & Fungal Diseases:",
          "(1) Filariasis / Elephantiasis: Caused by Wuchereria bancrofti and Wuchereria malayi. Transmitted by female Culex mosquito. Chronic inflammation of lymphatic vessels of lower limbs and genital organs.",
          "(2) Ringworm: Caused by fungi genera Microsporum, Trichophyton, and Epidermophyton. Dry, scaly lesions on skin, nails, scalp with intense itching.",
        ],
        keyFormula: "Typhoid = Widal Test | Malaria Chills = Haemozoin Toxin | Filariasis = Culex + Wuchereria",
        examTip: "Pneumonia infects lung alveoli; Common Cold infects only upper respiratory tract, NEVER the alveoli."
      },
      {
        title: "2. Immunity & Structure of Antibody",
        points: [
          "Innate Immunity (Non-specific, present from birth):",
          "(1) Physical barriers: Skin, mucus coating of respiratory/digestive tracts.",
          "(2) Physiological barriers: Acid in stomach, saliva in mouth, tears from eyes (lysozyme).",
          "(3) Cellular barriers: Polymorphonuclear leukocytes (PMNL-neutrophils), monocytes, natural killer (NK) cells, macrophages.",
          "(4) Cytokine barriers: INTERFERONS (proteins secreted by virus-infected cells to protect non-infected cells from further viral infection).",
          "Acquired Immunity (Pathogen-specific, characterized by memory):",
          "Humoral Immune Response: Mediated by B-LYMPHOCYTES producing Antibodies circulating in body fluids (blood, lymph).",
          "Cell-Mediated Immunity (CMI): Mediated by T-LYMPHOCYTES. Responsible for GRAFT REJECTION in organ transplantation (tissue matching and immunosuppressants like Cyclosporin-A are required).",
          "Structure of Antibody Molecule:",
          "Represented as H₂L₂: Composed of 4 polypeptide chains held together by DISULFIDE BONDS (2 identical heavy chains H + 2 identical light chains L).",
          "Each chain has a Variable region (antigen-binding site / Paratope) and Constant region.",
          "Immunoglobulin Classes:",
          "IgG: Most abundant (75-80%), ONLY antibody that crosses the PLACENTA to provide passive immunity to fetus.",
          "IgA: Present in COLOSTRUM (first yellowish milk) and secretory fluids (saliva, tears), protects infant mucosa.",
          "IgM: Largest pentameric antibody, first antibody produced during primary immune response.",
          "IgE: Mediates ALLERGIC reactions (triggers histamine and serotonin release from mast cells and basophils).",
          "IgD: Functions as antigen receptor on B-cell surface.",
        ],
        keyFormula: "Antibody = H₂L₂ (Disulfide bonds) | Colostrum = IgA | Crosses Placenta = IgG | Allergy = IgE"
      },
      {
        title: "3. AIDS & Cancer",
        points: [
          "AIDS (Acquired Immuno Deficiency Syndrome):",
          "Caused by Human Immunodeficiency Virus (HIV), a RETROVIRUS with RNA genome enclosed in protein coat.",
          "Replication Cycle: HIV enters MACROPHAGE ('HIV Factory') -> viral RNA copied into viral DNA by REVERSE TRANSCRIPTASE -> viral DNA integrates into host genome -> produces new viral particles -> infects and destroys HELPER T-LYMPHOCYTES (T_H / CD4 cells).",
          "Progressive drop in Helper T-cell count (< 200 cells/mm³) leaves patient susceptible to opportunistic infections (Mycobacterium, Toxoplasma, fungi).",
          "Diagnostic Test: ELISA (Enzyme Linked Immuno-Sorbent Assay). Confirmatory Test: WESTERN BLOT.",
          "Cancer (Oncology):",
          "Loss of CONTACT INHIBITION (normal cells stop dividing when in contact with other cells; cancer cells lose this property, forming tumors).",
          "Types of Tumors: Benign (confined to original location, harmless) vs Malignant (invasive, rapidly proliferating cells called neoplastic cells).",
          "METASTASIS: Most feared property of malignant tumors (cancer cells detach, travel through blood/lymph to distant sites and start new secondary tumors).",
          "Carcinogens: Physical (UV, X-rays, gamma rays), Chemical (Tobacco smoke causes lung cancer), Biological (Oncogenic viruses, cellular oncogenes / proto-oncogenes activated to oncogenes).",
          "Treatment: Surgery, Radiation therapy, Chemotherapy, and Immunotherapy (α-INTERFERON activates immune system to destroy tumors).",
        ],
        keyFormula: "HIV attacks Helper T-Cells (CD4) | AIDS Test = ELISA | Malignant hallmark = Metastasis | Treatment = α-Interferon"
      },
    ],
    quickRevisionPoints: [
      { en: "Typhoid confirmed by Widal test; Malaria chills caused by Haemozoin release." },
      { en: "Antibody formula H₂L₂; IgG crosses placenta; IgA in colostrum; IgE in allergies." },
      { en: "Graft rejection is driven by Cell-Mediated Immunity (T-lymphocytes)." },
      { en: "Metastasis is the spread of cancer cells; HIV attacks CD4 Helper T-cells." },
    ],
    keyFormulasTable: [
      { name: "Antibody Subunit Formula", formula: "H₂L₂", description: "Two identical heavy and two identical light chains joined by disulfide linkages" },
      { name: "Diagnostic Immunoassay", formula: "ELISA -> Western Blot Confirmatory", description: "Sequential protocol for clinical HIV diagnosis" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Attributing graft rejection to Humoral antibodies instead of Cell-Mediated Immunity.",
        correction: "Organ graft rejection is mediated by CELL-MEDIATED IMMUNITY (T-lymphocytes), which is why T-cell immunosuppressants like Cyclosporin-A are administered."
      },
    ]
  },
];
