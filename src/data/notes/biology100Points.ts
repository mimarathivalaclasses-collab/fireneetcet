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
    let mr = `जीवशास्त्र महत्त्वाचा मुद्दा #${i} (${chapter}): NCERT तथ्य, आकृत्यांचे संदर्भ, शास्त्रज्ञांचे योगदान आणि NEET ट्रेंड्स.`;
    let formula: string | undefined = undefined;

    if (chapKey.includes("genetic") || chapKey.includes("inheritance") || chapKey.includes("mendel")) {
      if (i === 1) { en = "Gregor Johann Mendel conducted hybridization experiments on garden pea (Pisum sativum) for 7 years (1856-1863)."; mr = "ग्रेगर जोहान मेंडेल यांनी वाटाण्याच्या (Pisum sativum) झाडावर ७ वर्षे (१८५६-१८६३) संकर प्रयोग केले."; }
      else if (i === 2) { en = "Mendel studied 7 pairs of contrasting traits: Stem height, Flower color, Flower position, Pod shape, Pod color, Seed shape, Seed color."; mr = "मेंडेलने वाटाण्याच्या ७ परस्परविरोधी लक्षणांचा (Contrasting traits) अभ्यास केला."; }
      else if (i === 3) { en = "Monohybrid Cross F2 phenotypic ratio: 3:1 (Dominant:Recessive); Genotypic ratio: 1:2:1 (TT : Tt : tt)."; mr = "मोनोहायब्रिड संकर F2 दृश्य गुणोत्तर (Phenotype): ३:१; जनुकीय गुणोत्तर (Genotype): १:२:१."; formula = "Phenotypic: 3:1 | Genotypic: 1:2:1"; }
      else if (i === 4) { en = "Dihybrid Cross F2 phenotypic ratio: 9:3:3:1 (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green)."; mr = "डायहायब्रिड संकर F2 दृश्य गुणोत्तर: ९:३:३:१."; formula = "9:3:3:1"; }
      else if (i === 5) { en = "Test Cross: Crossing an individual with unknown dominant genotype (e.g. T_) with homozygous recessive parent (tt). Ratio in monohybrid test cross = 1:1; Dihybrid test cross = 1:1:1:1."; mr = "टेस्ट क्रॉस (Test Cross): अज्ञात प्रभावी जनुकाचा संकर अप्रभावी जनकासोबत (tt) करणे. गुणोत्तर = १:१ (मोनोहायब्रिड) व १:१:१:१ (डायहायब्रिड)."; formula = "Test cross ratio = 1:1"; }
      else if (i === 6) { en = "Incomplete Dominance: F1 phenotype is intermediate between two parents. Example: Mirabilis jalapa (4 o'clock plant) and Antirrhinum majus (Snapdragon). F2 phenotypic & genotypic ratio are identical: 1:2:1 (Red : Pink : White)."; mr = "अपूर्ण प्रभाविता (Incomplete Dominance): स्नॅपड्रॅगनमध्ये F2 गुणोत्तर १:२:१ (लाल : गुलाबी : पांढरा). Phenotype व Genotype गुणोत्तर समान."; formula = "1:2:1"; }
      else if (i === 7) { en = "Codominance: Both alleles express equally in heterozygote. Example: ABO blood groups in humans (I^A and I^B are codominant over i). Controlled by gene 'I' located on chromosome 9 with 3 alleles: I^A, I^B, i giving 6 genotypes and 4 phenotypes."; mr = "सहप्रभाविता (Codominance): मानवी ABO रक्तगट (I^A, I^B, i). ६ जनुकीय प्रकार (Genotypes) आणि ४ रक्तगट (Phenotypes)."; }
      else if (i === 8) { en = "Pleiotropy: A single gene influences multiple phenotypic traits. Example: Phenylketonuria (PKU), Sickle-cell anemia."; mr = "प्लियोट्रॉपी (Pleiotropy): एकच जनुक एकापेक्षा जास्त दृश्य लक्षणांवर नियंत्रण ठेवतो (उदा. Phenylketonuria)."; }
      else if (i === 9) { en = "Chromosomal Theory of Inheritance was proposed by Walter Sutton and Theodore Boveri (1902). Experimental verification by T.H. Morgan using Drosophila melanogaster (Fruit fly)."; mr = "गुणसूत्रीय अनुवांशिकता सिद्धांत सटन व बोव्हेरी यांनी मांडला; मॉर्गन यांनी ड्रोसोफिलावर (Drosophila) प्रयोगाद्वारे सिद्ध केला."; }
      else if (i === 10) { en = "T.H. Morgan is known as the 'Father of Experimental Genetics'. Discovered Linkage and Recombination.", mr = "टी. एच. मॉर्गन यांना प्रायोगिक जनुकशास्त्राचे जनक मानले जाते; त्यांनी लिंकेज व रिकॉम्बिनेशनचा शोध लावला." }
      else {
        en = `Genetics Point #${i}: Sex determination in humans (XX-XY), birds (ZW-ZZ female heterogamety), grasshopper (XO type), Turner syndrome (45, X0), Klinefelter syndrome (47, XXY), Down syndrome (Trisomy 21).`;
        mr = `जनुकशास्त्र मुद्दा #${i}: मानवी लिंग निश्चिती, पक्ष्यांमधील ZW-ZZ पद्धत, डाऊन सिंड्रोम (Trisomy 21), टर्नर सिंड्रोम (45, X0) व क्लाइनफेल्टर सिंड्रोम (47, XXY).`;
      }
    } else if (chapKey.includes("molecular") || chapKey.includes("dna") || chapKey.includes("rna")) {
      if (i === 1) { en = "DNA Double Helix structure was proposed by James Watson and Francis Crick (1953) based on X-ray diffraction data of Rosalind Franklin and Maurice Wilkins."; mr = "DNA ची दुहेरी सर्पिलाकार रचना वॉटसन व क्रिक यांनी १९५३ मध्ये रोझालींड फ्रँकलिनच्या क्ष-किरण विवर्तन डेटावर आधारित मांडली."; }
      else if (i === 2) { en = "Chargaff's Rule: In double-stranded DNA, [A] = [T] and [G] = [C] => [A + G] = [T + C] (Purines = Pyrimidines). (A + T) / (G + C) is constant for a given species."; mr = "चारगॉफचा नियम: दुहेरी DNA मध्ये A = T आणि G = C असते. प्युरीन्स = पिरिमिडिन्स."; formula = "A + G = T + C"; }
      else if (i === 3) { en = "Dimensions of B-DNA: Pitch = 3.4 nm (34 Å), Distance between two base pairs = 0.34 nm (3.4 Å), 10 base pairs per helical turn."; mr = "B-DNA परिमाणे: एका आवर्तनाची लांबी = ३.४ nm, दोन बेस जोड्यांमधील अंतर = ०.३४ nm, प्रति फेऱ्यात १० बेस जोड्या."; }
      else if (i === 4) { en = "Nucleosome consists of 200 bp of DNA wrapped around an octamer of basic histone proteins (2 copies of H2A, H2B, H3, H4). H1 histone seals the entry/exit."; mr = "न्यूक्लिओसोममध्ये हिस्टोन अष्टकाभोवती (H2A, H2B, H3, H4) २०० बेस जोड्यांचा DNA गुंडाळलेला असतो."; }
      else if (i === 5) { en = "Transforming Principle experiment by Frederick Griffith (1928) using Streptococcus pneumoniae (mice experiment): Heat-killed S-strain converted live R-strain into virulent S-strain."; mr = "ग्रिफिथचा ट्रान्सफॉर्मिंग प्रयोग (१९२८): उष्णतेने मारलेल्या S-स्ट्रेनने जिवंत R-स्ट्रेनला प्राणघातक S-स्ट्रेनमध्ये बदलले."; }
      else if (i === 6) { en = "Biochemical characterization of Transforming Principle: Oswald Avery, Colin MacLeod, Maclyn McCarty (1944) proved that DNA is the transforming genetic material."; mr = "एव्हरी, मॅक्लिओड आणि मॅककार्ती यांनी सिद्ध केले की DNA हाच ट्रान्सफॉर्मिंग घटक आहे."; }
      else if (i === 7) { en = "Unequivocal proof that DNA is the genetic material: Alfred Hershey and Martha Chase (1952) using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat)."; mr = "हर्शी व चेस प्रयोग (१९५२): बॅक्टेरियोफेज व ³²P (DNA) द्वारे DNA हेच जनुकीय द्रव्य असल्याचे निर्विवाद सिद्ध केले."; }
      else if (i === 8) { en = "Semiconservative replication of DNA was experimentally proved by Matthew Meselson and Franklin Stahl (1958) using heavy isotope ¹⁵N in E. coli."; mr = "मेसेलसन व स्टाल प्रयोग (१९५८): ¹⁵N जड नायट्रोजन आयसोटोप वापरून DNA चे सेमी-कन्झर्व्हेटिव्ह रेप्लिकेशन सिद्ध केले."; }
      else if (i === 9) { en = "Central Dogma of Molecular Biology: DNA --(Transcription)--> mRNA --(Translation)--> Protein. Proposed by Francis Crick."; mr = "सेंट्रल डोग्मा: DNA -> mRNA -> प्रथिने (Protein). फ्रान्सिस क्रिक यांनी मांडले."; formula = "DNA -> mRNA -> Protein"; }
      else if (i === 10) { en = "Genetic Code is universal, degenerate, non-overlapping, triplet (64 codons: 61 sense codons + 3 stop codons UAA, UAG, UGA). AUG is dual function: Initiator codon and codes for Methionine.", mr = "जनुकीय कोड (Genetic Code): ६४ कोडॉन्स (६१ अर्थपूर्ण + ३ स्टॉप कोडॉन्स UAA, UAG, UGA). AUG हा प्रारंभ कोडॉन आहे व तो मिथियोनाइनसाठी कोड करतो." }
      else {
        en = `Molecular Biology Point #${i}: Lac Operon components (i-gene, promoter, operator, structural genes z-β galactosidase, y-permease, a-transacetylase), inducible system with allolactose.`;
        mr = `आण्विक जीवशास्त्र मुद्दा #${i}: लॅक ऑपेरॉन (Lac Operon) रचना, इन्ड्यूसर लॅक्टोज, DNA पॉलिमरेज III आणि पोस्ट-ट्रान्सक्रिप्शनल स्प्लायसिंग (Splicing, Capping, Tailing).`;
      }
    } else if (chapKey.includes("physio") || chapKey.includes("circul") || chapKey.includes("heart")) {
      if (i === 1) { en = "Human heart is myogenic, 4-chambered, enclosed in double-walled pericardium. Normal resting heart rate is 72 beats/min."; mr = "मानवी हृदय मायोजेनिक (Myogenic), ४ कप्प्यांचे व पेरीकार्डियमने वेढलेले असते. हृदयाचे ठोके: ७२/मिनिट."; }
      else if (i === 2) { en = "Cardiac Cycle duration is 0.8 seconds (Atrial systole 0.1s, Ventricular systole 0.3s, Joint diastole 0.4s). Stroke Volume = 70 mL. Cardiac Output = Stroke Vol × Heart Rate = 70 × 72 ≈ 5 Litres/min."; mr = "हृदय चक्राचा कालावधी ०.८ सेकंद. स्ट्रोक व्हॉल्यूम = ७० mL. एकूण कार्डियाक आउटपुट ≈ ५ लिटर/मिनिट."; formula = "Cardiac Output = SV × HR = 5 L/min"; }
      else if (i === 3) { en = "Sinoatrial (SA) node is the natural 'Pacemaker' generating 70-75 action potentials per minute. Located in upper right corner of right atrium."; mr = "SA नोड हा हृदयाचा पेसमेकर (Pacemaker) असून प्रति मिनिट ७०-७५ ॲक्शन पोटेन्शिअल निर्माण करतो."; }
      else if (i === 4) { en = "ECG Waves: P-wave (Atrial depolarization), QRS complex (Ventricular depolarization), T-wave (Ventricular repolarization). Number of QRS complexes counts heart rate."; mr = "ECG तरंगांचे अर्थ: P-वेव्ह (अलिंद आकुंचन), QRS कॉम्प्लेक्स (निलय आकुंचन), T-वेव्ह (निलय शिथिलीकरण)."; }
      else if (i === 5) { en = "Normal Blood Pressure: 120/80 mm Hg (120 = Systolic, 80 = Diastolic). Measured using Sphygmomanometer."; mr = "सामान्य रक्तदाब: १२०/८० mm Hg (१२० = सिस्टोलिक, ८० = डायस्टोलिक)."; }
      else {
        en = `Human Physiology Point #${i}: Double circulation (Systemic & Pulmonary), Hepatic portal system, Rh incompatibility (Erythroblastosis foetalis prevented by anti-Rh antibodies/RhoGAM), nephron GFR = 125 mL/min (180 L/day).`;
        mr = `मानवी शरीरक्रियाशास्त्र मुद्दा #${i}: दुहेरी रक्तभिसरण, Rh विसंगती (Erythroblastosis fetalis), नेफ्रॉनमधील गाळण दर (GFR = १२५ mL/min) व काउंटर-करंट यंत्रणा.`;
      }
    } else {
      en = `${chapter} NEET/CET Revision Point #${i}: NCERT biology key concept, anatomical feature, physiological function, and examination trigger point.`;
      mr = `${chapter} जीवशास्त्र महत्त्वाचा मुद्दा #${i}: NCERT आधारित संकल्पना, पेशी रचना, शरीरक्रियाशास्त्र व परीक्षेसाठी हाय-यील्ड पॉईंट.`;
    }

    points.push({
      id: i,
      point: en,
      pointMr: mr,
      category: cat,
      formula: formula,
      badge: i <= 25 ? "NCERT Core" : i <= 50 ? "Mechanisms & Pathways" : i <= 75 ? "Concepts & Trends" : "NEET PYQs & Exceptions",
    });
  }

  return points;
};
