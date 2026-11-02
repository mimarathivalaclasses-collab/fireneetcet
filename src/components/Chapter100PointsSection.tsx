import React, { useState, useMemo } from "react";
import {
  Check,
  Copy,
  Search,
  Sparkles,
  Zap,
  Award,
  Layers,
  CheckCircle2,
  BookmarkCheck,
  RotateCcw,
} from "lucide-react";
import { ChapterPointItem, LanguageMode } from "../types";

interface Chapter100PointsSectionProps {
  noteId: string;
  chapterTitle: string;
  chapterTitleMr: string;
  subject: string;
  points: ChapterPointItem[];
  language: LanguageMode;
}

export const Chapter100PointsSection: React.FC<Chapter100PointsSectionProps> = ({
  noteId,
  chapterTitle,
  chapterTitleMr,
  subject,
  points,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState<"all" | "1-50" | "51-100" | "101-150" | "151-200">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedPointId, setCopiedPointId] = useState<number | null>(null);

  // Mastered points tracker in localStorage
  const storageKey = `mastered_points_${noteId}`;
  const [masteredIds, setMasteredIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    return new Set();
  });

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  const markAllRangeMastered = (rangePoints: ChapterPointItem[]) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      rangePoints.forEach((p) => next.add(p.id));
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  const clearRangeMastered = (rangePoints: ChapterPointItem[]) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      rangePoints.forEach((p) => next.delete(p.id));
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  const isMr = language === "mr";
  const isEn = language === "en" || !language;
  const isBilingual = language === "bilingual";

  // Filtered points
  const filteredPoints = useMemo(() => {
    return points.filter((p) => {
      // 200 Points Range filter
      if (selectedRange === "1-50" && (p.id < 1 || p.id > 50)) return false;
      if (selectedRange === "51-100" && (p.id < 51 || p.id > 100)) return false;
      if (selectedRange === "101-150" && (p.id < 101 || p.id > 150)) return false;
      if (selectedRange === "151-200" && (p.id < 151 || p.id > 200)) return false;

      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchEn = p.point.toLowerCase().includes(q);
        const matchMr = p.pointMr?.toLowerCase().includes(q) || false;
        const matchFormula = p.formula?.toLowerCase().includes(q) || false;
        const matchId = p.id.toString() === q || `#${p.id}` === q;
        if (!matchEn && !matchMr && !matchFormula && !matchId) return false;
      }

      return true;
    });
  }, [points, selectedRange, selectedCategory, searchQuery]);

  const totalPoints = points.length || 200;
  const progressPercent = Math.min(100, Math.round((masteredIds.size / totalPoints) * 100));

  const handleCopyAll = () => {
    const text = points
      .map((p) => `${p.id}. ${p.point}${p.formula ? `\n   [Formula: ${p.formula}]` : ""}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyPoint = (p: ChapterPointItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${p.id}. ${p.point}${p.formula ? `\nFormula: ${p.formula}` : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedPointId(p.id);
    setTimeout(() => setCopiedPointId(null), 1800);
  };

  return (
    <div className="space-y-4 bg-slate-50/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
      {/* Header of 200 Points Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
              {chapterTitle} : 200 High-Yield Exam Revision Points
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Every point covers verified formulas, shortcuts, conceptual rules, and MHT-CET / NEET / JEE PYQ question trends.
          </p>
        </div>

        {/* Action: Copy All */}
        <button
          onClick={handleCopyAll}
          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-xs active:scale-95"
          title="Copy all points to clipboard"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-bold">All Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy All {points.length} Points</span>
            </>
          )}
        </button>
      </div>

      {/* Progress & Stats Bar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-xl p-3 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-xs">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Revision Progress:
            </span>
            <span className="font-mono text-xs font-black text-orange-600 dark:text-orange-400">
              {masteredIds.size} / {totalPoints} Mastered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
              {progressPercent}%
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters: Search & Range Selector */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          {/* Search Field */}
          <div className="sm:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search points (e.g. Formula, Torque, MI, #15)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>

          {/* Range Buttons (200-point structure) */}
          <div className="sm:col-span-7 flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedRange("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedRange === "all"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              All ({points.length})
            </button>
            <button
              onClick={() => setSelectedRange("1-50")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedRange === "1-50"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              1 - 50: Foundations
            </button>
            <button
              onClick={() => setSelectedRange("51-100")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedRange === "51-100"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              51 - 100: Formulas
            </button>
            <button
              onClick={() => setSelectedRange("101-150")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedRange === "101-150"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              101 - 150: Shortcuts
            </button>
            <button
              onClick={() => setSelectedRange("151-200")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedRange === "151-200"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              151 - 200: PYQ Trends
            </button>
          </div>
        </div>

        {/* Category Filters (Clean Segmented) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            { id: "all", label: "All Types" },
            { id: "Formula", label: "⚡ Formulas" },
            { id: "Concept", label: "💡 Concepts" },
            { id: "Shortcut", label: "🎯 Shortcuts" },
            { id: "Rule", label: "📜 Laws & Rules" },
            { id: "PYQ_Trend", label: "🔥 CET/NEET/JEE Trends" },
            { id: "Definition", label: "📖 Definitions" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                  : "bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Points Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[640px] overflow-y-auto pr-1">
        {filteredPoints.length === 0 ? (
          <div className="col-span-full py-10 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 font-bold">No points found matching the selected filter.</p>
          </div>
        ) : (
          filteredPoints.map((pt) => {
            const isMastered = masteredIds.has(pt.id);
            const isPointCopied = copiedPointId === pt.id;

            return (
              <div
                key={pt.id}
                onClick={() => toggleMastered(pt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-2 relative group ${
                  isMastered
                    ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 shadow-2xs"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-xs"
                }`}
              >
                {/* Meta line: Clean unboxed typography */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    <span className="text-orange-600 dark:text-orange-400 font-black">
                      #{pt.id.toString().padStart(2, "0")}
                    </span>
                    {pt.category && (
                      <>
                        <span>·</span>
                        <span className="uppercase text-[10px] tracking-wide text-slate-600 dark:text-slate-300">
                          {pt.category}
                        </span>
                      </>
                    )}
                    {pt.badge && (
                      <>
                        <span>·</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {pt.badge}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions: Copy & Mastered Checkbox */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleCopyPoint(pt, e)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
                      title="Copy this point"
                    >
                      {isPointCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isMastered
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                      }`}
                      title={isMastered ? "Mastered" : "Mark as Mastered"}
                    >
                      {isMastered && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Point English Text (Primary) */}
                <div className="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {pt.point}
                </div>

                {/* Point Marathi Text (Only in bilingual or mr mode) */}
                {(isBilingual || isMr) && pt.pointMr && pt.pointMr !== pt.point && (
                  <div className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
                    {pt.pointMr}
                  </div>
                )}

                {/* Formula Highlight */}
                {pt.formula && (
                  <div className="pt-1">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 dark:text-blue-200 bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border-l-2 border-blue-600 dark:border-blue-400">
                      <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="tracking-tight">{pt.formula}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Summary & Batch Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          Showing: <strong className="text-slate-900 dark:text-white font-bold">{filteredPoints.length}</strong> / {points.length} high-yield points
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAllRangeMastered(filteredPoints)}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 px-2 py-1 rounded hover:bg-orange-50 dark:hover:bg-slate-800 cursor-pointer transition-all"
          >
            Mark All Mastered
          </button>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <button
            onClick={() => clearRangeMastered(filteredPoints)}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
