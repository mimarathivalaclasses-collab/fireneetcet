import React from "react";

interface MiMarathiwalaLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  showText?: boolean;
  textColor?: "dark" | "light" | "auto";
  className?: string;
}

export const MiMarathiwalaLogo: React.FC<MiMarathiwalaLogoProps> = ({
  size = "md",
  showText = false,
  textColor = "auto",
  className = "",
}) => {
  const sizeMap = {
    xs: { px: 26, iconSize: 16, textSize: "text-xs", subSize: "text-[9px]" },
    sm: { px: 32, iconSize: 20, textSize: "text-sm", subSize: "text-[10px]" },
    md: { px: 40, iconSize: 24, textSize: "text-base", subSize: "text-[11px]" },
    lg: { px: 48, iconSize: 30, textSize: "text-lg", subSize: "text-xs" },
    xl: { px: 56, iconSize: 36, textSize: "text-xl", subSize: "text-xs" },
    "2xl": { px: 72, iconSize: 48, textSize: "text-2xl", subSize: "text-sm" },
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Saffron Bhagva Royal Badge / Logo Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform duration-200 group-hover:scale-105"
        style={{
          width: `${current.px}px`,
          height: `${current.px}px`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Bhagva Saffron Gradients */}
            <linearGradient id="bhagvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="45%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <radialGradient id="sunGlow" cx="50%" cy="35%" r="45%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>

            <filter id="bhagvaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#7c2d12" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Saffron Shield Base */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#bhagvaGrad)"
            stroke="url(#goldRing)"
            strokeWidth="3.5"
          />

          {/* Inner Glow Circle */}
          <circle cx="50" cy="50" r="38" fill="url(#sunGlow)" />

          {/* Saffron Sun Rays / Mashal Flame Top Accent */}
          <g transform="translate(50, 22)">
            {/* Sun Rays */}
            <path
              d="M0,-12 L2,-6 L0,-4 L-2,-6 Z"
              fill="#fef08a"
              opacity="0.9"
            />
            <path
              d="M-8,-10 L-4,-5 L-6,-4 Z"
              fill="#fde047"
              opacity="0.8"
            />
            <path
              d="M8,-10 L6,-4 L4,-5 Z"
              fill="#fde047"
              opacity="0.8"
            />
            {/* Torch Flame Center */}
            <path
              d="M0,-8 Q5,-1 3,6 Q0,10 -3,6 Q-5,-1 0,-8 Z"
              fill="#fef08a"
            />
          </g>

          {/* Iconic Devanagari Calligraphy 'म' (मी मराठीवाला) */}
          <g filter="url(#bhagvaShadow)">
            <text
              x="50"
              y="68"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              fontSize="48"
              letterSpacing="-1"
            >
              म
            </text>
          </g>

          {/* Golden Subtext 'MMC' */}
          <text
            x="50"
            y="87"
            textAnchor="middle"
            fill="#fef08a"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="10"
            letterSpacing="2"
          >
            MMC
          </text>
        </svg>
      </div>

      {/* Optional Side Branding Text */}
      {showText && (
        <div className="min-w-0 flex flex-col justify-center text-left">
          <div className="flex items-center gap-1.5 leading-tight">
            <span
              className={`font-black tracking-tight truncate ${
                textColor === "light"
                  ? "text-white"
                  : textColor === "dark"
                  ? "text-slate-900"
                  : "text-slate-900 dark:text-white"
              } ${current.textSize}`}
            >
              मी मराठीवाला क्लासेस
            </span>
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 shrink-0 border border-orange-200/60 dark:border-orange-800/60">
              अंबड
            </span>
          </div>
          <p
            className={`font-bold tracking-tight truncate mt-0.5 ${
              textColor === "light"
                ? "text-amber-200"
                : textColor === "dark"
                ? "text-orange-700"
                : "text-orange-600 dark:text-amber-400"
            } ${current.subSize}`}
          >
            Mi Marathiwala Classes • MHT-CET | NEET | JEE सराव
          </p>
        </div>
      )}
    </div>
  );
};
