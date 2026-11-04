import { TopicNote } from "../../types";

export const NEET_BIOLOGY_EXTRA_NOTES: TopicNote[] = [
  // 1. Biological Classification & Five Kingdom System
  {
    id: "note_bio_biological_classification",
    chapter: "Biological Classification & Five Kingdom System",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Monera, Protista, Fungi, Viruses, Viroids & Lichens Complete Revision",
    summary: "High-yield NEET revision covering Whittaker's 5-Kingdom Classification, Archaebacteria vs Eubacteria, Protozoans, Fungi classes (Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes), and acellular entities.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Kingdom Monera (Bacteria & Archaebacteria)",
        points: [
          "Bacteria are the sole members of Kingdom Monera. Most abundant microorganisms on Earth.",
          "Archaebacteria survive extreme conditions due to different cell wall structure (branched chain lipids/pseudomurein): Halophiles (saline), Thermoacidophiles (hot sulfur springs), Methanogens (marshy areas and guts of ruminants producing biogas).",
          "Eubacteria ('True Bacteria'): Rigid cell wall with peptidoglycan; flagellum if motile. Cyanobacteria (blue-green algae like Nostoc, Anabaena) have Chlorophyll-a (like higher plants) and fix nitrogen in specialized thick-walled cells called Heterocysts.",
          "Mycoplasma: Smallest living cells known (0.3 μm), completely lack a cell wall, can survive without oxygen, and are pathogenic to plants & animals.",
        ],
        keyFormula: "Cell size: Mycoplasma = 0.3 μm | Typical bacteria = 1-2 μm",
        keyMnemonic: "Remember: 'No Wall, No Air' = Mycoplasma (smallest, no cell wall, anaerobic).",
        examTip: "NEET PYQ: Heterocysts lack photosystem II (PS-II), hence oxygen is not released, protecting nitrogenase enzyme from oxygen poisoning."
      },
      {
        title: "2. Kingdom Protista (Unicellular Eukaryotes)",
        points: [
          "Chrysophytes: Diatoms and Golden algae (Desmids). Planktonic, microscopic, photosynthetic. Diatom cell wall forms two overlapping shells resembling a soap box, embedded with indestructible Silica (forms Diatomaceous Earth used in polishing and filtration of oils/syrups). Diatoms are chief producers in oceans.",
          "Dinoflagellates: Mostly marine and photosynthetic; 2 flagella (one longitudinal, one transverse). Red dinoflagellates (Gonyaulax) undergo rapid multiplication causing 'Red Tides' releasing toxins that kill marine fishes.",
          "Euglenoids: Fresh water stagnant organisms. No cell wall, have protein-rich flexible layer called Pellicle. Mixotrophic nutrition (photosynthetic in sunlight, heterotrophic predators in darkness). Two flagella (one short, one long).",
          "Slime Moulds: Saprophytic protists. Body forms aggregate called Plasmodium. Under adverse conditions, form fruiting bodies bearing spores with true cell walls (extremely resistant, dispersed by air currents).",
          "Protozoans: Amoeboid (Entamoeba), Flagellated (Trypanosoma causes sleeping sickness), Ciliated (Paramoecium has gullet, thousands of cilia, macro & micronucleus), Sporozoans (Plasmodium vivax causes malaria).",
        ],
        keyFormula: "Mixotrophic = Autotrophic (light) + Heterotrophic (dark)",
        keyMnemonic: "Remember: 'Gonyaulax Glows & Goes Red' -> Red tide in oceans.",
        examTip: "Paramoecium exhibits nuclear dimorphism: Macronucleus controls vegetative metabolic activities, Micronucleus controls sexual reproduction (conjugation)."
      },
      {
        title: "3. Kingdom Fungi & Acellular Entities (Viruses, Viroids, Prions)",
        points: [
          "Phycomycetes (Algal Fungi): Aseptate, coenocytic mycelium. Asexual spores: Zoospores (motile) or Aplanospores (non-motile). Examples: Mucor, Rhizopus (bread mould), Albugo (parasitic fungus on mustard).",
          "Ascomycetes (Sac Fungi): Septate, branched mycelium. Asexual spores: Conidia (exogenous on conidiophores). Sexual spores: Ascospores (endogenous in asci inside ascocarp). Examples: Yeast (unicellular), Penicillium, Aspergillus, Claviceps, Neurospora (used extensively in biochemical and genetic work), Morels and truffles (edible delicacies).",
          "Basidiomycetes (Club Fungi): Septate mycelium. Asexual spores generally absent; vegetative by fragmentation. Karyogamy & meiosis occur in basidium producing 4 Basidiospores exogenously. Examples: Agaricus (mushroom), Ustilago (smut), Puccinia (rust fungus).",
          "Deuteromycetes (Fungi Imperfecti): Sexual stage unknown/absent. Reproduce only by asexual conidia. Decomposers of litter, mineral cycling. Examples: Alternaria, Colletotrichum, Trichoderma.",
          "Viruses: Non-cellular nucleoprotein entities. Genetic material is either RNA or DNA, never both. Plant viruses: single-stranded RNA; Animal viruses: single/double-stranded RNA or double-stranded DNA; Bacteriophages: double-stranded DNA.",
          "Viroids (discovered by T.O. Diener): Infectious agent smaller than viruses, free low-molecular-weight RNA, completely lacks protein capsid coat. Causes Potato Spindle Tuber Disease.",
          "Prions: Abnormally folded infectious proteins causing neurological disorders: Bovine Spongiform Encephalopathy (BSE / Mad Cow Disease) in cattle, and Cr-Jacob disease (CJD) in humans.",
          "Lichens: Symbiotic mutual association of Phycobiont (algae, prepares food) and Mycobiont (fungi, provides shelter & absorbs water/minerals). Excellent pollution indicators — do not grow in SO₂ polluted areas.",
        ],
        keyFormula: "Viroid = Infectious Free RNA without Protein Coat",
        keyMnemonic: "Fungi Spore Production: Ascospores = Endogenous in sac; Basidiospores = Exogenous on sterigmata.",
        examTip: "Direct NEET Question: Lichens are pioneer species in primary succession on bare rocks (xerosere) producing organic acids to weather rocks."
      },
    ],
    quickRevisionPoints: [
      { en: "Whittaker's 5-Kingdom system uses: Cell structure, Thallus organization, Mode of nutrition, Reproduction, and Phylogenetic relationships." },
      { en: "Methanogens in rumen of cattle are Archaebacteria that produce methane (CH₄)." },
      { en: "Neurospora crassa is called the 'Drosophila of plant kingdom' due to extensive genetic research usage." },
      { en: "Lichens do NOT grow in polluted areas containing sulfur dioxide (SO₂)." },
    ],
    keyFormulasTable: [
      { name: "Mycoplasma Size", formula: "0.3 μm", description: "Smallest living cell devoid of cell wall" },
      { name: "Viroid vs Virus", formula: "Viroid = RNA only (No capsid)", description: "Discovered by T.O. Diener in 1971" },
      { name: "Bacteriophage Genome", formula: "Double-stranded DNA (dsDNA)", description: "Viruses that infect bacteria" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking Mycoplasma has a thin peptidoglycan wall.",
        correction: "Mycoplasma has zero cell wall, which makes it penicillin-resistant (penicillin targets cell wall synthesis)."
      },
    ]
  },

  // 2. Plant Kingdom
  {
    id: "note_bio_plant_kingdom",
    chapter: "Plant Kingdom (Algae to Angiosperms)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Algae, Bryophytes, Pteridophytes, Gymnosperms & Angiosperms Master Sheet",
    summary: "High-yield botanical guide covering Chlorophyceae, Phaeophyceae, Rhodophyceae, Amphibians of plant kingdom, Heterospory, Gymnosperm ovules, Double fertilization, and Life cycle alterations.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae)",
        points: [
          "Chlorophyceae (Green Algae): Major pigments Chl a, b. Stored food is Starch located in Pyrenoids (protein surrounded by starch). Cell wall contains inner cellulose and outer pectose. Examples: Volvox, Chlamydomonas, Spirogyra, Chara.",
          "Phaeophyceae (Brown Algae): Major pigments Chl a, c, and Fucoxanthin (gives brown tint). Stored food is complex carbohydrates: Laminarin or Mannitol. Cell wall: Cellulose + Algin (hydrocolloid). Body divided into holdfast, stipe, and frond. Examples: Ectocarpus, Dictyota, Laminaria, Sargassum, Fucus.",
          "Rhodophyceae (Red Algae): Major pigments Chl a, d, and r-Phycoerythrin. Stored food is Floridean starch (structurally identical to amylopectin and glycogen). Non-motile spores and non-motile gametes! Cell wall: Cellulose, pectin, and polysulfate esters (Agar-agar obtained from Gelidium & Gracilaria; Carrageen from red algae). Examples: Polysiphonia, Porphyra, Gracilaria, Gelidium.",
        ],
        keyFormula: "Floridean starch structure ≡ Amylopectin + Glycogen",
        keyMnemonic: "Algae Food Storage: Green = Starch, Brown = Laminarin/Mannitol, Red = Floridean starch.",
        examTip: "NEET Repeat Question: Agar-agar used to solidify culture media and in ice-creams/jellies is extracted from red algae Gelidium and Gracilaria."
      },
      {
        title: "2. Bryophytes & Pteridophytes",
        points: [
          "Bryophytes: Known as 'Amphibians of the plant kingdom' because they live in soil but depend on water for sexual reproduction (flagellated antherozoids swim to archegonium). Main plant body is Haploid Gametophyte (produces gametes). Sporophyte is dependent on gametophyte.",
          "Liverworts (Marchantia): Thalloid body with gemmae (green multicellular asexual buds in gemma cups).",
          "Mosses (Funaria, Polytrichum, Sphagnum): Sphagnum (peat moss) holds large amounts of water, used as packing material for trans-shipment of living materials, and provides peat fuel.",
          "Pteridophytes: First terrestrial plants possessing vascular tissues (xylem without vessels, phloem without companion cells). Main plant body is Diploid Sporophyte (differentiated into true root, stem, leaf).",
          "Heterospory & Seed Habit: Most pteridophytes are homosporous (Equisetum, Dryopteris). Selaginella and Salvinia produce two kinds of spores (microspores & megaspores). Megaspore retained on parent sporophyte — this event is a crucial precursor to the 'Seed Habit' in plant evolution.",
        ],
        keyFormula: "Heterosporous Pteridophytes = Selaginella & Salvinia",
        keyMnemonic: "Seed precursor = Selaginella + Salvinia (Double S produce Double Spores).",
        examTip: "In Bryophytes, sporophyte is parasitic on gametophyte; in Pteridophytes, both sporophyte and gametophyte are independent photosynthetic bodies."
      },
      {
        title: "3. Gymnosperms & Angiosperms (Double Fertilization)",
        points: [
          "Gymnosperms ('Naked Seeds'): Ovules are NOT enclosed by an ovary wall and remain exposed before and after fertilization. Lack vessels in xylem (except Gnetales). Examples: Cycas (coralloid roots with N₂-fixing cyanobacteria), Pinus (mycorrhizal fungal association, winged pollen), Ginkgo (living fossil), Sequoia (giant redwood, tallest gymnosperm).",
          "Gymnosperm Endosperm is Haploid (n) and forms BEFORE fertilization, representing female gametophyte tissue.",
          "Angiosperms: Unique Double Fertilization discovered by Nawaschin (1898): Syngamy (Male gamete n + Egg n -> Zygote 2n) and Triple Fusion (Male gamete n + 2 Polar nuclei 2n -> Primary Endosperm Nucleus PEN 3n).",
          "Angiosperm Endosperm is Triploid (3n) and forms AFTER fertilization.",
        ],
        keyFormula: "Double Fertilization = Syngamy (2n Zygote) + Triple Fusion (3n PEN)",
        keyMnemonic: "Gymno Endosperm = n (pre-fertilization) vs Angio Endosperm = 3n (post-fertilization).",
        examTip: "Direct NEET Question: Double fertilization is completely unique to Angiosperms, absent in gymnosperms, pteridophytes, and bryophytes."
      },
    ],
    quickRevisionPoints: [
      { en: "Sphagnum (peat moss) has high water retention capacity and provides peat used as fuel." },
      { en: "Cycas has unbranched stem and coralloid roots housing Nostoc/Anabaena." },
      { en: "Pinus has branched stem and dwarf/long shoots, seeds are winged." },
      { en: "Post-fertilization in Angiosperms: Ovary matures into Fruit, Ovules mature into Seeds." },
    ],
    keyFormulasTable: [
      { name: "Ploidy of Endosperm", formula: "Gymnosperm = n | Angiosperm = 3n", description: "Critical ploidy difference tested in NEET" },
      { name: "Double Fertilization", formula: "1 Syngamy + 1 Triple Fusion = 2 Male Gametes used", description: "First observed by Nawaschin" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing the ploidy of gymnosperm and angiosperm endosperm.",
        correction: "Gymnosperm endosperm is haploid (n) formed before fertilization; Angiosperm endosperm is triploid (3n) formed after triple fusion."
      },
    ]
  },

  // 3. Animal Kingdom: Porifera to Chordata
  {
    id: "note_bio_animal_kingdom",
    chapter: "Animal Kingdom (Porifera to Chordata)",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Complete Invertebrates & Vertebrates Diagnostic Classification Sheet",
    summary: "Systematic NEET guide across all 11 Phyla: Porifera, Coelenterata, Ctenophora, Platyhelminthes, Aschelminthes, Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata, Chordata.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Basal Non-Chordates (Porifera to Aschelminthes)",
        points: [
          "Porifera (Sponges): Cellular level, asymmetrical, water canal system (Ostia -> Spongocoel -> Osculum). Choanocytes (collar cells) line spongocoel. Internal fertilization, indirect development. Examples: Sycon, Spongilla (freshwater), Euspongia (bath sponge).",
          "Coelenterata / Cnidaria: Tissue level, radial symmetry, diploblastic. Possess Cnidoblasts (stinging cells with nematocysts for defense & food capture). Metagenesis (alternation of generation between Polyp & Medusa) in Obelia. Examples: Hydra, Physalia (Portuguese man-of-war), Adamsia (sea anemone), Pennatula, Gorgonia, Meandrina.",
          "Ctenophora (Comb Jellies): Exclusively marine, radial symmetry, diploblastic. 8 external rows of ciliated comb plates for locomotion. Bioluminescence well-marked. Only sexual reproduction. Examples: Pleurobrachia, Ctenoplana.",
          "Platyhelminthes (Flatworms): Organ level, bilateral, triploblastic, Acoelomate, dorso-ventrally flattened. Flame cells (protonephridia) for osmoregulation & excretion. High regeneration capacity in Planaria. Examples: Taenia (tapeworm), Fasciola (liver fluke).",
          "Aschelminthes (Roundworms): Organ-system level, Pseudocoelomate (false body cavity with scattered pouches). Muscular pharynx. Sexual dimorphism (female is longer than male). Examples: Ascaris, Wuchereria (filarial worm), Ancylostoma (hookworm).",
        ],
        keyFormula: "Pseudocoelomate Phylum = ONLY Aschelminthes",
        keyMnemonic: "Excretory Organs: Flatworms = Flame cells; Annelids = Nephridia; Arthropods = Malpighian tubules.",
        examTip: "NEET Repeat Question: Pseudocoelomate condition where mesoderm is scattered in pouches between ectoderm and endoderm is unique to Aschelminthes."
      },
      {
        title: "2. Higher Non-Chordates (Annelida to Hemichordata)",
        points: [
          "Annelida: Metamerically segmented, true coelomate, closed circulatory system. Longitudinal & circular muscles for locomotion. Parapodia in Nereis (aquatic) for swimming. Nephridia for osmoregulation & excretion. Examples: Nereis (dioecious), Pheretima (earthworm - monoecious), Hirudinaria (blood-sucking leech).",
          "Arthropoda: Largest phylum (over two-thirds of all named species). Chitinous exoskeleton, jointed appendages, open circulatory system. Respiration: gills, book gills, book lungs, tracheal system. Excretion: Malpighian tubules. Sensory: antennae, compound/simple eyes, statocysts (balance organs). Examples: Apis (honeybee), Bombyx (silkworm), Vector: Anopheles, Culex, Aedes; Gregarious pest: Locusta; Living fossil: Limulus (king crab).",
          "Mollusca: Second largest phylum. Soft unsegmented body with calcareous shell. Divided into Head, Muscular foot, and Visceral hump. Radula (file-like rasping organ for feeding). Feather-like gills (ctenidia) in mantle cavity. Examples: Pila, Pinctada (pearl oyster), Sepia (cuttlefish), Loligo (squid), Octopus (devil fish), Aplysia, Dentalium, Chaetopleura.",
          "Echinodermata: Exclusively marine, organ-system level, adult radial symmetry but larva bilateral symmetry! Water vascular system (locomotion, food capture, respiration). Endoskeleton of calcareous ossicles. Examples: Asterias (starfish), Echinus (sea urchin), Antedon (sea lily), Cucumaria (sea cucumber), Ophiura (brittle star).",
          "Hemichordata: Marine, worm-like, proboscis, collar, and long trunk. Stomochord in collar region (NOT a true notochord). Excretory organ: Proboscis gland. Examples: Balanoglossus, Saccoglossus.",
        ],
        keyFormula: "Echinoderm Symmetry: Larva = Bilateral | Adult = Radial",
        keyMnemonic: "Living Fossils: Limulus (King crab) in Arthropoda; Sphenodon in Reptilia; Latimeria in Pisces.",
        examTip: "Don't confuse Water Canal System of Sponges (food/water transport via ostia) with Water Vascular System of Echinoderms (locomotion via tube feet)."
      },
      {
        title: "3. Phylum Chordata & Vertebrate Classes",
        points: [
          "Fundamental Chordate Characters: (1) Notochord, (2) Dorsal hollow nerve cord, (3) Paired pharyngeal gill slits, (4) Post-anal tail.",
          "Subphyla: Urochordata (notochord only in larval tail, e.g., Ascidia, Salpa), Cephalochordata (notochord extends from head to tail, persists throughout life, e.g., Branchiostoma / Amphioxus), Vertebrata (notochord replaced by cartilaginous or bony vertebral column in adults). All vertebrates are chordates, but not all chordates are vertebrates!",
          "Chondrichthyes (Cartilaginous fish): Ventral mouth, placoid scales, gill slits without operculum (except Chimaera), no air bladder (must swim constantly to avoid sinking). Male pelvic fins have claspers. Examples: Scoliodon (dogfish), Pristis (sawfish), Carcharodon (great white shark), Trygon (sting ray - poison sting), Torpedo (electric organ).",
          "Osteichthyes (Bony fish): Terminal mouth, cycloid/ctenoid scales, 4 pairs of gills with operculum, air bladder present (regulates buoyancy). Examples: Marine: Exocoetus (flying fish), Hippocampus (sea horse); Freshwater: Labeo (Rohu), Catla, Clarias (Magur); Aquarium: Betta (fighting fish), Pterophyllum (angel fish).",
          "Amphibia: Dual life, moist skin without scales, tympanum represents ear, 3-chambered heart (2 atria, 1 ventricle). Alimentary canal, urinary and reproductive tracts open into common chamber: Cloaca.",
          "Reptilia: Dry, cornified skin with epidermal scales/scutes. 3-chambered heart, but 4-chambered in Crocodiles! Poikilotherms (cold-blooded). Snakes and lizards shed scales as skin cast.",
          "Aves: Forelimbs modified into wings. Feathers, pneumatic (hollow) bones with air cavities to reduce weight. Air sacs connected to lungs supplement respiration. 4-chambered heart, warm-blooded (homeotherms). Crop and Gizzard present in digestive tract.",
          "Mammalia: Unique presence of mammary glands, skin possess hair, external ear (pinnae). 4-chambered heart, enucleated biconcave RBCs (except camel/llama). Oviparous mammal: Ornithorhynchus (Platypus); Viviparous: Macropus (kangaroo), Balaenoptera (blue whale), Panthera.",
        ],
        keyFormula: "Heart chambers: Fishes = 2 | Amphibians & Reptiles = 3 (Crocodile = 4) | Birds & Mammals = 4",
        keyMnemonic: "Oviparous Mammal = Ornithorhynchus (Platypus).",
        examTip: "NEET Question: Heart of crocodile is fully 4-chambered despite being a reptile, and pneumatic hollow bones are diagnostic for Class Aves."
      },
    ],
    quickRevisionPoints: [
      { en: "All vertebrates are chordates, but all chordates are NOT vertebrates." },
      { en: "In Urochordata (Ascidia), notochord is present ONLY in larval tail and degenerates in adult (retrogressive metamorphosis)." },
      { en: "Chondrichthyes have placoid scales; Osteichthyes have cycloid/ctenoid scales." },
      { en: "Pneumatic bones (hollow air-filled) are characteristic adaptation of birds (Class Aves)." },
    ],
    keyFormulasTable: [
      { name: "Phyla Count", formula: "11 Phyla", description: "From Porifera to Chordata in animal kingdom" },
      { name: "Heart Evolution", formula: "2-ch (Fish) -> 3-ch (Amphibia/Reptilia) -> 4-ch (Crocodile/Aves/Mammals)", description: "Circulatory evolutionary progression" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Thinking all mammals are viviparous giving direct birth.",
        correction: "Ornithorhynchus (Duck-billed platypus) and Echidna are egg-laying (oviparous) mammals."
      },
    ]
  },

  // 4. Evolution & Population Genetics
  {
    id: "note_bio_evolution",
    chapter: "Evolution & Population Genetics",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Origin of Life, Natural Selection, Hardy-Weinberg & Human Evolution Sheet",
    summary: "Complete NEET revision covering Miller-Urey Experiment, Homologous vs Analogous organs, Adaptive Radiation, Industrial Melanism, Hardy-Weinberg Principle p² + 2pq + q² = 1, and Human Cranial Capacities.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Origin of Life & Evidences for Evolution",
        points: [
          "Oparin-Haldane Theory: Life originated from non-living organic molecules (chemical evolution preceded biological evolution). Earth's primitive atmosphere was Reducing (contained CH₄, NH₃, H₂O vapor, H₂; no free molecular O₂).",
          "Miller-Urey Experiment (1953): Simulated primitive Earth conditions in spark-discharge flask at 800°C using methane, ammonia, hydrogen, and water vapor (ratio CH₄:NH₃:H₂ = 2:1:2). Observed formation of Amino Acids (glycine, alanine, aspartic acid).",
          "Homologous Organs: Same structure/origin, different functions -> Divergent Evolution. Indicates common ancestry. Examples: Forelimbs of whale, bat, cheetah, human; Thorns of Bougainvillea and tendrils of Cucurbita; Vertebrate hearts and brains.",
          "Analogous Organs: Different structure/origin, same function -> Convergent Evolution. Does NOT indicate common ancestry. Examples: Wings of butterfly and bird; Eye of octopus and mammal; Flippers of penguins and dolphins; Sweet potato (root modification) and Potato (stem modification).",
          "Industrial Melanism in England (Biston betularia): Natural selection in action. Before industrialization: White-winged moths survived on lichen-covered tree trunks. After industrialization: Soot blackened tree trunks; dark-winged (melanic) moths had camouflaged survival advantage against predatory birds.",
        ],
        keyFormula: "Homology = Divergent Evolution | Analogy = Convergent Evolution",
        keyMnemonic: "HD-AC: Homologous is Divergent (HD), Analogous is Convergent (AC).",
        examTip: "NEET Question: Sweet potato (root tuber) and Potato (stem tuber) are analogous because they both store food but originate from different plant organs."
      },
      {
        title: "2. Hardy-Weinberg Principle & Natural Selection",
        points: [
          "Hardy-Weinberg Principle: Allele frequencies in a large, randomly mating population remain constant and stable from generation to generation in the absence of evolutionary influences (mutation, gene flow, genetic drift, natural selection).",
          "Mathematical Expression: If p = frequency of dominant allele (A) and q = frequency of recessive allele (a), then: p + q = 1, and (p + q)² = p² + 2pq + q² = 1.",
          "p² = frequency of homozygous dominant individuals (AA), 2pq = frequency of heterozygous individuals (Aa), q² = frequency of homozygous recessive individuals (aa).",
          "Factors affecting Hardy-Weinberg Equilibrium: (1) Gene migration / Gene flow, (2) Genetic Drift (Sewall Wright effect - random change in allele frequencies in small populations; includes Founder Effect and Bottleneck Effect), (3) Mutation, (4) Genetic Recombination, (5) Natural Selection.",
          "Types of Natural Selection: (1) Stabilizing selection (favors mean phenotype, peak becomes higher & narrower, e.g. human birth weight), (2) Directional selection (favors one extreme phenotype, peak shifts in one direction, e.g. DDT resistance in mosquitoes, Industrial melanism), (3) Disruptive selection (favors both extremes over mean, produces two peaks).",
        ],
        keyFormula: "p + q = 1 | p² + 2pq + q² = 1",
        keyMnemonic: "Remember: If frequency of recessive trait (disease) is 16%, then q² = 0.16 => q = 0.4 => p = 0.6 => Heterozygous carriers = 2pq = 2(0.6)(0.4) = 0.48 (48%).",
        examTip: "Numerical in NEET: If a recessive phenotype frequency is given, that is ALWAYS q², NOT q! First find q by taking square root, then p = 1 - q."
      },
      {
        title: "3. Human Evolution Timeline & Cranial Capacities",
        points: [
          "Dryopithecus (15 mya): More ape-like, hairy, walked like gorillas/chimpanzees.",
          "Ramapithecus (15 mya): More man-like, walked erect.",
          "Australopithecus (2-3 mya, East African grasslands): Hunted with stone weapons, essentially ate fruit. Cranial capacity: 450 - 600 cc.",
          "Homo habilis ('Handy man' / First human-like being): Did not eat meat. Cranial capacity: 650 - 800 cc.",
          "Homo erectus (1.5 mya, Java man fossils): Walked fully erect, ate meat. Cranial capacity: 900 cc.",
          "Neanderthal man (100,000 to 40,000 years ago): Lived in Near East & Central Asia, used hides to protect body, buried their dead. Cranial capacity: 1400 cc.",
          "Homo sapiens (Modern man): Arose in Africa during ice age (75,000 - 10,000 years ago). Pre-historic cave art developed around 18,000 years ago (Bhimbetka rock shelter); Agriculture around 10,000 years ago. Cranial capacity: ~1400 - 1450 cc.",
        ],
        keyFormula: "Cranial Capacity Order: Habilis (650-800) < Erectus (900) < Neanderthal (1400) ≈ Sapiens (1450 cc)",
        keyMnemonic: "Evolution Order: 'Doctor Rama And His Executive Neighbor Sang' -> Dryo, Rama, Australo, Habilis, Erectus, Neanderthal, Sapiens.",
        examTip: "Direct NEET Match-the-following: Habilis (650-800 cc), Erectus (900 cc), Neanderthal (1400 cc)."
      },
    ],
    quickRevisionPoints: [
      { en: "Miller used CH₄, NH₃, H₂, H₂O vapor at 800°C in a ratio of 2:1:2 for CH₄:NH₃:H₂." },
      { en: "Darwin's Finches on Galapagos Islands are the textbook example of Adaptive Radiation from an ancestral seed-eating stock." },
      { en: "Genetic drift operates ONLY in small, isolated populations by chance events." },
      { en: "Neanderthal man used animal hides to protect bodies and had religious custom of burying their dead." },
    ],
    keyFormulasTable: [
      { name: "Hardy-Weinberg Equation", formula: "p² + 2pq + q² = 1", description: "p = dominant allele freq, q = recessive allele freq" },
      { name: "Homo erectus Cranial Capacity", formula: "900 cc", description: "Java man discovered in 1891" },
      { name: "Neanderthal Cranial Capacity", formula: "1400 cc", description: "Lived 100,000 - 40,000 years ago" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Taking the percentage of individuals showing recessive trait as 'q'.",
        correction: "The percentage of individuals with recessive phenotype is q²! You must take square root (√q²) to find q, and then calculate p = 1 - q."
      },
    ]
  },

  // 5. Ecology & Biodiversity Conservation
  {
    id: "note_bio_ecology_biodiversity",
    chapter: "Ecology, Ecosystems & Biodiversity",
    subject: "Biology",
    exams: ["NEET", "MHT_CET"],
    title: "Ecosystem Pyramids, Nutrient Cycles & In-Situ vs Ex-Situ Conservation",
    summary: "High-yield NEET ecology guide: Ecological Pyramids (Inverted pyramid of biomass in sea), 10% Energy Law, Species-Area relationship (Alexander von Humboldt), The Evil Quartet, and National Parks vs Botanical Gardens.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Ecosystem Structure & Ecological Pyramids",
        points: [
          "Lindeman's 10% Law of Energy Transfer: Only 10% of energy is transferred from one trophic level to the next higher level; 90% is lost as metabolic heat. Pyramid of energy is ALWAYS upright, can never be inverted.",
          "Pyramid of Numbers: Mostly upright (grassland, pond). Inverted in tree ecosystem supporting parasitic food chain (one tree -> thousands of insects -> hyperparasites) or spindle-shaped (one tree -> birds -> parasites).",
          "Pyramid of Biomass: Upright in terrestrial grassland/forest ecosystems. INVERTED in aquatic (ocean/lake) ecosystem because biomass of zooplankton/fishes far exceeds that of short-lived phytoplankton!",
          "Primary Productivity: Gross Primary Productivity (GPP) is total rate of organic matter production during photosynthesis. Net Primary Productivity (NPP) = GPP - Respiration losses (R). Annual net primary productivity of whole biosphere is ~170 billion tons (dry weight), of which oceans contribute only 55 billion tons despite covering 70% surface area.",
          "Decomposition Stages: Fragmentation (by earthworms/detritivores) -> Leaching (water-soluble inorganics sink into soil) -> Catabolism (bacterial & fungal enzymes) -> Humification (dark amorphous humus) -> Mineralization.",
        ],
        keyFormula: "NPP = GPP - R | Energy Pyramid = ALWAYS Upright",
        keyMnemonic: "Remember: Sea Biomass Pyramid is Upside down (Inverted).",
        examTip: "Direct NEET Question: Oceans occupy 70% of Earth's surface but contribute only 55 billion tons out of 170 billion tons of total global productivity due to light and nutrient limitation."
      },
      {
        title: "2. Biodiversity & The Species-Area Relationship",
        points: [
          "Species-Area Relationship: Proposed by German naturalist Alexander von Humboldt. Within a region, species richness increases with increasing explored area, but only up to a limit. Graph is a rectangular hyperbola.",
          "Logarithmic equation: log S = log C + Z log A, where S = Species richness, A = Area, Z = Slope of line (regression coefficient), C = Y-intercept.",
          "Value of Z: For small regions (plants in Britain, birds in California), Z lies in range of 0.1 to 0.2 regardless of taxonomic group. For very large areas like entire continents, regression slope is much steeper: Z lies between 0.6 to 1.2 (for frugivorous birds and mammals in tropical forests of different continents, Z = 1.15).",
          "David Tilman's Long-term Ecosystem Experiments: Plots with more species showed less year-to-year variation in total biomass and increased overall productivity.",
          "Rivet Popper Hypothesis: Proposed by Stanford ecologist Paul Ehrlich. Comparing ecosystem to an airplane and species to rivets: Removing a few rivets (species extinction) might not immediately crash the plane, but popping key rivets (keystone species, e.g. flight-critical wing rivets) causes catastrophic crash.",
        ],
        keyFormula: "log S = log C + Z log A (Z = 1.15 for tropical forest frugivorous birds)",
        keyMnemonic: "Alexander von Humboldt = Hyperbolic Curve; Paul Ehrlich = Airplane Rivets.",
        examTip: "NEET Question: What does Z represent in log S = log C + Z log A? It is the regression coefficient (slope of the line)."
      },
      {
        title: "3. Loss of Biodiversity & Conservation Strategies (In-Situ vs Ex-Situ)",
        points: [
          "'The Evil Quartet' (4 Major causes of biodiversity loss): (1) Habitat Loss and Fragmentation (MOST important cause; e.g. Amazon rainforest reduced from 14% to 6%), (2) Over-exploitation (Steller's sea cow, Passenger pigeon became extinct due to human greed), (3) Alien / Invasive Species Invasions (Nile perch introduced in Lake Victoria wiped out >200 endemic cichlid fishes; Parthenium / carrot grass, Eichhornia / water hyacinth 'terror of Bengal', African catfish Clarias gariepinus), (4) Co-extinctions (extinction of host fish leads to extinction of unique parasites).",
          "In-Situ Conservation (On-site, within natural home): Whole ecosystem protected. Biosphere Reserves (14 in India), National Parks (over 90 in India), Wildlife Sanctuaries (over 448 in India), Sacred Groves (Khasi and Jaintia Hills in Meghalaya, Aravalli Hills in Rajasthan, Western Ghats of Maharashtra/Karnataka).",
          "Ex-Situ Conservation (Off-site, outside natural habitat): Threatened animals/plants taken out of natural home into special care. Zoological Parks, Botanical Gardens, Wildlife Safari Parks, Cryopreservation of gametes at -196°C in liquid nitrogen, Seed Banks, In-vitro tissue culture.",
          "Earth Summit (Rio de Janeiro, 1992) for conservation of biodiversity; World Summit (Johannesburg, 2002) pledging reduction in biodiversity loss rate.",
        ],
        keyFormula: "Cryopreservation Temperature = -196°C in liquid Nitrogen",
        keyMnemonic: "Ex-Situ = Botanical Garden, Zoo, Safari Park, Seed Bank, Cryopreservation (Human-managed).",
        examTip: "High Frequency NEET Question: Sacred Groves are In-situ conservation, whereas Botanical Gardens and Seed banks are Ex-situ conservation."
      },
    ],
    quickRevisionPoints: [
      { en: "Habitat loss and fragmentation is the single most important cause driving animals and plants to extinction." },
      { en: "Amazon rainforest is called the 'Lungs of the planet' producing an estimated 20% of Earth's oxygen." },
      { en: "Cryopreservation maintains viable gametes in fertile condition indefinitely at -196°C in liquid nitrogen." },
      { en: "Water hyacinth (Eichhornia crassipes) is called the 'Terror of Bengal' for choking aquatic ecosystems." },
    ],
    keyFormulasTable: [
      { name: "Species-Area Equation", formula: "log S = log C + Z log A", description: "Discovered by Alexander von Humboldt" },
      { name: "Biosphere NPP", formula: "170 Billion Tons", description: "Oceans contribute only 55 billion tons" },
      { name: "Cryopreservation Temp", formula: "-196 °C (Liquid N₂)", description: "Ex-situ gamete storage" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Classifying Botanical Gardens and Wildlife Safari Parks as In-situ conservation.",
        correction: "Botanical gardens, zoos, and wildlife safari parks are EX-SITU (off-site) conservation methods."
      },
    ]
  },
];
