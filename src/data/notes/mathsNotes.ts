import { TopicNote } from "../../types";

export const MATHS_NOTES: TopicNote[] = [
  // 1. Calculus (Differentiation & Integration)
  {
    id: "note_math_calculus",
    chapter: "Calculus (Differentiation & Integration)",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Derivatives, Integration Rules, Definite Integral Properties & Area",
    summary: "Chain rule, Logarithmic differentiation, Standard integrals, LIATE Integration by parts, King's property of definite integrals, and Area bounded by curves.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Differentiation Rules & Standard Formulas",
        points: [
          "Product Rule: d/dx [u · v] = u v' + v u'. Quotient Rule: d/dx [u / v] = (v u' - u v') / v².",
          "Chain Rule: d/dx [f(g(x))] = f'(g(x)) · g'(x).",
          "Logarithmic Differentiation: Used when y = [f(x)]^[g(x)]. Take ln y = g(x) ln f(x) then differentiate.",
          "Parametric Differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt). Second derivative: d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt).",
          "Standard Derivatives: d/dx [sin⁻¹ x] = 1/√(1 - x²), d/dx [tan⁻¹ x] = 1/(1 + x²), d/dx [a^x] = a^x ln a.",
        ],
        keyFormula: "d/dx [u/v] = (v u' - u v')/v² | dy/dx = (dy/dt)/(dx/dt)"
      },
      {
        title: "2. Indefinite & Definite Integration Tricks",
        points: [
          "Integration by Parts (LIATE rule): ∫ u v dx = u ∫ v dx - ∫ [ (du/dx) ∫ v dx ] dx.",
          "LIATE priority: Logarithmic > Inverse Trig > Algebraic > Trigonometric > Exponential.",
          "Euler Formula: ∫ e^x [ f(x) + f'(x) ] dx = e^x f(x) + C.",
          "King's Property of Definite Integral: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.",
          "Even/Odd Function Property: ∫_{-a}^a f(x) dx = 2 ∫_0^a f(x) dx (if even f(-x)=f(x)) OR 0 (if odd f(-x)=-f(x)).",
        ],
        keyFormula: "∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C | ∫_a^b f(x) dx = ∫_a^b f(a+b-x) dx",
        keyMnemonic: "LIATE: Log, Inverse, Algebraic, Trig, Exponential for choosing 'u'."
      },
    ],
    quickRevisionPoints: [
      { en: "Area bounded by y = f(x), x-axis, x=a to x=b: Area = ∫_a^b |y| dx." },
      { en: "Area between parabola y² = 4ax and line y = mx: Area = 8 a² / (3 m³)." },
    ],
    keyFormulasTable: [
      { name: "Integration by Parts", formula: "∫ u v dx = u ∫ v dx - ∫ [u' ∫ v dx] dx", description: "LIATE priority rule for product of functions" },
      { name: "Exponential Shortcut", formula: "∫ e^x [f(x) + f'(x)] dx = e^x f(x)", description: "Instant standard form integration" },
      { name: "King's Rule", formula: "∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx", description: "Symmetric cancellation in definite integrals" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting the dt/dx term when taking second derivative of parametric functions d²y/dx².",
        correction: "d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt). NEVER just differentiate dy/dx with respect to t alone."
      },
    ]
  },

  // 2. Vectors & 3D Geometry
  {
    id: "note_math_vectors_3d",
    chapter: "Vectors & 3D Geometry",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Dot Product, Cross Product, Scalar Triple Product & 3D Lines/Planes",
    summary: "Dot product, Cross product, Box product [a b c], Vector triple product, Line in 3D, Shortest distance between skew lines, and Plane equations.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Vector Algebra & Triple Products",
        points: [
          "Dot (Scalar) Product: a · b = |a| |b| cos θ. Angle: cos θ = (a · b) / (|a| |b|). Condition for perpendicularity: a · b = 0.",
          "Cross (Vector) Product: a × b = |a| |b| sin θ n̂. Area of parallelogram with adjacent vectors a, b: Area = |a × b|. Area of triangle: (1/2) |a × b|.",
          "Scalar Triple Product (Box Product): [a b c] = a · (b × c) = Determinant of components. Represents Volume of Parallelepiped. Condition for coplanarity: [a b c] = 0.",
          "Vector Triple Product: a × (b × c) = (a · c) b - (a · b) c ('BAC - CAB' rule).",
        ],
        keyFormula: "a · b = |a||b|cos θ | [a b c] = a · (b × c) | a × (b × c) = (a·c)b - (a·b)c",
        keyMnemonic: "Vector Triple: Remember 'BAC minus CAB' -> a × (b × c) = b(a·c) - c(a·b)."
      },
      {
        title: "2. Three Dimensional Geometry (3D)",
        points: [
          "Direction Cosines & Ratios: l² + m² + n² = 1, where l = cos α, m = cos β, n = cos γ.",
          "Vector Equation of Line passing through a and parallel to b: r = a + λ b.",
          "Cartesian Equation of Line: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c.",
          "Shortest Distance between Skew Lines (r = a₁ + λ b₁ and r = a₂ + μ b₂): d = | (a₂ - a₁) · (b₁ × b₂) | / | b₁ × b₂ |.",
          "Shortest Distance between Parallel Lines (r = a₁ + λ b and r = a₂ + μ b): d = | (a₂ - a₁) × b | / | b |.",
          "Perpendicular distance from point (x₀, y₀, z₀) to plane Ax + By + Cz + D = 0: d = | A x₀ + B y₀ + C z₀ + D | / √(A² + B² + C²).",
        ],
        keyFormula: "d_skew = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂| | l² + m² + n² = 1"
      },
    ],
    quickRevisionPoints: [
      { en: "Projection of vector a on vector b: Projection = (a · b) / |b|." },
      { en: "Two lines are perpendicular if a₁ a₂ + b₁ b₂ + c₁ c₂ = 0; parallel if a₁/a₂ = b₁/b₂ = c₁/c₂." },
    ],
    keyFormulasTable: [
      { name: "Scalar Triple Product", formula: "[a b c] = a · (b × c)", description: "Volume of parallelepiped formed by vectors" },
      { name: "Skew Lines Distance", formula: "d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|", description: "Shortest distance between two non-intersecting non-parallel lines" },
      { name: "Direction Cosines Relation", formula: "l² + m² + n² = 1", description: "Sum of squares of direction cosines equals unity" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing direction ratios (a, b, c) with direction cosines (l, m, n).",
        correction: "Direction ratios can be any proportional values; Direction cosines MUST strictly satisfy l² + m² + n² = 1."
      },
    ]
  },

  // 3. Matrices & Determinants
  {
    id: "note_math_matrices_determinants",
    chapter: "Matrices & Determinants",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Matrix Inversion, Adjoint Properties, Cramers' Rule & System of Equations",
    summary: "Properties of Determinants, Adjoint formulas, Inverse of 2x2 and 3x3 matrices, System of linear equations consistency (Cramer's rule & Matrix method), and Cayley-Hamilton theorem.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Properties of Determinants & Adjoint Formulas",
        points: [
          "Properties of Determinants: |A^T| = |A|, |A · B| = |A| |B|, |k A| = k^n |A| (for n × n matrix).",
          "Singular Matrix: |A| = 0 (Inverse does NOT exist); Non-singular: |A| ≠ 0.",
          "Adjoint Formulas (for n × n matrix A):",
          "1. A · adj(A) = adj(A) · A = |A| I_n.",
          "2. |adj(A)| = |A|^(n - 1).",
          "3. adj(adj(A)) = |A|^(n - 2) · A.",
          "4. |adj(adj(A))| = |A|^((n - 1)²).",
          "5. adj(A · B) = adj(B) · adj(A).",
          "Matrix Inverse: A⁻¹ = (1 / |A|) · adj(A). Note: (A⁻¹)⁻¹ = A, (A · B)⁻¹ = B⁻¹ · A⁻¹.",
        ],
        keyFormula: "A⁻¹ = (1/|A|) adj(A) | |adj(A)| = |A|^(n-1) | |k A| = k^n |A|"
      },
      {
        title: "2. System of Linear Equations & Consistency",
        points: [
          "System of equations: A X = B => X = A⁻¹ B = (1/|A|) adj(A) B.",
          "Non-homogeneous system (AX = B, B ≠ 0):",
          "- Unique Solution: If |A| ≠ 0 (Consistent).",
          "- Infinitely Many Solutions: If |A| = 0 AND (adj A) · B = O (Consistent dependent).",
          "- No Solution: If |A| = 0 AND (adj A) · B ≠ O (Inconsistent).",
          "Homogeneous system (AX = 0):",
          "- Trivial solution (x=0, y=0, z=0): If |A| ≠ 0.",
          "- Non-trivial / Infinite solutions: If |A| = 0.",
          "Cramer's Rule: x = D_x / D, y = D_y / D, z = D_z / D (for D ≠ 0).",
        ],
        keyFormula: "x = D_x/D, y = D_y/D, z = D_z/D | Homogeneous non-trivial: |A| = 0"
      },
    ],
    quickRevisionPoints: [
      { en: "Symmetric Matrix: A^T = A; Skew-Symmetric Matrix: A^T = -A (All diagonal elements of a skew-symmetric matrix are always ZERO)." },
      { en: "Orthogonal Matrix: A · A^T = I => |A| = ±1." },
    ],
    keyFormulasTable: [
      { name: "Matrix Inverse", formula: "A⁻¹ = (1 / |A|) adj(A)", description: "Multiplicative inverse of non-singular square matrix" },
      { name: "Determinant of Adjoint", formula: "|adj(A)| = |A|^(n - 1)", description: "Adjoint determinant power relation" },
      { name: "Scalar Multiplication Det", formula: "|k A| = k^n |A|", description: "Determinant of scaled n×n matrix" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing |k A| = k |A| for a 3×3 matrix.",
        correction: "For a 3×3 matrix, |k A| = k³ |A|. For 2×2, |k A| = k² |A|."
      },
    ]
  },

  // 4. Trigonometric Functions & Inverse Trig
  {
    id: "note_math_trigonometry",
    chapter: "Trigonometric Functions & Inverse Trig",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Trigonometric Identities, General Solutions & Inverse Trig Properties",
    summary: "Compound angles, Multiple & Sub-multiple angles, Transformation formulas, General solutions of trigonometric equations, Domain & Range of Inverse Trig functions, and principal value branches.",
    highYieldWeightage: "Medium",
    sections: [
      {
        title: "1. Compound, Multiple Angles & Transformation Formulas",
        points: [
          "sin(A ± B) = sin A cos B ± cos A sin B.",
          "cos(A ± B) = cos A cos B ∓ sin A sin B.",
          "tan(A ± B) = (tan A ± tan B) / (1 ∓ tan A tan B).",
          "Double Angles: sin 2θ = 2 sin θ cos θ = 2 tan θ / (1 + tan² θ); cos 2θ = cos² θ - sin² θ = 2 cos² θ - 1 = 1 - 2 sin² θ = (1 - tan² θ)/(1 + tan² θ).",
          "Half Angle Identities: 1 - cos θ = 2 sin²(θ/2); 1 + cos θ = 2 cos²(θ/2).",
          "Product to Sum: 2 sin A cos B = sin(A + B) + sin(A - B); 2 cos A cos B = cos(A + B) + cos(A - B); 2 sin A sin B = cos(A - B) - cos(A + B).",
        ],
        keyFormula: "1 - cos 2θ = 2 sin² θ | 1 + cos 2θ = 2 cos² θ | tan 2θ = 2 tan θ/(1 - tan² θ)"
      },
      {
        title: "2. Inverse Trigonometric Functions & Principal Values",
        points: [
          "Principal Value Branches:",
          "- sin⁻¹ x: Domain [-1, 1], Range [-π/2, π/2].",
          "- cos⁻¹ x: Domain [-1, 1], Range [0, π].",
          "- tan⁻¹ x: Domain R, Range (-π/2, π/2).",
          "Negative Argument Rules:",
          "- sin⁻¹(-x) = - sin⁻¹ x, tan⁻¹(-x) = - tan⁻¹ x, cosec⁻¹(-x) = - cosec⁻¹ x.",
          "- cos⁻¹(-x) = π - cos⁻¹ x, sec⁻¹(-x) = π - sec⁻¹ x, cot⁻¹(-x) = π - cot⁻¹ x.",
          "Complementary Identities: sin⁻¹ x + cos⁻¹ x = π/2; tan⁻¹ x + cot⁻¹ x = π/2; sec⁻¹ x + cosec⁻¹ x = π/2.",
          "Sum of Arctangents: tan⁻¹ x + tan⁻¹ y = tan⁻¹ [ (x + y) / (1 - xy) ] (for xy < 1). If xy > 1 and x,y > 0: π + tan⁻¹ [ (x + y) / (1 - xy) ].",
        ],
        keyFormula: "sin⁻¹ x + cos⁻¹ x = π/2 | cos⁻¹(-x) = π - cos⁻¹ x | tan⁻¹ x + tan⁻¹ y = tan⁻¹[(x+y)/(1-xy)]"
      },
    ],
    quickRevisionPoints: [
      { en: "Range of a sin x + b cos x is [-√(a² + b²), +√(a² + b²)]." },
      { en: "General Solution: If sin θ = sin α => θ = nπ + (-1)^n α; If cos θ = cos α => θ = 2nπ ± α; If tan θ = tan α => θ = nπ + α." },
    ],
    keyFormulasTable: [
      { name: "Arctan Addition", formula: "tan⁻¹ x + tan⁻¹ y = tan⁻¹((x+y)/(1-xy))", description: "Addition formula for inverse tangents (xy < 1)" },
      { name: "Cosine Inverse Negative", formula: "cos⁻¹(-x) = π - cos⁻¹(x)", description: "Principal value adjustment for negative cosine argument" },
      { name: "Extreme Values", formula: "Max/Min = ±√(a² + b²)", description: "Amplitude range for a sin x + b cos x" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing cos⁻¹(-1/2) = - π/3.",
        correction: "cos⁻¹(-1/2) = π - cos⁻¹(1/2) = π - π/3 = 2π/3 (120°), because the range of cos⁻¹ is [0, π]."
      },
    ]
  },

  // 5. Probability & Binomial Distribution
  {
    id: "note_math_probability",
    chapter: "Probability & Binomial Distribution",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Conditional Probability, Bayes' Theorem & Binomial Distribution Notes",
    summary: "Addition & Multiplication theorems, Conditional probability P(A|B), Total Probability Theorem, Bayes' Theorem, Random Variables, Expectation E(X), Variance, and Binomial Distribution B(n, p).",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Conditional Probability & Bayes' Theorem",
        points: [
          "Conditional Probability: P(A | B) = P(A ∩ B) / P(B) (for P(B) > 0).",
          "Independent Events: P(A ∩ B) = P(A) · P(B) => P(A | B) = P(A).",
          "Total Probability Theorem: If E₁, E₂, ..., Eₙ are mutually exclusive and exhaustive events: P(A) = Σ P(Eᵢ) · P(A | Eᵢ).",
          "Bayes' Theorem: P(E_k | A) = [ P(E_k) · P(A | E_k) ] / [ Σ P(Eᵢ) · P(A | Eᵢ) ].",
        ],
        keyFormula: "P(A|B) = P(A ∩ B)/P(B) | Bayes: P(E₁|A) = P(E₁)P(A|E₁) / Σ P(Eᵢ)P(A|Eᵢ)"
      },
      {
        title: "2. Random Variables & Binomial Distribution",
        points: [
          "Probability Distribution: Σ P(X = xᵢ) = 1, where P(xᵢ) ≥ 0.",
          "Mathematical Expectation (Mean μ): E(X) = Σ xᵢ · P(xᵢ).",
          "Variance: Var(X) = σ² = E(X²) - [E(X)]² = Σ xᵢ² P(xᵢ) - μ².",
          "Standard Deviation: σ = √Var(X).",
          "Binomial Distribution B(n, p): P(X = r) = ⁿCᵣ · pʳ · q^(n - r) (where q = 1 - p).",
          "Mean of Binomial Distribution: Mean = n · p.",
          "Variance of Binomial Distribution: Variance = n · p · q (always Variance < Mean since q < 1).",
        ],
        keyFormula: "P(X=r) = ⁿCᵣ pʳ q^(n-r) | Mean = np | Var = npq"
      },
    ],
    quickRevisionPoints: [
      { en: "For independent events A and B: P(A ∪ B) = 1 - P(A') P(B')." },
      { en: "If Mean of binomial distribution is 4 and variance is 3, then q = Var/Mean = 3/4, so p = 1/4 and n = Mean/p = 16." },
    ],
    keyFormulasTable: [
      { name: "Bayes' Theorem", formula: "P(E_k|A) = P(E_k)P(A|E_k) / Σ P(E_i)P(A|E_i)", description: "Posterior probability calculation" },
      { name: "Binomial Probability", formula: "P(X=r) = ⁿCᵣ pʳ (1-p)^(n-r)", description: "Probability of exactly r successes in n Bernoulli trials" },
      { name: "Binomial Variance", formula: "Var(X) = n p q", description: "Spread of binomial distribution" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Assuming P(A ∩ B) = P(A) · P(B) for mutually exclusive events.",
        correction: "For mutually exclusive events, P(A ∩ B) = 0. P(A ∩ B) = P(A) · P(B) is true ONLY for Independent events!"
      },
    ]
  },

  // 6. Differential Equations & Applications
  {
    id: "note_math_diff_equations",
    chapter: "Differential Equations & Applications",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Order & Degree, Variable Separable, Homogeneous & Linear Differential Equations",
    summary: "Order and degree of DE, Formation of differential equations, Variable separable method, Homogeneous differential equations (y = vx), Linear Differential Equations (Integrating Factor IF = e^(∫P dx)), and Applications in growth & decay.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Order, Degree & Solution Techniques",
        points: [
          "Order: Highest derivative present in the differential equation.",
          "Degree: Power of the highest order derivative when differential coefficients are free from radicals and fractions (Degree is undefined if derivatives are inside sin, cos, ln, e^x).",
          "Variable Separable Form: f(x) dx + g(y) dy = 0 => Integrate directly: ∫ f(x) dx + ∫ g(y) dy = C.",
          "Homogeneous Differential Equation: dy/dx = f(y/x). Substitute y = v x => dy/dx = v + x (dv/dx), then separate variables v and x.",
        ],
        keyFormula: "Homogeneous: Put y = vx => dy/dx = v + x (dv/dx)"
      },
      {
        title: "2. Linear Differential Equations (LDE)",
        points: [
          "Standard Form 1: dy/dx + P(x) y = Q(x).",
          "- Integrating Factor: I.F. = e^(∫ P(x) dx).",
          "- General Solution: y · (I.F.) = ∫ [ Q(x) · (I.F.) ] dx + C.",
          "Standard Form 2: dx/dy + P(y) x = Q(y).",
          "- Integrating Factor: I.F. = e^(∫ P(y) dy).",
          "- General Solution: x · (I.F.) = ∫ [ Q(y) · (I.F.) ] dy + C.",
          "Growth and Decay Model: dN/dt = k N => N(t) = N₀ e^(kt) (k > 0 for growth, k < 0 for radioactive decay).",
        ],
        keyFormula: "I.F. = e^(∫ P dx) | y · (I.F.) = ∫ [Q · (I.F.)] dx + C"
      },
    ],
    quickRevisionPoints: [
      { en: "Number of arbitrary constants in the GENERAL solution of an nth order differential equation is n; in PARTICULAR solution it is ZERO." },
      { en: "e^(ln f(x)) = f(x); useful for simplifying I.F. = e^(∫ (2/x) dx) = e^(ln x²) = x²." },
    ],
    keyFormulasTable: [
      { name: "Integrating Factor", formula: "I.F. = exp(∫ P dx)", description: "Factor used to make first-order linear DE exact" },
      { name: "Linear DE Solution", formula: "y · (I.F.) = ∫ Q · (I.F.) dx + C", description: "Closed-form solution of dy/dx + Py = Q" },
      { name: "Exponential Decay", formula: "N(t) = N₀ e^(-kt)", description: "Differential rate model for decay processes" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Finding degree of equations like d²y/dx² + sin(dy/dx) = 0.",
        correction: "The degree is UNDEFINED because the equation cannot be expressed as a polynomial in derivatives (dy/dx is inside the transcendental sine function). Order is 2."
      },
    ]
  },

  // 7. Coordinate Geometry: Lines & Conics
  {
    id: "note_math_coordinate_geometry",
    chapter: "Coordinate Geometry: Lines & Conics",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Straight Lines, Pair of Lines, Circles, Parabola, Ellipse & Hyperbola Notes",
    summary: "Distance formula, Slope, Pair of straight lines angle & condition, Circle standard equations, Tangency condition c² = a²(1 + m²), Parabola, Ellipse, and Hyperbola focal properties & eccentricity.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Straight Lines & Pair of Straight Lines",
        points: [
          "Slope m = tan θ = (y₂ - y₁) / (x₂ - x₁) = - a / b (for ax + by + c = 0).",
          "Perpendicular distance from (x₁, y₁) to ax + by + c = 0: d = |a x₁ + b y₁ + c| / √(a² + b²).",
          "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0: d = |c₁ - c₂| / √(a² + b²).",
          "Homogeneous equation of pair of lines: a x² + 2h xy + b y² = 0.",
          "- Angle between lines: tan θ = | 2 √(h² - ab) | / |a + b|.",
          "- Condition for perpendicular lines: a + b = 0 (sum of coefficients of x² and y² is zero).",
          "- Condition for coincident/parallel lines: h² - ab = 0.",
        ],
        keyFormula: "tan θ = 2√(h² - ab) / |a + b| | Perpendicular: a + b = 0 | Parallel: h² = ab"
      },
      {
        title: "2. Circles & Conic Sections (Parabola, Ellipse, Hyperbola)",
        points: [
          "General Circle: x² + y² + 2gx + 2fy + c = 0. Center = (-g, -f), Radius R = √(g² + f² - c).",
          "Condition for line y = mx + c to touch circle x² + y² = a²: c² = a² (1 + m²).",
          "Parabola (y² = 4ax): Focus (a, 0), Directrix x = -a, Latus Rectum = 4a, Tangency condition: c = a / m.",
          "Ellipse (x²/a² + y²/b² = 1, a > b): Eccentricity e = √(1 - b²/a²) (e < 1), Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a, Tangency condition: c² = a² m² + b².",
          "Hyperbola (x²/a² - y²/b² = 1): Eccentricity e = √(1 + b²/a²) (e > 1), Foci (±ae, 0), Directrices x = ±a/e, Latus Rectum = 2b²/a, Tangency condition: c² = a² m² - b².",
          "Rectangular Hyperbola (xy = c²): e = √2, Asymptotes are perpendicular coordinate axes.",
        ],
        keyFormula: "Circle Tangency: c² = a²(1+m²) | Ellipse: e = √(1 - b²/a²) | Hyperbola: e = √(1 + b²/a²)"
      },
    ],
    quickRevisionPoints: [
      { en: "Conic definition based on eccentricity e: e = 0 (Circle), 0 < e < 1 (Ellipse), e = 1 (Parabola), e > 1 (Hyperbola), e = √2 (Rectangular Hyperbola)." },
      { en: "Tangent to y² = 4ax at point (x₁, y₁): y y₁ = 2a (x + x₁); In parametric form (at², 2at): t y = x + a t²." },
    ],
    keyFormulasTable: [
      { name: "Circle Tangent Condition", formula: "c = ± a √(1 + m²)", description: "Condition for straight line y = mx + c to touch circle" },
      { name: "Parabola Tangent Condition", formula: "c = a / m", description: "Condition for line y = mx + c to touch y² = 4ax" },
      { name: "Ellipse Eccentricity", formula: "e = √(1 - b²/a²)", description: "Eccentricity ratio for standard ellipse (a > b)" },
      { name: "Hyperbola Eccentricity", formula: "e = √(1 + b²/a²)", description: "Eccentricity ratio for standard hyperbola" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing the sign in ellipse vs hyperbola eccentricity formulas.",
        correction: "Ellipse has MINUS: e = √(1 - b²/a²) (<1); Hyperbola has PLUS: e = √(1 + b²/a²) (>1)."
      },
    ]
  },

  // 8. Vectors & 3D Geometry
  {
    id: "note_math_vectors_3d_geometry",
    chapter: "Vectors & Three Dimensional Geometry",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Dot & Cross Product, Triple Product, Direction Cosines & Shortest Distance Notes",
    summary: "Scalar and vector products, Scalar triple product [a b c] volume of parallelepiped, Direction cosines l² + m² + n² = 1, Line equations in 3D (vector & cartesian), Angle between two lines cos θ, and Shortest distance between two skew lines.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Vector Algebra & Triple Products",
        points: [
          "Dot Product: a · b = |a| |b| cos θ. Angle: cos θ = (a · b) / (|a| |b|). Condition for perpendicular vectors: a · b = 0.",
          "Projection of vector a on vector b: Projection = (a · b) / |b|; Vector projection = [ (a · b) / |b|² ] b.",
          "Cross Product: a × b = |a| |b| sin θ n̂. Area of parallelogram with adjacent sides a and b: Area = |a × b|; Area of triangle = (1/2) |a × b|.",
          "Condition for collinear/parallel vectors: a × b = 0 => a = λ b.",
          "Scalar Triple Product (Box Product): [a b c] = a · (b × c) = Determinant of components of a, b, c.",
          "- Volume of parallelepiped = |[a b c]|.",
          "- Volume of tetrahedron with coterminous edges a, b, c = (1/6) |[a b c]|.",
          "- Condition for coplanar vectors: [a b c] = 0.",
        ],
        keyFormula: "a · b = 0 (Perpendicular) | [a b c] = 0 (Coplanar) | Vol = (1/6) |[a b c]| (Tetrahedron)"
      },
      {
        title: "2. Three-Dimensional Geometry (Lines & Distance)",
        points: [
          "Direction Cosines (l, m, n): l = cos α, m = cos β, n = cos γ. Fundamental identity: l² + m² + n² = 1 (or cos²α + cos²β + cos²γ = 1; sin²α + sin²β + sin²γ = 2).",
          "Direction Ratios (a, b, c): l = a / √(a²+b²+c²), m = b / √(a²+b²+c²), n = c / √(a²+b²+c²).",
          "Line through point a parallel to vector b: Vector: r = a + λ b; Cartesian: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c.",
          "Angle between two lines with direction ratios (a₁, b₁, c₁) and (a₂, b₂, c₂):",
          "- cos θ = |a₁a₂ + b₁b₂ + c₁c₂| / [ √(a₁²+b₁²+c₁²) · √(a₂²+b₂²+c₂²) ].",
          "- Perpendicular condition: a₁a₂ + b₁b₂ + c₁c₂ = 0.",
          "- Parallel condition: a₁/a₂ = b₁/b₂ = c₁/c₂.",
          "Shortest Distance between Skew Lines (r = a₁ + λ b₁ and r = a₂ + μ b₂):",
          "d = | (a₂ - a₁) · (b₁ × b₂) | / |b₁ × b₂|.",
          "Distance between Parallel Lines (r = a₁ + λ b and r = a₂ + μ b): d = | (a₂ - a₁) × b | / |b|.",
        ],
        keyFormula: "l² + m² + n² = 1 | Shortest Distance d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|"
      },
    ],
    quickRevisionPoints: [
      { en: "If [a b c] is a scalar triple product, cyclic permutations leave the value unchanged: [a b c] = [b c a] = [c a b] = -[b a c]." },
      { en: "The sum of squares of direction cosines is 1 (l²+m²+n²=1), and sum of squares of direction sines is 2 (sin²α+sin²β+sin²γ=2)." },
    ],
    keyFormulasTable: [
      { name: "Direction Cosines Relation", formula: "l² + m² + n² = 1", description: "Fundamental identity of direction cosines in 3D" },
      { name: "Skew Lines Distance", formula: "d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|", description: "Shortest perpendicular distance between non-parallel non-intersecting lines" },
      { name: "Vector Projection", formula: "proj_b(a) = (a · b) / |b|", description: "Scalar component of vector a along vector b" },
      { name: "Coplanar Condition", formula: "[a b c] = 0", description: "Zero scalar triple product indicates three vectors are coplanar" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Dividing by |a₂ - a₁| instead of |b₁ × b₂| in shortest distance formula.",
        correction: "Denominator MUST be the magnitude of cross product of direction vectors: |b₁ × b₂|."
      },
    ]
  },

  // 9. Probability & Binomial Distribution
  {
    id: "note_math_probability_binomial",
    chapter: "Probability & Binomial Distribution",
    subject: "Mathematics",
    exams: ["JEE_MAIN", "MHT_CET"],
    title: "Conditional Probability, Bayes Theorem, Random Variables & Binomial Notes",
    summary: "Conditional probability P(A|B), Multiplication rule, Total Probability theorem, Bayes' Theorem for reverse probability, Discrete Random Variable Probability Distribution (PMF), Expectation Mean μ = Σ x P(x), Variance σ² = Σ x² P(x) - μ², and Binomial Distribution B(n, p) with mean np and variance npq.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Conditional Probability & Bayes' Theorem",
        points: [
          "Conditional Probability: P(A|B) = P(A ∩ B) / P(B), provided P(B) > 0.",
          "Multiplication Theorem: P(A ∩ B) = P(B) · P(A|B) = P(A) · P(B|A).",
          "Independent Events: Two events A and B are independent if P(A ∩ B) = P(A) · P(B) <=> P(A|B) = P(A).",
          "Theorem of Total Probability: If E₁, E₂, ..., Eₙ partition sample space S, then for any event A: P(A) = Σ [ P(Eᵢ) · P(A|Eᵢ) ].",
          "Bayes' Theorem: P(Eₖ | A) = [ P(Eₖ) · P(A|Eₖ) ] / [ Σ P(Eᵢ) · P(A|Eᵢ) ].",
          "- Used to calculate reverse / posterior probability given that event A has already occurred.",
        ],
        keyFormula: "Bayes: P(E_k | A) = [P(E_k) P(A|E_k)] / Σ [P(E_i) P(A|E_i)] | P(A∩B) = P(A)P(B)"
      },
      {
        title: "2. Random Variables & Binomial Distribution",
        points: [
          "Probability Mass Function (PMF): P(X = xᵢ) = pᵢ such that pᵢ ≥ 0 and Σ pᵢ = 1.",
          "Expected Value (Mean μ): E(X) = Σ [ xᵢ · P(xᵢ) ].",
          "Variance: Var(X) = σ² = E(X²) - [E(X)]² = Σ [ xᵢ² · P(xᵢ) ] - μ².",
          "Standard Deviation (SD): σ = √Var(X).",
          "Binomial Distribution B(n, p):",
          "- n independent Bernoulli trials with constant probability of success p and failure q = 1 - p.",
          "- Probability of exactly r successes: P(X = r) = ⁿCᵣ pʳ q^(n - r), where r = 0, 1, 2, ..., n.",
          "- Mean of Binomial Distribution: E(X) = n p.",
          "- Variance of Binomial Distribution: Var(X) = n p q.",
          "- For Binomial Distribution: Variance is ALWAYS LESS THAN Mean (npq < np since q < 1).",
        ],
        keyFormula: "P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ | Mean = np | Var = npq | Var < Mean",
        keyMnemonic: "Binomial: Mean = np, Variance = np(1-p). Always Var < Mean."
      },
    ],
    quickRevisionPoints: [
      { en: "If A and B are independent events, then A and B', A' and B, and A' and B' are also independent pairs." },
      { en: "In any Binomial Distribution, maximum variance occurs when p = q = 0.5, with Var_max = n / 4." },
    ],
    keyFormulasTable: [
      { name: "Binomial PMF", formula: "P(X=r) = ⁿCᵣ pʳ (1-p)ⁿ⁻ʳ", description: "Probability of exactly r successes in n independent trials" },
      { name: "Binomial Mean & Var", formula: "Mean = np, Var = npq", description: "First and second central moments of binomial distribution" },
      { name: "Bayes Posterior", formula: "P(A|B) = [P(B|A)P(A)] / P(B)", description: "Inverse conditional probability computation" },
      { name: "Variance from Moments", formula: "Var(X) = E(X²) - [E(X)]²", description: "Computation of spread from expected values" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Confusing Mutually Exclusive events with Independent events.",
        correction: "Mutually Exclusive means P(A ∩ B) = 0 (cannot occur together). Independent means P(A ∩ B) = P(A) · P(B) (occurrence of one doesn't affect probability of the other). Two events with non-zero probabilities CANNOT be both mutually exclusive and independent!"
      },
    ]
  },
];
