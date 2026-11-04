import { TopicNote } from "../../types";

export const MATHS_NOTES_ADDED: TopicNote[] = [
  // 1. Mathematical Logic
  {
    id: "note_math_logic",
    chapter: "Mathematical Logic",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Truth Tables, Quantifiers, Duals, Logical Equivalence & Switching Circuits",
    summary: "Guaranteed scoring chapter in MHT-CET! Complete guide to Statements, Connectives (∧, ∨, ~, →, ↔), Truth tables, Tautology/Contradiction, Negation rules, Converse/Inverse/Contrapositive, Duals, and Switching circuits.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Statements, Truth Values & Connectives",
        points: [
          "Statement: A declarative sentence which is either true (T) or false (F), but not both simultaneously. Interrogative, exclamatory, and imperative sentences are NOT statements.",
          "Conjunction (p ∧ q, 'AND'): True ONLY when BOTH p and q are true. Otherwise False.",
          "Disjunction (p ∨ q, 'OR'): False ONLY when BOTH p and q are false. Otherwise True.",
          "Conditional / Implication (p → q, 'If p then q'): False ONLY when p is True and q is False (T → F is F). In all other cases, it is True.",
          "Biconditional / Double Implication (p ↔ q, 'p iff q'): True when BOTH p and q have the SAME truth value (T ↔ T is T, F ↔ F is T). If different, False.",
          "Negation (~p, 'NOT'): Reverses the truth value (~T = F, ~F = T).",
        ],
        keyFormula: "p ∧ q: T only if T-T | p ∨ q: F only if F-F | p → q: F only if T → F | p ↔ q: T if same",
        keyMnemonic: "Implication rule: 'True promises a Lie is a Failure' -> T → F gives F."
      },
      {
        title: "2. Converse, Inverse, Contrapositive & Negations",
        points: [
          "For conditional statement p → q:",
          "Converse: q → p.",
          "Inverse: ~p → ~q.",
          "Contrapositive: ~q → ~p. Crucial theorem: A conditional statement and its contrapositive are LOGICALLY EQUIVALENT: (p → q) ≡ (~q → ~p).",
          "Converse and Inverse are also logically equivalent to each other: (q → p) ≡ (~p → ~q).",
          "Negation Rules (Extremely high frequency in MHT-CET):",
          "Negation of Conjunction (De Morgan's): ~(p ∧ q) ≡ ~p ∨ ~q.",
          "Negation of Disjunction (De Morgan's): ~(p ∨ q) ≡ ~p ∧ ~q.",
          "Negation of Implication: ~(p → q) ≡ p ∧ ~q. (Notice: There is NO '→' in the negation!).",
          "Negation of Biconditional: ~(p ↔ q) ≡ (p ∧ ~q) ∨ (q ∧ ~p).",
          "Quantifiers: Universal (∀, 'for all') and Existential (∃, 'there exists'). In negation, ∀ changes to ∃ and vice versa.",
          "Dual of a statement: Formed by interchanging ∧ and ∨, and interchanging T (tautology) and c (contradiction). Special connectives (~) remain UNCHANGED.",
        ],
        keyFormula: "~(p → q) ≡ p ∧ ~q | Contrapositive: ~q → ~p ≡ p → q | De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q",
        examTip: "Never use an arrow in the negation of an implication: ~(p → q) is strictly p ∧ ~q."
      },
      {
        title: "3. Tautology, Contradiction & Switching Circuits",
        points: [
          "Tautology (t): Statement pattern whose truth value is ALWAYS True (T) for all combinations (e.g. p ∨ ~p ≡ t).",
          "Contradiction / Fallacy (c): Statement pattern whose truth value is ALWAYS False (F) for all combinations (e.g. p ∧ ~p ≡ c).",
          "Contingency: Statement pattern which is neither a tautology nor a contradiction.",
          "Switching Circuits:",
          "Two switches in SERIES correspond to CONJUNCTION (p ∧ q). Current flows only if both switches S₁ and S₂ are closed.",
          "Two switches in PARALLEL correspond to DISJUNCTION (p ∨ q). Current flows if at least one switch is closed.",
          "Switch S₁' (complement) corresponds to negation ~p.",
          "Circuit Simplification Rules: Absorption law p ∨ (p ∧ q) ≡ p, p ∧ (p ∨ q) ≡ p; Distributive law p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r).",
        ],
        keyFormula: "Series = p ∧ q | Parallel = p ∨ q | p ∨ ~p ≡ t | p ∧ ~p ≡ c"
      },
    ],
    quickRevisionPoints: [
      { en: "p → q is false ONLY if p is T and q is F. Contrapositive (~q → ~p) is equivalent." },
      { en: "Negation of p → q is p ∧ ~q. Never write an arrow in negation." },
      { en: "Series circuit = ∧ (AND); Parallel circuit = ∨ (OR)." },
    ],
    keyFormulasTable: [
      { name: "Negation of Implication", formula: "~(p → q) ≡ p ∧ ~q", description: "Standard equivalence for negation of conditional statements" },
      { name: "Contrapositive Equivalence", formula: "(p → q) ≡ (~q → ~p)", description: "Statement is logically equivalent to its contrapositive" },
      { name: "De Morgan's Laws", formula: "~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q", description: "Distributing negation over conjunction and disjunction" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Writing ~(p → q) as ~p → ~q.",
        correction: "The correct negation is p ∧ ~q. (~p → ~q is the inverse, which is not equivalent to negation)."
      },
    ]
  },

  // 2. Linear Programming Problems (LPP)
  {
    id: "note_math_lpp",
    chapter: "Linear Programming Problems (LPP)",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Objective Function, Constraints, Feasible Region & Corner Point Method",
    summary: "Complete high-yield revision for LPP covering Linear inequalities, Non-negative constraints, Feasible region (Bounded vs Unbounded), Corner Point Theorem, and Shortcut speed-solving for MHT-CET.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Components of LPP & Graphing Inequalities",
        points: [
          "Objective Function: Linear function Z = ax + by which is to be maximized or minimized.",
          "Decision Variables: x and y representing quantities to be determined. Non-negative constraints: x ≥ 0, y ≥ 0 (restricts the solution strictly to the FIRST QUADRANT).",
          "Constraints: Linear inequalities representing limitations on resources (e.g. a₁x + b₁y ≤ c₁ or a₂x + b₂y ≥ c₂).",
          "Graphing a Linear Inequality ax + by ≤ c:",
          "Step 1: Draw the boundary line ax + by = c (find x-intercept at y=0, and y-intercept at x=0).",
          "Step 2: Test the origin (0, 0): If 0 + 0 ≤ c is true, shade the region TOWARDS the origin.",
          "If inequality is ≥ c and c > 0, shade the region AWAY from the origin.",
        ],
        keyFormula: "Z = ax + by | Non-negative: x ≥ 0, y ≥ 0 (Quadrant I)"
      },
      {
        title: "2. Feasible Region & Corner Point Theorem",
        points: [
          "Feasible Region: The common region determined by all the constraints simultaneously including non-negative constraints x ≥ 0, y ≥ 0.",
          "Any point in the feasible region is a Feasible Solution. Any point outside is an Infeasible Solution.",
          "Bounded Region: A feasible region enclosed within lines (can be enclosed inside a circle of finite radius).",
          "Unbounded Region: A feasible region extending indefinitely in some direction.",
          "Corner Point Theorem: The optimal value (maximum or minimum) of the objective function Z = ax + by occurs at one of the CORNER POINTS (vertices) of the feasible region.",
          "Solving Method: (1) Find coordinates of all corner points (vertices) by solving equations of intersecting boundary lines; (2) Evaluate Z at each corner point; (3) The largest value is Z_max, the smallest is Z_min.",
          "Multiple Optimal Solutions: If the optimum value of Z occurs at TWO distinct corner points, then every point on the line segment joining those two points is also an optimal solution (infinite solutions).",
        ],
        keyFormula: "Optimal value of Z ALWAYS lies at a Vertex (Corner Point) of Feasible Region",
        examTip: "In MHT-CET, don't draw entire detailed graph! Just quickly solve boundary line intersections to find corner points and calculate Z."
      },
    ],
    quickRevisionPoints: [
      { en: "Feasible region is always in the 1st quadrant due to x ≥ 0, y ≥ 0." },
      { en: "Optimal Z occurs at corner points (vertices) of feasible region." },
      { en: "If optimal value occurs at two vertices, entire segment joining them gives optimal solutions." },
    ],
    keyFormulasTable: [
      { name: "Objective Function", formula: "Z = ax + by", description: "Function to be maximized or minimized in LPP" },
      { name: "Feasible Region Corner Evaluation", formula: "Z(x_i, y_i) = a x_i + b y_i", description: "Evaluation of objective function at corner vertices" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Forgetting non-negativity constraints x ≥ 0, y ≥ 0.",
        correction: "Feasible region must strictly lie in the first quadrant where both x ≥ 0 and y ≥ 0."
      },
    ]
  },

  // 3. Differentiation & Applications of Derivatives (AOD)
  {
    id: "note_math_diff_aod",
    chapter: "Differentiation & Applications of Derivatives",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Chain Rule, Logarithmic Diff, Tangents & Normals, Rate Measure, Maxima & Minima",
    summary: "Master notes covering Chain rule, Parametric differentiation, Derivatives of inverse trigonometric functions, Logarithmic differentiation, Tangents & Normals equations, Rate of change, and Maxima/Minima tests.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Advanced Differentiation Methods & Shortcuts",
        points: [
          "Chain Rule: If y = f(u) and u = g(x), then dy/dx = (dy/du) · (du/dx).",
          "Derivative of Inverse Trig Functions:",
          "d/dx [ sin⁻¹ x ] = 1 / √(1 - x²); d/dx [ cos⁻¹ x ] = - 1 / √(1 - x²).",
          "d/dx [ tan⁻¹ x ] = 1 / (1 + x²); d/dx [ cot⁻¹ x ] = - 1 / (1 + x²).",
          "d/dx [ sec⁻¹ x ] = 1 / [ |x| √(x² - 1) ]; d/dx [ cosec⁻¹ x ] = - 1 / [ |x| √(x² - 1) ].",
          "Logarithmic Differentiation: For y = [ u(x) ]^[ v(x) ]:",
          "dy/dx = [ u(x) ]^[ v(x) ] · [ (v/u) · u' + v' · ln u ].",
          "Parametric Differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt) (provided dx/dt ≠ 0).",
          "Second derivative in parametric form: d²y/dx² = [ d/dt (dy/dx) ] / [ dx/dt ]. (Never just take (d²y/dt²) / (d²x/dt²)! That is a fatal error!).",
          "Shortcut for Implicit Functions f(x, y) = 0: dy/dx = - (∂f/∂x) / (∂f/∂y) (Partial derivative wrt x keeping y constant, divided by partial wrt y keeping x constant).",
        ],
        keyFormula: "dy/dx = - (∂f/∂x)/(∂f/∂y) | d²y/dx²_param = [d/dt(dy/dx)] / (dx/dt)",
        examTip: "For y = √(f(x) + √(f(x) + ... ∞)), shortcut is: dy/dx = f'(x) / (2y - 1)."
      },
      {
        title: "2. Tangents, Normals & Rate Measure",
        points: [
          "Slope of Tangent to curve y = f(x) at point (x₁, y₁): m = (dy/dx)_(x₁, y₁).",
          "Equation of Tangent: y - y₁ = m (x - x₁).",
          "Slope of Normal: m' = - 1 / m = - 1 / (dy/dx)_(x₁, y₁).",
          "Equation of Normal: y - y₁ = (- 1 / m) (x - x₁).",
          "Angle of intersection between two curves with slopes m₁ and m₂: tan θ = | (m₁ - m₂) / (1 + m₁ m₂) |.",
          "Curves cut orthogonally (perpendicularly) if m₁ · m₂ = -1.",
          "Rate Measure: dx/dt is rate of change of x wrt time. Surface area of sphere A = 4πr² => dA/dt = 8πr (dr/dt). Volume of sphere V = (4/3)πr³ => dV/dt = 4πr² (dr/dt).",
        ],
        keyFormula: "m_tan = dy/dx | m_norm = -1/(dy/dx) | Orthogonal: m₁ m₂ = -1 | dV/dt = 4πr² (dr/dt)"
      },
      {
        title: "3. Increasing/Decreasing Functions & Maxima/Minima",
        points: [
          "Strictly Increasing Function on [a, b]: f'(x) > 0 for all x ∈ (a, b).",
          "Strictly Decreasing Function on [a, b]: f'(x) < 0 for all x ∈ (a, b).",
          "Critical Points: Points where f'(x) = 0 or f'(x) does not exist.",
          "Second Derivative Test for Local Maxima & Minima:",
          "Step 1: Solve f'(x) = 0 to find critical point x = c.",
          "Step 2: Find second derivative f''(c):",
          "If f''(c) < 0: f(x) has a LOCAL MAXIMUM at x = c, maximum value is f(c).",
          "If f''(c) > 0: f(x) has a LOCAL MINIMUM at x = c, minimum value is f(c).",
          "If f''(c) = 0: Test is inconclusive; apply First Derivative Test (check sign change of f'(x) across c).",
        ],
        keyFormula: "f'(c) = 0 & f''(c) < 0 => MAXIMA | f'(c) = 0 & f''(c) > 0 => MINIMA"
      },
    ],
    quickRevisionPoints: [
      { en: "Inverse derivatives: d/dx(tan⁻¹ x) = 1/(1+x²); d/dx(sin⁻¹ x) = 1/√(1-x²)." },
      { en: "Slope of tangent m = dy/dx; Slope of normal = -1/m." },
      { en: "Local Maxima: f'(x) = 0 and f''(x) < 0. Local Minima: f'(x) = 0 and f''(x) > 0." },
    ],
    keyFormulasTable: [
      { name: "Logarithmic Derivative", formula: "d/dx [u^v] = u^v · [ (v/u) u' + v' ln u ]", description: "Derivative of function raised to another function" },
      { name: "Tangent Line Equation", formula: "y - y₁ = m (x - x₁)", description: "Equation of tangent to curve with slope m = dy/dx" },
      { name: "Second Derivative Test", formula: "f''(c) < 0 (Max), f''(c) > 0 (Min)", description: "Criteria for local extrema at stationary points" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Computing parametric d²y/dx² as (d²y/dt²) / (d²x/dt²).",
        correction: "d²y/dx² = [ d/dt (dy/dx) ] · (dt/dx) = [ d/dt (dy/dx) ] / (dx/dt). Always divide by dx/dt at the end!"
      },
    ]
  },

  // 4. Indefinite & Definite Integration & Area
  {
    id: "note_math_integration_area",
    chapter: "Indefinite & Definite Integration & Area",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Integration by Parts, King's Property, Definite Integrals & Area under Curves",
    summary: "Massive weightage module! Comprehensive guide to Standard integral forms, LIATE rule, Substitution, 8 Definite Integral properties, King's Rule, and Area bounded by curves with shortcuts.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Indefinite Integration & Key Techniques",
        points: [
          "Standard Integrals:",
          "∫ 1/(x² + a²) dx = (1/a) tan⁻¹(x/a) + C; ∫ 1/√(a² - x²) dx = sin⁻¹(x/a) + C.",
          "∫ 1/(x² - a²) dx = (1/2a) ln | (x - a)/(x + a) | + C; ∫ 1/(a² - x²) dx = (1/2a) ln | (a + x)/(a - x) | + C.",
          "∫ 1/√(x² + a²) dx = ln | x + √(x² + a²) | + C; ∫ 1/√(x² - a²) dx = ln | x + √(x² - a²) | + C.",
          "Integration by Parts (LIATE rule):",
          "∫ u v dx = u ∫ v dx - ∫ [ (du/dx) · (∫ v dx) ] dx.",
          "Order of choosing first function u: L (Logarithmic) > I (Inverse Trig) > A (Algebraic) > T (Trigonometric) > E (Exponential).",
          "Super High-Yield Formula: ∫ e^x [ f(x) + f'(x) ] dx = e^x · f(x) + C.",
          "Generalization: ∫ e^(kx) [ k f(x) + f'(x) ] dx = e^(kx) · f(x) + C.",
        ],
        keyFormula: "∫ u v dx = u ∫ v dx - ∫ [u' ∫ v] dx | ∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C",
        examTip: "Whenever e^x is multiplied by a sum of functions in integrand, always check if one is the derivative of the other: ∫ e^x [tan x + sec² x] dx = e^x tan x + C."
      },
      {
        title: "2. Definite Integrals: King's Property & Symmetry",
        points: [
          "Property 1 (Variable change): ∫_a^b f(x) dx = ∫_a^b f(t) dt.",
          "Property 2 (Interchange of limits): ∫_a^b f(x) dx = - ∫_b^a f(x) dx.",
          "Property 3 (Splitting intervals): ∫_a^b f(x) dx = ∫_a^c f(x) dx + ∫_c^b f(x) dx.",
          "Property 4 (THE KING'S PROPERTY): ∫_0^a f(x) dx = ∫_0^a f(a - x) dx.",
          "Generalized King's Property: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.",
          "Instant result: If f(a + b - x) = f(x), then ∫_a^b [ f(x) / (f(x) + f(a + b - x)) ] dx = (b - a) / 2.",
          "Example: ∫_0^(π/2) [ √sin x / (√sin x + √cos x) ] dx = (π/2 - 0) / 2 = π/4.",
          "Property 5 (Even and Odd functions):",
          "For ∫_{-a}^a f(x) dx: (1) If f(-x) = -f(x) (ODD function), the integral is identically 0.",
          "(2) If f(-x) = f(x) (EVEN function), the integral equals 2 ∫_0^a f(x) dx.",
          "Property 6 (Half-period duplication): ∫_0^{2a} f(x) dx = 2 ∫_0^a f(x) dx if f(2a - x) = f(x); and = 0 if f(2a - x) = -f(x).",
        ],
        keyFormula: "∫_0^a f(x) dx = ∫_0^a f(a - x) dx | ∫_{-a}^a f_odd dx = 0 | Standard King's Result = (b - a) / 2"
      },
      {
        title: "3. Area Bounded by Curves (Quadrature)",
        points: [
          "Area under curve y = f(x) between x = a and x = b: Area A = ∫_a^b |y| dx = ∫_a^b |f(x)| dx.",
          "Area between curve x = g(y) and y-axis from y = c to y = d: Area A = ∫_c^d |x| dy.",
          "Area bounded between two curves y₁ = f(x) and y₂ = g(x) from x = a to x = b: Area A = ∫_a^b | f(x) - g(x) | dx.",
          "Super Shortcuts for MHT-CET & JEE:",
          "Shortcut 1: Area between parabolas y² = 4ax and x² = 4by is Area = (16 a b) / 3.",
          "Shortcut 2: Area between parabola y² = 4ax and line y = mx is Area = 8 a² / (3 m³).",
          "Shortcut 3: Area of ellipse x²/a² + y²/b² = 1 is Area = π a b. (For circle x² + y² = r², Area = π r²).",
        ],
        keyFormula: "Area = ∫ |y₁ - y₂| dx | Parabolas y²=4ax & x²=4by: Area = 16ab / 3 | Ellipse: Area = πab"
      },
    ],
    quickRevisionPoints: [
      { en: "LIATE rule governs integration by parts: ∫ u v dx = u ∫ v - ∫ (u' ∫ v)." },
      { en: "∫ e^x [f(x) + f'(x)] dx = e^x f(x) + C. Essential MHT-CET shortcut." },
      { en: "King's property: ∫_0^a f(x) = ∫_0^a f(a-x). Standard symmetry gives (b-a)/2." },
      { en: "Parabolas area shortcut: y²=4ax and x²=4by gives 16ab/3." },
    ],
    keyFormulasTable: [
      { name: "Integration by Parts", formula: "∫ u v dx = u ∫ v dx - ∫ [ u' ∫ v dx ] dx", description: "Product rule for integration using LIATE priority" },
      { name: "King's Property", formula: "∫_0^a f(x) dx = ∫_0^a f(a - x) dx", description: "Definite integral reflection property over interval" },
      { name: "Parabolic Area Shortcut", formula: "Area = (16 a b) / 3", description: "Area bounded between standard intersecting parabolas y²=4ax and x²=4by" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Integrating odd functions over symmetric limits without checking symmetry.",
        correction: "If f(-x) = -f(x), then ∫_{-a}^a f(x) dx is 0 by inspection, saving minutes of calculation time!"
      },
    ]
  },

  // 5. Pair of Straight Lines
  {
    id: "note_math_pair_of_lines",
    chapter: "Pair of Straight Lines",
    subject: "Mathematics",
    exams: ["MHT_CET", "JEE_MAIN"],
    title: "Homogeneous Equation, Acute Angle, Perpendicular Condition & General 2nd Degree",
    summary: "Complete guide covering Joint equation of lines, Homogeneous equation ax² + 2hxy + by² = 0, Sum & Product of slopes, Angle between lines, Perpendicular/Coincident conditions, and General 2nd degree Δ condition.",
    highYieldWeightage: "High",
    sections: [
      {
        title: "1. Homogeneous Equation of Second Degree Passing Through Origin",
        points: [
          "Homogeneous equation of degree 2 in x and y: ax² + 2hxy + by² = 0 represents a pair of straight lines passing through the origin (0, 0).",
          "Auxiliary Equation: Putting y = mx gives: b m² + 2h m + a = 0.",
          "If m₁ and m₂ are the slopes of the two lines:",
          "Sum of slopes: m₁ + m₂ = - 2h / b.",
          "Product of slopes: m₁ · m₂ = a / b.",
          "Difference of slopes: |m₁ - m₂| = √[ (m₁ + m₂)² - 4m₁m₂ ] = 2 √(h² - ab) / |b|.",
          "Nature of lines:",
          "(1) If h² - ab > 0: Lines are REAL and DISTINCT.",
          "(2) If h² - ab = 0: Lines are COINCIDENT (identical/same line).",
          "(3) If h² - ab < 0: Lines are IMAGINARY (intersect only at origin).",
        ],
        keyFormula: "ax² + 2hxy + by² = 0 | m₁ + m₂ = -2h/b | m₁m₂ = a/b | Coincident: h² - ab = 0"
      },
      {
        title: "2. Angle Between Lines & Special Conditions",
        points: [
          "Acute Angle (θ) between pair of lines ax² + 2hxy + by² = 0:",
          "tan θ = | [ 2 √(h² - ab) ] / (a + b) |.",
          "Condition for Lines to be PERPENDICULAR (Orthogonal):",
          "θ = 90° => cot θ = 0 => a + b = 0.",
          "Coefficient of x² + Coefficient of y² = 0.",
          "Condition for Lines to be COINCIDENT (Parallel):",
          "θ = 0° => tan θ = 0 => h² - ab = 0 => h² = a b.",
          "Combined Equation of Angle Bisectors of ax² + 2hxy + by² = 0:",
          "(x² - y²) / (a - b) = xy / h.",
        ],
        keyFormula: "tan θ = | 2√(h² - ab)/(a + b) | | Perpendicular: a + b = 0 | Coincident: h² = ab",
        examTip: "If a question asks: 'For what value of k are the lines kx² + 4xy - 3y² = 0 perpendicular?', directly use a + b = 0 => k + (-3) = 0 => k = 3! Done in 2 seconds."
      },
      {
        title: "3. General Second Degree Equation",
        points: [
          "General second degree equation in x and y: ax² + 2hxy + by² + 2gx + 2fy + c = 0 represents a pair of straight lines if and only if the determinant Δ = 0:",
          "Δ = abc + 2fgh - af² - bg² - ch² = 0.",
          "Point of intersection of the two lines: P(x, y) = [ (hf - bg)/(ab - h²), (gh - af)/(ab - h²) ].",
          "Angle between lines given by general equation is STILL tan θ = | [ 2 √(h² - ab) ] / (a + b) | (independent of g, f, c).",
          "Lines are parallel if h² - ab = 0 and bg² = af².",
          "Distance between parallel lines: d = 2 √[ (g² - ac) / (a(a + b)) ] = 2 √[ (f² - bc) / (b(a + b)) ].",
        ],
        keyFormula: "Δ = abc + 2fgh - af² - bg² - ch² = 0 | Parallel distance d = 2 √[(g² - ac)/(a(a+b))]"
      },
    ],
    quickRevisionPoints: [
      { en: "Homogeneous 2nd degree: Sum m₁+m₂ = -2h/b; Product m₁m₂ = a/b." },
      { en: "Perpendicular condition: a + b = 0. Coincident condition: h² = ab." },
      { en: "Angle formula: tan θ = | 2√(h² - ab) / (a + b) |." },
    ],
    keyFormulasTable: [
      { name: "Acute Angle Formula", formula: "tan θ = | 2 √(h² - ab) / (a + b) |", description: "Angle between pair of lines represented by second degree equation" },
      { name: "Perpendicular Lines Condition", formula: "a + b = 0", description: "Lines are mutually perpendicular when sum of coefficients of x² and y² is zero" },
      { name: "Determinant Condition", formula: "Δ = abc + 2fgh - af² - bg² - ch² = 0", description: "Condition for general 2nd degree equation to represent straight lines" },
    ],
    commonMistakesToAvoid: [
      {
        mistake: "Mixing up 'h' with the coefficient of xy.",
        correction: "In equation ax² + 2hxy + by² = 0, coefficient of xy is 2h, so h = (coefficient of xy) / 2."
      },
    ]
  },
];
