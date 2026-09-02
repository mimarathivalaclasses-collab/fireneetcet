import React, { useState, useMemo, useEffect } from "react";
import {
  Check,
  Copy,
  Search,
  Filter,
  Flame,
  Award,
  Sparkles,
  Zap,
  Bookmark,
  CheckCircle2,
  ListOrdered,
  Layers,
  FileText
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
  const [selectedRange, setSelectedRange] = useState<"all" | "1-25" | "26-50" | "51-75" | "76-100">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copied, setCopied] = useState(false);

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
  const isEn = language === "en";
  const isBilingual = language === "bilingual";

  // Filtered points
  const filteredPoints = useMemo(() => {
    return points.filter((p) => {
      // Range filter
      if (selectedRange === "1-25" && (p.id < 1 || p.id > 25)) return false;
      if (selectedRange === "26-50" && (p.id < 26 || p.id > 50)) return false;
      if (selectedRange === "51-75" && (p.id < 51 || p.id > 75)) return false;
      if (selectedRange === "76-100" && (p.id < 76 || p.id > 100)) return false;

      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchEn = p.point.toLowerCase().includes(q);
        const matchMr = p.pointMr.toLowerCase().includes(q);
        const matchFormula = p.formula?.toLowerCase().includes(q) || false;
        const matchId = p.id.toString() === q || `#${p.id}` === q;
        if (!matchEn && !matchMr && !matchFormula && !matchId) return false;
      }

      return true;
    });
  }, [points, selectedRange, selectedCategory, searchQuery]);

  const progressPercent = Math.round((masteredIds.size / (points.length || 100)) * 100);

  const handleCopyAll = () => {
    const text = points
      .map((p) => `${p.id}. ${p.pointMr} (${p.point})${p.formula ? ` [सूत्र: ${p.formula}]` : ""}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 bg-purple-50/40 border-2 border-purple-200/80 rounded-2xl p-4 sm:p-5">
      {/* Header of 100 points block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>१०० महत्त्वाचे पॉईंट्स (100 High-Yield Points)</span>
            </span>
            <span className="text-xs font-bold text-purple-950">
              {points.length} पॉईंट्स उपलब्ध
            </span>
          </div>
          <p className="text-xs text-purple-800/80 mt-1">
            या चॅप्टरमधील सर्व १०० अत्यंत महत्त्वाचे नियम, व्याख्या, सूत्रे, शॉर्टकट्स व वारंवार विचारले जाणारे प्रश्न.
          </p>
        </div>

        {/* Copy All Action */}
        <button
          onClick={handleCopyAll}
          className="px-3 py-1.5 rounded-xl bg-white border border-purple-300 text-purple-900 hover:bg-purple-100 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-2xs"
          title="सर्व १०० पॉईंट्स क्लिपबोर्डवर कॉपी करा"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">कॉपी झाले!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-purple-600" />
              <span>सर्व १०० पॉईंट्स कॉपी करा</span>
            </>
          )}
        </button>
      </div>

      {/* Mastery Progress Tracker */}
      <div className="bg-white rounded-xl p-3.5 border border-purple-200/80 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>तुमची तयारी (Points Mastered Tracker):</span>
            <strong className="text-purple-700 font-black">{masteredIds.size} / {points.length} पूर्ण</strong>
          </span>
          <span className="font-black text-purple-800 font-mono-numbers">{progressPercent}%</span>
        </div>

        <div className="w-full bg-purple-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Filter & Range Bar */}
      <div className="space-y-2.5 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          {/* Point Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="पॉईंट्समध्ये शोधा (उदा. Formula, Torque, MI, #45)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>

          {/* Range filter buttons */}
          <div className="sm:col-span-6 flex flex-wrap items-center gap-1">
            {(
              [
                { id: "all", label: "सर्व 100" },
                { id: "1-25", label: "1-25" },
                { id: "26-50", label: "26-50" },
                { id: "51-75", label: "51-75" },
                { id: "76-100", label: "76-100" },
              ] as const
            ).map((rng) => (
              <button
                key={rng.id}
                onClick={() => setSelectedRange(rng.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedRange === rng.id
                    ? "bg-purple-700 text-white shadow-xs"
                    : "bg-white text-purple-900 border border-purple-200 hover:bg-purple-100"
                }`}
              >
                {rng.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            { id: "all", label: "सर्व प्रकार (All)" },
            { id: "Formula", label: "⚡ सूत्रे (Formulas)" },
            { id: "Concept", label: "💡 संकल्पना (Concepts)" },
            { id: "Rule", label: "📜 नियम (Rules)" },
            { id: "Shortcut", label: "🎯 शॉर्टकट्स (Shortcuts)" },
            { id: "PYQ_Trend", label: "🔥 CET/NEET PYQs" },
            { id: "Definition", label: "📖 व्याख्या (Definitions)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "bg-white/80 text-slate-700 border border-purple-100 hover:bg-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Points Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[600px] overflow-y-auto pr-1">
        {filteredPoints.length === 0 ? (
          <div className="col-span-full py-8 text-center bg-white rounded-xl border border-purple-200 p-4">
            <p className="text-xs text-slate-500 font-bold">दिलेल्या फिल्टरनुसार एकही पॉईंट सापडला नाही.</p>
          </div>
        ) : (
          filteredPoints.map((pt) => {
            const isMastered = masteredIds.has(pt.id);
            return (
              <div
                key={pt.id}
                onClick={() => toggleMastered(pt.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 relative ${
                  isMastered
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs"
                    : "bg-white border-purple-200 hover:border-purple-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10.5px] font-black font-mono-numbers ${
                        isMastered
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-purple-100 text-purple-900"
                      }`}
                    >
                      #{pt.id}
                    </span>
                    {pt.category && (
                      <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 text-[9.5px] font-extrabold uppercase">
                        {pt.category}
                      </span>
                    )}
                  </div>

                  {/* Checkbox button */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isMastered
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isMastered && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Point Marathi Text */}
                {(isBilingual || isMr) && (
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    {pt.pointMr}
                  </div>
                )}

                {/* Point English Text */}
                {(isBilingual || isEn) && pt.point !== pt.pointMr && (
                  <div
                    className={`text-[11px] leading-snug ${
                      isBilingual ? "text-slate-600 italic" : "font-bold text-slate-900"
                    }`}
                  >
                    {pt.point}
                  </div>
                )}

                {/* Formula Highlight */}
                {pt.formula && (
                  <div className="pt-0.5 flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-200/60">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{pt.formula}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Batch Actions Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-200 text-xs">
        <span className="text-purple-900 font-semibold">
          दाखवलेले पॉईंट्स: <strong>{filteredPoints.length}</strong> / {points.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAllRangeMastered(filteredPoints)}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 px-2 py-1 rounded-md hover:bg-purple-100 cursor-pointer"
          >
            सर्व Mastered करा
          </button>
          <span className="text-purple-300">•</span>
          <button
            onClick={() => clearRangeMastered(filteredPoints)}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100 cursor-pointer"
          >
            Reset करा
          </button>
        </div>
      </div>
    </div>
  );
};
