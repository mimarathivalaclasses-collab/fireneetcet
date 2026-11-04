import { ChapterPointItem } from "../../types";

export const getBiology100Points = (noteId: string, chapter: string): ChapterPointItem[] => {
  const points: ChapterPointItem[] = [];
  const chapKey = chapter.toLowerCase();

  for (let i = 1; i <= 100; i++) {
    let cat: ChapterPointItem["category"] = "Concept";
    if (i % 5 === 0) cat = "Rule";
    else if (i % 4 === 0) cat = "PYQ_Trend";
    else if (i % 3 === 0) cat = "Shortcut";
    else if (i % 7 === 0) cat = "Exception";
    else if (i <= 10) cat = "Definition";

    let en = `Biology High-Yield Point #${i} for ${chapter}: NCERT line-by-line concept, diagram fact, scientist name, and frequent NEET question pattern.`;
    let formula: string | undefined = undefined;

    if (chapKey.includes("genetic") || chapKey.includes("inheritance") || chapKey.includes("mendel")) {
      if (i === 1) { en = "Gregor Johann Mendel conducted hybridization experiments on garden pea (Pisum sativum) for 7 years (1856-1863)."; }
      else if (i === 2) { en = "Mendel studied 7 pairs of contrasting traits: Stem height, Flower color, Flower position, Pod shape, Pod color, Seed shape, Seed color."; }
      else if (i === 3) { en = "Monohybrid Cross F2 phenotypic ratio: 3:1 (Dominant:Recessive); Genotypic ratio: 1:2:1 (TT : Tt : tt)."; जनुकीय गुणोत्तर (Genotype): १:२:१."; formula = "Phenotypic: 3:1 | Genotypic: 1:2:1"; }
      else if (i === 4) { en = "Dihybrid Cross F2 phenotypic ratio: 9:3:3:1 (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green)."; formula = "9:3:3:1"; }
      else if (i === 5) { en = "Test Cross: Crossing an individual with unknown dominant genotype (e.g. T_) with homozygous recessive parent (tt). Ratio in monohybrid test cross = 1:1; Dihybrid test cross = 1:1:1:1."; formula = "Test cross ratio = 1:1"; }
      else if (i === 6) { en = "Incomplete Dominance: F1 phenotype is intermediate between two parents. Example: Mirabilis jalapa (4 o'clock plant) and Antirrhinum majus (Snapdragon). F2 phenotypic & genotypic ratio are identical: 1:2:1 (Red : Pink : White)."; formula = "1:2:1"; }
      else if (i === 7) { en = "Codominance: Both alleles express equally in heterozygote. Example: ABO blood groups in humans (I^A and I^B are codominant over i). Controlled by gene 'I' located on chromosome 9 with 3 alleles: I^A, I^B, i giving 6 genotypes and 4 phenotypes."; }
      else if (i === 8) { en = "Pleiotropy: A single gene influences multiple phenotypic traits. Example: Phenylketonuria (PKU), Sickle-cell anemia."; }
      else if (i === 9) { en = "Chromosomal Theory of Inheritance was proposed by Walter Sutton and Theodore Boveri (1902). Experimental verification by T.H. Morgan using Drosophila melanogaster (Fruit fly)."; मॉर्गन यांनी ड्रोसोफिलावर (Drosophila) प्रयोगाद्वारे सिद्ध केला."; }
      else if (i === 10) { en = "T.H. Morgan is known as the 'Father of Experimental Genetics'. Discovered Linkage and Recombination.", त्यांनी लिंकेज व रिकॉम्बिनेशनचा शोध लावला." }
      else {
        en = `Genetics Point #${i}: Sex determination in humans (XX-XY), birds (ZW-ZZ female heterogamety), grasshopper (XO type), Turner syndrome (45, X0), Klinefelter syndrome (47, XXY), Down syndrome (Trisomy 21).`;
      }
    } else if (chapKey.includes("molecular") || chapKey.includes("dna") || chapKey.includes("rna")) {
      if (i === 1) { en = "DNA Double Helix structure was proposed by James Watson and Francis Crick (1953) based on X-ray diffraction data of Rosalind Franklin and Maurice Wilkins."; }
      else if (i === 2) { en = "Chargaff's Rule: In double-stranded DNA, [A] = [T] and [G] = [C] => [A + G] = [T + C] (Purines = Pyrimidines). (A + T) / (G + C) is constant for a given species."; formula = "A + G = T + C"; }
      else if (i === 3) { en = "Dimensions of B-DNA: Pitch = 3.4 nm (34 Å), Distance between two base pairs = 0.34 nm (3.4 Å), 10 base pairs per helical turn."; }
      else if (i === 4) { en = "Nucleosome consists of 200 bp of DNA wrapped around an octamer of basic histone proteins (2 copies of H2A, H2B, H3, H4). H1 histone seals the entry/exit."; }
      else if (i === 5) { en = "Transforming Principle experiment by Frederick Griffith (1928) using Streptococcus pneumoniae (mice experiment): Heat-killed S-strain converted live R-strain into virulent S-strain."; }
      else if (i === 6) { en = "Biochemical characterization of Transforming Principle: Oswald Avery, Colin MacLeod, Maclyn McCarty (1944) proved that DNA is the transforming genetic material."; }
      else if (i === 7) { en = "Unequivocal proof that DNA is the genetic material: Alfred Hershey and Martha Chase (1952) using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat)."; }
      else if (i === 8) { en = "Semiconservative replication of DNA was experimentally proved by Matthew Meselson and Franklin Stahl (1958) using heavy isotope ¹⁵N in E. coli."; }
      else if (i === 9) { en = "Central Dogma of Molecular Biology: DNA --(Transcription)--> mRNA --(Translation)--> Protein. Proposed by Francis Crick."; formula = "DNA -> mRNA -> Protein"; }
      else if (i === 10) { en = "Genetic Code is universal, degenerate, non-overlapping, triplet (64 codons: 61 sense codons + 3 stop codons UAA, UAG, UGA). AUG is dual function: Initiator codon and codes for Methionine.", mr = "जनुकीय कोड (Genetic Code): ६४ कोडॉन्स. AUG हा प्रारंभ कोडॉन आहे व तो मिथियोनाइनसाठी कोड करतो." }
      else {
        en = `Molecular Biology Point #${i}: Lac Operon components (i-gene, promoter, operator, structural genes z-β galactosidase, y-permease, a-transacetylase), inducible system with allolactose.`;
      }
    } else if (chapKey.includes("physio") || chapKey.includes("circul") || chapKey.includes("heart")) {
      if (i === 1) { en = "Human heart is myogenic, 4-chambered, enclosed in double-walled pericardium. Normal resting heart rate is 72 beats/min."; }
      else if (i === 2) { en = "Cardiac Cycle duration is 0.8 seconds (Atrial systole 0.1s, Ventricular systole 0.3s, Joint diastole 0.4s). Stroke Volume = 70 mL. Cardiac Output = Stroke Vol × Heart Rate = 70 × 72 ≈ 5 Litres/min."; formula = "Cardiac Output = SV × HR = 5 L/min"; }
      else if (i === 3) { en = "Sinoatrial (SA) node is the natural 'Pacemaker' generating 70-75 action potentials per minute. Located in upper right corner of right atrium."; }
      else if (i === 4) { en = "ECG Waves: P-wave (Atrial depolarization), QRS complex (Ventricular depolarization), T-wave (Ventricular repolarization). Number of QRS complexes counts heart rate."; }
      else if (i === 5) { en = "Normal Blood Pressure: 120/80 mm Hg (120 = Systolic, 80 = Diastolic). Measured using Sphygmomanometer."; }
      else {
        en = `Human Physiology Point #${i}: Double circulation (Systemic & Pulmonary), Hepatic portal system, Rh incompatibility (Erythroblastosis foetalis prevented by anti-Rh antibodies/RhoGAM), nephron GFR = 125 mL/min (180 L/day).`;
      }
    } else {
      en = `${chapter} NEET/CET Revision Point #${i}: NCERT biology key concept, anatomical feature, physiological function, and examination trigger point.`;
    }

    points.push({
      id: i,
      point: en,
      category: cat,
      formula: formula,
      badge: i <= 25 ? "NCERT Core" : i <= 50 ? "Mechanisms & Pathways" : i <= 75 ? "Concepts & Trends" : "NEET PYQs & Exceptions"
    });
  }

  return points;
};
