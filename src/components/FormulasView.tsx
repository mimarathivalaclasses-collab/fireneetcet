import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  BookOpen,
  Copy,
  Check,
  Lightbulb,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { SubjectType, ExamType } from "../types";
import { FORMULA_CARDS } from "../data/formulasData";

interface FormulasViewProps {
  currentExam: ExamType;
  onBack?: () => void;
}

export const FormulasView: React.FC<FormulasViewProps> = ({ currentExam, onBack }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = useMemo(() => {
    return FORMULA_CARDS.filter((f) => {
      if (selectedSubject !== "All" && f.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = f.title.toLowerCase().includes(q) || f.titleMr.toLowerCase().includes(q);
        const matchChap = f.chapter.toLowerCase().includes(q);
        const matchFormula = f.formula.toLowerCase().includes(q);
        if (!matchTitle && !matchChap && !matchFormula) return false;
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

  const handleCopy = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 mr-1"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
                <span>← मागे जा</span>
              </button>
            )}
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              महत्त्वाचे सूत्रे व नियम (Formulas & Cheat-Sheets)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            NEET, JEE आणि MHT-CET साठी आवश्यक हाय-यील्ड भौतिकशास्त्र, रसायनशास्त्र व गणिताची सूत्रे.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs text-xs">
        {/* Subject Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-500 mr-1">विषय:</span>
          {(["All", "Physics", "Chemistry", "Mathematics"] as (SubjectType | "All")[]).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubject === sub
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {sub === "All"
                ? "सर्व (All)"
                : sub === "Physics"
                ? "भौतिकशास्त्र (Physics)"
                : sub === "Chemistry"
                ? "रसायनशास्त्र (Chemistry)"
                : "गणित (Maths)"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="सूत्र किंवा चॅप्टर शोधा..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFormulas.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {card.subject}
                </span>
                <span className="text-slate-500 font-medium truncate">{card.chapter}</span>
              </div>

              {/* Title */}
              <div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">{card.title}</h4>
                <p className="text-xs text-slate-600 font-medium">{card.titleMr}</p>
              </div>

              {/* Formula Display Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-sm font-bold flex items-center justify-between gap-3 shadow-inner">
                <div className="overflow-x-auto whitespace-pre-wrap">{card.formula}</div>
                <button
                  onClick={() => handleCopy(card.formula, card.id)}
                  className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                  title="सूत्र कॉपी करा"
                >
                  {copiedId === card.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                <p>{card.description}</p>
                <p className="text-slate-800 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                  {card.descriptionMr}
                </p>
              </div>
            </div>

            {/* Tip or Key Units */}
            {(card.tip || card.keyUnits) && (
              <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1">
                {card.keyUnits && (
                  <div className="text-slate-500">
                    <strong>एकके (Units):</strong> {card.keyUnits}
                  </div>
                )}
                {card.tip && (
                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-950 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{card.tip}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
