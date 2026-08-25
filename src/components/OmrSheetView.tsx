import React, { useState, useEffect, useMemo } from "react";
import {
  CircleDot,
  CheckCircle2,
  AlertCircle,
  Timer,
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  Award,
  BarChart3,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Question, ExamType, SubjectType, LanguageMode } from "../types";

interface OmrSheetViewProps {
  questions?: Question[];
  currentExam: ExamType;
  language: LanguageMode;
  bookmarkedIds?: Set<string>;
  onToggleBookmark?: (id: string) => void;
  onRecordMistake?: (q: Question, selectedOpt: number, source: "mock_test" | "practice") => void;
  onBack?: () => void;
}

export const OmrSheetView: React.FC<OmrSheetViewProps> = ({
  questions = [],
  currentExam,
  language,
  bookmarkedIds = new Set(),
  onToggleBookmark,
  onRecordMistake,
  onBack,
}) => {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(20);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [omrAnswers, setOmrAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Pick questions for current exam
  const examQuestions = useMemo(() => {
    const list = questions.filter(
      (q) => q.exam === currentExam || (currentExam === "MHT_CET" && q.exam === "MHT_CET")
    );
    return list.slice(0, selectedQuestionCount);
  }, [questions, currentExam, selectedQuestionCount]);

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimeElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const handleBubbleClick = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setOmrAnswers((prev) => {
      // If clicking already selected bubble, keep or unselect? In OMR it shades permanently
      return {
        ...prev,
        [qIndex]: optIndex,
      };
    });
  };

  const handleClearBubble = (qIndex: number) => {
    if (isSubmitted) return;
    setOmrAnswers((prev) => {
      const next = { ...prev };
      delete next[qIndex];
      return next;
    });
  };

  const currentQ = examQuestions[activeQuestionIdx] || examQuestions[0];
  const attemptedCount = Object.keys(omrAnswers).length;
  const unattemptedCount = examQuestions.length - attemptedCount;

  // Calculate score upon submit
  const scoreData = useMemo(() => {
    if (!isSubmitted) return null;

    let correct = 0;
    let wrong = 0;
    let score = 0;

    examQuestions.forEach((q, idx) => {
      const ans = omrAnswers[idx];
      if (ans !== undefined) {
        if (ans === q.correctOption) {
          correct += 1;
          score += currentExam === "MHT_CET" && q.subject === "Mathematics" ? 2 : currentExam === "MHT_CET" ? 1 : 4;
        } else {
          wrong += 1;
          if (currentExam !== "MHT_CET") {
            score -= 1; // Negative marking
          }
          if (onRecordMistake) {
            onRecordMistake(q, ans, "mock_test");
          }
        }
      }
    });

    const maxScore = examQuestions.reduce((acc, q) => {
      return acc + (currentExam === "MHT_CET" && q.subject === "Mathematics" ? 2 : currentExam === "MHT_CET" ? 1 : 4);
    }, 0);

    const accuracy = attemptedCount > 0 ? Math.round((correct / attemptedCount) * 100) : 0;
    const percentage = maxScore > 0 ? Math.round((Math.max(0, score) / maxScore) * 100) : 0;

    return {
      correct,
      wrong,
      unattempted: unattemptedCount,
      score,
      maxScore,
      accuracy,
      percentage,
    };
  }, [isSubmitted, examQuestions, omrAnswers, currentExam, unattemptedCount, attemptedCount, onRecordMistake]);

  const handleResetOmr = () => {
    if (window.confirm("तुम्हाला OMR शीट रिसेट करून नव्याने सोडवायची आहे का?")) {
      setOmrAnswers({});
      setIsSubmitted(false);
      setTimeElapsedSeconds(0);
      setIsTimerRunning(true);
      setActiveQuestionIdx(0);
    }
  };

  const handleSubmitOmr = () => {
    if (unattemptedCount > 0) {
      const confirmSubmit = window.confirm(
        `तुम्ही अजून ${unattemptedCount} प्रश्न सोडवलेले नाहीत. तरीही OMR शीट सबमिट करायची आहे का?`
      );
      if (!confirmSubmit) return;
    }
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>← मागे जा</span>
              </button>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
              <CircleDot className="w-3 h-3 text-emerald-400" />
              Digital OMR Mode
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentExam === "NEET" ? "NEET Pen-Paper Simulation" : currentExam === "JEE_MAIN" ? "JEE Mode" : "MHT-CET OMR"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            डिजिटल OMR शीट प्रॅक्टिस (Real Bubble Filling)
          </h1>
        </div>

        {/* Live Timer & Stats Header */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 font-medium">वेळ:</span>
            <span className="text-white font-bold font-mono-numbers text-sm">{formatTimer(timeElapsedSeconds)}</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-bold font-mono-numbers">{attemptedCount}</span>
            <span className="text-slate-400">/ {examQuestions.length} भरलेले</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitOmr}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-102"
            >
              OMR सबमिट करा
            </button>
          ) : (
            <button
              onClick={handleResetOmr}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>पुन्हा सोडवा (Reset)</span>
            </button>
          )}
        </div>
      </div>

      {/* Submitted Result Scorecard */}
      {isSubmitted && scoreData && (
        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500 shadow-md space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">OMR तपासणी निकाल (Evaluation Report)</h2>
                <p className="text-xs text-slate-500 font-medium">
                  एकूण वेळ: {formatTimer(timeElapsedSeconds)} • अचूकता: {scoreData.accuracy}%
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">मिळालेले गुण (Score)</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono-numbers">
                {scoreData.score} <span className="text-sm font-normal text-slate-400">/ {scoreData.maxScore}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-semibold text-emerald-700">बरोबर उत्तरे</span>
              <div className="text-xl font-bold text-emerald-900 font-mono-numbers">{scoreData.correct}</div>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-200">
              <span className="text-xs font-semibold text-red-700">चुकीची उत्तरे</span>
              <div className="text-xl font-bold text-red-900 font-mono-numbers">{scoreData.wrong}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-700">न सोडवलेले</span>
              <div className="text-xl font-bold text-slate-900 font-mono-numbers">{scoreData.unattempted}</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-semibold text-blue-700">टक्केवारी</span>
              <div className="text-xl font-bold text-blue-900 font-mono-numbers">{scoreData.percentage}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Split Layout: Question View (Left) & OMR Sheet Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Question Viewer */}
        <div className="lg:col-span-7 space-y-4">
          {currentQ && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              {/* Question Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono-numbers">
                    {activeQuestionIdx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                    {currentQ.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    • {currentQ.chapter}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleBookmark(currentQ.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      bookmarkedIds.has(currentQ.id)
                        ? "bg-amber-50 border-amber-300 text-amber-600"
                        : "border-slate-200 text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds.has(currentQ.id) ? "fill-amber-500" : ""}`} />
                  </button>

                  <span className="text-xs font-mono-numbers text-slate-400">
                    {activeQuestionIdx + 1} of {examQuestions.length}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <p className="text-base font-semibold text-slate-900 leading-relaxed">
                  {currentQ.questionText}
                </p>
                {(language === "bilingual" || language === "mr") && currentQ.questionTextMr && (
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                    <strong>मराठी अनुवाद:</strong> {currentQ.questionTextMr}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIndex) => {
                  const isBubbleSelected = omrAnswers[activeQuestionIdx] === optIndex;
                  const isCorrect = optIndex === currentQ.correctOption;
                  const letter = String.fromCharCode(65 + optIndex);

                  let cardStyle = "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/70";
                  if (isSubmitted) {
                    if (isCorrect) {
                      cardStyle = "border-emerald-300 bg-emerald-50 text-emerald-950 font-bold";
                    } else if (isBubbleSelected && !isCorrect) {
                      cardStyle = "border-red-300 bg-red-50 text-red-950 font-bold";
                    }
                  } else if (isBubbleSelected) {
                    cardStyle = "border-slate-900 bg-slate-900 text-white font-bold";
                  }

                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleBubbleClick(activeQuestionIdx, optIndex)}
                      className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start justify-between gap-3 ${cardStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isBubbleSelected ? "bg-white text-slate-900" : "bg-white border border-slate-300 text-slate-700"
                        }`}>
                          {letter}
                        </span>
                        <div>
                          <div className="leading-snug">{opt}</div>
                          {currentQ.optionsMr && currentQ.optionsMr[optIndex] && (language === "bilingual" || language === "mr") && (
                            <div className={`text-[11px] mt-0.5 ${isBubbleSelected && !isSubmitted ? "text-slate-300" : "text-slate-500"}`}>
                              ({currentQ.optionsMr[optIndex]})
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bubble Visual Indicator */}
                      <div className="flex items-center shrink-0">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isBubbleSelected
                            ? "bg-slate-900 border-white ring-2 ring-slate-900"
                            : "border-slate-400 bg-white"
                        }`}>
                          {isBubbleSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Solution after Submit */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>स्पष्टीकरण (Solution):</span>
                  </div>
                  {currentQ.formula && (
                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 font-mono text-[11px] text-indigo-950">
                      <strong>सूत्र:</strong> {currentQ.formula}
                    </div>
                  )}
                  <p className="text-slate-800 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  disabled={activeQuestionIdx === 0}
                  onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>मागील प्रश्न</span>
                </button>

                {!isSubmitted && omrAnswers[activeQuestionIdx] !== undefined && (
                  <button
                    onClick={() => handleClearBubble(activeQuestionIdx)}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    गोल क्लिअर करा (Clear)
                  </button>
                )}

                <button
                  disabled={activeQuestionIdx === examQuestions.length - 1}
                  onClick={() => setActiveQuestionIdx((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>पुढील प्रश्न</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Physical OMR Sheet Style Grid */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-amber-50/40 rounded-2xl p-5 border-2 border-amber-300 shadow-xs space-y-4">
            {/* OMR Header Strip */}
            <div className="border-b-2 border-dashed border-amber-300 pb-3 text-center">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-900 uppercase">
                OMR ANSWER SHEET (अधिकृत गोल पत्रिका)
              </h3>
              <p className="text-[10px] text-slate-600 mt-0.5">
                काळजीपूर्वक योग्य पर्यायाचा गोल (A, B, C, D) काळा / निळा करा
              </p>
            </div>

            {/* OMR Bubbles Rows */}
            <div className="max-h-[500px] overflow-y-auto pr-1 space-y-2 scrollbar-thin">
              {examQuestions.map((q, qIndex) => {
                const selectedOpt = omrAnswers[qIndex];
                const isCurrentActive = activeQuestionIdx === qIndex;
                const isCorrect = isSubmitted && selectedOpt === q.correctOption;
                const isWrong = isSubmitted && selectedOpt !== undefined && selectedOpt !== q.correctOption;

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuestionIdx(qIndex)}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isCurrentActive
                        ? "bg-amber-100/90 border-amber-400 ring-2 ring-amber-400/50"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {/* Question Number */}
                    <div className="flex items-center gap-1.5 min-w-[50px]">
                      <span className="w-5 h-5 rounded bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center font-mono-numbers">
                        {qIndex + 1}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[45px]">
                        {q.subject.substring(0, 4)}
                      </span>
                    </div>

                    {/* 4 Bubbles (A, B, C, D) */}
                    <div className="flex items-center gap-2">
                      {["A", "B", "C", "D"].map((letter, optI) => {
                        const isShaded = selectedOpt === optI;
                        const isTheCorrectOpt = isSubmitted && q.correctOption === optI;

                        let bubbleStyle = "border-slate-400 bg-white text-slate-700 hover:border-slate-900";

                        if (isSubmitted) {
                          if (isTheCorrectOpt) {
                            bubbleStyle = "bg-emerald-600 border-emerald-700 text-white font-bold ring-2 ring-emerald-400";
                          } else if (isShaded && !isTheCorrectOpt) {
                            bubbleStyle = "bg-red-600 border-red-700 text-white font-bold ring-2 ring-red-400";
                          }
                        } else if (isShaded) {
                          bubbleStyle = "bg-slate-950 border-slate-950 text-white font-bold shadow-inner";
                        }

                        return (
                          <button
                            key={optI}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBubbleClick(qIndex, optI);
                            }}
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-transform active:scale-90 cursor-pointer ${bubbleStyle}`}
                            title={`प्रश्न ${qIndex + 1} - पर्याय ${letter}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>

                    {/* Result Status Indicator */}
                    <div className="min-w-[20px] text-right">
                      {isSubmitted && (
                        isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isWrong ? (
                          <span className="text-xs font-bold text-red-600 font-mono-numbers">✗</span>
                        ) : (
                          <span className="text-xs font-bold text-slate-400">-</span>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
