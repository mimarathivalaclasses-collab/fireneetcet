import React, { useState, useMemo } from "react";
import {
  Calendar,
  BookOpen,
  Filter,
  CheckCircle2,
  HelpCircle,
  Play,
  Printer,
  Sparkles,
  Search,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import { Question, ExamType, SubjectType, LanguageMode } from "../types";

interface PyqViewProps {
  questions: Question[];
  currentExam: ExamType;
  language: LanguageMode;
  onStartPracticeWithList: (customQuestions: Question[]) => void;
  onStartMockTestWithList?: (customQuestions: Question[], title: string) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onBack?: () => void;
}

export const PyqView: React.FC<PyqViewProps> = ({
  questions,
  currentExam,
  language,
  onStartPracticeWithList,
  onStartMockTestWithList,
  bookmarkedIds,
  onToggleBookmark,
  onBack,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Filter only PYQ questions
  const pyqQuestions = useMemo(() => {
    return questions.filter((q) => Boolean(q.pyqYear));
  }, [questions]);

  // Extract distinct years present in the dataset
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    pyqQuestions.forEach((q) => {
      if (q.pyqYear) {
        const matches = q.pyqYear.match(/\b(201\d|202\d)\b/g);
        if (matches) {
          matches.forEach((y) => years.add(y));
        }
      }
    });
    return Array.from(years).sort().reverse();
  }, [pyqQuestions]);

  // Filter based on UI selections
  const filteredPyqs = useMemo(() => {
    return pyqQuestions.filter((q) => {
      // Exam Match
      const matchesExam = q.exam === currentExam || (currentExam === "MHT_CET" && q.exam === "MHT_CET");
      if (!matchesExam) return false;

      // Year Filter
      if (selectedYear !== "all") {
        if (!q.pyqYear || !q.pyqYear.includes(selectedYear)) {
          return false;
        }
      }

      // Subject Filter
      if (selectedSubject !== "all" && q.subject !== selectedSubject) {
        return false;
      }

      // Difficulty Filter
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const qText = `${q.questionText} ${q.questionTextMr || ""} ${q.chapter} ${q.topic || ""} ${q.pyqYear || ""}`.toLowerCase();
        if (!qText.includes(searchQuery.toLowerCase().trim())) {
          return false;
        }
      }

      return true;
    });
  }, [pyqQuestions, currentExam, selectedYear, selectedSubject, selectedDifficulty, searchQuery]);

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrintPyqPaper = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }

    const cardsHtml = filteredPyqs
      .map(
        (q, idx) => `
      <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; page-break-inside: avoid; background: #fff;">
        <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; color: #4338ca; margin-bottom: 4px;">
          <span>प्रश्न ${idx + 1} • ${q.subject} (${q.chapter})</span>
          <span style="background: #e0e7ff; padding: 2px 6px; border-radius: 4px;">${q.pyqYear || "PYQ"}</span>
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
              return `<div style="padding: 6px 8px; border-radius: 4px; border: 1px solid ${
                isCorrect ? "#86efac" : "#e2e8f0"
              }; background: ${isCorrect ? "#f0fdf4" : "#f8fafc"}; color: ${
                isCorrect ? "#166534; font-weight: bold;" : "#334155;"
              }">
                ${String.fromCharCode(65 + i)}. ${opt} ${isCorrect ? " ✓ [योग्य उत्तर]" : ""}
              </div>`;
            })
            .join("")}
        </div>
        <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 6px 10px; font-size: 11px; color: #1e293b;">
          <strong>स्पष्टीकरण:</strong> ${q.explanation}
          ${q.formula ? `<div style="color: #312e81; font-family: monospace; margin-top: 2px;"><strong>सूत्र:</strong> ${q.formula}</div>` : ""}
          ${q.explanationMr ? `<div style="color: #475569; margin-top: 2px;"><strong>मराठी:</strong> ${q.explanationMr}</div>` : ""}
        </div>
      </div>
    `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${currentExam}_PYQs_Question_Paper_${selectedYear}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #0f172a; line-height: 1.4; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px; padding: 10px; background: #e0f2fe; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #0369a1;">${currentExam} मागील वर्षांचे प्रश्नसंच (${filteredPyqs.length} प्रश्न)</span>
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">
            🖨️ PDF सेव्ह / प्रिंट करा
          </button>
        </div>
        <h2 style="margin: 0 0 4px 0;">${currentExam} — मागील वर्षांचे अधिकृत प्रश्नसंच (PYQ Archive)</h2>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">वर्ष: ${selectedYear === "all" ? "सर्व वर्षे (2019-2024)" : selectedYear} • विषय: ${selectedSubject} • एकूण प्रश्न: ${filteredPyqs.length}</p>
        ${cardsHtml}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getSubjectOptions = () => {
    if (currentExam === "NEET") return ["All", "Physics", "Chemistry", "Biology"];
    if (currentExam === "JEE_MAIN") return ["All", "Physics", "Chemistry", "Mathematics"];
    return ["All", "Physics", "Chemistry", "Mathematics", "Biology"];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
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
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                PYQs Archive (2019 - 2024)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                {filteredPyqs.length} प्रश्न उपलब्ध
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentExam === "NEET" ? "NEET (UG)" : currentExam === "JEE_MAIN" ? "JEE Main" : "MHT-CET"} मागील वर्षांचे प्रश्नसंच
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              २०१९ ते २०२४ पर्यंतच्या अधिकृत परीक्षांमधील प्रत्यक्ष विचारलेले प्रश्न, उत्तरांची पायरी आणि मराठी-इंग्रजी स्पष्टीकरणासह.
            </p>
          </div>

          {filteredPyqs.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handlePrintPyqPaper}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>PYQ PDF प्रिंट करा</span>
              </button>
              <button
                onClick={() => onStartPracticeWithList(filteredPyqs)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>या प्रश्नांचा सराव सुरू करा</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Year Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" /> वर्ष:
            </span>
            <button
              onClick={() => setSelectedYear("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedYear === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              सर्व वर्षे
            </button>
            {["2024", "2023", "2022", "2021", "2020", "2019"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedYear === year
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="PYQ किंवा टॉपिक शोधा..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Secondary Filters: Subject & Difficulty */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">विषय:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
            >
              {getSubjectOptions().map((sub) => (
                <option key={sub} value={sub === "All" ? "all" : sub}>
                  {sub === "All" ? "सर्व विषय (All Subjects)" : sub}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">काठिण्यपातळी:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">सर्व पातळ्या</option>
              <option value="Easy">Easy (सोपे)</option>
              <option value="Medium">Medium (मध्यम)</option>
              <option value="Hard">Hard (कठीण)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {filteredPyqs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">निवडलेल्या फिल्टरनुसार कोणतेही PYQ प्रश्न आढळले नाहीत</h3>
          <p className="text-xs text-slate-500 mt-1">कृपया वर्ष किंवा विषयाचा फिल्टर बदलून पुन्हा तपासा.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPyqs.map((q, index) => {
            const isBookmarked = bookmarkedIds.has(q.id);
            const isExpanded = Boolean(expandedSolutions[q.id]);

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-200 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono-numbers">
                      {index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                      {q.pyqYear || "PYQ"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      • {q.chapter}
                    </span>
                  </div>

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
                </div>

                {/* Question Text */}
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

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = optIndex === q.correctOption;
                    const letter = String.fromCharCode(65 + optIndex);

                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                          isExpanded && isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-bold text-[11px] ${
                            isExpanded && isCorrect ? "bg-emerald-600 text-white" : "bg-white border border-slate-300 text-slate-700"
                          }`}>
                            {letter}
                          </span>
                          <div>
                            <div>{opt}</div>
                            {q.optionsMr && q.optionsMr[optIndex] && (language === "bilingual" || language === "mr") && (
                              <div className="text-[11px] text-slate-500 mt-0.5">({q.optionsMr[optIndex]})</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Solution Toggle */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>{isExpanded ? "उत्तर व स्पष्टीकरण लपवा" : "उत्तर व स्टेप सोल्यूशन पहा"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[11px] font-medium text-slate-400">
                    योग्य उत्तर: पर्याय {String.fromCharCode(65 + q.correctOption)}
                  </span>
                </div>

                {/* Expanded Solution Box */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>सविस्तर स्पष्टीकरण (Detailed Step Solution):</span>
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
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
