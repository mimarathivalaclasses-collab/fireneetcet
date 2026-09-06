import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Trash2,
  BookOpen,
  Filter,
  Printer,
  Sparkles,
  Search,
  Check,
  X,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Question, ExamType, SubjectType, LanguageMode, MistakeItem } from "../types";

interface MistakesBankViewProps {
  mistakes: MistakeItem[];
  onRemoveMistake: (questionId: string) => void;
  onClearAllMistakes: () => void;
  onToggleResolveMistake: (questionId: string) => void;
  onStartPracticeWithList: (questions: Question[]) => void;
  language: LanguageMode;
  currentExam: ExamType;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onBack?: () => void;
}

export const MistakesBankView: React.FC<MistakesBankViewProps> = ({
  mistakes,
  onRemoveMistake,
  onClearAllMistakes,
  onToggleResolveMistake,
  onStartPracticeWithList,
  language,
  currentExam,
  bookmarkedIds,
  onToggleBookmark,
  onBack,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "unresolved" | "resolved">("unresolved");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m) => {
      // Exam Match
      if (m.question.exam !== currentExam && currentExam !== "MHT_CET") {
        // keep flexible or match exam
      }

      // Subject Filter
      if (selectedSubject !== "all" && m.question.subject !== selectedSubject) {
        return false;
      }

      // Status filter
      if (filterStatus === "unresolved" && m.isResolved) return false;
      if (filterStatus === "resolved" && !m.isResolved) return false;

      // Search Query
      if (searchQuery.trim()) {
        const text = `${m.question.questionText} ${m.question.questionTextMr || ""} ${m.question.chapter}`.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase().trim())) return false;
      }

      return true;
    });
  }, [mistakes, currentExam, selectedSubject, filterStatus, searchQuery]);

  const unresolvedCount = useMemo(() => {
    return mistakes.filter((m) => !m.isResolved).length;
  }, [mistakes]);

  const handlePrintMistakesReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }

    const cardsHtml = filteredMistakes
      .map((m, idx) => {
        const q = m.question;
        return `
        <div style="border: 1px solid #fca5a5; border-radius: 8px; padding: 12px; margin-bottom: 12px; page-break-inside: avoid; background: #fff;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; color: #dc2626; margin-bottom: 4px;">
            <span>चूक क्र. ${idx + 1} • ${q.subject} (${q.chapter})</span>
            <span style="color: #64748b;">${m.source === "mock_test" ? "मॉक टेस्ट" : "सराव मोड"}</span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px;">
            ${q.questionText}
          </div>
          ${
            q.questionTextMr
              ? `<div style="font-size: 12px; color: #78350f; background: #fffbeb; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px;">${q.questionTextMr}</div>`
              : ""
          }
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; margin-bottom: 8px;">
            ${q.options
              .map((opt, i) => {
                const isCorrect = i === q.correctOption;
                const wasSelected = i === m.selectedOption;
                let bg = "#f8fafc";
                let border = "#e2e8f0";
                let color = "#334155";
                let tag = "";

                if (isCorrect) {
                  bg = "#f0fdf4";
                  border = "#86efac";
                  color = "#166534; font-weight: bold;";
                  tag = " ✓ [योग्य उत्तर]";
                } else if (wasSelected) {
                  bg = "#fef2f2";
                  border = "#fca5a5";
                  color = "#991b1b; font-weight: bold;";
                  tag = " ✗ [तुमचे चुकीचे उत्तर]";
                }

                return `<div style="padding: 6px 8px; border-radius: 4px; border: 1px solid ${border}; background: ${bg}; color: ${color};">
                  ${String.fromCharCode(65 + i)}. ${opt} ${tag}
                </div>`;
              })
              .join("")}
          </div>
          <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 6px 10px; font-size: 11px; color: #1e293b;">
            <strong>योग्य स्पष्टीकरण:</strong> ${q.explanation}
            ${q.formula ? `<div style="color: #312e81; font-family: monospace; margin-top: 2px;"><strong>सूत्र:</strong> ${q.formula}</div>` : ""}
            ${q.explanationMr ? `<div style="color: #475569; margin-top: 2px;"><strong>मराठी:</strong> ${q.explanationMr}</div>` : ""}
          </div>
        </div>
      `;
      })
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mistakes_Error_Notebook_${Date.now()}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #0f172a; line-height: 1.4; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px; padding: 10px; background: #fee2e2; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #991b1b;">📕 माझ्या चुका रिव्हिजन शीट (${filteredMistakes.length} प्रश्न)</span>
          <button onclick="window.print()" style="background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">
            🖨️ PDF सेव्ह / प्रिंट करा
          </button>
        </div>
        <div style="border-bottom: 3px solid #ea580c; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: 900; color: #c2410c;">🎓 मी मराठीवाला क्लासेस, अंबड (Mi Marathiwala Classes)</div>
          <h2 style="margin: 4px 0 2px 0; color: #991b1b; font-size: 15px;">NEET • JEE • MHT-CET — एरर नोटबुक (Mistakes Bank)</h2>
          <p style="font-size: 12px; color: #64748b; margin: 0;">तारीख: ${new Date().toLocaleDateString("mr-IN")} • एकूण विश्लेषण केलेल्या चुका: <strong>${filteredMistakes.length}</strong></p>
        </div>
        ${cardsHtml}
        <div style="margin-top: 24px; padding-top: 10px; border-top: 1px solid #ea580c; text-align: center; font-size: 11px; color: #64748b; font-weight: bold;">
          🎓 मी मराठीवाला क्लासेस, अंबड • विद्यार्थी चुका सुधारणा व अचूकता वाढवणारी वैयक्तिक एरर नोटबुक
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-red-900 via-rose-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
                  title="मागे जा"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                  <span>← मागे जा</span>
                </button>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-200 text-xs font-bold uppercase tracking-wider border border-red-400/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                माझ्या चुका (Error Notebook)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold font-mono-numbers">
                {unresolvedCount} अनुत्तरित / दुरुस्त करावयाचे प्रश्न
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              कमकुवत भाग व चुकलेल्या प्रश्नांची उजळणी (Mistakes Bank)
            </h1>
            <p className="text-rose-200 text-xs sm:text-sm mt-1 max-w-2xl">
              सराव किंवा मॉक टेस्टमध्ये चुकलेले सर्व प्रश्न आपोआप येथे जमा होतात. अंतिम परीक्षेपूर्वी केवळ या प्रश्नांची उजळणी चाचणी (Re-Test) देऊन गुण वाढवा.
            </p>
          </div>

          {filteredMistakes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handlePrintMistakesReport}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>एरर शीट PDF प्रिंट करा</span>
              </button>
              <button
                onClick={() => onStartPracticeWithList(filteredMistakes.map((m) => m.question))}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
              >
                <RotateCcw className="w-4 h-4" />
                <span>चुकलेल्या प्रश्नांची री-टेस्ट द्या (Re-Test Now)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterStatus("unresolved")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterStatus === "unresolved"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              सध्याच्या चुका ({unresolvedCount})
            </button>
            <button
              onClick={() => setFilterStatus("resolved")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterStatus === "resolved"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              समजलेले / दुरुस्त केलेले
            </button>
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              सर्व ({mistakes.length})
            </button>
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 text-xs"
          >
            <option value="all">सर्व विषय</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        {/* Clear All & Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="चूक शोधा..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 w-36 sm:w-48"
            />
          </div>

          {mistakes.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("तुम्हाला खात्री आहे का? सर्व नोंदवलेल्या चुका मिटवल्या जातील.")) {
                  onClearAllMistakes();
                }
              }}
              className="px-2.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="सर्व चुका साफ करा"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">क्लिअर करा</span>
            </button>
          )}
        </div>
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            {filterStatus === "unresolved"
              ? "अभिनंदन! तुमच्याकडे कोणतीही अनुत्तरित चूक शिल्लक नाही."
              : "कोणत्याही चुका आढळल्या नाहीत."}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            सराव करताना जे प्रश्न चुकतील ते आपोआप या एरर नोटबुकमध्ये जोडले जातील.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m, index) => {
            const q = m.question;
            const isBookmarked = bookmarkedIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl p-5 border transition-all space-y-4 ${
                  m.isResolved
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-red-200 shadow-xs hover:border-red-300"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-red-600 text-white font-bold text-xs flex items-center justify-center font-mono-numbers">
                      {index + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-xs font-bold border border-red-200">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      • {q.chapter}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                      {m.source === "mock_test" ? "मॉक टेस्ट" : "सराव मोड"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleResolveMistake(q.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 transition-colors cursor-pointer ${
                        m.isResolved
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{m.isResolved ? "समजले ✓" : "समजले म्हणून मार्क करा"}</span>
                    </button>

                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked
                          ? "bg-amber-50 border-amber-300 text-amber-600"
                          : "border-slate-200 text-slate-400 hover:text-slate-700"
                      }`}
                      title={isBookmarked ? "बुकमार्क काढले" : "बुकमार्क करा"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-500" : ""}`} />
                    </button>

                    <button
                      onClick={() => onRemoveMistake(q.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="यादीतून काढून टाका"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Content */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.questionText}
                  </p>
                  {(language === "bilingual" || language === "mr") && q.questionTextMr && (
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                      <strong>मराठी:</strong> {q.questionTextMr}
                    </div>
                  )}
                </div>

                {/* Options Comparison (Wrong vs Correct) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = optIndex === q.correctOption;
                    const wasSelected = optIndex === m.selectedOption;
                    const letter = String.fromCharCode(65 + optIndex);

                    let cardClass = "bg-slate-50 border-slate-200 text-slate-800";
                    let badgeClass = "bg-white border border-slate-300 text-slate-700";

                    if (isCorrect) {
                      cardClass = "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold";
                      badgeClass = "bg-emerald-600 text-white";
                    } else if (wasSelected) {
                      cardClass = "bg-red-50 border-red-300 text-red-950 font-bold";
                      badgeClass = "bg-red-600 text-white";
                    }

                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all ${cardClass}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-bold text-[11px] ${badgeClass}`}>
                              {letter}
                            </span>
                            <div>
                              <div>{opt}</div>
                              {q.optionsMr && q.optionsMr[optIndex] && (language === "bilingual" || language === "mr") && (
                                <div className="text-[11px] text-slate-500 mt-0.5">({q.optionsMr[optIndex]})</div>
                              )}
                            </div>
                          </div>
                          {isCorrect && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800 text-[10px] font-bold shrink-0">
                              योग्य उत्तर ✓
                            </span>
                          )}
                          {wasSelected && !isCorrect && (
                            <span className="px-1.5 py-0.5 rounded bg-red-200 text-red-800 text-[10px] font-bold shrink-0">
                              तुमचे उत्तर ✗
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>का चुकले? व योग्य स्पष्टीकरण (Step Solution):</span>
                  </div>

                  {q.formula && (
                    <div className="p-2 rounded-lg bg-indigo-50/80 border border-indigo-200 font-mono text-[11px] text-indigo-950">
                      <strong>सूत्र (Formula):</strong> {q.formula}
                    </div>
                  )}

                  <p className="text-slate-800 leading-relaxed">{q.explanation}</p>

                  {q.explanationMr && (
                    <div className="pt-2 border-t border-slate-200/80 text-slate-700 leading-relaxed">
                      <strong className="text-amber-900">मराठी:</strong> {q.explanationMr}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
