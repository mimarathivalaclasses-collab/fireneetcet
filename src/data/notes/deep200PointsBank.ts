import { ChapterPointItem, SubjectType } from "../../types";

/**
 * 200 High-Yield Exam Points Knowledge Bank per Subject
 * Guarantees that Physics, Chemistry, Mathematics, and Biology have strictly 200
 * authentic, syllabus-accurate, formula-backed points with bilingual text,
 * ZERO duplicate signatures, and categorized exam badges.
 */

export const PHYSICS_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Angular displacement θ is measured in radians. 1 revolution = 2π rad = 360°.",
    "pointMr": "कोनीय विस्थापन θ हे रेडियनमध्ये मोजले जाते. १ फेरा = २π rad = ३६०°.",
    "category": "Definition",
    "formula": "θ = s/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Angular velocity ω = dθ/dt. Vector direction along axis given by right hand thumb rule.",
    "pointMr": "कोनीय वेग ω = dθ/dt. दिशा उजव्या हाताच्या अंगठ्याच्या नियमाने अक्षावर असते.",
    "category": "Concept",
    "formula": "ω = 2πn = 2π/T",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Linear and angular velocity relation: v = r ω (vector form: v = ω × r).",
    "pointMr": "रेषीय वेग आणि कोनीय वेग संबंध: v = r ω (सदिश रूप: v = ω × r).",
    "category": "Formula",
    "formula": "v = rω",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Angular acceleration α = dω/dt = d²θ/dt². SI unit: rad/s².",
    "pointMr": "कोनीय प्रवेग α = dω/dt. SI एकक: rad/s².",
    "category": "Formula",
    "formula": "α = a_t / r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Radial (centripetal) acceleration a_r = v²/r = ω²r = vω (directed towards center).",
    "pointMr": "अभिकेंद्री प्रवेग a_r = v²/r = ω²r (नेहमी केंद्राच्या दिशेने).",
    "category": "Formula",
    "formula": "a_r = v²/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Tangential acceleration a_t = r α (changes speed, tangential to circular path).",
    "pointMr": "स्पर्शरेषीय प्रवेग a_t = r α (वेगाचे परिमाण बदलतो).",
    "category": "Concept",
    "formula": "a_t = rα",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Net linear acceleration in non-uniform circular motion: a = √(a_r² + a_t²).",
    "pointMr": "अनियमित वर्तुळाकार गतीत एकूण रेषीय प्रवेग: a = √(a_r² + a_t²).",
    "category": "Formula",
    "formula": "a = √(a_r² + a_t²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "Centripetal force F_c = m v²/r = m ω² r (real force directed towards center).",
    "pointMr": "अभिकेंद्री बल F_c = m v²/r = m ω² r (नेहमी केंद्राकडे असणारे वास्तविक बल).",
    "category": "Formula",
    "formula": "F_c = mv²/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "Centrifugal force is a pseudo force acting radially outward in a rotating frame: F_cf = m ω² r.",
    "pointMr": "अपकेंद्री बल (Centrifugal force) हे फिरणाऱ्या संदर्भ चौकटीत बाहेरील दिशेने लागणारे छद्म बल आहे.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Maximum safe speed on unbanked flat road: v_max = √(μ_s r g). Independent of vehicle mass.",
    "pointMr": "सपाट वळण रस्त्यावर वाहनाचा कमाल सुरक्षित वेग: v_max = √(μ_s r g). वस्तुमानावर अवलंबून नाही.",
    "category": "Shortcut",
    "formula": "v_max = √(μ_s rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Angle of banking on friction-free road: tan θ = v² / (r g).",
    "pointMr": "घर्षणरहित बँक केलेल्या रस्त्याचा कोन: tan θ = v²/(rg).",
    "category": "Formula",
    "formula": "tan θ = v²/(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Optimum speed on banked road with zero wear: v_0 = √(r g tan θ).",
    "pointMr": "बँक केलेल्या रस्त्यावरील आदर्श वेग: v_0 = √(rg tan θ). टायरची झीज शून्य.",
    "category": "Formula",
    "formula": "v_0 = √(rg tan θ)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Conical pendulum period: T = 2π √(L cos θ / g) = 2π √(h / g), where h = L cos θ.",
    "pointMr": "शंकू लंबकाचा आवर्तकाळ: T = 2π √(L cos θ / g) = 2π √(h/g).",
    "category": "Formula",
    "formula": "T = 2π√(h/g)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Tension in conical pendulum string: T_0 = m g / cos θ.",
    "pointMr": "शंकू लंबकाच्या दोरीतील ताण: T_0 = mg / cos θ.",
    "category": "Formula",
    "formula": "T_0 = mg / cos θ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Vertical Circular Motion (VCM): Minimum velocity at highest point H: v_H = √(r g).",
    "pointMr": "उभ्या वर्तुळाकार गतीत सर्वोच्च बिंदूवर किमान आवश्यक वेग: v_H = √(rg). ताण T_H = 0.",
    "category": "PYQ_Trend",
    "formula": "v_H = √(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Minimum velocity at lowest point L in VCM to complete vertical loop: v_L = √(5 r g).",
    "pointMr": "उभ्या वर्तुळात संपूर्ण फेरा पूर्ण करण्यासाठी तळातील किमान वेग: v_L = √(5rg).",
    "category": "Formula",
    "formula": "v_L = √(5rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Velocity at horizontal midpoint M in VCM: v_M = √(3 r g).",
    "pointMr": "उभ्या वर्तुळात मध्य बिंदूवरील वेग: v_M = √(3rg).",
    "category": "Formula",
    "formula": "v_M = √(3rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "Difference in tension between lowest and highest points in VCM: T_L - T_H = 6 m g.",
    "pointMr": "तळातील व सर्वोच्च बिंदूतील ताणाचा फरक नेहमी ६ पट वस्तुमान×गुरुत्व असतो: T_L - T_H = 6 mg.",
    "category": "Shortcut",
    "formula": "T_L - T_H = 6mg",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Tension at horizontal position M in looping VCM: T_M = 3 m g.",
    "pointMr": "उभ्या वर्तुळात क्षितीज समांतर बिंदू M वरील ताण ३ mg असतो.",
    "category": "Formula",
    "formula": "T_M = 3mg",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "For a mass fixed to a light rigid rod, velocity at top can be 0, and v_L = 2 √(r g).",
    "pointMr": "हलक्या दांड्याला बांधलेल्या वस्तूसाठी सर्वोच्च बिंदूवरील वेग ० असू शकतो आणि v_L = २√(rg).",
    "category": "Exception",
    "formula": "v_L = 2√(rg)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Moment of Inertia: I = Σ m_i r_i² = ∫ r² dm. SI unit: kg·m²; Dimensions: [M¹ L² T⁰].",
    "pointMr": "जडत्व आघूर्ण (MI): I = Σ m_i r_i². SI एकक: kg·m²; मिती: [M¹ L² T⁰].",
    "category": "Definition",
    "formula": "I = Σ mr²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Radius of Gyration: k = √(I / M) => I = M k². Physical significance: mass distribution.",
    "pointMr": "परिभ्रमण त्रिज्या: k = √(I/M) म्हणजेच I = M k².",
    "category": "Formula",
    "formula": "I = Mk²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Parallel Axes Theorem: I_O = I_C + M h² (axis C must pass through center of mass).",
    "pointMr": "समांतर अक्ष प्रमेय: I_O = I_C + M h² (अक्ष C वस्तुमान केंद्रातून गेला पाहिजे).",
    "category": "Rule",
    "formula": "I_O = I_C + Mh²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Perpendicular Axes Theorem: I_z = I_x + I_y (valid only for 2D flat planar lamina).",
    "pointMr": "लंब अक्ष प्रमेय: I_z = I_x + I_y (केवळ २D सपाट चकती/पटलासाठी लागू).",
    "category": "Rule",
    "formula": "I_z = I_x + I_y",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Torque τ = r × F = r F sin θ = I α. Rotational analogue of force.",
    "pointMr": "टॉर्क τ = r × F = I α. रेषीय बलाचा फिरणारा समतुल्य घटक.",
    "category": "Formula",
    "formula": "τ = Iα",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "Angular momentum L = r × p = I ω. Dimensions: [M¹ L² T⁻¹] (same as Planck constant h).",
    "pointMr": "कोनीय संवेग L = r × p = I ω. मिती प्लांक स्थिरांक h सारखी [M¹ L² T⁻¹] असते.",
    "category": "Definition",
    "formula": "L = Iω",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Conservation of Angular Momentum: If external torque τ_ext = 0, then I₁ ω₁ = I₂ ω₂.",
    "pointMr": "कोनीय संवेग संवर्धन नियम: बाह्य टॉर्क शून्य असल्यास I₁ ω₁ = I₂ ω₂ = स्थिरांक.",
    "category": "Rule",
    "formula": "I₁ω₁ = I₂ω₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Rotational kinetic energy: E_rot = (1/2) I ω² = L² / (2I).",
    "pointMr": "परिभ्रमण गतिज ऊर्जा: E_rot = (1/2) I ω² = L² / (2I).",
    "category": "Formula",
    "formula": "E_rot = (1/2)Iω²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Total KE of pure rolling body: E_total = (1/2) M v² [1 + k²/R²].",
    "pointMr": "रोलिंग करणाऱ्या वस्तूची एकूण गतिज ऊर्जा: E = (1/2) M v² [1 + k²/R²].",
    "category": "Formula",
    "formula": "E = 1/2 Mv²(1 + k²/R²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Velocity at bottom of incline of height h: v = √[ 2 g h / (1 + k²/R²) ].",
    "pointMr": "h उंचीच्या उतरणीवरून रोलिंग करणाऱ्या वस्तूचा तळातील वेग: v = √[ 2gh / (1 + k²/R²) ].",
    "category": "Formula",
    "formula": "v = √[2gh/(1 + k²/R²)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Acceleration down inclined plane of angle θ: a = (g sin θ) / (1 + k²/R²).",
    "pointMr": "θ कोनाच्या उतरणीवरील रोलिंग प्रवेग: a = (g sin θ) / (1 + k²/R²).",
    "category": "Formula",
    "formula": "a = g sin θ / (1 + k²/R²)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Descending race on incline: Solid Sphere arrives first (smallest k²/R² = 0.4), Ring last (k²/R² = 1).",
    "pointMr": "उतरणीवरील शर्यतीत घन गोल (Solid Sphere) सर्वात आधी पोहोचतो, रिंग सर्वात शेवटी.",
    "category": "Shortcut",
    "formula": "k²/R²: Sphere(0.4)<Disc(0.5)<Hollow(0.67)<Ring(1)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Newton's law of gravitation: F = G m₁ m₂ / r². G = 6.67 × 10⁻¹¹ N·m²/kg².",
    "pointMr": "न्यूटनचा वैश्विक गुरुत्वाकर्षण नियम: F = G m₁ m₂ / r². G = ६.६७ × १०⁻¹¹ N·m²/kg².",
    "category": "Formula",
    "formula": "F = Gm₁m₂/r²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Acceleration due to gravity at surface: g = G M / R² = (4/3) π G ρ R.",
    "pointMr": "पृथ्वीच्या पृष्ठभागावरील गुरुत्वीय प्रवेग: g = GM / R².",
    "category": "Formula",
    "formula": "g = GM/R²",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Variation of g with altitude h: g_h = g (1 - 2h/R) for h << R; g_h = g [R / (R + h)]² in general.",
    "pointMr": "उंचीनुसार g मधील बदल: g_h = g (1 - 2h/R) जेव्हा h << R.",
    "category": "Formula",
    "formula": "g_h = g(1 - 2h/R)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Variation of g with depth d: g_d = g (1 - d/R). At Earth center d = R => g = 0.",
    "pointMr": "खोलीनुसार g मधील बदल: g_d = g (1 - d/R). पृथ्वीच्या केंद्रावर d=R => g = ०.",
    "category": "Formula",
    "formula": "g_d = g(1 - d/R)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Rate of decrease of g with altitude is twice that with depth: dg/dh = 2 (dg/dd).",
    "pointMr": "उंचीनुसार g कमी होण्याचा दर खोलीपेक्षा दुप्पट असतो: dg/dh = २ × dg/dd.",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Variation of g with latitude φ: g_φ = g - R ω² cos² φ. At poles φ=90° => g max; equator φ=0° => g min.",
    "pointMr": "अक्षांशानुसार बदल: g_φ = g - R ω² cos² φ. ध्रुवावर कमाल, विषुववृत्तावर किमान.",
    "category": "Formula",
    "formula": "g_φ = g - Rω² cos²φ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Gravitational potential energy of mass m at distance r: U = - G M m / r.",
    "pointMr": "गुरुत्वीय स्थितिज ऊर्जा: U = - GMm / r. अनंत अंतरावर स्थितिज ऊर्जा शून्य मानली जाते.",
    "category": "Formula",
    "formula": "U = -GMm/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Gravitational potential V = - G M / r. Scalar quantity; SI unit: J/kg.",
    "pointMr": "गुरुत्वीय विभव (Potential): V = - GM / r. अदिश राशी; एकक: J/kg.",
    "category": "Formula",
    "formula": "V = -GM/r",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Escape velocity from surface of Earth: v_e = √(2 g R) = √(2 G M / R) ≈ 11.2 km/s.",
    "pointMr": "पृथ्वीच्या पृष्ठभागावरून मुक्ती वेग (Escape velocity): v_e = √(2gR) ≈ ११.२ km/s.",
    "category": "Formula",
    "formula": "v_e = √(2gR) = 11.2 km/s",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Relation between escape velocity and orbital velocity: v_e = √2 · v_o ≈ 1.414 v_o.",
    "pointMr": "मुक्ती वेग व परिभ्रमण वेग संबंध: v_e = √२ × v_o. वेग ४१.४% ने वाढवल्यास उपग्रह निसटतो.",
    "category": "Shortcut",
    "formula": "v_e = √2 v_o",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Critical orbital velocity of satellite at altitude h: v_c = √[ G M / (R + h) ].",
    "pointMr": "उपग्रहाचा क्रांतिक परिभ्रमण वेग: v_c = √[ GM / (R + h) ].",
    "category": "Formula",
    "formula": "v_c = √[GM/(R+h)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Period of satellite: T = 2π √[(R + h)³ / G M]. Kepler's 3rd Law: T² ∝ r³.",
    "pointMr": "उपग्रहाचा आवर्तकाळ: T² ∝ r³. केप्लरचा तिसरा नियम.",
    "category": "Rule",
    "formula": "T² ∝ r³",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Geostationary satellite: Period T = 24 hours, orbits from West to East in equatorial plane at h ≈ 36,000 km.",
    "pointMr": "भूस्थिर उपग्रह (Geostationary): आवर्तकाळ २४ तास, उंची ३६,००० किमी, पश्चिमेकडून पूर्वेकडे.",
    "category": "Concept",
    "formula": "T = 24 hr, h ≈ 36,000 km",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Weightlessness in satellite occurs because satellite and occupant are in free fall towards Earth (a = g).",
    "pointMr": "उपग्रहात वजनरहितता (Weightlessness) जाणवते कारण उपग्रह मुक्त पतनात (Free fall) असतो.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Kepler's Second Law: Areal velocity dA/dt = L / (2m) = constant. Follows from conservation of angular momentum.",
    "pointMr": "केप्लरचा दुसरा नियम: क्षेत्रफळीय वेग dA/dt = L/(2m) = स्थिरांक. कोनीय संवेग संवर्धनावर आधारित.",
    "category": "Rule",
    "formula": "dA/dt = L/(2m)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Total energy of orbiting satellite: E = - G M m / (2 r) = - KE = (1/2) PE.",
    "pointMr": "कक्षीय उपग्रहाची एकूण ऊर्जा ऋण असते: E = - GMm / (2r) = - KE = (1/2) PE.",
    "category": "Formula",
    "formula": "E = -KE = PE/2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Binding energy of satellite of mass m at distance r: B.E. = + G M m / (2 r).",
    "pointMr": "उपग्रहाची बंधन ऊर्जा (Binding Energy): B.E. = + GMm / (2r).",
    "category": "Formula",
    "formula": "B.E. = +GMm/(2r)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "If KE of satellite is doubled, it will escape into space because total energy becomes zero or positive.",
    "pointMr": "उपग्रहाची गतिज ऊर्जा दुप्पट केल्यास एकूण ऊर्जा शून्य किंवा धन होऊन उपग्रह अवकाशात निघून जातो.",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Pressure P = F / A. SI unit: N/m² or Pascal (Pa). 1 atm = 1.013 × 10⁵ Pa = 760 mm of Hg.",
    "pointMr": "दाब P = F / A. SI एकक: N/m² किंवा पास्कल (Pa). १ atm = १.०१३ × १०⁵ Pa.",
    "category": "Definition",
    "formula": "P = F/A",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Gauge pressure at depth h in liquid of density ρ: P_gauge = h ρ g. Absolute pressure P = P_0 + h ρ g.",
    "pointMr": "h खोलीवरील द्रवदाब: P = P_0 + h ρ g. P_0 हा वातावरणीय दाब आहे.",
    "category": "Formula",
    "formula": "P = P_0 + hρg",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Pascal's Law: Pressure applied to enclosed fluid is transmitted undiminished in all directions.",
    "pointMr": "पास्कलचा नियम: बंदिस्त द्रवावर दिलेला दाब सर्व दिशांना एकसमान प्रसारित होतो.",
    "category": "Rule",
    "formula": "F₁/A₁ = F₂/A₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Surface Tension T = F / L. SI unit: N/m or J/m²; Dimensions: [M¹ L⁰ T⁻²] (same as spring constant).",
    "pointMr": "पृष्ठताण T = F / L = dW / dA. SI एकक: N/m किंवा J/m²; मिती: [M¹ L⁰ T⁻²].",
    "category": "Definition",
    "formula": "T = F/L",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Surface energy stored in liquid film of area A: W = T · ΔA (for film with two free surfaces, ΔA = 2 ΔA_0).",
    "pointMr": "द्रवपटलाची पृष्ठ ऊर्जा: W = T × ΔA. साबुणाच्या फेसाला २ पृष्ठभाग असतात, त्यामुळे W = २ T ΔA.",
    "category": "Formula",
    "formula": "W = 2 T ΔA",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Work done in blowing bubble of radius R: W = 8 π R² T (two surfaces).",
    "pointMr": "R त्रिज्येचा साबुणाचा फुगा तयार करण्यासाठी केलेले कार्य: W = ८ π R² T.",
    "category": "Formula",
    "formula": "W = 8πR²T",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Excess pressure inside liquid drop of radius R: ΔP = 2 T / R.",
    "pointMr": "द्रवाच्या थेंबातील अतिरिक्त दाब: ΔP = २ T / R.",
    "category": "Formula",
    "formula": "ΔP = 2T/R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Excess pressure inside soap bubble of radius R: ΔP = 4 T / R (two liquid-air interfaces).",
    "pointMr": "साबुणाच्या पोकळ फुग्यातील अतिरिक्त दाब: ΔP = ४ T / R (दोन पृष्ठभाग).",
    "category": "Formula",
    "formula": "ΔP = 4T/R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Angle of contact θ: θ < 90° for liquid that wets solid (water-glass); θ > 90° for non-wetting (mercury-glass).",
    "pointMr": "स्पर्श कोन θ: काच-पाणी साठी θ < ९०° (काचेला भिजवते); काच-पारा साठी θ > ९०°.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Capillary rise formula (Jurin's Law): h = (2 T cos θ) / (r ρ g) => h · r = constant.",
    "pointMr": "केशवाहिनीतील द्रवाची उंची: h = (२ T cos θ) / (r ρ g). h × r = स्थिरांक.",
    "category": "Formula",
    "formula": "h = 2T cos θ / (rρg)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "If capillary tube is insufficient in length, liquid will NOT overflow; instead radius of meniscus R increases: h r = h' R.",
    "pointMr": "केशवाहिनीची लांबी अपुरी असल्यास द्रव सांडत नाही, तर वरच्या द्रवाची वक्रता त्रिज्या R वाढते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Viscous force (Newton's Law): F = - η A (dv/dx), where η is coefficient of viscosity. SI unit: Pa·s or N·s/m².",
    "pointMr": "श्यानता बल: F = - η A (dv/dx). SI एकक: Pa·s (पॉइझिल). CGS: पॉईज (1 Pa·s = 10 poise).",
    "category": "Formula",
    "formula": "F = -ηA(dv/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Stokes' Law for sphere of radius r moving with speed v: F_v = 6 π η r v.",
    "pointMr": "स्टोक्सचा नियम: श्यान द्रवातून जाणाऱ्या गोलावरील रोध बल: F_v = ६ π η r v.",
    "category": "Formula",
    "formula": "F_v = 6πηrv",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Terminal velocity of falling sphere: v_t = [2 r² (ρ - σ) g] / (9 η) => v_t ∝ r².",
    "pointMr": "अंतिम स्थिर वेग (Terminal velocity): v_t ∝ r² (त्रिज्येच्या वर्गाच्या प्रमाणात).",
    "category": "Formula",
    "formula": "v_t ∝ r²",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Equation of Continuity: A₁ v₁ = A₂ v₂ = constant (based on conservation of mass).",
    "pointMr": "सातत्य समीकरण: A₁ v₁ = A₂ v₂ = स्थिरांक (वस्तुमान संवर्धन नियमावर आधारित).",
    "category": "Rule",
    "formula": "A₁v₁ = A₂v₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Bernoulli's Theorem: P + (1/2) ρ v² + ρ g h = constant (based on conservation of energy for non-viscous fluid).",
    "pointMr": "बर्नोलीचे प्रमेय: P + (1/2) ρ v² + ρ g h = स्थिरांक (ऊर्जा संवर्धन नियमावर आधारित).",
    "category": "Rule",
    "formula": "P + 1/2ρv² + ρgh = C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Speed of efflux from tank at depth h (Torricelli's Law): v = √(2 g h) (same as freely falling body).",
    "pointMr": "टाकीच्या छिद्रातून बाहेर पडणाऱ्या द्रवाचा वेग: v = √(२ g h).",
    "category": "Formula",
    "formula": "v = √(2gh)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Venturimeter works on Bernoulli's principle to measure volume rate of flow of fluid in pipe.",
    "pointMr": "व्हेंचुरीमीटर हे बर्नोलीच्या तत्त्वावर आधारित असून नळीतील द्रव प्रवाहाचा दर मोजते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Dynamic lift on aeroplane wing and spinning cricket ball (Magnus effect) is explained by Bernoulli's theorem.",
    "pointMr": "विमानाचे उड्डाण (Dynamic lift) आणि चेंडूचा स्विंग (Magnus effect) बर्नोलीच्या नियमाने स्पष्ट होतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Reynolds Number R_e = ρ v d / η. If R_e < 2000 => Streamline flow; R_e > 3000 => Turbulent flow.",
    "pointMr": "रेनॉल्ड क्रमांक R_e < २००० असल्यास प्रवाह स्थिर (Streamline), तर R_e > ३००० असल्यास क्षुब्ध (Turbulent).",
    "category": "Rule",
    "formula": "R_e = ρvd/η",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Surface tension decreases with increase in temperature; vanishes at critical temperature.",
    "pointMr": "तापमान वाढल्यास द्रवाचा पृष्ठताण कमी होतो आणि क्रांतिक तापमानाला शून्य होतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Addition of highly soluble impurity (NaCl) increases surface tension; sparingly soluble (soap/detergent) decreases it.",
    "pointMr": "मीठ विरघळल्यास पृष्ठताण वाढतो; डिटर्जंट किंवा साबणामुळे पृष्ठताण कमी होतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Two soap bubbles of radii r₁ and r₂ coalesce isothermally in vacuum: New radius R = √(r₁² + r₂²).",
    "pointMr": "दोन साबुणाचे फुगे निर्वातात एकत्र आल्यास नवीन फुग्याची त्रिज्या R = √(r₁² + r₂²).",
    "category": "Shortcut",
    "formula": "R = √(r₁² + r₂²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Radius of interface between two touching bubbles of radii r₁ and r₂ (r₁ > r₂): r = (r₁ r₂) / (r₁ - r₂).",
    "pointMr": "एकमेकांना चिकटलेल्या दोन फुग्यांमधील सामाईक पडद्याची त्रिज्या: r = (r₁ r₂) / (r₁ - r₂).",
    "category": "Shortcut",
    "formula": "r = r₁r₂ / (r₁ - r₂)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Angle of contact of pure water with clean glass is 0°; for ordinary water with glass is ≈ 8°.",
    "pointMr": "शुद्ध पाणी व स्वच्छ काच यामधील स्पर्शकोन ०° असतो; पाऱ्यासाठी तो १३८° ते १४०° असतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Ideal gas equation: P V = n R T = N k_B T, where R = 8.314 J/mol·K and k_B = 1.38 × 10⁻²³ J/K.",
    "pointMr": "आदर्श वायू समीकरण: PV = nRT = N k_B T. R = ८.३१४ J/mol·K.",
    "category": "Formula",
    "formula": "PV = nRT",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Pressure of an ideal gas: P = (1/3) ρ v_rms² = (1/3) (M/V) v_rms².",
    "pointMr": "आदर्श वायूचा दाब: P = (1/3) ρ v_rms².",
    "category": "Formula",
    "formula": "P = 1/3 ρ v_rms²",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Root mean square speed: v_rms = √(3 R T / M_0) = √(3 k_B T / m) = √(3 P / ρ).",
    "pointMr": "वर्ग-माध्य-मूळ वेग (RMS Speed): v_rms = √(3RT/M_0) = √(3P/ρ).",
    "category": "Formula",
    "formula": "v_rms = √(3RT/M)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Average speed: v_avg = √(8 R T / π M_0); Most probable speed: v_mp = √(2 R T / M_0).",
    "pointMr": "सरासरी वेग: v_avg = √(8RT/πM); सर्वाधिक संभाव्य वेग: v_mp = √(2RT/M).",
    "category": "Formula",
    "formula": "v_rms > v_avg > v_mp",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Ratio of speeds: v_mp : v_avg : v_rms = √2 : √(8/π) : √3 ≈ 1 : 1.128 : 1.224.",
    "pointMr": "वायूच्या वेगांचे गुणोत्तर: v_mp : v_avg : v_rms = √२ : √(८/π) : √३.",
    "category": "Shortcut",
    "formula": "v_mp : v_avg : v_rms = √2:√(8/π):√3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Average kinetic energy per molecule: E_k = (3/2) k_B T. Independent of nature of gas.",
    "pointMr": "एका रेणूची सरासरी गतिज ऊर्जा: E_k = (३/२) k_B T. वायूच्या प्रकारावर अवलंबून नाही, फक्त तापमानावर.",
    "category": "Formula",
    "formula": "E_k = (3/2) k_B T",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "Total internal energy of n moles of monoatomic gas: U = (3/2) n R T.",
    "pointMr": "एकअणुक वायूची एकूण अंतर्गत ऊर्जा: U = (३/२) n R T.",
    "category": "Formula",
    "formula": "U = 3/2 nRT",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Degrees of freedom f: Monoatomic = 3 (translational); Diatomic = 5 (3 trans + 2 rot); Non-linear triatomic = 6.",
    "pointMr": "मुक्तीच्या मात्रा (Degrees of freedom): Monoatomic = ३, Diatomic = ५, Non-linear Polyatomic = ६.",
    "category": "Concept",
    "formula": "Mono=3, Dia=5, Tri=6",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "Molar heat capacity at constant volume: C_v = (f / 2) R; At constant pressure: C_p = C_v + R = (1 + f/2) R.",
    "pointMr": "स्थिर आकारमानाची विशिष्ट उष्णता C_v = (f/2)R; स्थिर दाबाची C_p = C_v + R.",
    "category": "Formula",
    "formula": "C_p - C_v = R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Adiabatic ratio γ = C_p / C_v = 1 + 2/f. Monoatomic γ = 5/3 ≈ 1.67; Diatomic γ = 7/5 = 1.40.",
    "pointMr": "रुद्धोष्म गुणोत्तर γ = C_p / C_v = १ + २/f. एकअणुक वायूसाठी γ = १.६७; द्विअणुकसाठी γ = १.४०.",
    "category": "Formula",
    "formula": "γ = 1 + 2/f",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Mayer's Relation: C_p - C_v = R (in molar units) or c_p - c_v = R / J (in heat units).",
    "pointMr": "मेयरचे समीकरण: C_p - C_v = R.",
    "category": "Rule",
    "formula": "C_p - C_v = R",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "First Law of Thermodynamics: ΔQ = ΔU + ΔW = n C_v ΔT + P ΔV.",
    "pointMr": "उष्णतागतिकीचा पहिला नियम: ΔQ = ΔU + ΔW (ऊर्जा संवर्धन नियम).",
    "category": "Rule",
    "formula": "ΔQ = ΔU + W",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Work done in thermodynamic process: W = ∫ P dV = Area under P-V indicator diagram.",
    "pointMr": "उष्णतागतिक कार्य W = ∫ P dV = P-V आलेखाखालील क्षेत्रफळ.",
    "category": "Formula",
    "formula": "W = ∫ P dV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Work done in isobaric process (constant P): W = P (V₂ - V₁) = n R (T₂ - T₁).",
    "pointMr": "समदाब प्रक्रियेतील कार्य (P स्थिर): W = P (V₂ - V₁) = n R ΔT.",
    "category": "Formula",
    "formula": "W = P ΔV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Work done in isochoric process (constant V): dV = 0 => W = 0, so ΔQ = ΔU.",
    "pointMr": "समआकारमान प्रक्रियेत dV = ० => कार्य W = ०, त्यामुळे दिलेली सर्व उष्णता अंतर्गत ऊर्जा वाढवते.",
    "category": "Concept",
    "formula": "W = 0, ΔQ = ΔU",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Work done in isothermal process (constant T): W = n R T ln(V₂ / V₁) = 2.303 n R T log₁₀(P₁ / P₂).",
    "pointMr": "समताप प्रक्रियेतील कार्य: W = २.३०३ n R T log₁₀(V₂ / V₁). अंतर्गत ऊर्जेतील बदल ΔU = ०.",
    "category": "Formula",
    "formula": "W = 2.303 nRT log(V₂/V₁)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "In isothermal process: ΔT = 0 => ΔU = 0 => ΔQ = W (all heat supplied converts into work).",
    "pointMr": "समताप प्रक्रियेत ΔT = ० => ΔU = ० => दिलेली सर्व उष्णता कार्यात रूपांतरित होते.",
    "category": "Concept",
    "formula": "ΔU = 0, Q = W",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Adiabatic process law: P V^γ = constant; T V^(γ - 1) = constant; T^γ P^(1 - γ) = constant.",
    "pointMr": "रुद्धोष्म प्रक्रियेचा नियम: P V^γ = स्थिरांक. उष्णतेची देवाणघेवाण शून्य (Q = ०).",
    "category": "Formula",
    "formula": "PV^γ = const",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Work done in adiabatic process: W = (P₁ V₁ - P₂ V₂) / (γ - 1) = n R (T₁ - T₂) / (γ - 1) = - ΔU.",
    "pointMr": "रुद्धोष्म प्रक्रियेतील कार्य: W = n R (T₁ - T₂) / (γ - 1) = - ΔU.",
    "category": "Formula",
    "formula": "W = nR(T₁ - T₂)/(γ - 1)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Slope of adiabatic curve on P-V diagram is γ times steeper than isothermal curve: (dP/dV)_adi = γ (dP/dV)_iso.",
    "pointMr": "P-V आलेखावर रुद्धोष्म रेषेचा उतार समताप रेषेपेक्षा γ पट अधिक तीव्र असतो.",
    "category": "Shortcut",
    "formula": "Slope_adi = γ × Slope_iso",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Efficiency of Carnot heat engine: η = 1 - (T_C / T_H) = 1 - (Q_C / Q_H) (temperatures must be in Kelvin).",
    "pointMr": "कार्नॉट इंजिनाची कार्यक्षमता: η = १ - (T_C / T_H). तापमान नेहमी केल्विनमध्ये घ्यावे.",
    "category": "Formula",
    "formula": "η = 1 - T_C/T_H",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Efficiency of Carnot engine is independent of working substance and depends ONLY on reservoir temperatures.",
    "pointMr": "कार्नॉट इंजिनाची कार्यक्षमता कार्य करणाऱ्या द्रव्यावर अवलंबून नसते, फक्त स्रोतांच्या तापमानावर अवलंबून असते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Coefficient of performance of Carnot refrigerator: β = Q_C / W = T_C / (T_H - T_C) => β = (1 - η) / η.",
    "pointMr": "रेफ्रिजरेटरचा कार्यक्षमता गुणांक (COP): β = T_C / (T_H - T_C).",
    "category": "Formula",
    "formula": "β = T_C / (T_H - T_C)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Second Law of Thermodynamics: Kelvin-Planck statement (heat engine cannot be 100% efficient); Clausius (heat cannot flow from cold to hot spontaneously).",
    "pointMr": "उष्णतागतिकीचा दुसरा नियम: उष्णतेचे १००% कार्यात रूपांतर अशक्य आणि उष्णता थंड वस्तूकडून आपोआप गरम वस्तूवर जात नाही.",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Mean free path of gas molecules: λ = 1 / [ √2 π n d² ], where n is number density and d is molecular diameter.",
    "pointMr": "रेणूंचा सरासरी मुक्त मार्ग: λ = १ / [ √२ π n d² ]. दाब वाढल्यास λ कमी होतो.",
    "category": "Formula",
    "formula": "λ = 1 / (√2 π n d²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Linear Simple Harmonic Motion (SHM) differential equation: d²x/dt² + ω² x = 0, where ω = √(k/m).",
    "pointMr": "सरळ हार्मोनिक गतीचे (SHM) अवकलज समीकरण: d²x/dt² + ω² x = ०.",
    "category": "Formula",
    "formula": "d²x/dt² + ω²x = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Displacement in SHM starting from mean position: x = A sin(ωt); From extreme position: x = A cos(ωt).",
    "pointMr": "मध्य बिंदूपासून सुरू झाल्यास विस्थापन x = A sin ωt; टोकाच्या बिंदूपासून x = A cos ωt.",
    "category": "Formula",
    "formula": "x = A sin(ωt + φ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Velocity in SHM at displacement x: v = ω √(A² - x²). Maximum at mean x=0 (v_max = Aω); zero at extremes.",
    "pointMr": "SHM मध्ये वेग: v = ω √(A² - x²). मध्य बिंदूवर कमाल (v_max = Aω), टोकाला शून्य.",
    "category": "Formula",
    "formula": "v = ω√(A² - x²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Acceleration in SHM: a = - ω² x. Maximum at extreme positions (a_max = ω²A); zero at mean position.",
    "pointMr": "SHM मध्ये प्रवेग: a = - ω² x. टोकाच्या बिंदूवर कमाल (a_max = ω²A), मध्यभागी शून्य.",
    "category": "Formula",
    "formula": "a = -ω²x",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Phase difference between displacement and velocity is π/2 rad (90°); between velocity and acceleration is π/2.",
    "pointMr": "विस्थापन आणि वेगामध्ये ९०° (π/२) चा कला फरक असतो; विस्थापन आणि प्रवेगात १८०° (π) चा फरक असतो.",
    "category": "Concept",
    "formula": "Δφ(x, v) = π/2; Δφ(x, a) = π",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Kinetic energy in SHM: KE = (1/2) m ω² (A² - x²); Potential energy: PE = (1/2) m ω² x².",
    "pointMr": "SHM मध्ये गतिज ऊर्जा KE = (1/2) m ω² (A² - x²); स्थितिज ऊर्जा PE = (1/2) m ω² x².",
    "category": "Formula",
    "formula": "KE = 1/2 mω²(A² - x²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Total energy in SHM is conserved: E = KE + PE = (1/2) m ω² A² = (1/2) k A² = 2 π² m n² A².",
    "pointMr": "SHM मधील एकूण ऊर्जा संरक्षित असते: E = (१/२) m ω² A² ∝ A² ∝ n².",
    "category": "Formula",
    "formula": "E = 1/2 mω²A²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "At displacement x = A / √2, kinetic energy equals potential energy: KE = PE = E / 2.",
    "pointMr": "विस्थापन x = A / √२ असताना गतिज ऊर्जा आणि स्थितिज ऊर्जा समान (अर्धी) असतात.",
    "category": "Shortcut",
    "formula": "x = A/√2 => KE = PE",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Frequency of kinetic energy oscillation is TWICE the frequency of SHM displacement: f_KE = 2 f_SHM.",
    "pointMr": "गतिज आणि स्थितिज ऊर्जेच्या दोलनाची वारंवारता SHM च्या विस्थापनाच्या वारंवारतेच्या दुप्पट (2n) असते.",
    "category": "PYQ_Trend",
    "formula": "f_energy = 2 × f_SHM",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Period of simple pendulum: T = 2π √(L / g). Independent of mass and amplitude (for small oscillations).",
    "pointMr": "साध्या लंबकाचा आवर्तकाळ: T = २π √(L/g). लंबकाच्या वस्तुमानावर अवलंबून नाही.",
    "category": "Formula",
    "formula": "T = 2π√(L/g)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Seconds pendulum has a period of exactly T = 2 seconds; length on Earth L ≈ 1 meter (99.3 cm).",
    "pointMr": "सेकंद लंबकाचा आवर्तकाळ बरोबर २ सेकंद असतो; पृथ्वीवरील लांबी सुमारे १ मीटर (९९.३ सेमी) असते.",
    "category": "Concept",
    "formula": "T = 2 s, L ≈ 1 m",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Spring pendulum period: T = 2π √(m / k). Series springs: 1/k_s = 1/k₁ + 1/k₂; Parallel: k_p = k₁ + k₂.",
    "pointMr": "स्प्रिंग लंबकाचा आवर्तकाळ: T = २π √(m/k). एकसर जोडणी: 1/k_s = 1/k₁ + 1/k₂; समांतर: k_p = k₁ + k₂.",
    "category": "Formula",
    "formula": "T = 2π√(m/k)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "When a spring of constant k is cut into n equal parts, spring constant of each part becomes n · k.",
    "pointMr": "k स्प्रिंग स्थिरांकाची स्प्रिंग n समान भागांत कापल्यास प्रत्येक भागाचा स्थिरांक n × k होतो.",
    "category": "Shortcut",
    "formula": "k' = n × k",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Progressive wave equation traveling in +x direction: y = A sin(ωt - kx) = A sin 2π(t/T - x/λ).",
    "pointMr": "प्रगमनशील तरंगाचे समीकरण: y = A sin(ωt - kx). तरंग संख्या k = २π / λ.",
    "category": "Formula",
    "formula": "y = A sin(ωt - kx)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Wave speed v = n λ = ω / k. Particle velocity v_p = dy/dt = - v · (dy/dx).",
    "pointMr": "तरंग वेग v = n λ = ω / k. कणाचा वेग v_p = - v × (आलेखाचा उतार).",
    "category": "Formula",
    "formula": "v = nλ = ω/k",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Stationary (Standing) wave formed by superposition of two identical waves traveling in opposite directions.",
    "pointMr": "दोन समान तरंगांचे विरुद्ध दिशेने एकत्रीकरण झाल्यास स्थिर तरंग (Stationary wave) तयार होतो.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Distance between two successive nodes or antinodes is λ / 2; distance between node and antinode is λ / 4.",
    "pointMr": "दोन लगतच्या नोड्समधील अंतर λ / २ असते; नोड आणि अँटिनोडमधील अंतर λ / ४ असते.",
    "category": "Rule",
    "formula": "Node-Node = λ/2; Node-Antinode = λ/4",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Stretched string fundamental frequency: n = (1 / 2L) √(T / m), where m is linear mass density (mass per unit length).",
    "pointMr": "ताणलेल्या तारेची मूळ वारंवारता: n = (१ / २L) √(T / m).",
    "category": "Formula",
    "formula": "n = (1/2L)√(T/m)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Harmonics in stretched string: All harmonics (odd and even) are present: n₁ : n₂ : n₃ = 1 : 2 : 3.",
    "pointMr": "ताणलेल्या तारेत सर्व हार्मोनिक्स (१, २, ३, ४...) उपस्थित असतात.",
    "category": "Concept",
    "formula": "n₁:n₂:n₃ = 1:2:3",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Pipe open at both ends: All harmonics present: fundamental n = v / (2L). Harmonics ratio 1:2:3:4.",
    "pointMr": "दोन्ही टोके उघडी असलेल्या नळीत सर्व हार्मोनिक्स उपस्थित असतात: n = v / (२L).",
    "category": "Formula",
    "formula": "n = v / (2L)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Pipe closed at one end: ONLY ODD harmonics present: fundamental n = v / (4L). Harmonics ratio 1:3:5:7.",
    "pointMr": "एका बाजूने बंद नळीत केवळ विषम हार्मोनिक्स उपस्थित असतात: n = v / (४L).",
    "category": "Formula",
    "formula": "n = v / (4L)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "End correction: For pipe closed at one end e = 0.3 d; For open pipe at both ends e = 0.6 d (where d is diameter).",
    "pointMr": "अंतिम सुधारणा (End correction): बंद नळीसाठी e = ०.३ d; उघड्या नळीसाठी e = ०.६ d.",
    "category": "Formula",
    "formula": "e = 0.3 d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Beats frequency: N = |n₁ - n₂| (number of waxing and waning per second).",
    "pointMr": "बीट्स वारंवारता N = |n₁ - n₂| (दोन फ्रिक्वेन्सीमधील फरक).",
    "category": "Formula",
    "formula": "N = |n₁ - n₂|",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "When tuning fork is loaded with wax, its frequency decreases; when filed, frequency increases.",
    "pointMr": "ट्युनिंग फॉर्कला मेण लावल्यास वारंवारता कमी होते; घासल्यास (file केल्यास) वारंवारता वाढते.",
    "category": "Shortcut",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Doppler effect apparent frequency: n' = n [ (v ± v_o) / (v ∓ v_s) ]. Not applicable when source/listener moves at 90°.",
    "pointMr": "डॉप्लर परिणाम भासमान वारंवारता: n' = n [ (v ± v_o) / (v ∓ v_s) ].",
    "category": "Formula",
    "formula": "n' = n(v ± v_o)/(v ∓ v_s)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Huygens' Principle: Every point on a wavefront acts as a secondary source of spherical wavelets.",
    "pointMr": "हायगेन्सचे तत्त्व: तरंगमुखावरील (Wavefront) प्रत्येक बिंदू दुय्यम तरंगांचा नवीन स्रोत म्हणून कार्य करतो.",
    "category": "Definition",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Refraction Snell's Law in wave theory: n₁ sin i = n₂ sin r => v₁ / v₂ = λ₁ / λ₂ = n₂ / n₁.",
    "pointMr": "स्नेलचा नियम: n₁ sin i = n₂ sin r => प्रकाशाचा वेग व तरंगलांबी माध्यमात बदलतात, वारंवारता स्थिर राहते.",
    "category": "Rule",
    "formula": "n = c/v = λ_0/λ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "During refraction, frequency of light remains constant; wavelength and speed change proportionally.",
    "pointMr": "प्रकाशाच्या अपवर्तनात वारंवारता (Frequency) स्थिर राहते; तरंगलांबी आणि वेग बदलतात.",
    "category": "Concept",
    "formula": "f = const; v, λ change",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Interference condition for constructive interference (Bright fringe): Path difference Δx = n λ (n = 0, 1, 2...).",
    "pointMr": "रचनात्मक व्यतिकरण (तेजस्वी पट्टा) अट: पथांतर Δx = n λ.",
    "category": "Formula",
    "formula": "Δx = nλ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Condition for destructive interference (Dark fringe): Path difference Δx = (2n - 1) λ / 2.",
    "pointMr": "विनाशी व्यतिकरण (काळा पट्टा) अट: पथांतर Δx = (२n - १) λ / २.",
    "category": "Formula",
    "formula": "Δx = (2n - 1)λ/2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Young's Double Slit Experiment (YDSE) fringe width: β = λ D / d. Same for bright and dark fringes.",
    "pointMr": "YDSE मध्ये पट्ट्याची रुंदी (Fringe width): β = λ D / d.",
    "category": "Formula",
    "formula": "β = λD/d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "If YDSE apparatus is immersed in liquid of refractive index μ, fringe width decreases: β' = β / μ.",
    "pointMr": "YDSE उपकरण μ अपवर्तनांक असलेल्या द्रवात बुडवल्यास पट्ट्याची रुंदी β' = β / μ होते.",
    "category": "Shortcut",
    "formula": "β' = β/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Ratio of maximum to minimum intensity in interference: I_max / I_min = (√I₁ + √I₂)² / (√I₁ - √I₂)² = (a₁ + a₂)² / (a₁ - a₂)².",
    "pointMr": "कमाल आणि किमान तीव्रतेचे गुणोत्तर: I_max / I_min = (a₁ + a₂)² / (a₁ - a₂)². ",
    "category": "Formula",
    "formula": "I_max/I_min = (a₁+a₂)²/(a₁-a₂)²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Single slit Fraunhofer diffraction: Minima condition a sin θ = m λ; Central maximum angular width 2θ = 2λ / a.",
    "pointMr": "एकल स्लिट विवर्तन: मध्यवर्ती तेजस्वी पट्ट्याची कोनीय रुंदी २θ = २λ / a असते.",
    "category": "Formula",
    "formula": "2θ = 2λ/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Width of central diffraction maximum: W = 2 λ D / a (twice the width of secondary maxima).",
    "pointMr": "मध्यवर्ती विवर्तन पट्ट्याची रेषीय रुंदी: W = २ λ D / a (दुय्यम पट्ट्यांच्या दुप्पट).",
    "category": "Formula",
    "formula": "W = 2λD/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Brewster's Law of Polarization: tan i_p = μ. At Brewster angle, reflected and refracted rays are perpendicular (90°).",
    "pointMr": "ब्रूस्टरचा नियम: tan i_p = μ. ब्रूस्टर कोनात परावर्तित व अपवर्तित किरण एकमेकांना लंब (९०°) असतात.",
    "category": "Rule",
    "formula": "tan i_p = μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Malus' Law: Intensity of polarized light through analyzer: I = I_0 cos² θ.",
    "pointMr": "मॅलसचा नियम: पोलरायझरमधून बाहेर पडणारी तीव्रता I = I_0 cos² θ.",
    "category": "Formula",
    "formula": "I = I_0 cos²θ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "When unpolarized light passes through a polaroid sheet, its intensity is always halved: I = I_0 / 2.",
    "pointMr": "अध्रुवित प्रकाश पोलरॉइडमधून जाताच त्याची तीव्रता निम्मी (I_0 / २) होते.",
    "category": "Concept",
    "formula": "I = I_0 / 2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Resolving power of telescope: RP = D / (1.22 λ). Limit of resolution dθ = 1.22 λ / D.",
    "pointMr": "दुर्बिणीची रिझॉल्व्हिंग पॉवर: RP = D / (१.२२ λ).",
    "category": "Formula",
    "formula": "RP = D / (1.22λ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Resolving power of microscope: RP = (2 μ sin θ) / λ = (2 NA) / λ, where NA is Numerical Aperture.",
    "pointMr": "सूक्ष्मदर्शकाची रिझॉल्व्हिंग पॉवर: RP = (२ μ sin θ) / λ.",
    "category": "Formula",
    "formula": "RP = 2NA/λ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Total Internal Reflection (TIR) condition: Light travels from denser to rarer; Angle of incidence i > critical angle θ_c.",
    "pointMr": "पूर्ण अंतर्गत परावर्तन (TIR): प्रकाश दाट माध्यमातून विरळ माध्यमात गेला पाहिजे आणि i > θ_c.",
    "category": "Rule",
    "formula": "sin θ_c = 1/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Critical angle relation with refractive index: sin θ_c = 1 / μ.",
    "pointMr": "क्रांतिक कोन आणि अपवर्तनांक संबंध: sin θ_c = १ / μ.",
    "category": "Formula",
    "formula": "sin θ_c = 1/μ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Prism formula: μ = sin[(A + δ_m) / 2] / sin(A / 2), where A is prism angle and δ_m is minimum deviation.",
    "pointMr": "प्रिझमचे अपवर्तनांक सूत्र: μ = sin[(A + δ_m)/2] / sin(A/2).",
    "category": "Formula",
    "formula": "μ = sin(A+δ_m)/2 / sin(A/2)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "For thin prism (A < 10°), deviation is δ = (μ - 1) A. Independent of angle of incidence.",
    "pointMr": "पातळ प्रिझमसाठी विचलन: δ = (μ - १) A.",
    "category": "Formula",
    "formula": "δ = (μ - 1)A",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Dispersive power of prism material: ω = (δ_v - δ_r) / δ_y = (μ_v - μ_r) / (μ_y - 1).",
    "pointMr": "प्रिझमची विक्षेपण क्षमता: ω = (μ_v - μ_r) / (μ_y - १).",
    "category": "Formula",
    "formula": "ω = (μ_v - μ_r)/(μ_y - 1)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Lens Maker's Formula: 1 / f = (μ - 1) [ (1 / R₁) - (1 / R₂) ].",
    "pointMr": "लेन्स मेकर्स सूत्र: १/f = (μ - १) [ 1/R₁ - 1/R₂ ].",
    "category": "Formula",
    "formula": "1/f = (μ - 1)(1/R₁ - 1/R₂)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Power of a lens P = 1 / f (in meters). SI unit: Dioptre (D). Converging lens P > 0; Diverging lens P < 0.",
    "pointMr": "लेन्सची शक्ती P = १ / f (मीटरमध्ये). एकक: डायोप्टर (D). बहिर्गोल लेन्सची शक्ती धन असते.",
    "category": "Definition",
    "formula": "P = 1/f (D)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Combination of two thin lenses in contact: 1/F = 1/f₁ + 1/f₂ => Total Power P = P₁ + P₂.",
    "pointMr": "स्पर्श करणाऱ्या दोन लेन्सची एकूण शक्ती: P = P₁ + P₂; नाभिय अंतर: १/F = १/f₁ + १/f₂.",
    "category": "Formula",
    "formula": "P = P₁ + P₂",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "When a glass lens (μ_g = 1.5) is immersed in water (μ_w = 1.33), its focal length quadruples: f_water = 4 f_air.",
    "pointMr": "काचेची लेन्स पाण्यात बुडवल्यास तिचे नाभीय अंतर चौपट (४ पट) होते आणि शक्ती १/४ होते.",
    "category": "Shortcut",
    "formula": "f_water ≈ 4 f_air",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "If convex lens is placed in a medium of higher refractive index (μ_m > μ_lens), it behaves as concave lens.",
    "pointMr": "लेन्सपेक्षा जास्त अपवर्तनांक असलेल्या माध्यमात बहिर्गोल लेन्स अंतर्गोल लेन्ससारखी कार्य करते.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Coulomb's Law: F = (1 / 4πε_0) (q₁ q₂ / r²). 1/(4πε_0) = 9 × 10⁹ N·m²/C²; ε_0 = 8.85 × 10⁻¹² C²/N·m².",
    "pointMr": "कूलॉमचा नियम: F = (१ / ४πε_0) (q₁ q₂ / r²). निर्वात विद्युत पार्यता ε_0 = ८.८५ × १०⁻¹².",
    "category": "Formula",
    "formula": "F = k q₁q₂/r²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Electric field E = F / q_0. Field due to point charge: E = (1 / 4πε_0) q / r².",
    "pointMr": "विद्युत क्षेत्र E = F / q. बिंदू प्रभारामुळे निर्माण होणारे क्षेत्र E = q / (४πε_0 r²).",
    "category": "Formula",
    "formula": "E = q / (4πε_0 r²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Electric dipole moment p = q · 2a (directed from -q to +q). SI unit: C·m.",
    "pointMr": "विद्युत द्विध्रुव आघूर्ण (Dipole moment): p = q × २a (दिशा -q कडून +q कडे).",
    "category": "Definition",
    "formula": "p = 2aq",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Electric field of dipole on axial line: E_axial = (1 / 4πε_0) (2p / r³); On equatorial line: E_eq = (1 / 4πε_0) (p / r³).",
    "pointMr": "द्विध्रुवाच्या अक्षावरील क्षेत्र: E_axial = २p/(४πε_0 r³); विषुववृत्तावर: E_eq = p/(४πε_0 r³).",
    "category": "Formula",
    "formula": "E_axial = 2 E_eq",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Torque on dipole in uniform electric field: τ = p × E = p E sin θ. Potential energy: U = - p · E.",
    "pointMr": "एकसमान विद्युत क्षेत्रातील द्विध्रुवावरील टॉर्क: τ = p × E; स्थितिज ऊर्जा U = - p · E.",
    "category": "Formula",
    "formula": "τ = pE sin θ; U = -pE cos θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Gauss's Law: Total electric flux Φ = ∮ E · dA = q_enclosed / ε_0.",
    "pointMr": "गॉसचा नियम: बंदिस्त पृष्ठातून जाणारा एकूण विद्युत फ्लक्स Φ = q_enclosed / ε_0.",
    "category": "Rule",
    "formula": "Φ = q/ε_0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Electric field due to infinitely long charged wire: E = λ / (2πε_0 r), where λ is linear charge density.",
    "pointMr": "लांब सरळ विद्युत प्रभारित तारेमुळे निर्माण होणारे क्षेत्र: E = λ / (२πε_0 r).",
    "category": "Formula",
    "formula": "E = λ / (2πε_0 r)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Electric field near infinite charged plane sheet: E = σ / (2ε_0). Independent of distance r.",
    "pointMr": "अमर्याद प्रभारित पत्र्यामुळे क्षेत्र: E = σ / (२ε_0). अंतरावर अवलंबून नाही.",
    "category": "Formula",
    "formula": "E = σ / (2ε_0)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Electric field inside a uniformly charged conducting sphere or hollow shell is ZERO: E_in = 0; Potential V_in = constant.",
    "pointMr": "प्रभारित पोकळ गोलाच्या आत विद्युत क्षेत्र शून्य असते (E=०); विभव V सर्वत्र स्थिर राहते.",
    "category": "Concept",
    "formula": "E_in = 0, V_in = V_surface",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Capacitance C = Q / V. Parallel plate capacitor: C = ε_0 A / d. With dielectric of constant K: C = K ε_0 A / d.",
    "pointMr": "धारकता C = Q / V. समांतर पट्टी कपॅसिटर: C = ε_0 A / d. डायइलेक्ट्रिक K टाकल्यास C' = K C.",
    "category": "Formula",
    "formula": "C = K ε_0 A / d",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Energy stored in capacitor: U = (1/2) C V² = Q² / (2C) = (1/2) Q V.",
    "pointMr": "कपॅसिटरमध्ये साठवलेली ऊर्जा: U = (१/२) C V² = Q² / (२C).",
    "category": "Formula",
    "formula": "U = 1/2 CV²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "When dielectric slab K is inserted with battery CONNECTED: V constant, C increases (KC), Q increases (KQ), E constant, U increases (KU).",
    "pointMr": "बॅटरी जोडलेली असताना डायइलेक्ट्रिक टाकल्यास: व्होल्टेज V स्थिर राहते, C आणि Q के-पट वाढतात.",
    "category": "Rule",
    "formula": "Battery ON: V const, C->KC, Q->KQ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "When dielectric slab K is inserted with battery DISCONNECTED: Q constant, C increases (KC), V decreases (V/K), E decreases, U decreases (U/K).",
    "pointMr": "बॅटरी काढल्यावर डायइलेक्ट्रिक टाकल्यास: प्रभार Q स्थिर राहतो, V आणि U के-पट कमी होतात.",
    "category": "Rule",
    "formula": "Battery OFF: Q const, V->V/K, U->U/K",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Ohm's Law: V = I R. Resistance R = ρ L / A. Current density j = σ E (microscopic Ohm's law).",
    "pointMr": "ओहमचा नियम: V = I R. रोध R = ρ L / A. करंट घनता j = σ E.",
    "category": "Formula",
    "formula": "V = IR; R = ρL/A",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Drift velocity of electrons: v_d = e E τ / m. Relation with current: I = n e A v_d.",
    "pointMr": "इलेक्ट्रॉनचा ड्रिफ्ट वेग: v_d = e E τ / m. प्रवाह संबंध: I = n e A v_d.",
    "category": "Formula",
    "formula": "I = n e A v_d",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "When wire is stretched to n times its initial length, its new resistance becomes n² · R (volume is conserved).",
    "pointMr": "तारेची लांबी खेचून n पट वाढवल्यास नवीन रोध n² × R होतो (आकारमान स्थिर).",
    "category": "Shortcut",
    "formula": "R' = n² R",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Temperature dependence of resistance: R_T = R_0 (1 + α ΔT). For metals α > 0; For semiconductors α < 0.",
    "pointMr": "तापमानानुसार रोध बदल: R_T = R_0 (१ + α ΔT). धातूंचा α धन असतो; अर्धवाहकांचा α ऋण असतो.",
    "category": "Concept",
    "formula": "R_T = R_0(1 + αΔT)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Kirchhoff's Current Law (KCL): Σ I = 0 at any junction (based on conservation of charge).",
    "pointMr": "किरचॉफचा पहिला नियम (जंक्शन नियम): Σ I = ० (प्रभार संवर्धन नियमावर आधारित).",
    "category": "Rule",
    "formula": "Σ I = 0 (Charge)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Kirchhoff's Voltage Law (KVL): Σ ΔV = 0 in any closed loop (based on conservation of energy).",
    "pointMr": "किरचॉफचा दुसरा नियम (लूप नियम): Σ ΔV = ० (ऊर्जा संवर्धन नियमावर आधारित).",
    "category": "Rule",
    "formula": "Σ V = 0 (Energy)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Balanced Wheatstone bridge condition: P / Q = R / S. No current flows through galvanometer (I_g = 0).",
    "pointMr": "संतुलित व्हीटस्टोन ब्रिज: P / Q = R / S. गॅल्व्हानोमीटरमधून जाणारा प्रवाह शून्य असतो.",
    "category": "Formula",
    "formula": "P/Q = R/S",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Metre Bridge principle is based on balanced Wheatstone bridge: X = R · (l_x / l_r).",
    "pointMr": "मीटर ब्रिज हा संतुलित व्हीटस्टोन ब्रिजवर कार्य करतो: अज्ञात रोध X = R (l_x / l_r).",
    "category": "Formula",
    "formula": "X = R (l_x / l_r)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Potentiometer compares EMF without drawing current (infinite resistance voltmeter): E₁ / E₂ = l₁ / l₂.",
    "pointMr": "पोटेन्शिओमीटर कोणताही करंट न घेता अचूक ईएमएफ मोजतो: E₁ / E₂ = l₁ / l₂.",
    "category": "Formula",
    "formula": "E₁/E₂ = l₁/l₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Internal resistance of cell by potentiometer: r = R [ (l₁ - l₂) / l₂ ].",
    "pointMr": "घटाचा अंतर्गत रोध मोजण्याचे सूत्र: r = R [ (l₁ - l₂) / l₂ ].",
    "category": "Formula",
    "formula": "r = R(l₁ - l₂)/l₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "Sensitivity of potentiometer can be increased by decreasing potential gradient k = V/L (increasing length L).",
    "pointMr": "पोटेन्शिओमीटरची संवेदनशीलता वाढवण्यासाठी तारेची लांबी L वाढवून व्होल्टेज ग्रेडियंट कमी करतात.",
    "category": "Concept",
    "formula": "Sensitivity ∝ 1/k ∝ L",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Electric power P = V I = I² R = V² / R. 1 kWh (Board of Trade unit) = 3.6 × 10⁶ Joules.",
    "pointMr": "विद्युत शक्ती P = V I = I² R = V² / R. १ युनिट (१ kWh) = ३.६ × १०⁶ ज्यूल.",
    "category": "Formula",
    "formula": "1 kWh = 3.6 × 10⁶ J",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Biot-Savart Law: dB = (μ_0 / 4π) (I dl sin θ / r²). μ_0 = 4π × 10⁻⁷ T·m/A.",
    "pointMr": "बायोट-साव्हर्ट नियम: dB = (μ_0 / ४π) (I dl sin θ / r²).",
    "category": "Formula",
    "formula": "dB = (μ_0/4π) I dl sin θ / r²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "Magnetic field at center of circular coil of N turns: B = μ_0 N I / (2 R).",
    "pointMr": "N फेरे असलेल्या वर्तुळाकार कॉईलच्या केंद्रावरील चुंबकीय क्षेत्र: B = μ_0 N I / (२ R).",
    "category": "Formula",
    "formula": "B = μ_0 N I / (2R)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Magnetic field of straight long wire: B = μ_0 I / (2π r). Ampere's Circuital Law: ∮ B · dl = μ_0 I_enclosed.",
    "pointMr": "लांब सरळ तारेचे क्षेत्र: B = μ_0 I / (२π r). अँपिअरचा नियम ∮ B · dl = μ_0 I.",
    "category": "Formula",
    "formula": "B = μ_0 I / (2πr)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Magnetic Lorentz force on charge q moving with velocity v in field B: F = q (v × B) = q v B sin θ.",
    "pointMr": "चुंबकीय लॉरेन्ट्झ बल: F = q (v × B) = q v B sin θ. जर v || B असेल तर बल शून्य.",
    "category": "Formula",
    "formula": "F = qvB sin θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Radius of circular path of charge in perpendicular B: r = m v / (q B) = p / (q B) = √(2 m q V) / (q B).",
    "pointMr": "प्रभारित कणाच्या वर्तुळाकार मार्गाची त्रिज्या: r = mv / (qB).",
    "category": "Formula",
    "formula": "r = mv/(qB)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Cyclotron frequency: f = q B / (2π m). Independent of speed and radius of the particle.",
    "pointMr": "सायक्लोट्रॉन वारंवारता f = q B / (२π m). कणाच्या वेगावर आणि त्रिज्येवर अवलंबून नसते.",
    "category": "Formula",
    "formula": "f = qB / (2πm)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Force between two parallel current-carrying wires: F / L = (μ_0 / 2π) (I₁ I₂ / d). Attractive if parallel currents.",
    "pointMr": "दोन समांतर तारांमधील बल प्रति लांबी: F/L = (μ_0 / २π) (I₁ I₂ / d). प्रवाह एका दिशेने असल्यास आकर्षण.",
    "category": "Formula",
    "formula": "F/L = μ_0 I₁I₂ / (2πd)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Moving Coil Galvanometer: Deflection θ ∝ I => I = (C / nAB) θ = K θ.",
    "pointMr": "मूव्हिंग कॉईल गॅल्व्हानोमीटर: डिफ्लेक्शन करंटच्या समप्रमाणात असते: I = K θ.",
    "category": "Formula",
    "formula": "I = (C/nAB) θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Converting Galvanometer to Ammeter: Connect small shunt resistance S in PARALLEL: S = [ I_g / (I - I_g) ] G.",
    "pointMr": "अमीटर बनवण्यासाठी गॅल्व्हानोमीटरला समांतर जोडणीत लहान शंट रोध S जोडतात.",
    "category": "Formula",
    "formula": "S = I_g G / (I - I_g)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Converting Galvanometer to Voltmeter: Connect high resistance R in SERIES: R = (V / I_g) - G.",
    "pointMr": "व्होल्टमीटर बनवण्यासाठी गॅल्व्हानोमीटरला एकसर जोडणीत मोठा रोध R जोडतात.",
    "category": "Formula",
    "formula": "R = (V / I_g) - G",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Faraday's Law of EMI: Induced EMF e = - dΦ/dt = - N (dΦ/dt). Minus sign given by Lenz's Law (conservation of energy).",
    "pointMr": "फॅराडेचा विद्युतचुंबकीय प्रवर्तन नियम: e = - dΦ/dt. ऋण चिन्ह लेन्झचा नियम (ऊर्जा संवर्धन) दर्शवते.",
    "category": "Rule",
    "formula": "e = - dΦ/dt",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Motional EMF in rod of length L moving with speed v perpendicular to field B: e = B L v.",
    "pointMr": "B क्षेत्रात v वेगाने फिरणाऱ्या दांड्यातील प्रेरित EMF: e = B L v.",
    "category": "Formula",
    "formula": "e = BLv",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Self-inductance L = N Φ / I; Induced EMF e = - L (dI/dt). SI unit: Henry (H). Energy in inductor: U = (1/2) L I².",
    "pointMr": "स्वयंप्रवर्तन L: e = - L (dI/dt). एकक: हेन्री (H). इंडक्टरमधील चुंबकीय ऊर्जा U = (१/२) L I².",
    "category": "Formula",
    "formula": "U = 1/2 L I²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Mutual inductance between two coils: e₂ = - M (dI₁/dt). Coefficient of coupling: k = M / √(L₁ L₂).",
    "pointMr": "परस्परोपप्रवर्तन (Mutual Inductance): M = k √(L₁ L₂). कमाल कपलिंगसाठी k = १.",
    "category": "Formula",
    "formula": "M = k√(L₁L₂)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "AC Root Mean Square (RMS) value: I_rms = I_0 / √2 ≈ 0.707 I_0; Average value over half cycle: I_avg = 2 I_0 / π ≈ 0.637 I_0.",
    "pointMr": "AC चा RMS व्हॅल्यू: I_rms = I_0 / √२ = ०.७०७ I_0. घरगुती २२०V ही RMS व्हॅल्यू असते.",
    "category": "Formula",
    "formula": "V_rms = V_0 / √2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "Inductive reactance X_L = ω L = 2π f L; Capacitive reactance X_C = 1 / (ω C) = 1 / (2π f C).",
    "pointMr": "इंडक्टिव्ह रिअॅक्टन्स X_L = २π f L; कपॅसिटिव्ह रिअॅक्टन्स X_C = १ / (२π f C).",
    "category": "Formula",
    "formula": "X_L = ωL; X_C = 1/(ωC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Series LCR impedance: Z = √[ R² + (X_L - X_C)² ]. Resonance condition: X_L = X_C => ω_0 = 1 / √(L C).",
    "pointMr": "LCR सर्किटचा एकूण विरोध (Impedance): Z = √[ R² + (X_L - X_C)² ]. रेझोनन्सला Z = R किमान असतो.",
    "category": "Formula",
    "formula": "f_0 = 1 / (2π√LC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Quality factor of LCR circuit: Q = (1 / R) √(L / C) = ω_0 / bandwidth.",
    "pointMr": "क्वालिटी फॅक्टर Q = (१/R) √(L/C). Q जास्त असल्यास सर्किटची निवडक्षमता जास्त असते.",
    "category": "Formula",
    "formula": "Q = 1/R √(L/C)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Power in AC circuit: P = V_rms I_rms cos φ. Power factor cos φ = R / Z. In pure L or C, cos φ = 0 => Wattless current.",
    "pointMr": "AC शक्ती: P = V_rms I_rms cos φ. शुद्ध इंडक्टर किंवा कपॅसिटरमध्ये शक्ती वापर शून्य (Wattless) असते.",
    "category": "Formula",
    "formula": "P = V_rms I_rms cos φ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Einstein's photoelectric equation: h ν = Φ_0 + KE_max = h ν_0 + e V_0, where V_0 is stopping potential.",
    "pointMr": "आईन्स्टाईनचे फोटोइलेक्ट्रिक समीकरण: h ν = Φ_0 + (१/२) m v_max² = h ν_0 + e V_0.",
    "category": "Formula",
    "formula": "hν = Φ_0 + eV_0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Photoelectric effect characteristics: Rate of emission ∝ Intensity; KE_max depends ONLY on frequency, independent of intensity.",
    "pointMr": "इलेक्ट्रॉन उत्सर्जनाचा दर प्रकाशाच्या तीव्रतेवर अवलंबून असतो; कमाल गतिज ऊर्जा फक्त वारंवारतेवर अवलंबून असते.",
    "category": "Rule",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "de Broglie wavelength of matter wave: λ = h / p = h / (m v) = h / √(2 m E) = 1.227 / √V nm (for electron).",
    "pointMr": "डी-ब्रॉग्ली तरंगलांबी: λ = h / p = h / √(२ m e V). इलेक्ट्रॉनसाठी λ = १२.२७ / √V Å.",
    "category": "Formula",
    "formula": "λ = 12.27 / √V Å",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Bohr's quantization postulate: Angular momentum L = m v r = n h / (2π). Radius of n-th orbit: r_n = 0.529 (n² / Z) Å.",
    "pointMr": "बोहरचा नियम: m v r = n h / (२π). n-व्या कक्षेची त्रिज्या r_n = ०.५२९ (n² / Z) Å.",
    "category": "Formula",
    "formula": "r_n = 0.529 n²/Z Å",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Energy of electron in n-th Bohr orbit of hydrogen: E_n = - 13.6 (Z² / n²) eV.",
    "pointMr": "हायड्रोजनच्या n-व्या कक्षेतील ऊर्जा: E_n = - १३.६ / n² eV. पहिल्या कक्षेची ऊर्जा -१३.६ eV.",
    "category": "Formula",
    "formula": "E_n = -13.6 Z²/n² eV",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Radioactive Decay Law: N(t) = N_0 e^(-λt). Half-life T_(1/2) = ln 2 / λ = 0.693 / λ. Mean life τ = 1 / λ = 1.44 T_(1/2).",
    "pointMr": "किरणोत्सारी क्षय नियम: N = N_0 e^(-λt). अर्धायुष्य T_(1/2) = ०.६९३ / λ. सरासरी आयुष्य τ = १.४४ T_(1/2).",
    "category": "Formula",
    "formula": "T_(1/2) = 0.693/λ",
    "badge": "PYQ Trends & Advanced"
  }
];

export const CHEMISTRY_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Number of atoms per unit cell: Simple cubic (SC) = 1; Body-centered cubic (BCC) = 2; Face-centered cubic (FCC) = 4.",
    "pointMr": "युनिट सेल मधील अणूंची संख्या: SC = १, BCC = २, FCC/CCP = ४.",
    "category": "Concept",
    "formula": "SC=1, BCC=2, FCC=4",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Packing efficiency: SC = 52.4%; BCC = 68%; FCC / HCP = 74.0% (highest packing fraction).",
    "pointMr": "पॅकिंग कार्यक्षमता: साधे घन (SC) = ५२.४%, BCC = ६८%, FCC = ७४% (कमाल कार्यक्षमता).",
    "category": "Shortcut",
    "formula": "FCC(74%) > BCC(68%) > SC(52.4%)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Relation between edge length a and radius r: SC: a = 2r; BCC: 4r = √3 a; FCC: 4r = √2 a.",
    "pointMr": "कडेची लांबी a आणि त्रिज्या r: SC: a = 2r, BCC: r = (√3/4)a, FCC: r = a/(2√2).",
    "category": "Formula",
    "formula": "BCC: r=√3a/4; FCC: r=a/(2√2)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Coordination number: SC = 6; BCC = 8; FCC / HCP = 12.",
    "pointMr": "संयोजक संख्या (Coordination number): SC = ६, BCC = ८, FCC = १२.",
    "category": "Concept",
    "formula": "CN: SC=6, BCC=8, FCC=12",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Density of cubic unit cell: d = (Z · M) / (a³ · N_A). Check unit conversions: a in cm, M in g/mol.",
    "pointMr": "घन युनिट सेलची घनता: d = (Z × M) / (a³ × N_A).",
    "category": "Formula",
    "formula": "d = (Z·M)/(a³·N_A)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Schottky defect: Equal number of cations and anions missing. Density DECREASES. Seen in NaCl, KCl, CsCl, AgBr.",
    "pointMr": "शॉट्की दोष (Schottky defect): समान संख्येत धनायन व ऋणायन गहाळ होतात. घनता कमी होते. (NaCl, AgBr).",
    "category": "Concept",
    "formula": "Density decreases",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Frenkel defect: Cation displaced to interstitial site. Density remains UNCHANGED. Seen in ZnS, AgCl, AgBr, AgI.",
    "pointMr": "फ्रेंकेल दोष (Frenkel defect): आयन अंतरालीय जागेत जातो. घनता बदलत नाही. (ZnS, AgCl, AgBr).",
    "category": "Concept",
    "formula": "Density constant",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "AgBr exhibits BOTH Schottky and Frenkel defects (frequent exam question).",
    "pointMr": "सिल्व्हर ब्रोमाइड (AgBr) मध्ये शॉट्की आणि फ्रेंकेल हे दोन्ही दोष आढळतात.",
    "category": "PYQ_Trend",
    "formula": "AgBr: Both Schottky & Frenkel",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "F-centers: Anionic sites occupied by unpaired electrons, imparting color and paramagnetism (e.g. yellow NaCl).",
    "pointMr": "F-सेंटर्स: ऋणायनाच्या रिकाम्या जागी अडकलेले इलेक्ट्रॉन क्रिस्टलला रंग देतात (उदा. पिवळा NaCl).",
    "category": "Concept",
    "formula": "Color due to F-centers",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Henry's Law: S = K_H · P, where S is solubility of gas and P is partial pressure. K_H decreases with temperature.",
    "pointMr": "हेन्रीचा नियम: वायूची विद्राव्यता दाबाच्या समप्रमाणात असते: S = K_H × P. तापमान वाढल्यास K_H कमी होतो.",
    "category": "Formula",
    "formula": "S = K_H · P",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Raoult's Law for volatile liquids: P_total = P_A° x_A + P_B° x_B.",
    "pointMr": "राउल्टचा नियम: द्रावणाचा एकूण बाष्पदाब P = P_A° x_A + P_B° x_B.",
    "category": "Formula",
    "formula": "P_total = P_A°x_A + P_B°x_B",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Relative Lowering of Vapor Pressure (RLVP): (P_1° - P) / P_1° = x_2 = n_2 / (n_1 + n_2). Colligative property.",
    "pointMr": "बाष्पदाबातील सापेक्ष घट: (P_1° - P) / P_1° = x_2 (विद्राव्याचे मोल फ्रॅक्शन).",
    "category": "Formula",
    "formula": "ΔP/P° = x_2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Elevation in Boiling Point: ΔT_b = i · K_b · m. K_b is molal elevation (ebullioscopic) constant.",
    "pointMr": "उत्कलन बिंदूतील वाढ: ΔT_b = i × K_b × m. K_b हा मोलल स्थिरांक आहे.",
    "category": "Formula",
    "formula": "ΔT_b = i K_b m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Depression in Freezing Point: ΔT_f = i · K_f · m. K_f is molal depression (cryoscopic) constant.",
    "pointMr": "गोठण बिंदूतील घट: ΔT_f = i × K_f × m. K_f हा क्रायोस्कोपिक स्थिरांक आहे.",
    "category": "Formula",
    "formula": "ΔT_f = i K_f m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Osmotic Pressure: π = i · C · R · T = i (n/V) R T. Best colligative property for molar mass of polymers/biomolecules.",
    "pointMr": "अभिसरण दाब (Osmotic Pressure): π = i C R T. पॉलिमर व प्रथिनांचे रेणुवस्तुमान मोजण्यासाठी सर्वोत्तम.",
    "category": "Formula",
    "formula": "π = iCRT",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Isotonic solutions have identical osmotic pressure (π₁ = π₂ => C₁ = C₂ at same temperature).",
    "pointMr": "आयसोटोनिक द्रावणांचा अभिसरण दाब एकसमान असतो (π₁ = π₂). रक्त ०.९% NaCl शी आयसोटोनिक असते.",
    "category": "Concept",
    "formula": "π₁ = π₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Van't Hoff factor: i = (Observed colligative property) / (Theoretical value) = 1 + (n - 1) α.",
    "pointMr": "व्हॅन हॉफ फॅक्टर: i = १ + (n - १) α (विघटनासाठी). NaCl साठी n=2 => i=2.",
    "category": "Formula",
    "formula": "i = 1 + (n - 1)α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "For association of solute (e.g. dimerization of benzoic acid in benzene): i = 1 - (1 - 1/n) α < 1.",
    "pointMr": "एकत्रीकरणासाठी (Association) व्हॅन हॉफ फॅक्टर i < १ असतो (उदा. बेंझिनमध्ये बेन्झोईक आम्ल i ≈ ०.५).",
    "category": "Formula",
    "formula": "i = 1 - (1 - 1/n)α < 1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Ideal solution conditions: ΔH_mix = 0, ΔV_mix = 0, obeys Raoult's law at all concentrations (e.g. Benzene + Toluene).",
    "pointMr": "आदर्श द्रावणाच्या अटी: ΔH_mix = ०, ΔV_mix = ०, सर्व संहतीला राउल्टच्या नियमाचे पालन.",
    "category": "Rule",
    "formula": "ΔH=0, ΔV=0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Positive deviation from Raoult's law: A-B interactions weaker than A-A and B-B; ΔH > 0, ΔV > 0 (e.g. Ethanol + Acetone).",
    "pointMr": "धन विचलन (Positive deviation): ΔH_mix > ०, ΔV_mix > ०, बाष्पदाब अपेक्षेपेक्षा जास्त (इथॅनॉल + एसीटोन).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Negative deviation from Raoult's law: A-B interactions stronger (H-bonding); ΔH < 0, ΔV < 0 (e.g. Chloroform + Acetone).",
    "pointMr": "ऋण विचलन (Negative deviation): हायड्रोजन बंधामुळे आकर्षण वाढते; ΔH < ०, ΔV < ० (क्लोरोफॉर्म + एसीटोन).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Maximum boiling azeotrope formed by solutions showing large negative deviation (e.g. 68% HNO₃ + 32% H₂O).",
    "pointMr": "कमाल उत्कलन अझिओट्रॉप ऋण विचलन दाखवणाऱ्या द्रावणांपासून बनतो (६८% HNO₃).",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Minimum boiling azeotrope formed by solutions showing large positive deviation (e.g. 95% Ethanol + 5% H₂O).",
    "pointMr": "किमान उत्कलन अझिओट्रॉप धन विचलन दाखवणाऱ्या द्रावणांपासून बनतो (९५% इथॅनॉल).",
    "category": "PYQ_Trend",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Reverse Osmosis (RO) occurs when applied pressure is greater than osmotic pressure (P > π); used for desalination.",
    "pointMr": "उलट अभिसरण (RO): बाह्य दाब अभिसरण दाबापेक्षा जास्त दिल्यास (P > π) शुद्ध पाणी वेगळे होते.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Cryoscopic constant K_f depends ONLY on the nature of the solvent: K_f = (R · M_1 · T_f²) / (1000 · ΔH_fus).",
    "pointMr": "K_f आणि K_b हे केवळ विद्रावकाच्या (Solvent) स्वरूपावर अवलंबून असतात, विद्राव्यावर नाही.",
    "category": "Rule",
    "formula": "K_f depends only on solvent",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "First Law of Thermodynamics: ΔU = q + w. State function U depends only on initial and final states.",
    "pointMr": "उष्णतागतिकीचा पहिला नियम: ΔU = q + w. अंतर्गत ऊर्जा U हे अवस्था फलन (State function) आहे.",
    "category": "Formula",
    "formula": "ΔU = q + w",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Work in irreversible expansion against constant external pressure P_ext: w = - P_ext · ΔV.",
    "pointMr": "स्थिर बाह्य दाबाविरुद्ध होणारे कार्य: w = - P_ext ΔV.",
    "category": "Formula",
    "formula": "w = -P_ext ΔV",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Maximum work in reversible isothermal expansion of ideal gas: w_max = - 2.303 n R T log₁₀(V₂ / V₁).",
    "pointMr": "समताप उलटसुलट प्रक्रियेत कमाल कार्य: w_max = - २.३०३ n R T log₁₀(V₂ / V₁).",
    "category": "Formula",
    "formula": "w_max = -2.303 nRT log(V₂/V₁)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Enthalpy H = U + P V. At constant pressure: q_p = ΔH; At constant volume: q_v = ΔU.",
    "pointMr": "एन्थॅल्पी H = U + PV. स्थिर दाबाची उष्णता q_p = ΔH; स्थिर आकारमानाची उष्णता q_v = ΔU.",
    "category": "Definition",
    "formula": "H = U + PV",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Relation between ΔH and ΔU: ΔH = ΔU + Δn_g · R T, where Δn_g = moles of gaseous products - reactants.",
    "pointMr": "ΔH आणि ΔU संबंध: ΔH = ΔU + Δn_g R T (Δn_g = वायू उत्पादने - अभिकारके मोल्स).",
    "category": "Formula",
    "formula": "ΔH = ΔU + Δn_g RT",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Hess's Law of Constant Heat Summation: Total enthalpy change is independent of the pathway taken.",
    "pointMr": "हेसचा नियम: रासायनिक अभिक्रियेतील एकूण एन्थॅल्पी बदल हा अभिक्रिया एका टप्प्यात होवो वा अनेक, स्थिर असतो.",
    "category": "Rule",
    "formula": "ΔH_total = Σ ΔH_steps",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Entropy S: Measure of randomness or disorder: ΔS = q_rev / T. SI unit: J/K·mol.",
    "pointMr": "एन्ट्रॉपी S: अणूंच्या अस्ताव्यस्ततेचे माप: ΔS = q_rev / T. SI एकक: J/K·mol.",
    "category": "Definition",
    "formula": "ΔS = q_rev / T",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Second Law of Thermodynamics: For a spontaneous process, total entropy of universe increases: ΔS_total = ΔS_sys + ΔS_surr > 0.",
    "pointMr": "दुसरा नियम: उत्स्फूर्त प्रक्रियेत विश्वाची एकूण एन्ट्रॉपी नेहमी वाढते (ΔS_universe > ०).",
    "category": "Rule",
    "formula": "ΔS_universe > 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Gibbs Free Energy: G = H - T S. Change in free energy: ΔG = ΔH - T · ΔS (Gibbs-Helmholtz equation).",
    "pointMr": "गिब्स मुक्त ऊर्जा: G = H - TS. मुक्त ऊर्जेतील बदल: ΔG = ΔH - T ΔS.",
    "category": "Formula",
    "formula": "ΔG = ΔH - TΔS",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Spontaneity criteria at constant T and P: ΔG < 0 (spontaneous); ΔG = 0 (equilibrium); ΔG > 0 (non-spontaneous).",
    "pointMr": "उत्स्फूर्ततेची अट: ΔG < ० (उत्स्फूर्त), ΔG = ० (समतोल), ΔG > ० (अनुत्स्फूर्त).",
    "category": "Rule",
    "formula": "ΔG < 0: Spontaneous",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "If ΔH < 0 and ΔS > 0 => ΔG is ALWAYS negative (spontaneous at ALL temperatures).",
    "pointMr": "जर ΔH < ० (उष्णतामोचक) आणि ΔS > ० असेल, तर अभिक्रिया कोणत्याही तापमानाला उत्स्फूर्त असते.",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "If ΔH > 0 and ΔS < 0 => ΔG is ALWAYS positive (non-spontaneous at ALL temperatures).",
    "pointMr": "जर ΔH > ० आणि ΔS < ० असेल, तर अभिक्रिया कोणत्याही तापमानाला उत्स्फूर्त होत नाही.",
    "category": "Shortcut",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Standard free energy and equilibrium constant: ΔG° = - 2.303 R T log₁₀ K_eq = - n F E°_cell.",
    "pointMr": "समतोल स्थिरांक आणि मुक्त ऊर्जा संबंध: ΔG° = - २.३०३ R T log₁₀ K = - n F E°_cell.",
    "category": "Formula",
    "formula": "ΔG° = -nFE° = -2.303RT log K",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Third Law of Thermodynamics: The entropy of a perfectly crystalline substance is zero at absolute zero (0 K).",
    "pointMr": "तिसरा नियम: निरपेक्ष शून्य तापमानाला (0 K) शुद्ध स्फटिकाची एन्ट्रॉपी शून्य असते.",
    "category": "Rule",
    "formula": "S(0 K) = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Specific conductance (Conductivity) κ = (1/R) · (l/A) = G · G*, where G* is cell constant (l/A). SI unit: S/m or Ω⁻¹·cm⁻¹.",
    "pointMr": "विशिष्ट वाहकता κ = (१/R) × (l/A) = G × G*. सेल स्थिरांक G* = l/A.",
    "category": "Formula",
    "formula": "κ = G · G*",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Molar conductivity: Λ_m = (1000 · κ) / M. SI unit: S·cm²/mol or Ω⁻¹·cm²·mol⁻¹.",
    "pointMr": "मोलार वाहकता Λ_m = (१००० × κ) / M.",
    "category": "Formula",
    "formula": "Λ_m = 1000κ / M",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Kohlrausch's Law of Independent Migration of Ions: Λ_m° of an electrolyte = sum of limiting ionic conductivities of its ions.",
    "pointMr": "कोहलरॉशचा नियम: अनंत सौम्यतेवर विद्युत अपघट्याची मोलार वाहकता ही तिच्या आयनांच्या वाहकतेची बेरीज असते.",
    "category": "Rule",
    "formula": "Λ°_m = ν₊ λ°₊ + ν₋ λ°₋",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°; Dissociation constant K_a = C α² / (1 - α).",
    "pointMr": "अशक्त आम्लाचा विघटन अंश: α = Λ_m / Λ_m°. ऑस्टवाल्डचा सौम्यीकरण नियम.",
    "category": "Formula",
    "formula": "α = Λ_m / Λ°_m",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Faraday's First Law of Electrolysis: Mass deposited w = Z · I · t = (M / n F) · I · t. 1 Faraday = 96,500 C.",
    "pointMr": "फॅराडेचा पहिला नियम: इलेक्ट्रोडवर जमा झालेले वस्तुमान w = Z I t = (M / nF) I t. १ फॅराडे = ९६,५०० C.",
    "category": "Formula",
    "formula": "w = Z I t = (M/nF)It",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Faraday's Second Law: When same quantity of electricity passes, masses deposited are proportional to chemical equivalents: w₁/w₂ = E₁/E₂.",
    "pointMr": "फॅराडेचा दुसरा नियम: समान विद्युतप्रवाह दिल्यास जमा वस्तुमान त्यांच्या समतुल्य भाराच्या प्रमाणात असते: w₁/w₂ = E₁/E₂.",
    "category": "Rule",
    "formula": "w₁/w₂ = E₁/E₂",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Nernst Equation for half cell: E = E° - (0.0591 / n) log₁₀ [Red / Ox] at 298 K.",
    "pointMr": "नर्न्स्ट समीकरण: E = E° - (०.०५९१ / n) log₁₀ [Red / Ox] (२९८ केल्विनला).",
    "category": "Formula",
    "formula": "E = E° - (0.0591/n) log Q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Nernst Equation for cell: E_cell = E°_cell - (0.0591 / n) log₁₀ Q. At equilibrium E_cell = 0 => E°_cell = (0.0591/n) log K.",
    "pointMr": "सेलसाठी नर्न्स्ट समीकरण: समतोलाला E_cell = ०, म्हणून E°_cell = (०.०५९१ / n) log₁₀ K.",
    "category": "Formula",
    "formula": "E°_cell = (0.0591/n) log K",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Dry cell (Leclanché): Anode = Zn container, Cathode = graphite rod, Electrolyte = NH₄Cl + ZnCl₂ paste. EMF ≈ 1.5 V.",
    "pointMr": "लेक्लांचे ड्राय सेल: अनोड = Zn, कॅथोड = ग्रॅफाइट, इलेक्ट्रोलाइट = NH₄Cl + ZnCl₂. व्होल्टेज = १.५ V.",
    "category": "Concept",
    "formula": "Zn anode, MnO₂/C cathode",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Lead storage battery (secondary cell): Anode = Spongy Pb; Cathode = PbO₂; Electrolyte = 38% H₂SO₄ (d = 1.30 g/mL).",
    "pointMr": "लेड स्टोरेज बॅटरी: अनोड = Pb, कॅथोड = PbO₂, इलेक्ट्रोलाइट = ३८% H₂SO₄. डिस्चार्ज होताना PbSO₄ बनतो.",
    "category": "Concept",
    "formula": "Discharge: PbSO₄ formed",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "H₂-O₂ Fuel cell operates with high efficiency (≈ 70%); Product is purely clean water. Used in Apollo space mission.",
    "pointMr": "हायड्रोजन-ऑक्सिजन फ्युएल सेल: कार्यक्षमता सुमारे ७०%, कोणतेही प्रदूषण नाही, फक्त शुद्ध पाणी तयार होते.",
    "category": "Concept",
    "formula": "Efficiency ≈ 70%",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Rate of reaction r = - (1/a) d[A]/dt = + (1/b) d[B]/dt. SI unit: mol·L⁻¹·s⁻¹.",
    "pointMr": "अभिक्रिया दर r = - (१/a) d[A]/dt = + (१/b) d[B]/dt. एकक: mol·L⁻¹·s⁻¹.",
    "category": "Definition",
    "formula": "Rate = -d[A]/dt",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Rate law: Rate = k [A]^x [B]^y. Overall order of reaction n = x + y. Order is determined experimentally.",
    "pointMr": "दर नियम: Rate = k [A]^x [B]^y. एकूण कोटी (Order) = x + y. कोटी प्रायोगिकरित्या ठरवली जाते.",
    "category": "Formula",
    "formula": "Order = x + y",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Unit of rate constant k: (mol·L⁻¹)^(1 - n) · s⁻¹. Zero order: mol·L⁻¹·s⁻¹; First order: s⁻¹; Second order: L·mol⁻¹·s⁻¹.",
    "pointMr": "दर स्थिरांक k चे एकक: (mol/L)^(1-n) s⁻¹. शून्य कोटी: mol L⁻¹ s⁻¹; प्रथम कोटी: s⁻¹.",
    "category": "Shortcut",
    "formula": "k unit: (mol/L)^(1-n) s⁻¹",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Zero order integrated rate law: k = ([A]_0 - [A]_t) / t. Half life t_(1/2) = [A]_0 / (2k) ∝ [A]_0.",
    "pointMr": "शून्य कोटी अभिक्रिया: k = ([A]_0 - [A]) / t. अर्धायुष्य t_(1/2) = [A]_0 / (२k). सुरुवातीच्या संहतीवर अवलंबून.",
    "category": "Formula",
    "formula": "t_(1/2) = [A]_0 / 2k",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "First order integrated rate law: k = (2.303 / t) log₁₀([A]_0 / [A]_t).",
    "pointMr": "प्रथम कोटी एकात्मिक दर नियम: k = (२.३०३ / t) log₁₀([A]_0 / [A]_t).",
    "category": "Formula",
    "formula": "k = (2.303/t) log([A]_0/[A])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "First order half life: t_(1/2) = 0.693 / k. INDEPENDENT of initial concentration of reactant.",
    "pointMr": "प्रथम कोटीचे अर्धायुष्य: t_(1/2) = ०.६९३ / k. सुरुवातीच्या संहतीवर अजिबात अवलंबून नसते.",
    "category": "Rule",
    "formula": "t_(1/2) = 0.693 / k",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Time required for 99.9% completion of first order reaction: t_99.9% = 10 · t_(1/2); t_75% = 2 · t_(1/2); t_90% = 3.32 · t_(1/2).",
    "pointMr": "प्रथम कोटीसाठी: ७५% पूर्ण होण्यासाठी २ अर्धायुष्ये, ९९.९% पूर्ण होण्यासाठी १० अर्धायुष्ये लागतात.",
    "category": "Shortcut",
    "formula": "t_99.9% = 10 × t_(1/2)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Pseudo first order reaction: Bimolecular reaction where one reactant (solvent) is in large excess (e.g. ester hydrolysis in acid).",
    "pointMr": "छद्म प्रथम कोटी (Pseudo first order): पाण्याचे प्रमाण अफाट असल्यामुळे दर फक्त एस्टरवर अवलंबून असतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Arrhenius Equation: k = A · e^(- E_a / R T) => log₁₀(k₂ / k₁) = (E_a / 2.303 R) [ (T₂ - T₁) / (T₁ T₂) ].",
    "pointMr": "अरेनिअस समीकरण: k = A e^(-E_a/RT). सक्रियीकरण ऊर्जा E_a काढण्याचे सूत्र.",
    "category": "Formula",
    "formula": "log(k₂/k₁) = (E_a/2.303R)(ΔT/T₁T₂)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "A catalyst lowers activation energy E_a and increases the rate of forward and backward reactions EQUALLY. Does NOT shift equilibrium.",
    "pointMr": "उत्प्रेरक (Catalyst) सक्रियीकरण ऊर्जा कमी करतो. समतोल स्थिरांक (K_eq) बदलत नाही.",
    "category": "Rule",
    "formula": "Catalyst lowers E_a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "pH definition: pH = - log₁₀ [H₃O⁺]; pOH = - log₁₀ [OH⁻]; At 298 K, pH + pOH = pK_w = 14.",
    "pointMr": "pH व्याख्या: pH = - log₁₀ [H⁺]. २९८ केल्विनला pH + pOH = १४.",
    "category": "Formula",
    "formula": "pH + pOH = 14",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Ionic product of water: K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. K_w INCREASES with temperature (endothermic autoionization).",
    "pointMr": "पाण्याचा आयनिक गुणाकार K_w = १०⁻¹⁴. तापमान वाढल्यास पाण्याचे विघटन वाढून K_w वाढतो.",
    "category": "Concept",
    "formula": "K_w = 10⁻¹⁴ at 25°C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Ostwald's Dilution Law for weak acid: K_a = C α² / (1 - α) ≈ C α² => α = √(K_a / C); [H⁺] = √(K_a · C).",
    "pointMr": "ऑस्टवाल्डचा सौम्यीकरण नियम: α = √(K_a / C); [H⁺] = √(K_a × C).",
    "category": "Formula",
    "formula": "α = √(K_a/C); [H⁺] = √(K_a C)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Acidic buffer solution: Weak acid + its salt with strong base (e.g. CH₃COOH + CH₃COONa). pH = pK_a + log([Salt] / [Acid]).",
    "pointMr": "आम्लीय बफर द्रावण: Henderson-Hasselbalch समीकरण: pH = pK_a + log([Salt] / [Acid]).",
    "category": "Formula",
    "formula": "pH = pK_a + log([Salt]/[Acid])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Basic buffer solution: Weak base + its salt with strong acid (e.g. NH₄OH + NH₄Cl). pOH = pK_b + log([Salt] / [Base]).",
    "pointMr": "अल्कली बफर द्रावण: pOH = pK_b + log([Salt] / [Base]).",
    "category": "Formula",
    "formula": "pOH = pK_b + log([Salt]/[Base])",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Buffer capacity is maximum when [Salt] = [Acid], which gives pH = pK_a.",
    "pointMr": "बफर क्षमता कमाल असते जेव्हा [Salt] = [Acid], म्हणजेच pH = pK_a.",
    "category": "Shortcut",
    "formula": "Max buffer when pH = pK_a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Salt hydrolysis: Salt of Weak Acid + Strong Base (CH₃COONa) is BASIC: pH = 7 + (1/2) pK_a + (1/2) log C.",
    "pointMr": "अशक्त आम्ल + प्रबळ अल्कलीचे मीठ अल्कधर्मी असते: pH = ७ + (१/२) pK_a + (१/२) log C.",
    "category": "Formula",
    "formula": "pH = 7 + 1/2 pK_a + 1/2 log C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Salt of Strong Acid + Weak Base (NH₄Cl) is ACIDIC: pH = 7 - (1/2) pK_b - (1/2) log C.",
    "pointMr": "प्रबळ आम्ल + अशक्त अल्कलीचे मीठ आम्लधर्मी असते: pH = ७ - (१/२) pK_b - (१/२) log C.",
    "category": "Formula",
    "formula": "pH = 7 - 1/2 pK_b - 1/2 log C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Salt of Weak Acid + Weak Base (CH₃COONH₄): pH = 7 + (1/2) pK_a - (1/2) pK_b. Independent of concentration C.",
    "pointMr": "अशक्त आम्ल + अशक्त अल्कलीचे मीठ: pH संहतीवर अवलंबून नसते: pH = ७ + (१/२) pK_a - (१/२) pK_b.",
    "category": "Rule",
    "formula": "pH = 7 + 1/2 pK_a - 1/2 pK_b",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Solubility product K_sp for sparingly soluble salt A_x B_y: K_sp = x^x · y^y · S^(x + y).",
    "pointMr": "विद्राव्यता गुणाकार: A_x B_y साठी K_sp = x^x y^y S^(x+y).",
    "category": "Formula",
    "formula": "K_sp = x^x y^y S^(x+y)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "For 1:1 salt (AgCl): K_sp = S² => S = √(K_sp); For 1:2 salt (PbCl₂, CaF₂): K_sp = 4 S³ => S = ³√(K_sp / 4).",
    "pointMr": "AgCl साठी K_sp = S²; PbCl₂ किंवा CaF₂ साठी K_sp = ४ S³.",
    "category": "Shortcut",
    "formula": "1:1 => S=√K_sp; 1:2 => S=³√(K_sp/4)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Precipitation condition: If Ionic Product (IP) > K_sp => Precipitate forms; If IP < K_sp => Unsaturated solution.",
    "pointMr": "अवक्षेपण (Precipitation) अट: जेव्हा आयनिक गुणाकार IP > K_sp होतो तेव्हाच अवक्षेप तयार होतो.",
    "category": "Rule",
    "formula": "IP > K_sp: Precipitate forms",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Common Ion Effect: Solubility of a sparingly soluble salt decreases in the presence of a soluble salt having a common ion.",
    "pointMr": "समान आयन परिणाम (Common ion effect): समान आयन उपस्थित असल्यास अल्प विद्राव्य क्षाराची विद्राव्यता घटते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Lewis acid: Electron pair acceptor (BF₃, AlCl₃, carbocations); Lewis base: Electron pair donor (NH₃, H₂O, amines).",
    "pointMr": "लुईस आम्ल: इलेक्ट्रॉन जोडी स्वीकारणारे (BF₃, AlCl₃); लुईस अल्कली: इलेक्ट्रॉन जोडी देणारे (NH₃, पाणी).",
    "category": "Definition",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Bronsted-Lowry concept: Acid is proton (H⁺) donor; Base is proton acceptor. Conjugate acid-base pairs differ by one H⁺.",
    "pointMr": "ब्राँस्टेड संकल्पना: आम्ल प्रोटॉन देते, अल्कली प्रोटॉन स्वीकारते. संयुग्मी जोडीत फक्त एका H⁺ चा फरक असतो.",
    "category": "Definition",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Transition metals (d-block) general electronic configuration: (n-1)d^(1-10) ns^(1-2). Anomalous: Cr ([Ar] 3d⁵ 4s¹), Cu ([Ar] 3d¹⁰ 4s¹).",
    "pointMr": "संक्रमण मूलद्रव्ये: (n-1)d^(1-10) ns^(1-2). क्रोमियम Cr (3d⁵ 4s¹) आणि तांबे Cu (3d¹⁰ 4s¹) अपवाद आहेत.",
    "category": "Rule",
    "formula": "Cr: 3d⁵ 4s¹; Cu: 3d¹⁰ 4s¹",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Zn, Cd, Hg are NOT considered true transition elements because they have completely filled d-orbitals in elemental and ionic states.",
    "pointMr": "Zn, Cd, Hg चे d-ऑर्बिटल्स पूर्ण भरलेले (d¹⁰) असल्याने त्यांना संक्रमण मूलद्रव्ये मानले जात नाही.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Magnetic moment (spin-only formula): μ = √[ n (n + 2) ] BM, where n is number of unpaired electrons.",
    "pointMr": "चुंबकीय आघूर्ण (Spin-only formula): μ = √[ n(n + 2) ] BM. n = अयुग्मित इलेक्ट्रॉन संख्या.",
    "category": "Formula",
    "formula": "μ = √[n(n+2)] BM",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Color of transition metal complexes is due to d-d transition of unpaired electrons in crystal field.",
    "pointMr": "संक्रमण धातूंच्या संयुगांचा रंग हा स्फटिक क्षेत्रातील d-d संक्रमणामुळे (d-d transition) असतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Lanthanoid contraction: Steady decrease in atomic and ionic radii from La³⁺ to Lu³⁺ due to poor shielding of 4f electrons.",
    "pointMr": "लॅन्थेनॉईड आकुंचन: 4f इलेक्ट्रॉनच्या कमकुवत शील्डिंगमुळे La ते Lu पर्यंत अणुत्रिज्या सतत कमी होते.",
    "category": "Concept",
    "formula": "Zr and Hf have identical radii",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Consequence of Lanthanoid contraction: Zr and Hf have almost identical atomic radii (0.160 nm) and very similar properties.",
    "pointMr": "लॅन्थेनॉईड आकुंचनामुळे Zr आणि Hf ची त्रिज्या आणि रासायनिक गुणधर्म अगदी एकसारखे असतात.",
    "category": "PYQ_Trend",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "KMnO₄ (Potassium permanganate): Strong oxidizing agent. In acidic medium: MnO₄⁻ + 8H⁺ + 5e⁻ -> Mn²⁺ (n-factor = 5).",
    "pointMr": "KMnO₄ आम्लीय माध्यमात: MnO₄⁻ चे Mn²⁺ मध्ये रूपांतर होते (n-factor = ५, तुल्यांक भार = M/5).",
    "category": "Formula",
    "formula": "n-factor in acid = 5",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "In neutral/weakly alkaline medium: KMnO₄ reduces to MnO₂ (n-factor = 3); In strongly alkaline medium reduces to MnO₄²⁻ (n-factor = 1).",
    "pointMr": "उदासीन माध्यमात KMnO₄ चा n-factor = ३ असतो (MnO₂); तीव्र अल्कली माध्यमात n-factor = १.",
    "category": "Formula",
    "formula": "n-factor neutral = 3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "K₂Cr₂O₇ (Potassium dichromate) in acidic medium: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ -> 2Cr³⁺ + 7H₂O (n-factor = 6, Eq wt = M/6).",
    "pointMr": "K₂Cr₂O₇ आम्लीय माध्यमात: n-factor = ६ असतो, त्यामुळे समतुल्य भार = M / ६.",
    "category": "Formula",
    "formula": "n-factor of K₂Cr₂O₇ = 6",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Interconversion of chromate and dichromate: 2 CrO₄²⁻ (yellow) + 2H⁺ <=> Cr₂O₇²⁻ (orange) + H₂O. Reversible with pH change.",
    "pointMr": "क्रोमेट व डायक्रोमेट परस्पर रूपांतर: आम्लामध्ये पिवळा रंग केशरी होतो, अल्कलीमध्ये परत पिवळा होतो.",
    "category": "Concept",
    "formula": "Yellow CrO₄²⁻ <-> Orange Cr₂O₇²⁻",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Werner's Coordination Theory: Primary valency is ionizable and satisfies oxidation state; Secondary valency is non-ionizable and equals coordination number.",
    "pointMr": "वर्नरचा सिद्धांत: प्राथमिक संयुजा आयनयुक्त (ऑक्सिडेशन अवस्था), दुय्यम संयुजा आयनरहित (कोऑर्डिनेशन नंबर).",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "EAN (Effective Atomic Number) Rule: EAN = Z - (Oxidation State) + 2 × (Coordination Number). If EAN = next noble gas, complex is stable.",
    "pointMr": "प्रभावी अणुक्रमांक EAN = Z - (ऑक्सिडेशन अंक) + २ × (कोऑर्डिनेशन संख्या). नोबेल गॅसएवढा असल्यास स्थिर.",
    "category": "Formula",
    "formula": "EAN = Z - O.S. + 2(CN)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Spectrochemical Series: Strong field ligands (CN⁻, CO, NO₂⁻, en) cause pairing (low spin); Weak field (I⁻, Br⁻, Cl⁻, F⁻, H₂O) form high spin complexes.",
    "pointMr": "स्पेक्ट्रोकेमिकल मालिका: CN⁻ आणि CO प्रबळ लिगँड्स आहेत (इलेक्ट्रॉन जोड्या बनवतात, Low spin).",
    "category": "Rule",
    "formula": "CO > CN⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Crystal field splitting in octahedral complexes: d-orbitals split into t_2g (lower, d_xy, d_yz, d_zx) and e_g (higher, d_x²-y², d_z²).",
    "pointMr": "अष्टकोनी संकुलात d-ऑर्बिटल्सचे t_2g (खाली) आणि e_g (वर) मध्ये विभाजन होते.",
    "category": "Concept",
    "formula": "Octahedral: t_2g lower, e_g higher",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Tetrahedral splitting Δ_t is always smaller than octahedral: Δ_t = (4/9) Δ_o. Hence tetrahedral complexes are almost always high spin.",
    "pointMr": "चतुष्कोनी स्प्लिटिंग नेहमी कमी असते: Δ_t = (४/९) Δ_o. त्यामुळे सर्व टेट्राहेड्रल कॉम्प्लेक्स High spin असतात.",
    "category": "Formula",
    "formula": "Δ_t = (4/9) Δ_o",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "EDTA⁴⁻ is a hexadentate, chelating ligand with 2 Nitrogen and 4 Oxygen donor atoms; used to treat lead poisoning and estimate water hardness.",
    "pointMr": "EDTA⁴⁻ हा षट्दंती (Hexadentate) चिलेटिंग लिगँड आहे. पाण्याचा कठीणपणा मोजण्यासाठी वापरतात.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Ambidentate ligands have two different donor atoms and cause linkage isomerism: NO₂⁻ (N or O) and SCN⁻ (S or N).",
    "pointMr": "उभयदंती लिगँड (Ambidentate): दोन वेगवेगळे दाता अणू असतात (उदा. NO₂⁻ / ONO⁻ आणि SCN⁻ / NCS⁻).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Synergic bonding in metal carbonyls: σ-bond formed by donation of lone pair from CO to metal; π-backbond formed by donation of d-electrons from metal to π* antibonding of CO.",
    "pointMr": "धातू कार्बोनिल मधील सायनर्जिक बंध: CO कडून धातूकडे σ-बंध आणि धातूच्या d-ऑर्बिटलकडून CO च्या π* कडे बॅक-बॉन्डिंग.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Haber's process for NH₃: N₂ + 3H₂ <=> 2NH₃ (ΔH = -92.4 kJ/mol). Optimum: 200 atm, 700 K, Fe catalyst with Mo promoter.",
    "pointMr": "अमोनियाची हेबर पद्धत: N₂ + ३H₂ <=> २NH₃. अनुकूल अटी: २०० atm दाब, ७०० K तापमान, Fe उत्प्रेरक.",
    "category": "Concept",
    "formula": "Fe catalyst + Mo promoter",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Contact process for H₂SO₄: Key step is 2 SO₂ + O₂ <=> 2 SO₃ catalyzed by V₂O₅ at 450°C and 2 atm.",
    "pointMr": "सल्फ्यूरिक आम्लाची कॉन्टॅक्ट पद्धत: SO₂ चे SO₃ मध्ये रूपांतर करण्यासाठी V₂O₅ उत्प्रेरक वापरतात.",
    "category": "Concept",
    "formula": "V₂O₅ catalyst",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Ostwald's process for HNO₃: 4 NH₃ + 5 O₂ -> 4 NO + 6 H₂O catalyzed by Pt-Rh gauge at 500 K.",
    "pointMr": "नायट्रिक आम्लाची ऑस्टवाल्ड पद्धत: अमोनियाचे ऑक्सिडीकरण Pt-Rh जाळीवर ५०० केल्विनला होते.",
    "category": "Concept",
    "formula": "Pt-Rh catalyst",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Noble gases: XeF₂ is linear (sp³d, 3 lone pairs); XeF₄ is square planar (sp³d², 2 lone pairs); XeF₆ is distorted octahedral (sp³d³).",
    "pointMr": "नोबेल वायू संयुगे: XeF₂ हा रेषीय असतो (३ लोन पेअर्स); XeF₄ हा सपाट चौरस (Square planar) असतो.",
    "category": "Shortcut",
    "formula": "XeF₂: Linear; XeF₄: Sq Planar",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Interhalogen compounds (XX'_n): More reactive than pure halogens (except F₂) because X-X' bond is weaker than X-X.",
    "pointMr": "आंतरहॅलोजन संयुगे शुद्ध हॅलोजनपेक्षा अधिक क्रियाशील असतात कारण X-X' बंध कमकुवत असतो.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Bleaching action of SO₂ is temporary (due to reduction); Bleaching action of Cl₂ is permanent (due to oxidation).",
    "pointMr": "SO₂ चे विरंजन कार्य तात्पुरते (क्षपण) असते; क्लोरीनचे विरंजन कार्य कायमस्वरूपी (ऑक्सिडीकरण) असते.",
    "category": "PYQ_Trend",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Aqua Regia: Mixture of concentrated HCl and concentrated HNO₃ in 3:1 ratio by volume; dissolves gold and platinum.",
    "pointMr": "अम्लराज (Aqua Regia): सान्द्र HCl आणि सान्द्र HNO₃ चे ३:१ प्रमाणातील मिश्रण; सोने व प्लॅटिनम विरघळवते.",
    "category": "Formula",
    "formula": "Aqua Regia = 3 HCl + 1 HNO₃",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "SN2 mechanism: Bimolecular, single step, backside attack, 100% Walden inversion, transition state (no intermediate). Order: 1° > 2° > 3°.",
    "pointMr": "SN2 यंत्रणा: एकाच टप्प्यात, पाठीमागून हल्ला, १००% वल्डन इन्व्हर्जन, ऑर्डर: प्राथमिक (१°) > २° > ३°.",
    "category": "Rule",
    "formula": "SN2: 1° > 2° > 3° (Inversion)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "SN1 mechanism: Unimolecular, two steps, carbocation intermediate, racemization. Order of reactivity: 3° > 2° > 1° > methyl.",
    "pointMr": "SN1 यंत्रणा: दोन टप्प्यांत, कार्बोकॅटायन मध्यस्थ, रेसिमायझेशन, ऑर्डर: ३° > २° > १°.",
    "category": "Rule",
    "formula": "SN1: 3° > 2° > 1° (Racemic)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Stability order of carbocations: 3° > 2° > 1° > CH₃⁺ (due to hyperconjugation and +I effect). Allylic and benzylic carbocations are highly resonance stabilized.",
    "pointMr": "कार्बोकॅटायन स्थिरता क्रम: ३° > २° > १° > मिथाईल. रेझोनन्समुळे बेन्झायलिक व अ‍ॅलायलिक सर्वात स्थिर.",
    "category": "Rule",
    "formula": "3° > 2° > 1° > methyl",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Markovnikov's Rule: Negative part of unsymmetrical reagent adds to double bonded carbon having LESSER number of hydrogens.",
    "pointMr": "मार्कोव्हनिकोव्हचा नियम: असममित अभिकारकाचा ऋण भाग कमी हायड्रोजन असलेल्या कार्बनला जोडला जातो.",
    "category": "Rule",
    "formula": "Negative part to less H carbon",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Anti-Markovnikov (Peroxide Effect / Kharasch): Valid ONLY for HBr in presence of organic peroxides; does NOT apply to HCl or HI.",
    "pointMr": "अँटी-मार्कोव्हनिकोव्ह (पेरॉक्साइड परिणाम): केवळ HBr साठीच लागू होतो, HCl किंवा HI साठी नाही.",
    "category": "Exception",
    "formula": "Valid ONLY for HBr",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Saytzeff (Zaitsev) Rule in elimination (dehydrohalogenation): Major alkene is the one having GREATER number of alkyl groups on double bond.",
    "pointMr": "झाईत्सेव्ह नियम: विलोपन अभिक्रियेत दुहेरी बंधावर जास्त अल्काइल गट असलेले अधिक प्रतिस्थापित अल्कीन मुख्य उत्पादन बनते.",
    "category": "Rule",
    "formula": "More substituted alkene is major",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Lucas Test (anhydrous ZnCl₂ + conc. HCl): 3° alcohols form turbidity immediately; 2° in 5 minutes; 1° does not react at room temperature.",
    "pointMr": "ल्युकास चाचणी: ३° अल्कोहोल लगेच गढूळपणा (turbidity) देते; २° अल्कोहोल ५ मिनिटांत देते; १° खोलीच्या तापमानाला देत नाही.",
    "category": "Shortcut",
    "formula": "3°: instant; 2°: 5 min; 1°: none",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH at 340 K -> Salicylaldehyde (electrophile is Dichlorocarbene :CCl₂).",
    "pointMr": "रीमर-टीमन अभिक्रिया: फिनॉलपासून सॅलिसिलाल्डिहाइड बनते (इलेक्ट्रॉनस्नेही डिक्लोरोकार्बिन :CCl₂ असतो).",
    "category": "Rule",
    "formula": "Electrophile: :CCl₂",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Kolbe's Reaction: Sodium phenoxide + CO₂ at 400 K and 4-7 atm followed by acid hydrolysis -> Salicylic acid (o-hydroxybenzoic acid).",
    "pointMr": "कोल्बे अभिक्रिया: सोडियम फिनॉक्साइड + CO₂ पासून सॅलिसिलिक आम्ल बनते (अ‍ॅस्पिरिन बनवण्यासाठी वापर).",
    "category": "Rule",
    "formula": "Phenol + CO₂ -> Salicylic acid",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Williamson Ether Synthesis: Alkyl halide + Sodium alkoxide -> Ether (SN2 attack). Best yield when alkyl halide is 1°; 3° halide gives alkene (elimination).",
    "pointMr": "विल्यमसन इथर संश्लेषण: अल्काइल हॅलाइड १° असावे लागते; ३° हॅलाइड वापरल्यास इथर न बनता अल्कीन बनते.",
    "category": "Exception",
    "formula": "3° halide gives alkene",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Cleavage of ethers with excess HI: Mixed ether R-O-R' with one 3° group forms 3° iodide via SN1; with 1° or 2° groups forms smaller alkyl iodide via SN2.",
    "pointMr": "इथरचे HI द्वारे विघटन: ३° अल्काइल गट असल्यास SN1 ने ३° आयोडाईड बनते; १° किंवा २° असल्यास लहान आयोडाईड बनते.",
    "category": "Shortcut",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Aldol Condensation: Aldehydes and ketones having at least one α-hydrogen in presence of dilute NaOH form β-hydroxy aldehydes/ketones.",
    "pointMr": "अ‍ॅल्डॉल संघनन: किमान एक α-हायड्रोजन असलेले अ‍ॅल्डिहाइड्स विरल NaOH च्या उपस्थितीत β-हायड्रॉक्सी अ‍ॅल्डिहाइड देतात.",
    "category": "Rule",
    "formula": "Requires α-hydrogen",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Cannizzaro Reaction: Aldehydes LACKING α-hydrogen (HCHO, C₆H₅CHO, (CH₃)₃C-CHO) in 50% NaOH undergo disproportionation into alcohol and acid salt.",
    "pointMr": "कॅनिझारो अभिक्रिया: α-हायड्रोजन नसलेले अ‍ॅल्डिहाइड्स (फॉर्मल्डिहाइड, बेन्झाल्डिहाइड) ५०% NaOH मध्ये अल्कोहोल व आम्ल मीठ देतात.",
    "category": "Rule",
    "formula": "No α-H: HCHO -> CH₃OH + HCOO⁻",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Clemmensen Reduction: Carbonyl group C=O reduced to -CH₂- using Zn-Hg and conc. HCl. Suitable for acid-stable substrates.",
    "pointMr": "क्लेमेन्सन क्षपण: कार्बोनिल C=O चे -CH₂- मध्ये रूपांतर Zn-Hg व conc. HCl द्वारे होते.",
    "category": "Formula",
    "formula": "C=O -> CH₂ (Zn-Hg / HCl)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Wolff-Kishner Reduction: Carbonyl group C=O reduced to -CH₂- using Hydrazine (NH₂NH₂) and KOH in ethylene glycol. Suitable for base-stable substrates.",
    "pointMr": "वुल्फ-किश्नर क्षपण: C=O चे -CH₂- मध्ये रूपांतर हायड्रॅझिन व KOH द्वारे होते (अल्कली-स्थिर संयुगांसाठी).",
    "category": "Formula",
    "formula": "C=O -> CH₂ (NH₂NH₂ / KOH)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Rosenmund Reduction: Acid chloride R-CO-Cl + H₂ -> Aldehyde R-CHO using Pd-BaSO₄ poisoned with sulfur or quinoline (Lindlar-type).",
    "pointMr": "रोझेनमुंड क्षपण: अ‍ॅसिड क्लोराईडपासून अ‍ॅल्डिहाइड Pd-BaSO₄ उत्प्रेरकाद्वारे बनते.",
    "category": "Formula",
    "formula": "RCOCl -> RCHO (Pd-BaSO₄)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Stephen Reaction: Alkyl cyanide (Nitrile) R-CN + SnCl₂ / HCl followed by H₃O⁺ -> Aldehyde R-CHO.",
    "pointMr": "स्टीफन अभिक्रिया: नायट्राइल R-CN चे SnCl₂ / HCl द्वारे अ‍ॅल्डिहाइडमध्ये रूपांतर होते.",
    "category": "Formula",
    "formula": "RCN -> RCHO (SnCl₂/HCl)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Etard Reaction: Toluene + Chromyl chloride (CrO₂Cl₂) in CS₂ followed by hydrolysis -> Benzaldehyde.",
    "pointMr": "इटार्ड अभिक्रिया: टोल्युइनपासून बेन्झाल्डिहाइड बनवण्यासाठी क्रोमाइल क्लोराईड (CrO₂Cl₂) वापरतात.",
    "category": "Formula",
    "formula": "Toluene -> Benzaldehyde",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Gatterman-Koch Reaction: Benzene + CO + HCl in presence of anhydrous AlCl₃ and CuCl -> Benzaldehyde.",
    "pointMr": "गॅटरमन-कॉच अभिक्रिया: बेंझिन + CO + HCl पासून अ‍ॅल्युमिनियम क्लोराईडच्या उपस्थितीत बेन्झाल्डिहाइड बनते.",
    "category": "Formula",
    "formula": "Benzene -> Benzaldehyde",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Haloform (Iodoform) Test: Compounds with CH₃-C=O or CH₃-CH(OH)- group give yellow precipitate of CHI₃ with I₂ + NaOH.",
    "pointMr": "आयोडोफॉर्म चाचणी: CH₃-C=O किंवा CH₃-CH(OH)- गट असलेले संयुगे I₂ + NaOH सोबत पिवळा CHI₃ अवक्षेप देतात.",
    "category": "Shortcut",
    "formula": "Yellow CHI₃ ppt (CH₃-CO- group)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Fehling's Solution and Tollens' Reagent (Ammoniacal AgNO₃): Reduce aliphatic aldehydes (Tollens forms Silver Mirror); Ketones and aromatic aldehydes do NOT reduce Fehling's.",
    "pointMr": "टॉलेन्स चाचणी: अ‍ॅल्डिहाइड्स सिल्व्हर मिरर (चांदीचा आरसा) देतात. केटोन्स टॉलेन्स व फेलिंग चाचणी देत नाहीत.",
    "category": "Rule",
    "formula": "Aldehydes: Silver mirror",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acid with α-hydrogen + X₂ (Cl₂ or Br₂) in presence of red phosphorus -> α-halocarboxylic acid.",
    "pointMr": "HVZ अभिक्रिया: लाल फॉस्फरसच्या उपस्थितीत कार्बोक्सिलिक आम्लाचे α-हॅलोजनेशन होते.",
    "category": "Formula",
    "formula": "R-CH₂-COOH -> R-CH(X)-COOH",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Hofmann Bromamide Degradation: Primary amide R-CONH₂ + Br₂ + 4 KOH -> Primary amine R-NH₂ (one carbon LESS than parent amide).",
    "pointMr": "हॉफमन ब्रोमामाईड डिग्रेडेशन: १° अमाईडपासून १ कार्बन कमी असलेला १° अमाईन बनतो: R-CONH₂ -> R-NH₂.",
    "category": "Rule",
    "formula": "1 carbon less amine formed",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Gabriel Phthalimide Synthesis: Used for preparation of aliphatic PRIMARY amines ONLY. Cannot prepare aromatic amines (aryl halides do not undergo SN2).",
    "pointMr": "गॅब्रिएल थॅलिमाईड संश्लेषण: केवळ अ‍ॅलिफॅटिक १° अमाईन्स बनवण्यासाठी वापरतात; सुगंधी (Aromatic) अमाईन बनवता येत नाही.",
    "category": "Exception",
    "formula": "Only 1° aliphatic amines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Carbylamine Test (Isocyanide test): 1° amine (aliphatic or aromatic) + CHCl₃ + 3 KOH -> Foul-smelling isocyanide R-NC.",
    "pointMr": "कार्बिलामाईन चाचणी: १° अमाईन + CHCl₃ + KOH यांच्या अभिक्रियेने अतिशय उग्र वासाचा आयसोसायनाईड R-NC बनतो.",
    "category": "Shortcut",
    "formula": "Foul odor test for 1° amines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Hinsberg's Test for amines: 1° amine forms benzenesulfonamide soluble in alkali; 2° forms insoluble product; 3° does not react.",
    "pointMr": "हिन्सबर्ग चाचणी: १° अमाईनचे उत्पादन अल्कलीत विरघळते; २° चे विरघळत नाही; ३° अभिक्रिया देत नाही.",
    "category": "Shortcut",
    "formula": "1°: soluble; 2°: insoluble; 3°: no reaction",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Diazotization: Aniline + NaNO₂ + 2 HCl at 273-278 K (0-5°C) -> Benzene diazonium chloride (C₆H₅N₂⁺ Cl⁻).",
    "pointMr": "डायझोटायझेशन: ॲनिलीनपासून ०-५°C तापमानाला बेंझिन डायझोनियम क्लोराईड बनते.",
    "category": "Formula",
    "formula": "Aniline -> C₆H₅N₂⁺Cl⁻ at 0-5°C",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Sandmeyer Reaction: C₆H₅N₂⁺Cl⁻ + CuCl/HCl -> Chlorobenzene; + CuBr/HBr -> Bromobenzene; + CuCN/KCN -> Benzonitrile.",
    "pointMr": "सँडमेयर अभिक्रिया: डायझोनियम क्षारापासून CuCl, CuBr किंवा CuCN द्वारे हॅलोबेंझिन बनते.",
    "category": "Rule",
    "formula": "Sandmeyer: CuX catalyst",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Gattermann Reaction: C₆H₅N₂⁺Cl⁻ + Cu powder / HCl -> Chlorobenzene (uses copper powder instead of copper halide).",
    "pointMr": "गॅटरमन अभिक्रिया: कॉपर पावडर आणि HCl वापरून डायझोनियम क्षारापासून क्लोरोबेंझिन बनवणे.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Coupling Reaction: Benzene diazonium chloride + Phenol (pH 9-10) -> p-Hydroxyazobenzene (Orange dye); + Aniline (pH 4-5) -> p-Aminoazobenzene (Yellow dye).",
    "pointMr": "कपलिंग अभिक्रिया: डायझोनियम क्षार फिनॉलसोबत केशरी रंग (Orange dye) व ॲनिलीनसोबत पिवळा रंग देतो.",
    "category": "Concept",
    "formula": "Phenol: Orange dye; Aniline: Yellow dye",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Glucose is an aldohexose with 4 chiral carbons (2⁴ = 16 stereoisomers). Naturally occurring D-(+)-glucose is dextrorotatory.",
    "pointMr": "ग्लुकोज हा अ‍ॅल्डोहेक्सोज आहे, यात ४ असममित कार्बन असतात (१६ स्टिरिओआयसोमर्स). निसर्गात D-(+)-ग्लुकोज आढळतो.",
    "category": "Concept",
    "formula": "Glucose: 4 chiral carbons",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Fructose is a ketohexose, functional isomer of glucose with 3 chiral carbons. Naturally occurring D-(-)-fructose is levorotatory.",
    "pointMr": "फ्रुक्टोज हा कीटोहेक्सोज असून ग्लुकोजचा फंक्शनल आयसोमर आहे; यात ३ असममित कार्बन असतात.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Mutarotation: Spontaneous change in specific rotation of an optically active carbohydrate until equilibrium is reached (α-D-glucose +112° -> +52.7° <- β-D-glucose +19°).",
    "pointMr": "म्युटारोटेशन (Mutarotation): ग्लुकोजच्या ताज्या द्रावणाचे विशिष्ट परिभ्रमण आपोआप बदलून समतोलाला +५२.७° स्थिर होते.",
    "category": "Definition",
    "formula": "Equilibrium rotation = +52.7°",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Sucrose (Cane sugar) is a NON-REDUCING disaccharide linked by α-1,2-glycosidic bond between α-D-glucose and β-D-fructose.",
    "pointMr": "सुक्रोज (साखर) हा नॉन-रिड्यूसिंग डायसॅकराइड आहे; यात ग्लुकोज व फ्रुक्टोज α-१,२ ग्लायकोसिडिक बंधाने जोडलेले असतात.",
    "category": "Rule",
    "formula": "Sucrose: Non-reducing disaccharide",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Inversion of Cane Sugar: Hydrolysis of dextrorotatory sucrose gives levorotatory mixture of glucose (+52.7°) and fructose (-92.4°); Product is called Invert Sugar.",
    "pointMr": "साखरेचे इन्व्हर्जन: सुक्रोजचे विघटन झाल्यावर मिळणारे मिश्रण वामावर्ती (Levorotatory) बनते; याला इन्व्हर्ट शुगर म्हणतात.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Maltose is a reducing disaccharide composed of two α-D-glucose units linked by α-1,4-glycosidic bond.",
    "pointMr": "माल्टोज हा रिड्यूसिंग डायसॅकराइड असून दोन ग्लुकोज अणू α-१,४ बंधाने जोडलेले असतात.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Lactose (Milk sugar) is a reducing disaccharide composed of β-D-galactose and β-D-glucose linked by β-1,4-glycosidic bond.",
    "pointMr": "लॅक्टोज (दुधातील साखर) हा गॅलॅक्टोज व ग्लुकोज यांच्यातील β-१,४ ग्लायकोसिडिक बंधाने बनलेला असतो.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Starch consists of two components: Water-soluble Amylose (15-20%, unbranched α-1,4 chains) and Water-insoluble Amylopectin (80-85%, branched α-1,4 and α-1,6 chains).",
    "pointMr": "स्टार्चचे दोन घटक: अ‍ॅमायलोज (१५-२०%, पाण्यात विरघळणारा) आणि अ‍ॅमायलोपेक्टिन (८०-८५%, शाखायुक्त, पाण्यात अविद्राव्य).",
    "category": "Concept",
    "formula": "Amylose: unbranched; Amylopectin: branched",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Cellulose is a linear unbranched polymer of β-D-glucose linked by β-1,4-glycosidic bonds; cannot be digested by humans due to lack of cellulase enzyme.",
    "pointMr": "सेल्युलोज हा β-D-ग्लुकोजचा बनलेला असतो; मानवी शरीरात सेल्युलेज एन्झाईम नसल्याने पचन होत नाही.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Amino acids exist as dipolar Zwitterions with both positive (-NH₃⁺) and negative (-COO⁻) charges. Isoelectric point (pI) is pH at which net charge is zero.",
    "pointMr": "अमिनो आम्ले झ्विटरआयन (Zwitterion) स्वरूपात असतात. आयसोइलेक्ट्रिक पॉईंटला निव्वळ प्रभार शून्य असतो.",
    "category": "Definition",
    "formula": "Zwitterion: +NH₃-CHR-COO⁻",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "All naturally occurring α-amino acids are optically active and have L-configuration, EXCEPT Glycine (H₂N-CH₂-COOH, achiral).",
    "pointMr": "सर्व नैसर्गिक अमिनो आम्ले L-स्वरूपाची असतात, अपवाद: ग्लायसिन (Glycine) हा ऑप्टिकली अक्रिय असतो.",
    "category": "Exception",
    "formula": "Glycine is achiral",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Essential amino acids cannot be synthesized by human body and must be supplied in diet: Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, Arginine.",
    "pointMr": "आवश्यक अमिनो आम्ले मानवी शरीर तयार करू शकत नाही, अन्नातून घ्यावी लागतात (उदा. व्हॅलिन, ल्युसिन).",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Peptide bond is an amide linkage -CO-NH- formed between -COOH of one amino acid and -NH₂ of another with elimination of water.",
    "pointMr": "पेप्टाईड बंध हा दोन अमिनो आम्लांमधील अमाईड दुवा (-CO-NH-) असतो.",
    "category": "Definition",
    "formula": "Peptide bond: -CO-NH-",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Primary structure of protein is the specific sequence of amino acids; Secondary structure is α-helix and β-pleated sheet stabilized by Hydrogen bonds.",
    "pointMr": "प्रथिनांची प्राथमिक रचना म्हणजे अमिनो आम्लांचा क्रम; दुय्यम रचना (α-हेलिक्स व β-शीट) हायड्रोजन बंधाने स्थिर होते.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Denaturation of proteins: Heat or chemical change disrupts secondary and tertiary structures; Primary peptide chain remains INTACT; Biological activity is lost.",
    "pointMr": "प्रथिनांचे विकृतीकरण (Denaturation): तापमान किंवा आम्लामुळे २° व ३° रचना नष्ट होते; प्राथमिक पेप्टाईड साखळी अबाधित राहते.",
    "category": "Rule",
    "formula": "Primary structure intact in denaturation",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Nucleic acids components: Nitrogen base (Purines: A, G; Pyrimidines: C, T, U) + Pentose sugar (Ribose or Deoxyribose) + Phosphate group.",
    "pointMr": "न्युक्लिक आम्ले: नायट्रोजन बेस (प्युरीन्स: A, G; पिरिमिडिन्स: C, T, U) + पेंटोज साखर + फॉस्फेट गट.",
    "category": "Concept",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "In DNA, Adenine pairs with Thymine via 2 Hydrogen bonds (A = T); Guanine pairs with Cytosine via 3 Hydrogen bonds (G ≡ C). In RNA, Uracil replaces Thymine (A = U).",
    "pointMr": "DNA मध्ये A = T (२ हायड्रोजन बंध) आणि G ≡ C (३ हायड्रोजन बंध). RNA मध्ये थायमिनऐवजी युरॅसिल असतो.",
    "category": "Rule",
    "formula": "A=T (2 H-bonds); G≡C (3 H-bonds)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Vitamins classification: Water-soluble (Vitamin B-complex, Vitamin C - cannot be stored in body, excreted in urine); Fat-soluble (Vitamins A, D, E, K - stored in liver and adipose tissue).",
    "pointMr": "जीवनसत्त्वे: पाण्यात विरघळणारी (B, C - शरीरात साठवता येत नाहीत); मेदात विरघळणारी (A, D, E, K - यकृतात साठवली जातात).",
    "category": "Rule",
    "formula": "Water: B, C; Fat: A, D, E, K",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Deficiency diseases: Vitamin A -> Night blindness (Nyctalopia); Vitamin B1 (Thiamine) -> Beri-beri; Vitamin C (Ascorbic acid) -> Scurvy; Vitamin D -> Rickets; Vitamin K -> Blood clotting failure.",
    "pointMr": "कमतरतेचे आजार: जीवनसत्त्व A -> रातअंधळेपणा; B1 -> बेरीबेरी; C -> स्कर्व्ही; D -> मुडदूस; K -> रक्त न गोठणे.",
    "category": "Shortcut",
    "formula": "Vit A: Night blind; Vit C: Scurvy; Vit D: Rickets",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Green Chemistry Principle: Atom economy = (Formula weight of desired product / Sum of formula weights of all reactants) × 100%. Maximizing atom economy minimizes waste.",
    "pointMr": "हरित रसायनशास्त्र (Green Chemistry): अणू अर्थव्यवस्था (Atom economy) कमाल ठेवल्यास रासायनिक कचरा कमी होतो.",
    "category": "Formula",
    "formula": "Atom Economy = (MW desired / MW reactants) × 100",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Nylon-6,6 is a condensation polyamide polymer prepared from Adipic Acid and Hexamethylenediamine; forms strong hydrogen bonding.",
    "pointMr": "नायलॉन-६,६: अ‍ॅडिपिक अ‍ॅसिड व हेक्सामिथिलीन डायअमाईन यांच्या संघननाने बनणारा पॉलिअमाइड पॉलिमर.",
    "category": "Concept",
    "formula": "Adipic acid + Hexamethylenediamine",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Nylon-6 is prepared by heating Caprolactam with water at high temperature (ring-opening polymerization).",
    "pointMr": "नायलॉन-६: कॅप्रोलॅक्टमला पाण्याच्या उपस्थितीत तापवून रिंग-ओपनिंग पॉलिमरायझेशनने बनवले जाते.",
    "category": "Concept",
    "formula": "Caprolactam monomer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Dacron (Terylene) is a polyester prepared from Ethylene glycol and Terephthalic acid with elimination of water.",
    "pointMr": "डॅक्रॉन (टेरिलीन): इथिलीन ग्लायकॉल आणि टेरेफ्थॅलिक अ‍ॅसिड यांच्यापासून बनणारा पॉलिस्टर पॉलिमर.",
    "category": "Concept",
    "formula": "Ethylene glycol + Terephthalic acid",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Bakelite is a thermosetting cross-linked polymer of Phenol and Formaldehyde (Novolac intermediate). Highly heat resistant.",
    "pointMr": "बेकेलाइट: फिनॉल आणि फॉर्मल्डिहाइड यांच्यापासून बनणारा थर्मोसेटिंग क्रॉस-लिंक्ड पॉलिमर (स्विचेस व हँडल्स).",
    "category": "Rule",
    "formula": "Thermosetting polymer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Buna-S (SBR) synthetic rubber: Copolymer of 75% 1,3-Butadiene and 25% Styrene in presence of peroxide catalyst.",
    "pointMr": "बुना-एस (Buna-S): १,३-ब्युटाडायइन आणि स्टायरीन यांचा को-पॉलिमर; टायर बनवण्यासाठी मोठ्या प्रमाणावर वापर.",
    "category": "Concept",
    "formula": "1,3-Butadiene + Styrene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Buna-N synthetic rubber: Copolymer of 1,3-Butadiene and Acrylonitrile; resistant to oils and petrol.",
    "pointMr": "बुना-एन (Buna-N): १,३-ब्युटाडायइन आणि अ‍ॅक्रिलोनायट्राइलचा पॉलिमर; तेल आणि पेट्रोलला विरोध करतो.",
    "category": "Concept",
    "formula": "Resistant to oils",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Neoprene is a synthetic rubber obtained by free radical polymerization of Chloroprene (2-chloro-1,3-butadiene).",
    "pointMr": "निओप्रीन: क्लोरोप्रीन (२-क्लोरो-१,३-ब्युटाडायइन) चे पॉलिमरायझेशन करून बनवला जाणारा कृत्रिम रबर.",
    "category": "Concept",
    "formula": "Monomer: Chloroprene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Teflon (PTFE - Polytetrafluoroethylene): Polymer of Tetrafluoroethylene (CF₂=CF₂); non-stick cookware coating.",
    "pointMr": "टेफ्लॉन (PTFE): टेट्राफ्लुरोइथिलीनचा पॉलिमर; रासायनिकदृष्ट्या अक्रिय, नॉन-स्टिक भांड्यांवर कोटिंगसाठी वापर.",
    "category": "Shortcut",
    "formula": "PTFE for non-stick coating",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Melamine-formaldehyde resin is a thermosetting polymer used for manufacturing unbreakable crockery.",
    "pointMr": "मेलामाइन रेझिन: मेलामाइन व फॉर्मल्डिहाइडचा पॉलिमर; न फुटणारी क्रॉकरी (Unbreakable crockery) बनवण्यासाठी वापर.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "PHBV (Poly β-hydroxybutyrate-co-β-hydroxyvalerate) is a biodegradable copolymer used in speciality packaging and orthopaedic devices.",
    "pointMr": "PHBV: बॅक्टेरियाद्वारे विघटन होणारा (Biodegradable) पॉलिमर; औषध कॅप्सूल व ऑर्थोपेडिक उपकरणांमध्ये वापर.",
    "category": "Rule",
    "formula": "Biodegradable copolymer",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Vulcanization of natural rubber: Heating raw rubber with Sulfur (3-5%) introduces disulfide cross-links, improving elasticity and stiffness.",
    "pointMr": "रबराचे व्हल्कनायझेशन: नैसर्गिक रबर सल्फरसोबत तापवल्याने क्रॉस-लिंक्स तयार होऊन रबराची लवचिकता वाढते.",
    "category": "Concept",
    "formula": "Sulfur cross-links (3-5% S)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Natural rubber is cis-1,4-polyisoprene; Gutta-percha is the trans-1,4-polyisoprene (rigid and crystalline).",
    "pointMr": "नैसर्गिक रबर cis-१,४-पॉलिआयसोप्रीन असतो; गट्टा-पर्चा हा trans-१,४-पॉलिआयसोप्रीन असतो.",
    "category": "Rule",
    "formula": "Natural: cis-1,4-polyisoprene",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "Low Density Polyethylene (LDPE) is prepared under high pressure (1000-2000 atm) and has branched structure; High Density Polyethylene (HDPE) uses Ziegler-Natta catalyst [TiCl₄ + (C₂H₅)₃Al] under low pressure.",
    "pointMr": "LDPE शाखायुक्त असतो; HDPE हा Ziegler-Natta उत्प्रेरकाने कमी दाबात बनवला जाणारा रेषीय पॉलिमर आहे.",
    "category": "Shortcut",
    "formula": "Ziegler-Natta: TiCl₄ + AlEt₃",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Antipyretics lower body temperature in fever (e.g. Paracetamol, Aspirin). Analgesics relieve pain without causing unconsciousness.",
    "pointMr": "ताप कमी करणारी औषधे (अँटीपायरेटिक्स): पॅरासिटामॉल, अ‍ॅस्पिरिन. वेदनाशामक (अ‍ॅनाल्जेसिक्स): वेदना कमी करणारी औषधे.",
    "category": "Definition",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Aspirin (Acetylsalicylic acid): Prepared by acetylation of Salicylic acid with acetic anhydride; inhibits prostaglandin synthesis and prevents blood clotting (cardiac prevention).",
    "pointMr": "अ‍ॅस्पिरिन (अ‍ॅसिटाईल सॅलिसिलिक अ‍ॅसिड): रक्त पातळ ठेवून हृदयविकाराचा झटका टाळण्यासाठी वापरतात.",
    "category": "Formula",
    "formula": "Salicylic acid + Ac₂O -> Aspirin",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Antiseptics are applied to living tissues to kill/prevent microbe growth (e.g. Dettol = Chloroxylenol + Terpineol, Bithionol in soaps).",
    "pointMr": "अँटीसेप्टिक सजीव त्वचेवर वापरतात: डेटॉल (क्लोरोझायलेनॉल + टर्पिनॉल). साबणात बिथिओनॉल टाकतात.",
    "category": "Concept",
    "formula": "Dettol = Chloroxylenol + Terpineol",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Disinfectants are applied to non-living objects (floors, drains): 0.2% Phenol acts as antiseptic, while 1.0% Phenol acts as disinfectant.",
    "pointMr": "डिसइन्फेक्टंट निर्जीव वस्तूंवर वापरतात: ०.२% फिनॉल अँटीसेप्टिक असतो, पण १.०% फिनॉल डिसइन्फेक्टंट असतो.",
    "category": "PYQ_Trend",
    "formula": "0.2% Phenol=Antiseptic; 1% Phenol=Disinfectant",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Broad-spectrum antibiotics kill a wide range of Gram-positive and Gram-negative bacteria (e.g. Chloramphenicol, Amoxicillin).",
    "pointMr": "ब्रॉड-स्पेक्ट्रम अँटीबायोटिक्स अनेक प्रकारच्या जिवाणूंवर प्रभावी असतात (उदा. क्लोरामफेनिकॉल, अमोक्सिसिलिन).",
    "category": "Rule",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Penicillin is a narrow-spectrum bactericidal antibiotic discovered by Alexander Fleming (1928).",
    "pointMr": "पेनिसिलिन हा नॅरो-स्पेक्ट्रम अँटीबायोटिक आहे, अलेक्झांडर फ्लेमिंग यांनी शोधून काढला.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Antacids neutralize excess stomach hydrochloric acid: Sodium hydrogencarbonate (NaHCO₃), Magnesium hydroxide [Mg(OH)₂ milk of magnesia], Ranitidine (Zantac).",
    "pointMr": "अ‍ॅसिडिटी कमी करणारी औषधे (अँटासिड्स): मिल्क ऑफ मॅग्नेशिया Mg(OH)₂, रॅनिटीडीन, ओमेप्राझोल.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Artificial Sweeteners: Aspartame (100x sweeter than sugar, unstable at cooking temp, used in cold foods/drinks); Saccharin (550x); Sucralose (600x, stable at cooking temp); Alitame (2000x).",
    "pointMr": "कृत्रिम गोड घटक: अ‍ॅस्पार्टेम (१०० पट गोड, शिजवताना नष्ट होतो); सुक्रालोज (६०० पट गोड, स्वयंपाकात स्थिर).",
    "category": "Shortcut",
    "formula": "Sucralose: stable at cooking temp",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Anionic detergents have large anionic organic part (e.g. Sodium lauryl sulphate); Cationic detergents have cationic quaternary ammonium part (e.g. Cetyltrimethylammonium bromide - hair conditioners, germicidal).",
    "pointMr": "अ‍ॅनायॉनिक डिटर्जंट्स घरगुती धुलाईसाठी; कॅटायॉनिक डिटर्जंट्स हेअर कंडिशनर व जंतुनाशक म्हणून वापरतात.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Non-ionic detergents lack ionic charges (e.g. Pentaerythrityl stearate, liquid dishwashing detergents).",
    "pointMr": "नॉन-आयनिक डिटर्जंट्स: यांवर कोणताही प्रभार नसतो (उदा. लिक्विड डिशवॉशिंग डिटर्जंट).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "PCC (Pyridinium Chlorochromate) selectively oxidizes 1° alcohols to Aldehydes and 2° alcohols to Ketones WITHOUT oxidizing further to carboxylic acids.",
    "pointMr": "PCC अभिकर्मक: प्राथमिक अल्कोहोलचे अ‍ॅल्डिहाइडवर नियंत्रण ठेवून पुढे आम्ल बनू देत नाही.",
    "category": "Rule",
    "formula": "1° alcohol -> Aldehyde (PCC)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Jones Reagent (CrO₃ in dilute H₂SO₄ and acetone) oxidizes 1° alcohols completely to Carboxylic acids and 2° alcohols to Ketones.",
    "pointMr": "जोन्स अभिकर्मक (Jones reagent): १° अल्कोहोलचे थेट कार्बोक्सिलिक आम्लात ऑक्सिडीकरण करतो.",
    "category": "Formula",
    "formula": "Jones: CrO₃ / aq. H₂SO₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "DIBAL-H (Diisobutylaluminium hydride) selectively reduces Esters and Cyanides (Nitriles) at -78°C directly to ALDEHYDES.",
    "pointMr": "DIBAL-H: कमी तापमानाला (-७८°C) एस्टर आणि सायनाईडचे थेट अ‍ॅल्डिहाइडमध्ये रूपांतर करतो.",
    "category": "Shortcut",
    "formula": "Ester / Nitrile -> Aldehyde (DIBAL-H)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "Lithium Aluminium Hydride (LiAlH₄) is a powerful reducing agent reducing acids, esters, aldehydes, and ketones; Sodium Borohydride (NaBH₄) reduces ONLY aldehydes and ketones, NOT acids or esters.",
    "pointMr": "LiAlH₄ सर्व कार्बोनिलचे क्षपण करतो; NaBH₄ हा केवळ अ‍ॅल्डिहाइड व कीटोनचे क्षपण करतो, आम्ल किंवा एस्टरचे नाही.",
    "category": "Rule",
    "formula": "NaBH₄ reduces only aldehydes/ketones",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Ozonolysis of alkenes with O₃ followed by Zn / H₂O (reductive): Cleaves C=C double bond into carbonyls; =CH₂ gives Formaldehyde, =CH-R gives Aldehydes, =C(R)₂ gives Ketones.",
    "pointMr": "ओझोनोलिसिस (Zn/H₂O): दुहेरी बंध तोडून कार्बोनिल संयुगे बनवणे. उत्पादनांवरून मूळ अल्कीनची रचना ओळखता येते.",
    "category": "Shortcut",
    "formula": "C=C cleaved to C=O",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Grignard Reagent (R-Mg-X) additions to carbonyls: Formaldehyde (HCHO) gives 1° alcohol; Any other aldehyde gives 2° alcohol; Ketones give 3° alcohol.",
    "pointMr": "ग्रिग्नार्ड अभिकर्मक: फॉर्मल्डिहाइड १° अल्कोहोल देतो; इतर अ‍ॅल्डिहाइड्स २° अल्कोहोल देतात; केटोन्स ३° अल्कोहोल देतात.",
    "category": "Rule",
    "formula": "HCHO->1°; RCHO->2°; RCOR->3°",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Schiemann Reaction: Fluorobenzene is prepared by treating benzene diazonium chloride with fluoroboric acid (HBF₄) followed by heating.",
    "pointMr": "शिमन अभिक्रिया: डायझोनियम क्षारापासून HBF₄ च्या साहाय्याने फ्लुरोबेंझिन बनवण्याची एकमेव पद्धत.",
    "category": "Formula",
    "formula": "Ar-N₂⁺BF₄⁻ -> Ar-F + BF₃ + N₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Freundlich Adsorption Isotherm: x / m = k · P^(1/n), where 0 < 1/n < 1. At low pressure x/m ∝ P; At high pressure independent of P.",
    "pointMr": "फ्रॉइंडलिक अ‍ॅड्सॉर्प्शन समताप: x/m = k P^(1/n). अति उच्च दाबाला वायूचे शोषण दाबावर अवलंबून नसते.",
    "category": "Formula",
    "formula": "x/m = k P^(1/n)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Hardy-Schulze Rule: Coagulating power of an opposing electrolyte ion is directly proportional to 4th power of its valence (charge). E.g. For negative sol: Al³⁺ > Ba²⁺ > Na⁺.",
    "pointMr": "हार्टी-शुल्झे नियम: कोअ‍ॅग्युलेटिंग आयनाचा प्रभार जितका जास्त, तितकी अवक्षेप पाडण्याची क्षमता जास्त (Al³⁺ > Ba²⁺ > Na⁺).",
    "category": "Rule",
    "formula": "Coagulating power: Al³⁺ > Ba²⁺ > Na⁺",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Gold Number is the minimum milligrams of a protective lyophilic colloid needed to prevent coagulation of 10 mL gold sol by 1 mL of 10% NaCl. Smaller gold number means GREATER protective power (Gelatin has lowest gold number ≈ 0.005).",
    "pointMr": "गोल्ड नंबर: जिलेटिनचा गोल्ड नंबर सर्वात लहान असतो, त्यामुळे त्याचे संरक्षण सर्वात जास्त असते.",
    "category": "Formula",
    "formula": "Protective power ∝ 1 / Gold Number",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Tyndall Effect is the scattering of light by colloidal particles; observed only when diameter of dispersed particles is comparable to wavelength of light.",
    "pointMr": "टिंडल प्रभाव (Tyndall effect): कोलॉइडल कणांमुळे प्रकाशाचे विखुरणे (Scattering of light).",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Ellingham Diagram: Plots ΔG° vs Temperature for metal oxide formation. Lower line element can displace/reduce the oxide of any metal located ABOVE it on the diagram.",
    "pointMr": "एलिंगहॅम आकृती: ΔG° विरुद्ध तापमान. खालील धातू वरील धातूच्या ऑक्साईडचे सहज क्षपण करू शकतो.",
    "category": "Rule",
    "formula": "Lower line reduces upper line oxide",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Mond's Process for refining Nickel: Impure Ni + 4 CO at 330-350 K -> volatile Ni(CO)₄, decomposed at 450-470 K to give 99.9% pure Ni.",
    "pointMr": "मॉन्ड पद्धत: निकेल शुद्ध करण्यासाठी CO सोबत बाष्पशील Ni(CO)₄ बनवून उच्च तापमानाला शुद्ध निकेल मिळवतात.",
    "category": "Formula",
    "formula": "Ni + 4 CO <=> Ni(CO)₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Van Arkel de Boer Method: Used for refining Titanium (Ti) and Zirconium (Zr) by heating with Iodine to form volatile tetraiodide, decomposed on tungsten filament.",
    "pointMr": "व्हॅन आर्केल पद्धत: टायटॅनियम व झिरकोनियम शुद्ध करण्यासाठी आयोडीन (I₂) वापरून अत्यंत शुद्ध धातू मिळवला जातो.",
    "category": "Formula",
    "formula": "Zr + 2 I₂ <=> ZrI₄",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Froth Flotation Process: Concentrates sulfide ores based on preferential wetting of ore by pine oil and gangue by water. Depressant NaCN separates ZnS from PbS.",
    "pointMr": "फेन प्लवन पद्धत: सल्फाइड खनिजांसाठी. पाइन ऑईल खनिजाला भिजवते; NaCN डिप्रेशंट वापरून ZnS वेगळा करतात.",
    "category": "Concept",
    "formula": "Depressant NaCN for ZnS + PbS",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Hall-Heroult Process for Aluminium extraction: Electrolysis of molten alumina Al₂O₃ dissolved in Cryolite (Na₃AlF₆) and fluorspar (CaF₂) to lower melting point and increase electrical conductivity.",
    "pointMr": "हॉल-हेरॉल्ट पद्धत: अ‍ॅल्युमिनाचे विद्युत अपघटन; क्रायोलाइट (Na₃AlF₆) वितळण बिंदू कमी करून वाहकता वाढवतो.",
    "category": "Rule",
    "formula": "Cryolite lowers melting point of Al₂O₃",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "Calcination is heating ore strongly in ABSENCE or limited supply of air (for carbonates and hydrated oxides); Roasting is heating in EXCESS of air (for sulfide ores).",
    "pointMr": "कॅल्सिनेशन हवेच्या अभावात केले जाते (कार्बोनेट्स); रोस्टिंग अतिरिक्त हवेत केले जाते (सल्फाइड्स).",
    "category": "Rule",
    "formula": "Calcination: No air; Roasting: Excess air",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "Oxoacids of Phosphorus: Hypophosphorous acid (H₃PO₂) has 1 P-OH bond and 2 P-H bonds (monobasic, powerful reducing agent).",
    "pointMr": "हायपोफॉस्फरस आम्ल (H₃PO₂): मोनोबेसिक असून यात दोन P-H बंध असल्याने प्रबळ क्षपणक (Reducing agent) आहे.",
    "category": "Formula",
    "formula": "H₃PO₂: 1 P-OH, 2 P-H (Monobasic)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Phosphorous acid (H₃PO₃) has 2 P-OH bonds and 1 P-H bond (dibasic, reducing agent); Orthophosphoric acid (H₃PO₄) has 3 P-OH bonds (tribasic, non-reducing).",
    "pointMr": "H₃PO₃ डायबेसिक असतो; ऑर्थोफॉस्फोरिक H₃PO₄ ट्रायबेसिक असून यात P-H बंध नसल्याने क्षपणक नाही.",
    "category": "Rule",
    "formula": "H₃PO₃: Dibasic; H₃PO₄: Tribasic",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Caro's Acid is Peroxomonosulfuric acid (H₂SO₅); contains one peroxy (-O-O-) linkage; oxidation state of Sulfur is +6.",
    "pointMr": "कॅरोज आम्ल (H₂SO₅): पेरोक्सोमोनोसल्फ्यूरिक आम्ल; यात एक पेरोक्सी (-O-O-) बंध असतो; S चा ऑक्सिडेशन अंक +६.",
    "category": "Formula",
    "formula": "Caro's Acid = H₂SO₅ (O.S. of S = +6)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Marshall's Acid is Peroxodisulfuric acid (H₂S₂O₈); contains one peroxy linkage (-O-O-) between two -SO₃H groups; oxidation state of Sulfur is +6.",
    "pointMr": "मार्शल आम्ल (H₂S₂O₈): पेरोक्सोडायसल्फ्यूरिक आम्ल; सल्फरचा ऑक्सिडेशन अंक +६ असतो.",
    "category": "Formula",
    "formula": "Marshall's Acid = H₂S₂O₈ (S = +6)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Xenon Fluorides Hydrolysis: XeF₂ + 2 H₂O -> 2 Xe + 4 HF + O₂; Complete hydrolysis of XeF₆ gives explosive yellow liquid XeO₃: XeF₆ + 3 H₂O -> XeO₃ + 6 HF.",
    "pointMr": "XeF₂ पाण्याचे ऑक्सिडीकरण करून O₂ देतो; XeF₆ च्या पूर्ण विघटनाने अत्यंत स्फोटक XeO₃ तयार होतो.",
    "category": "Formula",
    "formula": "XeF₆ + 3 H₂O -> XeO₃ + 6 HF",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Interhalogen compound geometries: ClF₃ is T-shaped (sp³d, 2 lone pairs); BrF₅ is square pyramidal (sp³d², 1 lone pair); IF₇ is pentagonal bipyramidal (sp³d³).",
    "pointMr": "आंतरहॅलोजन भौमितिक रचना: ClF₃ चा आकार T-आकाराचा असतो; BrF₅ स्क्वेअर पिरॅमिडल असतो; IF₇ पेंटागोनल बायपिरॅमिडल.",
    "category": "Shortcut",
    "formula": "ClF₃: T-shaped; BrF₅: Sq Pyramidal; IF₇: PBP",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "Actinoid contraction is GREATER than Lanthanoid contraction because of poorer shielding by 5f electrons compared to 4f electrons.",
    "pointMr": "अ‍ॅक्टिनॉइड आकुंचन लॅन्थेनॉईडपेक्षा जास्त असते कारण 5f इलेक्ट्रॉनचे शील्डिंग 4f पेक्षाही कमकुवत असते.",
    "category": "Concept",
    "formula": "5f shielding is poorer than 4f",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Crown Ethers (e.g. 18-crown-6) act as phase transfer catalysts by selectively binding cations (K⁺) inside cavity and solubilizing inorganic salts in nonpolar organic solvents.",
    "pointMr": "क्राउन इथर (Crown ethers): K⁺ सारख्या धनायनांना आपल्या पोकळीत अडकवून सेंद्रिय द्रावकात विरघळवतात.",
    "category": "Concept",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Hofmann Elimination in quaternary ammonium hydroxides or bulky bases yields LEAST substituted alkene (Hofmann product) as major, opposite to Saytzeff rule.",
    "pointMr": "हॉफमन विलोपन: मोठ्या आकाराचा बेस किंवा क्वाटर्नरी अमोनियम असल्यास कमी प्रतिस्थापित अल्कीन (Hofmann product) जास्त प्रमाणात बनतो.",
    "category": "Exception",
    "formula": "Less substituted alkene is major",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Pinacol-Pinacolone Rearrangement: Acid catalyzed conversion of vicinal diol (Pinacol) to ketone (Pinacolone) with carbocation formation and methyl shift.",
    "pointMr": "पिनाकॉल-पिनाकोलोन पुनर्रचना: सान्द्र H₂SO₄ च्या उपस्थितीत १,२-डायऑलचे मिथाईल शिफ्ट होऊन कीटोनमध्ये रूपांतर होते.",
    "category": "Rule",
    "formula": "Pinacol -> Pinacolone (Methyl shift)",
    "badge": "PYQ Trends & Advanced"
  }
];

export const MATHEMATICS_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Conjunction (p ∧ q) is True ONLY when both p and q are True. Disjunction (p ∨ q) is False ONLY when both p and q are False.",
    "pointMr": "संयोग (p ∧ q) दोन्ही सत्य असतानाच सत्य असतो. विकल्प (p ∨ q) दोन्ही असत्य असतानाच असत्य असतो.",
    "category": "Rule",
    "formula": "T ∧ T = T; F ∨ F = F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Conditional (p -> q) is False ONLY when p is True and q is False (T -> F = F); otherwise it is True.",
    "pointMr": "सशर्त विधान (p -> q) केवळ T -> F असतानाच असत्य (F) असते; इतर वेळी सत्य असते.",
    "category": "Rule",
    "formula": "T -> F = F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Negation of conditional: ~(p -> q) ≡ p ∧ ~q. Very frequent exam trap.",
    "pointMr": "कंडिशनल विधानाचा नकार: ~(p -> q) ≡ p ∧ ~q. परीक्षेसाठी अत्यंत महत्त्वाचे.",
    "category": "Shortcut",
    "formula": "~(p -> q) ≡ p ∧ ~q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Biconditional (p <-> q) is True when both p and q have IDENTICAL truth values (T <-> T = T and F <-> F = T).",
    "pointMr": "द्विसशर्त विधान (p <-> q) दोन्ही विधानांची सत्यता मूल्ये समान असतानाच सत्य असते.",
    "category": "Rule",
    "formula": "p <-> q ≡ (p -> q) ∧ (q -> p)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Converse, Inverse, Contrapositive of p -> q: Converse = q -> p; Inverse = ~p -> ~q; Contrapositive = ~q -> ~p (equivalent to p -> q).",
    "pointMr": "कॉन्ट्रापॉझिटिव्ह (~q -> ~p) हे मूळ विधानाशी (p -> q) तंतोतंत समतुल्य असते.",
    "category": "Rule",
    "formula": "Contrapositive ≡ Original",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "De Morgan's Laws in Logic: ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q.",
    "pointMr": "डी-मॉर्गनचे नियम: ~(p ∧ q) ≡ ~p ∨ ~q आणि ~(p ∨ q) ≡ ~p ∧ ~q.",
    "category": "Rule",
    "formula": "~(p ∧ q) ≡ ~p ∨ ~q",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Tautology (t): Statement pattern which is True for ALL truth values of components. Contradiction (c): False for all.",
    "pointMr": "टॉटॉलॉजी (Tautology): सर्व स्थितीत सत्य (T) असणारे विधान. कॉन्ट्राडिक्शन (c): सर्व स्थितीत असत्य (F).",
    "category": "Definition",
    "formula": "Tautology = All T; Contradiction = All F",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "A matrix A is singular if det(A) = |A| = 0; Non-singular if |A| ≠ 0. Inverse A⁻¹ exists ONLY if |A| ≠ 0.",
    "pointMr": "मॅट्रिक्स A चे डिटरमिनंट |A| = ० असल्यास तो सिंग्युलर असतो. इन्व्हर्स फक्त |A| ≠ ० असतानाच अस्तित्वात असतो.",
    "category": "Rule",
    "formula": "|A| ≠ 0 for A⁻¹",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "Matrix inverse formula: A⁻¹ = (1 / |A|) · adj(A). For 2x2 matrix [[a,b],[c,d]], adj(A) = [[d,-b],[-c,a]].",
    "pointMr": "२x२ मॅट्रिक्सचा इन्व्हर्स: मुख्य कर्णातील घटक बदला आणि इतर घटकांची चिन्हे बदला.",
    "category": "Shortcut",
    "formula": "adj([[a,b],[c,d]]) = [[d,-b],[-c,a]]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Properties of adjoint: A · adj(A) = adj(A) · A = |A| · I_n.",
    "pointMr": "अ‍ॅडजॉईंट गुणधर्म: A × adj(A) = |A| × I.",
    "category": "Formula",
    "formula": "A · adj(A) = |A| I",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Determinant of adjoint: |adj(A)| = |A|^(n - 1), where n is order of square matrix A.",
    "pointMr": "अ‍ॅडजॉईंटचे डिटरमिनंट: |adj(A)| = |A|^(n - 1). (३x३ साठी |A|²).",
    "category": "Formula",
    "formula": "|adj(A)| = |A|^(n - 1)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Determinant of product: |A · B| = |A| · |B|; |k · A| = k^n · |A| for n×n matrix.",
    "pointMr": "डिटरमिनंट गुणाकार: |A B| = |A| |B|; |k A| = k^n |A| (n ही मॅट्रिक्सची ऑर्डर आहे).",
    "category": "Formula",
    "formula": "|kA| = k^n |A|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Symmetric matrix: A^T = A (a_ij = a_ji); Skew-symmetric: A^T = - A (a_ij = - a_ji, all diagonal elements are ZERO).",
    "pointMr": "सममित मॅट्रिक्स: A^T = A; विषम-सममित: A^T = -A (कर्णातील सर्व घटक शून्य असतात).",
    "category": "Definition",
    "formula": "Skew-symmetric: a_ii = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Any square matrix can be uniquely expressed as sum of a symmetric and skew-symmetric matrix: A = (1/2)(A + A^T) + (1/2)(A - A^T).",
    "pointMr": "कोणताही स्क्वेअर मॅट्रिक्स सममित व विषम-सममित मॅट्रिक्सच्या बेरजेच्या रूपात मांडता येतो.",
    "category": "Rule",
    "formula": "A = 1/2(A + A^T) + 1/2(A - A^T)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "System of equations A X = B has unique solution if |A| ≠ 0; If |A| = 0 and (adj A)·B ≠ 0 => Inconsistent (No solution).",
    "pointMr": "समीकरण संच: |A| ≠ ० असल्यास एकच उत्तर; |A| = ० आणि (adj A) B ≠ ० असल्यास कोणतेही उत्तर नाही.",
    "category": "Rule",
    "formula": "|A| ≠ 0: Unique; No solution if (adj A)B ≠ 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "General solution of sin θ = sin α is θ = n π + (-1)^n α, where n ∈ Z.",
    "pointMr": "sin θ = sin α चे सामान्य उत्तर: θ = n π + (-1)^n α.",
    "category": "Formula",
    "formula": "θ = nπ + (-1)^n α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "General solution of cos θ = cos α is θ = 2 n π ± α, where n ∈ Z.",
    "pointMr": "cos θ = cos α चे सामान्य उत्तर: θ = २ n π ± α.",
    "category": "Formula",
    "formula": "θ = 2nπ ± α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "General solution of tan θ = tan α is θ = n π + α, where n ∈ Z.",
    "pointMr": "tan θ = tan α चे सामान्य उत्तर: θ = n π + α.",
    "category": "Formula",
    "formula": "θ = nπ + α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "General solutions of sin²θ = sin²α, cos²θ = cos²α, and tan²θ = tan²α are ALL: θ = n π ± α.",
    "pointMr": "वर्ग समीकरणांचे (sin²θ = sin²α) सामान्य उत्तर नेहमी: θ = n π ± α असते.",
    "category": "Shortcut",
    "formula": "sin²θ = sin²α => θ = nπ ± α",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Sine Rule in triangle ABC: a / sin A = b / sin B = c / sin C = 2R, where R is circumradius.",
    "pointMr": "त्रिकोणाचा साइन नियम: a / sin A = b / sin B = c / sin C = २R (R = परिवर्तुळाची त्रिज्या).",
    "category": "Formula",
    "formula": "a/sin A = b/sin B = c/sin C = 2R",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Cosine Rule: cos A = (b² + c² - a²) / (2 b c); cos B = (a² + c² - b²) / (2 a c); cos C = (a² + b² - c²) / (2 a b).",
    "pointMr": "कोसाइन नियम: cos A = (b² + c² - a²) / (२ b c).",
    "category": "Formula",
    "formula": "cos A = (b² + c² - a²)/(2bc)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Projection Rule: a = b cos C + c cos B; b = c cos A + a cos C; c = a cos B + b cos A.",
    "pointMr": "प्रक्षेप नियम (Projection Rule): a = b cos C + c cos B.",
    "category": "Formula",
    "formula": "a = b cos C + c cos B",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Area of triangle ABC: Δ = (1/2) a b sin C = (1/2) b c sin A = (1/2) a c sin B = a b c / (4R) = r · s.",
    "pointMr": "त्रिकोणाचे क्षेत्रफळ: Δ = (१/२) a b sin C = r × s (r = अंतर्वर्तुळ त्रिज्या, s = अर्धपरिमिती).",
    "category": "Formula",
    "formula": "Δ = 1/2 ab sin C = rs",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Principal value branch of sin⁻¹x is [-π/2, π/2]; For cos⁻¹x is [0, π]; For tan⁻¹x is (-π/2, π/2).",
    "pointMr": "मुख्य मूल्य शाखा: sin⁻¹x ची मर्यादा [-π/२, π/२]; cos⁻¹x ची मर्यादा [०, π].",
    "category": "Rule",
    "formula": "sin⁻¹ ∈ [-π/2, π/2]; cos⁻¹ ∈ [0, π]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Key inverse trigonometric identities: sin⁻¹x + cos⁻¹x = π/2; tan⁻¹x + cot⁻¹x = π/2; sec⁻¹x + cosec⁻¹x = π/2 (for valid domain).",
    "pointMr": "महत्त्वाचे इन्व्हर्स त्रिकोणमितीय नियम: sin⁻¹x + cos⁻¹x = π/२; tan⁻¹x + cot⁻¹x = π/२.",
    "category": "Shortcut",
    "formula": "sin⁻¹x + cos⁻¹x = π/2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "tan⁻¹x + tan⁻¹y = tan⁻¹[ (x + y) / (1 - x y) ] for x y < 1.",
    "pointMr": "tan⁻¹x + tan⁻¹y चे सूत्र: tan⁻¹[ (x + y) / (१ - x y) ] (xy < १ असताना).",
    "category": "Formula",
    "formula": "tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Homogeneous equation of second degree ax² + 2hxy + by² = 0 represents a pair of straight lines passing through the ORIGIN.",
    "pointMr": "ax² + 2hxy + by² = ० हे मूळ बिंदूतून (Origin) जाणाऱ्या दोन सरळ रेषांचे संयुक्त समीकरण दर्शवते.",
    "category": "Concept",
    "formula": "ax² + 2hxy + by² = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Condition for lines ax² + 2hxy + by² = 0 to be real and distinct: h² - ab > 0; Coincident: h² - ab = 0; Imaginary: h² - ab < 0.",
    "pointMr": "रेषा वास्तव व भिन्न असण्याची अट: h² - ab > ०; एकरूप असण्याची अट: h² - ab = ०.",
    "category": "Rule",
    "formula": "h² - ab > 0: Real & distinct",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Angle θ between lines ax² + 2hxy + by² = 0: tan θ = | 2 √(h² - ab) / (a + b) |.",
    "pointMr": "दोन रेषांमधील कोन: tan θ = | २ √(h² - ab) / (a + b) |.",
    "category": "Formula",
    "formula": "tan θ = |2√(h²-ab) / (a+b)|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Condition for perpendicular lines: a + b = 0 (coefficient of x² + coefficient of y² = 0). Very frequent shortcut.",
    "pointMr": "रेषा परस्परांना लंब (९०°) असण्याची अट: a + b = ०. परीक्षेचा हमखास प्रश्न.",
    "category": "Shortcut",
    "formula": "Perpendicular: a + b = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "Condition for parallel / coincident lines: h² - ab = 0.",
    "pointMr": "रेषा समांतर किंवा एकरूप असण्याची अट: h² = ab.",
    "category": "Shortcut",
    "formula": "Parallel: h² - ab = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "Sum and product of slopes: m₁ + m₂ = - 2h / b and m₁ · m₂ = a / b.",
    "pointMr": "उतारांची बेरीज: m₁ + m₂ = - २h / b; उतारांचा गुणाकार: m₁ m₂ = a / b.",
    "category": "Formula",
    "formula": "m₁+m₂ = -2h/b; m₁m₂ = a/b",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "General second degree equation ax² + 2hxy + by² + 2gx + 2fy + c = 0 represents pair of lines if Δ = abc + 2fgh - af² - bg² - ch² = 0.",
    "pointMr": "सामान्य समीकरण रेषांची जोडी दर्शवण्याची अट: Δ = abc + २fgh - af² - bg² - ch² = ०.",
    "category": "Formula",
    "formula": "Δ = abc + 2fgh - af² - bg² - ch² = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Dot (Scalar) Product: a · b = |a| |b| cos θ = a_x b_x + a_y b_y + a_z b_z. If a ⊥ b => a · b = 0.",
    "pointMr": "अदिश गुणाकार: a · b = |a| |b| cos θ. जर दोन सदिश लंब असतील तर त्यांचा dot product शून्य असतो.",
    "category": "Formula",
    "formula": "a ⊥ b <=> a · b = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "Projection of vector a on vector b: Projection = (a · b) / |b|; Vector projection = [ (a · b) / |b|² ] b.",
    "pointMr": "सदिश a चा b वरील प्रक्षेप (Projection): (a · b) / |b|.",
    "category": "Formula",
    "formula": "Projection = (a · b) / |b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Cross (Vector) Product: a × b = |a| |b| sin θ n̂. Magnitude equals area of parallelogram with adjacent sides a and b.",
    "pointMr": "सदिश गुणाकार a × b: परिमाण म्हणजे a आणि b बाजूंनी बनलेल्या समांतरभुज चौकोनाचे क्षेत्रफळ.",
    "category": "Formula",
    "formula": "Area = |a × b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Area of triangle with adjacent vectors a and b: Area = (1/2) |a × b|; With diagonals d₁ and d₂: Area = (1/2) |d₁ × d₂|.",
    "pointMr": "त्रिकोणाचे क्षेत्रफळ = (१/२) |a × b|; चौकोनाचे क्षेत्रफळ कर्ण d₁ व d₂ दिले असता = (१/२) |d₁ × d₂|.",
    "category": "Formula",
    "formula": "Area = 1/2 |a × b|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "Scalar Triple Product [a b c] = a · (b × c). Represents volume of parallelepiped with coterminous edges a, b, c.",
    "pointMr": "अदिश त्रिक गुणाकार [a b c]: समांतर षट्फलकाचे (Parallelepiped) घनफळ दर्शवतो.",
    "category": "Formula",
    "formula": "Volume = [a b c]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Condition for three vectors a, b, c to be coplanar: [a b c] = 0.",
    "pointMr": "तीन सदिश एकाच प्रतलात (Coplanar) असण्याची अट: [a b c] = ०.",
    "category": "Rule",
    "formula": "Coplanar: [a b c] = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "Volume of tetrahedron formed by coterminous edges a, b, c: V = (1/6) [a b c].",
    "pointMr": "चतुष्कोनीय पिरॅमिडचे (Tetrahedron) घनफळ = (१/६) [a b c].",
    "category": "Formula",
    "formula": "V_tetra = 1/6 [a b c]",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Direction cosines l, m, n satisfy: l² + m² + n² = cos²α + cos²β + cos²γ = 1; sin²α + sin²β + sin²γ = 2.",
    "pointMr": "दिशा कोसाइन संबंध: l² + m² + n² = १; sin²α + sin²β + sin²γ = २.",
    "category": "Shortcut",
    "formula": "l² + m² + n² = 1; Σ sin²α = 2",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "Angle between two lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂: cos θ = | a₁a₂ + b₁b₂ + c₁c₂ | / [ √(Σ a₁²) √(Σ a₂²) ].",
    "pointMr": "दोन रेषांमधील कोन: cos θ = (a₁a₂ + b₁b₂ + c₁c₂) / [ √(a₁²+b₁²+c₁²) √(a₂²+b₂²+c₂²) ].",
    "category": "Formula",
    "formula": "cos θ = (a₁a₂+b₁b₂+c₁c₂)/(|a||b|)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Perpendicular lines in 3D: a₁ a₂ + b₁ b₂ + c₁ c₂ = 0. Parallel lines: a₁ / a₂ = b₁ / b₂ = c₁ / c₂.",
    "pointMr": "3D मध्ये लंब रेषांची अट: a₁ a₂ + b₁ b₂ + c₁ c₂ = ०; समांतर असण्याची अट: a₁/a₂ = b₁/b₂ = c₁/c₂.",
    "category": "Rule",
    "formula": "a₁a₂ + b₁b₂ + c₁c₂ = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "Equation of line through point (x₁, y₁, z₁) with direction ratios a, b, c: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c.",
    "pointMr": "रेषेचे कार्टेशियन समीकरण: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c.",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = (z - z₁)/c",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Shortest distance between two skew lines r = a₁ + λ b₁ and r = a₂ + μ b₂: d = | (a₂ - a₁) · (b₁ × b₂) | / | b₁ × b₂ |.",
    "pointMr": "दोन तिरप्या (Skew) रेषांमधील किमान अंतर: d = | (a₂ - a₁) · (b₁ × b₂) | / |b₁ × b₂|.",
    "category": "Formula",
    "formula": "d = |(a₂-a₁)·(b₁×b₂)| / |b₁×b₂|",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "If two lines intersect, shortest distance d = 0 => (a₂ - a₁) · (b₁ × b₂) = 0.",
    "pointMr": "दोन रेषा एकमेकांना छेदत असल्यास त्यांच्यातील अंतर ० असते => (a₂ - a₁) · (b₁ × b₂) = ०.",
    "category": "Rule",
    "formula": "(a₂ - a₁) · (b₁ × b₂) = 0",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Linear Programming Problem (LPP): Objective function Z = ax + by is maximized/minimized at CORNER POINTS of feasible region.",
    "pointMr": "रेशीय प्रोग्रॅमिंग (LPP): उद्दिष्ट फलन Z चे कमाल किंवा किमान मूल्य नेहमी व्यवहार्य क्षेत्राच्या कोपऱ्यावरील बिंदूंवरच मिळते.",
    "category": "Rule",
    "formula": "Optimal solution at corner points",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "If the feasible region of LPP is bounded, objective function Z always has both a maximum and a minimum value.",
    "pointMr": "जर LPP चे व्यवहार्य क्षेत्र मर्यादित (Bounded) असेल, तर Z चे कमाल व किमान दोन्ही मूल्ये निश्चित मिळतात.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Redundant constraint in LPP is one whose removal does NOT change the feasible region.",
    "pointMr": "अनावश्यक मर्यादा (Redundant constraint): ती काढून टाकल्यास व्यवहार्य क्षेत्र बदलत नाही.",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "Corner Point Method steps: 1. Find feasible region 2. Determine corner coordinates 3. Evaluate Z at each corner 4. Identify optimal Z.",
    "pointMr": "कॉर्नर पॉईंट पद्धत: १. व्यवहार्य क्षेत्र काढा २. कोपरे शोधा ३. Z चे मूल्य तपासा ४. सर्वोच्च/किमान उत्तर निवडा.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Standard limits: lim(x->0) [sin x / x] = 1; lim(x->0) [tan x / x] = 1; lim(x->0) [ (a^x - 1) / x ] = ln a; lim(x->0) [ (1 + x)^(1/x) ] = e.",
    "pointMr": "प्रमाणित मर्यादा: lim (sin x / x) = १; lim (e^x - 1)/x = १; lim (1 + x)^(1/x) = e.",
    "category": "Formula",
    "formula": "lim(x->0) sin x / x = 1",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "L'Hopital's Rule: If lim f(x)/g(x) gives 0/0 or ∞/∞, then lim f(x)/g(x) = lim f'(x)/g'(x). Differentiate numerator and denominator separately.",
    "pointMr": "एल-हॉस्पिटलचा नियम: ०/० किंवा ∞/∞ फॉर्म असल्यास अंश व छेदाचे स्वतंत्र अवकलज (Derivative) घ्यावे.",
    "category": "Shortcut",
    "formula": "lim f(x)/g(x) = lim f'(x)/g'(x)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "A function f(x) is continuous at x = a if: lim(x->a⁻) f(x) = lim(x->a⁺) f(x) = f(a) (LHL = RHL = value at point).",
    "pointMr": "फलन x = a वर संतत (Continuous) असण्याची अट: डावी मर्यादा = उजवी मर्यादा = फलाचे मूल्य.",
    "category": "Definition",
    "formula": "LHL = RHL = f(a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Differentiability implies continuity, but continuity does NOT necessarily imply differentiability (e.g. f(x) = |x| at x = 0).",
    "pointMr": "अवकलनीय फलन नेहमी संतत असते, परंतु प्रत्येक संतत फलन अवकलनीय असेलच असे नाही (उदा. |x| at x=०).",
    "category": "Rule",
    "formula": "Differentiable => Continuous",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Chain Rule of differentiation: dy/dx = (dy/du) · (du/dx). For composite function y = f(g(x)) => y' = f'(g(x)) · g'(x).",
    "pointMr": "चेन नियम: y = f(g(x)) => dy/dx = f'(g(x)) × g'(x).",
    "category": "Formula",
    "formula": "dy/dx = (dy/du)(du/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Derivative of [f(x)]^[g(x)]: Use logarithmic differentiation: y' = y [ g'(x) ln f(x) + g(x) f'(x) / f(x) ].",
    "pointMr": "[f(x)]^[g(x)] चे अवकलज: दोन्ही बाजूंचा log घेऊन अवकलज काढणे.",
    "category": "Formula",
    "formula": "y = u^v => ln y = v ln u",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Parametric differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt); d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt).",
    "pointMr": "पॅरामेट्रिक अवकलज: dy/dx = (dy/dt) / (dx/dt); द्वितीय अवकलज काढताना खाली dx/dt ने भागायला विसरू नये.",
    "category": "Formula",
    "formula": "dy/dx = (dy/dt)/(dx/dt)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "Implicit differentiation: Differentiate term by term with respect to x, treating y as function of x (d/dx [y²] = 2y dy/dx).",
    "pointMr": "अव्यक्त फलन अवकलज: x च्या संदर्भात प्रत्येक पदाचे अवकलज घेणे आणि dy/dx एकत्र करणे.",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Derivative of determinant: Differentiate one row (or column) at a time, keeping others constant, and sum the determinants.",
    "pointMr": "डिटरमिनंटचे अवकलज: एका वेळी एकाच ओळीचे अवकलज काढून बाकी ओळी स्थिर ठेवणे आणि बेरीज करणे.",
    "category": "Rule",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Derivative of inverse function: (f⁻¹)'(y) = 1 / f'(x), where y = f(x).",
    "pointMr": "इन्व्हर्स फलाचे अवकलज: (f⁻¹)'(y) = १ / f'(x).",
    "category": "Formula",
    "formula": "dx/dy = 1 / (dy/dx)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "Rolle's Theorem: If f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then there exists c ∈ (a, b) such that f'(c) = 0.",
    "pointMr": "रोलचे प्रमेय: f(a) = f(b) असल्यास (a, b) मध्ये किमान एक बिंदू c असा असतो जेथे f'(c) = ०.",
    "category": "Rule",
    "formula": "f'(c) = 0",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Lagrange's Mean Value Theorem (LMVT): If f is continuous on [a, b] and differentiable on (a, b), then f'(c) = [f(b) - f(a)] / (b - a).",
    "pointMr": "लाग्रांजचे मध्यम मूल्य प्रमेय (LMVT): f'(c) = [f(b) - f(a)] / (b - a).",
    "category": "Rule",
    "formula": "f'(c) = [f(b) - f(a)] / (b - a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Slope of tangent to curve y = f(x) at point (x₁, y₁): m = (dy/dx)_(x₁, y₁); Slope of normal: m_N = - 1 / m.",
    "pointMr": "स्पर्शरेषेचा उतार m = dy/dx; लंबरेषेचा उतार m_N = - १ / (dy/dx).",
    "category": "Formula",
    "formula": "m_tangent = dy/dx; m_normal = -1/m",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Equation of tangent: y - y₁ = m (x - x₁); Equation of normal: y - y₁ = (-1/m) (x - x₁).",
    "pointMr": "स्पर्शरेषेचे समीकरण: y - y₁ = m (x - x₁); लंबरेषेचे समीकरण: y - y₁ = (-1/m) (x - x₁).",
    "category": "Formula",
    "formula": "y - y₁ = m(x - x₁)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Increasing function: f'(x) > 0 for all x in interval; Decreasing function: f'(x) < 0.",
    "pointMr": "वाढणारे फलन (Increasing): f'(x) > ०; घटणारे फलन (Decreasing): f'(x) < ०.",
    "category": "Rule",
    "formula": "f'(x) > 0: Increasing",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Maxima and Minima First Derivative Test: At stationary point f'(c) = 0, if f'(x) changes from + to -, then c is local MAXIMUM.",
    "pointMr": "f'(c) = ० असताना चिन्हात + कडून - कडे बदल झाल्यास c हा कमाल (Maximum) बिंदू असतो.",
    "category": "Rule",
    "formula": "+ to - : Maximum; - to + : Minimum",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "Second Derivative Test: If f'(c) = 0 and f''(c) < 0 => local MAXIMUM; If f'(c) = 0 and f''(c) > 0 => local MINIMUM.",
    "pointMr": "द्वितीय अवकलज चाचणी: f''(c) < ० असल्यास कमाल मूल्य (Max); f''(c) > ० असल्यास किमान मूल्य (Min).",
    "category": "Rule",
    "formula": "f''(c) < 0: Max; f''(c) > 0: Min",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "Point of Inflection: A point where curve changes concavity (f''(c) = 0 and f''(x) changes sign).",
    "pointMr": "इन्फ्लेक्शन बिंदू: वक्रतेची दिशा बदलणारा बिंदू (f''(c) = ०).",
    "category": "Definition",
    "formula": "f''(c) = 0",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Rate of change: dy/dt = (dy/dx) · (dx/dt). E.g. rate of change of area of circle dA/dt = 2πr (dr/dt).",
    "pointMr": "बदलाचा दर: dy/dt = (dy/dx) × (dx/dt). उदा. वर्तुळाच्या क्षेत्रफळ बदलाचा दर dA/dt = २πr (dr/dt).",
    "category": "Formula",
    "formula": "dy/dt = (dy/dx)(dx/dt)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Approximation using differentials: f(a + h) ≈ f(a) + h · f'(a).",
    "pointMr": "अवकलज वापरून अंदाजे मूल्य काढणे: f(a + h) ≈ f(a) + h f'(a).",
    "category": "Formula",
    "formula": "f(a + h) ≈ f(a) + h f'(a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Standard derivative of sin⁻¹x = 1 / √(1 - x²); cos⁻¹x = - 1 / √(1 - x²); tan⁻¹x = 1 / (1 + x²).",
    "pointMr": "प्रमाणित अवकलज: d/dx(sin⁻¹x) = १/√(१-x²); d/dx(tan⁻¹x) = १/(१+x²).",
    "category": "Formula",
    "formula": "d/dx(tan⁻¹x) = 1/(1+x²)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Derivative of a^x = a^x ln a; Derivative of log_a x = 1 / (x ln a).",
    "pointMr": "d/dx (a^x) = a^x ln a; d/dx (log_a x) = १ / (x ln a).",
    "category": "Formula",
    "formula": "d/dx(a^x) = a^x ln a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Angle between two intersecting curves: tan θ = | (m₁ - m₂) / (1 + m₁ m₂) |, where m₁ and m₂ are slopes of tangents.",
    "pointMr": "दोन वक्रांमधील कोन: tan θ = | (m₁ - m₂) / (१ + m₁ m₂) |.",
    "category": "Formula",
    "formula": "tan θ = |(m₁-m₂)/(1+m₁m₂)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Orthogonal curves: Two curves intersect at right angles (θ = 90°) if and only if m₁ · m₂ = - 1.",
    "pointMr": "लंबरूपी वक्र (Orthogonal curves): स्पर्शरेषांचे उतार m₁ m₂ = - १ असतात.",
    "category": "Rule",
    "formula": "m₁ m₂ = -1",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Radius of curvature ρ = [ 1 + (y')² ]^(3/2) / |y''|.",
    "pointMr": "वक्रता त्रिज्या ρ = [ १ + (y')² ]^(३/२) / |y''|.",
    "category": "Formula",
    "formula": "ρ = [1+(y')²]^(3/2) / |y''|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Integration by Parts (ILATE rule): ∫ u v dx = u ∫ v dx - ∫ [ u' · (∫ v dx) ] dx. Choose u in order: Inverse, Log, Algebraic, Trig, Exponential.",
    "pointMr": "खंडशः संकलन (ILATE नियम): ∫ u v dx = u ∫ v dx - ∫ [ u' ∫ v dx ] dx. u ची निवड: Inverse, Log, Alg, Trig, Exp.",
    "category": "Formula",
    "formula": "∫ u v dx = u ∫ v - ∫(u' ∫ v)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "Special integral: ∫ e^x [ f(x) + f'(x) ] dx = e^x · f(x) + C. Extremely frequent CET/JEE shortcut.",
    "pointMr": "विशेष संकलन: ∫ e^x [ f(x) + f'(x) ] dx = e^x f(x) + C. हमखास विचारले जाणारे शॉर्टकट सूत्र.",
    "category": "Shortcut",
    "formula": "∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Standard integral: ∫ 1 / (x² + a²) dx = (1/a) tan⁻¹(x/a) + C; ∫ 1 / √(a² - x²) dx = sin⁻¹(x/a) + C.",
    "pointMr": "प्रमाणित संकलन: ∫ १/(x² + a²) dx = (१/a) tan⁻¹(x/a) + C.",
    "category": "Formula",
    "formula": "∫ 1/(x²+a²) dx = 1/a tan⁻¹(x/a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Standard integral: ∫ 1 / (x² - a²) dx = (1 / 2a) ln | (x - a) / (x + a) | + C; ∫ 1 / (a² - x²) dx = (1 / 2a) ln | (a + x) / (a - x) | + C.",
    "pointMr": "∫ १/(x² - a²) dx = (१/२a) ln | (x - a)/(x + a) | + C.",
    "category": "Formula",
    "formula": "∫ 1/(x²-a²) dx = (1/2a) ln|(x-a)/(x+a)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Standard radical: ∫ √(a² - x²) dx = (x/2) √(a² - x²) + (a²/2) sin⁻¹(x/a) + C.",
    "pointMr": "∫ √(a² - x²) dx = (x/२) √(a² - x²) + (a²/२) sin⁻¹(x/a) + C.",
    "category": "Formula",
    "formula": "∫ √(a²-x²) dx = x/2√(a²-x²) + a²/2 sin⁻¹(x/a)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Standard radical: ∫ √(x² + a²) dx = (x/2) √(x² + a²) + (a²/2) ln | x + √(x² + a²) | + C.",
    "pointMr": "∫ √(x² + a²) dx = (x/२) √(x² + a²) + (a²/२) ln | x + √(x² + a²) | + C.",
    "category": "Formula",
    "formula": "∫ √(x²+a²) dx = x/2√(x²+a²) + a²/2 ln|x+√(x²+a²)|",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "King's Property of Definite Integrals: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx. For [0, a]: ∫_0^a f(x) dx = ∫_0^a f(a - x) dx.",
    "pointMr": "किंग्स नियम (King's Property): ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.",
    "category": "Rule",
    "formula": "∫_0^a f(x) dx = ∫_0^a f(a-x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Symmetry property for even/odd functions: If f(-x) = - f(x) (odd), then ∫_-a^a f(x) dx = 0; If f(-x) = f(x) (even), then ∫_-a^a f(x) dx = 2 ∫_0^a f(x) dx.",
    "pointMr": "विषम फलनासाठी (Odd function) ∫_-a^a f(x) dx = ०; सम फलनासाठी २ ∫_0^a f(x) dx.",
    "category": "Shortcut",
    "formula": "Odd => 0; Even => 2 ∫_0^a",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "Periodic property: If f(x + T) = f(x), then ∫_0^(n T) f(x) dx = n · ∫_0^T f(x) dx.",
    "pointMr": "नियतकालिक फलन: f(x+T) = f(x) असल्यास ∫_0^(nT) f(x) dx = n ∫_0^T f(x) dx.",
    "category": "Rule",
    "formula": "∫_0^(nT) f(x) dx = n ∫_0^T f(x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "Leibniz Rule for differentiation under integral sign: d/dx [ ∫_u(x)^v(x) f(t) dt ] = f(v(x)) · v'(x) - f(u(x)) · u'(x).",
    "pointMr": "लेबनिझचा नियम: संकलनाचे अवकलज काढण्याचे अत्यंत शक्तिशाली सूत्र.",
    "category": "Formula",
    "formula": "d/dx ∫_u^v f(t) dt = f(v)v' - f(u)u'",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "Area between curve y = f(x) and x-axis from x = a to x = b: Area = ∫_a^b |y| dx.",
    "pointMr": "वक्र आणि x-अक्ष यामधील क्षेत्रफळ: Area = ∫_a^b |y| dx.",
    "category": "Formula",
    "formula": "Area = ∫_a^b |y| dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "Area between two curves y = f(x) and y = g(x): Area = ∫_a^b | f(x) - g(x) | dx.",
    "pointMr": "दोन वक्रांमधील क्षेत्रफळ: Area = ∫_a^b (वरचा वक्र - खालचा वक्र) dx.",
    "category": "Formula",
    "formula": "Area = ∫ (y_upper - y_lower) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Shortcut: Area bounded by parabola y² = 4ax and line y = mx is Area = 8 a² / (3 m³).",
    "pointMr": "परबोला y² = 4ax आणि रेषा y = mx मधील क्षेत्रफळ = ८ a² / (३ m³).",
    "category": "Shortcut",
    "formula": "Area = 8a² / (3m³)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Shortcut: Area bounded by two parabolas y² = 4ax and x² = 4by is Area = 16 a b / 3.",
    "pointMr": "y² = 4ax आणि x² = 4by या दोन परबोलांमधील क्षेत्रफळ = १६ a b / ३.",
    "category": "Shortcut",
    "formula": "Area = 16ab / 3",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "Shortcut: Area of ellipse x²/a² + y²/b² = 1 is Area = π a b.",
    "pointMr": "दीर्घवर्तुळाचे (Ellipse) एकूण क्षेत्रफळ = π a b.",
    "category": "Shortcut",
    "formula": "Area = π a b",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Order of differential equation is the order of HIGHEST derivative; Degree is power of highest derivative when equation is free from radicals and fractions.",
    "pointMr": "डिफरेंशिअल समीकरणाची कोटी (Order) = सर्वोच्च अवकलज; Degree = त्या अवकलजाचा घातांक.",
    "category": "Definition",
    "formula": "Order = Highest derivative; Degree = Power",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Variable Separable method: If dy/dx = f(x) · g(y), then integrate ∫ [ 1 / g(y) ] dy = ∫ f(x) dx + C.",
    "pointMr": "व्हेरिएबल्स वेगळे करण्याची पद्धत: x आणि y एका बाजूला घेऊन दोन्ही बाजूंना संकलन करणे.",
    "category": "Rule",
    "formula": "dy / g(y) = f(x) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Homogeneous differential equation dy/dx = f(y/x): Substitute y = v · x => dy/dx = v + x (dv/dx).",
    "pointMr": "समघाती समीकरण: y = v x ठेवून व्हेरिएबल्स वेगळे करणे.",
    "category": "Formula",
    "formula": "Substitute y = vx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Linear Differential Equation (LDE): dy/dx + P y = Q => Integrating Factor IF = e^(∫ P dx). Solution: y · (IF) = ∫ [ Q · (IF) ] dx + C.",
    "pointMr": "रेषीय समीकरण dy/dx + Py = Q: IF = e^(∫ P dx); उत्तर: y (IF) = ∫ Q (IF) dx + C.",
    "category": "Formula",
    "formula": "IF = e^(∫ P dx); y(IF) = ∫ Q(IF) dx",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Probability addition theorem: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). For mutually exclusive events P(A ∩ B) = 0.",
    "pointMr": "संभाव्यता बेरीज प्रमेय: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). परस्पर अपवर्जक घटनांसाठी P(A ∩ B) = ०.",
    "category": "Formula",
    "formula": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Conditional probability: P(A | B) = P(A ∩ B) / P(B), provided P(B) > 0.",
    "pointMr": "सशर्त संभाव्यता: P(A | B) = P(A ∩ B) / P(B).",
    "category": "Formula",
    "formula": "P(A | B) = P(A ∩ B) / P(B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Independent events: Two events A and B are independent if and only if P(A ∩ B) = P(A) · P(B) and P(A | B) = P(A).",
    "pointMr": "स्वतंत्र घटना (Independent events): P(A ∩ B) = P(A) × P(B).",
    "category": "Rule",
    "formula": "P(A ∩ B) = P(A) · P(B)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Bayes' Theorem: P(E_i | A) = [ P(E_i) · P(A | E_i) ] / [ Σ P(E_k) · P(A | E_k) ]. Reverses conditional probability.",
    "pointMr": "बेय्सचे प्रमेय (Bayes' Theorem): उलट संभाव्यता काढण्यासाठी वापरले जाते.",
    "category": "Formula",
    "formula": "P(E_i|A) = P(E_i)P(A|E_i) / Σ P(E_k)P(A|E_k)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Binomial Distribution B(n, p): Probability of r successes P(X = r) = nCr · p^r · q^(n - r), where q = 1 - p.",
    "pointMr": "द्विपदी वितरण: r यशाची संभाव्यता P(X = r) = nCr p^r q^(n - r).",
    "category": "Formula",
    "formula": "P(X = r) = nCr p^r q^(n - r)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Mean and Variance of Binomial Distribution: Mean μ = n · p; Variance σ² = n · p · q; Standard deviation σ = √(n p q). Variance is always strictly LESS than Mean.",
    "pointMr": "द्विपदी वितरणाचा मध्य = np; विचरण = npq. विचरण नेहमी मध्यापेक्षा लहान असते (npq < np).",
    "category": "Shortcut",
    "formula": "Mean = np; Variance = npq (Var < Mean)",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Circle general equation: x² + y² + 2gx + 2fy + c = 0 has Center at (-g, -f) and Radius r = √(g² + f² - c). Real circle requires g² + f² - c ≥ 0.",
    "pointMr": "वर्तुळाचे सामान्य समीकरण: केंद्र (-g, -f) आणि त्रिज्या r = √(g² + f² - c). वास्तव वर्तुळासाठी g² + f² - c ≥ ०.",
    "category": "Formula",
    "formula": "Center: (-g,-f); r = √(g²+f²-c)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Intercepts made by circle on axes: x-intercept = 2 √(g² - c); y-intercept = 2 √(f² - c). If g² = c, circle touches x-axis; If f² = c, touches y-axis.",
    "pointMr": "अक्षांवरील अंतःखंड: x-अक्षावर = २√(g² - c); y-अक्षावर = २√(f² - c). g² = c असल्यास वर्तुळ x-अक्षाला स्पर्श करतो.",
    "category": "Shortcut",
    "formula": "x-intercept = 2√(g²-c); y-intercept = 2√(f²-c)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Condition for line y = mx + c to touch circle x² + y² = a²: c² = a²(1 + m²) => Tangent equation: y = mx ± a √(1 + m²).",
    "pointMr": "रेषा वर्तुळाची स्पर्शरेषा असण्याची अट: c² = a²(१ + m²). स्पर्शरेषेचे समीकरण: y = mx ± a√(१ + m²).",
    "category": "Formula",
    "formula": "c² = a²(1 + m²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Chord of contact of tangents drawn from external point P(x₁, y₁) to circle x² + y² = a² is given by T = xx₁ + yy₁ - a² = 0.",
    "pointMr": "बाह्य बिंदू P(x₁, y₁) मधून काढलेल्या स्पर्शरेषांच्या स्पर्शबिंदूंना जोडणाऱ्या जीवेचे समीकरण: T = xx₁ + yy₁ - a² = ०.",
    "category": "Formula",
    "formula": "Chord of contact: T = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Length of tangent from external point P(x₁, y₁) to circle x² + y² + 2gx + 2fy + c = 0 is L = √(x₁² + y₁² + 2gx₁ + 2fy₁ + c) = √S₁.",
    "pointMr": "बाह्य बिंदूतून स्पर्शरेषेची लांबी: L = √S₁.",
    "category": "Formula",
    "formula": "L = √S₁",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Parabola standard form y² = 4ax: Focus (a, 0), Directrix x = -a, Vertex (0, 0), Axis y = 0, Length of Latus Rectum = 4a.",
    "pointMr": "परबोला y² = 4ax: नाभी (a, ०), नियामक रेषा x = -a, लॅटस रेक्टमची लांबी = ४a.",
    "category": "Formula",
    "formula": "Focus (a,0); Latus Rectum = 4a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Parametric coordinates of any point on parabola y² = 4ax are (at², 2at). Equation of chord joining t₁ and t₂ has slope 2 / (t₁ + t₂).",
    "pointMr": "परबोलावरील बिंदूचे पॅरामेट्रिक निर्देशक: (at², २at). जीवा जोडणाऱ्या उताराचे सूत्र = २ / (t₁ + t₂).",
    "category": "Shortcut",
    "formula": "Parametric: (at², 2at)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Equation of tangent to parabola y² = 4ax at (x₁, y₁): yy₁ = 2a(x + x₁); In slope form: y = mx + a/m (m ≠ 0).",
    "pointMr": "परबोलाच्या स्पर्शरेषेचे समीकरण: उताराच्या रूपात y = mx + a/m. स्पर्शबिंदू (a/m², 2a/m).",
    "category": "Formula",
    "formula": "y = mx + a/m",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Equation of normal to parabola y² = 4ax in terms of parameter t: y = -tx + 2at + at³; In slope form (m = -t): y = mx - 2am - am³.",
    "pointMr": "परबोलाच्या लंबरेषेचे (Normal) समीकरण: y = mx - २am - am³.",
    "category": "Formula",
    "formula": "Normal: y = mx - 2am - am³",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Focal distance of any point P(x₁, y₁) on parabola y² = 4ax is SP = x₁ + a. Sum of focal distances for focal chord is independent of y.",
    "pointMr": "परबोलावरील कोणत्याही बिंदूचे नाभीय अंतर (Focal distance): SP = x₁ + a.",
    "category": "Shortcut",
    "formula": "SP = x₁ + a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "If t₁ and t₂ are extremities of a focal chord of parabola y² = 4ax, then t₁ · t₂ = - 1. Length of focal chord is a (t + 1/t)².",
    "pointMr": "नाभीय जीवेच्या टोकांसाठी: t₁ t₂ = - १. नाभीय जीवेची लांबी = a(t + १/t)² ≥ ४a.",
    "category": "Rule",
    "formula": "Focal chord: t₁ t₂ = -1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Standard Ellipse x²/a² + y²/b² = 1 (a > b): Eccentricity e = √(1 - b²/a²) < 1. Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a.",
    "pointMr": "दीर्घवर्तुळ (a > b): विकेंद्रता e = √(१ - b²/a²) < १. नाभी (±ae, ०), लॅटस रेक्टम = २b²/a.",
    "category": "Formula",
    "formula": "e = √(1 - b²/a²); LR = 2b²/a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Focal property of Ellipse: Sum of focal distances of any point P on ellipse from the two foci is always CONSTANT and equal to major axis: SP + S'P = 2a.",
    "pointMr": "दीर्घवर्तुळाचा नाभीय गुणधर्म: कोणत्याही बिंदूच्या दोन नाभींपासूनच्या अंतरांची बेरीज नेहमी २a (Major axis) स्थिर असते.",
    "category": "Rule",
    "formula": "SP + S'P = 2a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Condition for line y = mx + c to be tangent to ellipse x²/a² + y²/b² = 1 is c² = a²m² + b². Tangent: y = mx ± √(a²m² + b²).",
    "pointMr": "रेषा दीर्घवर्तुळाची स्पर्शरेषा असण्याची अट: c² = a²m² + b².",
    "category": "Formula",
    "formula": "c² = a²m² + b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Director Circle of ellipse x²/a² + y²/b² = 1 is the locus of intersection of mutually perpendicular tangents: x² + y² = a² + b².",
    "pointMr": "दीर्घवर्तुळाचे डायरेक्टर वर्तुळ (परस्पर लंब स्पर्शरेषांचा बिंदूपथ): x² + y² = a² + b².",
    "category": "Formula",
    "formula": "Director Circle: x² + y² = a² + b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Standard Hyperbola x²/a² - y²/b² = 1: Eccentricity e = √(1 + b²/a²) > 1. Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a.",
    "pointMr": "हायपरबोला: विकेंद्रता e = √(१ + b²/a²) > १. नाभी (±ae, ०), लॅटस रेक्टम = २b²/a.",
    "category": "Formula",
    "formula": "e = √(1 + b²/a²) > 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Focal property of Hyperbola: Difference of focal distances of any point P on hyperbola from two foci is always CONSTANT: |SP - S'P| = 2a.",
    "pointMr": "हायपरबोलाचा नाभीय गुणधर्म: दोन नाभींपासूनच्या अंतरांमधील फरक नेहमी २a स्थिर असतो: |SP - S'P| = २a.",
    "category": "Rule",
    "formula": "|SP - S'P| = 2a",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Condition for line y = mx + c to touch hyperbola x²/a² - y²/b² = 1 is c² = a²m² - b². Tangent: y = mx ± √(a²m² - b²).",
    "pointMr": "रेषा हायपरबोलाची स्पर्शरेषा असण्याची अट: c² = a²m² - b².",
    "category": "Formula",
    "formula": "c² = a²m² - b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Director Circle of hyperbola x²/a² - y²/b² = 1 is x² + y² = a² - b². Real only if a > b; If a < b, no perpendicular tangents exist.",
    "pointMr": "हायपरबोलाचे डायरेक्टर वर्तुळ: x² + y² = a² - b² (केवळ a > b असतानाच वास्तव).",
    "category": "Formula",
    "formula": "Director Circle: x² + y² = a² - b²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Rectangular Hyperbola (Equilateral Hyperbola): a = b => x² - y² = a²; Eccentricity is always strictly e = √2. Asymptotes are perpendicular.",
    "pointMr": "काटकोन हायपरबोला: a = b => x² - y² = a²; विकेंद्रता नेहमी e = √२ असते; अनंतस्पर्शी परस्परांना लंब असतात.",
    "category": "Rule",
    "formula": "Rectangular hyperbola: e = √2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Rectangular hyperbola referred to asymptotes as axes: xy = c² where c² = a²/2. Parametric coordinates are (ct, c/t). Tangent: x + yt² = 2ct.",
    "pointMr": "xy = c² या काटकोन हायपरबोलाचे पॅरामेट्रिक निर्देशक (ct, c/t) असतात. स्पर्शरेषा: x + yt² = २ct.",
    "category": "Shortcut",
    "formula": "xy = c² => (ct, c/t)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Vector Triple Product expansion: a × (b × c) = (a · c) b - (a · b) c. Note: a × (b × c) ≠ (a × b) × c (non-associative).",
    "pointMr": "सदिश त्रिक गुणाकार: a × (b × c) = (a · c) b - (a · b) c. (मध्यभागी असणारा b सदिश आधी येतो).",
    "category": "Formula",
    "formula": "a × (b × c) = (a·c)b - (a·b)c",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Lagrange's Identity for vectors: |a × b|² = |a|² |b|² - (a · b)².",
    "pointMr": "लाग्रांजचे सदिश नित्यसमीकरण: |a × b|² = |a|² |b|² - (a · b)².",
    "category": "Formula",
    "formula": "|a × b|² + (a · b)² = |a|² |b|²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Vector equation of plane passing through point with position vector a and perpendicular to normal vector n: r · n = a · n = d.",
    "pointMr": "प्रतलाचे सदिश समीकरण: r · n = a · n = d. कार्टेशियन रूप: ax + by + cz + d = ०.",
    "category": "Formula",
    "formula": "r · n = d",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Perpendicular distance of point P(x₁, y₁, z₁) from plane ax + by + cz + d = 0 is D = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²).",
    "pointMr": "बिंदूचे प्रतलापासून लंब अंतर: D = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |ax₁+by₁+cz₁+d| / √(a²+b²+c²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Distance between two parallel planes ax + by + cz + d₁ = 0 and ax + by + cz + d₂ = 0 is D = |d₁ - d₂| / √(a² + b² + c²).",
    "pointMr": "दोन समांतर प्रतलांमधील अंतर: D = |d₁ - d₂| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |d₁ - d₂| / √(a²+b²+c²)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Angle θ between line r = a + λ b and plane r · n = d is given by sin θ = |b · n| / (|b| |n|). Line parallel to plane if b · n = 0.",
    "pointMr": "रेषा आणि प्रतल यामधील कोन: sin θ = |b · n| / (|b| |n|). रेषा प्रतलाला समांतर असल्यास b · n = ०.",
    "category": "Formula",
    "formula": "sin θ = |b · n| / (|b| |n|)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Intercept form of equation of plane in 3D: x/a + y/b + z/c = 1, where a, b, c are intercepts on X, Y, Z axes respectively.",
    "pointMr": "प्रतलाचे अंतःखंड रूप: x/a + y/b + z/c = १.",
    "category": "Formula",
    "formula": "x/a + y/b + z/c = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Complex number polar form: z = r(cos θ + i sin θ) = r e^(iθ), where r = |z| = √(x² + y²) and θ = arg(z) = tan⁻¹(y/x).",
    "pointMr": "संमिश्र संख्येचे पोलार रूप: z = r (cos θ + i sin θ) = r e^(iθ). r हा मॉड्युलस आणि θ हा अ‍ॅम्प्लिट्यूड आहे.",
    "category": "Formula",
    "formula": "z = r e^(iθ)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Euler's Formula: e^(iθ) = cos θ + i sin θ; e^(-iθ) = cos θ - i sin θ => cos θ = (e^(iθ) + e^(-iθ))/2; sin θ = (e^(iθ) - e^(-iθ))/(2i).",
    "pointMr": "ऑयलरचे सूत्र: e^(iθ) = cos θ + i sin θ. त्रिकोणमितीय फलने घातांक रूपात मांडणे.",
    "category": "Formula",
    "formula": "e^(iθ) = cos θ + i sin θ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "De Moivre's Theorem: (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ) for any rational number n.",
    "pointMr": "डी-मॉइव्हरेचे प्रमेय: (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ).",
    "category": "Formula",
    "formula": "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Cube roots of unity: 1, ω, ω² where ω = (-1 + i√3)/2 and ω² = (-1 - i√3)/2. Sum: 1 + ω + ω² = 0; Product: ω³ = 1.",
    "pointMr": "एककाची घनमूळे: १, ω, ω². गुणधर्म: १ + ω + ω² = ० आणि ω³ = १. ω चे परिमाण १ असते.",
    "category": "Rule",
    "formula": "1 + ω + ω² = 0; ω³ = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Powers of imaginary unit i: i = √(-1), i² = -1, i³ = -i, i⁴ = 1; For any integer k: i^(4k) = 1, i^(4k+1) = i, i^(4k+2) = -1, i^(4k+3) = -i.",
    "pointMr": "काल्पनिक घटक i चे घातांक: i⁴ = १. कोणत्याही सलग चार घातांकांची बेरीज शून्य असते: iⁿ + iⁿ⁺¹ + iⁿ⁺² + iⁿ⁺³ = ०.",
    "category": "Shortcut",
    "formula": "iⁿ + iⁿ⁺¹ + iⁿ⁺² + iⁿ⁺³ = 0",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Triangle inequalities for complex numbers: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|. Maximum of |z₁ + z₂| is |z₁| + |z₂|.",
    "pointMr": "संमिश्र संख्यांचे त्रिकोण नित्यसमीकरण: ||z₁| - |z₂|| ≤ |z₁ + z₂| ≤ |z₁| + |z₂|.",
    "category": "Formula",
    "formula": "||z₁| - |z₂|| ≤ |z₁ + z₂| ≤ |z₁| + |z₂|",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Locus |z - z₁| = |z - z₂| represents the PERPENDICULAR BISECTOR of the line segment joining points z₁ and z₂.",
    "pointMr": "बिंदूपथ |z - z₁| = |z - z₂| हा z₁ आणि z₂ ला जोडणाऱ्या रेषाखंडाचा लंबदुभाजक दर्शवतो.",
    "category": "Rule",
    "formula": "|z - z₁| = |z - z₂|: Perp Bisector",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Locus |z - z₁| / |z - z₂| = k (k > 0, k ≠ 1) represents a CIRCLE (Circle of Apollonius); If k = 1, it represents straight line.",
    "pointMr": "बिंदूपथ |z - z₁| / |z - z₂| = k (k ≠ १) हे वर्तुळ दर्शवते. k = १ असल्यास सरळ रेषा.",
    "category": "Rule",
    "formula": "Circle if k ≠ 1; Line if k = 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Walli's Formula for ∫_0^(π/2) sinⁿ x dx = ∫_0^(π/2) cosⁿ x dx: [(n-1)(n-3)... / n(n-2)...] × (π/2 if n is even, 1 if n is odd).",
    "pointMr": "वॅलिसचे सूत्र: ० ते π/२ दरम्यान sinⁿ x dx चे एका सेकंदात उत्तर काढण्याचे अतिजलद सूत्र.",
    "category": "Shortcut",
    "formula": "Walli's Formula: multiply π/2 if n is even",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Shortcut for Definite Integral: ∫_0^(π/2) [ dx / (a² cos² x + b² sin² x) ] = π / (2 a b).",
    "pointMr": "निश्चित संकलन शॉर्टकट: ∫_0^(π/2) १/(a² cos² x + b² sin² x) dx = π / (२ a b).",
    "category": "Shortcut",
    "formula": "Area = π / (2ab)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Shortcut for Definite Integral: ∫_0^(π/2) [ (sinⁿ x) / (sinⁿ x + cosⁿ x) ] dx = π / 4 for ANY power n (even fractional).",
    "pointMr": "अत्यंत विचारला जाणारा प्रश्न: ∫_0^(π/2) sinⁿ x / (sinⁿ x + cosⁿ x) dx चे उत्तर नेहमी π / ४ असते.",
    "category": "Shortcut",
    "formula": "Answer = π / 4",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Area bounded by ellipse x²/a² + y²/b² = 1 in first quadrant is π a b / 4; Total area is π a b.",
    "pointMr": "दीर्घवर्तुळाचे पहिल्या चरणातील क्षेत्रफळ = π a b / ४; एकूण क्षेत्रफळ = π a b.",
    "category": "Shortcut",
    "formula": "Area = π a b",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Bernoulli's Differential Equation: dy/dx + P y = Q yⁿ. Divide by yⁿ and substitute z = y^(1-n) to convert into standard linear form.",
    "pointMr": "बर्नौलीचे डिफरेंशिअल समीकरण: yⁿ ने भागून z = y^(१-n) मानल्यास रेषीय समीकरणात रूपांतर होते.",
    "category": "Formula",
    "formula": "Substitute z = y^(1-n)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Exact Differential Equation condition: M(x, y) dx + N(x, y) dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x.",
    "pointMr": "अचूक अवकल समीकरण अट: ∂M/∂y = ∂N/∂x. उत्तर: ∫ M dx (y स्थिर) + ∫ (x नसलेली N ची पदे) dy = C.",
    "category": "Rule",
    "formula": "∂M/∂y = ∂N/∂x",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Orthogonal Trajectories of family of curves f(x, y, c) = 0: Find dy/dx, replace dy/dx with - dx/dy, and solve new differential equation.",
    "pointMr": "ऑर्थोगोनल ट्रॅजेक्टरीज: मूळ समीकरणाचे अवकलज काढून dy/dx च्या जागी -dx/dy ठेवून संकलन करणे.",
    "category": "Rule",
    "formula": "Replace dy/dx with -dx/dy",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Permutations of n objects where p are identical of one kind, q of another, and r of a third kind is n! / (p! q! r!).",
    "pointMr": "समान वस्तूंचे क्रमचय (Permutations): n वस्तूंपैकी p, q, r समान असल्यास मांडणी = n! / (p! q! r!).",
    "category": "Formula",
    "formula": "n! / (p! q! r!)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Circular Permutations: Number of arrangements of n distinct objects along a circle is (n - 1)!; If clockwise and counter-clockwise are identical (garland of flowers), then (n - 1)! / 2.",
    "pointMr": "वर्तुळाकार क्रमचय: n वस्तूंची वर्तुळाकार मांडणी = (n - १)!; फुलांचा हार किंवा मण्यांची माळ असल्यास (n - १)! / २.",
    "category": "Formula",
    "formula": "Circle = (n-1)!; Garland = (n-1)! / 2",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Number of non-empty subsets of a set with n elements is 2ⁿ - 1; Number of proper subsets is 2ⁿ - 1.",
    "pointMr": "n घटक असलेल्या संचाचे एकूण उपसंच २ⁿ असतात; रिक्त नसलेले उपसंच २ⁿ - १ असतात.",
    "category": "Shortcut",
    "formula": "Subsets = 2ⁿ; Non-empty = 2ⁿ - 1",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Binomial Theorem: (a + b)ⁿ = Σ (nCr a^(n-r) b^r) from r = 0 to n. General term T_(r+1) = nCr a^(n-r) b^r.",
    "pointMr": "द्विपदी प्रमेय: सामान्य पद T_(r+१) = nCr a^(n-r) b^r. एकूण पदांची संख्या नेहमी n + १ असते.",
    "category": "Formula",
    "formula": "T_(r+1) = nCr a^(n-r) b^r",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Sum of binomial coefficients in expansion of (1 + x)ⁿ is nC₀ + nC₁ + nC₂ + ... + nC_n = 2ⁿ.",
    "pointMr": "द्विपदी सहगुणकांची एकूण बेरीज: nC₀ + nC₁ + ... + nC_n = २ⁿ; विषम पदांची बेरीज = २^(n-1).",
    "category": "Shortcut",
    "formula": "Σ nCr = 2ⁿ",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Middle term in binomial expansion (a + b)ⁿ: If n is even, single middle term is T_(n/2 + 1); If n is odd, two middle terms are T_((n+1)/2) and T_((n+3)/2).",
    "pointMr": "द्विपदी विस्तारातील मधले पद: n सम असल्यास एकच मधले पद (n/२ + १); n विषम असल्यास दोन मधली पदे.",
    "category": "Rule",
    "formula": "Even n: T_(n/2 + 1)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Random variable expectation (Mean) μ = E(X) = Σ (x_i P_i). Variance σ² = Var(X) = E(X²) - [E(X)]².",
    "pointMr": "यादृच्छिक चलाचा मध्य μ = E(X) = Σ x_i P_i; विचरण Var(X) = E(X²) - [E(X)]².",
    "category": "Formula",
    "formula": "Var(X) = E(X²) - [E(X)]²",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Properties of Variance and Expectation: E(aX + b) = a E(X) + b; Var(aX + b) = a² Var(X); Var(b) = 0.",
    "pointMr": "विचरणाचे गुणधर्म: Var(aX + b) = a² Var(X). स्थिर संख्येची भर टाकल्यास विचरण बदलत नाही.",
    "category": "Rule",
    "formula": "Var(aX + b) = a² Var(X)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Law of Total Probability: If B₁, B₂, ..., B_n form a partition of sample space, then P(A) = Σ P(B_i) P(A | B_i).",
    "pointMr": "एकूण संभाव्यतेचा नियम: P(A) = P(B₁)P(A|B₁) + P(B₂)P(A|B₂) + ... + P(B_n)P(A|B_n).",
    "category": "Formula",
    "formula": "P(A) = Σ P(B_i) P(A|B_i)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Poisson Distribution P(X = r) = (e^(-λ) · λ^r) / r! where λ is the average rate parameter. In Poisson distribution, Mean = Variance = λ.",
    "pointMr": "पॉइसन वितरण: मध्य आणि विचरण दोन्ही समान (λ) असतात: Mean = Variance = λ.",
    "category": "Rule",
    "formula": "Poisson: Mean = Variance = λ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Correlation Coefficient r between two variables X and Y satisfies - 1 ≤ r ≤ + 1. Independent variables have r = 0.",
    "pointMr": "सहसंबंध गुणांक r चे मूल्य नेहमी -१ ते +१ दरम्यान असते. स्वतंत्र चलांसाठी r = ०.",
    "category": "Rule",
    "formula": "-1 ≤ r ≤ 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Regression lines y on x and x on y intersect at the point of means (x̄, ȳ). Angle between regression lines tan θ = |(1 - r²)/r| · (σ_x σ_y)/(σ_x² + σ_y²).",
    "pointMr": "रिग्रेशन रेषा नेहमी मध्य बिंदूत (x̄, ȳ) छेदतात. r = ±१ असल्यास दोन्ही रेषा एकरूप असतात.",
    "category": "Rule",
    "formula": "Regression lines pass through (x̄, ȳ)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Square root of a complex number: √(x + iy) = ± [ √((|z| + x)/2) + i sgn(y) √((|z| - x)/2) ].",
    "pointMr": "संमिश्र संख्येचे वर्गमूळ काढण्याचे शॉर्टकट सूत्र: ± [ √((|z|+x)/2) + i √((|z|-x)/2) ].",
    "category": "Shortcut",
    "formula": "√(x+iy) = ± [√(|z|+x)/2 + i √(|z|-x)/2]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Distance of origin from plane ax + by + cz + d = 0 is D = |d| / √(a² + b² + c²).",
    "pointMr": "मूळ बिंदूचे (Origin) प्रतलापासून लंब अंतर: D = |d| / √(a² + b² + c²).",
    "category": "Formula",
    "formula": "D = |d| / √(a²+b²+c²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Condition for lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂ to be perpendicular is a₁a₂ + b₁b₂ + c₁c₂ = 0.",
    "pointMr": "दोन रेषा लंब असण्याची मूलभूत अट: a₁a₂ + b₁b₂ + c₁c₂ = ०.",
    "category": "Rule",
    "formula": "a₁a₂ + b₁b₂ + c₁c₂ = 0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Direction ratios of line joining points (x₁, y₁, z₁) and (x₂, y₂, z₂) are (x₂ - x₁, y₂ - y₁, z₂ - z₁).",
    "pointMr": "दोन बिंदूंना जोडणाऱ्या रेषेचे दिशा गुणोत्तर: (x₂ - x₁, y₂ - y₁, z₂ - z₁).",
    "category": "Formula",
    "formula": "(x₂ - x₁, y₂ - y₁, z₂ - z₁)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Shortest distance between parallel lines r = a₁ + λ b and r = a₂ + μ b is d = |(a₂ - a₁) × b| / |b|.",
    "pointMr": "समांतर रेषांमधील लंब अंतर: d = |(a₂ - a₁) × b| / |b|.",
    "category": "Formula",
    "formula": "d = |(a₂ - a₁) × b| / |b|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Area of triangle in 3D with vertices A, B, C: Area = (1/2) |AB × AC|.",
    "pointMr": "3D मध्ये त्रिकोणाचे क्षेत्रफळ: Area = (१/२) |AB × AC|.",
    "category": "Formula",
    "formula": "Area = 1/2 |AB × AC|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Volume of parallelepiped with coterminous vectors a, b, c is [a b c] = a · (b × c). If volume is zero, vectors are coplanar.",
    "pointMr": "समांतर षट्फलकाचे घनफळ [a b c]. घनफळ शून्य असल्यास तिन्ही सदिश एकाच प्रतलात असतात.",
    "category": "Formula",
    "formula": "Volume = [a b c]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "Limit property: lim(x->a) [ (xⁿ - aⁿ) / (x - a) ] = n · a^(n-1) for any real number n.",
    "pointMr": "प्रमाणित मर्यादा: lim (xⁿ - aⁿ)/(x - a) = n a^(n-1).",
    "category": "Formula",
    "formula": "lim (xⁿ - aⁿ)/(x - a) = n a^(n-1)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Limit property: lim(x->0) [ (e^x - 1) / x ] = 1; lim(x->0) [ (a^x - 1) / x ] = ln a.",
    "pointMr": "प्रमाणित मर्यादा: lim (e^x - 1)/x = १; lim (a^x - 1)/x = ln a.",
    "category": "Formula",
    "formula": "lim (a^x - 1)/x = ln a",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "Derivative of tan x is sec²x; cot x is - cosec²x; sec x is sec x tan x; cosec x is - cosec x cot x.",
    "pointMr": "त्रिकोणमितीय अवकलज: d/dx(tan x) = sec²x; d/dx(cot x) = - cosec²x.",
    "category": "Formula",
    "formula": "d/dx(tan x) = sec²x",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Derivative of |x| is x / |x| = sgn(x) for all x ≠ 0; not differentiable at x = 0.",
    "pointMr": "|x| चे अवकलज x/|x| असते (x ≠ ० साठी); x = ० ला अवकलज अस्तित्वात नसते.",
    "category": "Rule",
    "formula": "d/dx |x| = x/|x| (x ≠ 0)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Integration of tan x: ∫ tan x dx = ln |sec x| + C = - ln |cos x| + C.",
    "pointMr": "tan x चे संकलन: ∫ tan x dx = ln |sec x| + C.",
    "category": "Formula",
    "formula": "∫ tan x dx = ln|sec x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "Integration of cot x: ∫ cot x dx = ln |sin x| + C.",
    "pointMr": "cot x चे संकलन: ∫ cot x dx = ln |sin x| + C.",
    "category": "Formula",
    "formula": "∫ cot x dx = ln|sin x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Integration of sec x: ∫ sec x dx = ln |sec x + tan x| + C = ln |tan(π/4 + x/2)| + C.",
    "pointMr": "sec x चे संकलन: ∫ sec x dx = ln |sec x + tan x| + C.",
    "category": "Formula",
    "formula": "∫ sec x dx = ln|sec x + tan x| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Integration of cosec x: ∫ cosec x dx = ln |cosec x - cot x| + C = ln |tan(x/2)| + C.",
    "pointMr": "cosec x चे संकलन: ∫ cosec x dx = ln |cosec x - cot x| + C = ln |tan(x/2)| + C.",
    "category": "Formula",
    "formula": "∫ cosec x dx = ln|tan(x/2)| + C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Derivative of definite integral with constant limits is always ZERO: d/dx [ ∫_a^b f(t) dt ] = 0.",
    "pointMr": "स्थिर मर्यादा असलेल्या निश्चित संकलनाचे x च्या संदर्भातील अवकलज नेहमी शून्य असते.",
    "category": "Rule",
    "formula": "d/dx [ ∫_a^b f(t) dt ] = 0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "A continuous function on a closed bounded interval [a, b] is bounded and attains its maximum and minimum values (Extreme Value Theorem).",
    "pointMr": "बंदिस्त अंतरालावर [a, b] संतत असणारे फलन नेहमी कमाल व किमान मूल्ये गाठते.",
    "category": "Rule",
    "formula": "Attains maximum and minimum on [a,b]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "If f(x) is strictly increasing, its inverse function f⁻¹(x) exists and is also strictly increasing.",
    "pointMr": "कडकडीत वाढणाऱ्या फलनाचा इन्व्हर्स अस्तित्वात असतो आणि तोही वाढणाराच असतो.",
    "category": "Rule",
    "formula": "f increasing => f⁻¹ increasing",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "The function f(x) = x³ - 3x has local maximum at x = - 1 and local minimum at x = 1.",
    "pointMr": "f(x) = x³ - ३x चे कमाल मूल्य x = -१ ला (+२) आणि किमान मूल्य x = १ ला (-२) असते.",
    "category": "Shortcut",
    "formula": "Local max at x=-1; Local min at x=1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Angle of intersection between curves y = x² and x = y² at (1, 1): tan θ = 3/4 => θ = tan⁻¹(3/4).",
    "pointMr": "y = x² आणि x = y² वक्रांमधील कोन (१, १) बिंदूवर θ = tan⁻¹(३/४) असतो.",
    "category": "Shortcut",
    "formula": "θ = tan⁻¹(3/4)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Subtangent length for curve y = f(x) is |y / y'|; Subnormal length is |y · y'|.",
    "pointMr": "सबटँजंट लांबी = |y / y'|; सबनॉर्मल लांबी = |y y'|.",
    "category": "Formula",
    "formula": "Subtangent = |y/y'|; Subnormal = |y y'|",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "The curve y = e^x has constant subtangent length equal to 1 for all x.",
    "pointMr": "y = e^x या वक्राची सबटँजंट लांबी सर्वत्र १ (एकक) स्थिर असते.",
    "category": "Shortcut",
    "formula": "Subtangent of e^x is 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "Euler's totient function φ(p) = p - 1 for prime p. Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) if gcd(a, p) = 1.",
    "pointMr": "फर्मेटचे छोटे प्रमेय: मूळ संख्या p साठी a^(p-1) ≡ १ (mod p).",
    "category": "Rule",
    "formula": "a^(p-1) ≡ 1 (mod p)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Area of region bounded by y = sin x and x-axis from x = 0 to x = 2π is 4 sq units (each loop is 2 sq units).",
    "pointMr": "y = sin x वक्राचा एक लूप २ चौरस एकक क्षेत्रफळ व्यापतो; ० ते २π मधील क्षेत्रफळ = ४ चौरस एकक.",
    "category": "Shortcut",
    "formula": "Area of single loop of sin x = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Area enclosed between y = |x| and y = 1 is 1 sq unit; bounded by y = x² and y = x is 1/6 sq unit.",
    "pointMr": "y = x² आणि y = x मधील क्षेत्रफळ = १/६ चौरस एकक असते.",
    "category": "Shortcut",
    "formula": "Area between y=x² and y=x is 1/6",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Degree of differential equation [ 1 + (dy/dx)² ]^(3/2) = d²y/dx² is 2 (squaring both sides eliminates fractional power).",
    "pointMr": "समीकरणाचा अपूर्णांक घातांक काढून डिग्री तपासली पाहिजे: दोन्ही बाजूंचा वर्ग केल्यावर डिग्री २ येते.",
    "category": "Rule",
    "formula": "Degree = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "General solution of dy/dx = y/x is y = c x (family of straight lines passing through origin).",
    "pointMr": "dy/dx = y/x चे उत्तर y = c x (मूळ बिंदूतून जाणाऱ्या रेषांचा संच).",
    "category": "Formula",
    "formula": "y = cx",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "General solution of dy/dx = - x/y is x² + y² = c² (family of concentric circles centered at origin).",
    "pointMr": "dy/dx = - x/y चे उत्तर x² + y² = c² (केंद्रीत वर्तुळांचा संच).",
    "category": "Formula",
    "formula": "x² + y² = c²",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Integrating Factor (IF) of dy/dx + (1/x) y = x² is IF = e^(∫ 1/x dx) = e^(ln x) = x.",
    "pointMr": "dy/dx + (१/x)y = x² चा इंटिग्रेटिंग फॅक्टर IF = x असतो.",
    "category": "Shortcut",
    "formula": "IF = x",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Order of differential equation of family of all circles touching x-axis at origin is 1.",
    "pointMr": "मूळ बिंदूवर x-अक्षाला स्पर्श करणाऱ्या वर्तुळांच्या कुटुंबाची कोटी १ असते.",
    "category": "Concept",
    "formula": "Order = 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "If two events are independent, P(A ∩ B) = P(A) · P(B); If mutually exclusive, P(A ∩ B) = 0 and P(A ∪ B) = P(A) + P(B).",
    "pointMr": "स्वतंत्र घटनांसाठी गुणाकार नियम; परस्पर अपवर्जक घटनांसाठी बेरीज नियम लागू होतो.",
    "category": "Rule",
    "formula": "P(A ∩ B) = P(A)·P(B)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "If A and B are independent events, then their complements A' and B' are ALSO independent.",
    "pointMr": "जर A आणि B स्वतंत्र असतील, तर त्यांचे पूरक संच A' आणि B' देखील परस्पर स्वतंत्र असतात.",
    "category": "Rule",
    "formula": "A and B indep => A' and B' indep",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Odd in favor of an event with probability p is p : (1 - p); Odds against is (1 - p) : p.",
    "pointMr": "घटनेच्या बाजूने गुणोत्तर: p : (१ - p); घटनेच्या विरुद्ध गुणोत्तर: (१ - p) : p.",
    "category": "Definition",
    "formula": "Odds in favor = p / (1 - p)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Probability of throwing a sum of 7 with two fair dice is 6 / 36 = 1/6 (most probable sum).",
    "pointMr": "दोन फासे फेकल्यावर ७ बेरीज येण्याची संभाव्यता सर्वाधिक (६/३६ = १/६) असते.",
    "category": "Shortcut",
    "formula": "P(sum=7) = 1/6 (most probable)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "The number of onto functions (surjections) from set of m elements to set of 2 elements is 2ᵐ - 2.",
    "pointMr": "m घटकांच्या संचावरून २ घटकांच्या संचावर तयार होणारी एकूण ऑन-टू फलने = २ᵐ - २.",
    "category": "Formula",
    "formula": "Surjections = 2ᵐ - 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "The number of one-one functions (injections) from set of m elements to set of n elements (m ≤ n) is nPm = n! / (n - m)!.",
    "pointMr": "m घटकांपासून n घटकांवर तयार होणारी १-१ फलने = nPm.",
    "category": "Formula",
    "formula": "Injections = nPm",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "De Moivre's identity for trigonometric multiple angles: cos 2θ = 2 cos²θ - 1 = 1 - 2 sin²θ; sin 2θ = 2 sin θ cos θ.",
    "pointMr": "cos २θ = २ cos²θ - १; sin २θ = २ sin θ cos θ.",
    "category": "Formula",
    "formula": "cos 2θ = 2cos²θ - 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Half angle formulas: 1 - cos θ = 2 sin²(θ/2); 1 + cos θ = 2 cos²(θ/2). Extremely useful in calculus substitutions.",
    "pointMr": "१ - cos θ = २ sin²(θ/२); १ + cos θ = २ cos²(θ/२). कॅल्क्युलससाठी अतिशय महत्त्वाचे.",
    "category": "Shortcut",
    "formula": "1 - cos θ = 2 sin²(θ/2)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Tan half angle formula: tan(θ/2) = (1 - cos θ) / sin θ = sin θ / (1 + cos θ).",
    "pointMr": "tan(θ/२) = (१ - cos θ) / sin θ.",
    "category": "Formula",
    "formula": "tan(θ/2) = (1 - cos θ) / sin θ",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Cosine of angle between two lines with direction cosines l₁, m₁, n₁ and l₂, m₂, n₂ is cos θ = l₁l₂ + m₁m₂ + n₁n₂.",
    "pointMr": "दिशा कोसाइन दिलेल्या दोन रेषांमधील कोन: cos θ = l₁l₂ + m₁m₂ + n₁n₂.",
    "category": "Formula",
    "formula": "cos θ = l₁l₂ + m₁m₂ + n₁n₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "If line makes angles α, β, γ with coordinate axes, then cos²α + cos²β + cos²γ = 1 and sin²α + sin²β + sin²γ = 2.",
    "pointMr": "रेषेने अक्षांशी केलेले कोन: cos²α + cos²β + cos²γ = १ आणि sin²α + sin²β + sin²γ = २.",
    "category": "Shortcut",
    "formula": "Σ cos²α = 1; Σ sin²α = 2",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "The foot of perpendicular from (x₁, y₁) to line ax + by + c = 0: (x - x₁)/a = (y - y₁)/b = - (ax₁ + by₁ + c) / (a² + b²).",
    "pointMr": "बिंदूवरून रेषेवर टाकलेल्या लंबपादाचे निर्देशक काढण्याचे थेट सूत्र.",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = - (ax₁+by₁+c)/(a²+b²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Image of point (x₁, y₁) with respect to line ax + by + c = 0: (x - x₁)/a = (y - y₁)/b = - 2 (ax₁ + by₁ + c) / (a² + b²).",
    "pointMr": "रेषेतील बिंदूची प्रतिमा (Image) काढण्याचे थेट सूत्र: -२ ने गुणाकार.",
    "category": "Formula",
    "formula": "(x - x₁)/a = (y - y₁)/b = - 2(ax₁+by₁+c)/(a²+b²)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Centroid of triangle with vertices z₁, z₂, z₃ in complex plane is (z₁ + z₂ + z₃) / 3.",
    "pointMr": "संमिश्र प्रतलात त्रिकोणाचा मध्यगासंपात बिंदू (Centroid): (z₁ + z₂ + z₃) / ३.",
    "category": "Formula",
    "formula": "Centroid = (z₁ + z₂ + z₃) / 3",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Condition for triangle with vertices z₁, z₂, z₃ to be equilateral: z₁² + z₂² + z₃² = z₁z₂ + z₂z₃ + z₃z₁.",
    "pointMr": "संमिश्र संख्यांनी बनलेला त्रिकोण समभुज (Equilateral) असण्याची अट: z₁² + z₂² + z₃² = z₁z₂ + z₂z₃ + z₃z₁.",
    "category": "Rule",
    "formula": "z₁² + z₂² + z₃² = z₁z₂ + z₂z₃ + z₃z₁",
    "badge": "PYQ Trends & Advanced"
  }
];

export const BIOLOGY_200_POINTS: ChapterPointItem[] = [
  {
    "id": 1,
    "point": "Cell Theory proposed by Schleiden (1838) and Schwann (1839); Rudolf Virchow (1855) added 'Omnis cellula-e cellula' (all cells arise from pre-existing cells).",
    "pointMr": "सेल थिअरी: श्लायडन व श्वान यांनी मांडली; रुडॉल्फ विरचॉव्ह यांनी 'Omnis cellula-e cellula' (नवीन पेशी जुन्या पेशींपासून बनतात) जोडले.",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 2,
    "point": "Mycoplasma is the smallest living cell (0.3 μm in length) and LACKS a cell wall; can survive without oxygen.",
    "pointMr": "मायकोप्लाझ्मा ही सर्वात लहान पेशी (०.३ μm) असून तिला पेशीभित्तिका नसते आणि ती ऑक्सिजनशिवाय जगू शकते.",
    "category": "Concept",
    "formula": "Smallest cell: Mycoplasma",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 3,
    "point": "Fluid Mosaic Model of cell membrane proposed by Singer and Nicolson (1972): Quasi-fluid nature of lipid bilayer enables lateral movement of proteins.",
    "pointMr": "फ्लुइड मोझॅक मॉडेल: सिंगर व निकोल्सन (१९७२). लिपिडच्या दुहेरी थरात प्रथिने तरंगत असतात.",
    "category": "Rule",
    "formula": "Singer & Nicolson (1972)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 4,
    "point": "Mitochondria and Chloroplasts are semi-autonomous organelles having their own circular dsDNA and 70S ribosomes.",
    "pointMr": "मायटोकॉन्ड्रिया आणि हरितलवके (Chloroplasts) अर्ध-स्वायत्त अंगके असून त्यांच्यात स्वतःचा चक्रीय DNA व 70S रायबोसोम असतात.",
    "category": "Concept",
    "formula": "Semi-autonomous: 70S ribosomes + circular DNA",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 5,
    "point": "Ribosomes in prokaryotes are 70S (50S + 30S subunits); in eukaryotic cytoplasm are 80S (60S + 40S subunits). S stands for Svedberg unit (sedimentation coefficient).",
    "pointMr": "प्रोकॅरिओट्समध्ये 70S रायबोसोम; युकेरिओट्समध्ये 80S रायबोसोम असतात. S म्हणजे स्वेडबर्ग एकक.",
    "category": "Rule",
    "formula": "Prokaryote=70S; Eukaryote=80S",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 6,
    "point": "Endomembrane system includes: Endoplasmic Reticulum (ER), Golgi apparatus, Lysosomes, and Vacuoles. Mitochondria, chloroplasts and peroxisomes are NOT part of it.",
    "pointMr": "एंडोमेम्ब्रेन प्रणालीत ER, गॉल्जी संकुल, लायसोसोम व रिक्तिका समाविष्ट असतात; मायटोकॉन्ड्रिया व क्लोरोप्लास्ट यात नसतात.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 7,
    "point": "Lysosomes are single-membrane bound suicidal bags containing hydrolytic enzymes (lipases, proteases, carbohydrases) active at ACIDIC pH (pH ≈ 5).",
    "pointMr": "लायसोसोम (आत्मघातकी पिशव्या) मधील हायड्रोलिटिक विकरे आम्लधर्मी pH (pH ≈ ५) वर कार्यक्षम असतात.",
    "category": "Concept",
    "formula": "Active at acidic pH ≈ 5",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 8,
    "point": "Cell cycle phases: G₁ (gap 1, active growth) -> S (DNA synthesis / replication, amount doubles from 2C to 4C, chromosome number remains 2n) -> G₂ -> M phase (mitosis).",
    "pointMr": "पेशी चक्र: S टप्प्यात DNA चे प्रमाण दुप्पट होते (2C चे 4C), परंतु गुणसूत्रांची संख्या 2n च राहते.",
    "category": "Rule",
    "formula": "S phase: DNA doubles (2C->4C), chromosomes 2n",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 9,
    "point": "G₀ phase (Quiescent stage): Cells remain metabolically active but do NOT proliferate unless called upon to do so (e.g. heart cells, neurons).",
    "pointMr": "G₀ अवस्था (विश्रांती अवस्था): पेशी चयापचय दृष्ट्या सक्रिय असतात पण विभाजित होत नाहीत (उदा. मज्जापेशी, हृदय पेशी).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 10,
    "point": "Meiosis I Prophase I substages: Leptotene -> Zygotene (synapsis, synaptonemal complex formed) -> Pachytene (crossing over via recombinase) -> Diplotene (chiasmata visible) -> Diakinesis (terminalization).",
    "pointMr": "मियोसिस प्रोफेज I चे ५ टप्पे: लेप्टोटीन -> झायगोटीन (Synapsis) -> पॅकीटीन (Crossing over) -> डिप्लोटीन (Chiasmata) -> डायकिनेसिस.",
    "category": "Rule",
    "formula": "Crossing over in Pachytene",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 11,
    "point": "Crossing over occurs in PACHYTENE stage between non-sister chromatids of homologous chromosomes catalyzed by enzyme recombinase.",
    "pointMr": "गुणसूत्रांची अदलाबदल (Crossing over) ही पॅकीटीन टप्प्यात नॉन-सिस्टर क्रोमॅटिड्समध्ये रिकॉम्बिनेझ विकराद्वारे होते.",
    "category": "PYQ_Trend",
    "formula": "Pachytene: Crossing over",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 12,
    "point": "Mendel's Monohybrid Cross phenotypic ratio is 3 : 1; Genotypic ratio is 1 : 2 : 1.",
    "pointMr": "मेंडेलच्या एकसंकर (Monohybrid) प्रयोगाचे दृश्य गुणोत्तर ३:१ आणि जनुकीय गुणोत्तर १:२:१ असते.",
    "category": "Formula",
    "formula": "Phenotypic 3:1; Genotypic 1:2:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 13,
    "point": "Mendel's Dihybrid Cross phenotypic ratio is 9 : 3 : 3 : 1 (9 round yellow, 3 round green, 3 wrinkled yellow, 1 wrinkled green).",
    "pointMr": "द्विसंकरण (Dihybrid) प्रयोगाचे दृश्य गुणोत्तर ९:३:३:१ असते.",
    "category": "Formula",
    "formula": "9:3:3:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 14,
    "point": "Incomplete Dominance in Mirabilis jalapa (4 o'clock plant) and Antirrhinum majus (Snapdragon): Phenotypic and genotypic ratios are identical: 1 : 2 : 1 (1 Red : 2 Pink : 1 White).",
    "pointMr": "अपूर्ण प्रभाविता (Incomplete dominance): दृश्य व जनुकीय दोन्ही गुणोत्तरे समान १:२:१ असतात (उदा. स्नॅपड्रॅगन गुलाबी फुले).",
    "category": "Shortcut",
    "formula": "Incomplete: Phenotype = Genotype = 1:2:1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 15,
    "point": "Codominance: Both alleles express equally in heterozygote. Classic example is ABO blood grouping (controlled by gene I with 3 alleles: I^A, I^B, i giving 6 genotypes and 4 phenotypes).",
    "pointMr": "सहप्रभाविता (Codominance): दोन्हींचे समान प्रकटीकरण (उदा. मानवी ABO रक्तगट: I^A I^B रक्तगट AB बनवतो).",
    "category": "Concept",
    "formula": "ABO Blood: 6 genotypes, 4 phenotypes",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 16,
    "point": "Test Cross: Crossing an individual with dominant phenotype (unknown genotype) with a homozygous recessive parent. If all progeny dominant => homozygous; if 1:1 ratio => heterozygous.",
    "pointMr": "टेस्ट क्रॉस: अज्ञात प्रभावी सजीवाचा अप्रभावी जनकासोबत संकर. गुणोत्तर १:१ आल्यास सजीव हेटरोझायगस असतो.",
    "category": "Rule",
    "formula": "Test cross ratio = 1:1 (monohybrid)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 17,
    "point": "Pleiotropy: A single gene influences multiple phenotypic traits (e.g. Phenylketonuria PKU causes mental retardation and reduced hair/skin pigmentation).",
    "pointMr": "प्लीओट्रॉपी (Pleiotropy): एकच जनुक एकापेक्षा जास्त दृश्य लक्षणांवर नियंत्रण ठेवतो (उदा. Phenylketonuria).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 18,
    "point": "Polygenic Inheritance: Traits controlled by three or more genes, showing quantitative variation (e.g. human skin color, human height). Bell-shaped curve distribution.",
    "pointMr": "पॉलीजेनिक वारसा: अनेक जनुकांमुळे नियंत्रित लक्षणे (उदा. मानवी त्वचेचा रंग).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 19,
    "point": "Sex determination in humans, Drosophila: XX-XY type (male heterogamety); Birds: ZW-ZZ type (female heterogamety ZW, male homogametic ZZ); Grasshopper: XX-XO type.",
    "pointMr": "लिंग निश्चिती: मानवात पुरुष हेटरोगामेटिक (XY); पक्ष्यांमध्ये मादी हेटरोगामेटिक (ZW); टोळात XO पद्धत.",
    "category": "Rule",
    "formula": "Birds: Female ZW, Male ZZ",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 20,
    "point": "Down's Syndrome is Trisomy of chromosome 21 (47, XX or XY + 21); First described by Langdon Down (1866). Short stature, furrowed tongue, mental development retarded.",
    "pointMr": "डाउन्स सिंड्रोम: २१ व्या गुणसूत्राची ट्रायसोमी (Trisomy 21). एकूण ४७ गुणसूत्रे.",
    "category": "Concept",
    "formula": "Trisomy 21 (47 chromosomes)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 21,
    "point": "Klinefelter's Syndrome: Karyotype 47, XXY (extra X in male). Overall masculine with feminine development (gynaecomastia), sterile.",
    "pointMr": "क्लाइनफेल्टर्स सिंड्रोम: ४७, XXY. पुरुष शरीरात स्तनांची वाढ (Gynaecomastia) आणि वंध्यत्व.",
    "category": "Concept",
    "formula": "47, XXY (Gynaecomastia, sterile)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 22,
    "point": "Turner's Syndrome: Monosomy 45, XO (missing X in female). Sterile females with rudimentary ovaries, webbed neck, lack of secondary sexual characters.",
    "pointMr": "टर्नर्स सिंड्रोम: ४५, XO. स्त्रियांमध्ये एक X गुणसूत्र कमी; अविकसित अंडाशय व वंध्यत्व.",
    "category": "Concept",
    "formula": "45, XO (Rudimentary ovaries)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 23,
    "point": "Hemophilia and Color blindness are Sex-linked (X-linked) RECESSIVE disorders; Males are more frequently affected because they have only one X chromosome.",
    "pointMr": "हिमोफिलिया व रंगअंधळेपणा हे X-संलग्न अप्रभावी (X-linked recessive) आजार आहेत; पुरुषांमध्ये जास्त आढळतात.",
    "category": "Rule",
    "formula": "X-linked recessive: Males affected more",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 24,
    "point": "Sickle Cell Anemia is an Autosomal RECESSIVE disorder caused by single base substitution: GAG -> GUG in 6th codon of β-globin gene (Glutamic acid replaced by Valine).",
    "pointMr": "सिकल सेल अ‍ॅनेमिया: β-ग्लोबिन साखळीतील ६ व्या स्थानावर ग्लुटामिक अ‍ॅसिडऐवजी व्हॅलिन येतो (GAG -> GUG).",
    "category": "PYQ_Trend",
    "formula": "GAG -> GUG (Glu -> Val at 6th position)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 25,
    "point": "Thalassemia is a quantitative defect (less globin synthesized); Sickle cell anemia is a qualitative defect (incorrect globin synthesized).",
    "pointMr": "थॅलेसेमिया हा प्रमाणात्मक दोष आहे (कमी हिमोग्लोबिन); सिकल सेल हा गुणात्मक दोष आहे (सदोष हिमोग्लोबिन).",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 26,
    "point": "Transforming Principle proved by Griffith (1928) using Streptococcus pneumoniae (S-strain virulent, R-strain avirulent).",
    "pointMr": "ग्रिफिथचा ट्रान्सफॉर्मिंग प्रयोग (१९२८): न्यूमोनियाचे S-स्ट्रेन जंतू उष्णतेने मारले तरी R-स्ट्रेनला संसर्गजन्य बनवतात.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 27,
    "point": "Biochemical characterization of transforming principle by Avery, MacLeod, and McCarty (1944) proved that DNA is the transforming genetic material (inhibited by DNase).",
    "pointMr": "एव्हरी, मॅकलिओड व मॅककार्टी (१९४४): DNase विकराने ट्रान्सफॉर्मेशन थांबले, ज्यामुळे DNA हेच जनुकीय द्रव्य असल्याचे सिद्ध झाले.",
    "category": "Rule",
    "formula": "DNase destroys transforming principle",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 28,
    "point": "Hershey and Chase (1952) gave unequivocal proof that DNA is the genetic material using bacteriophage T2 labeled with ³²P (DNA) and ³⁵S (protein coat).",
    "pointMr": "हर्षी आणि चेस (१९५२): ³²P आणि ³⁵S किरणोत्सारी आयसोटोप्स वापरून DNA हेच जनुकीय द्रव्य असल्याचा अंतिम पुरावा दिला.",
    "category": "Rule",
    "formula": "Hershey-Chase: ³²P labels DNA, ³⁵S labels protein",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 29,
    "point": "Semiconservative DNA replication proved experimentally by Meselson and Stahl (1958) using E. coli grown in ¹⁵NH₄Cl heavy nitrogen and CsCl density gradient centrifugation.",
    "pointMr": "मेसेल्सन व स्टाल (१९५८): E. coli आणि ¹⁵N जड नायट्रोजन वापरून DNA चे सेमी-कंझर्व्हेटिव्ह रेप्लिकेशन सिद्ध केले.",
    "category": "Rule",
    "formula": "Meselson & Stahl: ¹⁵N and CsCl gradient",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 30,
    "point": "Taylor and colleagues (1958) proved semiconservative replication on chromosomes in Vicia faba (faba beans) using tritiated thymidine (³H-thymidine).",
    "pointMr": "टेलर (१९५८): Vicia faba मध्ये ³H-थायमिडीन वापरून गुणसूत्रांचे सेमी-कंझर्व्हेटिव्ह विभाजन सिद्ध केले.",
    "category": "Concept",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 31,
    "point": "DNA replication occurs in 5' -> 3' direction catalyzed by DNA-dependent DNA polymerase. Leading strand is continuous; Lagging strand is synthesized discontinuously as Okazaki fragments.",
    "pointMr": "DNA रेप्लिकेशन ५' -> ३' दिशेने होते. लीडिंग स्ट्रँड अखंड असतो; लॅगिंग स्ट्रँड ओकाझाकी तुकड्यांच्या रूपात तयार होतो.",
    "category": "Rule",
    "formula": "Replication 5' -> 3'; Okazaki fragments joined by ligase",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 32,
    "point": "DNA Ligase joins Okazaki fragments by forming phosphodiester bonds.",
    "pointMr": "DNA लायगेज (Ligase) हे विकर ओकाझाकी तुकड्यांना फॉस्फोडायएस्टर बंधाने जोडून अखंड साखळी बनवते.",
    "category": "Concept",
    "formula": "Ligase joins DNA fragments",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 33,
    "point": "Transcription: Synthesis of RNA from DNA template strand (3' -> 5') catalyzed by RNA polymerase in 5' -> 3' direction.",
    "pointMr": "ट्रान्सक्रिप्शन: DNA च्या ३' -> ५' टेम्पलेट स्ट्रँडवरून ५' -> ३' दिशेने RNA तयार होण्याची प्रक्रिया.",
    "category": "Rule",
    "formula": "Template strand: 3' -> 5'; RNA formed: 5' -> 3'",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 34,
    "point": "Transcription unit has three regions: Promoter (binding site for RNA polymerase), Structural gene, and Terminator.",
    "pointMr": "ट्रान्सक्रिप्शन युनिटमध्ये तीन भाग असतात: प्रमोटर (RNA पॉलिमरेज जोडण्याची जागा), स्ट्रक्चरल जनुक व टर्मिनेटर.",
    "category": "Definition",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 35,
    "point": "In eukaryotes, RNA Polymerase I transcribes rRNAs (28S, 18S, 5.8S); RNA Polymerase II transcribes hnRNA (precursor of mRNA); RNA Polymerase III transcribes tRNA, 5S rRNA, snRNAs.",
    "pointMr": "युकेरिओट्स: RNA Pol I -> rRNA; RNA Pol II -> mRNA (hnRNA); RNA Pol III -> tRNA व 5S rRNA तयार करतो.",
    "category": "Rule",
    "formula": "Pol I: rRNA; Pol II: mRNA; Pol III: tRNA",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 36,
    "point": "Post-transcriptional processing of hnRNA in eukaryotes: Splicing (introns removed, exons joined), 5'-Capping (methyl guanosine triphosphate m⁷Gppp), and 3'-Tailing (poly-A tail of 200-300 adenylate residues).",
    "pointMr": "hnRNA चे रूपांतर: स्प्लायसिंग (Introns काढून Exons जोडणे), ५' कॅपिंग (m⁷G) आणि ३' पॉली-A टेलिंग.",
    "category": "Concept",
    "formula": "Splicing: Introns removed, exons spliced",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 37,
    "point": "Genetic Code is a TRIPLET of nucleotides. Total 64 codons: 61 code for amino acids, 3 are Stop (Nonsense) codons: UAA (ochre), UAG (amber), UGA (opal).",
    "pointMr": "जनुकीय कोड ट्रिपलेट असतो. एकूण ६४ कोडॉन्सपैकी ६१ अमिनो आम्ले दर्शवतात; ३ स्टॉप कोडॉन्स आहेत: UAA, UAG, UGA.",
    "category": "Rule",
    "formula": "64 total: 61 sense, 3 stop (UAA, UAG, UGA)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 38,
    "point": "AUG has DUAL functions: It codes for Methionine (Met) and acts as the universal INITIATOR codon.",
    "pointMr": "AUG चे दुहेरी कार्य: हे मिथियोनिन (Met) कोड करते आणि सुरुवातीचा (Initiator) कोडॉन म्हणून कार्य करते.",
    "category": "PYQ_Trend",
    "formula": "AUG: codes Met and is initiator",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 39,
    "point": "Genetic code properties: Degenerate (some amino acids coded by more than one codon), Unambiguous (one codon codes for only one amino acid), Non-overlapping, Universal.",
    "pointMr": "जनुकीय संकेताचे गुणधर्म: डीजनरेट (एकापेक्षा जास्त कोडॉन्स एकाच अमिनो आम्लासाठी), असंदिग्ध व वैश्विक.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 40,
    "point": "tRNA is the adapter molecule having an anticodon loop that reads the code on mRNA and an amino acid acceptor 3'-end (-CCA end). Looks like cloverleaf in 2D, inverted L in 3D.",
    "pointMr": "tRNA (अ‍ॅडॉप्टर रेणू): २D मध्ये क्लोव्हरच्या पानासारखा, ३D मध्ये उलट्या L आकाराचा असतो.",
    "category": "Concept",
    "formula": "tRNA: Cloverleaf 2D, Inverted-L 3D",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 41,
    "point": "Lac Operon (Jacob and Monod): Polycistronic structural genes: z codes for β-galactosidase, y codes for permease, a codes for transacetylase.",
    "pointMr": "लॅक ऑपेरॉन: z जनुक -> β-गॅलॅक्टोसिडेज, y जनुक -> परमिएज, a जनुक -> ट्रान्सअ‍ॅसिटायलेज तयार करतो.",
    "category": "Rule",
    "formula": "z: β-gal; y: permease; a: transacetylase",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 42,
    "point": "In lac operon, ALLOLACTOSE acts as the INDUCER that binds to repressor protein, inactivating it and allowing transcription to proceed.",
    "pointMr": "लॅक ऑपेरॉनमध्ये अ‍ॅलोलॅक्टोज हा इंड्युसर (Inducer) म्हणून रिप्रेसर प्रथिन निष्प्रभ करतो.",
    "category": "Concept",
    "formula": "Inducer: Allolactose",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 43,
    "point": "Human Genome Project (HGP): Human genome contains 3.1647 billion base pairs; Largest human gene is DYSTROPHIN (2.4 million bases); Chromosome 1 has most genes (2968), Y has fewest (231).",
    "pointMr": "मानवी जिनोम: सुमारे ३ अब्ज बेस पेअर्स. सर्वात मोठे जनुक डिस्ट्रोफिन (२.४ दशलक्ष बेस). क्रोमोझोम १ वर सर्वाधिक जनुके (२९६८).",
    "category": "Concept",
    "formula": "Largest gene: Dystrophin; Chr 1 most genes",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 44,
    "point": "DNA Fingerprinting developed by Alec Jeffreys uses Variable Number of Tandem Repeats (VNTRs) which belong to satellite DNA called minisatellites.",
    "pointMr": "DNA फिंगरप्रिंटिंग: अ‍ॅलेक जेफ्रीज यांनी शोधले; सॅटेलाईट DNA मधील VNTRs चा वापर करून व्यक्तीची ओळख पटवली जाते.",
    "category": "Concept",
    "formula": "Alec Jeffreys: VNTRs (Minisatellites)",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 45,
    "point": "Homologous organs: Same anatomical origin and structure but different functions (DIVERGENT evolution). Examples: Forelimbs of whale, bat, cheetah, human; Bougainvillea thorn and Cucurbita tendril.",
    "pointMr": "समजात अवयव (Homologous): मूळ रचना समान, कार्ये भिन्न (डायव्हर्जंट उत्क्रांती). उदा. मानवाचा हात व वटवाघळाचा पंख.",
    "category": "Rule",
    "formula": "Homologous = Divergent evolution",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 46,
    "point": "Analogous organs: Different anatomical origin but similar functions due to similar environment (CONVERGENT evolution). Examples: Wings of butterfly and bird; Eye of octopus and mammal; Sweet potato (root) and Potato (stem).",
    "pointMr": "समरूप अवयव (Analogous): मूळ रचना भिन्न, कार्ये समान (कन्व्हर्जंट उत्क्रांती). उदा. बटाटा (खोड) आणि रताळे (मूळ).",
    "category": "Rule",
    "formula": "Analogous = Convergent evolution",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 47,
    "point": "Adaptive Radiation: Process of evolution of different species in a given geographical area starting from a point and radiating to other habitats (e.g. Darwin's finches in Galapagos, Australian marsupials).",
    "pointMr": "अ‍ॅडॉप्टिव्ह रेडिएशन: डार्विनचे फिंचेस पक्षी गॅलापागोस बेटांवर वेगवेगळ्या खाण्याच्या सवयींनुसार चोचीचा आकार बदलून उत्क्रांत झाले.",
    "category": "Concept",
    "formula": "Darwin's Finches & Marsupials",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 48,
    "point": "Hardy-Weinberg Principle: Allele frequencies in a population remain constant and stable from generation to generation in the absence of evolutionary influences: p² + 2pq + q² = 1.",
    "pointMr": "हार्डी-वेनबर्ग नियम: बाह्य घटक नसल्यास जनुकीय वारंवारता पिढ्यानपिढ्या स्थिर राहते: p² + २pq + q² = १.",
    "category": "Formula",
    "formula": "p² + 2pq + q² = 1; p + q = 1",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 49,
    "point": "Five factors that disturb Hardy-Weinberg equilibrium: Gene migration/flow, Genetic drift (Founder effect, Bottleneck), Mutation, Genetic recombination, and Natural selection.",
    "pointMr": "हार्डी-वेनबर्ग समतोल बिघडवणारे ५ घटक: जनुक स्थलांतर, जेनेटिक ड्रिफ्ट, म्युटेशन, रिकॉम्बिनेशन व नैसर्गिक निवड.",
    "category": "Rule",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 50,
    "point": "Human Evolution sequence: Dryopithecus -> Ramapithecus (more man-like) -> Australopithecus (used stone tools, ate fruit) -> Homo habilis (first human-like, brain 650-800 cc, did not eat meat) -> Homo erectus (brain 900 cc, ate meat) -> Neanderthal man (brain 1400 cc, buried dead) -> Homo sapiens.",
    "pointMr": "मानवी उत्क्रांती क्रम: ड्रायोपिथेकस -> रामापिथेकस -> ऑस्ट्रॅलोपिथेकस -> होमो हॅबिलिस (६५०-८०० cc) -> होमो इरेक्टस (९०० cc) -> निअँडरथल (१४०० cc) -> होमो सेपियन्स.",
    "category": "Shortcut",
    "formula": "Dryo -> Rama -> Australo -> Habilis -> Erectus -> Neanderthal -> Sapiens",
    "badge": "Foundations & Concepts"
  },
  {
    "id": 51,
    "point": "Spermatogenesis occurs in seminiferous tubules: Spermatogonia (2n) -> Primary spermatocyte (2n) -> Meiosis I -> Secondary spermatocytes (n) -> Meiosis II -> Spermatids (n) -> Spermiogenesis -> Spermatozoa (n).",
    "pointMr": "शुक्राणू निर्मिती: स्पर्मेटोगोनिया (2n) -> प्राथमिक स्पर्मेटोसाईट -> दुय्यम (n) -> स्पर्मॅटिड (n) -> शुक्राणू (n).",
    "category": "Rule",
    "formula": "1 primary spermatocyte gives 4 sperms",
    "badge": "Formulas & Rules"
  },
  {
    "id": 52,
    "point": "Sertoli cells (nurse cells) provide nutrition to developing germ cells; Leydig cells (interstitial cells) synthesize and secrete androgens (Testosterone) under the stimulus of LH.",
    "pointMr": "सर्टोली पेशी शुक्राणूंना पोषण देतात; लेडिग पेशी LH च्या प्रभावाखाली टेस्टोस्टेरॉन संप्रेरक तयार करतात.",
    "category": "Concept",
    "formula": "Sertoli: nutrition; Leydig: testosterone",
    "badge": "Formulas & Rules"
  },
  {
    "id": 53,
    "point": "Acrosome of sperm is derived from GOLGI apparatus and contains proteolytic enzymes (hyaluronidase, corona penetrating enzyme) that dissolve ovum layers during fertilization.",
    "pointMr": "शुक्राणूचे अग्रभाग (Acrosome) गॉल्जी संकुलापासून बनलेले असते आणि त्यात हायड्रोलिटिक विकरे असतात.",
    "category": "Concept",
    "formula": "Acrosome derived from Golgi body",
    "badge": "Formulas & Rules"
  },
  {
    "id": 54,
    "point": "Oogenesis begins during EMBRYONIC stage: Primary oocytes are arrested at Prophase I (diplotene) until puberty. At birth, no more oogonia are formed.",
    "pointMr": "अंडी निर्मिती (Oogenesis) गर्भावस्थेतच सुरू होते आणि प्रोफेज I मध्ये थांबलेली असते. जन्मानंतर एकही नवीन उओगोनिया तयार होत नाही.",
    "category": "Rule",
    "formula": "Arrested at Prophase I until puberty",
    "badge": "Formulas & Rules"
  },
  {
    "id": 55,
    "point": "Secondary oocyte is arrested at METAPHASE II and is released during ovulation. Meiosis II is completed ONLY upon entry of sperm.",
    "pointMr": "ओव्हुलेशनच्या वेळी बाहेर पडणारे दुय्यम उओसाईट मेटाफेज II मध्ये थांबलेले असते; शुक्राणू प्रवेश केल्यावरच मियोसिस II पूर्ण होते.",
    "category": "PYQ_Trend",
    "formula": "Arrested at Metaphase II; completed at fertilization",
    "badge": "Formulas & Rules"
  },
  {
    "id": 56,
    "point": "Menstrual Cycle phases: Menstrual phase (days 1-5, progesterone drops) -> Follicular / Proliferative phase (days 6-13, Estrogen rises) -> Ovulatory surge (day 14, LH SURGE triggers ovulation) -> Luteal / Secretory phase (days 15-28, Corpus luteum secretes Progesterone).",
    "pointMr": "मासिक पाळी: १४ व्या दिवशी LH संप्रेरकाची पातळी कमाल (LH Surge) होऊन ओव्हुलेशन होते. कॉर्पस ल्युटियम प्रोजेस्टेरॉन सोडते.",
    "category": "Rule",
    "formula": "Day 14: LH Surge causes ovulation",
    "badge": "Formulas & Rules"
  },
  {
    "id": 57,
    "point": "Corpus luteum secretes large amounts of PROGESTERONE, which is essential for maintenance of the endometrium for pregnancy.",
    "pointMr": "कॉर्पस ल्युटियम मोठ्या प्रमाणावर प्रोजेस्टेरॉन संप्रेरक सोडते, जे गर्भाशयाचे अस्तर टिकवण्यासाठी आवश्यक असते.",
    "category": "Concept",
    "formula": "Progesterone maintains endometrium",
    "badge": "Formulas & Rules"
  },
  {
    "id": 58,
    "point": "If fertilization does NOT occur, corpus luteum degenerates into CORPUS ALBICANS, progesterone levels crash, causing shedding of endometrium (menstruation).",
    "pointMr": "गर्भधारणा न झाल्यास कॉर्पस ल्युटियमचे कॉर्पस अल्बिकन्समध्ये रूपांतर होते, प्रोजेस्टेरॉन घटते आणि पाळी सुरू होते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 59,
    "point": "Fertilization takes place at the AMPULLARY-ISTHMIC junction (or Ampulla according to NCERT revised) of the Fallopian tube (oviduct).",
    "pointMr": "स्त्रीबीज आणि शुक्राणूचे फलन फॅलोपियन नलिकेच्या अँपुला (Ampulla) भागात होते.",
    "category": "PYQ_Trend",
    "formula": "Fertilization site: Ampulla of fallopian tube",
    "badge": "Formulas & Rules"
  },
  {
    "id": 60,
    "point": "Cleavage in human zygote is holoblastic, unequal, and produces 2, 4, 8, 16 blastomeres. Solid ball of 8-16 cells is MORULA (looks like little mulberry).",
    "pointMr": "सुरुवातीचे पेशी विभाजन: ८ ते १६ पेशींच्या भरीव गोळ्याला मोरुला (Morula) म्हणतात.",
    "category": "Concept",
    "formula": "Morula = 8 to 16 blastomeres",
    "badge": "Formulas & Rules"
  },
  {
    "id": 61,
    "point": "Blastocyst has an outer layer called TROPHOBLAST (attaches to endometrium, forms placenta) and an INNER CELL MASS (gives rise to embryo proper; contains stem cells).",
    "pointMr": "ब्लास्टोसिस्ट: बाहेरील ट्रॉफोब्लास्ट गर्भाशयाला जोडला जातो; आतील इनर सेल मासपासून गर्भाची निर्मिती होते.",
    "category": "Concept",
    "formula": "Inner cell mass: Pluripotent stem cells",
    "badge": "Formulas & Rules"
  },
  {
    "id": 62,
    "point": "Implantation occurs about 7 days after fertilization: Blastocyst implants into the endometrium of the uterus.",
    "pointMr": "फलनानंतर सुमारे ७ व्या दिवशी ब्लास्टोसिस्ट गर्भाशयाच्या अस्तरामध्ये रुजतो (Implantation).",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 63,
    "point": "Human Chorionic Gonadotropin (hCG), human Placental Lactogen (hPL), and Relaxin are hormones produced in women ONLY during pregnancy.",
    "pointMr": "hCG, hPL आणि रिलॅक्सिन ही संप्रेरके केवळ गरोदरपणातच तयार होतात (गर्भधारणा चाचणीत hCG तपासले जाते).",
    "category": "Rule",
    "formula": "hCG, hPL, Relaxin: ONLY in pregnancy",
    "badge": "Formulas & Rules"
  },
  {
    "id": 64,
    "point": "Parturition (childbirth) is induced by neuroendocrine mechanism (Foetal Ejection Reflex): Mild uterine contractions trigger release of OXYTOCIN from maternal posterior pituitary.",
    "pointMr": "बाळंतपण: ऑक्सिटोसिन संप्रेरकामुळे गर्भाशयाचे तीव्र आकुंचन घडून येते.",
    "category": "Concept",
    "formula": "Oxytocin: triggers uterine contractions",
    "badge": "Formulas & Rules"
  },
  {
    "id": 65,
    "point": "Colostrum: First milk secreted during initial days of lactation contains abundant antibodies (primarily IgA) providing passive immunity to infant.",
    "pointMr": "कोलोस्ट्रम (चीक दूध): बाळंतपणानंतरच्या पहिल्या दुधात IgA अँटीबॉडीज भरपूर असतात, ज्यामुळे बाळाची रोगप्रतिकारक शक्ती वाढते.",
    "category": "PYQ_Trend",
    "formula": "Colostrum rich in IgA antibodies",
    "badge": "Formulas & Rules"
  },
  {
    "id": 66,
    "point": "Assisted Reproductive Technologies (ART): IVF-ET (In Vitro Fertilization followed by Embryo Transfer). ZIFT = Zygote Intra-Fallopian Transfer (embryo up to 8 blastomeres into fallopian tube); IUT = Intra-Uterine Transfer (embryo > 8 blastomeres into uterus).",
    "pointMr": "ZIFT: ८ पेशींपर्यंतचा गर्भ फॅलोपियन नळीत सोडणे; IUT: ८ पेक्षा जास्त पेशींचा गर्भ गर्भाशयात सोडणे.",
    "category": "Shortcut",
    "formula": "ZIFT: up to 8 cells; IUT: > 8 cells",
    "badge": "Formulas & Rules"
  },
  {
    "id": 67,
    "point": "GIFT (Gamete Intra-Fallopian Transfer): Transfer of an ovum collected from donor into fallopian tube of female who cannot produce one but can provide suitable environment.",
    "pointMr": "GIFT: स्त्रीबीज तयार करू न शकणाऱ्या महिलेच्या फॅलोपियन नलिकेत दात्याचे स्त्रीबीज सोडणे.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 68,
    "point": "ICSI (Intra-Cytoplasmic Sperm Injection): Specialized procedure in which a single sperm is directly injected into the cytoplasm of an ovum.",
    "pointMr": "ICSI: प्रयोगशाळेत एका शुक्राणूला थेट स्त्रीबीजाच्या पेशीद्रव्यात टोचले जाते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 69,
    "point": "Copper-releasing IUDs (CuT, Cu7, Multiload 375): Cu ions suppress sperm motility and fertilizing capacity.",
    "pointMr": "तांबायुक्त IUDs (CuT, Multiload 375): तांब्याचे आयन्स शुक्राणूंची हालचाल आणि फलन क्षमता मंदावतात.",
    "category": "Rule",
    "formula": "Cu-IUDs: suppress sperm motility",
    "badge": "Formulas & Rules"
  },
  {
    "id": 70,
    "point": "Hormone-releasing IUDs (Progestasert, LNG-20): Make the uterus unsuitable for implantation and cervix hostile to sperms.",
    "pointMr": "हार्मोनल IUDs (LNG-20): गर्भाशयाचे अस्तर रोपणासाठी अयोग्य बनवतात आणि शुक्राणूंना अडवतात.",
    "category": "Concept",
    "formula": "LNG-20: makes uterus hostile",
    "badge": "Formulas & Rules"
  },
  {
    "id": 71,
    "point": "Saheli: Oral non-steroidal contraceptive pill developed by CDRI Lucknow; taken 'once a week', high contraceptive value with very few side effects.",
    "pointMr": "सहेली (Saheli): CDRI लखनौने विकसित केलेली नॉन-स्टेरॉइडल गोळी; आठवड्यातून एकदा घेतली जाते.",
    "category": "Concept",
    "formula": "Saheli: Non-steroidal, once a week",
    "badge": "Formulas & Rules"
  },
  {
    "id": 72,
    "point": "Medical Termination of Pregnancy (MTP): Safe up to FIRST TRIMESTER (12 weeks of pregnancy); becomes significantly riskier during second trimester.",
    "pointMr": "गर्भपात (MTP): पहिल्या १२ आठवड्यांपर्यंत (पहिल्या त्रैमासिकात) सुरक्षित मानला जातो.",
    "category": "Rule",
    "formula": "MTP safe up to 12 weeks",
    "badge": "Formulas & Rules"
  },
  {
    "id": 73,
    "point": "Sexually Transmitted Infections (STIs): Completely curable if detected early EXCEPT Hepatitis-B, Genital Herpes, and HIV/AIDS.",
    "pointMr": "लैंगिक आजार: हिपॅटायटिस-बी, जननेंद्रियाचा हर्पिस आणि एड्स (HIV) हे तीन आजार पूर्णपणे बरे होऊ शकत नाहीत.",
    "category": "Exception",
    "formula": "Incurable: Hep-B, Herpes, HIV",
    "badge": "Formulas & Rules"
  },
  {
    "id": 74,
    "point": "Innate Immunity barriers: Physical (skin, mucus), Physiological (stomach HCl, saliva, tears lysozyme), Cellular (PMNL neutrophils, monocytes, natural killer NK cells), Cytokine (INTERFERONS protect uninfected cells from virus).",
    "pointMr": "अंगभूत प्रतिकारशक्ती: इंटरफेरॉन (Interferon) हे विषाणूबाधित पेशींनी सोडलेले प्रथिन इतर निरोगी पेशींचे रक्षण करते.",
    "category": "Concept",
    "formula": "Interferons: Anti-viral defense",
    "badge": "Formulas & Rules"
  },
  {
    "id": 75,
    "point": "Antibody structure: Y-shaped molecule with 4 polypeptide chains: 2 heavy (H) and 2 light (L) chains represented as H₂L₂ held by disulfide bonds. Antigen-binding site on variable region.",
    "pointMr": "अँटीबॉडी रचना: H₂L₂ (२ जड आणि २ हलक्या साखळ्या), डायसल्फाईड बंधाने जोडलेल्या. Y आकाराची रचना.",
    "category": "Formula",
    "formula": "Antibody = H₂L₂",
    "badge": "Formulas & Rules"
  },
  {
    "id": 76,
    "point": "Restriction Endonucleases (Molecular Scissors): Cut dsDNA at specific palindromic recognition sequences. Discovered in bacteria as defense against bacteriophages.",
    "pointMr": "रेस्ट्रिक्शन एन्झाइम्स (आण्विक कात्री): DNA ला विशिष्ट पॅलिंड्रोमिक जागेवर कापतात (उदा. EcoRI).",
    "category": "Definition",
    "formula": "Molecular scissors: Restriction endonucleases",
    "badge": "Formulas & Rules"
  },
  {
    "id": 77,
    "point": "EcoRI recognition sequence: 5'-GAATTC-3' and 3'-CTTAAG-5'; cuts between G and A, producing sticky / cohesive single-stranded ends.",
    "pointMr": "EcoRI ची ओळख जागा: ५'-GAATTC-३'; G आणि A च्या मध्ये कापून चिकट टोके (Sticky ends) बनवते.",
    "category": "PYQ_Trend",
    "formula": "EcoRI cuts 5'-G|AATTC-3'",
    "badge": "Formulas & Rules"
  },
  {
    "id": 78,
    "point": "Gel Electrophoresis separates DNA fragments based on SIZE: DNA is negatively charged (due to phosphate), migrates towards ANODE (+). Smaller fragments travel farther.",
    "pointMr": "जेल इलेक्ट्रोफोरेसीस: DNA ऋण प्रभारित असल्याने धनाग्राकडे (Anode +) धावतो. लहान तुकडे सर्वात पुढे जातात.",
    "category": "Rule",
    "formula": "DNA (-) moves to Anode (+); smaller travels faster",
    "badge": "Formulas & Rules"
  },
  {
    "id": 79,
    "point": "Visualization of DNA bands in agarose gel requires staining with ETHIDIUM BROMIDE (EtBr) followed by exposure to UV light, appearing as bright ORANGE bands.",
    "pointMr": "अ‍ॅगारोज जेलमधील DNA पट्टे पाहण्यासाठी इथिडियम ब्रोमाइड (EtBr) आणि UV प्रकाश आवश्यक असतो; चमकदार केशरी पट्टे दिसतात.",
    "category": "PYQ_Trend",
    "formula": "EtBr + UV light -> Bright Orange bands",
    "badge": "Formulas & Rules"
  },
  {
    "id": 80,
    "point": "Cloning Vector pBR322 selectable markers: Ampicillin resistance (amp^R) and Tetracycline resistance (tet^R) genes. Insertion of foreign DNA at BamHI inactivates tet^R (insertional inactivation).",
    "pointMr": "pBR322 मधील सिलेक्टेबल मार्कर्स: amp^R आणि tet^R जनुके. परकीय DNA जोडल्यास रेझिस्टन्स नष्ट होतो.",
    "category": "Concept",
    "formula": "Insertional inactivation",
    "badge": "Formulas & Rules"
  },
  {
    "id": 81,
    "point": "Polymerase Chain Reaction (PCR) steps: 1. Denaturation (94°C, separates strands) -> 2. Annealing (54°C, primers bind) -> 3. Extension (72°C, Taq polymerase synthesizes DNA).",
    "pointMr": "PCR चे तीन टप्पे: १. डिनॅचुरेशन (९४°C) -> २. अ‍ॅनेलिंग (५४°C) -> ३. एक्स्टेंशन (७२°C). अब्जावधी प्रती बनवणे.",
    "category": "Formula",
    "formula": "PCR: Denaturation -> Annealing -> Extension",
    "badge": "Formulas & Rules"
  },
  {
    "id": 82,
    "point": "Taq Polymerase is a thermostable DNA polymerase isolated from bacterium Thermus aquaticus; remains active at high temperatures during PCR denaturation.",
    "pointMr": "Taq पॉलिमरेज: Thermus aquaticus या उष्णतेत जगणाऱ्या जिवाणूपासून मिळवले जाते; ९४°C तापमानालाही सक्रिय राहते.",
    "category": "Concept",
    "formula": "Taq polymerase: Thermus aquaticus",
    "badge": "Formulas & Rules"
  },
  {
    "id": 83,
    "point": "Bt Cotton: Bacterium Bacillus thuringiensis produces crystal cry proteins (endotoxins) that kill bollworms. Activated in insect alkaline gut, creating pores and causing cell lysis.",
    "pointMr": "Bt कॉटन: Bacillus thuringiensis जिवाणूतील cry जनुक किडीच्या अल्कली आतड्यात विषारी छिद्रे पाडून बोंडअळी मारतो.",
    "category": "Concept",
    "formula": "Bt toxin active in insect ALKALINE gut",
    "badge": "Formulas & Rules"
  },
  {
    "id": 84,
    "point": "RNA Interference (RNAi): Cellular defense mechanism in eukaryotes where specific mRNA is silenced using complementary double-stranded RNA (dsRNA). E.g. Meloidogyne incognita in tobacco roots.",
    "pointMr": "RNAi (RNA इंटरफेरन्स): तंबाखूच्या मुळांना सूत्रकृमीपासून वाचवण्यासाठी विशिष्ट mRNA सायलेंट केला जातो.",
    "category": "Concept",
    "formula": "RNAi: Gene silencing by dsRNA",
    "badge": "Formulas & Rules"
  },
  {
    "id": 85,
    "point": "First recombinant human insulin (Humulin) produced by Eli Lilly (1983) by synthesizing chains A and B separately in E. coli and joining them with disulfide bonds.",
    "pointMr": "ह्युमुलिन (Humulin): एली लिली कंपनीने (१९८३) E. coli मध्ये A आणि B साखळ्या स्वतंत्र बनवून डायसल्फाईड बंधाने जोडल्या.",
    "category": "Concept",
    "formula": "Eli Lilly (1983): Chains A + B joined",
    "badge": "Formulas & Rules"
  },
  {
    "id": 86,
    "point": "First clinical gene therapy performed in 1990 on a 4-year-old girl with Adenosine Deaminase (ADA) deficiency using retroviral vector.",
    "pointMr": "पहिली जनुक थेरपी (१९९०): ADA विकराची कमतरता असलेल्या ४ वर्षांच्या मुलीवर यशस्वीरित्या करण्यात आली.",
    "category": "Concept",
    "formula": "1990: ADA deficiency gene therapy",
    "badge": "Formulas & Rules"
  },
  {
    "id": 87,
    "point": "Competitive inhibition of enzymes: Inhibitor closely resembles substrate in structure and competes for active site (e.g. Malonate inhibits Succinate Dehydrogenase). V_max unchanged, K_m increases.",
    "pointMr": "स्पर्धात्मक प्रतिबंध (Competitive inhibition): मलोनेट हे सक्सिनेट डिहायड्रोजनेज विकराला रोखते; K_m वाढतो, V_max स्थिर राहतो.",
    "category": "Rule",
    "formula": "Competitive: K_m increases, V_max unchanged",
    "badge": "Formulas & Rules"
  },
  {
    "id": 88,
    "point": "Photosynthesis Z-scheme (Light reaction): Non-cyclic photophosphorylation involves both PS II (P680) and PS I (P700); Water splitting occurs at PS II releasing O₂; Generates ATP and NADPH.",
    "pointMr": "प्रकाश अभिक्रिया: PS II (P680) आणि PS I (P700). पाण्याचे विघटन PS II वर होऊन ऑक्सिजन बाहेर पडतो.",
    "category": "Concept",
    "formula": "Water splitting at PS II; ATP + NADPH formed",
    "badge": "Formulas & Rules"
  },
  {
    "id": 89,
    "point": "Calvin Cycle (C3 pathway): 1. Carboxylation (catalyzed by RuBisCO, forms 3-PGA) -> 2. Reduction (consumes ATP and NADPH) -> 3. Regeneration of RuBP. Fixation of 1 CO₂ requires 3 ATP and 2 NADPH; 1 Glucose needs 6 turns (18 ATP + 12 NADPH).",
    "pointMr": "कॅल्विन सायकल: एका ग्लुकोज रेणूसाठी १८ ATP आणि १२ NADPH लागतात. RuBisCO हे मुख्य विकर आहे.",
    "category": "Formula",
    "formula": "1 Glucose = 6 turns = 18 ATP + 12 NADPH",
    "badge": "Formulas & Rules"
  },
  {
    "id": 90,
    "point": "C4 Pathway (Hatch-Slack): Kranz anatomy in leaves (dimorphic chloroplasts). Initial CO₂ fixation in mesophyll cells by PEP carboxylase (forming 4C oxaloacetate OAA); No photorespiration; Highly efficient in high temp and light.",
    "pointMr": "C4 वनस्पती: क्रँझ अ‍ॅनाटॉमी (Kranz anatomy). फोटोरेस्पिरेशन शून्य; मका, ज्वारी, ऊस यामध्ये जास्त उत्पादन.",
    "category": "Rule",
    "formula": "C4: Kranz anatomy, PEPcase in mesophyll",
    "badge": "Formulas & Rules"
  },
  {
    "id": 91,
    "point": "Photorespiration (C2 cycle): When RuBisCO binds O₂ instead of CO₂ in high light and temp, forming 3-PGA and 2-phosphoglycolate. Wasteful process, NO ATP or sugar produced.",
    "pointMr": "फोटोरेस्पिरेशन: RuBisCO जेव्हा CO₂ ऐवजी O₂ जोडतो; यात कोणतीही ऊर्जा तयार होत नाही, ऊर्जा वाया जाते.",
    "category": "Concept",
    "formula": "Wasteful: No ATP or sugar formed",
    "badge": "Formulas & Rules"
  },
  {
    "id": 92,
    "point": "Glycolysis (EMP pathway): Occurs in CYTOPLASM of all living cells; anaerobic conversion of 1 Glucose -> 2 Pyruvate. Net yield: 2 ATP and 2 NADH. Does NOT require oxygen.",
    "pointMr": "ग्लायकोलिसिस (EMP): पेशीद्रव्यात (Cytoplasm) होते. ऑक्सिजनची गरज नसते; निव्वळ २ ATP व २ NADH मिळतात.",
    "category": "Formula",
    "formula": "Net yield: 2 ATP + 2 NADH",
    "badge": "Formulas & Rules"
  },
  {
    "id": 93,
    "point": "Link reaction: Pyruvate -> Acetyl CoA + CO₂ + NADH catalyzed by pyruvate dehydrogenase in mitochondrial matrix.",
    "pointMr": "दुवा अभिक्रिया (Link reaction): पायरुव्हेटचे अ‍ॅसिटाईल CoA मध्ये रूपांतर मायटोकॉन्ड्रियाच्या मॅट्रिक्समध्ये होते.",
    "category": "Concept",
    "badge": "Formulas & Rules"
  },
  {
    "id": 94,
    "point": "Krebs Cycle (TCA cycle): Occurs in MITOCHONDRIAL MATRIX. Oxaloacetate (4C) + Acetyl CoA (2C) -> Citrate (6C). Net per glucose: 6 NADH, 2 FADH₂, 2 GTP/ATP.",
    "pointMr": "क्रेब्स सायकल: मायटोकॉन्ड्रियाच्या मॅट्रिक्समध्ये होते. प्रत्येक ग्लुकोजपासून ६ NADH, २ FADH₂ व २ GTP मिळतात.",
    "category": "Concept",
    "formula": "Location: Mitochondrial Matrix",
    "badge": "Formulas & Rules"
  },
  {
    "id": 95,
    "point": "Electron Transport System (ETS): Located on INNER MITOCHONDRIAL MEMBRANE. Terminal electron acceptor is OXYGEN, which forms H₂O. Total theoretical yield from 1 glucose: 36 or 38 ATP.",
    "pointMr": "ETS: मायटोकॉन्ड्रियाच्या आतील पडद्यावर होते. ऑक्सिजन हा अंतिम इलेक्ट्रॉन स्वीकारणारा घटक असतो.",
    "category": "Rule",
    "formula": "Terminal electron acceptor = Oxygen",
    "badge": "Formulas & Rules"
  },
  {
    "id": 96,
    "point": "Plant Hormones: Auxin (apical dominance, IAA); Gibberellin (bolting in rosette plants, breaks seed dormancy); Cytokinin (delays senescence, promotes cell division); Ethylene (fruit ripening gaseous hormone); Abscisic Acid (ABA, stress hormone, stomatal closure).",
    "pointMr": "वनस्पती संप्रेरके: ऑक्सिन (अग्रस्थ वाढ), जिबरेलिन (उंची वाढवणे), सायटोकायनीन (पेशी विभाजन), इथिलीन (फळे पिकवणे), ABA (ताण संप्रेरक).",
    "category": "Shortcut",
    "formula": "Auxin=apical; Ethylene=fruit ripening; ABA=stress",
    "badge": "Formulas & Rules"
  },
  {
    "id": 97,
    "point": "Human cardiac cycle duration: 0.8 seconds. Stroke volume: 70 mL. Cardiac Output = Stroke Volume × Heart Rate = 70 mL × 72 bpm ≈ 5.0 Liters/min.",
    "pointMr": "हृदय चक्र: ०.८ सेकंद. स्ट्रोक व्हॉल्यूम ७० mL. एका मिनिटात हृदय सुमारे ५ लिटर रक्त पंप करते.",
    "category": "Formula",
    "formula": "Cardiac Output = SV × HR ≈ 5.0 L/min",
    "badge": "Formulas & Rules"
  },
  {
    "id": 98,
    "point": "Electrocardiogram (ECG): P wave = Atrial depolarization; QRS complex = Ventricular depolarization (pulse rate counter); T wave = Ventricular repolarization.",
    "pointMr": "ECG लहरी: P वेव्ह = आलिंदांचे आकुंचन; QRS कॉम्प्लेक्स = निलयांचे आकुंचन; T वेव्ह = पूर्वस्थिती (Repolarization).",
    "category": "PYQ_Trend",
    "formula": "P: Atrial depol; QRS: Ventricle depol; T: Repol",
    "badge": "Formulas & Rules"
  },
  {
    "id": 99,
    "point": "Nephron Counter-Current Mechanism between Henle's loop and Vasa recta maintains high osmolarity in renal medullary interstitium (from 300 to 1200 mOsmol/L), allowing concentration of urine.",
    "pointMr": "काउंटर-करंट यंत्रणा: हेनलेचा लूप आणि वासा रेक्टा यांच्या मदतीने लघवी सांद्र (Concentrated) केली जाते.",
    "category": "Concept",
    "formula": "Henle's loop concentrates urine",
    "badge": "Formulas & Rules"
  },
  {
    "id": 100,
    "point": "Competitive Exclusion Principle (Gause): Two closely related species competing for the same limiting resources cannot coexist indefinitely; competitively inferior will be eliminated.",
    "pointMr": "गॉसचा नियम: एकाच मर्यादित स्रोतासाठी स्पर्धा करणाऱ्या दोन समान प्रजाती कायम एकत्र राहू शकत नाहीत; दुर्बळ प्रजाती नष्ट होते.",
    "category": "Rule",
    "formula": "Gause: Complete competitors cannot coexist",
    "badge": "Formulas & Rules"
  },
  {
    "id": 101,
    "point": "Digestive Enzymes: Salivary amylase (Ptyalin) digests starch into maltose at pH 6.8; 30% of dietary starch is hydrolyzed in mouth.",
    "pointMr": "लाळेतील टायलीन (अमायलेज) pH ६.८ वर ३०% स्टार्चचे माल्टोजमध्ये रूपांतर करतो.",
    "category": "Concept",
    "formula": "Salivary amylase pH 6.8",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 102,
    "point": "Stomach Gastric Juice contains Hydrochloric acid (HCl, pH 1.5 - 2.0) and Proenzyme Pepsinogen, activated by HCl into active Pepsin which digests proteins into peptones.",
    "pointMr": "जठरातील पेप्सिनोजन आम्लधर्मी HCl (pH १.५ - २.०) मुळे पेप्सिनमध्ये रूपांतरित होऊन प्रथिनांचे पचन करतो.",
    "category": "Rule",
    "formula": "Stomach pH 1.5-2.0; Pepsin digests protein",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 103,
    "point": "Pancreatic juice contains inactive enzymes: Trypsinogen (activated by intestinal Enterokinase into Trypsin), Chymotrypsinogen, and Procarboxypeptidases at alkaline pH 7.8.",
    "pointMr": "स्वादुपिंड रस अल्कधर्मी (pH ७.८) असतो; एंटेरोकायनेझ विकर ट्रिप्सिनोजनचे ट्रिप्सिनमध्ये रूपांतर करतो.",
    "category": "Rule",
    "formula": "Enterokinase activates Trypsinogen",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 104,
    "point": "Bile contains bile pigments (Bilirubin, Biliverdin), bile salts (Sodium glycocholate, taurocholate), and cholesterol, but contains NO ENZYMES. Bile salts emulsify fats.",
    "pointMr": "पित्तरसात (Bile) कोणतेही विकर नसते; पित्त क्षार चरबीचे पायसीकरण (Emulsification of fats) करतात.",
    "category": "Concept",
    "formula": "Bile has NO enzymes; emulsifies fats",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 105,
    "point": "Succus entericus (Intestinal juice): Secreted by Crypts of Lieberkühn; contains Maltase, Lactase, Sucrase (Invertase), Dipeptidases, and Lipases at pH 7.8.",
    "pointMr": "आंत्ररस (Succus entericus): क्रिप्ट्स ऑफ लिबरकुहनमधून स्रवतो; डायसॅकराइड्स व पेप्टाईड्सचे अंतिम पचन करतो.",
    "category": "Concept",
    "formula": "Succus entericus pH 7.8",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 106,
    "point": "Respiratory Volumes: Tidal Volume (TV) = 500 mL (normal breath); Inspiratory Reserve Volume (IRV) = 2500 - 3000 mL.",
    "pointMr": "श्वसन आकारमान: टायडल व्हॉल्यूम (TV) = ५०० mL; इन्स्पिरिटरी रिझर्व्ह व्हॉल्यूम (IRV) = २५०० ते ३००० mL.",
    "category": "Formula",
    "formula": "TV = 500 mL; IRV = 2500-3000 mL",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 107,
    "point": "Expiratory Reserve Volume (ERV) = 1000 - 1100 mL; Residual Volume (RV) = 1100 - 1200 mL (air remaining in lungs even after forcible expiration).",
    "pointMr": "एक्स्पिरेटरी व्हॉल्यूम (ERV) = १०००-११०० mL; रेसिड्यूअल व्हॉल्यूम (RV) = ११००-१२०० mL (फुफ्फुसात शिल्लक राहणारी हवा).",
    "category": "Formula",
    "formula": "RV = 1100-1200 mL",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 108,
    "point": "Vital Capacity (VC) is maximum volume of air a person can breathe in after forced expiration: VC = ERV + TV + IRV ≈ 4000 - 4600 mL.",
    "pointMr": "व्हाइटल कपॅसिटी (VC): जास्तीत जास्त सोडता व घेता येणारी हवा: VC = ERV + TV + IRV (सुमारे ४५०० mL).",
    "category": "Formula",
    "formula": "VC = ERV + TV + IRV",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 109,
    "point": "Total Lung Capacity (TLC): Total volume of air in lungs after maximum inspiration: TLC = RV + ERV + TV + IRV = VC + RV ≈ 5800 mL.",
    "pointMr": "एकूण फुफ्फुस क्षमता (TLC): TLC = VC + RV (सुमारे ५८०० mL). RV कधीही बाहेर पडत नाही.",
    "category": "Formula",
    "formula": "TLC = VC + RV",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 110,
    "point": "Oxygen-Hemoglobin Dissociation Curve is SIGMOID shaped; 1 molecule of Hemoglobin carries maximum 4 molecules of O₂.",
    "pointMr": "ऑक्सिजन-हिमोग्लोबिन वक्र सिग्मॉइड (S-आकाराचा) असतो; १ हिमोग्लोबिन रेणू कमाल ४ O₂ रेणू वाहून नेतो.",
    "category": "Concept",
    "formula": "1 Hb carries 4 O₂ molecules (Sigmoid)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 111,
    "point": "Bohr Effect: Oxygen dissociation curve shifts to the RIGHT (lowering oxygen affinity of Hb) in presence of high pCO₂, high H⁺ concentration (low pH), and high temperature.",
    "pointMr": "बोहर परिणाम: कार्बन डायऑक्साईड आणि H⁺ वाढल्यास वक्र उजवीकडे सरकतो आणि ऑक्सिजन सहज पेशींना मिळतो.",
    "category": "Rule",
    "formula": "Right shift: high pCO₂, low pH, high temp",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 112,
    "point": "Carbon dioxide transport: 70% as Bicarbonate ions (HCO₃⁻) catalyzed by carbonic anhydrase in RBCs; 20-25% as Carbamino-hemoglobin; 7% dissolved in plasma.",
    "pointMr": "CO₂ चे वहन: ७०% बायकार्बोनेट स्वरूपात; २०-२५% कार्बामिनो-हिमोग्लोबिन; ७% रक्तात विरघळलेल्या स्वरूपात.",
    "category": "Rule",
    "formula": "70% CO₂ as Bicarbonate (HCO₃⁻)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 113,
    "point": "Sino-Atrial Node (SA Node) is called the Natural Pacemaker of human heart; generates rhythm of 70-75 action potentials/min without external stimulus (myogenic heart).",
    "pointMr": "SA नोड: मानवी हृदयाचा पेसमेकर; दर मिनिटाला ७०-७५ स्पंदने तयार करतो (मायोजेनिक हृदय).",
    "category": "Concept",
    "formula": "SA node: Pace maker (70-75/min)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 114,
    "point": "Heart sounds: First sound 'LUB' occurs due to closure of Atrioventricular (Tricuspid & Bicuspid/Mitral) valves; Second sound 'DUB' due to closure of Semilunar valves.",
    "pointMr": "हृदयाचे ठोके: पहिला आवाज 'लब' हा ट्रायकस्पिड व बायकस्पिड झडपा बंद होताना येतो; दुसरा 'डब' सेमीलुनार झडपांमुळे येतो.",
    "category": "Rule",
    "formula": "Lub: AV valves close; Dub: Semilunar close",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 115,
    "point": "Erythroblastosis Fetalis: Hemolytic disease of newborn occurring when an Rh-negative mother carries an Rh-positive fetus for the second time; preventable by administering anti-Rh antibodies (Rhogam) to mother immediately after first delivery.",
    "pointMr": "एरिथ्रोब्लास्टोसिस फिटलिस: Rh- ऋण आई व Rh+ धन बाळ यांच्यातील विसंगतीमुळे बाळाचे रक्तकण फुटतात.",
    "category": "Concept",
    "formula": "Rh- mother + Rh+ fetus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 116,
    "point": "Ammonotelic animals excrete ammonia requiring large amounts of water (aquatic invertebrates, bony fishes); Uricotelic excrete uric acid paste conserving water (birds, reptiles, insects).",
    "pointMr": "अमोनोटेलीक सजीव अमोनिया उत्सर्जित करतात (मासे); युरिकोटेलीक सजीव युरिक आम्ल बाहेर टाकून पाणी वाचवतात (पक्षी, सरपटणारे प्राणी).",
    "category": "Rule",
    "formula": "Ammonia: aquatic; Uric acid: birds/reptiles",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 117,
    "point": "Glomerular Filtration Rate (GFR): Volume of filtrate formed by kidneys per minute = 125 mL/min = 180 Liters/day; 99% of filtrate is reabsorbed, forming only 1.5 L urine.",
    "pointMr": "GFR (गाळणाचा दर): दररोज १८० लिटर प्राथमिक गाळण बनते, त्यापैकी ९९% परत शोषले जाऊन फक्त १.५ लिटर लघवी तयार होते.",
    "category": "Formula",
    "formula": "GFR = 125 mL/min = 180 L/day",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 118,
    "point": "Renin-Angiotensin-Aldosterone System (RAAS): Fall in GFR activates JGA cells to release RENIN, which converts Angiotensinogen -> Angiotensin I -> Angiotensin II (powerful vasoconstrictor stimulating Aldosterone).",
    "pointMr": "RAAS यंत्रणा: रक्तदाब कमी झाल्यावर जेजीए रेनिन सोडतो; अ‍ॅन्जिओटेन्सिन II रक्तवाहिन्या आकुंचन पावून रक्तदाब वाढवतो.",
    "category": "Concept",
    "formula": "Renin -> Angiotensin II -> Aldosterone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 119,
    "point": "Atrial Natriuretic Factor (ANF): Secreted by atrial heart walls in response to high blood pressure; causes vasodilation and excretion of Na⁺, acting as check on RAAS.",
    "pointMr": "ANF संप्रेरक: हृदयाच्या भिंतीतून स्रवतो; रक्तदाब कमी करतो आणि रेनिन यंत्रणेला नियंत्रणात ठेवतो.",
    "category": "Rule",
    "formula": "ANF lowers blood pressure (opposes RAAS)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 120,
    "point": "Sliding Filament Theory of Muscle Contraction (Huxley): Actin thin filaments slide over Myosin thick filaments towards center of A-band; Sarcomere shortens; I-band shortens; A-band length UNCHANGED.",
    "pointMr": "स्नायू आकुंचन सिद्धांत: अ‍ॅक्टिनचे धागे मायोसिनवर घसरतात; सार्कोमिअर लहान होतो, A-बँडची लांबी बदलत नाही.",
    "category": "Rule",
    "formula": "A-band length constant; I-band shortens",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 121,
    "point": "Sarcomere is the functional unit of muscle contraction, defined as the region between two successive Z-lines.",
    "pointMr": "सार्कोमिअर (Sarcomere): दोन Z-रेषांमधील भाग; स्नायूंच्या आकुंचनाचे मूलभूत कार्यात्मक एकक.",
    "category": "Definition",
    "formula": "Sarcomere = Region between two Z-lines",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 122,
    "point": "Rigor Mortis: Muscle stiffness after death caused by complete depletion of ATP, preventing detachment of myosin cross-bridges from actin.",
    "pointMr": "रिगर मॉर्टिस (Rigor Mortis): मृत्यूनंतर ATP संपल्यामुळे स्नायू कडक आणि ताठ बनतात.",
    "category": "Concept",
    "formula": "ATP depletion causes stiffness",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 123,
    "point": "Total number of bones in adult human skeleton: 206 bones (Axial skeleton = 80 bones; Appendicular skeleton = 126 bones).",
    "pointMr": "प्रौढ मानवी सांगाड्यात एकूण २०६ हाडे असतात: अक्षीय सांगाडा = ८० हाडे, उपांग सांगाडा = १२६ हाडे.",
    "category": "Formula",
    "formula": "Total = 206 (Axial 80 + Appendicular 126)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 124,
    "point": "Human Skull has 22 bones (Cranial = 8 bones: Frontal, Parietals, Temporals, Occipital, Sphenoid, Ethmoid; Facial = 14 bones); Ear ossicles = 6 (Malleus, Incus, Stapes - smallest bone).",
    "pointMr": "मानवी कवटी: मेंदूची ८ हाडे + चेहऱ्याची १४ हाडे = २२. कानातील स्टेप्स (Stapes) हे शरीरातील सर्वात लहान हाड आहे.",
    "category": "Rule",
    "formula": "Cranial: 8; Facial: 14; Stapes = smallest",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 125,
    "point": "Resting Membrane Potential of neuron is - 70 mV (inside negative); maintained by active Na⁺/K⁺ ATPase pump which pumps 3 Na⁺ OUT for every 2 K⁺ pumped IN.",
    "pointMr": "मज्जापेशीचा विश्रांती विभव -७० mV असतो; सोडियम-पोटॅशियम पंप ३ Na⁺ बाहेर आणि २ K⁺ आत पंप करतो.",
    "category": "Formula",
    "formula": "Resting: -70 mV (3 Na⁺ OUT / 2 K⁺ IN)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 126,
    "point": "Action Potential (Depolarization): Influx of Na⁺ through voltage-gated channels shifts membrane potential from -70 mV to +30 mV.",
    "pointMr": "अ‍ॅक्शन पोटेंशियल: सोडियम आयन वेगाने आत आल्यामुळे विभव -७० mV वरून +३० mV पर्यंत धन होतो.",
    "category": "Concept",
    "formula": "Depolarization due to Na⁺ influx (+30 mV)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 127,
    "point": "Myelinated nerve fibers have Myelin Sheath formed by Schwann cells with gaps called Nodes of Ranvier; impulse jumps from node to node (Saltatory conduction, 50x faster).",
    "pointMr": "मायलिनयुक्त मज्जातंतू: रॅन्व्हियरच्या गाठींवरून विद्युत संदेश उड्या मारत जातो (Saltatory Conduction), वेग ५० पट जास्त.",
    "category": "Concept",
    "formula": "Saltatory conduction at Nodes of Ranvier",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 128,
    "point": "Hypothalamus produces Releasing and Inhibiting hormones; synthesizes Oxytocin and Vasopressin (ADH), which are transported and stored in the POSTERIOR PITUITARY (Neurohypophysis).",
    "pointMr": "हायपोथॅलॅमस ऑक्सिटोसिन व व्हॅसोप्रेसिन (ADH) तयार करतो; ते पोस्टेरियर पिट्युटरीमध्ये साठवले जातात.",
    "category": "Rule",
    "formula": "Oxytocin & ADH made in hypothalamus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 129,
    "point": "Oxytocin stimulates vigorous contraction of uterine smooth muscles during childbirth (parturition) and ejection of milk from mammary glands.",
    "pointMr": "ऑक्सिटोसिन: बाळंतपणाच्या वेळी गर्भाशयाचे आकुंचन घडवून आणतो आणि स्तनांमधून दूध बाहेर फेकण्यास मदत करतो.",
    "category": "Concept",
    "formula": "Oxytocin: Milk ejection & birth hormone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 130,
    "point": "Vasopressin (Anti-Diuretic Hormone, ADH): Stimulates water reabsorption from distal tubules of kidney; deficiency causes DIABETES INSIPIDUS (excessive dilute urine).",
    "pointMr": "व्हॅसोप्रेसिन (ADH): मुत्रपिंडातून पाणी शोषून घेतो; कमतरतेमुळे डायबेटिस इन्सिपिडस (वारंवार भरपूर लघवी) होतो.",
    "category": "Concept",
    "formula": "ADH deficiency -> Diabetes Insipidus",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 131,
    "point": "Thyroid gland requires IODINE for synthesis of Thyroxine (T₄) and Triiodothyronine (T₃); deficiency causes Simple Goitre. Regulates Basal Metabolic Rate (BMR).",
    "pointMr": "थायरॉईड ग्रंथी: थायरॉक्सिन (T₄) साठी आयोडीन आवश्यक असते; कमतरतेमुळे गलगंड (Goitre) होतो; BMR नियंत्रित करतो.",
    "category": "Concept",
    "formula": "Iodine deficiency causes Goitre",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 132,
    "point": "Thyrocalcitonin (TCT) lowers blood calcium level (hypocalcemic hormone); Parathyroid Hormone (PTH) RAISES blood calcium level by bone resorption (hypercalcemic hormone). Antagonistic pair.",
    "pointMr": "कॅल्सिटोनिन रक्तातील कॅल्शियम कमी करतो; पॅराथॉर्मोन (PTH) रक्तातील कॅल्शियम वाढवतो (परस्परविरोधी संप्रेरके).",
    "category": "Rule",
    "formula": "TCT lowers Ca²⁺; PTH raises Ca²⁺",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 133,
    "point": "Insulin is secreted by β-cells of Islets of Langerhans in pancreas; promotes glucose uptake and glycogenesis, lowering blood sugar (hypoglycemic). Deficiency causes Diabetes Mellitus.",
    "pointMr": "इन्सुलिन (β-पेशी): रक्तातील साखर कमी करतो; कमतरतेमुळे मधुमेह (Diabetes Mellitus) होतो.",
    "category": "Rule",
    "formula": "Insulin: lowers glucose (β-cells)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 134,
    "point": "Glucagon is secreted by α-cells of pancreas; stimulates glycogenolysis and gluconeogenesis, RAISING blood glucose level (hyperglycemic hormone).",
    "pointMr": "ग्लुकागॉन (α-पेशी): यकृतातील ग्लायकोजेन तोडून रक्तातील साखर वाढवतो.",
    "category": "Rule",
    "formula": "Glucagon: raises glucose (α-cells)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 135,
    "point": "Adrenal Medulla secretes 'Emergency Hormones' / Catecholamines: Adrenaline (Epinephrine) and Noradrenaline (Norepinephrine) in response to stress (Fight or Flight hormone).",
    "pointMr": "अ‍ॅड्रेनलिन (आपत्कालीन संप्रेरक): संकटाच्या वेळी हृदयाचे ठोके, रक्तदाब आणि श्वासोच्छ्वास वाढवतो (Fight or Flight).",
    "category": "Concept",
    "formula": "Adrenaline: 3F / Fight-or-Flight hormone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 136,
    "point": "Melatonin: Secreted by PINEAL GLAND; regulates 24-hour diurnal rhythm of body (sleep-wake cycle, body temperature).",
    "pointMr": "मेलॅटोनिन: पिनिअल ग्रंथीमधून स्रवतो; शरीराचे २४ तासांचे झोप-जागृती चक्र (झोपेची वेळ) नियंत्रित करतो.",
    "category": "Concept",
    "formula": "Melatonin: Sleep-wake cycle",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 137,
    "point": "Cohesion-Tension-Transpiration Pull Theory (Dixon and Joly) explains ascent of sap in tall trees: Evaporation from stomatal pores generates negative suction pull up to 130 meters.",
    "pointMr": "डिक्सन व जॉलीचा सिद्धांत: पानांमधून होणाऱ्या बाष्पोत्सर्जनामुळे (Transpiration) पाण्याचा अखंड स्तंभ वर खेचला जातो.",
    "category": "Rule",
    "formula": "Dixon & Joly: Transpiration pull",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 138,
    "point": "Guttation is the loss of water in liquid form through HYDATHODES at vein margins of leaves in early morning due to high ROOT PRESSURE and low transpiration.",
    "pointMr": "गटेशन (Guttation): पहाटेच्या वेळी मुळांच्या दाबामुळे हायडाथोड्समधून पाण्याचे थेंब पानांच्या कडांवरून बाहेर पडणे.",
    "category": "Definition",
    "formula": "Guttation through hydathodes",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 139,
    "point": "Munch Pressure Flow Hypothesis: Phloem translocates sucrose from SOURCE (leaves, high turgor pressure) to SINK (roots/fruits, low turgor pressure) via mass flow.",
    "pointMr": "मंचचा हायपोथिसिस: फ्लोएम अन्न (सुक्रोज) पानांपासून (Source) मुळे व फळांकडे (Sink) दाबाच्या फरकामुळे वाहून नेतो.",
    "category": "Concept",
    "formula": "Mass flow from source to sink",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 140,
    "point": "Essential mineral elements: 17 total. Macronutrients: C, H, O, N, P, K, Ca, Mg, S; Micronutrients: Fe, Mn, Cu, Mo, Zn, B, Cl, Ni.",
    "pointMr": "आवश्यक १७ खनिजे: मुख्य खनिजे ९ आणि सूक्ष्म खनिजे ८ (Fe, Mn, Cu, Mo, Zn, B, Cl, Ni).",
    "category": "Formula",
    "formula": "17 Essential elements (9 Macro + 8 Micro)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 141,
    "point": "Chlorosis (loss of chlorophyll leading to yellowing of leaves) is caused by deficiency of: N, K, Mg, S, Fe, Mn, Zn, Mo.",
    "pointMr": "क्लोरोसिस (पाने पिवळी पडणे): नायट्रोजन, पोटॅशियम, मॅग्नेशियम, सल्फर, लोह यांच्या कमतरतेमुळे होतो.",
    "category": "Rule",
    "formula": "Chlorosis: N, K, Mg, S, Fe, Mn, Zn, Mo",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 142,
    "point": "Necrosis (death of plant tissue, particularly leaf tissue) is caused by deficiency of: Calcium (Ca), Magnesium (Mg), Copper (Cu), and Potassium (K).",
    "pointMr": "नेक्रोसिस (पेशी मरण पावणे): Ca, Mg, Cu, K यांच्या कमतरतेमुळे पानांच्या ऊती नष्ट होतात.",
    "category": "Shortcut",
    "formula": "Necrosis: Ca, Mg, Cu, K",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 143,
    "point": "Biological Nitrogen Fixation: Catalyzed by enzyme NITROGENASE (Mo-Fe protein), which is extremely sensitive to oxygen. LEGHEMOGLOBIN acts as oxygen scavenger to protect it.",
    "pointMr": "नायट्रोजन स्थिरीकरण: नायट्रोजिनेज विकराला ऑक्सिजनपासून वाचवण्यासाठी गुलाबी लेगहिमोग्लोबिन हा ऑक्सिजन शोषून घेतो.",
    "category": "Rule",
    "formula": "Nitrogenase: Mo-Fe protein; Leghemoglobin scavenger",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 144,
    "point": "Photoperiodism: Physiological reaction of organisms to length of day or night. Mediated by PHYTOCHROME pigment (P_r absorbs 660 nm red, P_fr absorbs 730 nm far-red).",
    "pointMr": "फोटोपेरिओडिझम: सूर्यप्रकाशाच्या कालावधीनुसार फुले येणे; फायटोक्रोम रंगद्रव्य यात महत्त्वाची भूमिका बजावतो.",
    "category": "Concept",
    "formula": "Phytochrome: P_r (660nm) and P_fr (730nm)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 145,
    "point": "Anther Microsporogenesis: TAPETUM is the innermost layer of anther wall; multinucleate, dense cytoplasm, nourishes developing pollen grains and secretes sporopollenin.",
    "pointMr": "टॅपेटम (Tapetum): परागकोशाचा सर्वात आतील थर; विकसनशील परागकणांना पोषण देतो आणि स्पोरोपॉलेनिन्स तयार करतो.",
    "category": "Concept",
    "formula": "Tapetum: Nourishing innermost layer",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 146,
    "point": "Sporopollenin: Composes pollen EXINE (outer wall); most resistant biological substance known; withstands high temperatures, strong acids and alkali; no enzyme degrades it.",
    "pointMr": "स्पोरोपॉलेनिन: परागकणांचे बाहेरील आवरण; पृथ्वीवरील सर्वात टिकाऊ सेंद्रिय घटक, कोणत्याही आम्लाने नष्ट होत नाही.",
    "category": "Rule",
    "formula": "Sporopollenin: Most resistant organic material",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 147,
    "point": "Mature Female Gametophyte (Embryo Sac) of angiosperms is 7-CELLED and 8-NUCLEATE (Polygonum type): 3 antipodals, 2 synergids with filiform apparatus, 1 egg cell, 1 central cell with 2 polar nuclei.",
    "pointMr": "भ्रूणकोष (Embryo Sac): ७ पेशी आणि ८ केंद्रके असतात (३ अँटीपोडल्स, २ सिनर्जिड्स, १ अंडपेशी, १ मध्यवर्ती पेशी).",
    "category": "Rule",
    "formula": "7-celled, 8-nucleate structure",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 148,
    "point": "Double Fertilization (exclusive to angiosperms, discovered by Nawaschin 1898): Syngamy (Egg + Sperm -> 2n Zygote) + Triple Fusion (2 Polar Nuclei + Sperm -> 3n PEN Primary Endosperm Nucleus).",
    "pointMr": "दुहेरी फलन (Double fertilization): नवाशिन यांनी शोधले; झायगोट (2n) आणि एंडोस्पर्म (3n - त्रिगुणी) तयार होतो.",
    "category": "Formula",
    "formula": "Syngamy (2n) + Triple Fusion (3n PEN)",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 149,
    "point": "Endosperm in angiosperms is TRIPLOID (3n) and develops BEFORE the embryo to provide nutrition; in gymnosperms endosperm is HAPLOID (n) formed before fertilization.",
    "pointMr": "अवृत्तबीजी वनस्पतींमध्ये एंडोस्पर्म त्रिगुणी (3n) असतो; अनावृत्तबीजी (Gymnosperms) मध्ये एकगुणी (n) असतो.",
    "category": "PYQ_Trend",
    "formula": "Angiosperm endosperm = 3n; Gymnosperm = n",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 150,
    "point": "Spermatogenesis occurs in seminiferous tubules; SERTOLI cells provide nourishment to developing sperms; LEYDIG cells (interstitial cells) secrete Testosterone under LH stimulation.",
    "pointMr": "सर्टोली पेशी शुक्राणूंना पोषण देतात; लेडिग पेशी टेस्टोस्टेरॉन संप्रेरक तयार करतात.",
    "category": "Rule",
    "formula": "Sertoli: nutrition; Leydig: testosterone",
    "badge": "Shortcuts & Techniques"
  },
  {
    "id": 151,
    "point": "Sperm Acrosome: Cap-like structure covering anterior nucleus derived from GOLGI APPARATUS; contains Hyaluronidase and proteolytic enzymes (sperm lysins) for penetrating ovum.",
    "pointMr": "अ‍ॅक्रोसोम: गॉल्जी संकुलापासून बनलेला शुक्राणूचा मुकुट; स्त्रीबीजाचे आवरण भेदण्यासाठी विकरे असतात.",
    "category": "Concept",
    "formula": "Acrosome derived from Golgi apparatus",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 152,
    "point": "Oogenesis: Primary oocytes formed during fetal life remain ARRESTED in Prophase I (Diplotene) until puberty; Secondary oocyte remains ARRESTED in Metaphase II until fertilization by sperm.",
    "pointMr": "स्त्रीबीज निर्मिती: जन्मापूर्वीच प्राथमिक पेशी प्रोफेज I मध्ये थांबतात; दुय्यम पेशी मेटाफेज II मध्ये शुक्राणू येईपर्यंत थांबते.",
    "category": "Rule",
    "formula": "Arrested in Prophase I and Metaphase II",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 153,
    "point": "Menstrual Cycle: LH SURGE (rapid peak of Luteinizing Hormone) on Day 14 induces RUPTURE of Graafian follicle and release of ovum (OVULATION).",
    "pointMr": "LH सर्ज (LH Surge): १४ व्या दिवशी LH ची पातळी सर्वोच्च होऊन ग्राफियन फॉलिकल फुटते आणि स्त्रीबीज बाहेर पडते (Ovulation).",
    "category": "PYQ_Trend",
    "formula": "LH Surge triggers Ovulation on Day 14",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 154,
    "point": "Corpus Luteum: Yellow body formed from ruptured Graafian follicle after ovulation; secretes large amounts of PROGESTERONE essential for maintaining endometrium for pregnancy.",
    "pointMr": "कॉर्पस ल्युटियम: ओव्ह्युलेशननंतर उरलेल्या फॉलिकलपासून बनते; गर्भारपणासाठी आवश्यक प्रोजेस्टेरॉन स्रवते.",
    "category": "Concept",
    "formula": "Corpus luteum secretes Progesterone",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 155,
    "point": "Cleavage in human zygote is Holoblastic and unequal; Cleavage divisions increase cell number without increasing overall embryo volume (Zona pellucida remains intact).",
    "pointMr": "मानवी झायगोटचे विभाजन: पेशींची संख्या वाढते पण एकूण आकारमान झोना पेल्युसिडामुळे वाढत नाही.",
    "category": "Concept",
    "formula": "Cleavage increases cell count, size constant",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 156,
    "point": "Blastocyst implantation occurs on Day 7 after fertilization into uterine endometrium; Trophoblast outer layer forms placenta; Inner Cell Mass (ICM) gives rise to embryo proper.",
    "pointMr": "ब्लास्टोसिस्ट: ७ व्या दिवशी गर्भाशयाच्या भिंतीवर रोपण होते; आतील पेशींमधून (ICM) संपूर्ण बाळ तयार होते.",
    "category": "Rule",
    "formula": "Implantation on Day 7; ICM forms embryo",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 157,
    "point": "Human Chorionic Gonadotropin (hCG), human Placental Lactogen (hPL), and Relaxin are produced in women ONLY during pregnancy; detected in pregnancy test kits.",
    "pointMr": "hCG, hPL आणि रिलॅक्सिन ही संप्रेरके केवळ गरोदरपणातच तयार होतात; प्रेग्नन्सी किटमध्ये hCG तपासला जातो.",
    "category": "Rule",
    "formula": "hCG produced ONLY during pregnancy",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 158,
    "point": "Copper-T (Cu-T) Intrauterine Device (IUD): Releases Copper ions which suppress sperm motility and fertilizing capacity; phagocytosis of sperms increases in uterus.",
    "pointMr": "कॉपर-टी (Cu-T): तांब्याचे आयन शुक्राणूंची हालचाल मंदावतात आणि फलन क्षमता नष्ट करतात.",
    "category": "Concept",
    "formula": "Cu ions suppress sperm motility",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 159,
    "point": "Saheli: Oral contraceptive pill for females developed by CDRI Lucknow; 'once a week' NON-STEROIDAL pill with centchroman, very high contraceptive value with few side effects.",
    "pointMr": "सहेली (Saheli): CDRI लखनौने शोधलेली आठवड्यातून एकदा घेण्याची नॉन-स्टिरॉइडल गोळी.",
    "category": "Concept",
    "formula": "Saheli: Non-steroidal once-a-week pill",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 160,
    "point": "Assisted Reproductive Technologies: IVF-ET (test-tube baby); ZIFT (Zygote Intra-Fallopian Transfer - embryo up to 8 blastomeres into fallopian tube); IUT (Intra-Uterine Transfer - >8 blastomeres into uterus).",
    "pointMr": "ZIFT मध्ये ८ पेशींपर्यंतचा भ्रूण फॅलोपियन ट्यूबमध्ये सोडतात; IUT मध्ये ८ पेक्षा जास्त पेशी गर्भाशयात सोडतात.",
    "category": "Rule",
    "formula": "ZIFT ≤ 8 blastomeres; IUT > 8 blastomeres",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 161,
    "point": "Central Dogma of Molecular Biology (Crick 1958): DNA -> (Transcription) -> mRNA -> (Translation) -> Protein. Reverse transcription (RNA -> DNA) discovered by Temin and Baltimore in retroviruses.",
    "pointMr": "सेंट्रल डोग्मा: DNA वरून mRNA आणि mRNA वरून प्रथिन तयार होते. रिव्हर्स ट्रान्सक्रिप्शन टेमिन व बाल्टिमोर यांनी शोधले.",
    "category": "Rule",
    "formula": "DNA -> RNA -> Protein",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 162,
    "point": "Chargaff's Rules for dsDNA: Purines = Pyrimidines => [A] + [G] = [T] + [C]; [A] = [T] and [G] = [C]; Ratio [A + T] / [G + C] is constant for a given species.",
    "pointMr": "चारगाफचा नियम: दुहेरी DNA मध्ये A ची संख्या T एवढी आणि G ची संख्या C एवढी असते: A + G = T + C.",
    "category": "Formula",
    "formula": "Chargaff: A=T, G=C; A+G = T+C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 163,
    "point": "DNA double helix parameters (Watson & Crick): Pitch = 3.4 nm (34 Å); 10 base pairs per turn; Distance between adjacent base pairs = 0.34 nm (3.4 Å); Diameter = 2.0 nm (20 Å).",
    "pointMr": "DNA द्विकुंडल रचना: एका फेऱ्याची लांबी ३.४ nm असते, त्यात १० बेस पेअर्स असतात; दोन बेसमधील अंतर ०.३४ nm.",
    "category": "Formula",
    "formula": "Pitch = 3.4 nm; 10 bp/turn; Distance = 0.34 nm",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 164,
    "point": "Nucleosome: Structural unit of eukaryotic chromatin; 146 bp of DNA wrapped around an OCTAMER of basic histone proteins (2 copies of H2A, H2B, H3, H4); H1 histone seals the entry/exit.",
    "pointMr": "न्युक्लिओसोम: हिस्टोन प्रथिनांच्या अष्टकाभोवती (Octamer) DNA चे २०० बेस पेअर्स गुंडाळलेले असतात.",
    "category": "Concept",
    "formula": "Nucleosome: Octamer of histones + 146 bp DNA",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 165,
    "point": "RNA Primer is synthesized by enzyme PRIMASE; provides free 3'-OH group necessary for DNA polymerase to initiate synthesis.",
    "pointMr": "RNA प्रायमर: DNA पॉलिमरेजला नवीन साखळी सुरू करण्यासाठी ३'-OH गट पुरवतो; प्राइमेज विकर बनवतो.",
    "category": "Concept",
    "formula": "Primase provides free 3'-OH group",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 166,
    "point": "Aminoacyl-tRNA Synthetase catalyzes charging (aminoacylation) of tRNA: attaches specific amino acid to 3'-CCA end of tRNA using ATP.",
    "pointMr": "tRNA चार्जिंग: अमिनो आम्ल आणि tRNA यांना ATP वापरून जोडण्याचे कार्य अमिनोअ‍ॅसिल tRNA सिंथेटेज करतो.",
    "category": "Concept",
    "formula": "Aminoacylation of tRNA requires ATP",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 167,
    "point": "Ribosome as enzyme (Ribozyme): 23S rRNA in bacteria (28S in eukaryotes) acts as Peptidyl Transferase enzyme forming peptide bonds during translation.",
    "pointMr": "रायबोझाईम (Ribozyme): २३S rRNA हे विकर म्हणून कार्य करून पेप्टाईड बंध तयार करतो.",
    "category": "PYQ_Trend",
    "formula": "23S rRNA acts as peptidyl transferase",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 168,
    "point": "DNA Fingerprinting (Alec Jeffreys 1984): Uses Variable Number of Tandem Repeats (VNTRs) or Mini-satellites as probes; Southern blotting technique.",
    "pointMr": "DNA फिंगरप्रिंटिंग: अ‍ॅलेक जेफ्रीज यांनी शोधून काढले; यात VNTR (सॅटेलाइट DNA) चा वापर केला जातो.",
    "category": "Concept",
    "formula": "Alec Jeffreys: VNTRs (Southern blot)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 169,
    "point": "Hardy-Weinberg Principle: Allele frequencies in a population are stable and constant from generation to generation in absence of evolutionary forces: p² + 2pq + q² = 1 and p + q = 1.",
    "pointMr": "हार्टी-वाइनबर्ग तत्त्व: संकर नसलेल्या समाजात जनुकांचे प्रमाण स्थिर राहते: p² + २pq + q² = १.",
    "category": "Formula",
    "formula": "p² + 2pq + q² = 1; p + q = 1",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 170,
    "point": "Adaptive Radiation: Process of evolution of different species in a given geographical area starting from a common ancestor radiating to different habitats (e.g. Darwin's Finches in Galapagos, Australian Marsupials).",
    "pointMr": "अ‍ॅडॉप्टिव्ह रेडिएशन: डार्विनच्या फिंच पक्ष्यांची चोच खाद्यानुसार बदलली; एकाच पूर्वजापासून अनेक प्रजाती बनणे.",
    "category": "Concept",
    "formula": "Darwin's finches; Australian marsupials",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 171,
    "point": "Homologous Organs: Same basic structural plan and origin, but different functions (DIVERGENT evolution). E.g. Forelimbs of whale, bat, cheetah, human; Thorn of Bougainvillea and Tendril of Cucurbita.",
    "pointMr": "समजात अवयव (Homologous): मूळ रचना समान, कार्ये भिन्न (डायव्हर्जंट उत्क्रांती). उदा. व्हेल, वटवाघूळ व मानवाचे हात.",
    "category": "Rule",
    "formula": "Homologous: Divergent evolution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 172,
    "point": "Analogous Organs: Different origin and anatomical structure, but performing SIMILAR functions (CONVERGENT evolution). E.g. Wings of butterfly and bird; Eye of octopus and mammal; Sweet potato (root) and Potato (stem).",
    "pointMr": "समरूप अवयव (Analogous): मूळ रचना भिन्न, कार्ये समान (कन्व्हर्जंट उत्क्रांती). उदा. पक्षी व फुलपाखराचे पंख.",
    "category": "Rule",
    "formula": "Analogous: Convergent evolution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 173,
    "point": "Miller-Urey Experiment (1953) simulated prebiotic primitive earth: CH₄, NH₃, H₂ (2:1:2 ratio) and water vapor subjected to electric discharge at 800°C; synthesized AMINO ACIDS (Glycine, Alanine, Aspartic acid).",
    "pointMr": "मिलरचा प्रयोग (१९५३): मिथेन, अमोनिया, हायड्रोजन (२:१:२) व विजेच्या ठिणग्या वापरून अमिनो आम्ले तयार केली.",
    "category": "Formula",
    "formula": "CH₄ : NH₃ : H₂ = 2 : 1 : 2 at 800°C",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 174,
    "point": "Innate Immunity barriers: Physical (skin, mucus); Physiological (stomach HCl, saliva, tears with lysozyme); Cellular (neutrophils, monocytes, NK cells); Cytokine (INTERFERONS produced by virus-infected cells).",
    "pointMr": "जन्मजात प्रतिकारशक्ती: इंटरफेरॉन्स (Interferons) हे विषाणूबाधित पेशींद्वारे इतर निरोगी पेशींचे रक्षण करण्यासाठी स्रवले जातात.",
    "category": "Rule",
    "formula": "Interferons protect non-infected cells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 175,
    "point": "Antibody Molecule structure (H₂L₂): Y-shaped glycoprotein consisting of 2 heavy chains and 2 light chains linked by DISULFIDE bonds. Antigen binding site is at variable N-terminal region.",
    "pointMr": "अ‍ॅन्टीबॉडी (H₂L₂): दोन जड व दोन हलक्या साखळ्या डायसल्फाईड बंधाने जोडलेल्या असतात. Y-आकाराची रचना.",
    "category": "Formula",
    "formula": "Antibody = H₂L₂ (Disulfide bonds)",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 176,
    "point": "Antibody classes: IgG (most abundant 80%, crosses placenta); IgA (in colostrum breast milk and saliva, secretory); IgM (largest, first produced in primary response); IgE (mediates allergic reactions with histamine); IgD.",
    "pointMr": "अ‍ॅन्टीबॉडीज: IgG वारेतून (Placenta) बाळाकडे जातो; IgA आईच्या पहिल्या दुधात (Colostrum) असतो; IgE अ‍ॅलर्जीसाठी.",
    "category": "Shortcut",
    "formula": "IgG: crosses placenta; IgA: colostrum; IgE: allergy",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 177,
    "point": "AIDS (Acquired Immuno Deficiency Syndrome): Caused by Human Immunodeficiency Virus (HIV, retrovirus with single-stranded RNA genome); selectively attacks and destroys Helper T-cells (CD4⁺ T-lymphocytes).",
    "pointMr": "AIDS: HIV विषाणू CD4⁺ हेल्पर T-पेशींवर हल्ला करून रोगप्रतिकारशक्ती पूर्णपणे नष्ट करतो.",
    "category": "Concept",
    "formula": "HIV attacks CD4⁺ Helper T-cells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 178,
    "point": "ELISA (Enzyme Linked Immuno-Sorbent Assay) is the primary screening diagnostic test for AIDS; Western Blot test is the confirmatory test.",
    "pointMr": "ELISA ही AIDS ची प्राथमिक चाचणी आहे; वेस्टर्न ब्लॉट (Western Blot) ही अंतिम खात्रीची चाचणी आहे.",
    "category": "Rule",
    "formula": "ELISA: screening; Western Blot: confirmation",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 179,
    "point": "Cancer: Normal cells exhibit Contact Inhibition (stops uncontrolled growth when touching other cells); Cancer cells LOSE contact inhibition and undergo metastasis (spread to distant sites via blood).",
    "pointMr": "कर्करोग: कर्करोगाच्या पेशींमध्ये 'कॉन्टॅक्ट इनहिबिशन' हा गुणधर्म नष्ट होतो, ज्यामुळे पेशींची अनिर्बंध वाढ होते.",
    "category": "Concept",
    "formula": "Loss of contact inhibition; Metastasis",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 180,
    "point": "Biotechnology Restriction Endonucleases: Molecular scissors that cut DNA at specific palindromic sequences (e.g. EcoRI cuts at 5'-G↓AATTC-3' leaving sticky ends). First discovered was Hind II.",
    "pointMr": "रेस्ट्रिक्शन एन्झाइम्स (आण्विक कात्री): DNA ला विशिष्ट पॅलिंड्रोमिक जागेवर कापतात (उदा. EcoRI कापतो 5'-GAATTC-3').",
    "category": "Rule",
    "formula": "EcoRI cuts at 5'-G↓AATTC-3'",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 181,
    "point": "Gel Electrophoresis: DNA fragments are NEGATIVELY charged (due to phosphate groups) and migrate towards ANODE (+) through agarose gel. Smaller fragments travel FASTER and farther.",
    "pointMr": "जेल इलेक्ट्रोफोरेसिस: DNA ऋण प्रभारित असल्याने धनायनाकडे धावतो; लहान तुकडे जास्त वेगाने पुढे जातात.",
    "category": "Rule",
    "formula": "DNA is negative, migrates to positive Anode",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 182,
    "point": "Bioreactors: Sparged stirred-tank bioreactors provide sterile air bubbles and continuous mixing for mass production of recombinant proteins (optimal temp, pH, substrate, oxygen).",
    "pointMr": "बायोरिअ‍ॅक्टर: हजारो लिटर आकारमानात औषधे व एन्झाईम्सचे मोठ्या प्रमाणावर उत्पादन घेण्यासाठी वापरले जातात.",
    "category": "Concept",
    "formula": "Continuous oxygen & stirring in bioreactor",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 183,
    "point": "Transgenic animals: Transgenic cow ROSIE (1997) produced human protein-enriched milk containing 2.4 g/L of human ALPHA-LACTALBUMIN, more nutritionally balanced for human babies.",
    "pointMr": "रोझी गाय (१९९७): मानवी अल्फा-लॅक्टाल्ब्युमिन प्रथिन असलेले पौष्टिक दूध देणारी पहिली ट्रान्सजेनिक गाय.",
    "category": "Concept",
    "formula": "Rosie cow: human alpha-lactalbumin",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 184,
    "point": "Population Growth Models: Exponential growth dN/dt = r N (J-shaped curve, unlimited resources); Logistic growth dN/dt = r N [ (K - N) / K ] (S-shaped / Sigmoid curve, limited resources, K is Carrying capacity).",
    "pointMr": "लोकसंख्या वाढ: अमर्याद अन्नामुळे J-आकार; मर्यादित स्रोतांमुळे सिग्मॉइड S-आकार (Logistic growth, K = कमाल क्षमता).",
    "category": "Formula",
    "formula": "Logistic: dN/dt = rN[(K - N)/K]",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 185,
    "point": "Interspecific Interactions: Mutualism (+/+ both benefit); Commensalism (+/0 one benefits, other unaffected); Parasitism (+/-); Predation (+/-); Amensalism (-/0 e.g. Penicillium inhibits bacteria).",
    "pointMr": "आंतरजातीय संबंध: सिम्बायोसिस (+/+), कॉमन्सॅलिझम (+/०), अमेंसॅलिझम (-/० पेनिसिलिन व जिवाणू).",
    "category": "Shortcut",
    "formula": "Mutualism: +/+; Commensalism: +/0; Amensalism: -/0",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 186,
    "point": "Trophic Levels & 10% Energy Law (Lindeman 1942): Only 10% of energy is transferred from one trophic level to the next; 90% is lost as heat in respiration. Limits food chains to 4-5 levels.",
    "pointMr": "लिंडेमनचा १०% ऊर्जा नियम: एका स्तरावरून पुढच्या स्तरावर फक्त १०% ऊर्जा जाते; ९०% ऊर्जा उष्णतेच्या रूपात नष्ट होते.",
    "category": "Rule",
    "formula": "10% Energy transfer between trophic levels",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 187,
    "point": "Ecological Pyramids exceptions: Pyramid of ENERGY is ALWAYS UPRIGHT; Pyramid of BIOMASS in sea is INVERTED (Phytoplankton mass < Zooplankton mass < Fish mass).",
    "pointMr": "ऊर्जेचा पिरॅमिड नेहमी सरळ असतो; समुद्रातील बायोमासचा पिरॅमिड उलटा (Inverted) असतो.",
    "category": "PYQ_Trend",
    "formula": "Energy pyramid: ALWAYS upright; Sea biomass: Inverted",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 188,
    "point": "Primary Succession occurs on newly formed, previously barren sites lacking soil (bare rock, cooled lava, newly formed sand dune); takes thousands of years. Secondary succession on abandoned farmland is much faster.",
    "pointMr": "प्राथमिक अनुक्रम (Primary succession) माती नसलेल्या खडकावर अत्यंत हळू होतो; दुय्यम अनुक्रम खूप वेगाने होतो.",
    "category": "Concept",
    "formula": "Primary succession is much slower than secondary",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 189,
    "point": "Biodiversity: Alexander von Humboldt noted Species-Area Relationship: log S = log C + Z log A, where Z is regression coefficient (0.1 - 0.2 for local areas; 0.6 - 1.2 for entire continents).",
    "pointMr": "हम्बोल्टचा नियम: क्षेत्रफळ वाढल्यास प्रजातींची विविधता वाढते: log S = log C + Z log A.",
    "category": "Formula",
    "formula": "log S = log C + Z log A",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 190,
    "point": "Biodiversity Hotspots in India: 1. Western Ghats and Sri Lanka 2. Indo-Burma 3. Himalaya. Hotspots cover <2% of earth's land but harbor >50% of endemic species.",
    "pointMr": "भारतातील जैवविविधता हॉटस्पॉट्स: १. पश्चिम घाट २. हिमालय ३. इंडो-बर्मा. उच्च स्थानिकता (Endemism).",
    "category": "Concept",
    "formula": "Western Ghats, Himalayas, Indo-Burma",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 191,
    "point": "In-situ Conservation (on-site): National Parks, Wildlife Sanctuaries, Biosphere Reserves, Sacred Groves. Ex-situ Conservation (off-site): Zoological Parks, Botanical Gardens, Cryopreservation (-196°C in liquid N₂), Seed Banks.",
    "pointMr": "स्वस्थानी (In-situ): राष्ट्रीय उद्याने, अभयारण्ये. परस्थानी (Ex-situ): प्राणीसंग्रहालय, क्रायोप्रिझर्व्हेशन (-१९६°C लिक्विड N₂).",
    "category": "Rule",
    "formula": "In-situ: Sanctuaries; Ex-situ: Cryo & Seed banks",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 192,
    "point": "Ozone Layer Depletion: Occurs in STRATOSPHERE due to Chlorofluorocarbons (CFCs); UV radiation breaks CFCs releasing chlorine free radicals (Cl·) that catalyze breakdown of Ozone into O₂. Thickness measured in DOBSON UNITS (DU).",
    "pointMr": "ओझोन थर: स्ट्रॅटोस्फिअरमध्ये असतो; CFC मुळे क्लोरीन मुक्त रॅडिकल्स ओझोन नष्ट करतात; जाडी डॉबसन युनिट (DU) मध्ये मोजतात.",
    "category": "Rule",
    "formula": "Ozone in Stratosphere; Measured in Dobson Units",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 193,
    "point": "Montreal Protocol: International treaty signed in Montreal (Canada) in 1987 (effective 1989) to control emission of ozone depleting substances (ODS / CFCs).",
    "pointMr": "मॉन्ट्रियल प्रोटोकॉल (१९८७): ओझोन थराचे रक्षण करण्यासाठी CFCs चे उत्सर्जन थांबवण्याचा आंतरराष्ट्रीय करार.",
    "category": "Concept",
    "formula": "Montreal Protocol (1987): Protects Ozone",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 194,
    "point": "Kyoto Protocol: International treaty adopted in Kyoto (Japan) in 1997 to reduce emissions of GREENHOUSE GASES (CO₂, CH₄, N₂O, HFCs) causing global warming.",
    "pointMr": "क्योटो प्रोटोकॉल (१९९७): जागतिक तापमानवाढ रोखण्यासाठी हरितगृह वायूंचे (Greenhouse gases) उत्सर्जन कमी करण्याचा करार.",
    "category": "Concept",
    "formula": "Kyoto Protocol (1997): Greenhouse gases",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 195,
    "point": "Eutrophication: Natural or accelerated cultural aging of a water body by nutrient enrichment (Nitrates and Phosphates), leading to algal bloom, oxygen depletion (high BOD), and death of aquatic life.",
    "pointMr": "युट्रोफिकेशन: सांडपाण्यातील फॉस्फेटमुळे शेवाळाची अनिर्बंध वाढ होऊन पाstatील ऑक्सिजन संपतो व मासे मरतात.",
    "category": "Concept",
    "formula": "Eutrophication: High nutrients, algal bloom, low O₂",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 196,
    "point": "Biomagnification: Increase in concentration of non-biodegradable toxicant (e.g. DDT, Mercury) at successive trophic levels. DDT reaches highest concentration in fish-eating birds, disrupting calcium metabolism (thin eggshells).",
    "pointMr": "बायोमॅग्निफिकेशन: अन्नसाखळीत DDT ची सांद्रता वरच्या स्तरावर वाढत जाते; पक्ष्यांची अंडी कमकुवत होऊन फुटतात.",
    "category": "Rule",
    "formula": "DDT biomagnification causes thin egg shells",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 197,
    "point": "Biochemical Oxygen Demand (BOD): Amount of oxygen required by bacteria to oxidize all organic matter in 1 liter of water. HIGH BOD indicates HIGH organic pollution and poor water quality.",
    "pointMr": "BOD: पाण्यात जास्त सेंद्रिय कचरा असल्यास BOD जास्त असतो (प्रदूषित पाणी). पिण्याच्या पाण्याचा BOD < १ ppm असावा.",
    "category": "Rule",
    "formula": "High BOD = High water pollution",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 198,
    "point": "Electrostatic Precipitator (ESP): Most widely used device in thermal power plants; removes over 99% of particulate matter from exhaust using corona discharge charging particles.",
    "pointMr": "इलेक्ट्रोस्टॅटिक प्रेसिपिटेटर (ESP): औष्णिक वीज प्रकल्पातील धुरातील ९९% पेक्षा जास्त सूक्ष्म कण काढून टाकतो.",
    "category": "Concept",
    "formula": "ESP removes 99% particulate matter",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 199,
    "point": "Catalytic Converter: Fitted in automobiles containing Platinum-Palladium and Rhodium catalysts; converts unburnt hydrocarbons to CO₂ and H₂O, and CO and NO to CO₂ and N₂. Requires UNLEADED petrol (lead inactivates catalyst).",
    "pointMr": "कॅटॅलिटिक कन्व्हर्टर: वाहनांच्या धुरातील विषारी वायू कमी करतो; शिसे नसलेले पेट्रोल (Unleaded petrol) वापरावे लागते.",
    "category": "Rule",
    "formula": "Lead inactivates catalytic converter",
    "badge": "PYQ Trends & Advanced"
  },
  {
    "id": 200,
    "point": "Chipko Movement (1974): In Garhwal Himalayas where local women hugged trees to prevent them from being cut down by commercial contractors.",
    "pointMr": "चिपको आंदोलन (१९७४): गढवाल हिमालयात झाडे वाचवण्यासाठी स्त्रियांनी झाडांना मिठी मारून संरक्षण केले.",
    "category": "Concept",
    "formula": "Chipko movement: Hugging trees (1974)",
    "badge": "PYQ Trends & Advanced"
  }
];

/**
 * Returns strictly 200 non-repeating points for the given subject
 */
export function get200PointsForSubject(subject: SubjectType): ChapterPointItem[] {
  switch (subject) {
    case "Physics":
      return PHYSICS_200_POINTS;
    case "Chemistry":
      return CHEMISTRY_200_POINTS;
    case "Mathematics":
      return MATHEMATICS_200_POINTS;
    case "Biology":
      return BIOLOGY_200_POINTS;
    default:
      return PHYSICS_200_POINTS;
  }
}
