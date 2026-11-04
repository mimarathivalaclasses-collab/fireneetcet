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
          Question #${idx + 1} • ${q.exam} • ${q.subject} (${q.chapter})
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px;">
          ${q.questionText}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; margin-bottom: 8px;">
          ${q.options
            .map((opt, i) => {
              const isCorrect = i === q.correctOption;
              return `<div style="padding: 6px 8px; border-radius: 4px; border: 1px solid ${
                isCorrect ? "#86efac" : "#e2e8f0"
              }; background: ${isCorrect ? "#f0fdf4" : "#f8fafc"}; color: ${
                isCorrect ? "#166534; font-weight: bold;" : "#334155;"
              }">
                ${String.fromCharCode(65 + i)}. ${opt} ${isCorrect ? " ✓ [Correct Answer]" : ""}
              </div>`;
            })
            .join("")}
        </div>
        <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 8px 10px; font-size: 11px; color: #1e293b;">
          <strong>Explanation:</strong> ${q.explanation}
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
          <span style="font-weight: bold; color: #0369a1;">Bookmark Revision Sheet (${bookmarkedQuestions.length} Questions)</span>
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">
            🖨️ Save / Print PDF
          </button>
        </div>
        <div style="border-bottom: 3px solid #ea580c; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="font-size: 20px; font-weight: 900; color: #c2410c;">🎓 Mi Marathiwala Classes, Ambad</div>
          <h2 style="margin: 4px 0 2px 0; color: #0f172a; font-size: 15px;">NEET • JEE MAIN • MHT-CET — Important Bookmark Revision Sheet</h2>
          <p style="font-size: 12px; color: #64748b; margin: 0;">Date: ${new Date().toLocaleDateString("en-IN")} • Total Saved Important Questions: <strong>${bookmarkedQuestions.length}</strong></p>
        </div>
        ${cardsHtml}
        <div style="margin-top: 24px; padding-top: 10px; border-top: 1px solid #ea580c; text-align: center; font-size: 11px; color: #64748b; font-weight: bold;">
          🎓 Mi Marathiwala Classes, Ambad • Important saved questions for last-minute revision
        </div>
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
                <span>← Back</span>
              </button>
            )}
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Saved Questions (Bookmarks)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Questions that you find difficult or important are saved here. Use them for quick revision before exams.
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintBookmarks}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Save / Print PDF</span>
            </button>
            <button
              onClick={() => onStartPracticeWithList(bookmarkedQuestions)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Practice Saved Questions Only</span>
            </button>
          </div>
        )}
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs">
        <span className="font-bold text-slate-500 mr-2">Subject Filter:</span>
        <button
          onClick={() => setSelectedSubject("All")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            selectedSubject === "All"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Subjects ({questions.filter((q) => bookmarkedIds.has(q.id)).length})
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
            No questions have been bookmarked yet
          </h3>
          <p className="text-xs text-slate-500 max-sm mx-auto">
            Click the 'Bookmark' icon on questions you find difficult during practice to save them here.
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
                      {isRevealed ? "Hide Answer" : "Show Answer & Explanation"}
                    </button>
                    <button
                      onClick={() => onToggleBookmark(q)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs transition-colors"
                      title="Remove Bookmark"
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
                      <span>Explanation:</span>
                    </div>
                    {q.formula && (
                      <div className="font-mono text-[11px] text-blue-800 font-bold">
                        Formula: {q.formula}
                      </div>
                    )}
                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>

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
