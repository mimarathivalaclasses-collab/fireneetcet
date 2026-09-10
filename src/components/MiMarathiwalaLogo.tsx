import React, { useState } from "react";

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
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    xs: { px: 28, rounded: "rounded-lg", textSize: "text-xs", subSize: "text-[9px]" },
    sm: { px: 36, rounded: "rounded-xl", textSize: "text-sm", subSize: "text-[10px]" },
    md: { px: 44, rounded: "rounded-xl", textSize: "text-base", subSize: "text-[11px]" },
    lg: { px: 52, rounded: "rounded-2xl", textSize: "text-lg", subSize: "text-xs" },
    xl: { px: 64, rounded: "rounded-2xl", textSize: "text-xl", subSize: "text-xs" },
    "2xl": { px: 80, rounded: "rounded-3xl", textSize: "text-2xl", subSize: "text-sm" },
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* NCJ Brand Logo Badge */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${current.rounded} shadow-md overflow-hidden ring-2 ring-amber-400/80 bg-slate-950 transition-transform duration-200 group-hover:scale-105`}
        style={{
          width: `${current.px}px`,
          height: `${current.px}px`,
        }}
      >
        {!imgError ? (
          <img
            src="/ncj-logo.png"
            alt="NCJ MOCK TEST APP Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex flex-col items-center justify-center text-white">
            <span className="font-black text-xs tracking-wider leading-none">NCJ</span>
            <span className="text-[7px] font-bold text-amber-200 tracking-tight leading-none mt-0.5">MOCK</span>
          </div>
        )}
      </div>

      {/* Side Branding Text */}
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
              NCJ MOCK TEST APP
            </span>
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 shrink-0 border border-orange-200/80 dark:border-orange-800/80">
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
            मी मराठीवाला क्लासेस • MHT-CET | NEET | JEE
          </p>
        </div>
      )}
    </div>
  );
};
