import React, { useState } from "react";
import {
  Bookmark,
  BookmarkX,
  Play,
  Lightbulb,
  CheckCircle2,
  Trash2,
  BookOpen,
  Filter,
  Download,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { Question, ExamType, SubjectType, LanguageMode } from "../types";

interface BookmarksViewProps {
  questions: Question[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (question: Question) => void;
  language: LanguageMode;
  onStartPracticeWithList: (subset: Question[]) => void;
  onBack?: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  language,
  onStartPracticeWithList,
  onBack,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  // Filter bookmarked questions
  const bookmarkedQuestions = questions.filter((q) => {
    if (!bookmarkedIds.has(q.id)) return false;
    if (selectedSubject !== "All" && q.subject !== selectedSubject) return false;
    return true;
  });

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePrintBookmarks = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const cardsHtml = bookmarkedQuestions
      .map(
        (q, idx) => `
      <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 14px; page-break-inside: avoid; background: #fff;">
        <div style="font-size: 11px; font-weight: bold; color: #4338ca; margin-bottom: 4px;">
          प्रश्न ${idx + 1} • ${q.exam} • ${q.subject} (${q.chapter})
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
        <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 8px 10px; font-size: 11px; color: #1e293b;">
          <strong>स्पष्टीकरण:</strong> ${q.explanation}
          ${q.explanationMr ? `<div style="color: #475569; margin-top: 4px;"><strong>मराठी:</strong> ${q.explanationMr}</div>` : ""}
        </div>
      </div>
    `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Saved_Bookmarks_Revision_Sheet</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #0f172a; line-height: 1.4; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px; padding: 10px; background: #e0f2fe; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #0369a1;">बुकमार्क रिव्हिजन शीट (${bookmarkedQuestions.length} प्रश्न)</span>
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">
            🖨️ PDF सेव्ह / प्रिंट करा
          </button>
        </div>
        <h2 style="margin: 0 0 4px 0;">NEET • JEE MAIN • MHT-CET — महत्त्वाची बुकमार्क रिव्हिजन शीट</h2>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">तारीख: ${new Date().toLocaleDateString("mr-IN")}</p>
        ${cardsHtml}
      </body>
      </html>
    `);
    printWindow.document.close();
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
                <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
                <span>← मागे जा</span>
              </button>
            )}
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              बुकमार्क केलेले प्रश्न (Saved Questions)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            अवघड किंवा महत्त्वाचे वाटणारे प्रश्न येथे सुरक्षित आहेत. परीक्षेपूर्वी जलद रिव्हिजन करा.
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintBookmarks}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>PDF सेव्ह / प्रिंट करा</span>
            </button>
            <button
              onClick={() => onStartPracticeWithList(bookmarkedQuestions)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>केवळ सेव्ह केलेल्या प्रश्नांचा सराव करा</span>
            </button>
          </div>
        )}
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs">
        <span className="font-bold text-slate-500 mr-2">विषय फिल्टर:</span>
        <button
          onClick={() => setSelectedSubject("All")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            selectedSubject === "All"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          सर्व विषय ({questions.filter((q) => bookmarkedIds.has(q.id)).length})
        </button>
        {(["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[]).map((sub) => {
          const count = questions.filter((q) => bookmarkedIds.has(q.id) && q.subject === sub).length;
          return (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubject === sub
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {sub} ({count})
            </button>
          );
        })}
      </div>

      {/* Bookmarks List */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            कोणतेही प्रश्न बुकमार्क केलेले नाहीत
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            सराव करताना अवघड वाटणाऱ्या प्रश्नांवरील 'Bookmark' चिन्हावर क्लिक करून त्यांना येथे सेव्ह करा.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q, idx) => {
            const isRevealed = revealedIds.has(q.id);

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {q.subject}
                    </span>
                    <span className="font-medium text-slate-600">{q.chapter}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs transition-colors"
                    >
                      {isRevealed ? "उत्तर लपवा" : "उत्तर व स्पष्टीकरण दाखवा"}
                    </button>
                    <button
                      onClick={() => onToggleBookmark(q)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs transition-colors"
                      title="बुकमार्क काढा"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.questionText}
                  </div>
                  {q.questionTextMr && (
                    <div className="text-xs text-slate-700 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      <strong>मराठी:</strong> {q.questionTextMr}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optI) => {
                    const optLetter = String.fromCharCode(65 + optI);
                    const isCorrect = optI === q.correctOption;

                    return (
                      <div
                        key={optI}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isRevealed && isCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{optLetter}.</span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Revealed Explanation */}
                {isRevealed && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>स्पष्टीकरण:</span>
                    </div>
                    {q.formula && (
                      <div className="font-mono text-[11px] text-blue-800 font-bold">
                        सूत्र: {q.formula}
                      </div>
                    )}
                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                    {q.explanationMr && (
                      <p className="text-slate-800 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                        {q.explanationMr}
                      </p>
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
