import { ChapterPointItem } from "../../types";

export const getChemistry100Points = (noteId: string, chapter: string): ChapterPointItem[] => {
  const points: ChapterPointItem[] = [];
  const chapKey = chapter.toLowerCase();

  for (let i = 1; i <= 100; i++) {
    let cat: ChapterPointItem["category"] = "Concept";
    if (i % 5 === 0) cat = "Formula";
    else if (i % 4 === 0) cat = "PYQ_Trend";
    else if (i % 3 === 0) cat = "Shortcut";
    else if (i % 7 === 0) cat = "Exception";
    else if (i <= 10) cat = "Definition";

    let en = `Chemistry Exam Point #${i} for ${chapter}: Core chemical principle, IUPAC nomenclature, reaction mechanism, and numerical formula.`;
    let mr = `रसायनशास्त्र महत्त्वाचा मुद्दा #${i} (${chapter}): अभिक्रिया रचना, सूत्रे, आयनिक संकल्पना व अपवाद.`;
    let formula: string | undefined = undefined;

    if (chapKey.includes("bond") || chapKey.includes("structure")) {
      if (i === 1) { en = "Octet Rule: Atoms combine by gaining, losing or sharing valence electrons to attain 8 electrons (stable noble gas configuration)."; mr = "अष्टक नियम (Octet Rule): मूलद्रव्ये ८ इलेक्ट्रॉन्स प्राप्त करून स्थिर होण्यासाठी बंध तयार करतात."; }
      else if (i === 2) { en = "Formal Charge on atom in Lewis structure: FC = V - L - (1/2) S, where V = valence e⁻, L = lone pair e⁻, S = shared e⁻."; mr = "औपचारिक प्रभार (Formal Charge): FC = V - L - (1/2) S."; formula = "FC = V - L - S/2"; }
      else if (i === 3) { en = "Dipole Moment μ = q × d. Measured in Debye (D). 1 D = 3.33564 × 10⁻³⁰ C·m. Vector points from positive to negative center."; mr = "द्विध्रुव आघूर्ण (Dipole Moment): μ = q × d. एकक: Debye (D)."; formula = "μ = q × d"; }
      else if (i === 4) { en = "VSEPR Theory: Repulsion order: Lone Pair-Lone Pair (lp-lp) > Lone Pair-Bond Pair (lp-bp) > Bond Pair-Bond Pair (bp-bp)."; mr = "VSEPR सिद्धांत प्रतिकर्षण क्रम: एकाकी जोडी-एकाकी जोडी > एकाकी जोडी-बंध जोडी > बंध जोडी-बंध जोडी."; }
      else if (i === 5) { en = "Hybridization formula: Steric Number (SN) = (Valence e⁻ on central atom + Monovalent atoms - Cation charge + Anion charge) / 2."; mr = "संकरण (Hybridization) सूत्र: SN = (1/2) [ V + M - C + A ]."; formula = "SN = (V + M - C + A)/2"; }
      else if (i === 6) { en = "SN = 2: sp (Linear, 180°); SN = 3: sp² (Trigonal planar, 120°); SN = 4: sp³ (Tetrahedral, 109.5°); SN = 5: sp³d (TBP, 90°/120°); SN = 6: sp³d² (Octahedral, 90°)."; mr = "संकरण प्रकार: sp (१८०°), sp² (१२०°), sp³ (१०९.५°), sp³d (त्रिकोणी द्विशंकू), sp³d² (अष्टफलकीय)."; }
      else if (i === 7) { en = "Molecular Orbital Theory (MOT): Bond Order (BO) = (1/2) [ N_b - N_a ]. If BO > 0, molecule is stable."; mr = "आण्विक कक्षक सिद्धांत (MOT): बंध क्रम (Bond Order) = (1/2) [ N_b - N_a ]."; formula = "BO = (N_b - N_a)/2"; }
      else if (i === 8) { en = "Paramagnetism vs Diamagnetism in MOT: Species with unpaired electrons are Paramagnetic (e.g. O₂ has 2 unpaired e⁻ in π*2p), species with paired electrons are Diamagnetic (e.g. N₂)."; mr = "अयुग्मित (unpaired) इलेक्ट्रॉन्स असल्यास अनुचुंबकीय (Paramagnetic, उदा. O₂); सर्व युग्मित असल्यास प्रतिचुंबकीय (Diamagnetic, उदा. N₂)."; }
      else if (i === 9) { en = "Hydrogen Bonding: Strongest with highly electronegative small atoms (F, O, N). Intermolecular H-bonding increases boiling point and solubility in water."; mr = "हायड्रोजन बंध (H-Bonding): F, O, N सोबत तयार होतो; यामुळे उत्कलन बिंदू वाढतो."; }
      else if (i === 10) { en = "Fajan's Rules: Covalent character increases with: Small cation size, Large anion size, High charge on cation/anion, Pseudo-noble gas configuration of cation.", mr = "फाजानचे नियम: लहान धनायन, मोठा ऋणायन आणि जास्त प्रभार असल्यास सहसंयुज (Covalent) गुणधर्म वाढतात.", formula = "Polarizing Power ∝ Charge/Radius" }
      else {
        en = `Chemical Bonding Point #${i}: Resonance energy, percentage ionic character (Pauling equation % ionic = 16|Δχ| + 3.5(Δχ)²), bond angles comparison (NH₃ 107°, H₂O 104.5° due to lone pair repulsion).`;
        mr = `रासायनिक बंध मुद्दा #${i}: अनुनाद ऊर्जा (Resonance Energy), आयनिक टक्केवारी, बंध कोन तुलना व MOT ऊर्जा क्रम.`;
      }
    } else if (chapKey.includes("solution")) {
      if (i === 1) { en = "Raoult's Law for volatile solutes: P_total = P_A° X_A + P_B° X_B."; mr = "राउल्टचा नियम: P_total = P_A° X_A + P_B° X_B."; formula = "P_A = P_A° X_A"; }
      else if (i === 2) { en = "Relative Lowering of Vapor Pressure (RLVP): (P° - P) / P° = X_solute = n₂ / (n₁ + n₂) ≈ n₂ / n₁ (for dilute solutions)."; mr = "बाष्पदाबातील सापेक्ष घट: (P° - P) / P° = X_solute."; formula = "(P° - P)/P° = n₂/n₁"; }
      else if (i === 3) { en = "Elevation in Boiling Point: ΔT_b = i · K_b · m (where K_b is Ebullioscopic constant and m is molality)."; mr = "उत्कलन बिंदूतील वाढ: ΔT_b = i · K_b · m."; formula = "ΔT_b = i K_b m"; }
      else if (i === 4) { en = "Depression in Freezing Point: ΔT_f = i · K_f · m (where K_f is Cryoscopic constant)."; mr = "गोठण बिंदूतील घट: ΔT_f = i · K_f · m."; formula = "ΔT_f = i K_f m"; }
      else if (i === 5) { en = "Osmotic Pressure: π = i C R T = i (n / V) R T."; mr = "अभिसरण दाब (Osmotic Pressure): π = i C R T."; formula = "π = iCRT"; }
      else if (i === 6) { en = "Van't Hoff Factor i: i = 1 + (n - 1) α for dissociation; i = 1 + (1/n - 1) α for association."; mr = "व्हॅन्ट हॉफ फॅक्टर i: विघटनासाठी i = 1 + (n - 1) α; संयोगासाठी i = 1 + (1/n - 1) α."; formula = "i = 1 + (n-1)α"; }
      else if (i === 7) { en = "Ideal Solution conditions: ΔH_mix = 0, ΔV_mix = 0, obeys Raoult's Law at all concentrations (e.g. Benzene + Toluene, n-Hexane + n-Heptane)."; mr = "आदर्श द्रावण (Ideal Solution): ΔH_mix = ०, ΔV_mix = ०, राउल्ट नियमाचे पूर्ण पालन."; }
      else if (i === 8) { en = "Positive Deviation from Raoult's Law: P_obs > P_calc, ΔH_mix > 0 (endothermic), ΔV_mix > 0 (e.g. Ethanol + Acetone, CS₂ + Acetone). Forms minimum boiling azeotrope."; mr = "राउल्ट नियमापासून धनात्मक विचलन: P_obs > P_calc, ΔH > ०. किमान उत्कलन अझिओट्रोप बनवतो."; }
      else if (i === 9) { en = "Negative Deviation: P_obs < P_calc, ΔH_mix < 0 (exothermic), ΔV_mix < 0 (e.g. Chloroform + Acetone, HNO₃ + Water). Forms maximum boiling azeotrope."; mr = "ऋणात्मक विचलन: क्लोरोफॉर्म + ॲसिटोन, कमाल उत्कलन अझिओट्रोप."; }
      else if (i === 10) { en = "Henry's Law for gas solubility: P = K_H · x. Higher K_H means lower solubility of gas in liquid.", mr = "हेन्रीचा वायू विद्राव्यता नियम: P = K_H · x. K_H जास्त असल्यास विद्राव्यता कमी असते.", formula = "P = K_H x" }
      else {
        en = `Solutions Point #${i}: Molarity (M = moles/L), Molality (m = moles/kg solvent, temp-independent), Mole Fraction, and reverse osmosis applications.`;
        mr = `द्रावण व सहसंलग्न गुणधर्म मुद्दा #${i}: मोलारिटी, मोलालिटी (तापमानावर अवलंबून नाही), नॉर्मॅलिटी आणि रिव्हर्स ऑस्मोसिस (RO) चे नियम.`;
      }
    } else if (chapKey.includes("organic") || chapKey.includes("aldehyde") || chapKey.includes("halo")) {
      if (i === 1) { en = "Aldol Condensation: Requires aldehydes/ketones having at least one α-hydrogen in presence of dilute base (NaOH/Ba(OH)₂)."; mr = "अल्डॉल संघनन: किमान एक α-हायड्रोजन असणाऱ्या अल्डीहाइड्समध्ये मंद अल्कलीच्या (NaOH) उपस्थितीत होते."; }
      else if (i === 2) { en = "Cannizzaro Reaction: Self oxidation-reduction of aldehydes with NO α-hydrogen (e.g. HCHO, C₆H₅CHO) in concentrated 50% KOH."; mr = "कॅनिझारो अभिक्रिया: α-हायड्रोजन नसलेल्या अल्डीहाइड्सची ५०% KOH सोबत स्वयं-ऑक्सिडेशन व रिडक्शन अभिक्रिया."; }
      else if (i === 3) { en = "Clemmensen Reduction: Carbonyl group (>C=O) is reduced to CH₂ using Zn-Hg / conc. HCl."; mr = "क्लेमेन्सन रिडक्शन: >C=O चे रूपांतर >CH₂ मध्ये होते (Zn-Hg / conc. HCl)."; formula = ">C=O -> >CH₂" }
      else if (i === 4) { en = "Wolff-Kishner Reduction: Carbonyl reduced to CH₂ using Hydrazine (NH₂NH₂) followed by heating with KOH in ethylene glycol."; mr = "वुल्फ-किश्नर रिडक्शन: हायड्राझिन आणि KOH/ग्लायकॉलच्या साहाय्याने >C=O चे >CH₂ मध्ये रूपांतर."; }
      else if (i === 5) { en = "Tollens' Test (Silver Mirror): Aldehydes reduce Tollens' reagent [Ag(NH₃)₂]⁺ to metallic Ag mirror. Ketones do not respond (except α-hydroxy ketones)."; mr = "टॉलेन्स चाचणी: अल्डीहाइड्स सिल्व्हर मिरर (Ag) देतात; केटोन्स ही चाचणी देत नाहीत."; }
      else if (i === 6) { en = "Fehling's Test: Aliphatic aldehydes reduce Fehling's solution (Cu²⁺) to red precipitate of Cu₂O. Aromatic aldehydes (Benzaldehyde) DO NOT give Fehling's test."; mr = "फेलिंग चाचणी: अलिफॅटिक अल्डीहाइड्स लाल Cu₂O देतात; बेंझाल्डीहाइड फेलिंग चाचणी देत नाही."; }
      else if (i === 7) { en = "Haloform / Iodoform Test: Compounds with CH₃-C=O or CH₃-CH(OH)- group react with I₂/NaOH to give yellow precipitate of CHI₃ (Iodoform)."; mr = "आयोडोफॉर्म चाचणी: CH₃-C=O किंवा CH₃-CH(OH)- गट असणारे पदार्थ पिवळा CHI₃ चा साका देतात."; }
      else if (i === 8) { en = "Carboxylic Acid Acidity: Electron withdrawing groups (-I, -M like -NO₂, -CN, -Cl) increase acidity; Electron donating (+I, +M like -CH₃, -OCH₃) decrease acidity."; mr = "कार्बोक्झिलिक आम्ल तीव्रता: इलेक्ट्रॉन खेचणारे गट (-NO₂, -Cl) आम्लधर्मीयता वाढवतात."; }
      else if (i === 9) { en = "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acids having α-hydrogen react with Br₂/Red P to give α-bromo carboxylic acids."; mr = "HVZ अभिक्रिया: α-हायड्रोजन असणारे आम्ल Br₂/Red P सोबत α-ब्रोमो आम्ल देतात."; }
      else if (i === 10) { en = "Esterification: RCOOH + R'OH in presence of conc. H₂SO₄ gives fruity smelling ester (RCOOR'). Reversible nucleophilic acyl substitution.", mr = "एस्टरिफिकेशन: आम्ल + अल्कोहोल conc. H₂SO₄ च्या सानिध्यात सुगंधी एस्टर (RCOOR') देतात.", formula = "RCOOH + R'OH ⇌ RCOOR' + H₂O" }
      else {
        en = `Organic Chemistry Point #${i}: Reaction conditions for Grignard reagent (RMgX), Friedel-Crafts acylation, nucleophilic addition mechanism, and acidity orders.`;
        mr = `सेंद्रिय रसायनशास्त्र मुद्दा #${i}: ग्रिग्नार्ड अभिकर्मक, न्यूक्लियोफिलिक ॲडिशन क्रम, इलेक्ट्रोफिलिक ॲरोमॅटिक प्रतिस्थापन व रिअॅक्शन चार्ट्स.`;
      }
    } else if (chapKey.includes("kinetics") || chapKey.includes("electrochem")) {
      if (i === 1) { en = "Nernst Equation: E_cell = E°_cell - (0.0591 / n) log₁₀ Q at 298 K."; mr = "नर्न्स्ट समीकरण: E_cell = E°_cell - (0.0591 / n) log₁₀ Q (२९८ K तापमानावर)."; formula = "E = E° - (0.0591/n)log Q"; }
      else if (i === 2) { en = "Standard Gibbs Free Energy and EMF relation: ΔG° = -n F E°_cell. For spontaneous reaction, E°_cell > 0 and ΔG° < 0."; mr = "गिब्स ऊर्जा व व्होल्टेज संबंध: ΔG° = -n F E°_cell. स्वयंस्फूर्त प्रक्रियेसाठी E° धन व ΔG° ऋण असावे."; formula = "ΔG° = -nFE°"; }
      else if (i === 3) { en = "Kohlrausch's Law of Independent Migration of Ions: Λ°_m = ν₊ λ°₊ + ν₋ λ°₋."; mr = "कोहलरॉशचा नियम: अनंत सौम्यतेवर मोलार संवाहकता ही वैयक्तिक आयनांच्या संवाहकतेची बेरीज असते."; formula = "Λ°_m = ν₊λ°₊ + ν₋λ°₋"; }
      else if (i === 4) { en = "Faraday's First Law of Electrolysis: Mass deposited m = Z I t = (M / n F) I t."; mr = "फॅराडेचा पहिला नियम: इलेक्ट्रोडवर जमा झालेले वस्तुमान m = Z I t = (M/nF) I t."; formula = "m = ZIt"; }
      else if (i === 5) { en = "Integrated Rate Law for First Order Reaction: k = (2.303 / t) log₁₀ (a / (a - x)) = (2.303 / t) log₁₀ ([A]₀ / [A])."; mr = "पहिल्या श्रेणीच्या अभिक्रियेचा दर स्थिरांक: k = (2.303 / t) log₁₀ ([A]₀ / [A])."; formula = "k = (2.303/t)log([A]₀/[A])"; }
      else if (i === 6) { en = "Half-life of First Order Reaction: t_{1/2} = 0.693 / k. Independent of initial concentration [A]₀."; mr = "पहिल्या श्रेणीच्या अभिक्रियेचे अर्धायुष्य: t_{1/2} = 0.693 / k. सुरुवातीच्या प्रमाणावर अवलंबून नसते."; formula = "t_{1/2} = 0.693/k"; }
      else if (i === 7) { en = "Half-life of Zero Order Reaction: t_{1/2} = [A]₀ / (2 k). Directly proportional to initial concentration."; mr = "शून्य श्रेणीच्या अभिक्रियेचे अर्धायुष्य: t_{1/2} = [A]₀ / (2k). सुरुवातीच्या प्रमाणाशी समप्रमाणात असते."; formula = "t_{1/2} = [A]₀/(2k)"; }
      else if (i === 8) { en = "Arrhenius Equation for Temperature Dependence of Rate: k = A e^(-E_a / R T) => log₁₀(k₂ / k₁) = (E_a / 2.303 R) [ (1 / T₁) - (1 / T₂) ]."; mr = "अरेनिअस समीकरण: log₁₀(k₂/k₁) = (E_a / 2.303 R) [ 1/T₁ - 1/T₂ ]."; formula = "k = A e^(-E_a/RT)"; }
      else {
        en = `Electrochemistry & Kinetics Point #${i}: Catalyst lowers activation energy E_a without altering ΔG or equilibrium constant K_eq, units of rate constant k = (mol/L)^(1-n) s⁻¹.`;
        mr = `विद्युत रसायन व रासायनिक गतीशास्त्र मुद्दा #${i}: उत्प्रेरक (Catalyst) फक्त सक्रियीकरण ऊर्जा (E_a) कमी करतो, साम्यावस्था स्थिरांक बदलत नाही.`;
      }
    } else {
      en = `${chapter} Chemistry Revision Point #${i}: Core inorganic/organic trend, reaction yield, electronic configuration, and NCERT highlight.`;
      mr = `${chapter} रासायनिक संकल्पना मुद्दा #${i}: अचूक रासायनिक समीकरण, संयुगांचे गुणधर्म, आवर्त सारणीतील ट्रेंड्स व अपवाद.`;
    }

    points.push({
      id: i,
      point: en,
      pointMr: mr,
      category: cat,
      formula: formula,
      badge: i <= 25 ? "Core Principles" : i <= 50 ? "Formulas & Equations" : i <= 75 ? "Reaction Trends" : "PYQs & Exceptions",
    });
  }

  return points;
};
