import { ChapterPointItem } from "../../types";

export const getMaths100Points = (noteId: string, chapter: string): ChapterPointItem[] => {
  const points: ChapterPointItem[] = [];
  const chapKey = chapter.toLowerCase();

  for (let i = 1; i <= 100; i++) {
    let cat: ChapterPointItem["category"] = "Concept";
    if (i % 5 === 0) cat = "Formula";
    else if (i % 4 === 0) cat = "PYQ_Trend";
    else if (i % 3 === 0) cat = "Shortcut";
    else if (i % 7 === 0) cat = "Exception";
    else if (i <= 10) cat = "Definition";

    let en = `Mathematics Point #${i} for ${chapter}: Core formula, standard theorem, graphical property, and shortcut method for MHT-CET & JEE.`;
    let formula: string | undefined = undefined;

    if (chapKey.includes("calculus") || chapKey.includes("differentiation") || chapKey.includes("derivative")) {
      if (i === 1) { en = "Standard Derivative: d/dx (x^n) = n x^(n-1). d/dx (e^x) = e^x, d/dx (a^x) = a^x ln a."; formula = "d/dx(xⁿ) = n xⁿ⁻¹"; }
      else if (i === 2) { en = "Product Rule: d/dx [u · v] = u (dv/dx) + v (du/dx). Quotient Rule: d/dx [u / v] = [ v (du/dx) - u (dv/dx) ] / v²."; formula = "(u/v)' = (vu' - uv')/v²"; }
      else if (i === 3) { en = "Chain Rule: If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x)."; formula = "dy/dx = (dy/du) · (du/dx)"; }
      else if (i === 4) { en = "Logarithmic Differentiation: Used for y = [f(x)]^[g(x)] => dy/dx = y [ g'(x) ln f(x) + g(x) f'(x) / f(x) ]."; }
      else if (i === 5) { en = "Parametric Differentiation: If x = f(t) and y = g(t), then dy/dx = (dy/dt) / (dx/dt), and d²y/dx² = [ d/dt (dy/dx) ] / (dx/dt)."; d²y/dx² काढताना छेदामध्ये dx/dt ने भागणे विसरू नका."; formula = "dy/dx = (dy/dt)/(dx/dt)"; }
      else if (i === 6) { en = "Equation of Tangent to y = f(x) at (x₁, y₁): y - y₁ = m (x - x₁), where m = [dy/dx]_{(x₁, y₁)}."; formula = "y - y₁ = m(x - x₁)"; }
      else if (i === 7) { en = "Equation of Normal at (x₁, y₁): y - y₁ = (-1/m) (x - x₁). (m_tangent · m_normal = -1)."; formula = "m_T · m_N = -1"; }
      else if (i === 8) { en = "Rolle's Theorem: If f(x) is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then there exists at least one c ∈ (a, b) such that f'(c) = 0."; formula = "f'(c) = 0"; }
      else if (i === 9) { en = "Lagrange's Mean Value Theorem (LMVT): If continuous on [a, b] & differentiable on (a, b), then f'(c) = [ f(b) - f(a) ] / (b - a)."; formula = "f'(c) = [f(b) - f(a)]/(b - a)"; }
      else if (i === 10) { en = "Maxima and Minima: At local extremum, f'(x) = 0. If f''(x) < 0 => Local Maximum; If f''(x) > 0 => Local Minimum.", f''(x) > ० असल्यास Local Minimum.", formula = "f'(x) = 0; f''(x) sign test" }
      else {
        en = `Calculus Point #${i}: Integration standard forms ∫ (1 / √(a² - x²)) dx = sin⁻¹(x/a), Integration by parts ∫ u v dx = u ∫ v dx - ∫ [ u' (∫ v dx) ] dx, and definite integral King's property ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx.`;
      }
    } else if (chapKey.includes("vector") || chapKey.includes("3d")) {
      if (i === 1) { en = "Dot Product: a · b = |a| |b| cos θ = a_x b_x + a_y b_y + a_z b_z. If a ⊥ b, then a · b = 0."; formula = "a · b = |a||b|cos θ"; }
      else if (i === 2) { en = "Cross Product: a × b = |a| |b| sin θ n̂. If a ∥ b, then a × b = 0. |a × b| gives area of parallelogram."; formula = "a × b = |a||b|sin θ n̂"; }
      else if (i === 3) { en = "Scalar Triple Product (Box Product): [a b c] = a · (b × c). Represents Volume of Parallelepiped. If vectors are coplanar, [a b c] = 0."; formula = "[a b c] = det([a; b; c])"; }
      else if (i === 4) { en = "Direction Cosines (l, m, n): l = cos α, m = cos β, n = cos γ. Identity: l² + m² + n² = 1 (and sin² α + sin² β + sin² γ = 2)."; formula = "l² + m² + n² = 1"; }
      else if (i === 5) { en = "Equation of a Line in 3D: Vector: r = a + λ b; Cartesian: (x - x₁) / a = (y - y₁) / b = (z - z₁) / c."; कार्टेशियन रूप: (x - x₁)/a = (y - y₁)/b = (z - z₁)/c."; formula = "(x-x₁)/a = (y-y₁)/b = (z-z₁)/c"; }
      else if (i === 6) { en = "Shortest Distance between skew lines: d = | (a₂ - a₁) · (b₁ × b₂) | / |b₁ × b₂|."; formula = "d = |(a₂-a₁)·(b₁×b₂)| / |b₁×b₂|"; }
      else if (i === 7) { en = "Equation of Plane: Vector: r · n = d or r · n̂ = p; Cartesian: a x + b y + c z + d = 0 (where a, b, c are direction ratios of normal)."; formula = "ax + by + cz + d = 0"; }
      else {
        en = `Vectors & 3D Point #${i}: Angle between line and plane sin θ = |a a₁ + b b₁ + c c₁| / [√(a²+b²+c²) √(a₁²+b₁²+c₁²)], distance of point from plane d = |a x₀ + b y₀ + c z₀ + d| / √(a²+b²+c²).`;
      }
    } else if (chapKey.includes("matrix") || chapKey.includes("determinant")) {
      if (i === 1) { en = "Properties of Determinants: |A^T| = |A|. |A B| = |A| |B|. |k A| = k^n |A| for n × n matrix."; formula = "|kA| = kⁿ |A|"; }
      else if (i === 2) { en = "Inverse of a Matrix: A⁻¹ = (1 / |A|) adj(A). Exists if and only if |A| ≠ 0 (Non-singular matrix)."; formula = "A⁻¹ = adj(A)/|A|"; }
      else if (i === 3) { en = "Adjoint Properties: A · adj(A) = adj(A) · A = |A| I. |adj(A)| = |A|^(n-1). |adj(adj(A))| = |A|^((n-1)²)."; formula = "|adj(A)| = |A|ⁿ⁻¹"; }
      else if (i === 4) { en = "Orthogonal Matrix: A · A^T = I => A⁻¹ = A^T and |A| = ±1."; formula = "A · A^T = I"; }
      else if (i === 5) { en = "Symmetric Matrix (A^T = A) and Skew-Symmetric Matrix (A^T = -A). Diagonal elements of skew-symmetric matrix are always 0."; }
      else {
        en = `Matrices Point #${i}: Cramer's Rule for system of linear equations (x = D_x / D, y = D_y / D, z = D_z / D), consistency conditions (Unique solution if D ≠ 0; Infinite solutions if D=D_x=D_y=D_z=0).`;
      }
    } else {
      en = `${chapter} Mathematics Exam Point #${i}: Key formula derivation, trigonometric transformation identity, coordinate geometry conic section property, or probability rule.`;
    }

    points.push({
      id: i,
      point: en,
      category: cat,
      formula: formula,
      badge: i <= 25 ? "Core Formulas" : i <= 50 ? "Theorems & Rules" : i <= 75 ? "Concepts & Shortcuts" : "JEE/CET Trends"
    });
  }

  return points;
};
